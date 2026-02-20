import React, { useEffect, useState } from "react";
import "../Admin/Admin.css";
import { Form, Table } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../Admin/Admin.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import { FiPrinter } from "react-icons/fi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { debounce } from "lodash";
import swal from "sweetalert";
const steps = [
  "Blueprint Details",
  "Marks Details",
  "Weightage to the Content",
  " Weightage of the Difficulty Level",
];

const AdminQuestionAnalysisHeaderAdd = () => {
  //Translate
  let googleTransliterate = require("google-input-tool");
  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
  const [analysisValues, setAnalysisValues] = useState({
    OT: "",
    VSA: "",
    SA: "",
    A: "",
    E: "",
    M: "",
  });
  const [translatedAnalysisValues, setTranslatedAnalysisValues] = useState({
    OT: "",
    VSA: "",
    SA: "",
    A: "",
    E: "",
    M: "",
  });

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
  const translateText = async (text, key = null) => {
    if (!text || selectedLanguage === "en-t-i0-und") return text;

    const words = text.split(/\s+/);
    const translations = await Promise.all(
      words.map(async (word) => {
        try {
          const response = await googleTransliterate(
            new XMLHttpRequest(),
            word,
            selectedLanguage
          );
          return response[0][0];
        } catch (error) {
          console.error("Translation error:", error);
          return word;
        }
      })
    );

    const translatedText = translations.join(" ");

    if (key) {
      setTranslatedAnalysisValues((prev) => ({
        ...prev,
        [key]: translatedText,
      }));
    }

    return translatedText;
  };

  const handleAnalysisChange = async (key, value) => {
    setAnalysisValues((prev) => ({ ...prev, [key]: value }));

    if (selectedLanguage !== "en-t-i0-und") {
      const translatedText = await translateText(value, key);
      setTranslatedAnalysisValues((prev) => ({
        ...prev,
        [key]: translatedText,
      }));
    }
  };

  const onChangeHandler = debounce(async (value, setData) => {
    if (!value) {
      setTranslatedValue("");
      setData("");
      return "";
    }

    let am = value.split(/\s+/); // Split by any whitespace characters
    let arr = [];
    let promises = [];

    for (let index = 0; index < am.length; index++) {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            const response = await googleTransliterate(
              new XMLHttpRequest(),
              am[index],
              selectedLanguage
            );
            resolve(response[0][0]);
          } catch (error) {
            console.error("Translation error:", error);
            resolve(am[index]);
          }
        })
      );
    }

    try {
      const translations = await Promise.all(promises);
      setTranslatedValue(translations.join(" "));
      setData(translations.join(" "));
      return translations;
    } catch (error) {
      console.error("Promise.all error:", error);
    }
  }, 300); // Debounce delay in milliseconds

  const [QuestHeader, setQuestHeader] = useState("");
  const [slno, setslno] = useState("");
  const [ObjectType, setObjectType] = useState("");
  const [Chapter, setChapter] = useState("");
  const [Lesson, setLesson] = useState("");
  const [QuestionType, setQuestionType] = useState("");
  const [OtSaLsa, setOtSaLsa] = useState("");
  const [Marks, setMarks] = useState("");
  const [Difficultlevel, setDifficultlevel] = useState("");
  const [Time, setTime] = useState("");
  const [Note, setNote] = useState("");

  const AddQuestAnalysisHeader = async () => {
    if (!selectedMedium) {
      return alert("Please Select Medium");
    }
    try {
      const config = {
        url: "/admin/addQuestAnalysisheader",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          selectedLanguage: selectedLanguage,
          QuestHeader: QuestHeader,
          slno: slno,
          ObjectType: ObjectType,
          Chapter: Chapter,
          Lesson: Lesson,
          QuestionType: QuestionType,
          OtSaLsa: OtSaLsa,
          Marks: Marks,
          Difficultlevel: Difficultlevel,
          Time: Time,
          Note: Note,
          selectedMedium: selectedMedium,
          translatedAnalysisValues: translatedAnalysisValues,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        return swal({
          title: "Yeahh!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
      window.location.assign("/adminquestionsanalysisheadertype");
    } catch (error) {
      return swal({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };

  //get method for medium
  const [selectedMedium, setselectedMedium] = useState("");
  const [Medium, setMedium] = useState([]);
  const getAddMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status == 200) {
        setMedium(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAddMedium();
  }, []);

  return (
    <>
      <div className="box_1">
        <div className="Stepper-info row " style={{ padding: "4px" }}>
          <div className="row justify-content-between">
            <div className="col-md-3">
              <label htmlFor="">Select Medium</label>
              <select
                onChange={(e) => setselectedMedium(e.target.value)}
                className="vi_0"
                style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
              >
                <option value="select value">Select Medium</option>
                {Medium?.map((item) => (
                  <option value={item?.mediumName}>{item?.mediumName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="">Select Langauge</label>
              <select
                value={selectedLanguage}
                onChange={handleLanguageChange}
                className="vi_0"
                style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
              >
                <option value="en-t-i0-und">English</option>
                <option value="ne-t-i0-und">Nepali</option>
                <option value="hi-t-i0-und">Hindi</option>
                <option value="kn-t-i0-und">Kannada</option>
                <option value="ta-t-i0-und">Tamil</option>
                <option value="pa-t-i0-und">Punjabi</option>
                <option value="mr-t-i0-und">Marathi</option>
                <option value="ur-t-i0-und">Urdu</option>
                <option value="sa-t-i0-und">Sanskrit</option>
              </select>
            </div>
          </div>
          <div id="pdf">
            <div className="blueprint-content-display">
              <div className="blueprint-titles">
                <h3>Questions Analysis Name</h3>
                <div className="d-flex justify-content-center">
                  <input
                    style={{ width: "80px" }}
                    type="text"
                    placeholder="Questions Analysis"
                    onChange={(e) => {
                      if (selectedLanguage == "en-t-i0-und") {
                        setQuestHeader(e.target.value);
                      } else onChangeHandler(e.target.value, setQuestHeader);
                    }}
                  />
                  {selectedLanguage == "en-t-i0-und" ? (
                    <></>
                  ) : (
                    <p>{QuestHeader}</p>
                  )}
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {/* table 3  */}
                    <div className="weightage-objectives">
                      <div className="objectives-table ">
                        <Table
                          responsive
                          bordered
                          hover
                          size="md"
                          style={{ border: "1px solid" }}
                        >
                          <thead>
                            <tr>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setslno(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setslno);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="S No."
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{slno}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setObjectType(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setObjectType
                                      );
                                  }}
                                  style={{ width: "100px" }}
                                  type="text"
                                  placeholder="ObjectType"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{ObjectType}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setChapter(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setChapter
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Chapter"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Chapter}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setLesson(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setLesson
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Lesson"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Lesson}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setQuestionType(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setQuestionType
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="QuestionType"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{QuestionType}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setOtSaLsa(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setOtSaLsa
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="OtSaLsa"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{OtSaLsa}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setMarks(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setMarks);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Marks"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Marks}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setDifficultlevel(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setDifficultlevel
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Difficultlevel"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Difficultlevel}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setTime(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setTime);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Time"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Time}</p>
                                )}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1.</td>
                              <td>Understanding</td>
                              <td>A box of Smiles</td>
                              <td>Prose</td>
                              <td>Fill in the blanks</td>
                              <td>O T</td>
                              <td>40</td>
                              <td>Easy</td>
                              <td>2 minutes</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                    <div id="pdf">
                      <div className="blueprint-content-display">
                        <div className="blueprint-titles">
                          <h3>Questions Analysis Name</h3>
                          <div className="d-flex justify-content-center">
                            <input
                              style={{ width: "80px" }}
                              type="text"
                              placeholder="Questions Analysis"
                              onChange={(e) => {
                                if (selectedLanguage == "en-t-i0-und") {
                                  setQuestHeader(e.target.value);
                                } else
                                  onChangeHandler(
                                    e.target.value,
                                    setQuestHeader
                                  );
                              }}
                            />
                            {selectedLanguage == "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{QuestHeader}</p>
                            )}
                          </div>
                        </div>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">
                              {/* table 3  */}
                              <div className="weightage-objectives">
                                <div className="objectives-table ">
                                  <Table
                                    responsive
                                    bordered
                                    hover
                                    size="md"
                                    style={{ border: "1px solid" }}
                                  >
                                    <thead>
                                      <tr>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setslno(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setslno
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="S No."
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{slno}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setObjectType(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setObjectType
                                                );
                                            }}
                                            style={{ width: "100px" }}
                                            type="text"
                                            placeholder="ObjectType"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{ObjectType}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setChapter(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setChapter
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="Chapter"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Chapter}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setLesson(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setLesson
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="Lesson"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Lesson}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setQuestionType(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setQuestionType
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="QuestionType"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{QuestionType}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setOtSaLsa(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setOtSaLsa
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="OtSaLsa"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{OtSaLsa}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setMarks(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setMarks
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="Marks"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Marks}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setDifficultlevel(
                                                  e.target.value
                                                );
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setDifficultlevel
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="Difficultlevel"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Difficultlevel}</p>
                                          )}
                                        </th>
                                        <th>
                                          <input
                                            onChange={(e) => {
                                              if (
                                                selectedLanguage ==
                                                "en-t-i0-und"
                                              ) {
                                                setTime(e.target.value);
                                              } else
                                                onChangeHandler(
                                                  e.target.value,
                                                  setTime
                                                );
                                            }}
                                            style={{ width: "80px" }}
                                            type="text"
                                            placeholder="Time"
                                          />
                                          {selectedLanguage == "en-t-i0-und" ? (
                                            <></>
                                          ) : (
                                            <p>{Time}</p>
                                          )}
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>1.</td>
                                        <td>Understanding</td>
                                        <td>A box of Smiles</td>
                                        <td>Prose</td>
                                        <td>Fill in the blanks</td>
                                        <td>O T</td>
                                        <td>40</td>
                                        <td>Easy</td>
                                        <td>2 minutes</td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                            </div>
                            <Form.Label>
                              Questions Analysis Instruction
                            </Form.Label>
                            <Form.Control
                              className="mb-2"
                              style={{ width: "150px" }}
                              type="text"
                              placeholder="note"
                              onChange={(e) => {
                                if (selectedLanguage == "en-t-i0-und") {
                                  setNote(e.target.value);
                                } else onChangeHandler(e.target.value, setNote);
                              }}
                            />
                            {selectedLanguage == "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{Note}</p>
                            )}
                            <div
                              className="analysis-grid"
                              style={{
                                display: "grid",
                                gridTemplateColumns:
                                  "repeat(auto-fit, minmax(200px, 1fr))",
                                gap: "1rem",
                                margin: "2rem 0",
                              }}
                            >
                              {Object.entries({
                                "O.T": "OT",
                                "V.S.A": "VSA",
                                "S.A": "SA",
                                A: "A",
                                E: "E",
                                M: "M",
                              }).map(([label, key]) => (
                                <div
                                  key={key}
                                  className="analysis-item"
                                  style={{
                                    backgroundColor: "white",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                                  }}
                                >
                                  <label className="block mb-2 font-medium">
                                    {label}
                                  </label>
                                  <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    value={analysisValues[key]}
                                    onChange={(e) =>
                                      handleAnalysisChange(key, e.target.value)
                                    }
                                    placeholder={label}
                                  />
                                  {selectedLanguage === "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    translatedAnalysisValues[key] && (
                                      <p className="mt-2 text-sm text-gray-600">
                                        {translatedAnalysisValues[key]}
                                      </p>
                                    )
                                  )}
                                </div>
                              ))}
                            </div>

                            <div className="col-md-12 mb-2">
                              <div className="d-flex justify-content-center">
                                <button
                                  onClick={AddQuestAnalysisHeader}
                                  className="admin-add-btn mb-2"
                                >
                                  Add Headers
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminQuestionAnalysisHeaderAdd;

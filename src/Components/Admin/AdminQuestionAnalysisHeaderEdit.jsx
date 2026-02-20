"use client";

import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import "../Admin/Admin.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { debounce } from "lodash";
import swal from "sweetalert";

const steps = [
  "Blueprint Details",
  "Marks Details",
  "Weightage to the Content",
  " Weightage of the Difficulty Level",
];

const AdminQuestionAnalysisHeaderEdit = () => {
  const { QuestAnalHead_Id } = useParams();
  const { state } = useLocation();

  // Translate
  const googleTransliterate = require("google-input-tool");
  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");

  // Analysis values state with proper structure for both original and translated values
  const [analysisValues, setAnalysisValues] = useState({
    OT: state?.item?.OT || "",
    VSA: state?.item?.VSA || "",
    SA: state?.item?.SA || "",
    A: state?.item?.A || "",
    E: state?.item?.E || "",
    M: state?.item?.M,
  });

  const [translatedAnalysisValues, setTranslatedAnalysisValues] = useState({
    OT: "",
    VSA: "",
    SA: "",
    A: "",
    E: "",
    M: "",
  });

  // Update the useEffect to translate existing values when language changes
  useEffect(() => {
    getAddMedium();

    // Translate existing values when language changes
    if (selectedLanguage !== "en-t-i0-und" && state?.item) {
      // Translate all existing analysis values when language changes
      Object.entries({
        OT: state?.item?.OT || "",
        VSA: state?.item?.VSA || "",
        SA: state?.item?.SA || "",
        A: state?.item?.A || "",
        E: state?.item?.E || "",
        M: state?.item?.M || "",
      }).forEach(async ([key, value]) => {
        if (value) {
          const translatedText = await translateText(value, key);
          setTranslatedAnalysisValues((prev) => ({
            ...prev,
            [key]: translatedText,
          }));
        }
      });
    }
  }, [selectedLanguage]);

  // Update the handleLanguageChange function to trigger translations
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
    // The useEffect will handle the translations when language changes
  };

  // Function to translate text with support for analysis fields
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

  // Handle changes to analysis fields with translation
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

    const am = value.split(/\s+/); // Split by any whitespace characters
    const promises = [];

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

  //get method for medium
  const [selectedMedium, setselectedMedium] = useState(state?.Medium || "");
  const [Medium, setMedium] = useState([]);
  const getAddMedium = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status == 200) {
        setMedium(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update
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

  const UpdateQuestAnalysisHeader = async () => {
    try {
      const config = {
        url: "/admin/updateQuestionAnalysisHeader/" + state?.item?._id,
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
        },
        data: {
          QuestHeader: QuestHeader || state?.item?.QuestHeader,
          slno: slno || state?.item?.slno,
          ObjectType: ObjectType || state?.item?.ObjectType,
          Chapter: Chapter || state?.item?.Chapter,
          Lesson: Lesson || state?.item?.Lesson,
          QuestionType: QuestionType || state?.item?.QuestionType,
          OtSaLsa: OtSaLsa || state?.item?.OtSaLsa,
          Marks: Marks || state?.item?.Marks,
          Difficultlevel: Difficultlevel || state?.item?.Difficultlevel,
          Time: Time || state?.item?.Time,
          Note: Note || state?.item?.Note,
          // Include analysis values in the update
          ...translatedAnalysisValues,
          // Include translated values if not in English
          translatedAnalysisValues:
            selectedLanguage !== "en-t-i0-und"
              ? translatedAnalysisValues
              : null,
        },
      };
      const res = await axios(config);
      if (res.status == 200) {
        return swal({
          title: "Yeah",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
      }
    } catch (error) {
      console.log(error);
      return swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "Ok!",
      });
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
                value={selectedMedium}
              >
                <option value="select value">Select Medium</option>
                {Medium?.map((item) => (
                  <option key={item?.mediumName} value={item?.mediumName}>
                    {item?.mediumName}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="">Select Language</label>
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
                <h3>Edit Questions Analysis Name</h3>
                <div className="d-flex justify-content-center">
                  <input
                    style={{ width: "10rem" }}
                    type="text"
                    placeholder={state?.item?.QuestHeader}
                    onChange={(e) => {
                      if (selectedLanguage == "en-t-i0-und") {
                        setQuestHeader(e.target.value);
                      } else onChangeHandler(e.target.value, setQuestHeader);
                    }}
                  />
                  {selectedLanguage !== "en-t-i0-und" && (
                    <p>{QuestHeader || state?.item?.QuestHeader}</p>
                  )}
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
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
                                  placeholder={state?.item?.slno}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>{slno || state?.item?.slno}</p>
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
                                  placeholder={state?.item?.ObjectType}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>{ObjectType || state?.item?.ObjectType}</p>
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
                                  placeholder={state?.item?.Chapter}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>{Chapter || state?.item?.Chapter}</p>
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
                                  placeholder={state?.item?.Lesson}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>{Lesson || state?.item?.Lesson}</p>
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
                                  placeholder={state?.item?.QuestionType}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>
                                    {QuestionType || state?.item?.QuestionType}
                                  </p>
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
                                  placeholder={state?.item?.OtSaLsa}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>{OtSaLsa || state?.item?.OtSaLsa}</p>
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
                                  placeholder={state?.item?.Marks}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>{Marks || state?.item?.Marks}</p>
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
                                  placeholder={state?.item?.Difficultlevel}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>
                                    {Difficultlevel ||
                                      state?.item?.Difficultlevel}
                                  </p>
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
                                  placeholder={state?.item?.Time}
                                />
                                {selectedLanguage !== "en-t-i0-und" && (
                                  <p>{Time || state?.item?.Time}</p>
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
                  <div className="row">
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label>Questions Analysis Instruction</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={state?.item?.Note}
                        onChange={(e) => {
                          if (selectedLanguage == "en-t-i0-und") {
                            setNote(e.target.value);
                          } else onChangeHandler(e.target.value, setNote);
                        }}
                      />
                      {selectedLanguage !== "en-t-i0-und" && (
                        <p>{Note || state?.item?.Note}</p>
                      )}
                    </Form.Group>
                  </div>

                  {/* Analysis Values Section - Improved with proper translation */}
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
                          placeholder={`Current: ${state?.item?.[key] || ""}`}
                        />
                        {selectedLanguage !== "en-t-i0-und" && (
                          <div className="mt-2 p-2 bg-gray-50 rounded border">
                            <p className="text-sm font-medium">Translated:</p>
                            <p className="text-sm text-gray-600">
                              {translatedAnalysisValues[key] ||
                                "Translating..."}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="col-md-12 mb-2">
                    <div className="d-flex justify-content-center">
                      <button
                        onClick={UpdateQuestAnalysisHeader}
                        className="admin-add-btn mb-2"
                      >
                        Update Headers
                      </button>
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

export default AdminQuestionAnalysisHeaderEdit;

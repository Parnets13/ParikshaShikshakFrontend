import React, { useEffect, useState } from "react";
import "../Admin/Admin.css";
import { Form, Table } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../Admin/Admin.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

import MathInput from "react-math-keyboard";
import { FiPrinter } from "react-icons/fi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { debounce } from "lodash";
const steps = [
  "Blueprint Details",
  "Marks Details",
  "Weightage to the Content",
  " Weightage of the Difficulty Level",
];

function BluePrintHeaderAdd() {
  //Translate
  let googleTransliterate = require("google-input-tool");
  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
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

  const [BluePrintName, setBluePrintName] = useState("");
  const [UnitWiseMrk, setUnitWiseMrk] = useState("");
  const [ObjectiveMrks, setObjectiveMrks] = useState("");
  const [QuestionWiseMrk, setQuestionWiseMrk] = useState("");
  const [AccordingRigorMrk, setAccordingRigorMrk] = useState("");
  const [SNo, setSNo] = useState("");
  const [Total, setTotal] = useState("");
  const [Questions, setQuestions] = useState("");
  const [Marks, setMarks] = useState("");
  const [Percentage, setPercentage] = useState("");
  const [Lessons, setLessons] = useState("");
  const [Specifics, setSpecifics] = useState("");
  const [TypeOfQuestion, setTypeOfQuestion] = useState("");
  const [LevelOfDifficult, setLevelOfDifficult] = useState("");
  const [Time, setTime] = useState("");
  const [TargetUnit, setTargetUnit] = useState("");
  const [TotalQuestion, setTotalQuestion] = useState("");
  const [TotalMarks, setTotalMarks] = useState("");
  const [V, setV] = useState("");
  const [K, setK] = useState("");
  const [D, setD] = useState("");
  const [VSA, setVSA] = useState("");
  const [SA, setSA] = useState("");
  const [LA1, setLA1] = useState("");
  const [LA2, setLA2] = useState("");
  const [LA3, setLA3] = useState("");
  const [Note, setNote] = useState("");
  const [Objectivequestion, setObjectivequestion] = useState("");
  const [ShortanswerQ, setShortanswerQ] = useState("");
  const [LonganswerQ, setLonganswerQ] = useState("");
  const [Easy, setEasy] = useState("");
  const [MediumQ, setMediumQ] = useState("");
  const [Difficult, setDifficult] = useState("");

  const AddBluePrintHeader = async () => {
    if (!selectedMedium) {
      return alert("Please Select Medium");
    }
    try {
      const config = {
        url: "/admin/addblueprintheader",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          selectedLanguage: selectedLanguage,
          BluePrintName: BluePrintName,
          UnitWiseMrk: UnitWiseMrk,
          ObjectiveMrks: ObjectiveMrks,
          QuestionWiseMrk: QuestionWiseMrk,
          AccordingRigorMrk: AccordingRigorMrk,
          SNo: SNo,
          Total: Total,
          Questions: Questions,
          Marks: Marks,
          Percentage: Percentage,
          Lessons: Lessons,
          Specifics: Specifics,
          TypeOfQuestion: TypeOfQuestion,
          LevelOfDifficult: LevelOfDifficult,
          Time: Time,
          TargetUnit: TargetUnit,
          TotalQuestion: TotalQuestion,
          TotalMarks: TotalMarks,
          V: V,
          K: K,
          D: D,
          VSA: VSA,
          SA: SA,
          LA1: LA1,
          LA2: LA2,
          LA3: LA3,
          Note: Note,
          selectedMedium: selectedMedium,
          Objectivequestion: Objectivequestion,
          ShortanswerQ: ShortanswerQ,
          LonganswerQ: LonganswerQ,
          Easy: Easy,
          MediumQ: MediumQ,
          Difficult: Difficult,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        window.location.assign("/adminblueprintheadertype");
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const [GetbluePrintHeader, setGetbluePrintHeader] = useState([]);
  const getBluePrintHeader = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getblueprintheader"
      );
      if (res.status == 200) {
        setGetbluePrintHeader(res.data.success);
      }
    } catch (error) {
      console.log(error);
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
    getBluePrintHeader();
  }, []);

  return (
    <>
      <div className="box_1">
        <div className="Stepper-info " style={{ padding: "20px" }}>
          <div className="row justify-content-between">
            <div className="col-md-2">
              <label htmlFor="">Select Medium</label>
              <select
                onChange={(e) => setselectedMedium(e.target.value)}
                className="vi_0"
                style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
              >
                <option value="select value">Select Medium</option>
                {Medium?.filter(
                  (ele) =>
                    !GetbluePrintHeader.some(
                      (item) => ele?.mediumName === item?.selectedMedium
                    )
                )?.map((item) => {
                  return (
                    <option value={item?.mediumName}>{item?.mediumName}</option>
                  );
                })}
              </select>
            </div>
            <div className="col-md-2">
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
                <h3>Blue Print Name</h3>
                <div className="d-flex justify-content-center">
                  <input
                    style={{ width: "80px" }}
                    type="text"
                    placeholder="Blue Print"
                    onChange={(e) => {
                      if (selectedLanguage == "en-t-i0-und") {
                        setBluePrintName(e.target.value);
                      } else onChangeHandler(e.target.value, setBluePrintName);
                    }}
                  />
                  {selectedLanguage == "en-t-i0-und" ? (
                    <></>
                  ) : (
                    <p>{BluePrintName}</p>
                  )}
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-7">
                    {/* table 3  */}
                    <div className="weightage-objectives">
                      <div className="main-title">
                        <b>1.</b>
                        <input
                          type="text"
                          placeholder="Unit wise marks allocation"
                          onChange={(e) => {
                            if (selectedLanguage == "en-t-i0-und") {
                              setUnitWiseMrk(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setUnitWiseMrk);
                          }}
                        />
                        {selectedLanguage == "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{UnitWiseMrk}</p>
                        )}
                      </div>
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
                                      setSNo(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setSNo);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="S No."
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{SNo}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setLessons(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setLessons
                                      );
                                  }}
                                  style={{ width: "100px" }}
                                  type="text"
                                  placeholder="Lessons"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Lessons}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setQuestions(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setQuestions
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Questions"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Questions}</p>
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
                                      setPercentage(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setPercentage
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Percentage"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Percentage}</p>
                                )}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1.</td>
                              <td>Lessons Name</td>
                              <td>2</td>
                              <td>3</td>
                              <td>7.5%</td>
                            </tr>

                            <tr>
                              <td>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setTotal(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setTotal);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Total"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Total}</p>
                                )}
                              </td>
                              <td></td>
                              <td>
                                <b>12</b>
                              </td>
                              <td>
                                {" "}
                                <b>12</b>
                              </td>
                              <td>
                                <b>100%</b>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-5">
                    {/* table 1 */}
                    <div className="weightage-objectives">
                      <div className="main-title">
                        <b>2.</b>
                        <input
                          type="text"
                          placeholder="According to objective Marks Allotment"
                          onChange={(e) => {
                            if (selectedLanguage == "en-t-i0-und") {
                              setObjectiveMrks(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setObjectiveMrks);
                          }}
                        />
                        {selectedLanguage == "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{ObjectiveMrks}</p>
                        )}
                      </div>
                      <div className="objectives-table">
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
                                      setSNo(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setSNo);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="S No."
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{SNo}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setSpecifics(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setSpecifics
                                      );
                                  }}
                                  style={{ width: "100px" }}
                                  type="text"
                                  placeholder="Specifics"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Specifics}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setQuestions(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setQuestions
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Questions"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Questions}</p>
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
                                      setPercentage(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setPercentage
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Percentage"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Percentage}</p>
                                )}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1.</td>
                              <td>knowledge</td>
                              <td>10</td>
                              <td>10</td>
                              <td>25%</td>
                            </tr>

                            <tr>
                              <td>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setTotal(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setTotal);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Total"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Total}</p>
                                )}
                              </td>
                              <td>
                                <b></b>
                              </td>
                              <td>
                                <b>12</b>
                              </td>
                              <td>
                                <b>23</b>
                              </td>

                              <td>
                                <b>100%</b>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>

                    {/* table 2 */}
                    <div className="weightage-objectives">
                      <div className="main-title">
                        <b>3.</b>
                        <input
                          type="text"
                          placeholder="Question wise mark allocation"
                          onChange={(e) => {
                            if (selectedLanguage == "en-t-i0-und") {
                              setQuestionWiseMrk(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setQuestionWiseMrk
                              );
                          }}
                        />
                        {selectedLanguage == "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{QuestionWiseMrk}</p>
                        )}
                      </div>
                      <div className="text-center">
                        <div className="objectives-table">
                          <Table
                            responsive
                            bordered
                            hover
                            size="sm"
                            style={{ border: "1px solid" }}
                          >
                            <thead>
                              <tr>
                                <th>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setSNo(e.target.value);
                                      } else
                                        onChangeHandler(e.target.value, setSNo);
                                    }}
                                    style={{ width: "80px" }}
                                    type="text"
                                    placeholder="S No."
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{SNo}</p>
                                  )}
                                </th>
                                <th>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setTypeOfQuestion(e.target.value);
                                      } else
                                        onChangeHandler(
                                          e.target.value,
                                          setTypeOfQuestion
                                        );
                                    }}
                                    style={{ width: "100px" }}
                                    type="text"
                                    placeholder="TypeOfQuestion"
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{TypeOfQuestion}</p>
                                  )}
                                </th>
                                <th>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setQuestions(e.target.value);
                                      } else
                                        onChangeHandler(
                                          e.target.value,
                                          setQuestions
                                        );
                                    }}
                                    style={{ width: "80px" }}
                                    type="text"
                                    placeholder="Questions"
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{Questions}</p>
                                  )}
                                </th>
                                <th>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
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
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setPercentage(e.target.value);
                                      } else
                                        onChangeHandler(
                                          e.target.value,
                                          setPercentage
                                        );
                                    }}
                                    style={{ width: "80px" }}
                                    type="text"
                                    placeholder="Percentage"
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{Percentage}</p>
                                  )}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>1</td>
                                <td>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setObjectivequestion(e.target.value);
                                      } else
                                        onChangeHandler(
                                          e.target.value,
                                          setObjectivequestion
                                        );
                                    }}
                                    style={{ width: "100px" }}
                                    type="text"
                                    placeholder="Objective question"
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{Objectivequestion}</p>
                                  )}
                                </td>
                                <td>14</td>
                                <td>23</td>
                                <td>100%</td>
                              </tr>
                              <tr>
                                <td>2</td>
                                <td>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setShortanswerQ(e.target.value);
                                      } else
                                        onChangeHandler(
                                          e.target.value,
                                          setShortanswerQ
                                        );
                                    }}
                                    style={{ width: "100px" }}
                                    type="text"
                                    placeholder="Short answer question"
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{ShortanswerQ}</p>
                                  )}
                                </td>
                                <td>14</td>
                                <td>23</td>
                                <td>100%</td>
                              </tr>

                              <tr>
                                <td>3</td>
                                <td>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setLonganswerQ(e.target.value);
                                      } else
                                        onChangeHandler(
                                          e.target.value,
                                          setLonganswerQ
                                        );
                                    }}
                                    style={{ width: "100px" }}
                                    type="text"
                                    placeholder="Long answer question"
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{LonganswerQ}</p>
                                  )}
                                </td>
                                <td>14</td>
                                <td>23</td>
                                <td>100%</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    onChange={(e) => {
                                      if (selectedLanguage == "en-t-i0-und") {
                                        setTotal(e.target.value);
                                      } else
                                        onChangeHandler(
                                          e.target.value,
                                          setTotal
                                        );
                                    }}
                                    style={{ width: "80px" }}
                                    type="text"
                                    placeholder="Total"
                                  />
                                  {selectedLanguage == "en-t-i0-und" ? (
                                    <></>
                                  ) : (
                                    <p>{Total}</p>
                                  )}
                                </td>
                                <td>
                                  <b></b>
                                </td>
                                <td>
                                  <b>12</b>
                                </td>
                                <td>
                                  <b>23</b>
                                </td>

                                <td>
                                  <b>100%</b>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </div>
                      </div>
                    </div>
                    {/* table 4  */}
                    <div className="weightage-objectives">
                      <div className="main-title">
                        <b>4.</b>
                        <input
                          type="text"
                          placeholder="According to rigor Marks distribution"
                          onChange={(e) => {
                            if (selectedLanguage == "en-t-i0-und") {
                              setAccordingRigorMrk(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setAccordingRigorMrk
                              );
                          }}
                        />
                        {selectedLanguage == "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{AccordingRigorMrk}</p>
                        )}
                      </div>
                      <div className="objectives-table">
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
                                      setSNo(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setSNo);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="S No."
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{SNo}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setLevelOfDifficult(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setLevelOfDifficult
                                      );
                                  }}
                                  style={{ width: "100px" }}
                                  type="text"
                                  placeholder="LevelOfDifficult"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{LevelOfDifficult}</p>
                                )}
                              </th>
                              <th>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setQuestions(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setQuestions
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Questions"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Questions}</p>
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
                                      setPercentage(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setPercentage
                                      );
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Percentage"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Percentage}</p>
                                )}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1</td>
                              <td>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setEasy(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setEasy);
                                  }}
                                  style={{ width: "100px" }}
                                  type="text"
                                  placeholder="Easy"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Easy}</p>
                                )}
                              </td>
                              <td>12</td>
                              <td>23</td>
                              <td>100%</td>
                            </tr>
                            <tr>
                              <td>2</td>
                              <td>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setMediumQ(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setMediumQ
                                      );
                                  }}
                                  style={{ width: "100px" }}
                                  type="text"
                                  placeholder="Medium"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{MediumQ}</p>
                                )}
                              </td>
                              <td>12</td>
                              <td>23</td>
                              <td>100%</td>
                            </tr>
                            <tr>
                              <td>3</td>
                              <td>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setDifficult(e.target.value);
                                    } else
                                      onChangeHandler(
                                        e.target.value,
                                        setDifficult
                                      );
                                  }}
                                  style={{ width: "100px" }}
                                  type="text"
                                  placeholder="Difficult"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Difficult}</p>
                                )}
                              </td>
                              <td>12</td>
                              <td>23</td>
                              <td>100%</td>
                            </tr>
                            <tr>
                              <td>
                                <input
                                  onChange={(e) => {
                                    if (selectedLanguage == "en-t-i0-und") {
                                      setTotal(e.target.value);
                                    } else
                                      onChangeHandler(e.target.value, setTotal);
                                  }}
                                  style={{ width: "80px" }}
                                  type="text"
                                  placeholder="Total"
                                />
                                {selectedLanguage == "en-t-i0-und" ? (
                                  <></>
                                ) : (
                                  <p>{Total}</p>
                                )}
                              </td>
                              <td>
                                <b></b>
                              </td>
                              <td>
                                <b>12</b>
                              </td>
                              <td>
                                <b>23</b>
                              </td>

                              <td>
                                <b>100%</b>
                              </td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* blue print 2  */}
          <div id="pdf1">
            <div style={{ fontFamily: "sans-serif" }}>
              <div
                className="blueprint2-container"
                style={{ padding: "20px 8px" }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <input
                      onChange={(e) => {
                        if (selectedLanguage == "en-t-i0-und") {
                          setTime(e.target.value);
                        } else onChangeHandler(e.target.value, setTime);
                      }}
                      style={{ width: "80px" }}
                      type="text"
                      placeholder="Time"
                    />
                    :<b>10 Minuts</b>
                    {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Time}</p>}
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        if (selectedLanguage == "en-t-i0-und") {
                          setBluePrintName(e.target.value);
                        } else
                          onChangeHandler(e.target.value, setBluePrintName);
                      }}
                      style={{ width: "80px" }}
                      type="text"
                      placeholder="BluePrint"
                    />
                    :<b>10 Minuts</b>
                    {selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{BluePrintName}</p>
                    )}
                  </div>
                  <div>
                    <input
                      onChange={(e) => {
                        if (selectedLanguage == "en-t-i0-und") {
                          setMarks(e.target.value);
                        } else onChangeHandler(e.target.value, setMarks);
                      }}
                      style={{ width: "80px" }}
                      type="text"
                      placeholder="Marks"
                    />
                    :<b>10 Minuts</b>
                    {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Marks}</p>}
                  </div>
                </div>

                <div className="asdasd_asda">
                  <Table
                    responsive
                    bordered
                    style={{ border: "1px solid", height: "32rem" }}
                  >
                    <thead>
                      <tr>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setSNo(e.target.value);
                              } else onChangeHandler(e.target.value, setSNo);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="SNo"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{SNo}</p>
                          )}
                        </th>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setTargetUnit(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setTargetUnit);
                            }}
                            style={{ width: "100px" }}
                            type="text"
                            placeholder="TargetUnit"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{TargetUnit}</p>
                          )}
                        </th>

                        <th colSpan={6} style={{ fontSize: "12px" }}>
                          Knowladge
                        </th>
                        <th colSpan={6} style={{ fontSize: "12px" }}>
                          Understanding
                        </th>
                        <th colSpan={6} style={{ fontSize: "12px" }}>
                          Expression
                        </th>
                        <th colSpan={6} style={{ fontSize: "12px" }}>
                          Appreciation
                        </th>

                        <th colSpan={6}>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setTotalQuestion(e.target.value);
                              } else
                                onChangeHandler(
                                  e.target.value,
                                  setTotalQuestion
                                );
                            }}
                            style={{ width: "100px" }}
                            type="text"
                            placeholder="TotalQuestion"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{TotalQuestion}</p>
                          )}
                        </th>
                        <th colSpan={1}>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setTotalMarks(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setTotalMarks);
                            }}
                            style={{ width: "100px" }}
                            type="text"
                            placeholder="TotalMarks"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{TotalMarks}</p>
                          )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "2px solid black" }}>
                        <th></th>
                        <th></th>

                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setV(e.target.value);
                              } else onChangeHandler(e.target.value, setV);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="V"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{V}</p>
                          )}
                        </th>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setK(e.target.value);
                              } else onChangeHandler(e.target.value, setK);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="K"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{K}</p>
                          )}
                        </th>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setD(e.target.value);
                              } else onChangeHandler(e.target.value, setD);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="D"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{D}</p>
                          )}
                        </th>
                      </tr>
                      <tr>
                        <th></th>

                        <th style={{ width: "125px", fontSize: "12px" }}></th>
                        <th style={{ fontSize: "12px" }}></th>

                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setVSA(e.target.value);
                              } else onChangeHandler(e.target.value, setVSA);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="VSA"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{VSA}</p>
                          )}
                        </th>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setSA(e.target.value);
                              } else onChangeHandler(e.target.value, setSA);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="SA"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{SA}</p>
                          )}
                        </th>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setLA1(e.target.value);
                              } else onChangeHandler(e.target.value, setLA1);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="LA1"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{LA1}</p>
                          )}
                        </th>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setLA2(e.target.value);
                              } else onChangeHandler(e.target.value, setLA2);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="LA2"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{LA2}</p>
                          )}
                        </th>
                        <th>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setLA3(e.target.value);
                              } else onChangeHandler(e.target.value, setLA3);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="LA3"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{LA3}</p>
                          )}
                        </th>
                        <th></th>
                      </tr>

                      <tr>
                        <td></td>
                        <td>
                          <input
                            onChange={(e) => {
                              if (selectedLanguage == "en-t-i0-und") {
                                setTotal(e.target.value);
                              } else onChangeHandler(e.target.value, setTotal);
                            }}
                            style={{ width: "80px" }}
                            type="text"
                            placeholder="Total"
                          />
                          {selectedLanguage == "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{Total}</p>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <span>
                      <input
                        onChange={(e) => {
                          if (selectedLanguage == "en-t-i0-und") {
                            setNote(e.target.value);
                          } else onChangeHandler(e.target.value, setNote);
                        }}
                        style={{ width: "80px" }}
                        type="text"
                        placeholder="Note"
                      />
                      :-
                      {selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Note}</p>
                      )}
                    </span>
                    <p>Blue Print Instruction</p>
                  </div>
                  <button
                    onClick={AddBluePrintHeader}
                    className="admin-add-btn mt-4"
                  >
                    Add Headers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BluePrintHeaderAdd;

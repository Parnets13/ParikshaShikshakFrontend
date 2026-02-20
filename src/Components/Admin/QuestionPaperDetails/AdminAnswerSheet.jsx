import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import parse from "html-react-parser";
import { LuPrinter } from "react-icons/lu";
import { Button, Table } from "react-bootstrap";
function AdminAnswerSheet({ state2, Questions }) {
  // const admin = JSON.parse(localStorage.getItem("admin"));
  const adminFromSession = JSON.parse(localStorage.getItem("admin"));
  const userFromSession = JSON.parse(localStorage.getItem("user"));

  let admin;
  if (adminFromSession) {
    admin = adminFromSession;
  } else if (userFromSession) {
    admin = userFromSession;
  }
  const token = localStorage.getItem("token");
  // const { state } = useLocation();
  const state = state2 || {}
  const navigate = useNavigate();

  const ViewTableCell = ({ value, onChange }) => {
    return <td>{value}</td>;
  };

  let count3 = 1;
  const SectionArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
 const RomanAA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X","XI","XII","XIII","XIV","XV","XVI"];



  // const getgenratedData = async () => {
  //   try {
  //     const config = {
  //       url: "/teacher/getGenQuestionById/" + state?._id + "/" + admin?._id||"1234",
  //       baseURL: "http://localhost:8774/api",
  //       method: "get",
  //       headers: {
  //         "content-type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //     };
  //     let res = await axios(config);
  //     if (res.status === 200) {
  //       setQuestions(res.data.success?.Questions);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return swal({
  //       title: "Oops!",
  //       text: error.response.data.error,
  //       icon: "error",
  //       button: "Ok!",
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if ( state) {
  //     getgenratedData();
  //   }
  // }, [token, state]);

  const [QuestionHeader, setQuestionHeader] = useState([]);
  const getQuestionHeaderbyMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
        state?.Medium +
        "/" +
        admin?._id || "1234",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setQuestionHeader(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestionHeaderbyMedium();
  }, []);
  // console.log("QuestionHeader", QuestionHeader);
  
  // Debug: Log all questions and RelationShip Words questions
  console.log("=== AdminAnswerSheet DEBUG ===");
  console.log("All Questions:", Questions);
  const relationshipQs = Questions?.filter(q => q?.Types_Question === "RelationShip Words Questions");
  console.log("RelationShip Words Questions:", relationshipQs);
  relationshipQs?.forEach((q, i) => {
    console.log(`RelationShip Q${i+1}:`, {
      Types_Question: q?.Types_Question,
      RealetionA: q?.RealetionA,
      RealetionB: q?.RealetionB,
      RealetionC: q?.RealetionC,
      Answer: q?.Answer
    });
  });
  
  return (
    <div style={{ textAlign: "center" }} className="">
      <div
        // id="pdf-content"
        className="question-paper-display"
        style={{ border: "none" }}
      >
        <div className="a4-page" >
          <div style={{ border: "2px solid black", padding: "5px" }}>
            <h6>
              <b>
                {state?.Institute_Name} {state?.SchoolAddress}
              </b>
            </h6>

            <h6>
              <b>{state?.bluePrint?.blName}</b>
            </h6>
            <h6>
              <b>{state?.subjects}</b>
            </h6>
            <h6>
              <b>{state?.Subject}</b>
            </h6>
            {/* <h4>
                        <b>{state?.bluePrint?.blName}</b>
                      </h4> */}
          </div>

          <div style={{ fontWeight: "bold", border: "2px solid black" }}>
            <div className="time-and-marks">
              <div>
                {QuestionHeader?.time} :{state?.bluePrint?.DurationOfExam}
              </div>
              {/* <div>ಉತ್ತರ ಸೂಚಿ</div> */}
              <div>{QuestionHeader?.answerheader}</div>
              <div>{state?.Sub_Class}</div>
              <div>
                {QuestionHeader?.marks} :{" "}
                {state?.bluePrint?.TotalDifficultMask}
              </div>
            </div>
            <b>
              <div className="ans-line mb-3 mt-2"></div>
            </b>
          </div>
          <main style={{ flex: "1" }}>
            {state?.bluePrint?.TypesofQuestions?.map((ele1, a) => {
              return (
                <>
                  <div className="question-body-main">
                    <div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <b>{RomanAA[a]}</b>
                        <b style={{ textAlign: "left" }}>
                          {" "}
                          {ele1?.QAInstruction}
                        </b>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      <b>
                        {ele1?.NQA}x{ele1?.Mask}={ele1?.NQA * ele1?.Mask}
                      </b>
                    </div>
                  </div>

                  {Questions?.filter(
                    (ele) => ele?.Types_Question === ele1?.QAType
                  )?.map((item, i) => {
                    if (i < Number(ele1?.NQA)) {
                      return (
                        <div className="question-body">
                          {item?.Types_Question ===
                            "Objective Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div
                                    style={{
                                      display: "flex",
                                      gap: "12px",
                                    }}
                                    key={i}
                                  >
                                    <b>{count3++}</b>
                                    <p style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </p>
                                  </div>
                                  {item?.Image_Ans ? (
                                    <>
                                      <h4>(OR)</h4>
                                      <div>
                                        {item?.Image_Ans ? (
                                          <>
                                            <b>Answer Image:</b>
                                            <div>
                                              <img
                                                src={`${item?.Image_Ans}`}
                                                style={{
                                                  width: "174px",
                                                  height: "98px",
                                                  border: "groove",
                                                }}
                                                alt="answer img"
                                              />
                                            </div>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Multiple Choice Questions" ? (
                            <div className="d-flex justify-content-between">
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: "12px",
                                  }}
                                  key={i}
                                >
                                  <b>{count3++}</b>
                                  <b style={{ width: "90%" }}>
                                    {item?.Answer
                                      ? parse(item?.Answer)
                                      : ""}
                                  </b>
                                </div>
                                {item?.Image_Ans ? (
                                  <>
                                    <h4>(OR)</h4>
                                    <div>
                                      {item?.Image_Ans ? (
                                        <>
                                          <b>Answer Image:</b>
                                          <div>
                                            <img
                                              src={`${item?.Image_Ans}`}
                                              style={{
                                                width: "174px",
                                                height: "98px",
                                                border: "groove",
                                              }}
                                              alt="answer img"
                                            />
                                          </div>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                              <div>{ele1?.Mask}</div>
                            </div>
                          ) : (
                            ""
                          )}
                          {item?.Types_Question === "Match the Following Questions" ? (
                            <>
                              {console.log("Mapped Answer Pairs:", {
                                questionId: item?._id,
                                mappedPairs: [
                                  { partA: item?.Part_A1, partB: item?.Part_B1_A },
                                  { partA: item?.Part_A2, partB: item?.Part_B2_A },
                                  { partA: item?.Part_A3, partB: item?.Part_B3_A },
                                  { partA: item?.Part_A4, partB: item?.Part_B4_A },
                                  { partA: item?.Part_A5, partB: item?.Part_B5_A }
                                ].filter(pair => pair.partA && pair.partB),
                                marks: ele1?.Mask
                              })}

                              <div className="d-flex justify-content-between">
                                <div>
                                  <div style={{ width: "100%" }}>
                                    <Table bordered>
                                      <thead>
                                        <tr>
                                          <th> Questions</th>
                                          <th></th>
                                          <th>Answers</th>
                                        </tr>
                                      </thead>
                                      <tbody>

                                        {item?.Part_A1 && item?.Part_B1_A && (
                                          <tr>
                                            <td>{count3++}. {item?.Part_A1}</td>
                                            <td>→</td>
                                            <td>{item?.Part_B1_A}</td>
                                          </tr>
                                        )}


                                        {item?.Part_A2 && item?.Part_B2_A && (
                                          <tr>
                                            <td>{count3++}. {item?.Part_A2}</td>
                                            <td>→</td>
                                            <td>{item?.Part_B2_A}</td>
                                          </tr>
                                        )}


                                        {item?.Part_A3 && item?.Part_B3_A && (
                                          <tr>
                                            <td>{count3++}. {item?.Part_A3}</td>
                                            <td>→</td>
                                            <td>{item?.Part_B3_A}</td>
                                          </tr>
                                        )}


                                        {item?.Part_A4 && item?.Part_B4_A && (
                                          <tr>
                                            <td>{count3++}. {item?.Part_A4}</td>
                                            <td>→</td>
                                            <td>{item?.Part_B4_A}</td>
                                          </tr>
                                        )}

                                        {/* Row 5 - Empty if no data */}
                                        {item?.Part_A5 && item?.Part_B5_A && (
                                          <tr>
                                            <td>{count3++}. {item?.Part_A5}</td>
                                            <td>→</td>
                                            <td>{item?.Part_B5_A}</td>
                                          </tr>
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : null}



                          {item?.Types_Question === "One Word Question" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex ">
                                    <b>{count3++}.</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "One Sentence Answer Question" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}.</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Two  Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Two and three Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}.</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Three and Four Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}.</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Five and Six Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Six Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Seven Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Eight Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Ten Sentence Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question === "Map Reading" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex mt-2">
                                  <b>{count3++}).</b>
                                  <b style={{ width: "90%" }}>
                                    {item?.Answer
                                      ? parse(item?.Answer)
                                      : ""}
                                  </b>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Classifications of Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex ">
                                    <b>{count3++}.</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Odd and out words Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  {item?.Image_Ans ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.Image_Ans ? (
                                    <>
                                      <div>
                                        {item?.Image_Ans ? (
                                          <>
                                            <b>Answer Image:</b>
                                            <div>
                                              <img
                                                src={`${item?.Image_Ans}`}
                                                style={{
                                                  width: "174px",
                                                  height: "98px",
                                                  border: "groove",
                                                }}
                                                alt="answer img"
                                              />
                                            </div>
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                        <br />
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question === "Grammer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  <div className="row">
                                    <Table
                                      responsive
                                      bordered
                                      style={{
                                        width: "-webkit-fill-available",
                                      }}
                                    >
                                      <tbody>
                                        {item?.GrammerArrQ?.map(
                                          (row, rowIndex) => (
                                            <tr key={rowIndex}>
                                              {row.map(
                                                (cell, cellIndex) => (
                                                  <ViewTableCell
                                                    key={cellIndex}
                                                    className="vi_0"
                                                    value={cell}
                                                  />
                                                )
                                              )}
                                            </tr>
                                          )
                                        )}
                                      </tbody>
                                    </Table>
                                  </div>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Expanding and Explanations Answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>

                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orAnswer ? (
                                    <>
                                      <div>
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                        <br />
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question === "Graph Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                  <div>
                                    {item?.Image_Ans ? (
                                      <>
                                        <div>
                                          <img
                                            src={`${item?.Image_Ans}`}
                                            style={{
                                              width: "174px",
                                              height: "98px",
                                              border: "groove",
                                            }}
                                            alt="answer img"
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    <br />
                                  </div>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Poet,Time, Place, Writer answer questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question === "Letter Writting" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}).</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Situation UnderStatnding answer Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}.</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "Fill in the Blanks Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div className="d-flex ">
                                  <b>{count3++}.</b>
                                  <b style={{ width: "90%" }}>
                                    {item?.Answer
                                      ? parse(item?.Answer)
                                      : ""}
                                  </b>
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question ===
                            "RelationShip Words Questions" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="d-flex mt-2">
                                    <b>{count3++}.</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.RealetionA} : {item?.RealetionB} :: {item?.RealetionC} : {item?.Answer ? parse(item?.Answer) : ""}
                                    </b>
                                  </div>
                                  {item?.orAnswer ? (
                                    <>
                                      <h5>(OR)</h5>
                                      <div className="d-flex mt-2">
                                        <b>
                                          {item?.orAnswer
                                            ? parse(item?.orAnswer)
                                            : ""}
                                        </b>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                          {item?.Types_Question === "Complete the Poem" ? (
                            <>
                              <div className="d-flex justify-content-between">
                                <div className="col-sm-6">
                                  <div className="d-flex ">
                                    <b>{count3++}</b>
                                    <b style={{ width: "90%" }}>
                                      {item?.Answer
                                        ? parse(item?.Answer)
                                        : ""}
                                    </b>
                                  </div>
                                </div>

                                <div>{ele1?.Mask}</div>
                              </div>
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      );
                    }
                  })}
                </>
              );
            })}

            <br />
          </main>
        </div>
      </div>
    </div>
  );
}

export default AdminAnswerSheet;

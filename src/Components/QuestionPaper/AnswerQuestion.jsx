import React, { useState, useRef, useEffect } from "react";
import "../QuestionPaper/QuestionPaper.css";
// import "../BluePrint/BluePrint.css";
import { CiSaveDown2 } from "react-icons/ci";
import { LuPrinter } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import { Button, Form, Row, Table } from "react-bootstrap";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import parse from "html-react-parser";
import Frontpage from "../fontpage/Frontpage";
import axios from "axios";
import swal from "sweetalert";

function AnswerQuestion() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { state } = useLocation();

  const ViewTableCell = ({ value, onChange }) => {
    return <td>{value}</td>;
  };
  const [Questions, setQuestions] = useState([]);
  let count3 = 1;
  const SectionArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const RomanAA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  const handlePrint = () => {
    const printableContent =
      document.getElementById("printable-content").innerHTML;
    const originalContent = document.body.innerHTML;
    // Create a footer element with padding
    const footerContent = '<div style="padding-bottom: 50px;"></div>';
    // Replace the content of the body with the content of the printable section
    document.body.innerHTML = printableContent;
    // Print the content
    window.print();
    // Restore the original content
    document.body.innerHTML = originalContent;
    setTimeout(() => {
      return window.location.reload();
    }, 1000);
  };

  const getgenratedData = async () => {
    try {
      const config = {
        url: "/teacher/getGenQuestionById/" + state?._id + "/" + user?._id,
        baseURL: "http://localhost:8774/api",
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        const questionsData = res.data.success?.Questions;
        console.log("=== DEBUG: All Questions fetched ===", questionsData);
        
        // Debug: Log RelationShip Words Questions specifically
        const relationshipQuestions = questionsData?.filter(q => q?.Types_Question === "RelationShip Words Questions");
        console.log("=== DEBUG: RelationShip Words Questions ===", relationshipQuestions);
        
        // Debug: Log each relationship question's fields
        relationshipQuestions?.forEach((q, i) => {
          console.log(`RelationShip Q${i+1}:`, {
            Types_Question: q?.Types_Question,
            RealetionA: q?.RealetionA,
            RealetionB: q?.RealetionB,
            RealetionC: q?.RealetionC,
            Answer: q?.Answer,
            Question: q?.Question
          });
        });
        
        setQuestions(questionsData);
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
    if (token && state) {
      getgenratedData();
    }
  }, [token, state]);

  const [QuestionHeader, setQuestionHeader] = useState([]);
  const getQuestionHeaderbyMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
          state?.Medium +
          "/" +
          user?._id,
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
  console.log("QuestionHeader", QuestionHeader);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9"></div>
        <div className="col-md-3">
          <LuPrinter
            style={{ width: "22px", height: "40px" }}
            onClick={handlePrint}
          />
        </div>
      </div>
      <div id="printable-content" class="print-area">
        <div style={{ textAlign: "center" }}>
          <div
            id="pdf-content"
            className="question-paper-display"
            style={{ border: "2px solid black" }}
          >
            <div className="englishqp-page-body">
              <div>
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

              <div style={{ fontWeight: "bold" }}>
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
                  // Debug: Log each section type and filtered questions
                  const filteredQs = Questions?.filter((ele) => ele?.Types_Question === ele1?.QAType);
                  console.log(`=== Section ${RomanAA[a]}: ${ele1?.QAType} ===`, {
                    QAType: ele1?.QAType,
                    filteredCount: filteredQs?.length,
                    filteredQuestions: filteredQs
                  });
                  
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
      </div>
    </div>
  );
}

export default AnswerQuestion;

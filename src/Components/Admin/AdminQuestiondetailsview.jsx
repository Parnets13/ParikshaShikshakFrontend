import React, { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import "../Admin/Admin.css";
import swal from "sweetalert";
import axios from "axios";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const ViewTableCell = ({ value, onChange }) => {  
  return <td>{value}</td>;
};
const AdminQuestionDetailsview = () => {
  const { question_Id } = useParams();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [question_details, setquestion_details] = useState([]);
  // const [first, setfirst] = useState(second)

  const [Dash, setDash] = useState("2");

  const getquestionbyid = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/getQuestionpaperadminbyid/${question_Id}`
      );
      if (res.status == 200) {
        setquestion_details(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getquestionbyid();
    setDash(question_details.Dash || "");
  }, []);

  return (
    <div>
      <div className="box_1">
        <div className="container">
          <div className="row">
            <div className="text-align-center gradient-background">
              <span className="blinking">
                <h4 className="glow-text">
                  <b>{question_details?.Types_Question}</b>
                </h4>
              </span>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Section</label>
                <p className="vi_0">{question_details?.Section}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Examination Board</label>
                <p className="vi_0">{question_details?.Board}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Medium</label>
                <p className="vi_0">{question_details?.Medium}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Class</label>
                <p className="vi_0">{question_details?.Class}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Sub-Class</label>
                <p className="vi_0">{question_details?.Sub_Class}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Subject</label>
                <p className="vi_0">{question_details?.Subject}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Lesson</label>
                <p className="vi_0">{question_details?.Lesson}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Chapter Name</label>
                <p className="vi_0">{question_details?.Chapter_Name}</p>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Difficulty Level</label>
                <p className="vi_0">{question_details?.Difficulty_level}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Types of the Question</label>
              </div>{" "}
              <p className="vi_0">
                {question_details?.Types_QuestionTranslate
                  ? question_details?.Types_QuestionTranslate
                  : question_details?.Types_Question}
              </p>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Name Of the Examination</label>
                <p className="vi_0">
                  {question_details?.Name_of_examination?.map((item) => (
                    <span>{item?.NameExamination} </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Objectives</label>
                <p className="vi_0">{question_details?.Objectives}</p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="do-sear">
                <label htmlFor="">Instructions</label>
                <p className="vi_0">
                  {question_details?.Instruction
                    ? parse(question_details?.Instruction)
                    : ""}
                </p>
              </div>
            </div>
            {question_details?.Types_Question ===
              "Odd and out words Questions" ||
            question_details?.Types_Question ===
              "Match the Following Questions" ||
            question_details?.Types_Question ===
              "Recorrect the Answers Questions" ||
            question_details?.Types_Question ===
              "Recorrect the Answers Questions" ||
            question_details?.Types_Question ===
              "RelationShip Words Questions" ||
            question_details?.Types_Question ===
              "Expanding and Explanations Answer Questions" ||
            question_details?.Types_Question ===
              "Fill in the Blanks Questions" ? (
              <> </>
            ) : (
              <>
                <div className="col-md-12">
                  <div className="do-sear mt-2">
                    <label htmlFor="">Question</label>
                    <p className="vi_0">
                      {question_details?.Question
                        ? parse(question_details?.Question)
                        : ""}
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* GarmmerQuestion */}
            {question_details?.Types_Question === "Grammer Questions" ? (
              <>
                <div className="row">
                  <p>Question : </p>
                  <Table
                    responsive
                    bordered
                    style={{ width: "-webkit-fill-available" }}
                  >
                    <tbody>
                      {question_details?.GrammerArrQ?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <ViewTableCell
                              key={cellIndex}
                              className="vi_0"
                              value={cell}
                            />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <p>Answer : </p>
                  <Table
                    responsive
                    bordered
                    style={{ width: "-webkit-fill-available" }}
                  >
                    <tbody>
                      {question_details?.GrammerArrAns?.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, cellIndex) => (
                            <ViewTableCell
                              key={cellIndex}
                              className="vi_0"
                              value={cell}
                            />
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Fill In the Blanks */}
            {question_details?.Types_Question ===
            "Fill in the Blanks Questions" ? (
              <>
                {question_details?.NumberOfLine == "2" ? (
                  <>
                    <div className="col-md-9 d-flex align-items-end">
                      <div className="do-sear ">
                        <label htmlFor="">Fill in the blanks</label> <br />
                        <div className="d-flex gap-1">
                          <p className="vi_0">
                            {parse(`<div>${question_details?.input1}</div>`)}
                          </p>
                          <span className="mt-3">___________</span>
                          <p className="vi_0">
                            {parse(`<div>${question_details?.input2}</div>`)}
                          </p>
                          <span className="mt-3">___________</span>
                          <p className="vi_0">
                            {parse(`<div>${question_details?.input3}</div>`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.NumberOfLine == "1" ? (
                  <>
                    <div className="col-md-9 d-flex align-items-end">
                      <div className="do-sear ">
                        <label htmlFor="">Fill in the blanks</label> <br />
                        <div className="d-flex gap-1">
                          <p className="vi_0">
                            {parse(`<div>${question_details?.input1}</div>`)}
                          </p>
                          <span className="mt-3">___________</span>
                          <p className="vi_0">
                            {parse(`<div>${question_details?.input2}</div>`)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* Letter Writing */}
            {question_details?.Types_Question === "Letter Writting" ||
            question_details?.Types_Question === "Map Reading" ? (
              <>
                <div className="col-8">
                  {question_details?.NumberOfLine === "1" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "2" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "3" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "4" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "5" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "6" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "7" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "8" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "9" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {question_details?.Image_1 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Question Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_1}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Image_2 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Answer Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_2}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Answer</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Answer}</div>`)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Expand and Explain*/}
            {question_details?.Types_Question ===
            "Expanding and Explanations Answer Questions" ? (
              <>
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Question</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.Question}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Answer</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.Answer}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  {question_details?.NumberOfLine === "1" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-5">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "2" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "3" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "4" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "5" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "6" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "7" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "8" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "9" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_1 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_1}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_2 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image Answer</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_2}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Question</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.orQuestion}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Answer</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.orAnswer}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* One word */}
            {question_details?.Types_Question === "One Word Question" ||
            question_details?.Types_Question ===
              "One Sentence Answer Question" ||
            question_details?.Types_Question ===
              "Two  Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Two and three Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Three and Four Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Five and Six Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Six Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Seven Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Eight Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Ten Sentence Answer Questions" ? (
              <>
                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Answer</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.Answer}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
                <div className="col-8">
                  {question_details?.NumberOfLine === "1" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "2" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "3" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "4" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "5" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "6" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "7" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "8" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "9" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_1 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_1}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_2 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image Answer</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_2}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Question</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.orQuestion}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear ">
                    <label htmlFor="">Answer</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.orAnswer}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* RelationShip Words Questions */}
            {question_details?.Types_Question ===
            "RelationShip Words Questions" ? (
              <>
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image ? (
                      <>
                        <div className="col-md-12">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <div className="col-md-3">
                  <div className="do-sear ">
                    <label htmlFor="">Realetion_A</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.RealetionA}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="do-sear">
                    <label htmlFor="">Realetion_B</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.RealetionA}</div>`)}
                      </p>
                      <p className="m-2">::</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="do-sear">
                    <label htmlFor="">Realetion_C</label> <br />
                    <div className="d-flex">
                      <p className="vi_0">
                        {parse(`<div>${question_details?.RealetionA}</div>`)}
                      </p>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="do-sear">
                    <p
                      className=""
                      style={{
                        borderBottom: "1px solid",
                        marginTop: "60px",
                        marginBottom: "0px",
                      }}
                    ></p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="do-sear">
                    <label htmlFor="">Option 1</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_1}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="do-sear">
                    <label htmlFor="">Option 2</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_2}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="do-sear">
                    <label htmlFor="">Option 3</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_3}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="do-sear">
                    <label htmlFor="">Option 4</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_4}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Answer</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Answer}</div>`)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Classificatio of question */}
            {question_details?.Types_Question ===
            "Classifications of Questions" ? (
              <>
                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Answer</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Answer}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-8">
                  {question_details?.NumberOfLine === "1" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "2" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "3" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "4" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "5" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "6" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "7" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "8" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "9" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_1 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_1}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_2 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image Answer</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_2}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Question</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.orQuestion}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Answer</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.orAnswer}</div>`)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Recorrect the following */}
            {question_details?.Types_Question ===
            "Recorrect the Answers Questions" ? (
              <>
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.ImageQ ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.ImageQ}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.orImage_Ans ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image Answer</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.orImage_Ans}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Question</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Question}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Answer</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Answer}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-8">
                  {question_details?.NumberOfLine === "1" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "2" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "3" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "4" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "5" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "6" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "7" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "8" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "9" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_1 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_1}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                {question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_2 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Image Answer</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_2}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Question</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.orQuestion}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Answer</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.orAnswer}</div>`)}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Multiple choice questions */}
            {question_details?.Types_Question ===
            "Multiple Choice Questions" ? (
              <>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 1</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_1}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 2</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_2}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 3</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_3}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 4</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_4}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 5</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_5}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 6</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_6}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear mt-2">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Answer</label>
                      <p className="vi_0">
                        {question_details?.Answer
                          ? parse(question_details?.Answer)
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
                {question_details?.Types_Question ===
                  "Recorrect the Answers Questions" ||
                question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.ImageQ ? (
                      <>
                        <div className="col-md-12">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.ImageQ}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Image_1 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option1 Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_1}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Image_2 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option2 Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_2}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Image_3 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option3 Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_3}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Image_4 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option4 Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_4}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Image_5 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option5 Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_5}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Image_6 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option6 Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_6}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Types_Question ===
                  "Multiple Choice Questions" ||
                question_details?.Types_Question ===
                  "Recorrect the Answers Questions" ||
                question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_Ans ? (
                      <>
                        <div className="col-md-12">
                          <div className="do-sear">
                            <label htmlFor="">Image question</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_Ans}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}

            {/* Match the following */}
            {question_details?.Types_Question ===
            "Match the Following Questions" ? (
              <>
                <div className="col-12">
                  <label htmlFor=""> Questions</label>
                  <Table
                    responsive
                    bordered
                    size="sm"
                    style={{ textAlign: "center" }}
                  >
                    <thead style={{ backgroundColor: "orange" }}>
                      <tr>
                        <th>PART A</th>
                        <th>PART B</th>
                        <th>PART C</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{question_details?.Part_A1}</td>
                        <td>{question_details?.Part_B1}</td>
                        <td>{question_details?.Part_C1}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A2}</td>
                        <td>{question_details?.Part_B2}</td>
                        <td>{question_details?.Part_C2}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A3}</td>
                        <td>{question_details?.Part_B3}</td>
                        <td>{question_details?.Part_C3}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A4}</td>
                        <td>{question_details?.Part_B4}</td>
                        <td>{question_details?.Part_C4}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A5}</td>
                        <td>{question_details?.Part_B5}</td>
                        <td>{question_details?.Part_C5}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A6}</td>
                        <td>{question_details?.Part_B6}</td>
                        <td>{question_details?.Part_C6}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>{question_details?.Part_B7}</td>
                        <td>{question_details?.Part_C7}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>

                <div className="col-12">
                  <label htmlFor=""> Answer</label>
                  <Table
                    responsive
                    bordered
                    size="sm"
                    style={{ textAlign: "center" }}
                  >
                    <thead style={{ backgroundColor: "orange" }}>
                      <tr>
                        <th>PART A</th>
                        <th>PART B</th>
                        <th>PART C</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>{question_details?.Part_A1_A}</td>
                        <td>{question_details?.Part_B1_A}</td>
                        <td>{question_details?.Part_C1_A}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A2_A}</td>
                        <td>{question_details?.Part_B2_A}</td>
                        <td>{question_details?.Part_C2_A}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A3_A}</td>
                        <td>{question_details?.Part_B3_A}</td>
                        <td>{question_details?.Part_C3_A}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A4_A}</td>
                        <td>{question_details?.Part_B4_A}</td>
                        <td>{question_details?.Part_C4_A}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A5_A}</td>
                        <td>{question_details?.Part_B5_A}</td>
                        <td>{question_details?.Part_C5_A}</td>
                      </tr>
                      <tr>
                        <td>{question_details?.Part_A6_A}</td>
                        <td>{question_details?.Part_B6_A}</td>
                        <td>{question_details?.Part_C6_A}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </>
            ) : (
              <></>
            )}

            {/* Objective Type */}
            {question_details?.Types_Question ===
            "Match the Following Questions" ? (
              <></>
            ) : (
              <>
                {question_details?.Types_Question === "Objective Questions" ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option 1</label> <br />
                        <p className="vi_0">
                          {parse(`<div>${question_details?.Option_1}</div>`)}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Option 2</label> <br />
                        <p className="vi_0">
                          {parse(`<div>${question_details?.Option_2}</div>`)}
                        </p>
                      </div>
                    </div>
                    <div className="do-sear mt-2">
                      <label htmlFor="">Answer</label>
                      <p className="vi_0">
                        {question_details?.Answer
                          ? parse(question_details?.Answer)
                          : ""}
                      </p>
                    </div>
                    {question_details?.ImageQ ? (
                      <>
                        <div className="col-md-12">
                          <div className="do-sear">
                            <label htmlFor="">Question Image</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.ImageQ}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {question_details?.Image_1 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Option 1 Image</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_1}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {question_details?.Image_2 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Option 2 Image</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_2}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                    {question_details?.Image_Ans ? (
                      <>
                        <div className="col-md-12">
                          <div className="do-sear">
                            <label htmlFor="">Answer Image</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_Ans}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            {/* Odd and Out */}
            {question_details?.Types_Question ===
            "Odd and out words Questions" ? (
              <>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 1</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_1}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 2</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_2}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 3</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_3}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear">
                    <label htmlFor="">Option 4</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Option_4}</div>`)}
                    </p>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="do-sear">
                    <label htmlFor="">Answer</label> <br />
                    <p className="vi_0">
                      {parse(`<div>${question_details?.Answer}</div>`)}
                    </p>
                  </div>
                </div>
                {question_details?.Types_Question === "Objective Questions" ||
                question_details?.Types_Question ===
                  "Multiple Choice Questions" ||
                question_details?.Types_Question ===
                  "Recorrect the Answers Questions" ||
                question_details?.Types_Question ===
                  "Classifications of Questions" ||
                question_details?.Types_Question === "One Word Question" ||
                question_details?.Types_Question ===
                  "Expanding and Explanations Answer Questions" ||
                question_details?.Types_Question === "Map Reading" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_1 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Question Image 1</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_1}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Types_Question === "Objective Questions" ||
                question_details?.Types_Question ===
                  "Multiple Choice Questions" ||
                question_details?.Types_Question ===
                  "Recorrect the Answers Questions" ||
                question_details?.Types_Question ===
                  "Classifications of Questions" ||
                question_details?.Types_Question === "One Word Question" ||
                question_details?.Types_Question ===
                  "Expanding and Explanations Answer Questions" ||
                question_details?.Types_Question === "Map Reading" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_2 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Question Image 2</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_2}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Types_Question === "Objective Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_3 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Question Image 3</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_3}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                {question_details?.Types_Question === "Objective Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_4 ? (
                      <>
                        <div className="col-md-6">
                          <div className="do-sear">
                            <label htmlFor="">Question Image 4</label> <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_4}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}

                {question_details?.Types_Question === "Objective Questions" ||
                question_details?.Types_Question ===
                  "One Sentence Answer Question" ||
                question_details?.Types_Question ===
                  "Two  Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Two and three Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Three and Four Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Five and Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Six Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Seven Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Eight Sentence Answer Questions" ||
                question_details?.Types_Question ===
                  "Ten Sentence Answer Questions" ? (
                  <></>
                ) : (
                  <>
                    {question_details?.Image_Ans ? (
                      <>
                        <div className="col-md-12">
                          <div className="do-sear">
                            <label htmlFor="">Question Image Answer</label>{" "}
                            <br />
                            <img
                              className="img-fluid h-50"
                              src={`${question_details?.Image_Ans}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            ) : (
              <></>
            )}

            {/* Poet,Time,Place ,Writer */}
            {question_details?.Types_Question ===
            "Poet,Time, Place, Writer answer questions" ? (
              <>
                <div className="col-md-4">
                  <div className="do-sear mt-2">
                    <label htmlFor="">Select Number of Line</label>
                    <p className="vi_0" aria-label="Default select example">
                      {question_details?.NumberOfLine}
                    </p>
                  </div>
                </div>

                <div className="col-8">
                  {question_details?.NumberOfLine === "1" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "2" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "3" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "4" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "5" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "6" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "7" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "8" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "9" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
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

            {/* Situation And Understanding Question And Answer */}
            {question_details?.Types_Question ===
            "Situation UnderStatnding answer Questions" ? (
              <>
                <div className="col-12">
                  {question_details?.NumberOfLine === "1" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "2" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "3" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "4" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "5" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "6" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "7" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "8" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                  {question_details?.NumberOfLine === "9" ? (
                    <>
                      <div className="col-md-12">
                        <div className="do-sear mt-4">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>{" "}
                      <div className="col-md-12">
                        <div className="do-sear mt-2">
                          <p type="text" className="lined-input"></p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                {question_details?.Image_1 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Question Image 1</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_1}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.Image_2 ? (
                  <>
                    <div className="col-md-6">
                      <div className="do-sear">
                        <label htmlFor="">Question Image 2</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_2}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {question_details?.PassiveQuesion?.length ? (
                  <>
                    <div className="col-md-12">
                      <div className="do-sear">
                        <label htmlFor=""> Sub Questions</label> <br />
                        {question_details?.PassiveQuesion?.map((item, i) => {
                          return (
                            <p className="vi_0">
                              {parse(`<div>${item?.question}</div>`)}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* Complete The Poem */}
            {question_details?.Types_Question === "Complete the Poem" ? (
              <>
                <div className="col-md-4">
                  <div className="do-sear mt-2">
                    <label htmlFor=""> Poem Line</label>
                    <p className="vi_0">{question_details?.NumberOfLine}</p>
                  </div>
                </div>
                {question_details?.PoemSt ? (
                  <>
                    {question_details.NumberOfLine === "4" ? (
                      <>
                        <div className="col-md-8">
                          <label htmlFor=""> Write Poem </label>
                          <div className="d-flex align-items-end">
                            <p className="vi_0">{question_details?.PoemSt}</p>
                            <div className="ans-line mb-3 mt-2"></div>
                          </div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="d-flex align-items-end">
                            <div className="ans-line mb-3 mt-2"></div>
                            <p className="vi_0">{question_details?.PoemEnd}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                    {question_details.NumberOfLine === "5" ? (
                      <>
                        <div className="col-md-8">
                          <label htmlFor=""> Write Poem </label>
                          <div className="d-flex align-items-end">
                            <p className="vi_0">{question_details?.PoemSt}</p>
                            <div className="ans-line mb-3 mt-2"></div>
                          </div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="d-flex align-items-end">
                            <div className="ans-line mb-3 mt-2"></div>
                            <p className="vi_0">{question_details?.PoemEnd}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                    {question_details.NumberOfLin === "6" ? (
                      <>
                        <div className="col-md-8">
                          <label htmlFor=""> Write Poem </label>
                          <div className="d-flex align-items-end">
                            <p className="vi_0">{question_details?.PoemSt}</p>
                            <div className="ans-line mb-3 mt-2"></div>
                          </div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="d-flex align-items-end">
                            <div className="ans-line mb-3 mt-2"></div>
                            <p className="vi_0">{question_details?.PoemEnd}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                    {question_details.NumberOfLin === "7" ? (
                      <>
                        <div className="col-md-8">
                          <label htmlFor=""> Write Poem </label>
                          <div className="d-flex align-items-end">
                            <p className="vi_0">{question_details?.PoemSt}</p>
                            <div className="ans-line mb-3 mt-2"></div>
                          </div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="ans-line mb-3 mt-2"></div>
                          <div className="d-flex align-items-end">
                            <div className="ans-line mb-3 mt-2"></div>
                            <p className="vi_0">{question_details?.PoemEnd}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <> </>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}

            {/* Answer The Question And Draw The Figure */}
            {question_details?.Types_Question ===
              "Odd and out words Questions" ||
            question_details?.Types_Question === "Objective Questions" ? (
              <></>
            ) : (
              <>
                {question_details?.Image_Ans ? (
                  <>
                    <div className="col-md-12">
                      <div className="do-sear">
                        <label htmlFor="">Answer Image</label> <br />
                        <img
                          className="img-fluid h-50"
                          src={`${question_details?.Image_Ans}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Time</label>
                <p className="vi_0">{question_details?.Answer_Time}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <p className="vi_0">{question_details?.Marks}</p>
              </div>
            </div>
            {question_details?.Types_Question ===
              "Odd and out words Questions" ||
            question_details?.Types_Question === "Objective Questions" ||
            question_details?.Types_Question ===
              "Match the Following Questions" ||
            question_details?.Types_Question === "Multiple Choice Questions" ||
            question_details?.Types_Question ===
              "Recorrect the Answers Questions" ||
            question_details?.Types_Question ===
              "Classifications of Questions" ||
            question_details?.Types_Question ===
              "RelationShip Words Questions" ||
            question_details?.Types_Question === "One Word Question" ||
            question_details?.Types_Question ===
              "Expanding and Explanations Answer Questions" ||
            question_details?.Types_Question === "Letter Writting" ||
            question_details?.Types_Question === "Map Reading" ||
            question_details?.Types_Question ===
              "One Sentence Answer Question" ||
            question_details?.Types_Question ===
              "Two  Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Two and three Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Three and Four Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Five and Six Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Six Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Seven Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Eight Sentence Answer Questions" ||
            question_details?.Types_Question ===
              "Ten Sentence Answer Questions" ? (
              <></>
            ) : (
              <>
                <div className="col-md-12">
                  <div className="do-sear mt-2">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Answer</label>
                      <p className="vi_0">
                        {question_details?.Answer
                          ? parse(question_details?.Answer)
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionDetailsview;

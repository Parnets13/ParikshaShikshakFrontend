import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import "../10th_QP_Pattern/Maths_Pattern.css";
import { BsSuperscript } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import parse from "html-react-parser";

const Maths_Pattern = () => {
  const { state } = useLocation();
  console.log("Math==>", state);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [Questions, setQuestions] = useState([]);

  const getAllQuestions = async () => {
    try {
      const config = {
        url: "/admin/getQuestionByClasswise/" + user?._id,
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          Board: state.Board,
          Medium: state.Medium,
          Class: state.Class,
          Sub_Class: state.Sub_Class,
          Subject: state.Subject,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        setQuestions(res.data.success);
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
    if (token) {
      getAllQuestions();
    }
  }, [token]);

  const lines = [
    <div className="col-md-12">
      <div className="do-sear mt-2">
        <p type="text" className="lined-input"></p>
      </div>
    </div>,
  ];

  const SectionArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const RomanAA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  console.log("Questions==>", Questions);
  return (
    <div>
      {/* first page starts here */}
      <div className="page-starts">
        <div className="question-paper-display">
          <div className="second-page-body ">
            <h2 style={{ textAlign: "center" }}>MODEL QUESTION PAPPER</h2>
            <h4 style={{ textAlign: "center" }}>
              <b>10th STANDARD</b>
            </h4>
            <h5 style={{ textAlign: "center", textDecoration: "underline" }}>
              SUBJECT: MATHEMATICS
            </h5>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h6>Time: {state?.bluePrint?.DurationOfExam}</h6>
              <h6>
                Max.Marks:{" "}
                {state?.bluePrint?.AllChapter?.reduce(
                  (a, ele) =>
                    a +
                    Number(
                      ele?.BluePrintmarksperquestion *
                        ele?.Blueprintnoofquestion
                    ),
                  0
                )}
              </h6>
            </div>

            <div className="question-body-mainM">
              <div className="container-fluid">
                {state?.bluePrint?.TypesofQuestions?.map((ele, a) => {
                  return (
                    <>
                      {" "}
                      <div className="row">
                        <div
                          className="col-md-1"
                          style={{
                            paddingLeft: "unset",
                            paddingRight: "unset",
                          }}
                        >
                          <b>{RomanAA[a]}.</b>
                        </div>
                        <div
                          className="col-md-11"
                          style={{
                            paddingLeft: "unset",
                            paddingRight: "unset",
                            textAlign: "justify",
                          }}
                        >
                          <b>
                            {ele?.QAInstruction}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                            >
                              <b></b>
                              <b>
                                ({ele?.NQA} X {ele?.Mask} ={" "}
                                {ele?.NQA * ele?.Mask})
                              </b>
                            </div>
                          </b>
                        </div>
                      </div>
                      {Questions?.filter(
                        (ama) => ama?.Types_Question == ele?.QAType
                      )?.map((item, i) => {
                        if (i < Number(ele?.NQA)) {
                          return (
                            <div className="container-fluid">
                              {item?.Types_Question ==
                              "Multiple Choice Questions" ? (
                                <div className="row">
                                  <div
                                    className="col-md-1"
                                    style={{
                                      paddingLeft: "unset",
                                      paddingRight: "unset",
                                    }}
                                  >
                                    <p>{i + 1})</p>
                                  </div>
                                  <div
                                    className="col-md-11"
                                    style={{
                                      paddingLeft: "unset",
                                      paddingRight: "unset",
                                    }}
                                  >
                                    <div className="container-fluid">
                                      <div className="row">
                                        <div
                                          className="col-md-12"
                                          style={{ paddingLeft: "unset" }}
                                        >
                                          <p style={{ textAlign: "justify" }}>
                                            {item?.Question
                                              ? parse(item?.Question)
                                              : ""}
                                          </p>
                                        </div>
                                        {item?.Image ? (
                                          <div>
                                            <img
                                              src={`${item?.Image}`}
                                              className="mcq-img"
                                              alt=""
                                            />
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {item?.Option_1 ? (
                                              <>
                                                {" "}
                                                (A) &nbsp;
                                                {item?.Option_1
                                                  ? parse(item?.Option_1)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {item?.Option_2 ? (
                                              <>
                                                (B) &nbsp;
                                                {item?.Option_2
                                                  ? parse(item?.Option_2)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {item?.Option_3 ? (
                                              <>
                                                {" "}
                                                (C) &nbsp;{" "}
                                                {item?.Option_3
                                                  ? parse(item?.Option_3)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {" "}
                                            {item?.Option_4 ? (
                                              <>
                                                {" "}
                                                (D) &nbsp;
                                                {item?.Option_4
                                                  ? parse(item?.Option_4)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        {item?.Option_5 ? (
                                          <div
                                            className="col-md-3"
                                            style={{
                                              paddingLeft: "unset",
                                              marginTop: "-10px",
                                            }}
                                          >
                                            <p>
                                              {" "}
                                              {item?.Option_5 ? (
                                                <>
                                                  {" "}
                                                  (E) &nbsp;
                                                  {item?.Option_5
                                                    ? parse(item?.Option_5)
                                                    : ""}
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </p>
                                          </div>
                                        ) : (
                                          <></>
                                        )}

                                        {item?.Option_6 ? (
                                          <div
                                            className="col-md-3"
                                            style={{
                                              paddingLeft: "unset",
                                              marginTop: "-10px",
                                            }}
                                          >
                                            <p>
                                              {" "}
                                              {item?.Option_6 ? (
                                                <>
                                                  {" "}
                                                  (F) &nbsp;
                                                  {item?.Option_6
                                                    ? parse(item?.Option_6)
                                                    : ""}
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </p>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className="ans-section"
                                      style={{ marginTop: "-10px" }}
                                    >
                                      <div className="ans">Answer: </div>
                                      <div className="ans-box"></div>
                                      <div className="ans-line"></div>
                                    </div>
                                  </div>
                                  {item?.ImageQ ? (
                                    <>
                                      <div>
                                        <h5>(OR)</h5>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}

                                  <div>
                                    {item?.ImageQ ? (
                                      <>
                                        <b>Question Image:</b>
                                        <div>
                                          <img
                                            src={`${item?.ImageQ}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    <br />
                                    <b>Options :</b>
                                    <div className="d-flex mb-1">
                                      {item?.Image_1 ? (
                                        <>
                                          <span>a)</span>
                                          <img
                                            src={`${item?.Image_1}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {item?.Image_2 ? (
                                        <>
                                          <span>b)</span>
                                          <img
                                            src={`${item?.Image_2}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="d-flex mb-1">
                                      {item?.Image_3 ? (
                                        <>
                                          <span>c)</span>
                                          <img
                                            src={`${item?.Image_3}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {item?.Image_4 ? (
                                        <>
                                          <span>d)</span>
                                          <img
                                            src={`${item?.Image_4}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div className="d-flex mb-1">
                                      {item?.Image_5 ? (
                                        <>
                                          <span>e)</span>
                                          <img
                                            src={`${item?.Image_5}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {item?.Image_6 ? (
                                        <>
                                          <span>f)</span>
                                          <img
                                            src={`${item?.Image_6}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}
                              {item?.Types_Question == "Objective Questions" ? (
                                <div className="row">
                                  <div
                                    className="col-md-1"
                                    style={{
                                      paddingLeft: "unset",
                                      paddingRight: "unset",
                                    }}
                                  >
                                    <p>{i + 1})</p>
                                  </div>
                                  <div
                                    className="col-md-11"
                                    style={{
                                      paddingLeft: "unset",
                                      paddingRight: "unset",
                                    }}
                                  >
                                    <div className="container-fluid">
                                      <div className="row">
                                        <div
                                          className="col-md-12"
                                          style={{ paddingLeft: "unset" }}
                                        >
                                          <p style={{ textAlign: "justify" }}>
                                            {item?.Question
                                              ? parse(item?.Question)
                                              : ""}
                                          </p>
                                        </div>
                                        {item?.Image ? (
                                          <div>
                                            <img
                                              src={`${item?.Image}`}
                                              className="mcq-img"
                                              alt=""
                                            />
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {item?.Option_1 ? (
                                              <>
                                                {" "}
                                                (A) &nbsp;
                                                {item?.Option_1
                                                  ? parse(item?.Option_1)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {item?.Option_2 ? (
                                              <>
                                                (B) &nbsp;
                                                {item?.Option_2
                                                  ? parse(item?.Option_2)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {item?.Option_3 ? (
                                              <>
                                                {" "}
                                                (C) &nbsp;{" "}
                                                {item?.Option_3
                                                  ? parse(item?.Option_3)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        <div
                                          className="col-md-3"
                                          style={{
                                            paddingLeft: "unset",
                                            marginTop: "-10px",
                                          }}
                                        >
                                          <p>
                                            {" "}
                                            {item?.Option_4 ? (
                                              <>
                                                {" "}
                                                (D) &nbsp;
                                                {item?.Option_4
                                                  ? parse(item?.Option_4)
                                                  : ""}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </p>
                                        </div>
                                        {item?.Option_5 ? (
                                          <div
                                            className="col-md-3"
                                            style={{
                                              paddingLeft: "unset",
                                              marginTop: "-10px",
                                            }}
                                          >
                                            <p>
                                              {" "}
                                              {item?.Option_5 ? (
                                                <>
                                                  {" "}
                                                  (E) &nbsp;
                                                  {item?.Option_5
                                                    ? parse(item?.Option_5)
                                                    : ""}
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </p>
                                          </div>
                                        ) : (
                                          <></>
                                        )}

                                        {item?.Option_6 ? (
                                          <div
                                            className="col-md-3"
                                            style={{
                                              paddingLeft: "unset",
                                              marginTop: "-10px",
                                            }}
                                          >
                                            <p>
                                              {" "}
                                              {item?.Option_6 ? (
                                                <>
                                                  {" "}
                                                  (F) &nbsp;
                                                  {item?.Option_6
                                                    ? parse(item?.Option_6)
                                                    : ""}
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </p>
                                          </div>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </div>
                                    <div
                                      className="ans-section"
                                      style={{ marginTop: "-10px" }}
                                    >
                                      <div className="ans">Answer: </div>
                                      <div className="ans-box"></div>
                                      <div className="ans-line"></div>
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "Fill in the Blanks Questions" ? (
                                <>
                                  {item?.NumberOfLine == "2" ? (
                                    <>
                                      <div className="d-flex">
                                        <b>{i + 1}).</b>
                                        <p>
                                          {" "}
                                          {parse(`<div>${item?.input1}</div>`)}
                                        </p>
                                        <div className="ques-line"></div>
                                        <p>
                                          {" "}
                                          {parse(`<div>${item?.input2}</div>`)}
                                        </p>
                                        <div className="ques-line"></div>
                                        <p>
                                          {" "}
                                          {parse(`<div>${item?.input3}</div>`)}
                                        </p>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.NumberOfLine == "1" ? (
                                    <>
                                      <b>{i + 1}).</b>
                                      <div className="d-flex">
                                        <p>
                                          {" "}
                                          {parse(`<div>${item?.input1}</div>`)}
                                        </p>
                                        <div className="ques-line"></div>
                                        <p>
                                          {" "}
                                          {parse(`<div>${item?.input2}</div>`)}
                                        </p>
                                      </div>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question == "One Word Question" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "One Sentence Answer Question" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                              {item?.Types_Question ==
                              "Two  Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                              {item?.Types_Question ==
                              "Two and three Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "Three and Four Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "Five and Six Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "Six Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "Seven Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "Eight Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}

                              {item?.Types_Question ==
                              "Ten Sentence Answer Questions" ? (
                                <>
                                  <div className="row">
                                    <div
                                      className="col-md-1"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>{i + 1}).</p>
                                    </div>
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                  </div>
                                  {item?.orQuestion || item?.Image_1 ? (
                                    <div>
                                      <p
                                        style={{
                                          padding: "20px 0px 0px",
                                          textAlign: "center",
                                        }}
                                      >
                                        (OR)
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  {item?.orQuestion ? (
                                    <div
                                      className="col-md-11"
                                      style={{
                                        paddingLeft: "unset",
                                        paddingRight: "unset",
                                      }}
                                    >
                                      <p>
                                        {item?.orQuestion
                                          ? parse(item?.orQuestion)
                                          : ""}
                                      </p>
                                    </div>
                                  ) : (
                                    <></>
                                  )}
                                  <div className="row">
                                    {item?.Image_1 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_1}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.Image_2 ? (
                                      <div className="col-md-6">
                                        <img
                                          src={`${item?.Image_2}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}
                                  </div>

                                  <div>
                                    {item?.NumberOfLine && (
                                      <>
                                        {Array.from(
                                          { length: item?.NumberOfLine },
                                          (_, index) => (
                                            <React.Fragment key={index}>
                                              {lines.map((line, idx) => (
                                                <React.Fragment key={idx}>
                                                  {line}
                                                </React.Fragment>
                                              ))}
                                            </React.Fragment>
                                          )
                                        )}
                                      </>
                                    )}
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
              </div>
            </div>
          </div>
          <br />
          <div className="footer-text">
            <footer>
              <div>[Turn over]</div>
            </footer>
          </div>
        </div>
      </div>
      {/* first page End here */}

      {/* second page starts here */}
      {/* <div className="page-starts">
        <div className="question-paper-display">
          <div className="second-page-body ">
            <header>
              <div className="pageno">2</div>
            </header>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <b>II.</b>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                    textAlign: "justify",
                  }}
                >
                  <b>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <b>Anser the following</b>
                      <b>(1 X 6 = 6)</b>
                    </div>
                  </b>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>9)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>Express 6762 as a Product of prime Factors.</p>
                  <div className="ans-line mt-4"></div>
                </div>

                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>10)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>
                    If the Universal set U = {`{1,2,3,4,5,6,7,8}`} and sub set A
                    = {`{1,2,3}`} find A<sup>|</sup>.
                  </p>
                  <div className="ans-line mt-4"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>11)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>
                    Find the zero of the Polynomial x <sup>2</sup>+ 2x + 1.
                  </p>
                  <div className="ans-line mt-4"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>12)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      In ABC, ABC=90 <sup>0</sup> ,BD{" "}
                      <span style={{ borderBottom: "1px solid black" }}>|</span>{" "}
                      AC <br />
                      If BD = 8cm and AD = 4cm find CD
                    </p>

                    <img
                      src="maths-1.png"
                      alt=""
                      style={{ width: "250px", height: "150px" }}
                    />
                  </div>
                  <div className="ans-line mt-4"></div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>13)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      In ABC, ABC=90 <sup>0</sup> ,BD{" "}
                      <span style={{ borderBottom: "1px solid black" }}>|</span>{" "}
                      AC <br />
                      If BD = 8cm and AD = 4cm find CD
                    </p>
                    <img
                      src="maths-2.png"
                      alt=""
                      style={{ width: "190px", height: "86px" }}
                    />
                  </div>
                  <div className="ans-line mt-4"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>14)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>Express 6762 as a Product of prime Factors.</p>
                  <div className="ans-line mt-4"></div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <b>III.</b>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                    textAlign: "justify",
                  }}
                >
                  <b>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <b>Answer the following</b>
                      <b>(2 X 16 = 32)</b>
                    </div>
                  </b>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>15)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>Prove that 5 - root of 3 ia an Irrational number.</p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>16)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    In a college, 60 students enrolled in chemistry, 40 in
                    Physics, 30 in Biology and 15 in Chemistry and Physics, 10
                    in Physics and Biology, 5 in Biology and Chemistry. No one
                    enrolled in all the three subjects. Find how many are
                    enrolled in atleast one of the subject.
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>17)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>
                    Classify the following into Permutations and Combinations
                    <br />
                    a) Five different subjects books to be arranged on a shelf.
                    <br />
                    b) There are 8chairs and 8peoples to occupy them.
                    <br />
                    c) In a committee of 7persons, a chair person, a secreatory
                    and a treasure are to be chosen.
                    <br />
                    d) Five keys are to be arranged in circular key ring.
                    <br />
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-text">
            <footer>
              <div>[Turn over]</div>
            </footer>
          </div>
        </div>
      </div> */}
      {/* second page end here */}

      {/* third page starts here */}
      {/* <div className="page-starts">
        <div className="question-paper-display">
          <div className="second-page-body ">
            <header>
              <div className="pageno">3</div>
            </header>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>18)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    A committe of 5 is to be formed out of 6 men and 4 ladies.
                    In how amny ways can this be done when atleast 2 ladies are
                    included?
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>19)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    Rationalise the denominator and simply : <br />
                    <span style={{ borderBottom: "1px solid black" }}>
                      5(2-3)
                    </span>
                    <br />
                    3(2-5).
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>20)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    Simply : 2x<sup>2</sup> 5x - 14 ?
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>21)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>Prove that 5 - root of 3 ia an Irrational number.</p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>22)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    In a college, 60 students enrolled in chemistry, 40 in
                    Physics, 30 in Biology and 15 in Chemistry and Physics, 10
                    in Physics and Biology, 5 in Biology and Chemistry. No one
                    enrolled in all the three subjects. Find how many are
                    enrolled in atleast one of the subject.
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>23)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>
                    Classify the following into Permutations and Combinations
                    <br />
                    a) Five different subjects books to be arranged on a shelf.
                    <br />
                    b) There are 8chairs and 8peoples to occupy them.
                    <br />
                    c) In a committee of 7persons, a chair person, a secreatory
                    and a treasure are to be chosen.
                    <br />
                    d) Five keys are to be arranged in circular key ring.
                    <br />
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
            </div>
            <br />
            <br />
            <br />
          </div>
          <div className="footer-text">
            <footer>
              <div>[Turn over]</div>
            </footer>
          </div>
        </div>
      </div> */}
      {/* third page end here */}

      {/* fourth page starts here */}
      {/* <div className="page-starts">
        <div className="question-paper-display">
          <div className="second-page-body ">
            <header>
              <div className="pageno">4</div>
            </header>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>24)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    A committe of 5 is to be formed out of 6 men and 4 ladies.
                    In how amny ways can this be done when atleast 2 ladies are
                    included?
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>25)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    Rationalise the denominator and simply : <br />
                    <span style={{ borderBottom: "1px solid black" }}>
                      5(2-3)
                    </span>
                    <br />
                    3(2-5).
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>26)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    Draw a plan for the recordings from the surveyor's field
                    work book given below.
                    <br />
                    (Scale 20 meters = 1cm)
                    <div>
                      <Table bordered>
                        <thead>
                          <th>Meters to D</th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>140</td>
                          </tr>
                          <tr>
                            <td>120</td>
                          </tr>
                          <tr>
                            <td>100</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>27)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                    justifyContent: "space-between",
                  }}
                >
                  <p>
                    In solid cylinder has a T.S.A of 462 square cm. Its C.S.A is
                    one third of the T.S.A. Find the radius of the cylinder.
                  </p>

                  <div style={{ textAlign: "center" }}>(OR)</div>
                  <p>
                    A right circular metallic cone of height 20cm and base
                    radius 5cm is method and recast into a sphere. Find the
                    radius of the sphere
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>28)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>Verify Euler's formula for the given network.</p>
                    <img
                      src="maths-3.png"
                      alt=""
                      style={{ width: "190px", height: "100px" }}
                    />
                  </div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-text">
            <footer>
              <div>[Turn over]</div>
            </footer>
          </div>
        </div>
      </div> */}
      {/* fourth page end here */}

      {/* five page strats here */}
      {/* <div className="page-starts">
        <div className="question-paper-display">
          <div className="second-page-body ">
            <header>
              <div className="pageno">5</div>
            </header>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>29)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      In ABC, ABC=90 <sup>0</sup> ,BD{" "}
                      <span style={{ borderBottom: "1px solid black" }}>|</span>{" "}
                      AC <br />
                      If BD = 8cm and AD = 4cm find CD
                    </p>
                    <img
                      src="maths-4.png"
                      alt=""
                      style={{ width: "190px", height: "100px" }}
                    />
                  </div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>30)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>
                    Classify the following into Permutations and Combinations
                    <br />
                    a) Five different subjects books to be arranged on a shelf.
                    <br />
                    b) There are 8chairs and 8peoples to occupy them.
                    <br />
                    c) In a committee of 7persons, a chair person, a secreatory
                    and a treasure are to be chosen.
                    <br />
                    d) Five keys are to be arranged in circular key ring.
                    <br />
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <b>IV.</b>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                    textAlign: "justify",
                  }}
                >
                  <b>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <b>Answer the following questions</b>
                      <b>(3 X 6 = 18)</b>
                    </div>
                  </b>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>31)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>Prove that 5 - root of 3 ia an Irrational number.</p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>32)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    In a college, 60 students enrolled in chemistry, 40 in
                    Physics, 30 in Biology and 15 in Chemistry and Physics, 10
                    in Physics and Biology, 5 in Biology and Chemistry. No one
                    enrolled in all the three subjects. Find how many are
                    enrolled in atleast one of the subject.
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>33)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>
                    Classify the following into Permutations and Combinations
                    <br />
                    a) Five different subjects books to be arranged on a shelf.
                    <br />
                    b) There are 8chairs and 8peoples to occupy them.
                    <br />
                    c) In a committee of 7persons, a chair person, a secreatory
                    and a treasure are to be chosen.
                    <br />
                    d) Five keys are to be arranged in circular key ring.
                    <br />
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>34)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify", margin: "0" }}>
                    A committe of 5 is to be formed out of 6 men and 4 ladies.
                    In how amny ways can this be done when atleast 2 ladies are
                    included?
                  </p>
                  <div className="ans-line mt-4"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-text">
            <footer>
              <div>[Turn over]</div>
            </footer>
          </div>
        </div>
      </div> */}
      {/* five page end here */}

      {/* six page start here */}

      {/* <div className="page-starts">
        <div className="question-paper-display">
          <div className="second-page-body ">
            <header>
              <div className="pageno">6</div>
            </header>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>35)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    Rationalise the denominator and simply : <br />
                    <span style={{ borderBottom: "1px solid black" }}>
                      5(2-3)
                    </span>
                    <br />
                    3(2-5).
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>36)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>
                    Simply : 2x<sup>2</sup> 5x - 14 ?
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <b>IV.</b>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                    textAlign: "justify",
                  }}
                >
                  <b>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <b>Answer the following questions</b>
                      <b>(4 X 4 = 16)</b>
                    </div>
                  </b>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>37)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>Prove that 5 - root of 3 ia an Irrational number.</p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>38)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    In a college, 60 students enrolled in chemistry, 40 in
                    Physics, 30 in Biology 10 in Physics and Biology, 5 in
                    Biology and Chemistry. Find how many are enrolled in atleast
                    one of the subject.
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>

                  <div style={{ textAlign: "center" }}>
                    <p>(OR)</p>
                  </div>
                  <p style={{ textAlign: "justify" }}>
                    If 30 in Biology and 15 in Chemistry and Physics, 10 in
                    Physics and Biology, 5 in Biology and Chemistry. Find how
                    many are enrolled in atleast one of the subject.
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
                <div
                  className="col-md-1"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>39)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{ paddingLeft: "unset", paddingRight: "unset" }}
                >
                  <p>Prove that 5 - root of 3 ia an Irrational number.</p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-text">
            <footer>
              <div>[Turn over]</div>
            </footer>
          </div>
        </div>
      </div> */}
      {/* six page end here */}

      {/* seven page starts here */}

      {/* <div className="page-starts">
        <div className="question-paper-display">
          <div className="second-page-body ">
            <header>
              <div className="pageno">7</div>
            </header>
            <div className="container">
              <div className="row">
                <div
                  className="col-md-1"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p>40)</p>
                </div>
                <div
                  className="col-md-11"
                  style={{
                    paddingLeft: "unset",
                    paddingRight: "unset",
                  }}
                >
                  <p style={{ textAlign: "justify" }}>
                    In a college, 60 students enrolled in chemistry, 40 in
                    Physics, 30 in Biology 10 in Physics and Biology, 5 in
                    Biology and Chemistry. Find how many are enrolled in atleast
                    one of the subject.
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>

                  <div style={{ textAlign: "center" }}>
                    <p>(OR)</p>
                  </div>
                  <p style={{ textAlign: "justify" }}>
                    If 30 in Biology and 15 in Chemistry and Physics, 10 in
                    Physics and Biology, 5 in Biology and Chemistry. Find how
                    many are enrolled in atleast one of the subject.
                  </p>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                  <div className="ans-line mt-5"></div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-md-12 text-center">
                  <b>******</b>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* seven page end here */}
    </div>
  );
};

export default Maths_Pattern;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Row, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import swal from "sweetalert";
import parse from "html-react-parser";
function Science10th() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { state } = useLocation();
  console.log("state", state);

  //get
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
    if (state._id && token) {
      getAllQuestions();
    }
  }, [state, token]);
  var count = 1;
  var count2 = 0;
  const SectionArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const RomanAA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  const lines = [
    <div className="col-md-12">
      <div className="do-sear mt-2">
        <p type="text" className="lined-input"></p>
      </div>
    </div>,
  ];
  return (
    <>
      <div>
        <div>
          {/* first page starts */}
          <div className="page-starts">
            <div className="question-paper-display">
              <div className="englishqp-page-body">
                <div>
                  <h2>{state?.Subject}</h2>
                  <h4>
                    <b>{state?.bluePrint?.blName}</b>
                  </h4>
                </div>

                <div style={{ fontWeight: "bold" }}>
                  <div className="time-and-marks">
                    <div>Time :{state?.bluePrint?.DurationOfExam}</div>
                    <div>
                      Max.Marks : {state?.bluePrint?.TotalDifficultMask}
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
                              {ele1?.NQA}*{ele1?.Mask}={ele1?.NQA * ele1?.Mask}
                            </b>
                          </div>
                        </div>
                        <br />
                        {Questions?.filter(
                          (ele) => ele?.Types_Question == ele1?.QAType
                        )?.map((item, i) => {
                          if (i < Number(ele1?.NQA)) {
                            count = i + 1;
                            return (
                              <div className="question-body mb-1">
                                {item?.Types_Question ==
                                "Multiple Choice Questions" ? (
                                  <div>
                                    <div
                                      style={{ display: "flex", gap: "12px" }}
                                      key={i}
                                    >
                                      <b>{i + 1}</b>
                                      <b>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
                                    </div>
                                    <Row>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_1 ? (
                                          <>
                                            {" "}
                                            a) &nbsp;
                                            {item?.Option_1
                                              ? parse(item?.Option_1)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_2 ? (
                                          <>
                                            b) &nbsp;
                                            {item?.Option_2
                                              ? parse(item?.Option_2)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </Row>
                                    <Row>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_3 ? (
                                          <>
                                            {" "}
                                            c) &nbsp;{" "}
                                            {item?.Option_3
                                              ? parse(item?.Option_3)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_4 ? (
                                          <>
                                            {" "}
                                            d) &nbsp;
                                            {item?.Option_4
                                              ? parse(item?.Option_4)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </Row>
                                    <Row>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_5 ? (
                                          <>
                                            {" "}
                                            e) &nbsp;{" "}
                                            {item?.Option_5
                                              ? parse(item?.Option_5)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_6 ? (
                                          <>
                                            {" "}
                                            f) &nbsp;
                                            {item?.Option_6
                                              ? parse(item?.Option_6)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </Row>
                                    {item?.ImageQ ? (
                                      <>
                                        <h4>(OR)</h4>
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
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                ) : (
                                  ""
                                )}

                                {item?.Types_Question ==
                                "Match the Following Questions" ? (
                                  <>
                                    <div className="question-body mb-2">
                                      <b>{i + 1}.)</b>
                                      <Table bordered>
                                        <thead>
                                          <tr>
                                            <th colspan="2">PART-A</th>
                                            <th colspan="2">PART-B</th>
                                            {item?.Part_C1 ? (
                                              <th colspan="2">PART-C</th>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <th>1</th>
                                            <th>{item?.Part_A1}</th>
                                            <th>a</th>
                                            <th>{item?.Part_B1}</th>
                                            {item?.Part_C1 ? (
                                              <>
                                                <th>i</th>
                                                <th>{item?.Part_C1}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            <th>2</th>
                                            <th>{item?.Part_A2}</th>
                                            <th>b</th>
                                            <th>{item?.Part_B2}</th>
                                            {item?.Part_C2 ? (
                                              <>
                                                <th>i</th>
                                                <th>{item?.Part_C2}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            <th>3</th>
                                            <th>{item?.Part_A3}</th>
                                            <th>c</th>
                                            <th>{item?.Part_B3}</th>
                                            {item?.Part_C3 ? (
                                              <>
                                                <th>iii</th>
                                                <th>{item?.Part_C3}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            <th>4</th>
                                            <th>{item?.Part_A4}</th>
                                            <th>d</th>
                                            <th>{item?.Part_B4}</th>
                                            {item?.Part_C4 ? (
                                              <>
                                                <th>iv</th>
                                                <th>{item?.Part_C4}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            <th>5</th>
                                            <th>{item?.Part_A5}</th>
                                            <th>e</th>
                                            <th>{item?.Part_B5}</th>
                                            {item?.Part_C5 ? (
                                              <>
                                                <th>v</th>
                                                <th>{item?.Part_C5}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>

                                          <tr>
                                            {item?.Part_A6 ? (
                                              <>
                                                <th>6</th>
                                                <th>{item?.Part_A6}</th>
                                              </>
                                            ) : (
                                              <>
                                                <th></th>
                                                <th></th>
                                              </>
                                            )}
                                            {item?.Part_B6 ? (
                                              <>
                                                <th>f</th>
                                                <th>{item?.Part_B6}</th>
                                              </>
                                            ) : (
                                              <>
                                                <th></th>
                                                <th></th>
                                              </>
                                            )}
                                            {item?.Part_C5 ? (
                                              <>
                                                <th>vi</th>
                                                <th>{item?.Part_C5}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                        </tbody>
                                      </Table>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}

                                {item?.Types_Question ==
                                "Two  Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{i + 1}).</b>
                                      <b>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
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
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>(OR)</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
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
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}

                                {item?.Types_Question ==
                                "Seven Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{i + 1}).</b>
                                      <b>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
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
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>(OR)</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
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
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}

                                {item?.Types_Question == "Map Reading" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{i + 1}).</b>
                                      <b>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
                                    </div>
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
                </main>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Science10th;

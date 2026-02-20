import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../Admin/Admin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import parse from "html-react-parser";
import MathEditor from "../MyEditor";
import { debounce } from "lodash";
let googleTransliterate = require("google-input-tool");

function AddPoem({ selectdetails }) {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  const questiondata = JSON.parse(localStorage.getItem("selectdetails"));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setQuestion(data);
  };

  const handleChange7 = (e, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };

  //Translate
  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
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
  }, 300);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  //post

  const [QuestionT, setQuestionT] = useState("");
  const [AnswerT, setAnswerT] = useState("");
  const [orQuestionT, setorQuestionT] = useState("");
  const [orAnswerT, setorAnswerT] = useState("");

  const [orAnswer, setorAnswer] = useState("");
  const [orQuestion, setorQuestion] = useState("");
  const [Question, setQuestion] = useState("");
  const [Marks, setMarks] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Answer_Time, setAnswer_Time] = useState("");
  const [PoemSat, setPoemSat] = useState("");
  const [PoemEnd, setPoemEnd] = useState("");
  const [OrPoemSat, setOrPoemSat] = useState("");
  const [OrPoemEnd, setOrPoemEnd] = useState("");
  const addquestions = async () => {
    try {
      const config = {
        url: "/admin/AddQuestionPaper",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: {
          Board: questiondata?.Board,
          Chapter_Name: questiondata?.Chapter_Name,
          Difficulty_level: questiondata?.Difficulty_level,
          Lesson: questiondata?.Lesson,
          Medium: questiondata?.Medium,
          Name_of_examination: questiondata?.Name_of_examination,
          Objectives: questiondata?.Objectives,
          Section: questiondata?.Section,
          Sub_Class: questiondata?.Sub_Class,
          Subject: questiondata?.Subjects,
          Questiontype: selectdetails?.QuestionTYpe,
          Types_Question: questiondata?.Types_Question,
          Class: questiondata?.Class,
          Instruction: questiondata?.Instruction,
          Types_QuestionTranslate: questiondata?.Types_QuestionTranslate,

          Question: Question,
          orAnswer: orAnswer,
          NumberOfLine: Dash,
          orNumberOfLine: OrDash,
          PoemSt: PoemSat,
          PoemEnd: PoemEnd,
          OrPoemSat: OrPoemSat,
          OrPoemEnd: OrPoemEnd,
          Answer: Answer,
          Marks: Marks,
          Answer_Time: Answer_Time,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        swal({
          title: "yeah!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
        localStorage.removeItem("selectdetails");
        return navigate("/adminquestions");
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "success",
        button: "Ok!",
      });
    }
  };

  console.log("questiondata", questiondata);
  // For Dash
  const [Dash, setDash] = useState("4");
  const [OrDash, setOrDash] = useState("4");
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>
                {/* <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Question}
                  onChange={handleChange}
                /> */}
                <MathEditor
                  data={{
                    A: Question,
                    B: setQuestion,
                    selectedLanguage: selectdetails?.selectedLanguage,
                    trans: QuestionT,
                    settran: setQuestionT,
                  }}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="do-sear mt-2">
                <label htmlFor=""> Poem Line </label>
                <Form.Select
                  className="vi_0"
                  onChange={(e) => setDash(e.target.value)}
                >
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </Form.Select>
              </div>
            </div>

            {Dash === "4" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemSat(e.target.value)}
                    />
                    {/* <div>
                    <input
                        type="text"
                        className="vi_0"
                        placeholder="Enter text"
                        onChange={(e) => {
                          if (questiondata?.selectdetails?.selectedLanguage == "en-t-i0-und") {
                            setPoemSat(e.target.value);
                          } else onChangeHandler(e.target.value, setPoemSat);
                        }}
                      />
                      {questiondata?.selectdetails?.selectedLanguage == "en-t-i0-und" ? <></> : <p>{PoemSat}</p>}
                        </div> */}
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>

                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>

                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {Dash === "5" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemSat(e.target.value)}
                    />
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {Dash === "6" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemSat(e.target.value)}
                    />
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {Dash === "7" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemSat(e.target.value)}
                    />
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <div className="do-sear mt-2">
                  <label htmlFor="">Answer</label>
                  <MathEditor
                    data={{
                      A: Answer,
                      B: setAnswer,
                      selectedLanguage: selectdetails?.selectedLanguage,
                      trans: AnswerT,
                      settran: setAnswerT,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center mt-2">
              <h5>(OR)</h5>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>
                <MathEditor
                  data={{
                    A: orQuestion,
                    B: setorQuestion,
                    selectedLanguage: selectdetails?.selectedLanguage,
                    trans: orQuestionT,
                    settran: setorQuestionT,
                  }}
                />
              </div>
            </div>
            <div className="col-md-5">
              <div className="do-sear mt-2">
                <label htmlFor=""> Poem Line </label>
                <Form.Select
                  className="vi_0"
                  onChange={(e) => setOrDash(e.target.value)}
                >
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                </Form.Select>
              </div>
            </div>

            {OrDash === "4" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemSat(e.target.value)}
                    />
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>

                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>

                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {OrDash === "5" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemSat(e.target.value)}
                    />
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {OrDash === "6" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemSat(e.target.value)}
                    />
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {OrDash === "7" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemSat(e.target.value)}
                    />
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) => setOrPoemEnd(e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <div className="do-sear mt-2">
                  <label htmlFor="">Answer</label>
                  <MathEditor
                    data={{
                      A: orAnswer,
                      B: setorAnswer,
                      selectedLanguage: selectdetails?.selectedLanguage,
                      trans: orAnswerT,
                      settran: setorAnswerT,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <Form.Select
                  className="vi_0"
                  onChange={(e) => setMarks(e.target.value)}
                >
                  <option value="">Select Marks</option>
                  <option value="1/2">1/2</option>
                  <option value="1/4">1/4</option>
                  <option value="1/3">1/3</option>
                  <option value="1">1</option> 
                          <option value="1">1.5</option>
                  <option value="2">2</option>  
                    <option value="2">2.5</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                </Form.Select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Answer Time</label>
                <Form.Select
                  className="vi_0"
                  onChange={(e) => setAnswer_Time(e.target.value)}
                >
                  <option value="1/2 Mnt">1/2 Mnt</option>
                  <option value="1/4 Mnt">1/4 Mnt</option>
                  <option value="1 Mnt">1 Mnt</option>
                  <option value="1.30 minutes">1.30 minutes</option>
                  <option value="1 minutes">1 minutes</option>
                  <option value="2 minutes">2 minutes</option>
                  <option value="3 minute">3 minutes</option>
                  <option value="4 minutes">4 minutes</option>
                  <option value="5 minutes"> 5 minutes</option>
                  <option value="6 minutes">6 minutes</option>
                  <option value="7 minutes"> 7 minutes</option>
                  <option value="8 minutes"> 8 minutes</option>
                  <option value="9 minutes"> 9 minutes</option>
                  <option value="10 minutes">10 minutes</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        <div className="yoihjij text-center my-2 p-2 ">
          <button
            style={{ backgroundColor: "orange" }}
            onClick={() => {
              navigate(-1);
            }}
            className="modal-add-btn"
          >
            Back
          </button>{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button
            onClick={() => {
              handleShow();
            }}
            className="modal-add-btn"
          >
            Add
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-sm-12">
              <label htmlFor="">Question</label>
              <p className="vi_0">{parse(`<div>${Question}</div>`)}</p>
            </div>

            <div className="col-sm-4">
              <label htmlFor="">Poem Line</label>
              <p className="vi_0">{Dash}</p>
            </div>
            {Dash === "4" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0">{PoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0">{PoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {Dash === "5" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0">{PoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0">{PoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {Dash === "6" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0">{PoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0">{PoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {Dash === "7" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0"> {PoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0"> {PoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            <div className="col-sm-12">
              <label htmlFor="">Answer</label>
              <p className="vi_0">{parse(`<div>${Answer}</div>`)}</p>
            </div>

            <div className="d-flex justify-content-center">
              <h5>(OR)</h5>
            </div>
            <div className="col-sm-12">
              <label htmlFor="">OR-Question</label>
              <p className="vi_0">{parse(`<div>${orQuestion}</div>`)}</p>
            </div>

            <div className="col-sm-4">
              <label htmlFor="">Poem Line</label>
              <p className="vi_0">{OrDash}</p>
            </div>
            {OrDash === "4" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0">{OrPoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0">{OrPoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {OrDash === "5" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0">{OrPoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0">{OrPoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {OrDash === "6" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0">{OrPoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0">{OrPoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
            {OrDash === "7" ? (
              <>
                <div className="col-md-8">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <p className="vi_0"> {OrPoemSat}</p>
                    <div className="ans-line mb-3 mt-2"></div>
                  </div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="ans-line mb-3 mt-2"></div>
                  <div className="d-flex align-items-end">
                    <div className="ans-line mb-3 mt-2"></div>
                    <p className="vi_0"> {OrPoemEnd}</p>
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Edit
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addquestions();
            }}
          >
            Submit
          </Button>
          <Button
            variant="danger"
            onClick={() => window.location.assign("/poemlist")}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddPoem;

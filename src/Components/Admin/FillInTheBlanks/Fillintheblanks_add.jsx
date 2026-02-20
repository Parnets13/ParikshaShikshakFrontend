import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
// import "../Admin/Admin.css";
import "../../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import parse from "html-react-parser";
import MathEditor from "../MyEditor";
import { debounce } from "lodash";
let googleTransliterate = require("google-input-tool");
const Fillintheblanks_add = ({ selectdetails }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  // const selectdetails = JSON.parse(localStorage.getItem("selectdetails"));

  const [translatedValue, setTranslatedValue] = useState("");
  // const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
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
              selectdetails?.selectedLanguage
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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };

  //post
  const [AnswerT, setAnswerT] = useState("");
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [input3, setinput3] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Marks, setMarks] = useState("");

  const [Answer_Time, setAnswer_Time] = useState("");

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
          Board: selectdetails?.Board,
          Chapter_Name: selectdetails?.Chapter_Name,
          Difficulty_level: selectdetails?.Difficulty_level,
          Lesson: selectdetails?.Lesson,
          Medium: selectdetails?.Medium,
          Name_of_examination: selectdetails?.Name_of_examination,
          Objectives: selectdetails?.Objectives,
          Section: selectdetails?.Section,
          Sub_Class: selectdetails?.Sub_Class,
          Subject: selectdetails?.Subjects,
          Questiontype: selectdetails?.QuestionTYpe,
          Types_Question: selectdetails?.Types_Question,
          Class: selectdetails?.Class,
          Instruction: selectdetails?.Instruction,
          Types_QuestionTranslate: selectdetails?.Types_QuestionTranslate,

          input1: input1,
          input2: input2,
          input3: input3,
          NumberOfLine: Dash,

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

  // For Dash

  const [Dash, setDash] = useState("2");
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-3">
              <label htmlFor="">Dash (--)</label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setDash(e.target.value)}
              >
                <option value="">Select Dash</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </Form.Select>
            </div>
            {Dash === "1" ? (
              <>
                <div className="col-md-9 d-flex align-items-end ">
                  <div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setinput1(e.target.value)
                          : onChangeHandler(e.target.value, setinput1)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{input1}</p>
                    )}
                  </div>

                  <span>___________</span>

                  <div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setinput2(e.target.value)
                          : onChangeHandler(e.target.value, setinput2)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{input2}</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {Dash === "2" ? (
              <>
                <div className="col-md-9 d-flex align-items-end ">
                  <div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setinput1(e.target.value)
                          : onChangeHandler(e.target.value, setinput1)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{input1}</p>
                    )}
                  </div>

                  <span>___________</span>

                  <div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setinput2(e.target.value)
                          : onChangeHandler(e.target.value, setinput2)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{input2}</p>
                    )}
                  </div>
                  <span>___________</span>
                  <div>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setinput3(e.target.value)
                          : onChangeHandler(e.target.value, setinput3)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{input3}</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    selectdetails?.selectedLanguage == "en-t-i0-und"
                      ? setMarks(e.target.value)
                      : onChangeHandler(e.target.value, setMarks)
                  }
                >
                  <option>Select the Marks</option>
                  <option>1/2</option>
                  <option>1/4</option>
                  <option>1/3</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>10</option>
                </Form.Select>
                {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{Marks}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) =>
                    selectdetails?.selectedLanguage == "en-t-i0-und"
                      ? setAnswer_Time(e.target.value)
                      : onChangeHandler(e.target.value, setAnswer_Time)
                  }
                >
                  <option>Select the Time</option>
                  <option value="1/2 minutes">1/2 minutes</option>
                  <option value="1/4 minutes">1/4 minutes</option>
                  <option value="1 minutes">1 minutes</option>
                  <option value="1.30 minutes">1.30 minutes</option>
                  <option value="2 minutes">2 minutes</option>
                  <option value="3 minutes">3 minutes</option>
                  <option value="4 minutes">4 minutes</option>
                  <option value="5 minutes">5 minutes</option>
                  <option value="6 minutes">6 minutes</option>
                  <option value="7 minutes">7 minutes</option>
                  <option value="8 minutes">8 minutes</option>
                  <option value="9 minutes">9 minutes</option>
                  <option value="10 minutes">10 minutes</option>
                </Form.Select>
                {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{Answer_Time}</p>
                )}
              </div>
            </div>
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
          <div>
            <label htmlFor="">Question</label>
            <div className="d-flex gap-4">
              {input1 ? (
                <>
                  <input
                    type="text"
                    className="vi_0"
                    value={input1}
                    onChange={(e) => setinput1(e.target.value)}
                  />
                </>
              ) : (
                <></>
              )}

              {input2 ? (
                <>
                  <input
                    type="text"
                    className="vi_0"
                    value={input2}
                    onChange={(e) => setinput2(e.target.value)}
                  />
                </>
              ) : (
                <></>
              )}
              {input3 ? (
                <>
                  <input
                    type="text"
                    className="vi_0"
                    value={input3}
                    onChange={(e) => setinput3(e.target.value)}
                  />
                </>
              ) : (
                <></>
              )}
            </div>

            <label htmlFor="">Answer</label>
            <p className="vi_0">{parse(`<div>${Answer}</div>`)}</p>
          </div>
          <div className="col-sm-4">
            <label htmlFor="">NO. OF Dash</label>
            <p className="vi_0">{Dash}</p>
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
            onClick={() => window.location.assign("/adminFillintheblanks")}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Fillintheblanks_add;

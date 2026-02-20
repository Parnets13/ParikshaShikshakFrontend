import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import parse from "html-react-parser";
import MathEditor from "../MyEditor";
const SituationAnalysis_add = ({ selectdetails }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  const questiondata = JSON.parse(localStorage.getItem("selectdetails"));
  const navigate = useNavigate();

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setQuestion(data);
  };

  const handleChange2 = (e, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };

  const [formFields, setFormFields] = useState([
    { SubQue: "" }, // Example initial form field
  ]);

  const [subQuestions, setSubQuestions] = useState([]);
  const handleChange1 = (index, data) => {
    const updatedSubQuestions = [...subQuestions];
    updatedSubQuestions[index] = { question: data };
    setSubQuestions(updatedSubQuestions);
  };
  console.log("subQuestions", subQuestions);
  const addFields = () => {
    setFormFields([...formFields, { SubQue: "" }]);
  };

  const removeFields = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);

    const updatedSubQuestions = [...subQuestions];
    updatedSubQuestions.splice(index, 1);
    setSubQuestions(updatedSubQuestions);
  };

  //post

  const [QuestionT, setQuestionT] = useState("");
  const [AnswerT, setAnswerT] = useState("");
  const [SubQuestionT, setSubQuestionT] = useState("");

  const [Question, setQuestion] = useState("");
  const [Image1, setImage1] = useState("");
  const [Image2, setImage2] = useState("");
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
          Image_1: Image1,
          Image_2: Image2,
          PassiveQuesion: subQuestions,
          Answer: Answer,
          NumberOfLine: NumberOfLine,

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
        return navigate("/adminquestions");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Line
  const [twoline, setTwoline] = useState(false);
  const [threeline, setThreeline] = useState(false);
  const [fourline, setFourline] = useState(true);
  const [fiveline, setFiveline] = useState(false);
  const [sixline, setSixline] = useState(false);
  const [sevenline, setSevenline] = useState(false);
  const [eightline, setEightline] = useState(false);
  const [nineline, setNineline] = useState(false);
  const [tenline, setTenline] = useState(false);
  const [NumberOfLine, setNumberOfLine] = useState(4);

  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question </label>
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
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Number of Line</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setNumberOfLine(selectedValue);
                    setTwoline(selectedValue === "2");
                    setThreeline(selectedValue === "3");
                    setFourline(selectedValue === "4");
                    setFiveline(selectedValue === "5");
                    setSixline(selectedValue === "6");
                    setSevenline(selectedValue === "7");
                    setEightline(selectedValue === "8");
                    setNineline(selectedValue === "9");
                    setTenline(selectedValue === "10");
                  }}
                >
                  <option>Select Answer Line</option>
                  <option
                    value="2"
                    onClick={() => {
                      setTwoline(true);
                      setThreeline(false);
                      setFourline(false);
                      setFiveline(false);
                      setSixline(false);
                      setSevenline(false);
                      setEightline(false);
                      setNineline(false);
                      setTenline(false);
                    }}
                  >
                    2
                  </option>

                  <option
                    value="3"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(true);
                      setFourline(false);
                      setFiveline(false);
                      setSixline(false);
                      setSevenline(false);
                      setEightline(false);
                      setNineline(false);
                      setTenline(false);
                    }}
                  >
                    3
                  </option>
                  <option
                    value="4"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(false);
                      setFourline(true);
                      setFiveline(false);
                      setSixline(false);
                      setSevenline(false);
                      setEightline(false);
                      setNineline(false);
                      setTenline(false);
                    }}
                  >
                    4
                  </option>
                  <option
                    value="5"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(false);
                      setFourline(false);
                      setFiveline(true);
                      setSixline(false);
                      setSevenline(false);
                      setEightline(false);
                      setNineline(false);
                      setTenline(false);
                    }}
                  >
                    5
                  </option>
                  <option
                    value="6"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(false);
                      setFourline(false);
                      setFiveline(false);
                      setSixline(true);
                      setSevenline(false);
                      setEightline(false);
                      setNineline(false);
                      setTenline(false);
                    }}
                  >
                    6
                  </option>
                  <option
                    value="7"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(false);
                      setFourline(false);
                      setFiveline(false);
                      setSixline(false);
                      setSevenline(true);
                      setEightline(false);
                      setNineline(false);
                      setTenline(false);
                    }}
                  >
                    7
                  </option>
                  <option
                    value="8"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(false);
                      setFourline(false);
                      setFiveline(false);
                      setSixline(false);
                      setSevenline(false);
                      setEightline(true);
                      setNineline(false);
                      setTenline(false);
                    }}
                  >
                    8
                  </option>
                  <option
                    value="9"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(false);
                      setFourline(false);
                      setFiveline(false);
                      setSixline(false);
                      setSevenline(false);
                      setEightline(false);
                      setNineline(true);
                      setTenline(false);
                    }}
                  >
                    9
                  </option>
                  <option
                    value="10"
                    onClick={() => {
                      setTwoline(false);
                      setThreeline(false);
                      setFourline(false);
                      setFiveline(false);
                      setSixline(false);
                      setSevenline(false);
                      setEightline(false);
                      setNineline(false);
                      setTenline(true);
                    }}
                  >
                    10
                  </option>
                </Form.Select>
              </div>
            </div>

            <div className="col-8">
              {twoline ? (
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
                <>
                  {threeline ? (
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
                    <>
                      {fourline ? (
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
                        <>
                          {fiveline ? (
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
                            <>
                              {sixline ? (
                                <>
                                  <div className="col-md-12">
                                    <div className="do-sear mt-4">
                                      <p
                                        type="text"
                                        className="lined-input"
                                      ></p>
                                    </div>
                                  </div>{" "}
                                  <div className="col-md-12">
                                    <div className="do-sear mt-2">
                                      <p
                                        type="text"
                                        className="lined-input"
                                      ></p>
                                    </div>
                                  </div>{" "}
                                  <div className="col-md-12">
                                    <div className="do-sear mt-2">
                                      <p
                                        type="text"
                                        className="lined-input"
                                      ></p>
                                    </div>
                                  </div>{" "}
                                  <div className="col-md-12">
                                    <div className="do-sear mt-2">
                                      <p
                                        type="text"
                                        className="lined-input"
                                      ></p>
                                    </div>
                                  </div>{" "}
                                  <div className="col-md-12">
                                    <div className="do-sear mt-2">
                                      <p
                                        type="text"
                                        className="lined-input"
                                      ></p>
                                    </div>
                                  </div>{" "}
                                  <div className="col-md-12">
                                    <div className="do-sear mt-2">
                                      <p
                                        type="text"
                                        className="lined-input"
                                      ></p>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {sevenline ? (
                                    <>
                                      <div className="col-md-12">
                                        <div className="do-sear mt-4">
                                          <p
                                            type="text"
                                            className="lined-input"
                                          ></p>
                                        </div>
                                      </div>{" "}
                                      <div className="col-md-12">
                                        <div className="do-sear mt-2">
                                          <p
                                            type="text"
                                            className="lined-input"
                                          ></p>
                                        </div>
                                      </div>{" "}
                                      <div className="col-md-12">
                                        <div className="do-sear mt-2">
                                          <p
                                            type="text"
                                            className="lined-input"
                                          ></p>
                                        </div>
                                      </div>{" "}
                                      <div className="col-md-12">
                                        <div className="do-sear mt-2">
                                          <p
                                            type="text"
                                            className="lined-input"
                                          ></p>
                                        </div>
                                      </div>{" "}
                                      <div className="col-md-12">
                                        <div className="do-sear mt-2">
                                          <p
                                            type="text"
                                            className="lined-input"
                                          ></p>
                                        </div>
                                      </div>{" "}
                                      <div className="col-md-12">
                                        <div className="do-sear mt-2">
                                          <p
                                            type="text"
                                            className="lined-input"
                                          ></p>
                                        </div>
                                      </div>{" "}
                                      <div className="col-md-12">
                                        <div className="do-sear mt-2">
                                          <p
                                            type="text"
                                            className="lined-input"
                                          ></p>
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      {eightline ? (
                                        <>
                                          <div className="col-md-12">
                                            <div className="do-sear mt-4">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>{" "}
                                          <div className="col-md-12">
                                            <div className="do-sear mt-2">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>{" "}
                                          <div className="col-md-12">
                                            <div className="do-sear mt-2">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>{" "}
                                          <div className="col-md-12">
                                            <div className="do-sear mt-2">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>{" "}
                                          <div className="col-md-12">
                                            <div className="do-sear mt-2">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>{" "}
                                          <div className="col-md-12">
                                            <div className="do-sear mt-2">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>{" "}
                                          <div className="col-md-12">
                                            <div className="do-sear mt-2">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>{" "}
                                          <div className="col-md-12">
                                            <div className="do-sear mt-2">
                                              <p
                                                type="text"
                                                className="lined-input"
                                              ></p>
                                            </div>
                                          </div>
                                        </>
                                      ) : (
                                        <>
                                          {nineline ? (
                                            <>
                                              <div className="col-md-12">
                                                <div className="do-sear mt-4">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>{" "}
                                              <div className="col-md-12">
                                                <div className="do-sear mt-2">
                                                  <p
                                                    type="text"
                                                    className="lined-input"
                                                  ></p>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <>
                                              {tenline ? (
                                                <>
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-4">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>{" "}
                                                  <div className="col-md-12">
                                                    <div className="do-sear mt-2">
                                                      <p
                                                        type="text"
                                                        className="lined-input"
                                                      ></p>
                                                    </div>
                                                  </div>
                                                </>
                                              ) : (
                                                <></>
                                              )}
                                            </>
                                          )}
                                        </>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 1</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setImage1(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 2</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setImage2(e.target.files[0])}
                />
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-success mt-2 "
                onClick={() => {
                  addFields();
                }}
              >
                Add SubQuestion
              </button>
            </div>
            <Form>
              <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label htmlFor="">Sub Questions</label>
                  {formFields?.map((form, index) => {
                    return (
                      <div className="d-flex gap-2 mb-1">
                        {/* <CKEditor
                          style={{ width: "100%" }}
                          editor={ClassicEditor}
                          className="vi_0"
                          data={form.SubQue}                      
                          onChange={(e, editor) => handleChange1(index, editor.getData())}
                        /> */}

                        <MathEditor
                          style={{ width: "100%" }}
                          data={{
                            A: form.SubQue,
                            B: (data) => handleChange1(index, data),
                            selectedLanguage: selectdetails?.selectedLanguage,
                            trans: SubQuestionT,
                            settran: setSubQuestionT,
                          }}
                        />
                        <div style={{ padding: "1rem" }}>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              removeFields(index);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Form>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>
                {/* <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Answer}
                  onChange={handleChange2}
                /> */}
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

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <Form.Select
                  aria-label="Default select example"
                  className="vi_0"
                  onChange={(e) => {
                    setMarks(e.target.value);
                  }}
                >
                  <option>Select the Marks</option>
                  <option value="1/2">1/2</option>
                  <option value="1/4">1/4</option>
                  <option value="1/3">1/3</option>
                  <option value="1">1</option> 
                    <option value="1">1.5</option>
                  <option value="2">2</option> 
                   <option value="2">2.5</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="6">5</option>
                  <option value="7">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="10">10</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select
                  aria-label="Default select example"
                  className="vi_0"
                  onChange={(e) => {
                    setAnswer_Time(e.target.value);
                  }}
                >
                  <option>Select the Time</option>
                  <option value="1/2 Mnt">1/2 Mnt</option>
                  <option value="1/4 Mnt">1/4 Mnt</option>
                  <option value="1 mnt">1 mnt</option>
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
            Save
          </Button>
        </div>
      </div>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
          <Modal.Title style={{ color: "white" }}>Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-md-12">
            <div className="do-sear mt-2">
              <label htmlFor="">Question </label>
              <p className="vi_0">{parse(`<div>${Question}</div>`)}</p>
            </div>
          </div>
          <div className="row">
            {Image1 ? (
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Image 2</label>
                  <br />
                  <img
                    className=""
                    src={Image1 && URL.createObjectURL(Image1)}
                    alt="fig."
                    style={{
                      width: "30%",
                      height: "40%",
                    }}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 1 </label>
                <img
                  className="w-100 "
                  src={Image1 && URL.createObjectURL(Image1)}
                  alt="fig."
                  style={{width:"30%",height:"40%"}}
                />
              </div>
            </div> */}
            {/* <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 2 </label>
                <img
                  className="w-100 "
                  src={Image2 && URL.createObjectURL(Image2)}
                  alt="fig."
                />
              </div>
            </div> */}
            {Image2 ? (
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Image 2</label>
                  <br />
                  <img
                    className=""
                    src={Image2 && URL.createObjectURL(Image2)}
                    alt="fig."
                    style={{
                      width: "30%",
                      height: "40%",
                    }}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Sub Questions</label>
                {subQuestions?.map((form, index) => {
                  return (
                    <div className="d-flex gap-2 mb-1">
                      <p style={{ width: "100%" }} className="vi_0">
                        {parse(`<div>${form?.question}</div>`)}{" "}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="do-sear mt-2">
              <label htmlFor="">Answer</label>
              <p className="vi_0">
                <p className="vi_0">{parse(`<div>${Answer}</div>`)}</p>
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={() => {
                handleClose();
              }}
            >
              Edit
            </Button>
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={() => {
                addquestions();
              }}
            >
              Submit
            </Button>
            <Button
              className="mx-2 modal-close-btn"
              variant=""
              onClick={() => {
                handleClose();
                navigate(`/adminmcqquestions`);
              }}
            >
              Delete
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SituationAnalysis_add;

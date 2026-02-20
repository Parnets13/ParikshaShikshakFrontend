import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Table,
} from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaEye } from "react-icons/fa";
import "../../Admin/Admin.css";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import parse from "html-react-parser";
import { debounce } from "lodash";
import MathEditor from "../MyEditor";
let googleTransliterate = require("google-input-tool");

const AddClassification = ({ selectdetails }) => {
  const [show, setShow] = useState();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Line
  const [QuestionT, setQuestionT] = useState("");
  const [AnswerT, setAnswerT] = useState("");
  const [orQuestionT, setorQuestionT] = useState("");
  const [orAnswerT, setorAnswerT] = useState("");

  const [twoline, setTwoline] = useState(false);
  const [threeline, setThreeline] = useState(false);
  const [fourline, setFourline] = useState(false);
  const [fiveline, setFiveline] = useState(true);
  const [sixline, setSixline] = useState(false);
  const [sevenline, setSevenline] = useState(false);
  const [eightline, setEightline] = useState(false);
  const [nineline, setNineline] = useState(false);
  const [tenline, setTenline] = useState(false);

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const questiondata = JSON.parse(localStorage.getItem("selectdetails"));
  const [Question, setQuestion] = useState("");
  const [Answer, setAnswer] = useState("");
  const [orQuestion, setorQuestion] = useState("");
  const [orAnswer, setorAnswer] = useState("");
  const [Marks, setMarks] = useState("");
  const [Image, setImage] = useState("");
  const [Image_1, setImage_1] = useState("");
  const [Answer_Time, setAnswer_Time] = useState("");
  const [NumberOfLine, setNumberOfLine] = useState(1);
  const [Image_2, setImage_2] = useState("");

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
          Answer: Answer,
          orQuestion: orQuestion,
          orAnswer: orAnswer,
          Image: Image,
          Image_1: Image_1,
          NumberOfLine: NumberOfLine,
          Marks: Marks,
          Answer_Time: Answer_Time,
          Image_2: Image_2,
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
        handleClose();
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

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setQuestion(data);
  };
  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };
  const handleChange2 = (e, editor) => {
    const data = editor.getData();
    setorQuestion(data);
  };
  const handleChange3 = (e, editor) => {
    const data = editor.getData();
    setorAnswer(data);
  };

  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(
    questiondata?.selectedLanguage
  );
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
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      setAnswer_Time(e.target.value);
                    } else onChangeHandler(e.target.value, setAnswer_Time);
                  }}
                >
                  <option value="">Select</option>
                  <option value="1/2 minutes">1/2 minutes</option>
                  <option value="1/4 minutes">1/4 minutes</option>
                  <option value="1 minutes">1 minutes</option>
                  <option value="1.30 minutes">1.30 minutes</option>
                  <option value="1 minutes">1 minutes</option>
                  <option value="2 minutes">2 minutes</option>
                  <option value="3 minutes">3 minutes</option>
                  <option value="4 minutes">4 minutes</option>
                  <option value="5 minutes"> 5 minutes</option>
                  <option value="6 minutes">6 minutes</option>
                  <option value="7 minutes"> 7 minutes</option>
                  <option value="8 minutes"> 8 minutes</option>
                  <option value="9 minutes"> 9 minutes</option>
                  <option value="10 minutes">10 minutes</option>
                </Form.Select>
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{Answer_Time}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      setMarks(e.target.value);
                    } else onChangeHandler(e.target.value, setMarks);
                  }}
                >
                  <option value="">Select the Marks</option>
                  <option value={"1/2"}>1/2</option>
                  <option value={"1/4"}>1/4</option>
                  <option value={"1/3"}>1/3</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                  <option value={6}>6</option>
                  <option value={7}>7</option>
                  <option value={8}>8</option>
                  <option value={10}>10</option>{" "}
                </Form.Select>
                {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Marks}</p>}
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>
                {/* {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <textarea
                    name=""
                    id=""
                    className="vi_0"
                    placeholder="Write your text"
                    onChange={(event) =>
                      onChangeHandler(event.target.value, setQuestion)
                    }
                  ></textarea>
                )}
                <CKEditor 
                editor={ClassicEditor} 
                className="vi_0" 
                data={Question}
                  onChange={handleChange} /> */}

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
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>
                {/* {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <textarea
                    name=""
                    id=""
                    className="vi_0"
                    placeholder="Write your text"
                    onChange={(event) =>
                      onChangeHandler(event.target.value, setAnswer)
                    }
                  ></textarea>
                )}

                <CKEditor editor={ClassicEditor} className="vi_0" data={Answer}
                  onChange={handleChange1} /> */}
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

            <div>
              <h6 style={{ padding: "20px 0 0 0", textAlign: "center" }}>
                <b>(OR)</b>
              </h6>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="upload2">Image 1</label>
                <input
                  type="file"
                  className="vi_0"
                  id="upload2"
                  accept="images/*"
                  onChange={(e) => setImage_1(e.target.files[0])}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="upload3">Image 2</label>
                <input
                  type="file"
                  className="vi_0"
                  id="upload3"
                  onChange={(e) => setImage_2(e.target.files[0])}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>
                {/* {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <textarea
                    name=""
                    id=""
                    className="vi_0"
                    placeholder="Write your text"
                    onChange={(event) =>
                      onChangeHandler(event.target.value, setorQuestion)
                    }
                  ></textarea>
                )}
                <CKEditor editor={ClassicEditor} className="vi_0" data={orQuestion}
                  onChange={handleChange2} /> */}
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

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>

                {/* {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <textarea
                    name=""
                    id=""
                    className="vi_0"
                    placeholder="Write your text"
                    onChange={(event) =>
                      onChangeHandler(event.target.value, setorAnswer)
                    }
                  ></textarea>
                )}
                <CKEditor editor={ClassicEditor} className="vi_0" data={orAnswer}
                  onChange={handleChange3} /> */}

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
        </div>

        <div className="d-flex justify-content-center">
          <div className="yoihjij text-center my-2 p-2 ">
            <Button className="modal-add-btn" onClick={handleShow}>
              Save
            </Button>
          </div>

          <Modal
            show={show}
            onHide={handleClose}
            style={{ width: "100%" }}
            size="lg"
          >
            <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
              <Modal.Title style={{ color: "white" }}>Preview </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="container">
                <div className="row mt-2">
                  <div className="col-md-12">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Question</label>
                      <p>{Question ? parse(Question) : ""}</p>
                      <div className="col-12">
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
                                        <p
                                          type="text"
                                          className="lined-input"
                                        ></p>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="do-sear mt-2">
                                        <p
                                          type="text"
                                          className="lined-input"
                                        ></p>
                                      </div>
                                    </div>
                                    <div className="col-md-12">
                                      <div className="do-sear mt-2">
                                        <p
                                          type="text"
                                          className="lined-input"
                                        ></p>
                                      </div>
                                    </div>
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
                                    {fiveline ? (
                                      <>
                                        <div className="col-md-12">
                                          <div className="do-sear mt-4">
                                            <p
                                              type="text"
                                              className="lined-input"
                                            ></p>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="do-sear mt-2">
                                            <p
                                              type="text"
                                              className="lined-input"
                                            ></p>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="do-sear mt-2">
                                            <p
                                              type="text"
                                              className="lined-input"
                                            ></p>
                                          </div>
                                        </div>
                                        <div className="col-md-12">
                                          <div className="do-sear mt-2">
                                            <p
                                              type="text"
                                              className="lined-input"
                                            ></p>
                                          </div>
                                        </div>
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
                    </div>
                    {Image ? (
                      <img
                        className=""
                        src={Image && URL.createObjectURL(Image)}
                        alt="fig."
                        style={{
                          width: "30%",
                          height: "40%",
                        }}
                      />
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="col-md-12">
                    <div className="do-sear mt-2">
                      <div className="do-sear mt-2">
                        <label htmlFor="">Answer</label>

                        <p>{Answer ? parse(Answer) : ""}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h6 style={{ padding: "20px 0 0 0", textAlign: "center" }}>
                      <b>(OR)</b>
                    </h6>
                  </div>
                  {Image_1 ? (
                    <div className="col-md-6">
                      <div className="do-sear mt-2">
                        <label>Image 1</label>
                        <img
                          className=""
                          src={Image_1 && URL.createObjectURL(Image_1)}
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
                  {Image_2 ? (
                    <div className="col-md-6">
                      <div className="do-sear mt-2">
                        <label>Image 2</label>
                        <img
                          className=""
                          src={Image_2 && URL.createObjectURL(Image_2)}
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
                      <label htmlFor="">Question</label>
                      <p>{orQuestion ? parse(orQuestion) : ""}</p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Answer</label>
                      <p>{orAnswer ? parse(orAnswer) : ""}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="do-sear mt-2">
                      <label htmlFor=""> Answer Timing</label>
                      <p>{Answer_Time}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="do-sear mt-2">
                      <label htmlFor=""> Marks</label>
                      <p>{Marks}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-center m-auto">
                <div className="yoihjij text-center my-2 p-2 ">
                  <Button className="modal-add-btn" onClick={addquestions}>
                    Submit
                  </Button>
                </div>
                <div className="yoihjij text-center my-2 p-2 ">
                  <Button
                    className="mx-2 modal-close-btn"
                    variant=""
                    onClick={handleClose}
                  >
                    Edit
                  </Button>
                </div>
                <div className="yoihjij text-center my-2 p-2 ">
                  <Button
                    className="modal-add-btn"
                    onClick={() => {
                      navigate("/recorrectionanswer");
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default AddClassification;

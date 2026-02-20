import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
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
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import "../../../Admin/Admin.css";

import { debounce } from "lodash";
let googleTransliterate = require("google-input-tool");

const AddMatches = ({ selectdetails }) => {
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

  const [show, setShow] = useState();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [Part_A1, setPart_A1] = useState("");
  const [Part_A2, setPart_A2] = useState("");
  const [Part_A3, setPart_A3] = useState("");
  const [Part_A4, setPart_A4] = useState("");
  const [Part_A5, setPart_A5] = useState("");
  const [Part_A6, setPart_A6] = useState("");

  const [Part_B1, setPart_B1] = useState("");
  const [Part_B2, setPart_B2] = useState("");
  const [Part_B3, setPart_B3] = useState("");
  const [Part_B4, setPart_B4] = useState("");
  const [Part_B5, setPart_B5] = useState("");
  const [Part_B6, setPart_B6] = useState("");
  const [Part_B7, setPart_B7] = useState("");

  const [Part_C1, setPart_C1] = useState("");
  const [Part_C2, setPart_C2] = useState("");
  const [Part_C3, setPart_C3] = useState("");
  const [Part_C4, setPart_C4] = useState("");
  const [Part_C5, setPart_C5] = useState("");
  const [Part_C6, setPart_C6] = useState("");
  const [Part_C7, setPart_C7] = useState("");

  const [Part_A1_A, setPart_A1_A] = useState("");
  const [Part_A2_A, setPart_A2_A] = useState("");
  const [Part_A3_A, setPart_A3_A] = useState("");
  const [Part_A4_A, setPart_A4_A] = useState("");
  const [Part_A5_A, setPart_A5_A] = useState("");
  const [Part_A6_A, setPart_A6_A] = useState("");

  const [Part_B1_A, setPart_B1_A] = useState("");
  const [Part_B2_A, setPart_B2_A] = useState("");
  const [Part_B3_A, setPart_B3_A] = useState("");
  const [Part_B4_A, setPart_B4_A] = useState("");
  const [Part_B5_A, setPart_B5_A] = useState("");
  const [Part_B6_A, setPart_B6_A] = useState("");
  const [Part_B7_A, setPart_B7_A] = useState("");

  const [Part_C1_A, setPart_C1_A] = useState("");
  const [Part_C2_A, setPart_C2_A] = useState("");
  const [Part_C3_A, setPart_C3_A] = useState("");
  const [Part_C4_A, setPart_C4_A] = useState("");
  const [Part_C5_A, setPart_C5_A] = useState("");
  const [Part_C6_A, setPart_C6_A] = useState("");

  const [Marks, setMarks] = useState("");

  const [Answer_Time, setAnswer_Time] = useState("");
  const [ImageQ, setImageQ] = useState("");

  const AddQuestion = async () => {
    try {
      let config = {
        url: "/admin/AddQuestionPaper",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: {
          "content-type": "multipart/form-data",
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

          Part_A1: Part_A1,
          Part_A2: Part_A2,
          Part_A3: Part_A3,
          Part_A4: Part_A4,
          Part_A5: Part_A5,
          Part_A6: Part_A6,
          Part_B1: Part_B1,
          Part_B2: Part_B2,
          Part_B3: Part_B3,
          Part_B4: Part_B4,
          Part_B5: Part_B5,
          Part_B6: Part_B6,
          Part_B7: Part_B7,
          Part_C1: Part_C1,
          Part_C2: Part_C2,
          Part_C3: Part_C3,
          Part_C4: Part_C4,
          Part_C5: Part_C5,
          Part_C6: Part_C6,
          Part_C7: Part_C7,
          Part_A1_A: Part_A1_A,
          Part_A2_A: Part_A2_A,
          Part_A3_A: Part_A3_A,
          Part_A4_A: Part_A4_A,
          Part_A5_A: Part_A5_A,
          Part_A6_A: Part_A6_A,
          Part_B1_A: Part_B1_A,
          Part_B2_A: Part_B2_A,
          Part_B3_A: Part_B3_A,
          Part_B4_A: Part_B4_A,
          Part_B5_A: Part_B5_A,
          Part_B6_A: Part_B6_A,
          Part_B7_A: Part_B7_A,
          Part_C1_A: Part_C1_A,
          Part_C2_A: Part_C2_A,
          Part_C3_A: Part_C3_A,
          Part_C4_A: Part_C4_A,
          Part_C5_A: Part_C5_A,
          Part_C6_A: Part_C6_A,
          authId: admin?._id,

          Marks: Marks,
          Answer_Time: Answer_Time,
          ImageQ: ImageQ,
        },
      };
      let res = await axios(config);
      if (res.status == 200)
        swal({
          title: "yeah!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
      localStorage.removeItem("selectdetails");
      return navigate("/adminquestions");
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

  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label
                  htmlFor=""
                  onChange={(e) => {
                    setImageQ(e.target.files[0]);
                  }}
                >
                  Image
                </label>
                <input type="file" className="vi_0" />
              </div>
            </div>

            <Container>
              <div className="mt-2">
                <label htmlFor=""> Question</label>

                <div className="row">
                  <div className="col-md-4">
                    <div className="do-sear mt-2">
                      <label
                        htmlFor=""
                        className="d-flex justify-content-center"
                      >
                        {" "}
                        PART A
                      </label>
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Question"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_A1(e.target.value)
                            : onChangeHandler(e.target.value, setPart_A1)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_A1}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Question"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_A2(e.target.value)
                            : onChangeHandler(e.target.value, setPart_A2)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_A2}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Question"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_A3(e.target.value)
                            : onChangeHandler(e.target.value, setPart_A3)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_A3}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Question"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_A4(e.target.value)
                            : onChangeHandler(e.target.value, setPart_A4)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_A4}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Question"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_A5(e.target.value)
                            : onChangeHandler(e.target.value, setPart_A5)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_A5}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Question"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_A6(e.target.value)
                            : onChangeHandler(e.target.value, setPart_A6)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_A6}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="do-sear mt-2">
                      <label
                        htmlFor=""
                        className="d-flex justify-content-center"
                      >
                        {" "}
                        PART B
                      </label>
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_B1(e.target.value)
                            : onChangeHandler(e.target.value, setPart_B1)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_B1}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_B2(e.target.value)
                            : onChangeHandler(e.target.value, setPart_B2)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_B2}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_B3(e.target.value)
                            : onChangeHandler(e.target.value, setPart_B3)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_B3}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_B4(e.target.value)
                            : onChangeHandler(e.target.value, setPart_B4)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_B4}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_B5(e.target.value)
                            : onChangeHandler(e.target.value, setPart_B5)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_B5}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_B6(e.target.value)
                            : onChangeHandler(e.target.value, setPart_B6)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_B6}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_B7(e.target.value)
                            : onChangeHandler(e.target.value, setPart_B7)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_B7}</p>
                      )}
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="do-sear mt-2">
                      <label
                        htmlFor=""
                        className="d-flex justify-content-center"
                      >
                        {" "}
                        PART C
                      </label>
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_C1(e.target.value)
                            : onChangeHandler(e.target.value, setPart_C1)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_C1}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_C2(e.target.value)
                            : onChangeHandler(e.target.value, setPart_C2)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_C2}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_C3(e.target.value)
                            : onChangeHandler(e.target.value, setPart_C3)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_C3}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_C4(e.target.value)
                            : onChangeHandler(e.target.value, setPart_C4)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_C4}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_C5(e.target.value)
                            : onChangeHandler(e.target.value, setPart_C5)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_C5}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_C6(e.target.value)
                            : onChangeHandler(e.target.value, setPart_C6)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_C6}</p>
                      )}
                      <input
                        type="text"
                        className="vi_0 mb-2"
                        placeholder="Enter Your Answer"
                        onChange={(e) =>
                          selectdetails?.selectedLanguage == "en-t-i0-und"
                            ? setPart_C7(e.target.value)
                            : onChangeHandler(e.target.value, setPart_C7)
                        }
                      />
                      {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Part_C7}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Container>

            <Container>
              <label htmlFor=""> Answer</label>

              <div className="row">
                <div className="col-md-4">
                  <div className="do-sear mt-2">
                    <label htmlFor="" className="d-flex justify-content-center">
                      {" "}
                      PART A
                    </label>
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_A1_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_A1_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_A1_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_A2_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_A2_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_A2_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_A3_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_A3_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_A3_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_A4_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_A4_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_A4_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_A5_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_A5_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_A5_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_A6_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_A6_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_A6_A}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="do-sear mt-2">
                    <label htmlFor="" className="d-flex justify-content-center">
                      {" "}
                      PART B
                    </label>
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_B1_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_B1_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_B1_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_B2_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_B2_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_B2_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_B3_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_B3_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_B3_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_B4_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_B4_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_B4_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_B5_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_B5_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_B5_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_B6_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_B6_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_B6_A}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="do-sear mt-2">
                    <label htmlFor="" className="d-flex justify-content-center">
                      {" "}
                      PART C
                    </label>
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_C1_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_C1_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_C1_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_C2_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_C2_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_C2_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_C3_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_C3_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_C3_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_C4_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_C4_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_C4_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_C5_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_C5_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_C5_A}</p>
                    )}
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                      onChange={(e) =>
                        selectdetails?.selectedLanguage == "en-t-i0-und"
                          ? setPart_C6_A(e.target.value)
                          : onChangeHandler(e.target.value, setPart_C6_A)
                      }
                    />
                    {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Part_C6_A}</p>
                    )}
                  </div>
                </div>
              </div>
            </Container>
            <div className="col-md-6">
              <div className="do-sear mt-2">
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
          </div>
        </div>

        <div className="d-flex justify-content-center">
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
            <Button className="modal-add-btn" onClick={handleShow}>
              Save
            </Button>
          </div>

          <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
              <Modal.Title style={{ color: "white" }}>Preview </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col-md-6">
                <div className="do-sear mt-2">
                  <label>Image</label>
                  <br />
                  <img
                    className=""
                    src={ImageQ && URL.createObjectURL(ImageQ)}
                    alt="fig."
                    style={{
                      width: "30%",
                      height: "40%",
                    }}
                  />
                </div>
              </div>

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
                      <td>{Part_A1}</td>
                      <td>{Part_B1}</td>
                      <td>{Part_C1}</td>
                    </tr>
                    <tr>
                      <td>{Part_A2}</td>
                      <td>{Part_B2}</td>
                      <td>{Part_C2}</td>
                    </tr>
                    <tr>
                      <td>{Part_A3}</td>
                      <td>{Part_B3}</td>
                      <td>{Part_C3}</td>
                    </tr>
                    <tr>
                      <td>{Part_A4}</td>
                      <td>{Part_B4}</td>
                      <td>{Part_C4}</td>
                    </tr>
                    <tr>
                      <td>{Part_A5}</td>
                      <td>{Part_B5}</td>
                      <td>{Part_C5}</td>
                    </tr>
                    <tr>
                      <td>{Part_A6}</td>
                      <td>{Part_B6}</td>
                      <td>{Part_C6}</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>{Part_B7}</td>
                      <td>{Part_C7}</td>
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
                      <td>{Part_A1_A}</td>
                      <td>{Part_B1_A}</td>
                      <td>{Part_C1_A}</td>
                    </tr>
                    <tr>
                      <td>{Part_A2_A}</td>
                      <td>{Part_B2_A}</td>
                      <td>{Part_C2_A}</td>
                    </tr>
                    <tr>
                      <td>{Part_A3_A}</td>
                      <td>{Part_B3_A}</td>
                      <td>{Part_C3_A}</td>
                    </tr>
                    <tr>
                      <td>{Part_A4_A}</td>
                      <td>{Part_B4_A}</td>
                      <td>{Part_C4_A}</td>
                    </tr>
                    <tr>
                      <td>{Part_A5_A}</td>
                      <td>{Part_B5_A}</td>
                      <td>{Part_C5_A}</td>
                    </tr>
                    <tr>
                      <td>{Part_A6_A}</td>
                      <td>{Part_B6_A}</td>
                      <td>{Part_C6_A}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              {/* </div> */}
            </Modal.Body>
            <Modal.Footer>
              <div className="d-flex justify-content-center m-auto">
                <div className="yoihjij text-center my-2 p-2 ">
                  <Button
                    className="modal-add-btn"
                    onClick={() => {
                      AddQuestion();
                    }}
                  >
                    Submit
                  </Button>
                </div>
                <div className="yoihjij text-center my-2 p-2 ">
                  <Button
                    className="mx-2 modal-close-btn"
                    variant=""
                    // onClick={() => {
                    //   navigate("/onesentenceeditanswer");
                    // }}
                    onClick={handleClose}
                  >
                    Edit
                  </Button>
                </div>
                <div className="yoihjij text-center my-2 p-2 ">
                  <Button
                    className="modal-add-btn"
                    onClick={() => {
                      navigate("/matchthefollowing");
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

export default AddMatches;

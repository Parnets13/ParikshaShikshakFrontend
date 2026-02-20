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

const Objective_add = ({ selectdetails }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  //post
  const [QuestionT, setQuestionT] = useState("");
  const [Question, setQuestion] = useState("");
  const [Option_1, setOption_1] = useState("");
  const [Option_2, setOption_2] = useState("");
  const [AnswerT, setAnswerT] = useState("");
  const [Answer, setAnswer] = useState("");
  const [ImageQ, setImageQ] = useState("");
  const [Image_Ans, setImage_Ans] = useState("");
  const [Marks, setMarks] = useState("");
  const [Image_1, setImage_1] = useState("");
  const [Image_2, setImage_2] = useState("");
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

          Question: Question,
          Option_1: Option_1,
          Option_2: Option_2,
          Answer: Answer,

          ImageQ: ImageQ,
          Image_1: Image_1,
          Image_2: Image_2,
          Image_Ans: Image_Ans,

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
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question 1 </label>
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
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 1</label>
                <input
                  type="text"
                  className="vi_0"
                  onChange={(e) =>
                    selectdetails?.selectedLanguage == "en-t-i0-und"
                      ? setOption_1(e.target.value)
                      : onChangeHandler(e.target.value, setOption_1)
                  }
                />
                {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{Option_1}</p>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2</label>

                <input
                  type="text"
                  className="vi_0"
                  onChange={(e) =>
                    selectdetails?.selectedLanguage == "en-t-i0-und"
                      ? setOption_2(e.target.value)
                      : onChangeHandler(e.target.value, setOption_2)
                  }
                />
                {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{Option_2}</p>
                )}
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer 1</label>
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
            <div className="mt-4">
              <label
                htmlFor=""
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                (OR)
              </label>
            </div>

            <div className="col-md-12">
              <div className="do-sear">
                <label htmlFor="">Image Question</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setImageQ(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Image 1</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setImage_1(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Image 2</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setImage_2(e.target.files[0])}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear">
                <label htmlFor="">Answer Image</label>
                <input
                  type="file"
                  className="vi_0"
                  onChange={(e) => setImage_Ans(e.target.files[0])}
                />
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
              //   addquestions();
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
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 1 </label>
                <p className="vi_0">{parse(`<div>${Option_1}</div>`)}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2 </label>
                <p className="vi_0">{parse(`<div>${Option_2}</div>`)}</p>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="do-sear mt-2">
              <label htmlFor="">Answer</label>
              <p className="vi_0">{parse(`<div>${Answer}</div>`)}</p>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor=""
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              (OR)
            </label>
          </div>
          <div className="col-md-12">
            <div className="do-sear mt-2">
              <label htmlFor="">Image Question</label>
              <div>
                <img
                  style={{ width: "200px", height: "140px" }}
                  src={ImageQ && URL.createObjectURL(ImageQ)}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 1 </label>
                <div>
                  <img
                    style={{ width: "200px", height: "140px" }}
                    src={Image_1 && URL.createObjectURL(Image_1)}
                    alt=""
                  />
                </div>{" "}
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2 </label>
                <div>
                  <img
                    style={{ width: "200px", height: "140px" }}
                    src={Image_2 && URL.createObjectURL(Image_2)}
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="do-sear mt-2">
              <label htmlFor="">Image Answer</label>
              <div>
                <img
                  style={{ width: "200px", height: "140px" }}
                  src={Image_Ans && URL.createObjectURL(Image_Ans)}
                  alt=""
                />
              </div>
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
                handleClose();
              }}
            >
              Submit
            </Button>
            <Button
              className="mx-2 modal-close-btn"
              variant=""
              onClick={() => {
                handleClose();
                navigate(`/Classlkg`);
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
export default Objective_add;

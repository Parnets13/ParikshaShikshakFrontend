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

const OddandOut_add = ({ selectdetails }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setQuestion(data);
  };
  const handleChange1 = (e, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };

  const handleChange3 = (e, editor) => {
    const data = editor.getData();
    setOption_1(data);
  };
  const handleChange4 = (e, editor) => {
    const data = editor.getData();
    setOption_2(data);
  };
  const handleChange5 = (e, editor) => {
    const data = editor.getData();
    setOption_3(data);
  };
  const handleChange6 = (e, editor) => {
    const data = editor.getData();
    setOption_4(data);
  };
  const handleChange7 = (e, editor) => {
    const data = editor.getData();
    setAnswer(data);
  };
  //post
  // const [QuestionT, setQuestionT] = useState("");

  const [Question, setQuestion] = useState("");

  const [Option1T, setOption1T] = useState("");
  const [Option2T, setOption2T] = useState("");
  const [Option3T, setOption3T] = useState("");
  const [Option4T, setOption4T] = useState("");
  const [AnswerT, setAnswerT] = useState("");

  const [Option_1, setOption_1] = useState("");
  const [Option_2, setOption_2] = useState("");
  const [Option_3, setOption_3] = useState("");
  const [Option_4, setOption_4] = useState("");

  const [Image_1, setImage_1] = useState("");
  const [Image_2, setImage_2] = useState("");
  const [Image_3, setImage_3] = useState("");
  const [Image_4, setImage_4] = useState("");
  const [Image_Ans, setImage_Ans] = useState("");

  const [Marks, setMarks] = useState("");
  const [Answer, setAnswer] = useState("");

  const [Answer_Time, setAnswer_Time] = useState("");

  const questiondata = JSON.parse(localStorage.getItem("selectdetails"));

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

          // Question: Question,
          Option_1: Option_1,
          Option_2: Option_2,
          Option_3: Option_3,
          Option_4: Option_4,

          Image_Ans: Image_Ans,
          Image_1: Image_1,
          Image_2: Image_2,
          Image_3: Image_3,
          Image_4: Image_4,
          Marks: Marks,
          Answer_Time: Answer_Time,
          Answer: Answer,
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
                <label htmlFor="">Option 1</label>

                {/* <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Option_1}
                  onChange={handleChange3}
                /> */}
                <MathEditor
                  data={{
                    A: Option_1,
                    B: setOption_1,
                    selectedLanguage: selectdetails?.selectedLanguage,
                    trans: Option1T,
                    settran: setOption1T,
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2</label>

                {/* <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Option_2}
                  onChange={handleChange4}
                /> */}
                <MathEditor
                  data={{
                    A: Option_2,
                    B: setOption_2,
                    selectedLanguage: selectdetails?.selectedLanguage,
                    trans: Option2T,
                    settran: setOption2T,
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 3</label>

                {/* <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Option_3}
                  onChange={handleChange5}
                /> */}

                <MathEditor
                  data={{
                    A: Option_3,
                    B: setOption_3,
                    selectedLanguage: selectdetails?.selectedLanguage,
                    trans: Option3T,
                    settran: setOption3T,
                  }}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 4</label>

                {/* <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Option_4}
                  onChange={handleChange6}
                /> */}

                <MathEditor
                  data={{
                    A: Option_4,
                    B: setOption_4,
                    selectedLanguage: selectdetails?.selectedLanguage,
                    trans: Option4T,
                    settran: setOption4T,
                  }}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>

                {/* <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Answer}
                  onChange={handleChange7}
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

            <div className="mt-4">
              <label
                htmlFor=""
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                (OR)
              </label>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="upload1">Image 1</label>
                <input
                  type="file"
                  className="vi_0"
                  id="upload1"
                  accept="images/*"
                  onChange={(e) => setImage_1(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="upload2">Image 2</label>
                <input
                  type="file"
                  className="vi_0"
                  id="upload2"
                  accept="images/*"
                  onChange={(e) => setImage_2(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="upload3">Image 3</label>
                <input
                  type="file"
                  className="vi_0"
                  id="upload3"
                  accept="images/*"
                  onChange={(e) => setImage_3(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="upload4">Image 4</label>
                <input
                  type="file"
                  className="vi_0"
                  id="upload4"
                  accept="images/*"
                  onChange={(e) => setImage_4(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Image Answer</label>
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
                  onChange={(e) => setMarks(e.target.value)}
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select
                  className="vi_0"
                  onChange={(e) => setAnswer_Time(e.target.value)}
                >
                  <option value="">Select</option>
                  <option value="1/2 Mnt">1/2 Mnt</option>
                  <option value="1/4 Mnt">1/4 Mnt</option>
                  <option value="1 Mnt">1 Mnt</option>
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
              </div>
            </div>
            {/* <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Answer Time</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter the answer time"
                />
              </div>
            </div> */}

            {/* <div className="yoihjij my-4">
              <button style={{ float: "right" }}>Add</button>
            </div> */}
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
          <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 1</label>
                <p className="vi_0">{Option_1 ? parse(Option_1) : ""}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2</label>
                <p className="vi_0">{Option_2 ? parse(Option_2) : ""}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 3</label>
                <p className="vi_0">{Option_3 ? parse(Option_3) : ""}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 4</label>
                <p className="vi_0">{Option_4 ? parse(Option_4) : ""}</p>
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>
                <p className="vi_0">{Answer ? parse(Answer) : ""}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 1</label>
                {Image_1 ? (
                  <img
                    className=""
                    src={Image_1 && URL.createObjectURL(Image_1)}
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
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 2</label>
                {Image_2 ? (
                  <img
                    className=""
                    src={Image_2 && URL.createObjectURL(Image_2)}
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
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 3</label>
                {Image_3 ? (
                  <img
                    className=""
                    src={Image_3 && URL.createObjectURL(Image_3)}
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
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 4</label>
                {Image_4 ? (
                  <img
                    className=""
                    src={Image_4 && URL.createObjectURL(Image_4)}
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
            </div>
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Image Answer</label>
                {Image_Ans ? (
                  <img
                    className=""
                    src={Image_Ans && URL.createObjectURL(Image_Ans)}
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
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={() => {
                // AddSubject();
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
                navigate(`/adminoddandout`);
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
export default OddandOut_add;

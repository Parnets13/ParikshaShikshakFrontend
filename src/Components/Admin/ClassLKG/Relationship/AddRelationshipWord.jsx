import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import swal from "sweetalert";
import parse from "html-react-parser";
let googleTransliterate = require("google-input-tool");

const AddRelationshipWord = ({ selectdetails }) => {
  const [show, setShow] = useState();

  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const questiondata = JSON.parse(localStorage.getItem("selectdetails"));

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

  const [RealetionA, setRealetionA] = useState("");
  const [Answer, setAnswer] = useState("");
  const [RealetionB, setRealetionB] = useState("");
  const [RealetionC, setRealetionC] = useState("");
  const [Marks, setMarks] = useState("");
  const [Image, setImage] = useState("");
  const [Image_1, setImage_1] = useState("");
  const [Answer_Time, setAnswer_Time] = useState("");
  const [NumberOfLine, setNumberOfLine] = useState(4);
  const [Image_2, setImage_2] = useState("");
  const [Option_1, setOption_1] = useState("");
  const [Option_2, setOption_2] = useState("");
  const [Option_3, setOption_3] = useState("");
  const [Option_4, setOption_4] = useState("");

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

          RealetionA: RealetionA,
          Answer: Answer,
          RealetionB: RealetionB,
          RealetionC: RealetionC,
          Image: Image,

          Image_1: Image_1,
          Option_1: Option_1,
          Option_2: Option_2,
          Option_3: Option_3,
          Option_4: Option_4,

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

  return (
    <div>
      <div className="">
        <div className="container">
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="upload1">Image</label>
                <input
                  type="file"
                  className="vi_0"
                  id="upload1"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>

                <div className="row">
                  <div className="col-md-3">
                    <div className="do-sear mt-2 d-flex justify-content-space-evenly">
                      <div>
                        <input
                          type="text"
                          className="vi_0"
                          placeholder="Enter The question"
                          // value={RealetionA}
                          onChange={(e) =>
                            selectdetails?.selectedLanguage == "en-t-i0-und"
                              ? setRealetionA(e.target.value)
                              : onChangeHandler(e.target.value, setRealetionA)
                          }
                        />
                        {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{RealetionA}</p>
                        )}
                      </div>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="do-sear mt-2 d-flex">
                      <div>
                        <input
                          type="text"
                          className="vi_0"
                          placeholder="Enter The question"
                          // value={RealetionB}
                          // onChange={(e)=>setRealetionB(e.target.value)}
                          onChange={(e) =>
                            selectdetails?.selectedLanguage == "en-t-i0-und"
                              ? setRealetionB(e.target.value)
                              : onChangeHandler(e.target.value, setRealetionB)
                          }
                        />
                        {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{RealetionB}</p>
                        )}
                      </div>

                      <p className="m-2 ">::</p>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="do-sear mt-2 d-flex">
                      <div>
                        <input
                          type="text"
                          className="vi_0"
                          placeholder="Enter The question"
                          // value={RealetionC}
                          // onChange={(e)=>setRealetionC(e.target.value)}
                          onChange={(e) =>
                            selectdetails?.selectedLanguage == "en-t-i0-und"
                              ? setRealetionC(e.target.value)
                              : onChangeHandler(e.target.value, setRealetionC)
                          }
                        />
                        {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{RealetionC}</p>
                        )}
                      </div>
                      <p className="m-2">:</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="do-sear mt-2">
                      <p
                        className=""
                        style={{
                          borderBottom: "1px solid",
                          marginTop: "45px",
                          marginBottom: "0px",
                        }}
                      ></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option A)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                  // value={Option_1}
                  // onChange={(e)=>setOption_1(e.target.value)}
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
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>
            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option B)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                  // value={Option_2}
                  // onChange={(e)=>setOption_2(e.target.value)}
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
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>

            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option C)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                  // value={Option_3}
                  // onChange={(e)=>setOption_3(e.target.value)}
                  onChange={(e) =>
                    selectdetails?.selectedLanguage == "en-t-i0-und"
                      ? setOption_3(e.target.value)
                      : onChangeHandler(e.target.value, setOption_3)
                  }
                />
                {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{Option_3}</p>
                )}
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>
            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option D)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                  // value={Option_4}
                  // onChange={(e)=>setOption_4(e.target.value)}
                  onChange={(e) =>
                    selectdetails?.selectedLanguage == "en-t-i0-und"
                      ? setOption_4(e.target.value)
                      : onChangeHandler(e.target.value, setOption_4)
                  }
                />
                {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{Option_4}</p>
                )}
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <div className="do-sear mt-2">
                  <label htmlFor="">Answer</label>
                  {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
                  <input
                    type="text"
                    className="vi_0"
                    placeholder="Enter The question"
                    // value={Answer}
                    // onChange={(e)=>setAnswer(e.target.value)}
                    onChange={(e) =>
                      selectdetails?.selectedLanguage == "en-t-i0-und"
                        ? setAnswer(e.target.value)
                        : onChangeHandler(e.target.value, setAnswer)
                    }
                  />
                  {selectdetails?.selectedLanguage == "en-t-i0-und" ? (
                    <></>
                  ) : (
                    <p>{Answer}</p>
                  )}
                </div>
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
                  <div className="col-md-6">
                    <div className="do-sear mt-2">
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
                  </div>

                  <div className="col-md-12">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Question</label>

                      <div className="row">
                        <div className="col-md-3">
                          <div className="do-sear mt-2 d-flex">
                            <p className="vi_0">{RealetionA}</p>
                            <p className="m-2">:</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="do-sear mt-2 d-flex">
                            <p className="vi_0">{RealetionB}</p>
                            <p className="m-2 ">::</p>
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="do-sear mt-2 d-flex">
                            <p className="vi_0">{RealetionC}</p>
                            <p className="m-2">:</p>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="do-sear mt-2">
                            <p
                              className=""
                              style={{
                                borderBottom: "1px solid",
                                marginTop: "45px",
                                marginBottom: "0px",
                              }}
                            ></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Option A)</label>
                      <p>{Option_1}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Option B)</label>
                      <p>{Option_2}</p>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Option C)</label>
                      <p>{Option_3}</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="do-sear mt-2">
                      <label htmlFor="">Option D)</label>
                      <p>{Option_4}</p>
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="do-sear mt-2">
                      <div className="do-sear mt-2">
                        <label htmlFor="">Answer</label>
                        <p>{Answer}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="do-sear mt-2">
                      <label htmlFor=""> Marks</label>
                      <p>{Marks}</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="do-sear mt-2">
                      <label htmlFor=""> Answer Timing</label>
                      <p>{Answer_Time}</p>
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
                      navigate("/Classlkg");
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

export default AddRelationshipWord;

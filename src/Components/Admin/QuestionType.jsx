import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import Button2 from "../Button2";

function QuestionType() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  //Translate
  let googleTransliterate = require("google-input-tool");
  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };
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

  //get method for medium
  const [Medium, setMedium] = useState([]);
  const getAddMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status === 200) {
        setMedium(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Post
  const [typeOfquestion, settypeOfquestion] = useState("");
  const [Qformat, setQformat] = useState("");
  const [QFormatMedium, setQFormatMedium] = useState("");
  const [Translater, setTranslater] = useState("");
  const AddQuestionTYpe = async () => {
    if (!QFormatMedium) return alert("Please select medium");
    if (!Qformat) return alert("Please enter question format");
    if (!typeOfquestion) return alert("Please select question type");
    try {
      const config = {
        url: "/admin/addquestiontype",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          QFormatMedium: QFormatMedium,
          typeOfquestion: typeOfquestion,
          Qformat: Qformat,
          translatelang: Translater,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose();
        setQformat("");
        setQFormatMedium("");
    
        getallQuestiontype();
        return swal({
          title: "Yeah!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
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
  //get
  const [QuestionType, setQuestionType] = useState([]);
  const getallQuestiontype = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getquestiontype/" +
          admin?._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 200) {
        setQuestionType(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update
  const [QuestionTypeId, setQuestionTypeId] = useState("");
  const UpdateQuestionType = async () => {
    try {
      const config = {
        url: "/admin/updateQuestionType",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          QFormatMedium: QFormatMedium,
          typeOfquestion: typeOfquestion,
          Qformat: Qformat,
          authId: admin?._id,
          id: QuestionTypeId,
        },
      };
      let res = await axios(config);
      if (res.status == 200)
        if (res.status == 200) {
          handleClose1();
          getallQuestiontype();
          return swal({
            title: "Yeah!",
            text: res.data.success,
            icon: "success",
            button: "Ok!",
          });
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
  //delete
  const DeleteQuestionType = async () => {
    try {
      const config = {
        url: "/admin/deleteQtype/" + QuestionTypeId?._id + "/" + admin?._id,
        method: "delete",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose2();
        getallQuestiontype();
        return swal({
          title: "Yeah!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
      }
    } catch (error) {
      console.log(error);
      handleClose2();
      return swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "Ok!",
      });
    }
  };

  useEffect(() => {
    getallQuestiontype();
    getAddMedium();
  }, []);

  const questionTypes = [
    "Objective Questions",
    "Multiple Choice Questions",
    "Fill in the Blanks Questions",
    "Match the Following Questions",
    "Recorrect the Answers Questions",
    "Classifications of Questions",
    "Odd and out words Questions",
    "RelationShip Words Questions",
    "Grammer Questions",
    "One Word Question",
    "One Sentence Answer Question",
    "Two Sentence Answer Questions",
    "Two and three Sentence Answer Questions",
    "Three and Four Sentence Answer Questions",
    "Five and Six Sentence Answer Questions",
    "Six Sentence Answer Questions",
    "Seven Sentence Answer Questions",
    "Eight Sentence Answer Questions",
    "Ten Sentence Answer Questions",
    "Expanding and Explanations Answer Questions",
    "Answer the Questions and Draw the Figure Questions",
    "Graph Questions",
    "Complete the Poem",
    "Situation UnderStatnding answer Questions",
    "Poet,Time, Place, Writer answer questions",
    "Letter Writting",
    "Map Reading",
  ];
  return (
    <>
      <div className="row">
        <div className="col-md-10"></div>
        <div className="col-md-2">
          <label htmlFor="">Select Langauge</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="vi_0"
            style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
          >
            <option value="en-t-i0-und">English</option>
            <option value="ne-t-i0-und">Nepali</option>
            <option value="hi-t-i0-und">Hindi</option>
            <option value="kn-t-i0-und">Kannada</option>
            <option value="ta-t-i0-und">Tamil</option>
            <option value="pa-t-i0-und">Punjabi</option>
            <option value="mr-t-i0-und">Marathi</option>
            <option value="ur-t-i0-und">Urdu</option>
            <option value="sa-t-i0-und">Sanskrit</option>
          </select>
        </div>
      </div>
      <div className="col-lg-4 d-flex justify-content-center">
        <div class="input-group ">
          <span class="input-group-text" id="basic-addon1">
            <BsSearch />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Question Type</h2>

          <Link onClick={handleShow}>
            <Button2 text={"Add Type"} />
          </Link>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  <div>Medium</div>
                </th>
                <th>
                  <div>Type Of Question</div>
                </th>
                <th>
                  <div>Question Format</div>
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {QuestionType?.map((item, i) => {
                return (
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item?.QFormatMedium}</td>

                    <td>{item?.typeOfquestion}</td>
                    <td>
                      {item?.translatelang ? (
                        <>{item?.translatelang} </>
                      ) : (
                        <>{item?.Qformat}</>
                      )}
                    </td>

                    <td>
                      {" "}
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                          <BiSolidEdit
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow1();
                              setQuestionTypeId(item?._id);
                            }}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setQuestionTypeId(item);
                              handleShow2();
                            }}
                          />{" "}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* Add Package modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>
              Add Type Of Question
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label> Medium</label>
                <Form.Select
                  required
                  className="vi_0"
                  onChange={(e) => setQFormatMedium(e.target.value)}
                >
                  <option>Select medium</option>
                  {Medium?.map((item) => {
                    return (
                      <option value={item?.mediumName}>
                        {item?.mediumName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>

              <div className="do-sear mt-2">
                <label>Type Of Question</label>
                <input
                  type="text"
                  placeholder="Enter Type Of Question"
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      settypeOfquestion(e.target.value);
                    } else onChangeHandler(e.target.value, settypeOfquestion);
                  }}
                  required
                />
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{typeOfquestion}</p>
                )}
              </div>
              <div className="do-sear mt-2">
                <label> Question Format</label>
                <Form.Select
                  className="vi_0"
                  required
                  onChange={(e) => setQformat(e.target.value)}
                >
                  <option>Select Format</option>
                  {questionTypes?.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </Form.Select>
                {selectedLanguage === "en-t-i0-und" ? (
                  <></>
                ) : (
                  <>
                    <Form.Control
                      type="text"
                      className="vi_0 mt-1"
                      onChange={(e) => {
                        if (selectedLanguage == "en-t-i0-und") {
                          setTranslater(e.target.value);
                        } else onChangeHandler(e.target.value, setTranslater);
                      }}
                    />
                    {selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>  
                        {Translater} 
                        </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2 modal-close-btn"
                variant=""
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={() => {
                  AddQuestionTYpe();
                }}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "rgb(40 167 223)" }}
          >
            <Modal.Title style={{ color: "white" }}>Edit Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label> Medium</label>
                <Form.Select
                  className="vi_0"
                  value={QFormatMedium}
                  onChange={(e) => setQFormatMedium(e.target.value)}
                >
                  <option>Select medium</option>
                  {Medium?.map((item) => {
                    return (
                      <option value={item?.mediumName}>
                        {item?.mediumName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>

              <div className="do-sear mt-2">
                <label>Type Of Question</label>
                <input
                  type="text"
                  placeholder={typeOfquestion}
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      settypeOfquestion(e.target.value);
                    } else onChangeHandler(e.target.value, settypeOfquestion);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{typeOfquestion}</p>
                )}
              </div>
              <div className="do-sear mt-2">
                <label> Question Format</label>
                <Form.Select
                  className="vi_0"
                  placeholder={Qformat}
                  // value={Qformat}
                  onChange={(e) => setQformat(e.target.value)}
                >
                  <option>Select Format</option>
                  {questionTypes?.map((item) => {
                    return <option value={item}>{item}</option>;
                  })}
                </Form.Select>
                {selectedLanguage === "en-t-i0-und" ? (
                  <></>
                ) : (
                  <>
                    <Form.Control
                      type="text"
                      className="vi_0 mt-1"
                      onChange={(e) => {
                        if (selectedLanguage == "en-t-i0-und") {
                          setTranslater(e.target.value);
                        } else onChangeHandler(e.target.value, setTranslater);
                      }}
                    />
                    {selectedLanguage == "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Translater}</p>
                    )}
                  </>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={() => {
                UpdateQuestionType();
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={show2}
          onHide={handleClose2}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <p className="fs-4" style={{ color: "red" }}>
                  Are you sure...! You want to delete this data..?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={DeleteQuestionType}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default QuestionType;

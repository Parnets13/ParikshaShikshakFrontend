import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Table } from "react-bootstrap";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { SiInteractiondesignfoundation } from "react-icons/si";
import Button2 from "../Button2";

export const AddCover = () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const [SchoolName, setSchoolName] = useState("");
  const [ExamName, setExamName] = useState("");
  const [Subject, setSubject] = useState("");
  const [Classs, setClasss] = useState("");
  const [SubjectTeacher, setSubjectTeacher] = useState("");
  const [Principal, setPrincipal] = useState("");
  const [questionPaper, setquestionPaper] = useState("");
  const [blueprint, setblueprint] = useState("");
  const [answersheet, setanswersheet] = useState("");
  const [questionanylys, setquestionanylys] = useState("");
  const AddCoverPageHeader = async () => {
    if (!selectedMedium) {
      return alert("Please Select Medium");
    }
    try {
      const config = {
        url: "/admin/addcoverpage",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: { "Content-Type": "application/json" },
        data: {
          selectedLanguage: selectedLanguage,
          SchoolName: SchoolName,
          ExamName: ExamName,
          Subject: Subject,
          Classs: Classs,
          SubjectTeacher: SubjectTeacher,
          Principal: Principal,
          selectedMedium: selectedMedium,
          questionPaper: questionPaper,
          blueprint: blueprint,
          answersheet: answersheet,
          questionanylys: questionanylys,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose();
        getCoverPage();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const [getcoverpagedetails, setgetcoverpagedetails] = useState([]);
  const getCoverPage = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getcoverpagedetails"
      );
      if (res.status === 200) {
        setgetcoverpagedetails(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("getcoverpagedetails", getcoverpagedetails);

  //get method for medium
  const [selectedMedium, setselectedMedium] = useState("");
  const [Medium, setMedium] = useState([]);
  const getAddMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status == 200) {
        setMedium(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (item) => {
    setShow1(true);
    setEditData(item);
  };
  const [EditData, setEditData] = useState("");
  const EditCoverPageHeader = async () => {
    try {
      const config = {
        url: "/admin/EditCoverPageHeader/" + EditData?._id,
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: { "Content-Type": "application/json" },
        data: {
          selectedLanguage: selectedLanguage,
          SchoolName: SchoolName,
          ExamName: ExamName,
          Subject: Subject,
          Classs: Classs,
          SubjectTeacher: SubjectTeacher,
          Principal: Principal,
          selectedMedium: selectedMedium,
          questionPaper: questionPaper,
          blueprint: blueprint,
          answersheet: answersheet,
          questionanylys: questionanylys,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose1();
        getCoverPage();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleClose2 = () => setShow2(false);
  const handleShow2 = (item) => {
    setShow2(true);
    setdeleteData(item);
  };
  const [deleteData, setdeleteData] = useState("");
  const DeleteCoverPageHeader = async () => {
    try {
      const config = {
        url: "/admin/DeleteCoverPageHeader/" + deleteData?._id,
        baseURL: "http://localhost:8774/api",
        method: "delete",
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose2();
        getCoverPage();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getCoverPage();
    getAddMedium();
  }, []);

  return (
    <div>
      <div className="mb-2 d-flex justify-content-between align-items-center">
        <h3 className=" mb-3 fw-semibold header-c">Cover Page :</h3>

        <Link onClick={handleShow} className="">
          <Button2 text={"Add"} />
        </Link>
      </div>
      <Table bordered className="text-center">
        <thead>
          <tr>
            <th>S.No</th>
            <th>School Name</th>
            <th>Medium</th>
            <th>View</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {getcoverpagedetails?.map((item, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{item?.SchoolName}</td>
              <td>{item?.selectedMedium}</td>
              <td>
                <Link
                  state={{ item: item }}
                  to="/CoverPage"
                  className="text-decoration-none"
                >
                  <FaEye className="fs-3 text-success" />
                </Link>
              </td>
              <td>
                <div style={{ display: "flex", gap: "20px" }}>
                  <div>
                    <FaEdit
                      className="text-success"
                      onClick={() => handleShow1(item)}
                    />
                  </div>
                  <div>
                    <AiFillDelete
                      className="text-danger"
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      onClick={() => {
                        // setQuestionTypeId(item);
                        handleShow2(item);
                      }}
                    />{" "}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Cover Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-between mb-2">
            <div className="col-md-5">
              <label className="fw-semibold">Select Medium</label>
              <select
                onChange={(e) => setselectedMedium(e.target.value)}
                className="vi_0"
                style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
              >
                <option value="select value">Select Medium</option>
                {Medium?.map((item) => (
                  <option value={item?.mediumName}>{item?.mediumName}</option>
                ))}
              </select>
            </div>
            <div className=" col-md-6 ">
              <label className="fw-semibold">Select Langauge</label>
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

          {/* <div className='mb-2'>
                        <label className='fw-bold'>Logo</label>
                        <input type="file" className='form-control' />
                    </div> */}
          <div className="mb-2">
            <label className="fw-bold">Name Of the School</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setSchoolName(e.target.value);
                } else onChangeHandler(e.target.value, setSchoolName);
              }}
              type="text"
              className="form-control"
              placeholder="School Name"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{SchoolName}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Name Of the Exam</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setExamName(e.target.value);
                } else onChangeHandler(e.target.value, setExamName);
              }}
              type="text"
              className="form-control"
              placeholder="Exam Name"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{ExamName}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Subject</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setSubject(e.target.value);
                } else onChangeHandler(e.target.value, setSubject);
              }}
              type="text"
              className="form-control"
              placeholder="Subject"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Subject}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Class</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setClasss(e.target.value);
                } else onChangeHandler(e.target.value, setClasss);
              }}
              type="text"
              className="form-control"
              placeholder="Class"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Classs}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Subject Teacher</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setSubjectTeacher(e.target.value);
                } else onChangeHandler(e.target.value, setSubjectTeacher);
              }}
              type="text"
              className="form-control"
              placeholder="Subject Teacher"
            />
            {selectedLanguage == "en-t-i0-und" ? (
              <></>
            ) : (
              <p>{SubjectTeacher}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Principal</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setPrincipal(e.target.value);
                } else onChangeHandler(e.target.value, setPrincipal);
              }}
              type="text"
              className="form-control"
              placeholder="Principal"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Principal}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Question Paper Preparation</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setquestionPaper(e.target.value);
                } else onChangeHandler(e.target.value, setquestionPaper);
              }}
              type="text"
              className="form-control"
              placeholder="Question paper preperation"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{questionPaper}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Blue Print</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setblueprint(e.target.value);
                } else onChangeHandler(e.target.value, setblueprint);
              }}
              type="text"
              className="form-control"
              placeholder="Blue Print"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{blueprint}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Answer Sheet</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setanswersheet(e.target.value);
                } else onChangeHandler(e.target.value, setanswersheet);
              }}
              type="text"
              className="form-control"
              placeholder="Answer Sheet"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{answersheet}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Question Analysation</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setquestionanylys(e.target.value);
                } else onChangeHandler(e.target.value, setquestionanylys);
              }}
              type="text"
              className="form-control"
              placeholder="Question Analysation"
            />
            {selectedLanguage == "en-t-i0-und" ? (
              <></>
            ) : (
              <p>{questionanylys}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddCoverPageHeader}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit */}
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Cover Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-between mb-2">
            <div className="col-md-5">
              <label className="fw-semibold">Select Medium</label>
              <select
                onChange={(e) => setselectedMedium(e.target.value)}
                className="vi_0"
                style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
              >
                <option value="select value">Select Medium</option>
                {Medium?.map((item) => (
                  <option value={item?.mediumName}>{item?.mediumName}</option>
                ))}
              </select>
            </div>
            <div className=" col-md-6 ">
              <label className="fw-semibold">Select Langauge</label>
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
          <div className="mb-2">
            <label className="fw-bold">Name Of the School</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setSchoolName(e.target.value);
                } else onChangeHandler(e.target.value, setSchoolName);
              }}
              type="text"
              className="form-control"
              placeholder="School Name"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{SchoolName}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Name Of the Exam</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setExamName(e.target.value);
                } else onChangeHandler(e.target.value, setExamName);
              }}
              type="text"
              className="form-control"
              placeholder="Exam Name"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{ExamName}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Subject</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setSubject(e.target.value);
                } else onChangeHandler(e.target.value, setSubject);
              }}
              type="text"
              className="form-control"
              placeholder="Subject"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Subject}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Class</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setClasss(e.target.value);
                } else onChangeHandler(e.target.value, setClasss);
              }}
              type="text"
              className="form-control"
              placeholder="Class"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Classs}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Subject Teacher</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setSubjectTeacher(e.target.value);
                } else onChangeHandler(e.target.value, setSubjectTeacher);
              }}
              type="text"
              className="form-control"
              placeholder="Subject Teacher"
            />
            {selectedLanguage == "en-t-i0-und" ? (
              <></>
            ) : (
              <p>{SubjectTeacher}</p>
            )}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Principal</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setPrincipal(e.target.value);
                } else onChangeHandler(e.target.value, setPrincipal);
              }}
              type="text"
              className="form-control"
              placeholder="Principal"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Principal}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Question Paper Preparation</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setquestionPaper(e.target.value);
                } else onChangeHandler(e.target.value, setquestionPaper);
              }}
              type="text"
              className="form-control"
              placeholder="Question paper preperation"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{questionPaper}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Blue Print</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setblueprint(e.target.value);
                } else onChangeHandler(e.target.value, setblueprint);
              }}
              type="text"
              className="form-control"
              placeholder="Blue Print"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{blueprint}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Answer Sheet</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setanswersheet(e.target.value);
                } else onChangeHandler(e.target.value, setanswersheet);
              }}
              type="text"
              className="form-control"
              placeholder="Answer Sheet"
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{answersheet}</p>}
          </div>
          <div className="mb-2">
            <label className="fw-bold">Question Analysation</label>
            <input
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setquestionanylys(e.target.value);
                } else onChangeHandler(e.target.value, setquestionanylys);
              }}
              type="text"
              className="form-control"
              placeholder="Question Analysation"
            />
            {selectedLanguage == "en-t-i0-und" ? (
              <></>
            ) : (
              <p>{questionanylys}</p>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={EditCoverPageHeader}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete */}
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
            onClick={DeleteCoverPageHeader}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

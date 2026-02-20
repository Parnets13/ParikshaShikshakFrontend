import React, { useEffect, useState } from "react";
import { Button, Row, Modal } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../ExamBoard/ExamBoard.css";
import axios from "axios";
import swal from "sweetalert";
import logo from "./../../assets/logo.png";
import Button1 from "../Button1";

const ExamBoard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [before, setBefore] = useState(false);
  const [userType, setuserType] = useState("");

  const [Board, setBoard] = useState("");
  const [Mediumm, setMediumm] = useState("");
  const [Classs, setClasss] = useState("");
  const [Sub_Classs, setSub_Classs] = useState("");
  const [Exam_Name, setExam_Name] = useState("");
  const [Exam_Lavel, setExam_Lavel] = useState("");

  const tellus = async () => {
    try {
    const config = {
        url: "/teacher/registerGuestionGenrate",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          Board: Board,
          Medium: Mediumm,
          Class: Classs,
          Sub_Class: Sub_Classs,
          Exam_Name: Exam_Name,
          Exam_Lavel: Exam_Lavel,
          authId: user?._id,
          userType: userType,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        swal({
          title: "Yeah!",
          text: "Successfully  Done !!!",
          icon: "success",
          button: "OK!",
        });
        navigate("/loginpage3", { state: res.data.success });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };

  // get method of Board
  const [getboardname, setboardname] = useState([]);
  const getallboardname = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllBoard"
      );
      if (res.status === 200) {
        setboardname(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get method of Name of Examination
  const [NameExam, setNameExam] = useState([]);
  const getNameExamination = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllNameExamination"
      );
      if (res.status === 200) {
        setNameExam(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get mthod of medium
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
  //get
  const [Examlevell, setExamlevell] = useState([]);
  const getExamLevel = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getExamLevel"
      );
      if (res.status === 200) {
        setExamlevell(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get method for subclass
  const [getaddsubclass, setgetaddsubclass] = useState([]);
  const getaddsubclasss = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8774/api/admin/getAllSubClass"
      );
      if (res.status === 200) {
        setgetaddsubclass(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallboardname();
    getNameExamination();
    getAddMedium();
    getExamLevel();
    getaddsubclasss();
  }, []);

  const uniqueClassNames = [
    ...new Set(getaddsubclass?.map((item) => item.className)),
  ];

  return (
    <div>
      <div className="container p-3">
        <div>
          <div className="box">
            <div className="row">
              <div className="col-md-6">
                <div className="bg-img">
                  <div className="line-1">
                    <img src={logo} alt="" className="w-50" />
                    <h2>
                      Welcome <br />
                    </h2>
                 
                     <div >
                        <p
                          className="anim-typewriter text-dark d-flex justify-content-center align-items-center"
                          style={{ fontSize: "25px", marginLeft:"100px" }}
                        >
                          <span
                            className="text-uppercase Lato-regular fw-bold"
                            style={{ color: "#5140EB" }}
                          >
                            {user?.FirstName}
                          </span>{" "}
                          <span
                            className="text-uppercase Lato-regular fw-bold"
                            style={{ color: "#5140EB" }}
                          >
                            {user?.LastName}!{" "}
                          </span>
                        </p>
                     </div>

                      <div className="d-flex justify-content-center align-items-center">
                        <span
                          className=" lato-regular text-center"
                          style={{ fontSize: "18px" }}
                        >
                          Please Enter Your Details
                        </span>
                      </div>
                 
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="page2-content-display">
                  <h4 className="alfa-slab">Tell Us</h4>
                  <hr />

                  <div>
                    <div className="mb-4">
                      <Form.Label className="lato-regular">
                        Medium<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setMediumm(e.target.value);
                        }}
                      >
                        <option>Select Medium</option>
                        {Medium?.map((item, index) => {
                          return (
                            <option key={item._id || index} value={item?.mediumName}>
                              {item?.mediumName}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                    <div className="mb-4">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setBoard(e.target.value);
                        }}
                      >
                        <option>Select Education Board</option>
                        {getboardname?.map((item, index) => {
                          return (
                            <option key={item._id || index} value={item?.boardName}>
                              {item?.boardName}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                    <div className="mb-4">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setClasss(e.target.value);
                        }}
                      >
                        <option value="">Select Class</option>
                        {uniqueClassNames?.map((ele, index) => (
                          <option key={index} value={ele}>{ele}</option>
                        ))}
                      </Form.Select>
                    </div>
                    <div className=" mb-4">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setSub_Classs(e.target.value);
                        }}
                      >
                        <option value={""}>Select Sub Class</option>
                        {getaddsubclass
                          ?.filter((ele) => ele.className == Classs)
                          ?.map((val, i) => {
                            return (
                              <option value={val?.subclassName} key={i}>
                                {val?.subclassName}
                              </option>
                            );
                          })}
                      </Form.Select>
                    </div>
                    <div className=" mb-4">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setExam_Name(e.target.value);
                        }}
                      >
                        <option>Select Exams Name</option>
                        {NameExam?.map((item, i) => {
                          return (
                            <option key={item._id || i} value={item?.NameExamination}>
                              {item?.NameExamination}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                    <div className=" mb-4">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setExam_Lavel(e.target.value);
                        }}
                      >
                        <option>Select Exam Level</option>
                        {Examlevell?.map((item, i) => {
                          return (
                            <option key={item._id || i} value={item?.Examlevel}>
                              {item?.Examlevel}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </div>
                    <div className=" mb-4">
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setuserType(e.target.value);
                        }}
                      >
                        <option value={""}>Select User Type </option>
                        <option value={"Teacher"}>Teacher</option>
                        <option value={"Student"}>Student</option>
                      </Form.Select>
                    </div>
                  </div>

                  <Row>
                    <div
                      style={{
                        float: "right",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        gap: "15px",
                        padding: "0px 100px",
                      }}
                    >
                      <a
                        onClick={() => {
                          tellus();
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <Button1 text={"Submit"} />
                      </a>
                      <a
                        onClick={() => {
                          navigate('/resultsheetmaker');
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <Button1 text={"Result Sheet"} />
                      </a>
                    </div>
                  </Row>

                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <img
              src="../images/razorpay.png"
              style={{ width: "150px" }}
              alt=""
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{ backgroundColor: "#ff5200", color: "white" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            style={{ backgroundColor: "green" }}
            onClick={() => {
              tellus();
            }}
          >
            Pay
          </Button>
        </Modal.Footer>
      </Modal>

      {/* after Payment  */}

      {/* <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <div className="urban-o mb-3">
                    <label>Choose School Logo :</label>
                    <br />

                    <input style={{ border: "1px solid lightgray", width: "100%", padding: "3px 0", borderRadius: "6px" }}
                        type="file"
                        accept="image/x-png,image/gif,image/jpeg,image/jpg"
                    />
                </div>

                <div className="col-12 mb-3">
                    <label>School / Institute Name :</label>
                    <br />
                    <input className='form-control'
                        placeholder="Enter School / Institute Name"
                    />
                </div>

                <div className="col-12 mb-3">
                    <label>Class :</label>
                    <br />
                    <input className='form-control'
                        placeholder="Enter Class Name"
                    />
                </div>

                <div className="col-12 mb-3">
                    <label>Sub Class :</label>
                    <br />
                    <input className='form-control'
                        placeholder="Enter Sub Class Name"
                    />
                </div>

                <div className="col-12 mb-3">
                    <label>Test Paper Name :</label>
                    <br />
                    <input className='form-control'
                        placeholder="Enter Test paper Name"
                    />
                </div>

                <div className="col-12 mb-3">
                    <label>Test Date :</label>
                    <br />
                    <input type='date'
                        className='form-control'
                        placeholder="Enter test date"
                    />
                </div>

                <div className="col-12 mb-3">
                    <label>Size of question paper :</label>
                    <br />
                    <Form.Select aria-label="Default select example">
                        <option>Select Paper Size</option>
                        <option value="1">A4</option>
                    </Form.Select>

                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => { navigate('/blueprint') }}>
                Generate
            </Button>
        </Modal.Footer>
    </Modal> */}
    </div>
  );
};

export default ExamBoard;

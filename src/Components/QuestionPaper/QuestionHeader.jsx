import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { debounce } from "lodash";
import { AiFillDelete } from "react-icons/ai";
import { Button, Form, Modal, Table } from "react-bootstrap";
import "../Admin/Admin.css";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Button2 from "../Button2";
function QuestionHeader() {
  const [View, setView] = useState({});
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show1, setShow1] = useState();
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [show2, setShow2] = useState();
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

  const [Class, setClass] = useState("");
  const [Subject, setSubject] = useState("");
  const [Marks, setMarks] = useState("");
  const [Time, setTime] = useState("");
  const [StudentInfo, setStudentInfo] = useState("");
  const [ExamDate, setExamDate] = useState("");
  const [TotalQuestion, setTotalQuestion] = useState("");
  const [NameofStudent, setNameofStudent] = useState("");
  const [SatsNo, setSatsNo] = useState("");
  const [Signature, setSignature] = useState("");
  const [roomInvigilator, setroomInvigilator] = useState("");
  const [Idsccode, setIdsccode] = useState("");
  const [SchoolName, setSchoolName] = useState("");
  const [Cluster, setCluster] = useState("");
  const [Block, setBlock] = useState("");
  const [Distric, setDistric] = useState("");
  const [Govt, setGovt] = useState("");
  const [Aided, setAided] = useState("");
  const [Unaided, setUnaided] = useState("");
  const [markinfo, setmarkinfo] = useState("");
  const [SignatuteInvigilator, setSignatuteInvigilator] = useState("");
  const [Evaluator, setEvaluator] = useState("");
  const [QuestionNo1, setQuestionNo1] = useState("");
  const [ObtainedNo1, setObtainedNo1] = useState("");
  const [QuestionNo2, setQuestionNo2] = useState("");
  const [ObtainedNo2, setObtainedNo2] = useState("");
  const [QuestionNo3, setQuestionNo3] = useState("");
  const [ObtainedNo3, setObtainedNo3] = useState(""); 
  const [QuestionNo4, setQuestionNo4] = useState("");
  const [ObtainedNo4, setObtainedNo4] = useState("");
  const [TotalMarks1, setTotalMarks1] = useState("");
  const [TotalMarks2, setTotalMarks2] = useState("");
  const [TotalMarks3, setTotalMarks3] = useState("");
  const [GrandTotal, setGrandTotal] = useState("");
  const [TotalObtainMarks, setTotalObtainMarks] = useState("");
  const [EvaluatorSign, setEvaluatorSign] = useState("");
  const [QFormatMedium, setQFormatMedium] = useState("");
  const [Ans, setAns] = useState("");
  const [Or, setOr] = useState("");
  const [AnswerHeader, setAnswerHeader] = useState("");
  const [blueprintBoard, setblueprintBoard] = useState("");
  const [mediumHead, setmediumHeead] = useState("");

  const [lastSign, setlastSign] = useState("");

  const AddQuestionHeader = async () => {
    try {
      const config = {
        url: "/admin/addquestionheader",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          classs: Class,
          subject: Subject,
          marks: Marks,
          time: Time,
          studentinfo: StudentInfo,
          examdate: ExamDate,
          totalquestion: TotalQuestion,
          nameofstudent: NameofStudent,
          satsno: SatsNo,
          signature: Signature,
          roominvigilator: roomInvigilator,
          idsccode: Idsccode,
          schoolname: SchoolName,
          cluster: Cluster,
          block: Block,
          distric: Distric,
          govt: Govt,
          aided: Aided,
          unaided: Unaided,
          markinfo: markinfo,
          signatureinvigilator: SignatuteInvigilator,
          evaluator: Evaluator,
          questionno1: QuestionNo1,
          obtainedno1: ObtainedNo1,
          questionno2: QuestionNo2,
          obtainedno2: ObtainedNo2,
          questionno3: QuestionNo3,
          obtainedno3: ObtainedNo3, 
            questionno4: QuestionNo4,
          ObtainedNo4: ObtainedNo4,
          totalmarks1: TotalMarks1,
          totalmarks2: TotalMarks2,
          totalmarks3: TotalMarks3,
          grandtotal: GrandTotal,
          totalobtainedmarks: TotalObtainMarks,
          evaluatorsign: EvaluatorSign,
          medium: QFormatMedium,
          ans: Ans,
          or: Or,
          answerheader: AnswerHeader,
          blueprintBoard: blueprintBoard,
          authId: admin?._id,
          mediumHead: mediumHead,
          lastSign: lastSign,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        getallQuestionHeader();
        handleClose();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Get All Question Header

  const [QuestionHeader, setQuestionHeader] = useState([]);
  const getallQuestionHeader = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getquestiontheader/" +
          admin?._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setQuestionHeader(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("QuestionHeader", QuestionHeader);

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

  useEffect(() => {
    getallQuestionHeader();
    getAddMedium();
  }, []);

  // Edit APi
  const [Headerid, setHeaderid] = useState("");
  const EditQuestionHeader = async () => {
    try {
      const config = {
        url: "/admin/editquestionheader",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          classs: Class,
          subject: Subject,
          marks: Marks,
          time: Time,
          studentinfo: StudentInfo,
          examdate: ExamDate,
          totalquestion: TotalQuestion,
          nameofstudent: NameofStudent,
          satsno: SatsNo,
          signature: Signature,
          roominvigilator: roomInvigilator,
          idsccode: Idsccode,
          schoolname: SchoolName,
          cluster: Cluster,
          block: Block,
          distric: Distric,
          govt: Govt,
          aided: Aided,
          unaided: Unaided,
          markinfo: markinfo,
          signatureinvigilator: SignatuteInvigilator,
          evaluator: Evaluator,
          questionno1: QuestionNo1,
          obtainedno1: ObtainedNo1,
          questionno2: QuestionNo2,
          obtainedno2: ObtainedNo2,
          questionno3: QuestionNo3,
          obtainedno3: ObtainedNo3,
          totalmarks1: TotalMarks1,
          totalmarks2: TotalMarks2,
          totalmarks3: TotalMarks3,
          grandtotal: GrandTotal,
          totalobtainedmarks: TotalObtainMarks,
          evaluatorsign: EvaluatorSign,
          medium: QFormatMedium,
          ans: Ans,
          or: Or,
          answerheader: AnswerHeader,
          blueprintBoard: blueprintBoard,
          authId: admin?._id,
          mediumHead: mediumHead,
          lastSign: lastSign,
          id: Headerid?._id,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose1();
        getallQuestionHeader();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteQuestionHeader = async () => {
    try {
      const config = {
        url: "/admin/deleteQuestionHeader/" + Headerid?._id + "/" + admin?._id,
        baseURL: "http://localhost:8774/api",
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose2();
        getallQuestionHeader();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (View) {
      setClass(View.classs || "");
      setSubject(View.subject || "");
      setMarks(View.marks || "");
      setTime(View.time || "");
      setStudentInfo(View.studentinfo || "");
      setExamDate(View.examdate || "");
      setTotalQuestion(View.totalquestion || "");
      setNameofStudent(View.nameofstudent || "");
      setSatsNo(View.satsno || "");
      setSignature(View.signature || "");
      setroomInvigilator(View.roominvigilator || "");
      setIdsccode(View.idsccode || "");
      setSchoolName(View.schoolname || "");
      setCluster(View.cluster || "");
      setBlock(View.block || "");
      setDistric(View.distric || "");
      setGovt(View.govt || "");
      setAided(View.aided || "");
      setUnaided(View.unaided || "");
      setmarkinfo(View.markinfo || "");
      setSignatuteInvigilator(View.signatureinvigilator || "");
      setEvaluator(View.evaluator || "");
      setQuestionNo1(View.questionno1 || "");
      setObtainedNo1(View.obtainedno1 || "");
      setQuestionNo2(View.questionno2 || "");
      setObtainedNo2(View.obtainedno2 || "");
      setQuestionNo3(View.questionno3 || "");
      setObtainedNo3(View.obtainedno3 || ""); 
            setQuestionNo4(View.questionno4 || "");
      setObtainedNo4(View.obtainedno4 || "");
      setTotalMarks1(View.totalmarks1 || "");
      setTotalMarks2(View.totalmarks2 || "");
      setTotalMarks3(View.totalmarks3 || "");
      setGrandTotal(View.grandtotal || "");
      setTotalObtainMarks(View.totalobtainedmarks || "");
      setEvaluatorSign(View.evaluatorsign || "");
      setQFormatMedium(View.medium || "");
      setAns(View.ans || "");
      setOr(View.or || "");
      setAnswerHeader(View.answerheader || "");
      setblueprintBoard(View.blueprintBoard || "");
      setmediumHeead(View.mediumHead || "");
      setlastSign(View.lastSign || "");
    }
  }, [View]);
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
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
        <div>
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

      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Question Header List :</h2>

          <Link onClick={handleShow}>
            <Button2 text={"Add Header"} />
          </Link>
        </div>
        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead style={{ backgroundColor: "navy", color: "white" }}>
              <tr>
                <th>S.No</th>
                <th>Medium</th>
                <th> Question Header For View </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {QuestionHeader?.map((item, i) => {
                return (
                  <tr style={{ textAlign: "center" }}>
                    <td>{i + 1}</td>
                    <td>{item?.medium}</td>

                    <td
                      style={{
                        fontSize: "20px",
                        color: "green",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        navigate("/viewheader", { state: { item: item } })
                      }
                    >
                      <FaEye />
                    </td>
                    <td>
                      <div className="d-flex justify-content-evenly">
                        <FaEdit
                          style={{ color: "green" }}
                          onClick={() => {
                            handleShow1();
                            setHeaderid(item);
                            setView(item);
                          }}
                        />
                        <AiFillDelete
                          style={{ color: "red" }}
                          onClick={() => {
                            handleShow2();
                            setHeaderid(item);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* Add Model */}
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          style={{ zIndex: "99999", paddingLeft: "0px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Question Header</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="">
                <div className="details-display ">
                  <div className="top-titles-container mb-2">
                    <div className="row">
                      <div className="col-sm-2">
                        <img
                          src="./Images/logo.png"
                          alt=""
                          style={{ width: "80px", marginTop: "24px" }}
                        />
                      </div>
                      <div className="col-sm-6">
                        <h4 className="mb-2"> (School Name Will Come )</h4>
                        <h6>Exam Type - year (will come)</h6>
                      </div>
                      <div className="col-sm-4">
                        <div className="do-sear mt-2">
                          <label> Medium</label>
                          <Form.Select
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
                      </div>
                    </div>
                  </div>

                  <div className="class-details mb-2">
                    <div className="class-data ">
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Class"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setClass(e.target.value);
                            } else onChangeHandler(e.target.value, setClass);
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Class}</p>
                      )}
                    </div>
                    <div className="class-data">
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Subject"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setSubject(e.target.value);
                            } else onChangeHandler(e.target.value, setSubject);
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Subject}</p>
                      )}
                      <br />
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Medium Head"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setmediumHeead(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setmediumHeead);
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{mediumHead}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <div className="class-data ">
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Marks"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setMarks(e.target.value);
                              } else onChangeHandler(e.target.value, setMarks);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Marks}</p>
                        )}
                      </div>
                      <br />
                      <div className="class-data">
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Time"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setTime(e.target.value);
                              } else onChangeHandler(e.target.value, setTime);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Time}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="student-details-container">
                    <div className="d-flex justify-content-between">
                      <div style={{ width: "60%" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder=" Information to be filled by the Student"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setStudentInfo(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setStudentInfo);
                            }}
                          />{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{StudentInfo}</p>
                        )}
                      </div>
                      <div>
                        <span style={{ fontSize: "16px" }}>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder="Exam Date"
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setExamDate(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setExamDate);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{ExamDate}</p>
                          )}
                        </span>{" "}
                        <br />
                        <span>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder=" Total Question"
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setTotalQuestion(e.target.value);
                                } else
                                  onChangeHandler(
                                    e.target.value,
                                    setTotalQuestion
                                  );
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{TotalQuestion}</p>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder=" Name of the Student"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setNameofStudent(e.target.value);
                              } else
                                onChangeHandler(
                                  e.target.value,
                                  setNameofStudent
                                );
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{NameofStudent}</p>
                        )}
                      </p>
                      <div className="line"></div>
                    </div>

                    <div className="student-number-row">
                      <div style={{ margin: " auto 0" }}>
                        <p>
                          {" "}
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder=" Student SATS No"
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setSatsNo(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setSatsNo);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{SatsNo}</p>
                          )}
                        </p>
                      </div>
                      <div className="d-flex mb-2">
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                      </div>
                      <div className="ss">
                        <p>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder=" Signature of the Student"
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setSignature(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setSignature);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{Signature}</p>
                          )}
                        </p>

                        <div className="line"></div>
                      </div>
                    </div>
                  </div>

                  <div className="student-details-container">
                    <h5 style={{ textAlign: "center" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder=" Information to be filled by the Room Invigilator"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setroomInvigilator(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setroomInvigilator
                              );
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{roomInvigilator}</p>
                      )}
                    </h5>

                    <div className="school-number-row">
                      <div style={{ margin: " auto 0" }}>
                        <p>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder=" School IDSE Code"
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setIdsccode(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setIdsccode);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{Idsccode}</p>
                          )}
                        </p>
                      </div>
                      <div className="d-flex">
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                      </div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder=" School Name"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setSchoolName(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setSchoolName);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{SchoolName}</p>
                        )}
                      </p>
                      <div className="line-2"></div>
                    </div>
                  </div>

                  <div className="third-row">
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Cluster"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setCluster(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setCluster);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Cluster}</p>
                        )}
                      </p>

                      <div className="line-3"></div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Block"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setBlock(e.target.value);
                              } else onChangeHandler(e.target.value, setBlock);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Block}</p>
                        )}
                      </p>
                      <div className="line-3"></div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="District"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setDistric(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setDistric);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Distric}</p>
                        )}
                      </p>

                      <div className="line-3"></div>
                    </div>
                  </div>

                  <div className="fourth-row">
                    {/* <div className="school-details">
                                           
                                            <p style={{ margin: "0px" }}>
                                                <b className='d-flex'>
                                                <Form.Control
                                                type="text"
                                                placeholder="School Name"
                                                onChange={(e) => {
                                                    if (selectedLanguage === "en-t-i0-und") {
                                                        setGovt(e.target.value)
                                                    } else onChangeHandler(e.target.value, setGovt)
                                                }}
                                            /><span>:</span>  </b>
                                        {selectedLanguage === "en-t-i0-und" ? <></> : <p>{Govt}</p>}
                                            </p>
                                        </div> */}
                    <div className="school-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Govt."
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setGovt(e.target.value);
                              } else onChangeHandler(e.target.value, setGovt);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Govt}</p>
                        )}
                      </p>

                      <div className="number-box-1"></div>
                    </div>
                    <div className="school-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Aided"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setAided(e.target.value);
                              } else onChangeHandler(e.target.value, setAided);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Aided}</p>
                        )}
                      </p>
                      <div className="number-box-1"></div>
                    </div>
                    <div className="school-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder="Un-aided"
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setUnaided(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setUnaided);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Unaided}</p>
                        )}
                      </p>

                      <div className="number-box-1"></div>
                    </div>
                  </div>

                  <div>
                    {" "}
                    <b className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Put ✓ mark for applicable information"
                        onChange={(e) => {
                          if (selectedLanguage === "en-t-i0-und") {
                            setmarkinfo(e.target.value);
                          } else onChangeHandler(e.target.value, setmarkinfo);
                        }}
                      />
                      <span>:</span>{" "}
                    </b>
                    {selectedLanguage === "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{markinfo}</p>
                    )}
                  </div>
                  <div
                    className="student-details"
                    style={{ padding: "10px 0" }}
                  >
                    <p style={{ margin: "0px" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Signature of the Room Invigilator"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setSignatuteInvigilator(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setSignatuteInvigilator
                              );
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) :  
                      (
                        <p>{SignatuteInvigilator}</p>
                      )}
                    </p>
                    <div className="line-4"></div>
                  </div>

                  <div>
                    <b className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder=" Information to be filled by the Evaluator at the time of evaluation"
                        onChange={(e) => {
                          if (selectedLanguage === "en-t-i0-und") {
                            setEvaluator(e.target.value);
                          } else onChangeHandler(e.target.value, setEvaluator);
                        }}
                      />{" "}
                    </b>
                    {selectedLanguage === "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Evaluator}</p>
                    )}

                    <br />

                    <Table
                      responsive
                      bordered
                      style={{ border: "1px solid" }}
                      size="sm"
                    >
                      <thead>
                        <tr>
                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder=" Question Number"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setQuestionNo1(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setQuestionNo1
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{QuestionNo1}</p>
                            )}
                          </th>

                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Obtained marks"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setObtainedNo1(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setObtainedNo1
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{ObtainedNo1}</p>
                            )}
                          </th>

                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder=" Question Number"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setQuestionNo2(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setQuestionNo2
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{QuestionNo2}</p>
                            )}
                          </th>
                          <th>
                            {" "}
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Obtained marks"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setObtainedNo2(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setObtainedNo2
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{ObtainedNo2}</p>
                            )}
                          </th>
                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder=" Question Number"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setQuestionNo3(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setQuestionNo3
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{QuestionNo3}</p>
                            )}
                          </th>
                          <th>
                            {" "}
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Obtained marks"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setObtainedNo3(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setObtainedNo3
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{ObtainedNo3}</p>
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td>11</td>
                          <td></td>
                          <td>21</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td></td>
                          <td>12</td>
                          <td></td>
                          <td>22</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td></td>
                          <td>13</td>
                          <td></td>
                          <td>23</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td></td>
                          <td>14</td>
                          <td></td>
                          <td>24</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td></td>
                          <td>15</td>
                          <td></td>
                          <td>25</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td></td>
                          <td>16</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td></td>
                          <td>17</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td></td>
                          <td>18</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td></td>
                          <td>19</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td></td>
                          <td>20</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr> 
                        <tr>
    <td>26</td>
    <td></td>
    <td>36</td>
    <td></td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>27</td>
    <td></td>
    <td>37</td>
    <td></td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>28</td>
    <td></td>
    <td>38</td>
    <td></td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>29</td>
    <td></td>
    <td>39</td>
    <td></td>
    <td>-</td>
    <td></td>
  </tr>
  <tr>
    <td>30</td>
    <td></td>
    <td>40</td>
    <td></td>
    <td>-</td>
    <td></td>
  </tr>
                        <tr>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Total marks"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setTotalMarks1(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setTotalMarks1
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{TotalMarks1}</p>
                            )}
                          </td>
                          <td></td>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Total marks"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setTotalMarks2(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setTotalMarks2
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{TotalMarks2}</p>
                            )}
                          </td>
                          <td></td>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Total marks"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setTotalMarks3(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setTotalMarks3
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{TotalMarks3}</p>
                            )}
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder="Grade Total"
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setGrandTotal(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setGrandTotal
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{GrandTotal}</p>
                            )}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="student-details">
                    <p style={{ margin: "0px", width: "53%" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Total marks obtained (in words)"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setTotalObtainMarks(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setTotalObtainMarks
                              );
                          }}
                        />{" "}
                        <span>:</span>
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{TotalObtainMarks}</p>
                      )}
                    </p>

                    <div className="line-5"></div>
                  </div>
                  <br />
                  <div className="student-details">
                    <p style={{ margin: "0px", width: "53%" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Signature of the Evaluator"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setEvaluatorSign(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setEvaluatorSign);
                          }}
                        />{" "}
                        <span>:</span>
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{EvaluatorSign}</p>
                      )}
                    </p>

                    <div className="line-6"></div>
                  </div>
                  <br />
                  <div className="student-details">
                    <p style={{ margin: "0px", width: "53%" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Signature of the Evaluator 2"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setlastSign(e.target.value);
                            } else onChangeHandler(e.target.value, setlastSign);
                          }}
                        />{" "}
                        <span>:</span>
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{lastSign}</p>
                      )}
                    </p>

                    <div className="line-6"></div>
                  </div>
                </div>
                <br />
                <div>
                  <p style={{ textAlign: "center" }}>For Question Paper</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <b className="d-flex ">
                        <Form.Control
                          type="text"
                          placeholder="Ans"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setAns(e.target.value);
                            } else onChangeHandler(e.target.value, setAns);
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Ans}</p>
                      )}
                    </div>
                    <div>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Or"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setOr(e.target.value);
                            } else onChangeHandler(e.target.value, setOr);
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? <></> : <p>{Or}</p>}
                    </div>
                    <div>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Answer Header"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setAnswerHeader(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setAnswerHeader);
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{AnswerHeader}</p>
                      )}
                    </div>
                    <div>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder="Blueprint Board"
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setblueprintBoard(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setblueprintBoard
                              );
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{blueprintBoard}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={AddQuestionHeader}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Model */}
        <Modal
          show={show1}
          onHide={handleClose1}
          size="lg"
          style={{ zIndex: "99999", paddingLeft: "0px" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Question Header</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <div className="">
                <div className="details-display ">
                  <div className="top-titles-container mb-2">
                    <div className="row">
                      <div className="col-sm-2">
                        <img
                          src="./Images/logo.png"
                          alt=""
                          style={{ width: "80px", marginTop: "24px" }}
                        />
                      </div>
                      <div className="col-sm-6">
                        <h4 className="mb-2"> (School Name Will Come )</h4>
                        <h6>Exam Type - year (will come)</h6>
                      </div>
                      <div className="col-sm-4">
                        <div className="do-sear mt-2">
                          <label> Medium</label>
                          <Form.Select
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
                      </div>
                    </div>
                  </div>

                  <div className="class-details mb-2">
                    <div className="class-data ">
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.classs}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setClass(e.target.value);
                            } else onChangeHandler(e.target.value, setClass);
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Class || View?.classs}</p>
                      )}
                    </div>
                    <div className="class-data">
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.subject}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setSubject(e.target.value);
                            } else onChangeHandler(e.target.value, setSubject);
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Subject || View?.subject}</p>
                      )}
                      <br />
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.medium}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setmediumHeead(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setmediumHeead);
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{mediumHead || View?.medium}</p>
                      )}
                    </div>
                    <div className="mb-2">
                      <div className="class-data ">
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.marks}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setMarks(e.target.value);
                              } else onChangeHandler(e.target.value, setMarks);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Marks || View?.Marks}</p>
                        )}
                      </div>
                      <br />
                      <div className="class-data">
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.time}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setTime(e.target.value);
                              } else onChangeHandler(e.target.value, setTime);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Time || View?.time}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="student-details-container">
                    <div className="d-flex justify-content-between">
                      <div style={{ width: "60%" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.studentinfo}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setStudentInfo(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setStudentInfo);
                            }}
                          />{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{StudentInfo || View?.studentinfo}</p>
                        )}
                      </div>
                      <div>
                        <span style={{ fontSize: "16px" }}>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder={View?.examdate}
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setExamDate(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setExamDate);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{ExamDate || View?.examdate}</p>
                          )}
                        </span>{" "}
                        <br />
                        <span>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder={View?.totalquestion}
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setTotalQuestion(e.target.value);
                                } else
                                  onChangeHandler(
                                    e.target.value,
                                    setTotalQuestion
                                  );
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{TotalQuestion || View?.totalquestion}</p>
                          )}
                        </span>
                      </div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.nameofstudent}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setNameofStudent(e.target.value);
                              } else
                                onChangeHandler(
                                  e.target.value,
                                  setNameofStudent
                                );
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{NameofStudent || View?.nameofstudent}</p>
                        )}
                      </p>
                      <div className="line"></div>
                    </div>

                    <div className="student-number-row">
                      <div style={{ margin: " auto 0" }}>
                        <p>
                          {" "}
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder={View?.satsno}
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setSatsNo(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setSatsNo);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{SatsNo || View?.satsno}</p>
                          )}
                        </p>
                      </div>
                      <div className="d-flex mb-2">
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                      </div>
                      <div className="ss">
                        <p>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder={View?.signature}
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setSignature(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setSignature);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{Signature || View?.signature}</p>
                          )}
                        </p>

                        <div className="line"></div>
                      </div>
                    </div>
                  </div>

                  <div className="student-details-container">
                    <h5 style={{ textAlign: "center" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.signatureinvigilator}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setroomInvigilator(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setroomInvigilator
                              );
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{roomInvigilator || View?.signatureinvigilator}</p>
                      )}
                    </h5>

                    <div className="school-number-row">
                      <div style={{ margin: " auto 0" }}>
                        <p>
                          <b className="d-flex">
                            <Form.Control
                              type="text"
                              placeholder={View?.idsccode}
                              onChange={(e) => {
                                if (selectedLanguage === "en-t-i0-und") {
                                  setIdsccode(e.target.value);
                                } else
                                  onChangeHandler(e.target.value, setIdsccode);
                              }}
                            />
                            <span>:</span>{" "}
                          </b>
                          {selectedLanguage === "en-t-i0-und" ? (
                            <></>
                          ) : (
                            <p>{Idsccode || View?.idsccode}</p>
                          )}
                        </p>
                      </div>
                      <div className="d-flex">
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                        <div className="number-box"></div>
                      </div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.schoolname}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setSchoolName(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setSchoolName);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{SchoolName || View?.schoolname}</p>
                        )}
                      </p>
                      <div className="line-2"></div>
                    </div>
                  </div>

                  <div className="third-row">
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.cluster}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setCluster(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setCluster);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Cluster || View?.cluster}</p>
                        )}
                      </p>

                      <div className="line-3"></div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.block}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setBlock(e.target.value);
                              } else onChangeHandler(e.target.value, setBlock);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Block || View?.block}</p>
                        )}
                      </p>
                      <div className="line-3"></div>
                    </div>
                    <div className="student-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.distric}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setDistric(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setDistric);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Distric || View?.distric}</p>
                        )}
                      </p>

                      <div className="line-3"></div>
                    </div>
                  </div>

                  <div className="fourth-row">
                    {/* <div className="school-details">
                                           
                                            <p style={{ margin: "0px" }}>
                                                <b className='d-flex'>
                                                <Form.Control
                                                type="text"
                                                placeholder="School Name"
                                                onChange={(e) => {
                                                    if (selectedLanguage === "en-t-i0-und") {
                                                        setGovt(e.target.value)
                                                    } else onChangeHandler(e.target.value, setGovt)
                                                }}
                                            /><span>:</span>  </b>
                                        {selectedLanguage === "en-t-i0-und" ? <></> : <p>{Govt}</p>}
                                            </p>
                                        </div> */}
                    <div className="school-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.govt}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setGovt(e.target.value);
                              } else onChangeHandler(e.target.value, setGovt);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Govt || View?.govt}</p>
                        )}
                      </p>

                      <div className="number-box-1"></div>
                    </div>
                    <div className="school-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.aided}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setAided(e.target.value);
                              } else onChangeHandler(e.target.value, setAided);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Aided || View?.aided}</p>
                        )}
                      </p>
                      <div className="number-box-1"></div>
                    </div>
                    <div className="school-details">
                      <p style={{ margin: "0px" }}>
                        <b className="d-flex">
                          <Form.Control
                            type="text"
                            placeholder={View?.unaided}
                            onChange={(e) => {
                              if (selectedLanguage === "en-t-i0-und") {
                                setUnaided(e.target.value);
                              } else
                                onChangeHandler(e.target.value, setUnaided);
                            }}
                          />
                          <span>:</span>{" "}
                        </b>
                        {selectedLanguage === "en-t-i0-und" ? (
                          <></>
                        ) : (
                          <p>{Unaided || View?.unaided}</p>
                        )}
                      </p>

                      <div className="number-box-1"></div>
                    </div>
                  </div>

                  <div>
                    {" "}
                    <b className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder={View?.markinfo}
                        onChange={(e) => {
                          if (selectedLanguage === "en-t-i0-und") {
                            setmarkinfo(e.target.value);
                          } else onChangeHandler(e.target.value, setmarkinfo);
                        }}
                      />
                      <span>:</span>{" "}
                    </b>
                    {selectedLanguage === "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{markinfo || View?.markinfo}</p>
                    )}
                  </div>
                  <div
                    className="student-details"
                    style={{ padding: "10px 0" }}
                  >
                    <p style={{ margin: "0px" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.signatureinvigilator}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setSignatuteInvigilator(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setSignatuteInvigilator
                              );
                          }}
                        />
                        <span>:</span>{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>
                          {SignatuteInvigilator || View?.signatureinvigilator}
                        </p>
                      )}
                    </p>
                    <div className="line-4"></div>
                  </div>

                  <div>
                    <b className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder={View?.evaluator}
                        onChange={(e) => {
                          if (selectedLanguage === "en-t-i0-und") {
                            setEvaluator(e.target.value);
                          } else onChangeHandler(e.target.value, setEvaluator);
                        }}
                      />{" "}
                    </b>
                    {selectedLanguage === "en-t-i0-und" ? (
                      <></>
                    ) : (
                      <p>{Evaluator || View?.evaluator}</p>
                    )}

                    <br />

                    <Table
                      responsive
                      bordered
                      style={{ border: "1px solid" }}
                      size="sm"
                    >
                      <thead>
                        <tr>
                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.questionno1}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setQuestionNo1(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setQuestionNo1
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{QuestionNo1 || View?.questionno1}</p>
                            )}
                          </th>

                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.obtainedno1}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setObtainedNo1(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setObtainedNo1
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{ObtainedNo1 || View?.obtainedno1}</p>
                            )}
                          </th>

                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.questionno2}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setQuestionNo2(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setQuestionNo2
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{QuestionNo2 || View?.questionno2}</p>
                            )}
                          </th>
                          <th>
                            {" "}
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.obtainedno2}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setObtainedNo2(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setObtainedNo2
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{ObtainedNo2 || View?.obtainedno2}</p>
                            )}
                          </th>
                          <th>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.questionno3}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setQuestionNo3(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setQuestionNo3
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{QuestionNo3 || View?.questionno3}</p>
                            )}
                          </th>
                          <th>
                            {" "}
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.obtainedno3}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setObtainedNo3(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setObtainedNo3
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{ObtainedNo3 || View?.obtainedno3}</p>
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td></td>
                          <td>11</td>
                          <td></td>
                          <td>21</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td></td>
                          <td>12</td>
                          <td></td>
                          <td>22</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td></td>
                          <td>13</td>
                          <td></td>
                          <td>23</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td></td>
                          <td>14</td>
                          <td></td>
                          <td>24</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td></td>
                          <td>15</td>
                          <td></td>
                          <td>25</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>6</td>
                          <td></td>
                          <td>16</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>7</td>
                          <td></td>
                          <td>17</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>8</td>
                          <td></td>
                          <td>18</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>9</td>
                          <td></td>
                          <td>19</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>10</td>
                          <td></td>
                          <td>20</td>
                          <td></td>
                          <td>-</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.totalmarks1}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setTotalMarks1(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setTotalMarks1
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{TotalMarks1 || View?.totalmarks1}</p>
                            )}
                          </td>
                          <td></td>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.totalmarks2}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setTotalMarks2(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setTotalMarks2
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{TotalMarks2 || View?.totalmarks2}</p>
                            )}
                          </td>
                          <td></td>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.totalmarks3}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setTotalMarks3(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setTotalMarks3
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{TotalMarks3 || View?.totalmarks3}</p>
                            )}
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td>
                            <b className="d-flex">
                              <Form.Control
                                type="text"
                                placeholder={View?.grandtotal}
                                onChange={(e) => {
                                  if (selectedLanguage === "en-t-i0-und") {
                                    setGrandTotal(e.target.value);
                                  } else
                                    onChangeHandler(
                                      e.target.value,
                                      setGrandTotal
                                    );
                                }}
                              />{" "}
                            </b>
                            {selectedLanguage === "en-t-i0-und" ? (
                              <></>
                            ) : (
                              <p>{GrandTotal || View?.grandtotal}</p>
                            )}
                          </td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                  <div className="student-details">
                    <p style={{ margin: "0px", width: "53%" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.totalobtainedmarks}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setTotalObtainMarks(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setTotalObtainMarks
                              );
                          }}
                        />{" "}
                        <span>:</span>
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{TotalObtainMarks || View?.totalobtainedmarks}</p>
                      )}
                    </p>

                    <div className="line-5"></div>
                  </div>
                  <br />
                  <div className="student-details">
                    <p style={{ margin: "0px", width: "53%" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.evaluatorsign}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setEvaluatorSign(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setEvaluatorSign);
                          }}
                        />{" "}
                        <span>:</span>
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{EvaluatorSign || View?.evaluatorsign}</p>
                      )}
                    </p>

                    <div className="line-6"></div>
                  </div>
                  <br />
                  {/* <div className="student-details">
                    <p style={{ margin: "0px", width: "53%" }}>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.lastSign}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setlastSign(e.target.value);
                            } else onChangeHandler(e.target.value, setlastSign);
                          }}
                        />{" "}
                        <span>:</span>
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{lastSign || View?.lastSign}</p>
                      )}
                    </p>

                    <div className="line-6"></div>
                  </div> */}
                </div>
                <br />
                <div>
                  <p style={{ textAlign: "center" }}>For Question Paper</p>
                  <div className="d-flex justify-content-between">
                    <div>
                      <b className="d-flex ">
                        <Form.Control
                          type="text"
                          placeholder={View?.ans}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setAns(e.target.value);
                            } else onChangeHandler(e.target.value, setAns);
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{Ans || View?.ans}</p>
                      )}
                    </div>
                    <div>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.or}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setOr(e.target.value);
                            } else onChangeHandler(e.target.value, setOr);
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{View?.or}</p>
                      )}
                    </div>
                    <div>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.answerheader}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setAnswerHeader(e.target.value);
                            } else
                              onChangeHandler(e.target.value, setAnswerHeader);
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{AnswerHeader || View?.answerheader}</p>
                      )}
                    </div>
                    <div>
                      <b className="d-flex">
                        <Form.Control
                          type="text"
                          placeholder={View?.blueprintBoard}
                          onChange={(e) => {
                            if (selectedLanguage === "en-t-i0-und") {
                              setblueprintBoard(e.target.value);
                            } else
                              onChangeHandler(
                                e.target.value,
                                setblueprintBoard
                              );
                          }}
                        />{" "}
                      </b>
                      {selectedLanguage === "en-t-i0-und" ? (
                        <></>
                      ) : (
                        <p>{blueprintBoard || View?.blueprintBoard}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" onClick={EditQuestionHeader}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Warning delete modal  */}
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
                  Are you sure you want to delete this data?
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
              onClick={deleteQuestionHeader}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default QuestionHeader;

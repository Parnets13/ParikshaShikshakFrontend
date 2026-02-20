import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const QandA_edit10Sentences = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

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
    setInstruction(data);
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

  const [Board, setBoard] = useState("");
  const [Medium, setMedium] = useState("");
  const [Class, setClass] = useState("");
  const [Sub_Class, setSub_Class] = useState("");
  const [Subjects, setSubjects] = useState("");
  const [Chapter_Name, setChapter_Name] = useState("");
  const [Lesson, setLesson] = useState("");
  const [Difficulty_level, setDifficulty_level] = useState("");
  const [Types_Question, setTypes_Question] = useState("");
  const [Section, setSection] = useState("");
  const [Name_of_examination, setName_of_examination] = useState("");
  const [Question, setQuestion] = useState("");
  const [Option_1, setOption_1] = useState("");
  const [Option_2, setOption_2] = useState("");
  const [Option_3, setOption_3] = useState("");
  const [Option_4, setOption_4] = useState("");
  const [Objectives, setObjectives] = useState("");
  const [Image, setImage] = useState("");
  const [Marks, setMarks] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Instruction, setInstruction] = useState("");
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
          Board: Board,
          Medium: Medium,
          Class: Class,
          Sub_Class: Sub_Class,
          Subject: Subjects,
          Chapter_Name: Chapter_Name,
          Difficulty_level: Difficulty_level,
          Types_Question: Types_Question,
          Lesson: Lesson,
          Section: Section,
          Question: Question,
          Option_1: Option_1,
          Option_2: Option_2,
          Option_3: Option_3,
          Option_4: Option_4,
          Name_of_examination: Name_of_examination,
          Objectives: Objectives,
          Instruction: Instruction,
          Image: Image,
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

  //   get method for weightage
  const [weightage, setweightage] = useState([]);
  const getallweightagecontent = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getallcontent"
      );
      if (res.status === 200) {
        setweightage(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get method
  const [getboardname, setboardname] = useState([]);
  const getallboardname = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllBoard"
      );
      if (res.status == 200) {
        setboardname(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get method for medium
  const [Mediumm, setMediumm] = useState([]);
  const getAddMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status == 200) {
        setMediumm(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // get method add class
  const [getclassname, setgetclassName] = useState([]);
  const getallclassname = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllClass"
      );
      if (res.status == 200) {
        setgetclassName(res.data.success);
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
      if (res.status == 200) {
        setgetaddsubclass(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for subject
  const [subject, setsubject] = useState([]);
  const getSubject = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllSujects"
      );
      if (res.status == 200) {
        setsubject(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for type of questions
  const [getalltypesofques, setgetalltypesofques] = useState([]);
  const getalltypesofquess = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllTypesofquestion"
      );
      if (res.status == 200) {
        setgetalltypesofques(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get of chapters
  const [chapters, setchapters] = useState([]);
  const getChapter = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllChapter"
      );
      if (res.status == 200) {
        setchapters(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //get for name of Examination
  const [NameExam, setNameExam] = useState([]);
  const getNameExamination = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllNameExamination"
      );
      if (res.status == 200) {
        setNameExam(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getallboardname();
    getAddMedium();
    getallclassname();
    getaddsubclasss();
    getSubject();
    getalltypesofquess();
    getallweightagecontent();
    getChapter();
    getNameExamination();
  }, []);
  // Line
  const [twoline, setTwoline] = useState(false);
  const [threeline, setThreeline] = useState(false);
  const [fourline, setFourline] = useState(false);
  const [fiveline, setFiveline] = useState(false);
  const [sixline, setSixline] = useState(false);
  const [sevenline, setSevenline] = useState(true);
  const [eightline, setEightline] = useState(false);
  const [nineline, setNineline] = useState(false);
  const [tenline, setTenline] = useState(false);
  return (
    <div>
      <div className="mb-4">
        <div className="container">
          {/* <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Examination Board</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Board</option>
                  <option value="Easy">CBSE</option>
                  <option value="Average">STATE</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Medium</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Medium</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Kannada</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Class</label>
                <Form.Select aria-label="Default select example">
                  <option>Fifth Class</option>
                  <option>LKG Class</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Sub-Class</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Sub-Class</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Subject</label>
                <Form.Select aria-label="Default select example">
                  <option>Select subject</option>
                  <option>Hindi</option>
                  <option>English</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select subject part</label>
                <Form.Select aria-label="Default select example">
                  <option value="">Select subject part</option>
                  <option value="">aerfsd</option>
                  <option value="">tyrtg</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Chapter Name</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Chapter Name</option>
                  <option value="">r6</option>
                  <option value="">wfd</option>
                </Form.Select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select the Difficulty level of Paper</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Difficulty level of Paper</option>
                  <option value="Easy">Easy</option>
                  <option value="Average">Average</option>
                  <option value="Difficult">Difficult</option>
                </Form.Select>
              </div>
            </div>
          </div> */}
          <div className="row mt-2">
            {/* <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Name Of the Examination</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Name Of the Examination</option>
                  <option value="">FA-3</option>
                  <option value="">FA-2</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select aria-label="Default select example">
                  <option>Answer Timing</option>
                  <option value="">5 minuts</option>
                  <option value="">4 minuts</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter The Marks"
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Ojectives</label>
                <Form.Select aria-label="Default select example">
                  <option>Select Objectives</option>
                  <option>Remembering</option>
                  <option value="">Understanding</option>
                  <option value="">Expression</option>
                  <option value="">Appreciation</option>
                </Form.Select>
              </div>
            </div> */}

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>
                <CKEditor editor={ClassicEditor} className="vi_0" />
              </div>
            </div>

            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Number of Line</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
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
                <CKEditor editor={ClassicEditor} className="vi_0" />
              </div>
            </div>

            <div>
              <h6 style={{ padding: "20px 0 0 0", textAlign: "center" }}>
                <b>(OR)</b>
              </h6>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 1</label>
                <input type="file" className="vi_0" />
              </div>
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image 2</label>
                <input type="file" className="vi_0" />
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>
                <CKEditor editor={ClassicEditor} className="vi_0" />
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>
                <CKEditor editor={ClassicEditor} className="vi_0" />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <Form.Select
                  aria-label="Default select example"
                  // onChange={(e) => {
                  //   setTypes_Question(e.target.value);
                  // }}
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select aria-label="Default select example">
                  <option>Answer Timing</option>
                  <option value="">5 minuts</option>
                  <option value="">4 minuts</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className="yoihjij text-center my-2 p-2 ">
            <Button className="modal-add-btn">Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QandA_edit10Sentences;

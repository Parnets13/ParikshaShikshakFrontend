import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
// import "../Admin/Admin.css";
import "../../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ViewPoem() {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  console.log(weightage);
  console.log(NameExam);
  const [Dash, setDash] = useState("4");
  return (
    <div>
      <div className="box_1">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Examination Board</label>
                <p className="vi_0">the Board Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Medium</label>
                <p className="vi_0">the Medium Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Class</label>
                <p className="vi_0">the Class Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Sub-Class</label>
                <p className="vi_0">the Sub-Class Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Subject</label>
                <p className="vi_0">the Subject Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Subject Part</label>
                <p className="vi_0">Selete the Lesson Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Chapter Name</label>
                <p className="vi_0">the Chapter Name Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> the Difficulty level of Paper</label>
                <p className="vi_0">the Difficulty level of Paper Will Show</p>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Name Of the Examination</label>
                <p className="vi_0">the Name Of the Examination Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="">Objectives</label>
              <p className="vi_0">Objectives Will Show</p>
            </div>
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>
                {/* <textarea
        name=""
        id=""
        cols="30"
        rows="5"
        className="vi_0"
      ></textarea> */}
                <p className="vi_0">Question Will Show</p>
              </div>
            </div>

            <div className="col-md-5">
              <div className="do-sear mt-2">
                <label htmlFor=""> Poem Line </label>
                <p className="vi_0">Line Will Show 4</p>
              </div>
            </div>

            {Dash === "4" ? (
              <>
                <div className="col-md-7">
                  <label htmlFor=""> Write Poem </label>
                  <div className="d-flex align-items-end">
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                    />
                    <span style={{ whiteSpace: "pre-line" }}>
                      {" "}
                      _____________________________
                    </span>
                    <br />
                  </div>

                  <span style={{ whiteSpace: "pre-line" }}>
                    __________________________________________________________
                  </span>
                  <br />
                  <span style={{ whiteSpace: "pre-line" }}>
                    __________________________________________________________
                  </span>
                  <br />

                  <div className="d-flex align-items-end">
                    <span style={{ whiteSpace: "pre-line" }}>
                      {" "}
                      ________________________________
                    </span>
                    <input
                      className="vi_0"
                      type="text"
                      placeholder="enter text"
                    />
                  </div>
                </div>
              </>
            ) : (
              <> </>
            )}

            {/* <div className="col-md-6">
            <div className="do-sear mt-2">
              <label htmlFor="">Option 1</label>
              <CKEditor
                editor={ClassicEditor}
                className="vi_0"
                data={Option_1}
                onChange={handleChange3}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="do-sear mt-2">
              <label htmlFor="">Option 2</label>
              <CKEditor
                editor={ClassicEditor}
                className="vi_0"
                data={Option_2}
                onChange={handleChange4}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="do-sear mt-2">
              <label htmlFor="">Option 3</label>
              <CKEditor
                editor={ClassicEditor}
                className="vi_0"
                data={Option_3}
                onChange={handleChange5}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="do-sear mt-2">
              <label htmlFor="">Option 4</label>
              <CKEditor
                editor={ClassicEditor}
                className="vi_0"
                data={Option_4}
                onChange={handleChange6}
              />
            </div>
          </div> */}

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <p className="vi_0">Marks Will Show</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Answer Time</label>
                <p className="vi_0">Answer Time Will Show</p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <div className="do-sear mt-2">
                  <label htmlFor="">Answer</label>
                  <p className="vi_0">Answer Will Show</p>
                </div>
              </div>
            </div>
            {/* <div className="yoihjij my-4">
            <button style={{ float: "right" }}>Add</button>
          </div> */}
          </div>
        </div>

        <div className="yoihjij text-center my-2 p-2 ">
          <Button
            onClick={() => {
              window.location.assign("/poemlist");
            }}
            className="modal-add-btn"
          >
            Back
          </Button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Answer the Question Draw the Figure</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="">Question</label>
            <p className="vi_0">
              Draw the figure below according to the given specifications:
            </p>
            <label htmlFor="">Answer</label>
            <p className="vi_0">
              Point P lies on AB. XY and PQ intersect at M. Line L contains E
              and F but not D. OQ and OP meet at O.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Edit
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addquestions();
            }}
          >
            Submit
          </Button>

          <Button
            variant="danger"
            onClick={() => window.location.assign("/drawfigurelist")}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ViewPoem;

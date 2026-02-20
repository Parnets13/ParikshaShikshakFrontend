import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const SituationAnalysis_edit = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [show, setShow] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, editor) => {
    const data = editor.getData();
    setFormFields(data);
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

  const [formFields, setFormFields] = useState([{ SubQue: "" }]);

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    data[index][event.target.SubQue] = event.target.value;
    setFormFields(data);
  };
  const submit = () => {
    // e.preventDefault();
  };
  const addFields = () => {
    let object = {
      SubQue: "",
    };
    setFormFields([...formFields, object]);
  };
  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setFormFields(data);
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
  return (
    <div>
      <div className="box_1">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question 1</label>
                {/* <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="vi_0"
                ></textarea> */}
                <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Question}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="text-end">
              <button
                className="btn btn-success mt-2 "
                onClick={() => {
                  addFields();
                }}
              >
                Add SubQuestion
              </button>
            </div>
            <Form onSubmit={submit()}>
              <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label htmlFor="">Sub Questions</label>
                  {formFields?.map((form, index) => {
                    return (
                      <div className="d-flex gap-2 mb-1">
                        <CKEditor
                          style={{ width: "100%" }}
                          editor={ClassicEditor}
                          className="vi_0"
                          data={form.SubQue}
                          onChange={(event) => {
                            handleChange();
                            handleFormChange(event, index);
                          }}
                          // value={form.SubQue}
                        />
                        <div style={{ padding: "1rem" }}>
                          <button
                            className="btn btn-danger"
                            onClick={() => {
                              removeFields(index);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => {
                    submit();
                  }}
                >
                  Submit
                </button>
              </div>
            </Form>
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>
                {/* <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="5"
                  className="vi_0"
                ></textarea> */}
                <CKEditor
                  editor={ClassicEditor}
                  className="vi_0"
                  data={Question}
                  onChange={handleChange}
                />
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
                    <option>1.5</option>
                  <option>2</option> 
                   <option>2.5</option>
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
                <Form.Select
                  aria-label="Default select example"
                  // onChange={(e) => {
                  //   setTypes_Question(e.target.value);
                  // }}
                >
                  <option>Select the Time</option>
                  <option>1/2 Mnt</option>
                  <option>1/4 Mnt</option>
                  <option>1 mnt</option>
                  <option>1.30 minutes</option>
                  <option>2 minutes</option>
                  <option>3 minutes</option>
                  <option>4 minutes</option>
                  <option>5 minutes</option>
                  <option>6 minutes</option>
                  <option>7 minutes</option>
                  <option>8 minutes</option>
                  <option>9 minutes</option>
                  <option>10 minutes</option>
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
          <Button
            onClick={() => {
              //   addquestions();
              // handleShow();
            }}
            className="modal-add-btn"
          >
            Update
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
              <p className="vi_0"></p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 1 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 3 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 4 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 5 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 6 </label>
                <p className="vi_0"></p>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="do-sear mt-2">
              <label htmlFor="">Answer</label>
              <p className="vi_0"></p>
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
              <p className="vi_0"></p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 1 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 3 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 4 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 5 </label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 6 </label>
                <p className="vi_0"></p>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="do-sear mt-2">
              <label htmlFor="">Image Answer</label>
              <p className="vi_0"></p>
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
                //   AddSubject();
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
                navigate(`/adminmcqquestions`);
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

export default SituationAnalysis_edit;

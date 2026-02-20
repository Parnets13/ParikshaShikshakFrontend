import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const OddAndOut_vieww = () => {
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
  return (
    <div>
      <div className="box_1 mb-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Examination Board</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Medium</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Class</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Sub-Class</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Subject</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Lesson</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Chapter Name</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select the Difficulty level of Paper</label>
                <p className="vi_0"></p>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Name Of the Examination</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Objectives</label>
              </div>{" "}
              <p className="vi_0"></p>
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 1</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 2</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 3</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Option 4</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Answer</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="mt-2">
              <label
                htmlFor=""
                style={{ display: "flex", justifyContent: "space-around" }}
              >
                (OR)
              </label>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Image 1</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Image 2</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Image 3</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear">
                <label htmlFor="">Image 4</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-12">
              <div className="do-sear">
                <label htmlFor="">Image Answer</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <p className="vi_0"></p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <p className="vi_0"></p>
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
      </div>
    </div>
  );
};

export default OddAndOut_vieww;

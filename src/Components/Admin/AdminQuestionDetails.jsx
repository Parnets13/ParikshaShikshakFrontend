// import React, { useEffect, useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import "../Admin/Admin.css";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import axios from "axios";
// import { Navigate, useNavigate } from "react-router-dom";
// import swal from "sweetalert";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import ListItemText from "@mui/material/ListItemText";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import Checkbox from "@mui/material/Checkbox";

// import AdminQuestprops from "./AdminQuestprops";
// import MathEditor from "./MyEditor";
// import { debounce } from "lodash";
// let googleTransliterate = require("google-input-tool");

// const AdminQuestionDetails = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   //Translate
//   const [translatedValue, setTranslatedValue] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
//   const onChangeHandler = debounce(async (value, setData) => {
//     if (!value) {
//       setTranslatedValue("");
//       setData("");
//       return "";
//     }

//     let am = value.split(/\s+/); // Split by any whitespace characters
//     let arr = [];
//     let promises = [];

//     for (let index = 0; index < am.length; index++) {
//       promises.push(
//         new Promise(async (resolve, reject) => {
//           try {
//             const response = await googleTransliterate(
//               new XMLHttpRequest(),
//               am[index],
//               selectedLanguage
//             );
//             resolve(response[0][0]);
//           } catch (error) {
//             console.error("Translation error:", error);
//             resolve(am[index]);
//           }
//         })
//       );
//     }

//     try {
//       const translations = await Promise.all(promises);
//       setTranslatedValue(translations.join(" "));
//       setData(translations.join(" "));
//       return translations;
//     } catch (error) {
//       console.error("Promise.all error:", error);
//     }
//   }, 300); // Debounce delay in milliseconds

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };

//   // get method for objectives
//   const [getobjectives, setgetobjectives] = useState([]);

//   const getObjectives = async () => {
//     try {
//       const res = await axios.get(
//         `http://localhost:8774/api/admin/getobjective`
//       );

//       if (res.status === 200) {
//         setgetobjectives(res.data.success);
//       } else {
//         // Handle non-200 status codes here if needed
//         console.error(`Request failed with status code ${res.status}`);
//       }
//     } catch (error) {
//       console.error("Error fetching objectives:", error);
//     }
//   };
//   //post

//   const [Board, setBoard] = useState("");
//   const [Medium, setMedium] = useState("");
//   const [Class, setClass] = useState("");
//   const [Sub_Class, setSub_Class] = useState("");
//   const [Subjects, setSubjects] = useState("");
//   const [Chapter_Name, setChapter_Name] = useState("");
//   const [Lesson, setLesson] = useState("");
//   const [Difficulty_level, setDifficulty_level] = useState("");
//   const [Types_Question, setTypes_Question] = useState("");
//   const [Section, setSection] = useState("");
//   const [Name_of_examination, setName_of_examination] = useState([]);
//   const [Objectives, setObjectives] = useState("");
//   const [QuestionTYpe, setQuestionTYpe] = useState("");
//   const [Instruction, setInstruction] = useState("");
//   const [QuestionTypeTranlate, setQuestionTypeTranlate] = useState("");

//   const addExamaData = (name) => {
//     try {
//       setName_of_examination([...Name_of_examination, { Name: name }]);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteExamData = (name) => {
//     setName_of_examination(
//       Name_of_examination?.filter((ele) => ele?.Name != name)
//     );
//   };

//   const selectdetails = {
//     Section: Section,
//     Board: Board,
//     Medium: Medium,
//     Sub_Class: Sub_Class,
//     Class: Class,
//     Subjects: Subjects,
//     Lesson: Lesson,
//     Chapter_Name: Chapter_Name,
//     Difficulty_level: Difficulty_level,
//     Name_of_examination: Name_of_examination,
//     Objectives: Objectives,
//     Types_QuestionTranslate: QuestionTypeTranlate,
//     Types_Question: Types_Question,
//     Instruction: Instruction,
//     selectedLanguage: selectedLanguage,
//     QuestionTYpe: QuestionTYpe,
//   };

//   console.log("selectdetailscheck", selectdetails);
//   useEffect(() => {
//     if (Types_Question && selectedLanguage) {
//       localStorage.setItem("selectdetails", JSON.stringify(selectdetails));
//     }
//   }, [selectdetails.Instruction, selectedLanguage, Types_Question]);

//   //   get method for weightage
//   const [weightage, setweightage] = useState([]);
//   const getallweightagecontent = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getallcontent"
//       );
//       if (res.status === 200) {
//         setweightage(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get method
//   const [getboardname, setboardname] = useState([]);
//   const getallboardname = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllBoard"
//       );
//       if (res.status == 200) {
//         setboardname(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get method for medium
//   const [Mediumm, setMediumm] = useState([]);
//   const getAddMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status == 200) {
//         setMediumm(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // get method add class
//   const [getclassname, setgetclassName] = useState([]);
//   const getallclassname = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllClass"
//       );
//       if (res.status == 200) {
//         setgetclassName(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // get method for subclass
//   const [getaddsubclass, setgetaddsubclass] = useState([]);
//   const getaddsubclasss = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSubClass"
//       );
//       if (res.status == 200) {
//         setgetaddsubclass(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get for subject
//   const [subject, setsubject] = useState([]);
//   const getSubject = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSujects"
//       );
//       if (res.status == 200) {
//         setsubject(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get for type of questions
//   const [getalltypesofques, setgetalltypesofques] = useState([]);
//   const getalltypesofquess = async () => {
//     try {
//       let res = await axios.get(
//         "https://pariksha   shikshak.com/api/admin/getAllTypesofquestion"
//       );
//       if (res.status == 200) {
//         setgetalltypesofques(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get of chapters
//   const [chapters, setchapters] = useState([]);
//   const getChapter = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllChapter"
//       );
//       if (res.status == 200) {
//         setchapters(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get for name of Examination
//   const [NameExam, setNameExam] = useState([]);
//   const getNameExamination = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllNameExamination"
//       );
//       if (res.status == 200) {
//         setNameExam(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get for Difficulty Level
//   const [DifficultyLevel, setDifficultyLevel] = useState([]);
//   const getDifficultyLevel = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllDiffLevel"
//       );
//       if (res.status == 200) {
//         setDifficultyLevel(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getallboardname();
//     getAddMedium();
//     getallclassname();
//     getaddsubclasss();
//     getSubject();
//     getalltypesofquess();
//     getallweightagecontent();
//     getChapter();
//     getNameExamination();
//     getObjectives();
//     getDifficultyLevel();
//   }, []);

//   const uniqueClassNamesSet = new Set(
//     getaddsubclass.map((item) => item.className)
//   );
//   const uniqueClassNamesArray = Array.from(uniqueClassNamesSet);
//   console.log("uniqueClassNamesArray", uniqueClassNamesArray);
//   const [trans, settran] = useState("");
//   const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 250,
//       },
//     },
//   };

//   const handleSelectChange = (event) => {
//     const {
//       target: { value },
//     } = event;
//     setName_of_examination(value);
//   };

//   //get
//   const [QuestionType, setQuestionType] = useState([]);
//   const getallQuestiontype = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getquestiontype/" +
//           admin?._id,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.status == 200) {
//         setQuestionType(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getallQuestiontype();
//   }, []);

//   return (
//     <div>
//       <div className="row">
//         <div className="col-md-10"></div>
//         <div className="col-md-2">
//           <label htmlFor="">Select Langauge</label>
//           <select
//             value={selectedLanguage}
//             onChange={handleLanguageChange}
//             className="vi_0"
//             style={{ borderRadius: "20px", backgroundColor: "#e2cbd0" }}
//           >
//             <option value="en-t-i0-und">English</option>
//             <option value="ne-t-i0-und">Nepali</option>
//             <option value="hi-t-i0-und">Hindi</option>
//             <option value="kn-t-i0-und">Kannada</option>
//             <option value="ta-t-i0-und">Tamil</option>
//             <option value="pa-t-i0-und">Punjabi</option>
//             <option value="mr-t-i0-und">Marathi</option>
//             <option value="ur-t-i0-und">Urdu</option>
//             <option value="sa-t-i0-und">Sanskrit</option>
//           </select>
//         </div>
//       </div>
//       <div className="box_1">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-4">
//               {/* <div className="do-sear mt-2">
//                 <label htmlFor="">Section</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder="Enter Section"
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-und") {
//                       setSection(e.target.value);
//                     } else onChangeHandler(e.target.value, setSection);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Section}</p>}
//               </div> */} 
               
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Section</label>
//                 <select
//                   className="vi_0"
//                   onChange={(e) => {
//                     if (selectedLanguage === "en-t-i0-und") {
//                       setSection(e.target.value);
//                     } else {
//                       onChangeHandler(e.target.value, setSection);
//                     }
//                   }}
//                   defaultValue=""
//                 >
//                   <option value="" disabled>
//                     Select Section
//                   </option>
//                   <option value="Part-1">Part-1</option>
//                   <option value="Part-2">Part-2</option>   
//                   <option value="Part-1">Part-3</option>
//                   <option value="Part-2">Part-4</option>
//                 </select>

//                 {selectedLanguage === "en-t-i0-und" ? null : <p>{Section}</p>}
//               </div>

//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select Medium</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setMedium(e.target.value)}
//                 >
//                   <option>Select the Medium</option>
//                   {Mediumm?.map((item, i) => {
//                     return (
//                       <option value={item?.mediumName} key={i}>
//                         {item?.mediumName}
//                       </option>
//                     );
//                   })}
//                   {/* {[...new Set(QuestionType?.map(item => item.QFormatMedium))].map((QFormatMedium, index) => (
//                     <option key={index} value={QFormatMedium}>{QFormatMedium}</option>
//                   ))} */}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor=""> Examination Board</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   className="vi_0"
//                   onChange={(e) => setBoard(e.target.value)}
//                 >
//                   <option>Select the Board</option>
//                   {getboardname
//                     ?.filter((yeah) => yeah.mediumName === Medium)
//                     ?.map((item, i) => {
//                       return (
//                         <option value={item?.boardName} key={i}>
//                           {item?.boardName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select Class</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setClass(e.target.value)}
//                 >
//                   <option value="">Select Class</option>
//                   {[
//                     ...new Set(
//                       getaddsubclass
//                         .filter((ele) => ele.mediumName === Medium)
//                         .map((val) => val.className)
//                     ),
//                   ].map((className, i) => (
//                     <option value={className} key={i}>
//                       {className}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select Sub-Class</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setSub_Class(e.target.value)}
//                 >
//                   <option>Select the Sub-Class</option>
//                   {getaddsubclass
//                     ?.filter(
//                       (ele) =>
//                         ele.className === Class && ele.mediumName === Medium
//                     )
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subclassName} key={i}>
//                           {val?.subclassName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setSubjects(e.target.value)}
//                 >
//                   <option>Select the Subject</option>
//                   {subject
//                     ?.filter((ele) => ele.mediumName === Medium)
//                     .map((item, i) => {
//                       return (
//                         <option value={item?.subjectName} key={i}>
//                           {item?.subjectName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Lesson</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setLesson(e.target.value);
//                   }}
//                 >
//                   <option value="">Selete the Lesson</option>
//                   {weightage
//                     ?.filter((ele) => Subjects === ele?.Subject)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.Content} key={i}>
//                           {val?.Content}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select Chapter Name</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setChapter_Name(e.target.value)}
//                 >
//                   <option>Select the Chapter Name</option>
//                   {chapters
//                     ?.filter(
//                       (ele) =>
//                         ele?.subjectName == Subjects &&
//                         ele?.SubjectPart == Lesson
//                     )
//                     ?.map((item, i) => {
//                       return (
//                         <option value={item?.chapterName} key={i}>
//                           {item?.chapterName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select the Difficulty level of Paper</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setDifficulty_level(e.target.value);
//                   }}
//                 >
//                   <option>Select the Difficulty level of Paper</option>
//                   {/* <option value="Easy">Easy</option>
//                   <option value="Average">Average</option>
//                   <option value="Difficult">Difficult</option> */}
//                   {DifficultyLevel?.filter(
//                     (ele) => ele.mediumName === Medium
//                   ).map((item) => {
//                     return (
//                       <option value={item?.DiffLevelName}>
//                         {item?.DiffLevelName}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//             </div>

//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Objectives</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setObjectives(e.target.value)}
//                 >
//                   <option>Select Objectives</option>
//                   {getobjectives
//                     ?.filter((ele) => ele.mediumName === Medium)
//                     .map((val, i) => {
//                       return (
//                         <option value={val?.Objectivesname}>
//                           {val?.Objectivesname}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select Question Type</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setQuestionTYpe(e.target.value)}
//                 >
//                   <option>Select Question Type</option>
//                   {[
//                     ...new Set(
//                       QuestionType?.filter(
//                         (ele) => ele.QFormatMedium === Medium
//                       )?.map((item) => item.typeOfquestion)
//                     ),
//                   ].map((type, index) => (
//                     <option key={index} value={type}>
//                       {type}
//                     </option>
//                   ))}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="col-md-4">
//               <label className="fw-bold">Name Of Examnation :</label>
//               <FormControl sx={{ m: 1, width: 245, height: 43 }}>
//                 <InputLabel id="demo-multiple-checkbox-label">
//                   Name Of Exam
//                 </InputLabel>
//                 <Select
//                   labelId="demo-multiple-checkbox-label"
//                   id="demo-multiple-checkbox"
//                   multiple
//                   value={Name_of_examination}
//                   onChange={handleSelectChange}
//                   input={<OutlinedInput label="Amenities" />}
//                   renderValue={(selected) =>
//                     selected
//                       .map((amenity) => amenity.NameExamination)
//                       .join(", ")
//                   }
//                 >
//                   {NameExam?.map((amenity) => (
//                     <MenuItem key={amenity._id} value={amenity}>
//                       <Checkbox
//                         checked={Name_of_examination.some(
//                           (selected) => selected._id === amenity._id
//                         )}
//                       />
//                       <ListItemText primary={amenity.NameExamination} />
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {/* <div className="do-sear mt-2">
//                 <label htmlFor="">Name Of the Examination</label>
//                 {NameExam?.map((item, i) => {
//                     return (<div>
//                       <input type="check"  value={item?.NameExamination} key={i}/>
//                       <label>
//                            {item?.NameExamination}
//                       </label>
                     
                    
//                     </div>);
//                   })}
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setName_of_examination(e.target.value);
//                   }}
//                 >
//                   <option>Select the Name Of the Examination</option>
//                   {NameExam?.map((item, i) => {
//                     return (
//                       <option value={item?.NameExamination} key={i}>
//                         {item?.NameExamination}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div> */}
//             </div>
//             <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select the Types of the Question</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     const selectedValue = e.target.value;
//                     const values = selectedValue.split(",");

//                     if (values.length === 2) {
//                       setQuestionTypeTranlate(values[0]);
//                       setTypes_Question(values[1]);
//                     } else {
//                       setTypes_Question(selectedValue);
//                     }
//                   }}
//                 >
//                   <option>Select Question Type</option>
//                   {QuestionType?.filter(
//                     (ele) =>
//                       ele.typeOfquestion === QuestionTYpe &&
//                       ele.QFormatMedium === Medium
//                   )?.map((item2) => {
//                     return (
//                       <option
//                         value={
//                           item2?.translatelang
//                             ? `${item2.translatelang},${item2.Qformat}`
//                             : item2.Qformat
//                         }
//                       >
//                         {item2?.translatelang ? (
//                           <>{item2?.translatelang}</>
//                         ) : (
//                           <>{item2?.Qformat}</>
//                         )}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//             </div>

//             {/* <div className="col-md-4">
//               <div className="do-sear mt-2">
//                 <label htmlFor="">Select the Types of the Question</label>
//               </div>{" "}
//               <Form.Select
//                 aria-label="Default select example"
//                 value={Types_Question}
//                 onChange={(e) => {
//                   setTypes_Question(e.target.value);
//                 }}
//               >
//                 <option value="default">
//                   Select the Types of the Question
//                 </option>
//                 <option value="Objective Questions">Objective Questions</option>
//                 <option value="Multiple Choice Questions">
//                   Multiple Choice Questions
//                 </option>
//                 <option value="Fill in the Blanks Questions">
//                   Fill in the Blanks
//                 </option>
//                 <option value="Match the Following Questions">
//                   Match the Following
//                 </option>
//                 <option value="Recorrect the Answers Questions">
//                   Recorrect the Answers
//                 </option>
//                 <option value="Classifications of Questions">
//                   Classifications of Questions
//                 </option>
//                 <option value="Odd and out words Questions">
//                   Odd and out words Questions
//                 </option>
//                 <option value="RelationShip Words Questions">
//                   RelationShip Words Questions
//                 </option>
//                 <option value="Grammer Questions">Grammer Questions</option>
//                 <option value="One Word Question">One Word Question</option>
//                 <option value="One Sentence Answer Question">
//                   One Sentence Answer Question
//                 </option>
//                 <option value="Two  Sentence Answer Questions">
//                   Two Sentence Answer Questions
//                 </option>
//                 <option value="Two and three Sentence Answer Questions">
//                   Two and three Sentence Answer Questions
//                 </option>
//                 <option value="Three and Four Sentence Answer Questions">
//                   Three and Four Sentence Answer Questions
//                 </option>

//                 <option value="Five and Six Sentence Answer Questions">
//                   Five and Six Sentence Answer Questions
//                 </option>
//                 <option value="Six Sentence Answer Questions">
//                   Six Sentence Answer Questions
//                 </option>
//                 <option value="Seven Sentence Answer Questions">
//                   Seven Sentence Answer Questions
//                 </option>
//                 <option value="Eight Sentence Answer Questions">
//                   Eight Sentence Answer Questions
//                 </option>
//                 <option value="Ten Sentence Answer Questions">
//                   Ten Sentence Answer Questions
//                 </option>
//                 <option value="Expanding and Explanations Answer Questions">
//                   {" "}
//                   Expanding and Explanations Answer Questions
//                 </option>
//                 <option value="Answer the Questions and Draw the Figure Questions">
//                   Answer the Questions and Draw the Figure Questions{" "}
//                 </option>
//                 <option value="Graph Questions">Graph Questions</option>
//                 <option value="Complete the Poem">Complete the Poem</option>
//                 <option value="Situation UnderStatnding answer Questions">
//                   {" "}
//                   Situation UnderStatnding answer Questions
//                 </option>
//                 <option value="Poet,Time, Place, Writer answer questions">
//                   {" "}
//                   Poet,Time, Place, Writer answer questions
//                 </option>
//                 <option value="Letter Writting">Letter Writting</option>
//                 <option value="Map Reading">Map Reading</option>
//               </Form.Select>
//             </div> */}
//           </div>
//           <div className="col-md-12">
//             <div className="do-sear">
//               <label htmlFor="">Instructions</label>
//               <MathEditor
//                 data={{
//                   A: Instruction,
//                   B: setInstruction,
//                   selectedLanguage,
//                   trans: trans,
//                   settran: settran,
//                 }}
//               />
//             </div>
//           </div>
//           <div className="col-md-12 mt-3">
//             <AdminQuestprops
//               Types_Question={Types_Question}
//               data={selectedLanguage}
//               selectdetails={selectdetails}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminQuestionDetails;
 
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../Admin/Admin.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import AdminQuestprops from "./AdminQuestprops";
import MathEditor from "./MyEditor";
import { debounce } from "lodash";
let googleTransliterate = require("google-input-tool");

const AdminQuestionDetails = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  // State for translation
  const [translatedValue, setTranslatedValue] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");
  const [trans, settran] = useState("");

  // Translation handler
  const onChangeHandler = debounce(async (value, setData) => {
    if (!value) {
      setTranslatedValue("");
      setData("");
      return "";
    }

    let am = value.split(/\s+/);
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
  }, 300);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // Main state variables
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
  const [Name_of_examination, setName_of_examination] = useState([]);
  const [Objectives, setObjectives] = useState("");
  const [QuestionTYpe, setQuestionTYpe] = useState("");
  const [Instruction, setInstruction] = useState("");
  const [QuestionTypeTranlate, setQuestionTypeTranlate] = useState("");
  
  // Data lists from API
  const [subjectList, setSubjectList] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [getobjectives, setgetobjectives] = useState([]);
  const [weightage, setweightage] = useState([]);
  const [getboardname, setboardname] = useState([]);
  const [Mediumm, setMediumm] = useState([]);
  const [getclassname, setgetclassName] = useState([]);
  const [getaddsubclass, setgetaddsubclass] = useState([]);
  const [chapters, setchapters] = useState([]);
  const [NameExam, setNameExam] = useState([]);
  const [DifficultyLevel, setDifficultyLevel] = useState([]);
  const [getalltypesofques, setgetalltypesofques] = useState([]);
  const [QuestionType, setQuestionType] = useState([]);

  // Examination data handlers
  const addExamaData = (name) => {
    try {
      setName_of_examination([...Name_of_examination, { Name: name }]);
    } catch (error) {
      console.log(error);
    }
  }; 

  const deleteExamData = (name) => {
    setName_of_examination(
      Name_of_examination?.filter((ele) => ele?.Name != name)
    );
  };

  // Select details object
  const selectdetails = {
    Section,
    Board,
    Medium,
    Sub_Class,
    Class,
    Subjects,
    Lesson,
    Chapter_Name,
    Difficulty_level,
    Name_of_examination,
    Objectives,
    Types_QuestionTranslate: QuestionTypeTranlate,
    Types_Question,
    Instruction,
    selectedLanguage,
    QuestionTYpe,
  };

  // API functions
  const getObjectives = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8774/api/admin/getobjective`
      );
      if (res.status === 200) {
        setgetobjectives(res.data.success);
      }
    } catch (error) {
      console.error("Error fetching objectives:", error);
    }
  };

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
 
  
  const getSubject = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllSujects"
      );
      if (res.status == 200) {
        setSubjectList(res.data.success);
        if (Sub_Class) {
          const filtered = res.data.success.filter(
            ele => ele.subClass?.subclassName === Sub_Class
          );
          setFilteredSubjects(filtered);
          if (filtered.length > 0) {
            setSubjects(filtered[0].subjectName);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
   
  console.log("chaptersssssssssss",getChapter)

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

  const getDifficultyLevel = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllDiffLevel"
      );
      if (res.status == 200) {
        setDifficultyLevel(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getallQuestiontype = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getquestiontype/" + admin?._id,
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

  // Effects
  useEffect(() => {
    if (Types_Question && selectedLanguage) {
      localStorage.setItem("selectdetails", JSON.stringify(selectdetails));
    }
  }, [selectdetails.Instruction, selectedLanguage, Types_Question]);

  useEffect(() => {
    if (Sub_Class && subjectList.length > 0) {
      const filtered = subjectList.filter(
        ele => ele.subClass?.subclassName === Sub_Class
      );
      setFilteredSubjects(filtered);
      setSubjects("");
    }
  }, [Sub_Class, subjectList]);

  useEffect(() => {
    getallboardname();
    getAddMedium();
    getallclassname();
    getaddsubclasss();
    getSubject();
    getObjectives();
    getallweightagecontent();
    getChapter();
    getNameExamination();
    getDifficultyLevel();
    getalltypesofquess();
    getallQuestiontype();
  }, []);

  // UI constants
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const handleSelectChange = (event) => {
    const { target: { value } } = event;
    setName_of_examination(value);
  };

  const uniqueClassNamesSet = new Set(
    getaddsubclass.map((item) => item.className)
  );
  const uniqueClassNamesArray = Array.from(uniqueClassNamesSet);

  console.log("su====>",Subjects,weightage)
  return (
    <div>
      <div className="row">
        <div className="col-md-10"></div>
        <div className="col-md-2">
          <label htmlFor="">Select Language</label>
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
      <div className="box_1">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
             <div className="do-sear mt-2">
  <label htmlFor="">Section</label>
  <input
    type="text"
    className="vi_0"
    placeholder="Enter Section"
    onChange={(e) => {
      if (selectedLanguage === "en-t-i0-und") {
        setSection(e.target.value);
      } else {
        onChangeHandler(e.target.value, setSection);
      }
    }}
  />
  {selectedLanguage === "en-t-i0-und" ? null : <p>{Section}</p>}
</div>

            </div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Medium</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setMedium(e.target.value)}
                >
                  <option>Select the Medium</option>
                  {Mediumm?.map((item, i) => (
                    <option value={item?.mediumName} key={i}>
                      {item?.mediumName}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Examination Board</label>
                <Form.Select
                  aria-label="Default select example"
                  className="vi_0"
                  onChange={(e) => setBoard(e.target.value)}
                >
                  <option>Select the Board</option>
                  {getboardname
                    ?.filter((yeah) => yeah.mediumName === Medium)
                    ?.map((item, i) => (
                      <option value={item?.boardName} key={i}>
                        {item?.boardName}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Class</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setClass(e.target.value)}
                >
                  <option value="">Select Class</option>
                  {[
                    ...new Set(
                      getaddsubclass
                        .filter((ele) => ele.mediumName === Medium)
                        .map((val) => val.className)
                    ),
                  ].map((className, i) => (
                    <option value={className} key={i}>
                      {className}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Sub-Class</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setSub_Class(e.target.value)}
                >
                  <option>Select the Sub-Class</option>
                  {getaddsubclass
                    ?.filter(
                      (ele) =>
                        ele.className === Class && ele.mediumName === Medium
                    )
                    ?.map((val, i) => (
                      <option value={val?.subclassName} key={i}>
                        {val?.subclassName}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Subject</label>
                <Form.Select
                  aria-label="Default select example"
                  value={Subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  disabled={!Sub_Class}
                >
                  <option>Select the Subject</option>
                  {filteredSubjects.map((item) => (
                    <option value={item.subjectName} key={item._id}>
                      {item.subjectName}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Lesson</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setLesson(e.target.value)}
                >
                  <option value="">Select the Lesson</option>
                  {weightage
                    ?.filter((ele) => Subjects?.toLowerCase() === ele?.Subject?.toLowerCase() )
                    ?.map((val, i) => (
                      <option value={val?.Content} key={i}>
                        {val?.Content}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
            {/* <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Chapter Name</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setChapter_Name(e.target.value)}
                >
                  <option>Select the Chapter Name</option>
                  {chapters
                    ?.filter(
                      (ele) =>
                        ele?.subjectName == Subjects &&
                        ele?.SubjectPart == Lesson
                    )
                    ?.map((item, i) => (
                      <option value={item?.chapterName} key={i}>
                        {item?.chapterName}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div> */} 
             
             <div className="col-md-4">
  <div className="do-sear mt-2">
    <label htmlFor="">Select Chapter Name</label>
    <Form.Select
      aria-label="Default select example"
      onChange={(e) => setChapter_Name(e.target.value)}
    >
      <option>Select the Chapter Name</option>
      {chapters && Subjects && Lesson ? (
        chapters
          .filter(
            (ele) =>
              ele?.subjectName === Subjects &&
              ele?.SubjectPart === Lesson
          )
          .map((item, i) => (
            <option value={item?.chapterName} key={i}>
              {item?.chapterName}
            </option>
          ))
      ) : (
        <option disabled>Please select Subject and Lesson first</option>
      )}
    </Form.Select>
  </div>
</div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select the Difficulty level of Paper</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setDifficulty_level(e.target.value)}
                >
                  <option>Select the Difficulty level of Paper</option>
                  {DifficultyLevel?.filter(
                    (ele) => ele.mediumName === Medium
                  ).map((item) => (
                    <option value={item?.DiffLevelName} key={item._id}>
                      {item?.DiffLevelName}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>

            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Objectives</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setObjectives(e.target.value)}
                >
                  <option>Select Objectives</option>
                  {getobjectives
                    ?.filter((ele) => ele.mediumName === Medium)
                    .map((val, i) => (
                      <option value={val?.Objectivesname} key={i}>
                        {val?.Objectivesname}
                      </option>
                    ))}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Question Type</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setQuestionTYpe(e.target.value)}
                >
                  <option>Select Question Type</option>
                  {[
                    ...new Set(
                      QuestionType?.filter(
                        (ele) => ele.QFormatMedium === Medium
                      )?.map((item) => item.typeOfquestion)
                    ),
                  ].map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="col-md-4">
              <label className="fw-bold">Name Of Examination:</label>
              <FormControl sx={{ m: 1, width: 245, height: 43 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Name Of Exam
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={Name_of_examination}
                  onChange={handleSelectChange}
                  input={<OutlinedInput label="Amenities" />}
                  renderValue={(selected) =>
                    selected
                      .map((amenity) => amenity.NameExamination)
                      .join(", ")
                  }
                >
                  {NameExam?.map((amenity) => (
                    <MenuItem key={amenity._id} value={amenity}>
                      <Checkbox
                        checked={Name_of_examination.some(
                          (selected) => selected._id === amenity._id
                        )}
                      />
                      <ListItemText primary={amenity.NameExamination} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="col-md-4">
              <div className="do-sear mt-2">
                <label htmlFor="">Select the Types of the Question</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    const values = selectedValue.split(",");

                    if (values.length === 2) {
                      setQuestionTypeTranlate(values[0]);
                      setTypes_Question(values[1]);
                    } else {
                      setTypes_Question(selectedValue);
                    }
                  }}
                >
                  <option>Select Question Type</option>
                  {QuestionType?.filter(
                    (ele) =>
                      ele.typeOfquestion === QuestionTYpe &&
                      ele.QFormatMedium === Medium
                  )?.map((item2) => (
                    <option
                      value={
                        // item2?.translatelang
                        //  `
                        //   : item2.Qformat 
                        
                        item2.Qformat
                      }
                      key={item2._id}
                    >
                      {item2?.translatelang || item2?.Qformat}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="do-sear">
              <label htmlFor="">Instructions</label>
              <MathEditor
                data={{
                  A: Instruction,
                  B: setInstruction,
                  selectedLanguage,
                  trans: trans,
                  settran: settran,
                }}
              />
            </div>
          </div>
          <div className="col-md-12 mt-3">
            <AdminQuestprops
              Types_Question={Types_Question}
              data={selectedLanguage}
              selectdetails={selectdetails}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminQuestionDetails; 

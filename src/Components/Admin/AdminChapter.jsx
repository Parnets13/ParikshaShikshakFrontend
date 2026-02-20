// import React, { useEffect, useState } from "react";
// import { Button, Modal, Form, Pagination, Table } from "react-bootstrap";
// import { AiFillDelete } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import "../Admin/Admin.css";
// import axios from "axios";
// import swal from "sweetalert";
// import { debounce } from "lodash";
// import Button2 from "../Button2";
// import { Link } from "react-router-dom";
// const AdminChapter = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");
//   const [getclassname, setgetclassName] = useState([]);

//   const [show, setShow] = useState();
//   const [show1, setShow1] = useState();
//   const [show2, setShow2] = useState();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);
//   const [classtype, setClasstype] = useState({});

//   let googleTransliterate = require("google-input-tool");
//   const [translatedValue, setTranslatedValue] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };
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
//   //get method for medium
//   const [Medium, setMedium] = useState([]);
//   //  const [nochangedata, setnochangedata] = useState([]);
//   const getAddMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status == 200) {
//         setMedium(res.data.success);
//         //  setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // get method for class and subclass
//   const [getaddsubcla, setgetaddsubcla] = useState([]);
//   const getaddsubclas = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSubClass"
//       );
//       if (res.status == 200) {
//         setgetaddsubcla(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
 
//   const [mediumName, setmediumName] = useState("");
//   const [chapterName, setChapterName] = useState("");
//   const [subjectName, setSubjectName] = useState("");
//   const [SubjectPart, setSubjectPart] = useState("");
//   const [Classname, setClassname] = useState("");
//   const [Sub_classname, setSub_classname] = useState("");

//   const AddChapter = async () => {
//     if (!mediumName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the chapter name",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!chapterName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the chapter name",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!subjectName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter select subject name",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!SubjectPart)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter select subject Part",
//         icon: "error",
//         button: "Ok!",
//       });
//     try {
//       const config = {
//         url: "/admin/addChapter",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           chapterName: chapterName,
//           subjectName: subjectName,
//           SubjectPart: SubjectPart,
//           Classname: Classname,
//           Sub_classname: Sub_classname,
//           authId: admin?._id,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose();
//         getChapter();
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };
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
//   //get
//   const [chapters, setchapters] = useState([]);
//   const [nochangedata, setnochangedata] = useState([]);
//   const getChapter = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllChapter"
//       );
//       if (res.status == 200) {
//         setchapters(res.data.success);
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //update
//   const [updatechapter, setpdatesetchapter] = useState("");
//   const UpdateChapter = async () => {
//     try {
//       const config = {
//         url: "/admin/updateChapter", 
//         method: "put",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           chapterName: chapterName,
//           subjectName: subjectName,
//           SubjectPart: SubjectPart,
//           authId: admin?._id,
//           id: updatechapter,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200)
//         if (res.status == 200) {
//           handleClose1();
//           getChapter();
//           return swal({
//             title: "Yeah!",
//             text: res.data.success,
//             icon: "success",
//             button: "Ok!",
//           });
//         }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };
//   //delete
//   const [chapter, setChapter] = useState("");
//   const DeleteChapter = async () => {
//     try {
//       const config = {
//         url: "/admin/deleteChapter/" + chapter + "/" + admin?._id,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose2();
//         getChapter();
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   //   get method of subject
//   const [subject, setsubject] = useState([]);
//   //   const [nochangedata, setnochangedata] = useState([]);
//   const getSubject = async () => { 
//     try { 
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSujects"
//       );
//       if (res.status == 200) {
//         setsubject(res.data.success);
//         setnochangedata(res.data.success); 
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //   Row Filter
//   const [itempage, setItempage] = useState(5);

//   //   DateRange Filter
//   const [searchH, setSearchH] = useState("");
//   const handleFilterH = (e) => {
//     if (e.target.value != "") {
//       setSearchH(e.target.value);
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) =>
//           String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())
//         )
//       );
//       setchapters([...filterTableH]);
//     } else {
//       setSearchH(e.target.value);
//       setchapters([...nochangedata]);
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

//   console.log("chapters", chapters);
//   const [searchTermH, setSearchTermH] = useState("");
//   const searchedProductH = chapters.filter((item) => {
//     if (searchTermH.value === "") {
//       return item;
//     }
//     if (item?.EName?.toLowerCase().includes(searchTermH?.toLowerCase())) {
//       return item;
//     } else {
//       return console.log("not found");
//     }
//   });
//   // Pagination
//   // const [currenpage, setCurrentpage] = useState(1);
//   // const recordsperpage = 6;
//   // const lastIndex = currenpage * recordsperpage;
//   // const firstIndex = lastIndex - recordsperpage;
//   // const records = chapters.slice(firstIndex, lastIndex);
//   // const npages = Math.ceil(chapters.length / recordsperpage);
//   // const numbers = [...Array(npages + 1).keys()].slice(1);

//   // function changePage(id) {
//   //   setCurrentpage(id);
//   // }

//   // function prevpage() {
//   //   if (currenpage !== firstIndex) {
//   //     setCurrentpage(currenpage - 1);
//   //   }
//   // }

//   // function nextpage() {
//   //   if (currenpage !== lastIndex) {
//   //     setCurrentpage(currenpage + 1);
//   //   }
//   // }

//   useEffect(() => {
//     getAddMedium();
//     getaddsubclas();
//     getChapter();
//     getSubject();
//     getallweightagecontent();
//     getaddsubclasss();
//   }, []);
//   console.log("Sub_classname", Sub_classname);
//   const uniqueClassNamesSet = new Set(
//     getaddsubclass.map((item) => item.className)
//   );
//   const uniqueClassNamesArray = Array.from(uniqueClassNamesSet);
//   return (
//     <div>
//       <div className="row d-flex justify-content-between">
//         <div className="col-lg-4 d-flex justify-content-center">
//           <div class="input-group ">
//             <span class="input-group-text" id="basic-addon1">
//               <BsSearch />
//             </span>
//             <input
//               type="text"
//               class="form-control"
//               placeholder="Search..."
//               aria-describedby="basic-addon1"
//               onChange={handleFilterH}
//             />
//           </div>
//         </div>
//         <div className="col-lg-2">
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

//       <div className="customerhead p-2">
//         <h2 className="header-c ">Chapters</h2>
//         <div>
//           <div className="container">
//             <div className="row mb-4">
//               <div className="col-md-4">
//                 <label htmlFor="">Select Class</label>

//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     // setClasstype(e.target.value);
//                     setClassname(e.target.value);
//                   }}
//                 >
//                   <option value="">Select Class</option>
//                   {uniqueClassNamesArray?.map((val, i) => {
//                     return (
//                       <option value={val} key={i}>
//                         {val}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-4">
//                 <label htmlFor="">Select Sub Class</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setSub_classname(e.target.value);
//                   }}
//                 >
//                   <option value="">Select Sub Class</option>
//                   {getaddsubclass
//                     ?.filter((ele) => ele.className === Classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subclassName} key={i}>
//                           {val?.subclassName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-4">
//                 {Sub_classname ? (
//                   <>
//                     {/* <button              
//                   className="admin-add-btn mt-4"
//                   style={{ float: "right" }}
//                   onClick={() => {
//                     handleShow();
//                   }}
//                 >
//                   Add Chapters
//                 </button> */}
//                     <Link
//                       style={{ float: "right" }}
//                       onClick={() => {
//                         handleShow();
//                       }}
//                     >
//                       <Button2 text={"Add Chapters"} />
//                     </Link>
//                   </>
//                 ) : (
//                   <>
//                     {/* <button
//                       className="admin-add-btn mt-4"
//                       style={{ float: "right", cursor: " no-drop" }}
//                     >
//                       Add Chapters
//                     </button> */}
//                     <Link
//                       style={{ float: "right", cursor: " no-drop" }}
//                       onClick={() => {
//                         handleShow();
//                       }}
//                     >
//                       <Button2 text={"Add Chapters"} />
//                     </Link>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mb-3">
//           <Table
//             responsive
//             bordered
//             style={{ width: "-webkit-fill-available" }}
//           >
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>Medium</th>
//                 <th>Class</th>
//                 <th>Sub-class</th>
//                 <th>
//                   <div>Subject</div>
//                 </th>
//                 <th>
//                   <div>Subject Part</div>
//                 </th>
//                 <th>
//                   <div>Chapter Name</div>
//                 </th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {chapters
//                 ?.filter((val) => val?.Sub_classname == Sub_classname)
//                 ?.map((item, i) => {
//                   return (
//                     <tr>
//                       <td>{i + 1}</td>
//                       <td>{item?.mediumName}</td>
//                       <td>{item?.Classname}</td>
//                       <td>{item?.Sub_classname}</td>
//                       <td>{item?.subjectName}</td>
//                       <td>{item?.SubjectPart}</td>
//                       <td>{item?.chapterName}</td>

//                       <td>
//                         {" "}
//                         <div style={{ display: "flex", gap: "20px" }}>
//                           <div>
//                             <BiSolidEdit
//                               className="text-success"
//                               style={{ cursor: "pointer", fontSize: "20px" }}
//                               onClick={() => {
//                                 handleShow1(item);
//                                 setpdatesetchapter(item?._id);
//                                 setClassname(item?.Classname);
//                                 setSub_classname(item?.Sub_classname);
//                                 setChapterName(item?.chapterName);
//                                 setSubjectName(item?.subjectName);
//                               }}
//                             />{" "}
//                           </div>
//                           <div>
//                             <AiFillDelete
//                               className="text-danger"
//                               style={{ cursor: "pointer", fontSize: "20px" }}
//                               onClick={() => {
//                                 setChapter(item?._id);
//                                 handleShow2(item?._id);
//                               }}
//                             />{" "}
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//             </tbody>
//           </Table>
//         </div>

      
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>
//               Add Chapter for {Sub_classname}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
            
//             <div className="do-sear mt-2">
//               <label>Medium</label>
//               <select
//                 className="vi_0"
//                 onChange={(e) => setmediumName(e.target.value)}
//               >
//                 <option value="">--Select medium--</option>
//                 {Medium?.map((item) => {
//                   return (
//                     <option value={item?.mediumName}>{item?.mediumName}</option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Class</label>
//               <select
//                 className="vi_0"
//                 onChange={(e) => setClassname(e.target.value)}
//               >
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((ele) => ele.mediumName == mediumName)
//                   .map((item) => {
//                     return (
//                       <option value={item?.className}>{item?.className}</option>
//                     );
//                   })}
//               </select>

             
//             </div>
//             <div className="do-sear mt-2">
//               <label>Sub-Class</label>
//               <select
//                 className="vi_0"
//                 onChange={(e) => setSub_classname(e.target.value)}
//               >
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((item) => item.mediumName == mediumName)
//                   .map((item) => {
//                     return (
//                       <option value={item?.subclassName}>
//                         {item?.subclassName}
//                       </option>
//                     );
//                   })}
//               </select>
             
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setSubjectName(e.target.value)}
//                 >
//                   <option>Select Subject</option>
//                   {subject
//                     ?.filter((wow) => wow.mediumName == mediumName)
//                     .map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="do-sear mt-2">
//                   <label htmlFor="">Subject Part</label>
//                   <Form.Select
//                     aria-label="Default select example"
//                     onChange={(e) => setSubjectPart(e.target.value)}
//                   >
//                     <option value="">Select Subject Part</option>
//                     {weightage
//                       ?.filter((ele) => subjectName == ele?.Subject)
//                       .map((val, i) => {
//                         return (
//                           <option value={val?.Content}>{val?.Content}</option>
//                         );
//                       })}
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Chapter</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder="Enter Chapter Name"
//                   // onChange={(e) => setChapterName(e.target.value)}
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-unb") {
//                       setChapterName(e.target.value);
//                     } else onChangeHandler(e.target.value, setChapterName);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{chapterName}</p>
//                 )}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="d-flex">
//               <Button
//                 className="mx-2 modal-close-btn"
//                 variant=""
//                 onClick={handleClose}
//               >
//                 Close
//               </Button>
//               <Button
//                 className="mx-2 modal-add-btn"
//                 variant=""
//                 onClick={() => {
//                   AddChapter();
//                 }}
//               >
//                 Add
//               </Button>
//             </div>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Package modal */}
//         <Modal
//           show={show1}
//           onHide={handleClose1}
//           backdrop="static"
//           keyboard={false}
//           style={{ zIndex: "99999" }}
//         >
//           <Modal.Header
//             closeButton
//             style={{ backgroundColor: "rgb(40 167 223)" }}
//           >
//             <Modal.Title style={{ color: "white" }}>Edit Chapter</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
          
//             <div className="do-sear mt-2">
//               <label>Medium</label>
//               <select
//                 className="vi_0"
//                 onChange={(e) => setmediumName(e.target.value)}
//               >
//                 <option value="">--Select medium--</option>
//                 {Medium?.map((item) => {
//                   return (
//                     <option value={item?.mediumName}>{item?.mediumName}</option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Class</label>
//               <select
//                 className="vi_0"
//                 onChange={(e) => setClassname(e.target.value)}
//               >
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((ele) => ele.mediumName == mediumName)
//                   .map((item) => {
//                     return (
//                       <option value={item?.className}>{item?.className}</option>
//                     );
//                   })}
//               </select>

             
//               <label>Sub-Class</label>
//               <select
//                 className="vi_0"
//                 onChange={(e) => setSub_classname(e.target.value)}
//               >
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((item) => item.mediumName == mediumName)
//                   .map((item) => {
//                     return (
//                       <option value={item?.subclassName}>
//                         {item?.subclassName}
//                       </option>
//                     );
//                   })}
//               </select>
             
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => setSubjectName(e.target.value)}
//                 >
//                   <option>Select Subject</option>
//                   {subject
//                     ?.filter((wow) => wow.mediumName == mediumName)
//                     .map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="do-sear mt-2">
//                   <label htmlFor="">Subject Part</label>
//                   <Form.Select
//                     aria-label="Default select example"
//                     onChange={(e) => setSubjectPart(e.target.value)}
//                   >
//                     <option value="">Select Subject Part</option>
//                     {weightage
//                       ?.filter((ele) => subjectName == ele?.Subject)
//                       .map((val, i) => {
//                         return (
//                           <option value={val?.Content}>{val?.Content}</option>
//                         );
//                       })}
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>

//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Chapter</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder="Enter Chapter Name"
                
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-unb") {
//                       setChapterName(e.target.value);
//                     } else onChangeHandler(e.target.value, setChapterName);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{chapterName}</p>
//                 )}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant=""
//               className="modal-close-btn"
//               onClick={handleClose1}
//             >
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={() => {
//                 UpdateChapter();
//               }}
//             >
//               Edit
//             </Button>
//           </Modal.Footer>
//         </Modal>
//         <Modal
//           show={show2}
//           onHide={handleClose2}
//           backdrop="static"
//           keyboard={false}
//           style={{ zIndex: "99999" }}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="col-md-12">
//                 <p className="fs-4" style={{ color: "red" }}>
//                   Are you sure you want to delete this data?
//                 </p>
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant=""
//               className="modal-close-btn"
//               onClick={handleClose2}
//             >
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={DeleteChapter}
//             >
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };

// export default AdminChapter;
   



// import { useEffect, useState } from "react"
// import { Button, Modal, Form, Table } from "react-bootstrap"
// import { AiFillDelete } from "react-icons/ai"
// import { BiSolidEdit } from "react-icons/bi"
// import { BsSearch } from "react-icons/bs"
// import "../Admin/Admin.css"
// import axios from "axios"
// import swal from "sweetalert"
// import { debounce } from "lodash"
// import Button2 from "../Button2"
// import { Link } from "react-router-dom"

// const AdminChapter = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"))
//   const token = localStorage.getItem("token")
//   const [getclassname, setgetClassName] = useState([])
//   const [show, setShow] = useState(false)
//   const [show1, setShow1] = useState(false)
//   const [show2, setShow2] = useState(false)
//   const handleClose = () => setShow(false)
//   const handleShow = () => setShow(true)
//   const handleClose1 = () => setShow1(false)
//   const handleShow1 = () => setShow1(true)
//   const handleClose2 = () => setShow2(false)
//   const handleShow2 = () => setShow2(true)
//   const [classtype, setClasstype] = useState({})
//   const googleTransliterate = require("google-input-tool")
//   const [translatedValue, setTranslatedValue] = useState("")
//   const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und")

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value)
//   }

//   const onChangeHandler = debounce(async (value, setData) => {
//     if (!value) {
//       setTranslatedValue("")
//       setData("")
//       return ""
//     }
//     const am = value.split(/\s+/)
//     const arr = []
//     const promises = []
//     for (let index = 0; index < am.length; index++) {
//       promises.push(
//         new Promise(async (resolve, reject) => {
//           try {
//             const response = await googleTransliterate(new XMLHttpRequest(), am[index], selectedLanguage)
//             resolve(response[0][0])
//           } catch (error) {
//             console.error("Translation error:", error)
//             resolve(am[index])
//           }
//         }),
//       )
//     }
//     try {
//       const translations = await Promise.all(promises)
//       setTranslatedValue(translations.join(" "))
//       setData(translations.join(" "))
//       return translations
//     } catch (error) {
//       console.error("Promise.all error:", error)
//     }
//   }, 300)

//   //get method for medium
//   const [Medium, setMedium] = useState([])
//   const getAddMedium = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllMedium")
//       if (res.status === 200) {
//         setMedium(res.data.success)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   // get method for class and subclass
//   const [getaddsubcla, setgetaddsubcla] = useState([])  
//   const getaddsubclas = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllSubClass")
//       if (res.status === 200) {
//         setgetaddsubcla(res.data.success)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const [mediumName, setmediumName] = useState("")
//   const [chapterName, setChapterName] = useState("")
//   const [subjectName, setSubjectName] = useState("")
//   const [SubjectPart, setSubjectPart] = useState("")
//   const [Classname, setClassname] = useState("")
//   const [Sub_classname, setSub_classname] = useState("")

//   const AddChapter = async () => {
//     if (!mediumName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the medium name",
//         icon: "error",
//         button: "Ok!",
//       })
//     if (!chapterName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the chapter name",
//         icon: "error",
//         button: "Ok!",
//       })
//     if (!subjectName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter select subject name",
//         icon: "error",
//         button: "Ok!",
//       })
//     if (!SubjectPart)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter select subject Part",
//         icon: "error",
//         button: "Ok!",
//       })

//     try {
//       const config = {
//         url: "/admin/addChapter",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           chapterName: chapterName,
//           subjectName: subjectName,
//           SubjectPart: SubjectPart,
//           Classname: Classname,
//           Sub_classname: Sub_classname,
//           authId: admin?._id,
//         },
//       }
//       const res = await axios(config)
//       if (res.status === 200) {
//         handleClose()
//         getChapter(subjectName, Sub_classname)
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         })
//       }
//     } catch (error) {
//       console.log(error)
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Something went wrong",
//         icon: "error",
//         button: "Ok!",
//       })
//     }
//   }

//   const [weightage, setweightage] = useState([])
//   const getallweightagecontent = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getallcontent")
//       if (res.status === 200) {
//         setweightage(res.data.success)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   //get chapters based on subject and subclass
//   const [chapters, setchapters] = useState([])
//   const [nochangedata, setnochangedata] = useState([])
//   const [loading, setLoading] = useState(false)

//   // Fixed getChapter function to match AdminBlueprint pattern
//   const getChapter = async (subject, subclass) => {
//     try {
//       setLoading(true)
//       console.log("Fetching chapters for:", { subject, subclass })

//       const res = await axios.get(`http://localhost:8774/api/admin/getAllChapter`, {
//         params: {
//           subjectName: subject,
//           subclassName: subclass, // Using subclassName like in AdminBlueprint
//         },
//       })

//       if (res.status === 200) {
//         console.log("Chapters received:", res.data.success)
//         setchapters(res.data.success)
//         setnochangedata(res.data.success)
//       }
//     } catch (error) {
//       console.log("Error fetching chapters:", error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const [updatechapter, setpdatesetchapter] = useState("")
//   const UpdateChapter = async () => {
//     try {
//       const config = {
//         url: "/admin/updateChapter",
//         method: "put",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           chapterName: chapterName,
//           subjectName: subjectName,
//           SubjectPart: SubjectPart,
//           Classname: Classname,
//           Sub_classname: Sub_classname,
//           authId: admin?._id,
//           id: updatechapter,
//         },
//       }
//       const res = await axios(config)
//       if (res.status === 200) {
//         handleClose1()
//         getChapter(subjectName, Sub_classname)
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         })
//       }
//     } catch (error) {
//       console.log(error)
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Something went wrong",
//         icon: "error",
//         button: "Ok!",
//       })
//     }
//   }

//   //delete
//   const [chapter, setChapter] = useState("")
//   const DeleteChapter = async () => {
//     try {
//       const config = {
//         url: "/admin/deleteChapter/" + chapter + "/" + admin?._id,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       }
//       const res = await axios(config)
//       if (res.status === 200) {
//         handleClose2()
//         getChapter(subjectName, Sub_classname)
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         })
//       }
//     } catch (error) {
//       console.log(error)
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Something went wrong",
//         icon: "error",
//         button: "Ok!",
//       })
//     }
//   }

//   // get method of subject
//   const [subject, setsubject] = useState([])
//   const getSubject = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllSujects")
//       if (res.status === 200) {
//         setsubject(res.data.success)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   // get method for subclass
//   const [getaddsubclass, setgetaddsubclass] = useState([])
//   const getaddsubclasss = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllSubClass")
//       if (res.status === 200) {
//         setgetaddsubclass(res.data.success)
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   const [searchH, setSearchH] = useState("")
//   const handleFilterH = (e) => {
//     if (e.target.value !== "") {
//       setSearchH(e.target.value)
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) => String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())),
//       )
//       setchapters([...filterTableH])
//     } else {
//       setSearchH(e.target.value)
//       setchapters([...nochangedata])
//     }
//   }

//   useEffect(() => {
//     getAddMedium()
//     getaddsubclas()
//     getSubject()
//     getallweightagecontent()
//     getaddsubclasss()
//   }, [])

//   // Auto-fetch chapters when subject and subclass are selected
//   useEffect(() => {
//     if (subjectName && Sub_classname) {
//       getChapter(subjectName, Sub_classname)
//     }
//   }, [subjectName, Sub_classname])

//   const uniqueClassNamesSet = new Set(getaddsubclass.map((item) => item.className))
//   const uniqueClassNamesArray = Array.from(uniqueClassNamesSet)

//   return (
//     <div>
//       <div className="row d-flex justify-content-between">
//         <div className="col-lg-4 d-flex justify-content-center">
//           <div className="input-group">
//             <span className="input-group-text" id="basic-addon1">
//               <BsSearch />
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search..."
//               aria-describedby="basic-addon1"
//               onChange={handleFilterH}
//             />
//           </div>
//         </div>
//         <div className="col-lg-2">
//           <label htmlFor="">Select Language</label>
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
//       <div className="customerhead p-2">
//         <h2 className="header-c">Chapters</h2>
//         <div>
//           <div className="container">
//             <div className="row mb-4">
//               <div className="col-md-4">
//                 <label htmlFor="">Select Medium</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={mediumName}
//                   onChange={(e) => {
//                     setmediumName(e.target.value)
//                     // Reset dependent fields
//                     setClassname("")
//                     setSub_classname("")
//                     setSubjectName("")
//                   }}
//                 >
//                   <option value="">Select Medium</option>
//                   {Medium?.map((val, i) => {
//                     return (
//                       <option value={val?.mediumName} key={i}>
//                         {val?.mediumName}
//                       </option>
//                     )
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-4">
//                 <label htmlFor="">Select Class</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={Classname}
//                   onChange={(e) => {
//                     setClassname(e.target.value)
//                     // Reset dependent fields
//                     setSub_classname("")
//                     setSubjectName("")
//                   }}
//                 >
//                   <option value="">Select Class</option>
//                   {uniqueClassNamesArray?.map((val, i) => {
//                     return (
//                       <option value={val} key={i}>
//                         {val}
//                       </option>
//                     )
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-4">
//                 <label htmlFor="">Select Sub Class</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={Sub_classname}
//                   onChange={(e) => {
//                     setSub_classname(e.target.value)
//                     // Reset subject
//                     setSubjectName("")
//                   }}
//                 >
//                   <option value="">Select Sub Class</option>
//                   {getaddsubclass
//                     ?.filter((ele) => ele.className === Classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subclassName} key={i}>
//                           {val?.subclassName}
//                         </option>
//                       )
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="row mb-4">
//               <div className="col-md-6">
//                 <label htmlFor="">Select Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={subjectName}
//                   onChange={(e) => {
//                     setSubjectName(e.target.value)
//                   }}
//                 >
//                   <option value="">Select Subject</option>
//                   {subject
//                     ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       )
//                     })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-6">
//                 {Sub_classname && subjectName ? (
//                   <Link
//                     style={{ float: "right" }}
//                     onClick={() => {
//                       handleShow()
//                     }}
//                   >
//                     <Button2 text={"Add Chapters"} />
//                   </Link>
//                 ) : (
//                   <Link
//                     style={{ float: "right", cursor: "no-drop" }}
//                     onClick={() => {
//                       handleShow()
//                     }}
//                   >
//                     <Button2 text={"Add Chapters"} />
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mb-3">
//           {loading ? (
//             <div className="text-center p-4">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading chapters...</p>
//             </div>
//           ) : (
//             <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Medium</th>
//                   <th>Class</th>
//                   <th>Sub-class</th>
//                   <th>Subject</th>
//                   <th>Subject Part</th>
//                   <th>Chapter Name</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {chapters.length > 0 ? (
//                   chapters?.filter((ele) => subjectName? ele?.subjectName === subjectName:ele)?.map((item, i) => {
//                     return (
//                       <tr key={i}>
//                         <td>{i + 1}</td>
//                         <td>{item?.mediumName}</td>
//                         <td>{item?.Classname}</td>
//                         <td>{item?.Sub_classname}</td>
//                         <td>{item?.subjectName}</td>
//                         <td>{item?.SubjectPart}</td>
//                         <td>{item?.chapterName}</td>
//                         <td>
//                           <div style={{ display: "flex", gap: "20px" }}>
//                             <div>
//                               <BiSolidEdit
//                                 className="text-success"
//                                 style={{ cursor: "pointer", fontSize: "20px" }}
//                                 onClick={() => {
//                                   handleShow1(item)
//                                   setpdatesetchapter(item?._id)
//                                   setmediumName(item?.mediumName)
//                                   setClassname(item?.Classname)
//                                   setSub_classname(item?.Sub_classname)
//                                   setSubjectName(item?.subjectName)
//                                   setSubjectPart(item?.SubjectPart)
//                                   setChapterName(item?.chapterName)
//                                 }}
//                               />
//                             </div>
//                             <div>
//                               <AiFillDelete
//                                 className="text-danger"
//                                 style={{ cursor: "pointer", fontSize: "20px" }}
//                                 onClick={() => {
//                                   setChapter(item?._id)
//                                   handleShow2(item?._id)
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     )
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-center">
//                       {subjectName && Sub_classname
//                         ? "No chapters found for the selected subject and sub-class"
//                         : "Please select a subject and sub-class to view chapters"}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           )}
//         </div>
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>Add Chapter for {Sub_classname}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="do-sear mt-2">
//               <label>Medium</label>
//               <select className="vi_0" value={mediumName} onChange={(e) => setmediumName(e.target.value)}>
//                 <option value="">--Select medium--</option>
//                 {Medium?.map((item, i) => {
//                   return (
//                     <option value={item?.mediumName} key={i}>
//                       {item?.mediumName}
//                     </option>
//                   )
//                 })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Class</label>
//               <select className="vi_0" value={Classname} onChange={(e) => setClassname(e.target.value)}>
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((ele) => ele.mediumName === mediumName)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.className} key={i}>
//                         {item?.className}
//                       </option>
//                     )
//                   })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Sub-Class</label>
//               <select className="vi_0" value={Sub_classname} onChange={(e) => setSub_classname(e.target.value)}>
//                 <option value="">--Select Sub Class--</option>
//                 {getaddsubcla
//                   ?.filter((item) => item.mediumName === mediumName && item.className === Classname)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.subclassName} key={i}>
//                         {item?.subclassName}
//                       </option>
//                     )
//                   })}
//               </select>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={subjectName}
//                   onChange={(e) => setSubjectName(e.target.value)}
//                 >
//                   <option>Select Subject</option>
//                   {subject
//                     ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       )
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="do-sear mt-2">
//                   <label htmlFor="">Subject Part</label>
//                   <Form.Select
//                     aria-label="Default select example"
//                     value={SubjectPart}
//                     onChange={(e) => setSubjectPart(e.target.value)}
//                   >
//                     <option value="">Select Subject Part</option>
//                     {weightage
//                       ?.filter((ele) => subjectName === ele?.Subject)
//                       .map((val, i) => {
//                         return (
//                           <option value={val?.Content} key={i}>
//                             {val?.Content}
//                           </option>
//                         )
//                       })}
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Chapter</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder="Enter Chapter Name"
//                   value={chapterName}
//                   onChange={(e) => {
//                     if (selectedLanguage === "en-t-i0-und") {
//                       setChapterName(e.target.value)
//                     } else onChangeHandler(e.target.value, setChapterName)
//                   }}
//                 />
//                 {selectedLanguage === "en-t-i0-und" ? <></> : <p>{chapterName}</p>}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="d-flex">
//               <Button className="mx-2 modal-close-btn" variant="" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button
//                 className="mx-2 modal-add-btn"
//                 variant=""
//                 onClick={() => {
//                   AddChapter()
//                 }}
//               >
//                 Add
//               </Button>
//             </div>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Package modal */}
//         <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "rgb(40 167 223)" }}>
//             <Modal.Title style={{ color: "white" }}>Edit Chapter</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="do-sear mt-2">
//               <label>Medium</label>
//               <select className="vi_0" value={mediumName} onChange={(e) => setmediumName(e.target.value)}>
//                 <option value="">--Select medium--</option>
//                 {Medium?.map((item, i) => {
//                   return (
//                     <option value={item?.mediumName} key={i}>
//                       {item?.mediumName}
//                     </option>
//                   )
//                 })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Class</label>
//               <select className="vi_0" value={Classname} onChange={(e) => setClassname(e.target.value)}>
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((ele) => ele.mediumName === mediumName)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.className} key={i}>
//                         {item?.className}
//                       </option>
//                     )
//                   })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Sub-Class</label>
//               <select className="vi_0" value={Sub_classname} onChange={(e) => setSub_classname(e.target.value)}>
//                 <option value="">--Select Sub Class--</option>
//                 {getaddsubcla
//                   ?.filter((item) => item.mediumName === mediumName && item.className === Classname)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.subclassName} key={i}>
//                         {item?.subclassName}
//                       </option>
//                     )
//                   })}
//               </select>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={subjectName}
//                   onChange={(e) => setSubjectName(e.target.value)}
//                 >
//                   <option>Select Subject</option>
//                   {subject
//                     ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       )
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="do-sear mt-2">
//                   <label htmlFor="">Subject Part</label>
//                   <Form.Select
//                     aria-label="Default select example"
//                     value={SubjectPart}
//                     onChange={(e) => setSubjectPart(e.target.value)}
//                   >
//                     <option value="">Select Subject Part</option>
//                     {weightage
//                       ?.filter((ele) => subjectName === ele?.Subject)
//                       .map((val, i) => {
//                         return (
//                           <option value={val?.Content} key={i}>
//                             {val?.Content}
//                           </option>
//                         )
//                       })}
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Chapter</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder="Enter Chapter Name"
//                   value={chapterName}
//                   onChange={(e) => {
//                     if (selectedLanguage === "en-t-i0-und") {
//                       setChapterName(e.target.value)
//                     } else onChangeHandler(e.target.value, setChapterName)
//                   }}
//                 />
//                 {selectedLanguage === "en-t-i0-und" ? <></> : <p>{chapterName}</p>}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="" className="modal-close-btn" onClick={handleClose1}>
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={() => {
//                 UpdateChapter()
//               }}
//             >
//               Edit
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton>
//             <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="col-md-12">
//                 <p className="fs-4" style={{ color: "red" }}>
//                   Are you sure you want to delete this data?
//                 </p>
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="" className="modal-close-btn" onClick={handleClose2}>
//               Close
//             </Button>
//             <Button variant="" className="modal-add-btn" onClick={DeleteChapter}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   )
// }

// export default AdminChapter
      
    
// import { useEffect, useState, useCallback } from "react";
// import { Button, Modal, Form, Table } from "react-bootstrap";
// import { AiFillDelete } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import "../Admin/Admin.css";
// import axios from "axios";
// import swal from "sweetalert";
// import { debounce } from "lodash";
// import Button2 from "../Button2";
// import { Link } from "react-router-dom";

// const AdminChapter = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");
//   const [getclassname, setgetClassName] = useState([]);
//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);
//   const [classtype, setClasstype] = useState({});
//   const googleTransliterate = require("google-input-tool");
//   const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");

//   const handleLanguageChange = (event) => {
//     setSelectedLanguage(event.target.value);
//   };

//   // Improved translation handler with proper debouncing
//   const translateText = useCallback(
//     debounce(async (text, callback) => {
//       if (!text || selectedLanguage === "en-t-i0-und") {
//         callback(text);
//         return;
//       }

//       try {
//         const response = await googleTransliterate(new XMLHttpRequest(), text, selectedLanguage);
//         if (response && response[0] && response[0][0]) {
//           callback(response[0][0]);
//         }
//       } catch (error) {
//         console.error("Translation error:", error);
//         callback(text); // Fallback to original text if translation fails
//       }
//     }, 500),
//     [selectedLanguage]
//   );

//   const handleInputChange = (e, setValue) => {
//     const value = e.target.value;
//     setValue(value); // Update immediately for responsive typing
    
//     if (selectedLanguage !== "en-t-i0-und") {
//       translateText(value, (translated) => {
//         // Only update if the current value hasn't changed since we started translation
//         if (value === e.target.value) {
//           setValue(translated);
//         }
//       });
//     }
//   };

//   //get method for medium
//   const [Medium, setMedium] = useState([]);
//   const getAddMedium = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllMedium");
//       if (res.status === 200) {
//         setMedium(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get method for class and subclass
//   const [getaddsubcla, setgetaddsubcla] = useState([]);  
//   const getaddsubclas = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllSubClass");
//       if (res.status === 200) {
//         setgetaddsubcla(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [mediumName, setmediumName] = useState("");
//   const [chapterName, setChapterName] = useState("");
//   const [subjectName, setSubjectName] = useState("");
//   const [SubjectPart, setSubjectPart] = useState("");
//   const [Classname, setClassname] = useState("");
//   const [Sub_classname, setSub_classname] = useState("");

//   const AddChapter = async () => {
//     if (!mediumName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the medium name",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!chapterName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the chapter name",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!subjectName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter select subject name",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!SubjectPart)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter select subject Part",
//         icon: "error",
//         button: "Ok!",
//       });

//     try {
//       const config = {
//         url: "/admin/addChapter",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           chapterName: chapterName,
//           subjectName: subjectName,
//           SubjectPart: SubjectPart,
//           Classname: Classname,
//           Sub_classname: Sub_classname,
//           authId: admin?._id,
//         },
//       };
//       const res = await axios(config);
//       if (res.status === 200) {
//         handleClose();
//         getChapter(subjectName, Sub_classname);
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Something went wrong",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   const [weightage, setweightage] = useState([]);
//   const getallweightagecontent = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getallcontent");
//       if (res.status === 200) {
//         setweightage(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }; 
//   console.log("Weightage data:", weightage);

//   //get chapters based on subject and subclass
//   const [chapters, setchapters] = useState([]);
//   const [nochangedata, setnochangedata] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getChapter = async (subject, subclass) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await axios.get(`http://localhost:8774/api/admin/getAllChapter`, {
//         params: {
//           subjectName: subject,
//           subclassName: subclass,
//         },
//       });
//       if (res.status === 200) {
//         setchapters(res.data.success);
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log("Error fetching chapters:", error);
//       setError("Failed to load chapters. Please try again.");
//       setchapters([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const [updatechapter, setpdatesetchapter] = useState("");
//   const UpdateChapter = async () => {
//     try {
//       const config = {
//         url: "/admin/updateChapter",
//         method: "put",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           chapterName: chapterName,
//           subjectName: subjectName,
//           SubjectPart: SubjectPart,
//           Classname: Classname,
//           Sub_classname: Sub_classname,
//           authId: admin?._id,
//           id: updatechapter,
//         },
//       };
//       const res = await axios(config);
//       if (res.status === 200) {
//         handleClose1();
//         getChapter(subjectName, Sub_classname);
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Something went wrong",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   //delete
//   const [chapter, setChapter] = useState("");
//   const DeleteChapter = async () => {
//     try {
//       const config = {
//         url: "/admin/deleteChapter/" + chapter + "/" + admin?._id,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const res = await axios(config);
//       if (res.status === 200) {
//         handleClose2();
//         getChapter(subjectName, Sub_classname);
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Something went wrong",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   // get method of subject
//   const [subject, setsubject] = useState([]);
//   const getSubject = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllSujects");
//       if (res.status === 200) {
//         setsubject(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // get method for subclass
//   const [getaddsubclass, setgetaddsubclass] = useState([]);
//   const getaddsubclasss = async () => {
//     try {
//       const res = await axios.get("http://localhost:8774/api/admin/getAllSubClass");
//       if (res.status === 200) {
//         setgetaddsubclass(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [searchH, setSearchH] = useState("");
//   const handleFilterH = (e) => {
//     if (e.target.value !== "") {
//       setSearchH(e.target.value);
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) => String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())),
//       );
//       setchapters([...filterTableH]);
//     } else {
//       setSearchH(e.target.value);
//       setchapters([...nochangedata]);
//     }
//   };

//   useEffect(() => {
//     getAddMedium();
//     getaddsubclas();
//     getSubject();
//     getallweightagecontent();
//     getaddsubclasss();
//   }, []);

//   // Auto-fetch chapters when subject and subclass are selected
//   useEffect(() => {
//     if (subjectName && Sub_classname) {
//       getChapter(subjectName, Sub_classname);
//     }
//   }, [subjectName, Sub_classname]);

//   const uniqueClassNamesSet = new Set(getaddsubclass.map((item) => item.className));
//   const uniqueClassNamesArray = Array.from(uniqueClassNamesSet);

//   return (
//     <div>
//       <div className="row d-flex justify-content-between">
//         <div className="col-lg-4 d-flex justify-content-center">
//           <div className="input-group">
//             <span className="input-group-text" id="basic-addon1">
//               <BsSearch />
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search..."
//               aria-describedby="basic-addon1"
//               onChange={handleFilterH}
//             />
//           </div>
//         </div>
//         <div className="col-lg-2">
//           <label htmlFor="">Select Language</label>
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
//       <div className="customerhead p-2">
//         <h2 className="header-c">Chapters</h2>
//         <div>
//           <div className="container">
//             <div className="row mb-4">
//               <div className="col-md-4">
//                 <label htmlFor="">Select Medium</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={mediumName}
//                   onChange={(e) => {
//                     setmediumName(e.target.value);
//                     // Reset dependent fields
//                     setClassname("");
//                     setSub_classname("");
//                     setSubjectName("");
//                   }}
//                 >
//                   <option value="">Select Medium</option>
//                   {Medium?.map((val, i) => {
//                     return (
//                       <option value={val?.mediumName} key={i}>
//                         {val?.mediumName}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-4">
//                 <label htmlFor="">Select Class</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={Classname}
//                   onChange={(e) => {
//                     setClassname(e.target.value);
//                     // Reset dependent fields
//                     setSub_classname("");
//                     setSubjectName("");
//                   }}
//                 >
//                   <option value="">Select Class</option>
//                   {uniqueClassNamesArray?.map((val, i) => {
//                     return (
//                       <option value={val} key={i}>
//                         {val}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-4">
//                 <label htmlFor="">Select Sub Class</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={Sub_classname}
//                   onChange={(e) => {
//                     setSub_classname(e.target.value);
//                     // Reset subject
//                     setSubjectName("");
//                   }}
//                 >
//                   <option value="">Select Sub Class</option>
//                   {getaddsubclass
//                     ?.filter((ele) => ele.className === Classname)
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
//             <div className="row mb-4">
//               <div className="col-md-6">
//                 <label htmlFor="">Select Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={subjectName}
//                   onChange={(e) => {
//                     setSubjectName(e.target.value);
//                   }}
//                 >
//                   <option value="">Select Subject</option>
//                   {subject
//                     ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//               <div className="col-md-6">
//                 {Sub_classname && subjectName ? (
//                   <Link
//                     style={{ float: "right" }}
//                     onClick={() => {
//                       handleShow();
//                     }}
//                   >
//                     <Button2 text={"Add Chapters"} />
//                   </Link>
//                 ) : (
//                   <Link
//                     style={{ float: "right", cursor: "no-drop" }}
//                     onClick={() => {
//                       handleShow();
//                     }}
//                   >
//                     <Button2 text={"Add Chapters"} />
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mb-3">
//           {error ? (
//             <div className="text-center text-danger p-4">{error}</div>
//           ) : loading ? (
//             <div className="text-center p-4">
//               <div className="spinner-border text-primary" role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//               <p className="mt-2">Loading chapters...</p>
//             </div>
//           ) : (
//             <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
//               <thead>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Medium</th>
//                   <th>Class</th>
//                   <th>Sub-class</th>
//                   <th>Subject</th>
//                   <th>Subject Part</th>
//                   <th>Chapter Name</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {chapters.length > 0 ? (
//                   chapters?.map((item, i) => {
//                     return (
//                       <tr key={i}>
//                         <td>{i + 1}</td>
//                         <td>{item?.mediumName}</td>
//                         <td>{item?.Classname}</td>
//                         <td>{item?.Sub_classname}</td>
//                         <td>{item?.subjectName}</td>
//                         <td>{item?.SubjectPart}</td>
//                         <td>{item?.chapterName}</td>
//                         <td>
//                           <div style={{ display: "flex", gap: "20px" }}>
//                             <div>
//                               <BiSolidEdit
//                                 className="text-success"
//                                 style={{ cursor: "pointer", fontSize: "20px" }}
//                                 onClick={() => {
//                                   handleShow1(item);
//                                   setpdatesetchapter(item?._id);
//                                   setmediumName(item?.mediumName);
//                                   setClassname(item?.Classname);
//                                   setSub_classname(item?.Sub_classname);
//                                   setSubjectName(item?.subjectName);
//                                   setSubjectPart(item?.SubjectPart);
//                                   setChapterName(item?.chapterName);
//                                 }}
//                               />
//                             </div>
//                             <div>
//                               <AiFillDelete
//                                 className="text-danger"
//                                 style={{ cursor: "pointer", fontSize: "20px" }}
//                                 onClick={() => {
//                                   setChapter(item?._id);
//                                   handleShow2(item?._id);
//                                 }}
//                               />
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-center">
//                       {subjectName && Sub_classname
//                         ? "No chapters found for the selected subject and sub-class"
//                         : "Please select a subject and sub-class to view chapters"}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           )}
//         </div>
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>Add Chapter for {Sub_classname}</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="do-sear mt-2">
//               <label>Medium</label>
//               <select className="vi_0" value={mediumName} onChange={(e) => setmediumName(e.target.value)}>
//                 <option value="">--Select medium--</option>
//                 {Medium?.map((item, i) => {
//                   return (
//                     <option value={item?.mediumName} key={i}>
//                       {item?.mediumName}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Class</label>
//               <select className="vi_0" value={Classname} onChange={(e) => setClassname(e.target.value)}>
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((ele) => ele.mediumName === mediumName)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.className} key={i}>
//                         {item?.className}
//                       </option>
//                     );
//                   })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Sub-Class</label>
//               <select className="vi_0" value={Sub_classname} onChange={(e) => setSub_classname(e.target.value)}>
//                 <option value="">--Select Sub Class--</option>
//                 {getaddsubcla
//                   ?.filter((item) => item.mediumName === mediumName && item.className === Classname)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.subclassName} key={i}>
//                         {item?.subclassName}
//                       </option>
//                     );
//                   })}
//               </select>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={subjectName}
//                   onChange={(e) => setSubjectName(e.target.value)}
//                 >
//                   <option>Select Subject</option>
//                   {subject
//                     ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="do-sear mt-2">
//                   <label htmlFor="">Subject Part</label>
//                   <Form.Select
//                     aria-label="Default select example"
//                     value={SubjectPart}
//                     onChange={(e) => setSubjectPart(e.target.value)}
//                   >
//                     <option value="">Select Subject Part</option>
//                    {weightage
//   ?.filter((ele) => {
//     // Extract the core subject name (text after the class info)
//     const weightageSubjectCore = ele?.Subject?.split(') ')[1]?.split(' ')[0];
//     const currentSubjectCore = subjectName?.split(') ')[1]?.split(' ')[0];
    
//     // Compare either the full subject or just the core subject name
//     return (
//       ele?.Subject === subjectName || 
//       (weightageSubjectCore && currentSubjectCore && 
//        weightageSubjectCore === currentSubjectCore)
//     );
//   })
//   .map((val, i) => {
//     return (
//       <option value={val?.Content} key={i}>
//         {val?.Content}
//       </option>
//     );
//   })}
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Chapter</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder="Enter Chapter Name"
//                   value={chapterName}
//                   onChange={(e) => handleInputChange(e, setChapterName)}
//                 />
//                 {selectedLanguage === "en-t-i0-und" ? <></> : <p>{chapterName}</p>}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="d-flex">
//               <Button className="mx-2 modal-close-btn" variant="" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button
//                 className="mx-2 modal-add-btn"
//                 variant=""
//                 onClick={() => {
//                   AddChapter();
//                 }}
//               >
//                 Add
//               </Button>
//             </div>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Package modal */}
//         <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "rgb(40 167 223)" }}>
//             <Modal.Title style={{ color: "white" }}>Edit Chapter</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="do-sear mt-2">
//               <label>Medium</label>
//               <select className="vi_0" value={mediumName} onChange={(e) => setmediumName(e.target.value)}>
//                 <option value="">--Select medium--</option>
//                 {Medium?.map((item, i) => {
//                   return (
//                     <option value={item?.mediumName} key={i}>
//                       {item?.mediumName}
//                     </option>
//                   );
//                 })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Class</label>
//               <select className="vi_0" value={Classname} onChange={(e) => setClassname(e.target.value)}>
//                 <option value="">--Select Class--</option>
//                 {getaddsubcla
//                   ?.filter((ele) => ele.mediumName === mediumName)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.className} key={i}>
//                         {item?.className}
//                       </option>
//                     );
//                   })}
//               </select>
//             </div>
//             <div className="do-sear mt-2">
//               <label>Sub-Class</label>
//               <select className="vi_0" value={Sub_classname} onChange={(e) => setSub_classname(e.target.value)}>
//                 <option value="">--Select Sub Class--</option>
//                 {getaddsubcla
//                   ?.filter((item) => item.mediumName === mediumName && item.className === Classname)
//                   .map((item, i) => {
//                     return (
//                       <option value={item?.subclassName} key={i}>
//                         {item?.subclassName}
//                       </option>
//                     );
//                   })}
//               </select>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   value={subjectName}
//                   onChange={(e) => setSubjectName(e.target.value)}
//                 >
//                   <option>Select Subject</option>
//                   {subject
//                     ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
//                     ?.map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-12">
//                 <div className="do-sear mt-2">
//                   <label htmlFor="">Subject Part</label>
//                   <Form.Select
//                     aria-label="Default select example"
//                     value={SubjectPart}
//                     onChange={(e) => setSubjectPart(e.target.value)}
//                   >
//                     <option value="">Select Subject Part</option>
//                     {weightage
//                       ?.filter((ele) => subjectName === ele?.Subject)
//                       .map((val, i) => {
//                         return (
//                           <option value={val?.Content} key={i}>
//                             {val?.Content}
//                           </option>
//                         );
//                       })}
//                   </Form.Select>
//                 </div>
//               </div>
//             </div>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Chapter</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder="Enter Chapter Name"
//                   value={chapterName}
//                   onChange={(e) => handleInputChange(e, setChapterName)}
//                 />
//                 {selectedLanguage === "en-t-i0-und" ? <></> : <p>{chapterName}</p>}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="" className="modal-close-btn" onClick={handleClose1}>
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={() => {
//                 UpdateChapter();
//               }}
//             >
//               Edit
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton>
//             <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="col-md-12">
//                 <p className="fs-4" style={{ color: "red" }}>
//                   Are you sure you want to delete this data?
//                 </p>
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="" className="modal-close-btn" onClick={handleClose2}>
//               Close
//             </Button>
//             <Button variant="" className="modal-add-btn" onClick={DeleteChapter}>
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </div>
//   );
// };
 
// export default AdminChapter; 
 
 
import { useEffect, useState, useCallback } from "react";
import { Button, Modal, Form, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import { debounce } from "lodash";
import Button2 from "../Button2";
import { Link } from "react-router-dom";

const AdminChapter = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  const [getclassname, setgetClassName] = useState([]);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const [classtype, setClasstype] = useState({});
  const googleTransliterate = require("google-input-tool");
  const [selectedLanguage, setSelectedLanguage] = useState("en-t-i0-und");

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  // Improved translation handler with proper debouncing
  const translateText = useCallback(
    debounce(async (text, callback) => {
      if (!text || selectedLanguage === "en-t-i0-und") {
        callback(text);
        return;
      }

      try {
        const response = await googleTransliterate(new XMLHttpRequest(), text, selectedLanguage);
        if (response && response[0] && response[0][0]) {
          callback(response[0][0]);
        }
      } catch (error) {
        console.error("Translation error:", error);
        callback(text); // Fallback to original text if translation fails
      }
    }, 500),
    [selectedLanguage]
  );

  const handleInputChange = (e, setValue) => {
    const value = e.target.value;
    setValue(value); // Update immediately for responsive typing
    
    if (selectedLanguage !== "en-t-i0-und") {
      translateText(value, (translated) => {
        // Only update if the current value hasn't changed since we started translation
        if (value === e.target.value) {
          setValue(translated);
        }
      });
    }
  };

  //get method for medium
  const [Medium, setMedium] = useState([]);
  const getAddMedium = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getAllMedium");
      if (res.status === 200) {
        setMedium(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get method for class and subclass
  const [getaddsubcla, setgetaddsubcla] = useState([]);  
  const getaddsubclas = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getAllSubClass");
      if (res.status === 200) {
        setgetaddsubcla(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [mediumName, setmediumName] = useState("");
  const [chapterName, setChapterName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [SubjectPart, setSubjectPart] = useState("");
  const [Classname, setClassname] = useState("");
  const [Sub_classname, setSub_classname] = useState("");

  const AddChapter = async () => {
    if (!mediumName)
      return swal({
        title: "Oops!",
        text: "Please Enter the medium name",
        icon: "error",
        button: "Ok!",
      });
    if (!chapterName)
      return swal({
        title: "Oops!",
        text: "Please Enter the chapter name",
        icon: "error",
        button: "Ok!",
      });
    if (!subjectName)
      return swal({
        title: "Oops!",
        text: "Please Enter select subject name",
        icon: "error",
        button: "Ok!",
      });
    if (!SubjectPart)
      return swal({
        title: "Oops!",
        text: "Please Enter select subject Part",
        icon: "error",
        button: "Ok!",
      });

    try {
      const config = {
        url: "/admin/addChapter",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          chapterName: chapterName,
          subjectName: subjectName,
          SubjectPart: SubjectPart,
          Classname: Classname,
          Sub_classname: Sub_classname,
          authId: admin?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        handleClose();
        getChapter(subjectName, Sub_classname);
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
        text: error.response?.data?.error || "Something went wrong",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  const [weightage, setweightage] = useState([]);
  const getallweightagecontent = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getallcontent");
      if (res.status === 200) {
        setweightage(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  }; 

  //get chapters based on subject and subclass
  const [chapters, setchapters] = useState([]);
  const [nochangedata, setnochangedata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getChapter = async (subject, subclass) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`http://localhost:8774/api/admin/getAllChapter`, {
        params: {
          subjectName: subject,
          subclassName: subclass,
        },
      });
      if (res.status === 200) {
        setchapters(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log("Error fetching chapters:", error);
      setError("Failed to load chapters. Please try again.");
      setchapters([]);
    } finally {
      setLoading(false);
    }
  };

  const [updatechapter, setpdatesetchapter] = useState("");
  const UpdateChapter = async () => {
    try {
      const config = {
        url: "/admin/updateChapter",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          chapterName: chapterName,
          subjectName: subjectName,
          SubjectPart: SubjectPart,
          Classname: Classname,
          Sub_classname: Sub_classname,
          authId: admin?._id,
          id: updatechapter,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        handleClose1();
        getChapter(subjectName, Sub_classname);
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
        text: error.response?.data?.error || "Something went wrong",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  //delete
  const [chapter, setChapter] = useState("");
  const DeleteChapter = async () => {
    try {
      const config = {
        url: "/admin/deleteChapter/" + chapter + "/" + admin?._id,
        method: "delete",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        handleClose2();
        getChapter(subjectName, Sub_classname);
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
        text: error.response?.data?.error || "Something went wrong",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  // get method of subject
  const [subject, setsubject] = useState([]);
  const getSubject = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getAllSujects");
      if (res.status === 200) {
        setsubject(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get method for subclass
  const [getaddsubclass, setgetaddsubclass] = useState([]);
  const getaddsubclasss = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getAllSubClass");
      if (res.status === 200) {
        setgetaddsubclass(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [searchH, setSearchH] = useState("");
  const handleFilterH = (e) => {
    if (e.target.value !== "") {
      setSearchH(e.target.value);
      const filterTableH = nochangedata.filter((o) =>
        Object.keys(o).some((k) => String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())),
      );
      setchapters([...filterTableH]);
    } else {
      setSearchH(e.target.value);
      setchapters([...nochangedata]);
    }
  };

  // Helper function to normalize strings for comparison
  const normalizeString = (str) => {
    return str
      ?.toLowerCase()
      ?.replace(/\s+/g, ' ')       // Replace multiple spaces with single space
      ?.replace(/-/g, ' ')         // Replace hyphens with spaces
      ?.replace(/[^\w\s]/g, '')    // Remove special characters
      ?.trim();
  };

  useEffect(() => {
    getAddMedium();
    getaddsubclas();
    getSubject();
    getallweightagecontent();
    getaddsubclasss();
  }, []);

  // Auto-fetch chapters when subject and subclass are selected
  useEffect(() => {
    if (subjectName && Sub_classname) {
      getChapter(subjectName, Sub_classname);
    }
  }, [subjectName, Sub_classname]);

  const uniqueClassNamesSet = new Set(getaddsubclass.map((item) => item.className));
  const uniqueClassNamesArray = Array.from(uniqueClassNamesSet);

  return (
    <div>
      <div className="row d-flex justify-content-between">
        <div className="col-lg-4 d-flex justify-content-center">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
              onChange={handleFilterH}
            />
          </div>
        </div>
        <div className="col-lg-2">
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
      <div className="customerhead p-2">
        <h2 className="header-c">Chapters</h2>
        <div>
          <div className="container">
            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlFor="">Select Medium</label>
                <Form.Select
                  aria-label="Default select example"
                  value={mediumName}
                  onChange={(e) => {
                    setmediumName(e.target.value);
                    // Reset dependent fields
                    setClassname("");
                    setSub_classname("");
                    setSubjectName("");
                  }}
                >
                  <option value="">Select Medium</option>
                  {Medium?.map((val, i) => {
                    return (
                      <option value={val?.mediumName} key={i}>
                        {val?.mediumName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="col-md-4">
                <label htmlFor="">Select Class</label>
                <Form.Select
                  aria-label="Default select example"
                  value={Classname}
                  onChange={(e) => {
                    setClassname(e.target.value);
                    // Reset dependent fields
                    setSub_classname("");
                    setSubjectName("");
                  }}
                >
                  <option value="">Select Class</option>
                  {uniqueClassNamesArray?.map((val, i) => {
                    return (
                      <option value={val} key={i}>
                        {val}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="col-md-4">
                <label htmlFor="">Select Sub Class</label>
                <Form.Select
                  aria-label="Default select example"
                  value={Sub_classname}
                  onChange={(e) => {
                    setSub_classname(e.target.value);
                    // Reset subject
                    setSubjectName("");
                  }}
                >
                  <option value="">Select Sub Class</option>
                  {getaddsubclass
                    ?.filter((ele) => ele.className === Classname)
                    ?.map((val, i) => {
                      return (
                        <option value={val?.subclassName} key={i}>
                          {val?.subclassName}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <label htmlFor="">Select Subject</label>
                <Form.Select
                  aria-label="Default select example"
                  value={subjectName}
                  onChange={(e) => {
                    setSubjectName(e.target.value);
                  }}
                >
                  <option value="">Select Subject</option>
                  {subject
                    ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
                    ?.map((val, i) => {
                      return (
                        <option value={val?.subjectName} key={i}>
                          {val?.subjectName}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
              <div className="col-md-6">
                {Sub_classname && subjectName ? (
                  <Link
                    style={{ float: "right" }}
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    <Button2 text={"Add Chapters"} />
                  </Link>
                ) : (
                  <Link
                    style={{ float: "right", cursor: "no-drop" }}
                    onClick={() => {
                      handleShow();
                    }}
                  >
                    <Button2 text={"Add Chapters"} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          {error ? (
            <div className="text-center text-danger p-4">{error}</div>
          ) : loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading chapters...</p>
            </div>
          ) : (
            <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Medium</th>
                  <th>Class</th>
                  <th>Sub-class</th>
                  <th>Subject</th>
                  <th>Subject Part</th>
                  <th>Chapter Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {chapters.length > 0 ? (
                  chapters?.map((item, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item?.mediumName}</td>
                        <td>{item?.Classname}</td>
                        <td>{item?.Sub_classname}</td>
                        <td>{item?.subjectName}</td>
                        <td>{item?.SubjectPart}</td>
                        <td>{item?.chapterName}</td>
                        <td>
                          <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow1(item);
                                  setpdatesetchapter(item?._id);
                                  setmediumName(item?.mediumName);
                                  setClassname(item?.Classname);
                                  setSub_classname(item?.Sub_classname);
                                  setSubjectName(item?.subjectName);
                                  setSubjectPart(item?.SubjectPart);
                                  setChapterName(item?.chapterName);
                                }}
                              />
                            </div>
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  setChapter(item?._id);
                                  handleShow2(item?._id);
                                }}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      {subjectName && Sub_classname
                        ? "No chapters found for the selected subject and sub-class"
                        : "Please select a subject and sub-class to view chapters"}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </div>
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>Add Chapter for {Sub_classname}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="do-sear mt-2">
              <label>Medium</label>
              <select className="vi_0" value={mediumName} onChange={(e) => setmediumName(e.target.value)}>
                <option value="">--Select medium--</option>
                {Medium?.map((item, i) => {
                  return (
                    <option value={item?.mediumName} key={i}>
                      {item?.mediumName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="do-sear mt-2">
              <label>Class</label>
              <select className="vi_0" value={Classname} onChange={(e) => setClassname(e.target.value)}>
                <option value="">--Select Class--</option>
                {getaddsubcla
                  ?.filter((ele) => ele.mediumName === mediumName)
                  .map((item, i) => {
                    return (
                      <option value={item?.className} key={i}>
                        {item?.className}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="do-sear mt-2">
              <label>Sub-Class</label>
              <select className="vi_0" value={Sub_classname} onChange={(e) => setSub_classname(e.target.value)}>
                <option value="">--Select Sub Class--</option>
                {getaddsubcla
                  ?.filter((item) => item.mediumName === mediumName && item.className === Classname)
                  .map((item, i) => {
                    return (
                      <option value={item?.subclassName} key={i}>
                        {item?.subclassName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Subject</label>
                <Form.Select
                  aria-label="Default select example"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                >
                  <option>Select Subject</option>
                  {subject
                    ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
                    ?.map((val, i) => {
                      return (
                        <option value={val?.subjectName} key={i}>
                          {val?.subjectName}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label htmlFor="">Subject Part</label>
                  <Form.Select
                    aria-label="Default select example"
                    value={SubjectPart}
                    onChange={(e) => setSubjectPart(e.target.value)}
                  >
                    <option value="">Select Subject Part</option>
                    {weightage
                      ?.filter((ele) => {
                        // Normalize both strings for comparison
                        const normalizedSubjectName = normalizeString(subjectName);
                        const normalizedWeightageSubject = normalizeString(ele?.Subject);
                        return normalizedSubjectName === normalizedWeightageSubject;
                      })
                      .map((val, i) => {
                        return (
                          <option value={val?.Content} key={i}>
                            {val?.Content}
                          </option>
                        );
                      })}
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Chapter</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Chapter Name"
                  value={chapterName}
                  onChange={(e) => handleInputChange(e, setChapterName)}
                />
                {selectedLanguage === "en-t-i0-und" ? <></> : <p>{chapterName}</p>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button className="mx-2 modal-close-btn" variant="" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={() => {
                  AddChapter();
                }}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal show={show1} onHide={handleClose1} backdrop="static" keyboard={false} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "rgb(40 167 223)" }}>
            <Modal.Title style={{ color: "white" }}>Edit Chapter</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="do-sear mt-2">
              <label>Medium</label>
              <select className="vi_0" value={mediumName} onChange={(e) => setmediumName(e.target.value)}>
                <option value="">--Select medium--</option>
                {Medium?.map((item, i) => {
                  return (
                    <option value={item?.mediumName} key={i}>
                      {item?.mediumName}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="do-sear mt-2">
              <label>Class</label>
              <select className="vi_0" value={Classname} onChange={(e) => setClassname(e.target.value)}>
                <option value="">--Select Class--</option>
                {getaddsubcla
                  ?.filter((ele) => ele.mediumName === mediumName)
                  .map((item, i) => {
                    return (
                      <option value={item?.className} key={i}>
                        {item?.className}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="do-sear mt-2">
              <label>Sub-Class</label>
              <select className="vi_0" value={Sub_classname} onChange={(e) => setSub_classname(e.target.value)}>
                <option value="">--Select Sub Class--</option>
                {getaddsubcla
                  ?.filter((item) => item.mediumName === mediumName && item.className === Classname)
                  .map((item, i) => {
                    return (
                      <option value={item?.subclassName} key={i}>
                        {item?.subclassName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Subject</label>
                <Form.Select
                  aria-label="Default select example"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                >
                  <option>Select Subject</option>
                  {subject
                    ?.filter((ele) => ele?.subClass?.subclassName === Sub_classname)
                    ?.map((val, i) => {
                      return (
                        <option value={val?.subjectName} key={i}>
                          {val?.subjectName}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="do-sear mt-2">
                  <label htmlFor="">Subject Part</label>
                  <Form.Select
                    aria-label="Default select example"
                    value={SubjectPart}
                    onChange={(e) => setSubjectPart(e.target.value)}
                  >
                    <option value="">Select Subject Part</option>
                    {weightage
                      ?.filter((ele) => {
                        // Normalize both strings for comparison
                        const normalizedSubjectName = normalizeString(subjectName);
                        const normalizedWeightageSubject = normalizeString(ele?.Subject);
                        return normalizedSubjectName === normalizedWeightageSubject;
                      })
                      .map((val, i) => {
                        return (
                          <option value={val?.Content} key={i}>
                            {val?.Content}
                          </option>
                        );
                      })}
                  </Form.Select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Chapter</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter Chapter Name"
                  value={chapterName}
                  onChange={(e) => handleInputChange(e, setChapterName)}
                />
                {selectedLanguage === "en-t-i0-und" ? <></> : <p>{chapterName}</p>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="" className="modal-close-btn" onClick={handleClose1}>
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={() => {
                UpdateChapter();
              }}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={show2} onHide={handleClose2} backdrop="static" keyboard={false} style={{ zIndex: "99999" }}>
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
            <Button variant="" className="modal-close-btn" onClick={handleClose2}>
              Close
            </Button>
            <Button variant="" className="modal-add-btn" onClick={DeleteChapter}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AdminChapter;
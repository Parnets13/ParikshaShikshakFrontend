// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
// import { AiFillDelete, AiFillEye } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import "../Admin/Admin.css";
// import axios from "axios";
// import swal from "sweetalert";
// import { debounce } from "lodash";
// import { Link } from "react-router-dom";
// import Button2 from "../Button2";

// const AdminSubject = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const [SubClassName, setSubClassName] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);

//   //Translate
//   // googleTransliterate is removed due to dependency issues in WebContainer

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

//     let am = value.split(/\s+/); 

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

//   //Post
//   const [mediumName, setmediumName] = useState("");
//   const [subjectName, setsubjectName] = useState("");
//   const AddSubject = async () => {
//     if (!mediumName)
//       return swal({
//         title: "Oops!",
//         text: "Please Select the medium",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!subjectName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the Subject",
//         icon: "error",
//         button: "Ok!",
//       });
//     try {
//       const subClassId = getaddsubclass.find(
//         (item) => item.subclassName === SubClassName
//       )?._id;

//       if (!subClassId) {
//         return swal({
//           title: "Oops!",
//           text: "Please select a valid Sub-Class",
//           icon: "error",
//           button: "Ok!",
//         });
//       }

//       const config = {
//         url: "/admin/addSubjects",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           subjectName: subjectName,
//           authId: admin?._id,
//           subClass: subClassId,
//         },
//       };
//       console.log("Data being sent:", config.data);
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose();
//         getSubject();
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.error("Error adding subject:", error);
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "An error occurred",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };
//   //get method for medium
//   const [Medium, setMedium] = useState([]);
//   const getAddMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status === 200) {
//         setMedium(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const [getaddsubclass, setgetaddsubclass] = useState([]);
//   const getaddsubclasss = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSubClass"
//       );
//       console.log("ok", res);
//       if (res.status == 200) {
//         setgetaddsubclass(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //get
//   const [subject, setsubject] = useState([]);
//   const [nochangedata, setnochangedata] = useState([]);
//   const getSubject = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSujects"
//       );
//       if (res.status === 200) {
//         setsubject(res.data.success);
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   //update
//   const [updateSubject, setpdateSubject] = useState("");
//   const UpdateSubject = async () => {
//     try {
//       const config = {
//         url: "/admin/updateSubjects",
//         method: "put",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           subjectName: subjectName,
//           authId: admin?._id,
//           id: updateSubject._id,
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose1();
//         getSubject();
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
//         text: error.response?.data?.error || "An error occurred",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };
//   //delete
//   const [sub, setsub] = useState("");
//   const DeleteSubject = async () => {
//     try {
//       const config = {
//         url: `/admin/deleteSubjects/${sub}/${admin?._id}`,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose2();
//         getSubject();
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
//         text: error.response?.data?.error || "An error occurred",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   //   Row Filter
//   const [itempage, setItempage] = useState(5);

//   //   DateRange Filter
//   const [searchH, setSearchH] = useState("");
//   const handleFilterH = (e) => {
//     const value = e.target.value.toLowerCase();
//     if (value) {
//       setSearchH(value);
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) => String(o[k])?.toLowerCase().includes(value))
//       );
//       setsubject([...filterTableH]);
//     } else {
//       setSearchH("");
//       setsubject([...nochangedata]);
//     }
//   };

//   useEffect(() => {
//     getSubject();
//     getAddMedium();
//     getaddsubclasss();
//   }, []);

//   return (
//     <>
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
//       <div className="col-lg-4 d-flex justify-content-center">
//         <div class="input-group ">
//           <span class="input-group-text" id="basic-addon1">
//             <BsSearch />
//           </span>
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Search..."
//             aria-describedby="basic-addon1"
//             onChange={handleFilterH}
//           />
//         </div>
//       </div>
//       <div className="customerhead p-2">
//         <div className="d-flex justify-content-between align-items-center">
//           <h2 className="header-c ">Subject</h2>
//           <Link onClick={handleShow}>
//             <Button2 text={"Add Subject"} />
//           </Link>
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
//                 <th>Subject</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subject?.map((item, i) => (
//                 <tr key={item._id}>
//                   <td>{i + 1}</td>
//                   <td>{item?.mediumName}</td>
//                   <td>{item?.subjectName}</td>
//                   <td>
//                     <div style={{ display: "flex", gap: "20px" }}>
//                       <BiSolidEdit
//                         className="text-success"
//                         style={{ cursor: "pointer", fontSize: "20px" }}
//                         onClick={() => {
//                           handleShow1();
//                           setpdateSubject(item);
//                           setsubjectName(item?.subjectName);
//                           setmediumName(item?.mediumName);
//                           setSubClassName(item?.subclassName);
//                         }}
//                       />
//                       <AiFillDelete
//                         className="text-danger"
//                         style={{ cursor: "pointer", fontSize: "20px" }}
//                         onClick={() => {
//                           setsub(item?._id);
//                           handleShow2();
//                         }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>

//         {/* Add Package modal */}
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>Add Subject</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Medium</label>
//                 <select
//                   className="vi_0"
//                   onChange={(e) => setmediumName(e.target.value)}
//                 >
//                   <option value="">--Select medium--</option>
//                   {Medium?.map((item) => (
//                     <option key={item._id} value={item?.mediumName}>
//                       {item?.mediumName}
//                     </option>
//                   ))}
//                 </select>
//                 <label>
//                   Select Sub-Class <span style={{ color: "red" }}>*</span>
//                 </label>
//                 <Form.Select
//                   value={SubClassName}
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setSubClassName(e.target.value);
//                   }}
//                 >
//                   <option value={""}>Select the Sub-Class</option>
//                   {getaddsubclass?.map((val, i) => {
//                     return (
//                       <option value={val?.subclassName} key={i}>
//                         {val?.subclassName}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Subject"
//                   className="vi_0"
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-und") {
//                       setsubjectName(e.target.value);
//                     } else onChangeHandler(e.target.value, setsubjectName);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{subjectName}</p>
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
//                 onClick={AddSubject}
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
//             <Modal.Title style={{ color: "white" }}>Edit Subject</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Medium</label>
//                 <select
//                   className="vi_0"
//                   value={mediumName}
//                   onChange={(e) => setmediumName(e.target.value)}
//                 >
//                   <option value="">--Select medium--</option>
//                   {Medium?.map((item) => (
//                     <option key={item._id} value={item?.mediumName}>
//                       {item?.mediumName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   value={subjectName}
//                   onChange={(e) => setsubjectName(e.target.value)}
//                 />
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Sub-Class</label>
//                 <Form.Select
//                   value={SubClassName}
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setSubClassName(e.target.value);
//                   }}
//                 >
//                   <option value={""}>Select the Sub-Class</option>
//                   {getaddsubclass?.map((val, i) => {
//                     return (
//                       <option value={val?.subclassName} key={i}>
//                         {val?.subclassName}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose1}>
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={UpdateSubject}
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
//             <Button variant="secondary" onClick={handleClose2}>
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={DeleteSubject}
//             >
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default AdminSubject;
 
 
// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
// import { AiFillDelete, AiFillEye } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import "../Admin/Admin.css";
// import axios from "axios";
// import swal from "sweetalert";
// import { debounce } from "lodash";
// import { Link } from "react-router-dom";
// import Button2 from "../Button2";

// const AdminSubject = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   const [show, setShow] = useState(false);
//   const [show1, setShow1] = useState(false);
//   const [show2, setShow2] = useState(false);
//   const [SubClassName, setSubClassName] = useState("");

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);

//   // Translate
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

//     let am = value.split(/\s+/); 

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
//   }, 300);

//   // States for subject data
//   const [mediumName, setmediumName] = useState("");
//   const [subjectName, setsubjectName] = useState("");
//   const [Board, setBoard] = useState("");    
   
//   console.log(Board,"board")
  
//   // Get all data states
//   const [Medium, setMedium] = useState([]);
//   const [getaddsubclass, setgetaddsubclass] = useState([]);
//   const [subject, setsubject] = useState([]);
//   const [nochangedata, setnochangedata] = useState([]);
//   const [getboardname, setboardname] = useState([]);    
   
//    console.log(getboardname,"boardname")

//   // States for update and delete
//   const [updateSubject, setpdateSubject] = useState("");
//   const [sub, setsub] = useState("");

//   // Add Subject
//   const AddSubject = async () => {
//     if (!mediumName)
//       return swal({
//         title: "Oops!",
//         text: "Please Select the medium",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!subjectName)
//       return swal({
//         title: "Oops!",
//         text: "Please Enter the Subject",
//         icon: "error",
//         button: "Ok!",
//       });
//     if (!Board)
//       return swal({
//         title: "Oops!",
//         text: "Please Select the Board",
//         icon: "error",
//         button: "Ok!",
//       });
    
//     try {
//       const subClassId = getaddsubclass.find(
//         (item) => item.subclassName === SubClassName
//       )?._id;

//       if (!subClassId) {
//         return swal({
//           title: "Oops!",
//           text: "Please select a valid Sub-Class",
//           icon: "error",
//           button: "Ok!",
//         });
//       }

//       const config = {
//         url: "/admin/addSubjects",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           subjectName: subjectName,
//           authId: admin?._id,
//           subClass: subClassId,
//           boardName: Board,
//         },
//       };

//       console.log(mediumName,subjectName,Board,subClassId,"data being sent")
      
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose();
//         getSubject();
//         return swal({
//           title: "Yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.error("Error adding subject:", error);
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "An error occurred",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   // Update Subject
//   const UpdateSubject = async () => {
//     try {
//       const subClassId = getaddsubclass.find(
//         (item) => item.subclassName === SubClassName
//       )?._id;

//       const config = {
//         url: "/admin/updateSubjects",
//         method: "put",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           subjectName: subjectName,
//           authId: admin?._id,
//           id: updateSubject._id,
//           boardName: Board,
//           subClass: subClassId,
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose1();
//         getSubject();
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
//         text: error.response?.data?.error || "An error occurred",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   // Delete Subject
//   const DeleteSubject = async () => {
//     try {
//       const config = {
//         url: `/admin/deleteSubjects/${sub}/${admin?._id}`,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose2();
//         getSubject();
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
//         text: error.response?.data?.error || "An error occurred",
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };

//   // Get all mediums
//   const getAddMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status === 200) {
//         setMedium(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get all subclasses
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

//   // Get all subjects
//   const getSubject = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSujects"
//       );
//       if (res.status === 200) {
//         setsubject(res.data.success);
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Get all boards
//   const getallboardname = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllBoard"
//       );
//       if (res.status === 200) {
//         setboardname(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Row Filter
//   const [itempage, setItempage] = useState(5);

//   // DateRange Filter
//   const [searchH, setSearchH] = useState("");
//   const handleFilterH = (e) => {
//     const value = e.target.value.toLowerCase();
//     if (value) {
//       setSearchH(value);
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) => String(o[k])?.toLowerCase().includes(value))
//       );
//       setsubject([...filterTableH]);
//     } else {
//       setSearchH("");
//       setsubject([...nochangedata]);
//     }
//   };

//   console.log(subject,"sub.......................................")

//   useEffect(() => {
//     getSubject();
//     getAddMedium();
//     getaddsubclasss();
//     getallboardname();
//   }, []);

//   return (
//     <>
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
//       <div className="col-lg-4 d-flex justify-content-center">
//         <div class="input-group ">
//           <span class="input-group-text" id="basic-addon1">
//             <BsSearch />
//           </span>
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Search..."
//             aria-describedby="basic-addon1"
//             onChange={handleFilterH}
//           />
//         </div>
//       </div>
//       <div className="customerhead p-2">
//         <div className="d-flex justify-content-between align-items-center">
//           <h2 className="header-c ">Subject</h2>
//           <Link onClick={handleShow}>
//             <Button2 text={"Add Subject"} />
//           </Link>
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
//                 <th>Board</th>
//                 <th>Medium</th>
//                 <th>Subject</th>
//                 <th>Sub-Class</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {subject?.map((item, i) => (
//                 <tr key={item._id}>
//                   <td>{i + 1}</td>
//                   <td>{item?.boardName}</td>
//                   <td>{item?.mediumName}</td>
//                   <td>{item?.subjectName}</td>
//                   <td>{item?.subClass?.subclassName}</td>
//                   <td>
//                     <div style={{ display: "flex", gap: "20px" }}>
//                       <BiSolidEdit
//                         className="text-success"
//                         style={{ cursor: "pointer", fontSize: "20px" }}
//                         onClick={() => {
//                           handleShow1();
//                           setpdateSubject(item);
//                           setsubjectName(item?.subjectName);
//                           setmediumName(item?.mediumName);
//                           setBoard(item?.boardName);
//                           setSubClassName(item?.subClass?.subclassName);
//                         }}
//                       />
//                       <AiFillDelete
//                         className="text-danger"
//                         style={{ cursor: "pointer", fontSize: "20px" }}
//                         onClick={() => {
//                           setsub(item?._id);
//                           handleShow2();
//                         }}
//                       />
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </Table>
//         </div>

//         {/* Add Subject modal */}
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>Add Subject</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Board</label>
//                 <select
//                   className="vi_0"
//                   onChange={(e) => setBoard(e.target.value)}
//                 >
//                   <option value="">--Select Board--</option>
//                   {getboardname?.map((item) => (
//                     <option key={item._id} value={item?.boardName}>
//                       {item?.boardName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Medium</label>
//                 <select
//                   className="vi_0"
//                   onChange={(e) => setmediumName(e.target.value)}
//                 >
//                   <option value="">--Select medium--</option>
//                   {Medium?.map((item) => (
//                     <option key={item._id} value={item?.mediumName}>
//                       {item?.mediumName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Sub-Class</label>
//                 <Form.Select
//                   value={SubClassName}
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setSubClassName(e.target.value);
//                   }}
//                 >
//                   <option value={""}>Select the Sub-Class</option>
//                   {getaddsubclass?.map((val, i) => {
//                     return (
//                       <option value={val?.subclassName} key={i}>
//                         {val?.subclassName}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Subject"
//                   className="vi_0"
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-und") {
//                       setsubjectName(e.target.value);
//                     } else onChangeHandler(e.target.value, setsubjectName);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{subjectName}</p>
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
//                 onClick={AddSubject}
//               >
//                 Add
//               </Button>
//             </div>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Subject modal */}
//         <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>Edit Subject</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Board</label>
//                 <select
//                   className="vi_0"
//                   value={Board}
//                   onChange={(e) => setBoard(e.target.value)}
//                 >
//                   <option value="">--Select Board--</option>
//                   {getboardname?.map((item) => (
//                     <option key={item._id} value={item?.boardName}>
//                       {item?.boardName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Medium</label>
//                 <select
//                   className="vi_0"
//                   value={mediumName}
//                   onChange={(e) => setmediumName(e.target.value)}
//                 >
//                   <option value="">--Select medium--</option>
//                   {Medium?.map((item) => (
//                     <option key={item._id} value={item?.mediumName}>
//                       {item?.mediumName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Sub-Class</label>
//                 <Form.Select
//                   value={SubClassName}
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setSubClassName(e.target.value);
//                   }}
//                 >
//                   <option value={""}>Select the Sub-Class</option>
//                   {getaddsubclass?.map((val, i) => {
//                     return (
//                       <option value={val?.subclassName} key={i}>
//                         {val?.subclassName}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Subject</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   value={subjectName}
//                   onChange={(e) => setsubjectName(e.target.value)}
//                 />
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose1}>
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={UpdateSubject}
//             >
//               Update
//             </Button>
//           </Modal.Footer>
//         </Modal>

//         {/* Delete confirmation modal */}
//         <Modal show={show2} onHide={handleClose2} style={{ zIndex: "99999" }}>
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
//             <Button variant="secondary" onClick={handleClose2}>
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={DeleteSubject}
//             >
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default AdminSubject; 
 
 import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table, Spinner } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import Button2 from "../Button2";

const AdminSubject = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [SubClassName, setSubClassName] = useState("");
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // Translate
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

    let am = value.split(/\s+/); 

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

  // States for subject data
  const [mediumName, setmediumName] = useState("");
  const [subjectName, setsubjectName] = useState("");
  const [Board, setBoard] = useState("");    
   
  console.log(Board,"board")
  
  // Get all data states
  const [Medium, setMedium] = useState([]);
  const [getaddsubclass, setgetaddsubclass] = useState([]);
  const [subject, setsubject] = useState([]);
  const [nochangedata, setnochangedata] = useState([]);
  const [getboardname, setboardname] = useState([]);    
   
   console.log(getboardname,"boardname")

  // States for update and delete
  const [updateSubject, setpdateSubject] = useState("");
  const [sub, setsub] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Add Subject
  const AddSubject = async () => {
    if (!mediumName)
      return swal({
        title: "Oops!",
        text: "Please Select the medium",
        icon: "error",
        button: "Ok!",
      });
    if (!subjectName)
      return swal({
        title: "Oops!",
        text: "Please Enter the Subject",
        icon: "error",
        button: "Ok!",
      });
    if (!Board)
      return swal({
        title: "Oops!",
        text: "Please Select the Board",
        icon: "error",
        button: "Ok!",
      });
    
    try {
      const subClassId = getaddsubclass.find(
        (item) => item.subclassName === SubClassName
      )?._id;

      if (!subClassId) {
        return swal({
          title: "Oops!",
          text: "Please select a valid Sub-Class",
          icon: "error",
          button: "Ok!",
        });
      }

      const config = {
        url: "/admin/addSubjects",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          subjectName: subjectName,
          authId: admin?._id,
          subClass: subClassId,
          boardName: Board,
        },
      };

      console.log(mediumName,subjectName,Board,subClassId,"data being sent")
      
      let res = await axios(config);
      if (res.status === 200) {
        handleClose();
        getSubject();
        return swal({
          title: "Yeah!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
      }
    } catch (error) {
      console.error("Error adding subject:", error);
      return swal({
        title: "Oops!",
        text: error.response?.data?.error || "An error occurred",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  // Update Subject
  const UpdateSubject = async () => {
    try {
      const subClassId = getaddsubclass.find(
        (item) => item.subclassName === SubClassName
      )?._id;

      const config = {
        url: "/admin/updateSubjects",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          subjectName: subjectName,
          authId: admin?._id,
          id: updateSubject._id,
          boardName: Board,
          subClass: subClassId,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose1();
        getSubject();
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
        text: error.response?.data?.error || "An error occurred",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  // Delete Subject
  const DeleteSubject = async () => {
    try {
      const config = {
        url: `/admin/deleteSubjects/${sub}/${admin?._id}`,
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
        getSubject();
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
        text: error.response?.data?.error || "An error occurred",
        icon: "error",
        button: "Ok!",
      });
    }
  };

  // Get all mediums
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

  // Get all subclasses
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

  // Get all subjects
  const getSubject = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllSujects"
      );
      if (res.status === 200) {
        setsubject(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000); // 5 minutes would be 300000, but that's too long for practical use
    }
  };

  // Get all boards
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

  // Row Filter
  const [itempage, setItempage] = useState(5);

  // DateRange Filter
  const [searchH, setSearchH] = useState("");
  const handleFilterH = (e) => {
    const value = e.target.value.toLowerCase();
    if (value) {
      setSearchH(value);
      const filterTableH = nochangedata.filter((o) =>
        Object.keys(o).some((k) => String(o[k])?.toLowerCase().includes(value))
      );
      setsubject([...filterTableH]);
    } else {
      setSearchH("");
      setsubject([...nochangedata]);
    }
  };

  console.log(subject,"sub.......................................")

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = subject.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(subject.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    getSubject();
    getAddMedium();
    getaddsubclasss();
    getallboardname();
  }, []);

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
            onChange={handleFilterH}
          />
        </div>
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Subject</h2>
          <Link onClick={handleShow}>
            <Button2 text={"Add Subject"} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" style={{ color: "#26AAE0" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading subjects... Please wait</p>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <Table
                responsive
                bordered
                style={{ width: "-webkit-fill-available" }}
              >
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Board</th>
                    <th>Medium</th>
                    <th>Subject</th>
                    <th>Sub-Class</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1 + (currentPage - 1) * itemsPerPage}</td>
                      <td>{item?.boardName}</td>
                      <td>{item?.mediumName}</td>
                      <td>{item?.subjectName}</td>
                      <td>{item?.subClass?.subclassName}</td>
                      <td>
                        <div style={{ display: "flex", gap: "20px" }}>
                          <BiSolidEdit
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow1();
                              setpdateSubject(item);
                              setsubjectName(item?.subjectName);
                              setmediumName(item?.mediumName);
                              setBoard(item?.boardName);
                              setSubClassName(item?.subClass?.subclassName);
                            }}
                          />
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setsub(item?._id);
                              handleShow2();
                            }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span>Items per page: </span>
                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="form-select d-inline-block w-auto"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
              <Pagination>
                <Pagination.First
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPage}
                      onClick={() => handlePageChange(number)}
                    >
                      {number}
                    </Pagination.Item>
                  )
                )}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          </>
        )}

        {/* Add Subject modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>Add Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Board</label>
                <select
                  className="vi_0"
                  onChange={(e) => setBoard(e.target.value)}
                >
                  <option value="">--Select Board--</option>
                  {getboardname?.map((item) => (
                    <option key={item._id} value={item?.boardName}>
                      {item?.boardName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="do-sear mt-2">
                <label>Medium</label>
                <select
                  className="vi_0"
                  onChange={(e) => setmediumName(e.target.value)}
                >
                  <option value="">--Select medium--</option>
                  {Medium?.map((item) => (
                    <option key={item._id} value={item?.mediumName}>
                      {item?.mediumName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="do-sear mt-2">
                <label>Sub-Class</label>
                <Form.Select
                  value={SubClassName}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSubClassName(e.target.value);
                  }}
                >
                  <option value={""}>Select the Sub-Class</option>
                  {getaddsubclass?.map((val, i) => {
                    return (
                      <option value={val?.subclassName} key={i}>
                        {val?.subclassName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="do-sear mt-2">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Enter Subject"
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      setsubjectName(e.target.value);
                    } else onChangeHandler(e.target.value, setsubjectName);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{subjectName}</p>
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
                onClick={AddSubject}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Subject modal */}
        <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>Edit Subject</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Board</label>
                <select
                  className="vi_0"
                  value={Board}
                  onChange={(e) => setBoard(e.target.value)}
                >
                  <option value="">--Select Board--</option>
                  {getboardname?.map((item) => (
                    <option key={item._id} value={item?.boardName}>
                      {item?.boardName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="do-sear mt-2">
                <label>Medium</label>
                <select
                  className="vi_0"
                  value={mediumName}
                  onChange={(e) => setmediumName(e.target.value)}
                >
                  <option value="">--Select medium--</option>
                  {Medium?.map((item) => (
                    <option key={item._id} value={item?.mediumName}>
                      {item?.mediumName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="do-sear mt-2">
                <label>Sub-Class</label>
                <Form.Select
                  value={SubClassName}
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSubClassName(e.target.value);
                  }}
                >
                  <option value={""}>Select the Sub-Class</option>
                  {getaddsubclass?.map((val, i) => {
                    return (
                      <option value={val?.subclassName} key={i}>
                        {val?.subclassName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="do-sear mt-2">
                <label>Subject</label>
                <input
                  type="text"
                  className="vi_0"
                  value={subjectName}
                  onChange={(e) => setsubjectName(e.target.value)}
                />
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
              onClick={UpdateSubject}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete confirmation modal */}
        <Modal show={show2} onHide={handleClose2} style={{ zIndex: "99999" }}>
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
              onClick={DeleteSubject}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminSubject;
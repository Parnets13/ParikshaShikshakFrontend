// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Pagination, Table, Image } from "react-bootstrap";
// import { AiFillDelete, AiFillEye } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import { IoEye } from "react-icons/io5";
// import "../Admin/Admin.css";
// import axios from "axios";
// import swal from "sweetalert";
// import { debounce } from "lodash";
// import Button2 from "../Button2";
// import { Link } from "react-router-dom";
// const AdminClass = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");
//   const [Class, setClass] = useState(true);
//   const [Subclass, setSubclass] = useState(false);

//   const [show, setShow] = useState();
//   const [show1, setShow1] = useState();
//   const [show2, setShow2] = useState();
//   const [show3, setShow3] = useState();
//   const [show4, setShow4] = useState();
//   const [show5, setShow5] = useState();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);

//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);

//   const handleClose3 = () => setShow3(false);
//   const handleShow3 = () => setShow3(true);

//   const handleClose4 = () => setShow4(false);
//   const handleShow4 = () => setShow4(true);

//   const handleClose5 = () => setShow5(false);
//   const handleShow5 = () => setShow5(true);

//   // Language Translater
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

//   // post method add class
//   const [className, setclassName] = useState("");
//   const classNamee = async () => {
//     try {
//       if (!className) {
//         return swal({
//           title: "Opps!",
//           text: "Please Enter boardName ",
//           icon: "error",
//           button: "Try Again!",
//         });
//       }

//       const config = {
//         url: "/admin/addClass",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           className: className,
//           authId: admin?._id,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose();
//         return swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Error!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Try Again!",
//       });
//     }
//   };
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
//   // update method add class
//   const [editclassname, seteditclassname] = useState("");
//   const updateclassname = async () => {
//     try {
//       const config = {
//         url: "admin/updateClass",
//         method: "put",
//         baseURL: "http://localhost:8774/api/",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           className: className,
//           id: editclassname,
//           authId: admin?._id,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleShow1();
//         getallclassname();
//         return swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Opps!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Try Again!",
//       });
//     }
//   };
//   // delete method add class
//   const [deleteclassname, setdeleteclassname] = useState("");
//   const deleteallclassname = async () => {
//     try {
//       const config = {
//         url: "/admin/deleteClass/" + deleteclassname + "/" + admin?._id,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         return swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Opps!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };
//   // post method for sub classname
//   const [mediumName, setmediumName] = useState("");
//   const [classsname, setclasssname] = useState("");
//   const [subclasssname, setsubclasssname] = useState("");
//   const subclassnamee = async () => {
//     try {
//       if (!mediumName) {
//         swal({
//           title: "Opps!",
//           text: "Please select Classname",
//           icon: "error",
//           button: "Try Again!",
//         });
//       }
//       if (!classsname) {
//         swal({
//           title: "Opps!",
//           text: "Please select Classname",
//           icon: "error",
//           button: "Try Again!",
//         });
//       }
//       if (!subclasssname) {
//         swal({
//           title: "Opps!",
//           text: "Please select Classname",
//           icon: "error",
//           button: "Try Again!",
//         });
//       }
//       const config = {
//         url: "/admin/addSubClass",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           className: classsname,
//           subclassName: subclasssname,
//           authId: admin?._id,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose3();
//         getaddsubclasss();
//         swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Opps!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Try Again!",
//       });
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
//         // Create a Map to store unique subclasses by ID
//         const uniqueSubclasses = new Map();
        
//         // Process each subclass and only keep unique ones
//         res.data.success.forEach(subclass => {
//           if (!uniqueSubclasses.has(subclass._id)) {
//             uniqueSubclasses.set(subclass._id, subclass);
//           }
//         });
        
//         // Convert Map values back to array
//         setgetaddsubclass(Array.from(uniqueSubclasses.values()));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   // update method for subclass
//   const [editsubclass, seteditsubclass] = useState("");
//   const editsubbclass = async () => {
//     try {
//       const config = {
//         url: "/admin/updateSubClass",
//         baseURL: "http://localhost:8774/api",
//         method: "put",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           className: classsname,
//           subclassName: subclasssname,
//           authId: admin?._id,
//           id: editsubclass,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose4();
//         getaddsubclasss();
//         return swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Opps!",
//         text: error.response.data.error,
//         icon: "success",
//         button: "OK!",
//       });
//     }
//   };
//   // delete method
//   const [deletesubclass, setdeletesubclass] = useState("");
//   const deletesubclasss = async () => {
//     try {
//       const config = {
//         url: "/admin/deleteSubClass/" + deletesubclass + "/" + admin?._id,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const res = await axios(config);
//       if (res.status == 200) {
//         handleClose5();
//         getaddsubclasss();
//         return swal({
//           title: "Deteded!",
//           text: res.data.success,
//           icon: "warning",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Opps!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };
//   useEffect(() => {
//     getaddsubclasss();
//     getAddMedium();
//   }, []);
//   console.log(getaddsubclass);

//   const [View, setView] = useState({});
//   const [show100, setShow100] = useState(false);
//   const handleClose100 = () => setShow100(false);
//   const handleShow100 = () => setShow100(true);
//   const [show101, setShow101] = useState(false);
//   const handleClose101 = () => setShow101(false);
//   const handleShow101 = () => setShow101(true);
//   //   Row Filter
//   const [itempage, setItempage] = useState(5);

//   //   DateRange Filter
//   const [data, setData] = useState([]);
//   const [startDate, setstartDate] = useState("");
//   const [endDate, setendDate] = useState("");
//   const filterData = () => {
//     if (!startDate) return alert("Please select from date");
//     if (!endDate) return alert("Please select to date");
//     const filteredData = data.filter((item) => {
//       const itemDate = new Date(item?.createdAt);
//       const startDateObj = new Date(startDate);
//       const endDateObj = new Date(endDate);

//       return itemDate >= startDateObj && itemDate <= endDateObj;
//     });
//     setData([...filteredData]);
//   };
//   // Pagination for class
//   const [pageNumber, setPageNumber] = useState(0);
//   const productPerPage = 5;
//   const visitedPage = pageNumber * productPerPage;
//   const displayPage = getclassname.slice(
//     visitedPage,
//     visitedPage + productPerPage
//   );
//   const pageCount = Math.ceil(getclassname.length / productPerPage);

//   // Pagination for subclass
//   const [pageNumber1, setPageNumber1] = useState(0);
//   const productPerPage1 = 5;
//   const visitedPage1 = pageNumber1 * productPerPage1;
//   const displayPage1 = getaddsubclass.slice(
//     visitedPage1,
//     visitedPage1 + productPerPage1
//   );
//   const pageCount1 = Math.ceil(getaddsubclass.length / productPerPage1);
//   useEffect(() => {
//     getallclassname();
//   }, []);
//   console.log(getclassname);

//   // newpagination  for class
//   const [data1, setData1] = useState([]);
//   const [Products, setProducts] = useState();

//   const [currenpage, setCurrentpage] = useState(1);
//   const recordsperpage = 6;
//   const lastIndex = currenpage * recordsperpage;
//   const firstIndex = lastIndex - recordsperpage;
//   const records = getclassname.slice(firstIndex, lastIndex);
//   const npages = Math.ceil(getclassname.length / recordsperpage);
//   const numbers = [...Array(npages + 1).keys()].slice(1);

//   function changePage(id) {
//     setCurrentpage(id);
//   }

//   function prevpage() {
//     if (currenpage !== firstIndex) {
//       setCurrentpage(currenpage - 1);
//     }
//   }

//   function nextpage() {
//     if (currenpage !== lastIndex) {
//       setCurrentpage(currenpage + 1);
//     }
//   }

//   // subclass pagination

//   const [data2, setData2] = useState([]);
//   const [Productss, setProductss] = useState();

//   const [currenpages, setCurrentpages] = useState(1);
//   const recordsperpages = 6;
//   const lastIndexs = currenpage * recordsperpage;
//   const firstIndexs = lastIndex - recordsperpage;
//   const records1 = getaddsubclass.slice(firstIndex, lastIndex);
//   const npages1 = Math.ceil(getaddsubclass.length / recordsperpage);
//   const numbers1 = [...Array(npages + 1).keys()].slice(1);

//   function changePage(id) {
//     setCurrentpage(id);
//   }

//   function prevpage() {
//     if (currenpage !== firstIndex) {
//       setCurrentpage(currenpage - 1);
//     }
//   }

//   function nextpage() {
//     if (currenpage !== lastIndex) {
//       setCurrentpage(currenpage + 1);
//     }
//   }
//   return (
//     <div>
//       <div className="d-flex justify-content-between align-items-center">
//         <Form.Group className="mb-3">
//           <Form.Label>Search</Form.Label>
//           <Form.Control type="text" placeholder="Search..." />
//         </Form.Group>

//         <div className="">
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
//         <div className="d-flex justify-content-between align-items-center">
//           <h2 className="header-c ">Subclass </h2>

//           <Link onClick={handleShow3}>
//             <Button2 text={"Add Subclass"} />
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
//                 <th>
//                   <div>Class</div>
//                 </th>
//                 <th>
//                   <div>Subclass</div>
//                 </th>

//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {getaddsubclass?.map((val, i) => {
//                 return (
//                   <tr key={val._id}>
//                     <td>{i + 1 + firstIndexs} </td>
//                     <td>{val?.mediumName}</td>
//                     <td>{val?.className}</td>
//                     <td>{val?.subclassName}</td>

//                     <td>
//                       {" "}
//                       <div style={{ display: "flex", gap: "20px" }}>
//                         <div>
//                           <BiSolidEdit
//                             className="text-success"
//                             style={{
//                               cursor: "pointer",
//                               fontSize: "20px",
//                             }}
//                             onClick={() => {
//                               handleShow4();
//                               seteditsubclass(val?._id);
//                               setclasssname(val?.className);
//                               setsubclasssname(val?.subclassName);
//                               setmediumName(val?.mediumName);
//                             }}
//                           />{" "}
//                         </div>
//                         <div>
//                           <AiFillDelete
//                             className="text-danger"
//                             style={{
//                               cursor: "pointer",
//                               fontSize: "20px",
//                             }}
//                             onClick={() => {
//                               handleShow5(val?._id);
//                               setdeletesubclass(val?._id);
//                             }}
//                           />{" "}
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </div>

       

//         <div>
//           <nav>
//             <ul className="pagination">
//               <li className="not-allow">
//                 <span>
//                   <li className="next-prev">
//                     <a
//                       onClick={() => {
//                         prevpage();
//                       }}
//                     >
//                       &lt;
//                     </a>{" "}
//                   </li>
//                 </span>
//               </li>
//               {numbers1?.map((n, i) => {
//                 return (
//                   <li className="active-next" key={i}>
//                     <a
//                       href="#"
//                       className="inactive"
//                       onClick={() => changePage(n)}
//                     >
//                       {n}
//                     </a>
//                   </li>
//                 );
//               })}

//               <li className="not-allow">
//                 <span>
//                   <li
//                     className="next-prev"
//                     onClick={() => {
//                       nextpage();
//                     }}
//                   >
//                     &gt;{" "}
//                   </li>
//                 </span>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>

//       {/* Edit Indian modal */}
//       <Modal
//         show={show1}
//         onHide={handleClose1}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "99999" }}
//       >
//         <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//           <Modal.Title style={{ color: "white" }}>Edit Class</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="do-sear mt-2">
//             <label>Class</label>
//             <input
//               type="text"
//               className="vi_0"
//               placeholder="Enter Class"
//               value={className}
//               onChange={(e) => {
//                 setclassName(e.target.value);
//               }}
//             />
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           {/* <Button
//             variant="primary"
//             style={{ backgroundColor: "#26AAE0" }}
            
//           > */}
//           <Button variant="secondary" onClick={handleClose1}>
//             Close
//           </Button>
//           <Button
//             variant=""
//             className="modal-add-btn"
//             onClick={() => {
//               updateclassname();
//             }}
//           >
//             Edit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Modal
//         show={show2}
//         onHide={handleClose2}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "99999" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row">
//             <div className="col-md-12">
//               <p className="fs-4" style={{ color: "red" }}>
//                 Are you sure you want to delete this data?
//               </p>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose2}>
//             Close
//           </Button>
//           <Button
//             variant=""
//             className="modal-add-btn"
//             onClick={() => {
//               deleteallclassname();
//             }}
//           >
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add board modal */}
//       <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
//         <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//           <Modal.Title style={{ color: "white" }}>Add Class </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="do-sear mt-2">
//             <label>Medium</label>
//             <select
//               className="vi_0"
//               onChange={(e) => setmediumName(e.target.value)}
//             >
//               <option value="">--Select medium--</option>
//               {Medium?.map((item) => {
//                 return (
//                   <option value={item?.mediumName}>{item?.mediumName}</option>
//                 );
//               })}
//             </select>
          
//           </div>
//           <div className="do-sear mt-2">
//             <label>Class</label>
          
//             <input
//               type="text"
//               placeholder="Enter Subject"
//               className="vi_0"
//               onChange={(e) => {
//                 if (selectedLanguage == "en-t-i0-und") {
//                   setclasssname(e.target.value);
//                 } else onChangeHandler(e.target.value, setclasssname);
//               }}
//             />
//             {selectedLanguage == "en-t-i0-und" ? <></> : <p>{classsname}</p>}
//           </div>
//           <div className="do-sear mt-2">
//             <label>Sub-Class</label>
//             <Form.Select
//               aria-label="Default select example"
//               onChange={(e) => {
//                 setsubclasssname(e.target.value);
//               }}
//             >
//               <option value="">Select Sub-Class</option>
//               <option value="LKG">LKG</option>
//               <option value="UKG">UKG</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//               <option value="6">6</option>
//               <option value="7">7</option>
//               <option value="8">8</option>
//               <option value="9">9</option>
//               <option value="10">10</option>
//               <option value="11">11</option>
//               <option value="12">12</option>
//             </Form.Select>
            
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <div className="d-flex">
//             <Button className="mx-2" variant="secondary" onClick={handleClose3}>
//               Close
//             </Button>
//             <Button
//               className="mx-2 modal-add-btn"
//               variant=""
//               onClick={() => {
//                 subclassnamee();
//               }}
//             >
//               Add
//             </Button>
//           </div>
//         </Modal.Footer>
//       </Modal>

//       {/* Edit Transport modal */}
//       <Modal
//         show={show4}
//         onHide={handleClose4}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "99999" }}
//       >
//         <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//           <Modal.Title style={{ color: "white" }}>Edit Subclass</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="do-sear mt-2">
//             <label>Medium</label>
//             <select
//               className="vi_0"
//               onChange={(e) => setmediumName(e.target.value)}
//             >
//               <option value="">--Select medium--</option>
//               {Medium?.map((item) => {
//                 return (
//                   <option value={item?.mediumName}>{item?.mediumName}</option>
//                 );
//               })}
//             </select>
//           </div>

//           <div className="do-sear mt-2">
//             <label>Class</label>
           
//             <input
//               type="text"
//               placeholder={classsname}
//               className="vi_0"
//               onChange={(e) => {
//                 if (selectedLanguage == "en-t-i0-und") {
//                   setclasssname(e.target.value);
//                 } else onChangeHandler(e.target.value, setclasssname);
//               }}
//             />
//             {selectedLanguage == "en-t-i0-und" ? <></> : <p>{classsname}</p>}
//           </div>
//           <div className="do-sear mt-2">
//             <label>Sub-Class</label>
            
//             <input
//               type="text"
//               placeholder={subclasssname}
//               className="vi_0"
//               onChange={(e) => {
//                 if (selectedLanguage == "en-t-i0-und") {
//                   setsubclasssname(e.target.value);
//                 } else onChangeHandler(e.target.value, setsubclasssname);
//               }}
//             />
//             {selectedLanguage == "en-t-i0-und" ? <></> : <p>{subclasssname}</p>}
//           </div>
         
//         </Modal.Body>
//         <Modal.Footer>
//           <Button className="mx-2" variant="secondary" onClick={handleClose4}>
//             Close
//           </Button>
//           <Button
//             variant=""
//             className="modal-add-btn"
//             onClick={() => {
//               editsubbclass();
//             }}
//           >
//             Edit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Modal
//         show={show5}
//         onHide={handleClose5}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "99999" }}
//       >
//         <Modal.Header closeButton>
//           <Modal.Title className="text-light">Warning</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <div className="row">
//             <div className="col-md-12">
//               <p className="fs-4" style={{ color: "red" }}>
//                 Are you sure you want to delete this data?
//               </p>
//             </div>
//           </div>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose5}>
//             Close
//           </Button>
//           <Button
//             variant=""
//             className="modal-add-btn"
//             onClick={() => {
//               deletesubclasss();
//             }}
//           >
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default AdminClass;
 
 
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table, Image } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { IoEye } from "react-icons/io5";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import { debounce } from "lodash";
import Button2 from "../Button2";
import { Link } from "react-router-dom";

const AdminClass = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  const [Class, setClass] = useState(true);
  const [Subclass, setSubclass] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true); // Added loading state

  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  const [show3, setShow3] = useState();
  const [show4, setShow4] = useState();
  const [show5, setShow5] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const handleClose4 = () => setShow4(false);
  const handleShow4 = () => setShow4(true);

  const handleClose5 = () => setShow5(false);
  const handleShow5 = () => setShow5(true);

  // Language Translater
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

  // post method add class
  const [className, setclassName] = useState("");
  const classNamee = async () => {
    try {
      if (!className) {
        return swal({
          title: "Opps!",
          text: "Please Enter boardName ",
          icon: "error",
          button: "Try Again!",
        });
      }

      const config = {
        url: "/admin/addClass",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          className: className,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose();
        return swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        button: "Try Again!",
      });
    }
  };
  //get method for medium
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
  // update method add class
  const [editclassname, seteditclassname] = useState("");
  const updateclassname = async () => {
    try {
      const config = {
        url: "admin/updateClass",
        method: "put",
        baseURL: "http://localhost:8774/api/",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          className: className,
          id: editclassname,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleShow1();
        getallclassname();
        return swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Opps!",
        text: error.response.data.error,
        icon: "error",
        button: "Try Again!",
      });
    }
  };
  // delete method add class
  const [deleteclassname, setdeleteclassname] = useState("");
  const deleteallclassname = async () => {
    try {
      const config = {
        url: "/admin/deleteClass/" + deleteclassname + "/" + admin?._id,
        method: "delete",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        return swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Opps!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };
  // post method for sub classname
  const [mediumName, setmediumName] = useState("");
  const [classsname, setclasssname] = useState("");
  const [subclasssname, setsubclasssname] = useState("");
  const subclassnamee = async () => {
    try {
      if (!mediumName) {
        swal({
          title: "Opps!",
          text: "Please select Classname",
          icon: "error",
          button: "Try Again!",
        });
      }
      if (!classsname) {
        swal({
          title: "Opps!",
          text: "Please select Classname",
          icon: "error",
          button: "Try Again!",
        });
      }
      if (!subclasssname) {
        swal({
          title: "Opps!",
          text: "Please select Classname",
          icon: "error",
          button: "Try Again!",
        });
      }
      const config = {
        url: "/admin/addSubClass",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          className: classsname,
          subclassName: subclasssname,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose3();
        getaddsubclasss();
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Opps!",
        text: error.response.data.error,
        icon: "error",
        button: "Try Again!",
      });
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
        // Create a Map to store unique subclasses by ID
        const uniqueSubclasses = new Map();
        
        // Process each subclass and only keep unique ones
        res.data.success.forEach(subclass => {
          if (!uniqueSubclasses.has(subclass._id)) {
            uniqueSubclasses.set(subclass._id, subclass);
          }
        });
        
        // Convert Map values back to array
        setgetaddsubclass(Array.from(uniqueSubclasses.values()));
      }
    } catch (error) {
      console.log(error);
    }
  };
  // update method for subclass
  const [editsubclass, seteditsubclass] = useState("");
  const editsubbclass = async () => {
    try {
      const config = {
        url: "/admin/updateSubClass",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          className: classsname,
          subclassName: subclasssname,
          authId: admin?._id,
          id: editsubclass,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose4();
        getaddsubclasss();
        return swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      return swal({
        title: "Opps!",
        text: error.response.data.error,
        icon: "success",
        button: "OK!",
      });
    }
  };
  // delete method
  const [deletesubclass, setdeletesubclass] = useState("");
  const deletesubclasss = async () => {
    try {
      const config = {
        url: "/admin/deleteSubClass/" + deletesubclass + "/" + admin?._id,
        method: "delete",
        baseURL: "http://localhost:8774/api",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios(config);
      if (res.status == 200) {
        handleClose5();
        getaddsubclasss();
        return swal({
          title: "Deteded!",
          text: res.data.success,
          icon: "warning",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Opps!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };

  const [View, setView] = useState({});
  const [show100, setShow100] = useState(false);
  const handleClose100 = () => setShow100(false);
  const handleShow100 = () => setShow100(true);
  const [show101, setShow101] = useState(false);
  const handleClose101 = () => setShow101(false);
  const handleShow101 = () => setShow101(true);
  
  // Pagination for subclass
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = getaddsubclass.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Calculate total pages
  const totalPages = Math.ceil(getaddsubclass.length / itemsPerPage);

  useEffect(() => {
    // Set initial loading for 5 seconds
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 5000);

    // Fetch data
    getaddsubclasss();
    getAddMedium();
    getallclassname();

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="mt-3" style={{ color: "#5140EB" }}>Loading Class Data...</h3>
          <p>Please wait while we prepare your data</p>
          <div className="progress mt-3" style={{ height: "6px", width: "300px" }}>
            <div 
              className="progress-bar progress-bar-striped progress-bar-animated" 
              role="progressbar" 
              style={{ width: "100%" }}
              aria-valuenow="100" 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Form.Group className="mb-3">
          <Form.Label>Search</Form.Label>
          <Form.Control type="text" placeholder="Search..." />
        </Form.Group>

        <div className="">
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
          <h2 className="header-c ">Subclass </h2>

          <Link onClick={handleShow3}>
            <Button2 text={"Add Subclass"} />
          </Link>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>Medium</th>
                <th>
                  <div>Class</div>
                </th>
                <th>
                  <div>Subclass</div>
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentItems?.map((val, i) => {
                return (
                  <tr key={val._id}>
                    <td>{i + 1 + indexOfFirstItem}</td>
                    <td>{val?.mediumName}</td>
                    <td>{val?.className}</td>
                    <td>{val?.subclassName}</td>
                    <td>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                          <BiSolidEdit
                            className="text-success"
                            style={{
                              cursor: "pointer",
                              fontSize: "20px",
                            }}
                            onClick={() => {
                              handleShow4();
                              seteditsubclass(val?._id);
                              setclasssname(val?.className);
                              setsubclasssname(val?.subclassName);
                              setmediumName(val?.mediumName);
                            }}
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{
                              cursor: "pointer",
                              fontSize: "20px",
                            }}
                            onClick={() => {
                              handleShow5(val?._id);
                              setdeletesubclass(val?._id);
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* Improved Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => paginate(currentPage - 1)}
                >
                  &laquo;
                </button>
              </li>
              
              {Array.from({ length: totalPages }, (_, i) => {
                // Show limited page numbers with ellipsis
                if (
                  i === 0 || 
                  i === totalPages - 1 || 
                  (i >= currentPage - 2 && i <= currentPage + 2)
                ) {
                  return (
                    <li 
                      key={i + 1} 
                      className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                    >
                      <button 
                        className="page-link" 
                        onClick={() => paginate(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  );
                } else if (i === 1 || i === totalPages - 2) {
                  return <li key={i + 1} className="page-item disabled"><span className="page-link">...</span></li>;
                }
                return null;
              })}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link" 
                  onClick={() => paginate(currentPage + 1)}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Edit Indian modal */}
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
          <Modal.Title style={{ color: "white" }}>Edit Class</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="do-sear mt-2">
            <label>Class</label>
            <input
              type="text"
              className="vi_0"
              placeholder="Enter Class"
              value={className}
              onChange={(e) => {
                setclassName(e.target.value);
              }}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button
            variant=""
            className="modal-add-btn"
            onClick={() => {
              updateclassname();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
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
            onClick={() => {
              deleteallclassname();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add board modal */}
      <Modal show={show3} onHide={handleClose3} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
          <Modal.Title style={{ color: "white" }}>Add Class </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="do-sear mt-2">
            <label>Medium</label>
            <select
              className="vi_0"
              onChange={(e) => setmediumName(e.target.value)}
            >
              <option value="">--Select medium--</option>
              {Medium?.map((item) => {
                return (
                  <option value={item?.mediumName}>{item?.mediumName}</option>
                );
              })}
            </select>
          </div>
          <div className="do-sear mt-2">
            <label>Class</label>
            <input
              type="text"
              placeholder="Enter Subject"
              className="vi_0"
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setclasssname(e.target.value);
                } else onChangeHandler(e.target.value, setclasssname);
              }}
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{classsname}</p>}
          </div>
          <div className="do-sear mt-2">
            <label>Sub-Class</label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setsubclasssname(e.target.value);
              }}
            >
              <option value="">Select Sub-Class</option>
              <option value="LKG">LKG</option>
              <option value="UKG">UKG</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button className="mx-2" variant="secondary" onClick={handleClose3}>
              Close
            </Button>
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={() => {
                subclassnamee();
              }}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Edit Transport modal */}
      <Modal
        show={show4}
        onHide={handleClose4}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
          <Modal.Title style={{ color: "white" }}>Edit Subclass</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="do-sear mt-2">
            <label>Medium</label>
            <select
              className="vi_0"
              onChange={(e) => setmediumName(e.target.value)}
            >
              <option value="">--Select medium--</option>
              {Medium?.map((item) => {
                return (
                  <option value={item?.mediumName}>{item?.mediumName}</option>
                );
              })}
            </select>
          </div>

          <div className="do-sear mt-2">
            <label>Class</label>
            <input
              type="text"
              placeholder={classsname}
              className="vi_0"
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setclasssname(e.target.value);
                } else onChangeHandler(e.target.value, setclasssname);
              }}
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{classsname}</p>}
          </div>
          <div className="do-sear mt-2">
            <label>Sub-Class</label>
            <input
              type="text"
              placeholder={subclasssname}
              className="vi_0"
              onChange={(e) => {
                if (selectedLanguage == "en-t-i0-und") {
                  setsubclasssname(e.target.value);
                } else onChangeHandler(e.target.value, setsubclasssname);
              }}
            />
            {selectedLanguage == "en-t-i0-und" ? <></> : <p>{subclasssname}</p>}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mx-2" variant="secondary" onClick={handleClose4}>
            Close
          </Button>
          <Button
            variant=""
            className="modal-add-btn"
            onClick={() => {
              editsubbclass();
            }}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show5}
        onHide={handleClose5}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-light">Warning</Modal.Title>
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
          <Button variant="secondary" onClick={handleClose5}>
            Close
          </Button>
          <Button
            variant=""
            className="modal-add-btn"
            onClick={() => {
              deletesubclasss();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminClass;
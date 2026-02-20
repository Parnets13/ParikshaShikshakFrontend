// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
// import { AiFillDelete, AiFillEye } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import "../Admin/Admin.css";
// import axios from "axios";
// import swal from "sweetalert";
// import moment from "moment";
// import { debounce } from "lodash";
// import { Link } from "react-router-dom";
// import Button2 from "../Button2";
// const Weightagecontent = () => {
//   const [show, setShow] = useState();
//   const [show1, setShow1] = useState();
//   const [show2, setShow2] = useState();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);
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

//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

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

//   // Post method Integration
//   const [mediumName, setmediumName] = useState("");
//   const [Subject, setSubject] = useState("");
//   const [Content, setContent] = useState("");

//   const addcontent = async () => {
//     try {
//       let config = {
//         url: "/admin/addweightage",
//         baseURL: "http://localhost:8774/api",
//         method: "post",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           Subject: Subject,
//           Content: Content,
//           authId: admin?._id,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200)
//         swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       handleClose();
//       getallweightagecontent();
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Try Again!",
//       });
//     }
//   };
//   //get method for medium
//   const [Medium, setMedium] = useState([]);
//   // const [nochangedata, setnochangedata] = useState([]);
//   const getAddMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status == 200) {
//         setMedium(res.data.success);
//         // setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //   get method for subjects
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
//   //   put method
//   const [editweightage, seteditweightage] = useState("");

//   const updatecontent = async () => {
//     try {
//       let config = {
//         url: "/admin/updateallcontent",
//         baseURL: "http://localhost:8774/api",
//         method: "put",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           Subject: Subject,
//           Content: Content,
//           authId: admin?._id,
//           id: editweightage,
//         },
//       };
//       const res = await axios(config);
//       if (res.status == 200)
//         swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       handleClose1();
//       getallweightagecontent();
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Try Again!",
//       });
//     }
//   };
//   // delete method
//   const [deletecontent, setdeletecontent] = useState("");

//   const deletallcontent = async () => {
//     try {
//       const res = await axios.delete(
//         `http://localhost:8774/api/admin/deleteweightage/${deletecontent}/${admin?._id}`,
//         {
//           headers: {
//             "content-type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (res.status === 200) {
//         swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//         handleClose2();
//         getallweightagecontent();
//       } else {
//         // Handle other status codes if needed
//         console.error("Unexpected status code:", res.status);
//       }
//     } catch (error) {
//       console.error("Error deleting content:", error.message);
//       swal({
//         title: "OOps!",
//         text: error.response?.data?.error || "Something went wrong",
//         icon: "error",
//         button: "Try Again!",
//       });
//     }
//   };

//   const [currenpage, setCurrentpage] = useState(1);
//   const recordsperpage = 6;
//   const lastIndex = currenpage * recordsperpage;
//   const firstIndex = lastIndex - recordsperpage;
//   const records = weightage.slice(firstIndex, lastIndex);
//   const npages = Math.ceil(weightage.length / recordsperpage);
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
//   useEffect(() => {
//     getSubject();
//     getallweightagecontent();
//     getAddMedium();
//   }, []);
//   console.log(subject);
//   console.log("weightage", weightage);
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
//           />
//         </div>
//       </div>
//       <div className="customerhead p-2">
//         <div className="d-flex justify-content-between align-items-center">
//           <h2 className="header-c ">Subject Part</h2>

//           <Link onClick={handleShow}>
//             <Button2 text={"Add Subject Part"} />
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
//                 <th>
//                   <div>Subject Part</div>
//                 </th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {records?.map((val, i) => {
//                 return (
//                   <tr key={i}>
//                     <td>{i + 1}</td>
//                     <td>{val?.mediumName}</td>
//                     <td>{val?.Subject}</td>
//                     <td>
//                       <p>{val?.Content}</p>
//                     </td>

//                     <td>
//                       {" "}
//                       <div style={{ display: "flex", gap: "20px" }}>
//                         <div>
//                           <BiSolidEdit
//                             className="text-success"
//                             style={{ cursor: "pointer", fontSize: "20px" }}
//                             onClick={() => {
//                               handleShow1();
//                               seteditweightage(val?._id);
//                               setContent(val?.Content);
//                             }}
//                           />{" "}
//                         </div>
//                         <div>
//                           <AiFillDelete
//                             className="text-danger"
//                             style={{ cursor: "pointer", fontSize: "20px" }}
//                             onClick={() => {
//                               handleShow2(val?._id);
//                               setdeletecontent(val?._id);
//                             }}
//                           />
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
//               {numbers?.map((n, i) => {
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
//         {/* Add Package modal */}
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>
//               Add Weightage Of the Content
//             </Modal.Title>
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
//                   {Medium?.map((item) => {
//                     return (
//                       <option value={item?.mediumName}>
//                         {item?.mediumName}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div className="do-sear">
//                 <label htmlFor="">Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setSubject(e.target.value);
//                   }}
//                 >
//                   <option value="">Select Subject</option>
//                   {subject
//                     ?.filter((ele) => ele.mediumName == mediumName)
//                     .map((val, i) => {
//                       return (
//                         <option value={val?.subjectName} key={i}>
//                           {val?.subjectName}
//                         </option>
//                       );
//                     })}
//                 </Form.Select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Content</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Board"
//                   className="vi_0"
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-unb") {
//                       setContent(e.target.value);
//                     } else onChangeHandler(e.target.value, setContent);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Content}</p>}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="d-flex">
//               <Button
//                 variant=""
//                 className="modal-close-btn"
//                 onClick={handleClose}
//               >
//                 Close
//               </Button>
//               <Button
//                 className="mx-2 modal-add-btn"
//                 variant=""
//                 onClick={() => {
//                   addcontent();
//                 }}
//               >
//                 Add
//               </Button>
//             </div>
//           </Modal.Footer>
//         </Modal>

//         {/* Edit Package modal */}
//         <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>
//               Edit Weightage Of the Content
//             </Modal.Title>
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
//                   {Medium?.map((item) => {
//                     return (
//                       <option value={item?.mediumName}>
//                         {item?.mediumName}
//                       </option>
//                     );
//                   })}
//                 </select>
//               </div>
//               <div className="do-sear">
//                 <label htmlFor="">Subject</label>
//                 <Form.Select
//                   aria-label="Default select example"
//                   onChange={(e) => {
//                     setSubject(e.target.value);
//                   }}
//                 >
//                   <option value="">Select Subject</option>
//                   {subject?.map((val, i) => {
//                     return (
//                       <option value={val?.subjectName} key={i}>
//                         {val?.subjectName}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </div>
//               <div className="do-sear mt-2">
//                 <label>Content</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Board"
//                   className="vi_0"
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-unb") {
//                       setContent(e.target.value);
//                     } else onChangeHandler(e.target.value, setContent);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Content}</p>}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="d-flex">
//               <Button
//                 variant=""
//                 className="modal-close-btn"
//                 onClick={handleClose1}
//               >
//                 Close
//               </Button>
//               <Button
//                 className="mx-2 modal-add-btn"
//                 variant=""
//                 onClick={() => {
//                   updatecontent();
//                 }}
//               >
//                 Edit
//               </Button>
//             </div>
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
//               onClick={() => {
//                 deletallcontent();
//               }}
//             >
//               Delete
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default Weightagecontent;
 
 
import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table, Spinner } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";
import { debounce } from "lodash";
import { Link } from "react-router-dom";
import Button2 from "../Button2";

const Weightagecontent = () => {
  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  
  //   Row Filter
  const [itempage, setItempage] = useState(5);

  //   DateRange Filter
  const [data, setData] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const filterData = () => {
    if (!startDate) return alert("Please select from date");
    if (!endDate) return alert("Please select to date");
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item?.createdAt);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
    setData([...filteredData]);
  };

  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

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

  // Post method Integration
  const [mediumName, setmediumName] = useState("");
  const [Subject, setSubject] = useState("");
  const [Content, setContent] = useState("");

  const addcontent = async () => {
    try {
      let config = {
        url: "/admin/addweightage",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          Subject: Subject,
          Content: Content,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200)
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      handleClose();
      getallweightagecontent();
    } catch (error) {
      console.log(error);
      swal({
        title: "Oops!",
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
  
  //   get method for subjects
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
  
  //   get method for weightage
  const [weightage, setweightage] = useState([]);
  const getallweightagecontent = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getallcontent"
      );
      if (res.status === 200) {
        setweightage(res.data.success);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 5000); // 5 seconds loader
    }
  };
  
  //   put method
  const [editweightage, seteditweightage] = useState("");

  const updatecontent = async () => {
    try {
      let config = {
        url: "/admin/updateallcontent",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          Subject: Subject,
          Content: Content,
          authId: admin?._id,
          id: editweightage,
        },
      };
      const res = await axios(config);
      if (res.status == 200)
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      handleClose1();
      getallweightagecontent();
    } catch (error) {
      console.log(error);
      swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "Try Again!",
      });
    }
  };
  
  // delete method
  const [deletecontent, setdeletecontent] = useState("");

  const deletallcontent = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8774/api/admin/deleteweightage/${deletecontent}/${admin?._id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
        handleClose2();
        getallweightagecontent();
      } else {
        console.error("Unexpected status code:", res.status);
      }
    } catch (error) {
      console.error("Error deleting content:", error.message);
      swal({
        title: "OOps!",
        text: error.response?.data?.error || "Something went wrong",
        icon: "error",
        button: "Try Again!",
      });
    }
  };

  // Enhanced Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  
  // Calculate pagination data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = weightage.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(weightage.length / itemsPerPage);
  
  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };
  
  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const halfVisible = Math.floor(maxVisiblePages / 2);
      let start = Math.max(1, currentPage - halfVisible);
      let end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1);
      }
      
      if (start > 1) {
        pageNumbers.push(1);
        if (start > 2) {
          pageNumbers.push('...');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) {
          pageNumbers.push('...');
        }
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  useEffect(() => {
    getSubject();
    getallweightagecontent();
    getAddMedium();
  }, []);
  
  console.log(subject);
  console.log("weightage", weightage);
  
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
          />
        </div>
      </div>
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Subject Part</h2>

          <Link onClick={handleShow}>
            <Button2 text={"Add Subject Part"} />
          </Link>
        </div>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" role="status" style={{ color: "#26AAE0" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p>Loading content... Please wait</p>
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
                    <th>Medium</th>
                    <th>Subject</th>
                    <th>
                      <div>Subject Part</div>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {currentItems?.map((val, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1 + (currentPage - 1) * itemsPerPage}</td>
                        <td>{val?.mediumName}</td>
                        <td>{val?.Subject}</td>
                        <td>
                          <p>{val?.Content}</p>
                        </td>

                        <td>
                          <div style={{ display: "flex", gap: "20px" }}>
                            <div>
                              <BiSolidEdit
                                className="text-success"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow1();
                                  seteditweightage(val?._id);
                                  setContent(val?.Content);
                                }}
                              />{" "}
                            </div>
                            <div>
                              <AiFillDelete
                                className="text-danger"
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => {
                                  handleShow2(val?._id);
                                  setdeletecontent(val?._id);
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

            {/* Enhanced Pagination */}
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
                
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <Pagination.Ellipsis key={index} disabled />
                  ) : (
                    <Pagination.Item
                      key={index}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Pagination.Item>
                  )
                ))}
                
                <Pagination.Next 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  disabled={currentPage === totalPages} 
                />
                <Pagination.Last 
                  onClick={() => handlePageChange(totalPages)} 
                  disabled={currentPage === totalPages} 
                />
              </Pagination>
              
              <div>
                <span>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, weightage.length)} of {weightage.length} entries
                </span>
              </div>
            </div>
          </>
        )}

        {/* Add Package modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>
              Add Weightage Of the Content
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Medium</label>
                <select
                  className="vi_0"
                  onChange={(e) => setmediumName(e.target.value)}
                >
                  <option value="">--Select medium--</option>
                  {Medium?.map((item) => {
                    return (
                      <option value={item?.mediumName}>
                        {item?.mediumName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="do-sear">
                <label htmlFor="">Subject</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                >
                  <option value="">Select Subject</option>
                  {subject
                    ?.filter((ele) => ele.mediumName == mediumName)
                    .map((val, i) => {
                      return (
                        <option value={val?.subjectName} key={i}>
                          {val?.subjectName}
                        </option>
                      );
                    })}
                </Form.Select>
              </div>
              <div className="do-sear mt-2">
                <label>Content</label>
                <input
                  type="text"
                  placeholder="Enter Board"
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-unb") {
                      setContent(e.target.value);
                    } else onChangeHandler(e.target.value, setContent);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Content}</p>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                variant=""
                className="modal-close-btn"
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={() => {
                  addcontent();
                }}
              >
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>
              Edit Weightage Of the Content
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Medium</label>
                <select
                  className="vi_0"
                  onChange={(e) => setmediumName(e.target.value)}
                >
                  <option value="">--Select medium--</option>
                  {Medium?.map((item) => {
                    return (
                      <option value={item?.mediumName}>
                        {item?.mediumName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="do-sear">
                <label htmlFor="">Subject</label>
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => {
                    setSubject(e.target.value);
                  }}
                >
                  <option value="">Select Subject</option>
                  {subject?.map((val, i) => {
                    return (
                      <option value={val?.subjectName} key={i}>
                        {val?.subjectName}
                      </option>
                    );
                  })}
                </Form.Select>
              </div>
              <div className="do-sear mt-2">
                <label>Content</label>
                <input
                  type="text"
                  placeholder="Enter Board"
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-unb") {
                      setContent(e.target.value);
                    } else onChangeHandler(e.target.value, setContent);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? <></> : <p>{Content}</p>}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                variant=""
                className="modal-close-btn"
                onClick={handleClose1}
              >
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={() => {
                  updatecontent();
                }}
              >
                Edit
              </Button>
            </div>
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
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose2}
            >
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={() => {
                deletallcontent();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Weightagecontent;
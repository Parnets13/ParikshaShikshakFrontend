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
// const AdminExam = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   const [show, setShow] = useState();
//   const [show1, setShow1] = useState();
//   const [show2, setShow2] = useState();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);

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

//   //Post
//   const [mediumName, setmediumName] = useState("");
//   const [NameExamination, setNameExamination] = useState("");
//   const AddNameExamination = async () => {
//     try {
//       let config = {
//         url: "/admin/addNameExamination",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           NameExamination: NameExamination,
//           authId: admin?._id,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose();
//         getNameExamination();
//         return swal({
//           title: "Yeah!",
//           text: res.data.error,
//           icon: "success",
//           dangerMode: true,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "oops!",
//         text: error.response.data.error,
//         icon: "error",
//         dangerMode: true,
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
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //get
//   const [NameExam, setNameExam] = useState([]);
//   const [nochangedata, setnochangedata] = useState([]);
//   const getNameExamination = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllNameExamination"
//       );
//       if (res.status == 200) {
//         setNameExam(res.data.success);
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   console.log("NameExam", NameExam);
//   //edit
//   const [updateNameExam, setupdateNameExam] = useState("");
//   const EditNameExam = async () => {
//     try {
//       let config = {
//         url: "/admin/updateNameExamination",
//         method: "put",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           NameExamination: NameExamination,
//           authId: admin?._id,
//           id: updateNameExam,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose1();
//         getNameExamination();
//         return swal({
//           title: "Yeah!!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };
//   //delete
//   const [deleteNameExam, setdeleteExamName] = useState("");
//   const DeleteNameExam = async () => {
//     try {
//       const config = {
//         url:
//           "/admin/deleteNameExamination/" + deleteNameExam + "/" + admin?._id,
//         method: "delete",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application-data",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       let res = await axios(config);
//       if (res.status == 200) {
//         handleClose2();
//         getNameExamination();
//         return swal({
//           title: "Yeah!",
//           text: "Successfully Deleted",
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "Ok!",
//       });
//     }
//   };
//   //   Row Filter
//   const [itempage, setItempage] = useState(5);

//   const [searchH, setSearchH] = useState("");
//   const handleFilterH = (e) => {
//     if (e.target.value != "") {
//       setSearchH(e.target.value);
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) =>
//           String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())
//         )
//       );
//       setNameExam([...filterTableH]);
//     } else {
//       setSearchH(e.target.value);
//       setNameExam([...nochangedata]);
//     }
//   };
//   const [searchTermH, setSearchTermH] = useState("");
//   const searchedProductH = NameExam.filter((item) => {
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
//   const [pageNumber, setPageNumber] = useState(0);
//   const productPerPage = 5;
//   const visitedPage = pageNumber * productPerPage;
//   const displayPage = NameExam.slice(visitedPage, visitedPage + productPerPage);
//   const pageCount = Math.ceil(NameExam.length / productPerPage);
//   useEffect(() => {
//     getNameExamination();
//     getAddMedium();
//   }, []);

//   // newpagination
//   const [data1, setData1] = useState([]);
//   const [Products, setProducts] = useState();

//   const [currenpage, setCurrentpage] = useState(1);
//   const recordsperpage = 6;
//   const lastIndex = currenpage * recordsperpage;
//   const firstIndex = lastIndex - recordsperpage;
//   const records = NameExam.slice(firstIndex, lastIndex);
//   const npages = Math.ceil(NameExam.length / recordsperpage);
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
//           <h2 className="header-c ">Name Of Examination</h2>

//           <Link onClick={handleShow}>
//             <Button2 text={"Add Exam"} />
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
//                   <div>Name Of Examination</div>
//                 </th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {records?.map((item, i) => {
//                 return (
//                   <tr>
//                     <td>{i + 1 + visitedPage}</td>
//                     <td>{item?.mediumName}</td>
//                     <td>{item?.NameExamination}</td>

//                     <td>
//                       {" "}
//                       <div style={{ display: "flex", gap: "20px" }}>
//                         <div>
//                           <BiSolidEdit
//                             className="text-success"
//                             style={{ cursor: "pointer", fontSize: "20px" }}
//                             onClick={() => {
//                               handleShow1();
//                               setupdateNameExam(item);
//                               setNameExamination(item?.NameExamination);
//                             }}
//                           />{" "}
//                         </div>
//                         <div>
//                           <AiFillDelete
//                             className="text-danger"
//                             style={{ cursor: "pointer", fontSize: "20px" }}
//                             onClick={() => {
//                               setdeleteExamName(item?._id);
//                               handleShow2();
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
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>Add Exam s</Modal.Title>
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
//               <div className="do-sear mt-2">
//                 <label>Name Of Examination</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Name"
//                   className="vi_0"
//                   onChange={(e) => {
//                     if (selectedLanguage == "em-t-i0-und") {
//                       setNameExamination(e.target.value);
//                     } else onChangeHandler(e.target.value, setNameExamination);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{NameExamination}</p>
//                 )}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="d-flex">
//               <Button
//                 className="mx-2"
//                 variant="secondary"
//                 onClick={handleClose}
//               >
//                 Close
//               </Button>
//               <Button
//                 className="mx-2"
//                 variant=""
//                 style={{ backgroundColor: "green", color: "white" }}
//                 onClick={() => {
//                   AddNameExamination();
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
//             <Modal.Title style={{ color: "white" }}>Edit Exam</Modal.Title>
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
//               <div className="do-sear mt-2">
//                 <label>Name Of Examination</label>
//                 <input
//                   type="text"
//                   className="vi_0"
//                   placeholder={NameExamination}
//                   // value={NameExamination}
//                   onChange={(e) => {
//                     if (selectedLanguage == "em-t-i0-und") {
//                       setNameExamination(e.target.value);
//                     } else onChangeHandler(e.target.value, setNameExamination);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{NameExamination}</p>
//                 )}
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
//               onClick={() => {
//                 EditNameExam();
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
//             <Button variant="secondary" onClick={handleClose2}>
//               Close
//             </Button>
//             <Button
//               variant=""
//               className="modal-add-btn"
//               onClick={() => {
//                 DeleteNameExam();
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

// export default AdminExam;
 
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

const AdminExam = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // Loading state
  const [loading, setLoading] = useState(false);

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

  //Post
  const [mediumName, setmediumName] = useState("");
  const [NameExamination, setNameExamination] = useState("");
  const AddNameExamination = async () => {
    try {
      setLoading(true);
      let config = {
        url: "/admin/addNameExamination",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          NameExamination: NameExamination,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose();
        getNameExamination();
        return swal({
          title: "Yeah!",
          text: res.data.error,
          icon: "success",
          dangerMode: true,
        });
      }
    } catch (error) {
      console.log(error);
      return swal({
        title: "oops!",
        text: error.response.data.error,
        icon: "error",
        dangerMode: true,
      });
    } finally {
      setLoading(false);
    }
  };
  //get method for medium
  const [Medium, setMedium] = useState([]);
  const getAddMedium = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status == 200) {
        setMedium(res.data.success);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //get
  const [NameExam, setNameExam] = useState([]);
  const [nochangedata, setnochangedata] = useState([]);
  const getNameExamination = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllNameExamination"
      );
      if (res.status == 200) {
        setNameExam(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  //edit
  const [updateNameExam, setupdateNameExam] = useState("");
  const EditNameExam = async () => {
    try {
      setLoading(true);
      let config = {
        url: "/admin/updateNameExamination",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          NameExamination: NameExamination,
          authId: admin?._id,
          id: updateNameExam,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose1();
        getNameExamination();
        return swal({
          title: "Yeah!!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      return swal({
        title: "oops!",
        text: error.response.data.error,
        icon: "error",
        button: "Ok!",
      });
    } finally {
      setLoading(false);
    }
  };
  //delete
  const [deleteNameExam, setdeleteExamName] = useState("");
  const DeleteNameExam = async () => {
    try {
      setLoading(true);
      const config = {
        url:
          "/admin/deleteNameExamination/" + deleteNameExam + "/" + admin?._id,
        method: "delete",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application-data",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose2();
        getNameExamination();
        return swal({
          title: "Yeah!",
          text: "Successfully Deleted",
          icon: "success",
          button: "Ok!",
        });
      }
    } catch (error) {
      console.log(error);
      return swal({
        title: "oops!",
        text: error.response.data.error,
        icon: "error",
        button: "Ok!",
      });
    } finally {
      setLoading(false);
    }
  };
  // Row Filter
  const [searchH, setSearchH] = useState("");
  const handleFilterH = (e) => {
    if (e.target.value != "") {
      setSearchH(e.target.value);
      const filterTableH = nochangedata.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())
        )
      );
      setNameExam([...filterTableH]);
    } else {
      setSearchH(e.target.value);
      setNameExam([...nochangedata]);
    }
  };
  const [searchTermH, setSearchTermH] = useState("");
  const searchedProductH = NameExam.filter((item) => {
    if (searchTermH.value === "") {
      return item;
    }
    if (item?.EName?.toLowerCase().includes(searchTermH?.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });

  // Enhanced Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = NameExam.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(NameExam.length / recordsPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);
    
    if (currentPage <= 3) {
      end = Math.min(5, totalPages);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - 4, 1);
    }
    
    return Array.from({length: end - start + 1}, (_, i) => start + i);
  };

  useEffect(() => {
    getNameExamination();
    getAddMedium();
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-container">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
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
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c">Name Of Examination</h2>
          <Link onClick={handleShow}>
            <Button2 text={"Add Exam"} />
          </Link>
        </div>

        <div className="mb-3">
          <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
            <thead>
              <tr>
                <th>S.No</th>
                <th>Medium</th>
                <th>Name Of Examination</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1 + (currentPage - 1) * recordsPerPage}</td>
                    <td>{item?.mediumName}</td>
                    <td>{item?.NameExamination}</td>
                    <td>
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                          <BiSolidEdit
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow1();
                              setupdateNameExam(item);
                              setNameExamination(item?.NameExamination);
                            }}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setdeleteExamName(item?._id);
                              handleShow2();
                            }}
                          />{" "}
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
        <div className="d-flex justify-content-center">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={prevPage}>
                  &laquo;
                </button>
              </li>
              
              {currentPage > 3 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => changePage(1)}>
                    1
                  </button>
                </li>
              )}
              
              {currentPage > 4 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              
              {getPaginationGroup().map((number) => (
                <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => changePage(number)}>
                    {number}
                  </button>
                </li>
              ))}
              
              {currentPage < totalPages - 3 && (
                <li className="page-item disabled">
                  <span className="page-link">...</span>
                </li>
              )}
              
              {currentPage < totalPages - 2 && (
                <li className="page-item">
                  <button className="page-link" onClick={() => changePage(totalPages)}>
                    {totalPages}
                  </button>
                </li>
              )}
              
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={nextPage}>
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>Add Exam</Modal.Title>
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
              <div className="do-sear mt-2">
                <label>Name Of Examination</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "em-t-i0-und") {
                      setNameExamination(e.target.value);
                    } else onChangeHandler(e.target.value, setNameExamination);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{NameExamination}</p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button
                className="mx-2"
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Close
              </Button>
              <Button
                className="mx-2"
                variant=""
                style={{ backgroundColor: "green", color: "white" }}
                onClick={() => {
                  AddNameExamination();
                }}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add'}
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal
          show={show1}
          onHide={handleClose1}
          backdrop="static"
          keyboard={false}
          style={{ zIndex: "99999" }}
        >
          <Modal.Header
            closeButton
            style={{ backgroundColor: "rgb(40 167 223)" }}
          >
            <Modal.Title style={{ color: "white" }}>Edit Exam</Modal.Title>
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
              <div className="do-sear mt-2">
                <label>Name Of Examination</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder={NameExamination}
                  onChange={(e) => {
                    if (selectedLanguage == "em-t-i0-und") {
                      setNameExamination(e.target.value);
                    } else onChangeHandler(e.target.value, setNameExamination);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{NameExamination}</p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose1} disabled={loading}>
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={() => {
                EditNameExam();
              }}
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update'}
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
            <Button variant="secondary" onClick={handleClose2} disabled={loading}>
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={() => {
                DeleteNameExam();
              }}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default AdminExam;
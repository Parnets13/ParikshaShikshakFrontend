// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
// import { AiFillDelete, AiFillEye } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// import "../Admin/Admin.css";
// import axios from "axios";
// import swal from "sweetalert";
// import { debounce } from "lodash";
// import Button2 from "../Button2";
// import { Link } from "react-router-dom";
// const AdminMedium = () => {
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

//   //Post method
//   const [mediumName, setmediumName] = useState("");
//   const Addmedium = async () => {
//     try {
//       const config = {
//         url: "/admin/addMedium",
//         baseURL: "http://localhost:8774/api",
//         method: "post",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           authId: admin?._id,
//         },
//       };

//       let res = await axios(config);
//       if (res.status === 200) {
//         swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           dangerMode: true,
//         });
//         handleClose();
//         getAddMedium();
//       }
//     } catch (error) {
//       console.log(error);
//       handleClose();
//       swal({
//         title: "Oops",
//         text: error.response.data.error,
//         icon: "error",
//         dangerMode: true,
//       });
//     }
//   };

//   //get method for medium
//   const [Medium, setMedium] = useState([]);
//   const [nochangedata, setnochangedata] = useState([]);
//   const getAddMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status === 200) {
//         setMedium(res.data.success);
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //edit
//   const [updatemediumname, setupdatemediumname] = useState("");

//   const EditAddMedium = async () => {
//     try {
//       const config = {
//         url: "/admin/updateMedium",
//         method: "put",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           mediumName: mediumName,
//           authId: admin?._id,
//           id: updatemediumname,
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         getAddMedium();
//         handleClose1();
//         return swal({
//           title: "Success!",
//           text: res.data.success,
//           icon: "success",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       handleClose1();
//       swal({
//         title: "Error!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };
//   //delete
//   const [deleteA, setDeleteA] = useState("");
//   const DeletAddMedium = async () => {
//     try {
//       const config = {
//         url: "/admin/deleteMedium/" + deleteA + "/" + admin?._id,
//         baseURL: "http://localhost:8774/api",
//         method: "delete",
//         headers: {
//           "content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose2();
//         getAddMedium();
//         return swal({
//           title: "Delete!",
//           text: res.data.success,
//           icon: "warning",
//           button: "OK!",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       handleClose2();
//       swal({
//         title: "Error!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };

//   //search filter for about us
//   const [searchH, setSearchH] = useState("");
//   const handleFilterH = (e) => {
//     if (e.target.value != "") {
//       setSearchH(e.target.value);
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) =>
//           String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())
//         )
//       );
//       setMedium([...filterTableH]);
//     } else {
//       setSearchH(e.target.value);
//       setMedium([...nochangedata]);
//     }
//   };
//   const [searchTermH, setSearchTermH] = useState("");
//   const searchedProductH = Medium.filter((item) => {
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
//   const productPerPage = 10;
//   const visitedPage = pageNumber * productPerPage;
//   const displayPage = Medium.slice(visitedPage, visitedPage + productPerPage);
//   const pageCount = Math.ceil(Medium.length / productPerPage);

//   useEffect(() => {
//     getAddMedium();
//   }, []);
//   console.log(Medium);

//   // newpagination
//   const [data1, setData1] = useState([]);
//   const [Products, setProducts] = useState();

//   const [currenpage, setCurrentpage] = useState(1);
//   const recordsperpage = 6;
//   const lastIndex = currenpage * recordsperpage;
//   const firstIndex = lastIndex - recordsperpage;
//   const records = Medium.slice(firstIndex, lastIndex);
//   const npages = Math.ceil(Medium.length / recordsperpage);
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
//           <h2 className="header-c ">Medium</h2>

//           <Link onClick={handleShow}>
//             {" "}
//             <Button2 text={"Add Medium"} />
//           </Link>
//         </div>

//         <div className="mb-3">
//           <Table
//             responsive
//             bordered
//             style={{ width: "-webkit-fill-available" }}
//           >
//             <thead style={{ border: "1px solid black" }}>
//               <tr>
//                 <th>S.No</th>
//                 <th>Medium</th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {records?.map((item, i) => {
//                 return (
//                   <tr className="text-center">
//                     <td>{i + 1 + visitedPage}</td>

//                     <td>{item?.mediumName}</td>

//                     <td>
//                       {" "}
//                       <div
//                         style={{
//                           display: "flex",
//                           gap: "20px",
//                           justifyContent: "space-around",
//                         }}
//                       >
//                         <div>
//                           <BiSolidEdit
//                             className="text-success"
//                             style={{ cursor: "pointer", fontSize: "20px" }}
//                             onClick={() => {
//                               handleShow1(item);
//                               setupdatemediumname(item?._id);
//                               setmediumName(item?.mediumName);
//                             }}
//                           />{" "}
//                         </div>
//                         <div>
//                           <AiFillDelete
//                             className="text-danger"
//                             style={{ cursor: "pointer", fontSize: "20px" }}
//                             onClick={() => {
//                               setDeleteA(item?._id);
//                               handleShow2(item?._id);
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
//         {/* Add Package modal */}
//         <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
//           <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
//             <Modal.Title style={{ color: "white" }}>Add Medium</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Medium</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Medium"
//                   className="vi_0"
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-und") {
//                       setmediumName(e.target.value);
//                     } else onChangeHandler(e.target.value, setmediumName);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{mediumName}</p>
//                 )}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <div className="d-flex">
//               <Button variant="secondary" onClick={handleClose}>
//                 Close
//               </Button>
//               <Button
//                 className="mx-2 modal-add-btn"
//                 variant=""
//                 onClick={() => {
//                   Addmedium();
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
//             <Modal.Title style={{ color: "white" }}>Edit Medium</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="row">
//               <div className="do-sear mt-2">
//                 <label>Medium</label>
//                 <input
//                   type="text"
//                   placeholder="Enter Medium"
//                   className="vi_0"
//                   // value={mediumName}
//                   onChange={(e) => {
//                     if (selectedLanguage == "en-t-i0-und") {
//                       setmediumName(e.target.value);
//                     } else onChangeHandler(e.target.value, setmediumName);
//                   }}
//                 />
//                 {selectedLanguage == "en-t-i0-und" ? (
//                   <></>
//                 ) : (
//                   <p>{mediumName}</p>
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
//                 EditAddMedium();
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
//                 DeletAddMedium();
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

// export default AdminMedium;
 
 
 import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import { debounce } from "lodash";
import Button2 from "../Button2";
import { Link } from "react-router-dom";

const AdminMedium = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  const [initialLoading, setInitialLoading] = useState(true); // Added loading state

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

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

  //Post method
  const [mediumName, setmediumName] = useState("");
  const Addmedium = async () => {
    try {
      const config = {
        url: "/admin/addMedium",
        baseURL: "http://localhost:8774/api",
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          authId: admin?._id,
        },
      };

      let res = await axios(config);
      if (res.status === 200) {
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          dangerMode: true,
        });
        handleClose();
        getAddMedium();
      }
    } catch (error) {
      console.log(error);
      handleClose();
      swal({
        title: "Oops",
        text: error.response.data.error,
        icon: "error",
        dangerMode: true,
      });
    }
  };

  //get method for medium
  const [Medium, setMedium] = useState([]);
  const [nochangedata, setnochangedata] = useState([]);
  const getAddMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getAllMedium"
      );
      if (res.status === 200) {
        setMedium(res.data.success);
        setnochangedata(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //edit
  const [updatemediumname, setupdatemediumname] = useState("");

  const EditAddMedium = async () => {
    try {
      const config = {
        url: "/admin/updateMedium",
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          mediumName: mediumName,
          authId: admin?._id,
          id: updatemediumname,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        getAddMedium();
        handleClose1();
        return swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      handleClose1();
      swal({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };
  //delete
  const [deleteA, setDeleteA] = useState("");
  const DeletAddMedium = async () => {
    try {
      const config = {
        url: "/admin/deleteMedium/" + deleteA + "/" + admin?._id,
        baseURL: "http://localhost:8774/api",
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status === 200) {
        handleClose2();
        getAddMedium();
        return swal({
          title: "Delete!",
          text: res.data.success,
          icon: "warning",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      handleClose2();
      swal({
        title: "Error!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };

  //search filter for about us
  const [searchH, setSearchH] = useState("");
  const handleFilterH = (e) => {
    if (e.target.value != "") {
      setSearchH(e.target.value);
      const filterTableH = nochangedata.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k])?.toLowerCase().includes(e.target.value?.toLowerCase())
        )
      );
      setMedium([...filterTableH]);
    } else {
      setSearchH(e.target.value);
      setMedium([...nochangedata]);
    }
  };
  const [searchTermH, setSearchTermH] = useState("");
  const searchedProductH = Medium.filter((item) => {
    if (searchTermH.value === "") {
      return item;
    }
    if (item?.EName?.toLowerCase().includes(searchTermH?.toLowerCase())) {
      return item;
    } else {
      return console.log("not found");
    }
  });
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 10;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = Medium.slice(visitedPage, visitedPage + productPerPage);
  const pageCount = Math.ceil(Medium.length / productPerPage);

  // newpagination
  const [data1, setData1] = useState([]);
  const [Products, setProducts] = useState();

  const [currenpage, setCurrentpage] = useState(1);
  const recordsperpage = 6;
  const lastIndex = currenpage * recordsperpage;
  const firstIndex = lastIndex - recordsperpage;
  const records = Medium.slice(firstIndex, lastIndex);
  const npages = Math.ceil(Medium.length / recordsperpage);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  function changePage(id) {
    setCurrentpage(id);
  }

  function prevpage() {
    if (currenpage !== 1) {
      setCurrentpage(currenpage - 1);
    }
  }

  function nextpage() {
    if (currenpage !== npages) {
      setCurrentpage(currenpage + 1);
    }
  }

  useEffect(() => {
    // Set initial loading for 5 seconds
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 500);

    // Fetch data
    getAddMedium();

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="mt-3" style={{ color: "#5140EB" }}>Loading Medium Data...</h3>
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
          <h2 className="header-c ">Medium</h2>

          <Link onClick={handleShow}>
            {" "}
            <Button2 text={"Add Medium"} />
          </Link>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead style={{ border: "1px solid black" }}>
              <tr>
                <th>S.No</th>
                <th>Medium</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {records?.map((item, i) => {
                return (
                  <tr className="text-center">
                    <td>{i + 1 + (currenpage - 1) * recordsperpage}</td>

                    <td>{item?.mediumName}</td>

                    <td>
                      {" "}
                      <div
                        style={{
                          display: "flex",
                          gap: "20px",
                          justifyContent: "space-around",
                        }}
                      >
                        <div>
                          <BiSolidEdit
                            className="text-success"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              handleShow1(item);
                              setupdatemediumname(item?._id);
                              setmediumName(item?.mediumName);
                            }}
                          />{" "}
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setDeleteA(item?._id);
                              handleShow2(item?._id);
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

        <div>
          <nav>
            <ul className="pagination">
              <li className="not-allow">
                <span>
                  <li className="next-prev">
                    <a
                      onClick={() => {
                        prevpage();
                      }}
                    >
                      &lt;
                    </a>{" "}
                  </li>
                </span>
              </li>
              {numbers?.map((n, i) => {
                return (
                  <li className={`active-next ${currenpage === n ? 'active' : ''}`} key={i}>
                    <a
                      href="#"
                      className={currenpage === n ? 'active' : 'inactive'}
                      onClick={() => changePage(n)}
                    >
                      {n}
                    </a>
                  </li>
                );
              })}

              <li className="not-allow">
                <span>
                  <li
                    className="next-prev"
                    onClick={() => {
                      nextpage();
                    }}
                  >
                    &gt;{" "}
                  </li>
                </span>
              </li>
            </ul>
          </nav>
        </div>
        {/* Add Package modal */}
        <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
          <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
            <Modal.Title style={{ color: "white" }}>Add Medium</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Medium</label>
                <input
                  type="text"
                  placeholder="Enter Medium"
                  className="vi_0"
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      setmediumName(e.target.value);
                    } else onChangeHandler(e.target.value, setmediumName);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{mediumName}</p>
                )}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="mx-2 modal-add-btn"
                variant=""
                onClick={() => {
                  Addmedium();
                }}
              >
                Add
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
            <Modal.Title style={{ color: "white" }}>Edit Medium</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="do-sear mt-2">
                <label>Medium</label>
                <input
                  type="text"
                  placeholder="Enter Medium"
                  className="vi_0"
                  // value={mediumName}
                  onChange={(e) => {
                    if (selectedLanguage == "en-t-i0-und") {
                      setmediumName(e.target.value);
                    } else onChangeHandler(e.target.value, setmediumName);
                  }}
                />
                {selectedLanguage == "en-t-i0-und" ? (
                  <></>
                ) : (
                  <p>{mediumName}</p>
                )}
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
              onClick={() => {
                EditAddMedium();
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
                DeletAddMedium();
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

export default AdminMedium;
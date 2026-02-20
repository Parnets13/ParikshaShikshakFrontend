// import React, { useEffect, useState } from "react";
// import "../LoginPage3/LoginPage3.css";
// import Form from "react-bootstrap/Form";
// import { Button, FormLabel } from "react-bootstrap";
// import axios from "axios";
// import swal from "sweetalert";
// import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
// import logo from "./../../assets/logo.png";
// import Select from "react-select";

// const LoginPage3 = () => {
//   const { state } = useLocation();
//   console.log("state==>", state);
//   const user = JSON.parse(localStorage.getItem("user"));

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const [School_Logo, setSchool_Logo] = useState("");
//   const [SchoolAddress, setSchoolAddress] = useState("");
//   const [Institute_Name, setInstitute_Name] = useState("");
//   const [Subject, setSubject] = useState("");
//   const [Test_Date, setTest_Date] = useState("");
//   const [Size_ofthe_Question, setSize_ofthe_Question] = useState("A4");
//   const [ExamTime, setExamTime] = useState("");
//   const [medium, setMedium] = useState("");
//   const [mediums, setMediums] = useState([]);
//   const [subjectOptions, setSubjectOptions] = useState([]);
//   const generate = async () => {
//     // alert("Callling")
//     try {
//       const config = {
//         url: "/teacher/upadeteQuestionPaper",
//         baseURL: "http://localhost:8774/api",
//         method: "put",
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           School_Logo: School_Logo,
//           Institute_Name: Institute_Name,
//           Subject: Subject,
//           Test_Date: Test_Date,
//           Size_ofthe_Question: Size_ofthe_Question,
//           id: state?._id,
//           authId: user?._id,
//           teacherId: user?._id,
//           teacheName: user?.FirstName,
//           ExamTime: ExamTime,
//           SchoolAddress: SchoolAddress,
//         },
//       };

//       let res = await axios(config);

//       if (res.status == 200) {
//         swal({
//           title: "Yeah!",
//           text: "view blue print !!!",
//           icon: "success",
//           button: "OK!",
//         });
//         navigate("/loginpage5", { state: res.data.success });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };

//   const [subject, setsubject] = useState([]);
//   const getSubject = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSujects"
//       );
//       if (res.status === 200) {
//         // Convert subjects to an array format required by react-select
//         const options = res.data.success.map((item) => ({
//           value: item.subjectName,
//           label: item.subjectName,
//         }));
//         setSubjectOptions(options);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getSubject();
//   }, []);

//   const getMediums = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status === 200) {
//         setMediums(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMediums();
//   }, []);

//   if (!user) {
//     alert("Please login");
//     return window.location.assign("/");
//   }
//   return (
//     <div>
//       <div className="container p-3">
//         <div>
//           <div className="box">
//             <div className="row">
//               <div className="col-md-6 gfffg">
//                 <div
//                   className="login3-bg"
//                   style={{
//                     padding: "150px 0px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <img
//                     src={logo}
//                     alt=""
//                     style={{
//                       width: "250px",
//                       height: "100px",
//                     }}
//                   />
//                   <div className="line-1 mt-10">
//                     <h2>
//                       {" "}
//                       <p className="anim-typewriter text-dark">
//                         Welcome{" "}
//                         <span className="text-uppercase Lato-regular">
//                           {" "}
//                           {user?.FirstName}
//                         </span>{" "}
//                         <span className="text-uppercase Lato-regular">
//                           {user?.LastName}!{" "}
//                         </span>
//                       </p>
//                       <span className="fs-4" style={{ textAlign: "center" }}>
//                         Start Generating Your Paper
//                       </span>
//                     </h2>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 yoihjij ">
//                 <Form className="pe-2 pt-3">
//                   <Form.Group controlId="formFile" className="mb-2">
//                     {state?.userType == "Teacher" ? (
//                       <>
//                         {" "}
//                         <Form.Label
//                           className="fs-6 fw-bold"
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           School Logo
//                         </Form.Label>
//                         <Form.Control
//                           type="file"
//                           onChange={(e) => {
//                             setSchool_Logo(e.target.files[0]);
//                           }}
//                         />
//                         <Form.Label
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           School / Institute Name
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your School / Institute Name"
//                           onChange={(e) => {
//                             setInstitute_Name(e.target.value);
//                           }}
//                         />
//                         <Form.Label
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Address Details
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your Address Details"
//                           onChange={(e) => {
//                             setSchoolAddress(e.target.value);
//                           }}
//                         />
//                       </>
//                     ) : (
//                       <></>
//                     )}

//                     <Form.Label
//                       className="fs-6 fw-bold mt-2 "
//                       style={{ letterSpacing: "0.5px" }}
//                     ></Form.Label>
//                     <Form.Group>
//                       <Form.Label>Subject</Form.Label>
//                       <Select
//                         options={subjectOptions}
//                         onChange={(selectedOption) =>
//                           setSubject(selectedOption.value)
//                         }
//                         placeholder="Select the Subject"
//                         isSearchable
//                       />
//                     </Form.Group>

//                     <div className="row">
//                       <div className="col-md-6">
//                         <FormLabel
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Exam Date
//                         </FormLabel>
//                         <Form.Control
//                           type="date"
//                           placeholder="Enter the Test Paper Name"
//                           onChange={(e) => {
//                             setTest_Date(e.target.value);
//                           }}
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         <FormLabel
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Exam Time
//                         </FormLabel>
//                         <Form.Control
//                           type="time"
//                           placeholder="Enter the Test Paper Name"
//                           onChange={(e) => {
//                             setExamTime(e.target.value);
//                           }}
//                         />
//                       </div>
//                     </div>

//                     <FormLabel
//                       className="fs-6 fw-bold mt-2 "
//                       style={{ letterSpacing: "0.5px" }}
//                     >
//                       Size of the Question Paper
//                     </FormLabel>
//                     <Form.Control
//                       value="A4"
//                       type="text"
//                       placeholder="Enter the 
//                       Size of the Question Paper (Recommended-A4)"
//                       readOnly
//                       onChange={(e) => {
//                         setSize_ofthe_Question(e.target.value);
//                       }}
//                     />
//                   </Form.Group>
//                   <a style={{ textDecoration: "none" }}>
//                     <Button
//                       style={{
//                         margin: "auto",
//                         display: "flex",
//                         justifyContent: "center",
//                         background: "green",
//                         // margin: "20px auto",
//                       }}
//                       onClick={() => generate()}
//                     >
//                       Save
//                     </Button>
//                   </a>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage3;
  
 
//  import React, { useEffect, useState } from "react";
// import "../LoginPage3/LoginPage3.css";
// import Form from "react-bootstrap/Form";
// import { Button, FormLabel } from "react-bootstrap";
// import axios from "axios";
// import swal from "sweetalert";
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from "./../../assets/logo.png";
// import Select from "react-select";

// const LoginPage3 = () => {
//   const { state } = useLocation();
//   console.log("state==>", state);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
  
//   const [School_Logo, setSchool_Logo] = useState("");
//   const [SchoolAddress, setSchoolAddress] = useState("");
//   const [Institute_Name, setInstitute_Name] = useState("");
//   const [Subject, setSubject] = useState("");
//   const [Test_Date, setTest_Date] = useState("");
//   const [Size_ofthe_Question, setSize_ofthe_Question] = useState("A4");
//   const [ExamTime, setExamTime] = useState("");
//   const [medium, setMedium] = useState("");
//   const [mediums, setMediums] = useState([]);
//   const [subjectOptions, setSubjectOptions] = useState([]);
//   const [filteredSubjects, setFilteredSubjects] = useState([]);

//   const generate = async () => {
//     try {
//       const config = {
//         url: "/teacher/upadeteQuestionPaper",
//         baseURL: "http://localhost:8774/api",
//         method: "put",
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           School_Logo: School_Logo,
//           Institute_Name: Institute_Name,
//           Subject: Subject,
//           Test_Date: Test_Date,
//           Size_ofthe_Question: Size_ofthe_Question,
//           id: state?._id,
//           authId: user?._id,
//           teacherId: user?._id,
//           teacheName: user?.FirstName,
//           ExamTime: ExamTime,
//           SchoolAddress: SchoolAddress,
//         },
//       };

//       let res = await axios(config);

//       if (res.status == 200) {
//         swal({
//           title: "Yeah!",
//           text: "view blue print !!!",
//           icon: "success",
//           button: "OK!",
//         });
//         navigate("/loginpage5", { state: res.data.success });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };

//   const getSubject = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSujects"
//       );
//       if (res.status === 200) {
//         if (state?.Sub_Class) {
//           // Filter subjects based on the Sub_Class from state
//           const filtered = res.data.success.filter(
//             ele => ele.subClass?.subclassName === state.Sub_Class&&ele.mediumName===state.Medium
//           );
//           setFilteredSubjects(filtered);
          
//           // Convert filtered subjects to options for react-select
//           const options = filtered.map((item) => ({
//             value: item.subjectName,
//             label: item.subjectName,
//           }));
//           setSubjectOptions(options);
          
//           // Set the first subject as default if available
//           if (filtered.length > 0) {
//             setSubject(filtered[0].subjectName);
//           }
//         } else {
//           // If no Sub_Class is provided, show all subjects
//           const options = res.data.success.map((item) => ({
//             value: item.subjectName,
//             label: item.subjectName,
//           }));
//           setSubjectOptions(options);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getSubject();
//   }, [state?.Sub_Class]); // Add dependency to re-run when Sub_Class changes

//   const getMediums = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status === 200) {
//         setMediums(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMediums();
//   }, []);

//   if (!user) {
//     alert("Please login");
//     return window.location.assign("/");
//   }

//   return (
//     <div>
//       <div className="container p-3">
//         <div>
//           <div className="box">
//             <div className="row">
//               <div className="col-md-6 gfffg">
//                 <div
//                   className="login3-bg"
//                   style={{
//                     padding: "150px 0px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <img
//                     src={logo}
//                     alt=""
//                     style={{
//                       width: "250px",
//                       height: "100px",
//                     }}
//                   />
//                   <div className="line-1 mt-10">
//                     <h2>
//                       {" "}
//                       <p className="anim-typewriter text-dark">
//                         Welcome{" "}
//                         <span className="text-uppercase Lato-regular">
//                           {" "}
//                           {user?.FirstName}
//                         </span>{" "}
//                         <span className="text-uppercase Lato-regular">
//                           {user?.LastName}!{" "}
//                         </span>
//                       </p>
//                       <span className="fs-4" style={{ textAlign: "center" }}>
//                         Start Generating Your Paper
//                       </span>
//                     </h2>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 yoihjij ">
//                 <Form className="pe-2 pt-3">
//                   <Form.Group controlId="formFile" className="mb-2">
//                     {state?.userType == "Teacher" ? (
//                       <>
//                         {" "}
//                         <Form.Label
//                           className="fs-6 fw-bold"
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           School Logo
//                         </Form.Label>
//                         <Form.Control
//                           type="file"
//                           onChange={(e) => {
//                             setSchool_Logo(e.target.files[0]);
//                           }}
//                         />
//                         <Form.Label
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           School / Institute Name
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your School / Institute Name"
//                           onChange={(e) => {
//                             setInstitute_Name(e.target.value);
//                           }}
//                         />
//                         <Form.Label
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Address Details
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your Address Details"
//                           onChange={(e) => {
//                             setSchoolAddress(e.target.value);
//                           }}
//                         />
//                       </>
//                     ) : (
//                       <></>
//                     )}

//                     <Form.Label
//                       className="fs-6 fw-bold mt-2 "
//                       style={{ letterSpacing: "0.5px" }}
//                     ></Form.Label>
//                     <Form.Group>
//                       <Form.Label>Subject</Form.Label>
//                       <Select
//                         options={subjectOptions}
//                         onChange={(selectedOption) =>
//                           setSubject(selectedOption.value)
//                         }
//                         placeholder="Select the Subject"
//                         isSearchable
//                         value={subjectOptions.find(option => option.value === Subject)}
//                       />
//                     </Form.Group>

//                     <div className="row">
//                       <div className="col-md-6">
//                         <FormLabel
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Exam Date
//                         </FormLabel>
//                         <Form.Control
//                           type="date"
//                           placeholder="Enter the Test Paper Name"
//                           onChange={(e) => {
//                             setTest_Date(e.target.value);
//                           }}
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         <FormLabel
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Exam Time
//                         </FormLabel>
//                         <Form.Control
//                           type="time"
//                           placeholder="Enter the Test Paper Name"
//                           onChange={(e) => {
//                             setExamTime(e.target.value);
//                           }}
//                         />
//                       </div>
//                     </div>

//                     <FormLabel
//                       className="fs-6 fw-bold mt-2 "
//                       style={{ letterSpacing: "0.5px" }}
//                     >
//                       Size of the Question Paper
//                     </FormLabel>
//                     <Form.Control
//                       value="A4"
//                       type="text"
//                       placeholder="Enter the 
//                       Size of the Question Paper (Recommended-A4)"
//                       readOnly
//                       onChange={(e) => {
//                         setSize_ofthe_Question(e.target.value);
//                       }}
//                     />
//                   </Form.Group>
//                   <a style={{ textDecoration: "none" }}>
//                     <Button
//                       style={{
//                         margin: "auto",
//                         display: "flex",
//                         justifyContent: "center",
//                         background: "green",
//                       }}
//                       onClick={() => generate()}
//                     >
//                       Save
//                     </Button>
//                   </a>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage3;   
 
// import React, { useEffect, useState } from "react";
// import "../LoginPage3/LoginPage3.css";
// import Form from "react-bootstrap/Form";
// import { Button, FormLabel } from "react-bootstrap";
// import axios from "axios";
// import swal from "sweetalert";
// import { useLocation, useNavigate } from "react-router-dom";
// import logo from "./../../assets/logo.png";
// import Select from "react-select";

// const LoginPage3 = () => {
//   const { state } = useLocation();
//   console.log("state==>", state);
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
  
//   const [School_Logo, setSchool_Logo] = useState("");
//   const [SchoolAddress, setSchoolAddress] = useState("");
//   const [Institute_Name, setInstitute_Name] = useState("");
//   const [Subject, setSubject] = useState("");
//   const [Test_Date, setTest_Date] = useState("");
//   const [Size_ofthe_Question, setSize_ofthe_Question] = useState("A4");
//   const [ExamTime, setExamTime] = useState("");
//   const [medium, setMedium] = useState("");
//   const [mediums, setMediums] = useState([]);
//   const [subjectOptions, setSubjectOptions] = useState([]);
//   const [filteredSubjects, setFilteredSubjects] = useState([]);

//   const generate = async () => {
//     try {
//       const config = {
//         url: "/teacher/upadeteQuestionPaper",
//         baseURL: "http://localhost:8774/api",
//         method: "put",
//         headers: {
//           "content-type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           School_Logo: School_Logo,
//           Institute_Name: Institute_Name,
//           Subject: Subject,
//           Test_Date: Test_Date,
//           Size_ofthe_Question: Size_ofthe_Question,
//           id: state?._id,
//           authId: user?._id,
//           teacherId: user?._id,
//           teacheName: user?.FirstName,
//           ExamTime: ExamTime,
//           SchoolAddress: SchoolAddress,
//         },
//       };

//       let res = await axios(config);

//       if (res.status == 200) {
//         swal({
//           title: "Yeah!",
//           text: "view blue print !!!",
//           icon: "success",
//           button: "OK!",
//         });
//         navigate("/loginpage5", { state: res.data.success });
//       }
//     } catch (error) {
//       console.log(error);
//       swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };

//   const getSubject = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllSujects"
//       );
//       if (res.status === 200) {
//         if (state?.Sub_Class && state?.Board) {
//           // Filter subjects based on Board and Sub_Class (Medium is optional)
//           const filtered = res.data.success.filter(
//             ele => 
//               ele.subClass?.subclassName === state.Sub_Class && 
//               ele.boardName === state.Board &&
//               (!state.Medium || ele.mediumName === state.Medium) // Medium is optional
//           );
//           setFilteredSubjects(filtered);
          
//           // Convert filtered subjects to options for react-select
//           const options = filtered.map((item) => ({
//             value: item.subjectName,
//             label: item.subjectName,
//           }));
//           setSubjectOptions(options);
          
//           // Set the first subject as default if available
//           if (filtered.length > 0) {
//             setSubject(filtered[0].subjectName);
//           }
//         } else {
//           // If compulsory filter criteria not provided, show all subjects
//           const options = res.data.success.map((item) => ({
//             value: item.subjectName,
//             label: item.subjectName,
//           }));
//           setSubjectOptions(options);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getSubject();
//   }, [state?.Sub_Class, state?.Board, state?.Medium]); // Still watch all three but only Board and Sub_Class are compulsory

//   const getMediums = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getAllMedium"
//       );
//       if (res.status === 200) {
//         setMediums(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getMediums();
//   }, []);

//   if (!user) {
//     alert("Please login");
//     return window.location.assign("/");
//   }

//   return (
//     <div>
//       <div className="container p-3">
//         <div>
//           <div className="box">
//             <div className="row">
//               <div className="col-md-6 gfffg">
//                 <div
//                   className="login3-bg"
//                   style={{
//                     padding: "150px 0px",
//                     textAlign: "center",
//                   }}
//                 >
//                   <img
//                     src={logo}
//                     alt=""
//                     style={{
//                       width: "250px",
//                       height: "100px",
//                     }}
//                   />
//                   <div className="line-1 mt-10">
//                     <h2>
//                       {" "}
//                       <p className="anim-typewriter text-dark">
//                         Welcome{" "}
//                         <span className="text-uppercase Lato-regular">
//                           {" "}
//                           {user?.FirstName}
//                         </span>{" "}
//                         <span className="text-uppercase Lato-regular">
//                           {user?.LastName}!{" "}
//                         </span>
//                       </p>
//                       <span className="fs-4" style={{ textAlign: "center" }}>
//                         Start Generating Your Paper
//                       </span>
//                     </h2>
//                   </div>
//                 </div>
//               </div>
//               <div className="col-md-6 yoihjij ">
//                 <Form className="pe-2 pt-3">
//                   <Form.Group controlId="formFile" className="mb-2">
//                     {state?.userType == "Teacher" ? (
//                       <>
//                         {" "}
//                         <Form.Label
//                           className="fs-6 fw-bold"
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           School Logo
//                         </Form.Label>
//                         <Form.Control
//                           type="file"
//                           onChange={(e) => {
//                             setSchool_Logo(e.target.files[0]);
//                           }}
//                         />
//                         <Form.Label
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           School / Institute Name
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your School / Institute Name"
//                           onChange={(e) => {
//                             setInstitute_Name(e.target.value);
//                           }}
//                         />
//                         <Form.Label
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Address Details
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your Address Details"
//                           onChange={(e) => {
//                             setSchoolAddress(e.target.value);
//                           }}
//                         />
//                       </>
//                     ) : (
//                       <></>
//                     )}

//                     <Form.Label
//                       className="fs-6 fw-bold mt-2 "
//                       style={{ letterSpacing: "0.5px" }}
//                     ></Form.Label>
//                     <Form.Group>
//                       <Form.Label>Subject</Form.Label>
//                       <Select
//                         options={subjectOptions}
//                         onChange={(selectedOption) =>
//                           setSubject(selectedOption.value)
//                         }
//                         placeholder="Select the Subject"
//                         isSearchable
//                         value={subjectOptions.find(option => option.value === Subject)}
//                       />
//                     </Form.Group>

//                     <div className="row">
//                       <div className="col-md-6">
//                         <FormLabel
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Exam Date
//                         </FormLabel>
//                         <Form.Control
//                           type="date"
//                           placeholder="Enter the Test Paper Name"
//                           onChange={(e) => {
//                             setTest_Date(e.target.value);
//                           }}
//                         />
//                       </div>
//                       <div className="col-md-6">
//                         <FormLabel
//                           className="fs-6 fw-bold mt-2 "
//                           style={{ letterSpacing: "0.5px" }}
//                         >
//                           Exam Time
//                         </FormLabel>
//                         <Form.Control
//                           type="time"
//                           placeholder="Enter the Test Paper Name"
//                           onChange={(e) => {
//                             setExamTime(e.target.value);
//                           }}
//                         />
//                       </div>
//                     </div>

//                     <FormLabel
//                       className="fs-6 fw-bold mt-2 "
//                       style={{ letterSpacing: "0.5px" }}
//                     >
//                       Size of the Question Paper
//                     </FormLabel>
//                     <Form.Control
//                       value="A4"
//                       type="text"
//                       placeholder="Enter the 
//                       Size of the Question Paper (Recommended-A4)"
//                       readOnly
//                       onChange={(e) => {
//                         setSize_ofthe_Question(e.target.value);
//                       }}
//                     />
//                   </Form.Group>
//                   <a style={{ textDecoration: "none" }}>
//                     <Button
//                       style={{
//                         margin: "auto",
//                         display: "flex",
//                         justifyContent: "center",
//                         background: "green",
//                       }}
//                       onClick={() => generate()}
//                     >
//                       Save
//                     </Button>
//                   </a>
//                 </Form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage3; 
 
 
// LoginPage3.js
import React, { useEffect, useState } from "react";
import "../LoginPage3/LoginPage3.css";
import Form from "react-bootstrap/Form";
import { Button, FormLabel } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "./../../assets/logo.png";
import Select from "react-select";

const LoginPage3 = () => {
  const { state } = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  
  // Form state
  const [School_Logo, setSchool_Logo] = useState("");
  const [SchoolAddress, setSchoolAddress] = useState("");
  const [Institute_Name, setInstitute_Name] = useState("");
  const [Subject, setSubject] = useState("");
  const [Test_Date, setTest_Date] = useState("");
  const [Size_ofthe_Question, setSize_ofthe_Question] = useState("A4");
  const [ExamTime, setExamTime] = useState("");
  
  // Data for dropdowns
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    try {
      const formData = new FormData();
      formData.append("School_Logo", School_Logo);
      formData.append("Institute_Name", Institute_Name);
      formData.append("Subject", Subject);
      formData.append("Test_Date", Test_Date);
      formData.append("Size_ofthe_Question", Size_ofthe_Question);
      formData.append("id", state?._id);
      formData.append("authId", user?._id);
      formData.append("teacherId", user?._id);
      formData.append("teacheName", user?.FirstName);
      formData.append("ExamTime", ExamTime);
      formData.append("SchoolAddress", SchoolAddress);
      formData.append("Board", state?.Board);
      formData.append("Medium", state?.Medium);
      formData.append("Sub_Class", state?.Sub_Class);

      const config = {
        url: "/teacher/upadeteQuestionPaper",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      };

      let res = await axios(config);

      if (res.status == 200) {
        swal({
          title: "Success!",
          text: "Question paper generated successfully!",
          icon: "success",
          button: "OK!",
        });
        navigate("/loginpage5", { state: res.data.success });
      }
    } catch (error) {
      console.error(error);
      swal({
        title: "Error!",
        text: error.response?.data?.error || "Something went wrong",
        icon: "error",
        button: "OK!",
      });
    }
  };

  const getFilteredSubjects = async () => {
    setIsLoading(true);
    try {
      let res = await axios.get("http://localhost:8774/api/admin/getAllSujects");
      if (res.status === 200) { 
 
        // Filter subjects based on board, medium and subclass from state
        const filtered = res.data.success.filter(subject => {
          const boardMatch = subject.boardName === state?.Board;
          const mediumMatch = subject.mediumName === state?.Medium;
          const subclassMatch = subject.subClass?.subclassName === state?.Sub_Class;
  //  const examMatch = subject.examName === state?.Exam_Name
          
          return boardMatch && mediumMatch && subclassMatch ;
        });
console.log(res.data.success)
        // Convert to options for react-select
        const options = filtered.map(item => ({
          value: item.subjectName,
          label: item.subjectName,
          _id: item._id
        }));

        setSubjectOptions(options);
        
        
        if (filtered.length > 0) {
          setSubject(filtered[0].subjectName);
        } else {
          swal({
            title: "Warning!",
            text: "No subjects found for the selected criteria",
            icon: "warning",
            button: "OK!",
          });
        }
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
      swal({
        title: "Error!",
        text: "Failed to load subjects",
        icon: "error",
        button: "OK!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      alert("Please login");
      window.location.assign("/");
      return;
    }
    getFilteredSubjects();
  }, [state?.Board, state?.Medium, state?.Sub_Class]);

  return (
    <div className="container p-3">
      <div className="box">
        <div className="row">
          <div className="col-md-6 gfffg">
            <div className="login3-bg" style={{ padding: "150px 0px", textAlign: "center" }}>
              <img src={logo} alt="" style={{ width: "250px", height: "100px" }} />
              <div className="line-1 mt-10">
                <h2>
                  <p className="anim-typewriter text-dark">
                    Welcome{" "}
                    <span className="text-uppercase Lato-regular">
                      {user?.FirstName}
                    </span>{" "}
                    <span className="text-uppercase Lato-regular">
                      {user?.LastName}!
                    </span>
                  </p>
                  <span className="fs-4" style={{ textAlign: "center" }}>
                    Start Generating Your Paper
                  </span>
                </h2>
              </div>
            </div>
          </div>
          <div className="col-md-6 yoihjij">
            <Form className="pe-2 pt-3">
              {state?.userType == "Teacher" && (
                <>
                  <Form.Group className="mb-2">
                    <Form.Label className="fs-6 fw-bold">School Logo</Form.Label>
                    <Form.Control type="file" onChange={(e) => setSchool_Logo(e.target.files[0])} />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="fs-6 fw-bold">School / Institute Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter Your School / Institute Name"
                      onChange={(e) => setInstitute_Name(e.target.value)} 
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="fs-6 fw-bold">Address Details</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter Your Address Details"
                      onChange={(e) => setSchoolAddress(e.target.value)} 
                    />
                  </Form.Group>
                </>
              )}

              {/* <Form.Group className="mb-2">
                <Form.Label>Subject {isLoading && "(Loading...)"}</Form.Label>
                <Select
                  options={subjectOptions}
                  onChange={(selectedOption) => setSubject(selectedOption.value)}
                  placeholder={isLoading ? "Loading subjects..." : "Select the Subject"}
                  isSearchable={false}
                  value={subjectOptions.find(option => option.value === Subject)}
                  isDisabled={isLoading}
                />
              </Form.Group> */}

              <Form.Group className="mb-2">
  <Form.Label>
    Subject {isLoading && "(Loading...)"}
  </Form.Label>
  <Form.Select
    value={Subject}
    onChange={(e) => setSubject(e.target.value)}
    disabled={isLoading}
  >
    <option value="">
      {isLoading ? "Loading subjects..." : "Select the Subject"}
    </option>
    {subjectOptions.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </Form.Select>
</Form.Group>


              <div className="row">
                <div className="col-md-6">
                  <FormLabel className="fs-6 fw-bold">Exam Date</FormLabel>
                  <Form.Control 
                    type="date" 
                    onChange={(e) => setTest_Date(e.target.value)} 
                  />
                </div>
                <div className="col-md-6">
                  <FormLabel className="fs-6 fw-bold">Exam Time</FormLabel>
                  <Form.Control 
                    type="time" 
                    onChange={(e) => setExamTime(e.target.value)} 
                  />
                </div>
              </div>

              <FormLabel className="fs-6 fw-bold mt-2">Size of the Question Paper</FormLabel>
              <Form.Control
                value="A4"
                type="text"
                placeholder="Size of the Question Paper (Recommended-A4)"
                readOnly
              />

              <Button
                className="mt-3"
                style={{
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center",
                  background: "green",
                }}
                onClick={generate}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Generate Paper"}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage3;
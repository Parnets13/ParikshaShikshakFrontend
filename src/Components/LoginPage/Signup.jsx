// import React, { useState } from "react";
// import { InputGroup, Modal, Button, Row, Col } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import { useNavigate } from "react-router-dom";
// import { FaEyeSlash } from "react-icons/fa";
// import { FaEye } from "react-icons/fa";
// import "../LoginPage3/LoginPage3.css";
// import axios from "axios";
// import swal from "sweetalert";
// import logo from "./../../assets/logo.png";
// import Button1 from "../Button1"; 
   
 
 

// const SignUp = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   //Post
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [Mobile, setMobile] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [CPassword, setCPassword] = useState("");
//   const [whatsAppNumber, setWhatsAppNumber] = useState("");
//   const [termndcond, setTermndcond] = useState(""); 
//   const [referralCode, setReferralCode] = useState("");

// const [accountNumber, setAccountNumber] = useState("");
// const [ifsc, setIfsc] = useState("");
// const [bankName, setBankName] = useState("");
// const [branchName, setBranchName] = useState(""); 

//   const TeacherRegister = async () => {
//     try {
//       const config = {
//         url: "/admin/registerTeacher",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         data: {
//           FirstName: FirstName,
//           LastName: LastName,
//           Mobile: Mobile,
//           Email: Email,
//           Password: Password,
//           authId: user?.id,
//           whatsAppNumber: whatsAppNumber,
//           CPassword: CPassword,
//           termndcond: termndcond,
//         },
//       };
//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose();
//         swal({
//           title: "yeah!",
//           text: res.data.success,
//           icon: "success",
//           button: "Ok!",
//         });
//       }
//       setTimeout(() => {
//         return navigate("/login");
//       }, 1000);

 
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "oops!",
//         text: error.response.data.error,
//         icon: "error",
//         buttons: "Ok!",
//       });
//     }
//   };

//   const [PasswordShow, setPasswordShow] = useState(false);

//   const [PasswordShow1, setPasswordShow1] = useState(false);

//   return (
//     <div>
//       {/* new Register form  */}
//       <div className="container p-3">
//         <div className="box">
//           <div className="row">
//             <div className="col-6">
//               <div className="page2-content-display p-4">
//                 <h4
//                   style={{ textAlign: "center" }}
//                   className="space-mono-bolder"
//                 >
//                   Register Here
//                 </h4>
//                 <hr></hr>

//                 <Row>
//                   <Col>
//                     <div className="col-12">
//                       <Form.Group className="mb-2" controlId="formGroupEmail">
//                         <Form.Label className="lato-regular">
//                           First Name<span style={{ color: "red" }}>*</span>
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your First Name"
//                           onChange={(e) => {
//                             setFirstName(e.target.value);
//                           }}
//                         />
//                       </Form.Group>
//                     </div>
//                   </Col>
//                   <Col>
//                     <div className="col-12">
//                       <Form.Group className="mb-2" controlId="formGroupEmail">
//                         <Form.Label className="lato-regular">
//                           Last Name<span style={{ color: "red" }}>*</span>
//                         </Form.Label>
//                         <Form.Control
//                           type="text"
//                           placeholder="Enter Your Last Name"
//                           onChange={(e) => {
//                             setLastName(e.target.value);
//                           }}
//                         />
//                       </Form.Group>
//                     </div>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupEmail">
//                       <Form.Label className="lato-regular">
//                         Mobile Number<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter Your Number"
//                         onChange={(e) => setMobile(e.target.value)}
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupEmail">
//                       <Form.Label className="lato-regular">
//                         WhatsApp Number<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="number"
//                         placeholder="Enter Your WhatsApp Number"
//                         onChange={(e) => setWhatsAppNumber(e.target.value)}
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>
//                 <Row>
//                   <div className="col-12">
//                     <Form.Label className="lato-regular">
//                       Email ID<span style={{ color: "red" }}>*</span>
//                     </Form.Label>
//                     <InputGroup className="mb-2">
//                       <Form.Control
//                         className="login-input"
//                         type="email"
//                         placeholder="Enter Email id"
//                         aria-label="email"
//                         aria-describedby="basic-addon1"
//                         onChange={(e) => setEmail(e.target.value)}
//                       />
//                     </InputGroup>
//                   </div>
//                 </Row> 
//                 <Form.Group className="mb-2" controlId="formGroupReferral">
//   <Form.Label className="lato-regular">
//     Referral Code (Optional)
//   </Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter Referral Code"
//     onChange={(e) => setReferralCode(e.target.value)}
//   />
// </Form.Group>
// <Form.Group className="mb-2" controlId="formGroupAccountNumber">
//   <Form.Label className="lato-regular">Account Number</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter Account Number"
//     onChange={(e) => setAccountNumber(e.target.value)}
//   />
// </Form.Group>
// <Form.Group className="mb-2" controlId="formGroupIFSC">
//   <Form.Label className="lato-regular">IFSC Code</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter IFSC Code"
//     onChange={(e) => setIfsc(e.target.value)}
//   />
// </Form.Group> 
// <Form.Group className="mb-2" controlId="formGroupBankName">
//   <Form.Label className="lato-regular">Bank Name</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter Bank Name"
//     onChange={(e) => setBankName(e.target.value)}
//   />
// </Form.Group>
// <Form.Group className="mb-2" controlId="formGroupBranchName">
//   <Form.Label className="lato-regular">Branch Name</Form.Label>
//   <Form.Control
//     type="text"
//     placeholder="Enter Branch Name"
//     onChange={(e) => setBranchName(e.target.value)}
//   />
// </Form.Group>


//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupPassword">
//                       <Form.Label className="lato-regular">
//                         Password<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <InputGroup className="col-lg-3 mb-2">
//                         <Form.Control
//                           type={PasswordShow ? "text" : "password"}
//                           className="login-input"
//                           placeholder="Password"
//                           aria-describedby="basic-addon1"
//                           onChange={(e) => setPassword(e.target.value)}
//                         />
//                         {PasswordShow ? (
//                           <button
//                             onClick={() => setPasswordShow(!PasswordShow)}
//                             className="passbtn"
//                           >
//                             <FaEye style={{ color: "white" }} />
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => setPasswordShow(!PasswordShow)}
//                             className="passbtn"
//                           >
//                             <FaEyeSlash style={{ color: "white" }} />
//                           </button>
//                         )}
//                       </InputGroup>
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 <Row>
//                   <div className="col-12 ">
//                     <Form.Group className="mb-2" controlId="formGroupPassword">
//                       <Form.Label className="lato-regular">
//                         Confirm Password<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <InputGroup className="col-lg-3 mb-2">
//                         <Form.Control
//                           type={PasswordShow1 ? "text" : "password"}
//                           className="login-input"
//                           placeholder="Password"
//                           aria-describedby="basic-addon1"
//                           onChange={(e) => setCPassword(e.target.value)}
//                         />
//                         {PasswordShow1 ? (
//                           <button
//                             onClick={() => setPasswordShow1(!PasswordShow1)}
//                             className="passbtn"
//                           >
//                             <FaEye style={{ color: "white" }} />
//                           </button>
//                         ) : (
//                           <button
//                             onClick={() => setPasswordShow1(!PasswordShow1)}
//                             className="passbtn"
//                           >
//                             <FaEyeSlash style={{ color: "white" }} />
//                           </button>
//                         )}
//                       </InputGroup>
//                     </Form.Group>
//                   </div>
//                 </Row>
//                 <div>
//                   <Form style={{ display: "flex", padding: "0 4px" }}>
//                     {/* {["checkbox"].map((type) => ( */}
//                     <div className="mb-3">
//                       <Form.Check
//                         inline
//                         label="I agree the terms and conditions"
//                         name="group1"
//                         // type={type}
//                         // id={`inline-${type}-1`}
//                         onChange={(e) => setTermndcond(e.target.value)}
//                       />
//                     </div>
//                   </Form>
//                 </div>
//                 <Row>
//                   <div
//                     style={{
//                       float: "right",
//                       display: "flex",
//                       justifyContent: "center",
//                       padding: "0px 100px",
//                     }}
//                   >
//                     <a
//                       onClick={() => {
//                         TeacherRegister();
//                       }}
//                     >
//                       <Button1 text={"Register"} />
//                     </a>
//                   </div>
//                 </Row>
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div className="signup-bg-img">
//                 <div className="line-1">
//                   <h2 className="alfa-slab " style={{ color: "#5140EB" }}>
//                     Welcome To,
//                   </h2>
//                   <img src={logo} alt=" " className="w-50" />
//                   <h3>
//                     {/* Welcome To <br></br>
//                       Question Paper Generator */}
//                   </h3>
//                   <span
//                     className="fs-6 space-mono-regular fw-normal"
//                     style={{ textAlign: "center" }}
//                   >
//                     If you have already an account Login Here
//                   </span>

//                   <div>
//                     {/* <a href="/login">
//                       <Button
//                         style={{
//                           padding: "7px 30px",
//                           backgroundColor: "green",
//                           border: "1px solid green",
//                           color: "white",
//                         }}
//                       >
//                         Log in
//                       </Button>
//                     </a> */}
//                     <a
//                       href="/login"
//                       style={{ textDecoration: "none" }}
//                       className="d-flex justify-content-center align-items-center"
//                     >
//                       <Button1 text={"Log In"} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

   
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "9999999", borderRadius: "none" }}
//       >
//         <Modal.Header
//           style={{ backgroundColor: "navy", borderRadius: "unset" }}
//         >
//           <Modal.Title style={{ color: "white" }}> Enter OTP</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formGroupPassword">
//               <Form.Control type="password" placeholder="Enter OTP" />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant=""
//             style={{
//               backgroundColor: "green",
//               border: "1px solid green",
//               color: "white",
//             }}
//             onClick={() => navigate("/login")}
//           >
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SignUp;
 
  
// import React, { useState, useEffect } from "react";
// import { InputGroup, Modal, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaEyeSlash, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import "../LoginPage3/LoginPage3.css";
// import axios from "axios";
// import swal from "sweetalert";
// import logo from "./../../assets/logo.png";
// import Button1 from "../Button1";

// const SignUp = () => {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get referral code from URL params if present
//   const urlParams = new URLSearchParams(location.search);
//   const urlReferralCode = urlParams.get('ref');

//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   // Basic Info States
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [Mobile, setMobile] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [CPassword, setCPassword] = useState("");
//   const [whatsAppNumber, setWhatsAppNumber] = useState("");
//   const [termndcond, setTermndcond] = useState(false);

//   // Referral States
//   const [referralCode, setReferralCode] = useState(urlReferralCode || "");
//   const [referralValid, setReferralValid] = useState(null);
//   const [referrerInfo, setReferrerInfo] = useState(null);
//   const [validatingReferral, setValidatingReferral] = useState(false);

//   // Bank Details States
//   const [accountNumber, setAccountNumber] = useState("");
//   const [ifsc, setIfsc] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [branchName, setBranchName] = useState("");

//   // Location States
//   const [Country, setCountry] = useState("");
//   const [State, setState] = useState("");
//   const [City, setCity] = useState("");

//   // UI States
//   const [PasswordShow, setPasswordShow] = useState(false);
//   const [PasswordShow1, setPasswordShow1] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Validate referral code when component mounts or referral code changes
//   useEffect(() => {
//     if (referralCode) {
//       validateReferralCode(referralCode);
//     }
//   }, []);

//   const validateReferralCode = async (code) => {
//     if (!code.trim()) {
//       setReferralValid(null);
//       setReferrerInfo(null);
//       return;
//     }

//     setValidatingReferral(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:8774/api/teacher/validateReferralCode",
//         { referralCode: code.trim() },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         setReferralValid(true);
//         setReferrerInfo(response.data.referrer);
//       }
//     } catch (error) {
//       setReferralValid(false);
//       setReferrerInfo(null);
//       console.log("Referral validation error:", error.response?.data?.error);
//     } finally {
//       setValidatingReferral(false);
//     }
//   }; 



//   const handleReferralCodeChange = (e) => {
//     const code = e.target.value;
//     setReferralCode(code);
    
//     // Debounce validation
//     if (code.trim()) {
//       setTimeout(() => {
//         if (referralCode === code) {
//           validateReferralCode(code);
//         }
//       }, 500);
//     } else {
//       setReferralValid(null);
//       setReferrerInfo(null);
//     }
//   };

//   const TeacherRegister = async () => {
//     // Basic validation
//     if (!FirstName || !LastName || !Mobile || !Email || !Password || !CPassword || !whatsAppNumber) {
//       return swal({
//         title: "Oops!",
//         text: "Please fill in all required fields",
//         icon: "error",
//         button: "Ok!",
//       });
//     }

//     if (Password !== CPassword) {
//       return swal({
//         title: "Oops!",
//         text: "Passwords do not match",
//         icon: "error",
//         button: "Ok!",
//       });
//     }

//     if (!termndcond) {
//       return swal({
//         title: "Oops!",
//         text: "Please agree to the terms and conditions",
//         icon: "error",
//         button: "Ok!",
//       });
//     }


//     if (referralCode && !referralValid) {
//       return swal({
//         title: "Oops!",
//         text: "Please enter a valid referral code or leave it empty",
//         icon: "error",
//         button: "Ok!",
//       });
//     }

//     setLoading(true);
//     try {
//       const config = {
//         url: "/admin/registerTeacher",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//         },
//         data: {
//           FirstName: FirstName,
//           LastName: LastName,
//           Mobile: Mobile,
//           Email: Email,
//           Password: Password,
//           whatsAppNumber: whatsAppNumber,
//           CPassword: CPassword,
//           termndcond: termndcond,
//           referralCode: referralCode || undefined,
//           Country: Country,
//           State: State,
//           City: City,
//           // Bank details
//           bankDetails: {
//             accountNumber: accountNumber,
//             ifsc: ifsc,
//             bankName: bankName,
//             branchName: branchName,
//           }
//         },
//       };

//       let res = await axios(config);
//       if (res.status === 200) {
//         handleClose();
        
//         // Show success message with teacher ID and referral code
//         const successMessage = `Registration successful!\nTeacher ID: ${res.data.teacherId}\nYour Referral Code: ${res.data.referralCode}`;
        
//         swal({
//           title: "Welcome!",
//           text: successMessage,
//           icon: "success",
//           button: "Continue to Login",
//         }).then(() => {
//           navigate("/login");
//         });

//         // If referred by someone, show additional message
//         if (referralCode && referrerInfo) {
//           setTimeout(() => {
//             swal({
//               title: "Referral Success!",
//               text: `You were successfully referred by ${referrerInfo.name}. Both of you may be eligible for rewards!`,
//               icon: "success",
//               button: "Great!",
//             });
//           }, 2000);
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Registration failed. Please try again.",
//         icon: "error",
//         button: "Ok!",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="container p-3">
//         <div className="box">
//           <div className="row">
//             <div className="col-6">
//               <div className="page2-content-display p-4">
//                 <h4 style={{ textAlign: "center" }} className="space-mono-bolder">
//                   Register Here
//                 </h4>
//                 <hr />

//                 {/* Name Fields */}
//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupFirstName">
//                       <Form.Label className="lato-regular">
//                         First Name<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Your First Name"
//                         value={FirstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupLastName">
//                       <Form.Label className="lato-regular">
//                         Last Name<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Your Last Name"
//                         value={LastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Contact Fields */}
//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupMobile">
//                       <Form.Label className="lato-regular">
//                         Mobile Number<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="tel"
//                         placeholder="Enter Your Mobile Number"
//                         value={Mobile}
//                         onChange={(e) => setMobile(e.target.value)}
//                         maxLength="10"
//                         required
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupWhatsApp">
//                       <Form.Label className="lato-regular">
//                         WhatsApp Number<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="tel"
//                         placeholder="Enter Your WhatsApp Number"
//                         value={whatsAppNumber}
//                         onChange={(e) => setWhatsAppNumber(e.target.value)}
//                         maxLength="10"
//                         required
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 {/* Email Field */}
//                 <Row>
//                   <div className="col-12">
//                     <Form.Label className="lato-regular">
//                       Email ID<span style={{ color: "red" }}>*</span>
//                     </Form.Label>
//                     <InputGroup className="mb-2">
//                       <Form.Control
//                         className="login-input"
//                         type="email"
//                         placeholder="Enter Email ID"
//                         value={Email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                       />
//                     </InputGroup>
//                   </div>
//                 </Row>

//                 {/* Location Fields */}
//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupCountry">
//                       <Form.Label className="lato-regular">Country</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Country"
//                         value={Country}
//                         onChange={(e) => setCountry(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupState">
//                       <Form.Label className="lato-regular">State</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter State"
//                         value={State}
//                         onChange={(e) => setState(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupCity">
//                       <Form.Label className="lato-regular">City</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter City"
//                         value={City}
//                         onChange={(e) => setCity(e.target.value)}
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 {/* Referral Code Field */}
//                 <Form.Group className="mb-2" controlId="formGroupReferral">
//                   <Form.Label className="lato-regular">
//                     Referral Code (Optional)
//                     {validatingReferral && <Spinner size="sm" className="ms-2" />}
//                   </Form.Label>
//                   <InputGroup>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Referral Code"
//                       value={referralCode}
//                       onChange={handleReferralCodeChange}
//                     />
//                     {referralValid === true && (
//                       <InputGroup.Text style={{ background: "#d4edda", border: "1px solid #c3e6cb" }}>
//                         <FaCheckCircle style={{ color: "#155724" }} />
//                       </InputGroup.Text>
//                     )}
//                     {referralValid === false && (
//                       <InputGroup.Text style={{ background: "#f8d7da", border: "1px solid #f5c6cb" }}>
//                         <FaTimesCircle style={{ color: "#721c24" }} />
//                       </InputGroup.Text>
//                     )}
//                   </InputGroup>
//                   {referralValid === true && referrerInfo && (
//                     <Alert variant="success" className="mt-2 py-2">
//                       <small>✅ Valid referral code! Referred by: <strong>{referrerInfo.name}</strong> (ID: {referrerInfo.teacherId})</small>
//                     </Alert>
//                   )}
//                   {referralValid === false && (
//                     <Alert variant="danger" className="mt-2 py-2">
//                       <small>❌ Invalid referral code. Please check and try again.</small>
//                     </Alert>
//                   )}
//                 </Form.Group>

//                 {/* Bank Details Section */}
//                 <div className="mt-3 mb-3">
//                   <h6 className="text-primary">Bank Details (Optional)</h6>
//                   <hr className="my-2" />
//                 </div>

//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupAccountNumber">
//                       <Form.Label className="lato-regular">Account Number</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Account Number"
//                         value={accountNumber}
//                         onChange={(e) => setAccountNumber(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupIFSC">
//                       <Form.Label className="lato-regular">IFSC Code</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter IFSC Code"
//                         value={ifsc}
//                         onChange={(e) => setIfsc(e.target.value.toUpperCase())}
//                         style={{ textTransform: 'uppercase' }}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupBankName">
//                       <Form.Label className="lato-regular">Bank Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Bank Name"
//                         value={bankName}
//                         onChange={(e) => setBankName(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupBranchName">
//                       <Form.Label className="lato-regular">Branch Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Branch Name"
//                         value={branchName}
//                         onChange={(e) => setBranchName(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Password Fields */}
//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupPassword">
//                       <Form.Label className="lato-regular">
//                         Password<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <InputGroup className="col-lg-3 mb-2">
//                         <Form.Control
//                           type={PasswordShow ? "text" : "password"}
//                           className="login-input"
//                           placeholder="Password"
//                           value={Password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setPasswordShow(!PasswordShow)}
//                           className="passbtn"
//                         >
//                           {PasswordShow ? (
//                             <FaEye style={{ color: "white" }} />
//                           ) : (
//                             <FaEyeSlash style={{ color: "white" }} />
//                           )}
//                         </button>
//                       </InputGroup>
//                       <small className="text-muted">
//                         Password must contain at least 8 characters including uppercase, lowercase, number, and special character
//                       </small>
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
//                       <Form.Label className="lato-regular">
//                         Confirm Password<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <InputGroup className="col-lg-3 mb-2">
//                         <Form.Control
//                           type={PasswordShow1 ? "text" : "password"}
//                           className="login-input"
//                           placeholder="Confirm Password"
//                           value={CPassword}
//                           onChange={(e) => setCPassword(e.target.value)}
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setPasswordShow1(!PasswordShow1)}
//                           className="passbtn"
//                         >
//                           {PasswordShow1 ? (
//                             <FaEye style={{ color: "white" }} />
//                           ) : (
//                             <FaEyeSlash style={{ color: "white" }} />
//                           )}
//                         </button>
//                       </InputGroup>
//                       {Password && CPassword && Password !== CPassword && (
//                         <small className="text-danger">Passwords do not match</small>
//                       )}
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 {/* Terms and Conditions */}
//                 <div>
//                   <Form style={{ display: "flex", padding: "0 4px" }}>
//                     <div className="mb-3">
//                       <Form.Check
//                         inline
//                         label="I agree to the terms and conditions"
//                         name="termndcond"
//                         type="checkbox"
//                         checked={termndcond}
//                         onChange={(e) => setTermndcond(e.target.checked)}
//                         required
//                       />
//                     </div>
//                   </Form>
//                 </div>

//                 {/* Submit Button */}
//                 <Row>
//                   <div
//                     style={{
//                       float: "right",
//                       display: "flex",
//                       justifyContent: "center",
//                       padding: "0px 100px",
//                     }}
//                   >
//                     <button
//                       type="button"
//                       onClick={TeacherRegister}
//                       disabled={loading}
//                       style={{ 
//                         background: "none", 
//                         border: "none", 
//                         padding: 0,
//                         opacity: loading ? 0.7 : 1 
//                       }}
//                     >
//                       <Button1 text={loading ? "Registering..." : "Register"} />
//                     </button>
//                   </div>
//                 </Row>
//               </div>
//             </div>

//             {/* Right Side - Welcome Section */}
//             <div className="col-md-6">
//               <div className="signup-bg-img">
//                 <div className="line-1">
//                   <h2 className="alfa-slab" style={{ color: "#5140EB" }}>
//                     Welcome To,
//                   </h2>
//                   <img src={logo} alt="Logo" className="w-50" />
                  
//                   {/* Show referral info if present */}
//                   {referrerInfo && (
//                     <div className="mt-3 p-3" style={{ background: "#f8f9fa", borderRadius: "8px" }}>
//                       <h6 style={{ color: "#28a745" }}>🎉 You're joining through a referral!</h6>
//                       <p className="mb-0" style={{ fontSize: "14px", color: "#6c757d" }}>
//                         Referred by: <strong>{referrerInfo.name}</strong>
//                       </p>
//                       <small style={{ color: "#6c757d" }}>
//                         You and your referrer may be eligible for rewards!
//                       </small>
//                     </div>
//                   )}

//                   <span
//                     className="fs-6 space-mono-regular fw-normal"
//                     style={{ textAlign: "center" }}
//                   >
//                     If you already have an account, Login Here
//                   </span>

//                   <div>
//                     <a
//                       href="/login"
//                       style={{ textDecoration: "none" }}
//                       className="d-flex justify-content-center align-items-center"
//                     >
//                       <Button1 text={"Log In"} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* OTP Modal */}
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "9999999", borderRadius: "none" }}
//       >
//         <Modal.Header style={{ backgroundColor: "navy", borderRadius: "unset" }}>
//           <Modal.Title style={{ color: "white" }}>Enter OTP</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formGroupOTP">
//               <Form.Control type="text" placeholder="Enter OTP" maxLength="6" />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant=""
//             style={{
//               backgroundColor: "green",
//               border: "1px solid green",
//               color: "white",
//             }}
//             onClick={() => navigate("/login")}
//           >
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SignUp;   
 
//  import React, { useState, useEffect } from "react";
// import { InputGroup, Modal, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaEyeSlash, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import "../LoginPage3/LoginPage3.css";
// import axios from "axios";
// import swal from "sweetalert";
// import logo from "./../../assets/logo.png";
// import Button1 from "../Button1";

// const SignUp = () => {
//   console.log("SignUp component rendering");
//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get referral code from URL params if present
//   const urlParams = new URLSearchParams(location.search);
//   const urlReferralCode = urlParams.get('ref');
//   console.log("URL Referral Code:", urlReferralCode);

//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   // Basic Info States
//   const [FirstName, setFirstName] = useState("");
//   const [LastName, setLastName] = useState("");
//   const [Mobile, setMobile] = useState("");
//   const [Email, setEmail] = useState("");
//   const [Password, setPassword] = useState("");
//   const [CPassword, setCPassword] = useState("");
//   const [whatsAppNumber, setWhatsAppNumber] = useState("");
//   const [termndcond, setTermndcond] = useState(false);

//   // Referral States
//   const [referralCode, setReferralCode] = useState("");
//   const [referralValid, setReferralValid] = useState(null);
//   const [referrerInfo, setReferrerInfo] = useState(null);
//   const [validatingReferral, setValidatingReferral] = useState(false);

//   // Bank Details States
//   const [accountNumber, setAccountNumber] = useState("");
//   const [ifsc, setIfsc] = useState("");
//   const [bankName, setBankName] = useState("");
//   const [branchName, setBranchName] = useState("");

//   // Location States
//   const [Country, setCountry] = useState("");
//   const [State, setState] = useState("");
//   const [City, setCity] = useState("");

//   // UI States
//   const [PasswordShow, setPasswordShow] = useState(false);
//   const [PasswordShow1, setPasswordShow1] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Validate referral code when component mounts or referral code changes
// useEffect(() => {
//   if (!referralCode) return;

//   const delay = setTimeout(() => {
//     console.log("Validating referral code:", referralCode);
//     validateReferralCode(referralCode);
//   }, 800); // waits 800ms after user stops typing

//   return () => clearTimeout(delay); // cancel on every new keystroke
// }, [referralCode]);

//   const validateReferralCode = async (code) => {
//     console.log("validateReferralCode called with:", code);
//     if (!code.trim()) {
//       console.log("Empty referral code, resetting state");
//       setReferralValid(null);
//       setReferrerInfo(null);
//       return;
//     }

//     console.log("Starting referral validation for code:", code);
//     setValidatingReferral(true);
//     try {
//       console.log("Making API call to validate referral code");
//       const response = await axios.post(
//         "http://localhost:8774/api/admin/validateReferralCode",
//         { referralCode: code.trim() },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       console.log("API response:", response);
//       if (response.status === 200) {
//         console.log("Valid referral code, referrer info:", response.data.referrer);
//         setReferralValid(true);
//         setReferrerInfo(response.data.referrer);
//       }
//     } catch (error) {
//       console.error("Referral validation error:", {
//         error: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
//       setReferralValid(false);
//       setReferrerInfo(null);
//     } finally {
//       console.log("Finished validating referral code");
//       setValidatingReferral(false);
//     }
//   };

//   const handleReferralCodeChange = (e) => {
//     const code = e.target.value;
//     console.log("Referral code changed to:", code);
//     setReferralCode(code);
    
//     // // Debounce validation
//     // if (code.trim()) {
//     //   console.log("Setting validation timeout for code:", code);
//     //   setTimeout(() => {
//     //     if (referralCode === code) {
//     //       console.log("Debounced validation for code:", code);
//     //       validateReferralCode(code);
//     //     }
//     //   }, 500);
//     // } else {
//     //   console.log("Empty referral code, clearing state");
//     //   setReferralValid(null);
//     //   setReferrerInfo(null);
//     // }
//   };

//   const TeacherRegister = async () => {
//     console.log("TeacherRegister called");
//     console.log("Form values:", {
//       FirstName,
//       LastName,
//       Mobile,
//       Email,
//       Password,
//       CPassword,
//       whatsAppNumber,
//       termndcond,
//       referralCode,
//       Country,
//       State,
//       City,
//       bankDetails: {
//         accountNumber,
//         ifsc,
//         bankName,
//         branchName
//       }
//     });

//     // Basic validation
//     if (!FirstName || !LastName || !Mobile || !Email || !Password || !CPassword || !whatsAppNumber) {
//       console.log("Validation failed - missing required fields");
//       return swal({
//         title: "Oops!",
//         text: "Please fill in all required fields",
//         icon: "error",
//         button: "Ok!",
//       });
//     }

//     if (Password !== CPassword) {
//       console.log("Validation failed - passwords don't match");
//       return swal({
//         title: "Oops!",
//         text: "Passwords do not match",
//         icon: "error",
//         button: "Ok!",
//       });
//     }

//     if (!termndcond) {
//       console.log("Validation failed - terms not accepted");
//       return swal({
//         title: "Oops!",
//         text: "Please agree to the terms and conditions",
//         icon: "error",
//         button: "Ok!",
//       });
//     }

//     if (referralCode && !referralValid) {
//       console.log("Validation failed - invalid referral code");
//       return swal({
//         title: "Oops!",
//         text: "Please enter a valid referral code or leave it empty",
//         icon: "error",
//         button: "Ok!",
//       });
//     }

//     console.log("All validations passed, proceeding with registration");
//     setLoading(true);
//     try {
//       const config = {
//         url: "/admin/registerTeacher",
//         method: "post",
//         baseURL: "http://localhost:8774/api",
//         headers: {
//           "Content-type": "application/json",
//         },
//         data: {
//           FirstName: FirstName,
//           LastName: LastName,
//           Mobile: Mobile,
//           Email: Email,
//           Password: Password,
//           whatsAppNumber: whatsAppNumber,
//           CPassword: CPassword,
//           termndcond: termndcond,
//           referralCode: referralCode || undefined,
//           Country: Country,
//           State: State,
//           City: City,
//           bankDetails: {
//             accountNumber: accountNumber,
//             ifsc: ifsc,
//             bankName: bankName,
//             branchName: branchName,
//           }
//         },
//       };

//       console.log("Sending registration request with config:", config);
//       let res = await axios(config);
//       console.log("Registration response:", res);

//       if (res.status === 200) {
//         console.log("Registration successful, response data:", res.data);
//         handleClose();
        
//         const successMessage = `Registration successful!\nTeacher ID: ${res.data.teacherId}\nYour Referral Code: ${res.data.referralCode}`;
        
//         swal({
//           title: "Welcome!",
//           text: successMessage,
//           icon: "success",
//           button: "Continue to Login",
//         }).then(() => {
//           navigate("/login");
//         });

//         if (referralCode && referrerInfo) {
//           console.log("Showing referral success message for referrer:", referrerInfo);
//           setTimeout(() => {
//             swal({
//               title: "Referral Success!",
//               text: `You were successfully referred by ${referrerInfo.name}. Both of you may be eligible for rewards!`,
//               icon: "success",
//               button: "Great!",
//             });
//           }, 2000);
//         }
//       }
//     } catch (error) {
//       console.error("Registration error:", {
//         error: error.message,
//         response: error.response?.data,
//         status: error.response?.status
//       });
//       return swal({
//         title: "Oops!",
//         text: error.response?.data?.error || "Registration failed. Please try again.",
//         icon: "error",
//         button: "Ok!",
//       });
//     } finally {
//       console.log("Registration process completed");
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="container p-3">
//         <div className="box">
//           <div className="row">
//             <div className="col-6">
//               <div className="page2-content-display p-4">
//                 <h4 style={{ textAlign: "center" }} className="space-mono-bolder">
//                   Register Here
//                 </h4>
//                 <hr />

//                 {/* Name Fields */}
//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupFirstName">
//                       <Form.Label className="lato-regular">
//                         First Name<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Your First Name"
//                         value={FirstName}
//                         onChange={(e) => setFirstName(e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupLastName">
//                       <Form.Label className="lato-regular">
//                         Last Name<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Your Last Name"
//                         value={LastName}
//                         onChange={(e) => setLastName(e.target.value)}
//                         required
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Contact Fields */}
//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupMobile">
//                       <Form.Label className="lato-regular">
//                         Mobile Number<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="tel"
//                         placeholder="Enter Your Mobile Number"
//                         value={Mobile}
//                         onChange={(e) => setMobile(e.target.value)}
//                         maxLength="10"
//                         required
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupWhatsApp">
//                       <Form.Label className="lato-regular">
//                         WhatsApp Number<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <Form.Control
//                         type="tel"
//                         placeholder="Enter Your WhatsApp Number"
//                         value={whatsAppNumber}
//                         onChange={(e) => setWhatsAppNumber(e.target.value)}
//                         maxLength="10"
//                         required
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 {/* Email Field */}
//                 <Row>
//                   <div className="col-12">
//                     <Form.Label className="lato-regular">
//                       Email ID<span style={{ color: "red" }}>*</span>
//                     </Form.Label>
//                     <InputGroup className="mb-2">
//                       <Form.Control
//                         className="login-input"
//                         type="email"
//                         placeholder="Enter Email ID"
//                         value={Email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                       />
//                     </InputGroup>
//                   </div>
//                 </Row>

//                 {/* Location Fields */}
//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupCountry">
//                       <Form.Label className="lato-regular">Country</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Country"
//                         value={Country}
//                         onChange={(e) => setCountry(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupState">
//                       <Form.Label className="lato-regular">State</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter State"
//                         value={State}
//                         onChange={(e) => setState(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupCity">
//                       <Form.Label className="lato-regular">City</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter City"
//                         value={City}
//                         onChange={(e) => setCity(e.target.value)}
//                       />
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 {/* Referral Code Field */}
//                 <Form.Group className="mb-2" controlId="formGroupReferral">
//                   <Form.Label className="lato-regular">
//                     Referral Code (Optional)
//                     {validatingReferral && <Spinner size="sm" className="ms-2" />}
//                   </Form.Label>
//                   <InputGroup>
//                     <Form.Control
//                       type="text"
//                       placeholder="Enter Referral Code"
//                       value={referralCode}
//                       onChange={handleReferralCodeChange}
//                     />
//                     {referralValid === true && (
//                       <InputGroup.Text style={{ background: "#d4edda", border: "1px solid #c3e6cb" }}>
//                         <FaCheckCircle style={{ color: "#155724" }} />
//                       </InputGroup.Text>
//                     )}
//                     {referralValid === false && (
//                       <InputGroup.Text style={{ background: "#f8d7da", border: "1px solid #f5c6cb" }}>
//                         <FaTimesCircle style={{ color: "#721c24" }} />
//                       </InputGroup.Text>
//                     )}
//                   </InputGroup>
//                   {referralValid === true && referrerInfo && (
//                     <Alert variant="success" className="mt-2 py-2">
//                       <small>✅ Valid referral code! Referred by: <strong>{referrerInfo.name}</strong> (ID: {referrerInfo.teacherId})</small>
//                     </Alert>
//                   )}
//                   {referralValid === false && (
//                     <Alert variant="danger" className="mt-2 py-2">
//                       <small>❌ Invalid referral code. Please check and try again.</small>
//                     </Alert>
//                   )}
//                 </Form.Group>

//                 {/* Bank Details Section */}
//                 <div className="mt-3 mb-3">
//                   <h6 className="text-primary">Bank Details (Optional)</h6>
//                   <hr className="my-2" />
//                 </div>

//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupAccountNumber">
//                       <Form.Label className="lato-regular">Account Number</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Account Number"
//                         value={accountNumber}
//                         onChange={(e) => setAccountNumber(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupIFSC">
//                       <Form.Label className="lato-regular">IFSC Code</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter IFSC Code"
//                         value={ifsc}
//                         onChange={(e) => setIfsc(e.target.value.toUpperCase())}
//                         style={{ textTransform: 'uppercase' }}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 <Row>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupBankName">
//                       <Form.Label className="lato-regular">Bank Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Bank Name"
//                         value={bankName}
//                         onChange={(e) => setBankName(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                   <Col>
//                     <Form.Group className="mb-2" controlId="formGroupBranchName">
//                       <Form.Label className="lato-regular">Branch Name</Form.Label>
//                       <Form.Control
//                         type="text"
//                         placeholder="Enter Branch Name"
//                         value={branchName}
//                         onChange={(e) => setBranchName(e.target.value)}
//                       />
//                     </Form.Group>
//                   </Col>
//                 </Row>

//                 {/* Password Fields */}
//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupPassword">
//                       <Form.Label className="lato-regular">
//                         Password<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <InputGroup className="col-lg-3 mb-2">
//                         <Form.Control
//                           type={PasswordShow ? "text" : "password"}
//                           className="login-input"
//                           placeholder="Password"
//                           value={Password}
//                           onChange={(e) => setPassword(e.target.value)}
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setPasswordShow(!PasswordShow)}
//                           className="passbtn"
//                         >
//                           {PasswordShow ? (
//                             <FaEye style={{ color: "white" }} />
//                           ) : (
//                             <FaEyeSlash style={{ color: "white" }} />
//                           )}
//                         </button>
//                       </InputGroup>
//                       <small className="text-muted">
//                         Password must contain at least 8 characters including uppercase, lowercase, number, and special character
//                       </small>
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 <Row>
//                   <div className="col-12">
//                     <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
//                       <Form.Label className="lato-regular">
//                         Confirm Password<span style={{ color: "red" }}>*</span>
//                       </Form.Label>
//                       <InputGroup className="col-lg-3 mb-2">
//                         <Form.Control
//                           type={PasswordShow1 ? "text" : "password"}
//                           className="login-input"
//                           placeholder="Confirm Password"
//                           value={CPassword}
//                           onChange={(e) => setCPassword(e.target.value)}
//                           required
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setPasswordShow1(!PasswordShow1)}
//                           className="passbtn"
//                         >
//                           {PasswordShow1 ? (
//                             <FaEye style={{ color: "white" }} />
//                           ) : (
//                             <FaEyeSlash style={{ color: "white" }} />
//                           )}
//                         </button>
//                       </InputGroup>
//                       {Password && CPassword && Password !== CPassword && (
//                         <small className="text-danger">Passwords do not match</small>
//                       )}
//                     </Form.Group>
//                   </div>
//                 </Row>

//                 {/* Terms and Conditions */}
//                 <div>
//                   <Form style={{ display: "flex", padding: "0 4px" }}>
//                     <div className="mb-3">
//                       <Form.Check
//                         inline
//                         label="I agree to the terms and conditions"
//                         name="termndcond"
//                         type="checkbox"
//                         checked={termndcond}
//                         onChange={(e) => setTermndcond(e.target.checked)}
//                         required
//                       />
//                     </div>
//                   </Form>
//                 </div>

//                 {/* Submit Button */}
//                 <Row>
//                   <div
//                     style={{
//                       float: "right",
//                       display: "flex",
//                       justifyContent: "center",
//                       padding: "0px 100px",
//                     }}
//                   >
//                     <button
//                       type="button"
//                       onClick={TeacherRegister}
//                       disabled={loading}
//                       style={{ 
//                         background: "none", 
//                         border: "none", 
//                         padding: 0,
//                         opacity: loading ? 0.7 : 1 
//                       }}
//                     >
//                       <Button1 text={loading ? "Registering..." : "Register"} />
//                     </button>
//                   </div>
//                 </Row>
//               </div>
//             </div>

//             {/* Right Side - Welcome Section */}
//             <div className="col-md-6">
//               <div className="signup-bg-img">
//                 <div className="line-1">
//                   <h2 className="alfa-slab" style={{ color: "#5140EB" }}>
//                     Welcome To,
//                   </h2>
//                   <img src={logo} alt="Logo" className="w-50" />
                  
//                   {/* Show referral info if present */}
//                   {referrerInfo && (
//                     <div className="mt-3 p-3" style={{ background: "#f8f9fa", borderRadius: "8px" }}>
//                       <h6 style={{ color: "#28a745" }}>🎉 You're joining through a referral!</h6>
//                       <p className="mb-0" style={{ fontSize: "14px", color: "#6c757d" }}>
//                         Referred by: <strong>{referrerInfo.name}</strong>
//                       </p>
//                       <small style={{ color: "#6c757d" }}>
//                         You and your referrer may be eligible for rewards!
//                       </small>
//                     </div>
//                   )}

//                   <span
//                     className="fs-6 space-mono-regular fw-normal"
//                     style={{ textAlign: "center" }}
//                   >
//                     If you already have an account, Login Here
//                   </span>

//                   <div>
//                     <a
//                       href="/login"
//                       style={{ textDecoration: "none" }}
//                       className="d-flex justify-content-center align-items-center"
//                     >
//                       <Button1 text={"Log In"} />
//                     </a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* OTP Modal */}
//       <Modal
//         show={show}
//         onHide={handleClose}
//         backdrop="static"
//         keyboard={false}
//         style={{ zIndex: "9999999", borderRadius: "none" }}
//       >
//         <Modal.Header style={{ backgroundColor: "navy", borderRadius: "unset" }}>
//           <Modal.Title style={{ color: "white" }}>Enter OTP</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="formGroupOTP">
//               <Form.Control type="text" placeholder="Enter OTP" maxLength="6" />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant=""
//             style={{
//               backgroundColor: "green",
//               border: "1px solid green",
//               color: "white",
//             }}
//             onClick={() => navigate("/login")}
//           >
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default SignUp;  
 
 
import React, { useState, useEffect } from "react";
import { InputGroup, Modal, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEyeSlash, FaEye, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "../LoginPage3/LoginPage3.css";
import axios from "axios";
import swal from "sweetalert";
import logo from "./../../assets/logo.png";
import Button1 from "../Button1";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

 
  const urlParams = new URLSearchParams(location.search);
  // const urlReferralCode = urlParams.get('ref');
const urlReferralCode = urlParams.get('referral'); 
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  // Basic Info States
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [CPassword, setCPassword] = useState("");
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [termndcond, setTermndcond] = useState(false);

  // Referral States
  const [referralCode, setReferralCode] = useState(urlReferralCode || "");
  const [referralValid, setReferralValid] = useState(null);
  const [referrerInfo, setReferrerInfo] = useState(null);
  const [validatingReferral, setValidatingReferral] = useState(false);

  // Bank Details States (now compulsory)
  const [bankDetails, setBankDetails] = useState({
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branchName: "",
    accountHolderName: ""
  });

  // Location States
  const [Country, setCountry] = useState("");
  const [State, setState] = useState("");
  const [City, setCity] = useState("");

  // UI States
  const [PasswordShow, setPasswordShow] = useState(false);
  const [PasswordShow1, setPasswordShow1] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!referralCode) return;

    const delay = setTimeout(() => {
      validateReferralCode(referralCode);
    }, 800);

    return () => clearTimeout(delay);
  }, [referralCode]);

  const validateReferralCode = async (code) => {
    if (!code.trim()) {
      setReferralValid(null);
      setReferrerInfo(null);
      return;
    }

    setValidatingReferral(true);
    try {
      const response = await axios.post(
        "http://localhost:8774/api/admin/validateReferralCode",
        { referralCode: code.trim() },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setReferralValid(true);
        setReferrerInfo(response.data.referrer);
      }
    } catch (error) {
      setReferralValid(false);
      setReferrerInfo(null);
    } finally {
      setValidatingReferral(false);
    }
  };

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setBankDetails(prev => ({
      ...prev,
      [name]: name === 'ifsc' ? value.toUpperCase() : value
    }));
  };

  const TeacherRegister = async () => {
    // Basic validation
    if (!FirstName || !LastName || !Mobile || !Email || !Password || !CPassword || !whatsAppNumber) {
      return swal({
        title: "Oops!",
        text: "Please fill in all required fields",
        icon: "error",
        button: "Ok!",
      });
    }

    if (Password !== CPassword) {
      return swal({
        title: "Oops!",
        text: "Passwords do not match",
        icon: "error",
        button: "Ok!",
      });
    }

    if (!termndcond) {
      return swal({
        title: "Oops!",
        text: "Please agree to the terms and conditions",
        icon: "error",
        button: "Ok!",
      });
    }

    // Bank details validation
    // if () {
    //   return swal({
    //     title: "Oops!",
    //     text: "Please fill in all bank details",
    //     icon: "error",
    //     button: "Ok!",
    //   });
    // }

    if (referralCode && !referralValid) {
      return swal({
        title: "Oops!",
        text: "Please enter a valid referral code or leave it empty",
        icon: "error",
        button: "Ok!",
      });
    }

    setLoading(true);
    try {
      const config = {
        url: "/admin/registerTeacher",
        method: "post",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
        },
        data: {
          FirstName,
          LastName,
          Mobile,
          Email,
          Password,
          whatsAppNumber,
          CPassword,
          termndcond,
          referralCode: referralCode || undefined,
          Country,
          State,
          City,
          bankDetails
        },
      };

      let res = await axios(config);

      if (res.status === 200) {
        handleClose();
        
        const successMessage = `Registration successful!\nTeacher ID: ${res.data.teacherId}\nYour Referral Code: ${res.data.referralCode}`;
        
        swal({
          title: "Welcome!",
          text: successMessage,
          icon: "success",
          button: "Continue to Login",
        }).then(() => {
          navigate("/login");
        });

        if (referralCode && referrerInfo) {
          setTimeout(() => {
            swal({
              title: "Referral Success!",
              text: `You were successfully referred by ${referrerInfo.name}. Both of you may be eligible for rewards!`,
              icon: "success",
              button: "Great!",
            });
          }, 2000);
        }
      }
    } catch (error) {
      swal({
        title: "Oops!",
        text: error.response?.data?.error || "Registration failed. Please try again.",
        icon: "error",
        button: "Ok!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container p-3">
        <div className="box">
          <div className="row">
            <div className="col-6">
              <div className="page2-content-display p-4">
                <h4 style={{ textAlign: "center" }} className="space-mono-bolder">
                  Register Here
                </h4>
                <hr />

                {/* Name Fields */}
                <Row>
                  <Col>
                    <Form.Group className="mb-2" controlId="formGroupFirstName">
                      <Form.Label className="lato-regular">
                        First Name<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your First Name"
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-2" controlId="formGroupLastName">
                      <Form.Label className="lato-regular">
                        Last Name<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Your Last Name"
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* Contact Fields */}
                <Row>
                  <div className="col-12">
                    <Form.Group className="mb-2" controlId="formGroupMobile">
                      <Form.Label className="lato-regular">
                        Mobile Number<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter Your Mobile Number"
                        value={Mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        maxLength="10"
                        required
                      />
                    </Form.Group>
                  </div>
                </Row>

                <Row>
                  <div className="col-12">
                    <Form.Group className="mb-2" controlId="formGroupWhatsApp">
                      <Form.Label className="lato-regular">
                        WhatsApp Number<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter Your WhatsApp Number"
                        value={whatsAppNumber}
                        onChange={(e) => setWhatsAppNumber(e.target.value)}
                        maxLength="10"
                        required
                      />
                    </Form.Group>
                  </div>
                </Row>

                {/* Email Field */}
                <Row>
                  <div className="col-12">
                    <Form.Label className="lato-regular">
                      Email ID<span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <InputGroup className="mb-2">
                      <Form.Control
                        className="login-input"
                        type="email"
                        placeholder="Enter Email ID"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </InputGroup>
                  </div>
                </Row>

                {/* Location Fields */}
                <Row>
                  <Col>
                    <Form.Group className="mb-2" controlId="formGroupCountry">
                      <Form.Label className="lato-regular">Country</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Country"
                        value={Country}
                        onChange={(e) => setCountry(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-2" controlId="formGroupState">
                      <Form.Label className="lato-regular">State</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter State"
                        value={State}
                        onChange={(e) => setState(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <div className="col-12">
                    <Form.Group className="mb-2" controlId="formGroupCity">
                      <Form.Label className="lato-regular">City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter City"
                        value={City}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Form.Group>
                  </div>
                </Row>

                {/* Referral Code Field */}
                <Form.Group className="mb-2" controlId="formGroupReferral">
                  <Form.Label className="lato-regular">
                    Referral Code (Optional)
                    {validatingReferral && <Spinner size="sm" className="ms-2" />}
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="text"
                      placeholder="Enter Referral Code"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                    {referralValid === true && (
                      <InputGroup.Text style={{ background: "#d4edda", border: "1px solid #c3e6cb" }}>
                        <FaCheckCircle style={{ color: "#155724" }} />
                      </InputGroup.Text>
                    )}
                    {referralValid === false && (
                      <InputGroup.Text style={{ background: "#f8d7da", border: "1px solid #f5c6cb" }}>
                        <FaTimesCircle style={{ color: "#721c24" }} />
                      </InputGroup.Text>
                    )}
                  </InputGroup>
                  {referralValid === true && referrerInfo && (
                    <Alert variant="success" className="mt-2 py-2">
                      <small>✅ Valid referral code! Referred by: <strong>{referrerInfo.name}</strong> (ID: {referrerInfo.teacherId})</small>
                    </Alert>
                  )}
                  {referralValid === false && (
                    <Alert variant="danger" className="mt-2 py-2">
                      <small>❌ Invalid referral code. Please check and try again.</small>
                    </Alert>
                  )}
                </Form.Group>

                {/* Bank Details Section - Now Compulsory */}
                {/* <div className="mt-3 mb-3">
                  <h6 className="text-primary">Bank Details <span style={{ color: "red" }}>*</span></h6>
                  <hr className="my-2" />
                </div> */}

                {/* <Row>
               
                  <Col>
                    <Form.Group className="mb-2" controlId="formGroupAccountNumber">
                      <Form.Label className="lato-regular">
                        Account Number<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Account Number"
                        name="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={handleBankDetailChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-2" controlId="formGroupIFSC">
                      <Form.Label className="lato-regular">
                        IFSC Code<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter IFSC Code"
                        name="ifsc"
                        value={bankDetails.ifsc}
                        onChange={handleBankDetailChange}
                        style={{ textTransform: 'uppercase' }}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-2" controlId="formGroupBankName">
                      <Form.Label className="lato-regular">
                        Bank Name<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Bank Name"
                        name="bankName"
                        value={bankDetails.bankName}
                        onChange={handleBankDetailChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <div className="col-12">
                    <Form.Group className="mb-2" controlId="formGroupBranchName">
                      <Form.Label className="lato-regular">
                        Branch Name<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Branch Name"
                        name="branchName"
                        value={bankDetails.branchName}
                        onChange={handleBankDetailChange}
                        required
                      />
                    </Form.Group>
                  </div>
                </Row> */}

                {/* Password Fields */}
                <Row>
                  <div className="col-12">
                    <Form.Group className="mb-2" controlId="formGroupPassword">
                      <Form.Label className="lato-regular">
                        Password<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup className="col-lg-3 mb-2">
                        <Form.Control
                          type={PasswordShow ? "text" : "password"}
                          className="login-input"
                          placeholder="Password"
                          value={Password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordShow(!PasswordShow)}
                          className="passbtn"
                        >
                          {PasswordShow ? (
                            <FaEye style={{ color: "white" }} />
                          ) : (
                            <FaEyeSlash style={{ color: "white" }} />
                          )}
                        </button>
                      </InputGroup>
                      <small className="text-muted">
                        Password must contain at least 8 characters including uppercase, lowercase, number, and special character
                      </small>
                    </Form.Group>
                  </div>
                </Row>

                <Row>
                  <div className="col-12">
                    <Form.Group className="mb-2" controlId="formGroupConfirmPassword">
                      <Form.Label className="lato-regular">
                        Confirm Password<span style={{ color: "red" }}>*</span>
                      </Form.Label>
                      <InputGroup className="col-lg-3 mb-2">
                        <Form.Control
                          type={PasswordShow1 ? "text" : "password"}
                          className="login-input"
                          placeholder="Confirm Password"
                          value={CPassword}
                          onChange={(e) => setCPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordShow1(!PasswordShow1)}
                          className="passbtn"
                        >
                          {PasswordShow1 ? (
                            <FaEye style={{ color: "white" }} />
                          ) : (
                            <FaEyeSlash style={{ color: "white" }} />
                          )}
                        </button>
                      </InputGroup>
                      {Password && CPassword && Password !== CPassword && (
                        <small className="text-danger">Passwords do not match</small>
                      )}
                    </Form.Group>
                  </div>
                </Row>

                {/* Terms and Conditions */}
                <div>
                  <Form style={{ display: "flex", padding: "0 4px" }}>
                    <div className="mb-3">
                      <Form.Check
                        inline
                        label="I agree to the terms and conditions"
                        name="termndcond"
                        type="checkbox"
                        checked={termndcond}
                        onChange={(e) => setTermndcond(e.target.checked)}
                        required
                      />
                    </div>
                  </Form>
                </div>

                {/* Submit Button */}
                <Row>
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                      justifyContent: "center",
                      padding: "0px 100px",
                    }}
                  >
                    <button
                      type="button"
                      onClick={TeacherRegister}
                      disabled={loading}
                      style={{ 
                        background: "none", 
                        border: "none", 
                        padding: 0,
                        opacity: loading ? 0.7 : 1 
                      }}
                    >
                      <Button1 text={loading ? "Registering..." : "Register"} />
                    </button>
                  </div>
                </Row>
              </div>
            </div>

            {/* Right Side - Welcome Section */}
            <div className="col-md-6">
              <div className="signup-bg-img">
                <div className="line-1">
                  <h2 className="alfa-slab" style={{ color: "#5140EB" }}>
                    Welcome To,
                  </h2>
                  <img src={logo} alt="Logo" className="w-50" />
                  
                  {referrerInfo && (
                    <div className="mt-3 p-3" style={{ background: "#f8f9fa", borderRadius: "8px" }}>
                      <h6 style={{ color: "#28a745" }}>🎉 You're joining through a referral!</h6>
                      <p className="mb-0" style={{ fontSize: "14px", color: "#6c757d" }}>
                        Referred by: <strong>{referrerInfo.name}</strong>
                      </p>
                      <small style={{ color: "#6c757d" }}>
                        You and your referrer may be eligible for rewards!
                      </small>
                    </div>
                  )}

                  <span
                    className="fs-6 space-mono-regular fw-normal"
                    style={{ textAlign: "center" }}
                  >
                    If you already have an account, Login Here
                  </span>

                  <div>
                    <a
                      href="/login"
                      style={{ textDecoration: "none" }}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Button1 text={"Log In"} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "9999999", borderRadius: "none" }}
      >
        <Modal.Header style={{ backgroundColor: "navy", borderRadius: "unset" }}>
          <Modal.Title style={{ color: "white" }}>Enter OTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupOTP">
              <Form.Control type="text" placeholder="Enter OTP" maxLength="6" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant=""
            style={{
              backgroundColor: "green",
              border: "1px solid green",
              color: "white",
            }}
            onClick={() => navigate("/login")}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SignUp;
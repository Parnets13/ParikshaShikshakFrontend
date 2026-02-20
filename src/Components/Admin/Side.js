// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   LuActivity,
//   LuBookMarked,
//   LuFileQuestion,
//   LuIndianRupee,
//   LuListOrdered,
//   LuLogOut,
//   LuPackageX,
//   LuUserCog,
// } from "react-icons/lu";
// import { FaQuestion, FaUpload, FaWeightHanging } from "react-icons/fa";
// import { IoMdContact } from "react-icons/io";
// import { FaShop, FaRegIdCard, FaCircleUser } from "react-icons/fa6";
// import { GiFlatPlatform, GiNewspaper } from "react-icons/gi";
// import { RiSecurePaymentLine } from "react-icons/ri";
// import { AiOutlineSnippets } from "react-icons/ai";
// import { GrGallery } from "react-icons/gr";
// import { IoPeopleOutline, IoNewspaperOutline } from "react-icons/io5";
// import { PiExamFill, PiHandshakeLight } from "react-icons/pi";
// import {
//   MdOutlineKeyboardArrowDown,
//   MdOutlineTipsAndUpdates,
//   MdOutlineKeyboardArrowUp,
//   MdOutlineSupportAgent,
//   MdOutlineAddComment,
//   MdEventAvailable,
//   MdSubject,
//   MdOutlineKeyboardArrowLeft,
//   MdOutlineReviews,
// } from "react-icons/md";
// import { FaFileAlt } from "react-icons/fa";
// import { AiOutlineAppstoreAdd } from "react-icons/ai";
// import { LuAlignHorizontalJustifyStart } from "react-icons/lu";
// import { IoEarth } from "react-icons/io5";
// import "../Admin/Admin.css";
// import Navbar from "react-bootstrap/Navbar";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { AiOutlineClose } from "react-icons/ai";
// import { MdLooksOne } from "react-icons/md";
// import { PiNumberSquareTwoFill } from "react-icons/pi";
// import { PiNumberSquareThreeFill } from "react-icons/pi";
// import { PiNumberSquareFourFill } from "react-icons/pi";
// import { PiNumberSquareFiveFill } from "react-icons/pi";
// import { TiTick } from "react-icons/ti";
// import { FaArrowsLeftRightToLine } from "react-icons/fa6";
// import { FaPersonCircleQuestion } from "react-icons/fa6";
// import logo from "./../../assets/logo.png";

// const Side = () => {
//   const [question, setquestion] = useState(false);

//   const [Board, setBoard] = useState(false);
//   const [DiffLevel, setDiffLevel] = useState(false);
//   const [Class, setClass] = useState(false);
//   const [Medium, setMedium] = useState(false);
//   const [Examination, setExamination] = useState(false);
//   const [Subject, setSubject] = useState(false);
//   const [Weightage, setWeightage] = useState(false);
//   const [Questions, setQuestions] = useState(false);
//   const [QuestionLevel, setQuestionLevel] = useState(false);
//   const [ExamLevel, setExamLevel] = useState(false);
//   const [UserList, setUserList] = useState(false);
//   const [AccountHistory, setAccountHistory] = useState(false);
//   const [SyllabusCopy, setsyllabusCopy] = useState(false);
//   const [onesentence, setOnesentence] = useState(false);
//   const [twosentence, setTwosentence] = useState(false);
//   const [threesentence, setThreesentence] = useState(false);
//   const [foursentence, setFoursentence] = useState(false);
//   const [fivesentence, setFivesentence] = useState(false);
//   const [recorrect, setRecorrect] = useState(false);
//   const [match, setMatch] = useState(false);
//   const [relationship, setRelationship] = useState(false);

//   const [fiveandsix, setfiveandsix] = useState(false);
//   const [six, setsix] = useState(false);
//   const [seven, setseven] = useState(false);
//   const [eight, seteight] = useState(false);
//   const [ten, setten] = useState(false);
//   const [expandexplain, setexpandexplain] = useState(false);
//   const [oddandout, setoddandout] = useState(false);
//   const [mcq, setmcq] = useState(false);
//   const [passage, setpassage] = useState(false);
//   const [questAnalysis, setquestAnalysis] = useState(false);

//   // Responsive sidebar
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//   const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
//   return (
//     <div>
//       <Navbar expand="lg" className=" p-0" style={{ background: "#E17D1F" }}>
//         <button
//           class="custom-toggler navbar-toggler"
//           type="button"
//           data-toggle="collapse"
//           data-target="#navbarsExample09"
//           aria-controls="navbarsExample09"
//           aria-expanded={!isNavCollapsed ? true : false}
//           aria-label="Toggle navigation"
//           onClick={handleNavCollapse}
//           style={{ margin: "10px" }}
//         >
//           <span>
//             <GiHamburgerMenu style={{ color: "white" }} />
//           </span>
//         </button>
//         <div
//           class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
//           id="navbarsExample09"
//         >
//           <div className="si09">
//             <div style={{ display: "flex", justifyContent: "space-between" }}>
//               <div className="lo-ad">
//                 <img src={logo} alt="adminlogo" className="admin-logo-img" />
//               </div>
//               <div className="sidebar-close-icon" onClick={handleNavCollapse}>
//                 <AiOutlineClose />
//               </div>
//             </div>
//             <ul>
//               <Link to="" onClick={handleNavCollapse}>
//                 <li className="a-ele ">
//                   <span>
//                     <MdOutlineSupportAgent style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Dashboard</span>
//                 </li>
//               </Link>
//               <Link to="/adminmedium" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(true);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <LuFileQuestion style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Medium Add</span>
//                 </li>
//               </Link>
//               <Link to="/adminclass" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(true);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <LuBookMarked style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Class Add</span>
//                 </li>
//               </Link>

//               <Link to="/adminboard" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(true);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <LuAlignHorizontalJustifyStart
//                       style={{ fontSize: "20px" }}
//                     />
//                   </span>
//                   <span className="ms-2">Board Add </span>
//                 </li>
//               </Link>
//               <Link to="/adminexam" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(true);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <IoPeopleOutline style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Name Of Examination Add</span>
//                 </li>
//               </Link>

//               <Link to="/adminsubject" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(true);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <MdSubject style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Subject Add</span>
//                 </li>
//               </Link>
//               <Link to="/weightageofthecontent" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(true);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <PiExamFill style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Subject Part Add</span>
//                 </li>
//               </Link>
//               <Link to="/admindifficultylevel" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(true);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <LuAlignHorizontalJustifyStart
//                       style={{ fontSize: "20px" }}
//                     />
//                   </span>
//                   <span className="ms-2">Difficulty Level </span>
//                 </li>
//               </Link>

//               <Link to="/adminchapter" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(true);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setRecorrect(false);
//                     setFivesentence(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Chapters Add</span>
//                 </li>
//               </Link>
//               <Link to="/adminquestions" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(true);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setsyllabusCopy(false);
//                     setAccountHistory(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setRelationship(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaShop style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Questions Add</span>
//                 </li>
//               </Link>
//               <Link to="/questiontype" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(true);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">QuestionType Add</span>
//                 </li>
//               </Link>
//               <Link to="/questionheader" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele"
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(true);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Question Header Add</span>
//                 </li>
//               </Link>
//               <Link
//                 to="/adminquestionsanalysisheadertype"
//                 onClick={handleNavCollapse}
//               >
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(true);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Questions Analysis Header</span>
//                 </li>
//               </Link>
//               <Link to="/admin_upload_pdf" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(true);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setsyllabusCopy(false);
//                     setAccountHistory(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setRelationship(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaUpload style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Upload Questions</span>
//                 </li>
//               </Link>
//               <Link to="/adminblueprintdetails" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(true);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Blue Print Add</span>
//                 </li>
//               </Link>
//               <Link to="/adminblueprintheadertype" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(true);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Blue Print Header</span>
//                 </li>
//               </Link>

//               <Link to="/adminstudentmark" onClick={handleNavCollapse} >
//               <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(true);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Student Mark List</span>
//                 </li>
//               </Link>

//               <Link to="/Adminanswersheet2" onClick={handleNavCollapse} >
//                 <li
//                   className="a-ele"
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(true);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
                
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
                  
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging
//                       style={{ fontSize: "20px"}}
//                     />
//                   </span>
//                   <span className="ms-2">Answer sheet Format</span>
//                 </li>
//               </Link>

//               <Link to="/indivisualmark" onClick={handleNavCollapse} >
//                 <li
//                   className="a-ele"
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(true);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
                
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
                  
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging
//                       style={{ fontSize: "20px"}}
//                     />
//                   </span>
//                   <span className="ms-2">Indivisual Marks</span>
//                 </li>
//               </Link>

//               <Link to="/adminobjectives" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele"
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(true);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Objectives Add</span>
//                 </li>
//               </Link>

//               <Link to="/adminsyllabuscopy" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele"
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(false);
//                     setsyllabusCopy(true);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaWeightHanging style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Syllabus Add</span>
//                 </li>
//               </Link>
//               <Link to="/adminuserlist" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(true);
//                     setAccountHistory(false);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setRecorrect(false);
//                     setFoursentence(false);
//                     setMatch(false);
//                     setFivesentence(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <FaCircleUser style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">UserList</span>
//                 </li>
//               </Link>
//               <Link to="/Admin_generated_question" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(true);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}
//                 >
//                   <span>
//                     <GiNewspaper style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Genrated Question </span>
//                 </li>
//               </Link>
//               <Link to="/adminacchistory" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(true);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                     setquestAnalysis(false);
//                   }}

//                 >
//                   <span>
//                     <IoNewspaperOutline style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Account History </span>
//                 </li>
//               </Link>


//               <Link to="/achievementrecord" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(true);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                   }}
//                 >
//                   <span>
//                     <IoNewspaperOutline style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Achievement Record 1 To 4 </span>
//                 </li>
//               </Link>
//               <Link to="/achievementrecord2" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(true);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                   }}
//                 >
//                   <span>
//                     <IoNewspaperOutline style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Achievement Record 5 to 8</span>
//                 </li>
//               </Link>
//               <Link to="/achievementrecord3" onClick={handleNavCollapse}>
//                 <li
//                   className="a-ele "
//                   onClick={() => {
//                     setBoard(false);
//                     setDiffLevel(false);
//                     setClass(false);
//                     setMedium(false);
//                     setExamination(false);
//                     setSubject(false);
//                     setWeightage(false);
//                     setQuestions(false);
//                     setQuestionLevel(false);
//                     setExamLevel(false);
//                     setUserList(false);
//                     setAccountHistory(true);
//                     setsyllabusCopy(false);
//                     setOnesentence(false);
//                     setTwosentence(false);
//                     setThreesentence(false);
//                     setFoursentence(false);
//                     setFivesentence(false);
//                     setRecorrect(false);
//                     setMatch(false);
//                     setfiveandsix(false);
//                     setsix(false);
//                     setseven(false);
//                     seteight(false);
//                     setten(false);
//                     setexpandexplain(false);
//                     setoddandout(false);
//                     setmcq(false);
//                     setpassage(false);
//                   }}
//                 >
//                   <span>
//                     <IoNewspaperOutline style={{ fontSize: "20px" }} />
//                   </span>
//                   <span className="ms-2">Achievement Record 9 &10</span>
//                 </li>
//               </Link>
//             </ul>
//           </div>
//         </div>
//       </Navbar>
//     </div>
//   );
// };

// export default Side;
 
 





 
"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { LuBookMarked, LuFileQuestion } from "react-icons/lu"
import { FaUpload, FaWeightHanging } from "react-icons/fa"
import { FaShop, FaCircleUser } from "react-icons/fa6"
import { GiNewspaper } from "react-icons/gi"
import { IoPeopleOutline, IoNewspaperOutline } from "react-icons/io5"
import { PiExamFill } from "react-icons/pi"
import { MdOutlineSupportAgent, MdSubject } from "react-icons/md"
import { LuAlignHorizontalJustifyStart } from "react-icons/lu"
import "../Admin/Admin.css"
import Navbar from "react-bootstrap/Navbar"
import { GiHamburgerMenu } from "react-icons/gi"
import { AiOutlineClose } from "react-icons/ai"
import logo from "./../../assets/logo.png"

const Side = () => {
  const [question, setquestion] = useState(false)

  const [Board, setBoard] = useState(false)
  const [DiffLevel, setDiffLevel] = useState(false)
  const [Class, setClass] = useState(false)
  const [Medium, setMedium] = useState(false)
  const [Examination, setExamination] = useState(false)
  const [Subject, setSubject] = useState(false)
  const [Weightage, setWeightage] = useState(false)
  const [Questions, setQuestions] = useState(false)
  const [QuestionLevel, setQuestionLevel] = useState(false)
  const [ExamLevel, setExamLevel] = useState(false)
  const [UserList, setUserList] = useState(false)
  const [AccountHistory, setAccountHistory] = useState(false)
  const [SyllabusCopy, setsyllabusCopy] = useState(false)
  const [onesentence, setOnesentence] = useState(false)
  const [twosentence, setTwosentence] = useState(false)
  const [threesentence, setThreesentence] = useState(false)
  const [foursentence, setFoursentence] = useState(false)
  const [fivesentence, setFivesentence] = useState(false)
  const [recorrect, setRecorrect] = useState(false)
  const [match, setMatch] = useState(false)
  const [relationship, setRelationship] = useState(false)

  const [fiveandsix, setfiveandsix] = useState(false)
  const [six, setsix] = useState(false)
  const [seven, setseven] = useState(false)
  const [eight, seteight] = useState(false)
  const [ten, setten] = useState(false)
  const [expandexplain, setexpandexplain] = useState(false)
  const [oddandout, setoddandout] = useState(false)
  const [mcq, setmcq] = useState(false)
  const [passage, setpassage] = useState(false)
  const [questAnalysis, setquestAnalysis] = useState(false)

  // Responsive sidebar
  const [isNavCollapsed, setIsNavCollapsed] = useState(true)
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed)
  return (
    <div>
      <Navbar expand="lg" className=" p-0" style={{ background: "#E17D1F" }}>
        <button
          class="custom-toggler navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample09"
          aria-controls="navbarsExample09"
          aria-expanded={!isNavCollapsed ? true : false}
          aria-label="Toggle navigation"
          onClick={handleNavCollapse}
          style={{ margin: "10px" }}
        >
          <span>
            <GiHamburgerMenu style={{ color: "white" }} />
          </span>
        </button>
        <div class={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`} id="navbarsExample09">
          <div className="si09">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="lo-ad">
                <img src={logo || "/placeholder.svg"} alt="adminlogo" className="admin-logo-img" />
              </div>
              <div className="sidebar-close-icon" onClick={handleNavCollapse}>
                <AiOutlineClose />
              </div>
            </div>
            <ul>
              <Link to="/dashboard" onClick={handleNavCollapse}>
                <li className="a-ele ">
                  <span>01.</span>
                  <span>
                    <MdOutlineSupportAgent style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Dashboard</span>
                </li>
              </Link>
              <Link to="/adminmedium" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(true)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>02.</span>
                  <span>
                    <LuFileQuestion style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Medium Add</span>
                </li>
              </Link>
              <Link to="/adminclass" onClick={handleNavCollapse}>
                    <li
                      className="a-ele "
                      onClick={() => {
                        setBoard(false)
                        setDiffLevel(false)
                        setClass(true)
                        setMedium(false)
                        setExamination(false)
                        setSubject(false)
                        setWeightage(false)
                        setQuestions(false)
                        setQuestionLevel(false)
                        setExamLevel(false)
                        setUserList(false)
                        setAccountHistory(false)
                        setsyllabusCopy(false)
                        setOnesentence(false)
                        setTwosentence(false)
                        setThreesentence(false)
                        setFoursentence(false)
                        setFivesentence(false)
                        setRecorrect(false)
                        setMatch(false)
                        setfiveandsix(false)
                        setsix(false)
                        setseven(false)
                        seteight(false)
                        setten(false)
                        setexpandexplain(false)
                        setoddandout(false)
                        setmcq(false)
                        setpassage(false)
                        setquestAnalysis(false)
                      }}
                    >
                      <span>03.</span>
                      <span>
                        <LuBookMarked style={{ fontSize: "20px" }} />
                      </span>
                      <span className="ms-2">Class Add</span>
                    </li>
              </Link>

              <Link to="/adminboard" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(true)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>04.</span>
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Board Add </span>
                </li>
              </Link>
              <Link to="/adminexam" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(true)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>05.</span>
                  <span>
                    <IoPeopleOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Name Of Examination Add</span>
                </li>
              </Link>

              <Link to="/adminsubject" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(true)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>06.</span>
                  <span>
                    <MdSubject style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Subject Add</span>
                </li>
              </Link>
              <Link to="/weightageofthecontent" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(true)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>07.</span>
                  <span>
                    <PiExamFill style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Subject Part Add</span>
                </li>
              </Link>
              <Link to="/admindifficultylevel" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(true)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>08.</span>
                  <span>
                    <LuAlignHorizontalJustifyStart style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Difficulty Level </span>
                </li>
              </Link>

              <Link to="/adminchapter" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(true)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setRecorrect(false)
                    setFivesentence(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>09.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Chapters Add</span>
                </li>
              </Link>
              <Link to="/adminquestions" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(true)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setsyllabusCopy(false)
                    setAccountHistory(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setRelationship(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>10.</span>
                  <span>
                    <FaShop style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Questions Add</span>
                </li>
              </Link>
              <Link to="/questiontype" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(true)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>11.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">QuestionType Add</span>
                </li>
              </Link>
              <Link to="/questionheader" onClick={handleNavCollapse}>
                <li
                  className="a-ele"
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(true)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>12.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Question Header Add</span>
                </li>
              </Link>
              <Link to="/adminquestionsanalysisheadertype" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(true)
                  }}
                >
                  <span>13.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Questions Analysis Header</span>
                </li>
              </Link>
              <Link to="/admin_upload_pdf" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(true)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setsyllabusCopy(false)
                    setAccountHistory(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setRelationship(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>14.</span>
                  <span>
                    <FaUpload style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Upload Questions</span>
                </li>
              </Link>
              <Link to="/adminblueprintdetails" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(true)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>15.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Blue Print Add</span>
                </li>
              </Link>
              <Link to="/adminblueprintheadertype" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(true)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>16.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Blue Print Header</span>
                </li>
              </Link>

              <Link to="/adminstudentmark" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(true)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>17.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Student Mark List</span>
                </li>
              </Link>

              <Link to="/Adminanswersheet2" onClick={handleNavCollapse}>
                <li
                  className="a-ele"
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(true)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)

                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                  }}
                >
                  <span>18.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Answer sheet Format</span>
                </li>
              </Link>

              <Link to="/indivisualmark" onClick={handleNavCollapse}>
                <li
                  className="a-ele"
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(true)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)

                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                  }}
                >
                  <span>19.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Indivisual Marks</span>
                </li>
              </Link>

              <Link to="/adminobjectives" onClick={handleNavCollapse}>
                <li
                  className="a-ele"
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(true)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>20.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Objectives Add</span>
                </li>
              </Link>  
               
            

              <Link to="/adminsyllabuscopy" onClick={handleNavCollapse}>
                <li
                  className="a-ele"
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(true)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>21.</span>
                  <span>
                    <FaWeightHanging style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Syllabus Add</span>
                </li>
              </Link>
              <Link to="/adminuserlist" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(true)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setRecorrect(false)
                    setFoursentence(false)
                    setMatch(false)
                    setFivesentence(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>22.</span>
                  <span>
                    <FaCircleUser style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Reffer&Earn</span>
                </li>
              </Link>
              <Link to="/Admin_generated_question" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(true)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                    setquestAnalysis(false)
                  }}
                >
                  <span>23.</span>
                  <span>
                    <GiNewspaper style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Genrated Question </span>
                </li>
              </Link>
             
              {/* <Link to="/AddCover" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(true)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>24.</span>
                  <span>
                    <IoNewspaperOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Cover Page</span>
                </li>
              </Link> */}

              <Link to="/achievementrecord" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(true)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>24.</span>
                  <span>
                    <IoNewspaperOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">ResultSheet</span>
                </li>
              </Link> 

      
              {/* <Link to="/achievementrecord" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(true)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>24.</span>
                  <span>
                    <IoNewspaperOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">ResultSheet</span>
                </li>
              </Link>  */} 
              
                   <Link to="/AddCover" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(true)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>25.</span>
                  <span>
                    <IoNewspaperOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Coverpage</span>
                </li>
              </Link> 
          <Link to="/ReferralPricingDashboard" onClick={handleNavCollapse}>
                <li
                  className="a-ele " 
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(true)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>26.</span>
                  <span>
                    <IoNewspaperOutline style={{fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Admin Reffer</span>
                </li>
              </Link>      

                   <Link to="/admintutorial" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(true)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>27.</span>
                  <span>
                    <IoNewspaperOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Tutorial</span>
                </li>
              </Link>

              <Link to="/setsubscription" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>28.</span>
                  <span>
                    <IoNewspaperOutline style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Set Subscription</span>
                </li>
              </Link>

              <Link to="/manageschoolprofile" onClick={handleNavCollapse}>
                <li
                  className="a-ele "
                  onClick={() => {
                    setBoard(false)
                    setDiffLevel(false)
                    setClass(false)
                    setMedium(false)
                    setExamination(false)
                    setSubject(false)
                    setWeightage(false)
                    setQuestions(false)
                    setQuestionLevel(false)
                    setExamLevel(false)
                    setUserList(false)
                    setAccountHistory(false)
                    setsyllabusCopy(false)
                    setOnesentence(false)
                    setTwosentence(false)
                    setThreesentence(false)
                    setFoursentence(false)
                    setFivesentence(false)
                    setRecorrect(false)
                    setMatch(false)
                    setfiveandsix(false)
                    setsix(false)
                    setseven(false)
                    seteight(false)
                    setten(false)
                    setexpandexplain(false)
                    setoddandout(false)
                    setmcq(false)
                    setpassage(false)
                  }}
                >
                  <span>29.</span>
                  <span>
                    <FaCircleUser style={{ fontSize: "20px" }} />
                  </span>
                  <span className="ms-2">Manage School Profile</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </Navbar>
    </div>
  )
}

export default Side


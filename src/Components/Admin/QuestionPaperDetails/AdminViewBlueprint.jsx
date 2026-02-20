// import axios from "axios";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";
// import React, { useEffect, useState } from "react";
// import { Button, Table } from "react-bootstrap";
// import { useLocation, useNavigate } from "react-router-dom";
// import parse from "html-react-parser";
// import swal from "sweetalert";
// import AdminViewQuestionPaper from "./AdminViewQuestionPaper"; 
// import AdminNoLineQuestionPaper from "./AdminNolineQuestionPaper"

// function AdminViewBlueprint({ state2 }) {
//   const adminFromSession = JSON.parse(localStorage.getItem("admin"));
//   const userFromSession = JSON.parse(localStorage.getItem("user"));
// const user = JSON.parse(localStorage.getItem("user"));
//   let admin;
//   if (adminFromSession) {
//     admin = adminFromSession;
//   } else if (userFromSession) {
//     admin = userFromSession;
//   }

 


//   const token = localStorage.getItem("token");

//   // console.log("checkkkk", admin, token);
//   const navigate = useNavigate();
//   const state1 = useLocation();
//   const state = state1?.state?.item || state2 || {}

//   // const [blueprint, setblueprint] = useState([]);
//   // const getallblueprint = async () => {
//   //   try {
//   //     let res = await axios.get(
//   //       "http://localhost:8774/api/admin/blueprintall"
//   //     );

//   //     if (res.status === 200) {
//   //       setblueprint(res.data.success);
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };
 
   
//   // const [blueprint, setblueprint] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// const getFilteredBlueprints = async () => {
//   try {
//     setLoading(true);
//     setError(null);
    
//     const queryParams = new URLSearchParams();
//     if (state?.Board) queryParams.append('board', state.Board);
//     if (state?.Medium) queryParams.append('medium', state.Medium);
//     if (state?.Class) queryParams.append('className', state.Class);
//     if (state?.Sub_Class) queryParams.append('subClassName', state.Sub_Class);
//     if (state?.Subject) queryParams.append('subjects', state.Subject);
//     if (state?.Exam_Name) queryParams.append('exameName', state.Exam_Name);

//     const res = await axios.get(
//       `http://localhost:8774/api/admin/filteredBlueprints?${queryParams.toString()}`
//     );

//     if (res.status === 200) {
//       setblueprint(res.data.success);
//     }
//   } catch (error) {
//     console.log('Error fetching filtered blueprints:', error);
//     setError(error.response?.data?.error || 'Failed to load blueprints');
//     setblueprint([]);
//   } finally {
//     setLoading(false);
//   }
// };
// const [QuestionHeader, setQuestionHeader] = useState([]);
//   const getQuestionHeaderbyMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
//           state?.Medium +
//           "/" +
//           user?._id,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         setQuestionHeader(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };    
   
//     // useEffect(() => {
//     //   GetBluePrintHeaderByMedium();
//     //   getQuestionHeaderbyMedium();
//     // }, [state?.Medium]); 
     
//      useEffect(() => {
//   GetBluePrintHeaderByMedium();
//   getFilteredBlueprints();
// }, [state?.Medium, state?.Board, state?.Class, state?.Sub_Class, state?.Subject, state?.Exam_Name]);
//   function niqueDataName(AllChapterData) {
//     const uniqueObjectsArray = [];
//     const uniqueNames = new Set(); // Using a Set to keep track of unique names

//     AllChapterData?.forEach((ele, i) => {
//       const chapterName = ele?.Blueprintchapter;
//       if (!uniqueNames.has(chapterName)) {
//         uniqueNames.add(chapterName);
//         uniqueObjectsArray.push({
//           index: i + 1,
//           name: chapterName,
//         });
//       }
//     });
//     return uniqueObjectsArray;
//   }

//   function bluePrintTotalQues(AllChapterData, chapterName, Qtype) {
//     let obj = { TotalQ: "", totalMas: 0 };
//     let am = AllChapterData?.filter(
//       (item) =>
//         item?.BluePrintQuestiontype == Qtype &&
//         item?.Blueprintchapter == chapterName
//     );
//     if (am.length != 0) {
//       obj["TotalQ"] = am?.reduce(
//         (a, am) => a + Number(am?.Blueprintnoofquestion),
//         0
//       );
//       obj["totalMas"] = am?.reduce(
//         (a, am) =>
//           a + Number(am?.Blueprintnoofquestion * am?.BluePrintmarksperquestion),
//         0
//       );
//     }
//     return obj;
//   }
//   var TotalMask = 0;
//   const QuestionNameWiseMask = (AllChapterData, chapterName) => {
//     let obj = { TotalQ: "", totalMas: "" };
//     let am = AllChapterData?.filter(
//       (item) => item?.Blueprintchapter == chapterName
//     );
//     if (am.length != 0) {
//       obj["totalMas"] = am?.reduce(
//         (a, am) =>
//           a + Number(am?.Blueprintnoofquestion * am?.BluePrintmarksperquestion),
//         0
//       );
//       TotalMask = TotalMask + obj.totalMas;
//     }
//     return obj;
//   };
//   const upcomingStaus = async (status, val) => {
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
//           id: state?._id,
//           authId: admin?._id,
//           bluePrintId: val?._id,
//           status: status,
//         },
//       };

//       let res = await axios(config);
//       if (res.status === 200) {
//         // if (val.SubClassName === "10") {
//         //   return navigate("/class10thquestionpaper");
//         // } else   
//         //  {
//         return navigate("/adminviewquestionpaper", { 
//           state: { ...state, bluePrint: val },
//         });
//         // }
//       }
//     }
//     catch (error) {
//       console.log(error);
//       swal({
//         title: "Oops!",
//         text: error.response.data.error,
//         icon: "error",
//         button: "OK!",
//       });
//     }
//   };

//   const createPDF = async () => {
//     const pdf = new jsPDF("portrait", "pt", "a4");
//     //  pdf.classList.add("no-zoom");
//     const data = await html2canvas(document.querySelector("#pdf"), {
//       useCORS: true,
//     });
//     const img = data.toDataURL("image/png");
//     const imgProperties = pdf.getImageProperties(img);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
//     pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("Blueprint.pdf");
//   };

//   const createPDF1 = async () => {
//     const pdf = new jsPDF("landscape", "pt", "a4");
//     //  pdf.classList.add("no-zoom");
//     const data = await html2canvas(document.querySelector("#pdf1"), {
//       useCORS: true,
//     });
//     const img = data.toDataURL("image/png");
//     const imgProperties = pdf.getImageProperties(img);
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
//     pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
//     pdf.save("Blueprint.pdf");
//   };


//   // BluePrint Header
//   const [bluePrintHeader, setbluePrintHeader] = useState({});
//   const GetBluePrintHeaderByMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getblueprintheaderbymedium/" +
//         state?.Medium
//       );
//       if (res.status === 200) {
//         setbluePrintHeader(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     GetBluePrintHeaderByMedium();
//     getallblueprint();
//   }, []);
// if (loading) {
//   return (
//     <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
//       <div className="spinner-border" role="status">
//         <span className="sr-only">Loading...</span>
//       </div>
//       <span className="ml-2">Loading blueprints...</span>
//     </div>
//   );
// }

// if (error) {
//   return (
//     <div className="alert alert-danger" role="alert">
//       <h4 className="alert-heading">Error!</h4>
//       <p>{error}</p>
//       <button 
//         className="btn btn-outline-danger" 
//         onClick={() => getFilteredBlueprints()}
//       >
//         Retry
//       </button>
//     </div>
//   );
// }

// if (blueprint.length === 0) {
//   return (
//     <div className="alert alert-info" role="alert">
//       <h4 className="alert-heading">No Blueprints Found</h4>
//       <p>No blueprints match the current criteria.</p>
//     </div>
//   );
// }
//   return (
//     <div>
//       <div className="">
//         <div className="">
//           <div className="" >
//             <div className="">
              
//               <div className="mt-2 " id="details-display-id3">
//                 {/* {blueprint
//                   ?.filter(
//                     (ele) =>
//                       ele?.board === state?.Board &&
//                       ele?.medium === state?.Medium &&
//                       ele?.className === state?.Class &&
//                       ele?.SubClassName === state?.Sub_Class &&
//                       ele?.subjects === state?.Subject &&
//                       ele?.ExameName === state?.Exam_Name
//                   )
//                   ?.map((val, i) =>   */} 
//                   {blueprint?.map((val, i) => 
//                     {
//                     return (
//                       <div className="blueprint-content-display" key={i} >
//                         {/* <div id="pdf"  className="a4-page" > */} 
//                         <div id="pdf" 
//      className="a4-page" 
//      style={{ 
//        border: "2px solid #000",
//        pageBreakBefore: "always",
//        pageBreakInside: "avoid",
//        boxSizing: "border-box",
//        marginBottom: "10px"
//      }}>
//                           <div
//                             className=""
//                             // style={{ border: "2px solid black", size: "A4" }}
//                           >
//                             <div className="blueprint-titles">
//                               <div className="top-titles-container">
//                                 <div className="container">
//                                   <div className="row">
//                                     <div className="col-2 col-sm-2 col-md-2 col-lg-2">
//                                       {state?.School_Logo ? (
//                                         <img
//                                           src={`${state?.School_Logo}`}
//                                           alt=""
//                                           style={{
//                                             width: "80px",
//                                             marginTop: "24px",
//                                           }}
//                                         />
//                                       ) : (
//                                         <></>
//                                       )}
//                                     </div>
//                                     <div className="col-10 col-sm-10 col-md-10 col-lg-10">
//                                       <div className="title-1 text-center">
//                                         <h6 style={{ fontWeight: "bold" }}>
//                                           {state?.Institute_Name}
//                                         </h6>
//                                         {/* <h4>ಸಾಂತಾ ಪಾಲ್ ಶಾಲೇ</h4> */}
//                                       </div>
//                                       <div className="title-2">
//                                         <h6 style={{ fontWeight: "bold" }}>
//                                           {state?.SchoolAddress}
//                                         </h6>
//                                         {/* <h5>ಬೆಂಗಳೂರು</h5> */}
//                                       </div>
//                                       <div className="title-3">
//                                         <h6 style={{ fontWeight: "bold" }}>
//                                           {val?.blName}
//                                         </h6>
//                                         <h6 style={{ fontWeight: "bold" }}>
//                                           {bluePrintHeader?.BluePrintName}
//                                         </h6>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>

//                               <div className="container mt-2">
//                                 <div className="row">
//                                   <div className="class-details">
//                                     <div className="class-data">
//                                       <b> 
                               
//                                         {state?.Sub_Class}</b>
//                                     </div>
//                                     <div className="class-data">
                                      
//                                         <b>
//                                         {QuestionHeader?.subject}:{" "}
//                                         {val?.subjects}
//                                       </b>
//                                     </div>
//                                     <div>
//                                       <div className="class-data">
//                                         {/* <b>ಬೋರ್ಡ್: {val?.board}</b> */} 
//                                          <b>
//                                           {QuestionHeader?.blueprintBoard}:{" "}
//                                           {val?.board}
//                                         </b>
//                                       </div>
//                                       <div className="class-data">
//                                         {/* <b>ಸಮಯ: {val?.DurationOfExam}</b> */} 
//                                          <b>
//                                           {QuestionHeader?.time}:{" "}
//                                           {val?.DurationOfExam}
//                                         </b>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
                            
//                             <div className="" style={{ padding: '8px' }} >
//                               {/* Table 1 - Unit Wise Marks */}
//                               <div className="weightage-objectives mt-1 " style={{ marginBottom: '10px'}}>
//                                 <div className="main-title" style={{ fontSize: '18px', marginBottom: '8px' }}>
//                                   <b>1.</b>
//                                   <b style={{ marginLeft: '5px' }}>{bluePrintHeader?.UnitWiseMrk}</b>
//                                 </div>
//                                 <div className="objectives-table">
//                                   <Table responsive bordered hover size="md" style={{
//                                     border: "2px solid black",
//                                     fontSize: '15px',
//                                     marginBottom: '10px'
//                                   }}>
//                                     <thead>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.SNo}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Lessons}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Questions}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Marks}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Percentage}</th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       {niqueDataName(val?.AllChapter)?.map((item, i) => (
//                                         <tr key={i} style={{ border: "2px solid black" }}>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}><b>{i + 1}</b></td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}><b>{item?.name}</b></td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}>
//                                             <b>
//                                               {val?.AllChapter?.filter(ele => ele?.Blueprintchapter == item?.name)
//                                                 ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion), 0)}
//                                             </b>
//                                           </td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}>
//                                             <b>
//                                               {val?.AllChapter?.filter(ele => ele?.Blueprintchapter == item?.name)
//                                                 ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion), 0)}
//                                             </b>
//                                           </td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}>
//                                             <b>
//                                               {(
//                                                 (val?.AllChapter?.filter(ele => ele?.Blueprintchapter == item?.name)
//                                                   ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion), 0) /
//                                                   val?.AllChapter?.reduce((a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion), 0)
//                                                 ) * 100)?.toFixed(2)}%
//                                             </b>
//                                           </td>
//                                         </tr>
//                                       ))}
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Total}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>100%</b></td>
//                                       </tr>
//                                     </tbody>
//                                   </Table>
//                                 </div>
//                               </div>

//                               {/* Table 2 - Objective Marks */}
//                               <div className="weightage-objectives " style={{ marginBottom: '10px' }}>
//                                 <div className="main-title" style={{ fontSize: '18px', marginBottom: '8px' }}>
//                                   <b>2.</b>
//                                   <b style={{ marginLeft: '5px' }}>{bluePrintHeader?.ObjectiveMrks}</b>
//                                 </div>
//                                 <div className="objectives-table">
//                                   <Table responsive bordered hover style={{
//                                     border: "2px solid black",
//                                     fontSize: '15px',
//                                     marginBottom: '10px'
//                                   }}>
//                                     <thead>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.SNo}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Specifics}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Questions}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Marks}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Percentage}</th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       {val?.objectives?.map((item, i) => (
//                                         <tr key={i} style={{ border: "2px solid black" }}>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}><b>{i + 1}</b></td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}><b>{item?.Objective}</b></td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}>
//                                             <b>
//                                               {val?.AllChapter?.filter(ele => ele?.Blueprintobjective == item?.Objective)
//                                                 ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion), 0)}
//                                             </b>
//                                           </td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}>
//                                             <b>
//                                               {val?.AllChapter?.filter(ele => ele?.Blueprintobjective == item?.Objective)
//                                                 ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion), 0)}
//                                             </b>
//                                           </td>
//                                           <td style={{ border: "1px solid black", padding: '8px' }}>
//                                             <b>
//                                               {(
//                                                 (val?.AllChapter?.filter(ele => ele?.Blueprintobjective == item?.Objective)
//                                                   ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion), 0) /
//                                                   val?.AllChapter?.reduce((a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion), 0)
//                                                 ) * 100
//                                               )?.toFixed(2)}%
//                                             </b>
//                                           </td>
//                                         </tr>
//                                       ))}
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Total}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>100%</b></td>
//                                       </tr>
//                                     </tbody>
//                                   </Table>
//                                 </div>
//                               </div>

//                               {/* Table 3 - Question Wise Marks */}
//                               <div className="weightage-objectives " style={{ marginBottom: '10px' }}>
//                                 <div className="main-title" style={{ fontSize: '18px', marginBottom: '8px' }}>
//                                   <b>3.</b>
//                                   <b style={{ marginLeft: '5px' }}>{bluePrintHeader?.QuestionWiseMrk}</b>
//                                 </div>
//                                 <div className="objectives-table">
//                                   <Table responsive bordered hover size="sm" style={{
//                                     border: "2px solid black",
//                                     fontSize: '15px',
//                                     marginBottom: '10px'
//                                   }}>
//                                     <thead>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.SNo}</b></th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.TypeOfQuestion}</b></th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Questions}</b></th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Marks}</b></th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Percentage}</b></th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>1</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Objectivequestion}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "O T")
//                                               ?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}
//                                           </b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "O T")
//                                               ?.reduce((a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion), 0)}
//                                           </b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {(
//                                               (val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "O T")
//                                                 ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion), 0) /
//                                                 val?.AllChapter?.reduce((a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion), 0)
//                                               ) * 100)?.toFixed(2)}%
//                                           </b>
//                                         </td>
//                                       </tr>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>2</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.ShortanswerQ}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "V.S.A" || item?.BluePrintQuestiontype == "S.A")
//                                               ?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}
//                                           </b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "V.S.A" || item?.BluePrintQuestiontype == "S.A")
//                                               ?.reduce((a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion), 0)}
//                                           </b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {(
//                                               (val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "V.S.A" || item?.BluePrintQuestiontype == "S.A")
//                                                 ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion), 0) /
//                                                 val?.AllChapter?.reduce((a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion), 0)
//                                               ) * 100
//                                             )?.toFixed(2)}%
//                                           </b>
//                                         </td>
//                                       </tr>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>3</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.LonganswerQ}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "L.A 1" || item?.BluePrintQuestiontype == "L.A 2" || item?.BluePrintQuestiontype == "L.A 3")
//                                               ?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}
//                                           </b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "L.A 1" || item?.BluePrintQuestiontype == "L.A 2" || item?.BluePrintQuestiontype == "L.A 3")
//                                               ?.reduce((a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion), 0)}
//                                           </b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>
//                                             {(
//                                               (val?.AllChapter?.filter(item => item?.BluePrintQuestiontype == "L.A 1" || item?.BluePrintQuestiontype == "L.A 2" || item?.BluePrintQuestiontype == "L.A 3")
//                                                 ?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion), 0) /
//                                                 val?.AllChapter?.reduce((a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion), 0)
//                                               ) * 100
//                                             )?.toFixed(2)}%
//                                           </b>
//                                         </td>
//                                       </tr>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Total}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>100%</b></td>
//                                       </tr>
//                                     </tbody>
//                                   </Table>
//                                 </div>
//                               </div>

//                               {/* Table 4 - Difficulty Level Marks */}
//                               <div className="weightage-objectives ">
//                                 <div className="main-title" style={{ fontSize: '18px', marginBottom: '8px' }}>
//                                   <b>4.</b>
//                                   <b style={{ marginLeft: '5px' }}>{bluePrintHeader?.AccordingRigorMrk}</b>
//                                 </div>
//                                 <div className="objectives-table">
//                                   <Table responsive bordered hover size="md" style={{
//                                     border: "2px solid black",
//                                     fontSize: '15px'
//                                   }}>
//                                     <thead>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.SNo}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.LevelOfDifficult}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Questions}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Marks}</th>
//                                         <th style={{ border: "1px solid black", padding: '8px' }}>{bluePrintHeader?.Percentage}</th>
//                                       </tr>
//                                     </thead>
//                                     <tbody>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>1</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Easy}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.Easy}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.EasyMask}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.EasyParcentage}%</b></td>
//                                       </tr>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>2</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.MediumQ}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.Average}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.AverageMask}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.AverageParcentage}%</b></td>
//                                       </tr>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>3</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Difficult}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.Difficult}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.DifficultMask}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{val?.DifficultParcentage}%</b></td>
//                                       </tr>
//                                       <tr style={{ border: "2px solid black" }}>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>{bluePrintHeader?.Total}</b></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}></td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}>
//                                           <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid black", padding: '8px' }}><b>100%</b></td>
//                                       </tr>
//                                     </tbody>
//                                   </Table>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div> 
//                         <div id="pdf1" 
//      className="a4-page" 
//      style={{ 
//        border: "2px solid #000 ",
//        pageBreakBefore: "always",
//        pageBreakInside: "avoid",
//        boxSizing: "border-box",
//        marginBottom: "10px"
//      }}>
//                           <div style={{ fontFamily: "sans-serif" }}>
//                             <div className="blueprint2-container" style={{ padding: "5px" }}>
//                               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
//                                 <div><b>{bluePrintHeader?.Time} : {val?.DurationOfExam}</b></div>
//                                 <div><b>{bluePrintHeader?.BluePrintName}</b></div>
//                                 <div>
//                                   <b>
//                                     {bluePrintHeader?.Marks} :-
//                                     {val?.AllChapter?.reduce(
//                                       (a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
//                                       0
//                                     )}
//                                   </b>
//                                 </div>
//                               </div>

//                               <div >
//                                 <Table responsive bordered style={{
//                                   border: "1px solid #000",
//                                   width: "100%",
//                                   tableLayout: "fixed",
//                                   fontSize: "9px"
//                                 }}>
//                                   <thead>
//                                     <tr style={{ border: "1px solid #000" }}>
//                                       <th style={{ width: "3%", border: "1px solid #000",overflow:"hidden" }}>
//                                         <b>{bluePrintHeader?.SNo}</b>
//                                       </th>
//                                       <th style={{ width: "12%", border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.TargetUnit}</b>
//                                       </th>
//                                       {val?.objectives?.map((ele) => (
//                                         <th colSpan={6} style={{ border: "1px solid #000" }}>
//                                           {ele?.Objective}
//                                         </th>
//                                       ))}
//                                       <th colSpan={6} style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.TotalQuestion}</b>
//                                       </th>
//                                       <th colSpan={1} style={{ border: "1px solid #000",overflow:"hidden" }}>
//                                         <b>{bluePrintHeader?.TotalMarks}</b>
//                                       </th>
//                                     </tr>
//                                   </thead>
//                                   <tbody>
//                                     <tr style={{ border: "1px solid #000" }}>
//                                       <th style={{ border: "1px solid #000" }}></th>
//                                       <th style={{ border: "1px solid #000" }}></th>
//                                       {val?.objectives?.map(() => (
//                                         <>
//                                           <th style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.V}</b>
//                                           </th>
//                                           <th colSpan={2} style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.K}</b>
//                                           </th>
//                                           <th colSpan={3} style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.D}</b>
//                                           </th>
//                                         </>
//                                       ))}
//                                       <th style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.V}</b>
//                                       </th>
//                                       <th colSpan={2} style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.K}</b>
//                                       </th>
//                                       <th colSpan={3} style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.D}</b>
//                                       </th>
//                                     </tr>

//                                     <tr style={{ border: "1px solid #000" }}>
//                                       <th style={{ border: "1px solid #000" }}></th>
//                                       <th style={{ border: "1px solid #000" }}></th>
//                                       {val?.objectives?.map(() => (
//                                         <>
//                                           <th style={{ border: "1px solid #000" }}></th>
//                                           <th style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.VSA}</b>
//                                           </th>
//                                           <th style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.SA}</b>
//                                           </th>
//                                           <th style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.LA1}</b>
//                                           </th>
//                                           <th style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.LA2}</b>
//                                           </th>
//                                           <th style={{ border: "1px solid #000" }}>
//                                             <b>{bluePrintHeader?.LA3}</b>
//                                           </th>
//                                         </>
//                                       ))}
//                                       <th style={{ border: "1px solid #000" }}></th>
//                                       <th style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.VSA}</b>
//                                       </th>
//                                       <th style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.SA}</b>
//                                       </th>
//                                       <th style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.LA1}</b>
//                                       </th>
//                                       <th style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.LA2}</b>
//                                       </th>
//                                       <th style={{ border: "1px solid #000" }}>
//                                         <b>{bluePrintHeader?.LA3}</b>
//                                       </th>
//                                       <th style={{ border: "1px solid #000" }}></th>
//                                     </tr>

//                                     {niqueDataName(val?.AllChapter)?.map((ele, i) => (
//                                       <tr style={{ border: "1px solid #000" }}>
//                                         <td style={{ border: "1px solid #000" }}>
//                                           <b>{i + 1}</b>
//                                         </td>
//                                         <td style={{ border: "1px solid #000", fontWeight: "bold" }}>
//                                           {ele?.name}
//                                         </td>
//                                         {val?.objectives?.map((ele1) => (
//                                           <>
//                                             <td style={{ border: "1px solid #000" }}>
//                                               <b>
//                                                 {val?.AllChapter?.find(
//                                                   item => item?.Blueprintobjective === ele1?.Objective &&
//                                                     item?.BluePrintQuestiontype === "O T" &&
//                                                     item?.Blueprintchapter == ele?.name
//                                                 )?.Blueprintnoofquestion}
//                                               </b>
//                                               <b>
//                                                 {val?.AllChapter?.some(
//                                                   item => item?.Blueprintobjective == ele1?.Objective &&
//                                                     item?.BluePrintQuestiontype == "O T" &&
//                                                     item?.Blueprintchapter == ele?.name
//                                                 ) ? `*(${val?.AllChapter?.find(
//                                                   item => item?.Blueprintobjective == ele1?.Objective &&
//                                                     item?.BluePrintQuestiontype == "O T" &&
//                                                     item?.Blueprintchapter == ele?.name
//                                                 )?.BluePrintmarksperquestion
//                                                 })` : ""}
//                                               </b>
//                                             </td>
//                                             <td style={{ border: "1px solid #000" }}>
//                                               <b>
//                                                 {val?.AllChapter?.find(
//                                                   item => item?.Blueprintobjective == ele1?.Objective &&
//                                                     item?.BluePrintQuestiontype == "V.S.A" &&
//                                                     item?.Blueprintchapter == ele?.name
//                                                 )?.Blueprintnoofquestion}
//                                               </b>
//                                               <b>
//                                                 {val?.AllChapter?.some(
//                                                   item => item?.Blueprintobjective == ele1?.Objective &&
//                                                     item?.BluePrintQuestiontype == "V.S.A" &&
//                                                     item?.Blueprintchapter == ele?.name
//                                                 ) ? `*(${val?.AllChapter?.find(
//                                                   item => item?.Blueprintobjective == ele1?.Objective &&
//                                                     item?.BluePrintQuestiontype == "V.S.A" &&
//                                                     item?.Blueprintchapter == ele?.name
//                                                 )?.BluePrintmarksperquestion
//                                                 })` : ""}
//                                               </b>
//                                             </td>
//                                             <td style={{ border: "1px solid #000" }}>
//                                               {val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "S.A" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.Blueprintnoofquestion}
//                                               {val?.AllChapter?.some(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "S.A" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               ) ? `*(${val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "S.A" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.BluePrintmarksperquestion
//                                               })` : ""}
//                                             </td>
//                                             <td style={{ border: "1px solid #000" }}>
//                                               {val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 1" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.Blueprintnoofquestion}
//                                               {val?.AllChapter?.some(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 1" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               ) ? `*(${val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 1" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.BluePrintmarksperquestion
//                                               })` : ""}
//                                             </td>
//                                             <td style={{ border: "1px solid #000" }}>
//                                               {val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 2" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.Blueprintnoofquestion}
//                                               {val?.AllChapter?.some(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 2" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               ) ? `*(${val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 2" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.BluePrintmarksperquestion
//                                               })` : ""}
//                                             </td>
//                                             <td style={{ border: "1px solid #000" }}>
//                                               {val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 3" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.Blueprintnoofquestion}
//                                               {val?.AllChapter?.some(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 3" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               ) ? `*(${val?.AllChapter?.find(
//                                                 item => item?.Blueprintobjective == ele1?.Objective &&
//                                                   item?.BluePrintQuestiontype == "L.A 3" &&
//                                                   item?.Blueprintchapter == ele?.name
//                                               )?.BluePrintmarksperquestion
//                                               })` : ""}
//                                             </td>
//                                           </>
//                                         ))}
//                                         <td style={{ border: "1px solid #000" }}>
//                                           {bluePrintTotalQues(val?.AllChapter, ele?.name, "O T")?.TotalQ}
//                                         </td>
//                                         <td style={{ border: "1px solid #000" }}>
//                                           {bluePrintTotalQues(val?.AllChapter, ele?.name, "V.S.A")?.TotalQ}
//                                         </td>
//                                         <td style={{ border: "1px solid #000" }}>
//                                           {bluePrintTotalQues(val?.AllChapter, ele?.name, "S.A")?.TotalQ}
//                                         </td>
//                                         <td style={{ border: "1px solid #000" }}>
//                                           {bluePrintTotalQues(val?.AllChapter, ele?.name, "L.A 1")?.TotalQ}
//                                         </td>
//                                         <td style={{ border: "1px solid #000" }}>
//                                           {bluePrintTotalQues(val?.AllChapter, ele?.name, "L.A 2")?.TotalQ}
//                                         </td>
//                                         <td style={{ border: "1px solid #000" }}>
//                                           {bluePrintTotalQues(val?.AllChapter, ele?.name, "L.A 3")?.TotalQ}
//                                         </td>
//                                         <td style={{ border: "1px solid #000" }}>
//                                           {QuestionNameWiseMask(val?.AllChapter, ele?.name)?.totalMas}
//                                         </td>
//                                       </tr>
//                                     ))}

//                                     <tr style={{ border: "1px solid #000" }}>
//                                       <td style={{ border: "1px solid #000" }}></td>
//                                       <td style={{ border: "1px solid #000", fontWeight: "bold" }}>
//                                         {bluePrintHeader?.Total}
//                                       </td>
//                                       {val?.objectives?.map((ele) => (
//                                         <>
//                                           <td style={{ border: "1px solid #000" }}>
//                                             {val?.AllChapter?.some(
//                                               item => item?.Blueprintobjective == ele?.Objective &&
//                                                 item?.BluePrintQuestiontype == "O T"
//                                             ) ? (
//                                               <span>
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective === ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "O T"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}{" "}
//                                                 (
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "O T"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}
//                                                 )
//                                               </span>
//                                             ) : ""}
//                                           </td>
//                                           <td style={{ border: "1px solid #000" }}>
//                                             {val?.AllChapter?.some(
//                                               item => item?.Blueprintobjective == ele?.Objective &&
//                                                 item?.BluePrintQuestiontype == "V.S.A"
//                                             ) ? (
//                                               <span>
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "V.S.A"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}{" "}
//                                                 (
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "V.S.A"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}
//                                                 )
//                                               </span>
//                                             ) : ""}
//                                           </td>
//                                           <td style={{ border: "1px solid #000" }}>
//                                             {val?.AllChapter?.some(
//                                               item => item?.Blueprintobjective == ele?.Objective &&
//                                                 item?.BluePrintQuestiontype == "S.A"
//                                             ) ? (
//                                               <span>
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "S.A"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}{" "}
//                                                 (
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "S.A"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}
//                                                 )
//                                               </span>
//                                             ) : ""}
//                                           </td>
//                                           <td style={{ border: "1px solid #000" }}>
//                                             {val?.AllChapter?.some(
//                                               item => item?.Blueprintobjective == ele?.Objective &&
//                                                 item?.BluePrintQuestiontype == "L.A 1"
//                                             ) ? (
//                                               <span>
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "L.A 1"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}{" "}
//                                                 (
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "L.A 1"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}
//                                                 )
//                                               </span>
//                                             ) : ""}
//                                           </td>
//                                           <td style={{ border: "1px solid #000" }}>
//                                             {val?.AllChapter?.some(
//                                               item => item?.Blueprintobjective == ele?.Objective &&
//                                                 item?.BluePrintQuestiontype == "L.A 2"
//                                             ) ? (
//                                               <span>
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "L.A 2"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}{" "}
//                                                 (
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "L.A 2"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}
//                                                 )
//                                               </span>
//                                             ) : ""}
//                                           </td>
//                                           <td style={{ border: "1px solid #000" }}>
//                                             {val?.AllChapter?.some(
//                                               item => item?.Blueprintobjective == ele?.Objective &&
//                                                 item?.BluePrintQuestiontype == "L.A 3"
//                                             ) ? (
//                                               <span>
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "L.A 3"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}{" "}
//                                                 (
//                                                 {val?.AllChapter?.filter(
//                                                   item => item?.Blueprintobjective == ele?.Objective &&
//                                                     item?.BluePrintQuestiontype == "L.A 3"
//                                                 )?.reduce(
//                                                   (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
//                                                   0
//                                                 )}
//                                                 )
//                                               </span>
//                                             ) : ""}
//                                           </td>
//                                         </>
//                                       ))}
//                                       <td style={{ border: "1px solid #000" }}></td>
//                                       <td style={{ border: "1px solid #000" }}></td>
//                                       <td style={{ border: "1px solid #000" }}></td>
//                                       <td style={{ border: "1px solid #000" }}></td>
//                                       <td style={{ border: "1px solid #000" }}></td>
//                                       <td style={{ border: "1px solid #000" }}>
//                                         {val?.AllChapter?.reduce(
//                                           (a, ele) => a + Number(ele?.Blueprintnoofquestion),
//                                           0
//                                         )}
//                                       </td>
//                                       <td style={{ border: "1px solid #000" }}>
//                                         {val?.AllChapter?.reduce(
//                                           (a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
//                                           0
//                                         )}
//                                       </td>
//                                     </tr>
//                                   </tbody>
//                                 </Table>
//                               </div>
//                               <div style={{ marginTop: "10px", fontSize: "10px" }}>
//                                 <div>{bluePrintHeader?.Note}:-</div>
//                                 {parse(`<span>${val?.Instructions}</span>`)}
//                               </div>
//                             </div>
//                           </div>
                           
//                            </div>
                       
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* {blueprint.length>0 &&<AdminViewQuestionPaper state2={{ ...state, bluePrint: blueprint
//                   ?.filter(
//                     (ele) =>
//                       ele?.board === state?.Board &&
//                       ele?.medium === state?.Medium &&
//                       ele?.className === state?.Class &&
//                       ele?.SubClassName === state?.Sub_Class &&
//                       ele?.subjects === state?.Subject &&
//                       ele?.ExameName === state?.Exam_Name
//                   )[0] }}  />} */} 
//                   {blueprint.length > 0 && <AdminViewQuestionPaper state2={{ ...state, bluePrint: blueprint[0] }} />}
       
//     </div>
//   );
// }

// export default AdminViewBlueprint; 
 
 
 
 
 
"use client"

import axios from "axios"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"
import parse from "html-react-parser"
import swal from "sweetalert"
import AdminViewQuestionPaper from "./AdminViewQuestionPaper"

function AdminViewBlueprint({ state2 }) {
  const adminFromSession = JSON.parse(localStorage.getItem("admin"))
  const userFromSession = JSON.parse(localStorage.getItem("user"))
  const user = JSON.parse(localStorage.getItem("user"))
  let admin
  if (adminFromSession) {
    admin = adminFromSession
  } else if (userFromSession) {
    admin = userFromSession
  }

  const token = localStorage.getItem("token")

  // console.log("checkkkk", admin, token);
  const navigate = useNavigate()
  const state1 = useLocation()
  const state = state1?.state?.item || state2 || {}

  // const [blueprint, setblueprint] = useState([]);
  // const getallblueprint = async () => {
  //   try {
  //     let res = await axios.get(
  //       "http://localhost:8774/api/admin/blueprintall"
  //     );

  //     if (res.status === 200) {
  //       setblueprint(res.data.success);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const [blueprint, setblueprint] = useState([]);
  const [blueprint, setblueprint] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const getFilteredBlueprints = async () => {
    try {
      setLoading(true)
      setError(null)

      const queryParams = new URLSearchParams()
      if (state?.Board) queryParams.append("board", state.Board)
      if (state?.Medium) queryParams.append("medium", state.Medium)
      if (state?.Class) queryParams.append("className", state.Class)
      if (state?.Sub_Class) queryParams.append("subClassName", state.Sub_Class)
      if (state?.Subject) queryParams.append("subjects", state.Subject)
      if (state?.Exam_Name) queryParams.append("exameName", state.Exam_Name)

      const res = await axios.get(`http://localhost:8774/api/admin/filteredBlueprints?${queryParams.toString()}`)

      if (res.status === 200) {
        setblueprint(res.data.success)
      }
    } catch (error) {
      console.log("Error fetching filtered blueprints:", error)
      setError(error.response?.data?.error || "Failed to load blueprints")
      setblueprint([])
    } finally {
      setLoading(false)
    }
  }
  const [QuestionHeader, setQuestionHeader] = useState([])
  const getQuestionHeaderbyMedium = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8774/api/admin/questiontheadergetbymedium/" + state?.Medium + "/" + user?._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      if (res.status === 200) {
        setQuestionHeader(res.data.success)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(() => {
  //   GetBluePrintHeaderByMedium();
  //   getQuestionHeaderbyMedium();
  // }, [state?.Medium]);

  useEffect(() => {
    GetBluePrintHeaderByMedium()
    getFilteredBlueprints()
  }, [state?.Medium, state?.Board, state?.Class, state?.Sub_Class, state?.Subject, state?.Exam_Name])
  function niqueDataName(AllChapterData) {
    const uniqueObjectsArray = []
    const uniqueNames = new Set() // Using a Set to keep track of unique names

    AllChapterData?.forEach((ele, i) => {
      const chapterName = ele?.Blueprintchapter
      if (!uniqueNames.has(chapterName)) {
        uniqueNames.add(chapterName)
        uniqueObjectsArray.push({
          index: i + 1,
          name: chapterName,
        })
      }
    })
    return uniqueObjectsArray
  }

  function bluePrintTotalQues(AllChapterData, chapterName, Qtype) {
    const obj = { TotalQ: "", totalMas: 0 }
    const am = AllChapterData?.filter(
      (item) => item?.BluePrintQuestiontype == Qtype && item?.Blueprintchapter == chapterName,
    )
    if (am.length != 0) {
      obj["TotalQ"] = am?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)
      obj["totalMas"] = am?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion * am?.BluePrintmarksperquestion), 0)
    }
    return obj
  }
  var TotalMask = 0
  const QuestionNameWiseMask = (AllChapterData, chapterName) => {
    const obj = { TotalQ: "", totalMas: "" }
    const am = AllChapterData?.filter((item) => item?.Blueprintchapter == chapterName)
    if (am.length != 0) {
      obj["totalMas"] = am?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion * am?.BluePrintmarksperquestion), 0)
      TotalMask = TotalMask + obj.totalMas
    }
    return obj
  }
  const upcomingStaus = async (status, val) => {
    try {
      const config = {
        url: "/teacher/upadeteQuestionPaper",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: {
          id: state?._id,
          authId: admin?._id,
          bluePrintId: val?._id,
          status: status,
        },
      }

      const res = await axios(config)
      if (res.status === 200) {
        // if (val.SubClassName === "10") {
        //   return navigate("/class10thquestionpaper");
        // } else
        //  {
        return navigate("/adminviewquestionpaper", {
          state: { ...state, bluePrint: val },
        })
        // }
      }
    } catch (error) {
      console.log(error)
      swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      })
    }
  }

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4")
    //  pdf.classList.add("no-zoom");
    const data = await html2canvas(document.querySelector("#pdf"), {
      useCORS: true,
    })
    const img = data.toDataURL("image/png")
    const imgProperties = pdf.getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("Blueprint.pdf")
  }

  const createPDF1 = async () => {
    const pdf = new jsPDF("landscape", "pt", "a4")
    //  pdf.classList.add("no-zoom");
    const data = await html2canvas(document.querySelector("#pdf1"), {
      useCORS: true,
    })
    const img = data.toDataURL("image/png")
    const imgProperties = pdf.getImageProperties(img)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("Blueprint.pdf")
  }

  // BluePrint Header
  const [bluePrintHeader, setbluePrintHeader] = useState({})
  const GetBluePrintHeaderByMedium = async () => {
    try {
      const res = await axios.get("http://localhost:8774/api/admin/getblueprintheaderbymedium/" + state?.Medium)
      if (res.status === 200) {
        setbluePrintHeader(res.data.success)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const getallblueprint = async () => {
    try {
      await getFilteredBlueprints()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    GetBluePrintHeaderByMedium()
    getallblueprint()
  }, [])
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "400px" }}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <span className="ml-2">Loading blueprints...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{error}</p>
        <button className="btn btn-outline-danger" onClick={() => getFilteredBlueprints()}>
          Retry
        </button>
      </div>
    )
  }

  if (blueprint.length === 0) {
    return (
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">No Blueprints Found</h4>
        <p>No blueprints match the current criteria.</p>
      </div>
    )
  }
  return (
    <div>
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <div className="mt-2 " id="details-display-id3">
                {/* {blueprint
                  ?.filter(
                    (ele) =>
                      ele?.board === state?.Board &&
                      ele?.medium === state?.Medium &&
                      ele?.className === state?.Class &&
                      ele?.SubClassName === state?.Sub_Class &&
                      ele?.subjects === state?.Subject &&
                      ele?.ExameName === state?.Exam_Name
                  )
                  ?.map((val, i) =>   */}
                {blueprint?.map((val, i) => {
                  return (
                    <div className="blueprint-content-display" key={i} >
                      {/* <div id="pdf"  className="a4-page" > */}
                      <div
                        id="pdf"
                        className="a4-page"
                        style={{
                          border: "2px solid #000",
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                          boxSizing: "border-box",
                          marginBottom: "10px",
                        }}
                      >
                        <div
                          className=""
                          // style={{ border: "2px solid black", size: "A4" }}
                        >
                          <div className="blueprint-titles">
                            <div className="top-titles-container">
                              <div className="container">
                                <div className="row">
                                  <div className="col-2 col-sm-2 col-md-2 col-lg-2">
                                    {state?.School_Logo ? (
                                      <img
                                        src={`${state?.School_Logo}`}
                                        alt=""
                                        style={{
                                          width: "80px",
                                          marginTop: "24px",
                                        }}
                                      />
                                    ) : (
                                      <></>
                                    )}
                                  </div>
                                  <div className="col-10 col-sm-10 col-md-10 col-lg-10">
                                    <div className="title-1 text-center">
                                      <h6 style={{ fontWeight: "bold" }}>{state?.Institute_Name}</h6>
                                      {/* <h4>ಸಾಂತಾ ಪಾಲ್ ಶಾಲೇ</h4> */}
                                    </div>
                                    <div className="title-2">
                                      <h6 style={{ fontWeight: "bold" }}>{state?.SchoolAddress}</h6>
                                      {/* <h5>ಬೆಂಗಳೂರು</h5> */}
                                    </div>
                                    <div className="title-3">
                                      <h6 style={{ fontWeight: "bold" }}>{val?.blName}</h6>
                                      <h6 style={{ fontWeight: "bold" }}>{bluePrintHeader?.BluePrintName}</h6>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="container mt-2">
                              <div className="row">
                                <div className="class-details">
                                  <div className="class-data">
                                    <b>{state?.Sub_Class}</b>
                                  </div>
                                  <div className="class-data">
                                    <b>
                                      {QuestionHeader?.subject}: {val?.subjects}
                                    </b>
                                  </div>
                                  <div>
                                    <div className="class-data">
                                      {/* <b>ಬೋರ್ಡ್: {val?.board}</b> */}
                                      <b>
                                        {QuestionHeader?.blueprintBoard}: {val?.board}
                                      </b>
                                    </div>
                                    <div className="class-data">
                                      {/* <b>ಸಮಯ: {val?.DurationOfExam}</b> */}
                                      <b>
                                        {QuestionHeader?.time}: {val?.DurationOfExam}
                                      </b>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="" style={{ padding: "8px" }}>
                            {/* Table 1 - Unit Wise Marks */}
                            <div className="weightage-objectives mt-1 " style={{ marginBottom: "10px" }}>
                              <div className="main-title" style={{ fontSize: "18px", marginBottom: "8px" }}>
                                <b>1.</b>
                                <b style={{ marginLeft: "5px" }}>{bluePrintHeader?.UnitWiseMrk}</b>
                              </div>
                              <div className="objectives-table">
                                <Table
                                  responsive
                                  bordered
                                  hover
                                  size="md"
                                  style={{
                                    border: "2px solid black",
                                    fontSize: "15px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ border: "2px solid black" }}>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.SNo}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Lessons}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Questions}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Marks}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Percentage}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {niqueDataName(val?.AllChapter)?.map((item, i) => (
                                      <tr key={i} style={{ border: "2px solid black" }}>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>{i + 1}</b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>{item?.name}</b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>
                                            {val?.AllChapter?.filter(
                                              (ele) => ele?.Blueprintchapter == item?.name,
                                            )?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion), 0)}
                                          </b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>
                                            {val?.AllChapter?.filter(
                                              (ele) => ele?.Blueprintchapter == item?.name,
                                            )?.reduce(
                                              (a, ele) =>
                                                a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion),
                                              0,
                                            )}
                                          </b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>
                                            {(
                                              (val?.AllChapter?.filter(
                                                (ele) => ele?.Blueprintchapter == item?.name,
                                              )?.reduce(
                                                (a, ele) =>
                                                  a +
                                                  Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion),
                                                0,
                                              ) /
                                                val?.AllChapter?.reduce(
                                                  (a, ele) =>
                                                    a +
                                                    Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                                                  0,
                                                )) *
                                              100
                                            )?.toFixed(2)}
                                            %
                                          </b>
                                        </td>
                                      </tr>
                                    ))}
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Total}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>100%</b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>

                            {/* Table 2 - Objective Marks */}
                            <div className="weightage-objectives " style={{ marginBottom: "10px" }}>
                              <div className="main-title" style={{ fontSize: "18px", marginBottom: "8px" }}>
                                <b>2.</b>
                                <b style={{ marginLeft: "5px" }}>{bluePrintHeader?.ObjectiveMrks}</b>
                              </div>
                              <div className="objectives-table">
                                <Table
                                  responsive
                                  bordered
                                  hover
                                  style={{
                                    border: "2px solid black",
                                    fontSize: "15px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ border: "2px solid black" }}>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.SNo}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Specifics}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Questions}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Marks}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Percentage}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {val?.objectives?.map((item, i) => (
                                      <tr key={i} style={{ border: "2px solid black" }}>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>{i + 1}</b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>{item?.Objective}</b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>
                                            {val?.AllChapter?.filter(
                                              (ele) => ele?.Blueprintobjective == item?.Objective,
                                            )?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion), 0)}
                                          </b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>
                                            {val?.AllChapter?.filter(
                                              (ele) => ele?.Blueprintobjective == item?.Objective,
                                            )?.reduce(
                                              (a, ele) =>
                                                a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion),
                                              0,
                                            )}
                                          </b>
                                        </td>
                                        <td style={{ border: "1px solid black", padding: "8px" }}>
                                          <b>
                                            {(
                                              (val?.AllChapter?.filter(
                                                (ele) => ele?.Blueprintobjective == item?.Objective,
                                              )?.reduce(
                                                (a, ele) =>
                                                  a +
                                                  Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion),
                                                0,
                                              ) /
                                                val?.AllChapter?.reduce(
                                                  (a, ele) =>
                                                    a +
                                                    Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                                                  0,
                                                )) *
                                              100
                                            )?.toFixed(2)}
                                            %
                                          </b>
                                        </td>
                                      </tr>
                                    ))}
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Total}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>100%</b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>

                            {/* Table 3 - Question Wise Marks */}
                            <div className="weightage-objectives " style={{ marginBottom: "10px" }}>
                              <div className="main-title" style={{ fontSize: "18px", marginBottom: "8px" }}>
                                <b>3.</b>
                                <b style={{ marginLeft: "5px" }}>{bluePrintHeader?.QuestionWiseMrk}</b>
                              </div>
                              <div className="objectives-table">
                                <Table
                                  responsive
                                  bordered
                                  hover
                                  size="sm"
                                  style={{
                                    border: "2px solid black",
                                    fontSize: "15px",
                                    marginBottom: "10px",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ border: "2px solid black" }}>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.SNo}</b>
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.TypeOfQuestion}</b>
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Questions}</b>
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Marks}</b>
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Percentage}</b>
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>1</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Objectivequestion}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.AllChapter?.filter(
                                            (item) => item?.BluePrintQuestiontype == "O T",
                                          )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.AllChapter?.filter(
                                            (item) => item?.BluePrintQuestiontype == "O T",
                                          )?.reduce(
                                            (a, am) =>
                                              a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                            0,
                                          )}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {(
                                            (val?.AllChapter?.filter(
                                              (item) => item?.BluePrintQuestiontype == "O T",
                                            )?.reduce(
                                              (a, ele) =>
                                                a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion),
                                              0,
                                            ) /
                                              val?.AllChapter?.reduce(
                                                (a, ele) =>
                                                  a +
                                                  Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                                                0,
                                              )) *
                                            100
                                          )?.toFixed(2)}
                                          %
                                        </b>
                                      </td>
                                    </tr>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>2</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.ShortanswerQ}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.AllChapter?.filter(
                                            (item) =>
                                              item?.BluePrintQuestiontype == "V.S.A" ||
                                              item?.BluePrintQuestiontype == "S.A",
                                          )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.AllChapter?.filter(
                                            (item) =>
                                              item?.BluePrintQuestiontype == "V.S.A" ||
                                              item?.BluePrintQuestiontype == "S.A",
                                          )?.reduce(
                                            (a, am) =>
                                              a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                            0,
                                          )}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {(
                                            (val?.AllChapter?.filter(
                                              (item) =>
                                                item?.BluePrintQuestiontype == "V.S.A" ||
                                                item?.BluePrintQuestiontype == "S.A",
                                            )?.reduce(
                                              (a, ele) =>
                                                a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion),
                                              0,
                                            ) /
                                              val?.AllChapter?.reduce(
                                                (a, ele) =>
                                                  a +
                                                  Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                                                0,
                                              )) *
                                            100
                                          )?.toFixed(2)}
                                          %
                                        </b>
                                      </td>
                                    </tr>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>3</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.LonganswerQ}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.AllChapter?.filter(
                                            (item) =>
                                              item?.BluePrintQuestiontype == "L.A 1" ||
                                              item?.BluePrintQuestiontype == "L.A 2" ||
                                              item?.BluePrintQuestiontype == "L.A 3",
                                          )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.AllChapter?.filter(
                                            (item) =>
                                              item?.BluePrintQuestiontype == "L.A 1" ||
                                              item?.BluePrintQuestiontype == "L.A 2" ||
                                              item?.BluePrintQuestiontype == "L.A 3",
                                          )?.reduce(
                                            (a, am) =>
                                              a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                            0,
                                          )}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {(
                                            (val?.AllChapter?.filter(
                                              (item) =>
                                                item?.BluePrintQuestiontype == "L.A 1" ||
                                                item?.BluePrintQuestiontype == "L.A 2" ||
                                                item?.BluePrintQuestiontype == "L.A 3",
                                            )?.reduce(
                                              (a, ele) =>
                                                a + Number(ele?.Blueprintnoofquestion * ele?.BluePrintmarksperquestion),
                                              0,
                                            ) /
                                              val?.AllChapter?.reduce(
                                                (a, ele) =>
                                                  a +
                                                  Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                                                0,
                                              )) *
                                            100
                                          )?.toFixed(2)}
                                          %
                                        </b>
                                      </td>
                                    </tr>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Total}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>100%</b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>

                            {/* Table 4 - Difficulty Level Marks */}
                            <div className="weightage-objectives ">
                              <div className="main-title" style={{ fontSize: "18px", marginBottom: "8px" }}>
                                <b>4.</b>
                                <b style={{ marginLeft: "5px" }}>{bluePrintHeader?.AccordingRigorMrk}</b>
                              </div>
                              <div className="objectives-table">
                                <Table
                                  responsive
                                  bordered
                                  hover
                                  size="md"
                                  style={{
                                    border: "2px solid black",
                                    fontSize: "15px",
                                  }}
                                >
                                  <thead>
                                    <tr style={{ border: "2px solid black" }}>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.SNo}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.LevelOfDifficult}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Questions}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Marks}
                                      </th>
                                      <th style={{ border: "1px solid black", padding: "8px" }}>
                                        {bluePrintHeader?.Percentage}
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>1</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Easy}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.Easy}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.EasyMask}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.EasyParcentage}%</b>
                                      </td>
                                    </tr>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>2</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.MediumQ}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.Average}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.AverageMask}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.AverageParcentage}%</b>
                                      </td>
                                    </tr>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>3</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Difficult}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.Difficult}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.DifficultMask}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.DifficultParcentage}%</b>
                                      </td>
                                    </tr>
                                    <tr style={{ border: "2px solid black" }}>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{bluePrintHeader?.Total}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}></td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>{val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.NQA), 0)}</b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>
                                          {val?.TypesofQuestions?.reduce((a, i) => a + Number(i?.Mask * i?.NQA), 0)}
                                        </b>
                                      </td>
                                      <td style={{ border: "1px solid black", padding: "8px" }}>
                                        <b>100%</b>
                                      </td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        id="pdf1"
                        className="a4-page"
                        style={{
                          border: "2px solid #000 ",
                          pageBreakBefore: "always",
                          pageBreakInside: "avoid",
                          boxSizing: "border-box",
                          marginTop: "60px", 
                          marginBottom:"60px"
                        }}
                      >
                        <div style={{ fontFamily: "sans-serif" }}>
                          <div className="blueprint2-container" style={{ padding: "5px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                              <div>
                                <b>
                                  {bluePrintHeader?.Time} : {val?.DurationOfExam}
                                </b>
                              </div>
                              <div>
                                <b>{bluePrintHeader?.BluePrintName}</b>
                              </div>
                              <div>
                                <b>
                                  {bluePrintHeader?.Marks} :-
                                  {val?.AllChapter?.reduce(
                                    (a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                                    0,
                                  )}
                                </b>
                              </div>
                            </div>

                            <div>
                              <Table
                                responsive
                                bordered
                                style={{
                                  border: "1px solid #000",
                                  width: "100%",
                                  tableLayout: "fixed",
                                  fontSize: "9px",
                                }}
                              >
                                <thead>
                                  <tr style={{ border: "1px solid #000" }}>
                                    <th style={{ width: "3%", border: "1px solid #000", overflow: "hidden" }}>
                                      <b>{bluePrintHeader?.SNo}</b>
                                    </th>
                                    <th style={{ width: "12%", border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.TargetUnit}</b>
                                    </th>
                                    {val?.objectives?.map((ele, index) => (
                                      <th colSpan={6} style={{ border: "1px solid #000" }} key={index}>
                                        {ele?.Objective}
                                      </th>
                                    ))}
                                    <th colSpan={6} style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.TotalQuestion}</b>
                                    </th>
                                    <th colSpan={1} style={{ border: "1px solid #000", overflow: "hidden" }}>
                                      <b>{bluePrintHeader?.TotalMarks}</b>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr style={{ border: "1px solid #000" }}>
                                    <th style={{ border: "1px solid #000" }}></th>
                                    <th style={{ border: "1px solid #000" }}></th>
                                    {val?.objectives?.map(() => (
                                      <>
                                        <th style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.V}</b>
                                        </th>
                                        <th colSpan={2} style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.K}</b>
                                        </th>
                                        <th colSpan={3} style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.D}</b>
                                        </th>
                                      </>
                                    ))}
                                    <th style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.V}</b>
                                    </th>
                                    <th colSpan={2} style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.K}</b>
                                    </th>
                                    <th colSpan={3} style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.D}</b>
                                    </th>
                                  </tr>

                                  <tr style={{ border: "1px solid #000" }}>
                                    <th style={{ border: "1px solid #000" }}></th>
                                    <th style={{ border: "1px solid #000" }}></th>
                                    {val?.objectives?.map(() => (
                                      <>
                                        <th style={{ border: "1px solid #000" }}></th>
                                        <th style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.VSA}</b>
                                        </th>
                                        <th style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.SA}</b>
                                        </th>
                                        <th style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.LA1}</b>
                                        </th>
                                        <th style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.LA2}</b>
                                        </th>
                                        <th style={{ border: "1px solid #000" }}>
                                          <b>{bluePrintHeader?.LA3}</b>
                                        </th>
                                      </>
                                    ))}
                                    <th style={{ border: "1px solid #000" }}></th>
                                    <th style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.VSA}</b>
                                    </th>
                                    <th style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.SA}</b>
                                    </th>
                                    <th style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.LA1}</b>
                                    </th>
                                    <th style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.LA2}</b>
                                    </th>
                                    <th style={{ border: "1px solid #000" }}>
                                      <b>{bluePrintHeader?.LA3}</b>
                                    </th>
                                    <th style={{ border: "1px solid #000" }}></th>
                                  </tr>

                                  {niqueDataName(val?.AllChapter)?.map((ele, i) => (
                                    <tr style={{ border: "1px solid #000" }} key={i}>
                                      <td style={{ border: "1px solid #000" }}>
                                        <b>{i + 1}</b>
                                      </td>
                                      <td style={{ border: "1px solid #000", fontWeight: "bold" }}>{ele?.name}</td>
                                      {val?.objectives?.map((ele1) => (
                                        <>
                                          <td style={{ border: "1px solid #000" }}>
                                            <b>
                                              {
                                                val?.AllChapter?.find(
                                                  (item) =>
                                                    item?.Blueprintobjective === ele1?.Objective &&
                                                    item?.BluePrintQuestiontype === "O T" &&
                                                    item?.Blueprintchapter == ele?.name,
                                                )?.Blueprintnoofquestion
                                              }
                                            </b>
                                            <b>
                                              {val?.AllChapter?.some(
                                                (item) =>
                                                  item?.Blueprintobjective == ele1?.Objective &&
                                                  item?.BluePrintQuestiontype == "O T" &&
                                                  item?.Blueprintchapter == ele?.name,
                                              )
                                                ? `*(${
                                                    val?.AllChapter?.find(
                                                      (item) =>
                                                        item?.Blueprintobjective == ele1?.Objective &&
                                                        item?.BluePrintQuestiontype == "O T" &&
                                                        item?.Blueprintchapter == ele?.name,
                                                    )?.BluePrintmarksperquestion
                                                  })`
                                                : ""}
                                            </b>
                                          </td>
                                          <td style={{ border: "1px solid #000" }}>
                                            <b>
                                              {
                                                val?.AllChapter?.find(
                                                  (item) =>
                                                    item?.Blueprintobjective == ele1?.Objective &&
                                                    item?.BluePrintQuestiontype == "V.S.A" &&
                                                    item?.Blueprintchapter == ele?.name,
                                                )?.Blueprintnoofquestion
                                              }
                                            </b>
                                            <b>
                                              {val?.AllChapter?.some(
                                                (item) =>
                                                  item?.Blueprintobjective == ele1?.Objective &&
                                                  item?.BluePrintQuestiontype == "V.S.A" &&
                                                  item?.Blueprintchapter == ele?.name,
                                              )
                                                ? `*(${
                                                    val?.AllChapter?.find(
                                                      (item) =>
                                                        item?.Blueprintobjective == ele1?.Objective &&
                                                        item?.BluePrintQuestiontype == "V.S.A" &&
                                                        item?.Blueprintchapter == ele?.name,
                                                    )?.BluePrintmarksperquestion
                                                  })`
                                                : ""}
                                            </b>
                                          </td>
                                          <td style={{ border: "1px solid #000" }}>
                                            {
                                              val?.AllChapter?.find(
                                                (item) =>
                                                  item?.Blueprintobjective == ele1?.Objective &&
                                                  item?.BluePrintQuestiontype == "S.A" &&
                                                  item?.Blueprintchapter == ele?.name,
                                              )?.Blueprintnoofquestion
                                            }
                                            {val?.AllChapter?.some(
                                              (item) =>
                                                item?.Blueprintobjective == ele1?.Objective &&
                                                item?.BluePrintQuestiontype == "S.A" &&
                                                item?.Blueprintchapter == ele?.name,
                                            )
                                              ? `*(${
                                                  val?.AllChapter?.find(
                                                    (item) =>
                                                      item?.Blueprintobjective == ele1?.Objective &&
                                                      item?.BluePrintQuestiontype == "S.A" &&
                                                      item?.Blueprintchapter == ele?.name,
                                                  )?.BluePrintmarksperquestion
                                                })`
                                              : ""}
                                          </td>
                                          <td style={{ border: "1px solid #000" }}>
                                            {
                                              val?.AllChapter?.find(
                                                (item) =>
                                                  item?.Blueprintobjective == ele1?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 1" &&
                                                  item?.Blueprintchapter == ele?.name,
                                              )?.Blueprintnoofquestion
                                            }
                                            {val?.AllChapter?.some(
                                              (item) =>
                                                item?.Blueprintobjective == ele1?.Objective &&
                                                item?.BluePrintQuestiontype == "L.A 1" &&
                                                item?.Blueprintchapter == ele?.name,
                                            )
                                              ? `*(${
                                                  val?.AllChapter?.find(
                                                    (item) =>
                                                      item?.Blueprintobjective == ele1?.Objective &&
                                                      item?.BluePrintQuestiontype == "L.A 1" &&
                                                      item?.Blueprintchapter == ele?.name,
                                                  )?.BluePrintmarksperquestion
                                                })`
                                              : ""}
                                          </td>
                                          <td style={{ border: "1px solid #000" }}>
                                            {
                                              val?.AllChapter?.find(
                                                (item) =>
                                                  item?.Blueprintobjective == ele1?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 2" &&
                                                  item?.Blueprintchapter == ele?.name,
                                              )?.Blueprintnoofquestion
                                            }
                                            {val?.AllChapter?.some(
                                              (item) =>
                                                item?.Blueprintobjective == ele1?.Objective &&
                                                item?.BluePrintQuestiontype == "L.A 2" &&
                                                item?.Blueprintchapter == ele?.name,
                                            )
                                              ? `*(${
                                                  val?.AllChapter?.find(
                                                    (item) =>
                                                      item?.Blueprintobjective == ele1?.Objective &&
                                                      item?.BluePrintQuestiontype == "L.A 2" &&
                                                      item?.Blueprintchapter == ele?.name,
                                                  )?.BluePrintmarksperquestion
                                                })`
                                              : ""}
                                          </td>
                                          <td style={{ border: "1px solid #000" }}>
                                            {
                                              val?.AllChapter?.find(
                                                (item) =>
                                                  item?.Blueprintobjective == ele1?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 3" &&
                                                  item?.Blueprintchapter == ele?.name,
                                              )?.Blueprintnoofquestion
                                            }
                                            {val?.AllChapter?.some(
                                              (item) =>
                                                item?.Blueprintobjective == ele1?.Objective &&
                                                item?.BluePrintQuestiontype == "L.A 3" &&
                                                item?.Blueprintchapter == ele?.name,
                                            )
                                              ? `*(${
                                                  val?.AllChapter?.find(
                                                    (item) =>
                                                      item?.Blueprintobjective == ele1?.Objective &&
                                                      item?.BluePrintQuestiontype == "L.A 3" &&
                                                      item?.Blueprintchapter == ele?.name,
                                                  )?.BluePrintmarksperquestion
                                                })`
                                              : ""}
                                          </td>
                                        </>
                                      ))}
                                      <td style={{ border: "1px solid #000" }}>
                                        {bluePrintTotalQues(val?.AllChapter, ele?.name, "O T")?.TotalQ}
                                      </td>
                                      <td style={{ border: "1px solid #000" }}>
                                        {bluePrintTotalQues(val?.AllChapter, ele?.name, "V.S.A")?.TotalQ}
                                      </td>
                                      <td style={{ border: "1px solid #000" }}>
                                        {bluePrintTotalQues(val?.AllChapter, ele?.name, "S.A")?.TotalQ}
                                      </td>
                                      <td style={{ border: "1px solid #000" }}>
                                        {bluePrintTotalQues(val?.AllChapter, ele?.name, "L.A 1")?.TotalQ}
                                      </td>
                                      <td style={{ border: "1px solid #000" }}>
                                        {bluePrintTotalQues(val?.AllChapter, ele?.name, "L.A 2")?.TotalQ}
                                      </td>
                                      <td style={{ border: "1px solid #000" }}>
                                        {bluePrintTotalQues(val?.AllChapter, ele?.name, "L.A 3")?.TotalQ}
                                      </td>
                                      <td style={{ border: "1px solid #000" }}>
                                        {QuestionNameWiseMask(val?.AllChapter, ele?.name)?.totalMas}
                                      </td>
                                    </tr>
                                  ))}

                                  <tr style={{ border: "1px solid #000" }}>
                                    <td style={{ border: "1px solid #000" }}></td>
                                    <td style={{ border: "1px solid #000", fontWeight: "bold" }}>
                                      {bluePrintHeader?.Total}
                                    </td>
                                    {val?.objectives?.map((ele) => (
                                      <>
                                        <td style={{ border: "1px solid #000" }}>
                                          {val?.AllChapter?.some(
                                            (item) =>
                                              item?.Blueprintobjective == ele?.Objective &&
                                              item?.BluePrintQuestiontype == "O T",
                                          ) ? (
                                            <span>
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective === ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "O T",
                                              )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}{" "}
                                              (
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "O T",
                                              )?.reduce(
                                                (a, am) =>
                                                  a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                                0,
                                              )}
                                              )
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td style={{ border: "1px solid #000" }}>
                                          {val?.AllChapter?.some(
                                            (item) =>
                                              item?.Blueprintobjective == ele?.Objective &&
                                              item?.BluePrintQuestiontype == "V.S.A",
                                          ) ? (
                                            <span>
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "V.S.A",
                                              )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}{" "}
                                              (
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "V.S.A",
                                              )?.reduce(
                                                (a, am) =>
                                                  a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                                0,
                                              )}
                                              )
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td style={{ border: "1px solid #000" }}>
                                          {val?.AllChapter?.some(
                                            (item) =>
                                              item?.Blueprintobjective == ele?.Objective &&
                                              item?.BluePrintQuestiontype == "S.A",
                                          ) ? (
                                            <span>
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "S.A",
                                              )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}{" "}
                                              (
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "S.A",
                                              )?.reduce(
                                                (a, am) =>
                                                  a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                                0,
                                              )}
                                              )
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td style={{ border: "1px solid #000" }}>
                                          {val?.AllChapter?.some(
                                            (item) =>
                                              item?.Blueprintobjective == ele?.Objective &&
                                              item?.BluePrintQuestiontype == "L.A 1",
                                          ) ? (
                                            <span>
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 1",
                                              )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}{" "}
                                              (
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 1",
                                              )?.reduce(
                                                (a, am) =>
                                                  a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                                0,
                                              )}
                                              )
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td style={{ border: "1px solid #000" }}>
                                          {val?.AllChapter?.some(
                                            (item) =>
                                              item?.Blueprintobjective == ele?.Objective &&
                                              item?.BluePrintQuestiontype == "L.A 2",
                                          ) ? (
                                            <span>
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 2",
                                              )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}{" "}
                                              (
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 2",
                                              )?.reduce(
                                                (a, am) =>
                                                  a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                                0,
                                              )}
                                              )
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                        <td style={{ border: "1px solid #000" }}>
                                          {val?.AllChapter?.some(
                                            (item) =>
                                              item?.Blueprintobjective == ele?.Objective &&
                                              item?.BluePrintQuestiontype == "L.A 3",
                                          ) ? (
                                            <span>
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 3",
                                              )?.reduce((a, am) => a + Number(am?.Blueprintnoofquestion), 0)}{" "}
                                              (
                                              {val?.AllChapter?.filter(
                                                (item) =>
                                                  item?.Blueprintobjective == ele?.Objective &&
                                                  item?.BluePrintQuestiontype == "L.A 3",
                                              )?.reduce(
                                                (a, am) =>
                                                  a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                                                0,
                                              )}
                                              )
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </td>
                                      </>
                                    ))}
                                    <td style={{ border: "1px solid #000" }}></td>
                                    <td style={{ border: "1px solid #000" }}></td>
                                    <td style={{ border: "1px solid #000" }}></td>
                                    <td style={{ border: "1px solid #000" }}></td>
                                    <td style={{ border: "1px solid #000" }}></td>
                                    <td style={{ border: "1px solid #000" }}>
                                      {val?.AllChapter?.reduce((a, ele) => a + Number(ele?.Blueprintnoofquestion), 0)}
                                    </td>
                                    <td style={{ border: "1px solid #000" }}>
                                      {val?.AllChapter?.reduce(
                                        (a, ele) =>
                                          a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                                        0,
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                            <div style={{ marginTop: "10px", fontSize: "10px" }}>
                              <div>{bluePrintHeader?.Note}:-</div>
                              {parse(`<span>${val?.Instructions}</span>`)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {blueprint.length>0 &&<AdminViewQuestionPaper state2={{ ...state, bluePrint: blueprint
                  ?.filter(
                    (ele) =>
                      ele?.board === state?.Board &&
                      ele?.medium === state?.Medium &&
                      ele?.className === state?.Class &&
                      ele?.SubClassName === state?.Sub_Class &&
                      ele?.subjects === state?.Subject &&
                      ele?.ExameName === state?.Exam_Name
                  )[0] }}  />} */}
      {blueprint.length > 0 && <AdminViewQuestionPaper state2={{ ...state, bluePrint: blueprint[0] }} />}
    </div>
  )
}

export default AdminViewBlueprint

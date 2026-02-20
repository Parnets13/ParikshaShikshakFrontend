// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";

// function AdminQuestionFrontPage({ data }) {
//   const adminFromSession = JSON.parse(localStorage.getItem("admin"));
//   const userFromSession = JSON.parse(localStorage.getItem("user"));

//   let admin;
//   if (adminFromSession) {
//     admin = adminFromSession;
//   } else if (userFromSession) {
//     admin = userFromSession;
//   }
//   const token = localStorage.getItem("token");

//   const totalQA = data?.bluePrint?.TypesofQuestions?.reduce(
//     (a, ele) => a + Number(ele?.NQA),
//     0
//   );
//   const numberofStep = totalQA / 2;

//   let array = Array.from(Array(totalQA).keys(), (x) => x + 1);

//   const [QuestionHeader, setQuestionHeader] = useState([]);
//   const getQuestionHeaderbyMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
//           data?.Medium +
//           "/" +
//           admin?._id,
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
//   useEffect(() => {
//     getQuestionHeaderbyMedium();
//   }, []);
//   console.log("QuestionHeaderzsdsdsd", QuestionHeader);
//   return (
//     <div>
//       {/* new  */}
//       <div className="question-paper-display">
//         <div className="details-display ">
//           <div className="top-titles-container">
//             <div className="row">
//               <div className="col-sm-2">
//                 {data?.School_Logo ? (
//                   <img
//                     src={`${data?.School_Logo}`}
//                     alt=""
//                     style={{ width: "100px", marginTop: "24px" }}
//                   />
//                 ) : (
//                   <></>
//                 )}
//               </div>
//               <div className="col-sm-10 mt-5">
//                 {/* <h4 className="mb-2"> ಮೋಹನ್ ಕುಮಾರ್ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆ</h4> */}
//                 {/* <h5>{data?.Board}</h5>  */}
//                 {data?.Institute_Name ? (
//                   <h6>
//                     <b>
//                       {data?.Institute_Name},{data?.SchoolAddress}
//                     </b>
//                   </h6>
//                 ) : (
//                   <></>
//                 )}
//                 <h6>
//                   <b>{data?.bluePrint?.blName}</b>
//                 </h6>
//               </div>
//             </div>
//             <div className="title-2">
//               {/* {data?.Institute_Name ? (
//               <h5>
//                 {data?.Institute_Name},{data?.SchoolAddress}
//               </h5>
//             ) : (
//               <></>
//             )} */}
//             </div>
//             <div className="title-3">
//               {/* <h4>{data?.Exam_Name} {" "}{data?.Exam_Lavel}</h4> */}
//               {/* <h6>ಎರಡನೆಯ ಸಂಕಲನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ - 2023-24</h6> */}
//             </div>
//           </div>

//           <div className="class-details">
//             <div className="class-data">
//               {/* <b>ವರ್ಗ : {data?.Sub_Class}</b> */}
//               <b>
//                 {QuestionHeader?.classs} : {data?.Sub_Class}
//               </b>
//             </div>
//             <div className="class-data">
//               {/* <b>ವಿಷಯ: {data?.Subject}</b> */}
//               <b>
//                 {QuestionHeader?.subject}: {data?.Subject}
//               </b>
//               <br />
//               <b>
//                 {QuestionHeader?.medium}: {QuestionHeader?.medium}
//               </b>
//             </div>
//             <div style={{ textAlign: "justify" }}>
//               <div className="class-data">
//                 {/* <b>ಅಂಕಗಳು: {data?.bluePrint?.TotalDifficultMask}</b> */}
//                 <b>
//                   {QuestionHeader?.marks}: {data?.bluePrint?.TotalDifficultMask}
//                 </b>
//               </div>
//               <div className="class-data">
//                 {/* <b>ಸಮಯ: {data?.bluePrint?.DurationOfExam} </b> */}
//                 <b>
//                   {QuestionHeader?.time}: {data?.bluePrint?.DurationOfExam}{" "}
//                 </b>
//               </div>
//               <div className="class-data">
//                 {/* <b>ಸಮಯ: {data?.bluePrint?.DurationOfExam} </b> */}
//                 {/* <b>{QuestionHeader?.time}: {data?.bluePrint?.DurationOfExam} </b> */}
//                 <b>
//                   {QuestionHeader?.examdate}: {data?.Test_Date}
//                 </b>
//               </div>
//               <div className="class-data">
//                 {/* <b>ಸಮಯ: {data?.bluePrint?.DurationOfExam} </b> */}
//                 <b>
//                   {QuestionHeader?.totalquestion}: {totalQA}{" "}
//                 </b>
//               </div>
//             </div>
//           </div>

//           <div className="student-details-container">
//             <div className="d-flex justify-content-center">
//               {/* <h5 style={{ textAlign: "center", padding: "5px 0px" }}>
//               Information to be filled by the Student
//             </h5> */}
//               {/* <h6 style={{ textAlign: "center", padding: "5px 0px" }}>
//             ವಿದ್ಯಾರ್ಥಿಯಿಂದ ಭರ್ತಿ ಮಾಡಬೇಕಾದ ಮಾಹಿತಿ
//             </h6> */}
//               <h6 style={{ textAlign: "center", padding: "5px 0px" }}>
//                 {QuestionHeader?.studentinfo}
//               </h6>
//               <div>
//                 {/* <span style={{ fontSize: "16px" }}>
//               ಪರೀಕ್ಷೆಯ ದಿನಾಂಕ: {data?.Test_Date}
//               </span>{" "} */}
//                 <span style={{ fontSize: "16px" }}>
//                   {/* {QuestionHeader?.examdate}: {data?.Test_Date} */}
//                 </span>{" "}
//                 <br />
//                 {/* <span>ಒಟ್ಟು ಪ್ರಶ್ನೆಗಳು: 25</span> */}
//                 {/* <span>{QuestionHeader?.totalquestion}: {totalQA}</span> */}
//               </div>
//             </div>
//             <div className="student-details">
//               {/* <p style={{ margin: "0px" }}>ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು:</p> */}
//               <p style={{ margin: "0px" }}>{QuestionHeader?.nameofstudent}:</p>
//               {/* <p style={{ margin: "0px" }}>Name of the Student:</p> */}
//               <div className="line"></div>
//             </div>

//             <div className="student-number-row">
//               <div style={{ margin: " auto 0" }}>
//                 {/* <p>Student SATS No:</p> */}
//                 {/* <p>ವಿದ್ಯಾರ್ಥಿ SATS ನಂ:</p> */}
//                 <p>{QuestionHeader?.satsno}:</p>
//               </div>
//               {/* style={{marginLeft:"-59px"}} */}
//               <div className="d-flex">
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//               </div>
//               {/* style={{marginRight:"107px"}} */}
//               <div className="">
//                 {/* <p>Signature of the Student:</p> */}
//                 {/* <p>ವಿದ್ಯಾರ್ಥಿಯ ಸಹಿ:</p> */}

//                 <p>
//                   {QuestionHeader?.signature}: <b>___________</b>
//                 </p>
//                 <div className=""></div>
//               </div>
//             </div>
//           </div>

//           <div className="student-details-container">
//             {/* <h5 style={{ textAlign: "center" }}>
//             Information to be filled by the Room Invigilator
//           </h5> */}
//             {/* <h6 style={{ textAlign: "center" }}>
//           ರೂಮ್ ಇನ್ವಿಜಿಲೇಟರ್ ಮೂಲಕ ಭರ್ತಿ ಮಾಡಬೇಕಾದ ಮಾಹಿತಿ
//           </h6> */}
//             <h6 style={{ textAlign: "center" }}>
//               {QuestionHeader?.roominvigilator}
//             </h6>

//             <div className="school-number-row">
//               <div style={{ margin: " auto 0" }}>
//                 {/* <p>School IDSE Code:</p> */}
//                 {/* <p>ಶಾಲೆಯ IDSE ಕೋಡ್:</p> */}
//                 <p>{QuestionHeader?.idsccode}:</p>
//               </div>
//               <div className="d-flex">
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//                 <div className="number-box"></div>
//               </div>
//             </div>
//             <div className="student-details">
//               {/* <p style={{ margin: "0px" }}>School Name :</p> */}
//               {/* <p style={{ margin: "0px" }}>ಶಾಲೆಯ ಹೆಸರು:</p> */}
//               <p style={{ margin: "0px", fontSize: "15px" }}>
//                 {QuestionHeader?.schoolname}:
//               </p>
//               <div className="line-2"></div>
//             </div>
//           </div>

//           <div className="third-row">
//             <div className="student-details">
//               {/* <p style={{ margin: "0px" }}>Cluster:</p> */}
//               {/* <p style={{ margin: "0px" }}>ಕ್ಲಸ್ಟರ್:</p> */}
//               <p style={{ margin: "0px" }}>{QuestionHeader?.cluster}:</p>
//               <div className="line-3"></div>
//             </div>
//             <div className="student-details">
//               {/* <p style={{ margin: "0px" }}>Block:</p> */}
//               {/* <p style={{ margin: "0px" }}>ನಿರ್ಬಂಧಿಸಿ:</p> */}
//               <p style={{ margin: "0px" }}>{QuestionHeader?.block}:</p>
//               <div className="line-3"></div>
//             </div>
//             <div className="student-details">
//               {/* <p style={{ margin: "0px" }}>District:</p> */}
//               {/* <p style={{ margin: "0px" }}>ಜಿಲ್ಲೆ:</p> */}
//               <p style={{ margin: "0px" }}>{QuestionHeader?.distric}:</p>
//               <div className="line-3"></div>
//             </div>
//           </div>

//           <div className="fourth-row">
//             {/* <div className="school-details">

//             <p style={{ margin: "0px" }}>ಶಾಲೆಯ ಹೆಸರು:</p>
//             <p style={{ margin: "0px" }}>School Name:</p>
//           </div> */}
//             <div className="school-details">
//               {/* <p style={{ margin: "0px" }}>Govt.</p> */}
//               {/* <p style={{ margin: "0px" }}>ಸರಕಾರ</p> */}
//               <p style={{ margin: "0px" }}>{QuestionHeader?.govt}</p>
//               <div className="number-box-1"></div>
//             </div>
//             <div className="school-details">
//               {/* <p style={{ margin: "0px" }}>ನೆರವು ನೀಡಿದೆ</p> */}
//               <p style={{ margin: "0px" }}>{QuestionHeader?.aided}</p>
//               {/* <p style={{ margin: "0px" }}>Aided</p> */}
//               <div className="number-box-1"></div>
//             </div>
//             <div className="school-details">
//               {/* <p style={{ margin: "0px" }}>Un-aided</p> */}
//               {/* <p style={{ margin: "0px" }}>ಅನುದಾನರಹಿತ</p> */}
//               <p style={{ margin: "0px" }}>{QuestionHeader?.unaided}</p>
//               <div className="number-box-1"></div>
//             </div>
//           </div>

//           {/* <div>(Put "✓" mark for applicable information)</div> */}
//           {/* <div>(ಅನ್ವಯವಾಗುವ ಮಾಹಿತಿಗಾಗಿ "✓" ಗುರುತು ಹಾಕಿ)</div> */}
//           <div>({QuestionHeader?.markinfo})</div>
//           <div className="d-flex justify-content-end">
//             <div
//               className="student-details"
//               style={{ padding: "4px 0", width: "49%" }}
//             >
//               {/* <p style={{ margin: "0px" }}>Signature of the Room Invigilator: </p> */}
//               {/* <p style={{ margin: "0px" }}>ರೂಮ್ ಇನ್ವಿಜಿಲೇಟರ್ ಸಹಿ: </p> */}
//               <p style={{ margin: "0px" }}>
//                 {QuestionHeader?.signatureinvigilator}:{" "}
//               </p>
//               <div className="line-4" style={{ width: "40%" }}></div>
//             </div>
//           </div>

//           <div>
//             {/* <h5 style={{ textAlign: "center", padding: "5px 0px" }}>
//             Information to be filled by the Evaluator at the time of
//             evaluation
//           </h5> */}
//             {/* <h5 style={{ textAlign: "center", padding: "5px 0px" }}>
//             ಮೌಲ್ಯಮಾಪನದ ಸಮಯದಲ್ಲಿ ಮೌಲ್ಯಮಾಪಕರು ತುಂಬಬೇಕಾದ ಮಾಹಿತಿ
//           </h5> */}
//             <h6 style={{ textAlign: "center" }}>{QuestionHeader?.evaluator}</h6>

//             <div className="text-center">
//               <Table
//                 responsive
//                 bordered
//                 style={{ border: "1px solid" }}
//                 size="sm"
//               >
//                 <thead>
//                   <tr>
//                     {/* <th>Question Number</th> */}
//                     {/* <th>ಪ್ರಶ್ನೆ ಸಂಖ್ಯೆ</th> */}
//                     <th>{QuestionHeader?.questionno1}</th>
//                     {/* <th>Obtained marks</th> */}
//                     {/* <th>ಅಂಕಗಳನ್ನು ಪಡೆದಿದ್ದಾರೆ</th> */}
//                     <th>{QuestionHeader?.obtainedno1}</th>
//                     {/* <th>Question Number</th> */}
//                     {/* <th>ಪ್ರಶ್ನೆ ಸಂಖ್ಯೆ</th> */}
//                     <th>{QuestionHeader?.questionno2}</th>
//                     {/* <th>Obtained marks</th> */}
//                     {/* <th>ಅಂಕಗಳನ್ನು ಪಡೆದಿದ್ದಾರೆ</th> */}
//                     <th>{QuestionHeader?.obtainedno2}</th>
//                     {/* <th>Question Number</th> */}
//                     {/* <th>ಪ್ರಶ್ನೆ ಸಂಖ್ಯೆ</th> */}
//                     <th>{QuestionHeader?.questionno3}</th>
//                     {/* <th>ಅಂಕಗಳನ್ನು ಪಡೆದಿದ್ದಾರೆ</th> */}
//                     <th>{QuestionHeader?.obtainedno3}</th>
//                     {/* <th>Obtained marks</th> */}
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {array?.map((ele) => {
//                     if (ele <= (numberofStep <= 15 ? 10 : 10)) {
//                       return (
//                         <tr>
//                           <td>{ele <= totalQA ? ele : "-"}</td>
//                           <td></td>
//                           <td>{ele + 10 <= totalQA ? ele + 10 : "-"}</td>
//                           <td></td>
//                           <td>{ele + 20 <= totalQA ? ele + 20 : "-"}</td>
//                           <td></td>
//                         </tr>
//                       );
//                     }
//                     if (ele <= (numberofStep > 15 ? 20 : 0)) {
//                       return (
//                         <tr>
//                           <td>{ele + 30 <= totalQA ? ele + 30 : "-"}</td>
//                           <td></td>
//                           <td>{ele + 40 <= totalQA ? ele + 40 : "-"}</td>
//                           <td></td>
//                           <td>{ele + 50 <= totalQA ? ele + 50 : "-"}</td>
//                           <td></td>
//                         </tr>
//                       );
//                     }
//                   })}

//                   <tr>
//                     <td>
//                       {/* <b>Total marks</b> */}
//                       {/* <b>ಒಟ್ಟು ಅಂಕಗಳು</b> */}
//                       <b>{QuestionHeader?.totalmarks1}</b>
//                     </td>
//                     <td></td>
//                     <td>
//                       {/* <b>Total marks</b> */}
//                       {/* <b>ಒಟ್ಟು ಅಂಕಗಳು</b> */}
//                       <b>{QuestionHeader?.totalmarks2}</b>
//                     </td>
//                     <td></td>
//                     <td>
//                       {/* <b>Total marks</b> */}
//                       {/* <b>ಒಟ್ಟು ಅಂಕಗಳು</b> */}
//                       <b>{QuestionHeader?.totalmarks3}</b>
//                     </td>
//                     <td></td>
//                   </tr>
//                   <tr>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td></td>
//                     <td>
//                       {/* <b>Grade Total</b> */}
//                       {/* <b>ಗ್ರೇಡ್ ಒಟ್ಟು</b> */}
//                       <b>{QuestionHeader?.grandtotal}</b>
//                     </td>
//                     <td></td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//           <div className="student-details">
//             {/* <p style={{ margin: "0px" }}>Total marks obtained (in words): </p> */}
//             {/* <p style={{ margin: "0px" }}>ಪಡೆದ ಒಟ್ಟು ಅಂಕಗಳು (ಪದಗಳಲ್ಲಿ): </p> */}
//             <p style={{ margin: "0px", fontSize: "14px" }}>
//               {QuestionHeader?.totalobtainedmarks}:{" "}
//             </p>
//             <div className="line-5"></div>
//           </div>

//           <div className="d-flex justify-content-end">
//             <div style={{ width: "60%" }}>
//               <div className="student-details">
//                 {/* <p style={{ margin: "0px" }}>Signature of the Evaluator:</p> */}
//                 {/* <p style={{ margin: "0px" }}>ಮೌಲ್ಯಮಾಪಕರ ಸಹಿ:</p> */}
//                 <p style={{ margin: "0px", fontSize: "14px" }}>
//                   {QuestionHeader?.evaluatorsign}:
//                 </p>
//                 <div className="line-6" style={{ width: "64%" }}></div>
//               </div>
//               <div className="student-details">
//                 {/* <p style={{ margin: "0px" }}>Signature of the Evaluator:</p> */}
//                 {/* <p style={{ margin: "0px" }}>ಮೌಲ್ಯಮಾಪಕರ ಸಹಿ:</p> */}
//                 <p style={{ margin: "0px", fontSize: "14px" }}>
//                   {QuestionHeader?.lastSign}:
//                 </p>
//                 <div className="line-6" style={{ width: "64%" }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminQuestionFrontPage;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function AdminQuestionFrontPage({ data }) {
  const adminFromSession = JSON.parse(localStorage.getItem("admin"));
  const userFromSession = JSON.parse(localStorage.getItem("user"));

  let admin;
  if (adminFromSession) {
    admin = adminFromSession;
  } else if (userFromSession) {
    admin = userFromSession;
  }
  const token = localStorage.getItem("token");

  const totalQA = data?.bluePrint?.TypesofQuestions?.reduce(
    (a, ele) => a + Number(ele?.NQA),
    0
  );
  const numberofStep = totalQA / 2;

  let array = Array.from(Array(totalQA).keys(), (x) => x + 1);

  const [QuestionHeader, setQuestionHeader] = useState([]);
  const getQuestionHeaderbyMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
        data?.Medium +
        "/" +
        admin?._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setQuestionHeader(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getQuestionHeaderbyMedium();
  }, []);  
  console.log(QuestionHeader,"questionheaderrrrrrr")


  // Replace your existing return statement with this optimized version
  // Keep all your existing imports, state, and API logic as is

  return (
    <div className="print-container " style={{
      width: '210mm',
      minHeight: '297mm',
      maxHeight: '297mm',
      margin: '0 auto',
      padding: '5mm',
      // boxSizing: 'border-box',
      fontFamily: 'Arial, sans-serif',
      fontSize: '22pt', // Reduced base font size
      overflow: 'hidden', // Prevent content overflow
      pageBreakAfter: 'always', 
      border: '2px solid #000'
    }}>
      <div className="question-paper-display a4-page" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="details-display" style={{
          width: '100%',
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header Section - Auto-adjusting */}
          <div className="top-titles-container" style={{
            marginBottom: '6px',
            flexShrink: 0
          }}>
            <div className="row" style={{
              display: 'flex',
              alignItems: 'center',
              minHeight: '50px' // Reduced height
            }}>
              <div className="col-sm-2" style={{
                flex: '0 0 12%',
                maxWidth: '12%',
                display: 'flex',
                justifyContent: 'center'
              }}>
                {data?.School_Logo ? (
                  <img
                    src={`${data?.School_Logo}`}
                    alt=""
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'contain'
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="col-sm-10" style={{
                flex: '0 0 88%',
                maxWidth: '88%',
                paddingLeft: '8px',
                textAlign: 'center'
              }}>
                {data?.Institute_Name ? (
                  <h6 style={{
                    margin: '2px 0',
                    fontSize: `${Math.max(10, 18 - Math.floor((data?.Institute_Name + data?.SchoolAddress).length / 20))}pt`,
                    fontWeight: 'bold',
                    lineHeight: '1.2'
                  }}>
                    <b>
                      {data?.Institute_Name}

                    </b>
                    {data?.SchoolAddress && <b><br/>{data?.SchoolAddress} </b>}
                  </h6>
                ) : (
                  <></>
                )}
                <h6 style={{
                  margin: '2px 0',
                  fontSize: '22pt',
                  fontWeight: 'bold'
                }}>
                  <b>{data?.bluePrint?.blName}</b>
                </h6>
              </div>
            </div>
          </div>
  <div className="class-data">
              <b>{QuestionHeader?.subject}: {data?.Subject}</b>
            </div>
          {/* Class Details - Compact Grid */}
          <div className="class-details" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '4px',
            marginBottom: '6px',
            flexShrink: 0,
            fontSize: '18pt'
          }}>
            <div className="class-data">
              <b>{QuestionHeader?.classs}: {data?.Sub_Class}</b>
            </div>
          
            <div className="class-data">
              <b>{QuestionHeader?.mediumHead}: {data?.Medium}</b>
            </div>
            <div className="class-data">
              <b>{QuestionHeader?.marks}: {data?.bluePrint?.TotalDifficultMask}</b>
            </div>
         
            <div className="class-data">
              <b>{QuestionHeader?.totalquestion}: {totalQA}</b>
            </div>
          </div> 
          <div> <div className="class-data" style={{ display: 'flex', gap: '320px' }}>
  <b>{QuestionHeader?.time}: {data?.bluePrint?.DurationOfExam}</b>
  <b>{QuestionHeader?.examdate}: {data?.Test_Date}</b>
</div>

            {/* <div className="class-data">
              <b>{QuestionHeader?.examdate}: {data?.Test_Date}</b>
            </div>  */}
            </div>

          {/* Student Details Container - Compact */}
          <div className="student-details-container" style={{
            border: '1px solid #000',
            padding: '6px',
            marginBottom: '6px',
            flexShrink: 0
          }}>
            <div style={{ textAlign: 'center', marginBottom: '6px' }}>
              <h6 style={{
                margin: '0',
                fontSize: '15pt',
                fontWeight: 'bold'
              }}>
                {QuestionHeader?.studentinfo}
              </h6>
            </div>

            <div className="student-details" style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <p style={{
                margin: '0 8px 0 0',
                whiteSpace: 'nowrap',
                fontSize: '8pt'
              }}>
                {QuestionHeader?.nameofstudent}:
              </p>
              <div className="line" style={{
                borderBottom: '1px solid #000',
                flexGrow: 1,
                height: '16px'
              }}></div>
            </div>

            <div className="student-number-row" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <div style={{
                marginRight: '8px',
                whiteSpace: 'nowrap',
                fontSize: '8pt'
              }}>
                <p style={{ margin: 0 }}>{QuestionHeader?.satsno}:</p>
              </div>

              <div className="d-flex" style={{
                flexGrow: 1,
                justifyContent: 'center',
                maxWidth: '180px'
              }}>
                {[...Array(9)].map((_, i) => (
                  <div key={i} style={{
                    width: '16px',
                    height: '16px',
                    border: '1px solid #000',
                    margin: '0 1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}></div>
                ))}
              </div>

              <div style={{
                marginLeft: '8px',
                fontSize: '8pt'
              }}>
                <p style={{ margin: 0 }}>
                  {QuestionHeader?.signature}: <b>_______</b>
                </p>
              </div>
            </div>
          </div>

          {/* Room Invigilator Container - Compact */}
          <div className="student-details-container" style={{
            border: '1px solid #000',
            padding: '6px',
            marginBottom: '6px',
            flexShrink: 0
          }}>
            <div style={{ textAlign: 'center', marginBottom: '6px' }}>
              <h6 style={{
                margin: '0',
                fontSize: '10pt',
                fontWeight: 'bold'
              }}>
                {QuestionHeader?.roominvigilator}
              </h6>
            </div>

            <div className="school-number-row" style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <div style={{
                marginRight: '8px',
                whiteSpace: 'nowrap',
                fontSize: '8pt'
              }}>
                <p style={{ margin: 0 }}>{QuestionHeader?.idsccode}:</p>
              </div>

              <div className="d-flex" style={{ flexGrow: 1, maxWidth: '220px' }}>
                {[...Array(11)].map((_, i) => (
                  <div key={i} style={{
                    width: '16px',
                    height: '16px',
                    border: '1px solid #000',
                    margin: '0 1px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}></div>
                ))}
              </div>
            </div>

            <div className="student-details" style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <p style={{
                margin: '0 8px 0 0',
                fontSize: '8pt'
              }}>
                {QuestionHeader?.schoolname}:
              </p>
              <div className="line-2" style={{
                borderBottom: '1px solid #000',
                flexGrow: 1,
                height: '16px'
              }}></div>
            </div>
          </div>

          {/* Third Row - Compact */}
          <div className="third-row" style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '6px',
            gap: '8px',
            flexShrink: 0
          }}>
            <div className="student-details" style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1
            }}>
              <p style={{
                margin: '0 6px 0 0',
                fontSize: '8pt',
                whiteSpace: 'nowrap'
              }}>{QuestionHeader?.cluster}:</p>
              <div className="line-3" style={{
                borderBottom: '1px solid #000',
                flexGrow: 1,
                height: '16px'
              }}></div>
            </div>

            <div className="student-details" style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1
            }}>
              <p style={{
                margin: '0 6px 0 0',
                fontSize: '8pt',
                whiteSpace: 'nowrap'
              }}>{QuestionHeader?.block}:</p>
              <div className="line-3" style={{
                borderBottom: '1px solid #000',
                flexGrow: 1,
                height: '16px'
              }}></div>
            </div>

            <div className="student-details" style={{
              display: 'flex',
              alignItems: 'center',
              flex: 1
            }}>
              <p style={{
                margin: '0 6px 0 0',
                fontSize: '8pt',
                whiteSpace: 'nowrap'
              }}>{QuestionHeader?.distric}:</p>
              <div className="line-3" style={{
                borderBottom: '1px solid #000',
                flexGrow: 1,
                height: '16px'
              }}></div>
            </div>
          </div>

          {/* Fourth Row - Compact */}
          <div className="fourth-row" style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: '6px',
            flexShrink: 0
          }}>
            <div className="school-details" style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <p style={{
                margin: '0 6px 0 0',
                fontSize: '8pt'
              }}>{QuestionHeader?.govt}</p>
              <div className="number-box-1" style={{
                width: '16px',
                height: '16px',
                border: '1px solid #000'
              }}></div>
            </div>

            <div className="school-details" style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <p style={{
                margin: '0 6px 0 0',
                fontSize: '8pt'
              }}>{QuestionHeader?.aided}</p>
              <div className="number-box-1" style={{
                width: '16px',
                height: '16px',
                border: '1px solid #000'
              }}></div>
            </div>

            <div className="school-details" style={{
              display: 'flex',
              alignItems: 'center'
            }}>
              <p style={{
                margin: '0 6px 0 0',
                fontSize: '8pt'
              }}>{QuestionHeader?.unaided}</p>
              <div className="number-box-1" style={{
                width: '16px',
                height: '16px',
                border: '1px solid #000'
              }}></div>
            </div>
          </div>

          {/* Mark Info */}
          <div style={{
            marginBottom: '6px',
            fontSize: '8pt',
            flexShrink: 0
          }}>
            ({QuestionHeader?.markinfo})
          </div>

          {/* Signature */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '6px',
            flexShrink: 0
          }}>
            <div className="student-details" style={{
              display: 'flex',
              alignItems: 'center',
              width: '40%'
            }}>
              <p style={{
                margin: '0 6px 0 0',
                fontSize: '8pt',
                whiteSpace: 'nowrap'
              }}>
                {QuestionHeader?.signatureinvigilator}:
              </p>
              <div className="line-4" style={{
                borderBottom: '1px solid #000',
                flexGrow: 1,
                height: '16px'
              }}></div>
            </div>
          </div>

          {/* Evaluator Section - Compact Table */}
          <div style={{
            marginBottom: '6px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <h6 style={{
              textAlign: 'center',
              margin: '6px 0',
              fontSize: '9pt',
              fontWeight: 'bold'
            }}>
              {QuestionHeader?.evaluator}
            </h6>

            <div style={{
              textAlign: 'center',
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              {/* <Table
                responsive
                bordered
                style={{
                  border: '1px solid #000',
                  fontSize: '8pt',
                  margin: '0 auto',
                  width: '100%',
                  flex: 1
                }}
                size="sm"
              >
                <thead>
                  <tr>
                    <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.questionno1}</th>
                    <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.obtainedno1}</th>
                    <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.questionno2}</th>
                    <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.obtainedno2}</th>
                    <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.questionno3}</th>
                    <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.obtainedno3}</th>   
                         <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.questionno4}</th>
                    <th style={{ padding: '3px', width: '16%' }}>{QuestionHeader?.obtainedno4}</th>
                  </tr>
                </thead>
                <tbody>
                  {array?.map((ele) => {
                    if (ele <= (numberofStep <= 15 ? 10 : 10)) {
                      return (
                        <tr key={ele}>
                          <td style={{ padding: '3px', height: '16px' }}>{ele <= totalQA ? ele : "-"}</td>
                          <td style={{ padding: '3px', height: '16px' }}></td>
                          <td style={{ padding: '3px', height: '16px' }}>{ele + 10 <= totalQA ? ele + 10 : "-"}</td>
                          <td style={{ padding: '3px', height: '16px' }}></td>
                          <td style={{ padding: '3px', height: '16px' }}>{ele + 20 <= totalQA ? ele + 20 : "-"}</td>
                          <td style={{ padding: '3px', height: '16px' }}></td>
                        </tr>
                      );
                    }
                    if (ele <= (numberofStep > 15 ? 20 : 0)) {
                      return (
                        <tr key={ele}>
                          <td style={{ padding: '3px', height: '16px' }}>{ele + 30 <= totalQA ? ele + 30 : "-"}</td>
                          <td style={{ padding: '3px', height: '16px' }}></td>
                          <td style={{ padding: '3px', height: '16px' }}>{ele + 40 <= totalQA ? ele + 40 : "-"}</td>
                          <td style={{ padding: '3px', height: '16px' }}></td>
                          <td style={{ padding: '3px', height: '16px' }}>{ele + 50 <= totalQA ? ele + 50 : "-"}</td>
                          <td style={{ padding: '3px', height: '16px' }}></td>
                        </tr>
                      );
                    }
                    return null;
                  })}

                  <tr>
                    <td style={{ padding: '3px' }}>
                      <b>{QuestionHeader?.totalmarks1}</b>
                    </td>
                    <td style={{ padding: '3px' }}></td>
                    <td style={{ padding: '3px' }}>
                      <b>{QuestionHeader?.totalmarks2}</b>
                    </td>
                    <td style={{ padding: '3px' }}></td>
                    <td style={{ padding: '3px' }}>
                      <b>{QuestionHeader?.totalmarks3}</b>
                    </td>
                    <td style={{ padding: '3px' }}></td>
                  </tr>
                  <tr>
                    <td style={{ padding: '3px' }} colSpan="4"></td>
                    <td style={{ padding: '3px' }}>
                      <b>{QuestionHeader?.grandtotal}</b>
                    </td>
                    <td style={{ padding: '3px' }}></td>
                  </tr>
                </tbody>
              </Table> */} 
               
                <Table
  responsive
  bordered
  style={{
    border: '1px solid #000',
    fontSize: '8pt',
    margin: '0 auto',
    width: '100%',
    flex: 1
  }}
  size="sm"
>
  <thead>
    <tr>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.questionno1}</th>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.obtainedno1}</th>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.questionno2}</th>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.obtainedno2}</th>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.questionno3}</th>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.obtainedno3}</th>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.questionno4}</th>
      <th style={{ padding: '3px', width: '12.5%' }}>{QuestionHeader?.obtainedno4}</th>
    </tr>
  </thead>
  <tbody>
    {/* Generate rows for questions 1-10 */}
    {Array.from({ length: 10 }, (_, i) => i + 1).map((ele) => (
      <tr key={ele}>
        <td style={{ padding: '3px', height: '16px' }}>{ele <= totalQA ? ele : "-"}</td>
        <td style={{ padding: '3px', height: '16px' }}></td>
        <td style={{ padding: '3px', height: '16px' }}>{ele + 10 <= totalQA ? ele + 10 : "-"}</td>
        <td style={{ padding: '3px', height: '16px' }}></td>
        <td style={{ padding: '3px', height: '16px' }}>{ele + 20 <= totalQA ? ele + 20 : "-"}</td>
        <td style={{ padding: '3px', height: '16px' }}></td>
        <td style={{ padding: '3px', height: '16px' }}>{ele + 30 <= totalQA ? ele + 30 : "-"}</td>
        <td style={{ padding: '3px', height: '16px' }}></td>
      </tr>
    ))}
    
    {/* Total marks row */}
    <tr>
      <td style={{ padding: '3px' }}>
        <b>{QuestionHeader?.totalmarks1}</b>
      </td>
      <td style={{ padding: '3px' }}></td>
      <td style={{ padding: '3px' }}>
        <b>{QuestionHeader?.totalmarks2}</b>
      </td>
      <td style={{ padding: '3px' }}></td>
      <td style={{ padding: '3px' }}>
        <b>{QuestionHeader?.totalmarks3}</b>
      </td>
      <td style={{ padding: '3px' }}></td>
      <td style={{ padding: '3px' }}>
        <b>{QuestionHeader?.totalmarks4}</b>
      </td>
      <td style={{ padding: '3px' }}></td>
    </tr>
    
  
    <tr>
      <td style={{ padding: '3px' }} colSpan="6"></td>
      <td style={{ padding: '3px' }}>
        <b>{QuestionHeader?.grandtotal}</b>
      </td>
      <td style={{ padding: '3px' }}></td>
    </tr>
  </tbody>
</Table>
            </div>
          </div>

          {/* Bottom Section - Compact */}
          <div style={{
            flexShrink: 0,
            marginTop: 'auto'
          }}>
            <div className="student-details" style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px'
            }}>
              <p style={{
                margin: '0 8px 0 0',
                fontSize: '8pt'
              }}>
                {QuestionHeader?.totalobtainedmarks}:
              </p>
              <div className="line-5" style={{
                borderBottom: '1px solid #000',
                flexGrow: 1,
                height: '16px'
              }}></div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}>
              <div style={{ width: '50%' }}>
                <div className="student-details" style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}>
                  <p style={{
                    margin: '0 8px 0 0',
                    fontSize: '8pt'
                  }}>
                    {QuestionHeader?.evaluatorsign}:
                  </p>
                  <div className="line-6" style={{
                    borderBottom: '1px solid #000',
                    flexGrow: 1,
                    height: '16px'
                  }}></div>
                </div>
                <div className="student-details" style={{
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <p style={{
                    margin: '0 8px 0 0',
                    fontSize: '8pt'
                  }}>
                    {QuestionHeader?.lastSign}:
                  </p>
                  <div className="line-6" style={{
                    borderBottom: '1px solid #000',
                    flexGrow: 1,
                    height: '16px'
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminQuestionFrontPage;
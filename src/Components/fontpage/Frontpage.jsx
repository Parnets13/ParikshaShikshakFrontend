// import React, { useEffect, useState } from "react";
// import "../fontpage/Frontpage.css";

// import Table from "react-bootstrap/Table";
// import axios from "axios";
// const Frontpage = ({ data }) => {
//   console.log("data", data?.bluePrint?.TypesofQuestions);

//   const totalQA = data?.bluePrint?.TypesofQuestions?.reduce(
//     (a, ele) => a + Number(ele?.NQA),
//     0
//   );
//   const numberofStep = totalQA / 2;

//   console.log("Total Question ==>", totalQA);
//   let array = Array.from(Array(totalQA).keys(), (x) => x + 1);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const [QuestionHeader, setQuestionHeader] = useState([]);
//   const getQuestionHeaderbyMedium = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
//           data?.Medium +
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
//   useEffect(() => {
//     getQuestionHeaderbyMedium();
//   }, []);
//   console.log("QuestionHeader", QuestionHeader);
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
//                     style={{ width: "80px", marginTop: "14px" }}
//                   />
//                 ) : (
//                   <></>
//                 )}
//               </div>
//               <div className="col-sm-10">
            
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
         
//             </div>
//             <div className="title-3">
          
//             </div>
//           </div>

//           <div className="class-details">
//             <div className="class-data">
        
//               <b>
//                 {QuestionHeader?.classs} : {data?.Sub_Class}
//               </b>
//             </div>
//             <div className="class-data">
    
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
                
//                 <b>
//                   {QuestionHeader?.marks}: {data?.bluePrint?.TotalDifficultMask}
//                 </b>
//               </div>
//               <div className="class-data">
               
//                 <b>
//                   {QuestionHeader?.time}: {data?.bluePrint?.DurationOfExam}{" "}
//                 </b>
//               </div>
//               <div className="class-data">
         
//                 <b>
//                   {QuestionHeader?.examdate}: {data?.Test_Date}
//                 </b>
//               </div>
//               <div className="class-data">
    
//                 <b>
//                   {QuestionHeader?.totalquestion}: {totalQA}{" "}
//                 </b>
//               </div>
//             </div>
//           </div>

//           <div className="student-details-container">
//             <div className="d-flex justify-content-center">
        
//               <h6 style={{ textAlign: "center", padding: "5px 0px" }}>
//                 {QuestionHeader?.studentinfo}
//               </h6>
//               <div>
              
//                 <span style={{ fontSize: "16px" }}>
                 
//                 </span>{" "}
//                 <br />
                
//               </div>
//             </div>
//             <div className="student-details">
             
//               <p style={{ margin: "0px" }}>{QuestionHeader?.nameofstudent}:</p>
             
//               <div className="line"></div>
//             </div>

//             <div className="student-number-row">
//               <div style={{ margin: " auto 0" }}>
               
//                 <p>{QuestionHeader?.satsno}:</p>
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
//               </div>

//               <div className="">
            

//                 <p>
//                   {QuestionHeader?.signature}: <b>___________</b>
//                 </p>
//                 <div className=""></div>
//               </div>
//             </div>
//           </div>

//           <div className="student-details-container">
     
//             <h6 style={{ textAlign: "center" }}>
//               {QuestionHeader?.roominvigilator}
//             </h6>

//             <div className="school-number-row">
//               <div style={{ margin: " auto 0" }}>
            
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
      
//               <p style={{ margin: "0px", fontSize: "15px" }}>
//                 {QuestionHeader?.schoolname}:
//               </p>
//               <div className="line-2"></div>
//             </div>
//           </div>

//           <div className="third-row">
//             <div className="student-details">
      
//               <p style={{ margin: "0px" }}>{QuestionHeader?.cluster}:</p>
//               <div className="line-3"></div>
//             </div>
//             <div className="student-details">
            
//               <p style={{ margin: "0px" }}>{QuestionHeader?.block}:</p>
//               <div className="line-3"></div>
//             </div>
//             <div className="student-details">

//               <p style={{ margin: "0px" }}>{QuestionHeader?.distric}:</p>
//               <div className="line-3"></div>
//             </div>
//           </div>

//           <div className="fourth-row">
           
//             <div className="school-details">
    
//               <p style={{ margin: "0px" }}>{QuestionHeader?.govt}</p>
//               <div className="number-box-1"></div>
//             </div>
//             <div className="school-details">
          
//               <p style={{ margin: "0px" }}>{QuestionHeader?.aided}</p>
       
//               <div className="number-box-1"></div>
//             </div>
//             <div className="school-details">
    
//               <p style={{ margin: "0px" }}>{QuestionHeader?.unaided}</p>
//               <div className="number-box-1"></div>
//             </div>
//           </div>


//           <div>({QuestionHeader?.markinfo})</div>
//           <div className="d-flex justify-content-end">
//             <div
//               className="student-details"
//               style={{ padding: "4px 0", width: "49%" }}
//             >
  
//               <p style={{ margin: "0px" }}>
//                 {QuestionHeader?.signatureinvigilator}:{" "}
//               </p>
//               <div className="line-4" style={{ width: "40%" }}></div>
//             </div>
//           </div>

//           <div>
          
     
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
            
//                     <th>{QuestionHeader?.questionno1}</th>
               
//                     <th>{QuestionHeader?.obtainedno1}</th>
           
//                     <th>{QuestionHeader?.questionno2}</th>
               
//                     <th>{QuestionHeader?.obtainedno2}</th>
             
//                     <th>{QuestionHeader?.questionno3}</th>
         
//                     <th>{QuestionHeader?.obtainedno3}</th>
                  
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
                   
//                       <b>{QuestionHeader?.totalmarks1}</b>
//                     </td>
//                     <td></td>
//                     <td>
                  
//                       <b>{QuestionHeader?.totalmarks2}</b>
//                     </td>
//                     <td></td>
//                     <td>
                    
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
                    
//                       <b>{QuestionHeader?.grandtotal}</b>
//                     </td>
//                     <td></td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </div>
//           </div>
//           <div className="student-details">

//             <p style={{ margin: "0px", fontSize: "14px" }}>
//               {QuestionHeader?.totalobtainedmarks}:{" "}
//             </p>
//             <div className="line-5"></div>
//           </div>

//           <div className="d-flex justify-content-end">
//             <div style={{ width: "20%" }}>
//               <div className="student-details">
      
//                 <p style={{ margin: "0px", fontSize: "14px" }}>
//                   {QuestionHeader?.evaluatorsign}:
//                 </p>
//                 <div className="line-6" style={{ width: "24%" }}></div>
//               </div>
           
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Frontpage;
 
 
import React, { useEffect, useState } from "react";
import "../fontpage/Frontpage.css";

import Table from "react-bootstrap/Table";
import axios from "axios";
const Frontpage = ({ data }) => {
  console.log("data", data?.bluePrint?.TypesofQuestions);

  const totalQA = data?.bluePrint?.TypesofQuestions?.reduce(
    (a, ele) => a + Number(ele?.NQA),
    0
  );
  const numberofStep = totalQA / 2;

  console.log("Total Question ==>", totalQA);
  let array = Array.from(Array(totalQA).keys(), (x) => x + 1);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const [QuestionHeader, setQuestionHeader] = useState([]);
  const getQuestionHeaderbyMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
          data?.Medium +
          "/" +
          user?._id,
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
  console.log("QuestionHeader", QuestionHeader);
  return (
    <div>
      {/* new  */}
      <div className="question-paper-display">
        <div className="details-display ">
          <div className="top-titles-container">
            <div className="row">
              <div className="col-sm-2">
                {data?.School_Logo ? (
                  <img
                    src={`${data?.School_Logo}`}
                    alt=""
                    style={{ width: "80px", marginTop: "14px" }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="col-sm-10">
                {data?.Institute_Name ? (
                  <h6>
                    <b>
                      {data?.Institute_Name},{data?.SchoolAddress}
                    </b>
                  </h6>
                ) : (
                  <></>
                )}
                <h6>
                  <b>{data?.bluePrint?.blName}</b>
                </h6>
              </div>
            </div>
            <div className="title-2"></div>
            <div className="title-3"></div>
          </div>

          <div className="class-details">
            <div className="subject-details">
              <b>
                {QuestionHeader?.subject}: {data?.Subject}
              </b>
              <br />
              <b>
                {QuestionHeader?.medium}: {data?.Medium}
              </b>
            </div>
            <div className="class-data">
              <b>
                {QuestionHeader?.classs} : {data?.Sub_Class}
              </b>
            </div>
            <div style={{ textAlign: "justify" }}>
              <div className="class-data">
                <b>
                  {QuestionHeader?.marks}: {data?.bluePrint?.TotalDifficultMask}
                </b>
              </div>
              <div className="class-data">
                <b>
                  {QuestionHeader?.time}: {data?.bluePrint?.DurationOfExam}{" "}
                </b>
              </div>
              <div className="class-data">
                <b>
                  {QuestionHeader?.examdate}: {data?.Test_Date}
                </b>
              </div>
              <div className="class-data">
                <b>
                  {QuestionHeader?.totalquestion}: {totalQA}{" "}
                </b>
              </div>
            </div>
          </div>

          <div className="student-details-container">
            <div className="d-flex justify-content-center">
              <h6 style={{ textAlign: "center", padding: "5px 0px" }}>
                {QuestionHeader?.studentinfo}
              </h6>
              <div>
                <span style={{ fontSize: "16px" }}></span> <br />
              </div>
            </div>
            <div className="student-details">
              <p style={{ margin: "0px" }}>{QuestionHeader?.nameofstudent}:</p>
              <div className="line"></div>
            </div>

            <div className="student-number-row">
              <div style={{ margin: " auto 0" }}>
                <p>{QuestionHeader?.satsno}:</p>
              </div>
              <div className="d-flex">
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
              </div>

              <div className="">
                <p>
                  {QuestionHeader?.signature}: <b>___________</b>
                </p>
                <div className=""></div>
              </div>
            </div>
          </div>

          <div className="student-details-container">
            <h6 style={{ textAlign: "center" }}>
              {QuestionHeader?.roominvigilator}
            </h6>

            <div className="school-number-row">
              <div style={{ margin: " auto 0" }}>
                <p>{QuestionHeader?.idsccode}:</p>
              </div>
              <div className="d-flex">
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
                <div className="number-box"></div>
              </div>
            </div>
            <div className="student-details">
              <p style={{ margin: "0px", fontSize: "35px" }}>
                {QuestionHeader?.schoolname}:
              </p>
              <div className="line-2"></div>
            </div>
          </div>

          <div className="third-row">
            <div className="student-details">
              <p style={{ margin: "0px" }}>{QuestionHeader?.cluster}:</p>
              <div className="line-3"></div>
            </div>
            <div className="student-details">
              <p style={{ margin: "0px" }}>{QuestionHeader?.block}:</p>
              <div className="line-3"></div>
            </div>
            <div className="student-details">
              <p style={{ margin: "0px" }}>{QuestionHeader?.distric}:</p>
              <div className="line-3"></div>
            </div>
          </div>

          <div className="fourth-row">
            <div className="school-details">
              <p style={{ margin: "0px" }}>{QuestionHeader?.govt}</p>
              <div className="number-box-1"></div>
            </div>
            <div className="school-details">
              <p style={{ margin: "0px" }}>{QuestionHeader?.aided}</p>
              <div className="number-box-1"></div>
            </div>
            <div className="school-details">
              <p style={{ margin: "0px" }}>{QuestionHeader?.unaided}</p>
              <div className="number-box-1"></div>
            </div>
          </div>

          <div>({QuestionHeader?.markinfo})</div>
          <div className="d-flex justify-content-end">
            <div
              className="student-details"
              style={{ padding: "4px 0", width: "49%" }}
            >
              <p style={{ margin: "0px" }}>
                {QuestionHeader?.signatureinvigilator}:{" "}
              </p>
              <div className="line-4" style={{ width: "40%" }}></div>
            </div>
          </div>

          <div>
            <h6 style={{ textAlign: "center" }}>{QuestionHeader?.evaluator}</h6>

            <div className="text-center">
              <Table
                responsive
                bordered
                style={{ border: "1px solid" }}
                size="sm"
              >
                <thead>
                  <tr>
                    <th>{QuestionHeader?.questionno1}</th>
                    <th>{QuestionHeader?.obtainedno1}</th>
                    <th>{QuestionHeader?.questionno2}</th>
                    <th>{QuestionHeader?.obtainedno2}</th>
                    <th>{QuestionHeader?.questionno3}</th>
                    <th>{QuestionHeader?.obtainedno3}</th>
                  </tr>
                </thead>
                <tbody>
                  {array?.map((ele) => {
                    if (ele <= (numberofStep <= 15 ? 10 : 10)) {
                      return (
                        <tr>
                          <td>{ele <= totalQA ? ele : "-"}</td>
                          <td></td>
                          <td>{ele + 10 <= totalQA ? ele + 10 : "-"}</td>
                          <td></td>
                          <td>{ele + 20 <= totalQA ? ele + 20 : "-"}</td>
                          <td></td>
                        </tr>
                      );
                    }
                    if (ele <= (numberofStep > 15 ? 20 : 0)) {
                      return (
                        <tr>
                          <td>{ele + 30 <= totalQA ? ele + 30 : "-"}</td>
                          <td></td>
                          <td>{ele + 40 <= totalQA ? ele + 40 : "-"}</td>
                          <td></td>
                          <td>{ele + 50 <= totalQA ? ele + 50 : "-"}</td>
                          <td></td>
                        </tr>
                      );
                    }
                  })}

                  <tr>
                    <td>
                      <b>{QuestionHeader?.totalmarks1}</b>
                    </td>
                    <td></td>
                    <td>
                      <b>{QuestionHeader?.totalmarks2}</b>
                    </td>
                    <td></td>
                    <td>
                      <b>{QuestionHeader?.totalmarks3}</b>
                    </td>
                    <td></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                      <b>{QuestionHeader?.grandtotal}</b>
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
          <div className="student-details">
            <p style={{ margin: "0px", fontSize: "14px" }}>
              {QuestionHeader?.totalobtainedmarks}:{" "}
            </p>
            <div className="line-5"></div>
          </div>

          <div className="d-flex justify-content-end">
            <div style={{ width: "20%" }}>
              <div className="student-details">
                <p style={{ margin: "0px", fontSize: "14px" }}>
                  {QuestionHeader?.evaluatorsign}:
                </p>
                <div className="line-6" style={{ width: "24%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Frontpage;
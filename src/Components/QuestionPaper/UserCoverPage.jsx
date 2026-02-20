// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";
// import { LuPrinter } from "react-icons/lu";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../Admin/CoverPage.css";

// export const UserCoverPage = () => {
//   const navigate = useNavigate();

//   const location = useLocation();
//   const { state } = location;
//   const [data1, setData1] = useState({});
//   const getCoverPage = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getCoverPageBYMedium/" +
//           state?.Medium
//       );
//       if (res.status === 200) {
//         setData1(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (state) {
//       getCoverPage();
//     }
//   }, [state]);

//   const handlePrint = () => {
//     const printableContent = document.getElementById("CoverPage").innerHTML;
//     const originalContent = document.body.innerHTML;
//     // Create a footer element with padding
//     const footerContent = '<div style="padding-bottom: 50px;"></div>';
//     // Replace the content of the body with the content of the printable section
//     document.body.innerHTML = printableContent;
//     // Print the content
//     window.print();
//     // Restore the original content
//     document.body.innerHTML = originalContent;
//     navigate("/blueprint", { state: state });
//     setTimeout(() => {
//       return window.location.reload();
//     }, 1000);
//   };
//   return (
//     <>
//       <div style={{ padding: "10px" }}>
//         <LuPrinter
//           style={{ width: "22px", height: "40px" }}
//           onClick={() => handlePrint("printable-content")}
//         />
//         <div
//           id="CoverPage"
//           style={{ padding: "15px", overflow: "hidden", overflowX: "scroll" }}
//         >
//           <div
//             style={{
//               padding: "15px",
//               border: "2px solid #000",
//               width: "750px",
//               margin: "auto",
//               borderRadius: "20px",
//               height: "1060px",
//             }}
//           >
//             <div className="d-flex align-items-center mb-5 justify-content-around">
//               <div>
//                 {state?.School_Logo ? (
//                   <img
//                     src={`${state?.School_Logo}`}
//                     alt=""
//                     style={{ width: "80px", marginTop: "24px" }}
//                   />
//                 ) : (
//                   <></>
//                 )}
//               </div>
//               <div className=" text-center">
//                 <h6 className="fw-bold">{state?.Institute_Name}</h6>
//                 <h6 className="fw-bold">{state?.SchoolAddress}</h6>
//               </div>
//             </div>
//             <div className="text-center">
//               {" "}
//               <h6 className="fw-bold">{state?.BlueName}</h6>
//             </div>
//             <div
//               className="d-flex justify-content-around mb-5"
//               style={{ marginTop: "130px" }}
//             >
//               <p className="fw-bold fs-6">
//                 {data1?.Subject} :- {state?.Subject}
//               </p>
//               <p className="fw-bold fs-6">
//                 {data1?.Classs} :- {state?.Sub_Class}{" "}
//               </p>
//             </div>
//             <div className="mb-5" style={{ marginTop: "150px" }}>
//               <ul
//                 style={{
//                   listStyle: "none",
//                   width: "fit-content",
//                   margin: "auto",
//                   fontSize: "17px",
//                   fontStyle: "italic",
//                 }}
//               >
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.questionPaper}</p>
//                 </li>
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.blueprint}</p>
//                 </li>
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.answersheet}</p>
//                 </li>
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.questionanylys}</p>
//                 </li>
//               </ul>
//             </div>
//             <div
//               className="d-flex justify-content-around"
//               style={{ marginTop: "99px" }}
//             >
//               <p className="fw-bold">{data1?.SubjectTeacher} :-</p>
//               <div>
//                 <span className="fw-bold mb-0">{data1?.Principal} :-</span>
//                 {/* /
//                     <span className='fw-bold mb-0'>Principal</span> */}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="d-flex justify-content-center mt-2 mb-2">
//           <Button
//             onClick={() => navigate("/blueprint", { state: state })}
//             variant="success"
//           >
//             Continue
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };
 
 
 
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap";
// import { FaStar } from "react-icons/fa";
// import { LuPrinter } from "react-icons/lu";
// import { useLocation, useNavigate } from "react-router-dom";
// import "../Admin/CoverPage.css";

// export const UserCoverPage = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Get data from either location state or localStorage
//   const [state, setState] = useState( {});
//   const [data1, setData1] = useState({});
//   const [loading, setLoading] = useState(true);

  

//   useEffect(()=>{
//     const datad=JSON.parse(localStorage.getItem("questionPaperData"));
//     if(datad){
//       setState(datad);
//     }
//   },[])
//   const getCoverPage = async () => {
//     try {
//       let res = await axios.get(
//         "http://localhost:8774/api/admin/getCoverPageBYMedium/" +
//         state?.Medium
//       );
//       if (res.status === 200) {
//         setData1(res.data.success);
//         setLoading(false)
//       }
//     } catch (error) {
//       console.log(error);
//         setLoading(false)
//     }
//   };

//   useEffect(() => {
//     if (state) {
//       // Store the question paper data in localStorage
//       localStorage.setItem("questionPaperData", JSON.stringify(state));
//       getCoverPage();
//     }
//   }, [state?.Medium]);

//   const handlePrint = () => {
//     const printableContent = document.getElementById("CoverPage").innerHTML;
//     const originalContent = document.body.innerHTML;
//     const footerContent = '<div style="padding-bottom: 50px;"></div>';
//     document.body.innerHTML = printableContent;
//     window.print();
//     document.body.innerHTML = originalContent;
//     navigate("/blueprint", { state: state });
//     setTimeout(() => {
//       return window.location.reload();
//     }, 1000);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!state) {
//     return (
//       <div>
//         <h3>No question paper data found</h3>
//         <Button onClick={() => navigate("/")}>Go Back</Button> 
//       </div>
//     );
//   }

//   return (
//     <>
//       <div style={{ padding: "10px" }}>
//         <LuPrinter
//           style={{ width: "22px", height: "40px" }}
//           onClick={() => handlePrint("printable-content")}
//         />
//         <div
//           id="CoverPage"
//           style={{ padding: "15px", overflow: "hidden", overflowX: "scroll" }}
//         >
//           <div
//             style={{
//               padding: "15px",
//               border: "2px solid #000",
//               width: "750px",
//               margin: "auto",
//               borderRadius: "20px",
//               height: "1060px",
//             }}
//           >
//             <div className="d-flex align-items-center mb-5 justify-content-around">
//               <div>
//                 {state?.School_Logo ? (
//                   <img
//                     src={`${state?.School_Logo}`}
//                     alt=""
//                     style={{ width: "80px", marginTop: "24px" }}
//                   />
//                 ) : (
//                   <></>
//                 )}
//               </div>
//               <div className=" text-center">
//                 <h6 className="fw-bold">{state?.Institute_Name}</h6>
//                 <h6 className="fw-bold">{state?.SchoolAddress}</h6>
//               </div>
//             </div>
//             <div className="text-center">
//               {" "}
//               <h6 className="fw-bold">{state?.BlueName}</h6>
//             </div>
//             <div
//               className="d-flex justify-content-around mb-5"
//               style={{ marginTop: "130px" }}
//             >
//               <p className="fw-bold fs-6">
//                 {data1?.Subject} :- {state?.Subject}
//               </p>
//               <p className="fw-bold fs-6">
//                 {data1?.Classs} :- {state?.Sub_Class}{" "}
//               </p>
//             </div>
//             <div className="mb-5" style={{ marginTop: "150px" }}>
//               <ul
//                 style={{
//                   listStyle: "none",
//                   width: "fit-content",
//                   margin: "auto",
//                   fontSize: "17px",
//                   fontStyle: "italic",
//                 }}
//               >
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.questionPaper}</p>
//                 </li>
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.blueprint}</p>
//                 </li>
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.answersheet}</p>
//                 </li>
//                 <li className="d-flex gap-4 align-items-center ">
//                   <p>
//                     {" "}
//                     <FaStar />
//                   </p>
//                   <p>{data1?.questionanylys}</p>
//                 </li>
//               </ul>
//             </div>
//             <div
//               className="d-flex justify-content-around"
//               style={{ marginTop: "99px" }}
//             >
//               <p className="fw-bold">{data1?.SubjectTeacher} :-</p>
//               <div>
//                 <span className="fw-bold mb-0">{data1?.Principal} :-</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="d-flex justify-content-center mt-2 mb-2">
//           <Button
//             onClick={() => navigate("/blueprint", { state: state })}
//             variant="success"
//           >
//             Continue
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }; 
 
 
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import "../Admin/CoverPage.css";

export const UserCoverPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get data from either location state or localStorage
  const [state, setState] = useState(null);
  const [data1, setData1] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  useEffect(() => {
    setLoadingMessage("Loading question paper data...");
    const datad = JSON.parse(localStorage.getItem("questionPaperData"));
    console.log("Question paper data from localStorage:", datad);
    if (datad && Object.keys(datad).length > 0) {
      setState(datad);
      setLoadingMessage("Data loaded, preparing cover page...");
    } else {
      console.log("No question paper data found in localStorage");
      setLoadingMessage("No data found...");
      setTimeout(() => setLoading(false), 2000);
    }
  }, []);

  const getCoverPage = async () => {
    if (!state?.Medium) {
      console.log("No Medium found in state, skipping cover page fetch");
      setTimeout(() => setLoading(false), 3000);
      return;
    }
    
    setLoadingMessage("Fetching cover page template...");
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getCoverPageBYMedium/" + state?.Medium
      );
      if (res.status === 200) {
        setLoadingMessage("Generating question paper...");
        // Set a timeout for 5 seconds before hiding the loader
        setTimeout(() => {
          setData1(res.data.success);
          setLoading(false);
        }, 5000);
      }
    } catch (error) {
      console.log("Cover page fetch error:", error);
      setLoadingMessage("Finalizing...");
      // Still wait 3 seconds even if there's an error
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (state && state.Medium) {
      console.log("State updated with Medium:", state.Medium);
      getCoverPage();
    }
  }, [state]);

  const handlePrint = () => {
    const printableContent = document.getElementById("CoverPage").innerHTML;
    const originalContent = document.body.innerHTML;
    const footerContent = '<div style="padding-bottom: 50px;"></div>';
    document.body.innerHTML = printableContent;
    window.print();
    document.body.innerHTML = originalContent;
    navigate("/blueprint", { state: state });
    setTimeout(() => {
      return window.location.reload();
    }, 1000);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff'
      }}>
        {/* Animated Spinner */}
        <div style={{
          width: '80px',
          height: '80px',
          border: '6px solid rgba(255,255,255,0.3)',
          borderTop: '6px solid #fff',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: '30px'
        }} />
        
        {/* Loading Text */}
        <h2 style={{ 
          fontSize: '28px', 
          fontWeight: '700',
          marginBottom: '15px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
        }}>
          ಪ್ರಶ್ನೆ ಪತ್ರಿಕೆ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...
        </h2>
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.9,
          marginBottom: '10px'
        }}>
          Generating Question Paper...
        </p>
        <p style={{ 
          fontSize: '16px', 
          opacity: 0.8,
          marginBottom: '5px',
          fontStyle: 'italic'
        }}>
          {loadingMessage}
        </p>
        <p style={{ 
          fontSize: '14px', 
          opacity: 0.7 
        }}>
          Please wait, this may take a few seconds
        </p>

        {/* Progress Bar */}
        <div style={{
          width: '300px',
          height: '8px',
          background: 'rgba(255,255,255,0.3)',
          borderRadius: '10px',
          marginTop: '30px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: '#fff',
            borderRadius: '10px',
            animation: 'progress 5s ease-in-out'
          }} />
        </div>

        {/* CSS Animations */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}
        </style>
      </div>
    );
  }

  if (!state) {
    return (
      <div>
        <h3>No question paper data found</h3>
        <Button onClick={() => navigate("/")}>Go Back</Button>
      </div>
    );
  }

  return (
    <>
      <div style={{ padding: "10px" }}>
        <LuPrinter
          style={{ width: "22px", height: "40px" }}
          onClick={() => handlePrint("printable-content")}
        />
        <div
          id="CoverPage"
          style={{ padding: "15px", overflow: "hidden", overflowX: "scroll" }}
        >
          <div
            style={{
              padding: "15px",
              border: "2px solid #000",
              width: "750px",
              margin: "auto",
              borderRadius: "20px",
              height: "1060px",
            }}
          >
            <div className="d-flex align-items-center mb-5 justify-content-around">
              <div>
                {state?.School_Logo ? (
                  <img
                    src={`${state?.School_Logo}`}
                    alt=""
                    style={{ width: "80px", marginTop: "24px" }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className=" text-center">
                <h6 className="fw-bold">{state?.Institute_Name}</h6>
                <h6 className="fw-bold">{state?.SchoolAddress}</h6>
              </div>
            </div>
            <div className="text-center">
              {" "}
              <h6 className="fw-bold">{state?.BlueName}</h6>
            </div>
            <div
              className="d-flex justify-content-around mb-5"
              style={{ marginTop: "130px" }}
            >
              <p className="fw-bold fs-6">
                {data1?.Subject} :- {state?.Subject}
              </p>
              <p className="fw-bold fs-6">
                {data1?.Classs} :- {state?.Sub_Class}{" "}
              </p>
            </div>
            <div className="mb-5" style={{ marginTop: "150px" }}>
              <ul
                style={{
                  listStyle: "none",
                  width: "fit-content",
                  margin: "auto",
                  fontSize: "17px",
                  fontStyle: "italic",
                }}
              >
                <li className="d-flex gap-4 align-items-center ">
                  <p>
                    {" "}
                    <FaStar />
                  </p>
                  <p>{data1?.questionPaper}</p>
                </li>
                <li className="d-flex gap-4 align-items-center ">
                  <p>
                    {" "}
                    <FaStar />
                  </p>
                  <p>{data1?.blueprint}</p>
                </li>
                <li className="d-flex gap-4 align-items-center ">
                  <p>
                    {" "}
                    <FaStar />
                  </p>
                  <p>{data1?.answersheet}</p>
                </li>
                <li className="d-flex gap-4 align-items-center ">
                  <p>
                    {" "}
                    <FaStar />
                  </p>
                  <p>{data1?.questionanylys}</p>
                </li>
              </ul>
            </div>
            <div
              className="d-flex justify-content-around"
              style={{ marginTop: "99px" }}
            >
              <p className="fw-bold">{data1?.SubjectTeacher} :-</p>
              <div>
                <span className="fw-bold mb-0">{data1?.Principal} :-</span>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-2 mb-2">
          <Button
            onClick={() => navigate("/blueprint", { state: state })}
            variant="success"
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
}; 
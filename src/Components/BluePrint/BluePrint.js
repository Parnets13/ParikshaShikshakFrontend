import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../BluePrint/BluePrint.css";
import axios from "axios";
import swal from "sweetalert";
import parse from "html-react-parser";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { FiPrinter } from "react-icons/fi";

const BluePrint = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("State==>", state);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const [blueprint, setblueprint] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  const getallblueprint = async () => {
    try {
      setLoadingMessage("Loading blueprints...");
      
      // Build query params for server-side filtering
      const params = new URLSearchParams();
      if (state?.Board) params.append('board', state.Board);
      if (state?.Medium) params.append('medium', state.Medium);
      if (state?.Class) params.append('className', state.Class);
      if (state?.Sub_Class) params.append('subClassName', state.Sub_Class);
      if (state?.Subject) params.append('subjects', state.Subject);
      if (state?.Exam_Name) params.append('exameName', state.Exam_Name);
      params.append('limit', '100'); // Get more results
      
      const apiUrl = `http://localhost:8774/api/admin/getAllBLUEPRINTs/${user?._id}?${params.toString()}`;
      console.log("=== Blueprint API Call ===");
      console.log("API URL:", apiUrl);
      console.log("User ID:", user?._id);
      console.log("Filter params:", Object.fromEntries(params));
      
      let res = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("=== Blueprint API Response ===");
      console.log("API Response Status:", res.status);
      console.log("API Response Data:", res.data);
      console.log("Blueprints received from API:", res.data?.success?.length || 0);
      console.log("Pagination:", res.data?.pagination);
      
      if (res.status === 200) {
        setblueprint(res.data.success || []);
        console.log("Blueprint state set with", res.data.success?.length || 0, "items");
        
        // Log first few blueprints to see what's in DB
        if (res.data.success?.length > 0) {
          console.log("=== Sample Blueprints from DB ===");
          res.data.success.slice(0, 5).forEach((bp, i) => {
            console.log(`Blueprint ${i + 1}:`, {
              board: bp.board,
              medium: bp.medium,
              className: bp.className,
              SubClassName: bp.SubClassName,
              subjects: bp.subjects,
              ExameName: bp.ExameName
            });
          });
        } else {
          console.log("WARNING: No blueprints found for the given filters!");
        }
        setLoadingMessage("Blueprint loaded successfully!");
      }
    } catch (error) {
      console.log("=== Blueprint API Error ===");
      console.log("Error Type:", error.name);
      console.log("Error Message:", error.message);
      console.log("Error Code:", error.code);
      console.log("Error Response:", error.response?.data);
      console.log("Error Status:", error.response?.status);
      console.log("Full Error:", error);
      setLoadingMessage("Error loading blueprint data: " + error.message);
    }
  };

  const [AllChapterData1, setAllChapterData1] = useState([]);
  const [blueprint1, setblueprint1] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      await getallblueprint();
      // Set loading to false after data is fetched (with 3 second delay for smooth UX)
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    fetchData();
  }, []);

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
          authId: user?._id,
          bluePrintId: val?._id,
          status: status,
        },
      };

      let res = await axios(config);
      if (res.status == 200) {
        if (status == "Saved Draft") {
          setTimeout(() => {
            return navigate("/profile");
          }, 1000);
          return swal({
            title: "Yeah!",
            text: "Successfully Saved Draft",
            icon: "success",
            button: "OK!",
          });
        } else {
          swal({
            title: "Yeah!",
            text: "Generated Question Paper Has Sent to your registered email.",
            icon: "success",
            button: "OK!",
          });
          if (
            val?.SubClassName?.toLowerCase() == "class 10" &&
            val?.subjects?.toLowerCase() == "maths"
          ) {
            return navigate("/10th_QP_maths", {
              state: { ...state, bluePrint: val },
            });
          } else if (
            val?.SubClassName?.toLowerCase() == "class 10" &&
            val?.subjects?.toLowerCase() == "science"
          ) {
            return navigate("/science10th", {
              state: { ...state, bluePrint: val },
            });
          } else if (
            val?.SubClassName?.toLowerCase() == "class 10" &&
            val?.subjects?.toLowerCase() == "social science"
          ) {
            return navigate("/socialqp", {
              state: { ...state, bluePrint: val },
            });
          } else if (
            val?.SubClassName?.toLowerCase() == "class 10" &&
            val?.subjects?.toLowerCase() == "english"
          ) {
            return navigate("/englishqp", {
              state: { ...state, bluePrint: val },
            });
          } else
            return navigate("/questionpaper", {
              state: { ...state, bluePrint: val },
            });
        }
      }
    } catch (error) {
      console.log(error);
      swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "OK!",
      });
    }
  };
  function niqueDataName(AllChapterData) {
    const uniqueObjectsArray = [];
    const uniqueNames = new Set(); 

    AllChapterData?.forEach((ele, i) => {
      const chapterName = ele?.Blueprintchapter;
      if (!uniqueNames.has(chapterName)) {
        uniqueNames.add(chapterName);
        uniqueObjectsArray.push({
          index: i + 1,
          name: chapterName,
        });
      }
    });
    return uniqueObjectsArray;
  }

  const uniqueObjectsArray = [];
  const uniqueNames = new Set(); // Using a Set to keep track of unique names

  AllChapterData1?.forEach((ele, i) => {
    const chapterName = ele?.Blueprintchapter;
    if (!uniqueNames.has(chapterName)) {
      uniqueNames.add(chapterName);
      uniqueObjectsArray.push({
        index: i + 1,
        name: chapterName,
      });
    }
  });

  console.log("uniqueObjectsArray", niqueDataName);

  function bluePrintTotalQues(AllChapterData, chapterName, Qtype) {
    let obj = { TotalQ: "", totalMas: 0 };
    let am = AllChapterData?.filter(
      (item) =>
        item?.BluePrintQuestiontype == Qtype &&
        item?.Blueprintchapter == chapterName
    );
    if (am.length != 0) {
      obj["TotalQ"] = am?.reduce(
        (a, am) => a + Number(am?.Blueprintnoofquestion),
        0
      );
      obj["totalMas"] = am?.reduce(
        (a, am) =>
          a + Number(am?.Blueprintnoofquestion * am?.BluePrintmarksperquestion),
        0
      );
    }
    return obj;
  }
  var TotalMask = 0;
  const QuestionNameWiseMask = (AllChapterData, chapterName) => {
    let obj = { TotalQ: "", totalMas: "" };
    let am = AllChapterData?.filter(
      (item) => item?.Blueprintchapter == chapterName
    );
    if (am.length != 0) {
      obj["totalMas"] = am?.reduce(
        (a, am) =>
          a + Number(am?.Blueprintnoofquestion * am?.BluePrintmarksperquestion),
        0
      );
      TotalMask = TotalMask + obj.totalMas;
    }
    return obj;
  };

  // to print the pdf ----->
  const createPDF = async () => {
    // setRotate(360);

    // dynamic image is also adding in the PDF
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"), {
      useCORS: true,
    });
    console.log("hhhh", data);
    const img = data.toDataURL("image/png");
    console.log("ddkd1", img);
    const imgProperties = pdf.getImageProperties(img);
    console.log("ddkd2", imgProperties);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    console.log("ddkd3", pdfWidth);
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    console.log("ddkd4", pdfHeight);
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);

    // const input = document.getElementById("pdf");
    // const options = { scrollY: -window.scrollY, useCORS: true };
    // const canvas = await html2canvas(input, options);
    // const imgData = canvas.toDataURL("image/png");
    // const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);
    // pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    pdf.save("Blueprint.pdf");
  };

  // Function to calculate font size dynamically to fit content within available space
  const calculateFontSizeToFitContent = (pdf, content, maxWidth, maxHeight) => {
    let fontSize = 8; // Initial font size
    const padding = 5; // Padding to avoid content touching the edges

    // Loop until content fits within available space
    while (
      pdf.getStringUnitWidth(content) * fontSize + padding > maxWidth ||
      fontSize + padding > maxHeight
    ) {
      fontSize--; 
    }

    return fontSize;
  };

  const createPDF1 = async () => {
   
    const pdf = new jsPDF("landscape", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf1"), {
      useCORS: true,
    });
    console.log("hhhh", data);
    const img = data.toDataURL("image/png");
    console.log("ddkd1", img);
    const imgProperties = pdf.getImageProperties(img);
    console.log("ddkd2", imgProperties);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    console.log("ddkd3", pdfWidth);
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    console.log("ddkd4", pdfHeight);
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);

    // const input = document.getElementById("pdf");
    // const options = { scrollY: -window.scrollY, useCORS: true };
    // const canvas = await html2canvas(input, options);
    // const imgData = canvas.toDataURL("image/png");
    // const pdf = new jsPDF("p", "pt", [canvas.width, canvas.height]);
    // pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

    pdf.save("Blueprint.pdf");
  };
  console.log("blueprint1", blueprint1);
  console.log("blueprint", blueprint);
  
  // Debug: Log filter criteria and matching results
  const filteredBlueprints = blueprint?.filter(
    (ele) =>
      ele?.board == state?.Board &&
      ele?.medium == state?.Medium &&
      ele?.className == state?.Class &&
      ele?.SubClassName == state?.Sub_Class &&
      ele?.subjects == state?.Subject && 
      ele?.ExameName === state?.Exam_Name
  );
  
  console.log("=== Blueprint Filter Debug ===");
  console.log("Total blueprints in state:", blueprint?.length);
  console.log("Filtered blueprints count:", filteredBlueprints?.length);
  console.log("Filter criteria (from state):", {
    Board: state?.Board,
    Medium: state?.Medium,
    Class: state?.Class,
    Sub_Class: state?.Sub_Class,
    Subject: state?.Subject,
    Exam_Name: state?.Exam_Name
  });
  
  // Check each filter condition separately
  if (blueprint?.length > 0) {
    console.log("=== Filter Breakdown ===");
    const boardMatch = blueprint.filter(ele => ele?.board == state?.Board);
    console.log("After Board filter:", boardMatch.length);
    
    const mediumMatch = boardMatch.filter(ele => ele?.medium == state?.Medium);
    console.log("After Medium filter:", mediumMatch.length);
    
    const classMatch = mediumMatch.filter(ele => ele?.className == state?.Class);
    console.log("After Class filter:", classMatch.length);
    
    const subClassMatch = classMatch.filter(ele => ele?.SubClassName == state?.Sub_Class);
    console.log("After SubClass filter:", subClassMatch.length);
    
    const subjectMatch = subClassMatch.filter(ele => ele?.subjects == state?.Subject);
    console.log("After Subject filter:", subjectMatch.length);
    
    const examMatch = subjectMatch.filter(ele => ele?.ExameName === state?.Exam_Name);
    console.log("After ExameName filter:", examMatch.length);
    
    // Show what subjects are available for this class
    if (subClassMatch.length > 0 && subjectMatch.length === 0) {
      console.log("=== Available Subjects for this Class ===");
      const availableSubjects = [...new Set(subClassMatch.map(bp => bp.subjects))];
      console.log("Available subjects:", availableSubjects);
      console.log("Requested subject:", state?.Subject);
    }
  }

  const [bluePrintHeader, setbluePrintHeader] = useState({});
  const GetBluePrintHeaderByMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getblueprintheaderbymedium/" +
          state?.Medium
      );
      if (res.status === 200) {
        setbluePrintHeader(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("bluePrintHeader", bluePrintHeader);

  const [QuestionHeader, setQuestionHeader] = useState([]);
  const getQuestionHeaderbyMedium = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
          state?.Medium +
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
    GetBluePrintHeaderByMedium();
    getQuestionHeaderbyMedium();
  }, [state?.Medium]);

  console.log("QuestionHeader", QuestionHeader);

  // Loading Screen
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
          ಬ್ಲೂಪ್ರಿಂಟ್ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...
        </h2>
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.9,
          marginBottom: '10px'
        }}>
          Blueprint is getting ready...
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
            animation: 'progress 3s ease-in-out'
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

  return (
    <div>
      <div className="">
        <div className="">
          {/* BluePrint display */}
          <div className="details-display ">
            {/* <div style={{textAlign:"center"}} >
              <img src="../Images/logo.png" alt="" style={{ width: "100px" }} />
            </div> */}

            <div className="weightage-objectives">
              <div className="container">
                <div className="row my-2">
                  <div className="col-md-12 text-end ">
                    <div className="justify-content-end d-flex gap-3">
                      {/* <FiPrinter
                        onClick={createPDF}
                        style={{ cursor: "pointer" }}
                      /> */}
                      <button onClick={createPDF} className="btn btn-success">
                        Download Blueprint 1
                      </button>
                      <button onClick={createPDF1} className="btn btn-success">
                        Download Blueprint 2
                      </button>
                      <div id="google_translate_element"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="objectives-table ">
                {/* Show message if no blueprints match the criteria */}
                {blueprint?.filter(
                  (ele) =>
                    ele?.board == state?.Board &&
                    ele?.medium == state?.Medium &&
                    ele?.className == state?.Class &&
                    ele?.SubClassName == state?.Sub_Class &&
                    ele?.subjects == state?.Subject && 
                    ele?.ExameName === state?.Exam_Name
                )?.length === 0 && (
                  <div className="text-center p-5" style={{ 
                    background: '#fff3cd', 
                    border: '1px solid #ffc107', 
                    borderRadius: '8px',
                    margin: '20px'
                  }}>
                    <h4 style={{ color: '#856404' }}>⚠️ Blueprint Not Found</h4>
                    <p style={{ color: '#856404' }}>
                      No blueprint is available for the selected combination:
                    </p>
                    <ul style={{ textAlign: 'left', display: 'inline-block', color: '#856404' }}>
                      <li><strong>Board:</strong> {state?.Board}</li>
                      <li><strong>Medium:</strong> {state?.Medium}</li>
                      <li><strong>Class:</strong> {state?.Class}</li>
                      <li><strong>Sub Class:</strong> {state?.Sub_Class}</li>
                      <li><strong>Subject:</strong> {state?.Subject}</li>
                      <li><strong>Exam:</strong> {state?.Exam_Name}</li>
                    </ul>
                    <p style={{ color: '#856404', marginTop: '15px' }}>
                      Please contact the administrator to create a blueprint for this combination.
                    </p>
                    <button 
                      className="btn btn-warning mt-3" 
                      onClick={() => window.history.back()}
                    >
                      ← Go Back
                    </button>
                  </div>
                )}
                {blueprint
                  ?.filter(
                    (ele) =>
                      ele?.board == state?.Board &&
                      ele?.medium == state?.Medium &&
                      ele?.className == state?.Class &&
                      ele?.SubClassName == state?.Sub_Class &&
                      ele?.subjects == state?.Subject && 
                      ele?.ExameName === state?.Exam_Name
                  )
                  ?.map((val, i) => {
                    return (
                      <div className="blueprint-content-display" key={i}>
                        <div id="pdf" style={{ padding: "15px" }}>
                          <div
                            className="p-3"
                            style={{ border: "2px solid black", size: "A4" }}
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
                                        <h6 style={{ fontWeight: "bold" }}>
                                          {state?.Institute_Name}
                                        </h6>
                                        {/* <h4>ಸಾಂತಾ ಪಾಲ್ ಶಾಲೇ</h4> */}
                                      </div>
                                      <div className="title-2">
                                        <h6 style={{ fontWeight: "bold" }}>
                                          {state?.SchoolAddress}
                                        </h6>
                                        {/* <h5>ಬೆಂಗಳೂರು</h5> */}
                                      </div>
                                      <div className="title-3">
                                        <h6 style={{ fontWeight: "bold" }}>
                                          {val?.blName}
                                        </h6>
                                        <h6 style={{ fontWeight: "bold" }}>
                                          {bluePrintHeader?.BluePrintName}
                                        </h6>
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
                                        {QuestionHeader?.subject}:{" "}
                                        {val?.subjects}
                                      </b>
                                    </div>
                                    <div>
                                      <div className="class-data">
                                        <b>
                                          {QuestionHeader?.blueprintBoard}:{" "}
                                          {val?.board}
                                        </b>
                                      </div>
                                      <div className="class-data">
                                        <b>
                                          {QuestionHeader?.time}:{" "}
                                          {val?.DurationOfExam}
                                        </b>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* First BluePrint */}
                            <div className="container">
                              <div className="d-flex gap-3 ">
                                <div className="col-md-7 blue-print_1tab">
                                  {/* table 3  */}

                                  <div className="weightage-objectives mt-4">
                                    <div className="main-title">
                                      <b>1.</b>
                                      <b>{bluePrintHeader?.UnitWiseMrk}</b>
                                    </div>
                                    <div className="text-center">
                                      <div className="objectives-table">
                                        <Table
                                          responsive
                                          bordered
                                          hover
                                          size="md"
                                          style={{ border: "2px solid black" }}
                                        >
                                          <thead>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.SNo}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Lessons}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Questions}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Marks}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Percentage}
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {niqueDataName(
                                              val?.AllChapter
                                            )?.map((item, i) => {
                                              return (
                                                <tr
                                                  style={{
                                                    border: "2px solid black",
                                                  }}
                                                >
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b>{i + 1}</b>
                                                  </td>

                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    {/* ಉದ್ದಿಷ್ಟಗಳು */}
                                                    <b>{item?.name} </b>
                                                  </td>
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b>
                                                      {val?.AllChapter?.filter(
                                                        (ele) =>
                                                          ele?.Blueprintchapter ==
                                                          item?.name
                                                      )?.reduce(
                                                        (a, ele) =>
                                                          a +
                                                          Number(
                                                            ele?.Blueprintnoofquestion
                                                          ),
                                                        0
                                                      )}
                                                    </b>
                                                  </td>
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b>
                                                      {" "}
                                                      {val?.AllChapter?.filter(
                                                        (ele) =>
                                                          ele?.Blueprintchapter ==
                                                          item?.name
                                                      )?.reduce(
                                                        (a, ele) =>
                                                          a +
                                                          Number(
                                                            ele?.Blueprintnoofquestion *
                                                              ele?.BluePrintmarksperquestion
                                                          ),
                                                        0
                                                      )}
                                                    </b>
                                                  </td>
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b>
                                                      {(
                                                        (val?.AllChapter?.filter(
                                                          (ele) =>
                                                            ele?.Blueprintchapter ==
                                                            item?.name
                                                        )?.reduce(
                                                          (a, ele) =>
                                                            a +
                                                            Number(
                                                              ele?.Blueprintnoofquestion *
                                                                ele?.BluePrintmarksperquestion
                                                            ),
                                                          0
                                                        ) /
                                                          val?.AllChapter?.reduce(
                                                            (a, ele) =>
                                                              a +
                                                              Number(
                                                                ele?.BluePrintmarksperquestion *
                                                                  ele?.Blueprintnoofquestion
                                                              ),
                                                            0
                                                          )) *
                                                        100
                                                      ).toFixed(2)}
                                                      %
                                                    </b>
                                                  </td>
                                                </tr>
                                              );
                                            })}

                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{bluePrintHeader?.Total}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {" "}
                                              </td>

                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a + Number(i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a +
                                                      Number(i?.Mask * i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {" "}
                                                <b>100%</b>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-5 blue-print_1tab">
                                  {/* table 1 */}
                                  <div className="weightage-objectives mt-4">
                                    <div className="main-title">
                                      <b>2.</b>
                                      <b>{bluePrintHeader?.ObjectiveMrks}</b>
                                    </div>
                                    <div className="text-center">
                                      <div className="objectives-table">
                                        <Table
                                          responsive
                                          bordered
                                          hover
                                          style={{ border: "2px solid black" }}
                                        >
                                          <thead>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.SNo}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Specifics}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Questions}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Marks}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Percentage}
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {val?.objectives?.map((item, i) => {
                                              return (
                                                <tr
                                                  style={{
                                                    border: "2px solid black",
                                                  }}
                                                >
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b> {i + 1}</b>
                                                  </td>
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b>{item?.Objective}</b>
                                                  </td>
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b>
                                                      {" "}
                                                      {val?.AllChapter?.filter(
                                                        (ele) =>
                                                          ele?.Blueprintobjective ==
                                                          item?.Objective
                                                      )?.reduce(
                                                        (a, ele) =>
                                                          a +
                                                          Number(
                                                            ele?.Blueprintnoofquestion
                                                          ),
                                                        0
                                                      )}
                                                    </b>
                                                  </td>
                                                  <td
                                                    style={{
                                                      border: "2px solid black",
                                                    }}
                                                  >
                                                    <b>
                                                      {" "}
                                                      {val?.AllChapter?.filter(
                                                        (ele) =>
                                                          ele?.Blueprintobjective ==
                                                          item?.Objective
                                                      )?.reduce(
                                                        (a, ele) =>
                                                          a +
                                                          Number(
                                                            ele?.Blueprintnoofquestion *
                                                              ele?.BluePrintmarksperquestion
                                                          ),
                                                        0
                                                      )}
                                                    </b>
                                                  </td>
                                                  <td>
                                                    <b>
                                                      {" "}
                                                      {(
                                                        (val?.AllChapter?.filter(
                                                          (ele) =>
                                                            ele?.Blueprintobjective ==
                                                            item?.Objective
                                                        )?.reduce(
                                                          (a, ele) =>
                                                            a +
                                                            Number(
                                                              ele?.Blueprintnoofquestion *
                                                                ele?.BluePrintmarksperquestion
                                                            ),
                                                          0
                                                        ) /
                                                          val?.AllChapter?.reduce(
                                                            (a, ele) =>
                                                              a +
                                                              Number(
                                                                ele?.BluePrintmarksperquestion *
                                                                  ele?.Blueprintnoofquestion
                                                              ),
                                                            0
                                                          )) *
                                                        100
                                                      ).toFixed(2)}
                                                      %
                                                    </b>
                                                  </td>
                                                </tr>
                                              );
                                            })}
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{bluePrintHeader?.Total}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {" "}
                                              </td>

                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a + Number(i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a +
                                                      Number(i?.Mask * i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>100%</b>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>

                                  {/* table 2 */}
                                  <div className="weightage-objectives">
                                    <div className="main-title">
                                      <b>3.</b>
                                      <b>{bluePrintHeader?.QuestionWiseMrk}</b>
                                    </div>
                                    <div className="text-center">
                                      <div className="objectives-table">
                                        <Table
                                          responsive
                                          bordered
                                          hover
                                          size="sm"
                                          style={{ border: "2px solid black" }}
                                        >
                                          <thead>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{bluePrintHeader?.SNo}</b>
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {" "}
                                                  {
                                                    bluePrintHeader?.TypeOfQuestion
                                                  }
                                                </b>
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {bluePrintHeader?.Questions}
                                                </b>
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{bluePrintHeader?.Marks}</b>
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {bluePrintHeader?.Percentage}
                                                </b>
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {/* {blueprint?.Weightageofthecontent?.map((val, i) => {
                              return ( */}
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>1</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {
                                                    bluePrintHeader?.Objectivequestion
                                                  }
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {" "}
                                                  {val?.AllChapter?.filter(
                                                    (item) =>
                                                      item?.BluePrintQuestiontype ==
                                                      "O T"
                                                  )?.reduce(
                                                    (a, am) =>
                                                      a +
                                                      Number(
                                                        am?.Blueprintnoofquestion
                                                      ),
                                                    0
                                                  )}
                                                </b>
                                              </td>

                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {" "}
                                                  {val?.AllChapter?.filter(
                                                    (item) =>
                                                      item?.BluePrintQuestiontype ==
                                                      "O T"
                                                  )?.reduce(
                                                    (a, am) =>
                                                      a +
                                                      Number(
                                                        am?.BluePrintmarksperquestion *
                                                          am?.Blueprintnoofquestion
                                                      ),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {" "}
                                                  {(
                                                    (val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.BluePrintQuestiontype ==
                                                        "O T"
                                                    )?.reduce(
                                                      (a, ele) =>
                                                        a +
                                                        Number(
                                                          ele?.Blueprintnoofquestion *
                                                            ele?.BluePrintmarksperquestion
                                                        ),
                                                      0
                                                    ) /
                                                      val?.AllChapter?.reduce(
                                                        (a, ele) =>
                                                          a +
                                                          Number(
                                                            ele?.BluePrintmarksperquestion *
                                                              ele?.Blueprintnoofquestion
                                                          ),
                                                        0
                                                      )) *
                                                    100
                                                  ).toFixed(2)}
                                                  %
                                                </b>
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b> 2</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {
                                                    bluePrintHeader?.ShortanswerQ
                                                  }
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.AllChapter?.filter(
                                                    (item) =>
                                                      item?.BluePrintQuestiontype ==
                                                        "V.S.A" ||
                                                      item?.BluePrintQuestiontype ==
                                                        "S.A"
                                                  )?.reduce(
                                                    (a, am) =>
                                                      a +
                                                      Number(
                                                        am?.Blueprintnoofquestion
                                                      ),
                                                    0
                                                  )}
                                                </b>
                                              </td>

                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.AllChapter?.filter(
                                                    (item) =>
                                                      item?.BluePrintQuestiontype ==
                                                        "V.S.A" ||
                                                      item?.BluePrintQuestiontype ==
                                                        "S.A"
                                                  )?.reduce(
                                                    (a, am) =>
                                                      a +
                                                      Number(
                                                        am?.BluePrintmarksperquestion *
                                                          am?.Blueprintnoofquestion
                                                      ),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {(
                                                    (val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.BluePrintQuestiontype ==
                                                          "V.S.A" ||
                                                        item?.BluePrintQuestiontype ==
                                                          "S.A"
                                                    )?.reduce(
                                                      (a, ele) =>
                                                        a +
                                                        Number(
                                                          ele?.Blueprintnoofquestion *
                                                            ele?.BluePrintmarksperquestion
                                                        ),
                                                      0
                                                    ) /
                                                      val?.AllChapter?.reduce(
                                                        (a, ele) =>
                                                          a +
                                                          Number(
                                                            ele?.BluePrintmarksperquestion *
                                                              ele?.Blueprintnoofquestion
                                                          ),
                                                        0
                                                      )) *
                                                    100
                                                  ).toFixed(2)}
                                                  %
                                                </b>
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>3</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {" "}
                                                  {bluePrintHeader?.LonganswerQ}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.AllChapter?.filter(
                                                    (item) =>
                                                      item?.BluePrintQuestiontype ==
                                                        "L.A 1" ||
                                                      item?.BluePrintQuestiontype ==
                                                        "L.A 2" ||
                                                      item?.BluePrintQuestiontype ==
                                                        "L.A 3"
                                                  )?.reduce(
                                                    (a, am) =>
                                                      a +
                                                      Number(
                                                        am?.Blueprintnoofquestion
                                                      ),
                                                    0
                                                  )}
                                                </b>
                                              </td>

                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.AllChapter?.filter(
                                                    (item) =>
                                                      item?.BluePrintQuestiontype ==
                                                        "L.A 1" ||
                                                      item?.BluePrintQuestiontype ==
                                                        "L.A 2" ||
                                                      item?.BluePrintQuestiontype ==
                                                        "L.A 3"
                                                  )?.reduce(
                                                    (a, am) =>
                                                      a +
                                                      Number(
                                                        am?.BluePrintmarksperquestion *
                                                          am?.Blueprintnoofquestion
                                                      ),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {(
                                                    (val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 1" ||
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 2" ||
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 3"
                                                    )?.reduce(
                                                      (a, ele) =>
                                                        a +
                                                        Number(
                                                          ele?.Blueprintnoofquestion *
                                                            ele?.BluePrintmarksperquestion
                                                        ),
                                                      0
                                                    ) /
                                                      val?.AllChapter?.reduce(
                                                        (a, ele) =>
                                                          a +
                                                          Number(
                                                            ele?.BluePrintmarksperquestion *
                                                              ele?.Blueprintnoofquestion
                                                          ),
                                                        0
                                                      )) *
                                                    100
                                                  ).toFixed(2)}
                                                  %
                                                </b>
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{bluePrintHeader?.Total}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {" "}
                                              </td>

                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a + Number(i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a +
                                                      Number(i?.Mask * i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>100%</b>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </Table>
                                      </div>
                                    </div>
                                  </div>

                                  {/* table 4  */}
                                  <div className="weightage-objectives">
                                    <div className="main-title">
                                      <b>4.</b>
                                      <b>
                                        {bluePrintHeader?.AccordingRigorMrk}
                                      </b>
                                    </div>
                                    <div className="text-center">
                                      <div className="objectives-table">
                                        <Table
                                          responsive
                                          bordered
                                          hover
                                          size="md"
                                          style={{ border: "2px solid black",width:"40%"}}
                                        >
                                          <thead>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.SNo}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {
                                                  bluePrintHeader?.LevelOfDifficult
                                                }
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Questions}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Marks}
                                              </th>
                                              <th
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {bluePrintHeader?.Percentage}
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>1</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{bluePrintHeader?.Easy} </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b> {val?.Easy}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{val?.EasyMask}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{val?.EasyParcentage}%</b>
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b> 2</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {bluePrintHeader?.MediumQ}{" "}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b> {val?.Average}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{val?.AverageMask}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{val?.AverageParcentage}%</b>
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b> 3</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {bluePrintHeader?.Difficult}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{val?.Difficult}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{val?.DifficultMask}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.DifficultParcentage}%
                                                </b>
                                              </td>
                                            </tr>
                                            <tr
                                              style={{
                                                border: "2px solid black",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>{bluePrintHeader?.Total}</b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                {" "}
                                              </td>

                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a + Number(i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
                                                <b>
                                                  {val?.TypesofQuestions?.reduce(
                                                    (a, i) =>
                                                      a +
                                                      Number(i?.Mask * i?.NQA),
                                                    0
                                                  )}
                                                </b>
                                              </td>
                                              <td
                                                style={{
                                                  border: "2px solid black",
                                                }}
                                              >
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
                            </div>
                          </div>
                        </div>

                        {/* Seconed bluePrint */}
                        {/* <div id="pdf1" style={{ padding: "15px" }}>
                          <div style={{ fontFamily: "sans-serif" }}>
                            <div
                              className="blueprint2-container"
                              style={{ padding: "20px 8px" }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <div>
                                  <b>
                                    {bluePrintHeader?.Time} :{" "}
                                    {val?.DurationOfExam}
                                  </b>
                                </div>
                                <div>
                                  <b>{bluePrintHeader?.BluePrintName}</b>
                                </div>
                                <div>
                                  <b>
                                    {bluePrintHeader?.Marks} :-
                                    {val?.AllChapter?.reduce(
                                      (a, ele) =>
                                        a +
                                        Number(
                                          ele?.BluePrintmarksperquestion *
                                            ele?.Blueprintnoofquestion
                                        ),
                                      0
                                    )}
                                  </b>
                                </div>
                              </div>

                              <div>
                                <div className="text-center">
                                  <Table
                                    responsive
                                    bordered
                                    style={{
                                      border: "3px solid #000",
                                      width: "fit-content",
                                    }}
                                  >
                                    <thead>
                                      <tr style={{ border: "3px solid #000" }}>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.SNo}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            width: "125px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.TargetUnit}</b>
                                        </th>
                                        {val?.objectives?.map((ele) => {
                                          return (
                                            <>
                                              <th
                                                colSpan={6}
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {ele?.Objective}
                                              </th>
                                            </>
                                          );
                                        })}

                                        <th
                                          colSpan={6}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>
                                            {bluePrintHeader?.TotalQuestion}
                                          </b>
                                        </th>

                                        <th
                                          colSpan={1}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.TotalMarks}</b>
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr style={{ border: "2px solid #000" }}>
                                        <th
                                          style={{ border: "1px solid #000" }}
                                        ></th>
                                        <th
                                          style={{ border: "1px solid #000" }}
                                        ></th>

                                        <th
                                          style={{
                                            fontSize: "12px",
                                            width: "33px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.V}</b>
                                        </th>
                                        <th
                                          colSpan={2}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.K}</b>
                                        </th>
                                        <th
                                          colSpan={3}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.D}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            width: "33px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.V}</b>
                                        </th>
                                        <th
                                          colSpan={2}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.K}</b>
                                        </th>
                                        <th
                                          colSpan={3}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.D}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            width: "33px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.V}</b>
                                        </th>
                                        <th
                                          colSpan={2}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.K}</b>
                                        </th>
                                        <th
                                          colSpan={3}
                                          style={{ fontSize: "12px" }}
                                        >
                                          <b>{bluePrintHeader?.D}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            width: "33px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.V}</b>
                                        </th>
                                        <th
                                          colSpan={2}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.K}</b>
                                        </th>
                                        <th
                                          colSpan={3}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.D}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            width: "33px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.V}</b>
                                        </th>
                                        <th
                                          colSpan={2}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.K}</b>
                                        </th>
                                        <th
                                          colSpan={3}
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.D}</b>
                                        </th>
                                      </tr>
                                      <tr style={{ border: "2px solid #000" }}>
                                        <th></th>
                                        <th
                                          style={{
                                            width: "125px",
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        ></th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        ></th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.VSA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.SA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA1}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA2}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA3}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        ></th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.VSA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.SA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA1}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA2}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA3}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        ></th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.VSA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.SA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA1}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA2}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA3}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        ></th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b> {bluePrintHeader?.VSA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.SA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA1}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA2}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA3}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        ></th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.VSA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.SA}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA1}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA2}</b>
                                        </th>
                                        <th
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          <b>{bluePrintHeader?.LA3}</b>
                                        </th>
                                      </tr>
                                      {niqueDataName(val?.AllChapter)?.map(
                                        (ele, i) => {
                                          return (
                                            <tr
                                              style={{
                                                border: "2px solid #000",
                                              }}
                                            >
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                <b>{i + 1}</b>
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  fontWeight: "bold",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {ele?.name}
                                              </td>
                                              {val?.objectives?.map((ele1) => {
                                                return (
                                                  <>
                                                    <td
                                                      style={{
                                                        fontSize: "12px",
                                                        border:
                                                          "1px solid #000",
                                                      }}
                                                    >
                                                      <b>
                                                        {
                                                          val?.AllChapter?.find(
                                                            (item) =>
                                                              item?.Blueprintobjective ==
                                                                ele1?.Objective &&
                                                              item?.BluePrintQuestiontype ==
                                                                "O T" &&
                                                              item?.Blueprintchapter ==
                                                                ele?.name
                                                          )
                                                            ?.Blueprintnoofquestion
                                                        }
                                                      </b>
                                                      <b>
                                                        {val?.AllChapter?.some(
                                                          (item) =>
                                                            item?.Blueprintobjective ==
                                                              ele1?.Objective &&
                                                            item?.BluePrintQuestiontype ==
                                                              "O T" &&
                                                            item?.Blueprintchapter ==
                                                              ele?.name
                                                        )
                                                          ? `*(${
                                                              val?.AllChapter?.find(
                                                                (item) =>
                                                                  item?.Blueprintobjective ==
                                                                    ele1?.Objective &&
                                                                  item?.BluePrintQuestiontype ==
                                                                    "O T" &&
                                                                  item?.Blueprintchapter ==
                                                                    ele?.name
                                                              )
                                                                ?.BluePrintmarksperquestion
                                                            })`
                                                          : ""}
                                                      </b>
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontSize: "12px",
                                                        border:
                                                          "1px solid #000",
                                                      }}
                                                    >
                                                      <b>
                                                        {
                                                          val?.AllChapter?.find(
                                                            (item) =>
                                                              item?.Blueprintobjective ==
                                                                ele1?.Objective &&
                                                              item?.BluePrintQuestiontype ==
                                                                "V.S.A" &&
                                                              item?.Blueprintchapter ==
                                                                ele?.name
                                                          )
                                                            ?.Blueprintnoofquestion
                                                        }
                                                      </b>
                                                      <b>
                                                        {val?.AllChapter?.some(
                                                          (item) =>
                                                            item?.Blueprintobjective ==
                                                              ele1?.Objective &&
                                                            item?.BluePrintQuestiontype ==
                                                              "V.S.A" &&
                                                            item?.Blueprintchapter ==
                                                              ele?.name
                                                        )
                                                          ? `*(${
                                                              val?.AllChapter?.find(
                                                                (item) =>
                                                                  item?.Blueprintobjective ==
                                                                    ele1?.Objective &&
                                                                  item?.BluePrintQuestiontype ==
                                                                    "V.S.A" &&
                                                                  item?.Blueprintchapter ==
                                                                    ele?.name
                                                              )
                                                                ?.BluePrintmarksperquestion
                                                            })`
                                                          : ""}
                                                      </b>
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontSize: "12px",
                                                        border:
                                                          "1px solid #000",
                                                      }}
                                                    >
                                                      {
                                                        val?.AllChapter?.find(
                                                          (item) =>
                                                            item?.Blueprintobjective ==
                                                              ele1?.Objective &&
                                                            item?.BluePrintQuestiontype ==
                                                              "S.A" &&
                                                            item?.Blueprintchapter ==
                                                              ele?.name
                                                        )?.Blueprintnoofquestion
                                                      }
                                                      {val?.AllChapter?.some(
                                                        (item) =>
                                                          item?.Blueprintobjective ==
                                                            ele1?.Objective &&
                                                          item?.BluePrintQuestiontype ==
                                                            "S.A" &&
                                                          item?.Blueprintchapter ==
                                                            ele?.name
                                                      )
                                                        ? `*(${
                                                            val?.AllChapter?.find(
                                                              (item) =>
                                                                item?.Blueprintobjective ==
                                                                  ele1?.Objective &&
                                                                item?.BluePrintQuestiontype ==
                                                                  "S.A" &&
                                                                item?.Blueprintchapter ==
                                                                  ele?.name
                                                            )
                                                              ?.BluePrintmarksperquestion
                                                          })`
                                                        : ""}
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontSize: "12px",
                                                        border:
                                                          "1px solid #000",
                                                      }}
                                                    >
                                                      {
                                                        val?.AllChapter?.find(
                                                          (item) =>
                                                            item?.Blueprintobjective ==
                                                              ele1?.Objective &&
                                                            item?.BluePrintQuestiontype ==
                                                              "L.A 1" &&
                                                            item?.Blueprintchapter ==
                                                              ele?.name
                                                        )?.Blueprintnoofquestion
                                                      }
                                                      {val?.AllChapter?.some(
                                                        (item) =>
                                                          item?.Blueprintobjective ==
                                                            ele1?.Objective &&
                                                          item?.BluePrintQuestiontype ==
                                                            "L.A 1" &&
                                                          item?.Blueprintchapter ==
                                                            ele?.name
                                                      )
                                                        ? `*(${
                                                            val?.AllChapter?.find(
                                                              (item) =>
                                                                item?.Blueprintobjective ==
                                                                  ele1?.Objective &&
                                                                item?.BluePrintQuestiontype ==
                                                                  "L.A 1" &&
                                                                item?.Blueprintchapter ==
                                                                  ele?.name
                                                            )
                                                              ?.BluePrintmarksperquestion
                                                          })`
                                                        : ""}
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontSize: "12px",
                                                        border:
                                                          "1px solid #000",
                                                      }}
                                                    >
                                                      {
                                                        val?.AllChapter?.find(
                                                          (item) =>
                                                            item?.Blueprintobjective ==
                                                              ele1?.Objective &&
                                                            item?.BluePrintQuestiontype ==
                                                              "L.A 2" &&
                                                            item?.Blueprintchapter ==
                                                              ele?.name
                                                        )?.Blueprintnoofquestion
                                                      }
                                                      {val?.AllChapter?.some(
                                                        (item) =>
                                                          item?.Blueprintobjective ==
                                                            ele1?.Objective &&
                                                          item?.BluePrintQuestiontype ==
                                                            "L.A 2" &&
                                                          item?.Blueprintchapter ==
                                                            ele?.name
                                                      )
                                                        ? `*(${
                                                            val?.AllChapter?.find(
                                                              (item) =>
                                                                item?.Blueprintobjective ==
                                                                  ele1?.Objective &&
                                                                item?.BluePrintQuestiontype ==
                                                                  "L.A 2" &&
                                                                item?.Blueprintchapter ==
                                                                  ele?.name
                                                            )
                                                              ?.BluePrintmarksperquestion
                                                          })`
                                                        : ""}
                                                    </td>
                                                    <td
                                                      style={{
                                                        fontSize: "12px",
                                                        border:
                                                          "1px solid #000",
                                                      }}
                                                    >
                                                      {
                                                        val?.AllChapter?.find(
                                                          (item) =>
                                                            item?.Blueprintobjective ==
                                                              ele1?.Objective &&
                                                            item?.BluePrintQuestiontype ==
                                                              "L.A 3" &&
                                                            item?.Blueprintchapter ==
                                                              ele?.name
                                                        )?.Blueprintnoofquestion
                                                      }
                                                      {val?.AllChapter?.some(
                                                        (item) =>
                                                          item?.Blueprintobjective ==
                                                            ele1?.Objective &&
                                                          item?.BluePrintQuestiontype ==
                                                            "L.A 3" &&
                                                          item?.Blueprintchapter ==
                                                            ele?.name
                                                      )
                                                        ? `*(${
                                                            val?.AllChapter?.find(
                                                              (item) =>
                                                                item?.Blueprintobjective ==
                                                                  ele1?.Objective &&
                                                                item?.BluePrintQuestiontype ==
                                                                  "L.A 3" &&
                                                                item?.Blueprintchapter ==
                                                                  ele?.name
                                                            )
                                                              ?.BluePrintmarksperquestion
                                                          })`
                                                        : ""}
                                                    </td>
                                                  </>
                                                );
                                              })}

                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {
                                                  bluePrintTotalQues(
                                                    val?.AllChapter,
                                                    ele?.name,
                                                    "O T"
                                                  )?.TotalQ
                                                }
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {
                                                  bluePrintTotalQues(
                                                    val?.AllChapter,
                                                    ele?.name,
                                                    "V.S.A"
                                                  )?.TotalQ
                                                }
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {
                                                  bluePrintTotalQues(
                                                    val?.AllChapter,
                                                    ele?.name,
                                                    "S.A"
                                                  )?.TotalQ
                                                }
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {
                                                  bluePrintTotalQues(
                                                    val?.AllChapter,
                                                    ele?.name,
                                                    "L.A 1"
                                                  )?.TotalQ
                                                }
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {
                                                  bluePrintTotalQues(
                                                    val?.AllChapter,
                                                    ele?.name,
                                                    "L.A 2"
                                                  )?.TotalQ
                                                }
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {
                                                  bluePrintTotalQues(
                                                    val?.AllChapter,
                                                    ele?.name,
                                                    "L.A 3"
                                                  )?.TotalQ
                                                }
                                              </td>

                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {
                                                  QuestionNameWiseMask(
                                                    val?.AllChapter,
                                                    ele?.name
                                                  )?.totalMas
                                                }
                                              </td>
                                            </tr>
                                          );
                                        }
                                      )}
                                      <tr style={{ border: "2px solid #000" }}>
                                        <td
                                          style={{ border: "1px solid #000" }}
                                        ></td>
                                        <td
                                          style={{
                                            fontSize: "12px",
                                            width: "46px",
                                            fontWeight: "bold",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          {bluePrintHeader?.Total}
                                        </td>
                                        {val?.objectives?.map((ele) => {
                                          return (
                                            <>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {val?.AllChapter?.some(
                                                  (item) =>
                                                    item?.Blueprintobjective ==
                                                      ele?.Objective &&
                                                    item?.BluePrintQuestiontype ==
                                                      "O T"
                                                ) ? (
                                                  <span>
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "O T"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}{" "}
                                                    (
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "O T"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.BluePrintmarksperquestion *
                                                            am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                    )
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {val?.AllChapter?.some(
                                                  (item) =>
                                                    item?.Blueprintobjective ==
                                                      ele?.Objective &&
                                                    item?.BluePrintQuestiontype ==
                                                      "V.S.A"
                                                ) ? (
                                                  <span>
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "V.S.A"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}{" "}
                                                    (
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "V.S.A"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.BluePrintmarksperquestion *
                                                            am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                    )
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {val?.AllChapter?.some(
                                                  (item) =>
                                                    item?.Blueprintobjective ==
                                                      ele?.Objective &&
                                                    item?.BluePrintQuestiontype ==
                                                      "S.A"
                                                ) ? (
                                                  <span>
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "S.A"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}{" "}
                                                    (
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "S.A"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.BluePrintmarksperquestion *
                                                            am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                    )
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {val?.AllChapter?.some(
                                                  (item) =>
                                                    item?.Blueprintobjective ==
                                                      ele?.Objective &&
                                                    item?.BluePrintQuestiontype ==
                                                      "L.A 1"
                                                ) ? (
                                                  <span>
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 1"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}{" "}
                                                    (
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 1"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.BluePrintmarksperquestion *
                                                            am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                    )
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {val?.AllChapter?.some(
                                                  (item) =>
                                                    item?.Blueprintobjective ==
                                                      ele?.Objective &&
                                                    item?.BluePrintQuestiontype ==
                                                      "L.A 2"
                                                ) ? (
                                                  <span>
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 2"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}{" "}
                                                    (
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 2"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.BluePrintmarksperquestion *
                                                            am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                    )
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                              <td
                                                style={{
                                                  fontSize: "12px",
                                                  border: "1px solid #000",
                                                }}
                                              >
                                                {val?.AllChapter?.some(
                                                  (item) =>
                                                    item?.Blueprintobjective ==
                                                      ele?.Objective &&
                                                    item?.BluePrintQuestiontype ==
                                                      "L.A 3"
                                                ) ? (
                                                  <span>
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 3"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}{" "}
                                                    (
                                                    {val?.AllChapter?.filter(
                                                      (item) =>
                                                        item?.Blueprintobjective ==
                                                          ele?.Objective &&
                                                        item?.BluePrintQuestiontype ==
                                                          "L.A 3"
                                                    )?.reduce(
                                                      (a, am) =>
                                                        a +
                                                        Number(
                                                          am?.BluePrintmarksperquestion *
                                                            am?.Blueprintnoofquestion
                                                        ),
                                                      0
                                                    )}
                                                    )
                                                  </span>
                                                ) : (
                                                  ""
                                                )}
                                              </td>
                                            </>
                                          );
                                        })}

                                        <td
                                          style={{ border: "1px solid #000" }}
                                        ></td>
                                        <td
                                          style={{ border: "1px solid #000" }}
                                        ></td>
                                        <td
                                          style={{ border: "1px solid #000" }}
                                        ></td>
                                        <td
                                          style={{ border: "1px solid #000" }}
                                        ></td>
                                        <td
                                          style={{ border: "1px solid #000" }}
                                        ></td>
                                        <td
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          {val?.AllChapter?.reduce(
                                            (a, ele) =>
                                              a +
                                              Number(
                                                ele?.Blueprintnoofquestion
                                              ),
                                            0
                                          )}
                                        </td>
                                        <td
                                          style={{
                                            fontSize: "12px",
                                            border: "1px solid #000",
                                          }}
                                        >
                                          {val?.AllChapter?.reduce(
                                            (a, ele) =>
                                              a +
                                              Number(
                                                ele?.BluePrintmarksperquestion *
                                                  ele?.Blueprintnoofquestion
                                              ),
                                            0
                                          )}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                </div>
                              </div>
                              <span>{bluePrintHeader?.Note}:-</span>
                              {parse(`<span>${val?.Instructions}</span>`)}
                            </div>
                          </div>
                        </div> */}
<div id="pdf1" style={{ padding: "10px", fontFamily: "sans-serif", fontSize: "10px" }}>
  <div className="blueprint2-container" style={{ padding: "10px" }}>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
      <div><b>{bluePrintHeader?.Time} : {val?.DurationOfExam}</b></div>
      <div><b>{bluePrintHeader?.BluePrintName}</b></div>
      <div>
        <b>
          {bluePrintHeader?.Marks} :-
          {val?.AllChapter?.reduce(
            (a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
            0
          )}
        </b>
      </div>
    </div>

    <div style={{ overflowX: "auto" }}>
      <Table responsive bordered style={{
        border: "1px solid #000",
        width: "100%",
        tableLayout: "fixed",
        fontSize: "9px"
      }}>
        <thead>
          <tr style={{ border: "1px solid #000" }}>
            <th style={{ width: "4%", border: "1px solid #000" }}>
              <b>{bluePrintHeader?.SNo}</b>
            </th>
            <th style={{ width: "15%", border: "1px solid #000" }}>
              <b>{bluePrintHeader?.TargetUnit}</b>
            </th>
            {val?.objectives?.map((ele) => (
              <th colSpan={6} style={{ border: "1px solid #000" }}>
                {ele?.Objective}
              </th>
            ))}
            <th colSpan={6} style={{ border: "1px solid #000" }}>
              <b>{bluePrintHeader?.TotalQuestion}</b>
            </th>
            <th colSpan={1} style={{ border: "1px solid #000" }}>
              <b>{bluePrintHeader?.TotalMarks}</b>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ border: "1px solid #000" }}>
            <td style={{ border: "1px solid #000" }}></td>
            <td style={{ border: "1px solid #000" }}></td>
            {val?.objectives?.map(() => (
              <>
                <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.V}</b></td>
                <td colSpan={2} style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.K}</b></td>
                <td colSpan={3} style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.D}</b></td>
              </>
            ))}
            <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.V}</b></td>
            <td colSpan={2} style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.K}</b></td>
            <td colSpan={3} style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.D}</b></td>
          </tr>
          
          <tr style={{ border: "1px solid #000" }}>
            <td></td>
            <td style={{ border: "1px solid #000" }}></td>
            {val?.objectives?.map(() => (
              <>
                <td style={{ border: "1px solid #000" }}></td>
                <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.VSA}</b></td>
                <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.SA}</b></td>
                <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.LA1}</b></td>
                <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.LA2}</b></td>
                <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.LA3}</b></td>
              </>
            ))}
            <td style={{ border: "1px solid #000" }}></td>
            <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.VSA}</b></td>
            <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.SA}</b></td>
            <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.LA1}</b></td>
            <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.LA2}</b></td>
            <td style={{ border: "1px solid #000" }}><b>{bluePrintHeader?.LA3}</b></td>
            <td style={{ border: "1px solid #000" }}></td>
          </tr>
          
          {niqueDataName(val?.AllChapter)?.map((ele, i) => (
            <tr style={{ border: "1px solid #000" }}>
              <td style={{ border: "1px solid #000" }}><b>{i + 1}</b></td>
              <td style={{ border: "1px solid #000", fontWeight: "bold" }}>
                {ele?.name}
              </td>
              {val?.objectives?.map((ele1) => (
                <>
                  <td style={{ border: "1px solid #000" }}>
                    <b>
                      {val?.AllChapter?.find(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                               item?.BluePrintQuestiontype === "O T" &&
                               item?.Blueprintchapter === ele?.name
                      )?.Blueprintnoofquestion}
                    </b>
                    <b>
                      {val?.AllChapter?.some(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                                item?.BluePrintQuestiontype === "O T" &&
                                item?.Blueprintchapter === ele?.name
                      ) ? `*(${
                        val?.AllChapter?.find(
                          item => item?.Blueprintobjective === ele1?.Objective &&
                                  item?.BluePrintQuestiontype === "O T" &&
                                  item?.Blueprintchapter === ele?.name
                        )?.BluePrintmarksperquestion
                      })` : ""}
                    </b>
                  </td>
                  <td style={{ border: "1px solid #000" }}>
                    <b>
                      {val?.AllChapter?.find(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                                item?.BluePrintQuestiontype === "V.S.A" &&
                                item?.Blueprintchapter === ele?.name
                      )?.Blueprintnoofquestion}
                    </b>
                    <b>
                      {val?.AllChapter?.some(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                                item?.BluePrintQuestiontype === "V.S.A" &&
                                item?.Blueprintchapter === ele?.name
                      ) ? `*(${
                        val?.AllChapter?.find(
                          item => item?.Blueprintobjective === ele1?.Objective &&
                                  item?.BluePrintQuestiontype === "V.S.A" &&
                                  item?.Blueprintchapter === ele?.name
                        )?.BluePrintmarksperquestion
                      })` : ""}
                    </b>
                  </td>
                  <td style={{ border: "1px solid #000" }}>
                    {val?.AllChapter?.find(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "S.A" &&
                              item?.Blueprintchapter === ele?.name
                    )?.Blueprintnoofquestion}
                    {val?.AllChapter?.some(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "S.A" &&
                              item?.Blueprintchapter === ele?.name
                    ) ? `*(${
                      val?.AllChapter?.find(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                                item?.BluePrintQuestiontype === "S.A" &&
                                item?.Blueprintchapter === ele?.name
                      )?.BluePrintmarksperquestion
                    })` : ""}
                  </td>
                  <td style={{ border: "1px solid #000" }}>
                    {val?.AllChapter?.find(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "L.A 1" &&
                              item?.Blueprintchapter === ele?.name
                    )?.Blueprintnoofquestion}
                    {val?.AllChapter?.some(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "L.A 1" &&
                              item?.Blueprintchapter === ele?.name
                    ) ? `*(${
                      val?.AllChapter?.find(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 1" &&
                                item?.Blueprintchapter === ele?.name
                      )?.BluePrintmarksperquestion
                    })` : ""}
                  </td>
                  <td style={{ border: "1px solid #000" }}>
                    {val?.AllChapter?.find(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "L.A 2" &&
                              item?.Blueprintchapter === ele?.name
                    )?.Blueprintnoofquestion}
                    {val?.AllChapter?.some(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "L.A 2" &&
                              item?.Blueprintchapter === ele?.name
                    ) ? `*(${
                      val?.AllChapter?.find(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 2" &&
                                item?.Blueprintchapter === ele?.name
                      )?.BluePrintmarksperquestion
                    })` : ""}
                  </td>
                  <td style={{ border: "1px solid #000" }}>
                    {val?.AllChapter?.find(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "L.A 3" &&
                              item?.Blueprintchapter === ele?.name
                    )?.Blueprintnoofquestion}
                    {val?.AllChapter?.some(
                      item => item?.Blueprintobjective === ele1?.Objective &&
                              item?.BluePrintQuestiontype === "L.A 3" &&
                              item?.Blueprintchapter === ele?.name
                    ) ? `*(${
                      val?.AllChapter?.find(
                        item => item?.Blueprintobjective === ele1?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 3" &&
                                item?.Blueprintchapter === ele?.name
                      )?.BluePrintmarksperquestion
                    })` : ""}
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
                    item => item?.Blueprintobjective === ele?.Objective &&
                            item?.BluePrintQuestiontype === "O T"
                  ) ? (
                    <span>
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "O T"
                      )?.reduce(
                        (a, am) => a + Number(am?.Blueprintnoofquestion),
                        0
                      )}{" "}
                      (
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "O T"
                      )?.reduce(
                        (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                        0
                      )}
                      )
                    </span>
                  ) : ""}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {val?.AllChapter?.some(
                    item => item?.Blueprintobjective === ele?.Objective &&
                            item?.BluePrintQuestiontype === "V.S.A"
                  ) ? (
                    <span>
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "V.S.A"
                      )?.reduce(
                        (a, am) => a + Number(am?.Blueprintnoofquestion),
                        0
                      )}{" "}
                      (
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "V.S.A"
                      )?.reduce(
                        (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                        0
                      )}
                      )
                    </span>
                  ) : ""}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {val?.AllChapter?.some(
                    item => item?.Blueprintobjective === ele?.Objective &&
                            item?.BluePrintQuestiontype === "S.A"
                  ) ? (
                    <span>
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "S.A"
                      )?.reduce(
                        (a, am) => a + Number(am?.Blueprintnoofquestion),
                        0
                      )}{" "}
                      (
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "S.A"
                      )?.reduce(
                        (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                        0
                      )}
                      )
                    </span>
                  ) : ""}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {val?.AllChapter?.some(
                    item => item?.Blueprintobjective === ele?.Objective &&
                            item?.BluePrintQuestiontype === "L.A 1"
                  ) ? (
                    <span>
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 1"
                      )?.reduce(
                        (a, am) => a + Number(am?.Blueprintnoofquestion),
                        0
                      )}{" "}
                      (
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 1"
                      )?.reduce(
                        (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                        0
                      )}
                      )
                    </span>
                  ) : ""}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {val?.AllChapter?.some(
                    item => item?.Blueprintobjective === ele?.Objective &&
                            item?.BluePrintQuestiontype === "L.A 2"
                  ) ? (
                    <span>
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 2"
                      )?.reduce(
                        (a, am) => a + Number(am?.Blueprintnoofquestion),
                        0
                      )}{" "}
                      (
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 2"
                      )?.reduce(
                        (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                        0
                      )}
                      )
                    </span>
                  ) : ""}
                </td>
                <td style={{ border: "1px solid #000" }}>
                  {val?.AllChapter?.some(
                    item => item?.Blueprintobjective === ele?.Objective &&
                            item?.BluePrintQuestiontype === "L.A 3"
                  ) ? (
                    <span>
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 3"
                      )?.reduce(
                        (a, am) => a + Number(am?.Blueprintnoofquestion),
                        0
                      )}{" "}
                      (
                      {val?.AllChapter?.filter(
                        item => item?.Blueprintobjective === ele?.Objective &&
                                item?.BluePrintQuestiontype === "L.A 3"
                      )?.reduce(
                        (a, am) => a + Number(am?.BluePrintmarksperquestion * am?.Blueprintnoofquestion),
                        0
                      )}
                      )
                    </span>
                  ) : ""}
                </td>
              </>
            ))}
            <td style={{ border: "1px solid #000" }}></td>
            <td style={{ border: "1px solid #000" }}></td>
            <td style={{ border: "1px solid #000" }}></td>
            <td style={{ border: "1px solid #000" }}></td>
            <td style={{ border: "1px solid #000" }}></td>
            <td style={{ border: "1px solid #000" }}>
              {val?.AllChapter?.reduce(
                (a, ele) => a + Number(ele?.Blueprintnoofquestion),
                0
              )}
            </td>
            <td style={{ border: "1px solid #000" }}>
              {val?.AllChapter?.reduce(
                (a, ele) => a + Number(ele?.BluePrintmarksperquestion * ele?.Blueprintnoofquestion),
                0
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }}
                        >
                          <Button
                            variant=""
                            style={{ backgroundColor: "green", color: "white" }}
                            onClick={() => {
                              upcomingStaus("Saved Draft", val);
                            }}
                          >
                            Save Draft
                          </Button>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            padding: "10px",
                          }} 
                        > 
                          <Button
                            variant=""
                            style={{ backgroundColor: "green", color: "white" }}
                            onClick={() => {
                              upcomingStaus("Completed", val);
                            }}
                          >
                            Generate Question Paper
                          </Button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BluePrint;

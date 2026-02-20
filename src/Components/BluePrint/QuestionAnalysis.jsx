import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { CiSaveDown2 } from "react-icons/ci";
import { LuPrinter } from "react-icons/lu";
import { IoMdShare } from "react-icons/io";
import { Button, Form, Row } from "react-bootstrap";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdOutlineEmail } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import parse from "html-react-parser";
import Frontpage from "../fontpage/Frontpage";
import axios from "axios";
import swal from "sweetalert";

function QuestionAnalysis() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  const { state } = useLocation();

  // const location = useLocation();
  // const { item } = location.state;

  console.log("state", state);
  const [Questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  
  let count2 = 1;
  const handlePrint = () => {
    const printableContent =
      document.getElementById("printable-content").innerHTML;
    const originalContent = document.body.innerHTML;
    // Create a footer element with padding
    const footerContent = '<div style="padding-bottom: 50px;"></div>';
    // Replace the content of the body with the content of the printable section
    document.body.innerHTML = printableContent;
    // Print the content
    window.print();
    // Restore the original content
    document.body.innerHTML = originalContent;
    navigate("/answersheet", { state: { ...state, Questions } });
    setTimeout(() => {
      return window.location.reload();
    }, 2000);
  };

  const getgenratedData = async () => {
    try {
      setLoadingMessage("Loading question analysis...");
      const config = {
        url: "/teacher/getGenQuestionById/" + state?._id + "/" + user?._id,
        baseURL: "http://localhost:8774/api",
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        setQuestions(res.data.success?.Questions);
        setLoadingMessage("Question analysis loaded successfully!");
      }
    } catch (error) {
      console.log(error);
      setLoadingMessage("Error loading data: " + error.message);
      return swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "Ok!",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (token && state) {
        await getgenratedData();
      }
      // Set loading to false after data is fetched (with 3 second delay for smooth UX)
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };
    fetchData();
  }, [token, state]);

  const navigate = useNavigate();

  function check(am) {
    if (
      // am == "Objective Questions" ||
      am == "One Word Question" ||
      am == "Multiple Choice Questions" ||
      am == "Fill in the Blanks Questions" ||
      am == "Classifications of Questions" ||
      am == "Match the Following Questions" ||
      am == "Recorrect the Answers Questions" ||
      am == "Odd and out words Questions" ||
      am == "RelationShip Words Questions" ||
      am == "Grammer Questions" ||
      am == "One Sentence Answer Question"
    ) {
      return GetquestAnalysisHeader?.OT;
    }
    if (
      am == "Two  Sentence Answer Questions" ||
      am == "Situation UnderStatnding answer Questions" ||
      am == "Complete the Poem" ||
      am == "Poet,Time, Place, Writer answer questions" ||
      am == "Two and three Sentence Answer Questions"
    ) {
      return GetquestAnalysisHeader?.SA;
    }
    if (
      am == "Three and Four Sentence Answer Questions" ||
      am == "Five and Six Sentence Answer Questions" ||
      am == "Six Sentence Answer Questions" ||
      am == "Seven Sentence Answer Questions" ||
      am == "Eight Sentence Answer Questions" ||
      am == "Ten Sentence Answer Questions" ||
      am == "Expanding and Explanations Answer Questions" ||
      am == "Answer the Questions and Draw the Figure Questions" ||
      am == "Graph Questions" ||
      am == "Letter Writting" ||
      am == "Map Reading"
    ) {
      return GetquestAnalysisHeader?.VSA;
    }
  }

  const obj = {};

  //&& ele?.Marks==(ele2?.NQA*ele2?.Mask)/ele2?.NQA
  console.log("Questions", Questions);

  const [GetquestAnalysisHeader, setGetquestAnalysisHeader] = useState([]);
  const getquestAnalysisHeader = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getQuestAnalysisheaderbymedium/" +
          state?.Medium
      );
      if (res.status == 200) {
        setGetquestAnalysisHeader(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("GetquestAnalysisHeader", GetquestAnalysisHeader);

  useEffect(() => {
    getquestAnalysisHeader();
  }, []);

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
          ಪ್ರಶ್ನೆ ವಿಶ್ಲೇಷಣೆ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...
        </h2>
        <p style={{ 
          fontSize: '18px', 
          opacity: 0.9,
          marginBottom: '10px'
        }}>
          Question Analysis is getting ready...
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
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9"></div>
        <div className="col-md-3 d-flex justify-content-end">
          <LuPrinter
            style={{ width: "22px", height: "40px" }}
            onClick={handlePrint}
          />
        </div>
      </div>
      <div>
        <Container
          className="mt-4"
          style={{ border: "3px solid black", borderRadius: "15px" }}
          id="printable-content"
        >
          <div className="mt-4">
            <h6>
              {" "}
              {state?.Institute_Name ? (
                <h6>
                  <b>
                    {state?.Institute_Name},{state?.SchoolAddress}
                  </b>
                </h6>
              ) : (
                <></>
              )}
            </h6>
            <h6 className="text-center">
              <b>{state?.bluePrint?.blName}</b>
            </h6>
            <h6 className="text-center">
              <b>
                {state?.Sub_Class} {state?.Subject}
              </b>
            </h6>
            {/* <h3 className="text-center"> ಪ್ರಥಮ ಭಾಷೆ ಕನ್ನಡ ಒಂದನೆಯ ಸಂಕಲನಾತ್ಮಕ ,ಮೌಲ್ಯಮಾಪನ </h3> */}

            <h6>
              <b>{GetquestAnalysisHeader?.QuestHeader}</b>
            </h6>
          </div>
          <div className="text-center">
            <Table
              bordered
              responsive
              style={{ fontFamily: "math", border: "1px solid" }}
            >
              <thead>
                <tr>
                  <th>{GetquestAnalysisHeader?.slno}</th>
                  <th>{GetquestAnalysisHeader?.ObjectType}</th>
                  <th>{GetquestAnalysisHeader?.Chapter}</th>
                  <th>{GetquestAnalysisHeader?.Lesson}</th>
                  <th>{GetquestAnalysisHeader?.QuestionType}</th>
                  <th>{GetquestAnalysisHeader?.OtSaLsa}</th>
                  <th>{GetquestAnalysisHeader?.Marks}</th>
                  <th>{GetquestAnalysisHeader?.Difficultlevel}</th>
                  <th>{GetquestAnalysisHeader?.Time}</th>
                </tr>
              </thead>
              <tbody>
                {state?.bluePrint?.TypesofQuestions?.map((ele2) => {
                  return (
                    <>
                      {(() => {
                        const filteredQuestions = Questions?.filter(
                          (ele) => ele.Types_Question === ele2?.QAType
                        );
                        const requiredQuestions = Number(ele2?.NQA);
                        const addedQuestions = filteredQuestions?.length || 0;

                        return filteredQuestions?.map((item, i) => {
                          if (i < requiredQuestions) {
                            return (
                              <tr key={i}>
                                <td>{count2++}</td>
                                <td>{item?.Objectives}</td>
                                <td>{item?.Chapter_Name}</td>
                                <td>{item?.Lesson}</td>
                                <td>
                                  {item?.Types_QuestionTranslate}
                                  {/* <div>
                                    <small>Required: {requiredQuestions}</small>
                                    <br />
                            <small>Added: {addedQuestions}</small>
                            </div>*/}
                                </td>
                                <td>{check(ele2?.QAType)}</td>
                                <td>{(ele2?.NQA * ele2?.Mask) / ele2?.NQA}</td>
                                <td>{item?.Difficulty_level}</td>
                                <td>{item?.Answer_Time}</td>
                              </tr>
                            );
                          }
                          return null;
                        });
                      })()}
                    </>
                  );
                })}
              </tbody>
            </Table>
          </div>

          <div className="d-flex mt-2">
            <b>
              Note<span style={{ color: "red" }}>*</span>
            </b>
            <p>{GetquestAnalysisHeader?.Note}</p>
          </div>
        </Container>
      </div>

      <div className="d-flex justify-content-center mt-2 ">
        <Button
          className="md-2"
          onClick={() =>
            navigate("/answersheet", { state: { ...state, Questions } })
          }
        >
          View Anshwer Sheet
        </Button>
        <br />
      </div>
    </div>
  );
}

export default QuestionAnalysis;

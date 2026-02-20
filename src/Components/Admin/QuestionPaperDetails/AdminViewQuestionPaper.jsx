import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import useReactToPdf from "react-to-pdf";
import { CiSaveDown2 } from "react-icons/ci";
import { IoMdShare } from "react-icons/io";
import { IoLogoWhatsapp } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { LuPrinter } from "react-icons/lu";
import parse from "html-react-parser";
import { Button, Row, Table } from "react-bootstrap";
import AdminQuestionFrontPage from "../../Admin/QuestionPaperDetails/AdminQuestionFrontPage";
import AdminQuestionAnalysis from "./AdminQuestionAnalysis";
import AdminNoLineQuestionPaper from "./AdminNolineQuestionPaper";
function AdminViewQuestionPaper({state2}) {   
  // const admin = JSON.parse(localStorage.getItem("admin"));
  const adminFromSession = JSON.parse(localStorage.getItem("admin"));
  const userFromSession = JSON.parse(localStorage.getItem("user"));

  let admin;
  if (adminFromSession) {
    admin = adminFromSession;
  } else if (userFromSession) {
    admin = userFromSession;
  }

  const token = localStorage.getItem("token");
  const state1=useLocation();
  const  state =state2||state1?.state?.item||{}

  const [Questions, setQuestions] = useState([]);
  const getAllQuestions = async () => {
    try {
      const config = {
        url: "/admin/getQuestionByClasswise/" + admin?._id||1234,
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          Board: state.Board,
          Medium: state.Medium,
          Class: state.Class,
          Sub_Class: state.Sub_Class,
          Subject: state.Subject,
          ExamName: state?.Exam_Name,
          AllChapter: state?.bluePrint?.AllChapter,
          QusetionType: state?.bluePrint?.TypesofQuestions,
          Weightageofthecontent: state?.bluePrint?.Weightageofthecontent,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        setQuestions(res.data.success);
      }
    } catch (error) {
      console.log(error);
      return swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        button: "Ok!",
      });
    }
  };

  const navigate = useNavigate();

  const [show, setShow] = useState("");

   
   
   const createPDF = async () => {
  const pdf = new jsPDF("portrait", "pt", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const canvas = await html2canvas(document.querySelector("#pdf"), {
    useCORS: true,
    scale: 2, // for higher resolution
  });

  const imgData = canvas.toDataURL("image/png");
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pdfWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("Question_Paper.pdf");
};

  useEffect(() => {
    if (state._id ) {
      if (state?.Questions?.length == 0) {
        getAllQuestions();
      } else {
        setQuestions(state?.Questions);
      }
    }
  }, [state, token]);



  let count = 1;
  let count2 = 1;
  let count3 = 1;
  const SectionArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const RomanAA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X","XI","XII","XIII","XIV","XV","XVI"];

  const lines = [
    <div className="col-md-12 ">
      <div className="do-sear mt-1">
        <p type="text" className="lined-input"></p>
      </div>
    </div>,
  ];
  const updaethequestion = async (am) => {
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
          Questions: Questions,
        },
      };

      let res = await axios(config);
      if (res.status === 200) {
        setTimeout(() => {
          navigate("/adminquestionanalysis", { state: state });
        }, 1000);
        if (am === true) {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }

        return swal({
          title: "Yeah!",
          text: "Successfully ",
          icon: "success",
          button: "OK!",
        });
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
  const handlePrint = () => {
    const printableContent =
      document.getElementById("printable-content").innerHTML;
    const originalContent = document.body.innerHTML;

   
    const footerContainer = document.createElement("div");
    footerContainer.style.position = "fixed";
    footerContainer.style.bottom = "0mm"; // Adjust margin from bottom as needed
    footerContainer.style.width = "100%";
    // footerContainer.innerHTML = footerContent;

    // Replace the content of the body with the content of the printable section including footer and spacer
    document.body.innerHTML = printableContent;
    document.body.appendChild(footerContainer);

    // Print the content
    window.print();

    // Listen for 'afterprint' event to restore original content after printing
    window.addEventListener("afterprint", () => {
      document.body.innerHTML = originalContent;
    });
    updaethequestion(true);
  };

  const [QuestionHeader, setQuestionHeader] = useState([]);
  const getQuestionHeaderbyMedium = async () => { 
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/questiontheadergetbymedium/" +
          state?.Medium +
          "/" +
         (admin?._id||"12345"),
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

  const componentRef = useRef();
  const options = {
    orientation: "portrait",
    unit: "in",
    format: [8, 12],
    onDocument: () => ({
      content: [
        { text: "Page " },
        { text: "pageNumber", alignment: "center", margin: [0, 0, 0, 20] }, 
        // { text: "P.T.O", alignment: "left" }, 
      ],
    }),
  };

  const savePdf = useReactToPdf(options);

  const handlePrint2 = () => {
    savePdf(componentRef.current);
  };
  return (
    <div>
      {/* <div className="top-header">
        <div className="top-nav-display">
          <CiSaveDown2
            style={{ width: "22px", height: "40px" }}
            onClick={createPDF}
          />
        
          <IoMdShare
            style={{ width: "22px", height: "40px" }}
            onClick={() => {
              setShow(true);
            }}
          />
        </div>
        {show ? (
          <>
            <div className="share-button">
              <div>
                <a href={"https://www.whatsapp.com/"}>
                  <IoLogoWhatsapp style={{ width: "25px", height: "35px" }} />
                </a>
              </div>
              <di>
                <a href={"https://www.gmail.com/"}>
                  <MdOutlineEmail style={{ width: "25px", height: "35px" }} />
                </a>
              </di>
            </div>
          </>
        ) : (
          <></>
        )}
      </div> */}

      <div id=" ">
        <div className="" id = "details-display-id">
          {/* <div className="d-flex justify-content-around">
            <div className="mt-2">
              <Button onClick={() => navigate(-1)}>Back</Button>
            </div>
            <div className="d-flex gap-3" id ="details-display-id3">
              <LuPrinter
                style={{ width: "22px", height: "40px", cursor: "pointer" }}
                onClick={() => handlePrint("printable-content")}
              />
              {adminFromSession && (
                <Button className="mt-2" onClick={() => getAllQuestions()}>
                  Regenrate
                </Button>
              )}
            </div>
          </div> */}

          <div
          
          
          >
            <AdminQuestionFrontPage data={state} />
            <div className="question-paper-display " id ="details-display-id2" style={{border:"none"}}>
              <div className="second-page-body a4-page">
                {state?.bluePrint?.TypesofQuestions?.map((ele1, a) => {
                  return (
                    <>
                      {/* <h3 style={{ textAlign: "center" }}>Section {SectionArr[a]}</h3> */}

                      <div className="question-body-main">
                        <div>
                          <div style={{ display: "flex", gap: "12px" }}>
                            <b> {RomanAA[a++]}.</b>

                            <b style={{ textAlign: "left" }}>
                              {ele1?.QAInstruction}
                            </b>
                          </div>
                        </div>
                        <div style={{ display: "flex", marginTop: "10px" }}>
                          <b>
                            {ele1?.NQA}x{ele1?.Mask}={ele1?.NQA * ele1?.Mask}
                          </b>
                        </div>
                      </div>

                      {Questions?.filter(
                        (ele) => ele?.Types_Question === ele1?.QAType
                      )?.map((item, i) => {
                        if (i < Number(ele1?.NQA)) {
                          return (
                            <>
                              <div className="question-body">
                                {item?.Types_Question ===
                                "Multiple Choice Questions" ? (
                                  <div>
                                    <div
                                      style={{ display: "flex", gap: "12px" }}
                                      key={i}
                                    >
                                      <b>{count++}.</b>
                                      <b>
                                        {" "}
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
                                    </div>
                                    {item?.Image ? (
                                      <div>
                                        <img
                                          src={`${item?.Image}`}
                                          className="mcq-img"
                                          alt=""
                                        />
                                      </div>
                                    ) : (
                                      <></>
                                    )}

                                    <Row>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_1 ? (
                                          <>
                                            {" "}
                                            a) &nbsp;
                                            {item?.Option_1
                                              ? parse(item?.Option_1)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_2 ? (
                                          <>
                                            b) &nbsp;
                                            {item?.Option_2
                                              ? parse(item?.Option_2)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </Row>

                                    <Row>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_3 ? (
                                          <>
                                          
                                            c) &nbsp;
                                            {item?.Option_3
                                              ? parse(item?.Option_3)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_4 ? (
                                          <>
                                            {" "}
                                            d) &nbsp;
                                            {item?.Option_4
                                              ? parse(item?.Option_4)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </Row>

                                    <Row>
                                      <div className="ans-section">
                                        <div className="ans">{QuestionHeader?.ans}: </div>
                                        <div className="ans-box"></div>
                                        <div className="ans-line"></div>
                                      </div>
                                    </Row>
                                  </div>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Fill in the Blanks Questions" ? (
                                  <>
                                    {item?.NumberOfLine === "2" ? (
                                      <>
                                        <div className="d-flex">
                                          <b>{count++}.</b>
                                          <p>
                                            {" "}
                                            {parse(
                                              `<div>${item?.input1}</div>`
                                            )}
                                          </p>
                                          <div className="ques-line"></div>
                                          <p>
                                            {" "}
                                            {parse(
                                              `<div>${item?.input2}</div>`
                                            )}
                                          </p>
                                          <div className="ques-line"></div>
                                          <p>
                                            {" "}
                                            {parse(
                                              `<div>${item?.input3}</div>`
                                            )}
                                          </p>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.NumberOfLine === "1" ? (
                                      <>
                                        <div className="d-flex">
                                          <b>{count++}.</b>
                                          <p>
                                            {" "}
                                            {parse(
                                              `<div>${item?.input1}</div>`
                                            )}
                                          </p>
                                          <div className="ques-line"></div>
                                          {item?.input2 ? (
                                            <>
                                              <p>
                                                {" "}
                                                {parse(
                                                  `<div>${item?.input2}</div>`
                                                )}
                                              </p>
                                            </>
                                          ) : (
                                            <></>
                                          )}

                                          <p>
                                            {" "}
                                            {parse(
                                              `<div>${item?.input3}</div>`
                                            )}
                                          </p>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}

                                {item?.Types_Question ===
                                "Recorrect the Answers Questions" ? (
                                  <>
                                    <div>
                                      <div className="d-flex">
                                        <b>{count++}.</b>{" "}
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </div>
                                      <div>
                                        {item?.NumberOfLine && (
                                          <>
                                            {Array.from(
                                              { length: item?.NumberOfLine },
                                              (_, index) => (
                                                <React.Fragment key={index}>
                                                  {lines.map((line, idx) => (
                                                    <React.Fragment key={idx}>
                                                      {line}
                                                    </React.Fragment>
                                                  ))}
                                                </React.Fragment>
                                              )
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}

                                {/* {item?.Types_Question ===
                                "RelationShip Words Questions" ? (
                                  <>
                                    <div className="row">
                                      <div className="col-md-3">
                                        <div className="do-sear mt-2 d-flex">
                                          <b>{count++}.</b>
                                          <p>{item?.RealetionA}</p>
                                          <p>:</p>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="do-sear mt-2 d-flex">
                                          <p>{item?.RealetionB}</p>
                                          <p>::</p>
                                        </div>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="do-sear mt-2 d-flex">
                                          <p>{item?.RealetionC}</p>
                                          <p>:</p>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="do-sear mt-2">
                                          <p
                                            className=""
                                            style={{
                                              borderBottom: "1px solid",
                                              marginTop: "45px",
                                              marginBottom: "0px",
                                            }}
                                          ></p>
                                        </div>
                                      </div>
                                    </div>

                                    <div>
                                      <div className="row">
                                        <div className="col-md-3">
                                          <div className="do-sear mt-2 d-flex">
                                            <label htmlFor=""> i)</label>
                                            <p>{item?.Option_1}</p>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="do-sear mt-2 d-flex">
                                            <label htmlFor=""> ii)</label>
                                            <p>{item?.Option_2}</p>
                                          </div>
                                        </div>

                                        <div className="col-md-3">
                                          <div className="do-sear mt-2 d-flex">
                                            <label htmlFor="">iii)</label>
                                            <p>{item?.Option_3}</p>
                                          </div>
                                        </div>
                                        <div className="col-md-3">
                                          <div className="do-sear mt-2 d-flex">
                                            <label htmlFor=""> iv)</label>
                                            <p>{item?.Option_4}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )} */}  
                                 
                                       {item?.Types_Question === "RelationShip Words Questions" ? (
                                                        <>
                                                            <div
                                                                className="d-flex flex-wrap justify-content-between align-items-start my-2"
                                                                style={{ gap: "10px" }}
                                                            >
                                                                <div className="d-flex align-items-center" style={{ minWidth: "22%" }}>
                                                                    <b>{count++}.</b>
                                                                    <p className="mb-0 ms-1">{item?.RealetionA}</p>
                                                                    <p className="mb-0 ms-1">:</p>
                                                                </div>

                                                                <div className="d-flex align-items-center" style={{ minWidth: "22%" }}>
                                                                    <p className="mb-0">{item?.RealetionB}</p>
                                                                    <p className="mb-0 ms-1">::</p>
                                                                </div>

                                                                <div className="d-flex align-items-center" style={{ minWidth: "22%" }}>
                                                                    <p className="mb-0">{item?.RealetionC}</p>
                                                                    <p className="mb-0 ms-1">:</p>
                                                                </div>

                                                                <div className="flex-grow-1" style={{ minWidth: "22%" }}>
                                                                    <p
                                                                        style={{
                                                                            borderBottom: "1px solid",
                                                                            margin: "0",
                                                                            paddingTop: "25px",
                                                                        }}
                                                                    ></p>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <></>
                                                    )}
                                {item?.Types_Question ===
                                "One Word Question" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <br />
                                    <p>{QuestionHeader?.ans}</p>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                      <br />
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}

                                {item?.Types_Question ===
                                "Two  Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Two and three Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <br />
                                    <p>{QuestionHeader?.ans}:</p>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Three and Four Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <br />
                                    <p>{QuestionHeader?.ans}:</p>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Five and Six Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Six Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Seven Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Eight Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Ten Sentence Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "One Sentence Answer Question" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <br />
                                    <p>{QuestionHeader?.ans}:</p>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    {item?.orQuestion ? (
                                      <>
                                        <h5>({QuestionHeader?.or})</h5>
                                      </>
                                    ) : (
                                      <></>
                                    )}

                                    {item?.orQuestion ? (
                                      <>
                                        <div className="d-flex mt-2">
                                          <b>
                                            {item?.orQuestion
                                              ? parse(item?.orQuestion)
                                              : ""}
                                          </b>
                                        </div>
                                        <div className="d-flex mb-1">
                                          {item?.Image_1 ? (
                                            <>
                                              <span>a)</span>
                                              <img
                                                src={`${item?.Image_1}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          {item?.Image_2 ? (
                                            <>
                                              <span>b)</span>
                                              <img
                                                src={`${item?.Image_2}`}
                                                className="mcq-img"
                                                alt=""
                                              />
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {/* {item?.Types_Question === "Map Reading" ? (
                                  <>
                                    <div className="d-flex justify-content-between">
                                      <div className="d-flex mt-2">
                                        <b>
          {item?.Question  
            ? parse(item?.Question)
            : ""}
        </b>
                                      </div>
                                      <div>{ele1?.Mask}</div>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )} */}  
                                 
                                  {item?.Types_Question === "Map Reading" ? (
  <>
    <div className="d-flex justify-content-between">
      <div className="d-flex mt-2">
        <b>{count++}.</b> 
        <b>
          {item?.Question  
            ? parse(item?.Question)
            : ""}
        </b>
      </div>
      <div>{ele1?.Mask}</div>
    </div>
  </>
) : (
  <></>
)}
                                {item?.Types_Question ===
                                "Objective Questions" ? (
                                  <>
                                    <div
                                      style={{ display: "flex", gap: "12px" }}
                                      key={i}
                                    >
                                      <b>{count++}</b>
                                      <b>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
                                    </div>
                                    <Row>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_1 ? (
                                          <>
                                            {" "}
                                            a) &nbsp;
                                            {item?.Option_1
                                              ? parse(item?.Option_1)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                      <div className="col-6 mb-3 d-flex">
                                        {item?.Option_2 ? (
                                          <>
                                            b) &nbsp;
                                            {item?.Option_2
                                              ? parse(item?.Option_2)
                                              : ""}
                                          </>
                                        ) : (
                                          <></>
                                        )}
                                      </div>
                                    </Row>
                                    <Row>
                                      <div className="ans-section">
                                        <div className="ans">{QuestionHeader?.ans}: </div>
                                        <div className="ans-box"></div>
                                        <div className="ans-line"></div>
                                      </div>
                                    </Row>
                                    {item?.ImageQ ? (
                                      <>
                                        <h4>({QuestionHeader?.or})</h4>
                                        <div>
                                          {item?.ImageQ ? (
                                            <>
                                              <b>Question Image:</b>
                                              <div>
                                                <img
                                                  src={`${item?.ImageQ}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </div>
                                            </>
                                          ) : (
                                            <></>
                                          )}
                                          <br />
                                          <b>Options :</b>
                                          <div className="d-flex mb-1">
                                            {item?.Image_1 ? (
                                              <>
                                                <span>a)</span>
                                                <img
                                                  src={`${item?.Image_1}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                            {item?.Image_2 ? (
                                              <>
                                                <span>b)</span>
                                                <img
                                                  src={`${item?.Image_2}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Complete the Poem" ? (
                                  <>
                                    <div key={i}>
                                      {item?.PoemSt ? (
                                        <>
                                          {item.NumberOfLine === "4" ? (
                                            <>
                                              <div className="col-sm-6">
                                                <div className="d-flex align-items-baseline mb-3">
                                                  <span>
                                                    {" "}
                                                    <b>{count++}.</b>{" "}
                                                    {item?.PoemSt}
                                                  </span>

                                                  <div
                                                    className=" mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className=""
                                                  style={{ marginTop: "33px" }}
                                                >
                                                  <p
                                                    className="ans-line"
                                                    style={{ width: "72%" }}
                                                  ></p>
                                                </div>
                                                <div
                                                  className=""
                                                  style={{ marginTop: "33px" }}
                                                >
                                                  <p
                                                    className="ans-line"
                                                    style={{ width: "72%" }}
                                                  ></p>
                                                </div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 "
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                      marginTop: "33px",
                                                    }}
                                                  ></div>
                                                  <span>{item?.PoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                          {item.NumberOfLine === "5" ? (
                                            <>
                                              <div className="">
                                                <div className="d-flex align-items-baseline mb-4">
                                                  <span>{item?.PoemSt}</span>

                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className="ans-line mb-4"
                                                  style={{ width: "72%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "72%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "72%" }}
                                                ></div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                    }}
                                                  ></div>
                                                  <span>{item?.PoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                          {item.NumberOfLine === "6" ? (
                                            <>
                                              <div className="">
                                                <div className="d-flex align-items-baseline mb-4">
                                                  <span>{item?.PoemSt}</span>

                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className="ans-line mb-4"
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                    }}
                                                  ></div>
                                                  <span>{item?.PoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                          {item.NumberOfLine === "7" ? (
                                            <>
                                              <div className="">
                                                <div className="d-flex align-items-baseline mb-4">
                                                  <span>{item?.PoemSt}</span>

                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className="ans-line mb-4"
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                    }}
                                                  ></div>
                                                  <span>{item?.PoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {item?.orQuestion ? (
                                        <>
                                          <h5>({QuestionHeader?.or})</h5>
                                          <div className="d-flex mt-2">
                                            <b>
                                              {item?.orQuestion
                                                ? parse(item?.orQuestion)
                                                : ""}
                                            </b>
                                          </div>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {item?.OrPoemSat ? (
                                        <>
                                          {item?.orNumberOfLine === "4" ? (
                                            <>
                                              <div className="col-sm-6">
                                                <div className="d-flex align-items-baseline mb-3">
                                                  <span>{item?.OrPoemSat}</span>
                                                  <div
                                                    className=" mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className=""
                                                  style={{ marginTop: "33px" }}
                                                >
                                                  <p
                                                    className="ans-line"
                                                    style={{ width: "72%" }}
                                                  ></p>
                                                </div>
                                                <div
                                                  className=""
                                                  style={{ marginTop: "33px" }}
                                                >
                                                  <p
                                                    className="ans-line"
                                                    style={{ width: "72%" }}
                                                  ></p>
                                                </div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 "
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                      marginTop: "33px",
                                                    }}
                                                  ></div>
                                                  <span>{item?.OrPoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                          {item?.orNumberOfLine === "5" ? (
                                            <>
                                              <div className="">
                                                <div className="d-flex align-items-baseline mb-4">
                                                  <span>{item?.OrPoemSat}</span>
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className="ans-line mb-4"
                                                  style={{ width: "72%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "72%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "72%" }}
                                                ></div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                    }}
                                                  ></div>
                                                  <span>{item?.OrPoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                          {item?.orNumberOfLine === "6" ? (
                                            <>
                                              <div className="">
                                                <div className="d-flex align-items-baseline mb-4">
                                                  <span>{item?.OrPoemSat}</span>
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className="ans-line mb-4"
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                    }}
                                                  ></div>
                                                  <span>{item?.OrPoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                          {item?.orNumberOfLine === "7" ? (
                                            <>
                                              <div className="">
                                                <div className="d-flex align-items-baseline mb-4">
                                                  <span>{item?.OrPoemSat}</span>
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "37%",
                                                    }}
                                                  ></div>
                                                </div>
                                                <div
                                                  className="ans-line mb-4"
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div
                                                  className="ans-line mb-4 "
                                                  style={{ width: "55%" }}
                                                ></div>
                                                <div className="d-flex align-items-end">
                                                  <div
                                                    className="mb-3 mt-2"
                                                    style={{
                                                      borderBottom: "1px solid",
                                                      width: "44%",
                                                    }}
                                                  ></div>
                                                  <span>{item?.OrPoemEnd}</span>
                                                </div>
                                              </div>
                                            </>
                                          ) : (
                                            <> </>
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                <br />
                                {item?.Types_Question === "Letter Writting" ? (
                                  <>
                                    <div
                                      style={{ display: "flex", gap: "12px" }}
                                      key={i}
                                    >
                                      <b>{count++}</b>
                                      <b>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Situation UnderStatnding answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <b>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </b>
                                    </div>
                                    <br />
                                    <p>{QuestionHeader?.ans}:</p>
                                    <div className="d-flex mb-1">
                                      {item?.Image_1 ? (
                                        <>
                                          <span>a)</span>
                                          <img
                                            src={`${item?.Image_1}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                      {item?.Image_2 ? (
                                        <>
                                          <span>b)</span>
                                          <img
                                            src={`${item?.Image_2}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                    <br />

                                    <div>
                                      {item?.PassiveQuesion?.length ? (
                                        <>
                                          {item?.PassiveQuesion?.map(
                                            (item1, index) => {
                                              return (
                                                <div>
                                                  <p>
                                                    {item1?.question
                                                      ? parse(item1?.question)
                                                      : ""}
                                                  </p>
                                                  {lines}
                                                  {lines}
                                                </div>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Match the Following Questions" ? (
                                  <>
                                    <div className="question-body mb-2">
                                      {/* <b>{count++}.)</b> */}
                                      <Table bordered>
                                        <thead>
                                          <tr>
                                            <th colspan="2">PART-A</th>
                                            <th colspan="2">PART-B</th>
                                            {item?.Part_C1 ? (
                                              <th colspan="2">PART-C</th>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                              <th>{count++}</th>
                                            <th>{item?.Part_A1}</th>
                                            <th>a</th>
                                            <th>{item?.Part_B1}</th>
                                            {item?.Part_C1 ? (
                                              <>
                                                <th>i</th>
                                                <th>{item?.Part_C1}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                               <th>{count++}</th>
                                            <th>{item?.Part_A2}</th>
                                            <th>b</th>
                                            <th>{item?.Part_B2}</th>
                                            {item?.Part_C2 ? (
                                              <>
                                                <th>i</th>
                                                <th>{item?.Part_C2}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          <tr>
                                            <th>{count++}</th>
                                            <th>{item?.Part_A3}</th>
                                            <th>c</th>
                                            <th>{item?.Part_B3}</th>
                                            {item?.Part_C3 ? (
                                              <>
                                                <th>iii</th>
                                                <th>{item?.Part_C3}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>
                                          {item?.Part_A4&& <tr>
                                            <th>{count++}</th>
                                            <th>{item?.Part_A4}</th>
                                            <th>d</th>
                                            <th>{item?.Part_B4}</th>
                                            {item?.Part_C4 ? (
                                              <>
                                                <th>iv</th>
                                                <th>{item?.Part_C4}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr>}
                                         {item?.Part_A5&&  <tr>
                                            <th>{count++}</th>
                                            <th>{item?.Part_A5}</th>
                                            <th>e</th>
                                            <th>{item?.Part_B5}</th>
                                            {item?.Part_C5 ? (
                                              <>
                                                <th>v</th>
                                                <th>{item?.Part_C5}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr> }
                                         

                                         {item?.Part_A5&&     <tr>
                                            {item?.Part_A6 ? (
                                              <>
                                                <th>{count++}</th>
                                                <th>{item?.Part_A6}</th>
                                              </>
                                            ) : (
                                              <>
                                                <th></th>
                                                <th></th>
                                              </>
                                            )}
                                            {item?.Part_B6 ? (
                                              <>
                                                <th>f</th>
                                                <th>{item?.Part_B6}</th>
                                              </>
                                            ) : (
                                              <>
                                                <th></th>
                                                <th></th>
                                              </>
                                            )}
                                            {item?.Part_C5 ? (
                                              <>
                                                <th>vi</th>
                                                <th>{item?.Part_C5}</th>
                                              </>
                                            ) : (
                                              ""
                                            )}
                                          </tr> }
                                        </tbody>
                                      </Table>
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Classifications of Questions" ? (
                                  <>
                                    <div className="d-flex ">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <br />
                                    <p>{QuestionHeader?.ans}:</p>
                                    <div className="mb-2">
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>

                                    {item?.orQuestion ? (
                                      <>
                                        <div>
                                          <h5 style={{ textAlign: "center" }}>
                                            ({QuestionHeader?.or})
                                          </h5>

                                          <div>
                                            {item?.Image_1 ? (
                                              <>
                                                <img
                                                  src={`${item?.Image_1}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                            {item?.Image_2 ? (
                                              <>
                                                <img
                                                  src={`${item?.Image_2}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    <div></div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Odd and out words Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                      {item?.Option_1
                                        ? parse(item?.Option_1)
                                        : ""}
                                      {item?.Option_2
                                        ? parse(item?.Option_2)
                                        : ""}
                                    </div>
                                    <div className="d-flex justify-content-around">
                                      {item?.Option_3
                                        ? parse(item?.Option_3)
                                        : ""}
                                      {item?.Option_4
                                        ? parse(item?.Option_4)
                                        : ""}
                                    </div>

                                    {item?.Image_1 ? (
                                      <>
                                        <div>
                                          <h5 style={{ textAlign: "center" }}>
                                            ({QuestionHeader?.or})
                                          </h5>

                                          <div>
                                            {item?.Image_1 ? (
                                              <>
                                                <img
                                                  src={`${item?.Image_1}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                            {item?.Image_2 ? (
                                              <>
                                                <img
                                                  src={`${item?.Image_2}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                          <div>
                                            {item?.Image_3 ? (
                                              <>
                                                <img
                                                  src={`${item?.Image_3}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                            {item?.Image_4 ? (
                                              <>
                                                <img
                                                  src={`${item?.Image_4}`}
                                                  className="mcq-img"
                                                  alt=""
                                                />
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                    <div></div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Poet,Time, Place, Writer answer questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question === "Graph Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        height: "200px",
                                        width: "200px",
                                      }}
                                    ></div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Expanding and Explanations Answer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                      <b>{count++}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div>
                                      {item?.Image_1 ? (
                                        <>
                                          <span>a)</span>
                                          <img
                                            src={`${item?.Image_1}`}
                                            className="mcq-img"
                                            alt=""
                                          />
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <div>
                                      {item?.NumberOfLine && (
                                        <>
                                          {Array.from(
                                            { length: item?.NumberOfLine },
                                            (_, index) => (
                                              <React.Fragment key={index}>
                                                {lines.map((line, idx) => (
                                                  <React.Fragment key={idx}>
                                                    {line}
                                                  </React.Fragment>
                                                ))}
                                              </React.Fragment>
                                            )
                                          )}
                                        </>
                                      )}
                                    </div>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {item?.Types_Question ===
                                "Grammer Questions" ? (
                                  <>
                                    <div className="d-flex mt-2">
                                   <b> {RomanAA[a]}.</b>
                                      <p>
                                        {item?.Question
                                          ? parse(item?.Question)
                                          : ""}
                                      </p>
                                    </div>
                                    <div
                                      style={{
                                        height: "200px",
                                        width: "200px",
                                      }}
                                    ></div>
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
                            </>
                          );
                        }
                      })}
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          {/*------ QuestionAnalysis---- */}

          {/* <div className="d-flex justify-content-center mt-2 ">
            <Button className="md-2" onClick={() => updaethequestion(false)}>
              View Question Analysis
            </Button>
            <br />
          </div> */}
          <br />
        </div>
      </div>
            {Questions.length>0 &&  <AdminNoLineQuestionPaper state2={state} Questions={Questions} QuestionHeader={QuestionHeader} />}
          {Questions.length>0 &&<AdminQuestionAnalysis state2={state} Questions={Questions}/> }
          
    </div>
  );
}

export default AdminViewQuestionPaper;

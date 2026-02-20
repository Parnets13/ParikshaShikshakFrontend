
   import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { HiDownload } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import AdminViewBlueprint from "./AdminViewBlueprint";
import AdminViewQuestionPaper from "./AdminViewQuestionPaper";  

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function AdminCoverPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  const [item, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [blueprintLoading, setBlueprintLoading] = useState(true);
  const state = location?.state?.item || null;
  const coverId = query.get("id");

  const [data1, setData1] = useState({});
  const getCoverPage = async (Medium) => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getCoverPageBYMedium/" + Medium
      );
      if (res.status === 200) {
        setData1(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestionP = async (id) => {
    try {
      let res = await axios.get(
        `http://localhost:8774/api/teacher/getAllGenQuestionPaperById/${id}`
      );
      if (res.status == 200) {
        const data = res.data.success;
        setItems(data);
        getCoverPage(data.Medium);
        console.log("data", data);
        
  
        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
      setBlueprintLoading(false);
    }
  };
  
  useEffect(() => {
    if (state) {
      getQuestionP(state?._id);
    } else if (coverId) {
      getQuestionP(coverId);
    }
  }, [state, coverId]);


  useEffect(() => {
    const timeout = setTimeout(() => {
      setBlueprintLoading(false);
    }, 2000); 

    return () => clearTimeout(timeout);
  }, []);

  const handlePrint = () => {
    const style = document.createElement("style");
    style.innerHTML = `
    @media print {
      body * {
        visibility: hidden;
      }

      #CoverPage, #CoverPage * {
        visibility: visible;
      }

      #CoverPage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        padding: 10mm;
        box-sizing: border-box;
      }

      .a4-page {
        page-break-before: always;
        page-break-inside: avoid;
        box-sizing: border-box; 
       
           }

      .a4-page:first-child {
        page-break-before: auto;
      }

      .no-print {
        display: none !important;
      }
    }
  `;

    document.head.appendChild(style);
    window.print();

    setTimeout(() => {
      document.head.removeChild(style);
    }, 500);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

const handleDownloadPDF = () => {
  const input = document.getElementById("CoverPage");


  const inputWidth = 210; 
  const inputHeight = 297; 


  const scale = 2;

  html2canvas(input, {
    scale: scale,
    logging: false,
    useCORS: true,
    allowTaint: true,
    width: inputWidth * 3.78,
    height: inputHeight * 3.78,
    windowWidth: input.scrollWidth,
    windowHeight: input.scrollHeight,
  }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

  
    pdf.addImage(imgData, "PNG", 15, 15, inputWidth - 30, inputHeight - 30);
    pdf.save("cover_page.pdf");
  });
};

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <h4 className="mt-3">Loading Cover Page...</h4>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-evenly mb-3">
        <div className="d-flex justify-content-evenly mb-3 no-print">
          <div className="d-flex gap-3 mt-3 justify-content-between no-print">
            <Button
              variant="primary"
              onClick={handlePrint}
              id="printbuttun"
              className="d-flex align-items-center gap-1"
            >
              <LuPrinter style={{ width: "18px", height: "18px" }} />
              Print
            </Button>

            <div>
              <Button onClick={() => navigate(-1)}>Back</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-coverpage1" id="CoverPage">
        <div className="adminmaincontent a4-page">
          <div
            style={{
              border: "2px solid #000",
              width: "100%",
              height: "100%",
              margin: "0 auto",
              padding: "20px",
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: `
                linear-gradient(white, white) padding-box,
                linear-gradient(to right, #000, #000) border-box
              `,
              borderImage: "linear-gradient(to right, #000, #000) 1",
            }}
          >
            <div className="d-flex align-items-center mb-5 justify-content-around text-center">
              <div>
                {item?.School_Logo ? (
                  <img
                    src={`${item?.School_Logo}`}
                    alt="School Logo"
                    style={{ width: "80px" }}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="text-center">
                <h6 className="fw-bold" style={{ fontSize: "18px" }}>
                  {item?.Institute_Name}
                </h6>
                <h6 className="fw-bold" style={{ fontSize: "16px" }}>
                  {item?.SchoolAddress}
                </h6>
              </div>
            </div>

            <div className="text-center" style={{ marginTop: "40px" }}>
              <h6 className="fw-bold" style={{ fontSize: "22px" }}>
                {item?.BlueName}
              </h6>
            </div>

            <div
              className="d-flex justify-content-around"
              style={{ marginTop: "100px" }}
            >
              <p className="fw-bold" style={{ fontSize: "16px" }}>
                {data1?.Subject} :- {item?.Subject}
              </p>
              <p className="fw-bold" style={{ fontSize: "16px" }}>
                {data1?.Classs} :- {item?.Sub_Class}{" "}
              </p>
            </div>

            <div style={{ marginTop: "100px", flexGrow: 1 }}>
              <ul
                style={{
                  listStyle: "none",
                  width: "fit-content",
                  margin: "0 auto",
                  fontSize: "16px",
                  fontStyle: "italic",
                  padding: 0,
                }}
              >
                <li className="d-flex gap-4 align-items-center mb-3">
                  <p>
                    <FaStar />
                  </p>
                  <p>{data1?.questionPaper}</p>
                </li>
                <li className="d-flex gap-4 align-items-center mb-3">
                  <p>
                    <FaStar />
                  </p>
                  <p>{data1?.blueprint}</p>
                </li>
                <li className="d-flex gap-4 align-items-center mb-3">
                  <p>
                    <FaStar />
                  </p>
                  <p>{data1?.answersheet}</p>
                </li>
                <li className="d-flex gap-4 align-items-center mb-3">
                  <p>
                    <FaStar />
                  </p>
                  <p>{data1?.questionanylys}</p>
                </li>
              </ul>
            </div>

            <div
              className="d-flex justify-content-around"
              style={{ marginBottom: "50px" }}
            >
              <p className="fw-bold" style={{ fontSize: "16px" }}>
                {data1?.SubjectTeacher} :-
              </p>
              <div>
                <span className="fw-bold mb-0" style={{ fontSize: "16px" }}>
                  {data1?.Principal} :-
                </span>
              </div>
            </div>
          </div>
        </div>

        
  
        {blueprintLoading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
            <div className="text-center">
              <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
                <span className="visually-hidden">Loading...</span>
              </div>
              <h4 className="mt-3">Generating  Blueprint...</h4>
              <p className="text-muted">This may take a few moments</p>
            </div>
          </div>
        ) : (
          <AdminViewBlueprint state2={item} />
        )}
      </div>
    </div>
  );
}

export default AdminCoverPage;
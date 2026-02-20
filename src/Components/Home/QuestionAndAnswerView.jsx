import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import "../../App.css";
import axios from "axios";
function QuestionAndAnswerView() {
  // Check for both admin and user in localStorage
  const adminFromSession = JSON.parse(localStorage.getItem("admin"));
  const userFromSession = JSON.parse(localStorage.getItem("user"));
  
  let admin;
  if (adminFromSession) {
    admin = adminFromSession;
  } else if (userFromSession) {
    admin = userFromSession;
  }
  const token = localStorage.getItem("token");

  console.log("QuestionAndAnswerView - user/admin:", admin, "token:", token ? "exists" : "missing");
  //Get All QuestionAnsPdf
  const [QuestionAnsPdf, setQuestionAnsPdf] = useState([]);
  const buildPdfUrl = (value) => {
    if (!value) return "";
    if (typeof value === "string" && (value.startsWith("http://") || value.startsWith("https://"))) {
      return value;
    }
    return `http://localhost:8774/QuestionPdf/${value}`;
  };
  const getallquestionPdf = async () => {
    if (!token) {
      console.log("QuestionAndAnswerView - No token found, cannot fetch PDFs");
      return;
    }
    try {
      console.log("QuestionAndAnswerView - Fetching PDFs...");
      // Use public endpoint that doesn't require authId matching
      let res = await axios.get(
        `http://localhost:8774/api/admin/getAllpdfPublic`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        console.log("QuestionAndAnswerView - PDFs fetched:", res.data.success);
        setQuestionAnsPdf(res.data.success);
      }
    } catch (error) {
      console.log("Error fetching PDFs:", error);
    }
  };
  useEffect(() => {
    getallquestionPdf();
  }, []);
  console.log("QuestionAnsPdf", QuestionAnsPdf);
  return (
    <div>
      <Container>
        <div
          className="mt-4"
          style={{
            backgroundColor: "#f9b26b",
            padding: "4px",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
          }}
        >
          <h4>All Assessment</h4>
        </div>

        <div className="questionpdfview">
          <Table>
            <thead>
              <tr>
                <th>Question</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {QuestionAnsPdf?.map((item, i) => {
                const questionUrl = buildPdfUrl(item?.questionPdf);
                const answerUrl = buildPdfUrl(item?.answerPdf);
                return (
                  <tr key={item?._id || i}>
                    <td>
                      {questionUrl ? (
                        <a href={questionUrl} target="_blank" rel="noreferrer">
                          {item?.Title || `Question ${i + 1}`}
                        </a>
                      ) : (
                        item?.Title || `Question ${i + 1}`
                      )}
                    </td>
                    <td>
                      {answerUrl ? (
                        <a href={answerUrl} target="_blank" rel="noreferrer">Answer</a>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  );
}

export default QuestionAndAnswerView;

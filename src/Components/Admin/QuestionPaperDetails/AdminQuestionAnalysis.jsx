import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { LuPrinter, LuDownload } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import AdminAnswerSheet from "./AdminAnswerSheet";

function AdminQuestionAnalysis({ state2, Questions }) {


  const adminFromSession = JSON.parse(localStorage.getItem("admin"));
  const userFromSession = JSON.parse(localStorage.getItem("user"));


  let admin;
  if (adminFromSession) {
    admin = adminFromSession;
  } else if (userFromSession) {
    admin = userFromSession;
  }


  const token = localStorage.getItem("token");


  const state = state2 || {}


  const navigate = useNavigate();

  const [GetquestAnalysisHeader, setGetquestAnalysisHeader] = useState([]);
  let count2 = 1;






  const getquestAnalysisHeader = async () => {

    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getQuestAnalysisheaderbymedium/" +
        state?.Medium
      );


      if (res.status === 200) {
        setGetquestAnalysisHeader(res.data.success);

      }
    } catch (error) {

    }
  };

  useEffect(() => {

    getquestAnalysisHeader();
  }, [token, state]);

  function check(am) {


    if (
      am === "One Word Question" ||
      am === "Multiple Choice Questions" ||
      am === "Fill in the Blanks Questions" ||
      am === "Classifications of Questions" ||
      am === "Match the Following Questions" ||
      am === "Recorrect the Answers Questions" ||
      am === "Odd and out words Questions" ||
      am === "RelationShip Words Questions" ||
      am === "Grammer Questions" ||
      am === "One Sentence Answer Question"
    ) {

      return GetquestAnalysisHeader.OT || "O.T";
    }
    if (
      am === "Two Sentence Answer Questions" ||
      am === "Situation UnderStatnding answer Questions" ||
      am === "Complete the Poem" ||
      am === "Poet,Time, Place, Writer answer questions" ||
      am === "Two and three Sentence Answer Questions"
    ) {

      return GetquestAnalysisHeader.SA || "S.A";
    }
    if (
      am === "Three and Four Sentence Answer Questions" ||
      am === "Five and Six Sentence Answer Questions" ||
      am === "Six Sentence Answer Questions" ||
      am === "Seven Sentence Answer Questions" ||
      am === "Eight Sentence Answer Questions" ||
      am === "Ten Sentence Answer Questions" ||
      am === "Expanding and Explanations Answer Questions" ||
      am === "Answer the Questions and Draw the Figure Questions" ||
      am === "Graph Questions" ||
      am === "Letter Writting" ||
      am === "Map Reading"
    ) {

      return GetquestAnalysisHeader.A || "A";
    }

  }



  return (
    <div className="">
      <div className="a4-page" >
        <div className="mt-4 ">
          <div className="header-info" style={{ border: "2px solid black", padding: "5px" }}>
            {state?.Institute_Name && (
              <h6>
                <b>
                  {state?.Institute_Name}, {state?.SchoolAddress}
                </b>
              </h6>
            )}
            <h6 className="text-center">
              <b>{state?.bluePrint?.blName}</b>
            </h6>
            <h6 className="text-center">
              <b>
                {state?.Sub_Class} {state?.Subject}
              </b>
            </h6>
            <h6>
              <b>{GetquestAnalysisHeader?.QuestHeader}</b>
            </h6>
          </div>
          <hr style={{ border: "3px solid #000" }} />
          <div className="">
            <Table bordered responsive className="analysis-table">
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
                {(() => {


                  return state?.bluePrint?.TypesofQuestions?.map((ele2, questionTypeIndex) => {


                    // Filter questions for this type
                    const filteredQuestions = Questions?.filter(
                      (ele) => {

                        return ele.Types_Question === ele2?.QAType;
                      }
                    );



                    return (
                      <React.Fragment key={ele2.QAType}>
                        {(() => {


                          // For Match the Following Questions, we need to create multiple rows based on NQA
                          if (ele2?.QAType === "Match the Following Questions" && filteredQuestions?.length > 0) {

                            const matchQuestion = filteredQuestions[0];
                            const numberOfRows = Number(ele2?.NQA) || 0;


                            return Array.from({ length: numberOfRows }).map((_, i) => {
                              const currentCount = count2++;


                              return (
                                <tr key={`${ele2.QAType}-${i}`} style={{ fontSize: "small" }}>
                                  <td>{currentCount}</td>
                                  <td>{matchQuestion?.Objectives}</td>
                                  <td>{matchQuestion?.Chapter_Name}</td>
                                  <td>{matchQuestion?.Lesson}</td>
                                  <td>{matchQuestion?.Types_QuestionTranslate || matchQuestion?.Questiontype}</td>
                                  <td>{check(ele2?.QAType)}</td>
                                  <td>{ele2?.Mask}</td>
                                  <td>{matchQuestion?.Difficulty_level}</td>
                                  <td>{matchQuestion?.Answer_Time}</td>
                                </tr>
                              );
                            });
                          }

                          // For all other question types
                          return filteredQuestions?.map((item, i) => {

                            if (i < Number(ele2?.NQA)) {
                              const currentCount = count2++;


                              return (
                                <tr key={`${ele2.QAType}-${i}`} style={{ fontSize: "small" }}>
                                  <td>{currentCount}</td>
                                  <td>{item?.Objectives}</td>
                                  <td>{item?.Chapter_Name}</td>
                                  <td>{item?.Lesson}</td>
                                  <td>{item?.Types_QuestionTranslate || item?.Questiontype}</td>
                                  <td>{check(ele2?.QAType)}</td>
                                  <td>
                                    {((ele2?.NQA * ele2?.Mask) / ele2?.NQA)}
                                  </td>
                                  <td>{item?.Difficulty_level}</td>
                                  <td>{item?.Answer_Time}</td>
                                </tr>
                              );
                            } else {

                            }
                            return null;
                          });
                        })()}
                      </React.Fragment>
                    );
                  });
                })()}
              </tbody>
            </Table>
          </div>

          <div className="note">
            <b>Note<span style={{ color: "red" }}>*</span></b>
            <span> {GetquestAnalysisHeader?.Note}</span>
          </div>
        </div>
      </div>
      <br />

      {Questions?.length && <AdminAnswerSheet state2={{ ...state, Questions }} Questions={Questions} />}


    </div>
  );
}

export default AdminQuestionAnalysis;
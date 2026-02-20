import React, { useEffect, useState } from "react";
import "../Admin/Admin.css";
import { Form, Table } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "../Admin/Admin.css";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";

import MathInput from "react-math-keyboard";
import { FiPrinter } from "react-icons/fi";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const AdminQuestionAnalysisHeaderView = () => {
  const location = useLocation();
  const { item } = location.state;
  console.log("location", location);
  console.log("item", item);

  return (
    <>
      <div className="box_1">
        <div className="Stepper-info " style={{ padding: "20px" }}>
          <div id="pdf">
            <div className="blueprint-content-display">
              <div className="blueprint-titles">
                <h3>Questions Analysis Name</h3>
                <div className="d-flex justify-content-center">
                  <b>{item?.QuestHeader}</b>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {/* table 3  */}
                    <div className="weightage-objectives">
                      <div className="objectives-table ">
                        <Table
                          responsive
                          bordered
                          hover
                          size="md"
                          style={{ border: "1px solid" }}
                        >
                          <thead>
                            <tr>
                              <th>{item?.slno}</th>
                              <th>{item?.ObjectType}</th>
                              <th>{item?.Chapter}</th>
                              <th>{item?.Lesson}</th>
                              <th>{item?.QuestionType}</th>
                              <th>{item?.OtSaLsa}</th>
                              <th>{item?.Marks}</th>
                              <th>{item?.Difficultlevel}</th>
                              <th>{item?.Time}</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>1.</td>
                              <td>Understanding</td>
                              <td>A snake in the garden</td>
                              <td>Prose</td>
                              <td>Fill in the blanks</td>
                              <td>O T</td>
                              <td>40</td>
                              <td>Easy</td>
                              <td>2 minutes</td>
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                    </div>

                    {/* New Table for A, E, M, OT, SA, VSA */}
                    <div className="weightage-objectives">
                      <div className="objectives-table">
                        <Table
                          responsive
                          bordered
                          hover
                          size="md"
                          style={{ border: "1px solid" }}
                        >
                          <thead>
                            <tr>
                              <th>A</th>
                              <th>E</th>
                              <th>M</th>
                              <th>OT</th>
                              <th>SA</th>
                              <th>VSA</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>{item?.A}</td>
                              <td>{item?.E}</td>
                              <td>{item?.M}</td>
                              <td>{item?.OT}</td>
                              <td>{item?.SA}</td>
                              <td>{item?.VSA}</td>
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

          <div className="d-flex justify-content-between">
            <div>
              <span className="fw-bold">Note : {item?.Note}</span>
              <p>Questions Analysis Instructions</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminQuestionAnalysisHeaderView;

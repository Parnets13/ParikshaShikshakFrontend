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


function BluePrintHeaderView() {

    const location = useLocation()
    const { item } = location.state
    
    return (
        <>
            <div className="box_1" >
                <div className="Stepper-info " style={{ padding: "20px" }}>
                    <div id="pdf">
                        <div className="blueprint-content-display" >
                            <div className="blueprint-titles">
                                <h3>Blue Print Name</h3>
                                <div className="d-flex justify-content-center">
                                    <b>{item?.BluePrintName}</b>
                                </div>
                            </div>
                            <div className="container">
                                <div className="d-flex gap-3">
                                    <div className="col-md-7 blue-print_1tab">
                                        {/* table 3  */}
                                        <div className="weightage-objectives">
                                            <div className="main-title">
                                                <b>1.</b>
                                                <b>{item?.UnitWiseMrk}</b>
                                            </div>
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
                                                            <th>{item?.SNo}</th>
                                                            <th>{item?.Lessons}</th>
                                                            <th>{item?.Questions}</th>
                                                            <th>{item?.Marks}</th>
                                                            <th>{item?.Percentage}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1.</td>
                                                            <td>Lessons Name</td>
                                                            <td>2</td>
                                                            <td>3</td>
                                                            <td>7.5%</td>
                                                        </tr>

                                                        <tr>
                                                            <td>{item?.Total}</td>
                                                            <td></td>
                                                            <td>
                                                                <b>
                                                                    12
                                                                </b>
                                                            </td>
                                                            <td>  <b>
                                                                12
                                                            </b>

                                                            </td>
                                                            <td>
                                                                <b>
                                                                    100%
                                                                </b>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-5 blue-print_1tab">
                                        {/* table 1 */}
                                        <div className="weightage-objectives">
                                            <div className="main-title">
                                                <b>2.</b>
                                                <b>{item?.ObjectiveMrks}</b>
                                            </div>
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
                                                            <th>{item?.SNo}</th>
                                                            <th>{item?.Specifics}</th>
                                                            <th>{item?.Questions}</th>
                                                            <th>{item?.Marks}</th>
                                                            <th>{item?.Percentage}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1.</td>
                                                            <td>knowledge</td>
                                                            <td>10</td>
                                                            <td>10</td>
                                                            <td>25%</td>
                                                        </tr>

                                                        <tr>
                                                            <td>{item?.Total}</td>
                                                            <td>
                                                                <b>
                                                                    12
                                                                </b>
                                                            </td>
                                                            <td>
                                                                <b>
                                                                    23
                                                                </b>
                                                            </td>

                                                            <td>
                                                                <b>
                                                                    100%
                                                                </b>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>

                                        {/* table 2 */}
                                        <div className="weightage-objectives">
                                            <div className="main-title">
                                                <b>3.</b>
                                                <b>{item?.QuestionWiseMrk}</b>
                                            </div>
                                            <div className="text-center">
                                                <div className="objectives-table">
                                                    <Table
                                                        responsive
                                                        bordered
                                                        hover
                                                        size="sm"
                                                        style={{ border: "1px solid" }}
                                                    >
                                                        <thead>
                                                            <tr>
                                                                <th>{item?.SNo}</th>
                                                                <th>{item?.TypeOfQuestion}</th>
                                                                <th>{item?.Questions}</th>
                                                                <th>{item?.Marks}</th>
                                                                <th>{item?.Percentage}</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr >
                                                                <td>1</td>
                                                                <td>{item?.Objectivequestion}</td>
                                                                <td>
                                                                    14
                                                                </td>
                                                                <td>23</td>
                                                                <td>100%</td>
                                                            </tr>
                                                            <tr >
                                                                <td>2</td>
                                                                <td>{item?.ShortanswerQ}</td>
                                                                <td>
                                                                    14
                                                                </td>
                                                                <td>23</td>
                                                                <td>100%</td>
                                                            </tr>
                                                            <tr >
                                                                <td>3</td>
                                                                <td>{item?.LonganswerQ}</td>
                                                                <td>
                                                                    14
                                                                </td>
                                                                <td>23</td>
                                                                <td>100%</td>
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
                                                <b>{item?.AccordingRigorMrk}</b>
                                            </div>
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
                                                            <th>{item?.SNo}</th>
                                                            <th>{item?.LevelOfDifficult}</th>
                                                            <th>{item?.Questions}</th>
                                                            <th>{item?.Marks}</th>
                                                            <th>{item?.Percentage}</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>{item?.Easy} </td>
                                                            <td>12</td>
                                                            <td>23</td>
                                                            <td>100%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>2</td>
                                                            <td>{item?.MediumQ} </td>
                                                            <td>12</td>
                                                            <td>23</td>
                                                            <td>100%</td>
                                                        </tr>
                                                        <tr>
                                                            <td>3</td>
                                                            <td>{item?.Difficult}</td>
                                                            <td>12</td>
                                                            <td>23</td>
                                                            <td>100%</td>
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

                    {/* blue print 2  */}
                    <div id="pdf1">
                        <div style={{ fontFamily: "sans-serif" }}>
                            <div
                                className="blueprint2-container"
                                style={{ padding: "20px 8px" }}
                            >
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <b>{item?.Time}:10 Minuts</b>
                                    </div>
                                    <div>
                                        <b>{item?.BluePrintName}</b>
                                    </div>
                                    <div>
                                        <b>{item?.Marks}: 12</b>
                                    </div>
                                </div>

                                <div>
                                    <Table
                                        bordered
                                        style={{ border: "1px solid", width: '-webkit-fill-available', height: "32rem" }}
                                        className="asda_res"
                                    >
                                        <thead>
                                            <tr>
                                                <th>{item?.SNo}</th>
                                                <th>{item?.TargetUnit}</th>

                                                <th colSpan={6} style={{ fontSize: "12px" }}>Knowladge</th>
                                                <th colSpan={6} style={{ fontSize: "12px" }}>Understanding</th>
                                                <th colSpan={6} style={{ fontSize: "12px" }}>Expression</th>
                                                <th colSpan={6} style={{ fontSize: "12px" }}>Appreciation</th>

                                                <th colSpan={6}>{item?.TotalQuestion}</th>
                                                <th colSpan={1}>{item?.TotalMarks}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: "2px solid black" }}>
                                                <th></th>
                                                <th></th>

                                                <th>{item?.V}</th>
                                                <th colSpan={2}>{item?.K}</th>
                                                <th colSpan={3}>{item?.D}</th>
                                            </tr>
                                            <tr>
                                                <th></th>

                                                <th style={{ width: "125px", fontSize: "12px" }}></th>
                                                <th style={{ fontSize: "12px" }}></th>

                                                <th>{item?.VSA}</th>
                                                <th>{item?.SA}</th>
                                                <th>{item?.LA1}</th>
                                                <th>{item?.LA2}</th>
                                                <th>{item?.LA3}</th>
                                                <th></th>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td><b>{item?.Total}</b></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <span className="fw-bold">{item?.Note}:-</span>
                                        <p>Blue Print Instructions</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}

export default BluePrintHeaderView;

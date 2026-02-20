import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Modal,
  Pagination,
  Table,
} from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import moment from "moment";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FaEye } from "react-icons/fa";
import "../../../Admin/Admin.css"

import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const ViewMatch = () => {

  return (
    <div>
         <div className="box_1">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Examination Board</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Board</option>
                  <option value="Easy">CBSE</option>
                  <option value="Average">STATE</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Medium</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Medium</option>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Kannada</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Class</label>
                <Form.Select aria-label="Default select example">
                  <option>Fifth Class</option>
                  <option>LKG Class</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Sub-Class</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Sub-Class</option>
                  <option>Primary</option>
                  <option>Secondary</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Subject</label>
                <Form.Select aria-label="Default select example">
                  <option>Select subject</option>
                  <option>Hindi</option>
                  <option>English</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select subject part</label>
                <Form.Select aria-label="Default select example">
                  <option value="">Select subject part</option>
                  <option value="">aerfsd</option>
                  <option value="">tyrtg</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select Chapter Name</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Chapter Name</option>
                  <option value="">r6</option>
                  <option value="">wfd</option>
                </Form.Select>
              </div>
            </div>

            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Select the Difficulty level of Paper</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Difficulty level of Paper</option>
                  <option value="Easy">Easy</option>
                  <option value="Average">Average</option>
                  <option value="Difficult">Difficult</option>
                </Form.Select>
              </div>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Name Of the Examination</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Name Of the Examination</option>
                  <option value="">FA-3</option>
                  <option value="">FA-2</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select aria-label="Default select example">
                  <option>Answer Timing</option>
                  <option value="">5 minuts</option>
                  <option value="">4 minuts</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image</label>
                <input
                  type="file"
                  className="vi_0"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <input
                  type="number"
                  className="vi_0"
                  placeholder="Enter The Marks"
                />
              </div>
            </div>
            {/* <Container>
              <label htmlFor=""> Question</label>

              <div className="row">
                <div className="col-md-6">
                  <div className="do-sear mt-2">
                    <label htmlFor="" className="d-flex justify-content-center">
                      {" "}
                      PART A
                    </label>
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear mt-2">
                    <label htmlFor="" className="d-flex justify-content-center">
                      {" "}
                      PART B
                    </label>
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                  </div>
                </div>
              </div>
            </Container>

            <Container>
              <label htmlFor=""> Answer</label>

              <div className="row">
                <div className="col-md-6">
                  <div className="do-sear mt-2">
                    <label htmlFor="" className="d-flex justify-content-center">
                      {" "}
                      PART A
                    </label>
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Question"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="do-sear mt-2">
                    <label htmlFor="" className="d-flex justify-content-center">
                      {" "}
                      PART B
                    </label>
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                    <input
                      type="text"
                      className="vi_0 mb-2"
                      placeholder="Enter Your Answer"
                    />
                  </div>
                </div>
              </div>
            </Container> */}

            <div className="col-12">
              <label htmlFor=""> Questions</label>
                <Table
                  responsive
                  bordered
                  size="sm"
                  style={{ textAlign: "center" }}
                >
                  <thead style={{ backgroundColor: "orange" }}>
                    <tr>
                      <th>PART A</th>
                      <th>PART B</th>
                      <th>PART C</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    
                  </tbody>
                </Table>
              </div>

              <div className="col-12">
              <label htmlFor=""> Answer</label>
                <Table
                  responsive
                  bordered
                  size="sm"
                  style={{ textAlign: "center" }}
                >
                  <thead style={{ backgroundColor: "orange" }}>
                    <tr>
                      <th>PART A</th>
                      <th>PART B</th>
                      <th>PART C</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>
                    <tr>
                      <td>sss</td>
                      <td>sss</td>
                      <td>sss</td>
                    </tr>                 
                  
                  </tbody>
                </Table>
              </div>
          </div>
        </div>
        </div>
      </div>
  )
}

export default ViewMatch;

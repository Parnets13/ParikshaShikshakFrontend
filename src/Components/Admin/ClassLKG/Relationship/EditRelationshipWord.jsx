import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import "../../../Admin/Admin.css"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

const EditRelationshipWord = () => {
   // Line
   const [twoline, setTwoline] = useState(false);
   const [threeline, setThreeline] = useState(false);
   const [fourline, setFourline] = useState(false);
   const [fiveline, setFiveline] = useState(false);
   const [sixline, setSixline] = useState(false);
   const [sevenline, setSevenline] = useState(false);
   const [eightline, setEightline] = useState(true);
   const [nineline, setNineline] = useState(false);
   const [tenline, setTenline] = useState(false);

  return (
    <div>
      <div className="">
      <div className="container">
          {/* <div className="row">
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
          </div> */}
          <div className="row mt-2">
            {/* <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Name Of the Examination</label>
                <Form.Select aria-label="Default select example">
                  <option>Select the Name Of the Examination</option>
                  <option value="">FA-3</option>
                  <option value="">FA-2</option>
                </Form.Select>
              </div>
            </div> */}
            
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor="">Image</label>
                <input type="file" className="vi_0" />
              </div>
            </div>
           
            <div className="col-md-12">
              <div className="do-sear mt-2">
                <label htmlFor="">Question</label>

                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
                <div className="row">
                  <div className="col-md-3">
                    <div className="do-sear mt-2 d-flex">
                      <input
                        type="text"
                        className="vi_0"
                        placeholder="Enter The question"
                      />
                      <p className="m-2">:</p>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="do-sear mt-2 d-flex">
                      <input
                        type="text"
                        className="vi_0"
                        placeholder="Enter The question"
                      />
                      <p className="m-2 ">::</p>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="do-sear mt-2 d-flex">
                      <input
                        type="text"
                        className="vi_0"
                        placeholder="Enter The question"
                      />
                      <p className="m-2">:</p>
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
              </div>
            </div>

            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option A)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                />
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>
            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option B)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                />
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>

            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option C)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                />
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>
            <div className="col-md-3">
              <div className="do-sear mt-2">
                <label htmlFor="">Option D)</label>
                <input
                  type="text"
                  className="vi_0"
                  placeholder="Enter The question"
                />
                {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
              </div>
            </div>

            <div className="col-md-12">
              <div className="do-sear mt-2">
                <div className="do-sear mt-2">
                  <label htmlFor="">Answer</label>
                  {/* <CKEditor editor={ClassicEditor} className="vi_0" /> */}
                  <input
                    type="text"
                    className="vi_0"
                    placeholder="Enter The question"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Marks</label>
                <Form.Select
                  aria-label="Default select example"
                  // onChange={(e) => {
                  //   setTypes_Question(e.target.value);
                  // }}
                >
                  <option>Select the Marks</option>
                  <option>1/2</option>
                  <option>1/4</option>
                  <option>1/3</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>10</option>
                </Form.Select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="do-sear mt-2">
                <label htmlFor=""> Answer Timing</label>
                <Form.Select
                  aria-label="Default select example"
                  // onChange={(e) => {
                  //   setTypes_Question(e.target.value);
                  // }}
                >
                  <option>Select the Time</option>
                  <option>1/2 Mnt</option>
                  <option>1/4 Mnt</option>
                  <option>1 mnt</option>
                  <option>1.30 minutes</option>
                  <option>2 minutes</option>
                  <option>3 minutes</option>
                  <option>4 minutes</option>
                  <option>5 minutes</option>
                  <option>6 minutes</option>
                  <option>7 minutes</option>
                  <option>8 minutes</option>
                  <option>9 minutes</option>
                  <option>10 minutes</option>
                </Form.Select>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          <div className="yoihjij text-center my-2 p-2 ">
            <Button className="modal-add-btn">Update</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRelationshipWord;

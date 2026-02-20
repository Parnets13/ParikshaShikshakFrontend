import React, { useEffect, useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
// import "../Admin/Admin.css";
import "../../Admin/Admin.css"
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function ViewDrawFigure() {


    const navigate = useNavigate();

  return (
    <div>
    <div className="box_1">
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> Examination Board</label>
                        <p
                           className="vi_0" 
                        >
                            the Board Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> Medium</label>
                        <p
                       className="vi_0" 
                        >
                            the Medium Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> Class</label>
                        <p
                          className="vi_0" 
                        >
                           the Class Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> Sub-Class</label>
                        <p
                           className="vi_0" 
                        >
                            the Sub-Class Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> Subject</label>
                        <p
                            className="vi_0" 
                        >
                            the Subject Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor="">Subject Part</label>
                        <p
                           className="vi_0" 
                        >
                            Selete the Lesson Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> Chapter Name</label>
                        <p
                          className="vi_0" 
                        >
                             the Chapter Name Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> the Difficulty level of Paper</label>
                        <p
                           className="vi_0" 
                        >
                            the Difficulty level of Paper Will Show
                        </p>
                    </div>
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor="">Name Of the Examination</label>
                        <p
                           className="vi_0"  
                        >
                            the Name Of the Examination Will Show
                            
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <label htmlFor="">Objectives</label>
                    <p
                      className="vi_0"   
                    >
                        
                        Objectives Will Show
                    </p>
                </div>
                <div className="col-md-12">
                    <div className="do-sear mt-2">
                        <label htmlFor="">Question</label>
                        {/* <textarea
        name=""
        id=""
        cols="30"
        rows="5"
        className="vi_0"
      ></textarea> */}
                        <p                            
                            className="vi_0"                           
                        >
                            Question Will Show
                        </p>
                    </div>
                </div>
                {/* <div className="col-md-6">
    <div className="do-sear mt-2">
      <label htmlFor="">Option 1</label>
      <CKEditor
        editor={ClassicEditor}
        className="vi_0"
        data={Option_1}
        onChange={handleChange3}
      />
    </div>
  </div>
  <div className="col-md-6">
    <div className="do-sear mt-2">
      <label htmlFor="">Option 2</label>
      <CKEditor
        editor={ClassicEditor}
        className="vi_0"
        data={Option_2}
        onChange={handleChange4}
      />
    </div>
  </div>
  <div className="col-md-6">
    <div className="do-sear mt-2">
      <label htmlFor="">Option 3</label>
      <CKEditor
        editor={ClassicEditor}
        className="vi_0"
        data={Option_3}
        onChange={handleChange5}
      />
    </div>
  </div>
  <div className="col-md-6">
    <div className="do-sear mt-2">
      <label htmlFor="">Option 4</label>
      <CKEditor
        editor={ClassicEditor}
        className="vi_0"
        data={Option_4}
        onChange={handleChange6}
      />
    </div>
  </div> */}

                
                <div className="col-md-6">
                    <div className="do-sear mt-2">
                        <label htmlFor=""> Marks</label>
                        <p
                        className="vi_0"
                           
                        >
                           Marks Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear">
                        <label htmlFor="">Answer Time</label>
                        <p className="vi_0">
                        Answer Time Will Show
                        </p>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="do-sear">
                        <label htmlFor="">Image ( Answer-Figure)</label>
                        {/* <input
                            type="file"
                            className="vi_0"
                            onChange={(e) => setImage(e.target.files[0])}
                        /> */}
                        <img className="vi_0" alt=""/>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="do-sear mt-2">
                        <div className="do-sear mt-2">
                            <label htmlFor="">Answer</label>
                            <p
                             
                                className="vi_0"
                             
                            >
                                 Answer Will Show
                            </p>
                        </div>
                    </div>
                </div>
                {/* <div className="yoihjij my-4">
    <button style={{ float: "right" }}>Add</button>
  </div> */}
            </div>
        </div>

        <div className="yoihjij text-center my-2 p-2 ">
            <Button
                onClick={() => {
                   window.location.assign("/drawfigurelist")
                }}
                className="modal-add-btn"
            >
                Back
            </Button>
        </div>
    </div>



</div>
  )
}

export default ViewDrawFigure
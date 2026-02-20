import React, { useEffect, useState } from "react";
import {
  Button,
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
import "../../../Admin/Admin.css";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

const OneWordQuestion = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  const [show3, setShow3] = useState();
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);

  const [formdata, setformdata] = useState();
  //get
  const [Questions, setQuestions] = useState([]);

  //delete
  const [deleteA, setDeleteA] = useState("");

  //   Row Filter
  const [itempage, setItempage] = useState(5);

  //   DateRange Filter
  const [data, setData] = useState([]);
  const [startDate, setstartDate] = useState("");
  const [endDate, setendDate] = useState("");
  const filterData = () => {
    if (!startDate) return alert("Please select from date");
    if (!endDate) return alert("Please select to date");
    const filteredData = data.filter((item) => {
      const itemDate = new Date(item?.createdAt);
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      return itemDate >= startDateObj && itemDate <= endDateObj;
    });
    setData([...filteredData]);
  };

  // Search filter
  const [search, setSearch] = useState("");
  const handleFilter = (e) => {
    if (e.target.value != "") {
      setSearch(e.target.value);
      const filterTable = data.filter((o) =>
        Object.keys(o).some((k) =>
          String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
      setData([...filterTable]);
    } else {
      setSearch(e.target.value);
      setData([...data]);
    }
  };

  return (
    <div>
      <div className="col-lg-4 d-flex justify-content-center">
        <div class="input-group ">
          <span class="input-group-text" id="basic-addon1">
            <BsSearch />
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search..."
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
      <div className="customerhead p-2 mt-4">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">One word Questions</h2>
          <button
            className="admin-add-btn"
            onClick={() => {
              navigate("/addonewordquestion");
            }}
          >
            Add One word Questions
          </button>
        </div>

        <div className="">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available", textAlign: "center" }}
          >
            <thead style={{ backgroundColor: "orange" }}>
              <tr>
                <th>S.No</th>
                <th>Board</th>
                <th>Medium</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Subject Part</th>
                <th>Sub-Class</th>

                <th>
                  <div>View</div>
                </th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              <td>sss</td>
              <td>sss</td>
              <td>sss</td>
              <td>sss</td>
              <td>sss</td>
              <td>sss</td>

              <td>sss</td>

              <td>
                <FaEye
                  color="blue"
                  onClick={() => {
                    navigate(`/viewonewordquestion`);
                  }}
                />
              </td>

              <td>
                {" "}
                <div style={{ display: "flex", gap: "20px" }}>
                  <div>
                    <BiSolidEdit
                      className="text-success"
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      onClick={() => {
                        // setupdateQuestion();
                        navigate("/editonewordquestion");
                      }}
                    />
                  </div>
                  <div>
                    <AiFillDelete
                      className="text-danger"
                      style={{ cursor: "pointer", fontSize: "20px" }}
                      onClick={() => {
                        handleShow2();
                      }}
                    />{" "}
                  </div>
                </div>
              </td>
            </tbody>
          </Table>
        </div>
      </div>

      {/* delete modal  */}
      <Modal show={show2} onHide={handleClose2} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
          <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-12">
              <p className="fs-4" style={{ color: "red" }}>
                Are you sure you want to delete this data?
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="modal-close-btn" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="" className="modal-add-btn">
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OneWordQuestion;

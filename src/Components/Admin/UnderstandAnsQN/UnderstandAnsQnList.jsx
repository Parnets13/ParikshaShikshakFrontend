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
import "../../Admin/Admin.css";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

function UnderstandAnsQnList() {
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

  const getAllQuestions = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/getAllQuestionAdmin/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
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
  // get

  //update
  const [updateQuestion, setupdateQuestion] = useState("");

  const UpdateQuestion = async () => {
    try {
      const config = {
        url: "/admin/UpdateQuestionPaper" + updateQuestion + "/" + admin?._id,
        method: "put",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose1();
        getAllQuestions();
        return swal({
          title: "Yeah!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
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
  //delete
  const [deleteA, setDeleteA] = useState("");
  const DeleteQuestion = async () => {
    try {
      const config = {
        url: "/admin/deleteQuestionPaper" + deleteA + "/" + admin?._id,
        method: "delete",
        baseURL: "http://localhost:8774/api",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        handleClose2();
        getAllQuestions();
        return swal({
          title: "Yeah!",
          text: res.data.success,
          icon: "success",
          button: "Ok!",
        });
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
  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 5;
  const visitedPage = pageNumber * productPerPage;
  const displayPage = data.slice(visitedPage, visitedPage + productPerPage);
  const pageCount = Math.ceil(data.length / productPerPage);
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

  useEffect(() => {
    getAllQuestions();
  }, []);
  console.log(Questions);
  return (
    <>
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
          <h2 className="header-c ">Add Questions</h2>
          <button
            className="admin-add-btn"
            onClick={() => {
              navigate("/addunderstandansqn");
            }}
          >
            Add Questions
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
                <th>Section</th>
                <th>Board</th>
                <th>Medium</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Sub-Class</th>
                <th>Types of Question</th>

                <th>
                  <div>View</div>
                </th>

                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Questions?.map((val, i) => {
                return (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{val?.Section}</td>
                    <td>{val?.Board}</td>
                    <td>{val?.Medium}</td>
                    <td>{val?.Class}</td>
                    <td>{val?.Subject}</td>
                    <td>{val?.Sub_Class}</td>
                    <td>{val?.Types_Question}</td>

                    <td>
                      <FaEye
                        color="blue"
                        onClick={() => {
                          navigate(`/viewunderstandansqn/${val?._id}`);
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
                              setupdateQuestion();
                              navigate("/editunderstandansqn");
                            }}
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setDeleteA();
                              handleShow2();
                            }}
                          />{" "}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* <Pagination style={{ float: "right" }}>
        <Pagination.First onClick={() => setPageNumber(0)} />
        <Pagination.Prev
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 0))}
        />
        {Array.from({ length: pageCount }, (_, index) => (
          <Pagination.Item
            key={index}
            active={index === pageNumber}
            onClick={() => setPageNumber(index)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
        <Pagination.Next
          onClick={() =>
            setPageNumber((prev) => Math.min(prev + 1, pageCount - 1))
          }
        />
        <Pagination.Last onClick={() => setPageNumber(pageCount - 1)} />
      </Pagination> */}
        {/* Add Package modal */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header style={{ backgroundColor: "orange" }}>
            <Modal.Title style={{ color: "white" }}>
              Add About Us Points{" "}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row"></div>
            <div className="do-sear mt-2">
              <label> Image</label>
              <input type="file" name="" id="" className="vi_0" />
            </div>
            <div className="do-sear mt-2">
              <label>Description</label>
              <CKEditor
                editor={ClassicEditor}
                className="vi_0"
                // data={lodingdetails}
                // onChange={(event, editor) => {
                //   const data = editor.getData();
                //   setlodingdetails(data);
                // }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex">
              <Button className="mx-2 modal-close-btn" variant="">
                Cancel
              </Button>
              <Button className="mx-2 modal-add-btn" variant="">
                Add
              </Button>
            </div>
          </Modal.Footer>
        </Modal>

        {/* Edit Package modal */}
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header style={{ backgroundColor: "orange" }}>
            <Modal.Title style={{ color: "white" }}>
              Edit Service List
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row"></div>
            <div className="do-sear mt-2">
              <label> Image</label>
              <input type="file" name="" id="" className="vi_0" />
            </div>
            <div className="do-sear mt-2">
              <label>Description</label>
              <CKEditor
                editor={ClassicEditor}
                className="vi_0"
                // data={lodingdetails}
                // onChange={(event, editor) => {
                //   const data = editor.getData();
                //   setlodingdetails(data);
                // }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose1}>
              Close
            </Button>
            <Button variant="primary" style={{ backgroundColor: "#FAFA33" }}>
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
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
            <Button
              variant=""
              className="modal-close-btn"
              onClick={handleClose2}
            >
              Close
            </Button>
            <Button variant="" className="modal-add-btn">
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={show3} onHide={handleClose3}>
          <Modal.Header closeButton style={{ backgroundColor: "orange" }}>
            <Modal.Title style={{ color: "white" }}>Images</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-12">
                <img
                  src="/bg.jpg"
                  alt=""
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                />
                <img
                  src="/bg.jpg"
                  alt=""
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                />
                <img
                  src="/bg.jpg"
                  alt=""
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                />
                <img
                  src="/bg.jpg"
                  alt=""
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                />
                <img
                  src="/bg.jpg"
                  alt=""
                  style={{
                    width: "200px",
                    marginLeft: "20px",
                    marginTop: "20px",
                  }}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose3}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default UnderstandAnsQnList;

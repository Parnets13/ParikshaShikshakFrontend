import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  FormSelect,
  Modal,
  Pagination,
  Table,
} from "react-bootstrap";
import "../Admin/Admin.css";
import { AiFillDelete } from "react-icons/ai";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import Button2 from "../Button2";
import { Link } from "react-router-dom";

const AccountHistory = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const [status, setstatus] = useState("");
  const [title, settitle] = useState("");
  const [Pay_Amount, setPay_Amount] = useState("");
  const [date, setdate] = useState("");
  const [Pay_mode, setPay_mode] = useState("");
  const [TeacherID, setTeacherID] = useState("");

  // post
  const AddAccountHistory = async () => {
    try {
      const config = {
        url: "admin/AddAccount",
        baseURL: "http://localhost:8774/api/",
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          Pay_id: "756454652323",
          status: status,
          title: title,
          Pay_Amount: Pay_Amount,
          date: date,
          Pay_mode: Pay_mode,
          teacherId: TeacherID,
          authId: admin?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose();
        getaccounthistory();
      }
    } catch (error) {
      alert(error.response.data.errorr);
    }
  };

  const handleClose1 = () => setShow1(false);
  const handleShow1 = (item) => {
    setShow1(true);
    setEditData(item);
  };
  const [EditData, setEditData] = useState("");
  const EditAccountHistory = async () => {
    try {
      const config = {
        url: "admin/EditAccount/" + EditData?._id,
        baseURL: "http://localhost:8774/api/",
        method: "put",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          Pay_id: "756454652323",
          status: status,
          title: title,
          Pay_Amount: Pay_Amount,
          date: date,
          Pay_mode: Pay_mode,
          teacherId: TeacherID,
          authId: admin?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose1();
        getaccounthistory();
      }
    } catch (error) {
      alert(error.response.data.errorr);
    }
  };

  // Delete history
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (item) => {
    setShow2(true);
    setdeleteData(item);
  };
  const [deleteData, setdeleteData] = useState("");
  const DeleteAccountHistory = async () => {
    try {
      const config = {
        url: "admin/DeleteAccount/" + deleteData?._id,
        baseURL: "http://localhost:8774/api/",
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          authId: admin?._id,
        },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose2();
        getaccounthistory();
      }
    } catch (error) {
      alert(error.response.data.errorr);
    }
  };

  // get account history
  const [accHitory, setaccHitory] = useState([]);
  const getaccounthistory = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/getAllAcountHistory/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setaccHitory(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get
  const [Teacher, setTeacher] = useState([]);
  const getAllTeacher = async () => {
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/getAllTeachers/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setTeacher(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTeacher();
    getaccounthistory();
  }, []);

  return (
    <div className="customerhead p-2">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="header-c ">Account History</h2>

        <Link onClick={handleShow}>
          <Button2 text={"Add Account History"} />
        </Link>
      </div>

      <div className="mb-3">
        <Table responsive bordered style={{ width: "-webkit-fill-available" }}>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Teacher ID</th>
              <th>Title</th>
              <th>Payment Mode</th>
              <th>Payment Id</th>
              <th>Payment Date</th>
              <th>Status</th>
              <th>Aciton</th>
            </tr>
          </thead>

          <tbody>
            {accHitory?.map((item, i) => (
              <>
                <tr>
                  <td>{i + 1}</td>
                  <td>{item?.teacherId?.FirstName}</td>
                  <td>{item?.teacherId?.teacherId}</td>
                  <td>{item?.title}</td>
                  <td>{item?.Pay_mode}</td>
                  <td>{item?.Pay_id}</td>
                  <td>{item?.date}</td>
                  <td>{item?.status}</td>
                  <td>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <div>
                        <FaEdit
                          className="text-success"
                          // style={{cursor : 'pointer'}}
                          role="button"
                          onClick={() => handleShow1(item)}
                        />
                      </div>
                      <div>
                        <AiFillDelete
                          className="text-danger"
                          style={{ cursor: "pointer", fontSize: "20px" }}
                          onClick={() => {
                            handleShow2(item);
                          }}
                        />{" "}
                      </div>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </Table>
      </div>

      <Pagination style={{ float: "right" }}>
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
      </Pagination>

      {/* Add Package modal */}
      <Modal show={show} onHide={handleClose} style={{ zIndex: "99999" }}>
        <Modal.Header closeButton style={{ backgroundColor: "#26AAE0" }}>
          <Modal.Title style={{ color: "white" }}>
            Add Account History
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Teacher</label>
              <FormSelect onChange={(e) => setTeacherID(e.target.value)}>
                <option value="Select">Select</option>
                {Teacher?.map((ele) => (
                  <option value={ele?._id}>{ele?.FirstName}</option>
                ))}
              </FormSelect>
            </div>
            <div className="do-sear mt-2">
              <label>Payment Mode</label>
              <FormSelect onChange={(e) => setPay_mode(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Online Payment">Online Payment</option>
                <option value="Cash">Cash</option>
              </FormSelect>
            </div>
            <div className="do-sear mt-2">
              <label>Payment Date & Time</label>
              <input
                onChange={(e) => setdate(e.target.value)}
                type="date"
                placeholder="Enter Date"
                className="vi_0"
              />
            </div>
            <div className="do-sear mt-2">
              <label>Amount</label>
              <input
                onChange={(e) => setPay_Amount(e.target.value)}
                type="text"
                placeholder="Amount"
                className="vi_0"
              />
            </div>
            <div className="do-sear mt-2">
              <label>Title</label>
              <input
                onChange={(e) => settitle(e.target.value)}
                type="text"
                placeholder="Title"
                className="vi_0"
              />
            </div>
            <div className="do-sear mt-2">
              <label>Select Status</label>
              <FormSelect onChange={(e) => setstatus(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </FormSelect>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex">
            <Button
              className="mx-2 modal-close-btn"
              variant=""
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="mx-2 modal-add-btn"
              variant=""
              onClick={AddAccountHistory}
            >
              Add
            </Button>
          </div>
        </Modal.Footer>
      </Modal>

      {/* Edit Package modal */}
      <Modal
        show={show1}
        onHide={handleClose1}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "rgb(40 167 223)" }}
        >
          <Modal.Title style={{ color: "white" }}>Edit UserList</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="do-sear mt-2">
              <label>Teacher</label>
              <FormSelect onChange={(e) => setTeacherID(e.target.value)}>
                <option value="Select">Select</option>
                {Teacher?.map((ele) => (
                  <option value={ele?._id}>{ele?.FirstName}</option>
                ))}
              </FormSelect>
            </div>
            <div className="do-sear mt-2">
              <label>Payment Mode</label>
              <FormSelect onChange={(e) => setPay_mode(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Online Payment">Online Payment</option>
                <option value="Cash">Cash</option>
              </FormSelect>
            </div>
            <div className="do-sear mt-2">
              <label>Payment Date & Time</label>
              <input
                onChange={(e) => setdate(e.target.value)}
                type="date"
                placeholder="Enter Date"
                className="vi_0"
              />
            </div>
            <div className="do-sear mt-2">
              <label>Amount</label>
              <input
                onChange={(e) => setPay_Amount(e.target.value)}
                type="text"
                placeholder="Amount"
                className="vi_0"
              />
            </div>
            <div className="do-sear mt-2">
              <label>Title</label>
              <input
                onChange={(e) => settitle(e.target.value)}
                type="text"
                placeholder="Title"
                className="vi_0"
              />
            </div>
            <div className="do-sear mt-2">
              <label>Select Status</label>
              <FormSelect onChange={(e) => setstatus(e.target.value)}>
                <option value="Select">Select</option>
                <option value="Credit">Credit</option>
                <option value="Debit">Debit</option>
              </FormSelect>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="" className="modal-close-btn" onClick={handleClose1}>
            Close
          </Button>
          <Button
            variant=""
            className="modal-add-btn"
            onClick={EditAccountHistory}
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
        style={{ zIndex: "99999" }}
      >
        <Modal.Header closeButton>
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
          <Button
            variant=""
            className="modal-add-btn"
            onClick={DeleteAccountHistory}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountHistory;

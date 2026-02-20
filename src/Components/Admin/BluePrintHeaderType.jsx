import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import "../Admin/Admin.css";
import axios from "axios";
import swal from "sweetalert";
import { debounce } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaRegEye } from "react-icons/fa";
import Button2 from "../Button2";

function BluePrintHeaderType() {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (item) => {
    setShow2(true);
    setdeletData(item);
  };

  const [GetbluePrintHeader, setGetbluePrintHeader] = useState([]);
  const getBluePrintHeader = async () => {
    try {
      let res = await axios.get(
        "http://localhost:8774/api/admin/getblueprintheader"
      );
      if (res.status == 200) {
        setGetbluePrintHeader(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [deletData, setdeletData] = useState("");
  const DeletBluePrintHeader = async () => {
    try {
      const config = {
        url: "/admin/DeleteBluePrintHeader/" + deletData?._id,
        baseURL: "http://localhost:8774/api",
        method: "delete",
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios(config);
      if (res.status === 200) {
        alert(res.data.success);
        handleClose2();
        getBluePrintHeader();
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  useEffect(() => {
    getBluePrintHeader();
  }, []);

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
      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c ">Blue Print Format</h2>
          <Link to="/adminblueprintheader" className="text-decoration-none">
            <Button2 text={"Add Blue Print Type"} />
          </Link>
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead>
              <tr>
                <th>S.No</th>
                <th>
                  <div>Medium</div>
                </th>
                <th>
                  <div>Blue Print Format</div>
                </th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {GetbluePrintHeader?.map((item, i) => (
                <>
                  <tr>
                    <td>{i + 1}</td>
                    <td>{item?.selectedMedium}</td>
                    <td className="text-center">
                      <Link
                        state={{ item: item }}
                        to="/adminblueprintheaderview"
                      >
                        <FaRegEye className="text-success fw-bold fs-5" />
                      </Link>
                    </td>
                    <td>
                      {" "}
                      <div style={{ display: "flex", gap: "20px" }}>
                        <div>
                          <Link
                            state={{ item: item }}
                            to="/adminblueprintheaderedit"
                          >
                            <FaEdit className="text-success" />
                          </Link>
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              // setQuestionTypeId(item);
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
                  Are you sure...! You want to delete this data..?
                </p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose2}>
              Close
            </Button>
            <Button
              variant=""
              className="modal-add-btn"
              onClick={DeletBluePrintHeader}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default BluePrintHeaderType;

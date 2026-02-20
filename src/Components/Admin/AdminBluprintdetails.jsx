  import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import "../Admin/Admin.css";
import { IoSearch } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import Button2 from "../Button2";

const AdminBlueprintdetails = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");
  const [show, setShow] = useState();
  const [show1, setShow1] = useState();
  const [show2, setShow2] = useState();
  const [show3, setShow3] = useState();
  const [loading, setLoading] = useState(true); // Added loader state
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleClose3 = () => setShow3(false);
  const handleShow3 = () => setShow3(true);
  //   Row Filter
  const [itempage, setItempage] = useState(10);

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
  // get method   for blue print

  const [blueprint, setblueprint] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [Classname, setClassname] = useState("");
  const [subclass, setSub_classname] = useState("");
  // Enhanced Pagination (server-side driven)
  const [currenpage, setCurrentpage] = useState(1);

  const getallblueprint = async (page = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", itempage);
      if (search) params.set("search", search);
      if (Classname) params.set("className", Classname);
      if (subclass) params.set("subClassName", subclass);

      let res = await axios.get(
        `http://localhost:8774/api/admin/blueprints?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 && res.data?.success) {
        setblueprint(res.data.data || []);
        setTotalPages(res.data.pagination?.pages || 1);
        setTotalItems(res.data.pagination?.total || 0);
        setLoading(false);
      } else {
        setblueprint([]);
        setTotalPages(1);
        setTotalItems(0);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      swal({
        title: "Oops!",
        text: error?.response?.data?.error || "Failed to load blueprints",
        icon: "error",
        dangerMode: true,
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getallblueprint(currenpage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currenpage, itempage, Classname, subclass]);
  console.log("blueprint check now", blueprint);

  const [deleteId, setdeleteId] = useState("");

  const makedeleteblueprint = async () => {
    try {
      setLoading(true); // Show loader during deletion
      let data = await axios.delete(
        "http://localhost:8774/api/admin/deleteBLUEPRINT/" +
          deleteId +
          "/" +
          admin?._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.status == 200) {
        swal({
          title: "Success!",
          text: data.data.success,
          icon: "success",
          dangerMode: true,
        });
        handleClose2();
        getallblueprint();
      }
    } catch (error) {
      setLoading(false); 
      swal({
        title: "Oops!",
        text: error.response.data.error,
        icon: "error",
        dangerMode: true,
      });
      console.log(error);
    }
  };

  const records = blueprint;
  const npages = totalPages;
  
  // Calculate page numbers to display (show up to 5 pages at a time)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (npages <= maxVisiblePages) {
      for (let i = 1; i <= npages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = currenpage - half;
      let end = currenpage + half;
      
      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }
      
      if (end > npages) {
        end = npages;
        start = npages - maxVisiblePages + 1;
      }
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) {
          pages.push('...');
        }
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < npages) {
        if (end < npages - 1) {
          pages.push('...');
        }
        pages.push(npages);
      }
    }
    
    return pages;
  };

  function changePage(id) {
    if (id !== '...') {
      setCurrentpage(id);
    }
  }

  function prevpage() {
    if (currenpage > 1) {
      setCurrentpage(currenpage - 1);
    }
  }

  function nextpage() {
    if (currenpage < npages) {
      setCurrentpage(currenpage + 1);
    }
  }

  const [getaddsubclass, setgetaddsubclass] = useState([]);
  const getaddsubclasss = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8774/api/admin/getAllSubClass"
      );
      if (res.status == 200) {
        setgetaddsubclass(res.data.success);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const uniqueClassNamesSet = new Set(
    getaddsubclass.map((item) => item.className)
  );
  const uniqueClassNamesArray = Array.from(uniqueClassNamesSet);
  useEffect(() => {
    getaddsubclasss();
  }, []);
  

  const makeApprovedAndHold = async (id, isBlock) => {
    try {
      setLoading(true); // Show loader during status change
      const config = {
        url: "/admin/makeBlockAndUnblockBLUEPRINTs",
        baseURL: "http://localhost:8774/api",
        method: "put",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          id,
          isBlock,
          authId: admin?._id,
        },
      };
      let res = await axios(config);
      if (res.status == 200) {
        swal({
          title: "Success!",
          text: res.data.success,
          icon: "success",
          dangerMode: true,
        });
        getallblueprint();
      }
    } catch (error) {
      setLoading(false); // Hide loader on error
      console.log(error);
    }
  };

  return (
    <>
      {/* Loader */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}

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
            value={search}
            onChange={(e)=>{ setSearch(e.target.value); setCurrentpage(1); }}
            onKeyDown={(e)=>{ if(e.key==='Enter'){ getallblueprint(1);} }}
          />
        </div>
      </div>
      <div className="customerhead p-2 mt-4">
        <h2 className="header-c ">Blue Print Details</h2>
        <div className="container">
          <div className="row mb-4">
            <div className="col-md-4">
              <label htmlFor="">Select Class</label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setClassname(e.target.value);
                }}
              >
                <option value="">Select Class</option>
                {uniqueClassNamesArray?.map((val, i) => {
                  return (
                    <option value={val} key={i}>
                      {val}
                    </option>
                  );
                })}
              </Form.Select>
            </div>
            <div className="col-md-4">
              <label htmlFor="">Select Sub Class</label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setSub_classname(e.target.value);
                }}
              >
                <option value="">Select Sub Class</option>
                {getaddsubclass
                  ?.filter((ele) => ele.className === Classname)
                  ?.map((val, i) => {
                    return (
                      <option value={val?.subclassName} key={i}>
                        {val?.subclassName}
                      </option>
                    );
                  })}
              </Form.Select>
            </div>
            <div className="col-md-4">
              <div
                style={{ float: "right" }}
                onClick={() => {
                  navigate("/adminblueprint");
                }}
              >
                <Button2 text={"Add Blue Print"} />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          
        </div>

        <div className="mb-3">
          <Table
            responsive
            bordered
            style={{ width: "-webkit-fill-available" }}
          >
            <thead style={{ backgroundColor: "orange" }}>
              <tr>
                <th>S.No</th>
                <th>Blueprint Id</th>
                <th>
                  <div>Board</div>
                </th>
                <th>
                  <div>Medium</div>
                </th>
                <th>
                  <div>Class</div>
                </th>
                <th>
                  <div>Sub-Class</div>
                </th>
                <th>
                  {" "}
                  <div>Subject</div>
                </th>
                 <th>
                  {" "}
                  <div>Exame Name</div>
                </th>
                <th>
                  {" "}
                  <div>Price</div>
                </th>
                <th>
                  <div>View</div>
                </th>
                <th>
                  <div>Status</div>
                </th>
                <th>
                  {" "}
                  <div>Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {records?.length > 0 ? (
                records.map((val, i) => {
                  return (
                    <tr key={i}>
                      <td>{(currenpage - 1) * itempage + i + 1}</td>
                      <td>{val?.blueprintId}</td>
                      <td>{val?.board}</td>
                      <td>{val?.medium}</td>
                      <td>{val?.className}</td>
                      <td>{val?.SubClassName}</td>
                      <td>{val?.subjects}</td>
                        <td>{val?.ExameName}</td>
                      <td>{val?.price?.toFixed(2)}</td>
                      <td>
                        <Link
                          to={`/adminblueprintdetailsview/${val?._id}`}
                          style={{ textDecoration: "none", color: "white" }}
                        >
                          <FaEye color="blue" />
                        </Link>
                      </td>
                      <td>
                        {val.isBlock == true ? (
                          <span style={{ color: "green" }}>Approved</span>
                        ) : (
                          <span style={{ color: "red" }}>Holded</span>
                        )}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: "20px" }}>
                          <div>
                            <BiSolidEdit
                              className="text-success"
                              style={{ cursor: "pointer", fontSize: "20px" }}
                              onClick={() => {
                                navigate(`/admineditblueprint`, { state: val });
                              }}
                            />
                          </div>
                          <div>
                            <AiFillDelete
                              className="text-danger"
                              style={{ cursor: "pointer", fontSize: "20px" }}
                              onClick={() => {
                                setdeleteId(val?._id);
                                handleShow2();
                              }}
                            />{" "}
                          </div>
                          <div>
                            {val?.isBlock == false ? (
                              <button
                                type="button"
                                class="btn btn-success"
                                onClick={() =>
                                  makeApprovedAndHold(val?._id, true)
                                }
                                disabled={loading}
                              >
                                Approved
                              </button>
                            ) : (
                              <button
                                type="button"
                                class="btn btn-danger"
                                onClick={() =>
                                  makeApprovedAndHold(val?._id, false)
                                }
                                disabled={loading}
                              >
                                Hold
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="12" className="text-center">
                    {loading ? 'Loading...' : 'No data found'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Enhanced Pagination */}
        {npages > 1 && (
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currenpage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={prevpage} disabled={currenpage === 1}>
                    &laquo;
                  </button>
                </li>
                
                {getPageNumbers().map((page, index) => (
                  <li 
                    key={index} 
                    className={`page-item ${page === currenpage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
                  >
                    <button 
                      className="page-link" 
                      onClick={() => changePage(page)}
                      disabled={page === '...'}
                    >
                      {page}
                    </button>
                  </li>
                ))}
                
                <li className={`page-item ${currenpage === npages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={nextpage} disabled={currenpage === npages}>
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Edit Package modal */}
        <Modal show={show1} onHide={handleClose1} style={{ zIndex: "99999" }}>
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
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose1}>
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
            <Button
              variant=""
              className="modal-add-btn"
              onClick={makedeleteblueprint}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
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
            <Button variant="danger" onClick={handleClose3}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Add CSS for loader */}
        <style>
          {`
            .loader-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.5);
              display: flex;
              justify-content: center;
              align-items: center;
              z-index: 9999;
            }
            
            .loader-spinner {
              border: 5px solid #f3f3f3;
              border-top: 5px solid #3498db;
              border-radius: 50%;
              width: 50px;
              height: 50px;
              animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            /* Enhanced pagination styles */
            .pagination {
              margin-top: 20px;
            }
            
            .page-item.active .page-link {
              background-color: orange;
              border-color: orange;
              color: white;
            }
            
            .page-link {
              color: orange;
              cursor: pointer;
            }
            
            .page-item.disabled .page-link {
              color: #6c757d;
              pointer-events: none;
              cursor: not-allowed;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default AdminBlueprintdetails;
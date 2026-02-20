import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import "../Admin/Admin.css";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import swal from "sweetalert";
import moment from "moment";
import { FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserGenratedQuestion = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // State for data and pagination
  const [Teacher, setTeacher] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalRecords: 0,
    hasNextPage: false,
    hasPrevPage: false,
    recordsPerPage: 10
  });

  // State for filters
  const [filters, setFilters] = useState({
    search: "",
    startDate: "",
    endDate: "",
    status: "",
    board: "",
    class: "",
    medium: ""
  });

  // Debounce hook for search
  const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  const debouncedSearch = useDebounce(filters.search, 500);

  // Get all generated question papers with server-side pagination
  const getAllGenQuestionPaper = async (page = 1, resetPage = false) => {
    try {
      setLoading(true);

      // Build query parameters
      const queryParams = new URLSearchParams({
        page: resetPage ? 1 : page,
        limit: pagination.recordsPerPage,
        search: filters.search,
        startDate: filters.startDate,
        endDate: filters.endDate,
        status: filters.status,
        board: filters.board,
        class: filters.class,
        medium: filters.medium
      });

      // Remove empty parameters
      for (let [key, value] of queryParams.entries()) {
        if (!value) {
          queryParams.delete(key);
        }
      }

      let res = await axios.get(
        `http://localhost:8774/api/teacher/getAllGenQuestionPaperfilter/${admin?._id}?${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setTeacher(res.data.success);
        setPagination(res.data.pagination);
        setTimeout(() => setLoading(false), 500);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const value = e.target.value;
    setFilters(prev => ({ ...prev, search: value }));
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      search: "",
      startDate: "",
      endDate: "",
      status: "",
      board: "",
      class: "",
      medium: ""
    });
  };
const filterData = () => {
    if (!filters.startDate) return alert("Please select from date");
    if (!filters.endDate) return alert("Please select to date");
    getAllGenQuestionPaper(1, true);
  };

  // Delete functionality
  const [delteacher, setdelteacher] = useState("");
  const DeleteTeacher = async () => {
    try {
      setLoading(true);
      let res = await axios.delete(
        `http://localhost:8774/api/teacher/deleteGenQuestionPaper/${delteacher}/${admin?._id}`,
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        handleClose2();
        getAllGenQuestionPaper(pagination.currentPage);
        return swal({
          title: "Delete!",
          text: res.data.success,
          icon: "success",
          button: "OK!",
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal({
        title: "Error!",
        text: error.response?.data?.error || "Something went wrong",
        icon: "error",
        button: "OK!",
      });
    }
  };

  // Pagination functions
  const changePage = (page) => {
    if (page !== '...') {
      getAllGenQuestionPaper(page);
    }
  };

  const prevPage = () => {
    if (pagination.hasPrevPage) {
      getAllGenQuestionPaper(pagination.currentPage - 1);
    }
  };

  const nextPage = () => {
    if (pagination.hasNextPage) {
      getAllGenQuestionPaper(pagination.currentPage + 1);
    }
  };

  // Get page numbers for enhanced pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = currentPage - half;
      let end = currentPage + half;

      if (start < 1) {
        start = 1;
        end = maxVisiblePages;
      }

      if (end > totalPages) {
        end = totalPages;
        start = totalPages - maxVisiblePages + 1;
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

      if (end < totalPages) {
        if (end < totalPages - 1) {
          pages.push('...');
        }
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Effect for initial load
  useEffect(() => {
    getAllGenQuestionPaper();
  }, []);

  // Effect for debounced search
  useEffect(() => {
    if (debouncedSearch !== filters.search) return;
    getAllGenQuestionPaper(1, true);
  }, [debouncedSearch]);

  // Effect for other filters (except search and date)
  useEffect(() => {
    getAllGenQuestionPaper(1, true);
  }, [filters.status, filters.board, filters.class, filters.medium]);

  return (
    <>
      {/* Loader */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}

      {/* Filters Section */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search Bar (Left) */}
        <div className="d-flex align-items-center" style={{ flex: 1 }}>
          <div className="input-group w-100" style={{ maxWidth: '300px' }}>
            <span className="input-group-text" id="basic-addon1">
              <BsSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              aria-describedby="basic-addon1"
              value={filters.search}
              onChange={handleSearch}
            />
          </div>
        </div>

        {/* Date Filters + Buttons (Right) */}
        <div className="d-flex align-items-center gap-2">
          <input
            type="date"
            className="form-control"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            placeholder="From Date"
          />
          <input
            type="date"
            className="form-control"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            placeholder="To Date"
          />
          <Button onClick={filterData} variant="primary">
            Filter
          </Button>
          <Button onClick={clearFilters} variant="secondary">
            Clear
          </Button>
        </div>
      </div>

      {/* Additional Filters Row */}
      <div className="d-flex gap-2 mb-3">
        <select 
          className="form-select"
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Not Completed the Steps">Not Completed</option>
          <option value="In Progress">In Progress</option>
        </select>

        <input
          type="text"
          className="form-control"
          placeholder="Filter by Board"
          value={filters.board}
          onChange={(e) => handleFilterChange('board', e.target.value)}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Filter by Class"
          value={filters.class}
          onChange={(e) => handleFilterChange('class', e.target.value)}
        />

        <input
          type="text"
          className="form-control"
          placeholder="Filter by Medium"
          value={filters.medium}
          onChange={(e) => handleFilterChange('medium', e.target.value)}
        />
      </div>

      <div className="customerhead p-2">
        <div className="d-flex justify-content-between align-items-center">
          <h2 className="header-c">User Generated Question List</h2>
          <small className="text-muted">
            Showing {Teacher.length} of {pagination.totalRecords} records
          </small>
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
                <th>Paper ID</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Institute Name</th>
                <th>Board</th>
                <th>Class</th>
                <th>Medium</th>
                <th>Exam Date/Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {Teacher?.length > 0 ? (
                Teacher.map((item, i) => (
                  <tr key={item._id || i}>
                    <td>{((pagination.currentPage - 1) * pagination.recordsPerPage) + i + 1}</td>
                    <td>{item?.paperId}</td>
                    <td>{item?.teacherId?.teacherId}</td>
                    <td>
                      {item?.teacherId?.FirstName} {item?.teacherId?.LastName}
                    </td>
                    <td>
                      {item?.School_Logo && (
                        <a
                          href={`${item?.School_Logo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={`${item?.School_Logo}`}
                            alt="School Logo"
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                              float: "left",
                              marginRight: "10px",
                            }}
                          />
                        </a>
                      )}
                      {item?.Institute_Name}
                    </td>
                    <td>{item?.Board}</td>
                    <td>{item?.Class}</td>
                    <td>{item?.Medium}</td>
                    <td>
                      {moment(item?.Test_Date).format("DD/MM/YYYY")}{" "}
                      {item?.ExamTime}
                    </td>
                    <td>
                      <div>
                        {item?.status === "Not Completed the Steps" ? (
                          <span style={{ color: "red" }}>{item?.status}</span>
                        ) : item?.status === "Completed" ? (
                          <span style={{ color: "green" }}>{item?.status}</span>
                        ) : (
                          <span style={{ color: "blue" }}>{item?.status}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          padding: "10px",
                        }}
                      >
                        <div>
                          <FaRegEye
                            style={{
                              cursor: "pointer",
                              fontSize: "15px",
                              color: "green",
                            }}
                            onClick={() =>
                              navigate("/admincoverpage?id=" + item._id)
                            }
                          />
                        </div>
                        <div>
                          <AiFillDelete
                            className="text-danger"
                            style={{ cursor: "pointer", fontSize: "20px" }}
                            onClick={() => {
                              setdelteacher(item?._id);
                              handleShow2();
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center">
                    {loading ? 'Loading...' : 'No data found'}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Enhanced Server-Side Pagination */}
        {pagination.totalPages > 1 && (
          <div className="d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className={`page-item ${!pagination.hasPrevPage ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={prevPage} 
                    disabled={!pagination.hasPrevPage}
                  >
                    &laquo;
                  </button>
                </li>

                {getPageNumbers().map((page, index) => (
                  <li
                    key={index}
                    className={`page-item ${page === pagination.currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
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

                <li className={`page-item ${!pagination.hasNextPage ? 'disabled' : ''}`}>
                  <button 
                    className="page-link" 
                    onClick={nextPage} 
                    disabled={!pagination.hasNextPage}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Delete Confirmation Modal */}
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
              onClick={DeleteTeacher}
              disabled={loading}
            >
              {loading ? 'Deleting...' : 'Delete'}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* CSS Styles */}
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
          
          .pagination {
            margin-top: 20px;
          }
          
          .page-item.active .page-link {
            background-color: #007bff;
            border-color: #007bff;
          }
          
          .page-link {
            color: #007bff;
            cursor: pointer;
          }
          
          .page-item.disabled .page-link {
            color: #6c757d;
            pointer-events: none;
            cursor: not-allowed;
          }

          .form-select, .form-control {
            min-width: 150px;
          }
        `}
      </style>
    </>
  );
};

export default UserGenratedQuestion;
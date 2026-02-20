 import React, { useEffect, useState } from "react";
import "../Admin/Admin.css";
import Card from "react-bootstrap/Card";
import { Button, Modal, Pagination, Table, Badge, Alert } from "react-bootstrap";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { FaFileAlt, FaCalendarAlt, FaUserGraduate } from "react-icons/fa";
import axios from "axios";
import moment from "moment";

const Dashboard = () => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const token = localStorage.getItem("token");

  // Modal states
  const [show2, setShow2] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  const [teachersLoading, setTeachersLoading] = useState(true);
  
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleCloseUserDetails = () => setShowUserDetails(false);
  const handleShowUserDetails = () => setShowUserDetails(true);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);
  const handleShowDeleteConfirm = () => setShowDeleteConfirm(true);

  // Data states
  const [Teacher, setTeacher] = useState([]);
  const [nochangedata, setnochangedata] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [userQuestionPapers, setUserQuestionPapers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  const [dashboardStats, setDashboardStats] = useState({
    totalUsers: 0,
    totalQuestionPapers: 0,
    totalSharedPapers: 0,
    totalSavedPapers: 0
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Show alert message
  const showAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Get dashboard overview (fast initial load)
  const getDashboardOverview = async () => {
    setDashboardLoading(true);
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/dashboard/getDashboardOverview/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setDashboardStats(prev => ({
          ...prev,
          ...res.data.success
        }));
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed to load dashboard overview", "danger");
    } finally {
      setDashboardLoading(false);
    }
  };

  // Get paginated teachers (optimized)
  const getTeachersPaginated = async (page = 1, search = "") => {
    setTeachersLoading(true);
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/dashboard/getTeachersPaginated/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            page,
            limit: usersPerPage,
            search,
            sortBy: 'createdAt',
            sortOrder: 'desc'
          }
        }
      );
      if (res.status === 200) {
        setTeacher(res.data.success.teachers);
        setnochangedata(res.data.success.teachers);
        setCurrentPage(res.data.success.pagination.currentPage);
        setTotalPages(res.data.success.pagination.totalPages);
        setTotalUsers(res.data.success.pagination.totalCount);
        // Update total users count
        setDashboardStats(prev => ({
          ...prev,
          totalUsers: res.data.success.pagination.totalCount
        }));
      }
    } catch (error) {
      console.log(error);
      showAlert("Failed to load users", "danger");
    } finally {
      setTeachersLoading(false);
    }
  };

  // Get dashboard statistics (detailed stats after initial load)
  const getDashboardStats = async () => {
    try {
      // Get detailed statistics
      let res = await axios.get(
        `http://localhost:8774/api/admin/dashboard/getDashboardStats/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.status === 200) {
        setDashboardStats(prev => ({
          ...prev,
          ...res.data.success
        }));
      }
    } catch (error) {
      console.log("Error fetching dashboard stats:", error);
    }
  };

  // Get user's generated question papers (optimized)
  const getUserQuestionPapers = async (teacherId) => {
    setLoading(true);
    try {
      let res = await axios.get(
        `http://localhost:8774/api/admin/dashboard/getUserActivity/${teacherId}/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.status === 200) {
        setUserQuestionPapers(res.data.success.questionPapers || []);
      }
    } catch (error) {
      console.log("Error fetching user question papers:", error);
      setUserQuestionPapers([]);
    } finally {
      setLoading(false);
    }
  };

  // Delete user
  const deleteUser = async () => {
    if (!userToDelete) return;
    
    setDeleteLoading(true);
    try {
      let res = await axios.delete(
        `http://localhost:8774/api/admin/deleteTeacher/${userToDelete._id}/${admin?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      if (res.status === 200) {
        showAlert("User deleted successfully");
        // Refresh the current page data
        getTeachersPaginated(currentPage, searchH);
        // Update dashboard stats
        setDashboardStats(prev => ({
          ...prev,
          totalUsers: prev.totalUsers - 1
        }));
        setTotalUsers(prev => prev - 1);
        handleCloseDeleteConfirm();
      }
    } catch (error) {
      console.log("Error deleting user:", error);
      showAlert("Failed to delete user", "danger");
    } finally {
      setDeleteLoading(false);
      setUserToDelete(null);
    }
  };

  // Handle delete user confirmation
  const handleDeleteUser = (teacher) => {
    setUserToDelete(teacher);
    handleShowDeleteConfirm();
  };

  // Search filter functionality (optimized)
  const [searchH, setSearchH] = useState("");
  const handleFilterH = (e) => {
    const value = e.target.value;
    setSearchH(value);
    setCurrentPage(1); // Reset to first page when searching
    
    // Use debounced search to avoid too many API calls
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(() => {
      getTeachersPaginated(1, value);
    }, 500);
  };

  // Handle view user details
  const handleViewUser = async (teacher) => {
    setSelectedUser(teacher);
    await getUserQuestionPapers(teacher._id);
    handleShowUserDetails();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'warning';
      case 'not complete staps':
        return 'danger';
      default:
        return 'info';
    }
  };

  // Pagination calculations (now using backend data)
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = Teacher; // Already paginated from backend

  // Pagination handlers (optimized)
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    getTeachersPaginated(pageNumber, searchH);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      getTeachersPaginated(newPage, searchH);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      getTeachersPaginated(newPage, searchH);
    }
  };

  // Check if initial loading is complete
  const isInitialLoadComplete = () => {
    return !dashboardLoading && !teachersLoading;
  };

  // Generate pagination items
  const generatePaginationItems = () => {
    let items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is less than or equal to max visible pages
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      // Show ellipsis logic for large number of pages
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, currentPage + 2);

      if (currentPage <= 3) {
        endPage = 5;
      }
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      }

      if (startPage > 1) {
        items.push(
          <Pagination.Item key={1} onClick={() => handlePageChange(1)}>
            1
          </Pagination.Item>
        );
        if (startPage > 2) {
          items.push(<Pagination.Ellipsis key="start-ellipsis" />);
        }
      }

      for (let number = startPage; number <= endPage; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </Pagination.Item>
        );
      }

      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          items.push(<Pagination.Ellipsis key="end-ellipsis" />);
        }
        items.push(
          <Pagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    return items;
  };

  useEffect(() => {
    // Start loading data immediately
    const loadInitialData = async () => {
      // Load dashboard overview and teachers data in parallel
      await Promise.all([
        getDashboardOverview(),
        getTeachersPaginated(1, "")
      ]);
      
      // Set initial loading to false once both are complete
      setInitialLoading(false);
      
      // Load detailed stats after initial render (non-blocking)
      setTimeout(() => {
        getDashboardStats();
      }, 100);
    };

    loadInitialData();

    return () => {
      if (window.searchTimeout) {
        clearTimeout(window.searchTimeout);
      }
    };
  }, []);

  if (initialLoading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary" style={{ width: "3rem", height: "3rem" }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h3 className="mt-3" style={{ color: "#5140EB" }}>Loading Dashboard...</h3>
          <p>Fetching data from server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Alert Message */}
      {alert.show && (
        <Alert variant={alert.type} className="mt-3" dismissible onClose={() => setAlert({ show: false, message: "", type: "" })}>
          {alert.message}
        </Alert>
      )}

      <h2 className="header-c" style={{ color: "#5140EB" }}>
        Dashboard
      </h2>

      {/* Dashboard Cards */}
      <div className="cards-container" style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <Card style={{ width: "15rem", minHeight: "120px" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '14px', color: '#666' }}>Number of Registered Users</Card.Title>
            <Card.Subtitle className="mb-2" style={{ fontSize: '24px', color: '#5140EB', fontWeight: 'bold' }}>
              {dashboardLoading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                dashboardStats.totalUsers || 0
              )}
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card style={{ width: "15rem", minHeight: "120px" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '14px', color: '#666' }}>Question Papers Generated</Card.Title>
            <Card.Subtitle className="mb-2" style={{ fontSize: '24px', color: '#28a745', fontWeight: 'bold' }}>
              {dashboardLoading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                dashboardStats.totalQuestionPapers || 0
              )}
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card style={{ width: "15rem", minHeight: "120px" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '14px', color: '#666' }}>Shared Question Papers</Card.Title>
            <Card.Subtitle className="mb-2" style={{ fontSize: '24px', color: '#ffc107', fontWeight: 'bold' }}>
              {dashboardLoading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                dashboardStats.totalSharedPapers || 0
              )}
            </Card.Subtitle>
          </Card.Body>
        </Card>

        <Card style={{ width: "15rem", minHeight: "120px" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: '14px', color: '#666' }}>Saved Question Papers</Card.Title>
            <Card.Subtitle className="mb-2" style={{ fontSize: '24px', color: '#dc3545', fontWeight: 'bold' }}>
              {dashboardLoading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                dashboardStats.totalSavedPapers || 0
              )}
            </Card.Subtitle>
          </Card.Body>
        </Card>
      </div>

      <div>
        <h2 className="header-c" style={{ color: "#5140EB" }}>
          Refer And Earn
        </h2>

        <div className="srch-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div className="input-group">
              <span className="input-group-text" id="basic-addon1">
                <BsSearch />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search users..."
                aria-describedby="basic-addon1"
                value={searchH}
                onChange={handleFilterH}
              />
            </div>
          </div>

          <div>
            {/* Pagination Info and Loading State */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {teachersLoading ? (
                <div className="spinner-border spinner-border-sm text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null}
              <span style={{ color: '#666', fontSize: '14px' }}>
                {teachersLoading ? 'Loading users...' : `Showing ${indexOfFirstUser + 1}-${Math.min(indexOfLastUser, totalUsers)} of ${totalUsers} users`}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mb-3 p-3">
            <Table responsive bordered>
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Registration ID</th>
                  <th>Name</th>
                  <th>Registration Date</th>
                  <th>Mobile Number</th>
                  <th>Email Id</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? currentUsers.map((teacher, index) => (
                  <tr key={teacher._id || index}>
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{teacher?.teacherId}</td>
                    <td>
                      {teacher?.FirstName} {teacher?.LastName}
                    </td>
                    <td>{moment(teacher?.createdAt)?.format("DD/MM/YYYY")}</td>
                    <td>{teacher?.Mobile}</td>
                    <td>{teacher?.Email}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewUser(teacher)}
                        >
                          <AiFillEye style={{ marginRight: '5px' }} />
                          View
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteUser(teacher)}
                        >
                          <AiFillDelete style={{ marginRight: '5px' }} />
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      {teachersLoading ? (
                        <div className="d-flex justify-content-center align-items-center p-3">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <span className="ms-2">Loading users...</span>
                        </div>
                      ) : searchH ? (
                        "No users found matching your search"
                      ) : (
                        "No users found"
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && !teachersLoading && (
              <div className="d-flex justify-content-center align-items-center mt-4">
                <Pagination>
                  <Pagination.Prev 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1 || teachersLoading}
                  />
                  {generatePaginationItems()}
                  <Pagination.Next 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages || teachersLoading}
                  />
                </Pagination>
              </div>
            )}

            {/* Pagination Summary */}
            {totalUsers > 0 && (
              <div className="text-center mt-3">
                <small style={{ color: '#666' }}>
                  Page {currentPage} of {totalPages} | Total Users: {totalUsers}
                </small>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={handleCloseDeleteConfirm} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this user?</p>
          <p><strong>Name:</strong> {userToDelete?.FirstName} {userToDelete?.LastName}</p>
          <p><strong>Email:</strong> {userToDelete?.Email}</p>
          <p><strong>Registration ID:</strong> {userToDelete?.teacherId}</p>
          <p className="text-danger">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteConfirm} disabled={deleteLoading}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteUser} disabled={deleteLoading}>
            {deleteLoading ? "Deleting..." : "Delete User"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* User Details Modal - Full Screen Overlay */}
      <Modal
        show={showUserDetails}
        onHide={handleCloseUserDetails}
        dialogClassName="modal-fullscreen"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          margin: 0,
          padding: 0,
          zIndex: 999999999,
          overflow: 'auto'
        }}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', borderBottom: '1px solid #dee2e6' }}>
          <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
            <FaUserGraduate style={{ marginRight: '10px', color: '#5140EB' }} />
            <div>
              <h4 style={{ margin: 0 }}>User Activity Details</h4>
              <p style={{ margin: 0, fontSize: '16px', color: '#666' }}>
                {selectedUser?.FirstName} {selectedUser?.LastName} ({selectedUser?.teacherId})
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px', overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          {loading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading user activity...</p>
            </div>
          ) : (
            <div>
              {/* User Info Section */}
              <div className="row mb-4">
                <div className="col-md-6">
                  <Card style={{ marginBottom: '20px' }}>
                    <Card.Header style={{ backgroundColor: '#5140EB', color: 'white' }}>
                      <h5>User Information</h5>
                    </Card.Header>
                    <Card.Body>
                      <div className="row">
                        <div className="col-md-6">
                          <p><strong>Registration ID:</strong><br /> {selectedUser?.teacherId}</p>
                          <p><strong>Email:</strong><br /> {selectedUser?.Email}</p>
                        </div>
                        <div className="col-md-6">
                          <p><strong>Mobile:</strong><br /> {selectedUser?.Mobile}</p>
                          <p><strong>Registration Date:</strong><br /> {moment(selectedUser?.createdAt)?.format("DD/MM/YYYY")}</p>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-6">
                  <Card style={{ marginBottom: '20px' }}>
                    <Card.Header style={{ backgroundColor: '#5140EB', color: 'white' }}>
                      <h5>Activity Summary</h5>
                    </Card.Header>
                    <Card.Body>
                      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <Badge bg="primary" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          <FaFileAlt style={{ marginRight: '8px', fontSize: '16px' }} />
                          {userQuestionPapers.length} Papers Generated
                        </Badge>
                        <Badge bg="success" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          {userQuestionPapers.filter(p => p.status === 'Completed').length} Completed
                        </Badge>
                        <Badge bg="warning" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          {userQuestionPapers.filter(p => p.status === 'In Progress').length} In Progress
                        </Badge>
                        <Badge bg="info" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          {userQuestionPapers.filter(p => p.isShared).length} Shared
                        </Badge>
                        <Badge bg="secondary" style={{ padding: '10px 15px', fontSize: '14px' }}>
                          {userQuestionPapers.filter(p => p.isSaved).length} Saved
                        </Badge>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>

              {/* Question Papers Table */}
              <div>
                <Card>
                  <Card.Header style={{ backgroundColor: '#5140EB', color: 'white' }}>
                    <h5 style={{ display: 'flex', alignItems: 'center', margin: 0 }}>
                      <FaFileAlt style={{ marginRight: '10px' }} />
                      Generated Question Papers
                    </h5>
                  </Card.Header>
                  <Card.Body>
                    {userQuestionPapers.length > 0 ? (
                      <div className="table-responsive">
                        <Table responsive bordered striped hover>
                          <thead style={{ backgroundColor: '#f8f9fa' }}>
                            <tr>
                              <th>S.No</th>
                              <th>Paper ID</th>
                              <th>Institute Name</th>
                              <th>Board</th>
                              <th>Class</th>
                              <th>Medium</th>
                              <th>Test Date</th>
                              <th>Status</th>
                              <th>Created Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userQuestionPapers.map((paper, index) => (
                              <tr key={paper._id || index}>
                                <td>{index + 1}</td>
                                <td>
                                  <strong style={{ color: '#5140EB' }}>{paper?.paperId}</strong>
                                </td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    {paper?.School_Logo && (
                                      <img
                                        src={`${paper?.School_Logo}`}
                                        alt="School Logo"
                                        style={{
                                          width: "30px",
                                          height: "30px",
                                          borderRadius: "50%",
                                          marginRight: "8px",
                                        }}
                                      />
                                    )}
                                    {paper?.Institute_Name}
                                  </div>
                                </td>
                                <td>{paper?.Board}</td>
                                <td>{paper?.Class}</td>
                                <td>{paper?.Medium}</td>
                                <td>
                                  <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <FaCalendarAlt style={{ marginRight: '5px', color: '#666' }} />
                                    {moment(paper?.Test_Date).format("DD/MM/YYYY")}
                                    {paper?.ExamTime && (
                                      <small style={{ display: 'block', color: '#666' }}>
                                        {paper?.ExamTime}
                                      </small>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <Badge bg={getStatusColor(paper?.status)}>
                                    {paper?.status || 'Unknown'}
                                  </Badge>
                                </td>
                                <td>{moment(paper?.createdAt).format("DD/MM/YYYY HH:mm")}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    ) : (
                      <div className="text-center p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                        <FaFileAlt style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }} />
                        <h5 style={{ color: '#666' }}>No Question Papers Found</h5>
                        <p style={{ color: '#888' }}>This user hasn't generated any question papers yet.</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: '#f8f9fa', borderTop: '1px solid #dee2e6' }}>
          <Button variant="secondary" onClick={handleCloseUserDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
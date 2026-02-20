// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Pagination, Table } from "react-bootstrap";
// import { AiFillDelete, AiFillEye } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import "../Admin/Admin.css";
// import { BsSearch } from "react-icons/bs";
// import axios from "axios";
// import swal from "sweetalert";
// import moment from "moment";

// const UserList = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   const [show, setShow] = useState();
//   const [show1, setShow1] = useState();
//   const [show2, setShow2] = useState();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);

//   //get
//   const [Teacher, setTeacher] = useState([]);
//   const getAllTeacher = async () => {
//     try {
//       let res = await axios.get(
//         `http://localhost:8774/api/admin/getAllTeachers/${admin?._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         setTeacher(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const [itempage, setItempage] = useState(5);

//   const [data, setData] = useState([]);
//   const [startDate, setstartDate] = useState("");
//   const [endDate, setendDate] = useState("");
//   const filterData = () => {
//     if (!startDate) return alert("Please select from date");
//     if (!endDate) return alert("Please select to date");
//     const filteredData = data.filter((item) => {
//       const itemDate = new Date(item?.createdAt);
//       const startDateObj = new Date(startDate);
//       const endDateObj = new Date(endDate);

//       return itemDate >= startDateObj && itemDate <= endDateObj;
//     });
//     setData([...filteredData]);
//   };

//   const [currenpage, setCurrentpage] = useState(1);
//   const recordsperpage = 6;
//   const lastIndex = currenpage * recordsperpage;
//   const firstIndex = lastIndex - recordsperpage;
//   const records = Teacher.slice(firstIndex, lastIndex);
//   const npages = Math.ceil(Teacher.length / recordsperpage);
//   const numbers = [...Array(npages + 1).keys()].slice(1);

//   function changePage(id) {
//     setCurrentpage(id);
//   }

//   function prevpage() {
//     if (currenpage !== firstIndex) {
//       setCurrentpage(currenpage - 1);
//     }
//   }

//   function nextpage() {
//     if (currenpage !== lastIndex) {
//       setCurrentpage(currenpage + 1);
//     }
//   }

//   useEffect(() => {
//     getAllTeacher();
//   }, []);

//   console.log("Teacher", Teacher);

//   return (
//     <>
//       <div className="col-lg-4 d-flex justify-content-center">
//         <div class="input-group ">
//           <span class="input-group-text" id="basic-addon1">
//             <BsSearch />
//           </span>
//           <input
//             type="text"
//             class="form-control"
//             placeholder="Search..."
//             aria-describedby="basic-addon1"
//           />
//         </div>
//       </div>
//       <div className="customerhead p-2">
//         <div className="d-flex justify-content-between align-items-center">
//           <h2 className="header-c " style={{ color: "#5140EB" }}>
//             User List
//           </h2>
        
//         </div>

//         <div className="mb-3">
//           <Table
//             responsive
//             bordered
//             style={{ width: "-webkit-fill-available" }}
//           >
//             <thead>
//               <tr>
//                 <th>S.No</th>
//                 <th>
//                   <div>Registration ID</div>
//                 </th>
//                 <th>
//                   <div>Name</div>
//                 </th>
//                 <th>
//                   <div>Registration Date</div>
//                 </th>
//                 <th>
//                   <div>Mobile Number</div>
//                 </th>
//                 <th>
//                   <div>Email Id</div>
//                 </th>
//                 <th>Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {records?.map((item, i) => {
//                 return (
//                   <>
//                     <tr>
//                       <td>{i + 1}</td>
//                       <td>{item?.teacherId}</td>
//                       <td>
//                         {item?.FirstName} {item?.LastName}
//                       </td>
//                       <td>{moment(item?.createdAt)?.format("DD/MM/YYYY")}</td>
//                       <td>{item?.Mobile}</td>
//                       <td>{item?.Email}</td>

//                       <td>
//                         {" "}
//                         <div style={{ display: "flex", gap: "20px" }}>
                         
//                         </div>
//                       </td>
//                     </tr>
//                   </>
//                 );
//               })}
//             </tbody>
//           </Table>
//         </div>

       
//         <div>
//           <nav>
//             <ul className="pagination">
//               <li className="not-allow">
//                 <span>
//                   <li className="next-prev">
//                     <a
//                       onClick={() => {
//                         prevpage();
//                       }}
//                     >
//                       &lt;
//                     </a>{" "}
//                   </li>
//                 </span>
//               </li>
//               {numbers?.map((n, i) => {
//                 return (
//                   <li className="active-next" key={i}>
//                     <a
//                       href="#"
//                       className="inactive"
//                       onClick={() => changePage(n)}
//                     >
//                       {n}
//                     </a>
//                   </li>
//                 );
//               })}

//               <li className="not-allow">
//                 <span>
//                   <li
//                     className="next-prev"
//                     onClick={() => {
//                       nextpage();
//                     }}
//                   >
//                     &gt;{" "}
//                   </li>
//                 </span>
//               </li>
//             </ul>
//           </nav>
//         </div>
       
        
//         <Modal
//           show={show2}
//           onHide={handleClose2}
//           backdrop="static"
//           keyboard={false}
//           style={{ zIndex: "99999" }}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
//           </Modal.Header>
        
//           <Modal.Footer>
//             <Button
//               variant=""
//               className="modal-close-btn"
//               onClick={handleClose2}
//             >
//               Close
//             </Button>
        
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default UserList;
 
 
 
// import React, { useEffect, useState } from "react";
// import { Button, Form, Modal, Pagination, Table, Badge, Tab, Tabs } from "react-bootstrap";
// import { AiFillDelete, AiFillEye } from "react-icons/ai";
// import { BiSolidEdit } from "react-icons/bi";
// import "../Admin/Admin.css";
// import { BsSearch } from "react-icons/bs";
// import { FaFileAlt, FaCalendarAlt, FaUserGraduate } from "react-icons/fa";
// import axios from "axios";
// import swal from "sweetalert";
// import moment from "moment";

// const UserList = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   // Modal states
//   const [show, setShow] = useState();
//   const [show1, setShow1] = useState();
//   const [show2, setShow2] = useState();
//   const [showUserDetails, setShowUserDetails] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   const handleClose1 = () => setShow1(false);
//   const handleShow1 = () => setShow1(true);
//   const handleClose2 = () => setShow2(false);
//   const handleShow2 = () => setShow2(true);

//   const handleCloseUserDetails = () => setShowUserDetails(false);
//   const handleShowUserDetails = () => setShowUserDetails(true);

//   // Data states
//   const [Teacher, setTeacher] = useState([]);
//   const [nochangedata, setnochangedata] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userQuestionPapers, setUserQuestionPapers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Get all teachers
//   const getAllTeacher = async () => {
//     try {
//       let res = await axios.get(
//         `http://localhost:8774/api/admin/getAllTeachers/${admin?._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         setTeacher(res.data.success);
//         setnochangedata(res.data.success);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };



//   // Search filter functionality
//   const [searchH, setSearchH] = useState("");
//   const handleFilterH = (e) => {
//     const value = e.target.value;
//     setSearchH(value);
    
//     if (value.trim() !== "") {
//       const filterTableH = nochangedata.filter((o) =>
//         Object.keys(o).some((k) =>
//           String(o[k])?.toLowerCase().includes(value.toLowerCase())
//         )
//       );
//       setTeacher([...filterTableH]);
//     } else {
//       setTeacher([...nochangedata]);
//     }
//   };

//   // Handle view user details
//   const handleViewUser = async (teacher) => {
//     setSelectedUser(teacher);
    
//     handleShowUserDetails();
//   };

//   // Get status color
//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'completed':
//         return 'success';
//       case 'in progress':
//         return 'warning';
//       case 'not complete staps':
//         return 'danger';
//       default:
//         return 'info';
//     }
//   };

//   // Date filter functionality
//   const [data, setData] = useState([]);
//   const [startDate, setstartDate] = useState("");
//   const [endDate, setendDate] = useState("");
//   const filterData = () => {
//     if (!startDate) return alert("Please select from date");
//     if (!endDate) return alert("Please select to date");
//     const filteredData = Teacher.filter((item) => {
//       const itemDate = new Date(item?.createdAt);
//       const startDateObj = new Date(startDate);
//       const endDateObj = new Date(endDate);

//       return itemDate >= startDateObj && itemDate <= endDateObj;
//     });
//     setTeacher([...filteredData]);
//   };

//   // Reset filters
//   const resetFilters = () => {
//     setstartDate("");
//     setendDate("");
//     setSearchH("");
//     setTeacher([...nochangedata]);
//   };

//   // Pagination
//   const [currenpage, setCurrentpage] = useState(1);
//   const recordsperpage = 10;
//   const lastIndex = currenpage * recordsperpage;
//   const firstIndex = lastIndex - recordsperpage;
//   const records = Teacher.slice(firstIndex, lastIndex);
//   const npages = Math.ceil(Teacher.length / recordsperpage);
//   const numbers = [...Array(npages + 1).keys()].slice(1);

//   function changePage(id) {
//     setCurrentpage(id);
//   }

//   function prevpage() {
//     if (currenpage !== 1) {
//       setCurrentpage(currenpage - 1);
//     }
//   }

//   function nextpage() {
//     if (currenpage !== npages) {
//       setCurrentpage(currenpage + 1);
//     }
//   }

//   useEffect(() => {
//     getAllTeacher();
//   }, []);

//   console.log("Teacher", Teacher);

//   return (
//     <>
//       <div className="container">
//         <h2 className="header-c" style={{ color: "#5140EB" }}>
//           User List
//         </h2>

//         {/* Search and Filter Section */}
//         <div className="srch-icon" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
//           <div className="input-group" style={{ maxWidth: '300px' }}>
//             <span className="input-group-text" id="basic-addon1">
//               <BsSearch />
//             </span>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search users..."
//               aria-describedby="basic-addon1"
//               value={searchH}
//               onChange={handleFilterH}
//             />
//           </div>

//           <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
//             <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//               <input
//                 type="date"
//                 className="form-control"
//                 style={{ width: '150px' }}
//                 value={startDate}
//                 onChange={(e) => setstartDate(e.target.value)}
//                 placeholder="From Date"
//               />
//               <input
//                 type="date"
//                 className="form-control"
//                 style={{ width: '150px' }}
//                 value={endDate}
//                 onChange={(e) => setendDate(e.target.value)}
//                 placeholder="To Date"
//               />
//               <Button variant="primary" onClick={filterData} size="sm">
//                 Filter
//               </Button>
//               <Button variant="outline-secondary" onClick={resetFilters} size="sm">
//                 Reset
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Statistics Summary */}
//         <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
//           <Badge bg="primary" style={{ padding: '8px 12px', fontSize: '14px' }}>
//             <FaUserGraduate style={{ marginRight: '5px' }} />
//             Total Users: {Teacher.length}
//           </Badge>
//           <Badge bg="info" style={{ padding: '8px 12px', fontSize: '14px' }}>
//             Showing: {records.length} of {Teacher.length}
//           </Badge>
//         </div>

//         {/* Users Table */}
//         <div className="row">
//           <div className="mb-3 p-3">
//             <Table responsive bordered striped>
//               <thead style={{ backgroundColor: '#f8f9fa' }}>
//                 <tr>
//                   <th>S.No</th>
//                   <th>Registration ID</th>
//                   <th>Name</th>
//                   <th>Registration Date</th>
//                   <th>Mobile Number</th>
//                   <th>Email Id</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {records?.map((item, i) => {
//                   return (
//                     <tr key={item._id || i}>
//                       <td>{firstIndex + i + 1}</td>
//                       <td>
//                         <strong style={{ color: '#5140EB' }}>{item?.teacherId}</strong>
//                       </td>
//                       <td>
//                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                           <FaUserGraduate style={{ marginRight: '8px', color: '#666' }} />
//                           {item?.FirstName} {item?.LastName}
//                         </div>
//                       </td>
//                       <td>
//                         <div style={{ display: 'flex', alignItems: 'center' }}>
//                           <FaCalendarAlt style={{ marginRight: '5px', color: '#666' }} />
//                           {moment(item?.createdAt)?.format("DD/MM/YYYY")}
//                         </div>
//                       </td>
//                       <td>{item?.Mobile}</td>
//                       <td>{item?.Email}</td>
//                       <td>
//                         <Button
//                           variant="outline-primary"
//                           size="sm"
//                           onClick={() => handleViewUser(item)}
//                         >
//                           <AiFillEye style={{ marginRight: '5px' }} />
//                           View Activity
//                         </Button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//                 {records.length === 0 && (
//                   <tr>
//                     <td colSpan="7" className="text-center" style={{ padding: '40px' }}>
//                       <FaUserGraduate style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }} />
//                       <div style={{ color: '#666' }}>No users found</div>
//                       <small style={{ color: '#888' }}>Try adjusting your search or filter criteria</small>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           </div>
//         </div>

//         {/* Pagination */}
//         {npages > 1 && (
//           <div style={{ display: 'flex', justifyContent: 'center' }}>
//             <nav>
//               <ul className="pagination">
//                 <li className={`page-item ${currenpage === 1 ? 'disabled' : ''}`}>
//                   <button className="page-link" onClick={prevpage} disabled={currenpage === 1}>
//                     &lt; Previous
//                   </button>
//                 </li>
//                 {numbers?.map((n, i) => {
//                   return (
//                     <li className={`page-item ${currenpage === n ? 'active' : ''}`} key={i}>
//                       <button
//                         className="page-link"
//                         onClick={() => changePage(n)}
//                       >
//                         {n}
//                       </button>
//                     </li>
//                   );
//                 })}
//                 <li className={`page-item ${currenpage === npages ? 'disabled' : ''}`}>
//                   <button className="page-link" onClick={nextpage} disabled={currenpage === npages}>
//                     Next &gt;
//                   </button>
//                 </li>
//               </ul>
//             </nav>
//           </div>
//         )}

//         {/* User Details Modal */}
//         <Modal
//           show={showUserDetails}
//           onHide={handleCloseUserDetails}
//           size="xl"
//           backdrop="static"
//           keyboard={false}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>
//               <FaUserGraduate style={{ marginRight: '10px', color: '#5140EB' }} />
//               User Activity Details: {selectedUser?.FirstName} {selectedUser?.LastName}
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {loading ? (
//               <div className="text-center p-4">
//                 <div className="spinner-border text-primary" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//                 <p className="mt-2">Loading user activity...</p>
//               </div>
//             ) : (
//               <div>
//                 {/* User Info Section */}
//                 <div className="row mb-4">
//                   <div className="col-md-6">
//                     <h5 style={{ color: '#5140EB' }}>User Information</h5>
//                     <p><strong>Registration ID:</strong> {selectedUser?.teacherId}</p>
//                     <p><strong>Email:</strong> {selectedUser?.Email}</p>
//                     <p><strong>Mobile:</strong> {selectedUser?.Mobile}</p>
//                     <p><strong>Registration Date:</strong> {moment(selectedUser?.createdAt)?.format("DD/MM/YYYY")}</p>
//                   </div>
//                   <div className="col-md-6">
//                     <h5 style={{ color: '#5140EB' }}>Activity Summary</h5>
//                     <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
//                       <Badge bg="primary" style={{ padding: '8px 12px' }}>
//                         <FaFileAlt style={{ marginRight: '5px' }} />
//                         {userQuestionPapers.length} Papers Generated
//                       </Badge>
//                       <Badge bg="success" style={{ padding: '8px 12px' }}>
//                         {userQuestionPapers.filter(p => p.status === 'Completed').length} Completed
//                       </Badge>
//                       <Badge bg="warning" style={{ padding: '8px 12px' }}>
//                         {userQuestionPapers.filter(p => p.status === 'In Progress').length} In Progress
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Question Papers Table */}
//                 <div>
//                   <h5 style={{ color: '#5140EB', marginBottom: '15px' }}>
//                     <FaFileAlt style={{ marginRight: '10px' }} />
//                     Generated Question Papers
//                   </h5>
                  
//                   {userQuestionPapers.length > 0 ? (
//                     <Table responsive bordered striped>
//                       <thead style={{ backgroundColor: '#f8f9fa' }}>
//                         <tr>
//                           <th>S.No</th>
//                           <th>Paper ID</th>
//                           <th>Institute Name</th>
//                           <th>Board</th>
//                           <th>Class</th>
//                           <th>Medium</th>
//                           <th>Test Date</th>
//                           <th>Status</th>
//                           <th>Created Date</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {userQuestionPapers.map((paper, index) => (
//                           <tr key={paper._id || index}>
//                             <td>{index + 1}</td>
//                             <td>
//                               <strong style={{ color: '#5140EB' }}>{paper?.paperId}</strong>
//                             </td>
//                             <td>
//                               <div style={{ display: 'flex', alignItems: 'center' }}>
//                                 {paper?.School_Logo && (
//                                   <img
//                                     src={`${paper?.School_Logo}`}
//                                     alt="School Logo"
//                                     style={{
//                                       width: "30px",
//                                       height: "30px",
//                                       borderRadius: "50%",
//                                       marginRight: "8px",
//                                     }}
//                                   />
//                                 )}
//                                 {paper?.Institute_Name}
//                               </div>
//                             </td>
//                             <td>{paper?.Board}</td>
//                             <td>{paper?.Class}</td>
//                             <td>{paper?.Medium}</td>
//                             <td>
//                               <div style={{ display: 'flex', alignItems: 'center' }}>
//                                 <FaCalendarAlt style={{ marginRight: '5px', color: '#666' }} />
//                                 {moment(paper?.Test_Date).format("DD/MM/YYYY")}
//                                 {paper?.ExamTime && (
//                                   <small style={{ display: 'block', color: '#666' }}>
//                                     {paper?.ExamTime}
//                                   </small>
//                                 )}
//                               </div>
//                             </td>
//                             <td>
//                               <Badge bg={getStatusColor(paper?.status)}>
//                                 {paper?.status || 'Unknown'}
//                               </Badge>
//                             </td>
//                             <td>{moment(paper?.createdAt).format("DD/MM/YYYY HH:mm")}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   ) : (
//                     <div className="text-center p-4" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
//                       <FaFileAlt style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }} />
//                       <h5 style={{ color: '#666' }}>No Question Papers Found</h5>
//                       <p style={{ color: '#888' }}>This user hasn't generated any question papers yet.</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={handleCloseUserDetails}>
//               Close
//             </Button>
//             {/* {userQuestionPapers.length > 0 && (
//               <Button variant="primary" onClick={() => {
//                 // Export functionality can be added here
//                 console.log('Export user activity:', selectedUser);
//               }}>
//                 Export Report
//               </Button>
//             )} */}
//           </Modal.Footer>
//         </Modal>

//         {/* Warning Modal */}
//         <Modal
//           show={show2}
//           onHide={handleClose2}
//           backdrop="static"
//           keyboard={false}
//           style={{ zIndex: "99999" }}
//         >
//           <Modal.Header closeButton>
//             <Modal.Title style={{ color: "white" }}>Warning</Modal.Title>
//           </Modal.Header>
//           <Modal.Footer>
//             <Button
//               variant=""
//               className="modal-close-btn"
//               onClick={handleClose2}
//             >
//               Close
//             </Button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default UserList;   
 
 
// import React, { useEffect, useState } from "react";
// import { Button, Table, Modal, Badge, Card, Form, Spinner } from "react-bootstrap";
// import { FaUserGraduate, FaRupeeSign, FaShareAlt, FaCopy, FaSearch } from "react-icons/fa";
// import axios from "axios";
// import moment from "moment";
// import swal from "sweetalert";

// const UserList = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   // Modal states
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   // Data states
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   // Get all users with referral data
//   const getAllUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:8774/api/admin/getAllTeachers/${admin?._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         setUsers(res.data.success);
//         setFilteredUsers(res.data.success);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       swal("Error", "Failed to load user data", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Sort functionality
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });

//     const sortedUsers = [...filteredUsers].sort((a, b) => {
//       // Handle nested objects
//       let aValue, bValue;
//       if (key.includes('.')) {
//         const keys = key.split('.');
//         aValue = a[keys[0]] ? a[keys[0]][keys[1]] : '';
//         bValue = b[keys[0]] ? b[keys[0]][keys[1]] : '';
//       } else {
//         aValue = a[key];
//         bValue = b[key];
//       }

//       if (aValue < bValue) {
//         return direction === 'asc' ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setFilteredUsers(sortedUsers);
//   };

//   // Search filter functionality
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
    
//     if (value.trim() === "") {
//       setFilteredUsers(users);
//     } else {
//       const filtered = users.filter(user => 
//         (user.FirstName && user.FirstName.toLowerCase().includes(value)) || 
//         (user.LastName && user.LastName.toLowerCase().includes(value)) ||
//         (user.Email && user.Email.toLowerCase().includes(value)) ||
//         (user.Mobile && user.Mobile.toLowerCase().includes(value)) ||
//         (user.whatsAppNumber && user.whatsAppNumber.toLowerCase().includes(value)) ||
//         (user.teacherId && user.teacherId.toLowerCase().includes(value)) ||
//         (user.Country && user.Country.toLowerCase().includes(value)) ||
//         (user.State && user.State.toLowerCase().includes(value)) ||
//         (user.City && user.City.toLowerCase().includes(value)) ||
//         (user.referralCode && user.referralCode.toLowerCase().includes(value)) ||
//         (user.referredBy && user.referredBy.toLowerCase().includes(value)) ||
//         (user.referredByTeacher && (
//           (user.referredByTeacher.FirstName && user.referredByTeacher.FirstName.toLowerCase().includes(value)) ||
//           (user.referredByTeacher.LastName && user.referredByTeacher.LastName.toLowerCase().includes(value)) ||
//           (user.referredByTeacher.teacherId && user.referredByTeacher.teacherId.toLowerCase().includes(value))
//         ))
//       );
//       setFilteredUsers(filtered);
//     }
//   };

//   // Handle view user details
//   const handleViewUser = (user) => {
//     setSelectedUser(user);
//     setShowUserModal(true);
//   };

//   // Copy referral link
//   const copyReferralLink = (userId) => {
//     const referralLink = `http://localhost:8774/signup?referral=${userId}`;
//     navigator.clipboard.writeText(referralLink);
//     swal("Copied!", "Referral link copied to clipboard!", "success");
//   };

//   useEffect(() => {
//     if (token) {
//       getAllUsers();
//     }
//   }, [token]);

//   return (
//     <div className="container">
//       <h2 className="header-c" style={{ color: "#5140EB" }}>
//         User Management
//       </h2>

//       {/* Search and Filter Section */}
//       <div className="mb-4">
//         <div className="input-group" style={{ maxWidth: '400px' }}>
//           <Form.Control
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Button variant="outline-secondary">
//             <FaSearch />
//           </Button>
//         </div>
//       </div>

//       {/* Statistics Summary */}
//       <div className="row mb-4">
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaUserGraduate /> Total Users</h5>
//               <h3>{users.length}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaShareAlt /> Active Referrers</h5>
//               <h3>{users.filter(u => u.referralStats?.totalReferrals > 0).length}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaUserGraduate /> Total Referrals</h5>
//               <h3>{users.reduce((sum, user) => sum + (user.referralStats?.totalReferrals || 0), 0)}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaRupeeSign /> Total Earnings</h5>
//               <h3>₹{users.reduce((sum, user) => sum + (user.referralStats?.totalRewards || 0), 0)}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="card">
//         <div className="card-body">
//           <Table responsive bordered hover>
//             <thead className="table">
//               <tr>
//                 <th>S.No</th>
//                 <th onClick={() => requestSort('teacherId')}>User ID</th>
//                 <th onClick={() => requestSort('FirstName')}>Name</th>
//                 <th onClick={() => requestSort('Email')}>Email</th>
//                 <th onClick={() => requestSort('Mobile')}>Mobile</th>
//                 <th>WhatsApp</th>
//                 <th>Referral Code</th>
//                 <th>Referred By</th>
//                 <th onClick={() => requestSort('createdAt')}>Join Date</th>
//                 <th onClick={() => requestSort('referralStats.totalReferrals')}>Referrals</th>
//                 <th onClick={() => requestSort('referralStats.totalRewards')}>Earnings</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="13" className="text-center py-4">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredUsers.length > 0 ? (
//                 filteredUsers.map((user, index) => (
//                   <tr key={user._id}>
//                     <td>{index + 1}</td>
//                     <td>{user.teacherId}</td>
//                     <td>{user.FirstName} {user.LastName}</td>
//                     <td>{user.Email}</td>
//                     <td>{user.Mobile}</td>
//                     <td>{user.whatsAppNumber}</td>
//                     <td>{user.referralCode || 'N/A'}</td>
//                     <td>
//                       {user.referredByTeacher ? (
//                         `${user.referredByTeacher.FirstName} ${user.referredByTeacher.LastName} (${user.referredByTeacher.teacherId})`
//                       ) : (
//                         user.referredBy ? user.referredBy : 'N/A'
//                       )}
//                     </td>
//                     <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
//                     <td>
//                       <Badge bg={user.referralStats?.totalReferrals > 0 ? "success" : "secondary"}>
//                         {user.referralStats?.totalReferrals || 0}
//                       </Badge>
//                     </td>
//                     <td>₹{user.referralStats?.totalRewards || 0}</td>
//                     <td>
//                       <Badge bg={user.isBlock ? "danger" : "success"}>
//                         {user.isBlock ? "Blocked" : "Active"}
//                       </Badge>
//                     </td>
//                     <td>
//                       {/* <Button 
//                         variant="outline-primary" 
//                         size="sm" 
//                         onClick={() => copyReferralLink(user.teacherId)}
//                         className="me-2 mb-1"
//                       >
//                         <FaCopy /> Copy Link
//                       </Button> */}
//                       <Button 
//                         variant="outline-info" 
//                         size="sm"
//                         onClick={() => handleViewUser(user)}
//                         className="mb-1"
//                       >
//                         View Details
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="13" className="text-center py-4">
//                     No users found matching your search criteria
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </div>

//       {/* User Details Modal */}
//       <Modal 
//         show={showUserModal} 
//         onHide={() => setShowUserModal(false)} 
//         size="lg"
//         scrollable // Added scrollable prop
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             User Details: {selectedUser?.FirstName} {selectedUser?.LastName}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}> {/* Added scrollable styles */}
//           {selectedUser && (
//             <div>
//               <div className="row mb-4">
//                 <div className="col-md-6">
//                   <h5>Basic Information</h5>
//                   <p><strong>User ID:</strong> {selectedUser.teacherId}</p>
//                   <p><strong>Name:</strong> {selectedUser.FirstName} {selectedUser.LastName}</p>
//                   <p><strong>Email:</strong> {selectedUser.Email}</p>
//                   <p><strong>Mobile:</strong> {selectedUser.Mobile}</p>
//                   <p><strong>WhatsApp:</strong> {selectedUser.whatsAppNumber}</p>
//                   <p><strong>Join Date:</strong> {moment(selectedUser.createdAt).format("DD/MM/YYYY")}</p>
//                   <p><strong>Status:</strong> 
//                     <Badge bg={selectedUser.isBlock ? "danger" : "success"} className="ms-2">
//                       {selectedUser.isBlock ? "Blocked" : "Active"}
//                     </Badge>
//                   </p>
//                 </div>
//                 <div className="col-md-6">
//                   <h5>Location Details</h5>
//                   <p><strong>Country:</strong> {selectedUser.Country || 'Not provided'}</p>
//                   <p><strong>State:</strong> {selectedUser.State || 'Not provided'}</p>
//                   <p><strong>City:</strong> {selectedUser.City || 'Not provided'}</p>
                  
//                   <h5 className="mt-3">Referral Information</h5>
//                   <p><strong>Referral Code:</strong> {selectedUser.referralCode || 'N/A'}</p>
//                   <p><strong>Referred By:</strong> 
//                     {selectedUser.referredByTeacher ? (
//                       `${selectedUser.referredByTeacher.FirstName} ${selectedUser.referredByTeacher.LastName} (${selectedUser.referredByTeacher.teacherId})`
//                     ) : (
//                       selectedUser.referredBy ? selectedUser.referredBy : 'N/A'
//                     )}
//                   </p>
//                   <p><strong>Referral Status:</strong> 
//                     <Badge bg={selectedUser.isReferralActive ? "success" : "secondary"} className="ms-2">
//                       {selectedUser.isReferralActive ? "Active" : "Inactive"}
//                     </Badge>
//                   </p>
//                 </div>
//               </div>

//               <div className="row mb-4">
//                 <div className="col-md-12">
//                   <h5>Referral Statistics</h5>
//                   <div className="row">
//                     <div className="col-md-3">
//                       <Card className="text-center">
//                         <Card.Body>
//                           <h6>Total Referrals</h6>
//                           <h4>{selectedUser.referralStats?.totalReferrals || 0}</h4>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                     <div className="col-md-3">
//                       <Card className="text-center">
//                         <Card.Body>
//                           <h6>Confirmed</h6>
//                           <h4>{selectedUser.referralStats?.confirmedReferrals || 0}</h4>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                     <div className="col-md-3">
//                       <Card className="text-center">
//                         <Card.Body>
//                           <h6>Pending</h6>
//                           <h4>{selectedUser.referralStats?.pendingReferrals || 0}</h4>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                     <div className="col-md-3">
//                       <Card className="text-center">
//                         <Card.Body>
//                           <h6>Total Earnings</h6>
//                           <h4>₹{selectedUser.referralStats?.totalRewards || 0}</h4>
//                         </Card.Body>
//                       </Card>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row">
//                 <div className="col-md-12">
//                   <h5>Referral Link</h5>
//                   <div className="input-group mb-3">
//                     <Form.Control
//                       type="text"
//                       readOnly
//                       value={`http://localhost:8774/signup?referral=${selectedUser.teacherId}`}
//                     />
//                     <Button 
//                       variant="outline-secondary"
//                       onClick={() => copyReferralLink(selectedUser.teacherId)}
//                     >
//                       <FaCopy /> Copy
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               <h5 className="mb-3 mt-4">Referred Users</h5>
//               {selectedUser.referrals && selectedUser.referrals.length > 0 ? (
//                 <div className="table-responsive">
//                   <Table striped bordered hover size="sm">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Name</th>
//                         <th>Teacher ID</th>
//                         <th>Join Date</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedUser.referrals.map((ref, index) => (
//                         <tr key={ref._id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {ref.teacherId?.FirstName} {ref.teacherId?.LastName}
//                           </td>
//                           <td>{ref.teacherId?.teacherId}</td>
//                           <td>
//                             {ref.teacherId?.createdAt ? 
//                               moment(ref.teacherId.createdAt).format("DD/MM/YYYY") : 
//                               moment(ref.referredAt).format("DD/MM/YYYY")}
//                           </td>
//                           <td>
//                             <Badge bg={ref.status === 'confirmed' ? "success" : "warning"}>
//                               {ref.status === 'confirmed' ? "Confirmed" : "Pending"}
//                             </Badge>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               ) : (
//                 <div className="alert alert-info">
//                   This user hasn't referred anyone yet.
//                 </div>
//               )}

//               <h5 className="mb-3 mt-4">Referral Rewards</h5>
//               {selectedUser.referralRewards && selectedUser.referralRewards.length > 0 ? (
//                 <div className="table-responsive">
//                   <Table striped bordered hover size="sm">
//                     <thead>
//                       <tr>
//                         <th>#</th>
//                         <th>Referred Teacher</th>
//                         <th>Amount</th>
//                         <th>Type</th>
//                         <th>Date</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {selectedUser.referralRewards.map((reward, index) => (
//                         <tr key={reward._id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {reward.referredTeacher?.FirstName} {reward.referredTeacher?.LastName}
//                           </td>
//                           <td>₹{reward.rewardAmount}</td>
//                           <td>{reward.rewardType}</td>
//                           <td>{moment(reward.rewardDate).format("DD/MM/YYYY")}</td>
//                           <td>
//                             <Badge bg={
//                               reward.status === 'paid' ? "success" : 
//                               reward.status === 'cancelled' ? "danger" : "warning"
//                             }>
//                               {reward.status}
//                             </Badge>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </Table>
//                 </div>
//               ) : (
//                 <div className="alert alert-info">
//                   No referral rewards yet.
//                 </div>
//               )}
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowUserModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default UserList; 
 
 
// import React, { useEffect, useState } from "react";
// import { 
//   Button, 
//   Table, 
//   Modal, 
//   Badge, 
//   Card, 
//   Form, 
//   Spinner, 
//   Tab, 
//   Tabs,
//   ListGroup,
//   OverlayTrigger,
//   Tooltip
// } from "react-bootstrap";
// import { 
//   FaUserGraduate, 
//   FaRupeeSign, 
//   FaShareAlt, 
//   FaCopy, 
//   FaSearch, 
//   FaInfoCircle,
//   FaMoneyBillAlt,
//   FaUniversity,
//   FaLink,
//   FaUserTie
// } from "react-icons/fa";
// import axios from "axios";
// import moment from "moment";
// import swal from "sweetalert";

// const UserList = () => {
//   const admin = JSON.parse(localStorage.getItem("admin"));
//   const token = localStorage.getItem("token");

//   // Modal states
//   const [showUserModal, setShowUserModal] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [activeTab, setActiveTab] = useState('basic');
//   const [referralDetails, setReferralDetails] = useState(null);
//   const [loadingReferralDetails, setLoadingReferralDetails] = useState(false);

//   // Data states
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

//   // Get all users with referral data
//   const getAllUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get(
//         `http://localhost:8774/api/admin/getAllTeachers/${admin?._id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         setUsers(res.data.success);
//         setFilteredUsers(res.data.success);
//       }
//     } catch (error) {
//       console.error("Error fetching users:", error);
//       swal("Error", "Failed to load user data", "error");
//     } finally {
//       setLoading(false);
//     }
//   };


//   const getReferralDetails = async (userId) => {
//     try {
//       setLoadingReferralDetails(true);
//       const res = await axios.get(
//         `http://localhost:8774/api/admin/getReferralDetails/${userId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.status === 200) {
//         setReferralDetails(res.data.success);
//       }
//     } catch (error) {
//       console.error("Error fetching referral details:", error);
//       swal("Error", "Failed to load referral details", "error");
//     } finally {
//       setLoadingReferralDetails(false);
//     }
//   };

//   // Sort functionality
//   const requestSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });

//     const sortedUsers = [...filteredUsers].sort((a, b) => {
//       // Handle nested objects
//       let aValue, bValue;
//       if (key.includes('.')) {
//         const keys = key.split('.');
//         aValue = a[keys[0]] ? a[keys[0]][keys[1]] : '';  
//         bValue = b[keys[0]] ? b[keys[0]][keys[1]] : '';
//       } else {
//         aValue = a[key];
//         bValue = b[key];
//       }

//       if (aValue < bValue) {
//         return direction === 'asc' ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });

//     setFilteredUsers(sortedUsers);
//   };

//   // Search filter functionality
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
    
//     if (value.trim() === "") {
//       setFilteredUsers(users);
//     } else {
//       const filtered = users.filter(user => 
//         (user.FirstName && user.FirstName.toLowerCase().includes(value)) || 
//         (user.LastName && user.LastName.toLowerCase().includes(value)) ||
//         (user.Mobile && user.Mobile.toLowerCase().includes(value)) ||
//         (user.whatsAppNumber && user.whatsAppNumber.toLowerCase().includes(value)) ||
//         (user.teacherId && user.teacherId.toLowerCase().includes(value)) ||
//         (user.Country && user.Country.toLowerCase().includes(value)) ||
//         (user.State && user.State.toLowerCase().includes(value)) ||
//         (user.City && user.City.toLowerCase().includes(value)) ||
//         (user.referralCode && user.referralCode.toLowerCase().includes(value)) ||
//         (user.referredBy && user.referredBy.toLowerCase().includes(value)) ||
//         (user.referredByTeacher && (
//           (user.referredByTeacher.FirstName && user.referredByTeacher.FirstName.toLowerCase().includes(value)) ||
//           (user.referredByTeacher.LastName && user.referredByTeacher.LastName.toLowerCase().includes(value)) ||
//           (user.referredByTeacher.teacherId && user.referredByTeacher.teacherId.toLowerCase().includes(value))
//         )
//       ))
//       setFilteredUsers(filtered);
//     }
//   };

//   // Handle view user details
//   const handleViewUser = async (user) => {
//     setSelectedUser(user);
//     setShowUserModal(true);
//     setActiveTab('basic');
//     await getReferralDetails(user._id);
//   };

//   // Copy referral link
//   const copyReferralLink = (referralCode) => {
//     if (!referralCode) {
//       swal("Error", "This user doesn't have a referral code", "error");
//       return;
//     }
//     const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;
//     navigator.clipboard.writeText(referralLink);
//     swal("Copied!", "Referral link copied to clipboard!", "success");
//   };

//   // Copy text to clipboard
//   const copyToClipboard = (text) => {
//     navigator.clipboard.writeText(text);
//     swal("Copied!", "Text copied to clipboard!", "success");
//   };

//   useEffect(() => {
//     if (token) {
//       getAllUsers();
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [token]);

//   return (
//     <div className="container">
//       <h2 className="header-c" style={{ color: "#5140EB" }}>
//        Refferal Management
//       </h2>

//       {/* Search and Filter Section */}
//       <div className="mb-4">
//         <div className="input-group" style={{ maxWidth: '400px' }}>
//           <Form.Control
//             type="text"
//             placeholder="Search users..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//           <Button variant="outline-secondary">
//             <FaSearch />
//           </Button>
//         </div>
//       </div>

//       {/* Statistics Summary */}
//       <div className="row mb-4">
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaUserGraduate /> Total Users</h5>
//               <h3>{users.length}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaShareAlt /> Active Referrers</h5>
//               <h3>{users.filter(u => u.referralStats?.totalReferrals > 0).length}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaUserGraduate /> Total Referrals</h5>
//               <h3>{users.reduce((sum, user) => sum + (user.referralStats?.totalReferrals || 0), 0)}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//         <div className="col-md-3">
//           <Card className="text-center">
//             <Card.Body>
//               <h5><FaRupeeSign /> Total Earnings</h5>
//               <h3>₹{users.reduce((sum, user) => sum + (user.referralStats?.totalRewards || 0), 0)}</h3>
//             </Card.Body>
//           </Card>
//         </div>
//       </div>

//       {/* Users Table */}
//       <div className="card">
//         <div className="card-body">
//           <Table responsive bordered hover>
//             <thead className="table">
//               <tr>
//                 <th>S.No</th>
//                 <th onClick={() => requestSort('teacherId')}>User ID</th>
//                 <th onClick={() => requestSort('FirstName')}>Name</th>
//                 <th onClick={() => requestSort('Mobile')}>Mobile</th>
//                 <th onClick={() => requestSort('referredBy')}>Referred By</th>
//                 {/* <th>Referral Code</th> */}
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="9" className="text-center py-4">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">Loading...</span>
//                     </div>
//                   </td>
//                 </tr>
//               ) : filteredUsers.length > 0 ? (
//                 filteredUsers.map((user, index) => (
//                   <tr key={user._id}>
//                     <td>{index + 1}</td>
//                     <td>{user.teacherId}</td>
//                     <td>{user.FirstName} {user.LastName}</td>
//                     <td>{user.Mobile}</td>
//                     <td>
//                       {user.referredByTeacher ? (
//                         <span>
//                           {user.referredByTeacher.FirstName} {user.referredByTeacher.LastName} 
//                           <br />
//                           <small className="text-muted">({user.referredByTeacher.teacherId})</small>
//                         </span>
//                       ) : (
//                         <span className="text-muted">Not referred</span>
//                       )}
//                     </td>
                
//                     <td>
//                       <Button 
//                         variant="info" 
//                         size="sm" 
//                         onClick={() => handleViewUser(user)}
//                       >
//                         View
//                       </Button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="text-center py-4">
//                     No users found matching your search criteria
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </Table>
//         </div>
//       </div>

//       {/* User Details Modal */}
//       <Modal 
//         show={showUserModal} 
//         onHide={() => setShowUserModal(false)} 
//         size="lg"
//         scrollable
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>
//             User Details: {selectedUser?.FirstName} {selectedUser?.LastName}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
//           {selectedUser && (
//             <div>
//               <Tabs
//                 activeKey={activeTab}
//                 onSelect={(k) => setActiveTab(k)}
//                 className="mb-3"
//               >
//                 <Tab eventKey="basic" title={<><FaInfoCircle /> Basic Info</>}>
//                   <div className="row mt-3">
//                     <div className="col-md-6">
//                       <h5>Personal Information</h5>
//                       <p><strong>User ID:</strong> {selectedUser.teacherId}</p>
//                       <p><strong>Name:</strong> {selectedUser.FirstName} {selectedUser.LastName}</p>
//                       <p><strong>Email:</strong> {selectedUser.Email}</p>
//                       <p><strong>Mobile:</strong> {selectedUser.Mobile}</p>
//                       <p><strong>WhatsApp:</strong> {selectedUser.whatsAppNumber}</p>
//                       <p><strong>Join Date:</strong> {moment(selectedUser.createdAt).format("DD/MM/YYYY")}</p>
//                       <p><strong>Status:</strong> 
//                         <Badge bg={selectedUser.isBlock ? "danger" : "success"} className="ms-2">
//                           {selectedUser.isBlock ? "Blocked" : "Active"}
//                         </Badge>
//                       </p>
//                     </div>
//                     <div className="col-md-6">
//                       <h5>Location Details</h5>
//                       <p><strong>Country:</strong> {selectedUser.Country || 'Not provided'}</p>
//                       <p><strong>State:</strong> {selectedUser.State || 'Not provided'}</p>
//                       <p><strong>City:</strong> {selectedUser.City || 'Not provided'}</p>
                      
//                       <h5 className="mt-3">Referral Information</h5>
//                       <p>
//                         <strong>Referral Code:</strong> 
//                         {selectedUser.referralCode ? (
//                           <>
//                             <span className="ms-2">{selectedUser.referralCode}</span>
//                             <Button 
//                               variant="link" 
//                               size="sm" 
//                               onClick={() => copyReferralLink(selectedUser.referralCode)}
//                               title="Copy referral link"
//                             >
//                               <FaLink />
//                             </Button>
//                           </>
//                         ) : (
//                           <span className="text-muted ms-2">N/A</span>
//                         )}
//                       </p>
//                       <p><strong>Referral Status:</strong> 
//                         <Badge bg={selectedUser.isReferralActive ? "success" : "secondary"} className="ms-2">
//                           {selectedUser.isReferralActive ? "Active" : "Inactive"}
//                         </Badge>
//                       </p>
//                     </div>
//                   </div>
//                 </Tab>
                
//                 <Tab eventKey="bank" title={<><FaMoneyBillAlt /> Bank Details</>}>
//                   <div className="row mt-3">
//                     <div className="col-md-12">
//                       {selectedUser.bankDetails ? (
//                         <div>
//                           <h5>Bank Account Information</h5>
//                           <p><strong>Account Holder Name:</strong> {selectedUser.bankDetails.accountHolderName || 'Not provided'}</p>
//                           <p><strong>Account Number:</strong> {selectedUser.bankDetails.accountNumber || 'Not provided'}</p>
//                           <p><strong>Bank Name:</strong> {selectedUser.bankDetails.bankName || 'Not provided'}</p>
//                           <p><strong>Branch Name:</strong> {selectedUser.bankDetails.branchName || 'Not provided'}</p>
//                           <p><strong>IFSC Code:</strong> {selectedUser.bankDetails.ifsc || 'Not provided'}</p>
//                         </div>
//                       ) : (
//                         <div className="alert alert-info">
//                           No bank details provided by this user.
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </Tab>
                
//                 <Tab eventKey="referrals" title={<><FaShareAlt /> Referrals</>}>
//                   <div className="row mt-3">
//                     <div className="col-md-12">
//                       {loadingReferralDetails ? (
//                         <div className="text-center py-4">
//                           <Spinner animation="border" variant="primary" />
//                           <p>Loading referral details...</p>
//                         </div>
//                       ) : (
//                         <>
//                           <div className="row mb-4">
//                             <div className="col-md-6">
//                               <h5>Referral Statistics</h5>
//                               <ListGroup>
//                                 <ListGroup.Item>
//                                   <strong>Total Referrals:</strong> {referralDetails?.referralStats?.totalReferrals || 0}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                   <strong>Confirmed Referrals:</strong> {referralDetails?.referralStats?.confirmedReferrals || 0}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                   <strong>Pending Referrals:</strong> {referralDetails?.referralStats?.pendingReferrals || 0}
//                                 </ListGroup.Item>
//                                 <ListGroup.Item>
//                                   <strong>Total Rewards:</strong> ₹{referralDetails?.referralStats?.totalRewards || 0}
//                                 </ListGroup.Item>
//                               </ListGroup>
//                             </div>
                            
//                             <div className="col-md-6">
//                               <h5>Referrer Information</h5>
//                               {selectedUser.referredByTeacher ? (
//                                 <Card>
//                                   <Card.Body>
//                                     <div className="d-flex align-items-center">
//                                       <div className="me-3">
//                                         <FaUserTie size={40} />
//                                       </div>
//                                       <div>
//                                         <h6>{selectedUser.referredByTeacher.FirstName} {selectedUser.referredByTeacher.LastName}</h6>
//                                         <p className="mb-1">
//                                           <strong>ID:</strong> {selectedUser.referredByTeacher.teacherId}
//                                         </p>
//                                         <p className="mb-1">
//                                           <strong>Referral Code:</strong> {selectedUser.referredByTeacher.referralCode}
//                                         </p>
//                                         <Button 
//                                           variant="link" 
//                                           size="sm" 
//                                           onClick={() => handleViewUser(selectedUser.referredByTeacher)}
//                                         >
//                                           View Referrer Details
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </Card.Body>
//                                 </Card>
//                               ) : (
//                                 <div className="alert alert-info">
//                                   This user wasn't referred by anyone.
//                                 </div>
//                               )}
//                             </div>
//                           </div>
                          
//                           <h5 className="mb-3">Referred Users</h5>
//                           {referralDetails?.referrals && referralDetails.referrals.length > 0 ? (
//                             <div className="table-responsive">
//                               <Table striped bordered hover size="sm">
//                                 <thead>
//                                   <tr>
//                                     <th>#</th>
//                                     <th>Name</th>
//                                     <th>User ID</th>
//                                     <th>Join Date</th>
//                                     <th>Status</th>
//                                     <th>Actions</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {referralDetails.referrals.map((ref, index) => (
//                                     <tr key={ref._id}>
//                                       <td>{index + 1}</td>
//                                       <td>
//                                         {ref.teacherId?.FirstName} {ref.teacherId?.LastName}
//                                       </td>
//                                       <td>{ref.teacherId?.teacherId}</td>
//                                       <td>
//                                         {ref.teacherId?.createdAt ? 
//                                           moment(ref.teacherId.createdAt).format("DD/MM/YYYY") : 
//                                           moment(ref.referredAt).format("DD/MM/YYYY")}
//                                       </td>
//                                       <td>
//                                         <Badge bg={
//                                           ref.status === 'confirmed' ? 'success' : 
//                                           ref.status === 'rewarded' ? 'primary' : 'warning'
//                                         }>
//                                           {ref.status}
//                                         </Badge>
//                                       </td>
//                                       <td>
//                                         <Button 
//                                           variant="info" 
//                                           size="sm" 
//                                           onClick={() => handleViewUser(ref.teacherId)}
//                                           disabled={!ref.teacherId}
//                                         >
//                                           View
//                                         </Button>
//                                       </td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </Table>
//                             </div>
//                           ) : (
//                             <div className="alert alert-info">
//                               This user hasn't referred anyone yet.
//                             </div>
//                           )}
                          
//                           <h5 className="mt-4 mb-3">Referral Rewards</h5>
//                           {referralDetails?.referralRewards && referralDetails.referralRewards.length > 0 ? (
//                             <div className="table-responsive">
//                               <Table striped bordered hover size="sm">
//                                 <thead>
//                                   <tr>
//                                     <th>#</th>
//                                     <th>Referred User</th>
//                                     <th>Amount</th>
//                                     <th>Type</th>
//                                     <th>Date</th>
//                                     <th>Status</th>
//                                   </tr>
//                                 </thead>
//                                 <tbody>
//                                   {referralDetails.referralRewards.map((reward, index) => (
//                                     <tr key={index}>
//                                       <td>{index + 1}</td>
//                                       <td>
//                                         {reward.referredTeacher?.FirstName} {reward.referredTeacher?.LastName}
//                                       </td>
//                                       <td>₹{reward.rewardAmount}</td>
//                                       <td>{reward.rewardType}</td>
//                                       <td>{moment(reward.rewardDate).format("DD/MM/YYYY")}</td>
//                                       <td>
//                                         <Badge bg={
//                                           reward.status === 'paid' ? 'success' : 
//                                           reward.status === 'pending' ? 'warning' : 'danger'
//                                         }>
//                                           {reward.status}
//                                         </Badge>
//                                       </td>
//                                     </tr>
//                                   ))}
//                                 </tbody>
//                               </Table>
//                             </div>
//                           ) : (
//                             <div className="alert alert-info">
//                               No referral rewards recorded for this user.
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </Tab>
//               </Tabs>
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowUserModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default UserList;    
 
 
// import React, { useState, useEffect } from 'react';
// import { Form, Button, Card, Table, Alert, Spinner, Row, Col, Badge, Modal } from 'react-bootstrap';
// import { FaRupeeSign, FaUserTie, FaSearch, FaInfoCircle, FaUniversity } from 'react-icons/fa';
// import axios from 'axios';
// import moment from 'moment';
// import swal from 'sweetalert';

// const ReferrerManagementDashboard = () => {
//   const [baseReward, setBaseReward] = useState(100);
//   const [loading, setLoading] = useState(false);
//   const [teachers, setTeachers] = useState([]);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [alertMsg, setAlertMsg] = useState(null);
//   const [referralDetails, setReferralDetails] = useState(null);
//   const [loadingReferralDetails, setLoadingReferralDetails] = useState(false);

//   // Fetch current pricing and teacher data
//   useEffect(() => {
//     fetchCurrentPricing();
//     fetchTeacherData();
//   }, []);

//   const fetchCurrentPricing = async () => {
//     try {
//       const res = await axios.get('http://localhost:8774/api/admin/getCurrentPricing');
//       if (res.data.success) {
//         setBaseReward(res.data.success.baseReward);
//       }
//     } catch (error) {
//       console.error("Error fetching pricing:", error);
//       setAlertMsg({ type: 'danger', message: 'Failed to load current pricing.' });
//     }
//   };

//   const fetchTeacherData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const adminId = JSON.parse(localStorage.getItem('admin'))._id;
//       const res = await axios.get(`http://localhost:8774/api/admin/getAllTeachers/${adminId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (res.data.success) {
//         setTeachers(res.data.success);
//         setFilteredTeachers(res.data.success);
//       }
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//       setAlertMsg({ type: 'danger', message: 'Failed to load teacher data.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchReferralDetails = async (teacherId) => {
//     try {
//       setLoadingReferralDetails(true);
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:8774/api/admin/getReferralDetails/${teacherId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (res.data.success) {
//         setReferralDetails(res.data.success);
//       }
//     } catch (error) {
//       console.error("Error fetching referral details:", error);
//       setAlertMsg({ type: 'danger', message: 'Failed to load referral details.' });
//     } finally {
//       setLoadingReferralDetails(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
    
//     if (value.trim() === "") {
//       setFilteredTeachers(teachers);
//     } else {
//       const filtered = teachers.filter(teacher => 
//         (teacher.teacherId && teacher.teacherId.toLowerCase().includes(value)) || 
//         (teacher.FirstName && teacher.FirstName.toLowerCase().includes(value)) ||
//         (teacher.LastName && teacher.LastName.toLowerCase().includes(value)) ||
//         (teacher.Email && teacher.Email.toLowerCase().includes(value)) ||
//         (teacher.Mobile && teacher.Mobile.toLowerCase().includes(value)) ||
//         (teacher.referralCode && teacher.referralCode.toLowerCase().includes(value))
//       );
//       setFilteredTeachers(filtered);
//     }
//   };

//   const handleViewDetails = async (teacher) => {
//     setSelectedTeacher(teacher);
//     await fetchReferralDetails(teacher._id);
//     setShowDetailsModal(true);
//   };

//   const getTotalReferrers = () => {
//     return teachers.filter(teacher => teacher.referralStats?.totalReferrals > 0).length;
//   };

//   const getTotalReferrals = () => {
//     return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.totalReferrals || 0), 0);
//   };

//   const getTotalConfirmedReferrals = () => {
//     return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.confirmedReferrals || 0), 0);
//   };

//   const getTotalRewards = () => {
//     return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.totalRewards || 0), 0);
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4 text-primary">Referrer Management Dashboard</h2>

//       {alertMsg && (
//         <Alert variant={alertMsg.type} onClose={() => setAlertMsg(null)} dismissible>
//           {alertMsg.message}
//         </Alert>
//       )}

//       {/* Current Pricing Info */}
//       <Card className="mb-4 shadow-sm">
//         <Card.Header as="h5">Current Referral Pricing</Card.Header>
//         <Card.Body>
//           <Row>
//             <Col md={4}>
//               <div className="d-flex align-items-center">
//                 <FaRupeeSign size={24} className="me-2 text-success" />
//                 <div>
//                   <h5>Base Reward</h5>
//                   <h3>₹{baseReward}</h3>
//                 </div>
//               </div>
//             </Col>
//             <Col md={8}>
//               <p className="text-muted">
//                 This is the current amount rewarded for each successful referral. 
//                 To change this value, please use the Referral Pricing Configuration.
//               </p>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card>

//       {/* Search and Stats */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div className="input-group">
//             <Form.Control
//               type="text"
//               placeholder="Search referrers..."
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Button variant="outline-secondary">
//               <FaSearch />
//             </Button>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <div className="d-flex justify-content-end">
//             <div className="mx-2 text-center">
//               <h6>Active Referrers</h6>
//               <h4>{getTotalReferrers()}</h4>
//             </div>
//             <div className="mx-2 text-center">
//               <h6>Total Referrals</h6>
//               <h4>{getTotalReferrals()}</h4>
//             </div>
//             <div className="mx-2 text-center">
//               <h6>Total Rewards</h6>
//               <h4>₹{getTotalRewards()}</h4>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Teachers Table */}
//       <Card className="mb-4 shadow-sm">
//         <Card.Body>
//           {loading ? (
//             <div className="text-center py-4">
//               <Spinner animation="border" />
//               <p>Loading teacher data...</p>
//             </div>
//           ) : (
//             <Table responsive striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Teacher Details</th>
//                   <th>Referral Code</th>
//                   <th>Total Referrals</th>
//                   <th>Confirmed</th>
//                   <th>Total Earnings</th>
//                   <th>Bank Details</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTeachers.length > 0 ? (
//                   filteredTeachers
//                     .filter(teacher => teacher.referralStats?.totalReferrals > 0)
//                     .map((teacher, index) => (
//                       <tr key={teacher._id}>
//                         <td>{index + 1}</td>
//                         <td>
//                           <div>
//                             <strong>{teacher.FirstName} {teacher.LastName}</strong>
//                             <br />
//                             <small className="text-muted">ID: {teacher.teacherId}</small>
//                             <br />
//                             <small className="text-muted">{teacher.Email}</small>
//                             <br />
//                             <small className="text-muted">{teacher.Mobile}</small>
//                           </div>
//                         </td>
//                         <td>
//                           {teacher.teacherId}
//                         </td>
//                         <td>
//                           <Badge bg="primary" className="fs-6">
//                             {teacher.referralStats?.totalReferrals || 0}
//                           </Badge>
//                         </td>
//                         <td>
//                           <Badge bg="success" className="fs-6">
//                             {teacher.referralStats?.confirmedReferrals || 0}
//                           </Badge>
//                         </td>
//                         <td>
//                           <strong>₹{teacher.referralStats?.totalRewards || 0}</strong>
//                         </td>
//                         <td>
//                           {teacher.bankDetails ? (
//                             <div>
//                               <small>
//                                 <strong>{teacher.bankDetails.accountHolderName}</strong>
//                                 <br />
//                                 A/C: ***{teacher.bankDetails.accountNumber?.slice(-4)}
//                                 <br />
//                                 {teacher.bankDetails.bankName}
//                               </small>
//                             </div>
//                           ) : (
//                             <Badge bg="warning">Not Available</Badge>
//                           )}
//                         </td>
//                         <td>
//                           <Button 
//                             variant="info" 
//                             size="sm" 
//                             onClick={() => handleViewDetails(teacher)}
//                           >
//                             View Details
//                           </Button>
//                         </td>
//                       </tr>
//                     ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-center py-4">
//                       No referrers found matching your search criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Teacher Details Modal */}
//       <Modal 
//         show={showDetailsModal} 
//         onHide={() => setShowDetailsModal(false)} 
//         size="xl"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Referrer Complete Details: {selectedTeacher?.FirstName} {selectedTeacher?.LastName}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedTeacher && (
//             <div>
//               <Row className="mb-4">
//                 <Col md={6}>
//                   <Card>
//                     <Card.Header>
//                       <FaUserTie className="me-2" />
//                       Personal Information
//                     </Card.Header>
//                     <Card.Body>
//                       <p><strong>Name:</strong> {selectedTeacher.FirstName} {selectedTeacher.LastName}</p>
//                       <p><strong>Teacher ID:</strong> {selectedTeacher.teacherId}</p>
//                       <p><strong>Email:</strong> {selectedTeacher.Email}</p>
//                       <p><strong>Mobile:</strong> {selectedTeacher.Mobile}</p>
//                       <p><strong>WhatsApp:</strong> {selectedTeacher.whatsAppNumber || 'N/A'}</p>
//                       <p><strong>Referral Code:</strong> {selectedTeacher.referralCode || 'N/A'}</p>
//                       <p><strong>Join Date:</strong> {moment(selectedTeacher.createdAt).format("DD/MM/YYYY")}</p>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={6}>
//                   <Card>
//                     <Card.Header>
//                       <FaRupeeSign className="me-2" />
//                       Referral Statistics
//                     </Card.Header>
//                     <Card.Body>
//                       {loadingReferralDetails ? (
//                         <div className="text-center">
//                           <Spinner animation="border" />
//                           <p>Loading referral stats...</p>
//                         </div>
//                       ) : (
//                         <>
//                           <p><strong>Total Referrals:</strong> 
//                             <Badge bg="primary" className="ms-2 fs-6">
//                               {referralDetails?.referralStats?.totalReferrals || 0}
//                             </Badge>
//                           </p>
//                           <p><strong>Confirmed Referrals:</strong> 
//                             <Badge bg="success" className="ms-2 fs-6">
//                               {referralDetails?.referralStats?.confirmedReferrals || 0}
//                             </Badge>
//                           </p>
//                           <p><strong>Pending Referrals:</strong> 
//                             <Badge bg="warning" className="ms-2 fs-6">
//                               {(referralDetails?.referralStats?.totalReferrals || 0) - (referralDetails?.referralStats?.confirmedReferrals || 0)}
//                             </Badge>
//                           </p>
//                           <p><strong>Total Earnings:</strong> 
//                             <span className="ms-2 text-success fs-5">₹{referralDetails?.referralStats?.totalRewards || 0}</span>
//                           </p>
//                         </>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>

//               <Card className="mb-3">
//                 <Card.Header>
//                   <FaUniversity className="me-2" />
//                   Bank Details
//                 </Card.Header>
//                 <Card.Body>
//                   {selectedTeacher.bankDetails ? (
//                     <Row>
//                       <Col md={6}>
//                         <p><strong>Account Holder Name:</strong> {selectedTeacher.bankDetails.accountHolderName}</p>
//                         <p><strong>Account Number:</strong> {selectedTeacher.bankDetails.accountNumber}</p>
//                         <p><strong>Bank Name:</strong> {selectedTeacher.bankDetails.bankName}</p>
//                       </Col>
//                       <Col md={6}>
//                         <p><strong>IFSC Code:</strong> {selectedTeacher.bankDetails.ifsc}</p>
//                         <p><strong>Branch:</strong> {selectedTeacher.bankDetails.branchName || 'N/A'}</p>
//                         <p><strong>Account Type:</strong> {selectedTeacher.bankDetails.accountType || 'N/A'}</p>
//                       </Col>
//                     </Row>
//                   ) : (
//                     <div className="text-center py-3">
//                       <Badge bg="warning" className="fs-6">Bank details not provided</Badge>
//                       <p className="text-muted mt-2">The teacher hasn't added their bank details yet.</p>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>

//               {/* Referral List */}
//               {loadingReferralDetails ? (
//                 <div className="text-center py-4">
//                   <Spinner animation="border" />
//                   <p>Loading referral history...</p>
//                 </div>
//               ) : referralDetails?.referrals && referralDetails.referrals.length > 0 ? (
//                 <Card>
//                   <Card.Header>
//                     <FaInfoCircle className="me-2" />
//                     Referral History ({referralDetails.referrals.length})
//                   </Card.Header>
//                   <Card.Body>
//                     <Table responsive striped size="sm">
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Referred Teacher</th>
//                           <th>Join Date</th>
//                           <th>Status</th>
//                           <th>Reward</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {referralDetails.referrals.map((referral, idx) => (
//                           <tr key={idx}>
//                             <td>{idx + 1}</td>
//                             <td>
//                               {referral.teacherId ? (
//                                 <>
//                                   {referral.teacherId.FirstName} {referral.teacherId.LastName}
//                                   <br />
//                                   <small className="text-muted">({referral.teacherId.teacherId})</small>
//                                 </>
//                               ) : (
//                                 <span className="text-muted">Teacher data not available</span>
//                               )}
//                             </td>
//                             <td>
//                               {referral.teacherId?.createdAt ? 
//                                 moment(referral.teacherId.createdAt).format("DD/MM/YYYY") : 
//                                 moment(referral.referredAt).format("DD/MM/YYYY")}
//                             </td>
//                             <td>
//                               <Badge 
//                                 bg={referral.status === 'confirmed' ? 'success' : 'warning'}
//                               >
//                                 {referral.status}
//                               </Badge>
//                             </td>
//                             <td>₹{referral.status === 'confirmed' ? baseReward : 0}</td>
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </Card.Body>
//                 </Card>
//               ) : (
//                 <Card>
//                   <Card.Body className="text-center py-4">
//                     <p>No referral history found for this teacher.</p>
//                   </Card.Body>
//                 </Card>
//               )}
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ReferrerManagementDashboard;
 
 
//  import React, { useState, useEffect } from 'react';
// import { Form, Button, Card, Table, Alert, Spinner, Row, Col, Badge, Modal } from 'react-bootstrap';
// import { FaRupeeSign, FaUserTie, FaSearch, FaInfoCircle, FaUniversity, FaSyncAlt } from 'react-icons/fa';
// import axios from 'axios';
// import moment from 'moment';
// import swal from 'sweetalert';

// const ReferrerManagementDashboard = () => {
//   const [baseReward, setBaseReward] = useState(100);
//   const [loading, setLoading] = useState(false);
//   const [teachers, setTeachers] = useState([]);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedTeacher, setSelectedTeacher] = useState(null);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [alertMsg, setAlertMsg] = useState(null);
//   const [referralDetails, setReferralDetails] = useState(null);
//   const [loadingReferralDetails, setLoadingReferralDetails] = useState(false);
//   const [lastUpdated, setLastUpdated] = useState(null);
//   const [isRefreshing, setIsRefreshing] = useState(false);

//   // Fetch current pricing and teacher data
//   useEffect(() => {
//     fetchCurrentPricing();
//     fetchTeacherData();

//     // Set up auto-refresh
//     const interval = setInterval(() => {
//       fetchTeacherData();
//     }, 300000); // 5 minutes

//     return () => clearInterval(interval);
//   }, []);

//   const fetchCurrentPricing = async () => {
//     try {
//       const res = await axios.get('http://localhost:8774/api/admin/getCurrentPricing');
//       if (res.data.success) {
//         setBaseReward(res.data.success.baseReward);
//       }
//     } catch (error) {
//       console.error("Error fetching pricing:", error);
//       setAlertMsg({ type: 'danger', message: 'Failed to load current pricing.' });
//     }
//   };

//   const fetchTeacherData = async () => {
//     try {
//       setLoading(true);
//       setIsRefreshing(true);
//       const token = localStorage.getItem('token');
//       const adminId = JSON.parse(localStorage.getItem('admin'))._id;
//       const res = await axios.get(`http://localhost:8774/api/admin/getAllTeachers/${adminId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (res.data.success) {
//         setTeachers(res.data.success);
//         setFilteredTeachers(res.data.success);
//         setLastUpdated(new Date());
//       }
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//       setAlertMsg({ type: 'danger', message: 'Failed to load teacher data.' });
//     } finally {
//       setLoading(false);
//       setIsRefreshing(false);
//     }
//   };

//   const fetchReferralDetails = async (teacherId) => {
//     try {
//       setLoadingReferralDetails(true);
//       const token = localStorage.getItem('token');
//       const res = await axios.get(`http://localhost:8774/api/admin/getReferralDetails/${teacherId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       if (res.data.success) {
//         setReferralDetails(res.data.success);
//       }
//     } catch (error) {
//       console.error("Error fetching referral details:", error);
//       setAlertMsg({ type: 'danger', message: 'Failed to load referral details.' });
//     } finally {
//       setLoadingReferralDetails(false);
//     }
//   };

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchTerm(value);
    
//     if (value.trim() === "") {
//       setFilteredTeachers(teachers);
//     } else {
//       const filtered = teachers.filter(teacher => 
//         (teacher.teacherId && teacher.teacherId.toLowerCase().includes(value)) || 
//         (teacher.FirstName && teacher.FirstName.toLowerCase().includes(value)) ||
//         (teacher.LastName && teacher.LastName.toLowerCase().includes(value)) ||
//         (teacher.Email && teacher.Email.toLowerCase().includes(value)) ||
//         (teacher.Mobile && teacher.Mobile.toLowerCase().includes(value)) ||
//         (teacher.referralCode && teacher.referralCode.toLowerCase().includes(value))
//       );
//       setFilteredTeachers(filtered);
//     }
//   };

//   const handleViewDetails = async (teacher) => {
//     setSelectedTeacher(teacher);
//     await fetchReferralDetails(teacher._id);
//     setShowDetailsModal(true);
//   };

//   const handleRefresh = () => {
//     fetchTeacherData();
//     fetchCurrentPricing();
//   };

//   const getTotalReferrers = () => {
//     return teachers.filter(teacher => teacher.referralStats?.totalReferrals > 0).length;
//   };

//   const getTotalReferrals = () => {
//     return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.totalReferrals || 0), 0);
//   };

//   const getTotalConfirmedReferrals = () => {
//     return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.confirmedReferrals || 0), 0);
//   };

//   // const getTotalRewards = () => {
//   //   return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.totalRewards || 0), 0);
//   // }; 
   
//   const getTotalRewards = () => {
//   return teachers.reduce((sum, teacher) => {
//     const totalReferrals = teacher.referralStats?.totalReferrals || 0;
//     return sum + (baseReward * totalReferrals);
//   }, 0);
// };

//   const formatBankDetails = (bankDetails) => {
//     if (!bankDetails) return null;
    
//     return {
//       accountHolderName: bankDetails.accountHolderName || 'Not specified',
//       accountNumber: bankDetails.accountNumber ? `***${bankDetails.accountNumber.slice(-4)}` : 'Not provided',
//       bankName: bankDetails.bankName || 'Not specified',
//       ifsc: bankDetails.ifsc || 'Not provided',
//       branchName: bankDetails.branchName || 'Not specified',
//       lastUpdated: bankDetails.lastUpdated ? moment(bankDetails.lastUpdated).fromNow() : 'Unknown'
//     };
//   };

//   return (
//     <div className="container mt-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="text-primary">Referrer Management Dashboard</h2>
//         <div className="d-flex align-items-center">
//           {lastUpdated && (
//             <small className="text-muted me-3">
//               Last updated: {moment(lastUpdated).format('DD/MM/YYYY HH:mm')}
//             </small>
//           )}
//           <Button 
//             variant="outline-primary" 
//             size="sm" 
//             onClick={handleRefresh}
//             disabled={isRefreshing}
//           >
//             <FaSyncAlt className={isRefreshing ? "fa-spin" : ""} />
//           </Button>
//         </div>
//       </div>

//       {alertMsg && (
//         <Alert variant={alertMsg.type} onClose={() => setAlertMsg(null)} dismissible>
//           {alertMsg.message}
//         </Alert>
//       )}

//       {/* Current Pricing Info */}
//       {/* <Card className="mb-4 shadow-sm">
//         <Card.Header as="h5">Current Referral Pricing</Card.Header>
//         <Card.Body>
//           <Row>
//             <Col md={4}>
//               <div className="d-flex align-items-center">
//                 <FaRupeeSign size={24} className="me-2 text-success" />
//                 <div>
//                   <h5>Base Reward</h5>
//                   <h3>₹{baseReward}</h3>
//                 </div>
//               </div>
//             </Col>
//             <Col md={8}>
//               <p className="text-muted">
//                 This is the current amount rewarded for each successful referral. 
//                 To change this value, please use the Referral Pricing Configuration.
//               </p>
//             </Col>
//           </Row>
//         </Card.Body>
//       </Card> */}

//       {/* Search and Stats */}
//       <div className="row mb-4">
//         <div className="col-md-6">
//           <div className="input-group">
//             <Form.Control
//               type="text"
//               placeholder="Search referrers..."
//               value={searchTerm}
//               onChange={handleSearch}
//             />
//             <Button variant="outline-secondary">
//               <FaSearch />
//             </Button>
//           </div>
//         </div>
//         {/* <div className="col-md-6">
//           <div className="d-flex justify-content-end">
//             <div className="mx-2 text-center">
//               <h6>Active Referrers</h6>
//               <h4>{getTotalReferrers()}</h4>
//             </div>
//             <div className="mx-2 text-center">
//               <h6>Total Referrals</h6>
//               <h4>{getTotalReferrals()}</h4>
//             </div>
//             <div className="mx-2 text-center">
//               <h6>Confirmed Referrals</h6>
//               <h4>{getTotalConfirmedReferrals()}</h4>
//             </div>
//             <div className="mx-2 text-center">
//               <h6>Total Rewards</h6>
//               <h4>₹{getTotalRewards()}</h4>
//             </div>
//           </div>
//         </div> */}
//       </div>

//       {/* Teachers Table */}
//       <Card className="mb-4 shadow-sm">
//         <Card.Body>
//           {loading ? (
//             <div className="text-center py-4">
//               <Spinner animation="border" />
//               <p>Loading teacher data...</p>
//             </div>
//           ) : (
//             <Table responsive striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Teacher Details</th>
//                   <th>Referral Code</th>
//                   <th>Total Referrals</th>
                  
//                   <th>Total Earnings</th>
//                   <th>Bank Details</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTeachers.length > 0 ? (
//                   filteredTeachers
//                     .filter(teacher => teacher.referralStats?.totalReferrals > 0)
//                     .sort((a, b) => (b.referralStats?.totalReferrals || 0) - (a.referralStats?.totalReferrals || 0))
//                     .map((teacher, index) => {
//                       const formattedBankDetails = formatBankDetails(teacher.bankDetails);
                      
//                       return (
//                         <tr key={teacher._id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             <div>
//                               <strong>{teacher.FirstName} {teacher.LastName}</strong>
//                               <br />
//                               <small className="text-muted">ID: {teacher.teacherId}</small>
//                               <br />
//                               <small className="text-muted">{teacher.Email}</small>
//                               <br />
//                               <small className="text-muted">{teacher.Mobile}</small>
//                             </div>
//                           </td>
//                           <td>
//                             {teacher.teacherId}
//                           </td>
//                           <td>
//                             <Badge bg="primary" className="fs-6">
//                               {teacher.referralStats?.totalReferrals || 0}
//                             </Badge>
//                           </td>
                          
//                           <td>
//                             <strong>₹{getTotalRewards()}</strong>
//                           </td>
//                           <td>
//                             {formattedBankDetails ? (
//                               <div>
//                                 <small>
//                                   <strong>{formattedBankDetails.accountHolderName}</strong>
//                                   <br />
//                                   A/C: {formattedBankDetails.accountNumber}
//                                   <br />
//                                   {formattedBankDetails.bankName}
//                                   {formattedBankDetails.ifsc !== 'Not provided' && ` (${formattedBankDetails.ifsc})`}
//                                 </small>
                             
//                               </div>
//                             ) : (
//                               <Badge bg="warning">Not Available</Badge>
//                             )}
//                           </td>
//                           <td>
//                             <Button 
//                               variant="info" 
//                               size="sm" 
//                               onClick={() => handleViewDetails(teacher)}
//                             >
//                               View Details
//                             </Button>
//                           </td>
//                         </tr>
//                       );
//                     })
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="text-center py-4">
//                       No referrers found matching your search criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </Table>
//           )}
//         </Card.Body>
//       </Card>

//       {/* Teacher Details Modal */}
//       <Modal 
//         show={showDetailsModal} 
//         onHide={() => setShowDetailsModal(false)} 
//         size="lg"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>Referrer Complete Details: {selectedTeacher?.FirstName} {selectedTeacher?.LastName}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedTeacher && (
//             <div>
//               <Row className="mb-4">
//                 <Col md={6}>
//                   <Card>
//                     <Card.Header>
//                       <FaUserTie className="me-2" />
//                       Personal Information
//                     </Card.Header>
//                     <Card.Body>
//                       <p><strong>Name:</strong> {selectedTeacher.FirstName} {selectedTeacher.LastName}</p>
//                       <p><strong>Teacher ID:</strong> {selectedTeacher.teacherId}</p>
//                       <p><strong>Email:</strong> {selectedTeacher.Email}</p>
//                       <p><strong>Mobile:</strong> {selectedTeacher.Mobile}</p>
//                       <p><strong>WhatsApp:</strong> {selectedTeacher.whatsAppNumber || 'N/A'}</p>
//                       <p><strong>Referral Code:</strong> { selectedTeacher.teacherId}</p>
//                       <p><strong>Join Date:</strong> {moment(selectedTeacher.createdAt).format("DD/MM/YYYY")}</p>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//                 <Col md={6}>
//                   <Card>
//                     <Card.Header>
//                       <FaRupeeSign className="me-2" />
//                       Referral Statistics
//                     </Card.Header>
//                     <Card.Body>
//                       {loadingReferralDetails ? (
//                         <div className="text-center">
//                           <Spinner animation="border" />
//                           <p>Loading referral stats...</p>
//                         </div>
//                       ) : (
//                         <>
//                           <p><strong>Total Referrals:</strong> 
//                             <Badge bg="primary" className="ms-2 fs-6">
//                               {referralDetails?.referralStats?.totalReferrals || 0}
//                             </Badge>
//                           </p>
                          
//                           <p><strong>Confirmed Referrals:</strong> 
//                             <Badge bg="warning" className="ms-2 fs-6">
//                               {(referralDetails?.referralStats?.totalReferrals || 0) - (referralDetails?.referralStats?.confirmedReferrals || 0)}
//                             </Badge>
//                           </p>
//                           <p><strong>Total Earnings:</strong> 
//                             <span className="ms-2 text-success fs-5">₹{getTotalRewards()}</span>
//                           </p>
//                         </>
//                       )}
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               </Row>

//               <Card className="mb-3">
//                 <Card.Header>
//                   <FaUniversity className="me-2" />
//                   Bank Details
//                 </Card.Header>
//                 <Card.Body>
//                   {selectedTeacher.bankDetails ? (
//                     <Row>
//                       <Col md={6}>
//                         <p><strong>Account Holder Name:</strong> {selectedTeacher.bankDetails.accountHolderName}</p>
//                         <p><strong>Account Number:</strong> {selectedTeacher.bankDetails.accountNumber}</p>
//                         <p><strong>Bank Name:</strong> {selectedTeacher.bankDetails.bankName}</p>
//                       </Col>
//                       <Col md={6}>
//                         <p><strong>IFSC Code:</strong> {selectedTeacher.bankDetails.ifsc}</p>
//                         <p><strong>Branch:</strong> {selectedTeacher.bankDetails.branchName || 'N/A'}</p>
//                         {/* <p>
//                           <strong>Last Updated:</strong> 
//                           {selectedTeacher.bankDetails.lastUpdated ? 
//                             ` ${moment(selectedTeacher.bankDetails.lastUpdated).fromNow()}` : 
//                             ' Unknown'}
//                         </p> */}
//                       </Col>
//                     </Row>
//                   ) : (
//                     <div className="text-center py-3">
//                       <Badge bg="warning" className="fs-6">Bank details not provided</Badge>
//                       <p className="text-muted mt-2">The teacher hasn't added their bank details yet.</p>
//                     </div>
//                   )}
//                 </Card.Body>
//               </Card>

//               {/* Referral List */}
//               {loadingReferralDetails ? (
//                 <div className="text-center py-4">
//                   <Spinner animation="border" />
//                   <p>Loading referral history...</p>
//                 </div>
//               ) : referralDetails?.referrals && referralDetails.referrals.length > 0 ? (
//                 <Card>
//                   <Card.Header>
//                     <FaInfoCircle className="me-2" />
//                     Referral History ({referralDetails.referrals.length})
//                   </Card.Header>
//                   <Card.Body>
//                     <Table responsive striped size="sm">
//                       <thead>
//                         <tr>
//                           <th>#</th>
//                           <th>Referred Teacher</th>
//                           <th>Join Date</th>
                         
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {referralDetails.referrals.map((referral, idx) => (
//                           <tr key={idx}>
//                             <td>{idx + 1}</td>
//                             <td>
//                               {referral.teacherId ? (
//                                 <>
//                                   {referral.teacherId.FirstName} {referral.teacherId.LastName}
//                                   <br />
//                                   <small className="text-muted">({referral.teacherId.teacherId})</small>
//                                 </>
//                               ) : (
//                                 <span className="text-muted">Teacher data not available</span>
//                               )}
//                             </td>
//                             <td>
//                               {referral.teacherId?.createdAt ? 
//                                 moment(referral.teacherId.createdAt).format("DD/MM/YYYY") : 
//                                 moment(referral.referredAt).format("DD/MM/YYYY")}
//                             </td>
//                             {/* <td>
//                               <Badge 
//                                 bg={referral.status === 'confirmed' ? 'success' : 'warning'}
//                               >
//                                 {referral.status}
//                               </Badge>
//                             </td>
//                             <td>₹{referral.status === 'confirmed' ? baseReward : 0}</td> */}
//                           </tr>
//                         ))}
//                       </tbody>
//                     </Table>
//                   </Card.Body>
//                 </Card>
//               ) : (
//                 <Card>
//                   <Card.Body className="text-center py-4">
//                     <p>No referral history found for this teacher.</p>
//                   </Card.Body>
//                 </Card>
//               )}
//             </div>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default ReferrerManagementDashboard; 
 
 
 
import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Table, Alert, Spinner, Row, Col, Badge, Modal } from 'react-bootstrap';
import { FaRupeeSign, FaUserTie, FaSearch, FaInfoCircle, FaUniversity, FaSyncAlt } from 'react-icons/fa';
import axios from 'axios';
import moment from 'moment';
import swal from 'sweetalert';

const ReferrerManagementDashboard = () => {
  const [baseReward, setBaseReward] = useState(100);
  const [loading, setLoading] = useState(false);
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [referralDetails, setReferralDetails] = useState(null);
  const [loadingReferralDetails, setLoadingReferralDetails] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch current pricing and teacher data
  useEffect(() => {
    fetchCurrentPricing();
    fetchTeacherData();

    // Set up auto-refresh
    const interval = setInterval(() => {
      fetchTeacherData();
    }, 300000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  const fetchCurrentPricing = async () => {
    try {
      const res = await axios.get('http://localhost:8774/api/admin/getCurrentPricing');
      if (res.data.success) {
        setBaseReward(res.data.success.baseReward);
      }
    } catch (error) {
      console.error("Error fetching pricing:", error);
      setAlertMsg({ type: 'danger', message: 'Failed to load current pricing.' });
    }
  };

  const fetchTeacherData = async () => {
    try {
      setLoading(true);
      setIsRefreshing(true);
      const token = localStorage.getItem('token');
      const adminId = JSON.parse(localStorage.getItem('admin'))._id;
      const res = await axios.get(`http://localhost:8774/api/admin/getAllTeachers/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        setTeachers(res.data.success);
        setFilteredTeachers(res.data.success);
        setLastUpdated(new Date());
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
      setAlertMsg({ type: 'danger', message: 'Failed to load teacher data.' });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const fetchReferralDetails = async (teacherId) => {
    try {
      setLoadingReferralDetails(true);
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:8774/api/admin/getReferralDetails/${teacherId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        setReferralDetails(res.data.success);
      }
    } catch (error) {
      console.error("Error fetching referral details:", error);
      setAlertMsg({ type: 'danger', message: 'Failed to load referral details.' });
    } finally {
      setLoadingReferralDetails(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    if (value.trim() === "") {
      setFilteredTeachers(teachers);
    } else {
      const filtered = teachers.filter(teacher => 
        (teacher.teacherId && teacher.teacherId.toLowerCase().includes(value)) || 
        (teacher.FirstName && teacher.FirstName.toLowerCase().includes(value)) ||
        (teacher.LastName && teacher.LastName.toLowerCase().includes(value)) ||
        (teacher.Email && teacher.Email.toLowerCase().includes(value)) ||
        (teacher.Mobile && teacher.Mobile.toLowerCase().includes(value)) ||
        (teacher.referralCode && teacher.referralCode.toLowerCase().includes(value))
      );
      setFilteredTeachers(filtered);
    }
  };

  const handleViewDetails = async (teacher) => {
    setSelectedTeacher(teacher);
    await fetchReferralDetails(teacher._id);
    setShowDetailsModal(true);
  };

  const handleRefresh = () => {
    fetchTeacherData();
    fetchCurrentPricing();
  };

  const getTotalReferrers = () => {
    return teachers.filter(teacher => teacher.referralStats?.totalReferrals > 0).length;
  };

  const getTotalReferrals = () => {
    return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.totalReferrals || 0), 0);
  };

  const getTotalConfirmedReferrals = () => {
    return teachers.reduce((sum, teacher) => sum + (teacher.referralStats?.confirmedReferrals || 0), 0);
  };

  const getTotalRewards = () => {
    return teachers.reduce((sum, teacher) => sum + (baseReward * (teacher.referralStats?.totalReferrals || 0)), 0);
  };

  const getTeacherRewards = (teacher) => {
    return baseReward * (teacher.referralStats?.totalReferrals || 0);
  };

  const formatBankDetails = (bankDetails) => {
    if (!bankDetails) return null;
    
    return {
      accountHolderName: bankDetails.accountHolderName || 'Not specified',
      accountNumber: bankDetails.accountNumber ? `***${bankDetails.accountNumber.slice(-4)}` : 'Not provided',
      bankName: bankDetails.bankName || 'Not specified',
      ifsc: bankDetails.ifsc || 'Not provided',
      branchName: bankDetails.branchName || 'Not specified',
      lastUpdated: bankDetails.lastUpdated ? moment(bankDetails.lastUpdated).fromNow() : 'Unknown'
    };
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Referrer Management Dashboard</h2>
        <div className="d-flex align-items-center">
          {lastUpdated && (
            <small className="text-muted me-3">
              Last updated: {moment(lastUpdated).format('DD/MM/YYYY HH:mm')}
            </small>
          )}
          <Button 
            variant="outline-primary" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <FaSyncAlt className={isRefreshing ? "fa-spin" : ""} />
          </Button>
        </div>
      </div>

      {alertMsg && (
        <Alert variant={alertMsg.type} onClose={() => setAlertMsg(null)} dismissible>
          {alertMsg.message}
        </Alert>
      )}

      {/* Current Pricing Info */}
      <Card className="mb-4 shadow-sm">
        <Card.Header as="h5">Current Referral Pricing</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <div className="d-flex align-items-center">
                <FaRupeeSign size={24} className="me-2 text-success" />
                <div>
                  <h5>Base Reward</h5>
                  <h3>₹{baseReward}</h3>
                </div>
              </div>
            </Col>
            <Col md={8}>
              <p className="text-muted">
                This is the current amount rewarded for each successful referral. 
                To change this value, please use the Referral Pricing Configuration.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Search and Stats */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="input-group">
            <Form.Control
              type="text"
              placeholder="Search referrers..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="outline-secondary">
              <FaSearch />
            </Button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="d-flex justify-content-end">
            <div className="mx-2 text-center">
              <h6>Active Referrers</h6>
              <h4>{getTotalReferrers()}</h4>
            </div>
            <div className="mx-2 text-center">
              <h6>Total Referrals</h6>
              <h4>{getTotalReferrals()}</h4>
            </div>
            <div className="mx-2 text-center">
              <h6>Confirmed Referrals</h6>
              <h4>{getTotalConfirmedReferrals()}</h4>
            </div>
            <div className="mx-2 text-center">
              <h6>Total Rewards</h6>
              <h4>₹{getTotalRewards()}</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" />
              <p>Loading teacher data...</p>
            </div>
          ) : (
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Teacher Details</th>
                  <th>Referral Code</th>
                  <th>Total Referrals</th>
                  <th>Confirmed Referrals</th>
                  <th>Total Earnings</th>
                  <th>Bank Details</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.length > 0 ? (
                  filteredTeachers
                    .filter(teacher => teacher.referralStats?.totalReferrals > 0)
                    .sort((a, b) => (b.referralStats?.totalReferrals || 0) - (a.referralStats?.totalReferrals || 0))
                    .map((teacher, index) => {
                      const formattedBankDetails = formatBankDetails(teacher.bankDetails);
                      
                      return (
                        <tr key={teacher._id}>
                          <td>{index + 1}</td>
                          <td>
                            <div>
                              <strong>{teacher.FirstName} {teacher.LastName}</strong>
                              <br />
                              <small className="text-muted">ID: {teacher.teacherId}</small>
                              <br />
                              <small className="text-muted">{teacher.Email}</small>
                              <br />
                              <small className="text-muted">{teacher.Mobile}</small>
                            </div>
                          </td>
                          <td>
                            {teacher.teacherId}
                          </td>
                          <td>
                            <Badge bg="primary" className="fs-6">
                              {teacher.referralStats?.totalReferrals || 0}
                            </Badge>
                          </td>
                          <td>
                            <Badge bg="success" className="fs-6">
                              {teacher.referralStats?.confirmedReferrals || 0}
                            </Badge>
                          </td>
                          <td>
                            <strong>₹{getTeacherRewards(teacher)}</strong>
                          </td>
                          <td>
                            {formattedBankDetails ? (
                              <div>
                                <small>
                                  <strong>{formattedBankDetails.accountHolderName}</strong>
                                  <br />
                                  A/C: {formattedBankDetails.accountNumber}
                                  <br />
                                  {formattedBankDetails.bankName}
                                  {formattedBankDetails.ifsc !== 'Not provided' && ` (${formattedBankDetails.ifsc})`}
                                </small>
                              </div>
                            ) : (
                              <Badge bg="warning">Not Available</Badge>
                            )}
                          </td>
                          <td>
                            <Button 
                              variant="info" 
                              size="sm" 
                              onClick={() => handleViewDetails(teacher)}
                            >
                              View Details
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">
                      No referrers found matching your search criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* Teacher Details Modal */}
      <Modal 
        show={showDetailsModal} 
        onHide={() => setShowDetailsModal(false)} 
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Referrer Complete Details: {selectedTeacher?.FirstName} {selectedTeacher?.LastName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTeacher && (
            <div>
              <Row className="mb-4">
                <Col md={6}>
                  <Card>
                    <Card.Header>
                      <FaUserTie className="me-2" />
                      Personal Information
                    </Card.Header>
                    <Card.Body>
                      <p><strong>Name:</strong> {selectedTeacher.FirstName} {selectedTeacher.LastName}</p>
                      <p><strong>Teacher ID:</strong> {selectedTeacher.teacherId}</p>
                      <p><strong>Email:</strong> {selectedTeacher.Email}</p>
                      <p><strong>Mobile:</strong> {selectedTeacher.Mobile}</p>
                      <p><strong>WhatsApp:</strong> {selectedTeacher.whatsAppNumber || 'N/A'}</p>
                      <p><strong>Referral Code:</strong> {selectedTeacher.teacherId}</p>
                      <p><strong>Join Date:</strong> {moment(selectedTeacher.createdAt).format("DD/MM/YYYY")}</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card>
                    <Card.Header>
                      <FaRupeeSign className="me-2" />
                      Referral Statistics
                    </Card.Header>
                    <Card.Body>
                      {loadingReferralDetails ? (
                        <div className="text-center">
                          <Spinner animation="border" />
                          <p>Loading referral stats...</p>
                        </div>
                      ) : (
                        <>
                          <p><strong>Total Referrals:</strong> 
                            <Badge bg="primary" className="ms-2 fs-6">
                              {referralDetails?.referralStats?.totalReferrals || 0}
                            </Badge>
                          </p>
                          <p><strong>Confirmed Referrals:</strong> 
                            <Badge bg="success" className="ms-2 fs-6">
                              {referralDetails?.referralStats?.confirmedReferrals || 0}
                            </Badge>
                          </p>
                          <p><strong>Total Earnings:</strong> 
                            <span className="ms-2 text-success fs-5">₹{getTeacherRewards(selectedTeacher)}</span>
                          </p>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="mb-3">
                <Card.Header>
                  <FaUniversity className="me-2" />
                  Bank Details
                </Card.Header>
                <Card.Body>
                  {selectedTeacher.bankDetails ? (
                    <Row>
                      <Col md={6}>
                        <p><strong>Account Holder Name:</strong> {selectedTeacher.bankDetails.accountHolderName}</p>
                        <p><strong>Account Number:</strong> {selectedTeacher.bankDetails.accountNumber}</p>
                        <p><strong>Bank Name:</strong> {selectedTeacher.bankDetails.bankName}</p>
                      </Col>
                      <Col md={6}>
                        <p><strong>IFSC Code:</strong> {selectedTeacher.bankDetails.ifsc}</p>
                        <p><strong>Branch:</strong> {selectedTeacher.bankDetails.branchName || 'N/A'}</p>
                      </Col>
                    </Row>
                  ) : (
                    <div className="text-center py-3">
                      <Badge bg="warning" className="fs-6">Bank details not provided</Badge>
                      <p className="text-muted mt-2">The teacher hasn't added their bank details yet.</p>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* Referral List */}
              {loadingReferralDetails ? (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                  <p>Loading referral history...</p>
                </div>
              ) : referralDetails?.referrals && referralDetails.referrals.length > 0 ? (
                <Card>
                  <Card.Header>
                    <FaInfoCircle className="me-2" />
                    Referral History ({referralDetails.referrals.length})
                  </Card.Header>
                  <Card.Body>
                    <Table responsive striped size="sm">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Referred Teacher</th>
                          <th>Join Date</th>
                          <th>Status</th>
                          <th>Reward</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referralDetails.referrals.map((referral, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>
                              {referral.teacherId ? (
                                <>
                                  {referral.teacherId.FirstName} {referral.teacherId.LastName}
                                  <br />
                                  <small className="text-muted">({referral.teacherId.teacherId})</small>
                                </>
                              ) : (
                                <span className="text-muted">Teacher data not available</span>
                              )}
                            </td>
                            <td>
                              {referral.teacherId?.createdAt ? 
                                moment(referral.teacherId.createdAt).format("DD/MM/YYYY") : 
                                moment(referral.referredAt).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              <Badge 
                                bg={referral.status === 'confirmed' ? 'success' : 'warning'}
                              >
                                {referral.status}
                              </Badge>
                            </td>
                            <td>₹{referral.status === 'confirmed' ? baseReward : 0}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              ) : (
                <Card>
                  <Card.Body className="text-center py-4">
                    <p>No referral history found for this teacher.</p>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReferrerManagementDashboard;
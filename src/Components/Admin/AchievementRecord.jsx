"use client"

import { useState, useEffect, useRef } from "react"
import { Container, Row, Col, Form, Table, Button, Alert, Spinner, Modal, Pagination } from "react-bootstrap"
import { LuPrinter } from "react-icons/lu"
import {
  FaEdit,
  FaSave,
  FaSearch,
  FaPlus,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaDownload,
} from "react-icons/fa"
import axios from "axios"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import "bootstrap/dist/css/bootstrap.min.css"

const API_BASE_URL = "http://localhost:8774/api/ResultSheet"     
  

const ResultSheet = () => {
  // State management
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [currentStudent, setCurrentStudent] = useState(null)
  const [showStudentModal, setShowStudentModal] = useState(false)
  const [showResultModal, setShowResultModal] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [schoolName, setSchoolName] = useState("SCHOOL NAME")
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState(null)
  const [classes, setClasses] = useState([])
  const [selectedClass, setSelectedClass] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(10)
  const [downloadingPDF, setDownloadingPDF] = useState(false)
  const formRef = useRef(null)      
  const [studentResultManagements, setstudentResultManagements] = useState([])     


  // Initial student structure  
  const initialStudent = {
    schoolName: "",
    academicYear: "",
    medium: "",
    board: "",
    className: "",
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    bloodGroup: "",
    registerNumber: "",
    parentContact: "",
    aadhaarNumber: "",
    gender: "",
    caste: "",
    category: "",
    height: "",
    weight: "",
    address: {
      state: "",
      district: "",
      taluk: "",
      village: "",
      city: "",
      pincode: "",
    },
    subjects: {
      firstLanguage: { name: "First Language", FA1: 0, FA2: 0, SA1: 0, FA3: 0, FA4: 0, SA2: 0 },
      secondLanguage: { name: "Second Language", FA1: 0, FA2: 0, SA1: 0, FA3: 0, FA4: 0, SA2: 0 },
      mathematics: { name: "Mathematics", FA1: 0, FA2: 0, SA1: 0, FA3: 0, FA4: 0, SA2: 0 },
      science: { name: "Science", FA1: 0, FA2: 0, SA1: 0, FA3: 0, FA4: 0, SA2: 0 },
      socialScience: { name: "Social Science", FA1: 0, FA2: 0, SA1: 0, FA3: 0, FA4: 0, SA2: 0 },
      environmentScience: { name: "Environment Science", FA1: 0, FA2: 0, SA1: 0, FA3: 0, FA4: 0, SA2: 0 },
    },
    coScholastic: {
      physicalEducation: "",
      art: "",
      music: "",
      supw: "",
    },
    attendance: {
      semester1: { attended: 0, workingDays: 0 },
      semester2: { attended: 0, workingDays: 0 },
    },
    specialAchievements: "",
  }

  // Fetch data on component mount
  useEffect(() => {
    fetchClasses()
    fetchAllStudents()
  }, [])

  // Filter students based on search and class
  useEffect(() => {
    let filtered = students

    if (searchTerm) {
      filtered = filtered.filter(
        (student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.registerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          student.fatherName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedClass) {
      filtered = filtered.filter((student) => student.className === selectedClass)
    }

    setFilteredStudents(filtered)
    setCurrentPage(1)
  }, [students, searchTerm, selectedClass])

  const fetchClasses = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/classes`)
      setClasses(response.data.data || [])
    } catch (error) {
      console.error("Error fetching classes:", error)
    }
  }

  const fetchAllStudents = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}?limit=100`)     
      console.log("response...........",response)
      
      setStudents(response.data.data || [])
      setLoading(false)
    } catch (error) {
      console.error("Error fetching students:", error)
      setError("Failed to load students")
      setLoading(false)
    }
  }

  const fetchStudentDetails = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_BASE_URL}/${id}`)
      setCurrentStudent(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching student details:", error)
      setLoading(false)
      setError("Failed to load student details")
    }
  }    
   const studentResultManagement = async (id) => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:8774/api/admin/getAllResultManagement`)
      console.log("response...........",response)
      setstudentResultManagements(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching student details:", error)
      setLoading(false)
      setError("Failed to load student details")
    }
  }     
   
  console.log(studentResultManagements,"studentResultManagements...............")
  useEffect(() => {
    studentResultManagement()
  }, [])

  const handleAddNewStudent = () => {
    setCurrentStudent({ ...initialStudent, schoolName })
    setIsEditing(true)
    setShowStudentModal(true)
  }

  const handleEditStudent = async (studentId) => {
    await fetchStudentDetails(studentId)
    setIsEditing(true)
    setShowStudentModal(true)
  }

  const handleViewResult = async (studentId) => {
    await fetchStudentDetails(studentId)
    setIsEditing(false)
    setShowResultModal(true)
  }

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(null)

      // Validate required fields
      if (
        !currentStudent.name ||
        !currentStudent.registerNumber ||
        !currentStudent.className ||
        !currentStudent.academicYear ||
        !currentStudent.schoolName
      ) {
        throw new Error("School Name, Academic Year, Name, Register Number, and Class are required fields")
      }

      const studentData = {
        ...currentStudent,
      }

      let response
      if (currentStudent._id) {
        // Update existing student
        response = await axios.put(`${API_BASE_URL}/${currentStudent._id}`, studentData)
        // Update the student in the local state
        setStudents((prev) =>
          prev.map((student) => (student._id === currentStudent._id ? response.data.data : student)),
        )
      } else {
        // Create new student
        response = await axios.post(API_BASE_URL, studentData)
        // Add the new student to the local state
        setStudents((prev) => [response.data.data, ...prev])
      }

      setCurrentStudent(response.data.data)
      setShowStudentModal(false)
      setIsEditing(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
      setLoading(false)
    } catch (error) {
      console.error("Error saving student:", error)
      setError(error.response?.data?.message || error.message)
      setLoading(false)
    }
  }

  const handleChange = (field, value) => {
    setCurrentStudent((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (field, value) => {
    setCurrentStudent((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value,
      },
    }))
  }

  const handleSubjectMarksChange = (subject, exam, value) => {
    const numValue = Math.min(100, Math.max(0, Number.parseInt(value) || 0))

    setCurrentStudent((prev) => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: {
          ...prev.subjects[subject],
          [exam]: numValue,
        },
      },
    }))
  }

  const calculateSubjectTotal = (subject, semester) => {
    if (!currentStudent?.subjects || !currentStudent.subjects[subject]) return 0
    const studentResultManagement = currentStudent.subjects[subject]
    if (semester === 1) {
      return Math.round(studentResultManagements[0]?.FA1 * studentResultManagements[0]?.FA1P + studentResultManagements[0]?.FA2 * studentResultManagements[0]?.FA2P +studentResultManagements[0]?.SA1 * studentResultManagements[0]?.SA1P)
    } else {
      return Math.round(studentResultManagements[0]?.FA3 *studentResultManagements[0]?.FA3P  + studentResultManagements[0]?.FA4 * studentResultManagements[0]?.FA4P+ studentResultManagements[0]?.SA2 * studentResultManagements[0]?.SA2P)
    }
  }

  const calculateSubjectGrade = (subject, semester) => {
    const total = calculateSubjectTotal(subject, semester)
    if (total < 30) return "F"
    if (total >= 90) return "A+"
    if (total >= 70) return "A"
    if (total >= 50) return "B+"
    if (total >= 30) return "B"
    return "F"
  }

  const calculateAttendancePercentage = (semester) => {
    if (!currentStudent?.attendance) return 0
    const attendance = semester === 1 ? currentStudent.attendance.semester1 : currentStudent.attendance.semester2
    if (!attendance || !attendance.workingDays || attendance.workingDays === 0) return 0
    return Math.round((attendance.attended / attendance.workingDays) * 100)
  }

  const calculateOverallResult = () => {
    const subjects = [
      "firstLanguage",
      "secondLanguage",
      "mathematics",
      "science",
      "socialScience",
      "environmentScience",
    ]
    for (const subject of subjects) {
      if (calculateSubjectGrade(subject, 1) === "F" || calculateSubjectGrade(subject, 2) === "F") {
        return "Fail"
      }
    }
    if (calculateAttendancePercentage(1) < 75 || calculateAttendancePercentage(2) < 75) {
      return "Fail (Attendance)"
    }
    return "Pass"
  }

  const createPDF = async () => {
    if (!currentStudent) return

    try {
      setDownloadingPDF(true)

      // Create a temporary div for PDF generation
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = document.querySelector("#printable-content").innerHTML
      tempDiv.style.position = "absolute"
      tempDiv.style.left = "-9999px"
      tempDiv.style.top = "0"
      tempDiv.style.width = "210mm" // A4 width
      tempDiv.style.backgroundColor = "white"
      tempDiv.style.padding = "20px"
      document.body.appendChild(tempDiv)

      const pdf = new jsPDF("portrait", "pt", "a4")
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()

      const canvas = await html2canvas(tempDiv, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
        width: tempDiv.scrollWidth,
        height: tempDiv.scrollHeight,
      })

      const img = canvas.toDataURL("image/png")
      const imgProperties = pdf.getImageProperties(img)
      const imgWidth = pdfWidth - 40 // Add margins
      const imgHeight = (imgProperties.height * imgWidth) / imgProperties.width

      let position = 20 // Top margin
      let remainingHeight = imgHeight

      pdf.addImage(img, "PNG", 20, position, imgWidth, imgHeight)

      while (remainingHeight > pdfHeight - 40) {
        // Account for margins
        position = -(pdfHeight - 40)
        remainingHeight -= pdfHeight - 40
        pdf.addPage()
        pdf.addImage(img, "PNG", 20, position, imgWidth, imgHeight)
      }

      // Clean up
      document.body.removeChild(tempDiv)

      pdf.save(`Result_Sheet_${currentStudent.registerNumber || "student"}_${currentStudent.name || "unknown"}.pdf`)
      setDownloadingPDF(false)
    } catch (error) {
      console.error("Error generating PDF:", error)
      setError("Failed to generate PDF")
      setDownloadingPDF(false)
    }
  }

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent)
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="my-4">
      {/* Notifications */}
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
          Changes saved successfully!
        </Alert>
      )}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )} 
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 " >
        <h3>Student Result Sheet Management</h3>
        <Button variant="success" onClick={handleAddNewStudent}>
          <FaPlus className="me-2" /> Add New Student
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-4 p-3 border rounded bg-light">
        <h5 className="mb-3">Search & Filter Students</h5>
        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Class Filter</Form.Label>
              <Form.Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
                <option value="">All Classes</option>
                {classes.map((cls, index) => (
                  <option key={index} value={cls}>
                    {cls}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={8}>
            <Form.Group>
              <Form.Label>Search Students</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="Search by name, register number, or father's name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="primary" className="ms-2">
                  <FaSearch />
                </Button>
              </div>
            </Form.Group>
          </Col>
        </Row>
      </div>

      {/* Students List */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5>All Students ({filteredStudents.length})</h5>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" />
            <p className="mt-2">Loading students...</p>
          </div>
        ) : currentStudents.length > 0 ? (
          <>
            <Table striped bordered hover responsive>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Register No.</th>
                  <th>Class</th>
                  <th>Father's Name</th>
                  <th>Academic Year</th>
                  <th>School</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.map((student, index) => (
                  <tr key={student._id}>
                    <td>{indexOfFirstStudent + index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.registerNumber}</td>
                    <td>{student.className}</td>
                    <td>{student.fatherName}</td>
                    <td>{student.academicYear}</td>
                    <td>{student.schoolName || schoolName}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditStudent(student._id)}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                      <Button variant="info" size="sm" onClick={() => handleViewResult(student._id)}>
                        <FaEye className="me-1" /> View Result
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center">
                <Pagination>
                  <Pagination.Prev disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
                    <FaChevronLeft />
                  </Pagination.Prev>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const page =
                      currentPage <= 3
                        ? i + 1
                        : currentPage >= totalPages - 2
                          ? totalPages - 4 + i
                          : currentPage - 2 + i
                    return (
                      <Pagination.Item key={page} active={page === currentPage} onClick={() => paginate(page)}>
                        {page}
                      </Pagination.Item>
                    )
                  })}
                  <Pagination.Next disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}>
                    <FaChevronRight />
                  </Pagination.Next>
                </Pagination>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-5 bg-light rounded">
            <h4>No students found</h4>
            <p>
              {searchTerm || selectedClass
                ? "No students match your search criteria"
                : 'Click "Add New Student" to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Student Form Modal */}
      <Modal show={showStudentModal} onHide={() => setShowStudentModal(false)} size="lg" backdrop="static" style={{zIndex:999999999}}>
        <Modal.Header closeButton>
          <Modal.Title>{currentStudent?._id ? "Edit Student" : "Add New Student"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "hidden" }}>
          {currentStudent && (
            <Container>
              {/* School Information */}
              <h5 className="mb-3">School Information</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      School Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.schoolName || ""}
                      onChange={(e) => handleChange("schoolName", e.target.value)}
                      placeholder="Enter school name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>
                      Academic Year <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.academicYear || ""}
                      onChange={(e) => handleChange("academicYear", e.target.value)}
                      placeholder="e.g., 2023-24"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Basic Information */}
              <h5 className="mb-3">Basic Information</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Medium</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.medium || ""}
                      onChange={(e) => handleChange("medium", e.target.value)}
                      placeholder="e.g., Kannada, English"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Board</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.board || ""}
                      onChange={(e) => handleChange("board", e.target.value)}
                      placeholder="e.g., State Board, CBSE"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      Class <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Select
                      value={currentStudent.className || ""}
                      onChange={(e) => handleChange("className", e.target.value)}
                      required
                    >
                      <option value="">Select Class</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((grade) => (
                        <option key={grade} value={grade}>
                          {grade}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      Student Name <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.name || ""}
                      onChange={(e) => handleChange("name", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>
                      Register Number <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.registerNumber || ""}
                      onChange={(e) => handleChange("registerNumber", e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Father's Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.fatherName || ""}
                      onChange={(e) => handleChange("fatherName", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Personal Details */}
              <h5 className="mb-3 mt-4">Personal Details</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Mother's Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.motherName || ""}
                      onChange={(e) => handleChange("motherName", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      value={currentStudent.dob ? new Date(currentStudent.dob).toISOString().split("T")[0] : ""}
                      onChange={(e) => handleChange("dob", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      value={currentStudent.gender || ""}
                      onChange={(e) => handleChange("gender", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Third Gender</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Blood Group</Form.Label>
                    <Form.Select
                      value={currentStudent.bloodGroup || ""}
                      onChange={(e) => handleChange("bloodGroup", e.target.value)}
                    >
                      <option value="">Select</option>
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Parent Contact</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.parentContact || ""}
                      onChange={(e) => handleChange("parentContact", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Aadhaar Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.aadhaarNumber || ""}
                      onChange={(e) => handleChange("aadhaarNumber", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label>Caste</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.caste || ""}
                      onChange={(e) => handleChange("caste", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.category || ""}
                      onChange={(e) => handleChange("category", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Height</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.height || ""}
                      onChange={(e) => handleChange("height", e.target.value)}
                      placeholder="e.g., 150 cm"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Weight</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.weight || ""}
                      onChange={(e) => handleChange("weight", e.target.value)}
                      placeholder="e.g., 45 kg"
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Address Section */}
              <h5 className="mb-3 mt-4">Address Details</h5>
              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.address?.state || ""}
                      onChange={(e) => handleAddressChange("state", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.address?.district || ""}
                      onChange={(e) => handleAddressChange("district", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Taluk</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.address?.taluk || ""}
                      onChange={(e) => handleAddressChange("taluk", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Village</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.address?.village || ""}
                      onChange={(e) => handleAddressChange("village", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.address?.city || ""}
                      onChange={(e) => handleAddressChange("city", e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Pincode</Form.Label>
                    <Form.Control
                      type="text"
                      value={currentStudent.address?.pincode || ""}
                      onChange={(e) => handleAddressChange("pincode", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Marks Section */}
              <h5 className="mb-3 mt-4">Academic Performance</h5>
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th rowSpan="2">Subject</th>
                    <th colSpan="4">Semester 1</th>
                    <th colSpan="4">Semester 2</th>
                  </tr>
                  <tr>
                    <th>FA-1</th>
                    <th>FA-2</th>
                    <th>SA-1</th>
                    <th>Total</th>
                    <th>FA-3</th>
                    <th>FA-4</th>
                    <th>SA-2</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    "firstLanguage",
                    "secondLanguage",
                    "mathematics",
                    "science",
                    "socialScience",
                    "environmentScience",
                  ].map((subject) => (
                    <tr key={subject}>
                      <td>
                        {currentStudent.subjects?.[subject]?.name ||
                          subject.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          size="sm"
                          value={currentStudent.subjects?.[subject]?.FA1 || ""}
                          onChange={(e) => handleSubjectMarksChange(subject, "FA1", e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          size="sm"
                          value={currentStudent.subjects?.[subject]?.FA2 || ""}
                          onChange={(e) => handleSubjectMarksChange(subject, "FA2", e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          size="sm"
                          value={currentStudent.subjects?.[subject]?.SA1 || ""}
                          onChange={(e) => handleSubjectMarksChange(subject, "SA1", e.target.value)}
                        />
                      </td>
                      <td>{calculateSubjectTotal(subject, 1)}</td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          size="sm"
                          value={currentStudent.subjects?.[subject]?.FA3 || ""}
                          onChange={(e) => handleSubjectMarksChange(subject, "FA3", e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          size="sm"
                          value={currentStudent.subjects?.[subject]?.FA4 || ""}
                          onChange={(e) => handleSubjectMarksChange(subject, "FA4", e.target.value)}
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="number"
                          min="0"
                          max="100"
                          size="sm"
                          value={currentStudent.subjects?.[subject]?.SA2 || ""}
                          onChange={(e) => handleSubjectMarksChange(subject, "SA2", e.target.value)}
                        />
                      </td>
                      <td>{calculateSubjectTotal(subject, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Co-Scholastic Activities */}
              <h5 className="mb-3 mt-4">Co-Scholastic Activities</h5>
              <Table bordered size="sm">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Semester 1 Grade</th>
                    <th>Semester 2 Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Physical Education</td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.physicalEducation || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            physicalEducation: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.physicalEducation || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            physicalEducation: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Art</td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.art || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            art: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.art || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            art: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>Music</td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.music || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            music: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.music || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            music: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>SUPW</td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.supw || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            supw: e.target.value,
                          })
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        size="sm"
                        value={currentStudent.coScholastic?.supw || ""}
                        onChange={(e) =>
                          handleChange("coScholastic", {
                            ...currentStudent.coScholastic,
                            supw: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>

              {/* Attendance Section */}
              <h5 className="mb-3 mt-4">Attendance Details</h5>
              <Row className="mb-3">
                <Col md={6}>
                  <h6>Semester 1</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Days Attended</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={currentStudent.attendance?.semester1?.attended || ""}
                          onChange={(e) =>
                            handleChange("attendance", {
                              ...currentStudent.attendance,
                              semester1: {
                                ...currentStudent.attendance?.semester1,
                                attended: Number.parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Working Days</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={currentStudent.attendance?.semester1?.workingDays || ""}
                          onChange={(e) =>
                            handleChange("attendance", {
                              ...currentStudent.attendance,
                              semester1: {
                                ...currentStudent.attendance?.semester1,
                                workingDays: Number.parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <h6>Semester 2</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Days Attended</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={currentStudent.attendance?.semester2?.attended || ""}
                          onChange={(e) =>
                            handleChange("attendance", {
                              ...currentStudent.attendance,
                              semester2: {
                                ...currentStudent.attendance?.semester2,
                                attended: Number.parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Working Days</Form.Label>
                        <Form.Control
                          type="number"
                          min="0"
                          value={currentStudent.attendance?.semester2?.workingDays || ""}
                          onChange={(e) =>
                            handleChange("attendance", {
                              ...currentStudent.attendance,
                              semester2: {
                                ...currentStudent.attendance?.semester2,
                                workingDays: Number.parseInt(e.target.value) || 0,
                              },
                            })
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>

              {/* Special Achievements */}
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Special Achievements</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={currentStudent.specialAchievements || ""}
                      onChange={(e) => handleChange("specialAchievements", e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStudentModal(false)}>
            <FaTimes className="me-1" /> Cancel
          </Button>
          <Button variant="success" onClick={handleSave} disabled={loading}>
            {loading ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <FaSave className="me-1" /> Save Student
              </>
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Result Sheet Modal */}
      <Modal show={showResultModal} onHide={() => setShowResultModal(false)} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Student Result Sheet - {currentStudent?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
          {currentStudent && (
            <div id="printable-content">
              <Container className="p-4 border border-dark" style={{ backgroundColor: "#f8f9fa" }}>
                {/* Header */}
                <Row className="text-center mb-4">
                  <Col>
                    <h4>{currentStudent.schoolName || schoolName}</h4>
                    <h5>STUDENT RESULT SHEET</h5>
                    <h6>ACADEMIC YEAR: {currentStudent.academicYear}</h6>
                  </Col>
                </Row>

                {/* Student Basic Info */}
                <Row className="mb-3">
                  <Col md={6}>
                    <p>
                      <strong>Name:</strong> {currentStudent.name}
                    </p>
                    <p>
                      <strong>Father's Name:</strong> {currentStudent.fatherName}
                    </p>
                    <p>
                      <strong>Mother's Name:</strong> {currentStudent.motherName}
                    </p>
                    <p>
                      <strong>Class:</strong> {currentStudent.className}
                    </p>
                    <p>
                      <strong>Medium:</strong> {currentStudent.medium}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Register Number:</strong> {currentStudent.registerNumber}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {currentStudent.dob ? new Date(currentStudent.dob).toLocaleDateString() : ""}
                    </p>
                    <p>
                      <strong>Blood Group:</strong> {currentStudent.bloodGroup}
                    </p>
                    <p>
                      <strong>Gender:</strong> {currentStudent.gender}
                    </p>
                    <p>
                      <strong>Board:</strong> {currentStudent.board}
                    </p>
                  </Col>
                </Row>

                {/* Address */}
                <Row className="mb-3">
                  <Col>
                    <p>
                      <strong>Address:</strong>{" "}
                      {[
                        currentStudent.address?.village,
                        currentStudent.address?.taluk,
                        currentStudent.address?.district,
                        currentStudent.address?.state,
                        currentStudent.address?.pincode,
                      ]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </Col>
                </Row>

                {/* Marks Table */}
                <Table bordered className="mb-4">
                  <thead>
                    <tr>
                      <th rowSpan="2">Subject</th>
                      <th colSpan="4">Semester 1</th>
                      <th colSpan="4">Semester 2</th>
                    </tr>
                    <tr>
                      <th>FA-1 (10%)</th>
                      <th>FA-2 (10%)</th>
                      <th>SA-1 (80%)</th>
                      <th>Total/Grade</th>
                      <th>FA-3 (10%)</th>
                      <th>FA-4 (10%)</th>
                      <th>SA-2 (80%)</th>
                      <th>Total/Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      "firstLanguage",
                      "secondLanguage",
                      "mathematics",
                      "science",
                      "socialScience",
                      "environmentScience",
                    ].map((subject) => (
                      <tr key={subject}>
                        <td>
                          {currentStudent.subjects?.[subject]?.name ||
                            subject.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                        </td>
                        <td>{currentStudent.subjects?.[subject]?.FA1 || ""}</td>
                        <td>{currentStudent.subjects?.[subject]?.FA2 || ""}</td>
                        <td>{currentStudent.subjects?.[subject]?.SA1 || ""}</td>
                        <td>
                          {calculateSubjectTotal(subject, 1)} / {calculateSubjectGrade(subject, 1)}
                        </td>
                        <td>{currentStudent.subjects?.[subject]?.FA3 || ""}</td>
                        <td>{currentStudent.subjects?.[subject]?.FA4 || ""}</td>
                        <td>{currentStudent.subjects?.[subject]?.SA2 || ""}</td>
                        <td>
                          {calculateSubjectTotal(subject, 2)} / {calculateSubjectGrade(subject, 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {/* Co-Scholastic Activities */}
                <h5 className="mb-3">Co-Scholastic Activities</h5>
                <Table bordered className="mb-4">
                  <thead>
                    <tr>
                      <th>Activity</th>
                      <th>Semester 1 Grade</th>
                      <th>Semester 2 Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Physical Education</td>
                      <td>{currentStudent.coScholastic?.physicalEducation || ""}</td>
                      <td>{currentStudent.coScholastic?.physicalEducation || ""}</td>
                    </tr>
                    <tr>
                      <td>Art</td>
                      <td>{currentStudent.coScholastic?.art || ""}</td>
                      <td>{currentStudent.coScholastic?.art || ""}</td>
                    </tr>
                    <tr>
                      <td>Music</td>
                      <td>{currentStudent.coScholastic?.music || ""}</td>
                      <td>{currentStudent.coScholastic?.music || ""}</td>
                    </tr>
                    <tr>
                      <td>SUPW</td>
                      <td>{currentStudent.coScholastic?.supw || ""}</td>
                      <td>{currentStudent.coScholastic?.supw || ""}</td>
                    </tr>
                  </tbody>
                </Table>

                {/* Attendance */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th colSpan="3">Semester 1 Attendance</th>
                        </tr>
                        <tr>
                          <th>Attended</th>
                          <th>Working Days</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{currentStudent.attendance?.semester1?.attended || 0}</td>
                          <td>{currentStudent.attendance?.semester1?.workingDays || 0}</td>
                          <td>{calculateAttendancePercentage(1)}%</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <Table bordered>
                      <thead>
                        <tr>
                          <th colSpan="3">Semester 2 Attendance</th>
                        </tr>
                        <tr>
                          <th>Attended</th>
                          <th>Working Days</th>
                          <th>Percentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{currentStudent.attendance?.semester2?.attended || 0}</td>
                          <td>{currentStudent.attendance?.semester2?.workingDays || 0}</td>
                          <td>{calculateAttendancePercentage(2)}%</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>

                {/* Special Achievements */}
                {currentStudent.specialAchievements && (
                  <Row className="mb-3">
                    <Col>
                      <h6>Special Achievements:</h6>
                      <p>{currentStudent.specialAchievements}</p>
                    </Col>
                  </Row>
                )}

                {/* Grading System */}
                <Row className="mb-4">
                  <Col md={6}>
                    <Table bordered size="sm">
                      <thead>
                        <tr>
                          <th colSpan="2">Scholastic Grading System</th>
                        </tr>
                        <tr>
                          <th>Marks Range</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>90-100</td>
                          <td>A+</td>
                        </tr>
                        <tr>
                          <td>70-89</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>50-69</td>
                          <td>B+</td>
                        </tr>
                        <tr>
                          <td>30-49</td>
                          <td>B</td>
                        </tr>
                        <tr>
                          <td>Below 30</td>
                          <td>F</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={6}>
                    <Table bordered size="sm">
                      <thead>
                        <tr>
                          <th colSpan="2">Co-Scholastic Grading System</th>
                        </tr>
                        <tr>
                          <th>Description</th>
                          <th>Grade</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Outstanding</td>
                          <td>A</td>
                        </tr>
                        <tr>
                          <td>Very Good</td>
                          <td>B</td>
                        </tr>
                        <tr>
                          <td>Good</td>
                          <td>C</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Row>

                {/* Final Result */}
                <Row className="mb-3">
                  <Col>
                    <div
                      className={`p-3 text-center ${calculateOverallResult().includes("Pass") ? "bg-success text-white" : "bg-danger text-white"}`}
                    >
                      <h5>Final Result: {calculateOverallResult()}</h5>
                    </div>
                  </Col>
                </Row>

                {/* Signatures */}
                <Row className="mt-4 text-center">
                  <Col>
                    <div className="border-top pt-2">Class Teacher</div>
                  </Col>
                  <Col>
                    <div className="border-top pt-2">Principal</div>
                  </Col>
                  <Col>
                    <div className="border-top pt-2">Parent/Guardian</div>
                  </Col>
                </Row>
              </Container>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowResultModal(false)}>
            Close
          </Button>
          <Button variant="success" onClick={createPDF} disabled={downloadingPDF}>
            {downloadingPDF ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Generating PDF...
              </>
            ) : (
              <>
                <FaDownload className="me-1" /> Download PDF
              </>
            )}
          </Button>
          <Button variant="info" onClick={createPDF} disabled={downloadingPDF}>
            <LuPrinter className="me-1" /> Print
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ResultSheet

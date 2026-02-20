"use client"

import { useState, useEffect, useRef } from "react"
import { Modal, Container, Row, Col, Form, Table, Button, Spinner } from "react-bootstrap"
import { FaSave, FaTimes } from "react-icons/fa"
import { LuPrinter } from "react-icons/lu"
import axios from "axios"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"

const API_BASE_URL = "http://localhost:8774/api/ResultSheet"

const StudentFormModal = ({ show, onHide, student, isEditMode, onSave, classes }) => {
  const [currentStudent, setCurrentStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [schoolName, setSchoolName] = useState("SCHOOL NAME")
  const formRef = useRef(null)

  // Initial student structure
  const initialStudent = {
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

  useEffect(() => {
    if (show) {
      if (isEditMode && student) {
        setCurrentStudent(student)
      } else {
        setCurrentStudent({ ...initialStudent })
      }
      setError(null)
    }
  }, [show, student, isEditMode])

  const handleSave = async () => {
    try {
      setLoading(true)
      setError(null)

      // Validate required fields
      if (
        !currentStudent.name ||
        !currentStudent.registerNumber ||
        !currentStudent.className ||
        !currentStudent.academicYear
      ) {
        throw new Error("Name, Register Number, Class, and Academic Year are required fields")
      }

      const studentData = {
        ...currentStudent,
        schoolName,
      }

      let response
      if (currentStudent._id) {
        // Update existing student
        response = await axios.put(`${API_BASE_URL}/${currentStudent._id}`, studentData)
      } else {
        // Create new student
        response = await axios.post(API_BASE_URL, studentData)
      }

      const savedStudent = response.data.data
      onSave(savedStudent)
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
    const subjectData = currentStudent.subjects[subject]
    if (semester === 1) {
      return Math.round(subjectData.FA1 * 0.1 + subjectData.FA2 * 0.1 + subjectData.SA1 * 0.8)
    } else {
      return Math.round(subjectData.FA3 * 0.1 + subjectData.FA4 * 0.1 + subjectData.SA2 * 0.8)
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

    const pdf = new jsPDF("portrait", "pt", "a4")
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const data = await html2canvas(document.querySelector("#printable-content"), {
      useCORS: true,
    })
    const img = data.toDataURL("image/png")
    const imgProperties = pdf.getImageProperties(img)
    const imgWidth = pdfWidth
    const imgHeight = (imgProperties.height * imgWidth) / imgProperties.width
    let position = 0
    let remainingHeight = imgHeight

    pdf.addImage(img, "PNG", 0, 0, imgWidth, imgHeight)
    while (remainingHeight > pdfHeight) {
      position += pdfHeight
      remainingHeight -= pdfHeight
      pdf.addPage()
      pdf.addImage(img, "PNG", 0, -position, imgWidth, imgHeight)
    }
    pdf.save(`Result_Sheet_${currentStudent.registerNumber || "student"}.pdf`)
  }

  if (!currentStudent) return null

  return (
    <Modal show={show} onHide={onHide} size="xl" fullscreen>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? "Edit Student" : "Add New Student"}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ maxHeight: "80vh", overflowY: "auto" }}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div id="printable-content" ref={formRef}>
          <Container className="p-4 border border-dark" style={{ backgroundColor: "#f8f9fa" }}>
            {/* Header */}
            <Row className="text-center mb-4">
              <Col>
                <Form.Control
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    textAlign: "center",
                    border: "none",
                    backgroundColor: "transparent",
                  }}
                  className="mb-2"
                />
                <h6>
                  ACADEMIC YEAR:
                  <Form.Control
                    type="text"
                    value={currentStudent.academicYear || ""}
                    onChange={(e) => handleChange("academicYear", e.target.value)}
                    style={{ display: "inline-block", width: "150px", marginLeft: "10px" }}
                    required
                  />
                </h6>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Medium</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.medium || ""}
                    onChange={(e) => handleChange("medium", e.target.value)}
                    placeholder="Enter medium (e.g., Kannada, English)"
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
                    placeholder="Enter board (e.g., State Board, CBSE)"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Class</Form.Label>
                  <Form.Control
                    as="select"
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
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            {/* Student Details */}
            <h5 className="mb-3">Student Details</h5>
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
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.fatherName || ""}
                    onChange={(e) => handleChange("fatherName", e.target.value)}
                  />
                </Form.Group>
              </Col>
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
            </Row>

            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={currentStudent.dob ? new Date(currentStudent.dob).toISOString().split("T")[0] : ""}
                    onChange={(e) => handleChange("dob", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Blood Group</Form.Label>
                  <Form.Control
                    as="select"
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
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
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
            </Row>

            <Row className="mb-3">
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
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    value={currentStudent.gender || ""}
                    onChange={(e) => handleChange("gender", e.target.value)}
                  >
                    <option value="">Select</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Third Gender</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Caste</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.caste || ""}
                    onChange={(e) => handleChange("caste", e.target.value)}
                    placeholder="Enter caste"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.category || ""}
                    onChange={(e) => handleChange("category", e.target.value)}
                    placeholder="Enter category"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={2}>
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
              <Col md={2}>
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
            <h5 className="mb-3">Address Details</h5>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group>
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.address?.state || ""}
                    onChange={(e) => handleAddressChange("state", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.address?.district || ""}
                    onChange={(e) => handleAddressChange("district", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Taluk</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.address?.taluk || ""}
                    onChange={(e) => handleAddressChange("taluk", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>Village</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.address?.village || ""}
                    onChange={(e) => handleAddressChange("village", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentStudent.address?.city || ""}
                    onChange={(e) => handleAddressChange("city", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
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
            <h5 className="mb-3">Academic Performance</h5>
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
                    {/* Semester 1 */}
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={currentStudent.subjects?.[subject]?.FA1 || ""}
                        onChange={(e) => handleSubjectMarksChange(subject, "FA1", e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={currentStudent.subjects?.[subject]?.FA2 || ""}
                        onChange={(e) => handleSubjectMarksChange(subject, "FA2", e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={currentStudent.subjects?.[subject]?.SA1 || ""}
                        onChange={(e) => handleSubjectMarksChange(subject, "SA1", e.target.value)}
                      />
                    </td>
                    <td>
                      {calculateSubjectTotal(subject, 1)} / {calculateSubjectGrade(subject, 1)}
                    </td>
                    {/* Semester 2 */}
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={currentStudent.subjects?.[subject]?.FA3 || ""}
                        onChange={(e) => handleSubjectMarksChange(subject, "FA3", e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={currentStudent.subjects?.[subject]?.FA4 || ""}
                        onChange={(e) => handleSubjectMarksChange(subject, "FA4", e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        min="0"
                        max="100"
                        value={currentStudent.subjects?.[subject]?.SA2 || ""}
                        onChange={(e) => handleSubjectMarksChange(subject, "SA2", e.target.value)}
                      />
                    </td>
                    <td>
                      {calculateSubjectTotal(subject, 2)} / {calculateSubjectGrade(subject, 2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

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
                  <td>
                    <Form.Control
                      type="text"
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
            <h5 className="mb-3">Attendance Details</h5>
            <Row className="mb-4">
              <Col md={6}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th colSpan="3">Semester 1</th>
                    </tr>
                    <tr>
                      <th>Days Attended</th>
                      <th>Working Days</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
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
                      </td>
                      <td>
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
                      </td>
                      <td>{calculateAttendancePercentage(1)}%</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Table bordered>
                  <thead>
                    <tr>
                      <th colSpan="3">Semester 2</th>
                    </tr>
                    <tr>
                      <th>Days Attended</th>
                      <th>Working Days</th>
                      <th>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
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
                      </td>
                      <td>
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
                      </td>
                      <td>{calculateAttendancePercentage(2)}%</td>
                    </tr>
                  </tbody>
                </Table>
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

            {/* Result Declaration */}
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Final Result (Automatically Calculated)</Form.Label>
                  <Form.Control
                    type="text"
                    value={calculateOverallResult()}
                    readOnly
                    className={
                      calculateOverallResult().includes("Pass") ? "bg-success text-white" : "bg-danger text-white"
                    }
                  />
                </Form.Group>
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
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-between w-100">
          <div>
            {isEditMode && (
              <Button variant="info" onClick={createPDF}>
                <LuPrinter className="me-1" /> Print/Save PDF
              </Button>
            )}
          </div>
          <div>
            <Button variant="secondary" onClick={onHide} className="me-2">
              <FaTimes className="me-1" /> Cancel
            </Button>
            <Button variant="success" onClick={handleSave} disabled={loading}>
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                <>
                  <FaSave className="me-1" /> Save
                </>
              )}
            </Button>
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  )
}

export default StudentFormModal

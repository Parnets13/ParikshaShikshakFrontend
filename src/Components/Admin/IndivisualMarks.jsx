
// import { useState } from "react"
// import { Table, Button, Modal, Form } from "react-bootstrap"
// import { FaEdit, FaTrash, FaPrint } from "react-icons/fa"
// import "bootstrap/dist/css/bootstrap.min.css"
// import { jsPDF } from "jspdf"
// import "jspdf-autotable"

// const customStyles = `
//   .table-custom-border {
//     border: 2px solid #000 !important;
//     border-collapse: collapse !important;
//   }
//   .cell-custom-border {
//     border: 1px solid #000 !important;
//     border-collapse: collapse !important;
//   }
//   .vertical-text {
//     writing-mode: vertical-rl;
//     transform: rotate(180deg);
//   }
//   .action-buttons {
//     display: flex;
//     justify-content: space-around;
//   }
//   .small-text {
//     font-size: 0.8rem;
//   }
// `

// export default function SubjectTeacherMarksTable() {
//   // Header Data State
//   const [headerData, setHeaderData] = useState({
//     subject: "ವಿಷಯ Subject:",
//     title: "SUBJECT TEACHER INDIVIDUAL MARKS RECORD",
//     kannada_title: "ವಿಷಯ ಶಿಕ್ಷಕರ ವೈಯಕ್ತಿಕ ಅಂಕಪಟ್ಟಿ",
//   })

//   // Student Rows State
//   const initialRows = [
//     {
//       id: 1,
//       name: "Student Name 1",
//       fa1: {
//         activity1: { m: 12, o: 15 },
//         activity2: { m: 14, o: 15 },
//         total: 26,
//       },
//       fa2: {
//         activity1: { m: 13, o: 15 },
//         activity2: { m: 15, o: 15 },
//         total: 28,
//       },
//       terminalExam: {
//         marks: 85,
//         outOf: 100,
//         percentage: 85,
//       },
//       grade1: "A",
//       fa3: {
//         activity1: { m: 13, o: 15 },
//         activity2: { m: 15, o: 15 },
//         total: 28,
//       },
//       fa4: {
//         activity1: { m: 14, o: 15 },
//         activity2: { m: 16, o: 15 },
//         total: 30,
//       },
//       prepExam: {
//         marks: 90,
//         outOf: 100,
//         percentage: 90,
//       },
//       grade2: "A",
//       grandTotal: 287,
//       remarks: "",
//     },
//   ]

//   // Create empty rows to fill the table
//   const emptyRows = Array(20)
//     .fill(null)
//     .map((_, index) => ({
//       id: initialRows.length + index + 1,
//       name: "",
//       fa1: {
//         activity1: { m: "", o: 15 },
//         activity2: { m: "", o: 15 },
//         total: "",
//       },
//       fa2: {
//         activity1: { m: "", o: 15 },
//         activity2: { m: "", o: 15 },
//         total: "",
//       },
//       terminalExam: {
//         marks: "",
//         outOf: 100,
//         percentage: "",
//       },
//       grade1: "",
//       fa3: {
//         activity1: { m: "", o: 15 },
//         activity2: { m: "", o: 15 },
//         total: "",
//       },
//       fa4: {
//         activity1: { m: "", o: 15 },
//         activity2: { m: "", o: 15 },
//         total: "",
//       },
//       prepExam: {
//         marks: "",
//         outOf: 100,
//         percentage: "",
//       },
//       grade2: "",
//       grandTotal: "",
//       remarks: "",
//     }))

//   const [rows, setRows] = useState([...initialRows, ...emptyRows])

//   // Modals State
//   const [showHeaderEditModal, setShowHeaderEditModal] = useState(false)
//   const [showDeleteModal, setShowDeleteModal] = useState(false)
//   const [currentEdit, setCurrentEdit] = useState({})
//   const [currentDelete, setCurrentDelete] = useState({})
//   const [showEditModal, setShowEditModal] = useState(false)
//   const [currentRow, setCurrentRow] = useState(null)
//   const [showAddModal, setShowAddModal] = useState(false)
//   const [newStudent, setNewStudent] = useState({
//     id: 0,
//     name: "",
//     fa1: {
//       activity1: { m: 0, o: 15 },
//       activity2: { m: 0, o: 15 },
//       total: 0,
//     },
//     fa2: {
//       activity1: { m: 0, o: 15 },
//       activity2: { m: 0, o: 15 },
//       total: 0,
//     },
//     terminalExam: {
//       marks: 0,
//       outOf: 100,
//       percentage: 0,
//     },
//     grade1: "",
//     fa3: {
//       activity1: { m: 0, o: 15 },
//       activity2: { m: 0, o: 15 },
//       total: 0,
//     },
//     fa4: {
//       activity1: { m: 0, o: 15 },
//       activity2: { m: 0, o: 15 },
//       total: 0,
//     },
//     prepExam: {
//       marks: 0,
//       outOf: 100,
//       percentage: 0,
//     },
//     grade2: "",
//     grandTotal: 0,
//     remarks: "",
//   })

//   // Header Edit Handlers
//   const handleHeaderEdit = () => {
//     setShowHeaderEditModal(true)
//   }

//   const handleHeaderSave = () => {
//     setShowHeaderEditModal(false)
//   }

//   // Student Edit Handlers
//   const handleEdit = (row) => {
//     setCurrentRow({ ...row })
//     setShowEditModal(true)
//   }

//   const handleDeleteClick = (row) => {
//     setCurrentDelete({ type: "student", data: row })
//     setShowDeleteModal(true)
//   }

//   const handleInputChange = (field, value) => {
//     if (!currentRow) return

//     // Handle nested properties
//     if (field.includes(".")) {
//       const [parent, child, subChild] = field.split(".")

//       if (subChild) {
//         setCurrentRow({
//           ...currentRow,
//           [parent]: {
//             ...currentRow[parent],
//             [child]: {
//               ...currentRow[parent][child],
//               [subChild]: value,
//             },
//           },
//         })
//       } else {
//         setCurrentRow({
//           ...currentRow,
//           [parent]: {
//             ...currentRow[parent],
//             [child]: value,
//           },
//         })
//       }
//     } else {
//       setCurrentRow({
//         ...currentRow,
//         [field]: value,
//       })
//     }
//   }

//   const calculateTotals = (student) => {
//     // Calculate FA1 total
//     const fa1Total = Number(student.fa1.activity1.m) + Number(student.fa1.activity2.m)

//     // Calculate FA2 total
//     const fa2Total = Number(student.fa2.activity1.m) + Number(student.fa2.activity2.m)

//     // Calculate FA3 total
//     const fa3Total = Number(student.fa3.activity1.m) + Number(student.fa3.activity2.m)

//     // Calculate FA4 total
//     const fa4Total = Number(student.fa4.activity1.m) + Number(student.fa4.activity2.m)

//     // Calculate Terminal Exam percentage
//     const termPercentage = (Number(student.terminalExam.marks) / student.terminalExam.outOf) * 100

//     // Calculate Preparatory Exam percentage
//     const prepPercentage = (Number(student.prepExam.marks) / student.prepExam.outOf) * 100

//     // Calculate Grand Total
//     const grandTotal =
//       fa1Total + fa2Total + Number(student.terminalExam.marks) + fa3Total + fa4Total + Number(student.prepExam.marks)

//     // Calculate grade based on total
//     let grade1 = "C"
//     if (fa1Total + fa2Total + Number(student.terminalExam.marks) >= 140) grade1 = "A+"
//     else if (fa1Total + fa2Total + Number(student.terminalExam.marks) >= 120) grade1 = "A"
//     else if (fa1Total + fa2Total + Number(student.terminalExam.marks) >= 100) grade1 = "B"

//     let grade2 = "C"
//     if (grandTotal >= 280) grade2 = "A+"
//     else if (grandTotal >= 240) grade2 = "A"
//     else if (grandTotal >= 200) grade2 = "B"

//     return {
//       ...student,
//       fa1: {
//         ...student.fa1,
//         total: fa1Total,
//       },
//       fa2: {
//         ...student.fa2,
//         total: fa2Total,
//       },
//       terminalExam: {
//         ...student.terminalExam,
//         percentage: termPercentage,
//       },
//       grade1: grade1,
//       fa3: {
//         ...student.fa3,
//         total: fa3Total,
//       },
//       fa4: {
//         ...student.fa4,
//         total: fa4Total,
//       },
//       prepExam: {
//         ...student.prepExam,
//         percentage: prepPercentage,
//       },
//       grade2: grade2,
//       grandTotal: grandTotal,
//     }
//   }

//   const handleSaveEdit = () => {
//     if (currentRow) {
//       const updatedStudent = calculateTotals(currentRow)

//       const updatedRows = rows.map((row) => (row.id === currentRow.id ? updatedStudent : row))

//       setRows(updatedRows)
//     }
//     setShowEditModal(false)
//   }

//   // Handle adding new student
//   const handleAddStudent = () => {
//     setNewStudent({
//       id: rows.length > 0 ? Math.max(...rows.map((r) => r.id)) + 1 : 1,
//       name: "",
//       fa1: {
//         activity1: { m: 0, o: 15 },
//         activity2: { m: 0, o: 15 },
//         total: 0,
//       },
//       fa2: {
//         activity1: { m: 0, o: 15 },
//         activity2: { m: 0, o: 15 },
//         total: 0,
//       },
//       terminalExam: {
//         marks: 0,
//         outOf: 100,
//         percentage: 0,
//       },
//       grade1: "",
//       fa3: {
//         activity1: { m: 0, o: 15 },
//         activity2: { m: 0, o: 15 },
//         total: 0,
//       },
//       fa4: {
//         activity1: { m: 0, o: 15 },
//         activity2: { m: 0, o: 15 },
//         total: 0,
//       },
//       prepExam: {
//         marks: 0,
//         outOf: 100,
//         percentage: 0,
//       },
//       grade2: "",
//       grandTotal: 0,
//       remarks: "",
//     })
//     setShowAddModal(true)
//   }

//   const handleAddInputChange = (field, value) => {
//     // Handle nested properties
//     if (field.includes(".")) {
//       const [parent, child, subChild] = field.split(".")

//       if (subChild) {
//         setNewStudent({
//           ...newStudent,
//           [parent]: {
//             ...newStudent[parent],
//             [child]: {
//               ...newStudent[parent][child],
//               [subChild]: value,
//             },
//           },
//         })
//       } else {
//         setNewStudent({
//           ...newStudent,
//           [parent]: {
//             ...newStudent[parent],
//             [child]: value,
//           },
//         })
//       }
//     } else {
//       setNewStudent({
//         ...newStudent,
//         [field]: value,
//       })
//     }
//   }

//   const handleSaveNewStudent = () => {
//     const studentToAdd = calculateTotals(newStudent)

//     // Find the first empty row
//     const emptyRowIndex = rows.findIndex((row) => row.name === "")

//     if (emptyRowIndex !== -1) {
//       // Replace the first empty row
//       const updatedRows = [...rows]
//       updatedRows[emptyRowIndex] = studentToAdd
//       setRows(updatedRows)
//     } else {
//       // Add to the end if no empty rows
//       setRows([...rows, studentToAdd])
//     }

//     setShowAddModal(false)
//   }

//   // Common Delete Handler
//   const handleConfirmDelete = () => {
//     if (currentDelete.type === "student") {
//       const updatedRows = rows.map((row) =>
//         row.id === currentDelete.data.id
//           ? {
//               ...row,
//               name: "",
//               fa1: { activity1: { m: "", o: 15 }, activity2: { m: "", o: 15 }, total: "" },
//               fa2: { activity1: { m: "", o: 15 }, activity2: { m: "", o: 15 }, total: "" },
//               terminalExam: { marks: "", outOf: 100, percentage: "" },
//               grade1: "",
//               fa3: { activity1: { m: "", o: 15 }, activity2: { m: "", o: 15 }, total: "" },
//               fa4: { activity1: { m: "", o: 15 }, activity2: { m: "", o: 15 }, total: "" },
//               prepExam: { marks: "", outOf: 100, percentage: "" },
//               grade2: "",
//               grandTotal: "",
//               remarks: "",
//             }
//           : row,
//       )
//       setRows(updatedRows)
//     }
//     setShowDeleteModal(false)
//   }

//   // Export to PDF
//   const exportToPDF = () => {
//     const doc = new jsPDF("landscape", "mm", "a4")

//     // Add title
//     doc.setFontSize(16)
//     doc.text("SUBJECT TEACHER INDIVIDUAL MARKS RECORD", 150, 10, { align: "center" })
//     doc.setFontSize(12)
//     doc.text(`Subject: ${headerData.subject.replace("ವಿಷಯ Subject:", "")}`, 20, 20)

//     // Define the table columns and rows
//     const tableColumn = [
//       "Sl No",
//       "Student Name",
//       "FA-1 Act1",
//       "FA-1 Act2",
//       "FA-1 Total",
//       "FA-2 Act1",
//       "FA-2 Act2",
//       "FA-2 Total",
//       "FA1+FA2",
//       "20%",
//       "Term Exam",
//       "T1",
//       "Grade",
//       "FA-3 Act1",
//       "FA-3 Act2",
//       "FA-3 Total",
//       "FA-4 Act1",
//       "FA-4 Act2",
//       "FA-4 Total",
//       "FA3+FA4",
//       "20%",
//       "Prep Exam",
//       "T2",
//       "Grand Total",
//       "Grade",
//       "Remarks",
//     ]

//     const tableRows = rows
//       .filter((row) => row.name !== "") // Only include rows with student names
//       .map((row, index) => [
//         index + 1,
//         row.name,
//         row.fa1.activity1.m,
//         row.fa1.activity2.m,
//         row.fa1.total,
//         row.fa2.activity1.m,
//         row.fa2.activity2.m,
//         row.fa2.total,
//         Number(row.fa1.total) + Number(row.fa2.total),
//         Math.round((Number(row.fa1.total) + Number(row.fa2.total)) * 0.2),
//         row.terminalExam.marks,
//         Number(row.fa1.total) + Number(row.fa2.total) + Number(row.terminalExam.marks),
//         row.grade1,
//         row.fa3.activity1.m,
//         row.fa3.activity2.m,
//         row.fa3.total,
//         row.fa4.activity1.m,
//         row.fa4.activity2.m,
//         row.fa4.total,
//         Number(row.fa3.total) + Number(row.fa4.total),
//         Math.round((Number(row.fa3.total) + Number(row.fa4.total)) * 0.2),
//         row.prepExam.marks,
//         Number(row.fa3.total) + Number(row.fa4.total) + Number(row.prepExam.marks),
//         row.grandTotal,
//         row.grade2,
//         row.remarks,
//       ])

//     // @ts-ignore - jspdf-autotable types are not properly recognized
//     doc.autoTable({
//       head: [tableColumn],
//       body: tableRows,
//       startY: 25,
//       theme: "grid",
//       styles: { fontSize: 8, cellPadding: 1 },
//       headStyles: { fillColor: [100, 100, 100] },
//     })

//     doc.save("marks-record.pdf")
//   }

//   return (
//     <div className="container-fluid mt-4">
//       <style>{customStyles}</style>

//       <div className="row mb-2">
//         <div className="col-6 text-start">
//           <h5>{headerData.kannada_title}</h5>
//           <div className="d-flex align-items-center">
//             <span>{headerData.subject}</span>
//             <Form.Control
//               type="text"
//               value={headerData.subject.replace("ವಿಷಯ Subject:", "")}
//               onChange={(e) => setHeaderData({ ...headerData, subject: `ವಿಷಯ Subject: ${e.target.value}` })}
//               style={{ width: "200px", marginLeft: "10px" }}
//             />
//           </div>
//         </div>
//         <div className="col-6 text-end">
//           <h5>{headerData.title}</h5>
//           <div className="mt-2">
//             <Button variant="success" className="me-2" onClick={handleAddStudent}>
//               Add Student
//             </Button>
//             <Button variant="primary" onClick={exportToPDF}>
//               <FaPrint className="me-1" /> Export PDF
//             </Button>
//             <Button variant="info" className="ms-2" onClick={handleHeaderEdit}>
//               <FaEdit className="me-1" /> Edit Header
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="table-responsive">
//         <Table bordered className="text-center table-custom-border">
//           <thead>
//             <tr className="text-center align-middle">
//               <th rowSpan={3} className="cell-custom-border" style={{ width: "40px" }}>
//                 Sl. No.
//                 <br />
//                 ಕ್ರ.
//                 <br />
//                 ಸಂ.
//               </th>
//               <th rowSpan={3} className="cell-custom-border" style={{ width: "150px" }}>
//                 Student's Name
//                 <br />
//                 ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು
//               </th>
//               <th colSpan={5} className="cell-custom-border">
//                 FA-1
//               </th>
//               <th colSpan={5} className="cell-custom-border">
//                 FA-2
//               </th>
//               <th rowSpan={2} colSpan={2} className="cell-custom-border">
//                 FA-1
//                 <br />+<br />
//                 FA-2
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 Terminal
//                 <br />
//                 ಪ್ರಥಮ
//                 <br />
//                 ಸಾರಾಂಶ
//                 <br />
//                 ಪರೀಕ್ಷೆ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 T1
//               </th>
//               <th rowSpan={3} className="cell-custom-border">
//                 Grade
//                 <br />
//                 ದರ್ಜೆ
//               </th>
//               <th colSpan={5} className="cell-custom-border">
//                 FA-3
//               </th>
//               <th colSpan={5} className="cell-custom-border">
//                 FA-4
//               </th>
//               <th rowSpan={2} colSpan={2} className="cell-custom-border">
//                 FA-3
//                 <br />+<br />
//                 FA-4
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 Preparatory
//                 <br />
//                 ಪೂರ್ವಭಾವಿ
//                 <br />
//                 ಪರೀಕ್ಷೆ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 T2
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 Grand
//                 <br />
//                 Total
//                 <br />
//                 ಒಟ್ಟು
//                 <br />
//                 1+2
//               </th>
//               <th rowSpan={3} className="cell-custom-border">
//                 Grade
//                 <br />
//                 ದರ್ಜೆ
//               </th>
//               <th rowSpan={3} className="cell-custom-border">
//                 Remarks
//                 <br />
//                 ಷರಾ
//               </th>
//               <th rowSpan={3} className="cell-custom-border">
//                 Actions
//               </th>
//             </tr>
//             <tr className="text-center align-middle">
//               <th colSpan={2} className="cell-custom-border">
//                 1 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 2 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಒಟ್ಟು
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 1 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 2 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಒಟ್ಟು
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಪರೀಕ್ಷೆ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಅಂಕಗಳು
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 3 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 4 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಒಟ್ಟು
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 3 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th colSpan={2} className="cell-custom-border">
//                 4 ನೇ ಚಟುವಟಿಕೆ
//                 <br />
//                 ಮೌಲ್ಯಮಾಪನ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಒಟ್ಟು
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಪರೀಕ್ಷೆ
//               </th>
//               <th rowSpan={2} className="cell-custom-border">
//                 ಅಂಕಗಳು
//               </th>
//             </tr>
//             <tr className="text-center align-middle">
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">
//                 1+2 ರ<br />
//                 ಕೂ. ಮೊ.
//               </th>
//               <th className="cell-custom-border">ಶೇ./20%</th>
//               <th className="cell-custom-border">100/80</th>
//               <th className="cell-custom-border">100/80</th>
//               <th className="cell-custom-border">25/20%</th>
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">Activity</th>
//               <th className="cell-custom-border">M</th>
//               <th className="cell-custom-border">
//                 3+4 ರ<br />
//                 ಕೂ. ಮೊ.
//               </th>
//               <th className="cell-custom-border">ಶೇ./20%</th>
//               <th className="cell-custom-border">100/80</th>
//               <th className="cell-custom-border">100/80</th>
//               <th className="cell-custom-border">25/20%</th>
//             </tr>
//             <tr className="text-center small-text">
//               <th className="cell-custom-border"></th>
//               <th className="cell-custom-border"></th>
//               <th className="cell-custom-border">5</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">6</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">30</th>
//               <th className="cell-custom-border">7</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">8</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">30</th>
//               <th className="cell-custom-border">60</th>
//               <th className="cell-custom-border">12</th>
//               <th className="cell-custom-border">100</th>
//               <th className="cell-custom-border">100/80</th>
//               <th className="cell-custom-border">125/100</th>
//               <th className="cell-custom-border"></th>
//               <th className="cell-custom-border">5</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">6</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">30</th>
//               <th className="cell-custom-border">7</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">8</th>
//               <th className="cell-custom-border">15</th>
//               <th className="cell-custom-border">30</th>
//               <th className="cell-custom-border">60</th>
//               <th className="cell-custom-border">12</th>
//               <th className="cell-custom-border">100</th>
//               <th className="cell-custom-border">100/80</th>
//               <th className="cell-custom-border">125/100</th>
//               <th className="cell-custom-border">250/200</th>
//               <th className="cell-custom-border"></th>
//               <th className="cell-custom-border"></th>
//               <th className="cell-custom-border"></th>
//             </tr>
//           </thead>
//           <tbody>
//             {rows.map((row, index) => (
//               <tr key={row.id} className="text-center" style={{ height: "30px" }}>
//                 <td className="cell-custom-border">{index + 1}</td>
//                 <td className="cell-custom-border text-start">{row.name}</td>
//                 <td className="cell-custom-border">{row.fa1.activity1.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa1.activity2.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa1.total}</td>
//                 <td className="cell-custom-border">{row.fa2.activity1.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa2.activity2.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa2.total}</td>
//                 <td className="cell-custom-border">{Number(row.fa1.total) + Number(row.fa2.total)}</td>
//                 <td className="cell-custom-border">
//                   {Math.round((Number(row.fa1.total) + Number(row.fa2.total)) * 0.2)}
//                 </td>
//                 <td className="cell-custom-border">{row.terminalExam.marks}</td>
//                 <td className="cell-custom-border">
//                   {Number(row.fa1.total) + Number(row.fa2.total) + Number(row.terminalExam.marks)}
//                 </td>
//                 <td className="cell-custom-border">{row.grade1}</td>
//                 <td className="cell-custom-border">{row.fa3.activity1.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa3.activity2.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa3.total}</td>
//                 <td className="cell-custom-border">{row.fa4.activity1.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa4.activity2.m}</td>
//                 <td className="cell-custom-border">15</td>
//                 <td className="cell-custom-border">{row.fa4.total}</td>
//                 <td className="cell-custom-border">{Number(row.fa3.total) + Number(row.fa4.total)}</td>
//                 <td className="cell-custom-border">
//                   {Math.round((Number(row.fa3.total) + Number(row.fa4.total)) * 0.2)}
//                 </td>
//                 <td className="cell-custom-border">{row.prepExam.marks}</td>
//                 <td className="cell-custom-border">
//                   {Number(row.fa3.total) + Number(row.fa4.total) + Number(row.prepExam.marks)}
//                 </td>
//                 <td className="cell-custom-border">{row.grandTotal}</td>
//                 <td className="cell-custom-border">{row.grade2}</td>
//                 <td className="cell-custom-border">{row.remarks}</td>
//                 <td className="cell-custom-border">
//                   {row.name && (
//                     <div className="action-buttons">
//                       <Button
//                         variant="outline-primary"
//                         size="sm"
//                         className="me-1 p-1"
//                         onClick={() => handleEdit(row)}
//                         style={{ fontSize: "0.7rem" }}
//                       >
//                         <FaEdit /> Edit
//                       </Button>
//                       <Button
//                         variant="outline-danger"
//                         size="sm"
//                         className="p-1"
//                         onClick={() => handleDeleteClick(row)}
//                         style={{ fontSize: "0.7rem" }}
//                       >
//                         <FaTrash /> Delete
//                       </Button>
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>

//       {/* Header Edit Modal */}
//       <Modal show={showHeaderEditModal} onHide={() => setShowHeaderEditModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Header</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Title (English)</Form.Label>
//               <Form.Control
//                 value={headerData.title}
//                 onChange={(e) => setHeaderData({ ...headerData, title: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Title (Kannada)</Form.Label>
//               <Form.Control
//                 value={headerData.kannada_title}
//                 onChange={(e) => setHeaderData({ ...headerData, kannada_title: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Subject</Form.Label>
//               <Form.Control
//                 value={headerData.subject.replace("ವಿಷಯ Subject:", "")}
//                 onChange={(e) => setHeaderData({ ...headerData, subject: `ವಿಷಯ Subject: ${e.target.value}` })}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowHeaderEditModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleHeaderSave}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Edit Modal */}
//       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Student Information</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {currentRow && (
//             <Form>
//               <Form.Group className="mb-3">
//                 <Form.Label>Student Name / ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={currentRow.name}
//                   onChange={(e) => handleInputChange("name", e.target.value)}
//                 />
//               </Form.Group>

//               <div className="row">
//                 <div className="col-md-6">
//                   <h5>FA-1</h5>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 1 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa1.activity1.m}
//                           onChange={(e) => handleInputChange("fa1.activity1.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 2 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa1.activity2.m}
//                           onChange={(e) => handleInputChange("fa1.activity2.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-md-6">
//                   <h5>FA-2</h5>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 1 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa2.activity1.m}
//                           onChange={(e) => handleInputChange("fa2.activity1.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 2 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa2.activity2.m}
//                           onChange={(e) => handleInputChange("fa2.activity2.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Form.Group className="mb-3">
//                 <Form.Label>Terminal Exam / ಪ್ರಥಮ ಸಾರಾಂಶ ಪರೀಕ್ಷೆ (max 100)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={currentRow.terminalExam.marks}
//                   onChange={(e) => handleInputChange("terminalExam.marks", Number(e.target.value))}
//                   min="0"
//                   max="100"
//                 />
//               </Form.Group>

//               <div className="row">
//                 <div className="col-md-6">
//                   <h5>FA-3</h5>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 1 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa3.activity1.m}
//                           onChange={(e) => handleInputChange("fa3.activity1.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 2 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa3.activity2.m}
//                           onChange={(e) => handleInputChange("fa3.activity2.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="col-md-6">
//                   <h5>FA-4</h5>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 1 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa4.activity1.m}
//                           onChange={(e) => handleInputChange("fa4.activity1.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                     <div className="col-md-6">
//                       <Form.Group className="mb-3">
//                         <Form.Label>Activity 2 (max 15)</Form.Label>
//                         <Form.Control
//                           type="number"
//                           value={currentRow.fa4.activity2.m}
//                           onChange={(e) => handleInputChange("fa4.activity2.m", Number(e.target.value))}
//                           min="0"
//                           max="15"
//                         />
//                       </Form.Group>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <Form.Group className="mb-3">
//                 <Form.Label>Preparatory Exam / ಪೂರ್ವಭಾವಿ ಪರೀಕ್ಷೆ (max 100)</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={currentRow.prepExam.marks}
//                   onChange={(e) => handleInputChange("prepExam.marks", Number(e.target.value))}
//                   min="0"
//                   max="100"
//                 />
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Remarks / ಷರಾ</Form.Label>
//                 <Form.Control
//                   type="text"
//                   value={currentRow.remarks}
//                   onChange={(e) => handleInputChange("remarks", e.target.value)}
//                 />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSaveEdit}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Add Student Modal */}
//       <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
//         <Modal.Header closeButton>
//           <Modal.Title>Add New Student</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Student Name / ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newStudent.name}
//                 onChange={(e) => handleAddInputChange("name", e.target.value)}
//               />
//             </Form.Group>

//             <div className="row">
//               <div className="col-md-6">
//                 <h5>FA-1</h5>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 1 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa1.activity1.m}
//                         onChange={(e) => handleAddInputChange("fa1.activity1.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 2 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa1.activity2.m}
//                         onChange={(e) => handleAddInputChange("fa1.activity2.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <h5>FA-2</h5>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 1 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa2.activity1.m}
//                         onChange={(e) => handleAddInputChange("fa2.activity1.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 2 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa2.activity2.m}
//                         onChange={(e) => handleAddInputChange("fa2.activity2.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Form.Group className="mb-3">
//               <Form.Label>Terminal Exam / ಪ್ರಥಮ ಸಾರಾಂಶ ಪರೀಕ್ಷೆ (max 100)</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newStudent.terminalExam.marks}
//                 onChange={(e) => handleAddInputChange("terminalExam.marks", Number(e.target.value))}
//                 min="0"
//                 max="100"
//               />
//             </Form.Group>

//             <div className="row">
//               <div className="col-md-6">
//                 <h5>FA-3</h5>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 1 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa3.activity1.m}
//                         onChange={(e) => handleAddInputChange("fa3.activity1.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 2 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa3.activity2.m}
//                         onChange={(e) => handleAddInputChange("fa3.activity2.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </div>

//               <div className="col-md-6">
//                 <h5>FA-4</h5>
//                 <div className="row">
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 1 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa4.activity1.m}
//                         onChange={(e) => handleAddInputChange("fa4.activity1.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                   <div className="col-md-6">
//                     <Form.Group className="mb-3">
//                       <Form.Label>Activity 2 (max 15)</Form.Label>
//                       <Form.Control
//                         type="number"
//                         value={newStudent.fa4.activity2.m}
//                         onChange={(e) => handleAddInputChange("fa4.activity2.m", Number(e.target.value))}
//                         min="0"
//                         max="15"
//                       />
//                     </Form.Group>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <Form.Group className="mb-3">
//               <Form.Label>Preparatory Exam / ಪೂರ್ವಭಾವಿ ಪರೀಕ್ಷೆ (max 100)</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newStudent.prepExam.marks}
//                 onChange={(e) => handleAddInputChange("prepExam.marks", Number(e.target.value))}
//                 min="0"
//                 max="100"
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Remarks / ಷರಾ</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newStudent.remarks}
//                 onChange={(e) => handleAddInputChange("remarks", e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowAddModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSaveNewStudent}>
//             Save Student
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Delete Confirmation Modal */}
//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete this student's information?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleConfirmDelete}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   )
// }



import React from "react";
import { useState, useRef } from "react";
import { Table, Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MarksRecordSheet = () => {
  const componentRef = useRef(null);
  const [students, setStudents] = useState(
    Array(40)
      .fill(0)
      .map((_, index) => ({
        id: index + 1,
        name: "",
        marks: {},
      }))
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [isEnglish, setIsEnglish] = useState(true);
  const [subjectName, setSubjectName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [className, setClassName] = useState("");
  const [academicYear, setAcademicYear] = useState("");

  const handlePrint = () => {
    const printContent = document.getElementById("printableArea");
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setShowEditModal(true);
  };

  const handleDelete = (student) => {
    setCurrentStudent(student);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (currentStudent) {
      const updatedStudents = [...students];
      const index = updatedStudents.findIndex((s) => s.id === currentStudent.id);

      updatedStudents[index] = {
        id: currentStudent.id,
        name: "",
        marks: {},
      };

      setStudents(updatedStudents);
      setShowDeleteModal(false);
      toast.success(isEnglish ? "Record cleared successfully!" : "ದಾಖಲೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ತೆರವುಗೊಳಿಸಲಾಗಿದೆ!");
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (currentStudent) {
      const updatedStudents = [...students];
      const index = updatedStudents.findIndex((s) => s.id === currentStudent.id);
      updatedStudents[index] = currentStudent;
      setStudents(updatedStudents);
      setShowEditModal(false);
      toast.success(isEnglish ? "Record updated successfully!" : "ದಾಖಲೆಯನ್ನು ಯಶಸ್ವಿಯಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ!");
    }
  };

  const handleInputChange = (field, value) => {
    if (currentStudent) {
      setCurrentStudent({
        ...currentStudent,
        [field]: value,
      });
    }
  };

  const handleMarksChange = (field, value) => {
    if (currentStudent) {
      setCurrentStudent({
        ...currentStudent,
        marks: {
          ...currentStudent.marks,
          [field]: value,
        },
      });
    }
  };

  // Calculate totals and percentages for display
  const calculateTotal = (student) => {
    // This is a placeholder - implement your actual calculation logic
    return Object.values(student.marks).reduce((sum, mark) => sum + (parseInt(mark) || 0), 0);
  };

  return (
    <div className="marks-record-container p-3" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0 text-primary">
          {isEnglish ? "Marks Record Sheet" : "ಅಂಕಗಳ ದಾಖಲೆ ಹಾಳೆ"}
        </h2>
        <div>
          <Button variant="outline-secondary" onClick={() => setIsEnglish(!isEnglish)} className="me-2">
            {isEnglish ? "ಕನ್ನಡ" : "English"}
          </Button>
          <Button variant="primary" onClick={handlePrint} className="shadow">
            <i className="bi bi-printer-fill me-2"></i>
            {isEnglish ? "Print Record Sheet" : "ದಾಖಲೆ ಹಾಳೆ ಮುದ್ರಿಸಿ"}
          </Button>
        </div>
      </div>

      <div className="mb-4 p-3 bg-white rounded shadow-sm">
        <h5 className="mb-3">{isEnglish ? "Class Information" : "ವರ್ಗದ ಮಾಹಿತಿ"}</h5>
        <Row>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>{isEnglish ? "Class" : "ವರ್ಗ"}</Form.Label>
              <Form.Control
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder={isEnglish ? "Enter class" : "ವರ್ಗವನ್ನು ನಮೂದಿಸಿ"}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>{isEnglish ? "Subject" : "ವಿಷಯ"}</Form.Label>
              <Form.Control
                type="text"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder={isEnglish ? "Enter subject" : "ವಿಷಯವನ್ನು ನಮೂದಿಸಿ"}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>{isEnglish ? "Teacher" : "ಶಿಕ್ಷಕರು"}</Form.Label>
              <Form.Control
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder={isEnglish ? "Enter teacher name" : "ಶಿಕ್ಷಕರ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>{isEnglish ? "Academic Year" : "ಶೈಕ್ಷಣಿಕ ವರ್ಷ"}</Form.Label>
              <Form.Control
                type="text"
                value={academicYear}
                onChange={(e) => setAcademicYear(e.target.value)}
                placeholder={isEnglish ? "e.g. 2023-24" : "ಉದಾ. 2023-24"}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>

      <div
        id="printableArea"
        ref={componentRef}
        className="bg-white p-0 rounded shadow-sm"
        style={{ fontFamily: "Arial, sans-serif", color: "#000" }}
      >
        <Container fluid className="p-0">
          {/* Header for printing */}
          <div className="d-none d-print-block text-center mb-3">
            <h4 className="mb-1">{isEnglish ? "SCHOOL NAME" : "ಶಾಲೆಯ ಹೆಸರು"}</h4>
            <h5 className="mb-1">
              {isEnglish ? "SUBJECT TEACHER INDIVIDUAL MARKS RECORD" : "ವಿಷಯ ಶಿಕ್ಷಕರ ವೈಯಕ್ತಿಕ ಅಂಕಪಟ್ಟಿ"}
            </h5>
            <div className="d-flex justify-content-around">
              <span>
                <strong>{isEnglish ? "Class" : "ವರ್ಗ"}:</strong> {className}
              </span>
              <span>
                <strong>{isEnglish ? "Subject" : "ವಿಷಯ"}:</strong> {subjectName}
              </span>
              <span>
                <strong>{isEnglish ? "Teacher" : "ಶಿಕ್ಷಕರು"}:</strong> {teacherName}
              </span>
              <span>
                <strong>{isEnglish ? "Academic Year" : "ಶೈಕ್ಷಣಿಕ ವರ್ಷ"}:</strong> {academicYear}
              </span>
            </div>
          </div>

          <Row className="m-0">
            {/* Left Page */}
            <Col xs={12} md={6} className="p-0">
              <div className="h-100 p-2" style={{ borderRight: "1px solid #dee2e6" }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <span className="fs-6 fw-bold text-primary">ವಿಷಯ ಶಿಕ್ಷಕರ ವೈಯಕ್ತಿಕ ಅಂಕಪಟ್ಟಿ</span>
                  </div>
                  <div className="d-flex">
                    <span className="fs-6 me-1 fw-bold">ವಿಷಯ:</span>
                    <span className="fs-6">{subjectName || "________________"}</span>
                  </div>
                </div>

                <Table
                  bordered
                  className="small"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    tableLayout: "fixed",
                    margin: "0",
                    fontSize: "10px",
                  }}
                >
                  <thead>
                    <tr className="bg-light">
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#f1f8ff" }}
                      >
                        Sl.
                        <br />
                        No.
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "100px", padding: "4px", backgroundColor: "#f1f8ff" }}
                      >
                        Student's Name
                        <br />
                        ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು
                      </th>
                      <th
                        colSpan={8}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#e7f5ff" }}
                      >
                        FA-1
                      </th>
                      <th
                        colSpan={8}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#e7f5ff" }}
                      >
                        FA-2
                      </th>
                      <th
                        colSpan={2}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#d0ebff" }}
                      >
                        FA-1
                        <br />+<br />
                        FA-2
                      </th>
                      <th
                        colSpan={4}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#d0ebff" }}
                      >
                        Terminal
                        <br />
                        Exam
                        <br />
                        ಪ್ರಥಮ
                        <br />
                        ಸೆಮ್
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#c5e3ff" }}
                      >
                        Total
                        <br />
                        ಒಟ್ಟು
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#c5e3ff" }}
                      >
                        %
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#c5e3ff" }}
                      >
                        Grade
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "40px", padding: "4px", backgroundColor: "#f1f8ff" }}
                      >
                        ಕ್ರಮಗಳು
                        <br />
                        Actions
                      </th>
                    </tr>
                    <tr className="bg-light">
                      <th
                        colSpan={4}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#edf7ff" }}
                      >
                        1 ನೇ ಚಟುವಟಿಕೆ
                        <br />
                        Activity
                      </th>
                      <th
                        colSpan={4}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#edf7ff" }}
                      >
                        2 ನೇ ಚಟುವಟಿಕೆ
                        <br />
                        Activity
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        1+2 ರ<br />
                        ಒಟ್ಟು
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        100ಕ್ಕೆ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        10ಕ್ಕೆ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        25/10%
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        ಗಳಿಸಿದ
                        <br />
                        ಅಂಕ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        100ಕ್ಕೆ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        75/90%
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        ಗಳಿಸಿದ
                        <br />
                        ಅಂಕ
                      </th>
                    </tr>
                    <tr className="bg-light">
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        M
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        O
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        E
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        ಒಟ್ಟು
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        M
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        O
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        E  
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        ಒಟ್ಟು
                      </th>
                    </tr>
                    <tr className="bg-light">
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        20
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        50
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        20
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        50
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        100
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        100
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        10
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        25
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        100
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        75
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 40).map((student, index) => (
                      <tr key={`left-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-light"}>
                        <td
                          className="text-center fw-normal"
                          style={{ padding: "4px", height: "24px", verticalAlign: "middle" }}
                        >
                          {index + 1}
                        </td>
                        <td
                          className="text-center fw-normal"
                          style={{ padding: "4px", height: "24px", verticalAlign: "middle" }}
                        >
                          {student.name}
                        </td>
                        {Array(19)
                          .fill(0)
                          .map((_, cellIndex) => (
                            <td
                              key={`left-cell-${index}-${cellIndex}`}
                              className="text-center fw-normal"
                              style={{
                                padding: "4px",
                                height: "24px",
                                verticalAlign: "middle",
                                backgroundColor: cellIndex < 8 ? "#f8f9fa" : "#ffffff",
                              }}
                            >
                              {student.marks[`left-${cellIndex}`] || ""}
                            </td>
                          ))}
                        <td
                          className="text-center fw-normal"
                          style={{ padding: "4px", height: "24px", verticalAlign: "middle" }}
                        >
                          <div className="d-flex justify-content-around" style={{ fontSize: "8px" }}>
                            <Button
                              variant="outline-primary"
                              className="p-0 d-flex align-items-center justify-content-center"
                              style={{
                                width: "20px",
                                height: "20px",
                                lineHeight: "1",
                                borderRadius: "4px",
                              }}
                              onClick={() => handleEdit(student)}
                              title={isEnglish ? "Edit" : "ಸಂಪಾದಿಸಿ"}
                            >
                              <i className="bi bi-pencil-fill" style={{ fontSize: "10px" }}></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              className="p-0 d-flex align-items-center justify-content-center"
                              style={{
                                width: "20px",
                                height: "20px",
                                lineHeight: "1",
                                borderRadius: "4px",
                              }}
                              onClick={() => handleDelete(student)}
                              title={isEnglish ? "Delete" : "ಅಳಿಸಿ"}
                            >
                              <i className="bi bi-trash-fill" style={{ fontSize: "10px" }}></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>

            {/* Right Page */}
            <Col xs={12} md={6} className="p-0">
              <div className="h-100 p-2">
                <div className="text-center mb-2">
                  <h5 className="fs-6 fw-bold m-0 text-uppercase text-primary">
                    SUBJECT TEACHER INDIVIDUAL MARKS RECORD
                  </h5>
                </div>

                <Table
                  bordered
                  className="small"
                  style={{
                    borderCollapse: "collapse",
                    width: "100%",
                    tableLayout: "fixed",
                    margin: "0",
                    fontSize: "10px",
                  }}
                >
                  <thead>
                    <tr className="bg-light">
                      <th
                        colSpan={8}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#e7f5ff" }}
                      >
                        FA-3
                      </th>
                      <th
                        colSpan={8}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#e7f5ff" }}
                      >
                        FA-4
                      </th>
                      <th
                        colSpan={2}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#d0ebff" }}
                      >
                        FA-3
                        <br />+<br />
                        FA-4
                      </th>
                      <th
                        colSpan={4}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#d0ebff" }}
                      >
                        Preparatory
                        <br />
                        Exam
                        <br />
                        ಪ್ರಿಪರೇಟರಿ
                        <br />
                        ಪರೀಕ್ಷೆ
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#c5e3ff" }}
                      >
                        Total
                        <br />
                        ಒಟ್ಟು
                        <br />
                        1+2+
                        <br />
                        3+4
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#c5e3ff" }}
                      >
                        %
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#c5e3ff" }}
                      >
                        Grade
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#f1f8ff" }}
                      >
                        Remarks
                      </th>
                      <th
                        rowSpan={3}
                        className="align-middle text-center fw-bold"
                        style={{ width: "40px", padding: "4px", backgroundColor: "#f1f8ff" }}
                      >
                        Actions
                      </th>
                    </tr>
                    <tr className="bg-light">
                      <th
                        colSpan={4}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#edf7ff" }}
                      >
                        3 ನೇ ಚಟುವಟಿಕೆ
                        <br />
                        Activity
                      </th>
                      <th
                        colSpan={4}
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#edf7ff" }}
                      >
                        4 ನೇ ಚಟುವಟಿಕೆ
                        <br />
                        Activity
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        3+4 ರ<br />
                        ಒಟ್ಟು
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        100ಕ್ಕೆ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        10ಕ್ಕೆ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        25/10%
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        ಗಳಿಸಿದ
                        <br />
                        ಅಂಕ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        100ಕ್ಕೆ
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        75/90%
                      </th>
                      <th
                        rowSpan={2}
                        className="align-middle text-center fw-bold"
                        style={{ width: "25px", padding: "4px", backgroundColor: "#e3f2ff" }}
                      >
                        ಗಳಿಸಿದ
                        <br />
                        ಅಂಕ
                      </th>
                    </tr>
                    <tr className="bg-light">
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        M
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        O
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        E
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        ಒಟ್ಟು
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        M
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        O
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        E
                      </th>
                      <th
                        className="text-center fw-bold"
                        style={{ width: "20px", padding: "4px", backgroundColor: "#f5fbff" }}
                      >
                        ಒಟ್ಟು
                      </th>
                    </tr>
                    <tr className="bg-light">
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        20
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        50
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        15
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        20
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        50
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        100
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        100
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        10
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        25
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        100
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        75
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      >
                        200
                      </td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                      <td
                        className="text-center fw-bold"
                        style={{ padding: "4px", backgroundColor: "#f8f9fa" }}
                      ></td>
                    </tr>
                  </thead>
                  <tbody>
                    {students.slice(0, 40).map((student, index) => (
                      <tr key={`right-${index}`} className={index % 2 === 0 ? "bg-white" : "bg-light"}>
                        {Array(20)
                          .fill(0)
                          .map((_, cellIndex) => (
                            <td
                              key={`right-cell-${index}-${cellIndex}`}
                              className="text-center fw-normal"
                              style={{
                                padding: "4px",
                                height: "24px",
                                verticalAlign: "middle",
                                backgroundColor: cellIndex < 8 ? "#f8f9fa" : "#ffffff",
                              }}
                            >
                              {student.marks[`right-${cellIndex}`] || ""}
                            </td>
                          ))}
                        <td
                          className="text-center fw-normal"
                          style={{ padding: "4px", height: "24px", verticalAlign: "middle" }}
                        >
                          <div className="d-flex justify-content-around" style={{ fontSize: "8px" }}>
                            <Button
                              variant="outline-primary"
                              className="p-0 d-flex align-items-center justify-content-center"
                              style={{
                                width: "20px",
                                height: "20px",
                                lineHeight: "1",
                                borderRadius: "4px",
                              }}
                              onClick={() => handleEdit(student)}
                              title={isEnglish ? "Edit" : "ಸಂಪಾದಿಸಿ"}
                            >
                              <i className="bi bi-pencil-fill" style={{ fontSize: "10px" }}></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              className="p-0 d-flex align-items-center justify-content-center"
                              style={{
                                width: "20px",
                                height: "20px",
                                lineHeight: "1",
                                borderRadius: "4px",
                              }}
                              onClick={() => handleDelete(student)}
                              title={isEnglish ? "Delete" : "ಅಳಿಸಿ"}
                            >
                              <i className="bi bi-trash-fill" style={{ fontSize: "10px" }}></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>
            {isEnglish ? "Edit Student Record" : "ವಿದ್ಯಾರ್ಥಿ ದಾಖಲೆಯನ್ನು ಸಂಪಾದಿಸಿ"} - {currentStudent?.id}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveEdit}>
            <Form.Group className="mb-3">
              <Form.Label>{isEnglish ? "Student Name" : "ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು"}</Form.Label>
              <Form.Control
                type="text"
                value={currentStudent?.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder={isEnglish ? "Enter student name" : "ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"}
              />
            </Form.Group>

            <h6 className="mt-4 mb-3">{isEnglish ? "Marks Entry" : "ಅಂಕಗಳನ್ನು ನಮೂದಿಸಿ"}</h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>FA-1 Activity 1 (M)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="15"
                    value={currentStudent?.marks?.["left-0"] || ""}
                    onChange={(e) => handleMarksChange("left-0", e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>FA-1 Activity 1 (O)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="15"
                    value={currentStudent?.marks?.["left-1"] || ""}
                    onChange={(e) => handleMarksChange("left-1", e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            {/* Add more mark fields as needed */}

            <div className="d-flex justify-content-between mb-3 mt-4">
              <Button variant="outline-secondary" onClick={() => setIsEnglish(false)}>
                ಕನ್ನಡ
              </Button>
              <Button variant="outline-secondary" onClick={() => setIsEnglish(true)}>
                English
              </Button>
            </div>
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" size="lg">
                {isEnglish ? "Save Changes" : "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>{isEnglish ? "Confirm Delete" : "ಅಳಿಸುವಿಕೆಯನ್ನು ದೃಢೀಕರಿಸಿ"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEnglish
            ? `Are you sure you want to clear all marks for student ${currentStudent?.id}? This action cannot be undone.`
            : `ನೀವು ಖಚಿತವಾಗಿಯೂ ವಿದ್ಯಾರ್ಥಿ ${currentStudent?.id} ರ ಎಲ್ಲಾ ಅಂಕಗಳನ್ನು ತೆರವುಗೊಳಿಸಲು ಬಯಸುವಿರಾ? ಈ ಕ್ರಿಯೆಯನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ.`}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            {isEnglish ? "Cancel" : "ರದ್ದುಮಾಡಿ"}
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <i className="bi bi-trash-fill me-1"></i>
            {isEnglish ? "Clear Record" : "ದಾಖಲೆ ತೆರವುಗೊಳಿಸಿ"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printableArea,
          #printableArea * {
            visibility: visible;
          }
          #printableArea {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            font-size: 12px;
          }
          button {
            display: none !important;
          }
          @page {
            size: landscape;
            margin: 0.5cm;
          }
          table {
            border-collapse: collapse;
            border: 1px solid #000;
          }
          td,
          th {
            border: 1px solid #000;
            padding: 3px !important;
          }
          .bg-light,
          .bg-white {
            background-color: #fff !important;
          }
          .text-primary {
            color: #000 !important;
          }
        }

        .marks-record-container {
          max-width: 100%;
          overflow-x: auto;
        }

        .table th {
          white-space: nowrap;
          vertical-align: middle;
        }

        .table td {
          vertical-align: middle;
        }

        .form-control:focus {
          border-color: #86b7fe;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }

        .btn-outline-primary:hover {
          color: #fff;
        }

        .btn-outline-danger:hover {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default MarksRecordSheet;
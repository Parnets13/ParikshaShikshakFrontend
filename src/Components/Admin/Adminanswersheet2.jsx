import React, { useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const customStyles = `
  .table-custom-border {
    border: 2px solid #000 !important;
    border-collapse: collapse !important;
  }
  .cell-custom-border {
    border: 1px solid #000 !important;
    border-collapse: collapse !important;
  }
  .vertical-text {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  .action-buttons {
    display: flex;
    justify-content: space-around;
  }
`;

export default function AnswerSheet() {
  // Header Data State
  const [headerData, setHeaderData] = useState({
    lessonName: "ಪಾಠದ ಹೆಸರು:-",
    taluk: "ತಾಲ್ಲೂಕು:-",
    district: "ಜಿಲ್ಲೆ:-",
    title: "ಶಿ ್ಷಕರ ಸಿ.ಆರ್.ಸಿ ಚಟುವಟಿಕೆ ಆಧಾ�ಿ  ಪ್ ಶ್�ೆಕೆ ಅಂಕपಟ್ ಿ 2024-25",
    subject: "ವಿಷಯ:- ಕನ್ನಡ(ಪ್ ಥಮ)",
    grade: "ರಗತಿ: 1",
    teacherName: "ನಿಯಮ ಶಿ ್ಷಕರ ಹೆಸರು:-"
  });
  // Student Rows State
  const initialRows = Array(31)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      studentName: "",
      scores: Array(31).fill(""),
    }));
  const [rows, setRows] = useState(initialRows);
  // Modals State
  const [showHeaderEditModal, setShowHeaderEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [currentDelete, setCurrentDelete] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentRow, setCurrentRow] = useState(null);

  // Header Edit Handlers
  const handleHeaderEdit = (section) => {
    setCurrentEdit({ type: 'header', section });
    setShowHeaderEditModal(true);
  };
  const handleHeaderSave = () => {
    setShowHeaderEditModal(false);
  };
  const handleHeaderDelete = (section) => {
    setCurrentDelete({ type: 'header', section });
    setShowDeleteModal(true);
  };

  // Student Edit Handlers
  const handleEdit = (row) => {
    setCurrentRow(row);
    setShowEditModal(true);
  };
  const handleDeleteClick = (row) => {
    setCurrentDelete({ type: 'student', data: row });
    setShowDeleteModal(true);
  };
  const handleInputChange = (field, value) => {
    if (field === "studentName") {
      setCurrentRow({ ...currentRow, studentName: value });
    } else {
      const scoreIndex = parseInt(field.replace("score", ""));
      setCurrentRow({ ...currentRow, scores: [...currentRow.scores.slice(0, scoreIndex), value, ...currentRow.scores.slice(scoreIndex + 1)] });
    }
  };
  const handleSaveEdit = () => {
    if (currentRow) {
      const updatedRows = rows.map((row) =>
        row.id === currentRow.id ? currentRow : row
      );
      setRows(updatedRows);
    }
    setShowEditModal(false);
  };

  // Common Delete Handler
  const handleConfirmDelete = () => {
    if (currentDelete.type === 'header') {
      const newHeaderData = { ...headerData };
      switch(currentDelete.section) {
        case 'top':
          newHeaderData.lessonName = "ಪಾಠದ ಹೆಸರು:-";
          newHeaderData.taluk = "ತಾಲ್ಲೂಕು:-";
          newHeaderData.district = "ಜಿಲ್�ೆ:-";
          break;
        case 'middle':
          newHeaderData.title = "ಶಿ ್ಷಕರ ಸಿ.ಆర್.ಸಿ ಚಟುವಟಿಕೆ ಆಧಾ�ಿ  ಪ್ ಶ್�ೆಕೆ ಅಂಕपಟ್ ಿ 2024-25";
          break;
        case 'bottom':
          newHeaderData.subject = "ವಿಷಯ:- ಕನ್ನಡ(ಪ್ ಥಮ)";
          newHeaderData.grade = "ರಗತಿ: 1";
          newHeaderData.teacherName = "ನಿಯಮ ಶಿ ್ಷಕರ ಹೆಸರು:-";
          break;
        default:
          console.warn('Unknown header section:', currentDelete.section);
      }
      setHeaderData(newHeaderData);
    } else {
      const updatedRows = rows.map((row) =>
        row.id === currentDelete.data.id
          ? { ...row, studentName: "", scores: Array(31).fill("") }
          : row
      );
      setRows(updatedRows);
    }
    setShowDeleteModal(false);
  };

  // Header Edit Modal
  const renderHeaderEditModal = () => (
    <Modal show={showHeaderEditModal} onHide={() => setShowHeaderEditModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Header</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {currentEdit.section === 'top' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>ಪಾಠದ ಹೆಸರು</Form.Label>
                <Form.Control
                  value={headerData.lessonName}
                  onChange={(e) => setHeaderData({...headerData, lessonName: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ತಾಲ್ಲೂಕು</Form.Label>
                <Form.Control
                  value={headerData.taluk}
                  onChange={(e) => setHeaderData({...headerData, taluk: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ಜಿಲ್ಲೆ</Form.Label>
                <Form.Control
                  value={headerData.district}
                  onChange={(e) => setHeaderData({...headerData, district: e.target.value})}
                />
              </Form.Group>
            </>
          )}
          {currentEdit.section === 'middle' && (
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={headerData.title}
                onChange={(e) => setHeaderData({...headerData, title: e.target.value})}
              />
            </Form.Group>
          )}
          {currentEdit.section === 'bottom' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>ವಿಷಯ</Form.Label>
                <Form.Control
                  value={headerData.subject}
                  onChange={(e) => setHeaderData({...headerData, subject: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ರಗತಿ</Form.Label>
                <Form.Control
                  value={headerData.grade}
                  onChange={(e) => setHeaderData({...headerData, grade: e.target.value})}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>ಶಿಕ್ಷಕರ ಹೆಸರು</Form.Label>
                <Form.Control
                  value={headerData.teacherName}
                  onChange={(e) => setHeaderData({...headerData, teacherName: e.target.value})}
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowHeaderEditModal(false)}>
          Close
        </Button>
        <Button variant="primary" onClick={handleHeaderSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );

  // Modified Header Table JSX
  const renderHeaderTable = () => (
    <Table bordered className="text-center table-custom-border">
      <thead>
        <tr>
          <th className="cell-custom-border w-50">{headerData.lessonName}</th>
          <th className="cell-custom-border w-25">{headerData.taluk}</th>
          <th className="cell-custom-border w-25">{headerData.district}</th>
          <th className="cell-custom-border w-25">
            <div className="action-buttons">
              <Button variant="primary" size="sm" onClick={() => handleHeaderEdit('top')}>
                <FaEdit />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleHeaderDelete('top')}>
                <FaTrash />
              </Button>
            </div>
          </th>
        </tr>
        <tr>
          <td colSpan={3} className="text-center cell-custom-border">
            {headerData.title}
          </td>
          <td className="cell-custom-border w-25">
            <div className="action-buttons">
              <Button variant="primary" size="sm" onClick={() => handleHeaderEdit('middle')}>
                <FaEdit />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleHeaderDelete('middle')}>
                <FaTrash />
              </Button>
            </div>
          </td>
        </tr>
        <tr>
          <td className="cell-custom-border">{headerData.subject}</td>
          <td className="cell-custom-border">{headerData.grade}</td>
          <td className="cell-custom-border">{headerData.teacherName}</td>
          <td className="cell-custom-border w-25">
            <div className="action-buttons">
              <Button variant="primary" size="sm" onClick={() => handleHeaderEdit('bottom')}>
                <FaEdit />
              </Button>
              <Button variant="danger" size="sm" onClick={() => handleHeaderDelete('bottom')}>
                <FaTrash />
              </Button>
            </div>
          </td>
        </tr>
      </thead>
    </Table>
  );

  return (
    <div className="container-fluid mt-4">
      <h1>Mark Sheet</h1>
      <style>{customStyles}</style>
      {renderHeaderTable()}
      {renderHeaderEditModal()} {/* Added this line to render the header edit modal */}
      <Table bordered className="text-center table-custom-border mt-2">
        <thead>
          <tr>
            <th rowSpan={3} className="cell-custom-border vertical-text" style={{ width: "5%" }}>
              ಕ್ಸಂಖ್
            </th>
            <th rowSpan={3} className="cell-custom-border align-middle" style={{ width: "15%" }}>
              ಕಲಿಕೆ ಮಗುವಿನ ಹೆಸರು
              <div className="text-center mt-2">
                <span className="d-inline-block me-1 text-primary">→</span>
              </div>
            </th>
            <th colSpan={8} className="cell-custom-border">
              1 ನೇ ಪರಿಮಾಣಾತ್ಮಕ ಮೌಲ್ಮಾನ
            </th>
            <th colSpan={8} className="cell-custom-border">
              2 ನೇ ಪರಿಮಾಣಾತ್ಮಕ ಮೌಲ್ಮಾನ
            </th>
            <th rowSpan={3} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಒಟ್ಟು ಅಂಕಗಳು (150)</div>
            </th>
            <th colSpan={5} className="cell-custom-border">
              ಸಂಖ್-1
            </th>
            {/* <th rowSpan={3} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              ಕ್ಳು
            </th> */}
          </tr>
          <tr>
            <th colSpan={6} className="cell-custom-border">
              ಪ್ಗಳು
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಒಟ್ಟು ಅಂಕಗಳು</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಶೇಕಡಾವಾ ು</div>
            </th>
            <th colSpan={6} className="cell-custom-border">
              ಪ್ಗಳು
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಒಟ್ಟು ಅಂಕಗಳು</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "5%" }}>
              <div className="vertical-text">ಶೇಕಡಾವಾ ು</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "3%" }}>
              <div className="vertical-text">ಶ್ ಳ ಣಿ</div>
            </th>
            <th rowSpan={2} className="cell-custom-border align-middle" style={{ width: "3%" }}>
              <div className="vertical-text">ಗ್ ಳ ಡ್</div>
            </th>
            <th colSpan={3} className="cell-custom-border">
              ಸಂಖ್ಗಳು
            </th>
          </tr>
          <tr>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              <div className="vertical-text">ಅಂಕಗಳು</div>
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              1
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              2
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              3
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              4
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              <div className="vertical-text">ಒಟ್ಟು</div>
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              1
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              2
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              3
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              4
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              5
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              <div className="vertical-text">ಒಟ್ಟು</div>
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              30
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              40
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              10
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              50
            </th>
            <th className="cell-custom-border" style={{ width: "3%" }}>
              20
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} style={{ height: "30px" }}>
              <td className="cell-custom-border">{row.id}</td>
              <td className="cell-custom-border">{row.studentName}</td>
              {Array(25)
                .fill(null)
                .map((_, cellIndex) => (
                  <td key={cellIndex} className="cell-custom-border">
                    {row.scores[cellIndex]}
                  </td>
                ))}
              <td className="cell-custom-border">
                <div className="action-buttons">
                  <Button variant="primary" size="sm" onClick={() => handleEdit(row)} className="me-1">
                    <FaEdit />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(row)}>
                    <FaTrash />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={25} className="cell-custom-border text-start fs-6 p-2">
              ಸೂಚನೆ:- ಈ ಮೌಲ್ ಮಾ ನದಲ್ಲಿ ವಿದ್ಯಾ ್ಥಿ�ಳು ಗಳಿಸಿರುವ ಅಂಕಗಳನ್ನು ಪರಿಗಣಿಸುತ್тಾ, ಪ್ ತಿ ೊಬ್ಬ ವಿದ್ಯಾ ್ಥಿಗೆ ಅವರ ಅಂಕಗಳ ಪ್ ಕಾರ ಶೇಕಡಾವಾ ು
              ಪಡೆದಿದ್ದರೆ ಈ ಮಾಹಿ ಯನ್ನು ಮೌಲ್ ಮಾ ನ ಕೊಡಬೇಕು.
            </td>
          </tr>
        </tfoot>
      </Table>
      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Student Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRow && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentRow.studentName}
                  onChange={(e) => handleInputChange("studentName", e.target.value)}
                />
              </Form.Group>
              <h5>Scores</h5>
              <div className="row">
                {Array(25)
                  .fill(null)
                  .map((_, index) => (
                    <div className="col-md-2 mb-2" key={index}>
                      <Form.Group>
                        <Form.Label>Score {index + 1}</Form.Label>
                        <Form.Control
                          type="text"
                          value={currentRow.scores[index] || ""}
                          onChange={(e) => handleInputChange(`score${index}`, e.target.value)}
                        />
                      </Form.Group>
                    </div>
                  ))}
              </div>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this student's information?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
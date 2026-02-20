import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllClasses, getStudentsByClass, deleteStudent } from '../../services/resultMakerService';

const Students = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getAllClasses();
      if (response.success) {
        setClasses(response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      // Fallback to local storage
      const localClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      setClasses(localClasses);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleImport = () => {
    alert('Import functionality');
  };

  const handleExport = () => {
    alert('Export functionality');
  };

  const handleAddNew = () => {
    navigate('/resultsheetmaker/add-student');
  };

  const handleClassClick = (classItem) => {
    setSelectedClass(classItem);
    fetchStudents(classItem._id);
  };

  const fetchStudents = async (classId) => {
    try {
      setLoadingStudents(true);
      const response = await getStudentsByClass(classId);
      if (response.success && response.data) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error loading students');
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleBackToClasses = () => {
    setSelectedClass(null);
    setStudents([]);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowViewModal(true);
  };

  const handleEditStudent = (student) => {
    // Navigate to edit page with student data
    navigate('/resultsheetmaker/add-student', { 
      state: { 
        student: student,
        classId: selectedClass._id,
        isEdit: true
      } 
    });
  };

  const handleDeleteStudent = async (student) => {
    if (!window.confirm(`Are you sure you want to delete ${student.studentName}?`)) {
      return;
    }

    try {
      const response = await deleteStudent(student._id);
      if (response.success) {
        alert('Student deleted successfully');
        // Refresh students list
        fetchStudents(selectedClass._id);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert(error.response?.data?.message || 'Error deleting student');
    }
  };

  const handleExportClass = (e, classItem) => {
    e.stopPropagation();
    alert(`Export ${getClassDisplayName(classItem)}`);
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.name || classItem.className || classItem;
  };

  const getStudentCount = (classItem) => {
    return classItem.studentCount || classItem.students || 0;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={selectedClass ? handleBackToClasses : handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">
          {selectedClass ? getClassDisplayName(selectedClass) : 'Session : 2025-2026'}
        </h5>
        <div style={{ width: '24px' }}></div>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 border-bottom">
        <h5 className="mb-0 fw-bold">
          {selectedClass ? `Students (${students.length})` : 'Available Classes'}
        </h5>
      </div>

      {/* Content */}
      <div className="container-fluid p-0">
        {!selectedClass ? (
          // Classes List
          <>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : classes.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <p>No classes available. Please add classes first.</p>
              </div>
            ) : (
              classes.map((classItem, index) => (
                <div 
                  key={classItem._id || index}
                  className="bg-white border-bottom p-3 d-flex justify-content-between align-items-center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClassClick(classItem)}
                >
                  <div>
                    <h6 className="mb-1 fw-bold text-secondary">{getClassDisplayName(classItem)}</h6>
                    <p className="mb-0 text-muted small">Students: {getStudentCount(classItem)}</p>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <button 
                      className="btn btn-link p-0 text-danger text-center"
                      onClick={(e) => handleExportClass(e, classItem)}
                      style={{ textDecoration: 'none' }}
                    >
                      <i className="fas fa-file-export fs-4 d-block"></i>
                      <div className="small text-danger" style={{ fontSize: '11px' }}>Export</div>
                    </button>
                    <i className="fas fa-chevron-right text-secondary"></i>
                  </div>
                </div>
              ))
            )}
          </>
        ) : (
          // Students List in Table Format
          <>
            {loadingStudents ? (
              <div className="text-center py-5">
                <div className="spinner-border text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : students.length === 0 ? (
              <div className="text-center py-5 text-muted">
                <i className="fas fa-users fa-3x mb-3"></i>
                <p>No students found in this class</p>
                <button className="btn btn-info" onClick={handleAddNew}>
                  <i className="fas fa-plus me-2"></i>
                  Add First Student
                </button>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light sticky-top">
                    <tr>
                      <th style={{ width: '50px' }}>Sr.</th>
                      <th>Student Name</th>
                      <th style={{ width: '120px' }}>Admission No</th>
                      <th>Father</th>
                      <th>Mother</th>
                      <th style={{ width: '150px' }} className="text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student._id || index}>
                        <td className="align-middle">{index + 1}</td>
                        <td className="align-middle fw-semibold">{student.studentName}</td>
                        <td className="align-middle">{student.admissionNo}</td>
                        <td className="align-middle">{student.fatherName || '-'}</td>
                        <td className="align-middle">{student.motherName || '-'}</td>
                        <td className="align-middle text-center">
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-sm btn-info"
                              onClick={() => handleViewStudent(student)}
                              title="View Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-warning"
                              onClick={() => handleEditStudent(student)}
                              title="Edit Student"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button 
                              className="btn btn-sm btn-danger"
                              onClick={() => handleDeleteStudent(student)}
                              title="Delete Student"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Action Buttons */}
      <div 
        className="position-fixed bottom-0 start-0 end-0 bg-white border-top py-3 px-4"
        style={{ zIndex: 1000 }}
      >
        <div className="d-flex justify-content-around align-items-center">
          <button 
            className="btn btn-link text-danger p-0 text-center" 
            onClick={handleImport}
            style={{ textDecoration: 'none' }}
          >
            <i className="fas fa-file-import fs-2 d-block"></i>
            <div className="small text-danger mt-1">Import</div>
          </button>
          <button 
            className="btn btn-link text-danger p-0 text-center" 
            onClick={handleExport}
            style={{ textDecoration: 'none' }}
          >
            <i className="fas fa-file-export fs-2 d-block"></i>
            <div className="small text-danger mt-1">Export</div>
          </button>
          <button 
            className="btn btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px' }}
            onClick={handleAddNew}
          >
            <i className="fas fa-plus fs-3"></i>
          </button>
        </div>
      </div>

      {/* View Student Modal */}
      {showViewModal && selectedStudent && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">
                  <i className="fas fa-user me-2"></i>
                  Student Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary">Student Name</label>
                    <p className="form-control-plaintext border-bottom">{selectedStudent.studentName}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary">Admission Number</label>
                    <p className="form-control-plaintext border-bottom">{selectedStudent.admissionNo}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary">Father's Name</label>
                    <p className="form-control-plaintext border-bottom">{selectedStudent.fatherName || '-'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary">Mother's Name</label>
                    <p className="form-control-plaintext border-bottom">{selectedStudent.motherName || '-'}</p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary">Date of Birth</label>
                    <p className="form-control-plaintext border-bottom">
                      {selectedStudent.dateOfBirth ? new Date(selectedStudent.dateOfBirth).toLocaleDateString() : '-'}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-bold text-secondary">Gender</label>
                    <p className="form-control-plaintext border-bottom">{selectedStudent.gender || '-'}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditStudent(selectedStudent);
                  }}
                >
                  <i className="fas fa-edit me-2"></i>
                  Edit Student
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;

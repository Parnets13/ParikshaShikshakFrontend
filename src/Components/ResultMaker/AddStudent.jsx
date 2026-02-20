import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAllClasses, addStudent, updateStudent } from '../../services/resultMakerService';

const AddStudent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Check if we're in edit mode
  const isEditMode = location.state?.isEdit || false;
  const existingStudent = location.state?.student || null;
  const preSelectedClassId = location.state?.classId || '';
  
  const [formData, setFormData] = useState({
    admissionNo: '',
    className: '',
    studentName: '',
    fatherName: '',
    motherName: '',
    mobileNo: '',
    dateOfBirth: '',
    gender: ''
  });

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    // Pre-populate form if editing - wait for classes to load
    if (isEditMode && existingStudent && classes.length > 0) {
      // Find the class display name
      let classDisplayName = '';
      
      if (existingStudent.classId) {
        // If classId is populated (object)
        if (typeof existingStudent.classId === 'object' && existingStudent.classId.className) {
          classDisplayName = existingStudent.classId.className && existingStudent.classId.section
            ? `${existingStudent.classId.className} - ${existingStudent.classId.section}`
            : existingStudent.classId.className;
        } else {
          // If classId is just an ID, find it in classes array
          const classObj = classes.find(c => c._id === existingStudent.classId);
          if (classObj) {
            classDisplayName = getClassDisplayName(classObj);
          }
        }
      }
      
      setFormData({
        admissionNo: existingStudent.admissionNo || '',
        className: classDisplayName || preSelectedClassId,
        studentName: existingStudent.studentName || '',
        fatherName: existingStudent.fatherName || '',
        motherName: existingStudent.motherName || '',
        mobileNo: existingStudent.mobileNumber || existingStudent.mobileNo || '',
        dateOfBirth: existingStudent.dateOfBirth ? new Date(existingStudent.dateOfBirth).toISOString().split('T')[0] : '',
        gender: existingStudent.gender || ''
      });
    }
  }, [isEditMode, existingStudent, preSelectedClassId, classes]);

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
    navigate(-1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.admissionNo.trim()) {
      alert('Please enter admission number');
      return;
    }
    if (!formData.className) {
      alert('Please select a class');
      return;
    }
    if (!formData.studentName.trim()) {
      alert('Please enter student name');
      return;
    }
    if (!formData.mobileNo.trim()) {
      alert('Please enter mobile number');
      return;
    }

    try {
      setLoading(true);
      
      if (isEditMode && existingStudent) {
        // Update existing student
        const response = await updateStudent(existingStudent._id, formData);
        if (response.success) {
          alert('Student updated successfully!');
          navigate('/resultsheetmaker/students');
        }
      } else {
        // Add new student
        const response = await addStudent(formData);
        if (response.success) {
          alert('Student added successfully!');
          navigate('/resultsheetmaker/students');
        }
      }
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} student:`, error);
      const errorMessage = error.response?.data?.message || `Error ${isEditMode ? 'updating' : 'adding'} student. Please try again.`;
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.className || classItem;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex align-items-center">
        <button className="btn btn-link text-white p-0 me-3" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">{isEditMode ? 'Edit Student' : 'Add Student'}</h5>
      </div>

      {/* Form */}
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded shadow-sm p-4">
            {/* Admission Number */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Admission No.*</label>
              <input
                type="text"
                className="form-control"
                name="admissionNo"
                value={formData.admissionNo}
                onChange={handleChange}
                placeholder="Enter admission number"
                required
              />
            </div>

            {/* Class Dropdown */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Class*</label>
              <select
                className="form-select"
                name="className"
                value={formData.className}
                onChange={handleChange}
                required
                disabled={classes.length === 0}
              >
                <option value="">Select Class</option>
                {classes.map((classItem, index) => (
                  <option 
                    key={classItem._id || index} 
                    value={getClassDisplayName(classItem)}
                  >
                    {getClassDisplayName(classItem)}
                  </option>
                ))}
              </select>
              {classes.length === 0 && (
                <div className="alert alert-warning mt-2" role="alert">
                  <small>
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    No classes available. Please{' '}
                    <button 
                      type="button"
                      className="btn btn-link p-0 align-baseline"
                      onClick={() => navigate('/resultsheetmaker/view-create-classes')}
                    >
                      add classes
                    </button>
                    {' '}first.
                  </small>
                </div>
              )}
            </div>

            {/* Student Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Student Name*</label>
              <input
                type="text"
                className="form-control"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                required
              />
            </div>

            {/* Father Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Father Name</label>
              <input
                type="text"
                className="form-control"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleChange}
                placeholder="Enter father name"
              />
            </div>

            {/* Mother Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Mother Name</label>
              <input
                type="text"
                className="form-control"
                name="motherName"
                value={formData.motherName}
                onChange={handleChange}
                placeholder="Enter mother name"
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Mobile No.*</label>
              <input
                type="tel"
                className="form-control"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength="10"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Date of Birth</label>
              <input
                type="date"
                className="form-control"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>

            {/* Gender */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Gender</label>
              <select
                className="form-select"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="d-flex gap-3 mt-4">
              <button 
                type="button"
                className="btn btn-secondary flex-fill py-2"
                onClick={handleBack}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="btn btn-info text-white flex-fill py-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    {isEditMode ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  isEditMode ? 'Update Student' : 'Add Student'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

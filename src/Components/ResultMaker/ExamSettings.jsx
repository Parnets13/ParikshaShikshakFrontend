import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllClasses,
  getAllTerms,
  addTerm,
  deleteTerm,
  getAllAssessmentTypes,
  addAssessmentType,
  deleteAssessmentType,
  getAllSubjects,
  addSubject,
  deleteSubject
} from '../../services/resultMakerService';

const ExamSettings = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('terms');
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [terms, setTerms] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      fetchDataForClass(selectedClass);
    }
  }, [selectedClass, activeTab]);

  const fetchClasses = async () => {
    try {
      const response = await getAllClasses();
      if (response.success && response.data.length > 0) {
        setClasses(response.data);
        setSelectedClass(response.data[0]._id);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  const fetchDataForClass = async (classId) => {
    if (activeTab === 'terms') {
      await fetchTerms(classId);
    } else if (activeTab === 'assessments') {
      await fetchAssessmentTypes(classId);
    } else if (activeTab === 'subjects') {
      await fetchSubjects(classId);
    }
  };

  const fetchTerms = async (classId) => {
    try {
      const response = await getAllTerms(classId);
      if (response.success) {
        setTerms(response.data);
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      setTerms([]);
    }
  };

  const fetchAssessmentTypes = async (classId) => {
    try {
      const response = await getAllAssessmentTypes(classId);
      if (response.success) {
        setAssessmentTypes(response.data);
      }
    } catch (error) {
      console.error('Error fetching assessment types:', error);
      setAssessmentTypes([]);
    }
  };

  const fetchSubjects = async (classId) => {
    try {
      const response = await getAllSubjects(classId);
      if (response.success) {
        setSubjects(response.data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([]);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/students');
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) {
      alert('Please enter a name');
      return;
    }

    if (!selectedClass) {
      alert('Please select a class');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (activeTab === 'terms') {
        response = await addTerm({ termName: newItemName, classId: selectedClass });
        if (response.success) {
          await fetchTerms(selectedClass);
          alert('Term added successfully');
        }
      } else if (activeTab === 'assessments') {
        response = await addAssessmentType({ assessmentName: newItemName, classId: selectedClass });
        if (response.success) {
          await fetchAssessmentTypes(selectedClass);
          alert('Assessment type added successfully');
        }
      } else if (activeTab === 'subjects') {
        response = await addSubject({ subjectName: newItemName, classId: selectedClass });
        if (response.success) {
          await fetchSubjects(selectedClass);
          alert('Subject added successfully');
        }
      }
      setNewItemName('');
      setShowModal(false);
    } catch (error) {
      console.error('Error adding item:', error);
      alert(error.response?.data?.message || 'Error adding item');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      let response;
      if (activeTab === 'terms') {
        response = await deleteTerm(itemId);
        if (response.success) {
          await fetchTerms(selectedClass);
          alert('Term deleted successfully');
        }
      } else if (activeTab === 'assessments') {
        response = await deleteAssessmentType(itemId);
        if (response.success) {
          await fetchAssessmentTypes(selectedClass);
          alert('Assessment type deleted successfully');
        }
      } else if (activeTab === 'subjects') {
        response = await deleteSubject(itemId);
        if (response.success) {
          await fetchSubjects(selectedClass);
          alert('Subject deleted successfully');
        }
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      alert(error.response?.data?.message || 'Error deleting item');
    }
  };

  const getCurrentItems = () => {
    if (activeTab === 'terms') return terms;
    if (activeTab === 'assessments') return assessmentTypes;
    if (activeTab === 'subjects') return subjects;
    return [];
  };

  const getItemName = (item) => {
    if (activeTab === 'terms') return item.termName;
    if (activeTab === 'assessments') return item.assessmentName;
    if (activeTab === 'subjects') return item.subjectName;
    return '';
  };

  const getModalTitle = () => {
    if (activeTab === 'terms') return 'Add Term';
    if (activeTab === 'assessments') return 'Add Assessment Type';
    if (activeTab === 'subjects') return 'Add Subject';
    return '';
  };

  const getPlaceholder = () => {
    if (activeTab === 'terms') return 'Enter term name (e.g., Term 1, Mid Term)';
    if (activeTab === 'assessments') return 'Enter assessment type (e.g., Unit Test, Final Exam)';
    if (activeTab === 'subjects') return 'Enter subject name (e.g., Mathematics, Science)';
    return '';
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.name || classItem.className || classItem;
  };

  const getSelectedClassName = () => {
    const classItem = classes.find(c => c._id === selectedClass);
    return classItem ? getClassDisplayName(classItem) : '';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Exam Settings</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-question-circle fs-4"></i>
          </button>
        </div>
      </div>

      {/* Class Selector */}
      <div className="bg-white border-bottom py-3 px-3">
        <label className="form-label fw-semibold text-secondary mb-2">Select Class</label>
        <select
          className="form-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
        >
          {classes.map((classItem) => (
            <option key={classItem._id} value={classItem._id}>
              {getClassDisplayName(classItem)}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="bg-white border-bottom">
        <div className="container-fluid">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'terms' ? 'active text-info border-info border-bottom border-3' : 'text-secondary'}`}
                onClick={() => setActiveTab('terms')}
                style={{ border: 'none', borderBottom: activeTab === 'terms' ? '3px solid' : 'none' }}
              >
                Terms
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'assessments' ? 'active text-info border-info border-bottom border-3' : 'text-secondary'}`}
                onClick={() => setActiveTab('assessments')}
                style={{ border: 'none', borderBottom: activeTab === 'assessments' ? '3px solid' : 'none' }}
              >
                Assessment Types
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'subjects' ? 'active text-info border-info border-bottom border-3' : 'text-secondary'}`}
                onClick={() => setActiveTab('subjects')}
                style={{ border: 'none', borderBottom: activeTab === 'subjects' ? '3px solid' : 'none' }}
              >
                Subjects
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        {!selectedClass ? (
          <div className="text-center py-5">
            <i className="fas fa-exclamation-circle fs-1 text-warning mb-3"></i>
            <p className="text-muted">Please select a class first</p>
          </div>
        ) : getCurrentItems().length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-inbox fs-1 text-muted mb-3"></i>
            <p className="text-muted">No items added yet for {getSelectedClassName()}</p>
          </div>
        ) : (
          <div className="list-group">
            {getCurrentItems().map((item, index) => (
              <div
                key={item._id}
                className="list-group-item d-flex justify-content-between align-items-center mb-2 border rounded"
              >
                <div>
                  <span className="fw-semibold">{index + 1}. </span>
                  <span>{getItemName(item)}</span>
                </div>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDeleteItem(item._id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      <button
        className="btn btn-info rounded-circle position-fixed"
        style={{
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        }}
        onClick={() => setShowModal(true)}
        disabled={!selectedClass}
      >
        <i className="fas fa-plus text-white"></i>
      </button>

      {/* Add Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">{getModalTitle()}</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Class</label>
                  <input
                    type="text"
                    className="form-control"
                    value={getSelectedClassName()}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={getPlaceholder()}
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleAddItem();
                      }
                    }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-info text-white"
                  onClick={handleAddItem}
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamSettings;

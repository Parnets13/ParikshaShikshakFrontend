import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllClasses,
  addTerm,
  addAssessmentType,
  addSubject
} from '../../services/resultMakerService';

const ExamSettingsMain = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'term', 'assessment', 'subject'
  const [selectedClassForAdd, setSelectedClassForAdd] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [addLoading, setAddLoading] = useState(false);

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
      const localClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      setClasses(localClasses);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleClassClick = (classItem) => {
    navigate('/resultsheetmaker/exam-settings-detail', {
      state: { selectedClass: classItem }
    });
  };

  const openAddModal = (type) => {
    console.log('openAddModal called with type:', type);
    console.log('Classes:', classes);
    console.log('Classes length:', classes.length);
    
    if (classes.length === 0) {
      alert('Please create classes first');
      return;
    }
    
    console.log('Setting modal type to:', type);
    console.log('Setting selectedClassForAdd to:', classes[0]._id);
    
    setModalType(type);
    setSelectedClassForAdd(classes[0]._id); // Default to first class
    setNewItemName('');
    setShowAddModal(true);
    
    console.log('showAddModal should now be true');
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) {
      alert('Please enter a name');
      return;
    }

    if (!selectedClassForAdd) {
      alert('Please select a class');
      return;
    }

    setAddLoading(true);
    try {
      let response;
      if (modalType === 'term') {
        response = await addTerm({ termName: newItemName, classId: selectedClassForAdd });
        if (response.success) {
          alert('Term added successfully');
        }
      } else if (modalType === 'assessment') {
        response = await addAssessmentType({ assessmentName: newItemName, classId: selectedClassForAdd });
        if (response.success) {
          alert('Assessment type added successfully');
        }
      } else if (modalType === 'subject') {
        response = await addSubject({ subjectName: newItemName, classId: selectedClassForAdd });
        if (response.success) {
          alert('Subject added successfully');
        }
      }
      setShowAddModal(false);
      setNewItemName('');
    } catch (error) {
      console.error('Error adding item:', error);
      alert(error.response?.data?.message || 'Error adding item');
    } finally {
      setAddLoading(false);
    }
  };

  const getModalTitle = () => {
    if (modalType === 'term') return 'Add Term';
    if (modalType === 'assessment') return 'Add Test/Assessment';
    if (modalType === 'subject') return 'Add Subject';
    return '';
  };

  const getPlaceholder = () => {
    if (modalType === 'term') return 'Enter term name (e.g., Term 1, Mid Term)';
    if (modalType === 'assessment') return 'Enter test/assessment name (e.g., Unit Test, Final Exam)';
    if (modalType === 'subject') return 'Enter subject name (e.g., Mathematics, Science)';
    return '';
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.name || classItem.className || classItem;
  };

  // Debug log
  console.log('ExamSettingsMain render - showAddModal:', showAddModal, 'modalType:', modalType);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Exams Setting - (2025-2026)</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-question-circle fs-4"></i>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h4 className="mb-0 fw-bold">Available Classes</h4>
      </div>

      {/* Main Content with Sidebar */}
      <div className="container-fluid py-4">
        <div className="row">
          {/* Left Sidebar - Quick Actions */}
          <div className="col-md-3 col-lg-2 mb-4">
            <div className="bg-white rounded shadow-sm p-3 sticky-top" style={{ top: '20px' }}>
              <h6 className="text-muted mb-3 fw-bold">Quick Actions</h6>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-outline-info text-start"
                  onClick={() => openAddModal('term')}
                  disabled={classes.length === 0}
                >
                  <i className="fas fa-plus-circle me-2"></i>
                  Add Term
                </button>
                <button
                  className="btn btn-outline-info text-start"
                  onClick={() => openAddModal('assessment')}
                  disabled={classes.length === 0}
                >
                  <i className="fas fa-plus-circle me-2"></i>
                  Add Test
                </button>
                <button
                  className="btn btn-outline-info text-start"
                  onClick={() => openAddModal('subject')}
                  disabled={classes.length === 0}
                >
                  <i className="fas fa-plus-circle me-2"></i>
                  Add Subject
                </button>
              </div>
              {classes.length === 0 && (
                <small className="text-muted d-block mt-2">
                  Create classes first to enable quick actions
                </small>
              )}
            </div>
          </div>

          {/* Classes List */}
          <div className="col-md-9 col-lg-10">
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              {classes.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-inbox fs-1 text-muted mb-3"></i>
                  <p className="text-muted">No classes available</p>
                  <button
                    className="btn btn-info text-white"
                    onClick={() => navigate('/resultsheetmaker/view-create-classes')}
                  >
                    Create Classes
                  </button>
                </div>
              ) : (
                <div className="list-group">
                  {classes.map((classItem, index) => (
                    <button
                      key={classItem._id || index}
                      className="list-group-item list-group-item-action d-flex justify-content-between align-items-center mb-2 border rounded py-3"
                      onClick={() => handleClassClick(classItem)}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '16px',
                        fontWeight: '500'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e7f6f8';
                        e.currentTarget.style.borderColor = '#17a2b8';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.borderColor = '#dee2e6';
                      }}
                    >
                      <span>{getClassDisplayName(classItem)}</span>
                      <i className="fas fa-chevron-right text-info"></i>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setShowAddModal(false)}
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
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Class</label>
                  <select
                    className="form-select"
                    value={selectedClassForAdd}
                    onChange={(e) => setSelectedClassForAdd(e.target.value)}
                  >
                    {classes.map((classItem) => (
                      <option key={classItem._id} value={classItem._id}>
                        {getClassDisplayName(classItem)}
                      </option>
                    ))}
                  </select>
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
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-info text-white"
                  onClick={handleAddItem}
                  disabled={addLoading}
                >
                  {addLoading ? 'Adding...' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ExamSettingsMain;

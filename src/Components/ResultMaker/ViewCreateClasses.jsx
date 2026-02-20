import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addClass, getAllClasses, deleteClass } from '../../services/resultMakerService';

const ViewCreateClasses = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [section, setSection] = useState('');
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);

  const classOptions = [
    'PLAY', 'NUR', 'KG', 'LKG', 'UKG', 'PREP', 'PREP1', 'PREP2',
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
  ];

  // Fetch classes on component mount
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
      // If no token or not logged in, use local storage as fallback
      const localClasses = JSON.parse(localStorage.getItem('classes') || '[]');
      setClasses(localClasses);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/students');
  };

  const handleAddClass = async () => {
    if (!selectedClass.trim()) {
      alert('Please select a class');
      return;
    }
    if (!section.trim()) {
      alert('Please enter a section');
      return;
    }

    try {
      setLoading(true);
      const response = await addClass({
        className: selectedClass,
        section: section
      });

      if (response.success) {
        // Refresh the classes list
        await fetchClasses();
        setShowAddModal(false);
        setSelectedClass('');
        setSection('');
        alert('Class added successfully!');
      }
    } catch (error) {
      console.error('Error adding class:', error);
      // Fallback to local storage if API fails
      const newClass = {
        _id: Date.now().toString(),
        className: selectedClass,
        section: section,
        studentCount: 0
      };
      const updatedClasses = [...classes, newClass];
      setClasses(updatedClasses);
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      setShowAddModal(false);
      setSelectedClass('');
      setSection('');
      alert('Class added successfully (offline mode)!');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setShowAddModal(true);
    setSelectedClass('');
    setSection('');
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setSelectedClass('');
    setSection('');
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
        <h5 className="mb-0 fw-bold">View / Create Classes</h5>
      </div>

      {/* Available Classes Title */}
      <div className="bg-white py-4 px-3 text-center">
        <h4 className="mb-0 fw-bold">Available Classes</h4>
      </div>

      {/* Classes List */}
      <div className="container-fluid p-0">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-info" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p>No classes added yet. Click the + button to add a class.</p>
          </div>
        ) : (
          classes.map((classItem, index) => (
            <div 
              key={classItem._id || index}
              className="bg-white border-bottom py-3 px-4"
            >
              <p className="mb-0 text-dark">{getClassDisplayName(classItem)}</p>
            </div>
          ))
        )}
      </div>

      {/* Floating Add Button */}
      <button 
        className="btn btn-info rounded-circle position-fixed shadow-lg d-flex align-items-center justify-content-center"
        style={{ 
          bottom: '30px', 
          right: '30px', 
          width: '60px', 
          height: '60px',
          zIndex: 1000
        }}
        onClick={handleOpenModal}
      >
        <i className="fas fa-plus fs-3 text-white"></i>
      </button>

      {/* Add Class Modal */}
      {showAddModal && (
        <>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={handleCloseModal}
          />
          <div 
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg"
            style={{ 
              zIndex: 1051, 
              width: '90%', 
              maxWidth: '400px',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h4 className="text-center fw-bold mb-4">Add Class</h4>

              {/* Class Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Class</label>
                <select
                  className="form-select form-select-lg"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                >
                  <option value="">Class</option>
                  {classOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section Input */}
              <div className="mb-4">
                <label className="form-label fw-semibold">Section</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  placeholder="Enter section"
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                />
              </div>

              {/* Buttons */}
              <div className="d-flex gap-3">
                <button 
                  className="btn btn-secondary flex-fill py-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-info text-white flex-fill py-2"
                  onClick={handleAddClass}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewCreateClasses;

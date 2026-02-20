import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  addClass,
  getClasses,
  updateClass,
  deleteClass,
  addTerm,
  getTermsByClass,
  updateTerm,
  deleteTerm,
  addAssessmentType,
  getAssessmentTypesByClassAndTerm,
  updateAssessmentType,
  deleteAssessmentType,
  addSubject,
  getSubjectsByClass,
  updateSubject,
  deleteSubject
} from '../../services/resultMakerService';

const ClassSettings = () => {
  const navigate = useNavigate();
  
  // State for classes
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showClassModal, setShowClassModal] = useState(false);
  const [classFormData, setClassFormData] = useState({ className: '', section: '' });
  const [isEditingClass, setIsEditingClass] = useState(false);

  // Static class options
  const classOptions = [
    'PLAY', 'NUR', 'KG', 'LKG', 'UKG', 'PREP', 'PREP1', 'PREP2',
    'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'
  ];
  
  // State for terms
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [showTermModal, setShowTermModal] = useState(false);
  const [termFormData, setTermFormData] = useState({ termName: '' });
  const [isEditingTerm, setIsEditingTerm] = useState(false);
  
  // State for assessment types
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [filteredAssessmentTypes, setFilteredAssessmentTypes] = useState([]);
  const [selectedClassFilter, setSelectedClassFilter] = useState('all');
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [assessmentFormData, setAssessmentFormData] = useState({ assessmentName: '' });
  const [isEditingAssessment, setIsEditingAssessment] = useState(false);
  const [assessmentModalClass, setAssessmentModalClass] = useState(null);
  const [assessmentModalTerm, setAssessmentModalTerm] = useState(null);
  const [availableTermsForModal, setAvailableTermsForModal] = useState([]);
  
  // State for subjects
  const [subjects, setSubjects] = useState([]);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [subjectFormData, setSubjectFormData] = useState({ subjectName: '' });
  const [isEditingSubject, setIsEditingSubject] = useState(false);

  // Active tab state
  const [activeTab, setActiveTab] = useState('classes'); // classes, terms, examinations, subjects

  // Load classes on mount
  useEffect(() => {
    loadClasses();
  }, []);

  // Load data based on active tab
  useEffect(() => {
    if (activeTab === 'subjects') {
      loadAllSubjects();
    } else if (activeTab === 'terms') {
      loadAllTerms();
    } else if (activeTab === 'examinations') {
      loadAllAssessmentTypes();
      setSelectedClassFilter('all'); // Reset filter when switching to examinations tab
    }
  }, [activeTab]);

  // Filter assessment types when filter changes
  useEffect(() => {
    if (activeTab === 'examinations') {
      if (selectedClassFilter === 'all') {
        setFilteredAssessmentTypes(assessmentTypes);
      } else {
        const filtered = assessmentTypes.filter(
          assessment => assessment.classId?._id === selectedClassFilter
        );
        setFilteredAssessmentTypes(filtered);
      }
    }
  }, [selectedClassFilter, assessmentTypes, activeTab]);

  // ========== CLASS FUNCTIONS ==========
  const loadClasses = async () => {
    try {
      const response = await getClasses();
      if (response.success) {
        setClasses(response.data || []);
      }
    } catch (error) {
      console.error('Error loading classes:', error);
    }
  };

  const handleAddClass = () => {
    setClassFormData({ className: '', section: '' });
    setIsEditingClass(false);
    setShowClassModal(true);
  };

  const handleEditClass = (classItem) => {
    setClassFormData({ 
      className: classItem.className, 
      section: classItem.section || '',
      _id: classItem._id 
    });
    setIsEditingClass(true);
    setShowClassModal(true);
  };

  const handleSaveClass = async () => {
    if (!classFormData.className.trim()) {
      alert('Please select a class');
      return;
    }
    if (!classFormData.section.trim()) {
      alert('Please enter a section');
      return;
    }

    try {
      if (isEditingClass) {
        const response = await updateClass(classFormData._id, { 
          className: classFormData.className,
          section: classFormData.section
        });
        if (response.success) {
          alert('Class updated successfully');
          loadClasses();
          setShowClassModal(false);
        }
      } else {
        const response = await addClass({ 
          className: classFormData.className,
          section: classFormData.section
        });
        if (response.success) {
          alert('Class added successfully');
          loadClasses();
          setShowClassModal(false);
        }
      }
    } catch (error) {
      console.error('Error saving class:', error);
      alert(error.response?.data?.message || 'Error saving class');
    }
  };

  const handleDeleteClass = async (classId) => {
    if (window.confirm('Are you sure you want to delete this class? This will also delete all associated terms, examinations, and subjects.')) {
      try {
        const response = await deleteClass(classId);
        if (response.success) {
          alert('Class deleted successfully');
          loadClasses();
          if (selectedClass?._id === classId) {
            setSelectedClass(null);
          }
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        alert('Error deleting class');
      }
    }
  };

  // ========== TERM FUNCTIONS ==========
  const loadTerms = async () => {
    if (!selectedClass) return;
    try {
      const response = await getTermsByClass(selectedClass._id);
      if (response.success) {
        setTerms(response.data || []);
      }
    } catch (error) {
      console.error('Error loading terms:', error);
    }
  };

  const loadAllTerms = async () => {
    try {
      // Load terms for all classes
      const allTerms = [];
      for (const classItem of classes) {
        const response = await getTermsByClass(classItem._id);
        if (response.success && response.data) {
          // Add classId reference to each term for display
          const termsWithClass = response.data.map(term => ({
            ...term,
            classId: classItem
          }));
          allTerms.push(...termsWithClass);
        }
      }
      setTerms(allTerms);
    } catch (error) {
      console.error('Error loading all terms:', error);
    }
  };

  const handleAddTerm = () => {
    setTermFormData({ termName: '' });
    setIsEditingTerm(false);
    setShowTermModal(true);
  };

  const handleEditTerm = (term) => {
    setTermFormData({ termName: term.termName, _id: term._id });
    setSelectedClass(term.classId); // Set the class for the dropdown
    setIsEditingTerm(true);
    setShowTermModal(true);
  };

  const handleSaveTerm = async () => {
    if (!selectedClass) {
      alert('Please select a class');
      return;
    }
    if (!termFormData.termName.trim()) {
      alert('Please enter term name');
      return;
    }

    try {
      if (isEditingTerm) {
        const response = await updateTerm(termFormData._id, { termName: termFormData.termName });
        if (response.success) {
          alert('Term updated successfully');
          loadAllTerms();
          setShowTermModal(false);
        }
      } else {
        const response = await addTerm({
          classId: selectedClass._id,
          termName: termFormData.termName
        });
        if (response.success) {
          alert('Term added successfully');
          loadAllTerms();
          setShowTermModal(false);
        }
      }
    } catch (error) {
      console.error('Error saving term:', error);
      alert(error.response?.data?.message || 'Error saving term');
    }
  };

  const handleDeleteTerm = async (termId) => {
    if (window.confirm('Are you sure you want to delete this term? This will also delete all associated examinations.')) {
      try {
        const response = await deleteTerm(termId);
        if (response.success) {
          alert('Term deleted successfully');
          loadAllTerms();
          if (selectedTerm?._id === termId) {
            setSelectedTerm(null);
          }
        }
      } catch (error) {
        console.error('Error deleting term:', error);
        alert('Error deleting term');
      }
    }
  };

  // ========== ASSESSMENT TYPE FUNCTIONS ==========
  const loadAssessmentTypes = async () => {
    if (!selectedClass || !selectedTerm) return;
    try {
      const response = await getAssessmentTypesByClassAndTerm(selectedClass._id, selectedTerm._id);
      if (response.success) {
        setAssessmentTypes(response.data || []);
      }
    } catch (error) {
      console.error('Error loading assessment types:', error);
    }
  };

  const loadAllAssessmentTypes = async () => {
    try {
      // Load assessment types for all classes and terms
      const allAssessmentTypes = [];
      for (const classItem of classes) {
        const termsResponse = await getTermsByClass(classItem._id);
        if (termsResponse.success && termsResponse.data) {
          for (const term of termsResponse.data) {
            const response = await getAssessmentTypesByClassAndTerm(classItem._id, term._id);
            if (response.success && response.data) {
              // Add classId and termId reference to each assessment for display
              const assessmentsWithClassAndTerm = response.data.map(assessment => ({
                ...assessment,
                classId: classItem,
                termId: term
              }));
              allAssessmentTypes.push(...assessmentsWithClassAndTerm);
            }
          }
        }
      }
      setAssessmentTypes(allAssessmentTypes);
    } catch (error) {
      console.error('Error loading all assessment types:', error);
    }
  };

  const handleAddAssessment = () => {
    setAssessmentFormData({ assessmentName: '' });
    setAssessmentModalClass(null);
    setAssessmentModalTerm(null);
    setAvailableTermsForModal([]);
    setIsEditingAssessment(false);
    setShowAssessmentModal(true);
  };

  const handleEditAssessment = async (assessment) => {
    setAssessmentFormData({ assessmentName: assessment.assessmentName, _id: assessment._id });
    setAssessmentModalClass(assessment.classId);
    setAssessmentModalTerm(assessment.termId);
    
    // Load terms for the selected class
    if (assessment.classId) {
      const response = await getTermsByClass(assessment.classId._id);
      if (response.success) {
        setAvailableTermsForModal(response.data || []);
      }
    }
    
    setIsEditingAssessment(true);
    setShowAssessmentModal(true);
  };

  const handleSaveAssessment = async () => {
    if (!assessmentModalClass) {
      alert('Please select a class');
      return;
    }
    if (!assessmentModalTerm) {
      alert('Please select a term');
      return;
    }
    if (!assessmentFormData.assessmentName.trim()) {
      alert('Please enter name of the examination');
      return;
    }

    try {
      if (isEditingAssessment) {
        const response = await updateAssessmentType(assessmentFormData._id, {
          assessmentName: assessmentFormData.assessmentName
        });
        if (response.success) {
          alert('Name of the examination updated successfully');
          loadAllAssessmentTypes();
          setShowAssessmentModal(false);
        }
      } else {
        const response = await addAssessmentType({
          classId: assessmentModalClass._id,
          termId: assessmentModalTerm._id,
          assessmentName: assessmentFormData.assessmentName
        });
        if (response.success) {
          alert('Name of the examination added successfully');
          loadAllAssessmentTypes();
          setShowAssessmentModal(false);
        }
      }
    } catch (error) {
      console.error('Error saving name of the examination:', error);
      alert(error.response?.data?.message || 'Error saving name of the examination');
    }
  };

  const handleDeleteAssessment = async (assessmentId) => {
    if (window.confirm('Are you sure you want to delete this examination?')) {
      try {
        const response = await deleteAssessmentType(assessmentId);
        if (response.success) {
          alert('Examination deleted successfully');
          loadAllAssessmentTypes();
        }
      } catch (error) {
        console.error('Error deleting examination:', error);
        alert('Error deleting examination');
      }
    }
  };

  // ========== SUBJECT FUNCTIONS ==========
  const loadSubjects = async () => {
    if (!selectedClass) return;
    try {
      const response = await getSubjectsByClass(selectedClass._id);
      if (response.success) {
        setSubjects(response.data || []);
      }
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const loadAllSubjects = async () => {
    try {
      // Load subjects for all classes
      const allSubjects = [];
      for (const classItem of classes) {
        const response = await getSubjectsByClass(classItem._id);
        if (response.success && response.data) {
          // Add classId reference to each subject for display
          const subjectsWithClass = response.data.map(subject => ({
            ...subject,
            classId: classItem
          }));
          allSubjects.push(...subjectsWithClass);
        }
      }
      setSubjects(allSubjects);
    } catch (error) {
      console.error('Error loading all subjects:', error);
    }
  };

  const handleAddSubject = () => {
    setSubjectFormData({ subjectName: '' });
    setIsEditingSubject(false);
    setShowSubjectModal(true);
  };

  const handleEditSubject = (subject) => {
    setSubjectFormData({ subjectName: subject.subjectName, _id: subject._id });
    setSelectedClass(subject.classId); // Set the class for the dropdown
    setIsEditingSubject(true);
    setShowSubjectModal(true);
  };

  const handleSaveSubject = async () => {
    if (!selectedClass) {
      alert('Please select a class');
      return;
    }
    if (!subjectFormData.subjectName.trim()) {
      alert('Please enter subject name');
      return;
    }

    try {
      if (isEditingSubject) {
        const response = await updateSubject(subjectFormData._id, {
          subjectName: subjectFormData.subjectName
        });
        if (response.success) {
          alert('Subject updated successfully');
          loadAllSubjects();
          setShowSubjectModal(false);
        }
      } else {
        const response = await addSubject({
          classId: selectedClass._id,
          subjectName: subjectFormData.subjectName
        });
        if (response.success) {
          alert('Subject added successfully');
          loadAllSubjects();
          setShowSubjectModal(false);
        }
      }
    } catch (error) {
      console.error('Error saving subject:', error);
      alert(error.response?.data?.message || 'Error saving subject');
    }
  };

  const handleDeleteSubject = async (subjectId) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        const response = await deleteSubject(subjectId);
        if (response.success) {
          alert('Subject deleted successfully');
          loadAllSubjects();
        }
      } catch (error) {
        console.error('Error deleting subject:', error);
        alert('Error deleting subject');
      }
    }
  };

  // Render list based on active tab
  const renderList = () => {
    if (activeTab === 'classes') {
      if (classes.length === 0) {
        return (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-school fa-3x mb-3"></i>
            <p>No classes added yet. Click the + button to add a class.</p>
          </div>
        );
      }
      return classes.map((classItem) => (
        <div 
          key={classItem._id}
          className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center"
        >
          <span className="text-dark">{classItem.className} - {classItem.section}</span>
          <div>
            <button 
              className="btn btn-sm btn-link text-primary me-2"
              onClick={() => handleEditClass(classItem)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className="btn btn-sm btn-link text-danger"
              onClick={() => handleDeleteClass(classItem._id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ));
    }

    if (activeTab === 'subjects') {
      if (subjects.length === 0) {
        return (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-book fa-3x mb-3"></i>
            <p>No subjects added yet. Click the + button to add subjects.</p>
          </div>
        );
      }
      return subjects.map((subject) => (
        <div 
          key={subject._id}
          className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center"
        >
          <div>
            <span className="text-dark fw-semibold">{subject.subjectName}</span>
            <br />
            <small className="text-muted">Class: {subject.classId?.className} - {subject.classId?.section}</small>
          </div>
          <div>
            <button 
              className="btn btn-sm btn-link text-primary me-2"
              onClick={() => handleEditSubject(subject)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className="btn btn-sm btn-link text-danger"
              onClick={() => handleDeleteSubject(subject._id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ));
    }

    if (activeTab === 'terms') {
      if (terms.length === 0) {
        return (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-calendar-alt fa-3x mb-3"></i>
            <p>No terms added yet. Click the + button to add terms.</p>
          </div>
        );
      }
      return terms.map((term) => (
        <div 
          key={term._id}
          className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center"
        >
          <div>
            <span className="text-dark fw-semibold">{term.termName}</span>
            <br />
            <small className="text-muted">Class: {term.classId?.className} - {term.classId?.section}</small>
          </div>
          <div>
            <button 
              className="btn btn-sm btn-link text-primary me-2"
              onClick={() => handleEditTerm(term)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className="btn btn-sm btn-link text-danger"
              onClick={() => handleDeleteTerm(term._id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ));
    }

    if (activeTab === 'examinations') {
      const displayTypes = filteredAssessmentTypes.length > 0 ? filteredAssessmentTypes : assessmentTypes;
      
      if (displayTypes.length === 0) {
        return (
          <div className="text-center py-5 text-muted">
            <i className="fas fa-clipboard-check fa-3x mb-3"></i>
            <p>
              {selectedClassFilter === 'all' 
                ? 'No examinations added yet. Click the + button to add examinations.'
                : 'No examinations found for the selected class.'}
            </p>
          </div>
        );
      }
      return displayTypes.map((assessment) => (
        <div 
          key={assessment._id}
          className="bg-white border-bottom py-3 px-4 d-flex justify-content-between align-items-center"
        >
          <div>
            <span className="text-dark fw-semibold">{assessment.assessmentName}</span>
            <br />
            <small className="text-muted">
              Class: {assessment.classId?.className} - {assessment.classId?.section} | Term: {assessment.termId?.termName}
            </small>
          </div>
          <div>
            <button 
              className="btn btn-sm btn-link text-primary me-2"
              onClick={() => handleEditAssessment(assessment)}
            >
              <i className="fas fa-edit"></i>
            </button>
            <button 
              className="btn btn-sm btn-link text-danger"
              onClick={() => handleDeleteAssessment(assessment._id)}
            >
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      ));
    }
  };

  const getTitle = () => {
    if (activeTab === 'classes') return 'Classes';
    if (activeTab === 'subjects') return 'Subjects';
    if (activeTab === 'terms') return 'Terms';
    if (activeTab === 'examinations') return 'Name of the Examination';
  };

  const handleAddClick = () => {
    if (activeTab === 'classes') handleAddClass();
    else if (activeTab === 'subjects') handleAddSubject();
    else if (activeTab === 'terms') handleAddTerm();
    else if (activeTab === 'examinations') handleAddAssessment();
  };

  const handleBackClick = () => {
    if (activeTab === 'classes') {
      navigate('/resultsheetmaker');
    } else {
      // Go back to classes tab
      setActiveTab('classes');
      setSelectedClass(null);
      setSelectedTerm(null);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex align-items-center">
        <button className="btn btn-link text-white p-0 me-3" onClick={handleBackClick}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Class Settings</h5>
      </div>

      {/* Class Selector Dropdown - Only show on Assessments tab */}
      {/* Removed - now in modal */}

      {/* Term Selector Dropdown - Only show on Assessments tab */}
      {/* Removed - now in modal */}

      {/* Tab Navigation */}
      <div className="bg-white border-bottom">
        <div className="d-flex">
          <button
            className={`flex-fill py-3 border-0 ${activeTab === 'classes' ? 'bg-info text-white' : 'bg-white text-dark'}`}
            onClick={() => setActiveTab('classes')}
          >
            Classes
          </button>
          <button
            className={`flex-fill py-3 border-0 ${activeTab === 'subjects' ? 'bg-primary text-white' : 'bg-white text-dark'}`}
            onClick={() => setActiveTab('subjects')}
          >
            Subjects
          </button>
          <button
            className={`flex-fill py-3 border-0 ${activeTab === 'terms' ? 'bg-success text-white' : 'bg-white text-dark'}`}
            onClick={() => setActiveTab('terms')}
          >
            Terms
          </button>
          <button
            className={`flex-fill py-3 border-0 ${activeTab === 'examinations' ? 'bg-warning text-dark' : 'bg-white text-dark'}`}
            onClick={() => setActiveTab('examinations')}
          >
            Name of the Examination
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white py-4 px-3 text-center border-bottom">
        <h4 className="mb-0 fw-bold">{getTitle()}</h4>
      </div>

      {/* Class Filter for Examinations Tab */}
      {activeTab === 'examinations' && (
        <div className="bg-light py-3 px-3 border-bottom">
          <div className="container-fluid" style={{ maxWidth: '600px' }}>
            <label className="form-label fw-semibold text-secondary mb-2">
              <i className="fas fa-filter me-2"></i>
              Filter by Class
            </label>
            <select
              className="form-select"
              value={selectedClassFilter}
              onChange={(e) => setSelectedClassFilter(e.target.value)}
              style={{ borderColor: '#6c757d', borderWidth: '2px' }}
            >
              <option value="all">All Classes</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {classItem.className} - {classItem.section}
                </option>
              ))}
            </select>
            {selectedClassFilter !== 'all' && (
              <small className="text-muted d-block mt-2">
                <i className="fas fa-info-circle me-1"></i>
                Showing examinations for {classes.find(c => c._id === selectedClassFilter)?.className} - {classes.find(c => c._id === selectedClassFilter)?.section}
              </small>
            )}
          </div>
        </div>
      )}

      {/* List */}
      <div className="container-fluid p-0">
        {renderList()}
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
        onClick={handleAddClick}
      >
        <i className="fas fa-plus fs-3 text-white"></i>
      </button>

      {/* Class Modal */}
      {showClassModal && (
        <>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => setShowClassModal(false)}
          />
          <div 
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg"
            style={{ zIndex: 1051, width: '90%', maxWidth: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h4 className="text-center fw-bold mb-4">{isEditingClass ? 'Edit Class' : 'Add Class'}</h4>
              
              {/* Class Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Class</label>
                <select
                  className="form-select form-select-lg"
                  value={classFormData.className}
                  onChange={(e) => setClassFormData({ ...classFormData, className: e.target.value })}
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
                  value={classFormData.section}
                  onChange={(e) => setClassFormData({ ...classFormData, section: e.target.value })}
                  placeholder="Enter section"
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>

              <div className="d-flex gap-3">
                <button className="btn btn-secondary flex-fill py-2" onClick={() => setShowClassModal(false)}>Cancel</button>
                <button className="btn btn-info text-white flex-fill py-2" onClick={handleSaveClass}>
                  {isEditingClass ? 'Update' : 'Add'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Term Modal */}
      {showTermModal && (
        <>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => setShowTermModal(false)}
          />
          <div 
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg"
            style={{ zIndex: 1051, width: '90%', maxWidth: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h4 className="text-center fw-bold mb-4">{isEditingTerm ? 'Edit Term' : 'Add Term'}</h4>
              
              {/* Class Selector Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Class</label>
                <select
                  className="form-select form-select-lg"
                  value={selectedClass?._id || ''}
                  onChange={(e) => {
                    const classItem = classes.find(c => c._id === e.target.value);
                    setSelectedClass(classItem);
                  }}
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <option value="">Select a class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.className} - {classItem.section}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Term Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={termFormData.termName}
                  onChange={(e) => setTermFormData({ ...termFormData, termName: e.target.value })}
                  placeholder="e.g., Term 1, Semester 1"
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-secondary flex-fill py-2" onClick={() => setShowTermModal(false)}>Cancel</button>
                <button className="btn btn-success text-white flex-fill py-2" onClick={handleSaveTerm}>Save</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Assessment Modal */}
      {showAssessmentModal && (
        <>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => setShowAssessmentModal(false)}
          />
          <div 
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg"
            style={{ zIndex: 1051, width: '90%', maxWidth: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h4 className="text-center fw-bold mb-4">{isEditingAssessment ? 'Edit Name of the Examination' : 'Add Name of the Examination'}</h4>
              
              {/* Class Selector Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Class</label>
                <select
                  className="form-select form-select-lg"
                  value={assessmentModalClass?._id || ''}
                  onChange={async (e) => {
                    const classItem = classes.find(c => c._id === e.target.value);
                    setAssessmentModalClass(classItem);
                    setAssessmentModalTerm(null);
                    
                    // Load terms for selected class
                    if (classItem) {
                      const response = await getTermsByClass(classItem._id);
                      if (response.success) {
                        setAvailableTermsForModal(response.data || []);
                      }
                    } else {
                      setAvailableTermsForModal([]);
                    }
                  }}
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <option value="">Select a class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.className} - {classItem.section}
                    </option>
                  ))}
                </select>
              </div>

              {/* Term Selector Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Term</label>
                <select
                  className="form-select form-select-lg"
                  value={assessmentModalTerm?._id || ''}
                  onChange={(e) => {
                    const term = availableTermsForModal.find(t => t._id === e.target.value);
                    setAssessmentModalTerm(term);
                  }}
                  style={{ borderColor: '#28a745', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                  disabled={!assessmentModalClass}
                >
                  <option value="">Select a term</option>
                  {availableTermsForModal.map((term) => (
                    <option key={term._id} value={term._id}>
                      {term.termName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Name of the Examination</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={assessmentFormData.assessmentName}
                  onChange={(e) => setAssessmentFormData({ ...assessmentFormData, assessmentName: e.target.value })}
                  placeholder="e.g., Unit Test, Mid Term, Final Exam"
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-secondary flex-fill py-2" onClick={() => setShowAssessmentModal(false)}>Cancel</button>
                <button className="btn btn-warning text-dark flex-fill py-2" onClick={handleSaveAssessment}>Save</button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Subject Modal */}
      {showSubjectModal && (
        <>
          <div 
            className="position-fixed top-0 start-0 w-100 h-100"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1050 }}
            onClick={() => setShowSubjectModal(false)}
          />
          <div 
            className="position-fixed top-50 start-50 translate-middle bg-white rounded shadow-lg"
            style={{ zIndex: 1051, width: '90%', maxWidth: '400px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <h4 className="text-center fw-bold mb-4">{isEditingSubject ? 'Edit Subject' : 'Add Subject'}</h4>
              
              {/* Class Selector Dropdown */}
              <div className="mb-3">
                <label className="form-label fw-semibold">Class</label>
                <select
                  className="form-select form-select-lg"
                  value={selectedClass?._id || ''}
                  onChange={(e) => {
                    const classItem = classes.find(c => c._id === e.target.value);
                    setSelectedClass(classItem);
                  }}
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <option value="">Select a class</option>
                  {classes.map((classItem) => (
                    <option key={classItem._id} value={classItem._id}>
                      {classItem.className} - {classItem.section}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Subject Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={subjectFormData.subjectName}
                  onChange={(e) => setSubjectFormData({ ...subjectFormData, subjectName: e.target.value })}
                  placeholder="e.g., Mathematics, Science"
                  style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-secondary flex-fill py-2" onClick={() => setShowSubjectModal(false)}>Cancel</button>
                <button className="btn btn-primary text-white flex-fill py-2" onClick={handleSaveSubject}>Save</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ClassSettings;

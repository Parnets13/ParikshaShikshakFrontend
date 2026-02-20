import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllClasses,
  getAllTerms,
  getExamSettings,
  addTerm,
  addSubject
} from '../../services/resultMakerService';

const MarksEntry = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [terms, setTerms] = useState([]);
  const [examSettings, setExamSettings] = useState(null);
  const [availableExams, setAvailableExams] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  const [selectedExams, setSelectedExams] = useState([]); // Changed to array for multiple selection
  const [selectedSubject, setSelectedSubject] = useState('');
  const [subjectMaxMarks, setSubjectMaxMarks] = useState('');
  
  const [loading, setLoading] = useState(false);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'term', 'subject'
  const [newItemName, setNewItemName] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchTerms(selectedClassId);
      fetchExamSettings(selectedClassId);
    }
  }, [selectedClassId]);

  useEffect(() => {
    if (selectedTermId && examSettings) {
      loadExamsForTerm();
      loadSubjectsFromSettings();
    }
  }, [selectedTermId, examSettings, terms]);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getAllClasses();
      if (response.success) {
        setClasses(response.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTerms = async (classId) => {
    try {
      console.log('Fetching terms for classId:', classId);
      const response = await getAllTerms(classId);
      console.log('Terms response:', response);
      if (response.success) {
        setTerms(response.data);
        console.log('Terms set:', response.data);
        
        // If no terms exist but exam settings have term names, suggest creating them
        if (response.data.length === 0 && examSettings) {
          console.log('No terms found, but exam settings exist');
        }
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      setTerms([]);
    }
  };

  const fetchExamSettings = async (classId) => {
    try {
      console.log('Fetching exam settings for classId:', classId);
      const response = await getExamSettings(classId);
      console.log('Exam settings response:', response);
      if (response.success && response.data) {
        setExamSettings(response.data);
        console.log('Exam settings set:', response.data);
      } else {
        setExamSettings(null);
        console.log('No exam settings found');
      }
    } catch (error) {
      console.error('Error fetching exam settings:', error);
      setExamSettings(null);
    }
  };

  const loadExamsForTerm = () => {
    if (!examSettings) {
      console.log('No exam settings available');
      return;
    }

    const termObj = terms.find(t => t._id === selectedTermId);
    if (!termObj) {
      console.log('Term not found');
      return;
    }

    console.log('Loading exams for term:', termObj);
    console.log('Exam settings:', examSettings);
    console.log('Top-level assessment types:', {
      maAssessment: examSettings.maAssessment,
      notebookSubmission: examSettings.notebookSubmission,
      subjectEnrichment: examSettings.subjectEnrichment,
      paWeightage: examSettings.paWeightage
    });

    let exams = [];

    // Check if this is Term 1 or Term 2 based on position
    const termIndex = terms.findIndex(t => t._id === selectedTermId);
    console.log('Term index:', termIndex);

    // Get the term settings
    const termSettings = termIndex === 0 ? examSettings.term1 : examSettings.term2;
    
    if (!termSettings) {
      console.log('No term settings found');
      return;
    }

    console.log('Term settings:', termSettings);

    // Add enabled TOP-LEVEL assessment types (from class-level settings)
    if (examSettings.maAssessment && examSettings.maAssessment.enabled === true) {
      console.log('Adding MA Assessment');
      exams.push({ 
        name: 'MA / Multiple Assessment', 
        type: 'ma', 
        maxMarks: examSettings.maAssessment.marks 
      });
    }

    if (examSettings.notebookSubmission && examSettings.notebookSubmission.enabled === true) {
      console.log('Adding Notebook Submission');
      exams.push({ 
        name: 'Notebook Submission', 
        type: 'notebook', 
        maxMarks: examSettings.notebookSubmission.marks 
      });
    }

    if (examSettings.subjectEnrichment && examSettings.subjectEnrichment.enabled === true) {
      console.log('Adding Subject Enrichment');
      exams.push({ 
        name: 'Subject Enrichment / Project', 
        type: 'subjectEnrichment', 
        maxMarks: examSettings.subjectEnrichment.marks 
      });
    }

    // Add PA Weightage assessments if enabled at class level
    if (examSettings.paWeightage && examSettings.paWeightage.enabled === true) {
      const numberOfPAs = termSettings.numberOfPAs || 1;
      console.log('PA Weightage enabled, numberOfPAs:', numberOfPAs);
      
      if (termIndex === 0) {
        // Term 1
        if (numberOfPAs >= 1 && termSettings.fa1MaxMarks) {
          exams.push({ name: 'PA - 1', type: 'pa1', maxMarks: termSettings.fa1MaxMarks });
        }
        if (numberOfPAs >= 2 && termSettings.fa2MaxMarks) {
          exams.push({ name: 'PA - 2', type: 'pa2', maxMarks: termSettings.fa2MaxMarks });
        }
        if (numberOfPAs >= 3 && termSettings.sa1MaxMarks) {
          exams.push({ name: 'PA - 3', type: 'pa3', maxMarks: termSettings.sa1MaxMarks });
        }
      } else if (termIndex === 1) {
        // Term 2
        if (numberOfPAs >= 1 && termSettings.fa3MaxMarks) {
          exams.push({ name: 'PA - 1', type: 'pa1', maxMarks: termSettings.fa3MaxMarks });
        }
        if (numberOfPAs >= 2 && termSettings.fa4MaxMarks) {
          exams.push({ name: 'PA - 2', type: 'pa2', maxMarks: termSettings.fa4MaxMarks });
        }
        if (numberOfPAs >= 3 && termSettings.sa2MaxMarks) {
          exams.push({ name: 'PA - 3', type: 'pa3', maxMarks: termSettings.sa2MaxMarks });
        }
      }
    }

    // Add Term End Exam as a static option for all terms (without max marks)
    exams.push({ 
      name: 'Term End Exam', 
      type: 'termEndExam', 
      maxMarks: null // No max marks specified
    });

    console.log('Available exams for this term:', exams);
    setAvailableExams(exams);
  };

  const loadSubjectsFromSettings = () => {
    if (!examSettings) {
      console.log('No exam settings for subjects');
      return;
    }

    console.log('Loading subjects from settings:', examSettings);

    let allSubjects = [];

    // Load main subjects
    if (examSettings.mainSubjects && examSettings.mainSubjects.subjects) {
      console.log('Main subjects:', examSettings.mainSubjects.subjects);
      examSettings.mainSubjects.subjects.forEach(subject => {
        if (subject) {
          allSubjects.push({ name: subject, maxMarks: null, type: 'main' });
        }
      });
    }

    // Load additional subjects with max marks
    if (examSettings.additionalSubjects && examSettings.additionalSubjects.subjects) {
      console.log('Additional subjects:', examSettings.additionalSubjects.subjects);
      examSettings.additionalSubjects.subjects.forEach(subject => {
        if (subject && subject.name) {
          allSubjects.push({ 
            name: subject.name, 
            maxMarks: subject.maxMarks || null,
            type: 'additional'
          });
        }
      });
    }

    console.log('All subjects loaded:', allSubjects);
    setAvailableSubjects(allSubjects);
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    setSelectedClassId(classId);
    
    const classObj = classes.find(c => c._id === classId);
    if (classObj) {
      const displayName = classObj.className && classObj.section 
        ? `${classObj.className} - ${classObj.section}` 
        : classObj.className;
      setSelectedClass(displayName);
    }
    
    // Reset dependent dropdowns
    setSelectedTerm('');
    setSelectedTermId('');
    setSelectedExams([]);
    setSelectedSubject('');
    setSubjectMaxMarks('');
    setAvailableExams([]);
    setAvailableSubjects([]);
  };

  const handleTermChange = (e) => {
    const termId = e.target.value;
    setSelectedTermId(termId);
    const termObj = terms.find(t => t._id === termId);
    if (termObj) {
      setSelectedTerm(termObj.termName);
    }
    
    // Reset dependent selections
    setSelectedExams([]);
    setSelectedSubject('');
    setSubjectMaxMarks('');
  };

  const handleExamChange = (e) => {
    const examType = e.target.value;
    // Single selection - replace the array with just this exam type
    setSelectedExams([examType]);
  };

  const handleSubjectChange = (e) => {
    const subjectName = e.target.value;
    setSelectedSubject(subjectName);
    const subjectObj = availableSubjects.find(s => s.name === subjectName);
    
    // For additional subjects, use the max marks defined in exam settings
    if (subjectObj && subjectObj.type === 'additional' && subjectObj.maxMarks) {
      setSubjectMaxMarks(subjectObj.maxMarks);
    } else {
      // For main subjects, use the selected assessment type's max marks
      if (selectedExams && selectedExams.length > 0) {
        const examObj = availableExams.find(ex => ex.type === selectedExams[0]);
        if (examObj) {
          setSubjectMaxMarks(examObj.maxMarks);
        }
      }
    }
  };

  const handleMarksEntry = () => {
    if (!selectedClassId || !selectedTermId || selectedExams.length === 0 || !selectedSubject) {
      alert('Please select all fields');
      return;
    }

    // Get details of selected exams
    const selectedExamDetails = availableExams.filter(exam => selectedExams.includes(exam.type));

    const navigationState = {
      selectedClass,
      selectedClassId,
      selectedTerm,
      selectedTermId,
      selectedExams: selectedExamDetails, // Pass array of selected exams
      selectedSubject,
      subjectMaxMarks
    };

    // Navigate to marks entry form with selected data
    navigate('/resultsheetmaker/marks-entry-form', {
      state: navigationState
    });
  };

  const openAddModal = (type) => {
    if (!selectedClassId) {
      alert('Please select a class first');
      return;
    }
    setModalType(type);
    setNewItemName('');
    setShowAddModal(true);
  };

  const handleAddItem = async () => {
    if (!newItemName.trim()) {
      alert('Please enter a name');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (modalType === 'term') {
        response = await addTerm({ termName: newItemName, classId: selectedClassId });
        if (response.success) {
          await fetchTerms(selectedClassId);
          alert('Term added successfully');
        }
      } else if (modalType === 'subject') {
        response = await addSubject({ subjectName: newItemName, classId: selectedClassId });
        if (response.success) {
          await fetchExamSettings(selectedClassId);
          alert('Subject added successfully');
        }
      }
      setShowAddModal(false);
      setNewItemName('');
    } catch (error) {
      console.error('Error adding item:', error);
      alert(error.response?.data?.message || 'Error adding item');
    } finally {
      setLoading(false);
    }
  };

  const handleAutoCreateTerms = async () => {
    if (!examSettings) return;
    
    const confirm = window.confirm('This will create terms based on your exam settings (Term 1 and Term 2). Continue?');
    if (!confirm) return;

    setLoading(true);
    try {
      // Create Term 1
      if (examSettings.term1 && examSettings.term1.termName) {
        await addTerm({ termName: examSettings.term1.termName, classId: selectedClassId });
      }
      
      // Create Term 2
      if (examSettings.term2 && examSettings.term2.termName) {
        await addTerm({ termName: examSettings.term2.termName, classId: selectedClassId });
      }
      
      // Refresh terms
      await fetchTerms(selectedClassId);
      alert('Terms created successfully!');
    } catch (error) {
      console.error('Error creating terms:', error);
      alert('Error creating terms. Some terms may already exist.');
      // Refresh anyway to show any terms that were created
      await fetchTerms(selectedClassId);
    } finally {
      setLoading(false);
    }
  };

  const getModalTitle = () => {
    if (modalType === 'term') return 'Add Term';
    if (modalType === 'subject') return 'Add Subject';
    return '';
  };

  const getPlaceholder = () => {
    if (modalType === 'term') return 'Enter term name (e.g., Term 1, Mid Term)';
    if (modalType === 'subject') return 'Enter subject name (e.g., Mathematics, Science)';
    return '';
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.className || classItem;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '150px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Session : 2025-2026</h5>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-question-circle fs-4"></i>
        </button>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h4 className="mb-0 fw-bold">Marks Entry</h4>
      </div>

      {/* Form Container */}
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        {/* Class Dropdown */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Mark Entry for Class</label>
          <select
            className="form-select form-select-lg"
            value={selectedClassId}
            onChange={handleClassChange}
            style={{ borderColor: '#6c757d', borderWidth: '2px' }}
            disabled={loading}
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {getClassDisplayName(classItem)}
              </option>
            ))}
          </select>
        </div>

        {/* Term Dropdown */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Select Term</label>
          <select
            className="form-select form-select-lg"
            value={selectedTermId}
            onChange={handleTermChange}
            style={{ borderColor: '#6c757d', borderWidth: '2px' }}
            disabled={!selectedClassId}
          >
            <option value="">Select Term</option>
            {terms.map((term) => (
              <option key={term._id} value={term._id}>
                {term.termName}
              </option>
            ))}
          </select>
          {selectedClassId && terms.length === 0 && (
            <div className="alert alert-warning mt-2 py-2" role="alert">
              <small>
                <i className="fas fa-exclamation-triangle me-2"></i>
                No terms found for this class.
                {examSettings && examSettings.term1 && examSettings.term2 ? (
                  <>
                    {' '}
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={handleAutoCreateTerms}
                      disabled={loading}
                    >
                      <i className="fas fa-magic me-1"></i>
                      Auto-create from Exam Settings
                    </button>
                    or{' '}
                  </>
                ) : null}
                <button
                  className="btn btn-link p-0 text-primary fw-bold"
                  onClick={() => openAddModal('term')}
                  style={{ textDecoration: 'underline', fontSize: 'inherit', verticalAlign: 'baseline' }}
                >
                  add manually
                </button>
              </small>
            </div>
          )}
        </div>

        {/* Assessment Type Dropdown (Single Selection) */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-secondary">Select Assessment Types</label>
          <select
            className="form-select form-select-lg"
            value={selectedExams.length > 0 ? selectedExams[0] : ''}
            onChange={handleExamChange}
            style={{ borderColor: '#6c757d', borderWidth: '2px' }}
            disabled={!selectedTermId}
          >
            <option value="">Select Assessment Type</option>
            {availableExams.length === 0 ? (
              <option value="" disabled>
                No assessments configured for this term
              </option>
            ) : (
              availableExams.map((exam) => (
                <option key={exam.type} value={exam.type}>
                  {exam.name} (Max Marks: {exam.maxMarks})
                </option>
              ))
            )}
          </select>
          {!selectedTermId && (
            <small className="text-muted">
              Please select a term first.
            </small>
          )}
          {selectedTermId && availableExams.length === 0 && (
            <small className="text-muted">
              No assessments configured for this term.{' '}
              <button
                className="btn btn-link p-0 text-info"
                onClick={() => navigate('/resultsheetmaker/exam-settings')}
                style={{ textDecoration: 'underline', fontSize: 'inherit' }}
              >
                Configure exam settings here
              </button>
            </small>
          )}
        </div>

        {/* Subject Dropdown */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-info">Select Subject for Marks Entry</label>
          <select
            className="form-select form-select-lg"
            value={selectedSubject}
            onChange={handleSubjectChange}
            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
            disabled={!selectedTermId || selectedExams.length === 0}
          >
            <option value="">Select Subject</option>
            {availableSubjects.map((subject, index) => (
              <option key={index} value={subject.name}>
                {subject.name}
                {subject.type === 'additional' && subject.maxMarks ? ` (Max Marks: ${subject.maxMarks})` : ''}
              </option>
            ))}
          </select>
          {selectedTermId && selectedExams.length === 0 && (
            <small className="text-muted">
              Please select one assessment type above.
            </small>
          )}
          {selectedTermId && selectedExams.length > 0 && availableSubjects.length === 0 && (
            <small className="text-muted">
              No subjects configured for this class.{' '}
              <button
                className="btn btn-link p-0 text-info"
                onClick={() => navigate('/resultsheetmaker/exam-settings')}
                style={{ textDecoration: 'underline', fontSize: 'inherit' }}
              >
                Add subjects in exam settings
              </button>
            </small>
          )}
          {selectedSubject && subjectMaxMarks && (
            <div className="mt-2">
              <span className="badge bg-info text-white" style={{ fontSize: '14px', padding: '8px 12px' }}>
                Out of Marks: {subjectMaxMarks}
              </span>
            </div>
          )}
        </div>

        {/* Marks Entry Button */}
        <button
          className="btn btn-info text-white w-100 py-3 fw-bold"
          onClick={handleMarksEntry}
          disabled={!selectedClass || !selectedTerm || selectedExams.length === 0 || !selectedSubject}
        >
          MARKS ENTRY
        </button>
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
                  <label className="form-label">Class</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedClass}
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
                  onClick={() => setShowAddModal(false)}
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

export default MarksEntry;

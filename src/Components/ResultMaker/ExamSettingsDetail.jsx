import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  getTermsByClass,
  getAssessmentTypesByClassAndTerm,
  getSubjectsByClass,
  getExamSettings, 
  saveExamSettings 
} from '../../services/resultMakerService';

const ExamSettingsDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClass } = location.state || {};

  // Fetched data from Class Settings
  const [terms, setTerms] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assessmentTypesByTerm, setAssessmentTypesByTerm] = useState({});
  
  // Max marks settings - Structure: termSettings[termId][examinationId][subjectId] = maxMarks
  const [termSettings, setTermSettings] = useState({});
  const [subjectMaxMarks, setSubjectMaxMarks] = useState({});

  useEffect(() => {
    if (!selectedClass) {
      navigate('/resultsheetmaker/exam-settings');
    } else {
      fetchTerms();
      fetchSubjects();
      fetchExamSettings();
    }
  }, [selectedClass, navigate]);

  const fetchTerms = async () => {
    try {
      const response = await getTermsByClass(selectedClass._id);
      if (response.success && response.data) {
        setTerms(response.data);
        // Fetch assessment types for each term
        response.data.forEach(term => {
          fetchAssessmentTypes(term._id);
        });
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
    }
  };

  const fetchAssessmentTypes = async (termId) => {
    try {
      const response = await getAssessmentTypesByClassAndTerm(selectedClass._id, termId);
      if (response.success && response.data) {
        setAssessmentTypesByTerm(prev => ({
          ...prev,
          [termId]: response.data
        }));
      }
    } catch (error) {
      console.error('Error fetching assessment types:', error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await getSubjectsByClass(selectedClass._id);
      if (response.success && response.data) {
        setSubjects(response.data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  const fetchExamSettings = async () => {
    try {
      const response = await getExamSettings(selectedClass._id);
      if (response.success && response.data) {
        setTermSettings(response.data.termSettings || {});
        setSubjectMaxMarks(response.data.subjectMaxMarks || {});
      }
    } catch (error) {
      console.error('Error fetching exam settings:', error);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/exam-settings');
  };

  const getClassDisplayName = () => {
    if (!selectedClass) return '';
    if (selectedClass.className && selectedClass.section) {
      return `${selectedClass.className} - ${selectedClass.section}`;
    }
    return selectedClass.name || selectedClass.className || selectedClass;
  };

  // Handle max marks for each examination for each subject
  const handleExaminationSubjectMaxMarks = (termId, examinationId, subjectId, value) => {
    setTermSettings(prev => ({
      ...prev,
      [termId]: {
        ...prev[termId],
        [examinationId]: {
          ...(prev[termId]?.[examinationId] || {}),
          [subjectId]: value
        }
      }
    }));
  };

  const handleNext = async () => {
    try {
      // Save term settings first
      const settingsData = {
        classId: selectedClass._id,
        termSettings
      };

      const response = await saveExamSettings(settingsData);
      
      if (response.success) {
        // Navigate directly to weightage settings (Step 2)
        navigate('/resultsheetmaker/exam-settings-weightage', {
          state: {
            selectedClass,
            termSettings
          }
        });
      }
    } catch (error) {
      console.error('Error saving exam settings:', error);
      alert('Error saving settings. Please try again.');
    }
  };

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
        <h5 className="mb-0 fw-semibold text-secondary">Settings of {getClassDisplayName()}</h5>
        <small className="text-muted">Step 1: Enter maximum marks for each examination for each subject</small>
      </div>

      {/* Settings Content */}
      <div className="container py-4" style={{ maxWidth: '900px' }}>
        {/* Info Alert */}
        {(terms.length === 0 || subjects.length === 0) && (
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Please add Terms, Name of the Examination, and Subjects in <a href="/resultsheetmaker/class-settings" className="alert-link">Class Settings</a> first.
          </div>
        )}

        {/* Terms and Examinations */}
        {terms.map((term, termIndex) => (
          <div key={term._id} className="mb-4">
            <h5 className="bg-info text-white py-2 px-3 rounded mb-3">
              <i className="fas fa-calendar-alt me-2"></i>
              {term.termName}
            </h5>

            {/* Examinations for this term */}
            {assessmentTypesByTerm[term._id] && assessmentTypesByTerm[term._id].length > 0 ? (
              <div className="mb-3">
                {assessmentTypesByTerm[term._id].map((examination) => (
                  <div key={examination._id} className="bg-white border rounded p-3 mb-3">
                    <h6 className="text-info fw-bold mb-3">
                      <i className="fas fa-file-alt me-2"></i>
                      {examination.assessmentName} - Enter Max Marks
                    </h6>
                    
                    {/* Subjects for this examination */}
                    {subjects.length > 0 ? (
                      <div className="row g-3">
                        {subjects.map((subject) => (
                          <div key={subject._id} className="col-md-6">
                            <label className="form-label fw-semibold text-secondary small">
                              {subject.subjectName}
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="Enter max marks"
                              value={termSettings[term._id]?.[examination._id]?.[subject._id] || ''}
                              onChange={(e) => handleExaminationSubjectMaxMarks(term._id, examination._id, subject._id, e.target.value)}
                              min="0"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="alert alert-info mb-0">
                        <i className="fas fa-info-circle me-2"></i>
                        No subjects found. Add them in <a href="/resultsheetmaker/class-settings" className="alert-link">Class Settings → Subjects</a>.
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="alert alert-info">
                <i className="fas fa-info-circle me-2"></i>
                No examinations found for this term. Add them in <a href="/resultsheetmaker/class-settings" className="alert-link">Class Settings → Name of the Examination</a>.
              </div>
            )}
          </div>
        ))}

        {/* Next Button */}
        <button
          className="btn btn-info text-white w-100 py-3 fw-bold"
          onClick={handleNext}
          disabled={terms.length === 0 || subjects.length === 0}
        >
          <i className="fas fa-arrow-right me-2"></i>
          NEXT - WEIGHTAGE SETTINGS
        </button>
      </div>
    </div>
  );
};

export default ExamSettingsDetail;

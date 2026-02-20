import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  getTermsByClass,
  getAssessmentTypesByClassAndTerm,
  saveResultCalculationSettings
} from '../../services/resultMakerService';

const ExamSettingsWeightage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClass, termSettings, subjectMaxMarks } = location.state || {};

  // Fetched data
  const [terms, setTerms] = useState([]);
  const [assessmentsByTerm, setAssessmentsByTerm] = useState({});
  
  // Configuration states
  const [selectedTerms, setSelectedTerms] = useState([]); // Which terms to include
  const [termWeightages, setTermWeightages] = useState({}); // Weightage for each term
  const [examinationWeightages, setExaminationWeightages] = useState({}); // Weightage for each examination within term
  const [selectedExaminations, setSelectedExaminations] = useState({}); // Which examinations to include per term
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedClass) {
      navigate('/resultsheetmaker/exam-settings');
    } else {
      loadTerms();
    }
  }, [selectedClass, navigate]);

  useEffect(() => {
    if (terms.length > 0) {
      loadAssessmentsForAllTerms();
    }
  }, [terms]);

  const loadTerms = async () => {
    try {
      const response = await getTermsByClass(selectedClass._id);
      if (response.success) {
        setTerms(response.data || []);
      }
    } catch (error) {
      console.error('Error loading terms:', error);
    }
  };

  const loadAssessmentsForAllTerms = async () => {
    const assessments = {};
    for (const term of terms) {
      try {
        const response = await getAssessmentTypesByClassAndTerm(selectedClass._id, term._id);
        if (response.success) {
          assessments[term._id] = response.data || [];
        }
      } catch (error) {
        console.error(`Error loading assessments for term ${term._id}:`, error);
        assessments[term._id] = [];
      }
    }
    setAssessmentsByTerm(assessments);
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/exam-settings-detail', {
      state: { selectedClass, termSettings }
    });
  };

  const getClassDisplayName = () => {
    if (!selectedClass) return '';
    if (selectedClass.className && selectedClass.section) {
      return `${selectedClass.className} - ${selectedClass.section}`;
    }
    return selectedClass.name || selectedClass.className || selectedClass;
  };

  const handleTermSelection = (termId) => {
    if (selectedTerms.includes(termId)) {
      // Remove term
      setSelectedTerms(selectedTerms.filter(id => id !== termId));
      // Remove its weightage
      const newWeightages = { ...termWeightages };
      delete newWeightages[termId];
      setTermWeightages(newWeightages);
      // Remove examination selections
      const newExamSelections = { ...selectedExaminations };
      delete newExamSelections[termId];
      setSelectedExaminations(newExamSelections);
    } else {
      // Add term
      setSelectedTerms([...selectedTerms, termId]);
    }
  };

  const handleTermWeightage = (termId, value) => {
    setTermWeightages({
      ...termWeightages,
      [termId]: parseFloat(value) || 0
    });
  };

  const handleExaminationSelection = (termId, examId) => {
    const currentSelections = selectedExaminations[termId] || [];
    if (currentSelections.includes(examId)) {
      // Remove examination
      setSelectedExaminations({
        ...selectedExaminations,
        [termId]: currentSelections.filter(id => id !== examId)
      });
      // Remove its weightage
      const newWeightages = { ...examinationWeightages };
      if (newWeightages[termId]) {
        delete newWeightages[termId][examId];
      }
      setExaminationWeightages(newWeightages);
    } else {
      // Add examination
      setSelectedExaminations({
        ...selectedExaminations,
        [termId]: [...currentSelections, examId]
      });
    }
  };

  const handleExaminationWeightage = (termId, examId, value) => {
    setExaminationWeightages({
      ...examinationWeightages,
      [termId]: {
        ...(examinationWeightages[termId] || {}),
        [examId]: parseFloat(value) || 0
      }
    });
  };

  const validateSettings = () => {
    // Check if at least one term is selected
    if (selectedTerms.length === 0) {
      alert('Please select at least one term');
      return false;
    }

    // Check if term weightages add up to 100%
    const totalTermWeightage = Object.values(termWeightages).reduce((sum, val) => sum + val, 0);
    if (Math.abs(totalTermWeightage - 100) > 0.01) {
      alert(`Term weightages must add up to 100%. Current total: ${totalTermWeightage.toFixed(2)}%`);
      return false;
    }

    // Check if each term has at least one examination selected
    for (const termId of selectedTerms) {
      const examinations = selectedExaminations[termId] || [];
      if (examinations.length === 0) {
        const term = terms.find(t => t._id === termId);
        alert(`Please select at least one examination for ${term?.termName}`);
        return false;
      }

      // Check if examination weightages add up to 100% for each term
      const termExamWeightages = examinationWeightages[termId] || {};
      const totalExamWeightage = examinations.reduce((sum, examId) => {
        return sum + (termExamWeightages[examId] || 0);
      }, 0);
      
      if (Math.abs(totalExamWeightage - 100) > 0.01) {
        const term = terms.find(t => t._id === termId);
        alert(`Examination weightages for ${term?.termName} must add up to 100%. Current total: ${totalExamWeightage.toFixed(2)}%`);
        return false;
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateSettings()) {
      return;
    }

    setLoading(true);
    try {
      const settingsData = {
        classId: selectedClass._id,
        selectedTerms,
        termWeightages,
        selectedExaminations,
        examinationWeightages
      };

      const response = await saveResultCalculationSettings(settingsData);
      if (response.success) {
        alert('Exam settings saved successfully! You can now enter marks and generate results.');
        navigate('/resultsheetmaker/exam-settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getTotalTermWeightage = () => {
    return Object.values(termWeightages).reduce((sum, val) => sum + val, 0);
  };

  const getTotalExamWeightage = (termId) => {
    const examinations = selectedExaminations[termId] || [];
    const termExamWeightages = examinationWeightages[termId] || {};
    return examinations.reduce((sum, examId) => {
      return sum + (termExamWeightages[examId] || 0);
    }, 0);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Exam Settings - (2025-2026)</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-question-circle fs-4"></i>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h5 className="mb-0 fw-semibold text-secondary">Result Calculation Weightages - {getClassDisplayName()}</h5>
        <small className="text-muted">Step 3: Configure how final results will be calculated</small>
      </div>

      {/* Content */}
      <div className="container py-4" style={{ maxWidth: '900px' }}>
        {/* Info Alert */}
        <div className="alert alert-info mb-4">
          <i className="fas fa-info-circle me-2"></i>
          <strong>How it works:</strong> Select which terms and examinations to include in the final result, 
          then assign percentage weightages. All percentages must add up to 100%.
        </div>

        {/* Terms Configuration */}
        <div className="bg-white rounded shadow-sm p-4 mb-4">
          <h5 className="text-info mb-3">
            <i className="fas fa-calendar-alt me-2"></i>
            Select Terms to Include in Final Result
          </h5>
          
          {terms.length === 0 ? (
            <div className="alert alert-warning">
              No terms found. Please add terms in <a href="/resultsheetmaker/class-settings">Class Settings</a>.
            </div>
          ) : (
            <>
              {terms.map((term) => (
                <div key={term._id} className="mb-3 border rounded p-3">
                  <div className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`term-${term._id}`}
                      checked={selectedTerms.includes(term._id)}
                      onChange={() => handleTermSelection(term._id)}
                      style={{ width: '20px', height: '20px' }}
                    />
                    <label className="form-check-label ms-2 fw-semibold fs-5" htmlFor={`term-${term._id}`}>
                      {term.termName}
                    </label>
                  </div>
                  
                  {selectedTerms.includes(term._id) && (
                    <div className="ms-4 mt-3">
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label className="form-label fw-semibold text-secondary">
                            {term.termName} Weightage (%)
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            placeholder="e.g., 50"
                            value={termWeightages[term._id] || ''}
                            onChange={(e) => handleTermWeightage(term._id, e.target.value)}
                            min="0"
                            max="100"
                            step="0.01"
                            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {selectedTerms.length > 0 && (
                <div className={`alert ${getTotalTermWeightage() === 100 ? 'alert-success' : 'alert-warning'} border mt-3`}>
                  <strong>Total Term Weightage:</strong> {getTotalTermWeightage().toFixed(2)}%
                  {getTotalTermWeightage() !== 100 && (
                    <span className="text-danger ms-2">
                      <i className="fas fa-exclamation-triangle"></i> Must equal 100%
                    </span>
                  )}
                  {getTotalTermWeightage() === 100 && (
                    <span className="text-success ms-2">
                      <i className="fas fa-check-circle"></i> Perfect!
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Examinations Configuration */}
        {selectedTerms.length > 0 && (
          <div className="bg-white rounded shadow-sm p-4 mb-4">
            <h5 className="text-info mb-3">
              <i className="fas fa-clipboard-check me-2"></i>
              Select Examinations and Assign Weightages
            </h5>
            
            {selectedTerms.map((termId) => {
              const term = terms.find(t => t._id === termId);
              const examinations = assessmentsByTerm[termId] || [];
              
              return (
                <div key={termId} className="mb-4 border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                  <h6 className="fw-bold text-secondary mb-3">
                    <i className="fas fa-calendar me-2"></i>
                    {term?.termName} - Select Examinations
                  </h6>
                  
                  {examinations.length === 0 ? (
                    <div className="alert alert-warning small mb-0">
                      No examinations found for this term. Add them in <a href="/resultsheetmaker/class-settings">Class Settings</a>.
                    </div>
                  ) : (
                    <>
                      {examinations.map((exam) => (
                        <div key={exam._id} className="mb-3 bg-white rounded p-3">
                          <div className="form-check mb-2">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`exam-${exam._id}`}
                              checked={(selectedExaminations[termId] || []).includes(exam._id)}
                              onChange={() => handleExaminationSelection(termId, exam._id)}
                              style={{ width: '18px', height: '18px' }}
                            />
                            <label className="form-check-label ms-2 fw-semibold" htmlFor={`exam-${exam._id}`}>
                              {exam.assessmentName}
                            </label>
                          </div>
                          
                          {(selectedExaminations[termId] || []).includes(exam._id) && (
                            <div className="ms-4 mt-2">
                              <label className="form-label small text-secondary">Weightage (%)</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="e.g., 30"
                                value={examinationWeightages[termId]?.[exam._id] || ''}
                                onChange={(e) => handleExaminationWeightage(termId, exam._id, e.target.value)}
                                min="0"
                                max="100"
                                step="0.01"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {(selectedExaminations[termId] || []).length > 0 && (
                        <div className={`alert ${getTotalExamWeightage(termId) === 100 ? 'alert-success' : 'alert-warning'} border mt-3 small mb-0`}>
                          <strong>Total for {term?.termName}:</strong> {getTotalExamWeightage(termId).toFixed(2)}%
                          {getTotalExamWeightage(termId) !== 100 && (
                            <span className="text-danger ms-2">
                              <i className="fas fa-exclamation-triangle"></i> Must equal 100%
                            </span>
                          )}
                          {getTotalExamWeightage(termId) === 100 && (
                            <span className="text-success ms-2">
                              <i className="fas fa-check-circle"></i> Perfect!
                            </span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Save Button */}
        <button
          className="btn btn-info text-white w-100 py-3 fw-bold"
          onClick={handleSave}
          disabled={loading || selectedTerms.length === 0}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2"></span>
              SAVING...
            </>
          ) : (
            <>
              <i className="fas fa-save me-2"></i>
              SAVE ALL EXAM SETTINGS
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ExamSettingsWeightage;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getClasses,
  getTermsByClass,
  getAssessmentTypesByClassAndTerm,
  getSubjectsByClass,
  saveGradingSettings,
  getGradingSettings,
  deleteGradingSettings
} from '../../services/resultMakerService';

const GradingSettings = () => {
  const navigate = useNavigate();
  
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [examinations, setExaminations] = useState([]);
  const [selectedExamination, setSelectedExamination] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  
  const [grades, setGrades] = useState([
    { grade: 'A+', minMarks: 90, maxMarks: 100, color: 'success' },
    { grade: 'A', minMarks: 80, maxMarks: 89, color: 'success' },
    { grade: 'B+', minMarks: 70, maxMarks: 79, color: 'primary' },
    { grade: 'B', minMarks: 60, maxMarks: 69, color: 'primary' },
    { grade: 'C', minMarks: 50, maxMarks: 59, color: 'info' },
    { grade: 'D', minMarks: 40, maxMarks: 49, color: 'warning' },
    { grade: 'F', minMarks: 0, maxMarks: 39, color: 'danger' }
  ]);
  
  const [existingGrades, setExistingGrades] = useState([]);
  const [editingGrade, setEditingGrade] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadTerms();
      loadSubjects();
      setSelectedTerm(null);
      setSelectedExamination(null);
      setSelectedSubjects([]);
      setExistingGrades([]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedTerm) {
      loadExaminations();
      setSelectedExamination(null);
      setSelectedSubjects([]);
      setExistingGrades([]);
    }
  }, [selectedClass, selectedTerm]);

  useEffect(() => {
    if (selectedClass && selectedTerm && selectedExamination) {
      loadGradingSettings();
    }
  }, [selectedClass, selectedTerm, selectedExamination]);

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

  const loadExaminations = async () => {
    try {
      const response = await getAssessmentTypesByClassAndTerm(selectedClass._id, selectedTerm._id);
      if (response.success) {
        setExaminations(response.data || []);
      }
    } catch (error) {
      console.error('Error loading examinations:', error);
    }
  };

  const loadSubjects = async () => {
    try {
      const response = await getSubjectsByClass(selectedClass._id);
      if (response.success) {
        setSubjects(response.data || []);
      }
    } catch (error) {
      console.error('Error loading subjects:', error);
    }
  };

  const loadGradingSettings = async () => {
    try {
      const response = await getGradingSettings({
        classId: selectedClass._id,
        termId: selectedTerm._id,
        examinationId: selectedExamination._id
      });
      if (response.success && response.data) {
        // Populate the grading configurations with class, term, examination, and subject details
        const gradesWithDetails = Array.isArray(response.data) ? response.data : [response.data];
        const enrichedGrades = gradesWithDetails.map(grade => {
          // Get subject names for this grading configuration
          const subjectNames = grade.subjectIds.map(subjectId => {
            const subject = subjects.find(s => s._id === subjectId);
            return subject ? subject.subjectName : 'Unknown';
          });
          
          return {
            ...grade,
            className: getClassDisplayName(selectedClass),
            termName: selectedTerm.termName,
            examinationName: selectedExamination.assessmentName,
            subjectNames: subjectNames
          };
        });
        setExistingGrades(enrichedGrades);
      } else {
        setExistingGrades([]);
      }
    } catch (error) {
      console.error('Error loading grading settings:', error);
      setExistingGrades([]);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const classObj = classes.find(c => c._id === classId);
    setSelectedClass(classObj);
  };

  const handleTermChange = (e) => {
    const termId = e.target.value;
    const termObj = terms.find(t => t._id === termId);
    setSelectedTerm(termObj);
  };

  const handleExaminationChange = (e) => {
    const examId = e.target.value;
    const examObj = examinations.find(ex => ex._id === examId);
    setSelectedExamination(examObj);
    setSelectedSubjects([]);
  };

  const handleSubjectToggle = (subjectId) => {
    console.log('Toggling subject:', subjectId);
    console.log('Current selectedSubjects before toggle:', selectedSubjects);
    
    if (selectedSubjects.includes(subjectId)) {
      const newSelection = selectedSubjects.filter(id => id !== subjectId);
      console.log('Removing subject, new selection:', newSelection);
      setSelectedSubjects(newSelection);
    } else {
      const newSelection = [...selectedSubjects, subjectId];
      console.log('Adding subject, new selection:', newSelection);
      setSelectedSubjects(newSelection);
    }
  };

  const handleSelectAllSubjects = () => {
    if (selectedSubjects.length === subjects.length) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(subjects.map(s => s._id));
    }
  };

  const handleGradeChange = (index, field, value) => {
    const newGrades = [...grades];
    newGrades[index][field] = field === 'grade' || field === 'color' ? value : parseFloat(value) || 0;
    setGrades(newGrades);
  };

  const handleAddGrade = () => {
    setGrades([...grades, { grade: '', minMarks: 0, maxMarks: 0, color: 'secondary' }]);
  };

  const handleRemoveGrade = (index) => {
    if (grades.length <= 1) {
      alert('At least one grade must be defined');
      return;
    }
    const newGrades = grades.filter((_, i) => i !== index);
    setGrades(newGrades);
  };

  const handleAddNew = () => {
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }
    
    setEditingGrade(null);
    setGrades([
      { grade: 'A+', minMarks: 90, maxMarks: 100, color: 'success' },
      { grade: 'A', minMarks: 80, maxMarks: 89, color: 'success' },
      { grade: 'B+', minMarks: 70, maxMarks: 79, color: 'primary' },
      { grade: 'B', minMarks: 60, maxMarks: 69, color: 'primary' },
      { grade: 'C', minMarks: 50, maxMarks: 59, color: 'info' },
      { grade: 'D', minMarks: 40, maxMarks: 49, color: 'warning' },
      { grade: 'F', minMarks: 0, maxMarks: 39, color: 'danger' }
    ]);
    setShowForm(true);
  };

  const handleEdit = (gradeConfig) => {
    setEditingGrade(gradeConfig);
    setSelectedSubjects(gradeConfig.subjectIds);
    setGrades(gradeConfig.grades);
    setShowForm(true);
  };

  const handleDelete = async (gradeId) => {
    if (!window.confirm('Are you sure you want to delete this grading configuration?')) {
      return;
    }

    setLoading(true);
    try {
      const response = await deleteGradingSettings(gradeId);
      if (response.success) {
        alert('Grading configuration deleted successfully!');
        await loadGradingSettings();
      }
    } catch (error) {
      console.error('Error deleting grading settings:', error);
      alert('Error deleting grading settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingGrade(null);
    setSelectedSubjects([]);
    setGrades([
      { grade: 'A+', minMarks: 90, maxMarks: 100, color: 'success' },
      { grade: 'A', minMarks: 80, maxMarks: 89, color: 'success' },
      { grade: 'B+', minMarks: 70, maxMarks: 79, color: 'primary' },
      { grade: 'B', minMarks: 60, maxMarks: 69, color: 'primary' },
      { grade: 'C', minMarks: 50, maxMarks: 59, color: 'info' },
      { grade: 'D', minMarks: 40, maxMarks: 49, color: 'warning' },
      { grade: 'F', minMarks: 0, maxMarks: 39, color: 'danger' }
    ]);
  };

  const validateGrades = () => {
    // Check for empty grade names
    const emptyGrades = grades.filter(g => !g.grade.trim());
    if (emptyGrades.length > 0) {
      alert('All grades must have a name');
      return false;
    }

    // Check for overlapping ranges
    for (let i = 0; i < grades.length; i++) {
      for (let j = i + 1; j < grades.length; j++) {
        const g1 = grades[i];
        const g2 = grades[j];
        
        if ((g1.minMarks <= g2.maxMarks && g1.maxMarks >= g2.minMarks) ||
            (g2.minMarks <= g1.maxMarks && g2.maxMarks >= g1.minMarks)) {
          alert(`Grade ranges overlap: ${g1.grade} and ${g2.grade}`);
          return false;
        }
      }
    }

    return true;
  };

  const handleSave = async () => {
    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }

    if (!validateGrades()) {
      return;
    }

    console.log('=== FRONTEND GRADING SAVE ===');
    console.log('selectedSubjects:', selectedSubjects);
    console.log('selectedSubjects type:', typeof selectedSubjects);
    console.log('selectedSubjects is array:', Array.isArray(selectedSubjects));
    console.log('selectedSubjects length:', selectedSubjects.length);
    console.log('editingGrade:', editingGrade);

    // Check if subjects have changed during edit
    let isCreatingNew = false;
    if (editingGrade) {
      const originalSubjects = editingGrade.subjectIds.map(id => id.toString()).sort();
      const currentSubjects = selectedSubjects.map(id => id.toString()).sort();
      const subjectsChanged = JSON.stringify(originalSubjects) !== JSON.stringify(currentSubjects);
      
      console.log('Original subjects:', originalSubjects);
      console.log('Current subjects:', currentSubjects);
      console.log('Subjects changed:', subjectsChanged);
      
      if (subjectsChanged) {
        const confirmChange = window.confirm(
          'You have changed the subjects. This will create a new grading configuration. Do you want to continue?'
        );
        if (!confirmChange) {
          return;
        }
        isCreatingNew = true;
      }
    }

    const dataToSend = {
      _id: isCreatingNew ? undefined : editingGrade?._id,
      classId: selectedClass._id,
      termId: selectedTerm._id,
      examinationId: selectedExamination._id,
      subjectIds: selectedSubjects,
      grades: grades
    };

    console.log('Data to send:', JSON.stringify(dataToSend, null, 2));

    setLoading(true);
    try {
      const response = await saveGradingSettings(dataToSend);

      console.log('Response from server:', response);

      if (response.success) {
        alert(editingGrade && !isCreatingNew ? 'Grading settings updated successfully!' : 'Grading settings saved successfully!');
        setShowForm(false);
        setEditingGrade(null);
        setSelectedSubjects([]);
        await loadGradingSettings();
      }
    } catch (error) {
      console.error('Error saving grading settings:', error);
      alert('Error saving grading settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.className || '';
  };

  const colorOptions = [
    { value: 'success', label: 'Green' },
    { value: 'primary', label: 'Blue' },
    { value: 'info', label: 'Light Blue' },
    { value: 'warning', label: 'Yellow' },
    { value: 'danger', label: 'Red' },
    { value: 'secondary', label: 'Gray' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Grading Settings</h5>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-question-circle fs-4"></i>
        </button>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h5 className="mb-0 fw-semibold">Configure Grading Scale</h5>
        <small className="text-muted">You can create multiple grading configurations for different subjects</small>
      </div>

      {/* Content */}
      <div className="container py-4" style={{ maxWidth: '1000px' }}>
        {/* Class Selection */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Select Class</label>
          <select
            className="form-select form-select-lg"
            value={selectedClass?._id || ''}
            onChange={handleClassChange}
            style={{ borderColor: '#6c757d', borderWidth: '2px' }}
          >
            <option value="">Select Class</option>
            {classes.map((classItem) => (
              <option key={classItem._id} value={classItem._id}>
                {getClassDisplayName(classItem)}
              </option>
            ))}
          </select>
        </div>

        {/* Term Selection */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Select Term</label>
          <select
            className="form-select form-select-lg"
            value={selectedTerm?._id || ''}
            onChange={handleTermChange}
            style={{ borderColor: '#6c757d', borderWidth: '2px' }}
            disabled={!selectedClass}
          >
            <option value="">Select Term</option>
            {terms.map((term) => (
              <option key={term._id} value={term._id}>
                {term.termName}
              </option>
            ))}
          </select>
        </div>

        {/* Examination Selection */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-info">Select Name of the Examination</label>
          <select
            className="form-select form-select-lg"
            value={selectedExamination?._id || ''}
            onChange={handleExaminationChange}
            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
            disabled={!selectedTerm}
          >
            <option value="">Select Name of the Examination</option>
            {examinations.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.assessmentName}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Selection */}
        {selectedExamination && subjects.length > 0 && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label fw-semibold text-success mb-0">
                Select Subject(s) - You can select one or multiple subjects
              </label>
              <button
                className="btn btn-sm btn-outline-success"
                onClick={handleSelectAllSubjects}
              >
                {selectedSubjects.length === subjects.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
            <div className="alert alert-info py-2 mb-2">
              <small>
                <i className="fas fa-lightbulb me-1"></i>
                <strong>Tip:</strong> Select subjects with the same max marks together. 
                Example: First Language (125 marks) separately, then other subjects (100 marks) together.
              </small>
            </div>
            <div className="bg-white border rounded p-3" style={{ borderColor: '#28a745', borderWidth: '2px' }}>
              <div className="row g-2">
                {subjects.map((subject) => (
                  <div key={subject._id} className="col-md-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`subject-${subject._id}`}
                        checked={selectedSubjects.includes(subject._id)}
                        onChange={() => handleSubjectToggle(subject._id)}
                      />
                      <label className="form-check-label" htmlFor={`subject-${subject._id}`}>
                        {subject.subjectName}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              {selectedSubjects.length > 0 && (
                <div className="mt-3 p-2 bg-light rounded">
                  <small className="text-success fw-bold">
                    <i className="fas fa-check-circle me-1"></i>
                    {selectedSubjects.length} subject(s) selected
                  </small>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedClass && selectedTerm && selectedExamination && selectedSubjects.length === 0 && !showForm && (
          <div className="alert alert-warning">
            <i className="fas fa-exclamation-triangle me-2"></i>
            Please select at least one subject to configure grading.
          </div>
        )}

        {selectedClass && selectedTerm && selectedExamination && selectedSubjects.length > 0 && (
          <>
            {!showForm && (
              <>
                {/* Existing Grades Display or Add Button */}
                {existingGrades.length > 0 ? (
                  <div className="bg-white rounded shadow-sm p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h6 className="text-info mb-0">
                        <i className="fas fa-award me-2"></i>
                        Grading Configurations
                      </h6>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={handleAddNew}
                      >
                        <i className="fas fa-plus me-1"></i>
                        Add New
                      </button>
                    </div>
                    {existingGrades.map((gradeConfig, index) => (
                      <div key={gradeConfig._id || index} className="border rounded p-3 mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div className="flex-grow-1">
                            <div className="mb-2">
                              <span className="badge bg-secondary me-2">
                                <i className="fas fa-school me-1"></i>
                                {gradeConfig.className}
                              </span>
                              <span className="badge bg-secondary me-2">
                                <i className="fas fa-calendar-alt me-1"></i>
                                {gradeConfig.termName}
                              </span>
                              <span className="badge bg-info">
                                <i className="fas fa-clipboard-check me-1"></i>
                                {gradeConfig.examinationName}
                              </span>
                            </div>
                            <div className="mb-2">
                              <small className="text-success fw-bold">
                                <i className="fas fa-book me-1"></i>
                                Subjects: {gradeConfig.subjectNames.join(', ')}
                              </small>
                            </div>
                            <div className="d-flex flex-wrap gap-2">
                              {gradeConfig.grades.map((grade, gIndex) => (
                                <span key={gIndex} className={`badge bg-${grade.color}`}>
                                  {grade.grade} ({grade.minMarks}-{grade.maxMarks})
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="d-flex gap-2 ms-3">
                            <button
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => handleEdit(gradeConfig)}
                            >
                              <i className="fas fa-edit"></i> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(gradeConfig._id)}
                            >
                              <i className="fas fa-trash"></i> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className="alert alert-info mb-3">
                      <i className="fas fa-info-circle me-2"></i>
                      No grading configuration found for the selected subject(s). Click "Add Grading Configuration" to create one.
                    </div>
                    <button
                      className="btn btn-info text-white w-100 py-3 fw-bold"
                      onClick={handleAddNew}
                    >
                      <i className="fas fa-plus me-2"></i>
                      ADD GRADING CONFIGURATION
                    </button>
                  </>
                )}
              </>
            )}

            {showForm && (
              <>
                {/* Selected Subjects Info */}
                <div className="alert alert-success mb-3">
                  <i className="fas fa-book me-2"></i>
                  <strong>Selected Subjects:</strong> {subjects.filter(s => selectedSubjects.includes(s._id)).map(s => s.subjectName).join(', ')}
                </div>

                {/* Info Alert */}
                <div className="alert alert-info mb-4">
                  <i className="fas fa-info-circle me-2"></i>
                  <strong>How it works:</strong> Define grade names and their marks ranges. 
                  The same grading will be applied to all selected subjects.
                </div>

                {/* Grades Configuration */}
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="text-info mb-0">
                      <i className="fas fa-award me-2"></i>
                      {editingGrade ? 'Edit Grade Definitions' : 'Add Grade Definitions'}
                    </h5>
                    <button
                      className="btn btn-sm btn-success"
                      onClick={handleAddGrade}
                    >
                      <i className="fas fa-plus me-1"></i>
                      Add Grade
                    </button>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: '50px' }}>Sr.</th>
                          <th style={{ width: '120px' }}>Grade</th>
                          <th style={{ width: '120px' }}>Min Marks</th>
                          <th style={{ width: '120px' }}>Max Marks</th>
                          <th style={{ width: '140px' }}>Color</th>
                          <th style={{ width: '100px' }}>Preview</th>
                          <th style={{ width: '80px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {grades.map((grade, index) => (
                          <tr key={index}>
                            <td className="align-middle text-center">{index + 1}</td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g., A+"
                                value={grade.grade}
                                onChange={(e) => handleGradeChange(index, 'grade', e.target.value)}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0"
                                value={grade.minMarks}
                                onChange={(e) => handleGradeChange(index, 'minMarks', e.target.value)}
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="100"
                                value={grade.maxMarks}
                                onChange={(e) => handleGradeChange(index, 'maxMarks', e.target.value)}
                                min="0"
                                step="0.01"
                              />
                            </td>
                            <td>
                              <select
                                className="form-select"
                                value={grade.color}
                                onChange={(e) => handleGradeChange(index, 'color', e.target.value)}
                              >
                                {colorOptions.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="text-center align-middle">
                              <span className={`badge bg-${grade.color}`}>
                                {grade.grade || 'Grade'}
                              </span>
                            </td>
                            <td className="text-center align-middle">
                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => handleRemoveGrade(index)}
                                disabled={grades.length <= 1}
                                title="Delete"
                              >
                                <i className="fas fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Preview */}
                  <div className="mt-3 p-3 bg-light rounded">
                    <small className="fw-bold text-secondary d-block mb-2">
                      <i className="fas fa-eye me-1"></i>
                      Preview:
                    </small>
                    <div className="d-flex flex-wrap gap-2">
                      {grades.map((grade, index) => (
                        <span key={index} className={`badge bg-${grade.color}`}>
                          {grade.grade} ({grade.minMarks}-{grade.maxMarks})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-secondary w-50 py-3 fw-bold"
                    onClick={handleCancelForm}
                    disabled={loading}
                  >
                    <i className="fas fa-times me-2"></i>
                    CANCEL
                  </button>
                  <button
                    className="btn btn-info text-white w-50 py-3 fw-bold"
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        SAVING...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        {editingGrade ? 'UPDATE' : 'SAVE'}
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default GradingSettings;

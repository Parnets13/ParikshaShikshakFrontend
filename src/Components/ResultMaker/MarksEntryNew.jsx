import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getClasses,
  getTermsByClass,
  getAssessmentTypesByClassAndTerm,
  getSubjectsByClass,
  getStudentsByClass,
  saveStudentMarksNew,
  getStudentMarksNew,
  getExamSettings,
  getGradingSettings
} from '../../services/resultMakerService';

const MarksEntryNew = () => {
  const navigate = useNavigate();
  
  // Selection states
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [terms, setTerms] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [examinations, setExaminations] = useState([]);
  const [selectedExamination, setSelectedExamination] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  
  // Students and marks
  const [students, setStudents] = useState([]);
  const [studentMarks, setStudentMarks] = useState({});
  const [existingMarks, setExistingMarks] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [marksLocked, setMarksLocked] = useState(false);
  
  // Max marks and exam settings
  const [maxMarks, setMaxMarks] = useState(null);
  const [examSettings, setExamSettings] = useState(null);
  const [gradingSettings, setGradingSettings] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [showMarksEntry, setShowMarksEntry] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadTerms();
      loadSubjects();
      loadStudents();
      loadExamSettings();
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedTerm) {
      loadExaminations();
    }
  }, [selectedClass, selectedTerm]);

  useEffect(() => {
    if (selectedClass && selectedTerm && selectedExamination && selectedSubject) {
      loadExistingMarks();
      calculateMaxMarks();
      loadGradingSettings();
      setShowMarksEntry(true);
    } else {
      setShowMarksEntry(false);
    }
  }, [selectedClass, selectedTerm, selectedExamination, selectedSubject, examSettings]);

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

  const loadStudents = async () => {
    try {
      const response = await getStudentsByClass(selectedClass._id);
      if (response.success) {
        setStudents(response.data || []);
      }
    } catch (error) {
      console.error('Error loading students:', error);
    }
  };

  const loadExamSettings = async () => {
    try {
      const response = await getExamSettings(selectedClass._id);
      if (response.success && response.data) {
        setExamSettings(response.data);
      }
    } catch (error) {
      console.error('Error loading exam settings:', error);
    }
  };

  const loadGradingSettings = async () => {
    try {
      const response = await getGradingSettings({
        classId: selectedClass._id,
        termId: selectedTerm._id,
        examinationId: selectedExamination._id
      });
      if (response.success && response.data && response.data.length > 0) {
        // Find grading configuration that includes the selected subject
        const gradingForSubject = response.data.find(grading => 
          grading.subjectIds && grading.subjectIds.includes(selectedSubject._id)
        );
        setGradingSettings(gradingForSubject || null);
      } else {
        setGradingSettings(null);
      }
    } catch (error) {
      console.error('Error loading grading settings:', error);
      setGradingSettings(null);
    }
  };

  const calculateMaxMarks = () => {
    if (!examSettings || !selectedTerm || !selectedExamination || !selectedSubject) {
      setMaxMarks(null);
      return;
    }

    // Get max marks from new structure: termSettings[termId][examinationId][subjectId]
    if (examSettings.termSettings && 
        examSettings.termSettings[selectedTerm._id] &&
        examSettings.termSettings[selectedTerm._id][selectedExamination._id] &&
        examSettings.termSettings[selectedTerm._id][selectedExamination._id][selectedSubject._id]) {
      setMaxMarks(examSettings.termSettings[selectedTerm._id][selectedExamination._id][selectedSubject._id]);
      return;
    }

    setMaxMarks(null);
  };

  const loadExistingMarks = async () => {
    try {
      const response = await getStudentMarksNew({
        classId: selectedClass._id,
        termId: selectedTerm._id,
        examinationId: selectedExamination._id,
        subjectId: selectedSubject._id
      });
      
      console.log('Fetched marks response:', response);
      
      if (response.success && response.data && response.data.length > 0) {
        const marksMap = {};
        response.data.forEach(mark => {
          // Handle both populated and non-populated studentId
          const studentIdKey = typeof mark.studentId === 'object' ? mark.studentId._id : mark.studentId;
          marksMap[studentIdKey] = mark.marks;
        });
        
        console.log('Marks map:', marksMap);
        
        setExistingMarks(marksMap);
        setStudentMarks(marksMap);
        setMarksLocked(true); // Lock marks since they exist
        setIsEditMode(false);
      } else {
        console.log('No existing marks found');
        setExistingMarks({});
        setStudentMarks({});
        setMarksLocked(false);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error('Error loading existing marks:', error);
      setExistingMarks({});
      setStudentMarks({});
      setMarksLocked(false);
      setIsEditMode(false);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const classObj = classes.find(c => c._id === classId);
    setSelectedClass(classObj);
    
    // Reset dependent selections
    setSelectedTerm(null);
    setSelectedExamination(null);
    setSelectedSubject(null);
    setShowMarksEntry(false);
  };

  const handleTermChange = (e) => {
    const termId = e.target.value;
    const termObj = terms.find(t => t._id === termId);
    setSelectedTerm(termObj);
    
    // Reset dependent selections
    setSelectedExamination(null);
    setSelectedSubject(null);
    setShowMarksEntry(false);
  };

  const handleExaminationChange = (e) => {
    const examId = e.target.value;
    const examObj = examinations.find(ex => ex._id === examId);
    setSelectedExamination(examObj);
    
    // Reset subject selection
    setSelectedSubject(null);
    setShowMarksEntry(false);
  };

  const handleSubjectChange = (e) => {
    const subjectId = e.target.value;
    const subjectObj = subjects.find(s => s._id === subjectId);
    setSelectedSubject(subjectObj);
  };

  const handleMarksChange = (studentId, value) => {
    // Only allow changes in edit mode or when marks are not locked
    if (marksLocked && !isEditMode) {
      return;
    }
    
    // Validate against max marks
    if (maxMarks && value && parseFloat(value) > parseFloat(maxMarks)) {
      alert(`Marks cannot exceed maximum marks of ${maxMarks}`);
      return;
    }
    
    setStudentMarks({
      ...studentMarks,
      [studentId]: value
    });
  };

  const handleEnableEdit = () => {
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    // Restore original marks
    setStudentMarks({ ...existingMarks });
  };

  const getGrade = (marks) => {
    if (!marks || !gradingSettings || !gradingSettings.grades) return { grade: '-', color: 'secondary' };
    
    const marksValue = parseFloat(marks);
    
    // Find matching grade from grading settings based on marks
    for (const gradeConfig of gradingSettings.grades) {
      if (marksValue >= gradeConfig.minMarks && marksValue <= gradeConfig.maxMarks) {
        return { grade: gradeConfig.grade, color: gradeConfig.color };
      }
    }
    
    return { grade: '-', color: 'secondary' };
  };

  const handleSaveMarks = async () => {
    // Validate marks
    const invalidMarks = Object.entries(studentMarks).filter(([studentId, marks]) => {
      if (marks === '' || marks === null || marks === undefined) return false;
      if (isNaN(marks) || marks < 0) return true;
      if (maxMarks && parseFloat(marks) > parseFloat(maxMarks)) return true;
      return false;
    });

    if (invalidMarks.length > 0) {
      alert(`Please enter valid marks (0 to ${maxMarks || '∞'})`);
      return;
    }

    setLoading(true);
    try {
      const marksData = students.map(student => ({
        studentId: student._id,
        classId: selectedClass._id,
        termId: selectedTerm._id,
        examinationId: selectedExamination._id,
        subjectId: selectedSubject._id,
        marks: studentMarks[student._id] || 0
      }));

      const response = await saveStudentMarksNew({ marks: marksData });
      
      if (response.success) {
        alert(marksLocked ? 'Marks updated successfully!' : 'Marks saved successfully!');
        // Reload existing marks
        await loadExistingMarks();
      }
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('Error saving marks. Please try again.');
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

  const getEnteredCount = () => {
    return Object.values(studentMarks).filter(marks => marks !== '' && marks !== null && marks !== undefined).length;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Marks Entry</h5>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-question-circle fs-4"></i>
        </button>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h5 className="mb-0 fw-semibold">Enter Student Marks</h5>
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
          {selectedClass && terms.length === 0 && (
            <small className="text-muted">
              No terms found. Add them in <a href="/resultsheetmaker/class-settings">Class Settings</a>.
            </small>
          )}
        </div>

        {/* Examination Selection */}
        <div className="mb-3">
          <label className="form-label fw-semibold text-secondary">Select Name of the Examination</label>
          <select
            className="form-select form-select-lg"
            value={selectedExamination?._id || ''}
            onChange={handleExaminationChange}
            style={{ borderColor: '#6c757d', borderWidth: '2px' }}
            disabled={!selectedTerm}
          >
            <option value="">Select Name of the Examination</option>
            {examinations.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.assessmentName}
              </option>
            ))}
          </select>
          {selectedTerm && examinations.length === 0 && (
            <small className="text-muted">
              No examinations found for this term. Add them in <a href="/resultsheetmaker/class-settings">Class Settings</a>.
            </small>
          )}
        </div>

        {/* Subject Selection */}
        <div className="mb-4">
          <label className="form-label fw-semibold text-info">Select Subject</label>
          <select
            className="form-select form-select-lg"
            value={selectedSubject?._id || ''}
            onChange={handleSubjectChange}
            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
            disabled={!selectedExamination}
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.subjectName}
              </option>
            ))}
          </select>
          {selectedExamination && subjects.length === 0 && (
            <small className="text-muted">
              No subjects found. Add them in <a href="/resultsheetmaker/class-settings">Class Settings</a>.
            </small>
          )}
        </div>

        {/* Marks Entry Section */}
        {showMarksEntry && (
          <>
            {/* Info Card */}
            <div className="alert alert-info mb-4">
              <div className="row">
                <div className="col-md-8">
                  <strong>Entering marks for:</strong>
                  <div className="small mt-1">
                    <i className="fas fa-school me-1"></i> {getClassDisplayName(selectedClass)} |
                    <i className="fas fa-calendar-alt ms-2 me-1"></i> {selectedTerm.termName} |
                    <i className="fas fa-clipboard-check ms-2 me-1"></i> {selectedExamination.assessmentName} |
                    <i className="fas fa-book ms-2 me-1"></i> {selectedSubject.subjectName}
                  </div>
                </div>
                <div className="col-md-4 text-end">
                  {maxMarks && (
                    <div className="badge bg-warning text-dark" style={{ fontSize: '16px', padding: '10px 15px' }}>
                      <i className="fas fa-star me-1"></i>
                      Max Marks: {maxMarks}
                    </div>
                  )}
                  <div className="badge bg-white text-info mt-2" style={{ fontSize: '14px', display: 'block' }}>
                    {getEnteredCount()} / {students.length} entered
                  </div>
                  {marksLocked && !isEditMode && (
                    <div className="badge bg-success mt-2" style={{ fontSize: '12px', display: 'block' }}>
                      <i className="fas fa-check-circle me-1"></i>
                      Marks Saved
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Students List */}
            {students.length === 0 ? (
              <div className="alert alert-warning">
                <i className="fas fa-exclamation-triangle me-2"></i>
                No students found for this class. Add students first.
              </div>
            ) : (
              <div className="bg-white rounded shadow-sm p-4 mb-4">
                <h6 className="text-secondary mb-3">
                  <i className="fas fa-users me-2"></i>
                  Student Marks Entry
                </h6>
                
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '60px' }}>Sr.</th>
                        <th>Student Name</th>
                        <th>Admission No</th>
                        <th style={{ width: '150px' }}>Marks {maxMarks && `(out of ${maxMarks})`}</th>
                        <th style={{ width: '100px' }}>Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => {
                        const marks = studentMarks[student._id];
                        const gradeResult = getGrade(marks);
                        
                        return (
                          <tr key={student._id}>
                            <td className="align-middle">{index + 1}</td>
                            <td className="align-middle fw-semibold">{student.studentName}</td>
                            <td className="align-middle text-muted">{student.admissionNo}</td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="0"
                                value={marks || ''}
                                onChange={(e) => handleMarksChange(student._id, e.target.value)}
                                disabled={marksLocked && !isEditMode}
                                min="0"
                                max={maxMarks || undefined}
                                step="0.01"
                                style={{
                                  backgroundColor: marksLocked && !isEditMode ? '#f0f0f0' : 'white',
                                  cursor: marksLocked && !isEditMode ? 'not-allowed' : 'text'
                                }}
                              />
                            </td>
                            <td className="align-middle text-center">
                              {marks && gradeResult.grade !== '-' && (
                                <span className={`badge bg-${gradeResult.color}`}>
                                  {gradeResult.grade}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Grade Legend */}
                {gradingSettings && gradingSettings.grades && gradingSettings.grades.length > 0 && (
                  <div className="mt-3 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <small className="fw-bold text-secondary">
                        <i className="fas fa-info-circle me-1"></i>
                        Grading Scale:
                      </small>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => navigate('/resultsheetmaker/grading-settings')}
                      >
                        <i className="fas fa-edit me-1"></i>
                        Edit Grades
                      </button>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {gradingSettings.grades.map((grade, index) => (
                        <span key={index} className={`badge bg-${grade.color}`}>
                          {grade.grade} ({grade.minMarks}-{grade.maxMarks} marks)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {(!gradingSettings || !gradingSettings.grades || gradingSettings.grades.length === 0) && (
                  <div className="mt-3 p-3 bg-warning bg-opacity-10 rounded">
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-warning">
                        <i className="fas fa-exclamation-triangle me-1"></i>
                        No grading scale configured for this examination.
                      </small>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => navigate('/resultsheetmaker/grading-settings')}
                      >
                        <i className="fas fa-plus me-1"></i>
                        Configure Now
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            {marksLocked && !isEditMode ? (
              <button
                className="btn btn-warning text-white w-100 py-3 fw-bold"
                onClick={handleEnableEdit}
                disabled={students.length === 0}
              >
                <i className="fas fa-edit me-2"></i>
                EDIT MARKS
              </button>
            ) : (
              <div className="d-flex gap-2">
                {isEditMode && (
                  <button
                    className="btn btn-secondary w-50 py-3 fw-bold"
                    onClick={handleCancelEdit}
                    disabled={loading}
                  >
                    <i className="fas fa-times me-2"></i>
                    CANCEL
                  </button>
                )}
                <button
                  className={`btn btn-info text-white py-3 fw-bold ${isEditMode ? 'w-50' : 'w-100'}`}
                  onClick={handleSaveMarks}
                  disabled={loading || students.length === 0}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      SAVING...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      {marksLocked ? 'UPDATE MARKS' : 'SAVE MARKS'}
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MarksEntryNew;

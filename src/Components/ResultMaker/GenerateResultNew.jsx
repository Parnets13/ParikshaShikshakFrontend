import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getClasses,
  getTermsByClass,
  getAssessmentTypesByClassAndTerm,
  getSubjectsByClass,
  getStudentsByClass,
  getStudentMarksNew,
  getGradingSettings,
  getExamSettings
} from '../../services/resultMakerService';

const GenerateResultNew = () => {
  const navigate = useNavigate();
  
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [terms, setTerms] = useState([]);
  const [examinationsByTerm, setExaminationsByTerm] = useState({});
  const [selectedExaminations, setSelectedExaminations] = useState([]);
  
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [allMarks, setAllMarks] = useState([]);
  const [gradingSettings, setGradingSettings] = useState({});
  const [examSettings, setExamSettings] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [generatingResult, setGeneratingResult] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [studentResults, setStudentResults] = useState([]);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadTermsAndExaminations();
      loadSubjects();
      loadStudents();
      loadExamSettings();
    }
  }, [selectedClass]);

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

  const loadTermsAndExaminations = async () => {
    try {
      setLoading(true);
      const termsResponse = await getTermsByClass(selectedClass._id);
      
      if (termsResponse.success && termsResponse.data) {
        setTerms(termsResponse.data);
        
        // Fetch examinations for each term
        const examsMap = {};
        for (const term of termsResponse.data) {
          const examsResponse = await getAssessmentTypesByClassAndTerm(selectedClass._id, term._id);
          if (examsResponse.success && examsResponse.data) {
            examsMap[term._id] = examsResponse.data;
          }
        }
        setExaminationsByTerm(examsMap);
      }
    } catch (error) {
      console.error('Error loading terms and examinations:', error);
    } finally {
      setLoading(false);
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

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleClassChange = (e) => {
    const classId = e.target.value;
    const classObj = classes.find(c => c._id === classId);
    setSelectedClass(classObj);
    setSelectedExaminations([]);
    setShowResults(false);
  };

  const handleExaminationToggle = (termId, examId) => {
    const examKey = `${termId}-${examId}`;
    
    if (selectedExaminations.some(e => e.key === examKey)) {
      setSelectedExaminations(selectedExaminations.filter(e => e.key !== examKey));
    } else {
      const term = terms.find(t => t._id === termId);
      const exam = examinationsByTerm[termId]?.find(e => e._id === examId);
      
      setSelectedExaminations([
        ...selectedExaminations,
        {
          key: examKey,
          termId,
          termName: term.termName,
          examId,
          examName: exam.assessmentName
        }
      ]);
    }
  };

  const handleSelectAll = () => {
    const allExams = [];
    terms.forEach(term => {
      const exams = examinationsByTerm[term._id] || [];
      exams.forEach(exam => {
        allExams.push({
          key: `${term._id}-${exam._id}`,
          termId: term._id,
          termName: term.termName,
          examId: exam._id,
          examName: exam.assessmentName
        });
      });
    });
    setSelectedExaminations(allExams);
  };

  const handleDeselectAll = () => {
    setSelectedExaminations([]);
  };

  const isExaminationSelected = (termId, examId) => {
    const examKey = `${termId}-${examId}`;
    return selectedExaminations.some(e => e.key === examKey);
  };

  const handleGenerateResult = async () => {
    if (selectedExaminations.length === 0) {
      alert('Please select at least one examination');
      return;
    }

    setGeneratingResult(true);
    try {
      // Fetch all marks for selected examinations
      const marksPromises = [];
      const gradingPromises = [];
      
      selectedExaminations.forEach(exam => {
        subjects.forEach(subject => {
          marksPromises.push(
            getStudentMarksNew({
              classId: selectedClass._id,
              termId: exam.termId,
              examinationId: exam.examId,
              subjectId: subject._id
            }).then(response => ({
              termId: exam.termId,
              examId: exam.examId,
              subjectId: subject._id,
              data: response.success ? response.data : []
            }))
          );
          
          gradingPromises.push(
            getGradingSettings({
              classId: selectedClass._id,
              termId: exam.termId,
              examinationId: exam.examId
            }).then(response => ({
              termId: exam.termId,
              examId: exam.examId,
              data: response.success && response.data.length > 0 ? response.data[0] : null
            }))
          );
        });
      });

      const marksResults = await Promise.all(marksPromises);
      const gradingResults = await Promise.all(gradingPromises);
      
      // Organize grading settings
      const gradingMap = {};
      gradingResults.forEach(result => {
        const key = `${result.termId}-${result.examId}`;
        if (result.data) {
          gradingMap[key] = result.data;
        }
      });
      setGradingSettings(gradingMap);
      
      // Get max marks from exam settings - New structure: termSettings[termId][examId][subjectId]
      const maxMarksMap = {};
      if (examSettings) {
        selectedExaminations.forEach(exam => {
          subjects.forEach(subject => {
            const key = `${exam.termId}-${exam.examId}-${subject._id}`;
            
            // Get max marks from new nested structure
            if (examSettings.termSettings && 
                examSettings.termSettings[exam.termId] &&
                examSettings.termSettings[exam.termId][exam.examId] &&
                examSettings.termSettings[exam.termId][exam.examId][subject._id]) {
              maxMarksMap[key] = examSettings.termSettings[exam.termId][exam.examId][subject._id];
            } else {
              // Default to 100 if not found
              maxMarksMap[key] = 100;
            }
          });
        });
      }
      
      // Calculate results for each student
      const results = students.map(student => {
        const studentMarks = {};
        let totalMarksObtained = 0;
        let totalMaxMarks = 0;
        
        selectedExaminations.forEach(exam => {
          studentMarks[exam.key] = {};
          
          subjects.forEach(subject => {
            const markData = marksResults.find(
              m => m.termId === exam.termId && 
                   m.examId === exam.examId && 
                   m.subjectId === subject._id
            );
            
            const maxMarksKey = `${exam.termId}-${exam.examId}-${subject._id}`;
            const maxMarks = maxMarksMap[maxMarksKey] || 100;
            
            if (markData && markData.data) {
              const studentMark = markData.data.find(m => {
                const studentIdKey = typeof m.studentId === 'object' ? m.studentId._id : m.studentId;
                return studentIdKey === student._id;
              });
              
              if (studentMark) {
                studentMarks[exam.key][subject._id] = {
                  obtained: studentMark.marks,
                  max: maxMarks
                };
                totalMarksObtained += parseFloat(studentMark.marks) || 0;
                totalMaxMarks += parseFloat(maxMarks);
              } else {
                studentMarks[exam.key][subject._id] = {
                  obtained: 0,
                  max: maxMarks
                };
                totalMaxMarks += parseFloat(maxMarks);
              }
            } else {
              studentMarks[exam.key][subject._id] = {
                obtained: 0,
                max: maxMarks
              };
              totalMaxMarks += parseFloat(maxMarks);
            }
          });
        });
        
        const percentage = totalMaxMarks > 0 ? (totalMarksObtained / totalMaxMarks) * 100 : 0;
        
        return {
          student,
          marks: studentMarks,
          totalMarksObtained,
          totalMaxMarks,
          percentage: percentage.toFixed(2)
        };
      });
      
      setStudentResults(results);
      setShowResults(true);
      
    } catch (error) {
      console.error('Error generating results:', error);
      alert('Error generating results. Please try again.');
    } finally {
      setGeneratingResult(false);
    }
  };

  const handlePrintResults = () => {
    window.print();
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.className || '';
  };

  const getGradeForMarks = (marks, termId, examId) => {
    const key = `${termId}-${examId}`;
    const grading = gradingSettings[key];
    
    if (!grading || !grading.grades) return '-';
    
    const marksValue = parseFloat(marks);
    for (const grade of grading.grades) {
      if (marksValue >= grade.minMarks && marksValue <= grade.maxMarks) {
        return grade.grade;
      }
    }
    return '-';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center no-print">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Generate Result</h5>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-question-circle fs-4"></i>
        </button>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom no-print">
        <h5 className="mb-0 fw-semibold">Select Examinations for Result</h5>
      </div>

      {!showResults ? (
        <div className="container py-4 no-print" style={{ maxWidth: '1000px' }}>
          {/* Class Selection */}
          <div className="mb-4">
            <label className="form-label fw-semibold text-info">Select Class</label>
            <select
              className="form-select form-select-lg"
              value={selectedClass?._id || ''}
              onChange={handleClassChange}
              style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
            >
              <option value="">Select Class</option>
              {classes.map((classItem) => (
                <option key={classItem._id} value={classItem._id}>
                  {getClassDisplayName(classItem)}
                </option>
              ))}
            </select>
          </div>

          {selectedClass && (
            <>
              {/* Select All / Deselect All */}
              <div className="mb-3 d-flex gap-2">
                <button
                  className="btn btn-sm btn-success"
                  onClick={handleSelectAll}
                  disabled={loading}
                >
                  <i className="fas fa-check-double me-1"></i>
                  Select All
                </button>
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={handleDeselectAll}
                  disabled={loading}
                >
                  <i className="fas fa-times me-1"></i>
                  Deselect All
                </button>
                <span className="badge bg-info align-self-center ms-auto" style={{ fontSize: '14px', padding: '8px 12px' }}>
                  {selectedExaminations.length} Selected
                </span>
              </div>

              {/* Examinations by Term */}
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-info" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-2 text-muted">Loading examinations...</p>
                </div>
              ) : terms.length === 0 ? (
                <div className="alert alert-warning">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  No terms found for this class. Please configure terms in Class Settings.
                </div>
              ) : (
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  {terms.map((term) => {
                    const exams = examinationsByTerm[term._id] || [];
                    
                    return (
                      <div key={term._id} className="mb-4">
                        <h6 className="text-secondary mb-3">
                          <i className="fas fa-calendar-alt me-2"></i>
                          {term.termName}
                        </h6>
                        
                        {exams.length === 0 ? (
                          <p className="text-muted small mb-0">No examinations found for this term</p>
                        ) : (
                          <div className="row g-2">
                            {exams.map((exam) => (
                              <div key={exam._id} className="col-md-6">
                                <div
                                  className={`border rounded p-3 cursor-pointer ${
                                    isExaminationSelected(term._id, exam._id)
                                      ? 'border-info bg-info bg-opacity-10'
                                      : 'border-secondary'
                                  }`}
                                  onClick={() => handleExaminationToggle(term._id, exam._id)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      checked={isExaminationSelected(term._id, exam._id)}
                                      onChange={() => {}}
                                      style={{ pointerEvents: 'none' }}
                                    />
                                    <label className="form-check-label fw-semibold">
                                      {exam.assessmentName}
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Selected Examinations Summary */}
              {selectedExaminations.length > 0 && (
                <div className="alert alert-info mb-4">
                  <strong>Selected Examinations:</strong>
                  <div className="d-flex flex-wrap gap-2 mt-2">
                    {selectedExaminations.map((exam) => (
                      <span key={exam.key} className="badge bg-info">
                        {exam.termName} - {exam.examName}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Generate Button */}
              <button
                className="btn btn-info text-white w-100 py-3 fw-bold"
                onClick={handleGenerateResult}
                disabled={selectedExaminations.length === 0 || generatingResult}
              >
                {generatingResult ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    GENERATING...
                  </>
                ) : (
                  <>
                    <i className="fas fa-chart-bar me-2"></i>
                    GENERATE RESULT
                  </>
                )}
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="container py-4" style={{ maxWidth: '1200px' }}>
          {/* Print Button */}
          <div className="mb-3 no-print">
            <button
              className="btn btn-success me-2"
              onClick={handlePrintResults}
            >
              <i className="fas fa-print me-2"></i>
              Print Results
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setShowResults(false)}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Back to Selection
            </button>
          </div>

          {/* Student Result Cards */}
          {studentResults.map((result, index) => {
            // Determine examination title
            let examinationTitle = '';
            if (selectedExaminations.length === 1) {
              // Single examination selected
              examinationTitle = selectedExaminations[0].examName;
            } else {
              // Multiple examinations - check if all from same term
              const uniqueTerms = [...new Set(selectedExaminations.map(e => e.termId))];
              if (uniqueTerms.length === 1) {
                // All from same term
                examinationTitle = `Final Marks - ${selectedExaminations[0].termName}`;
              } else {
                // Multiple terms
                examinationTitle = 'Final Marks - Annual';
              }
            }
            
            return (
              <div key={result.student._id} className="bg-white rounded shadow-sm p-4 mb-4 page-break">
                <h5 className="text-center text-info mb-3">STUDENT RESULT CARD</h5>
                
                {/* Student Info */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Name:</strong> {result.student.studentName}
                  </div>
                  <div className="col-md-6">
                    <strong>Admission No:</strong> {result.student.admissionNo}
                  </div>
                  <div className="col-md-6">
                    <strong>Class:</strong> {getClassDisplayName(selectedClass)}
                  </div>
                  <div className="col-md-6">
                    <strong>Examination:</strong> {examinationTitle}
                  </div>
                </div>


              {/* Marks Table */}
              <table className="table table-bordered">
                <thead className="table-light">
                  <tr>
                    <th rowSpan="2" className="align-middle">Subject</th>
                    {selectedExaminations.map((exam) => (
                      <th key={exam.key} colSpan="2" className="text-center">
                        {exam.termName}<br/>{exam.examName}
                      </th>
                    ))}
                    <th rowSpan="2" className="text-center align-middle">Total</th>
                    <th rowSpan="2" className="text-center align-middle">Max Marks</th>
                  </tr>
                  <tr>
                    {selectedExaminations.map((exam) => (
                      <React.Fragment key={exam.key}>
                        <th className="text-center">Marks</th>
                        <th className="text-center">Grade</th>
                      </React.Fragment>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subjects.map((subject) => {
                    let subjectTotalObtained = 0;
                    let subjectTotalMax = 0;
                    
                    return (
                      <tr key={subject._id}>
                        <td>{subject.subjectName}</td>
                        {selectedExaminations.map((exam) => {
                          const markData = result.marks[exam.key]?.[subject._id] || { obtained: 0, max: 100 };
                          subjectTotalObtained += parseFloat(markData.obtained);
                          subjectTotalMax += parseFloat(markData.max);
                          const grade = getGradeForMarks(markData.obtained, exam.termId, exam.examId);
                          
                          return (
                            <React.Fragment key={exam.key}>
                              <td className="text-center">
                                {markData.obtained} / {markData.max}
                              </td>
                              <td className="text-center">
                                {grade !== '-' ? (
                                  <span className="badge bg-secondary">{grade}</span>
                                ) : (
                                  '-'
                                )}
                              </td>
                            </React.Fragment>
                          );
                        })}
                        <td className="text-center fw-bold">{subjectTotalObtained.toFixed(2)}</td>
                        <td className="text-center fw-bold">{subjectTotalMax.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="table-info">
                    <td className="fw-bold">TOTAL</td>
                    {selectedExaminations.map((exam) => {
                      let examTotalObtained = 0;
                      let examTotalMax = 0;
                      subjects.forEach(subject => {
                        const markData = result.marks[exam.key]?.[subject._id] || { obtained: 0, max: 100 };
                        examTotalObtained += parseFloat(markData.obtained);
                        examTotalMax += parseFloat(markData.max);
                      });
                      return (
                        <React.Fragment key={exam.key}>
                          <td className="text-center fw-bold">
                            {examTotalObtained.toFixed(2)} / {examTotalMax.toFixed(2)}
                          </td>
                          <td className="text-center fw-bold">-</td>
                        </React.Fragment>
                      );
                    })}
                    <td className="text-center fw-bold">{result.totalMarksObtained.toFixed(2)}</td>
                    <td className="text-center fw-bold">{result.totalMaxMarks.toFixed(2)}</td>
                  </tr>
                  <tr className="table-success">
                    <td colSpan={selectedExaminations.length * 2 + 2} className="text-end fw-bold">
                      Percentage:
                    </td>
                    <td className="text-center fw-bold">{result.percentage}%</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          );
          })}
        </div>
      )}

      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          .page-break {
            page-break-after: always;
          }
          body {
            background: white !important;
          }
        }
      `}</style>
    </div>
  );
};

export default GenerateResultNew;

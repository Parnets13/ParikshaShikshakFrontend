import React, { useState, useEffect } from 'react';
import {
  getStudentsByClass,
  getStudentLBAReport,
  getLBAMarks,
  getAllLBAChapters
} from '../../services/resultMakerService';

const LBAReports = ({ selectedClassId, selectedClassNumber, lbaSettings, calculateGrade, terms, subjects }) => {
  const [reportType, setReportType] = useState('student'); // student, class, subject, allSubjects
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [students, setStudents] = useState([]);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getMaxMarks = () => {
    if (lbaSettings) {
      return {
        oral: lbaSettings.oralMarks,
        written: lbaSettings.writtenMarks,
        total: lbaSettings.totalMarks
      };
    }
    // Default fallback
    if (selectedClassNumber >= 1 && selectedClassNumber <= 4) {
      return { oral: 5, written: 10, total: 15 };
    } else if (selectedClassNumber >= 5 && selectedClassNumber <= 10) {
      return { oral: 5, written: 15, total: 20 };
    }
    return { oral: 5, written: 10, total: 15 };
  };

  useEffect(() => {
    if (selectedClassId) {
      fetchStudents();
    }
  }, [selectedClassId]);

  const fetchStudents = async () => {
    try {
      const response = await getStudentsByClass(selectedClassId);
      if (response.success && response.data) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleGenerateStudentReport = async () => {
    if (!selectedStudent) {
      alert('Please select a student');
      return;
    }

    setLoading(true);
    try {
      const response = await getStudentLBAReport(selectedStudent, selectedTerm);
      if (response.success) {
        setReportData(response.data);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Error generating report');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClassReport = async () => {
    if (!selectedTerm) {
      alert('Please select a term');
      return;
    }

    setLoading(true);
    try {
      // Fetch all students' marks for the selected term
      const allMarks = [];
      for (const student of students) {
        const response = await getStudentLBAReport(student._id, selectedTerm);
        if (response.success) {
          // Calculate total chapters and collect all grades
          let totalChapters = 0;
          const allGrades = [];
          
          Object.values(response.data).forEach(chapters => {
            totalChapters += chapters.length;
            chapters.forEach(chapter => {
              if (chapter.grade) {
                allGrades.push(chapter.grade);
              }
            });
          });
          
          // Count grade distribution
          const gradeCount = {
            'A+': allGrades.filter(g => g === 'A+').length,
            'A': allGrades.filter(g => g === 'A').length,
            'B+': allGrades.filter(g => g === 'B+').length,
            'B': allGrades.filter(g => g === 'B').length,
            'C': allGrades.filter(g => g === 'C').length
          };
          
          allMarks.push({
            studentId: student._id,
            studentName: student.studentName,
            admissionNo: student.admissionNo,
            subjects: response.data,
            totalChapters,
            gradeCount
          });
        }
      }
      setReportData(allMarks);
    } catch (error) {
      console.error('Error generating class report:', error);
      alert('Error generating class report');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateSubjectReport = async () => {
    if (!selectedTerm || !selectedSubject) {
      alert('Please select term and subject');
      return;
    }

    setLoading(true);
    try {
      // Get all chapters for this subject
      const chaptersResponse = await getAllLBAChapters(selectedClassId, selectedTerm, selectedSubject);
      const chapters = chaptersResponse.success ? chaptersResponse.data : [];

      // Get marks for all students in this subject
      const subjectReport = [];
      for (const student of students) {
        const studentMarks = [];
        let totalOral = 0;
        let totalWritten = 0;
        let totalMarks = 0;
        const grades = [];

        for (const chapter of chapters) {
          const marksResponse = await getLBAMarks(selectedClassId, chapter._id, student._id);
          if (marksResponse.success && marksResponse.data.length > 0) {
            const mark = marksResponse.data[0];
            studentMarks.push({
              chapterNumber: chapter.chapterNumber,
              chapterName: chapter.chapterName,
              oral: mark.oralMarks,
              written: mark.writtenMarks,
              total: mark.totalMarks,
              grade: mark.grade || ''
            });
            totalOral += mark.oralMarks;
            totalWritten += mark.writtenMarks;
            totalMarks += mark.totalMarks;
            if (mark.grade) {
              grades.push(mark.grade);
            }
          }
        }

        if (studentMarks.length > 0) {
          subjectReport.push({
            studentId: student._id,
            studentName: student.studentName,
            admissionNo: student.admissionNo,
            chapters: studentMarks,
            totalOral,
            totalWritten,
            totalMarks,
            grades
          });
        }
      }

      setReportData({ chapters, students: subjectReport });
    } catch (error) {
      console.error('Error generating subject report:', error);
      alert('Error generating subject report');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAllSubjectsReport = async () => {
    if (!selectedTerm) {
      alert('Please select a term');
      return;
    }

    if (!subjects || subjects.length === 0) {
      alert('No subjects found for this class');
      return;
    }

    setLoading(true);
    try {
      const allSubjectsData = [];

      // For each subject, get all chapters and student marks
      for (const subject of subjects) {
        const chaptersResponse = await getAllLBAChapters(selectedClassId, selectedTerm, subject.subjectName);
        const chapters = chaptersResponse.success ? chaptersResponse.data : [];

        const subjectStudentData = [];
        
        for (const student of students) {
          let totalOral = 0;
          let totalWritten = 0;
          let totalMarks = 0;
          let chapterCount = 0;
          const grades = [];

          for (const chapter of chapters) {
            const marksResponse = await getLBAMarks(selectedClassId, chapter._id, student._id);
            if (marksResponse.success && marksResponse.data.length > 0) {
              const mark = marksResponse.data[0];
              totalOral += mark.oralMarks;
              totalWritten += mark.writtenMarks;
              totalMarks += mark.totalMarks;
              chapterCount++;
              if (mark.grade) {
                grades.push(mark.grade);
              }
            }
          }

          if (chapterCount > 0) {
            subjectStudentData.push({
              studentId: student._id,
              studentName: student.studentName,
              admissionNo: student.admissionNo,
              totalOral,
              totalWritten,
              totalMarks,
              chapterCount,
              grades
            });
          }
        }

        if (subjectStudentData.length > 0) {
          allSubjectsData.push({
            subjectName: subject.subjectName,
            students: subjectStudentData,
            totalChapters: chapters.length
          });
        }
      }

      setReportData(allSubjectsData);
    } catch (error) {
      console.error('Error generating all subjects report:', error);
      alert('Error generating all subjects report');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!selectedClassId) {
    return (
      <div className="alert alert-warning">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Please select a class first
      </div>
    );
  }

  const maxMarks = getMaxMarks();

  return (
    <div>
      {/* Report Type Selection */}
      <div className="mb-4 mx-auto" style={{ maxWidth: '900px' }}>
        <label className="form-label text-info fw-semibold">Select Report Type</label>
        <div className="btn-group w-100" role="group">
          <button
            type="button"
            className={`btn ${reportType === 'student' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => {
              setReportType('student');
              setReportData(null);
            }}
          >
            <i className="fas fa-user me-2"></i>
            Individual Student
          </button>
          <button
            type="button"
            className={`btn ${reportType === 'class' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => {
              setReportType('class');
              setReportData(null);
            }}
          >
            <i className="fas fa-users me-2"></i>
            Class Summary
          </button>
          <button
            type="button"
            className={`btn ${reportType === 'subject' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => {
              setReportType('subject');
              setReportData(null);
            }}
          >
            <i className="fas fa-book me-2"></i>
            Single Subject
          </button>
          <button
            type="button"
            className={`btn ${reportType === 'allSubjects' ? 'btn-info' : 'btn-outline-info'}`}
            onClick={() => {
              setReportType('allSubjects');
              setReportData(null);
            }}
          >
            <i className="fas fa-books me-2"></i>
            All Subjects
          </button>
        </div>
      </div>

      {/* Individual Student Report */}
      {reportType === 'student' && (
        <div>
          <div className="row g-3 mx-auto mb-4" style={{ maxWidth: '800px' }}>
            <div className="col-md-4">
              <label className="form-label">Select Term</label>
              <select
                className="form-select"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="">All Terms</option>
                {terms && terms.map((term) => (
                  <option key={term._id || term.termName} value={term.termName}>{term.termName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <label className="form-label">Select Student</label>
              <select
                className="form-select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.studentName} ({student.admissionNo})
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                className="btn btn-info text-white w-100"
                onClick={handleGenerateStudentReport}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Generate'}
              </button>
            </div>
          </div>

          {reportData && (
            <div className="card mx-auto" style={{ maxWidth: '900px' }} id="report-print">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <i className="fas fa-file-alt me-2"></i>
                  LBA Report - {students.find(s => s._id === selectedStudent)?.studentName}
                </h6>
                <button className="btn btn-light btn-sm" onClick={handlePrint}>
                  <i className="fas fa-print me-2"></i>
                  Print
                </button>
              </div>
              <div className="card-body">
                {Object.keys(reportData).length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="fas fa-inbox fa-3x mb-3"></i>
                    <p>No LBA marks found for this student</p>
                  </div>
                ) : (
                  Object.entries(reportData).map(([subject, chapters]) => (
                    <div key={subject} className="mb-4">
                      <h6 className="fw-bold text-info border-bottom pb-2">{subject}</h6>
                      <table className="table table-sm table-bordered">
                        <thead className="table-light">
                          <tr>
                            <th style={{ width: '80px' }}>Ch. No.</th>
                            <th>Chapter Name</th>
                            <th style={{ width: '80px' }} className="text-center">Oral</th>
                            <th style={{ width: '80px' }} className="text-center">Written</th>
                            <th style={{ width: '80px' }} className="text-center">Total</th>
                            <th style={{ width: '80px' }} className="text-center">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {chapters.map((chapter, index) => (
                            <tr key={index}>
                              <td className="text-center">{chapter.chapterNumber}</td>
                              <td>{chapter.chapterName}</td>
                              <td className="text-center">{chapter.oralMarks}/{chapter.maxOralMarks}</td>
                              <td className="text-center">{chapter.writtenMarks}/{chapter.maxWrittenMarks}</td>
                              <td className="text-center fw-bold">{chapter.totalMarks}/{chapter.maxTotalMarks}</td>
                              <td className="text-center">
                                {chapter.grade ? (
                                  <span className={`badge ${
                                    chapter.grade === 'A+' ? 'bg-success' :
                                    chapter.grade === 'A' ? 'bg-primary' :
                                    chapter.grade === 'B+' ? 'bg-info' :
                                    chapter.grade === 'B' ? 'bg-warning text-dark' :
                                    'bg-secondary'
                                  }`}>
                                    {chapter.grade}
                                  </span>
                                ) : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Class-wise Summary Report */}
      {reportType === 'class' && (
        <div>
          <div className="row g-3 mx-auto mb-4" style={{ maxWidth: '600px' }}>
            <div className="col-md-8">
              <label className="form-label">Select Term</label>
              <select
                className="form-select"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="">Select Term</option>
                {terms && terms.map((term) => (
                  <option key={term._id || term.termName} value={term.termName}>{term.termName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button
                className="btn btn-info text-white w-100"
                onClick={handleGenerateClassReport}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Generate'}
              </button>
            </div>
          </div>

          {reportData && (
            <div className="card mx-auto" style={{ maxWidth: '1000px' }} id="report-print">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <i className="fas fa-file-alt me-2"></i>
                  Class-wise LBA Summary - {selectedTerm}
                </h6>
                <button className="btn btn-light btn-sm" onClick={handlePrint}>
                  <i className="fas fa-print me-2"></i>
                  Print
                </button>
              </div>
              <div className="card-body">
                {reportData.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="fas fa-inbox fa-3x mb-3"></i>
                    <p>No LBA marks found for this class</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th style={{ width: '50px' }}>Sr.</th>
                          <th>Student Name</th>
                          <th style={{ width: '120px' }}>Admission No</th>
                          <th className="text-center">Subjects</th>
                          <th className="text-center">Chapters</th>
                          <th className="text-center">Grade Distribution</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.map((student, index) => (
                          <tr key={student.studentId}>
                            <td className="text-center">{index + 1}</td>
                            <td>{student.studentName}</td>
                            <td>{student.admissionNo}</td>
                            <td className="text-center">{Object.keys(student.subjects).length}</td>
                            <td className="text-center">{student.totalChapters}</td>
                            <td className="text-center">
                              <div className="d-flex gap-1 justify-content-center flex-wrap">
                                {student.gradeCount['A+'] > 0 && (
                                  <span className="badge bg-success" style={{ fontSize: '10px' }}>
                                    A+: {student.gradeCount['A+']}
                                  </span>
                                )}
                                {student.gradeCount['A'] > 0 && (
                                  <span className="badge bg-primary" style={{ fontSize: '10px' }}>
                                    A: {student.gradeCount['A']}
                                  </span>
                                )}
                                {student.gradeCount['B+'] > 0 && (
                                  <span className="badge bg-info" style={{ fontSize: '10px' }}>
                                    B+: {student.gradeCount['B+']}
                                  </span>
                                )}
                                {student.gradeCount['B'] > 0 && (
                                  <span className="badge bg-warning text-dark" style={{ fontSize: '10px' }}>
                                    B: {student.gradeCount['B']}
                                  </span>
                                )}
                                {student.gradeCount['C'] > 0 && (
                                  <span className="badge bg-secondary" style={{ fontSize: '10px' }}>
                                    C: {student.gradeCount['C']}
                                  </span>
                                )}
                                {student.totalChapters === 0 && <span className="text-muted">-</span>}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Subject-wise Performance Report */}
      {reportType === 'subject' && (
        <div>
          <div className="row g-3 mx-auto mb-4" style={{ maxWidth: '800px' }}>
            <div className="col-md-4">
              <label className="form-label">Select Term</label>
              <select
                className="form-select"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="">Select Term</option>
                {terms && terms.map((term) => (
                  <option key={term._id || term.termName} value={term.termName}>{term.termName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-5">
              <label className="form-label">Select Subject</label>
              <select
                className="form-select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjects && subjects.map((subject, index) => (
                  <option key={subject._id || index} value={subject.subjectName}>
                    {subject.subjectName}
                  </option>
                ))}
              </select>
              {(!subjects || subjects.length === 0) && (
                <small className="text-muted d-block mt-2">
                  <i className="fas fa-info-circle me-1"></i>
                  No subjects found. Please add subjects in Class Settings.
                </small>
              )}
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button
                className="btn btn-info text-white w-100"
                onClick={handleGenerateSubjectReport}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Generate'}
              </button>
            </div>
          </div>

          {reportData && (
            <div className="card mx-auto" style={{ maxWidth: '1100px' }} id="report-print">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <i className="fas fa-file-alt me-2"></i>
                  Subject Performance - {selectedSubject} ({selectedTerm})
                </h6>
                <button className="btn btn-light btn-sm" onClick={handlePrint}>
                  <i className="fas fa-print me-2"></i>
                  Print
                </button>
              </div>
              <div className="card-body">
                {reportData.students.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="fas fa-inbox fa-3x mb-3"></i>
                    <p>No marks found for this subject</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th rowSpan="2" style={{ width: '50px' }} className="align-middle">Sr.</th>
                          <th rowSpan="2" className="align-middle">Student Name</th>
                          <th rowSpan="2" style={{ width: '120px' }} className="align-middle">Admission No</th>
                          {reportData.chapters.map((chapter) => (
                            <th key={chapter._id} colSpan="4" className="text-center">
                              Ch. {chapter.chapterNumber}
                            </th>
                          ))}
                          <th colSpan="3" className="text-center bg-light">Total</th>
                        </tr>
                        <tr>
                          {reportData.chapters.map((chapter) => (
                            <React.Fragment key={chapter._id}>
                              <th className="text-center" style={{ width: '50px' }}>O</th>
                              <th className="text-center" style={{ width: '50px' }}>W</th>
                              <th className="text-center" style={{ width: '50px' }}>T</th>
                              <th className="text-center" style={{ width: '50px' }}>G</th>
                            </React.Fragment>
                          ))}
                          <th className="text-center bg-light" style={{ width: '70px' }}>O</th>
                          <th className="text-center bg-light" style={{ width: '70px' }}>W</th>
                          <th className="text-center bg-light" style={{ width: '70px' }}>T</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reportData.students.map((student, index) => (
                          <tr key={student.studentId}>
                            <td className="text-center">{index + 1}</td>
                            <td>{student.studentName}</td>
                            <td>{student.admissionNo}</td>
                            {reportData.chapters.map((chapter) => {
                              const chapterMark = student.chapters.find(c => c.chapterNumber === chapter.chapterNumber);
                              return (
                                <React.Fragment key={chapter._id}>
                                  <td className="text-center">{chapterMark?.oral || '-'}</td>
                                  <td className="text-center">{chapterMark?.written || '-'}</td>
                                  <td className="text-center fw-bold">{chapterMark?.total || '-'}</td>
                                  <td className="text-center">
                                    {chapterMark?.grade ? (
                                      <span className={`badge ${
                                        chapterMark.grade === 'A+' ? 'bg-success' :
                                        chapterMark.grade === 'A' ? 'bg-primary' :
                                        chapterMark.grade === 'B+' ? 'bg-info' :
                                        chapterMark.grade === 'B' ? 'bg-warning text-dark' :
                                        'bg-secondary'
                                      }`} style={{ fontSize: '10px' }}>
                                        {chapterMark.grade}
                                      </span>
                                    ) : '-'}
                                  </td>
                                </React.Fragment>
                              );
                            })}
                            <td className="text-center bg-light fw-bold">{student.totalOral}</td>
                            <td className="text-center bg-light fw-bold">{student.totalWritten}</td>
                            <td className="text-center bg-light fw-bold">{student.totalMarks}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="mt-2">
                      <small className="text-muted">O = Oral, W = Written, T = Total, G = Grade</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* All Subjects Report */}
      {reportType === 'allSubjects' && (
        <div>
          <div className="row g-3 mx-auto mb-4" style={{ maxWidth: '600px' }}>
            <div className="col-md-8">
              <label className="form-label">Select Term</label>
              <select
                className="form-select"
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
              >
                <option value="">Select Term</option>
                {terms && terms.map((term) => (
                  <option key={term._id || term.termName} value={term.termName}>{term.termName}</option>
                ))}
              </select>
            </div>
            <div className="col-md-4 d-flex align-items-end">
              <button
                className="btn btn-info text-white w-100"
                onClick={handleGenerateAllSubjectsReport}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Generate'}
              </button>
            </div>
          </div>

          {reportData && (
            <div className="card mx-auto" style={{ maxWidth: '1200px' }} id="report-print">
              <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
                <h6 className="mb-0">
                  <i className="fas fa-file-alt me-2"></i>
                  All Subjects Performance Report - {selectedTerm}
                </h6>
                <button className="btn btn-light btn-sm" onClick={handlePrint}>
                  <i className="fas fa-print me-2"></i>
                  Print
                </button>
              </div>
              <div className="card-body">
                {reportData.length === 0 ? (
                  <div className="text-center text-muted py-4">
                    <i className="fas fa-inbox fa-3x mb-3"></i>
                    <p>No marks found for any subject</p>
                  </div>
                ) : (
                  <div>
                    {reportData.map((subjectData, subjectIndex) => (
                      <div key={subjectIndex} className="mb-5">
                        <h5 className="fw-bold text-info border-bottom pb-2 mb-3">
                          <i className="fas fa-book me-2"></i>
                          {subjectData.subjectName}
                          <small className="text-muted ms-2">({subjectData.totalChapters} chapters)</small>
                        </h5>
                        
                        <div className="table-responsive">
                          <table className="table table-sm table-bordered table-hover">
                            <thead className="table-light">
                              <tr>
                                <th style={{ width: '50px' }}>Sr.</th>
                                <th>Student Name</th>
                                <th style={{ width: '120px' }}>Admission No</th>
                                <th className="text-center" style={{ width: '100px' }}>Chapters</th>
                                <th className="text-center" style={{ width: '100px' }}>Total Oral</th>
                                <th className="text-center" style={{ width: '100px' }}>Total Written</th>
                                <th className="text-center" style={{ width: '100px' }}>Total Marks</th>
                                <th className="text-center" style={{ width: '150px' }}>Grades</th>
                              </tr>
                            </thead>
                            <tbody>
                              {subjectData.students.map((student, index) => (
                                <tr key={student.studentId}>
                                  <td className="text-center">{index + 1}</td>
                                  <td>{student.studentName}</td>
                                  <td>{student.admissionNo}</td>
                                  <td className="text-center">{student.chapterCount}</td>
                                  <td className="text-center">{student.totalOral}</td>
                                  <td className="text-center">{student.totalWritten}</td>
                                  <td className="text-center fw-bold">{student.totalMarks}</td>
                                  <td className="text-center">
                                    <div className="d-flex gap-1 justify-content-center flex-wrap">
                                      {student.grades.length > 0 ? (
                                        <>
                                          {['A+', 'A', 'B+', 'B', 'C'].map(grade => {
                                            const count = student.grades.filter(g => g === grade).length;
                                            if (count > 0) {
                                              return (
                                                <span 
                                                  key={grade}
                                                  className={`badge ${
                                                    grade === 'A+' ? 'bg-success' :
                                                    grade === 'A' ? 'bg-primary' :
                                                    grade === 'B+' ? 'bg-info' :
                                                    grade === 'B' ? 'bg-warning text-dark' :
                                                    'bg-secondary'
                                                  }`} 
                                                  style={{ fontSize: '10px' }}
                                                >
                                                  {grade}: {count}
                                                </span>
                                              );
                                            }
                                            return null;
                                          })}
                                        </>
                                      ) : (
                                        <span className="text-muted">-</span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {/* Summary Section */}
                    <div className="alert alert-info mt-4">
                      <h6 className="fw-bold mb-3">
                        <i className="fas fa-chart-bar me-2"></i>
                        Summary
                      </h6>
                      <div className="row">
                        <div className="col-md-4">
                          <strong>Total Subjects:</strong> {reportData.length}
                        </div>
                        <div className="col-md-4">
                          <strong>Total Students:</strong> {students.length}
                        </div>
                        <div className="col-md-4">
                          <strong>Term:</strong> {selectedTerm}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Generating report...</p>
        </div>
      )}

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #report-print, #report-print * {
            visibility: visible;
          }
          #report-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .btn {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LBAReports;

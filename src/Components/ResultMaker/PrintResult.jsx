import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  getSchoolProfile,
  getStudentsByClass,
  getAllSubjects,
  getAllAssessmentTypes,
  getMarks
} from '../../services/resultMakerService';

const PrintResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { classId, termId, options } = location.state || {};

  const [schoolProfile, setSchoolProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assessmentTypes, setAssessmentTypes] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!classId || !termId) {
      alert('Invalid data. Please select class and term again.');
      navigate('/resultsheetmaker/generate-result');
      return;
    }
    fetchAllData();
  }, [classId, termId]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const schoolResponse = await getSchoolProfile();
      if (schoolResponse.success) setSchoolProfile(schoolResponse.data);

      const studentsResponse = await getStudentsByClass(classId);
      if (studentsResponse.success) setStudents(studentsResponse.data);

      const subjectsResponse = await getAllSubjects(classId);
      if (subjectsResponse.success) setSubjects(subjectsResponse.data);

      const assessmentResponse = await getAllAssessmentTypes(classId);
      if (assessmentResponse.success) setAssessmentTypes(assessmentResponse.data);

      const marks = {};
      if (subjectsResponse.success && assessmentResponse.success) {
        for (const subject of subjectsResponse.data) {
          for (const assessment of assessmentResponse.data) {
            try {
              const marksResponse = await getMarks(classId, termId, assessment._id, subject._id);
              if (marksResponse.success) {
                marks[`${assessment._id}_${subject._id}`] = marksResponse.data;
              }
            } catch (error) {
              console.log(`No marks for ${subject.subjectName} - ${assessment.assessmentName}`);
            }
          }
        }
      }
      setMarksData(marks);
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const getStudentMarks = (studentId, assessmentId, subjectId) => {
    const key = `${assessmentId}_${subjectId}`;
    const marksArray = marksData[key] || [];
    const studentMark = marksArray.find(m => m.studentId && m.studentId._id === studentId);
    return studentMark ? studentMark.marks : 0;
  };

  const getMaxMarks = (assessmentId, subjectId) => {
    const key = `${assessmentId}_${subjectId}`;
    const marksArray = marksData[key] || [];
    return marksArray.length > 0 && marksArray[0].maxMarks ? marksArray[0].maxMarks : 0;
  };

  const getSubjectTotal = (studentId, subjectId) => {
    let total = 0;
    assessmentTypes.forEach(assessment => {
      total += parseFloat(getStudentMarks(studentId, assessment._id, subjectId)) || 0;
    });
    return total;
  };

  const getGrandTotal = (studentId) => {
    let total = 0;
    subjects.forEach(subject => {
      total += getSubjectTotal(studentId, subject._id);
    });
    return total;
  };

  const getGrandMaxTotal = () => {
    let total = 0;
    subjects.forEach(subject => {
      assessmentTypes.forEach(assessment => {
        total += parseFloat(getMaxMarks(assessment._id, subject._id)) || 0;
      });
    });
    return total;
  };

  const getPercentage = (studentId) => {
    const obtained = getGrandTotal(studentId);
    const max = getGrandMaxTotal();
    return max > 0 ? ((obtained / max) * 100).toFixed(2) : '0.00';
  };

  const getGrade = (percentage) => {
    const p = parseFloat(percentage);
    if (p >= 91) return 'A1';
    if (p >= 81) return 'A2';
    if (p >= 71) return 'B1';
    if (p >= 61) return 'B2';
    if (p >= 51) return 'C1';
    if (p >= 41) return 'C2';
    if (p >= 33) return 'D';
    return 'E';
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-info"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="d-print-none bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={() => navigate('/resultsheetmaker/generate-result')}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Result Sheet Preview</h5>
        <button className="btn btn-light" onClick={() => window.print()}>
          <i className="fas fa-print me-2"></i>Print
        </button>
      </div>

      {students.map((student, idx) => (
        <div key={student._id} style={{
          width: '210mm',
          minHeight: '297mm',
          padding: '10mm',
          margin: '0 auto',
          backgroundColor: 'white',
          boxSizing: 'border-box',
          pageBreakAfter: idx < students.length - 1 ? 'always' : 'auto',
          border: options?.printBorder ? '2px solid #000' : 'none'
        }}>
          {/* Top Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', marginBottom: '5px' }}>
            <div>Affiliation No.: {schoolProfile?.affiliationNumber || '000000'}</div>
            <div>website: {schoolProfile?.schoolWebsite || 'www.yourschool.com'}</div>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ width: '50px' }}>
              {schoolProfile?.schoolLogo && (
                <img src={schoolProfile.schoolLogo} alt="Logo" style={{ width: '45px', height: '45px', objectFit: 'contain' }} />
              )}
            </div>
            <div style={{ textAlign: 'center', flex: 1 }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>{schoolProfile?.schoolName || 'KIRAN'}</h2>
              <p style={{ margin: 0, fontSize: '10px' }}>{schoolProfile?.schoolAddress || 'Bangalore'}</p>
              <p style={{ margin: '2px 0', fontSize: '9px' }}>Contact No.: {schoolProfile?.mobileNumber || '9740016075'}</p>
              <h4 style={{ margin: '5px 0', fontSize: '13px', fontWeight: 'bold' }}>Report Card</h4>
              <div style={{ display: 'inline-block', border: '1px solid #000', borderRadius: '12px', padding: '2px 12px', fontSize: '10px' }}>
                Academic Session: {schoolProfile?.selectedSession || '2025-2026'}
              </div>
            </div>
            <div style={{ width: '50px' }}></div>
          </div>

          {/* Student Info */}
          <div style={{ border: '2px solid #000', borderRadius: '8px', padding: '8px', marginBottom: '10px', fontSize: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: '3px' }}><strong>Student's Name</strong> : {student.studentName}</div>
                <div style={{ marginBottom: '3px' }}><strong>Class</strong> : IV - Demo</div>
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ marginBottom: '3px' }}><strong>Regn. No.</strong> : {student.admissionNo}</div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
              <div style={{ flex: 1 }}>
                <div><strong>Father's Name</strong> : {student.fatherName}</div>
              </div>
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div><strong>Mother's Name</strong> : {student.motherName}</div>
              </div>
            </div>
          </div>

          {/* Marks Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '8px', border: '1px solid #000' }}>
            <thead>
              <tr style={{ backgroundColor: '#e8e8e8' }}>
                <th rowSpan="2" style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>Scholastic Areas</th>
                <th colSpan={assessmentTypes.length + 2} style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>
                  Term 1 (100 Marks)
                </th>
              </tr>
              <tr style={{ backgroundColor: '#e8e8e8' }}>
                <th style={{ border: '1px solid #000', padding: '4px' }}>Main Subjects</th>
                {assessmentTypes.map(a => (
                  <th key={a._id} style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>
                    {a.assessmentName} ({getMaxMarks(a._id, subjects[0]?._id)})
                  </th>
                ))}
                <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>Total (100)</th>
                <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map(subject => {
                const subTotal = getSubjectTotal(student._id, subject._id);
                const subMax = assessmentTypes.reduce((sum, a) => sum + (parseFloat(getMaxMarks(a._id, subject._id)) || 0), 0);
                const subPerc = subMax > 0 ? ((subTotal / subMax) * 100).toFixed(2) : 0;
                const subGrade = getGrade(subPerc);
                
                return (
                  <tr key={subject._id}>
                    <td style={{ border: '1px solid #000', padding: '4px' }}>{subject.subjectName}</td>
                    <td style={{ border: '1px solid #000', padding: '4px' }}></td>
                    {assessmentTypes.map(a => (
                      <td key={a._id} style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>
                        {getStudentMarks(student._id, a._id, subject._id)}
                      </td>
                    ))}
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontWeight: 'bold' }}>{subTotal}</td>
                    <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', fontWeight: 'bold' }}>{subGrade}</td>
                  </tr>
                );
              })}
              <tr style={{ fontWeight: 'bold' }}>
                <td colSpan="2" style={{ border: '1px solid #000', padding: '4px' }}>Total</td>
                {assessmentTypes.map((_, i) => <td key={i} style={{ border: '1px solid #000', padding: '4px' }}></td>)}
                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{getGrandTotal(student._id)}</td>
                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>{getPercentage(student._id)}%</td>
              </tr>
            </tbody>
          </table>

          {/* Co-Scholastic */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '8px', border: '1px solid #000' }}>
            <thead>
              <tr style={{ backgroundColor: '#e8e8e8' }}>
                <th colSpan="2" style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>
                  Co-Scholastic Areas [3 Point Grade Scale (A-C)]
                </th>
                <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', width: '60px' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" style={{ border: '1px solid #000', padding: '4px' }}>Art Education</td>
                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>A</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ border: '1px solid #000', padding: '4px' }}>Games</td>
                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>A</td>
              </tr>
            </tbody>
          </table>

          {/* Discipline */}
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '9px', marginBottom: '8px', border: '1px solid #000' }}>
            <thead>
              <tr style={{ backgroundColor: '#e8e8e8' }}>
                <th colSpan="2" style={{ border: '1px solid #000', padding: '4px', textAlign: 'left' }}>
                  Discipline [3 Point Grade Scale (A-C)]
                </th>
                <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', width: '60px' }}>Grade</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan="2" style={{ border: '1px solid #000', padding: '4px' }}>Discipline</td>
                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>A</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold' }}>Attendance</td>
                <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>112 / 120</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold' }}>Remarks</td>
                <td style={{ border: '1px solid #000', padding: '4px' }}>Can do better</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ border: '1px solid #000', padding: '4px', fontWeight: 'bold' }}>Result</td>
                <td style={{ border: '1px solid #000', padding: '4px' }}>Passed</td>
              </tr>
            </tbody>
          </table>

          {/* Signatures */}
          {options?.printSignature && (
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '9px' }}>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div>Date:</div>
                <div style={{ borderTop: '1px solid #000', marginTop: '30px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}></div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div>Class Teacher</div>
                <div style={{ borderTop: '1px solid #000', marginTop: '30px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}></div>
              </div>
              <div style={{ textAlign: 'center', flex: 1 }}>
                <div>Principal</div>
                {schoolProfile?.principalSignature && (
                  <img src={schoolProfile.principalSignature} alt="Sig" style={{ width: '60px', height: '25px', objectFit: 'contain' }} />
                )}
                <div style={{ borderTop: '1px solid #000', marginTop: '5px', width: '80%', marginLeft: 'auto', marginRight: 'auto' }}></div>
              </div>
            </div>
          )}

          {/* Grading Scale - AFTER Signatures */}
          <div style={{ marginTop: '15px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '7px', border: '1px solid #000' }}>
              <thead>
                <tr style={{ backgroundColor: '#e8e8e8' }}>
                  <th colSpan="8" style={{ border: '1px solid #000', padding: '3px', textAlign: 'center' }}>
                    Scholastic Areas [Grading on 8 Point Scale]
                  </th>
                </tr>
                <tr style={{ backgroundColor: '#e8e8e8' }}>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>Marks Range</th>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>91-100</th>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>81-90</th>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>71-80</th>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>61-70</th>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>51-60</th>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>41-50</th>
                  <th style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>33-40</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center', fontWeight: 'bold' }}>Grade</td>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>A1</td>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>A2</td>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>B1</td>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>B2</td>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>C1</td>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>C2</td>
                  <td style={{ border: '1px solid #000', padding: '2px', textAlign: 'center' }}>D</td>
                </tr>
              </tbody>
            </table>
            <div style={{ fontSize: '7px', marginTop: '3px', textAlign: 'center' }}>
              *A: Person Assessment, *B: Written Assessment, *C: Multiple Assessment, *D: Practical Assessment, *E: Notebook Submission
            </div>
          </div>
        </div>
      ))}

      <style>{`
        @media print {
          body { margin: 0; padding: 0; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  );
};
export default PrintResult;

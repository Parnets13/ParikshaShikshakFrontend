import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStudentsByClass } from '../../services/resultMakerService';

const PrintAdmitCards = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedClass,
    selectedTerm,
    selectedAssessment,
    examSchedule,
    classData,
    printWatermark,
    printSignature,
    backgroundColor,
    schoolProfile
  } = location.state || {};

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (classData?._id) {
      fetchStudents(classData._id);
    }
  }, [classData]);

  useEffect(() => {
    // Debug: Log school profile data
    console.log('School Profile:', schoolProfile);
    console.log('Print Signature:', printSignature);
    console.log('Principal Signature:', schoolProfile?.principalSignature);
  }, [schoolProfile, printSignature]);

  const fetchStudents = async (classId) => {
    try {
      setLoading(true);
      const response = await getStudentsByClass(classId);
      if (response.success) {
        setStudents(response.data);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error loading students');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/admit-card-settings', {
      state: { selectedClass, selectedTerm, selectedAssessment, examSchedule, classData }
    });
  };

  const getClassDisplayName = () => {
    if (classData?.className && classData?.section) {
      return `${classData.className} - ${classData.section}`;
    }
    return selectedClass || '';
  };

  const convertTo12Hour = (time24) => {
    if (!time24) return 'N/A';
    
    const [hours, minutes] = time24.split(':');
    let hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    
    hour = hour % 12;
    hour = hour ? hour : 12; // 0 should be 12
    
    return `${hour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Print Controls - Hidden during print */}
      <div className="no-print bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Admit Cards Preview</h5>
        <button className="btn btn-light" onClick={handlePrint}>
          <i className="fas fa-print me-2"></i>
          Print All
        </button>
      </div>

      <div className="no-print alert alert-info m-3">
        <strong>Total Students:</strong> {students.length} | 
        <strong className="ms-3">Class:</strong> {getClassDisplayName()} | 
        <strong className="ms-3">Term:</strong> {selectedTerm} | 
        <strong className="ms-3">Assessment:</strong> {selectedAssessment}
      </div>

      {/* Admit Cards */}
      <div className="admit-cards-container">
        {students.map((student, index) => (
          <div
            key={student._id}
            className="admit-card-page"
            style={{
              backgroundColor: backgroundColor || '#ffffff',
              pageBreakAfter: 'always',
              padding: '15px',
              position: 'relative',
              border: '2px solid #17a2b8',
              margin: '10px auto',
              maxWidth: '210mm',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}
          >
            {/* Watermark */}
            {printWatermark && schoolProfile?.schoolLogo && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.05,
                  zIndex: 0
                }}
              >
                <img
                  src={schoolProfile.schoolLogo.startsWith('data:') ? schoolProfile.schoolLogo : `http://localhost:8774${schoolProfile.schoolLogo}`}
                  alt="Watermark"
                  style={{ width: '300px', height: '300px', objectFit: 'contain' }}
                />
              </div>
            )}

            {/* Content */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Header */}
              <div className="text-center mb-2 pb-2" style={{ borderBottom: '2px solid #17a2b8' }}>
                {schoolProfile?.schoolLogo && (
                  <div className="mb-1">
                    <img
                      src={schoolProfile.schoolLogo.startsWith('data:') ? schoolProfile.schoolLogo : `http://localhost:8774${schoolProfile.schoolLogo}`}
                      alt="School Logo"
                      style={{ 
                        width: '60px', 
                        height: '60px', 
                        objectFit: 'contain',
                        border: '2px solid #17a2b8',
                        borderRadius: '50%',
                        padding: '3px',
                        backgroundColor: '#fff'
                      }}
                    />
                  </div>
                )}
                <h2 className="fw-bold mb-1" style={{ color: '#17a2b8', fontSize: '18px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {schoolProfile?.schoolName || 'School Name'}
                </h2>
                <p className="mb-0" style={{ fontSize: '10px', color: '#6c757d', lineHeight: '1.3' }}>{schoolProfile?.schoolAddress || 'School Address'}</p>
                <p className="mb-0" style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.3' }}>
                  <strong>Board:</strong> {schoolProfile?.educationalBoard || 'N/A'}
                  {schoolProfile?.affiliationNumber && (
                    <> | <strong>Affiliation:</strong> {schoolProfile.affiliationNumber}</>
                  )}
                </p>
                <p className="mb-0" style={{ fontSize: '9px', color: '#6c757d', lineHeight: '1.3' }}>
                  <i className="fas fa-phone me-1"></i> {schoolProfile?.mobileNumber || 'N/A'}
                  {schoolProfile?.schoolWebsite && (
                    <> | <i className="fas fa-globe me-1"></i> {schoolProfile.schoolWebsite}</>
                  )}
                </p>
              </div>

              {/* Admit Card Title */}
              <div className="text-center mb-2 py-2" style={{ backgroundColor: '#17a2b8', color: 'white', borderRadius: '4px' }}>
                <h3 className="fw-bold mb-1" style={{ fontSize: '16px', letterSpacing: '1px' }}>ADMIT CARD</h3>
                <h5 className="mb-0" style={{ fontSize: '11px' }}>{selectedTerm} - {selectedAssessment} | Session: {schoolProfile?.selectedSession || '2025-2026'}</h5>
              </div>

              {/* Student Details */}
              <div className="mb-2">
                <table className="table table-bordered mb-0" style={{ border: '1px solid #17a2b8', fontSize: '10px' }}>
                  <tbody>
                    <tr style={{ backgroundColor: '#e7f6f8' }}>
                      <td className="fw-bold" style={{ width: '35%', padding: '4px 8px', fontSize: '10px', color: '#17a2b8' }}>
                        <i className="fas fa-id-card me-1"></i>Admission No
                      </td>
                      <td style={{ padding: '4px 8px', fontSize: '10px', fontWeight: '600' }}>{student.admissionNo || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold" style={{ padding: '4px 8px', fontSize: '10px', color: '#17a2b8' }}>
                        <i className="fas fa-user me-1"></i>Student Name
                      </td>
                      <td style={{ padding: '4px 8px', fontSize: '10px', fontWeight: '600', textTransform: 'uppercase' }}>
                        {student.studentName || 'N/A'}
                      </td>
                    </tr>
                    <tr style={{ backgroundColor: '#e7f6f8' }}>
                      <td className="fw-bold" style={{ padding: '4px 8px', fontSize: '10px', color: '#17a2b8' }}>
                        <i className="fas fa-user-tie me-1"></i>Father's Name
                      </td>
                      <td style={{ padding: '4px 8px', fontSize: '10px' }}>{student.fatherName || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold" style={{ padding: '4px 8px', fontSize: '10px', color: '#17a2b8' }}>
                        <i className="fas fa-user-friends me-1"></i>Mother's Name
                      </td>
                      <td style={{ padding: '4px 8px', fontSize: '10px' }}>{student.motherName || 'N/A'}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#e7f6f8' }}>
                      <td className="fw-bold" style={{ padding: '4px 8px', fontSize: '10px', color: '#17a2b8' }}>
                        <i className="fas fa-graduation-cap me-1"></i>Class
                      </td>
                      <td style={{ padding: '4px 8px', fontSize: '10px', fontWeight: '600' }}>{getClassDisplayName()}</td>
                    </tr>
                    <tr>
                      <td className="fw-bold" style={{ padding: '4px 8px', fontSize: '10px', color: '#17a2b8' }}>
                        <i className="fas fa-mobile-alt me-1"></i>Mobile Number
                      </td>
                      <td style={{ padding: '4px 8px', fontSize: '10px' }}>{student.mobileNo || 'N/A'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Exam Schedule */}
              <div className="mb-2">
                <h6 className="fw-bold mb-1" style={{ color: '#17a2b8', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid #17a2b8', paddingBottom: '3px' }}>
                  <i className="fas fa-calendar-alt me-1"></i>Examination Schedule
                </h6>
                <table className="table table-bordered mb-0" style={{ border: '1px solid #17a2b8', fontSize: '9px' }}>
                  <thead style={{ backgroundColor: '#17a2b8', color: 'white' }}>
                    <tr>
                      <th style={{ width: '4%', padding: '4px 2px', fontSize: '9px', textAlign: 'center' }}>Sr</th>
                      <th style={{ width: '16%', padding: '4px', fontSize: '9px' }}>Subject</th>
                      <th style={{ width: '16%', padding: '4px', fontSize: '9px' }}>Date</th>
                      <th style={{ width: '10%', padding: '4px', fontSize: '9px' }}>Start</th>
                      <th style={{ width: '10%', padding: '4px', fontSize: '9px' }}>End</th>
                      <th style={{ width: '13%', padding: '4px', fontSize: '9px' }}>Venue</th>
                      <th style={{ width: '11%', padding: '4px', fontSize: '9px' }}>Room</th>
                      <th style={{ width: '20%', padding: '4px', fontSize: '9px', textAlign: 'center' }}>Invigilator Sign</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examSchedule && examSchedule.length > 0 ? (
                      examSchedule.map((exam, idx) => (
                        <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? '#f8f9fa' : 'white' }}>
                          <td className="text-center" style={{ padding: '4px 2px', fontSize: '9px', fontWeight: '600' }}>{exam.sr}</td>
                          <td style={{ padding: '4px', fontSize: '9px', fontWeight: '600' }}>{exam.subject}</td>
                          <td style={{ padding: '4px', fontSize: '8px', lineHeight: '1.2' }}>
                            {exam.examDate ? new Date(exam.examDate).toLocaleDateString('en-IN', { 
                              day: '2-digit',
                              month: 'short', 
                              year: 'numeric'
                            }) : 'N/A'}
                          </td>
                          <td style={{ padding: '4px', fontSize: '8px' }}>{convertTo12Hour(exam.startTime)}</td>
                          <td style={{ padding: '4px', fontSize: '8px' }}>{convertTo12Hour(exam.endTime)}</td>
                          <td style={{ padding: '4px', fontSize: '8px', fontWeight: '600' }}>{exam.venue || 'N/A'}</td>
                          <td style={{ padding: '4px', fontSize: '8px', fontWeight: '600' }}>{exam.classroom || 'N/A'}</td>
                          <td style={{ padding: '4px', minHeight: '25px' }}></td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8" className="text-center" style={{ padding: '10px', color: '#6c757d', fontSize: '9px' }}>
                          No exam schedule available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Instructions */}
              <div className="mb-2 p-2" style={{ backgroundColor: '#f8f9fa', border: '1px dashed #dee2e6', borderRadius: '4px' }}>
                <h6 className="fw-bold mb-1" style={{ color: '#495057', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  <i className="fas fa-info-circle me-1" style={{ color: '#17a2b8' }}></i>
                  Important Instructions
                </h6>
                <div className="row">
                  <div className="col-md-6">
                    <ul className="mb-0" style={{ fontSize: '8px', lineHeight: '1.4', color: '#6c757d', paddingLeft: '15px', marginBottom: '0' }}>
                      <li>Bring this admit card to the examination hall.</li>
                      <li>Reach 30 minutes before the exam.</li>
                    </ul>
                  </div>
                  <div className="col-md-6">
                    <ul className="mb-0" style={{ fontSize: '8px', lineHeight: '1.4', color: '#6c757d', paddingLeft: '15px', marginBottom: '0' }}>
                      <li>Mobile phones are strictly prohibited.</li>
                      <li>Carry your own stationery items.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="row mt-2 pt-2" style={{ borderTop: '1px dashed #dee2e6' }}>
                <div className="col-6">
                  <div className="text-center">
                    <div style={{ height: '35px' }}></div>
                    <div style={{ borderTop: '1px solid #000', paddingTop: '3px', marginTop: '5px', fontSize: '9px', fontWeight: '600', color: '#495057' }}>
                      <i className="fas fa-pen me-1" style={{ color: '#17a2b8', fontSize: '8px' }}></i>
                      Student Signature
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    {printSignature && schoolProfile?.principalSignature ? (
                      <div>
                        <img
                          src={schoolProfile.principalSignature.startsWith('data:') ? schoolProfile.principalSignature : `http://localhost:8774${schoolProfile.principalSignature}`}
                          alt="Principal Signature"
                          style={{ width: '100px', height: '35px', objectFit: 'contain', marginBottom: '2px' }}
                        />
                        <div style={{ borderTop: '1px solid #000', paddingTop: '3px', fontSize: '9px', fontWeight: '600', color: '#495057' }}>
                          <i className="fas fa-stamp me-1" style={{ color: '#17a2b8', fontSize: '8px' }}></i>
                          Principal Signature
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ height: '35px' }}></div>
                        <div style={{ borderTop: '1px solid #000', paddingTop: '3px', marginTop: '5px', fontSize: '9px', fontWeight: '600', color: '#495057' }}>
                          <i className="fas fa-stamp me-1" style={{ color: '#17a2b8', fontSize: '8px' }}></i>
                          Principal Signature
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Signature Section */}
              <div className="row mt-5 pt-4" style={{ borderTop: '2px dashed #dee2e6' }}>
                <div className="col-6">
                  <div className="text-center">
                    <div style={{ height: '60px' }}></div>
                    <div style={{ borderTop: '2px solid #000', paddingTop: '8px', marginTop: '10px', fontSize: '13px', fontWeight: '600', color: '#495057' }}>
                      <i className="fas fa-pen me-2" style={{ color: '#17a2b8' }}></i>
                      Student Signature
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    {printSignature && schoolProfile?.principalSignature ? (
                      <div>
                        <img
                          src={schoolProfile.principalSignature.startsWith('data:') ? schoolProfile.principalSignature : `http://localhost:8774${schoolProfile.principalSignature}`}
                          alt="Principal Signature"
                          style={{ width: '150px', height: '60px', objectFit: 'contain', marginBottom: '5px' }}
                        />
                        <div style={{ borderTop: '2px solid #000', paddingTop: '8px', fontSize: '13px', fontWeight: '600', color: '#495057' }}>
                          <i className="fas fa-stamp me-2" style={{ color: '#17a2b8' }}></i>
                          Principal Signature
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div style={{ height: '60px' }}></div>
                        <div style={{ borderTop: '2px solid #000', paddingTop: '8px', marginTop: '10px', fontSize: '13px', fontWeight: '600', color: '#495057' }}>
                          <i className="fas fa-stamp me-2" style={{ color: '#17a2b8' }}></i>
                          Principal Signature
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print {
            display: none !important;
          }
          
          .admit-card-page {
            page-break-after: always;
            margin: 0 !important;
            padding: 10mm !important;
            box-shadow: none !important;
            border: 2px solid #17a2b8 !important;
            width: 210mm !important;
            max-width: 210mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
          }
          
          .admit-card-page:last-child {
            page-break-after: auto;
          }
          
          body {
            margin: 0;
            padding: 0;
          }
          
          @page {
            size: A4;
            margin: 0;
          }
          
          table {
            page-break-inside: avoid;
          }
          
          tr {
            page-break-inside: avoid;
          }
        }
        
        @media screen {
          .admit-card-page {
            animation: fadeIn 0.5s ease-in;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
      `}</style>
    </div>
  );
};

export default PrintAdmitCards;

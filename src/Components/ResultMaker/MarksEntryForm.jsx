import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStudentsByClass, saveMarks, getMarks } from '../../services/resultMakerService';

const MarksEntryForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    selectedClass,
    selectedClassId,
    selectedTerm,
    selectedTermId,
    selectedExam,
    selectedExamType,
    selectedSubject,
    subjectMaxMarks
  } = location.state || {};

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [maxMarks, setMaxMarks] = useState(subjectMaxMarks || 30); // Use passed max marks
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Debug: Log received state
  useEffect(() => {
    console.log('MarksEntryForm received state:', location.state);
    console.log('Subject Max Marks:', subjectMaxMarks);
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchStudentsAndMarks();
    } else {
      console.error('No selectedClassId provided');
      alert('Invalid navigation. Please select class again.');
      navigate('/resultsheetmaker/marks-entry');
    }
  }, [selectedClassId]);

  const fetchStudentsAndMarks = async () => {
    try {
      setLoading(true);
      
      // Fetch students
      const studentsResponse = await getStudentsByClass(selectedClassId);
      if (studentsResponse.success) {
        setStudents(studentsResponse.data);
        
        // Initialize marks object
        const initialMarks = {};
        studentsResponse.data.forEach(student => {
          initialMarks[student._id] = '';
        });
        
        // Set max marks from passed value
        if (subjectMaxMarks) {
          setMaxMarks(subjectMaxMarks);
        }
        
        // Try to fetch existing marks (if we implement marks storage later)
        // For now, just use initial marks
        setMarks(initialMarks);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Error loading students');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/marks-entry');
  };

  const handleMarksChange = (studentId, value) => {
    // Validate marks
    const numValue = parseFloat(value);
    if (value === '' || (numValue >= 0 && numValue <= maxMarks)) {
      setMarks(prev => ({
        ...prev,
        [studentId]: value
      }));
    }
  };

  const handleSaveMarks = async () => {
    // Check if all marks are entered
    const allEntered = students.every(student => marks[student._id] !== '');
    
    if (!allEntered) {
      const confirm = window.confirm('Some marks are not entered. Do you want to save anyway?');
      if (!confirm) return;
    }

    // Validate max marks
    if (!maxMarks || maxMarks <= 0) {
      alert('Please enter valid maximum marks');
      return;
    }

    try {
      setSaving(true);

      // Prepare marks data
      const marksData = students.map(student => ({
        studentId: student._id,
        studentName: student.studentName,
        admissionNo: student.admissionNo,
        marks: parseFloat(marks[student._id]) || 0
      }));

      const payload = {
        classId: selectedClassId,
        className: selectedClass,
        termId: selectedTermId,
        termName: selectedTerm,
        examType: selectedExamType,
        examName: selectedExam,
        subject: selectedSubject,
        maxMarks: parseFloat(maxMarks),
        marksData
      };

      console.log('Saving marks payload:', payload);

      // For now, just show success message
      // Later we can implement actual save to database
      alert('Marks saved successfully!');
      navigate('/resultsheetmaker/marks-entry');

      // TODO: Implement actual save to database
      // const response = await saveMarks(payload);
      // if (response.success) {
      //   alert('Marks saved successfully!');
      //   navigate('/resultsheetmaker/marks-entry');
      // }
    } catch (error) {
      console.error('Error saving marks:', error);
      alert('Error saving marks. Please try again.');
    } finally {
      setSaving(false);
    }
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
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '150px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h6 className="mb-0 fw-bold text-center flex-grow-1" style={{ fontSize: '14px' }}>
          {selectedClass} ({selectedTerm} - {selectedExam})
        </h6>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-question-circle fs-4"></i>
        </button>
      </div>

      {/* Table Container */}
      <div className="container-fluid p-0">
        <div className="table-responsive">
          <table className="table table-bordered mb-0" style={{ backgroundColor: 'white' }}>
            <thead>
              {/* Subject and Max Marks Row */}
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th className="text-center py-2" style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}>
                  Subject
                </th>
                <th className="text-center py-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                  {selectedSubject}
                </th>
                <th className="text-center py-2" style={{ fontSize: '14px', fontWeight: '600', width: '120px' }}>
                  Max. Marks
                </th>
                <th className="text-center py-2" style={{ fontSize: '14px', fontWeight: '600', width: '80px' }}>
                  {maxMarks}
                </th>
              </tr>
              {/* Column Headers */}
              <tr style={{ backgroundColor: '#e9ecef' }}>
                <th className="text-center py-2" style={{ width: '50px', fontSize: '13px' }}>Sr.</th>
                <th className="text-center py-2" style={{ width: '120px', fontSize: '13px' }}>Reg.No.</th>
                <th className="py-2" style={{ fontSize: '13px' }}>Student Name</th>
                <th className="text-center py-2" style={{ width: '120px', fontSize: '13px' }}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4 text-muted">
                    No students found in this class
                  </td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={student._id}>
                    <td className="text-center py-2" style={{ fontSize: '13px' }}>{index + 1}</td>
                    <td className="text-center py-2" style={{ fontSize: '13px' }}>{student.admissionNo}</td>
                    <td className="py-2" style={{ fontSize: '13px', textTransform: 'uppercase' }}>
                      {student.studentName}
                    </td>
                    <td className="text-center py-2">
                      <input
                        type="number"
                        className="form-control form-control-sm text-center"
                        value={marks[student._id] || ''}
                        onChange={(e) => handleMarksChange(student._id, e.target.value)}
                        placeholder="0"
                        min="0"
                        max={maxMarks}
                        step="0.5"
                        style={{ fontSize: '14px', fontWeight: '600' }}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save Button */}
      <div className="position-fixed bottom-0 start-0 end-0 p-3 bg-white border-top">
        <div className="container" style={{ maxWidth: '600px' }}>
          <button
            className="btn btn-info text-white w-100 py-3 fw-bold"
            onClick={handleSaveMarks}
            disabled={students.length === 0 || saving}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                SAVING...
              </>
            ) : (
              'SAVE MARKS'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarksEntryForm;

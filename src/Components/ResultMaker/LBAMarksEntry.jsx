import React, { useState, useEffect } from 'react';
import {
  getAllLBAChapters,
  getStudentsByClass,
  getLBAMarks,
  saveLBAMarks
} from '../../services/resultMakerService';

const LBAMarksEntry = ({ selectedClassId, selectedClassNumber, lbaSettings, calculateGrade, terms, subjects }) => {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [chapters, setChapters] = useState([]);
  const [students, setStudents] = useState([]);
  const [marksData, setMarksData] = useState({});
  const [existingMarks, setExistingMarks] = useState({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState({});  // Track edit mode per student
  const [marksLocked, setMarksLocked] = useState({}); // Track locked state per student

  // Get max marks based on settings or defaults
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

  const maxMarks = getMaxMarks();

  useEffect(() => {
    if (selectedClassId && selectedTerm && selectedSubject) {
      fetchChapters();
    }
  }, [selectedClassId, selectedTerm, selectedSubject]);

  useEffect(() => {
    if (selectedClassId && selectedChapter) {
      fetchStudentsAndMarks();
    }
  }, [selectedClassId, selectedChapter]);

  const fetchChapters = async () => {
    try {
      const response = await getAllLBAChapters(selectedClassId, selectedTerm, selectedSubject);
      if (response.success && response.data) {
        setChapters(response.data);
      }
    } catch (error) {
      console.error('Error fetching chapters:', error);
    }
  };

  const fetchStudentsAndMarks = async () => {
    setLoading(true);
    try {
      // Fetch students
      const studentsResponse = await getStudentsByClass(selectedClassId);
      if (studentsResponse.success && studentsResponse.data) {
        setStudents(studentsResponse.data);

        // Fetch existing marks
        const marksResponse = await getLBAMarks(selectedClassId, selectedChapter, null);
        if (marksResponse.success && marksResponse.data) {
          const marksMap = {};
          const lockedMap = {};
          marksResponse.data.forEach(mark => {
            const studentId = mark.studentId._id || mark.studentId;
            marksMap[studentId] = {
              oral: mark.oralMarks,
              written: mark.writtenMarks,
              grade: mark.grade || '' // Store grade from database
            };
            // Lock marks if they exist
            lockedMap[studentId] = true;
          });
          setMarksData(marksMap);
          setExistingMarks(marksMap);
          setMarksLocked(lockedMap);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error loading students and marks');
    } finally {
      setLoading(false);
    }
  };

  const handleMarksChange = (studentId, field, value) => {
    // Only allow changes if not locked or in edit mode
    if (marksLocked[studentId] && !editMode[studentId]) {
      return;
    }
    
    const numValue = value === '' ? '' : parseFloat(value);
    
    setMarksData(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: numValue
      }
    }));
  };

  const handleEnableEdit = (studentId) => {
    setEditMode(prev => ({ ...prev, [studentId]: true }));
  };

  const handleCancelEdit = (studentId) => {
    setEditMode(prev => ({ ...prev, [studentId]: false }));
    // Restore original marks
    if (existingMarks[studentId]) {
      setMarksData(prev => ({
        ...prev,
        [studentId]: { ...existingMarks[studentId] }
      }));
    }
  };

  const calculateTotal = (studentId) => {
    const marks = marksData[studentId] || {};
    const oral = marks.oral || 0;
    const written = marks.written || 0;
    return oral + written;
  };

  const getGrade = (studentId) => {
    const marks = marksData[studentId];
    if (!marks) return '-';
    
    // If grade exists in database, use it
    if (marks.grade) {
      return marks.grade;
    }
    
    // Otherwise calculate it using the function from parent
    const total = calculateTotal(studentId);
    if (total > 0 && calculateGrade) {
      return calculateGrade(total);
    }
    
    return '-';
  };

  const getGradeBadgeColor = (grade) => {
    if (!grade || grade === '-') return 'bg-secondary';
    if (grade === 'A+') return 'bg-success';
    if (grade === 'A') return 'bg-primary';
    if (grade === 'B+') return 'bg-info';
    if (grade === 'B') return 'bg-warning';
    return 'bg-secondary';
  };

  const validateMarks = (studentId) => {
    const marks = marksData[studentId];
    if (!marks) return true;

    const oral = marks.oral || 0;
    const written = marks.written || 0;

    if (oral < 0 || oral > maxMarks.oral) return false;
    if (written < 0 || written > maxMarks.written) return false;

    return true;
  };

  const handleSaveMarks = async (studentId, studentName) => {
    const marks = marksData[studentId];
    
    if (!marks || (marks.oral === '' && marks.written === '')) {
      alert('Please enter marks for oral and written');
      return;
    }

    if (!validateMarks(studentId)) {
      alert(`Invalid marks! Oral: 0-${maxMarks.oral}, Written: 0-${maxMarks.written}`);
      return;
    }

    setSaving(true);
    try {
      const response = await saveLBAMarks({
        classId: selectedClassId,
        studentId: studentId,
        chapterId: selectedChapter,
        term: selectedTerm,
        subject: selectedSubject,
        oralMarks: marks.oral || 0,
        writtenMarks: marks.written || 0,
        classNumber: selectedClassNumber
      });

      if (response.success) {
        // Update marksData with the grade from backend
        setMarksData(prev => ({
          ...prev,
          [studentId]: {
            ...prev[studentId],
            grade: response.data.grade
          }
        }));
        // Update existing marks and lock
        setExistingMarks(prev => ({
          ...prev,
          [studentId]: {
            ...marksData[studentId],
            grade: response.data.grade
          }
        }));
        setMarksLocked(prev => ({ ...prev, [studentId]: true }));
        setEditMode(prev => ({ ...prev, [studentId]: false }));
        alert(`Marks saved successfully for ${studentName}`);
      }
    } catch (error) {
      console.error('Error saving marks:', error);
      alert(error.response?.data?.message || 'Error saving marks');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveAllMarks = async () => {
    if (!window.confirm('Save marks for all students?')) {
      return;
    }

    setSaving(true);
    let successCount = 0;
    let errorCount = 0;

    for (const student of students) {
      const marks = marksData[student._id];
      if (!marks || (marks.oral === '' && marks.written === '')) {
        continue; // Skip students without marks
      }

      if (!validateMarks(student._id)) {
        errorCount++;
        continue;
      }

      try {
        const response = await saveLBAMarks({
          classId: selectedClassId,
          studentId: student._id,
          chapterId: selectedChapter,
          term: selectedTerm,
          subject: selectedSubject,
          oralMarks: marks.oral || 0,
          writtenMarks: marks.written || 0,
          classNumber: selectedClassNumber
        });
        
        // Update marksData with the grade from backend
        if (response.success && response.data.grade) {
          setMarksData(prev => ({
            ...prev,
            [student._id]: {
              ...prev[student._id],
              grade: response.data.grade
            }
          }));
        }
        
        successCount++;
      } catch (error) {
        console.error(`Error saving marks for ${student.studentName}:`, error);
        errorCount++;
      }
    }

    setSaving(false);
    alert(`Marks saved!\nSuccess: ${successCount}\nErrors: ${errorCount}`);
  };

  if (!selectedClassId) {
    return (
      <div className="alert alert-warning">
        <i className="fas fa-exclamation-triangle me-2"></i>
        Please select a class first
      </div>
    );
  }

  return (
    <div>
      {/* Term Selection */}
      <div className="mb-3 mx-auto" style={{ maxWidth: '600px' }}>
        <label className="form-label text-secondary fw-semibold">Select Term</label>
        <select
          className="form-select form-select-lg"
          value={selectedTerm}
          onChange={(e) => {
            setSelectedTerm(e.target.value);
            setSelectedSubject('');
            setSelectedChapter('');
            setChapters([]);
            setStudents([]);
          }}
          style={{ borderColor: '#6c757d', borderWidth: '2px' }}
        >
          <option value="">Select Term</option>
          {terms && terms.map((term) => (
            <option key={term._id || term.termName} value={term.termName}>
              {term.termName}
            </option>
          ))}
        </select>
      </div>

      {/* Subject Selection */}
      {selectedTerm && (
        <div className="mb-3 mx-auto" style={{ maxWidth: '600px' }}>
          <label className="form-label text-info fw-semibold">Select Subject</label>
          <select
            className="form-select form-select-lg"
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setSelectedChapter('');
              setChapters([]);
              setStudents([]);
            }}
            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
          >
            <option value="">Select Subject</option>
            {subjects && subjects.map((subject, index) => (
              <option key={subject._id || index} value={subject.subjectName}>
                {subject.subjectName}
              </option>
            ))}
          </select>
          {(!subjects || subjects.length === 0) && (
            <div className="alert alert-warning mt-2">
              <i className="fas fa-exclamation-triangle me-2"></i>
              <strong>No subjects found for this class.</strong>
              <br />
              <small>Please go to <a href="/resultsheetmaker/class-settings" className="alert-link">Class Settings → Subjects</a> tab to add subjects first.</small>
            </div>
          )}
        </div>
      )}

      {/* Chapter Selection */}
      {selectedSubject && (
        <div className="mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          <label className="form-label text-secondary fw-semibold">Select Chapter</label>
          <select
            className="form-select form-select-lg"
            value={selectedChapter}
            onChange={(e) => {
              setSelectedChapter(e.target.value);
              setStudents([]);
            }}
            style={{ borderColor: '#6c757d', borderWidth: '2px' }}
          >
            <option value="">Select Chapter</option>
            {chapters.map((chapter) => (
              <option key={chapter._id} value={chapter._id}>
                Chapter {chapter.chapterNumber}: {chapter.chapterName}
              </option>
            ))}
          </select>
          {chapters.length === 0 && selectedSubject && (
            <small className="text-muted">
              No chapters found. Please add chapters first in "Manage Chapters" tab.
            </small>
          )}
        </div>
      )}

      {/* Marks Entry Table */}
      {selectedChapter && !loading && students.length > 0 && (
        <div className="card mx-auto" style={{ maxWidth: '900px' }}>
          <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <i className="fas fa-edit me-2"></i>
              Enter Marks for All Students
            </h6>
            <button
              className="btn btn-light btn-sm"
              onClick={handleSaveAllMarks}
              disabled={saving}
            >
              <i className="fas fa-save me-2"></i>
              {saving ? 'Saving...' : 'Save All Marks'}
            </button>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '50px' }}>Sr.</th>
                    <th>Student Name</th>
                    <th style={{ width: '120px' }}>Admission No</th>
                    <th style={{ width: '100px' }} className="text-center">
                      Oral<br/>
                      <small className="text-muted">(Max: {maxMarks.oral})</small>
                    </th>
                    <th style={{ width: '100px' }} className="text-center">
                      Written<br/>
                      <small className="text-muted">(Max: {maxMarks.written})</small>
                    </th>
                    <th style={{ width: '100px' }} className="text-center">
                      Total<br/>
                      <small className="text-muted">(Max: {maxMarks.total})</small>
                    </th>
                    <th style={{ width: '80px' }} className="text-center">Grade</th>
                    <th style={{ width: '100px' }} className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => {
                    const isLocked = marksLocked[student._id];
                    const isEditing = editMode[student._id];
                    const hasMarks = marksData[student._id]?.oral !== undefined || marksData[student._id]?.written !== undefined;
                    
                    return (
                      <tr key={student._id}>
                        <td className="align-middle">{index + 1}</td>
                        <td className="align-middle fw-semibold">{student.studentName}</td>
                        <td className="align-middle">{student.admissionNo}</td>
                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            min="0"
                            max={maxMarks.oral}
                            step="0.5"
                            value={marksData[student._id]?.oral ?? ''}
                            onChange={(e) => handleMarksChange(student._id, 'oral', e.target.value)}
                            disabled={isLocked && !isEditing}
                            placeholder="0"
                            style={{
                              backgroundColor: isLocked && !isEditing ? '#f0f0f0' : 'white',
                              cursor: isLocked && !isEditing ? 'not-allowed' : 'text'
                            }}
                          />
                        </td>
                        <td className="align-middle">
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            min="0"
                            max={maxMarks.written}
                            step="0.5"
                            value={marksData[student._id]?.written ?? ''}
                            onChange={(e) => handleMarksChange(student._id, 'written', e.target.value)}
                            disabled={isLocked && !isEditing}
                            placeholder="0"
                            style={{
                              backgroundColor: isLocked && !isEditing ? '#f0f0f0' : 'white',
                              cursor: isLocked && !isEditing ? 'not-allowed' : 'text'
                            }}
                          />
                        </td>
                        <td className="align-middle text-center fw-bold">
                          {calculateTotal(student._id)}
                        </td>
                        <td className="align-middle text-center">
                          <span className={`badge ${getGradeBadgeColor(getGrade(student._id))}`} style={{ fontSize: '14px', minWidth: '40px' }}>
                            {getGrade(student._id)}
                          </span>
                        </td>
                        <td className="align-middle text-center">
                          {isLocked && !isEditing ? (
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => handleEnableEdit(student._id)}
                              title="Edit Marks"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                          ) : isEditing ? (
                            <div className="d-flex gap-1 justify-content-center">
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => handleSaveMarks(student._id, student.studentName)}
                                disabled={saving}
                                title="Save"
                              >
                                <i className="fas fa-check"></i>
                              </button>
                              <button
                                className="btn btn-sm btn-secondary"
                                onClick={() => handleCancelEdit(student._id)}
                                disabled={saving}
                                title="Cancel"
                              >
                                <i className="fas fa-times"></i>
                              </button>
                            </div>
                          ) : (
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleSaveMarks(student._id, student.studentName)}
                              disabled={saving}
                              title="Save"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted">Loading students and marks...</p>
        </div>
      )}

      {selectedChapter && !loading && students.length === 0 && (
        <div className="alert alert-warning mx-auto" style={{ maxWidth: '600px' }}>
          <i className="fas fa-exclamation-triangle me-2"></i>
          No students found in this class
        </div>
      )}
    </div>
  );
};

export default LBAMarksEntry;

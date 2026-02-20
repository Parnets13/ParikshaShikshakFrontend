import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllClasses, 
  getLBASettings, 
  saveLBASettings, 
  getTermsByClass,
  getSubjectsByClass 
} from '../../services/resultMakerService';
import LBAChapters from './LBAChapters';
import LBAMarksEntry from './LBAMarksEntry';
import LBAReports from './LBAReports';

const LBA = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chapters'); // chapters, marks, reports
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedClassNumber, setSelectedClassNumber] = useState(null);
  const [lbaSettings, setLbaSettings] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [oralMarks, setOralMarks] = useState(5);
  const [writtenMarks, setWrittenMarks] = useState(10);
  const [gradeRanges, setGradeRanges] = useState([
    { grade: 'A+', minMarks: 14, maxMarks: 15 },
    { grade: 'A', minMarks: 11, maxMarks: 13 },
    { grade: 'B+', minMarks: 8, maxMarks: 10 },
    { grade: 'B', minMarks: 7, maxMarks: 7 },
    { grade: 'C', minMarks: 0, maxMarks: 6 }
  ]);
  const [terms, setTerms] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedClassId) {
      fetchLBASettings();
      fetchTerms();
      fetchSubjects();
    } else {
      setTerms([]);
      setSubjects([]);
    }
  }, [selectedClassId]);

  const fetchLBASettings = async () => {
    try {
      const response = await getLBASettings(selectedClassId);
      if (response.success && response.data) {
        setLbaSettings(response.data);
        setOralMarks(response.data.oralMarks);
        setWrittenMarks(response.data.writtenMarks);
        
        // Set grade ranges if available
        if (response.data.gradeRanges && response.data.gradeRanges.length > 0) {
          setGradeRanges(response.data.gradeRanges);
        } else {
          // Set default based on total marks
          const total = response.data.totalMarks;
          if (total === 15) {
            setGradeRanges([
              { grade: 'A+', minMarks: 14, maxMarks: 15 },
              { grade: 'A', minMarks: 11, maxMarks: 13 },
              { grade: 'B+', minMarks: 8, maxMarks: 10 },
              { grade: 'B', minMarks: 7, maxMarks: 7 },
              { grade: 'C', minMarks: 0, maxMarks: 6 }
            ]);
          } else if (total === 20) {
            setGradeRanges([
              { grade: 'A+', minMarks: 19, maxMarks: 20 },
              { grade: 'A', minMarks: 15, maxMarks: 18 },
              { grade: 'B+', minMarks: 11, maxMarks: 14 },
              { grade: 'B', minMarks: 9, maxMarks: 10 },
              { grade: 'C', minMarks: 0, maxMarks: 8 }
            ]);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching LBA settings:', error);
    }
  };

  const fetchClasses = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to access this feature');
        navigate('/login');
        return;
      }

      const response = await getAllClasses();
      if (response.success && response.data) {
        setClasses(response.data);
      } else if (Array.isArray(response)) {
        setClasses(response);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      }
    }
  };

  const fetchTerms = async () => {
    if (!selectedClassId) {
      console.log('No class selected, cannot fetch terms');
      setTerms([]);
      return;
    }

    try {
      const response = await getTermsByClass(selectedClassId);
      console.log('Fetch terms response:', response);
      if (response.success && response.data) {
        console.log('Terms data:', response.data);
        setTerms(response.data);
      } else {
        console.log('No terms data in response');
        setTerms([]);
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      setTerms([]);
    }
  };

  const fetchSubjects = async () => {
    if (!selectedClassId) {
      console.log('No class selected, cannot fetch subjects');
      setSubjects([]);
      return;
    }

    try {
      console.log('Fetching subjects for classId:', selectedClassId);
      const response = await getSubjectsByClass(selectedClassId);
      console.log('Fetch subjects response:', response);
      if (response.success && response.data) {
        console.log('Subjects data:', response.data);
        console.log('Number of subjects:', response.data.length);
        setSubjects(response.data);
      } else {
        console.log('No subjects data in response');
        setSubjects([]);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      console.error('Error details:', error.response?.data);
      setSubjects([]);
    }
  };

  const getClassNumber = (className) => {
    const match = className.match(/\d+/);
    if (match) {
      return parseInt(match[0]);
    }
    
    const romanMap = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10 };
    const romanMatch = className.match(/\b([IVX]+)\b/);
    if (romanMatch && romanMap[romanMatch[1]]) {
      return romanMap[romanMatch[1]];
    }
    
    return null;
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.name || classItem.className || classItem;
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleClassChange = (e) => {
    const classDisplayName = e.target.value;
    setSelectedClass(classDisplayName);
    
    const classObj = classes.find(c => getClassDisplayName(c) === classDisplayName);
    if (classObj) {
      setSelectedClassId(classObj._id);
      const classNum = getClassNumber(classObj.className);
      setSelectedClassNumber(classNum);
    }
  };

  const handleSaveSettings = async () => {
    if (!selectedClassId) {
      alert('Please select a class first');
      return;
    }

    if (oralMarks < 0 || writtenMarks < 0) {
      alert('Marks cannot be negative');
      return;
    }

    if (oralMarks === 0 && writtenMarks === 0) {
      alert('At least one mark type must be greater than 0');
      return;
    }

    // Validate grade ranges
    const totalMarks = parseFloat(oralMarks) + parseFloat(writtenMarks);
    for (const range of gradeRanges) {
      if (range.minMarks < 0 || range.maxMarks > totalMarks) {
        alert(`Invalid grade range for ${range.grade}: marks must be between 0 and ${totalMarks}`);
        return;
      }
      if (range.minMarks > range.maxMarks) {
        alert(`Invalid grade range for ${range.grade}: minimum marks cannot be greater than maximum marks`);
        return;
      }
    }

    try {
      const response = await saveLBASettings({
        classId: selectedClassId,
        oralMarks: parseFloat(oralMarks),
        writtenMarks: parseFloat(writtenMarks),
        gradeRanges: gradeRanges
      });

      if (response.success) {
        alert('LBA settings saved successfully');
        setShowSettingsModal(false);
        fetchLBASettings();
      }
    } catch (error) {
      console.error('Error saving LBA settings:', error);
      alert(error.response?.data?.message || 'Error saving LBA settings');
    }
  };

  const handleGradeRangeChange = (index, field, value) => {
    const newGradeRanges = [...gradeRanges];
    newGradeRanges[index][field] = parseFloat(value) || 0;
    setGradeRanges(newGradeRanges);
  };

  const handleMarksChange = (field, value) => {
    if (field === 'oral') {
      setOralMarks(value);
    } else {
      setWrittenMarks(value);
    }
    
    // Auto-update grade ranges based on new total
    const newTotal = (field === 'oral' ? parseFloat(value) : parseFloat(oralMarks)) + 
                     (field === 'written' ? parseFloat(value) : parseFloat(writtenMarks));
    
    if (newTotal === 15) {
      setGradeRanges([
        { grade: 'A+', minMarks: 14, maxMarks: 15 },
        { grade: 'A', minMarks: 11, maxMarks: 13 },
        { grade: 'B+', minMarks: 8, maxMarks: 10 },
        { grade: 'B', minMarks: 7, maxMarks: 7 },
        { grade: 'C', minMarks: 0, maxMarks: 6 }
      ]);
    } else if (newTotal === 20) {
      setGradeRanges([
        { grade: 'A+', minMarks: 19, maxMarks: 20 },
        { grade: 'A', minMarks: 15, maxMarks: 18 },
        { grade: 'B+', minMarks: 11, maxMarks: 14 },
        { grade: 'B', minMarks: 9, maxMarks: 10 },
        { grade: 'C', minMarks: 0, maxMarks: 8 }
      ]);
    }
  };

  // Helper function to calculate grade based on settings
  const calculateGrade = (totalMarks) => {
    if (!lbaSettings || !lbaSettings.gradeRanges) return '';
    
    for (const range of lbaSettings.gradeRanges) {
      if (totalMarks >= range.minMarks && totalMarks <= range.maxMarks) {
        return range.grade;
      }
    }
    return 'C';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '50px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Session : 2025-2026</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-calendar-alt fs-4"></i>
          </button>
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-question-circle fs-4"></i>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h4 className="mb-0 fw-bold">Lesson Based Assessment (LBA)</h4>
      </div>

      {/* Tabs */}
      <div className="bg-white border-bottom">
        <div className="container-fluid px-3">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'chapters' ? 'active' : ''}`}
                onClick={() => setActiveTab('chapters')}
                style={{
                  border: 'none',
                  borderBottom: activeTab === 'chapters' ? '3px solid #17a2b8' : 'none',
                  color: activeTab === 'chapters' ? '#17a2b8' : '#6c757d',
                  fontWeight: activeTab === 'chapters' ? 'bold' : 'normal'
                }}
              >
                <i className="fas fa-book me-2"></i>
                Manage Chapters
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'marks' ? 'active' : ''}`}
                onClick={() => setActiveTab('marks')}
                style={{
                  border: 'none',
                  borderBottom: activeTab === 'marks' ? '3px solid #17a2b8' : 'none',
                  color: activeTab === 'marks' ? '#17a2b8' : '#6c757d',
                  fontWeight: activeTab === 'marks' ? 'bold' : 'normal'
                }}
              >
                <i className="fas fa-edit me-2"></i>
                Enter Marks
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => setActiveTab('reports')}
                style={{
                  border: 'none',
                  borderBottom: activeTab === 'reports' ? '3px solid #17a2b8' : 'none',
                  color: activeTab === 'reports' ? '#17a2b8' : '#6c757d',
                  fontWeight: activeTab === 'reports' ? 'bold' : 'normal'
                }}
              >
                <i className="fas fa-chart-bar me-2"></i>
                Reports
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content */}
      <div className="container-fluid py-4 px-3">
        {/* Class Selection - Common for all tabs */}
        <div className="mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          <label className="form-label text-info fw-semibold">Select Class</label>
          <select
            className="form-select form-select-lg"
            value={selectedClass}
            onChange={handleClassChange}
            style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
          >
            <option value="">Select Class</option>
            {classes.map((classItem, index) => (
              <option key={classItem._id || index} value={getClassDisplayName(classItem)}>
                {getClassDisplayName(classItem)}
              </option>
            ))}
          </select>
        </div>

        {/* Marks Distribution Info Box */}
        {selectedClassId && lbaSettings && (
          <>
            <div className="alert alert-info mx-auto mb-3 d-flex justify-content-between align-items-center" style={{ maxWidth: '800px' }}>
              <div>
                <h6 className="fw-bold mb-2">
                  <i className="fas fa-info-circle me-2"></i>
                  Marks Distribution for {selectedClass}
                </h6>
                <div className="row">
                  <div className="col-md-4">
                    <strong>Oral:</strong> {lbaSettings.oralMarks} marks
                  </div>
                  <div className="col-md-4">
                    <strong>Written:</strong> {lbaSettings.writtenMarks} marks
                  </div>
                  <div className="col-md-4">
                    <strong>Total:</strong> {lbaSettings.totalMarks} marks
                  </div>
                </div>
                {lbaSettings.isDefault && (
                  <small className="text-muted d-block mt-2">
                    <i className="fas fa-exclamation-triangle me-1"></i>
                    Using default settings. Click "Configure Marks" to customize.
                  </small>
                )}
              </div>
              <button
                className="btn btn-sm btn-warning"
                onClick={() => setShowSettingsModal(true)}
              >
                <i className="fas fa-cog me-2"></i>
                Configure Marks
              </button>
            </div>

            {/* Grade Ranges Info */}
            {lbaSettings.gradeRanges && lbaSettings.gradeRanges.length > 0 && (
              <div className="alert alert-success mx-auto mb-4" style={{ maxWidth: '800px' }}>
                <h6 className="fw-bold mb-3">
                  <i className="fas fa-award me-2"></i>
                  Grade Ranges
                </h6>
                <div className="row g-2">
                  {lbaSettings.gradeRanges.map((range, index) => (
                    <div key={index} className="col-auto">
                      <span className={`badge ${
                        range.grade === 'A+' ? 'bg-success' :
                        range.grade === 'A' ? 'bg-primary' :
                        range.grade === 'B+' ? 'bg-info' :
                        range.grade === 'B' ? 'bg-warning text-dark' :
                        'bg-secondary'
                      }`} style={{ fontSize: '13px', padding: '8px 12px' }}>
                        <strong>{range.grade}</strong>: {range.minMarks}-{range.maxMarks} marks
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Tab Content */}
        {activeTab === 'chapters' && (
          <LBAChapters 
            selectedClassId={selectedClassId}
            selectedClassNumber={selectedClassNumber}
            lbaSettings={lbaSettings}
            terms={terms}
            subjects={subjects}
          />
        )}

        {activeTab === 'marks' && (
          <LBAMarksEntry 
            selectedClassId={selectedClassId}
            selectedClassNumber={selectedClassNumber}
            lbaSettings={lbaSettings}
            calculateGrade={calculateGrade}
            terms={terms}
            subjects={subjects}
          />
        )}

        {activeTab === 'reports' && (
          <LBAReports 
            selectedClassId={selectedClassId}
            selectedClassNumber={selectedClassNumber}
            lbaSettings={lbaSettings}
            calculateGrade={calculateGrade}
            terms={terms}
            subjects={subjects}
          />
        )}
      </div>

      {/* Configure Marks Modal */}
      {showSettingsModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h6 className="modal-title mb-0 fw-bold">
                  <i className="fas fa-cog me-2"></i>
                  Configure LBA Marks & Grades
                </h6>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowSettingsModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info">
                  <small>
                    <i className="fas fa-info-circle me-2"></i>
                    Configure marks distribution and grade ranges for <strong>{selectedClass}</strong>
                  </small>
                </div>

                {/* Marks Configuration */}
                <h6 className="fw-bold mb-3 text-primary">
                  <i className="fas fa-calculator me-2"></i>
                  Marks Distribution
                </h6>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Oral Marks (per chapter)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      step="1"
                      value={oralMarks}
                      onChange={(e) => handleMarksChange('oral', e.target.value)}
                      placeholder="e.g., 5"
                    />
                    <small className="text-muted">Maximum oral marks per chapter</small>
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Written Marks (per chapter)</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      step="1"
                      value={writtenMarks}
                      onChange={(e) => handleMarksChange('written', e.target.value)}
                      placeholder="e.g., 10"
                    />
                    <small className="text-muted">Maximum written marks per chapter</small>
                  </div>
                </div>

                <div className="alert alert-success mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Total Marks per Chapter:</span>
                    <span className="fs-5 fw-bold">{(parseFloat(oralMarks) || 0) + (parseFloat(writtenMarks) || 0)}</span>
                  </div>
                </div>

                {/* Grade Ranges Configuration */}
                <h6 className="fw-bold mb-3 text-success">
                  <i className="fas fa-award me-2"></i>
                  Grade Ranges Configuration
                </h6>

                <div className="table-responsive mb-3">
                  <table className="table table-bordered table-sm">
                    <thead className="table-light">
                      <tr>
                        <th style={{ width: '100px' }}>Grade</th>
                        <th>Minimum Marks</th>
                        <th>Maximum Marks</th>
                        <th style={{ width: '80px' }}>Preview</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gradeRanges.map((range, index) => (
                        <tr key={index}>
                          <td className="align-middle">
                            <span className={`badge ${
                              range.grade === 'A+' ? 'bg-success' :
                              range.grade === 'A' ? 'bg-primary' :
                              range.grade === 'B+' ? 'bg-info' :
                              range.grade === 'B' ? 'bg-warning text-dark' :
                              'bg-secondary'
                            }`} style={{ fontSize: '14px', width: '50px' }}>
                              {range.grade}
                            </span>
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              min="0"
                              max={(parseFloat(oralMarks) || 0) + (parseFloat(writtenMarks) || 0)}
                              value={range.minMarks}
                              onChange={(e) => handleGradeRangeChange(index, 'minMarks', e.target.value)}
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="form-control form-control-sm"
                              min="0"
                              max={(parseFloat(oralMarks) || 0) + (parseFloat(writtenMarks) || 0)}
                              value={range.maxMarks}
                              onChange={(e) => handleGradeRangeChange(index, 'maxMarks', e.target.value)}
                            />
                          </td>
                          <td className="align-middle text-center">
                            <small className="text-muted">{range.minMarks}-{range.maxMarks}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="alert alert-warning">
                  <small>
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    <strong>Note:</strong> Grade ranges are automatically suggested when you change marks. You can customize them as needed. Changes will apply to all future marks entry.
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowSettingsModal(false);
                    // Reset to current settings
                    if (lbaSettings) {
                      setOralMarks(lbaSettings.oralMarks);
                      setWrittenMarks(lbaSettings.writtenMarks);
                      if (lbaSettings.gradeRanges) {
                        setGradeRanges(lbaSettings.gradeRanges);
                      }
                    }
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-warning text-dark fw-bold"
                  onClick={handleSaveSettings}
                >
                  <i className="fas fa-save me-2"></i>
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LBA;

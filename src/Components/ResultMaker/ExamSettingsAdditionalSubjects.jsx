import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveExamSettings, getExamSettings } from '../../services/resultMakerService';

const ExamSettingsAdditionalSubjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClass, previousSettings } = location.state || {};

  const [settings, setSettings] = useState({
    totalAdditionalSubjects: 0,
    subjects: [
      { name: '', maxMarks: '' },
      { name: '', maxMarks: '' },
      { name: '', maxMarks: '' },
      { name: '', maxMarks: '' },
      { name: '', maxMarks: '' },
      { name: '', maxMarks: '' },
      { name: '', maxMarks: '' },
      { name: '', maxMarks: '' }
    ]
  });

  useEffect(() => {
    if (!selectedClass) {
      navigate('/resultsheetmaker/exam-settings');
    } else {
      fetchExistingSettings();
    }
  }, [selectedClass, navigate]);

  const fetchExistingSettings = async () => {
    try {
      const response = await getExamSettings(selectedClass._id);
      if (response.success && response.data && response.data.additionalSubjects) {
        const existingSettings = response.data.additionalSubjects;
        setSettings({
          totalAdditionalSubjects: existingSettings.totalSubjects || 0,
          subjects: existingSettings.subjects && existingSettings.subjects.length > 0
            ? existingSettings.subjects.map(s => ({ name: s.name || '', maxMarks: s.maxMarks || '' }))
            : settings.subjects
        });
      }
    } catch (error) {
      console.error('Error fetching existing settings:', error);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/exam-settings-weightage', {
      state: { selectedClass, previousSettings }
    });
  };

  const handlePrevious = () => {
    navigate('/resultsheetmaker/exam-settings-weightage', {
      state: { selectedClass, previousSettings }
    });
  };

  const handleNext = async () => {
    try {
      // Prepare additional subjects data
      const additionalSubjectsData = {
        totalSubjects: settings.totalAdditionalSubjects,
        subjects: settings.subjects
          .slice(0, settings.totalAdditionalSubjects)
          .filter(s => s.name.trim() !== '')
          .map(s => ({
            name: s.name,
            maxMarks: parseInt(s.maxMarks) || 0
          }))
      };

      // Combine with previous settings and save
      const completeSettings = {
        classId: selectedClass._id,
        ...previousSettings,
        additionalSubjects: additionalSubjectsData
      };

      const response = await saveExamSettings(completeSettings);
      
      if (response.success) {
        alert('All settings saved successfully!');
        navigate('/resultsheetmaker/exam-settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Error saving settings. Please try again.');
    }
  };

  const getClassDisplayName = () => {
    if (!selectedClass) return '';
    if (selectedClass.className && selectedClass.section) {
      return `${selectedClass.className} - ${selectedClass.section}`;
    }
    return selectedClass.name || selectedClass.className || selectedClass;
  };

  const handleTotalSubjectsChange = (value) => {
    // Allow empty string for clearing
    if (value === '') {
      setSettings(prev => ({
        ...prev,
        totalAdditionalSubjects: ''
      }));
      return;
    }
    
    const num = parseInt(value);
    // Only accept values 0-8
    if (num >= 0 && num <= 8) {
      setSettings(prev => ({
        ...prev,
        totalAdditionalSubjects: num
      }));
    }
  };

  const handleSubjectNameChange = (index, value) => {
    setSettings(prev => {
      const newSubjects = [...prev.subjects];
      newSubjects[index] = { ...newSubjects[index], name: value };
      return {
        ...prev,
        subjects: newSubjects
      };
    });
  };

  const handleSubjectMarksChange = (index, value) => {
    setSettings(prev => {
      const newSubjects = [...prev.subjects];
      newSubjects[index] = { ...newSubjects[index], maxMarks: value };
      return {
        ...prev,
        subjects: newSubjects
      };
    });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Exams Setting - (2025-2026)</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-question-circle fs-4"></i>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h5 className="mb-0 fw-semibold text-secondary">Settings of {getClassDisplayName()}</h5>
      </div>

      {/* Settings Content */}
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        {/* Additional Subjects */}
        <div className="bg-white border rounded p-3 mb-3">
          <h6 className="text-center fw-semibold text-secondary mb-3" style={{ fontSize: '14px', lineHeight: '1.4' }}>
            Additional Subjects (Marks will be awarded in Term End Only)
          </h6>
          
          <div className="mb-3">
            <div className="d-flex align-items-center mb-3">
              <label className="mb-0 text-white bg-info px-3 py-2 rounded" style={{ fontSize: '13px', minWidth: '220px' }}>
                Total Additional Subjects (0 to 8)
              </label>
              <input
                type="number"
                className="form-control ms-2"
                min="0"
                max="8"
                value={settings.totalAdditionalSubjects}
                onChange={(e) => handleTotalSubjectsChange(e.target.value)}
                placeholder="Enter 0 to 8"
                style={{ maxWidth: '100px' }}
              />
            </div>
          </div>

          {/* Subject Inputs with Max Marks */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
            <div key={index} className="mb-2">
              <div className="d-flex align-items-center">
                <label className="mb-0 text-secondary" style={{ fontSize: '14px', minWidth: '60px' }}>
                  Sub {index + 1}
                </label>
                <input
                  type="text"
                  className="form-control ms-2 me-2"
                  value={settings.subjects[index]?.name || ''}
                  onChange={(e) => handleSubjectNameChange(index, e.target.value)}
                  placeholder={index < settings.totalAdditionalSubjects ? "Subject Name" : "Subject Name"}
                  disabled={index >= settings.totalAdditionalSubjects}
                  style={{ 
                    backgroundColor: index >= settings.totalAdditionalSubjects ? '#e9ecef' : 'white',
                    flex: 1
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  value={settings.subjects[index]?.maxMarks || ''}
                  onChange={(e) => handleSubjectMarksChange(index, e.target.value)}
                  placeholder={index < settings.totalAdditionalSubjects ? "" : "Max"}
                  disabled={index >= settings.totalAdditionalSubjects}
                  style={{ 
                    backgroundColor: index >= settings.totalAdditionalSubjects ? '#e9ecef' : 'white',
                    maxWidth: '80px',
                    textAlign: 'center'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="row g-3">
          <div className="col-6">
            <button
              className="btn btn-info text-white w-100 py-3 fw-bold"
              onClick={handlePrevious}
            >
              PREVIOUS
            </button>
          </div>
          <div className="col-6">
            <button
              className="btn btn-info text-white w-100 py-3 fw-bold"
              onClick={handleNext}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamSettingsAdditionalSubjects;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { saveExamSettings, getExamSettings } from '../../services/resultMakerService';

const ExamSettingsCoScholastic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClass, previousSettings } = location.state || {};

  const [settings, setSettings] = useState({
    numberOfAreas: 0,
    areas: ['', '', '', '', ''],
    disciplineEnabled: false,
    writtenExamMaxMarks: ''
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
      if (response.success && response.data && response.data.coScholastic) {
        const existingSettings = response.data.coScholastic;
        setSettings({
          numberOfAreas: existingSettings.numberOfAreas || 0,
          areas: existingSettings.areas && existingSettings.areas.length > 0
            ? existingSettings.areas
            : settings.areas,
          disciplineEnabled: existingSettings.discipline || false,
          writtenExamMaxMarks: existingSettings.writtenExamMaxMarks || ''
        });
      }
    } catch (error) {
      console.error('Error fetching existing settings:', error);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/exam-settings-detail', {
      state: { selectedClass }
    });
  };

  const handlePrevious = () => {
    navigate('/resultsheetmaker/exam-settings-detail', {
      state: { selectedClass }
    });
  };

  const handleNext = async () => {
    try {
      // Prepare co-scholastic data
      const coScholasticData = {
        numberOfAreas: settings.numberOfAreas,
        areas: settings.areas.slice(0, settings.numberOfAreas).filter(a => a.trim() !== ''),
        discipline: settings.disciplineEnabled,
        writtenExamMaxMarks: parseInt(settings.writtenExamMaxMarks) || 0
      };

      // Combine with previous settings and save
      const completeSettings = {
        classId: selectedClass._id,
        ...previousSettings,
        coScholastic: coScholasticData
      };

      const response = await saveExamSettings(completeSettings);
      
      if (response.success) {
        // Navigate to Weightage settings page
        navigate('/resultsheetmaker/exam-settings-weightage', {
          state: {
            selectedClass,
            previousSettings: completeSettings
          }
        });
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

  const handleNumberOfAreasChange = (value) => {
    // Allow empty string for clearing
    if (value === '') {
      setSettings(prev => ({
        ...prev,
        numberOfAreas: ''
      }));
      return;
    }
    
    const num = parseInt(value);
    // Only accept values 0-5
    if (num >= 0 && num <= 5) {
      setSettings(prev => ({
        ...prev,
        numberOfAreas: num
      }));
    }
  };

  const handleAreaChange = (index, value) => {
    setSettings(prev => {
      const newAreas = [...prev.areas];
      newAreas[index] = value;
      return {
        ...prev,
        areas: newAreas
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
        {/* Co-Scholastic Areas */}
        <div className="bg-white border rounded p-3 mb-3">
          <h6 className="text-center fw-semibold text-secondary mb-3">
            Co-Scholastic Areas (3 Point Grade Scale)
          </h6>
          
          <div className="mb-3">
            <div className="d-flex align-items-center mb-3">
              <label className="mb-0 text-white bg-info px-3 py-2 rounded" style={{ fontSize: '13px', minWidth: '180px' }}>
                Number of Areas (0 to 5)
              </label>
              <input
                type="number"
                className="form-control ms-2"
                min="0"
                max="5"
                value={settings.numberOfAreas}
                onChange={(e) => handleNumberOfAreasChange(e.target.value)}
                placeholder="Enter 0 to 5"
                style={{ maxWidth: '100px' }}
              />
            </div>
          </div>

          {/* Area Inputs */}
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="mb-2">
              <div className="d-flex align-items-center">
                <label className="mb-0 text-secondary" style={{ fontSize: '14px', minWidth: '80px' }}>
                  Area {index + 1}
                </label>
                <input
                  type="text"
                  className="form-control ms-2"
                  value={settings.areas[index] || ''}
                  onChange={(e) => handleAreaChange(index, e.target.value)}
                  placeholder={index < settings.numberOfAreas ? "Enter area name" : ""}
                  disabled={index >= settings.numberOfAreas}
                  style={{ 
                    backgroundColor: index >= settings.numberOfAreas ? '#e9ecef' : 'white'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Discipline */}
        <div className="bg-white border rounded p-3 mb-3">
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input me-3"
              checked={settings.disciplineEnabled}
              onChange={(e) => setSettings(prev => ({ ...prev, disciplineEnabled: e.target.checked }))}
              style={{ width: '24px', height: '24px', cursor: 'pointer' }}
            />
            <label className="mb-0 text-secondary" style={{ fontSize: '15px' }}>
              Discipline (3 Point Grade Scale)
            </label>
          </div>
        </div>

        {/* Term End Examinations */}
        <div className="bg-white border rounded p-3 mb-3">
          <h6 className="text-center fw-semibold text-secondary mb-3">
            Term End Examinations (Weightage 80% in Each Term)
          </h6>
          
          <div className="d-flex align-items-center">
            <label className="mb-0 text-white bg-info px-3 py-2 rounded" style={{ fontSize: '13px', minWidth: '200px' }}>
              Written Exam (Max Marks)
            </label>
            <input
              type="number"
              className="form-control ms-2"
              value={settings.writtenExamMaxMarks}
              onChange={(e) => setSettings(prev => ({ ...prev, writtenExamMaxMarks: e.target.value }))}
              placeholder="Enter max marks"
            />
          </div>
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

export default ExamSettingsCoScholastic;

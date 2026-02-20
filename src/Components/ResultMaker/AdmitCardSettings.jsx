import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getSchoolProfile } from '../../services/resultMakerService';

const AdmitCardSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedClass, selectedTerm, selectedAssessment, examSchedule, classData } = location.state || {};

  const [printWatermark, setPrintWatermark] = useState(true);
  const [printSignature, setPrintSignature] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [schoolProfile, setSchoolProfile] = useState(null);

  useEffect(() => {
    fetchSchoolProfile();
  }, []);

  const fetchSchoolProfile = async () => {
    try {
      const response = await getSchoolProfile();
      console.log('Fetched School Profile Response:', response);
      if (response.success) {
        setSchoolProfile(response.data);
        console.log('School Profile Data:', response.data);
        console.log('Principal Signature in Profile:', response.data?.principalSignature);
      }
    } catch (error) {
      console.error('Error fetching school profile:', error);
    }
  };

  const handleBack = () => {
    navigate('/resultsheetmaker/admit-cards');
  };

  const handleColorSelect = () => {
    setShowColorPicker(true);
  };

  const handleGenerateAdmitCards = () => {
    if (!selectedClass || !selectedTerm || !selectedAssessment) {
      alert('Missing required information. Please go back and select all fields.');
      return;
    }

    // Navigate to admit card print page with all settings
    navigate('/resultsheetmaker/print-admit-cards', {
      state: {
        selectedClass,
        selectedTerm,
        selectedAssessment,
        examSchedule,
        classData,
        printWatermark,
        printSignature,
        backgroundColor,
        schoolProfile
      }
    });
  };

  const getClassDisplayName = () => {
    if (classData?.className && classData?.section) {
      return `${classData.className} - ${classData.section}`;
    }
    return selectedClass || '';
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '100px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-3 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Session : 2025-2026</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-question-circle fs-4"></i>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-3 text-center border-bottom">
        <h4 className="mb-0 fw-bold">School Sessions</h4>
      </div>

      {/* Form Container */}
      <div className="container py-4" style={{ maxWidth: '600px' }}>
        {/* Class Display */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Class</label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={getClassDisplayName()}
            disabled
            style={{ backgroundColor: '#e9ecef' }}
          />
        </div>

        {/* Term Display */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Term</label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={selectedTerm || ''}
            disabled
            style={{ backgroundColor: '#e9ecef' }}
          />
        </div>

        {/* Assessment Display */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Assessment</label>
          <input
            type="text"
            className="form-control form-control-lg"
            value={selectedAssessment || ''}
            disabled
            style={{ backgroundColor: '#e9ecef' }}
          />
        </div>

        {/* Print Watermark Checkbox */}
        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            id="printWatermark"
            checked={printWatermark}
            onChange={(e) => setPrintWatermark(e.target.checked)}
            style={{ width: '20px', height: '20px' }}
          />
          <label className="form-check-label ms-2 fs-5" htmlFor="printWatermark">
            Print Watermark
          </label>
        </div>

        {/* Print Principal Signature Checkbox */}
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="printSignature"
            checked={printSignature}
            onChange={(e) => setPrintSignature(e.target.checked)}
            style={{ width: '20px', height: '20px' }}
          />
          <label className="form-check-label ms-2 fs-5" htmlFor="printSignature">
            Print Principal Signature
          </label>
        </div>

        {/* Background Color Selector */}
        <button
          className="btn btn-info text-white w-100 py-3 mb-3 fw-bold"
          onClick={handleColorSelect}
        >
          SELECT BACKGROUND COLOR
        </button>

        {showColorPicker && (
          <div className="mb-4">
            <label className="form-label fw-semibold">Selected Background Color</label>
            <div className="d-flex gap-2 align-items-center">
              <input
                type="color"
                className="form-control form-control-color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                style={{ width: '60px', height: '60px' }}
              />
              <input
                type="text"
                className="form-control"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Preview Color */}
        {backgroundColor !== '#ffffff' && (
          <div className="mb-4">
            <label className="form-label fw-semibold">Color Preview</label>
            <div
              className="border rounded p-4"
              style={{ backgroundColor: backgroundColor, minHeight: '100px' }}
            >
              <p className="text-center mb-0" style={{ color: backgroundColor === '#ffffff' ? '#000' : '#fff' }}>
                Admit Card Background Preview
              </p>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          className="btn btn-info text-white w-100 py-3 fw-bold"
          onClick={handleGenerateAdmitCards}
        >
          GENERATE ADMIT CARDS
        </button>
      </div>
    </div>
  );
};

export default AdmitCardSettings;

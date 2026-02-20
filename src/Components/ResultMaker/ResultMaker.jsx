import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveSchoolProfile, getSchoolProfile } from '../../services/resultMakerService';

const ResultMaker = () => {
  const navigate = useNavigate();
  const [schoolLogo, setSchoolLogo] = useState(null);
  const [principalSignature, setPrincipalSignature] = useState(null);
  const [schoolName, setSchoolName] = useState('Your School Name');
  const [schoolAddress, setSchoolAddress] = useState('Your School Address');
  const [mobileNumber, setMobileNumber] = useState('9XXXXXXXXX');
  const [affiliationNumber, setAffiliationNumber] = useState('000000');
  const [educationalBoard, setEducationalBoard] = useState('CENTRAL BOARD OF SECONDARY EDUCATION, NEW DELHI');
  const [schoolWebsite, setSchoolWebsite] = useState('www.yourschool.com');
  const [selectedSession, setSelectedSession] = useState('2025-2026');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Temporary state for modal editing
  const [tempSchoolLogo, setTempSchoolLogo] = useState(null);
  const [tempPrincipalSignature, setTempPrincipalSignature] = useState(null);
  const [tempSchoolName, setTempSchoolName] = useState('');
  const [tempSchoolAddress, setTempSchoolAddress] = useState('');
  const [tempMobileNumber, setTempMobileNumber] = useState('');
  const [tempAffiliationNumber, setTempAffiliationNumber] = useState('');
  const [tempEducationalBoard, setTempEducationalBoard] = useState('');
  const [tempSchoolWebsite, setTempSchoolWebsite] = useState('');
  const [tempSelectedSession, setTempSelectedSession] = useState('');

  // Load school profile on mount
  useEffect(() => {
    loadSchoolProfile();
  }, []);

  const loadSchoolProfile = async () => {
    try {
      const response = await getSchoolProfile();
      if (response.success && response.data) {
        const profile = response.data;
        setSchoolLogo(profile.schoolLogo);
        setPrincipalSignature(profile.principalSignature);
        setSchoolName(profile.schoolName);
        setSchoolAddress(profile.schoolAddress);
        setMobileNumber(profile.mobileNumber);
        setAffiliationNumber(profile.affiliationNumber);
        setEducationalBoard(profile.educationalBoard);
        setSchoolWebsite(profile.schoolWebsite);
        setSelectedSession(profile.selectedSession);
      }
    } catch (error) {
      console.log('No school profile found, using defaults');
    }
  };

  const handleLogoEditClick = () => {
    // Only populate temp state with actual data, not placeholder values
    setTempSchoolLogo(schoolLogo);
    setTempPrincipalSignature(principalSignature);
    setTempSchoolName(schoolName === 'Your School Name' ? '' : schoolName);
    setTempSchoolAddress(schoolAddress === 'Your School Address' ? '' : schoolAddress);
    setTempMobileNumber(mobileNumber === '9XXXXXXXXX' ? '' : mobileNumber);
    setTempAffiliationNumber(affiliationNumber === '000000' ? '' : affiliationNumber);
    setTempEducationalBoard(educationalBoard);
    setTempSchoolWebsite(schoolWebsite === 'www.yourschool.com' ? '' : schoolWebsite);
    setTempSelectedSession(selectedSession);
    setTermsAccepted(false);
    setShowEditModal(true);
  };

  const handleLogoUploadInModal = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (compressedDataUrl) => {
        setTempSchoolLogo(compressedDataUrl);
      });
    }
  };

  const handleSignatureUploadInModal = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImage(file, (compressedDataUrl) => {
        setTempPrincipalSignature(compressedDataUrl);
      });
    }
  };

  // Compress image to reduce file size
  const compressImage = (file, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Set max dimensions
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;
        
        // Calculate new dimensions
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress to JPEG with 0.7 quality
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7);
        callback(compressedDataUrl);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleOpenSignatureModal = () => {
    setTempPrincipalSignature(principalSignature);
    setShowSignatureModal(true);
  };

  const handleSaveSignature = async () => {
    try {
      console.log('Saving signature...');
      console.log('Temp Principal Signature:', tempPrincipalSignature);
      
      // Get current school profile
      const response = await getSchoolProfile();
      console.log('Current School Profile:', response);
      
      if (response.success && response.data) {
        const profileData = {
          ...response.data,
          principalSignature: tempPrincipalSignature
        };
        
        console.log('Profile data to save:', profileData);
        
        const saveResponse = await saveSchoolProfile(profileData);
        console.log('Save response:', saveResponse);
        
        if (saveResponse.success) {
          setPrincipalSignature(tempPrincipalSignature);
          setShowSignatureModal(false);
          alert('Principal signature saved successfully!');
          // Reload to verify
          await loadSchoolProfile();
        }
      } else {
        alert('Please save school profile first before uploading signature');
      }
    } catch (error) {
      console.error('Error saving signature:', error);
      alert('Error saving signature. Please try again.');
    }
  };

  const handleCancelSignature = () => {
    setShowSignatureModal(false);
    setTempPrincipalSignature(principalSignature);
  };

  const handleSaveDetails = async () => {
    if (!termsAccepted) {
      alert('Please accept the terms and conditions');
      return;
    }

    // Validate required fields
    if (!tempSchoolName.trim() || !tempSchoolAddress.trim() || !tempMobileNumber.trim() || !tempEducationalBoard.trim()) {
      alert('Please fill all required fields');
      return;
    }

    try {
      // Save to backend
      const profileData = {
        schoolLogo: tempSchoolLogo,
        principalSignature: tempPrincipalSignature,
        schoolName: tempSchoolName,
        schoolAddress: tempSchoolAddress,
        mobileNumber: tempMobileNumber,
        affiliationNumber: tempAffiliationNumber,
        educationalBoard: tempEducationalBoard,
        schoolWebsite: tempSchoolWebsite,
        selectedSession: tempSelectedSession
      };

      const response = await saveSchoolProfile(profileData);
      
      if (response.success) {
        // Update local state
        setSchoolLogo(tempSchoolLogo);
        setPrincipalSignature(tempPrincipalSignature);
        setSchoolName(tempSchoolName);
        setSchoolAddress(tempSchoolAddress);
        setMobileNumber(tempMobileNumber);
        setAffiliationNumber(tempAffiliationNumber);
        setEducationalBoard(tempEducationalBoard);
        setSchoolWebsite(tempSchoolWebsite);
        setSelectedSession(tempSelectedSession);
        
        setShowEditModal(false);
        alert('School profile saved successfully!');
      }
    } catch (error) {
      console.error('Error saving school profile:', error);
      // Fallback to local save
      setSchoolLogo(tempSchoolLogo);
      setPrincipalSignature(tempPrincipalSignature);
      setSchoolName(tempSchoolName);
      setSchoolAddress(tempSchoolAddress);
      setMobileNumber(tempMobileNumber);
      setAffiliationNumber(tempAffiliationNumber);
      setEducationalBoard(tempEducationalBoard);
      setSchoolWebsite(tempSchoolWebsite);
      setSelectedSession(tempSelectedSession);
      
      setShowEditModal(false);
      alert('School profile saved locally. Please login to save to server.');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setTermsAccepted(false);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '20px', overflowY: 'auto' }}>
      {/* Header */}
      <div className="bg-info text-white py-2 px-3 d-flex justify-content-between align-items-center" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-bars fs-4"></i>
        </button>
        <h4 className="mb-0 fw-bold">Result Maker</h4>
        <button className="btn btn-link text-white p-0">
          <i className="fas fa-headset fs-4"></i>
        </button>
      </div>

      {/* Main Content */}
      <div className="container py-2" style={{ maxWidth: '600px', paddingBottom: '10px' }}>
        {/* School Logo Section */}
        <div className="text-center mb-2">
          <div className="position-relative d-inline-block">
            <div className="bg-white border rounded-3 shadow-sm p-2" style={{ width: '120px', height: '120px' }}>
              {schoolLogo ? (
                <img src={schoolLogo} alt="School Logo" className="w-100 h-100" style={{ objectFit: 'cover', borderRadius: '12px' }} />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center h-100">
                  <div style={{ fontSize: '32px', lineHeight: '1' }}>👥</div>
                  <div style={{ fontSize: '24px', lineHeight: '1', marginTop: '-5px' }}>📖</div>
                  <p className="mb-0 fw-bold" style={{ color: '#ff6b35', fontSize: '9px' }}>YOUR</p>
                  <p className="mb-0 fw-bold" style={{ color: '#8b0000', fontSize: '9px' }}>SCHOOL LOGO</p>
                </div>
              )}
            </div>
            <button 
              className="btn btn-light border border-info rounded-circle position-absolute shadow-sm"
              style={{ bottom: '3px', right: '3px', width: '30px', height: '30px', fontSize: '12px' }}
              onClick={handleLogoEditClick}
            >
              <i className="fas fa-edit text-info"></i>
            </button>
          </div>
        </div>

        {/* School Details */}
        <div className="text-center mb-2">
          <h4 className="fw-bold mb-1" style={{ color: '#dc3545', fontSize: '18px' }}>{schoolName}</h4>
          <p className="text-dark mb-1" style={{ fontSize: '13px' }}>{schoolAddress}</p>
          <div className="d-flex align-items-center justify-content-center gap-2">
            <span className="text-muted" style={{ fontSize: '12px' }}>Selected Session : {selectedSession}</span>
            <button 
              className="btn btn-sm btn-outline-info rounded-circle p-0"
              style={{ width: '28px', height: '28px', fontSize: '12px' }}
              onClick={handleLogoEditClick}
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="row g-2">
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/students')}>
              STUDENTS
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/class-settings')}>
              CLASS SETTINGS
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/exam-settings')}>
              EXAM SETTINGS
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/admit-cards')}>
              ADMIT CARDS
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/lba')}>
              LBA
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/marks-entry')}>
              MARKS ENTRY
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/grading-settings')}>
              GRADING SETTINGS
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={handleOpenSignatureModal}>
              PRINCIPAL SIGNATURE
            </button>
          </div>
          <div className="col-6">
            <button className="btn btn-info text-white w-100 py-2 fw-bold" style={{ fontSize: '13px' }} onClick={() => navigate('/resultsheetmaker/generate-result')}>
              GENERATE RESULT
            </button>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title w-100 text-center">Manage School Profile</h5>
              </div>
              <div className="modal-body">
                {/* Logo Upload Section */}
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <div className="border rounded-3 p-2" style={{ width: '140px', height: '140px' }}>
                      {tempSchoolLogo ? (
                        <img src={tempSchoolLogo} alt="School Logo" className="w-100 h-100" style={{ objectFit: 'cover', borderRadius: '12px' }} />
                      ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                          <div style={{ fontSize: '36px' }}>👥</div>
                          <div style={{ fontSize: '28px', marginTop: '-8px' }}>📖</div>
                          <p className="mb-0 fw-bold" style={{ fontSize: '10px', color: '#ff6b35' }}>YOUR</p>
                          <p className="mb-0 fw-bold" style={{ fontSize: '10px', color: '#8b0000' }}>SCHOOL LOGO</p>
                        </div>
                      )}
                    </div>
                    <label 
                      htmlFor="modal-logo-upload" 
                      className="btn btn-dark rounded-circle position-absolute border border-white border-3"
                      style={{ bottom: '0', right: '0', width: '45px', height: '45px', cursor: 'pointer' }}
                    >
                      <i className="fas fa-camera text-white"></i>
                    </label>
                    <input
                      type="file"
                      id="modal-logo-upload"
                      accept="image/*"
                      onChange={handleLogoUploadInModal}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Principal Signature Upload Section */}
                <div className="text-center mb-4">
                  <label className="form-label fw-semibold">Principal Signature</label>
                  <div className="position-relative d-inline-block">
                    <div className="border rounded-3 p-2" style={{ width: '200px', height: '100px' }}>
                      {tempPrincipalSignature ? (
                        <img src={tempPrincipalSignature} alt="Principal Signature" className="w-100 h-100" style={{ objectFit: 'contain' }} />
                      ) : (
                        <div className="d-flex align-items-center justify-content-center h-100">
                          <p className="mb-0 text-muted small">Upload Signature</p>
                        </div>
                      )}
                    </div>
                    <label 
                      htmlFor="signature-upload" 
                      className="btn btn-dark rounded-circle position-absolute border border-white border-3"
                      style={{ bottom: '0', right: '0', width: '40px', height: '40px', cursor: 'pointer' }}
                    >
                      <i className="fas fa-pen text-white"></i>
                    </label>
                    <input
                      type="file"
                      id="signature-upload"
                      accept="image/*"
                      onChange={handleSignatureUploadInModal}
                      style={{ display: 'none' }}
                    />
                  </div>
                </div>

                {/* Form Fields */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">School Name*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tempSchoolName}
                    onChange={(e) => setTempSchoolName(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    placeholder="Your School Name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">School Address*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tempSchoolAddress}
                    onChange={(e) => setTempSchoolAddress(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    placeholder="Your School Address"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Mobile Number*</label>
                  <input
                    type="tel"
                    className="form-control"
                    value={tempMobileNumber}
                    onChange={(e) => setTempMobileNumber(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    placeholder="9XXXXXXXXX"
                    maxLength="10"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Affiliation Number</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tempAffiliationNumber}
                    onChange={(e) => setTempAffiliationNumber(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    placeholder="000000"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Educational Board*</label>
                  <select
                    className="form-select"
                    value={tempEducationalBoard}
                    onChange={(e) => setTempEducationalBoard(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    <option value="CENTRAL BOARD OF SECONDARY EDUCATION, NEW DELHI">
                      CENTRAL BOARD OF SECONDARY EDUCATION, NEW DELHI
                    </option>
                    <option value="STATE BOARD">STATE BOARD</option>
                    <option value="ICSE">ICSE</option>
                    <option value="IB">IB</option>
                    <option value="IGCSE">IGCSE</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">School Website</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tempSchoolWebsite}
                    onChange={(e) => setTempSchoolWebsite(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    placeholder="www.yourschool.com"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Session*</label>
                  <input
                    type="text"
                    className="form-control"
                    value={tempSelectedSession}
                    onChange={(e) => setTempSelectedSession(e.target.value)}
                    onFocus={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    placeholder="2025-2026"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="bg-light p-3 rounded border">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="termsCheck"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                    <label className="form-check-label text-muted small" htmlFor="termsCheck" style={{ textAlign: 'justify' }}>
                      By using this app, I confirm that I am an authorized representative of the said school 
                      (or an authorized user, as applicable) and agree to all the terms and conditions. 
                      I understand and acknowledge that this app is intended only for legitimate use in 
                      managing student academic records and results. I further acknowledge that any legal 
                      consequences or liabilities arising from unauthorized, fraudulent, or unlawful use of 
                      this app are my sole responsibility as the user.
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button type="button" className="btn btn-info text-white" onClick={handleSaveDetails}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Principal Signature Upload Modal */}
      {showSignatureModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={handleCancelSignature}>
          <div className="modal-dialog modal-dialog-centered" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title w-100 text-center">Upload Principal Signature</h5>
              </div>
              <div className="modal-body">
                <div className="text-center mb-4">
                  <p className="text-muted mb-3">Upload the principal's signature image</p>
                  <div className="position-relative d-inline-block">
                    <div className="border rounded-3 p-3" style={{ width: '300px', height: '150px', backgroundColor: '#f8f9fa' }}>
                      {tempPrincipalSignature ? (
                        <img 
                          src={tempPrincipalSignature} 
                          alt="Principal Signature" 
                          className="w-100 h-100" 
                          style={{ objectFit: 'contain' }} 
                        />
                      ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100">
                          <i className="fas fa-signature fs-1 text-muted mb-2"></i>
                          <p className="mb-0 text-muted">No signature uploaded</p>
                        </div>
                      )}
                    </div>
                    <label 
                      htmlFor="signature-file-upload" 
                      className="btn btn-info text-white mt-3 w-100"
                      style={{ cursor: 'pointer' }}
                    >
                      <i className="fas fa-upload me-2"></i>
                      Choose Signature Image
                    </label>
                    <input
                      type="file"
                      id="signature-file-upload"
                      accept="image/*"
                      onChange={handleSignatureUploadInModal}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <small className="text-muted d-block mt-2">
                    Recommended: PNG or JPG with transparent background
                  </small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCancelSignature}>
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-info text-white" 
                  onClick={handleSaveSignature}
                  disabled={!tempPrincipalSignature}
                >
                  Save Signature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultMaker;

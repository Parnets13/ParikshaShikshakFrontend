import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSchoolProfiles, saveSchoolProfile } from '../../services/resultMakerService';
import './ResultMaker.css';

const ManageSchoolProfile = () => {
  const navigate = useNavigate();
  const [schoolProfiles, setSchoolProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchAllSchoolProfiles();
  }, []);

  const fetchAllSchoolProfiles = async () => {
    try {
      setLoading(true);
      const response = await getAllSchoolProfiles();
      console.log('All school profiles response:', response);
      if (response.success && response.data) {
        setSchoolProfiles(response.data);
      } else {
        setSchoolProfiles([]);
      }
    } catch (error) {
      console.error('Error fetching school profiles:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      }
      setSchoolProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (profile) => {
    setSelectedProfile(profile);
    setShowViewModal(true);
  };

  const handleEdit = (profile) => {
    setSelectedProfile(profile);
    setEditData({
      schoolId: profile._id, // Add the school ID
      schoolName: profile.schoolName || '',
      schoolCode: profile.schoolCode || '',
      affiliationNumber: profile.affiliationNumber || '',
      educationalBoard: profile.educationalBoard || '',
      selectedSession: profile.selectedSession || '',
      schoolAddress: profile.schoolAddress || '',
      mobileNumber: profile.mobileNumber || '',
      schoolWebsite: profile.schoolWebsite || '',
      schoolLogo: profile.schoolLogo || '',
      principalSignature: profile.principalSignature || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = async (profileId, schoolName) => {
    if (!window.confirm(`Are you sure you want to delete "${schoolName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      // Add delete API call here when backend is ready
      alert('Delete functionality will be implemented');
      // After successful delete:
      // fetchAllSchoolProfiles();
    } catch (error) {
      console.error('Error deleting school profile:', error);
      alert('Error deleting school profile');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log('Input changed:', name, '=', value);
    setEditData(prev => {
      const updated = {
        ...prev,
        [name]: value
      };
      console.log('Updated editData:', updated);
      return updated;
    });
  };

  const handleFileUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size should be less than 2MB');
      return;
    }

    try {
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData(prev => ({
          ...prev,
          [fieldName]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file');
    }
  };

  const handleSaveEdit = async () => {
    // Validate required fields
    if (!editData.schoolName || !editData.schoolAddress || !editData.mobileNumber || !editData.educationalBoard) {
      alert('Please fill in all required fields (School Name, Address, Mobile Number, Educational Board)');
      return;
    }

    console.log('Saving school profile with data:', editData);

    try {
      const response = await saveSchoolProfile(editData);
      console.log('Save response:', response);
      if (response.success) {
        alert('School profile updated successfully');
        setShowEditModal(false);
        setSelectedProfile(null);
        fetchAllSchoolProfiles();
      }
    } catch (error) {
      console.error('Error updating school profile:', error);
      alert(error.response?.data?.message || 'Error updating school profile');
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading school profiles...</p>
        </div>
      </div>
    );
  }

  if (schoolProfiles.length === 0) {
    return (
      <div className="container mt-5">
        <div className="card shadow">
          <div className="card-body text-center py-5">
            <i className="fas fa-school fa-4x text-muted mb-4"></i>
            <h3>No School Profiles Found</h3>
            <p className="text-muted">You haven't created any school profiles yet.</p>
            <button
              className="btn btn-primary mt-3"
              onClick={() => navigate('/resultsheetmaker')}
            >
              <i className="fas fa-plus me-2"></i>
              Create School Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid mt-4 mb-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">
            <i className="fas fa-school me-2 text-primary"></i>
            Manage School Profiles
          </h2>
          <p className="text-muted mb-0">View and manage all school profiles</p>
        </div>
        <div>
          <button
            className="btn btn-success me-2"
            onClick={() => navigate('/resultsheetmaker')}
          >
            <i className="fas fa-plus me-2"></i>
            Add New Profile
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/resultsheetmaker')}
          >
            <i className="fas fa-arrow-left me-2"></i>
            Back to Result Maker
          </button>
        </div>
      </div>

      {/* School Profiles Table */}
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="fas fa-building me-2"></i>
            School Profiles ({schoolProfiles.length})
          </h4>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '50px' }}>Sr</th>
                  <th>School Name</th>
                  <th>School Code</th>
                  <th>Board</th>
                  <th>Mobile Number</th>
                  <th>Session</th>
                  <th style={{ width: '200px' }} className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schoolProfiles.map((profile, index) => (
                  <tr key={profile._id || index}>
                    <td>{index + 1}</td>
                    <td className="fw-semibold">{profile.schoolName}</td>
                    <td>{profile.schoolCode || 'N/A'}</td>
                    <td>{profile.educationalBoard}</td>
                    <td>{profile.mobileNumber}</td>
                    <td>{profile.selectedSession}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-info me-1"
                        onClick={() => handleView(profile)}
                        title="View Details"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-warning me-1"
                        onClick={() => handleEdit(profile)}
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(profile._id, profile.schoolName)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* View Details Modal */}
      {showViewModal && selectedProfile && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-info text-white">
                <h5 className="modal-title">
                  <i className="fas fa-eye me-2"></i>
                  School Profile Details
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedProfile(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <tbody>
                      <tr className="table-secondary">
                        <td colSpan="2" className="fw-bold">
                          <i className="fas fa-info-circle me-2"></i>
                          BASIC INFORMATION
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold" style={{ width: '40%' }}>School Name</td>
                        <td>{selectedProfile.schoolName}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">School Code</td>
                        <td>{selectedProfile.schoolCode || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Affiliation Number</td>
                        <td>{selectedProfile.affiliationNumber || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Educational Board</td>
                        <td>{selectedProfile.educationalBoard}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Academic Session</td>
                        <td>{selectedProfile.selectedSession}</td>
                      </tr>
                      <tr className="table-secondary">
                        <td colSpan="2" className="fw-bold">
                          <i className="fas fa-address-book me-2"></i>
                          CONTACT INFORMATION
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">School Address</td>
                        <td>{selectedProfile.schoolAddress}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Mobile Number</td>
                        <td>{selectedProfile.mobileNumber}</td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">School Website</td>
                        <td>
                          {selectedProfile.schoolWebsite ? (
                            <a href={selectedProfile.schoolWebsite} target="_blank" rel="noopener noreferrer">
                              {selectedProfile.schoolWebsite}
                            </a>
                          ) : (
                            'N/A'
                          )}
                        </td>
                      </tr>
                      <tr className="table-secondary">
                        <td colSpan="2" className="fw-bold">
                          <i className="fas fa-image me-2"></i>
                          IMAGES
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">School Logo</td>
                        <td>
                          {selectedProfile.schoolLogo ? (
                            <img
                              src={selectedProfile.schoolLogo}
                              alt="School Logo"
                              style={{ maxWidth: '150px', maxHeight: '150px', border: '1px solid #ddd', padding: '10px' }}
                            />
                          ) : (
                            <span className="text-muted">No logo uploaded</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="fw-semibold">Principal Signature</td>
                        <td>
                          {selectedProfile.principalSignature ? (
                            <img
                              src={selectedProfile.principalSignature}
                              alt="Principal Signature"
                              style={{ maxWidth: '200px', maxHeight: '80px', border: '1px solid #ddd', padding: '5px' }}
                            />
                          ) : (
                            <span className="text-muted">No signature uploaded</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedProfile(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  <i className="fas fa-edit me-2"></i>
                  Edit School Profile
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProfile(null);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* Basic Information */}
                  <div className="card mb-3">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fas fa-info-circle me-2"></i>
                        Basic Information
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">School Name <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="schoolName"
                            value={editData.schoolName || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">School Code</label>
                          <input
                            type="text"
                            className="form-control"
                            name="schoolCode"
                            value={editData.schoolCode || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Affiliation Number</label>
                          <input
                            type="text"
                            className="form-control"
                            name="affiliationNumber"
                            value={editData.affiliationNumber || ''}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Educational Board <span className="text-danger">*</span></label>
                          <input
                            type="text"
                            className="form-control"
                            name="educationalBoard"
                            value={editData.educationalBoard || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Academic Session</label>
                          <input
                            type="text"
                            className="form-control"
                            name="selectedSession"
                            value={editData.selectedSession || ''}
                            onChange={handleInputChange}
                            placeholder="e.g., 2025-2026"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="card mb-3">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fas fa-address-book me-2"></i>
                        Contact Information
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-12">
                          <label className="form-label">School Address <span className="text-danger">*</span></label>
                          <textarea
                            className="form-control"
                            name="schoolAddress"
                            value={editData.schoolAddress || ''}
                            onChange={handleInputChange}
                            rows="3"
                            required
                          ></textarea>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
                          <input
                            type="tel"
                            className="form-control"
                            name="mobileNumber"
                            value={editData.mobileNumber || ''}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">School Website</label>
                          <input
                            type="url"
                            className="form-control"
                            name="schoolWebsite"
                            value={editData.schoolWebsite || ''}
                            onChange={handleInputChange}
                            placeholder="https://example.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="card mb-3">
                    <div className="card-header bg-light">
                      <h6 className="mb-0">
                        <i className="fas fa-image me-2"></i>
                        Images
                      </h6>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="form-label">School Logo</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'schoolLogo')}
                          />
                          {editData.schoolLogo && (
                            <div className="mt-2">
                              <img
                                src={editData.schoolLogo}
                                alt="School Logo Preview"
                                style={{ maxWidth: '150px', maxHeight: '150px', border: '1px solid #ddd', padding: '10px' }}
                              />
                            </div>
                          )}
                          <small className="text-muted">Max size: 2MB. Formats: JPG, PNG, GIF</small>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Principal Signature</label>
                          <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'principalSignature')}
                          />
                          {editData.principalSignature && (
                            <div className="mt-2">
                              <img
                                src={editData.principalSignature}
                                alt="Signature Preview"
                                style={{ maxWidth: '200px', maxHeight: '80px', border: '1px solid #ddd', padding: '5px' }}
                              />
                            </div>
                          )}
                          <small className="text-muted">Max size: 2MB. Formats: JPG, PNG, GIF</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    <small>Fields marked with <span className="text-danger">*</span> are required.</small>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowEditModal(false);
                    setSelectedProfile(null);
                  }}
                >
                  <i className="fas fa-times me-1"></i>
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveEdit}
                >
                  <i className="fas fa-save me-1"></i>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageSchoolProfile;

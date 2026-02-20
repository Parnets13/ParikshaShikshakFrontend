import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:8774/api/admin/tut'; 
const File_API_BASE_URL = 'http://localhost:8774';

function AdminTutorial() {
  // State management
  const [tutorials, setTutorials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [formData, setFormData] = useState({ code: '', title: '', description: '' });
  const [file, setFile] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(null);
  const [showFileViewer, setShowFileViewer] = useState(null);

  // Fetch tutorials on component mount
  useEffect(() => {
    fetchTutorials();
  }, []);

  // Fetch all tutorials
  const fetchTutorials = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/getalltutorials`);
      setTutorials(response.data.tutorials);
    } catch (error) {
      showAlert('Error fetching tutorials: ' + error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Show alert message
  const showAlert = (message, type = 'info') => {
    setAlert({ show: true, message, type });
    setTimeout(() => setAlert({ show: false, message: '', type: '' }), 5000);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const previewUrl = URL.createObjectURL(selectedFile);
      setFilePreview(previewUrl);
    } else {
      setFilePreview(null);
    }
  };

  // Reset form and close modal
  const resetForm = () => {
    setFormData({ code: '', title: '', description: '' });
    setFile(null);
    setFilePreview(null);
    setEditingTutorial(null);
    setShowModal(false);
  };

  // Submit form (create or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('code', formData.code);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      if (file) {
        formDataToSend.append('file', file); // field name should match multer
      }

      if (editingTutorial) {
        await axios.put(`${API_BASE_URL}/tutorials/${editingTutorial._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Tutorial updated successfully!', 'success');
      } else {
        await axios.post(`${API_BASE_URL}/tutorials`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        showAlert('Tutorial created successfully!', 'success');
      }

      resetForm();
      fetchTutorials();
    } catch (error) {
      showAlert('Error saving tutorial: ' + error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  // Edit tutorial
  const handleEdit = (tutorial) => {
    setEditingTutorial(tutorial);
    setFormData({
      code: tutorial.code || '',
      title: tutorial.title || '',
      description: tutorial.description || ''
    });
    setFilePreview(tutorial.fileUrl ? `${File_API_BASE_URL}${tutorial.fileUrl}` : null);
    setShowModal(true);
  };

  // Delete tutorial
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tutorial?')) {
      try {
        setLoading(true);
        await axios.delete(`${API_BASE_URL}/tutorials/${id}`);
        showAlert('Tutorial deleted successfully!', 'success');
        fetchTutorials();
      } catch (error) {
        showAlert('Error deleting tutorial: ' + error.message, 'danger');
      } finally {
        setLoading(false);
      }
    }
  };

  // Toggle file viewer
  const toggleFileViewer = (tutorialId) => {
    if (showFileViewer === tutorialId) {
      setShowFileViewer(null);
    } else {
      setShowFileViewer(tutorialId);
    }
  };

  // Detect if file is video or pdf
  const getFileType = (url) => {
    if (!url) return null;
    
    // Check if URL ends with PDF extension
    if (url.toLowerCase().endsWith('.pdf')) return 'pdf';
    
    // Check if URL contains video extensions
    const videoExtensions = ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm', '.mkv'];
    const isVideo = videoExtensions.some(ext => url.toLowerCase().includes(ext));
    
    return isVideo ? 'video' : 'unknown';
  };

  // Get file name from URL
  const getFileName = (url) => {
    if (!url) return 'No file';
    return url.split('/').pop();
  };

  return (
    <Container fluid className="py-4">
      {/* Alert Notification */}
      {alert.show && (
        <Alert variant={alert.type} dismissible onClose={() => setAlert({ show: false, message: '', type: '' })}>
          {alert.message}
        </Alert>
      )}

      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Header className="d-flex justify-content-between align-items-center" >
              <h4 className="mb-0">Tutorial Management</h4>
              <Button variant="primary" onClick={() => setShowModal(true)}>
                Add New Tutorial
              </Button>
            </Card.Header>
            <Card.Body>
              {loading && tutorials.length === 0 ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-2">Loading tutorials...</p>
                </div>
              ) : (
                <Table responsive striped hover>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>File</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutorials.map((tutorial) => {
                      const fileType = getFileType(tutorial.fileUrl);
                      const fullFileUrl = tutorial.fileUrl ? `${File_API_BASE_URL}${tutorial.fileUrl}` : null;
                      
                      return (
                        <React.Fragment key={tutorial._id}>
                          <tr>
                            <td>{tutorial.code}</td>
                            <td>{tutorial.title}</td>
                            <td>{tutorial.description}</td>
                            <td>
                              {tutorial.fileUrl ? (
                                <div>
                                  <div className="mb-1">{getFileName(tutorial.fileUrl)}</div>
                                  <Button
                                    variant="outline-info"
                                    size="sm"
                                    onClick={() => toggleFileViewer(tutorial._id)}
                                  >
                                    {showFileViewer === tutorial._id ? 'Hide' : (fileType === 'pdf' ? 'View PDF' : 'Play Video')}
                                  </Button>
                                </div>
                              ) : (
                                'No file'
                              )}
                            </td>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                className="me-2"
                                onClick={() => handleEdit(tutorial)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleDelete(tutorial._id)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                          {showFileViewer === tutorial._id && tutorial.fileUrl && (
                            <tr>
                              <td colSpan="5" className="p-3 bg-light">
                                <div className="text-center">
                                  <h5>Preview: {tutorial.title}</h5>
                                  {fileType === 'video' ? (
                                    <div className="ratio ratio-16x9">
                                      <video controls className="border rounded">
                                        <source src={fullFileUrl} type="video/mp4" />
                                        Your browser does not support the video tag.
                                      </video>
                                    </div>
                                  ) : fileType === 'pdf' ? (
                                    <div className="border rounded p-2 bg-white">
                                      <iframe
                                        src={fullFileUrl}
                                        title="PDF Preview"
                                        width="100%"
                                        height="500px"
                                      />
                                    </div>
                                  ) : (
                                    <div className="alert alert-warning">
                                      Unsupported file format. <a href={fullFileUrl} target="_blank" rel="noopener noreferrer">Download file</a>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add/Edit Tutorial Modal */}
      <Modal show={showModal} onHide={resetForm} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingTutorial ? 'Edit Tutorial' : 'Add New Tutorial'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Code</Form.Label>
                  <Form.Control
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload File {editingTutorial && '(Leave empty to keep current)'}</Form.Label>
              <Form.Control
                type="file"
                accept="video/*,application/pdf"
                onChange={handleFileChange}
                required={!editingTutorial}
              />
              <Form.Text className="text-muted">
                Supported formats: Video (MP4, MKV, MOV, AVI) or PDF (Max 500MB)
              </Form.Text>
            </Form.Group>
            
            {/* File Preview */}
            {(filePreview || (editingTutorial && editingTutorial.fileUrl)) && (
              <Form.Group className="mb-3">
                <Form.Label>Preview</Form.Label>
                <div className="text-center">
                  {getFileType(file?.name || editingTutorial?.fileUrl) === 'video' ? (
                    <div className="ratio ratio-16x9">
                      <video controls className="border rounded">
                        <source src={filePreview || `${File_API_BASE_URL}${editingTutorial.fileUrl}`} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  ) : getFileType(file?.name || editingTutorial?.fileUrl) === 'pdf' ? (
                    <div className="border rounded p-2 bg-white">
                      <iframe
                        src={filePreview || `${File_API_BASE_URL}${editingTutorial.fileUrl}`}
                        title="PDF Preview"
                        width="100%"
                        height="400px"
                      />
                    </div>
                  ) : (
                    <div className="alert alert-warning">
                      Unsupported file format. Please upload a video or PDF file.
                    </div>
                  )}
                </div>
              </Form.Group>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : (editingTutorial ? 'Update' : 'Save')}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}

export default AdminTutorial;
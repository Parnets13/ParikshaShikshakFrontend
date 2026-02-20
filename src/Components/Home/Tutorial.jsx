import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

// Base API URL
const API_BASE_URL = 'http://localhost:8774/api/admin/tut'; 
 const Video_API_BASE_URL ='http://localhost:8774';

function Tutorial() {
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

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
      setError(null);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
      setError('Failed to load tutorials. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Format description to show first 100 characters with ellipsis
  const truncateDescription = (description) => {
    if (!description) return '';
    return description.length > 100 
      ? `${description.substring(0, 100)}...` 
      : description;
  };

  return (
    <Container className="py-4">
      <Row>
        <Col>
          <h1 className="text-center mb-4">Test Generator Tutorials</h1>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status" variant="primary" className="mb-3" />
              <p>Loading tutorials...</p>
            </div>
          ) : (
            <Row>
              <Col lg={8}>
                {/* Selected Video Player */}
                {selectedVideo ? (
                  <Card className="mb-4">
                    <Card.Body>
                      <div className="ratio ratio-16x9 mb-3">
                        <video controls>
                      <source src={`${Video_API_BASE_URL}${selectedVideo.videoUrl}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <Card.Title>{selectedVideo.title}</Card.Title>
                      <Card.Text>{selectedVideo.description}</Card.Text>
                      <Button 
                        variant="outline-secondary" 
                        onClick={() => setSelectedVideo(null)}
                      >
                        Back to Tutorial List
                      </Button>
                    </Card.Body>
                  </Card>
                ) : (
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Welcome to Tutorials</Card.Title>
                      <Card.Text>
                        Select a tutorial from the list to start learning. Our tutorials cover various aspects of the test generator system to help you make the most of its features.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                )}
                
                {/* Tutorials List */}
                <Card>
                  <Card.Header>
                    <h3 className="mb-0">Available Tutorials</h3>
                  </Card.Header>
                  <Card.Body className="p-0">
                    {tutorials.length > 0 ? (
                      <div className="list-group list-group-flush">
                        {tutorials.map((tutorial, index) => (
                          <div 
                            key={tutorial._id} 
                            className="list-group-item list-group-item-action"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setSelectedVideo(tutorial)}
                          >
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-1">
                                <span className="me-3">{tutorial.code}</span>
                                {tutorial.title}
                              </h5>
                              <small>{index + 1}</small>
                            </div>
                            <p className="mb-1">{truncateDescription(tutorial.description)}</p>
                            <small className="text-primary">Click to view tutorial</small>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p>No tutorials available yet.</p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              
              <Col lg={4}>
                {/* Recent Posts Sidebar */}
                <Card className="mb-4">
                  <Card.Header>
                    <h4 className="mb-0">Recent Posts</h4>
                  </Card.Header>
                  <Card.Body>
                    <div className="d-flex flex-column">
                      <a href="#" className="py-2 text-decoration-none text-dark border-bottom">
                        Role of Emotional Intelligence in Child Psychology
                      </a>
                      <a href="#" className="py-2 text-decoration-none text-dark border-bottom">
                        Key to Effective Board Examination Preparation
                      </a>
                      <a href="#" className="py-2 text-decoration-none text-dark border-bottom">
                        AISSEE Mock Test Creator App
                      </a>
                      <a href="#" className="py-2 text-decoration-none text-dark border-bottom">
                        Sunset of Online Class Scheduling Feature on Examin8
                      </a>
                      <a href="#" className="py-2 text-decoration-none text-dark">
                        How Teachers Can Make The Best Use of AI Tools in Education
                      </a>
                    </div>
                  </Card.Body>
                </Card>
                
                {/* Additional Info Card */}
                <Card>
                  <Card.Body>
                    <Card.Title>Need Help?</Card.Title>
                    <Card.Text>
                      If you're having trouble with any feature, check our tutorials or contact our support team for assistance.
                    </Card.Text>
                    <Button variant="primary" className="w-100">
                      Contact Support
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Tutorial;
import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Col,
  Card,
} from "react-bootstrap";


const StudentMark = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Header form state
  const [headerForm, setHeaderForm] = useState({
    schoolName: "",
    taluk: "",
    district: "",
    teacherName: ""
  });

  // Student form state
  const [studentForm, setStudentForm] = useState({
    name: "",
    firstFormative: {
      listeningAndSpeaking: "",
      readingAndComprehension: "",
      writingSkills: "",
      grammar: "",
      creativeExpression: "",
      total: ""
    },
    secondFormative: {
      listeningAndSpeaking: "",
      readingAndComprehension: "",
      writingSkills: "",
      grammar: "",
      creativeExpression: "",
      total: ""
    },
    summativeOne: {
      listeningAndSpeaking: "",
      readingAndComprehension: "",
      writingSkills: "",
      grammar: "",
      creativeExpression: ""
    },
    finalEvaluation: {
      totalMarks: "",
      percentage: "",
      grade: ""
    }
  });

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStudentFormChange = (section, field, value) => {
    setStudentForm(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  return (
    <div className="container-fluid mt-4">
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white">
          <h3 className="mb-0">ಶಾಲೆಯ ಮಾಹಿತಿ (School Information)</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>ಶಾಲೆಯ ಹೆಸರು (School Name)</Form.Label>
                  <Form.Control
                    type="text"
                    name="schoolName"
                    value={headerForm.schoolName}
                    onChange={handleHeaderChange}
                    placeholder="ಶಾಲೆಯ ಹೆಸರು"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>ತಾಲ್ಲೂಕು (Taluk)</Form.Label>
                  <Form.Control
                    type="text"
                    name="taluk"
                    value={headerForm.taluk}
                    onChange={handleHeaderChange}
                    placeholder="ತಾಲ್ಲೂಕು"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>ಜಿಲ್ಲೆ (District)</Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    value={headerForm.district}
                    onChange={handleHeaderChange}
                    placeholder="ಜಿಲ್ಲೆ"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>ಶಿಕ್ಷಕರ ಹೆಸರು (Teacher's Name)</Form.Label>
                  <Form.Control
                    type="text"
                    name="teacherName"
                    value={headerForm.teacherName}
                    onChange={handleHeaderChange}
                    placeholder="ಶಿಕ್ಷಕರ ಹೆಸರು"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header className="bg-success text-white">
          <h3 className="mb-0">ವಿದ್ಯಾರ್ಥಿ ಮೌಲ್ಯಮಾಪನ (Student Assessment)</h3>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3">
                  <Form.Label>ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು (Student's Name)</Form.Label>
                  <Form.Control
                    type="text"
                    value={studentForm.name}
                    onChange={(e) => setStudentForm({...studentForm, name: e.target.value})}
                    placeholder="ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* First Formative Assessment */}
            <Card className="mb-3">
              <Card.Header className="bg-info text-white">
                <h4 className="mb-0">ಮೊದಲ ರಚನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ (First Formative Assessment)</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಆಲಿಸುವಿಕೆ ಮತ್ತು ಮಾತನಾಡುವಿಕೆ (Listening and Speaking)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.firstFormative.listeningAndSpeaking}
                        onChange={(e) => handleStudentFormChange('firstFormative', 'listeningAndSpeaking', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಓದುವಿಕೆ ಮತ್ತು ಅರ್ಥಗ್ರಹಿಕೆ (Reading and Comprehension)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.firstFormative.readingAndComprehension}
                        onChange={(e) => handleStudentFormChange('firstFormative', 'readingAndComprehension', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಬರವಣಿಗೆ ಕೌಶಲ್ಯಗಳು (Writing Skills)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.firstFormative.writingSkills}
                        onChange={(e) => handleStudentFormChange('firstFormative', 'writingSkills', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ವ್ಯಾಕರಣ (Grammar)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.firstFormative.grammar}
                        onChange={(e) => handleStudentFormChange('firstFormative', 'grammar', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಸೃಜನಾತ್ಮಕ ಅಭಿವ್ಯಕ್ತಿ (Creative Expression)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.firstFormative.creativeExpression}
                        onChange={(e) => handleStudentFormChange('firstFormative', 'creativeExpression', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Second Formative Assessment */}
            <Card className="mb-3">
              <Card.Header className="bg-warning">
                <h4 className="mb-0">ಎರಡನೇ ರಚನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ (Second Formative Assessment)</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಆಲಿಸುವಿಕೆ ಮತ್ತು ಮಾತನಾಡುವಿಕೆ (Listening and Speaking)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.secondFormative.listeningAndSpeaking}
                        onChange={(e) => handleStudentFormChange('secondFormative', 'listeningAndSpeaking', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಓದುವಿಕೆ ಮತ್ತು ಅರ್ಥಗ್ರಹಿಕೆ (Reading and Comprehension)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.secondFormative.readingAndComprehension}
                        onChange={(e) => handleStudentFormChange('secondFormative', 'readingAndComprehension', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಬರವಣಿಗೆ ಕೌಶಲ್ಯಗಳು (Writing Skills)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.secondFormative.writingSkills}
                        onChange={(e) => handleStudentFormChange('secondFormative', 'writingSkills', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ವ್ಯಾಕರಣ (Grammar)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.secondFormative.grammar}
                        onChange={(e) => handleStudentFormChange('secondFormative', 'grammar', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಸೃಜನಾತ್ಮಕ ಅಭಿವ್ಯಕ್ತಿ (Creative Expression)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.secondFormative.creativeExpression}
                        onChange={(e) => handleStudentFormChange('secondFormative', 'creativeExpression', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Summative Assessment */}
            <Card className="mb-3">
              <Card.Header className="bg-danger text-white">
                <h4 className="mb-0">ಸಂಕಲನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ-1 (SA-1)</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಆಲಿಸುವಿಕೆ ಮತ್ತು ಮಾತನಾಡುವಿಕೆ (30 ಅಂಕಗಳು)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.summativeOne.listeningAndSpeaking}
                        onChange={(e) => handleStudentFormChange('summativeOne', 'listeningAndSpeaking', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಓದುವಿಕೆ ಮತ್ತು ಅರ್ಥಗ್ರಹಿಕೆ (40 ಅಂಕಗಳು)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.summativeOne.readingAndComprehension}
                        onChange={(e) => handleStudentFormChange('summativeOne', 'readingAndComprehension', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಬರವಣಿಗೆ ಕೌಶಲ್ಯಗಳು (10 ಅಂಕಗಳು)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.summativeOne.writingSkills}
                        onChange={(e) => handleStudentFormChange('summativeOne', 'writingSkills', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ವ್ಯಾಕರಣ (20 ಅಂಕಗಳು)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.summativeOne.grammar}
                        onChange={(e) => handleStudentFormChange('summativeOne', 'grammar', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಸೃಜನಾತ್ಮಕ ಅಭಿವ್ಯಕ್ತಿ (50 ಅಂಕಗಳು)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.summativeOne.creativeExpression}
                        onChange={(e) => handleStudentFormChange('summativeOne', 'creativeExpression', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Final Evaluation */}
            <Card>
              <Card.Header className="bg-dark text-white">
                <h4 className="mb-0">ಅಂತಿಮ ಮೌಲ್ಯಮಾಪನ (Final Evaluation)</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಒಟ್ಟು ಅಂಕಗಳು (Total Marks)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.finalEvaluation.totalMarks}
                        onChange={(e) => handleStudentFormChange('finalEvaluation', 'totalMarks', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಶೇಕಡಾವಾರು (Percentage)</Form.Label>
                      <Form.Control
                        type="number"
                        value={studentForm.finalEvaluation.percentage}
                        onChange={(e) => handleStudentFormChange('finalEvaluation', 'percentage', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>ಶ್ರೇಣಿ (Grade)</Form.Label>
                      <Form.Control
                        type="text"
                        value={studentForm.finalEvaluation.grade}
                        onChange={(e) => handleStudentFormChange('finalEvaluation', 'grade', e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="secondary" className="me-2">
                ರದ್ದುಮಾಡು (Cancel)
              </Button>
              <Button variant="primary">
                ಉಳಿಸು (Save)
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StudentMark;

import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Table, Button, Alert } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AchievementRecord2 = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(!id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const recordRef = useRef();

  const [formData, setFormData] = useState({
    academicYearStart: '',
    academicYearEnd: '',
    class: '5',
    studentName: '',
    schoolName: '',
    dob: '',
    admissionNo: '',
    motherName: '',
    fatherName: '',
    address: '',
    telephone: '',
    height: '',
    weight: '',
    bloodGroup: '',
    subjects: {
      'Language I': Array(9).fill(''),
      'Language II': Array(9).fill(''),
      'Language III': Array(9).fill(''),
      'Mathematics': Array(9).fill(''),
      'General Science': Array(9).fill(''),
      'Social Science': Array(9).fill(''),
      'Physical & Health Education': Array(9).fill(''),
      'Art Education/Work Experience': Array(9).fill(''),
      'Computer Education': Array(9).fill('')
    },
    coScholastic: {
      'Social-Emotional Skills': ['', ''],
      'Organisation Skills': ['', ''],
      'Scientific Skills': ['', ''],
      'Creativity': ['', ''],
      'Attitudes': ['', ''],
      'Values': ['', ''],
      'Fine Arts': ['', '']
    },
    specialAchievements: '',
    semester1: {
      daysAttended: '',
      workingDays: '',
      conclusion: '',
      studentSign: '',
      teacherSign: '',
      headMasterSign: '',
      parentsSign: ''
    },
    semester2: {
      daysAttended: '',
      workingDays: '',
      conclusion: '',
      studentSign: '',
      teacherSign: '',
      headMasterSign: '',
      parentsSign: ''
    },
    result: ''
  });

  // Load result if editing existing record
  useEffect(() => {
    if (id) {
      const fetchResult = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`/api/student-results/${id}`);
          setFormData(response.data.data);
          setLoading(false);
        } catch (err) {
          setError(err.response?.data?.message || 'Failed to fetch result');
          setLoading(false);
        }
      };
      fetchResult();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubjectChange = (subject, index, value) => {
    setFormData(prev => {
      const newSubjects = { ...prev.subjects };
      newSubjects[subject][index] = value;
      return { ...prev, subjects: newSubjects };
    });
  };

  const handleCoScholasticChange = (area, semester, value) => {
    setFormData(prev => {
      const newCoScholastic = { ...prev.coScholastic };
      newCoScholastic[area][semester === 'semester1' ? 0 : 1] = value;
      return { ...prev, coScholastic: newCoScholastic };
    });
  };

  const handleSemesterChange = (semester, field, value) => {
    setFormData(prev => ({
      ...prev,
      [semester]: {
        ...prev[semester],
        [field]: value
      }
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError(null);
    setSuccess(null);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      if (id) {
        // Update existing result
        await axios.put(`/api/student-results/${id}`, formData);
        setSuccess('Result updated successfully');
      } else {
        // Create new result
        await axios.post('/api/student-results', formData);
        setSuccess('Result created successfully');
      }
      
      setIsEditing(false);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save result');
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => recordRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          padding: 20px;
          background-color: white !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `
  });

  const handleDownloadPDF = () => {
    const input = recordRef.current;
    html2canvas(input, { 
      scale: 2,
      backgroundColor: '#FFFFFF'
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;
      
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(`achievement_record_${formData.admissionNo || 'new'}.pdf`);
    });
  };

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </Container>
  );

  return (
    <Container className="p-4" style={{ backgroundColor: '#f8d7da', fontFamily: 'Arial', border: '1px solid #000' }}>
      {error && <Alert variant="danger" onClose={() => setError(null)} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}
      
      <div className="d-flex justify-content-between mb-3 no-print">
        <div>
          <h5 className="mb-1">ಪ್ರಗತಿ ಪತ್ರ</h5>
          <h5 className="mb-3">ACHIEVEMENT RECORD</h5>
        </div>
        <div>
          <Button variant="primary" onClick={isEditing ? handleSave : toggleEdit} className="me-2" disabled={loading}>
            {isEditing ? (loading ? 'Saving...' : id ? 'Update' : 'Save') : 'Edit'}
          </Button>
          {!isEditing && (
            <>
              <Button variant="success" onClick={handlePrint} className="me-2">
                Print
              </Button>
              <Button variant="danger" onClick={handleDownloadPDF}>
                Download PDF
              </Button>
            </>
          )}
        </div>
      </div>

      <div ref={recordRef}>
        <Row className="mb-3">
          <Col className="text-center">
            <p>
              ಶೈಕ್ಷಣಿಕ ವರ್ಷ Academic Year 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '60px' }}
                name="academicYearStart"
                value={formData.academicYearStart}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="20__"
              />
              -
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '60px' }}
                name="academicYearEnd"
                value={formData.academicYearEnd}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="20__"
              />
            </p>
            <p>
              ತರಗತಿ / CLASS: 
              {['5', '6', '7', '8'].map(cls => (
                <Form.Check
                  key={cls}
                  inline
                  type="radio"
                  label={cls}
                  name="class"
                  id={`class-${cls}`}
                  checked={formData.class === cls}
                  onChange={() => setFormData({...formData, class: cls})}
                  disabled={!isEditing}
                />
              ))}
            </p>
          </Col>
        </Row>

        <Form>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>ಪದವಿ ಪಡೆದುಹೆಸರು / NAME OF STUDENT</Form.Label>
                <Form.Control 
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>ಶಾಲೆಯ ಹೆಸರು / SCHOOL NAME</Form.Label>
                <Form.Control 
                  name="schoolName"
                  value={formData.schoolName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>ಜ.ದಿನಾಂಕ / D.O.B.</Form.Label>
                <Form.Control 
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>ದಾಖಲೆ ಸಂ. / ADMISSION No.</Form.Label>
                <Form.Control 
                  name="admissionNo"
                  value={formData.admissionNo}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>ತಾಯಿಯ ಹೆಸರು / MOTHER'S NAME</Form.Label>
                <Form.Control 
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>ತಂದೆಯ ಹೆಸರು / FATHER'S NAME</Form.Label>
                <Form.Control 
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>ವಸತಿ ವಿಳಾಸ / RESIDENTIAL ADDRESS</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={2}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>ದೂರವಾಣಿ ಸಂ. / TELEPHONE No.</Form.Label>
                <Form.Control 
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>ಎತ್ತರ / HEIGHT</Form.Label>
                <Form.Control 
                  name="height"
                  value={formData.height}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>ತೂಕ / WEIGHT</Form.Label>
                <Form.Control 
                  name="weight"
                  value={formData.weight}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>ರಕ್ತದ ಗುಂಪು / BLOOD GROUP</Form.Label>
                <Form.Control 
                  as="select"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                >
                  <option value="">Select</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <hr />
        <h5 className="text-center">SCHOLASTIC ACHIEVEMENT</h5>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th rowSpan="2">ವಿಷಯ / SUBJECT</th>
              <th colSpan="4">I SEMESTER</th>
              <th colSpan="4">II SEMESTER</th>
              <th rowSpan="2">ಒಟ್ಟು / Total</th>
            </tr>
            <tr>
              <th>FA-1 (10%)</th><th>FA-2 (10%)</th><th>SA-1 (30%)</th><th>Total (50%)</th>
              <th>FA-3 (10%)</th><th>FA-4 (10%)</th><th>SA-2 (30%)</th><th>Total (50%)</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(formData.subjects).map(subject => (
              <tr key={subject}>
                <td>{subject}</td>
                {formData.subjects[subject].map((value, index) => (
                  <td key={index}>
                    <Form.Control
                      size="sm"
                      value={value}
                      onChange={(e) => handleSubjectChange(subject, index, e.target.value)}
                      disabled={!isEditing}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>

        <h6>* F.A. - Formative Assessment  * S.A. - Summative Assessment</h6>

        <h5 className="text-center mt-4">CO-SCHOLASTIC AREA</h5>
        <Table bordered size="sm">
          <thead>
            <tr>
              <th>ವಿವರ / DETAILS</th><th>I SEMESTER</th><th>II SEMESTER</th>
              <th>ವಿವರ / DETAILS</th><th>I SEMESTER</th><th>II SEMESTER</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Social-Emotional Skills</td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Social-Emotional Skills'][0]}
                  onChange={(e) => handleCoScholasticChange('Social-Emotional Skills', 'semester1', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Social-Emotional Skills'][1]}
                  onChange={(e) => handleCoScholasticChange('Social-Emotional Skills', 'semester2', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>Creativity</td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Creativity'][0]}
                  onChange={(e) => handleCoScholasticChange('Creativity', 'semester1', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Creativity'][1]}
                  onChange={(e) => handleCoScholasticChange('Creativity', 'semester2', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>Organisation Skills</td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Organisation Skills'][0]}
                  onChange={(e) => handleCoScholasticChange('Organisation Skills', 'semester1', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Organisation Skills'][1]}
                  onChange={(e) => handleCoScholasticChange('Organisation Skills', 'semester2', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>Attitudes</td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Attitudes'][0]}
                  onChange={(e) => handleCoScholasticChange('Attitudes', 'semester1', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Attitudes'][1]}
                  onChange={(e) => handleCoScholasticChange('Attitudes', 'semester2', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>Scientific Skills</td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Scientific Skills'][0]}
                  onChange={(e) => handleCoScholasticChange('Scientific Skills', 'semester1', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Scientific Skills'][1]}
                  onChange={(e) => handleCoScholasticChange('Scientific Skills', 'semester2', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>Values</td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Values'][0]}
                  onChange={(e) => handleCoScholasticChange('Values', 'semester1', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Values'][1]}
                  onChange={(e) => handleCoScholasticChange('Values', 'semester2', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
            </tr>
            <tr>
              <td>Fine Arts</td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Fine Arts'][0]}
                  onChange={(e) => handleCoScholasticChange('Fine Arts', 'semester1', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td>
                <Form.Control
                  as="select"
                  value={formData.coScholastic['Fine Arts'][1]}
                  onChange={(e) => handleCoScholasticChange('Fine Arts', 'semester2', e.target.value)}
                  disabled={!isEditing}
                >
                  <option value="">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Form.Control>
              </td>
              <td></td><td></td><td></td>
            </tr>
          </tbody>
        </Table>

        <h5 className="text-center">Special Achievements</h5>
        <p>
          ಸ್ಥಳೀಯ ಆಟಗಳು / Local Games, ಕ್ರೀಡೆ / Sports, ಯೋಗ / Yoga, ಚಿತ್ರಕಲೆ / Drawing, ನೃತ್ಯ / Dance,
          ಸೇವೆ / Empathy (Helping Nature), ಸೇವಾದಳ / Sevadal, ಎನ್.ಸಿ.ಸಿ / NCC, ಗೈಡ್ / Scouts & Guides,
          ಕೈತೆರೆ ಕೆಲಸ / Handicraft, ಜನಪದ ಕಲೆ / Folk Art, ತೋಟಗಾರಿಕೆ / Horticulture, ಸಾಮಾಜಿಕ ಸೇವೆ / Social Service, ಇತ್ಯಾದಿ / Others
        </p>
        <Form.Control 
          as="textarea" 
          rows={2} 
          placeholder="Details of Special Achievements"
          name="specialAchievements"
          value={formData.specialAchievements}
          onChange={handleInputChange}
          disabled={!isEditing}
        />

        <hr />
        <h5 className="text-center">GRADES DETAILS</h5>
        <Row>
          <Col md={6}>
            <Table bordered size="sm">
              <thead><tr><th>Scholastic Grades</th></tr></thead>
              <tbody>
                <tr><td>Marks 90-100</td><td>A+</td></tr>
                <tr><td>70-89</td><td>A</td></tr>
                <tr><td>50-69</td><td>B+</td></tr>
                <tr><td>30-49</td><td>B</td></tr>
                <tr><td>Below 30</td><td>C</td></tr>
              </tbody>
            </Table>
          </Col>
          <Col md={6}>
            <Table bordered size="sm">
              <thead><tr><th>Co-Scholastic Grades</th></tr></thead>
              <tbody>
                <tr><td>Very Good</td><td>A</td></tr>
                <tr><td>Good</td><td>B</td></tr>
                <tr><td>Average</td><td>C</td></tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Row>
          <Col>
            <h6>I SEMESTER</h6>
            <p>
              No. of Days Attended: 
              <Form.Control
                type="number"
                className="d-inline-block mx-2"
                style={{ width: '100px' }}
                name="daysAttended"
                value={formData.semester1.daysAttended}
                onChange={(e) => handleSemesterChange('semester1', 'daysAttended', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              No. of Working Days: 
              <Form.Control
                type="number"
                className="d-inline-block mx-2"
                style={{ width: '100px' }}
                name="workingDays"
                value={formData.semester1.workingDays}
                onChange={(e) => handleSemesterChange('semester1', 'workingDays', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Total Conclusion: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="conclusion"
                value={formData.semester1.conclusion}
                onChange={(e) => handleSemesterChange('semester1', 'conclusion', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Student: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="studentSign"
                value={formData.semester1.studentSign}
                onChange={(e) => handleSemesterChange('semester1', 'studentSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Class Teacher: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="teacherSign"
                value={formData.semester1.teacherSign}
                onChange={(e) => handleSemesterChange('semester1', 'teacherSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Head Master: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="headMasterSign"
                value={formData.semester1.headMasterSign}
                onChange={(e) => handleSemesterChange('semester1', 'headMasterSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Parents: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="parentsSign"
                value={formData.semester1.parentsSign}
                onChange={(e) => handleSemesterChange('semester1', 'parentsSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
          </Col>
          <Col>
            <h6>II SEMESTER</h6>
            <p>
              No. of Days Attended: 
              <Form.Control
                type="number"
                className="d-inline-block mx-2"
                style={{ width: '100px' }}
                name="daysAttended"
                value={formData.semester2.daysAttended}
                onChange={(e) => handleSemesterChange('semester2', 'daysAttended', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              No. of Working Days: 
              <Form.Control
                type="number"
                className="d-inline-block mx-2"
                style={{ width: '100px' }}
                name="workingDays"
                value={formData.semester2.workingDays}
                onChange={(e) => handleSemesterChange('semester2', 'workingDays', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Total Conclusion: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="conclusion"
                value={formData.semester2.conclusion}
                onChange={(e) => handleSemesterChange('semester2', 'conclusion', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Student: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="studentSign"
                value={formData.semester2.studentSign}
                onChange={(e) => handleSemesterChange('semester2', 'studentSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Class Teacher: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="teacherSign"
                value={formData.semester2.teacherSign}
                onChange={(e) => handleSemesterChange('semester2', 'teacherSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Head Master: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="headMasterSign"
                value={formData.semester2.headMasterSign}
                onChange={(e) => handleSemesterChange('semester2', 'headMasterSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
            <p>
              Sign. of Parents: 
              <Form.Control
                type="text"
                className="d-inline-block mx-2"
                style={{ width: '200px' }}
                name="parentsSign"
                value={formData.semester2.parentsSign}
                onChange={(e) => handleSemesterChange('semester2', 'parentsSign', e.target.value)}
                disabled={!isEditing}
              />
            </p>
          </Col>
        </Row>

        <h5 className="mt-3">
          ಫಲಿತಾಂಶ / RESULT: 
          <Form.Control
            type="text"
            className="d-inline-block mx-2"
            style={{ width: '300px' }}
            name="result"
            value={formData.result}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
        </h5>
        <p>ಮಾತು ತಾಯಿ / HM / Principal Signature with School Seal</p>

        <h6>ಅಭಿಭಾವಕರ ಗಮನಕ್ಕೆ / For Kind Attention of the Parents:</h6>
        <ul>
          <li>This Achievement Record reflects the progress of your child in all aspects.</li>
          <li>Continuous Comprehensive Evaluation involves 4 Formative and 1 Summative assessment.</li>
          <li>Talents of your child have been recognised through this school report. Let us together positively encourage for further improvement of the same.</li>
          <li>Kindly ensure the attendance of your child for every Formative and Summative assessment.</li>
          <li>Carefully preserve this record since it is very useful in understanding different aspects of your child.</li>
        </ul>
      </div>
    </Container>
  );
};

export default AchievementRecord2;
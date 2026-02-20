import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const AchievementRecord3 = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    schoolName: '',
    academicYearStart: '',
    academicYearEnd: '',
    studentName: '',
    class: '9',
    dob: '',
    admissionNo: '',
    motherName: '',
    fatherName: '',
    address: '',
    telephone: '',
    height: '',
    weight: '',
    bloodGroup: '',
    term1Subjects: {
      'Language I': Array(8).fill(''),
      'Language II': Array(8).fill(''),
      'Language III': Array(8).fill(''),
      'Mathematics': Array(8).fill(''),
      'General Science': Array(8).fill(''),
      'Social Science': Array(8).fill('')
    },
    term2Subjects: {
      'Language I': Array(8).fill(''),
      'Language II': Array(8).fill(''),
      'Language III': Array(8).fill(''),
      'Mathematics': Array(8).fill(''),
      'General Science': Array(8).fill(''),
      'Social Science': Array(8).fill('')
    },
    coScholastic: {
      'Physical & Health Education': '',
      'Attitude & Values': '',
      'Work Experience': '',
      'Art Education': ''
    },
    workingDays: '',
    daysAttended: '',
    specialAchievements: '',
    parentSign: '',
    teacherSign: '',
    principalSign: ''
  });

  const recordRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTermSubjectChange = (term, subject, index, value) => {
    setFormData(prev => {
      const newTermSubjects = { ...prev[term === 'term1' ? 'term1Subjects' : 'term2Subjects'] };
      newTermSubjects[subject][index] = value;
      return {
        ...prev,
        [term === 'term1' ? 'term1Subjects' : 'term2Subjects']: newTermSubjects
      };
    });
  };

  const handleCoScholasticChange = (subject, value) => {
    setFormData(prev => ({
      ...prev,
      coScholastic: {
        ...prev.coScholastic,
        [subject]: value
      }
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handlePrint = useReactToPrint({
    content: () => recordRef.current,
  });

  const handleDownloadPDF = () => {
    const input = recordRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
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
      
      pdf.save('achievement_record.pdf');
    });
  };

  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between mb-3">
        <h4 className="text-center mb-3">ಪ್ರಗತಿ ಪತ್ರ / ACHIEVEMENT RECORD</h4>
        <div>
          <button className="btn btn-primary me-2" onClick={toggleEdit}>
            {isEditing ? 'Save' : 'Edit'}
          </button>
          {!isEditing && (
            <>
              <button className="btn btn-success me-2" onClick={handlePrint}>
                Print
              </button>
              <button className="btn btn-danger" onClick={handleDownloadPDF}>
                Download PDF
              </button>
            </>
          )}
        </div>
      </div>

      <div ref={recordRef}>
        <div className="container border p-4">
          <div className="row mb-3">
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                value={formData.schoolName}
                onChange={(e) => handleInputChange(e)}
                name="schoolName"
                disabled={!isEditing}
                placeholder="ಕಾಲಿಯ ಹೆಸರು / NAME OF THE SCHOOL"
              />
            </div>
            <div className="col-6 text-end d-flex align-items-center justify-content-end">
              <span>ಶೈಕ್ಷಣಿಕ ವರ್ಷ / Academic Year</span>
              <input
                type="text"
                className="form-control ms-2"
                style={{ width: '60px' }}
                value={formData.academicYearStart}
                onChange={(e) => handleInputChange(e)}
                name="academicYearStart"
                disabled={!isEditing}
                placeholder="20__"
              />
              <span className="mx-1">-</span>
              <input
                type="text"
                className="form-control"
                style={{ width: '60px' }}
                value={formData.academicYearEnd}
                onChange={(e) => handleInputChange(e)}
                name="academicYearEnd"
                disabled={!isEditing}
                placeholder="20__"
              />
            </div>
          </div>

          <div className="text-center mb-3">
            <select
              className="form-select d-inline-block me-2"
              style={{ width: '60px' }}
              value={formData.class}
              onChange={(e) => handleInputChange(e)}
              name="class"
              disabled={!isEditing}
            >
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <form>
            <div className="row mb-2">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange(e)}
                  name="studentName"
                  disabled={!isEditing}
                  placeholder="ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು / STUDENT'S NAME"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  value={formData.class}
                  onChange={(e) => handleInputChange(e)}
                  name="class"
                  disabled={!isEditing}
                  placeholder="ತರಗತಿ / CLASS"
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <input
                  type="date"
                  className="form-control"
                  value={formData.dob}
                  onChange={(e) => handleInputChange(e)}
                  name="dob"
                  disabled={!isEditing}
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  value={formData.admissionNo}
                  onChange={(e) => handleInputChange(e)}
                  name="admissionNo"
                  disabled={!isEditing}
                  placeholder="ದಾಖಲೆ ಸಂಖ್ಯೆ / ADMISSION No."
                />
              </div>
            </div>

            <div className="row mb-2">
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  value={formData.motherName}
                  onChange={(e) => handleInputChange(e)}
                  name="motherName"
                  disabled={!isEditing}
                  placeholder="ತಾಯಿಯ ಹೆಸರು / MOTHER'S NAME"
                />
              </div>
              <div className="col-6">
                <input
                  type="text"
                  className="form-control"
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange(e)}
                  name="fatherName"
                  disabled={!isEditing}
                  placeholder="ತಂದೆಯ ಹೆಸರು / FATHER'S NAME"
                />
              </div>
            </div>

            <div className="mb-2">
              <textarea
                className="form-control"
                value={formData.address}
                onChange={(e) => handleInputChange(e)}
                name="address"
                disabled={!isEditing}
                placeholder="ವಾಸಸ್ಥಳ ವಿಳಾಸ / RESIDENTIAL ADDRESS"
              />
            </div>

            <div className="mb-2">
              <input
                type="tel"
                className="form-control"
                value={formData.telephone}
                onChange={(e) => handleInputChange(e)}
                name="telephone"
                disabled={!isEditing}
                placeholder="ದೂರವಾಣಿ ಸಂಖ್ಯೆ / TELEPHONE No."
              />
            </div>

            <div className="row mb-2">
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  value={formData.height}
                  onChange={(e) => handleInputChange(e)}
                  name="height"
                  disabled={!isEditing}
                  placeholder="ಎತ್ತರ / HEIGHT"
                />
              </div>
              <div className="col-4">
                <input
                  type="text"
                  className="form-control"
                  value={formData.weight}
                  onChange={(e) => handleInputChange(e)}
                  name="weight"
                  disabled={!isEditing}
                  placeholder="ತೂಕ / WEIGHT"
                />
              </div>
              <div className="col-4">
                <select
                  className="form-select"
                  value={formData.bloodGroup}
                  onChange={(e) => handleInputChange(e)}
                  name="bloodGroup"
                  disabled={!isEditing}
                >
                  <option value="">ರಕ್ತ ಗುಂಪು / BLOOD GROUP</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div className="row mt-4 text-center">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={formData.parentSign}
                  onChange={(e) => handleInputChange(e)}
                  name="parentSign"
                  disabled={!isEditing}
                  placeholder="ಪೋಷಕರ ಸಹಿ / Parent's Sign."
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={formData.teacherSign}
                  onChange={(e) => handleInputChange(e)}
                  name="teacherSign"
                  disabled={!isEditing}
                  placeholder="ತರಗತಿ ಶಿಕ್ಷಕರ ಸಹಿ / Class Teacher's Sign."
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  value={formData.principalSign}
                  onChange={(e) => handleInputChange(e)}
                  name="principalSign"
                  disabled={!isEditing}
                  placeholder="ಮುಖ್ಯೋಪಾಧ್ಯಾಯ ಸಹಿ / H.M./Principal Sign."
                />
              </div>
            </div>
          </form>
        </div>

        <div className="container my-4">
          <h5 className="text-center fw-bold">ಭಾಗ - ಅ / PART - A</h5>
          <h6 className="text-center">ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ / SCHOLASTIC ACHIEVEMENT - Term - I</h6>

          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th rowSpan="2">ವಿಷಯಗಳು / SUBJECTS</th>
                <th colSpan="2">FA-1</th>
                <th colSpan="2">FA-2</th>
                <th rowSpan="2">FA-1+2<br /> TOTAL</th>
                <th rowSpan="2">TOTAL<br /> Reduce to<br /> 25/20</th>
                <th rowSpan="2">S.A<br /> Summative Assessment</th>
                <th rowSpan="2">TOTAL<br /> FA+SA<br /> 125/100</th>
                <th rowSpan="2">Grade</th>
              </tr>
              <tr>
                <th>Marks</th>
                <th>ಅಂಕಗಳು</th>
                <th>Marks</th>
                <th>ಅಂಕಗಳು</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData.term1Subjects).map((subject, idx) => (
                <tr key={idx}>
                  <td>{subject}</td>
                  {formData.term1Subjects[subject].map((value, i) => (
                    <td key={i}>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={value}
                        onChange={(e) => handleTermSubjectChange('term1', subject, i, e.target.value)}
                        disabled={!isEditing}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <p className="small">
            * TOTAL FA 1st Language - Proportionate - 25 Marks other Subjects - 20 Marks, SA 1st Language 100 Marks & other Subjects 80 Marks<br />
            * ಒಟ್ಟು ಶೈಕ್ಷಣಿಕ ಪ್ರಥಮ ಭಾಷೆ 25 ಅಂಕಗಳಿಗೆ ಪ್ರಮಾಣಿತ, ಇತರ ವಿಷಯಗಳು 20 ಅಂಕಗಳು, ಪ್ರಥಮ ಭಾಷೆ ಶೈಕ್ಷಣಿಕ ಮೌಲ್ಯಮಾಪನ 100 ಅಂಕಗಳು ಇತರ ವಿಷಯಗಳು 80 ಅಂಕಗಳು
          </p>

          <h6 className="text-center mt-4">ಶೈಕ್ಷಣಿಕ ಸಾಧನೆ / SCHOLASTIC ACHIEVEMENT - Term - II</h6>

          <table className="table table-bordered text-center">
            <thead className="table-light">
              <tr>
                <th rowSpan="2">ವಿಷಯಗಳು / SUBJECTS</th>
                <th colSpan="2">FA-3</th>
                <th colSpan="2">FA-4</th>
                <th rowSpan="2">FA-3+4<br /> TOTAL</th>
                <th rowSpan="2">TOTAL<br /> Reduce to<br /> 25/20</th>
                <th rowSpan="2">Preparatory Exam</th>
                <th rowSpan="2">TOTAL<br /> FA+SA<br /> 125/100</th>
                <th rowSpan="2">Grade</th>
              </tr>
              <tr>
                <th>Marks</th>
                <th>ಅಂಕಗಳು</th>
                <th>Marks</th>
                <th>ಅಂಕಗಳು</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData.term2Subjects).map((subject, idx) => (
                <tr key={idx}>
                  <td>{subject}</td>
                  {formData.term2Subjects[subject].map((value, i) => (
                    <td key={i}>
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        value={value}
                        onChange={(e) => handleTermSubjectChange('term2', subject, i, e.target.value)}
                        disabled={!isEditing}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <p className="small">
            * TOTAL FA 1st Language - Proportionate - 25 Marks other Subjects - 20 Marks, SA 1st Language 100 Marks & other Subjects 80 Marks<br />
            * ಒಟ್ಟು ಶೈಕ್ಷಣಿಕ ಪ್ರಥಮ ಭಾಷೆ 25 ಅಂಕಗಳಿಗೆ ಪ್ರಮಾಣಿತ, ಇತರ ವಿಷಯಗಳು 20 ಅಂಕಗಳು, ಪ್ರಥಮ ಭಾಷೆ ಶೈಕ್ಷಣಿಕ ಮೌಲ್ಯಮಾಪನ 100 ಅಂಕಗಳು ಇತರ ವಿಷಯಗಳು 80 ಅಂಕಗಳು
          </p>

          <div className="d-flex justify-content-between small">
            <div>* ರಾ.ಮೌಲ್ಯ: ರೂಪಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ (F.A-Formative Assessment)</div>
            <div>* ಸಂ.ಮೌಲ್ಯ: ಸಮಾಪನಾತ್ಮಕ ಮೌಲ್ಯಮಾಪನ (S.A-Summative Assessment)</div>
          </div>
        </div>

        <div className="container border p-4 mt-4">
          <h5 className="text-center fw-bold">ಭಾಗ - ಬ / PART - B<br />ಸಹ ಪಠ್ಯ ವಿಷಯಗಳಲ್ಲಿ ವಿದ್ಯಾರ್ಥಿಯ ಸಾಧನೆ / CO-SCHOLASTIC SUBJECTS</h5>

          <table className="table table-bordered text-center">
            <thead>
              <tr>
                <th>ವಿಷಯಗಳು / SUBJECT</th>
                <th>ಶ್ರೇಣಿ / GRADE</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData.coScholastic).map((subject, idx) => (
                <tr key={idx}>
                  <td>{subject}</td>
                  <td>
                    <select
                      className="form-select"
                      value={formData.coScholastic[subject]}
                      onChange={(e) => handleCoScholasticChange(subject, e.target.value)}
                      disabled={!isEditing}
                    >
                      <option value="">Select Grade</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h6 className="fw-bold mt-4">ಹಾಜರಾತಿ / Attendance</h6>
          <table className="table table-bordered text-center">
            <tbody>
              <tr>
                <td>ಹಾಜರಿದ ದಿನಗಳು / No. of Working Days</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.workingDays}
                    onChange={(e) => handleInputChange(e)}
                    name="workingDays"
                    disabled={!isEditing}
                  />
                </td>
              </tr>
              <tr>
                <td>ಹಾಜರಿಯಾದ ದಿನಗಳು / No. of days Attended</td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.daysAttended}
                    onChange={(e) => handleInputChange(e)}
                    name="daysAttended"
                    disabled={!isEditing}
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <h6 className="fw-bold mt-4">ವಿಶೇಷ ಸಾಧನೆಯ ಕ್ಷೇತ್ರಗಳು / Special Achievements</h6>
          <p>
            ಸ್ಥಳೀಯ ಆಟಗಳು / Local Games / Sports / Yoga / Drawing / Dance / Empathy
            (Helping Nature) / Sevadal / NCC / Scouts & Guides / Handicraft / Folk Art /
            Horticulture / Social Service / Others.
          </p>

          <div className="mb-3">
            <label className="form-label">ವಿಶೇಷ ಸಾಧನೆಯ ವಿವರ / Details of Special Achievements:</label>
            <textarea
              className="form-control"
              rows="3"
              value={formData.specialAchievements}
              onChange={(e) => handleInputChange(e)}
              name="specialAchievements"
              disabled={!isEditing}
            ></textarea>
          </div>

          <div className="row mt-4">
            <div className="col text-start">
              <p>ಪೋಷಕರ ಸಹಿ :<br />Parent's Sign.</p>
              <input
                type="text"
                className="form-control"
                value={formData.parentSign}
                onChange={(e) => handleInputChange(e)}
                name="parentSign"
                disabled={!isEditing}
              />
            </div>
            <div className="col text-center">
              <p>ತರಗತಿ ಶಿಕ್ಷಕರ ಸಹಿ :<br />Class Teacher's Sign.</p>
              <input
                type="text"
                className="form-control"
                value={formData.teacherSign}
                onChange={(e) => handleInputChange(e)}
                name="teacherSign"
                disabled={!isEditing}
              />
            </div>
            <div className="col text-end">
              <p>ಮುಖ್ಯೋಪಾಧ್ಯಾಯ/ಪ್ರಿಂಸಿಪಾಲ್ ಸಹಿ :<br />Sign. of the H.M/Principal</p>
              <input
                type="text"
                className="form-control"
                value={formData.principalSign}
                onChange={(e) => handleInputChange(e)}
                name="principalSign"
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementRecord3;
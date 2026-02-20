import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getAllClasses,
  getSchoolProfile,
  getStudentsByClass,
  saveAdmitCard,
  getAllTerms,
  getAllAssessmentTypes,
  getSubjectsByClass
} from '../../services/resultMakerService';

const AdmitCards = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedClassId, setSelectedClassId] = useState('');
  const [selectedClassNumber, setSelectedClassNumber] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedTermId, setSelectedTermId] = useState('');
  const [selectedAssessment, setSelectedAssessment] = useState('');
  const [examCenter, setExamCenter] = useState('');
  const [examSchedule, setExamSchedule] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [savedAdmitCard, setSavedAdmitCard] = useState(null);
  const [showAdmitCardPreview, setShowAdmitCardPreview] = useState(false);
  const [principalSignature, setPrincipalSignature] = useState(null);
  const [schoolProfile, setSchoolProfile] = useState(null);
  
  // Dynamic terms
  const [terms, setTerms] = useState([]);

  // Dynamic assessment types
  const [assessmentTypes, setAssessmentTypes] = useState([]);

  // Dynamic subjects
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    fetchClasses();
    fetchSchoolProfile();
  }, []);

  useEffect(() => {
    // Fetch terms and subjects when class is selected
    if (selectedClassId) {
      fetchTerms();
      fetchSubjects();
    } else {
      setTerms([]);
      setSelectedTerm('');
      setSelectedTermId('');
      setAssessmentTypes([]);
      setSelectedAssessment('');
      setSubjects([]);
      setExamSchedule([]);
    }
  }, [selectedClassId]);

  useEffect(() => {
    // Fetch assessment types when both class and term are selected
    if (selectedClassId && selectedTermId) {
      fetchAssessmentTypes();
    } else {
      setAssessmentTypes([]);
      setSelectedAssessment('');
    }
  }, [selectedClassId, selectedTermId]);

  useEffect(() => {
    // Auto-populate subjects when class and assessment are selected
    if (selectedClassId && selectedAssessment && subjects.length > 0) {
      loadSubjectsForClass();
    }
  }, [selectedClassId, selectedAssessment, subjects]);

  const fetchClasses = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found, user not logged in');
        alert('Please login to access this feature');
        navigate('/login');
        return;
      }

      const response = await getAllClasses();
      console.log('Classes API response:', response);
      
      // Handle different response structures
      if (response.success && response.data) {
        console.log('Classes data:', response.data);
        setClasses(response.data);
      } else if (response.data && Array.isArray(response.data)) {
        // Sometimes response.data exists without success flag
        console.log('Classes data (no success flag):', response.data);
        setClasses(response.data);
      } else if (Array.isArray(response)) {
        // Sometimes response is directly an array
        console.log('Classes data (direct array):', response);
        setClasses(response);
      } else {
        console.log('Unexpected response format');
        alert('Unable to fetch classes. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
      if (error.response && error.response.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('Error fetching classes. Please try again.');
      }
    }
  };

  const fetchSchoolProfile = async () => {
    try {
      const response = await getSchoolProfile();
      if (response.success && response.data) {
        setSchoolProfile(response.data);
        setPrincipalSignature(response.data.principalSignature);
      }
    } catch (error) {
      console.error('Error fetching school profile:', error);
    }
  };

  const fetchTerms = async () => {
    if (!selectedClassId) {
      console.log('No class selected, cannot fetch terms');
      setTerms([]);
      return;
    }

    try {
      const response = await getAllTerms(selectedClassId);
      console.log('Fetch terms response:', response);
      if (response.success && response.data) {
        console.log('Terms data:', response.data);
        setTerms(response.data);
      } else {
        console.log('No terms data in response');
        setTerms([]);
      }
    } catch (error) {
      console.error('Error fetching terms:', error);
      setTerms([]);
    }
  };

  // Fetch subjects for selected class
  const fetchSubjects = async () => {
    if (!selectedClassId) {
      console.log('No class selected, cannot fetch subjects');
      setSubjects([]);
      return;
    }

    try {
      const response = await getSubjectsByClass(selectedClassId);
      console.log('Fetch subjects response:', response);
      if (response.success && response.data) {
        console.log('Subjects data:', response.data);
        setSubjects(response.data);
      } else {
        console.log('No subjects data in response');
        setSubjects([]);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setSubjects([]);
    }
  };

  // Assessment Type Management Functions
  const fetchAssessmentTypes = async () => {
    if (!selectedClassId || !selectedTermId) {
      console.log('Class or term not selected, cannot fetch assessment types');
      setAssessmentTypes([]);
      return;
    }

    try {
      const response = await getAllAssessmentTypes(selectedClassId, selectedTermId);
      console.log('Fetch assessment types response:', response);
      if (response.success && response.data) {
        console.log('Assessment types data:', response.data);
        setAssessmentTypes(response.data);
      } else {
        console.log('No assessment types data in response');
        setAssessmentTypes([]);
      }
    } catch (error) {
      console.error('Error fetching assessment types:', error);
      setAssessmentTypes([]);
    }
  };

  const loadSubjectsForClass = () => {
    // Use dynamic subjects from Class Settings
    if (subjects.length === 0) {
      console.log('No subjects available for this class');
      setExamSchedule([]);
      return;
    }

    const schedule = subjects.map((subject, index) => ({
      sr: index + 1,
      subject: subject.subjectName,
      examDate: '',
      startTime: '',
      endTime: '',
      venue: '',
      roomNo: '',
      selected: true // All subjects selected by default
    }));
    
    setExamSchedule(schedule);
    // Initialize all subjects as selected
    const subjectNames = subjects.map(s => s.subjectName);
    setSelectedSubjects(subjectNames);
  };

  // Handle individual subject checkbox
  const handleSubjectCheckbox = (index) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[index].selected = !updatedSchedule[index].selected;
    setExamSchedule(updatedSchedule);
    
    // Update selected subjects array
    const selected = updatedSchedule
      .filter(item => item.selected)
      .map(item => item.subject);
    setSelectedSubjects(selected);
  };

  // Handle select all checkbox
  const handleSelectAllSubjects = (e) => {
    const isChecked = e.target.checked;
    const updatedSchedule = examSchedule.map(item => ({
      ...item,
      selected: isChecked
    }));
    setExamSchedule(updatedSchedule);
    
    if (isChecked) {
      const allSubjects = examSchedule.map(item => item.subject);
      setSelectedSubjects(allSubjects);
    } else {
      setSelectedSubjects([]);
    }
  };

  // Check if all subjects are selected
  const areAllSubjectsSelected = () => {
    return examSchedule.length > 0 && examSchedule.every(item => item.selected);
  };

  // Load students for selected class
  const handleLoadStudents = async () => {
    if (!selectedClassId) {
      alert('Please select a class first');
      return;
    }

    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }

    try {
      const response = await getStudentsByClass(selectedClassId);
      if (response.success && response.data) {
        setStudents(response.data);
        setShowStudentModal(true);
      } else {
        alert('No students found for this class');
      }
    } catch (error) {
      console.error('Error loading students:', error);
      alert('Error loading students. Please try again.');
    }
  };

  // Handle individual student checkbox
  const handleStudentCheckbox = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Handle select all students
  const handleSelectAllStudents = (e) => {
    if (e.target.checked) {
      const allStudentIds = students.map(s => s._id);
      setSelectedStudents(allStudentIds);
    } else {
      setSelectedStudents([]);
    }
  };

  // Check if all students are selected
  const areAllStudentsSelected = () => {
    return students.length > 0 && selectedStudents.length === students.length;
  };

  const getClassNumber = (className) => {
    // Extract number from class name (e.g., "Class 5" -> 5, "5th" -> 5, "V" -> 5)
    const match = className.match(/\d+/);
    if (match) {
      return parseInt(match[0]);
    }
    
    // Handle Roman numerals
    const romanMap = { 'I': 1, 'II': 2, 'III': 3, 'IV': 4, 'V': 5, 'VI': 6, 'VII': 7, 'VIII': 8, 'IX': 9, 'X': 10 };
    const romanMatch = className.match(/\b([IVX]+)\b/);
    if (romanMatch && romanMap[romanMatch[1]]) {
      return romanMap[romanMatch[1]];
    }
    
    return null;
  };

  const handleBack = () => {
    navigate('/resultsheetmaker');
  };

  const handleClassChange = (e) => {
    const classDisplayName = e.target.value;
    setSelectedClass(classDisplayName);
    
    // Find the class object to get the ID
    const classObj = classes.find(c => getClassDisplayName(c) === classDisplayName);
    if (classObj) {
      setSelectedClassId(classObj._id);
    }
    
    // Extract class number
    const classNum = getClassNumber(classDisplayName);
    setSelectedClassNumber(classNum);
    
    // Reset dependent selections
    setSelectedTerm('');
    setSelectedAssessment('');
    setExamSchedule([]);
    setStudents([]);
    setSelectedStudents([]);
    setSavedAdmitCard(null);
    setShowAdmitCardPreview(false);
  };

  const handleTermChange = (e) => {
    const termName = e.target.value;
    setSelectedTerm(termName);
    
    // Find the term object to get its ID
    const selectedTermObj = terms.find(t => t.termName === termName);
    setSelectedTermId(selectedTermObj?._id || '');
    
    setSelectedAssessment('');
    setExamSchedule([]);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[index][field] = value;
    setExamSchedule(updatedSchedule);
  };

  const handleTimeChange = (index, field, timeValue) => {
    const updatedSchedule = [...examSchedule];
    updatedSchedule[index][field] = timeValue;
    setExamSchedule(updatedSchedule);
  };

  const convertTo12Hour = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const parseTime12Hour = (timeStr) => {
    if (!timeStr) return { hour: '', minute: '', period: 'AM' };
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      return {
        hour: match[1],
        minute: match[2],
        period: match[3].toUpperCase()
      };
    }
    return { hour: '', minute: '', period: 'AM' };
  };

  const formatTime12Hour = (hour, minute, period) => {
    if (!hour || !minute) return '';
    return `${hour}:${minute} ${period}`;
  };

  const handleSaveDateSheet = async () => {
    if (!selectedClass || !selectedTerm || !selectedAssessment) {
      alert('Please select class, term, and name of the examination');
      return;
    }

    if (!examCenter.trim()) {
      alert('Please enter the exam center');
      return;
    }

    if (selectedSubjects.length === 0) {
      alert('Please select at least one subject');
      return;
    }

    if (selectedStudents.length === 0) {
      alert('Please select at least one student');
      return;
    }
    
    // Only validate fields for selected subjects
    const selectedSchedule = examSchedule.filter(item => item.selected);
    const hasEmptyFields = selectedSchedule.some(
      item => !item.examDate || !item.startTime || !item.endTime || !item.venue || !item.roomNo
    );
    
    if (hasEmptyFields) {
      alert('Please fill exam date, start time, end time, venue, and room number for all selected subjects');
      return;
    }

    try {
      // Prepare data for backend
      const admitCardData = {
        classId: selectedClassId,
        className: selectedClass,
        term: selectedTerm,
        assessment: selectedAssessment,
        examCenter: examCenter,
        selectedSubjects: selectedSubjects,
        examSchedule: selectedSchedule.map(item => ({
          subject: item.subject,
          examDate: item.examDate,
          startTime: item.startTime,
          endTime: item.endTime,
          venue: item.venue,
          roomNo: item.roomNo
        })),
        selectedStudents: selectedStudents
      };

      // Save to backend
      const response = await saveAdmitCard(admitCardData);
      
      if (response.success) {
        // Get full student details for selected students
        const selectedStudentDetails = students.filter(s => selectedStudents.includes(s._id));
        
        // Prepare admit card data with student details
        const admitCardWithStudents = {
          ...admitCardData,
          students: selectedStudentDetails,
          savedAt: new Date().toISOString()
        };

        setSavedAdmitCard(admitCardWithStudents);
        setShowAdmitCardPreview(true);
        alert(`Admit cards generated successfully for ${selectedStudents.length} student(s)!`);
      }
    } catch (error) {
      console.error('Error saving admit card:', error);
      alert('Error saving admit card. Please try again.');
    }
  };

  const handlePrintAdmitCard = () => {
    window.print();
  };

  const getClassDisplayName = (classItem) => {
    if (classItem.className && classItem.section) {
      return `${classItem.className} - ${classItem.section}`;
    }
    return classItem.name || classItem.className || classItem;
  };

  const showScheduleTable = selectedClass && selectedTerm && selectedAssessment;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', paddingBottom: '50px' }}>
      {/* Header */}
      <div className="bg-info text-white py-3 px-4 d-flex justify-content-between align-items-center">
        <button className="btn btn-link text-white p-0" onClick={handleBack}>
          <i className="fas fa-arrow-left fs-4"></i>
        </button>
        <h5 className="mb-0 fw-bold">Session : 2025-2026</h5>
        <div className="d-flex gap-3">
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-calendar-alt fs-4"></i>
          </button>
          <button className="btn btn-link text-white p-0">
            <i className="fas fa-question-circle fs-4"></i>
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="bg-white py-3 px-4 text-center border-bottom">
        <h4 className="mb-0 fw-bold">Admit Cards</h4>
      </div>

      {/* Form Container - Responsive Layout */}
      <div className="container-fluid px-3 px-md-4 py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9">
            {/* Class Dropdown */}
            <div className="mb-3 mb-md-4">
              <label className="form-label text-info fw-semibold fs-6 fs-md-5">Admit Cards for Class</label>
              <select
                className="form-select form-select-lg"
                value={selectedClass}
                onChange={handleClassChange}
                style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
              >
                <option value="">Select Class</option>
                {classes.map((classItem, index) => (
                  <option key={classItem._id || index} value={getClassDisplayName(classItem)}>
                    {getClassDisplayName(classItem)}
                  </option>
                ))}
              </select>
            </div>

            {/* Term Dropdown */}
            <div className="mb-3 mb-md-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2 gap-2">
                <label className="form-label text-secondary fw-semibold fs-6 fs-md-5 mb-0">Select Term</label>
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Manage terms in <a href="/resultsheetmaker/class-settings" className="text-decoration-none">Class Settings</a>
                </small>
              </div>
              <select
                className="form-select form-select-lg"
                value={selectedTerm}
                onChange={handleTermChange}
                style={{ borderColor: '#6c757d', borderWidth: '2px' }}
              >
                <option value="">Select Term</option>
                {terms.map((term) => (
                  <option key={term._id || term.termName} value={term.termName}>
                    {term.termName}
                  </option>
                ))}
              </select>
            </div>

            {/* Name of the Examination Dropdown */}
            <div className="mb-3 mb-md-4">
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-2 gap-2">
                <label className="form-label text-info fw-semibold fs-6 fs-md-5 mb-0">Select Name of the Examination</label>
                <small className="text-muted">
                  <i className="fas fa-info-circle me-1"></i>
                  Manage examinations in <a href="/resultsheetmaker/class-settings" className="text-decoration-none">Class Settings</a>
                </small>
              </div>
              <select
                className="form-select form-select-lg"
                value={selectedAssessment}
                onChange={(e) => setSelectedAssessment(e.target.value)}
                style={{ borderColor: '#17a2b8', borderWidth: '2px' }}
                disabled={!selectedTerm}
              >
                <option value="">Select Name of the Examination</option>
                {assessmentTypes.map((assessment) => (
                  <option key={assessment._id} value={assessment.assessmentName}>
                    {assessment.assessmentName}
                  </option>
                ))}
              </select>
            </div>

            {/* Exam Center Input */}
            <div className="mb-3 mb-md-4">
              <label className="form-label text-secondary fw-semibold fs-6 fs-md-5">Enter Exam Center</label>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="e.g., Main School Building"
                value={examCenter}
                onChange={(e) => setExamCenter(e.target.value)}
                style={{ borderColor: '#6c757d', borderWidth: '2px' }}
                disabled={!selectedAssessment}
              />
            </div>
          </div>
        </div>

        {/* Exam Schedule Table */}
        {showScheduleTable && examSchedule.length > 0 && (
          <>
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="mb-4">
                  <div className="table-responsive">
                    <table className="table table-bordered bg-white">
                      <thead className="table-info">
                        <tr>
                          <th className="text-center" style={{ minWidth: '50px' }}>
                            <input
                              type="checkbox"
                              checked={areAllSubjectsSelected()}
                              onChange={handleSelectAllSubjects}
                              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                            />
                          </th>
                          <th className="text-center" style={{ minWidth: '50px' }}>Sr</th>
                          <th style={{ minWidth: '120px' }}>Subject</th>
                          <th style={{ minWidth: '150px' }}>Date</th>
                          <th style={{ minWidth: '200px' }}>Start Time</th>
                          <th style={{ minWidth: '200px' }}>End Time</th>
                          <th style={{ minWidth: '120px' }}>Venue</th>
                          <th style={{ minWidth: '100px' }}>Room</th>
                        </tr>
                      </thead>
                      <tbody>
                        {examSchedule.map((item, index) => (
                          <tr key={index} style={{ backgroundColor: item.selected ? 'white' : '#f8f9fa' }}>
                            <td className="text-center align-middle">
                              <input
                                type="checkbox"
                                checked={item.selected}
                                onChange={() => handleSubjectCheckbox(index)}
                                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                              />
                            </td>
                            <td className="text-center align-middle fw-bold">
                              {item.sr}
                            </td>
                            <td className="align-middle fw-semibold">
                              {item.subject}
                            </td>
                            <td className="align-middle">
                              <input
                                type="date"
                                className="form-control"
                                value={item.examDate}
                                onChange={(e) => handleScheduleChange(index, 'examDate', e.target.value)}
                                disabled={!item.selected}
                              />
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-2 align-items-center flex-nowrap">
                                <select
                                  className="form-select"
                                  value={parseTime12Hour(item.startTime).hour}
                                  onChange={(e) => {
                                    const parsed = parseTime12Hour(item.startTime);
                                    handleTimeChange(index, 'startTime', formatTime12Hour(e.target.value, parsed.minute || '00', parsed.period));
                                  }}
                                  disabled={!item.selected}
                                  style={{ width: '70px' }}
                                >
                                  <option value="">HH</option>
                                  {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                      {String(i + 1).padStart(2, '0')}
                                    </option>
                                  ))}
                                </select>
                                <span>:</span>
                                <select
                                  className="form-select"
                                  value={parseTime12Hour(item.startTime).minute}
                                  onChange={(e) => {
                                    const parsed = parseTime12Hour(item.startTime);
                                    handleTimeChange(index, 'startTime', formatTime12Hour(parsed.hour || '12', e.target.value, parsed.period));
                                  }}
                                  disabled={!item.selected}
                                  style={{ width: '70px' }}
                                >
                                  <option value="">MM</option>
                                  {[...Array(60)].map((_, i) => (
                                    <option key={i} value={String(i).padStart(2, '0')}>
                                      {String(i).padStart(2, '0')}
                                    </option>
                                  ))}
                                </select>
                                <select
                                  className="form-select"
                                  value={parseTime12Hour(item.startTime).period}
                                  onChange={(e) => {
                                    const parsed = parseTime12Hour(item.startTime);
                                    handleTimeChange(index, 'startTime', formatTime12Hour(parsed.hour || '12', parsed.minute || '00', e.target.value));
                                  }}
                                  disabled={!item.selected}
                                  style={{ width: '70px' }}
                                >
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select>
                              </div>
                            </td>
                            <td className="align-middle">
                              <div className="d-flex gap-2 align-items-center flex-nowrap">
                                <select
                                  className="form-select"
                                  value={parseTime12Hour(item.endTime).hour}
                                  onChange={(e) => {
                                    const parsed = parseTime12Hour(item.endTime);
                                    handleTimeChange(index, 'endTime', formatTime12Hour(e.target.value, parsed.minute || '00', parsed.period));
                                  }}
                                  disabled={!item.selected}
                                  style={{ width: '70px' }}
                                >
                                  <option value="">HH</option>
                                  {[...Array(12)].map((_, i) => (
                                    <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                      {String(i + 1).padStart(2, '0')}
                                    </option>
                                  ))}
                                </select>
                                <span>:</span>
                                <select
                                  className="form-select"
                                  value={parseTime12Hour(item.endTime).minute}
                                  onChange={(e) => {
                                    const parsed = parseTime12Hour(item.endTime);
                                    handleTimeChange(index, 'endTime', formatTime12Hour(parsed.hour || '12', e.target.value, parsed.period));
                                  }}
                                  disabled={!item.selected}
                                  style={{ width: '70px' }}
                                >
                                  <option value="">MM</option>
                                  {[...Array(60)].map((_, i) => (
                                    <option key={i} value={String(i).padStart(2, '0')}>
                                      {String(i).padStart(2, '0')}
                                    </option>
                                  ))}
                                </select>
                                <select
                                  className="form-select"
                                  value={parseTime12Hour(item.endTime).period}
                                  onChange={(e) => {
                                    const parsed = parseTime12Hour(item.endTime);
                                    handleTimeChange(index, 'endTime', formatTime12Hour(parsed.hour || '12', parsed.minute || '00', e.target.value));
                                  }}
                                  disabled={!item.selected}
                                  style={{ width: '70px' }}
                                >
                                  <option value="AM">AM</option>
                                  <option value="PM">PM</option>
                                </select>
                              </div>
                            </td>
                            <td className="align-middle">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Block"
                                value={item.venue}
                                onChange={(e) => handleScheduleChange(index, 'venue', e.target.value)}
                                disabled={!item.selected}
                              />
                            </td>
                            <td className="align-middle">
                              <input
                                type="text"
                                className="form-control"
                                placeholder="101"
                                value={item.roomNo}
                                onChange={(e) => handleScheduleChange(index, 'roomNo', e.target.value)}
                                disabled={!item.selected}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            {/* Load Students Button */}
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10 col-xl-8">
                <div className="d-grid gap-3 mb-4">
                  <button
                    className="btn btn-secondary text-white py-2 py-md-3 fw-bold fs-6 fs-md-5"
                    onClick={handleLoadStudents}
                  >
                    <i className="fas fa-users me-2"></i>
                    LOAD STUDENTS
                  </button>
                  {selectedStudents.length > 0 && (
                    <div className="alert alert-info mb-0">
                      <i className="fas fa-info-circle me-2"></i>
                      {selectedStudents.length} student(s) selected
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="d-grid">
                  <button
                    className="btn btn-info text-white py-2 py-md-3 fw-bold fs-6 fs-md-5"
                    onClick={handleSaveDateSheet}
                    disabled={selectedStudents.length === 0}
                  >
                    {selectedStudents.length === 0 ? (
                      <>
                        <i className="fas fa-exclamation-circle me-2"></i>
                        PLEASE SELECT STUDENTS FIRST
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-2"></i>
                        GENERATE ADMIT CARDS FOR {selectedStudents.length} STUDENT(S)
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Student Selection Modal */}
        {showStudentModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header bg-info text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-users me-2"></i>
                    Select Students for {examCenter}
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setShowStudentModal(false)}
                  ></button>
                </div>
                <div className="modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  <div className="mb-3 p-3 bg-light rounded">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="selectAllStudents"
                        checked={areAllStudentsSelected()}
                        onChange={handleSelectAllStudents}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                      <label className="form-check-label fw-bold ms-2" htmlFor="selectAllStudents" style={{ fontSize: '16px' }}>
                        Select All Students ({students.length})
                      </label>
                    </div>
                  </div>

                  {students.length === 0 ? (
                    <div className="text-center text-muted py-5">
                      <i className="fas fa-user-slash fa-3x mb-3"></i>
                      <p>No students found for this class</p>
                    </div>
                  ) : (
                    <div className="row">
                      {students.map((student, index) => (
                        <div key={student._id} className="col-md-6 mb-2">
                          <div className={`card ${selectedStudents.includes(student._id) ? 'border-info' : ''}`}>
                            <div className="card-body p-3">
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={`student-${student._id}`}
                                  checked={selectedStudents.includes(student._id)}
                                  onChange={() => handleStudentCheckbox(student._id)}
                                  style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                                />
                                <label className="form-check-label ms-2" htmlFor={`student-${student._id}`} style={{ cursor: 'pointer' }}>
                                  <div className="fw-semibold">{student.studentName}</div>
                                  <small className="text-muted">Admission No: {student.admissionNo}</small>
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowStudentModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-info text-white"
                    onClick={() => {
                      if (selectedStudents.length === 0) {
                        alert('Please select at least one student');
                        return;
                      }
                      setShowStudentModal(false);
                    }}
                  >
                    <i className="fas fa-check me-2"></i>
                    Confirm Selection ({selectedStudents.length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admit Card Preview */}
        {showAdmitCardPreview && savedAdmitCard && (
          <div className="mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="text-info fw-bold">
                Admit Cards Preview ({savedAdmitCard.students?.length || 0} Student(s))
              </h5>
              <button
                className="btn btn-info text-white"
                onClick={handlePrintAdmitCard}
              >
                <i className="fas fa-print me-2"></i>
                PRINT ALL ADMIT CARDS
              </button>
            </div>

            {/* Multiple Admit Cards - One per Student */}
            <div id="admit-cards-print">
              {savedAdmitCard.students && savedAdmitCard.students.map((student, studentIndex) => (
                <div 
                  key={student._id} 
                  className="admit-card-page bg-white rounded p-4 mb-4"
                  style={{ 
                    pageBreakAfter: studentIndex < savedAdmitCard.students.length - 1 ? 'always' : 'auto',
                    border: '3px solid #333'
                  }}
                >
                  <div className="text-center mb-4">
                    <h3 className="fw-bold text-primary">ADMIT CARD</h3>
                    <h5 className="text-secondary">Academic Session 2025-2026</h5>
                  </div>

                  <div className="row mb-3">
                    <div className="col-6">
                      {schoolProfile && schoolProfile.schoolName && (
                        <p className="mb-2"><strong>School Name:</strong> {schoolProfile.schoolName}</p>
                      )}
                      <p className="mb-2"><strong>Class:</strong> {savedAdmitCard.className}</p>
                      <p className="mb-2"><strong>Term:</strong> {savedAdmitCard.term}</p>
                    </div>
                    <div className="col-6">
                      <p className="mb-2"><strong>Name of the Examination:</strong> {savedAdmitCard.assessment}</p>
                      <p className="mb-2"><strong>Exam Center:</strong> {savedAdmitCard.examCenter}</p>
                    </div>
                  </div>

                  <div className="border rounded p-3 mb-3">
                    <h6 className="fw-bold text-info mb-3">Examination Schedule</h6>
                    <table className="table table-bordered table-sm">
                      <thead>
                        <tr>
                          <th>Sr.</th>
                          <th>Subject</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Venue</th>
                          <th>Room</th>
                        </tr>
                      </thead>
                      <tbody>
                        {savedAdmitCard.examSchedule.map((exam, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{exam.subject}</td>
                            <td>{new Date(exam.examDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                            <td>{exam.startTime} - {exam.endTime}</td>
                            <td>{exam.venue}</td>
                            <td>{exam.roomNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="border-top pt-3 mt-4">
                    <div className="row">
                      <div className="col-6">
                        <p className="mb-0"><strong>Student Name:</strong> {student.studentName}</p>
                      </div>
                      <div className="col-6">
                        <p className="mb-0"><strong>Admission No:</strong> {student.admissionNo}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-top">
                    <div className="row">
                      <div className="col-6">
                        {principalSignature ? (
                          <div className="text-center">
                            <img 
                              src={principalSignature} 
                              alt="Principal Signature" 
                              style={{ maxWidth: '150px', maxHeight: '60px', objectFit: 'contain' }}
                            />
                            <p className="mb-0 small mt-1">Principal's Signature</p>
                          </div>
                        ) : (
                          <>
                            <p className="mb-0 text-center">_____________________</p>
                            <p className="mb-0 text-center small">Principal's Signature</p>
                          </>
                        )}
                      </div>
                      <div className="col-6">
                        <p className="mb-0 text-center">_____________________</p>
                        <p className="mb-0 text-center small">Class Teacher's Signature</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="small text-muted mb-0">Please bring this admit card on the day of examination</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #admit-cards-print, #admit-cards-print * {
            visibility: visible;
          }
          #admit-cards-print {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .admit-card-page {
            page-break-after: always;
            margin-bottom: 0 !important;
          }
          .admit-card-page:last-child {
            page-break-after: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default AdmitCards;

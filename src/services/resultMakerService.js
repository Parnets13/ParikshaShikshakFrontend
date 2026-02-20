import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8774/api';

// Get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with auth header
const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/resultmaker`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// School Profile APIs
export const saveSchoolProfile = async (profileData) => {
  const response = await apiClient.post('/school/save', profileData);
  return response.data;
};

export const getSchoolProfile = async () => {
  const response = await apiClient.get('/school/profile');
  return response.data;
};

export const getAllSchoolProfiles = async () => {
  const response = await apiClient.get('/school/all');
  return response.data;
};

// Class APIs
export const addClass = async (classData) => {
  const response = await apiClient.post('/class/add', classData);
  return response.data;
};

export const getClasses = async () => {
  const response = await apiClient.get('/class/all');
  return response.data;
};

export const getAllClasses = async () => {
  const response = await apiClient.get('/class/all');
  return response.data;
};

export const updateClass = async (classId, classData) => {
  const response = await apiClient.put(`/class/${classId}`, classData);
  return response.data;
};

export const deleteClass = async (classId) => {
  const response = await apiClient.delete(`/class/${classId}`);
  return response.data;
};

// Student APIs
export const addStudent = async (studentData) => {
  const response = await apiClient.post('/student/add', studentData);
  return response.data;
};

export const getAllStudents = async () => {
  const response = await apiClient.get('/student/all');
  return response.data;
};

export const getStudentsByClass = async (classId) => {
  const response = await apiClient.get(`/student/class/${classId}`);
  return response.data;
};

export const updateStudent = async (studentId, studentData) => {
  const response = await apiClient.put(`/student/${studentId}`, studentData);
  return response.data;
};

export const deleteStudent = async (studentId) => {
  const response = await apiClient.delete(`/student/${studentId}`);
  return response.data;
};

// Term APIs
export const addTerm = async (termData) => {
  const response = await apiClient.post('/term/add', termData);
  return response.data;
};

export const getTermsByClass = async (classId) => {
  const response = await apiClient.get(`/term/all?classId=${classId}`);
  return response.data;
};

export const getAllTerms = async (classId = null) => {
  const url = classId ? `/term/all?classId=${classId}` : '/term/all';
  const response = await apiClient.get(url);
  return response.data;
};

export const updateTerm = async (termId, termData) => {
  const response = await apiClient.put(`/term/${termId}`, termData);
  return response.data;
};

export const deleteTerm = async (termId) => {
  const response = await apiClient.delete(`/term/${termId}`);
  return response.data;
};

// Assessment Type APIs
export const addAssessmentType = async (assessmentData) => {
  const response = await apiClient.post('/assessment/add', assessmentData);
  return response.data;
};

export const getAssessmentTypesByClassAndTerm = async (classId, termId) => {
  const response = await apiClient.get(`/assessment/all?classId=${classId}&termId=${termId}`);
  return response.data;
};

export const getAllAssessmentTypes = async (classId, termId) => {
  if (!classId || !termId) {
    throw new Error('Class ID and Term ID are required');
  }
  const response = await apiClient.get(`/assessment/all?classId=${classId}&termId=${termId}`);
  return response.data;
};

export const updateAssessmentType = async (assessmentId, assessmentData) => {
  const response = await apiClient.put(`/assessment/${assessmentId}`, assessmentData);
  return response.data;
};

export const deleteAssessmentType = async (assessmentId) => {
  const response = await apiClient.delete(`/assessment/${assessmentId}`);
  return response.data;
};

// Subject APIs
export const addSubject = async (subjectData) => {
  const response = await apiClient.post('/subject/add', subjectData);
  return response.data;
};

export const getSubjectsByClass = async (classId) => {
  const response = await apiClient.get(`/subject/all?classId=${classId}`);
  return response.data;
};

export const getAllSubjects = async (classId = null) => {
  const url = classId ? `/subject/all?classId=${classId}` : '/subject/all';
  const response = await apiClient.get(url);
  return response.data;
};

export const updateSubject = async (subjectId, subjectData) => {
  const response = await apiClient.put(`/subject/${subjectId}`, subjectData);
  return response.data;
};

export const deleteSubject = async (subjectId) => {
  const response = await apiClient.delete(`/subject/${subjectId}`);
  return response.data;
};

// Marks APIs
export const saveMarks = async (marksData) => {
  const response = await apiClient.post('/marks/save', marksData);
  return response.data;
};

export const getMarks = async (classId, termId, assessmentTypeId, subjectId) => {
  const response = await apiClient.get('/marks/get', {
    params: { classId, termId, assessmentTypeId, subjectId }
  });
  return response.data;
};

export const getStudentMarks = async (studentId) => {
  const response = await apiClient.get(`/marks/student/${studentId}`);
  return response.data;
};

export const deleteMarks = async (marksId) => {
  const response = await apiClient.delete(`/marks/${marksId}`);
  return response.data;
};

// Exam Settings APIs
export const saveExamSettings = async (settingsData) => {
  const response = await apiClient.post('/exam-settings/save', settingsData);
  return response.data;
};

export const getExamSettings = async (classId) => {
  const response = await apiClient.get(`/exam-settings/${classId}`);
  return response.data;
};

export const getAllExamSettings = async () => {
  const response = await apiClient.get('/exam-settings/all');
  return response.data;
};

export const deleteExamSettings = async (classId) => {
  const response = await apiClient.delete(`/exam-settings/${classId}`);
  return response.data;
};

// Admit Card APIs
export const saveAdmitCard = async (admitCardData) => {
  const response = await apiClient.post('/admit-card/save', admitCardData);
  return response.data;
};

export const getAllAdmitCards = async () => {
  const response = await apiClient.get('/admit-card/all');
  return response.data;
};

export const getAdmitCardById = async (id) => {
  const response = await apiClient.get(`/admit-card/${id}`);
  return response.data;
};

export const updateAdmitCard = async (id, admitCardData) => {
  const response = await apiClient.put(`/admit-card/${id}`, admitCardData);
  return response.data;
};

export const deleteAdmitCard = async (id) => {
  const response = await apiClient.delete(`/admit-card/${id}`);
  return response.data;
};

// LBA (Lesson Based Assessment) APIs
// Chapter Management
export const addLBAChapter = async (chapterData) => {
  const response = await apiClient.post('/lba/chapter/add', chapterData);
  return response.data;
};

export const getAllLBAChapters = async (classId, term, subject) => {
  const params = {};
  if (classId) params.classId = classId;
  if (term) params.term = term;
  if (subject) params.subject = subject;
  const response = await apiClient.get('/lba/chapter/all', { params });
  return response.data;
};

export const updateLBAChapter = async (chapterId, chapterData) => {
  const response = await apiClient.put(`/lba/chapter/${chapterId}`, chapterData);
  return response.data;
};

export const deleteLBAChapter = async (chapterId) => {
  const response = await apiClient.delete(`/lba/chapter/${chapterId}`);
  return response.data;
};

// Marks Management
export const saveLBAMarks = async (marksData) => {
  const response = await apiClient.post('/lba/marks/save', marksData);
  return response.data;
};

export const getLBAMarks = async (classId, chapterId, studentId) => {
  const params = {};
  if (classId) params.classId = classId;
  if (chapterId) params.chapterId = chapterId;
  if (studentId) params.studentId = studentId;
  const response = await apiClient.get('/lba/marks/get', { params });
  return response.data;
};

// Reports
export const getStudentLBAReport = async (studentId, term) => {
  const params = { studentId };
  if (term) params.term = term;
  const response = await apiClient.get('/lba/report/student', { params });
  return response.data;
};

// LBA Settings
export const saveLBASettings = async (settingsData) => {
  const response = await apiClient.post('/lba/settings/save', settingsData);
  return response.data;
};

export const getLBASettings = async (classId) => {
  const response = await apiClient.get(`/lba/settings/${classId}`);
  return response.data;
};

export const getAllLBASettings = async () => {
  const response = await apiClient.get('/lba/settings/all');
  return response.data;
};


// Result Calculation Settings APIs
export const saveResultCalculationSettings = async (settingsData) => {
  const response = await apiClient.post('/result-settings/save', settingsData);
  return response.data;
};

export const getResultCalculationSettings = async (classId) => {
  const response = await apiClient.get(`/result-settings/${classId}`);
  return response.data;
};

// Student Marks APIs (New System)
export const saveStudentMarksNew = async (marksData) => {
  const response = await apiClient.post('/student-marks/save', marksData);
  return response.data;
};

export const getStudentMarksNew = async (params) => {
  const response = await apiClient.get('/student-marks/get', { params });
  return response.data;
};

// Calculate Results API
export const calculateStudentResults = async (params) => {
  const response = await apiClient.post('/results/calculate', params);
  return response.data;
};

// Grading Settings APIs
export const saveGradingSettings = async (settingsData) => {
  const response = await apiClient.post('/grading-settings/save', settingsData);
  return response.data;
};

export const getGradingSettings = async (params) => {
  const response = await apiClient.get('/grading-settings/get', { params });
  return response.data;
};

export const deleteGradingSettings = async (id) => {
  const response = await apiClient.delete(`/grading-settings/${id}`);
  return response.data;
};

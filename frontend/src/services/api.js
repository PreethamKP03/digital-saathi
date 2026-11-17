const API_BASE = '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('digital_saathi_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async register(userData) {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return res.json();
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async updateProfile(profileData) {
    const res = await fetch(`${API_BASE}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return res.json();
  },

  async changePassword(old_password, new_password) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ old_password, new_password })
    });
    return res.json();
  },

  // Courses
  async getCourses(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/courses?${query}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getCourse(id, lang = 'en') {
    const res = await fetch(`${API_BASE}/courses/${id}?lang=${lang}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async enrollCourse(courseId) {
    const res = await fetch(`${API_BASE}/courses/${courseId}/enroll`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createCourse(courseData) {
    const res = await fetch(`${API_BASE}/courses`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData)
    });
    return res.json();
  },

  async updateCourse(id, courseData) {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(courseData)
    });
    return res.json();
  },

  async deleteCourse(id) {
    const res = await fetch(`${API_BASE}/courses/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Lessons
  async getLesson(id, lang = 'en') {
    const res = await fetch(`${API_BASE}/lessons/${id}?lang=${lang}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async completeLesson(id) {
    const res = await fetch(`${API_BASE}/lessons/${id}/complete`, {
      method: 'POST',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createLesson(lessonData) {
    const res = await fetch(`${API_BASE}/lessons`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(lessonData)
    });
    return res.json();
  },

  // Quizzes
  async getQuizForCourse(courseId, lang = 'en') {
    const res = await fetch(`${API_BASE}/quizzes/course/${courseId}?lang=${lang}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async submitQuiz(quizId, answers, lang = 'en') {
    const res = await fetch(`${API_BASE}/quizzes/${quizId}/submit?lang=${lang}`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ answers })
    });
    return res.json();
  },

  async getQuizHistory() {
    const res = await fetch(`${API_BASE}/quizzes/history`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Progress & Dashboard
  async getStudentDashboard() {
    const res = await fetch(`${API_BASE}/progress/dashboard`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  // Certificates
  async getMyCertificates() {
    const res = await fetch(`${API_BASE}/certificates/my`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getCertificate(id) {
    const res = await fetch(`${API_BASE}/certificates/${id}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async verifyCertificate(code) {
    const res = await fetch(`${API_BASE}/certificates/verify/${code}`);
    return res.json();
  },

  async claimCertificate(courseId) {
    const res = await fetch(`${API_BASE}/certificates/claim`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ course_id: courseId })
    });
    return res.json();
  },

  // AI Chatbot
  async sendAiMessage(message, language = 'en') {
    const res = await fetch(`${API_BASE}/ai/chat`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ message, language })
    });
    return res.json();
  },

  async getAiQuickPrompts(lang = 'en') {
    const res = await fetch(`${API_BASE}/ai/quick-prompts?lang=${lang}`);
    return res.json();
  },

  // Trainer
  async getTrainerOverview() {
    const res = await fetch(`${API_BASE}/trainer/overview`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getTrainerStudents() {
    const res = await fetch(`${API_BASE}/trainer/students`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getTrainingPrograms() {
    const res = await fetch(`${API_BASE}/trainer/programs`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async createTrainingProgram(data) {
    const res = await fetch(`${API_BASE}/trainer/programs`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async uploadMaterial(data) {
    const res = await fetch(`${API_BASE}/trainer/materials`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  // Admin
  async getAdminOverview() {
    const res = await fetch(`${API_BASE}/admin/overview`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getAdminAnalytics() {
    const res = await fetch(`${API_BASE}/admin/analytics`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getAdminUsers(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/admin/users?${query}`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async updateAdminUserRole(userId, data) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/role`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteAdminUser(userId) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  },

  async getAdminActivities() {
    const res = await fetch(`${API_BASE}/admin/activities`, {
      headers: getAuthHeaders()
    });
    return res.json();
  }
};

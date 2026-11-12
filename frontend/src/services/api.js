import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor (can inject Auth token when authentication is active)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('smartedu_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for consistent error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || error.message || 'API request failed'
    console.warn(`[SmartEdu API Warning]: ${message}`, { url: error.config?.url })
    return Promise.reject(error)
  }
)

export const SubjectsAPI = {
  getAll: () => apiClient.get('/subjects'),
  getById: (id) => apiClient.get(`/subjects/${id}`),
  create: (data) => apiClient.post('/subjects', data),
  update: (id, data) => apiClient.put(`/subjects/${id}`, data),
  delete: (id) => apiClient.delete(`/subjects/${id}`),
}

export const AssignmentsAPI = {
  getAll: (params) => apiClient.get('/assignments', { params }),
  getById: (id) => apiClient.get(`/assignments/${id}`),
  create: (data) => apiClient.post('/assignments', data),
  update: (id, data) => apiClient.put(`/assignments/${id}`, data),
  delete: (id) => apiClient.delete(`/assignments/${id}`),
}

export const StudySessionsAPI = {
  getAll: (params) => apiClient.get('/sessions', { params }),
  create: (data) => apiClient.post('/sessions', data),
  update: (id, data) => apiClient.put(`/sessions/${id}`, data),
  delete: (id) => apiClient.delete(`/sessions/${id}`),
}

export const NotesAPI = {
  getAll: (params) => apiClient.get('/notes', { params }),
  create: (data) => apiClient.post('/notes', data),
  update: (id, data) => apiClient.put(`/notes/${id}`, data),
  delete: (id) => apiClient.delete(`/notes/${id}`),
}

export const UserAPI = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data) => apiClient.put('/user/profile', data),
  getAnalytics: () => apiClient.get('/analytics'),
}

export const NotificationsAPI = {
  getAll: () => apiClient.get('/notifications'),
  markAsRead: (id) => apiClient.patch(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.patch('/notifications/read-all'),
}

export default apiClient

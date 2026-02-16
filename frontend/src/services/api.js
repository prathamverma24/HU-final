import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Events API
export const getEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

// Happenings API
export const getHappenings = async () => {
  const response = await api.get('/happenings');
  return response.data;
};

// Contact API
export const sendContactMessage = async (data) => {
  const response = await api.post('/contact', data);
  return response.data;
};

// Admin API
export const adminLogin = async (credentials) => {
  const response = await api.post('/admin/login', credentials);
  return response.data;
};

export const adminLogout = async () => {
  const response = await api.post('/admin/logout');
  return response.data;
};

export const getCurrentAdmin = async () => {
  const response = await api.get('/admin/me');
  return response.data;
};

export default api;

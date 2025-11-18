import axios from 'axios';
import { fetchAuthSession } from 'aws-amplify/auth';
import { apiConfig } from '../aws-config';

const api = axios.create({
  baseURL: apiConfig.endpoint,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to all requests
api.interceptors.request.use(async (config) => {
  try {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.error('Error getting auth token:', error);
  }
  
  return config;
});

// API methods that call YOUR backend
export const startupsApi = {
  getAll: (params = {}) => api.get('/startups', { params }),
  getById: (id) => api.get(`/startups/${id}`),
  contact: (id, data) => api.post(`/startups/${id}/contact`, data)
};
export const workflowApi = {
  triggerMatching: async () => {
    // This will call a Lambda that triggers Step Functions
    // For now, we'll call the matcher directly
    const response = await api.post('/trigger-matching', {});
    return response.data;
  }
};
export default api;

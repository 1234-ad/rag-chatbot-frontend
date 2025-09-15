import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    
    // Handle specific error cases
    if (error.response?.status === 404) {
      throw new Error('Service not found. Please check if the server is running.');
    } else if (error.response?.status === 500) {
      throw new Error('Server error. Please try again later.');
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please check your connection.');
    } else if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// API functions
export const createSession = async () => {
  try {
    const response = await api.post('/session');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to create session: ${error.message}`);
  }
};

export const getSessionHistory = async (sessionId) => {
  try {
    const response = await api.get(`/session/${sessionId}/history`);
    return response.data.history || [];
  } catch (error) {
    console.warn(`Failed to load session history: ${error.message}`);
    return []; // Return empty array on error to allow chat to continue
  }
};

export const clearSession = async (sessionId) => {
  try {
    const response = await api.delete(`/session/${sessionId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to clear session: ${error.message}`);
  }
};

export const sendMessage = async (message, sessionId) => {
  try {
    const response = await api.post('/chat', {
      message,
      sessionId
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to send message: ${error.message}`);
  }
};

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/health`);
    return response.data;
  } catch (error) {
    throw new Error(`Server health check failed: ${error.message}`);
  }
};

export default api;
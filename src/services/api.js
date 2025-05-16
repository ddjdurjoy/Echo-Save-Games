import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/user');
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
  }
};

// Game services
export const gameService = {
  getAllGames: async () => {
    const response = await api.get('/games');
    return response.data;
  },
  
  getGameById: async (gameId) => {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
  }
};

// Progress services
export const progressService = {
  getUserProgress: async () => {
    const response = await api.get('/progress');
    return response.data;
  },
  
  getGameProgress: async (gameId) => {
    const response = await api.get(`/progress/${gameId}`);
    return response.data;
  },
  
  saveProgress: async (gameId, progressData) => {
    const response = await api.post(`/progress/${gameId}`, progressData);
    return response.data;
  }
};

// Leaderboard services
export const leaderboardService = {
  getGlobalLeaderboard: async () => {
    const response = await api.get('/leaderboard');
    return response.data;
  },
  
  getGameLeaderboard: async (gameId) => {
    const response = await api.get(`/leaderboard/${gameId}`);
    return response.data;
  }
};

export default api;
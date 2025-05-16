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

// Dummy game data
const games = [
  {
    id: 1,
    title: 'Tic Tac Toe',
    description: 'Classic game of X and O. Be the first to get three in a row!',
    imageUrl: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Tic+Tac+Toe',
    category: 'Strategy',
    embedUrl: 'https://www.google.com/logos/2010/pacman10-i.html'
  },
  {
    id: 2,
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards. Find all matches to win!',
    imageUrl: 'https://placehold.co/600x400/10B981/FFFFFF?text=Memory+Match',
    category: 'Puzzle',
    embedUrl: 'https://www.google.com/logos/2010/pacman10-i.html'
  },
  {
    id: 3,
    title: 'Snake Game',
    description: 'Control a snake to eat food and grow longer without hitting walls or yourself.',
    imageUrl: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=Snake+Game',
    category: 'Arcade',
    embedUrl: 'https://www.google.com/logos/2010/pacman10-i.html'
  }
];

// Dummy progress data
const progress = [
  {
    id: 1,
    gameId: 1,
    userId: 1,
    score: 85,
    lastPlayed: '2023-06-15T14:30:00Z'
  },
  {
    id: 2,
    gameId: 3,
    userId: 1,
    score: 120,
    lastPlayed: '2023-06-14T10:15:00Z'
  }
];

// Game service
export const gameService = {
  getAllGames: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(games);
      }, 500);
    });
  },
  
  getGameById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const game = games.find(g => g.id === parseInt(id));
        if (game) {
          resolve(game);
        } else {
          reject(new Error('Game not found'));
        }
      }, 500);
    });
  }
};

// Progress service
export const progressService = {
  getUserProgress: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(progress.map(p => ({
          ...p,
          gameName: games.find(g => g.id === p.gameId)?.title || 'Unknown Game'
        })));
      }, 500);
    });
  },
  
  getGameProgress: (gameId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const gameProgress = progress.find(p => p.gameId === parseInt(gameId));
        if (gameProgress) {
          resolve(gameProgress);
        } else {
          reject(new Error('No progress found'));
        }
      }, 500);
    });
  },
  
  saveProgress: (gameId, progressData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const existingIndex = progress.findIndex(p => p.gameId === parseInt(gameId));
        
        if (existingIndex >= 0) {
          progress[existingIndex] = {
            ...progress[existingIndex],
            ...progressData,
            lastPlayed: new Date().toISOString()
          };
        } else {
          progress.push({
            id: progress.length + 1,
            gameId: parseInt(gameId),
            userId: 1,
            ...progressData,
            lastPlayed: new Date().toISOString()
          });
        }
        
        resolve(true);
      }, 500);
    });
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

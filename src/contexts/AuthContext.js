import { createContext, useState, useEffect, useContext } from 'react';
import { authService } from '../services/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Check if token exists
        const token = localStorage.getItem('token');
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Get current user data
        const userData = await authService.getCurrentUser();
        setCurrentUser(userData);
      } catch (error) {
        console.error('Failed to fetch user:', error);
        // If token is invalid, clear it
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const user = await authService.getCurrentUser();
      setCurrentUser(user);
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  // Save guest progress
  const saveGuestProgress = (gameId, progress) => {
    const now = new Date();
    const expiryTime = now.getTime() + 24 * 60 * 60 * 1000; // 24 hours from now
    
    const guestProgress = JSON.parse(localStorage.getItem('guestProgress') || '{}');
    guestProgress[gameId] = {
      progress,
      expiry: expiryTime
    };
    
    localStorage.setItem('guestProgress', JSON.stringify(guestProgress));
  };

  // Get guest progress
  const getGuestProgress = (gameId) => {
    const guestProgress = JSON.parse(localStorage.getItem('guestProgress') || '{}');
    const gameProgress = guestProgress[gameId];
    
    if (!gameProgress) return null;
    
    // Check if progress has expired
    if (new Date().getTime() > gameProgress.expiry) {
      // Remove expired progress
      delete guestProgress[gameId];
      localStorage.setItem('guestProgress', JSON.stringify(guestProgress));
      return null;
    }
    
    return gameProgress.progress;
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    saveGuestProgress,
    getGuestProgress
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

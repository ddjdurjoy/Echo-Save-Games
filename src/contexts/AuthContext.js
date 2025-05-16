import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on component mount
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
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
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored user on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    // In a real app, this would make an API call
    // For demo purposes, we'll just simulate a successful login
    const user = {
      id: 1,
      name: 'Demo User',
      email: credentials.email
    };
    
    setCurrentUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  // Guest progress functions
  const saveGuestProgress = (gameId, progress) => {
    const key = `guest_progress_${gameId}`;
    localStorage.setItem(key, JSON.stringify(progress));
  };

  const getGuestProgress = (gameId) => {
    const key = `guest_progress_${gameId}`;
    const progress = localStorage.getItem(key);
    return progress ? JSON.parse(progress) : null;
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


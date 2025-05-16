import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  if (!currentUser) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold mb-4">You are not logged in</h1>
        <button
          onClick={() => navigate('/login')}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Log In
        </button>
      </div>
    );
  }
  
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Account Information</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="mb-2"><span className="font-medium">Name:</span> {currentUser.name}</p>
            <p><span className="font-medium">Email:</span> {currentUser.email}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Game Progress</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-gray-600">Your game progress will appear here.</p>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;


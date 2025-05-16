import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

// Dummy data for user game progress
const dummyProgress = [
  {
    id: 1,
    gameId: 1,
    gameName: 'Tic Tac Toe',
    score: 85,
    lastPlayed: '2023-06-15T14:30:00Z'
  },
  {
    id: 2,
    gameId: 3,
    gameName: 'Snake Game',
    score: 120,
    lastPlayed: '2023-06-14T10:15:00Z'
  },
  {
    id: 3,
    gameId: 5,
    gameName: 'Sudoku',
    score: 95,
    lastPlayed: '2023-06-13T18:45:00Z'
  }
];

function Profile() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  const [userProgress, setUserProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    // In a real app, this would be an API call
    // For now, we'll use the dummy data
    setUserProgress(dummyProgress);
    setLoading(false);
  }, [currentUser, navigate]);
  
  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl">
            {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{currentUser?.name}</h1>
            <p className="text-gray-600">{currentUser?.email}</p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Your Game Progress</h2>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p className="text-xl">Loading your progress...</p>
          </div>
        ) : userProgress.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Game
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Played
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userProgress.map((progress) => (
                  <tr key={progress.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{progress.gameName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{progress.score}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(progress.lastPlayed)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => navigate(`/game/${progress.gameId}`)}
                        className="text-primary hover:text-blue-700"
                      >
                        Play Again
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">You haven't played any games yet.</p>
            <button
              onClick={() => navigate('/')}
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Browse Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
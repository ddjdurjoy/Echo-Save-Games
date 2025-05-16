import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Dummy data for leaderboard
const dummyLeaderboard = [
  {
    id: 1,
    username: 'GamerPro',
    gameId: 1,
    gameName: 'Tic Tac Toe',
    score: 98,
    date: '2023-06-15T14:30:00Z'
  },
  {
    id: 2,
    username: 'PixelMaster',
    gameId: 3,
    gameName: 'Snake Game',
    score: 145,
    date: '2023-06-14T10:15:00Z'
  },
  {
    id: 3,
    username: 'GameWizard',
    gameId: 5,
    gameName: 'Sudoku',
    score: 110,
    date: '2023-06-13T18:45:00Z'
  },
  {
    id: 4,
    username: 'PlayerOne',
    gameId: 2,
    gameName: 'Memory Match',
    score: 92,
    date: '2023-06-12T09:20:00Z'
  },
  {
    id: 5,
    username: 'LevelUp',
    gameId: 4,
    gameName: 'Flappy Bird',
    score: 78,
    date: '2023-06-11T16:10:00Z'
  },
  {
    id: 6,
    username: 'GameChamp',
    gameId: 6,
    gameName: 'Chess',
    score: 88,
    date: '2023-06-10T11:05:00Z'
  },
  {
    id: 7,
    username: 'HighScorer',
    gameId: 1,
    gameName: 'Tic Tac Toe',
    score: 95,
    date: '2023-06-09T15:30:00Z'
  },
  {
    id: 8,
    username: 'ArcadeMaster',
    gameId: 3,
    gameName: 'Snake Game',
    score: 130,
    date: '2023-06-08T14:25:00Z'
  },
  {
    id: 9,
    username: 'GameExpert',
    gameId: 5,
    gameName: 'Sudoku',
    score: 105,
    date: '2023-06-07T17:40:00Z'
  },
  {
    id: 10,
    username: 'TopPlayer',
    gameId: 2,
    gameName: 'Memory Match',
    score: 90,
    date: '2023-06-06T13:15:00Z'
  }
];

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the dummy data
    setLeaderboard(dummyLeaderboard);
    setLoading(false);
  }, []);
  
  const filteredLeaderboard = filter === 'all' 
    ? leaderboard 
    : leaderboard.filter(entry => entry.gameId === parseInt(filter));
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-dark mb-4">Global Leaderboard</h1>
        <p className="text-xl text-gray-600">See who's topping the charts in our games</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Top Scores</h2>
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
          >
            <option value="all">All Games</option>
            <option value="1">Tic Tac Toe</option>
            <option value="2">Memory Match</option>
            <option value="3">Snake Game</option>
            <option value="4">Flappy Bird</option>
            <option value="5">Sudoku</option>
            <option value="6">Chess</option>
          </select>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading leaderboard...</p>
          </div>
        ) : filteredLeaderboard.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Player
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Game
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLeaderboard.map((entry, index) => (
                  <tr key={entry.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{entry.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/game/${entry.gameId}`} className="text-sm text-primary hover:text-blue-700">
                        {entry.gameName}
                      </Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{entry.score}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{formatDate(entry.date)}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No leaderboard entries found for this game.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
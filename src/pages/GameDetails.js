import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';
import { gameService, progressService } from '../services/api';
import toast from 'react-hot-toast';

// Dummy data for games (fallback if API fails)
const dummyGames = [
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

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, saveGuestProgress, getGuestProgress } = useAuth();
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [gameProgress, setGameProgress] = useState(null);
  
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        // Try to fetch from API
        const gameData = await gameService.getGameById(id);
        setGame(gameData);
        
        // Check for saved progress
        if (currentUser) {
          try {
            const progressData = await progressService.getGameProgress(id);
            setGameProgress(progressData);
            toast.success('Loaded your previous progress!');
          } catch (error) {
            // No progress found, that's okay
            console.log('No previous progress found');
          }
        } else {
          const guestProgress = getGuestProgress(id);
          if (guestProgress) {
            setGameProgress(guestProgress);
            toast.success('Loaded your previous progress!');
          }
        }
      } catch (error) {
        console.error('Failed to fetch game:', error);
        // Fallback to dummy data
        const foundGame = dummyGames.find(g => g.id === parseInt(id));
        
        if (foundGame) {
          setGame(foundGame);
          toast.warning('Using demo data. In a real app, this would fetch from the server.');
          
          // Check for guest progress
          if (!currentUser) {
            const guestProgress = getGuestProgress(foundGame.id);
            if (guestProgress) {
              setGameProgress(guestProgress);
              toast.success('Loaded your previous progress!');
            }
          }
        } else {
          toast.error('Game not found');
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchGameData();
  }, [id, currentUser, navigate, getGuestProgress]);
  
  const handleSaveProgress = async (progress) => {
    if (currentUser) {
      try {
        await progressService.saveProgress(game.id, progress);
        toast.success('Progress saved to your account!');
      } catch (error) {
        console.error('Failed to save progress:', error);
        toast.error('Failed to save progress. Please try again.');
      }
    } else {
      saveGuestProgress(game.id, progress);
      toast.success('Progress saved temporarily! Create an account to save permanently.');
    }
  };
  
  const handlePlayClick = () => {
    if (!currentUser) {
      setShowLoginModal(true);
    }
  };
  
  const handleContinueAsGuest = () => {
    setShowLoginModal(false);
    // Allow playing as guest
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading game...</p>
      </div>
    );
  }

  return (
    <div>
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onContinueAsGuest={handleContinueAsGuest}
        />
      )}
      
      {game ? (
        <div>
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          <p className="text-gray-600 mb-6">{game.description}</p>
          
          {gameProgress && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
              <h3 className="font-semibold text-blue-800">Your Progress</h3>
              <p className="text-blue-700">Score: {gameProgress.score}</p>
              {/* Display other progress data as needed */}
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src={game.embedUrl} 
                title={game.title}
                className="w-full h-[600px] border-0"
                allowFullScreen
                onClick={handlePlayClick}
              ></iframe>
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Back to Games
            </button>
            <button
              onClick={() => handleSaveProgress({ score: Math.floor(Math.random() * 100) })}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Progress (Demo)
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl text-red-500">Game not found</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Games
          </button>
        </div>
      )}
    </div>
  );
}

export default GameDetails;



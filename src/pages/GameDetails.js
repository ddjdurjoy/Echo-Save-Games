import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';
import toast from 'react-hot-toast';

// Dummy data for games
const dummyGames = [
  {
    id: 1,
    title: 'Tic Tac Toe',
    description: 'Classic game of X and O. Be the first to get three in a row!',
    imageUrl: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Tic+Tac+Toe',
    category: 'Strategy',
    embedUrl: 'https://codepen.io/joshbuchea/embed/qNyEGa?default-tab=result'
  },
  {
    id: 2,
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards. Find all matches to win!',
    imageUrl: 'https://placehold.co/600x400/10B981/FFFFFF?text=Memory+Match',
    category: 'Puzzle',
    embedUrl: 'https://codepen.io/natewiley/embed/HBrbL?default-tab=result'
  },
  {
    id: 3,
    title: 'Snake Game',
    description: 'Control a snake to eat food and grow longer without hitting walls or yourself.',
    imageUrl: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=Snake+Game',
    category: 'Arcade',
    embedUrl: 'https://codepen.io/hellodiara/embed/oNBeyjZ?default-tab=result'
  },
  {
    id: 4,
    title: 'Flappy Bird',
    description: 'Navigate a bird through pipes by tapping to flap its wings.',
    imageUrl: 'https://placehold.co/600x400/EF4444/FFFFFF?text=Flappy+Bird',
    category: 'Arcade',
    embedUrl: 'https://codepen.io/ju-az/embed/eYJQwLx?default-tab=result'
  },
  {
    id: 5,
    title: 'Sudoku',
    description: 'Fill the 9×9 grid with digits so that each column, row, and 3×3 section contain the numbers 1-9.',
    imageUrl: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=Sudoku',
    category: 'Puzzle',
    embedUrl: 'https://codepen.io/afif/embed/dyOGKWd?default-tab=result'
  },
  {
    id: 6,
    title: 'Chess',
    description: 'Classic strategy board game where you must checkmate your opponent\'s king.',
    imageUrl: 'https://placehold.co/600x400/EC4899/FFFFFF?text=Chess',
    category: 'Strategy',
    embedUrl: 'https://codepen.io/lonekorean/embed/KXLrVm?default-tab=result'
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
    // In a real app, this would be an API call
    // For now, we'll use the dummy data
    const foundGame = dummyGames.find(g => g.id === parseInt(id));
    
    if (foundGame) {
      setGame(foundGame);
      
      // Check for saved progress
      if (currentUser) {
        // In a real app, this would fetch from the backend
        console.log('Would fetch progress for user:', currentUser.id);
      } else {
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
    
    setLoading(false);
  }, [id, currentUser, navigate, getGuestProgress]);
  
  const handleSaveProgress = (progress) => {
    if (currentUser) {
      // In a real app, this would save to the backend
      console.log('Would save progress for user:', currentUser.id, progress);
      toast.success('Progress saved to your account!');
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

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading game...</p>
        </div>
      ) : game ? (
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-dark mb-2">{game.title}</h1>
            <p className="text-gray-600 mb-4">{game.description}</p>
            <div className="flex items-center mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-sm mr-2">
                {game.category}
              </span>
              {gameProgress && (
                <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm">
                  Progress Saved
                </span>
              )}
            </div>
          </div>
          
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
      
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)}
          onContinueAsGuest={handleContinueAsGuest}
        />
      )}
    </div>
  );
}

export default GameDetails;

import { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';

// Dummy data for games
const dummyGames = [
  {
    id: 1,
    title: 'Tic Tac Toe',
    description: 'Classic game of X and O. Be the first to get three in a row!',
    imageUrl: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=Tic+Tac+Toe',
    category: 'Strategy'
  },
  {
    id: 2,
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards. Find all matches to win!',
    imageUrl: 'https://placehold.co/600x400/10B981/FFFFFF?text=Memory+Match',
    category: 'Puzzle'
  },
  {
    id: 3,
    title: 'Snake Game',
    description: 'Control a snake to eat food and grow longer without hitting walls or yourself.',
    imageUrl: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=Snake+Game',
    category: 'Arcade'
  },
  {
    id: 4,
    title: 'Flappy Bird',
    description: 'Navigate a bird through pipes by tapping to flap its wings.',
    imageUrl: 'https://placehold.co/600x400/EF4444/FFFFFF?text=Flappy+Bird',
    category: 'Arcade'
  },
  {
    id: 5,
    title: 'Sudoku',
    description: 'Fill the 9×9 grid with digits so that each column, row, and 3×3 section contain the numbers 1-9.',
    imageUrl: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=Sudoku',
    category: 'Puzzle'
  },
  {
    id: 6,
    title: 'Chess',
    description: 'Classic strategy board game where you must checkmate your opponent\'s king.',
    imageUrl: 'https://placehold.co/600x400/EC4899/FFFFFF?text=Chess',
    category: 'Strategy'
  }
];

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we'll use the dummy data
    setGames(dummyGames);
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-dark mb-4">Welcome to Echo Save Games</h1>
        <p className="text-xl text-gray-600">Play your favorite games and save your progress</p>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-xl">Loading games...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map(game => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
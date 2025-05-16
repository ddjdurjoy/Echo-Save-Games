import React, { useState, useEffect } from 'react';
import GameCard from '../components/GameCard';
import { gameService } from '../services/api';
import toast from 'react-hot-toast';

// Fallback dummy data
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

function Home() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const gamesData = await gameService.getAllGames();
        setGames(gamesData);
      } catch (error) {
        console.error('Failed to fetch games:', error);
        toast.error('Failed to load games. Using demo data instead.');
        setGames(dummyGames);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
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


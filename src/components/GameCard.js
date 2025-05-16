import React from 'react';
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <Link to={`/game/${game.id}`} className="game-card block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-xl font-bold text-dark mb-2">{game.title}</h2>
          <p className="text-gray-600 mb-3 line-clamp-2">{game.description}</p>
          <div className="flex justify-between items-center">
            <span className="bg-blue-100 text-primary text-xs px-2 py-1 rounded-full">
              {game.category}
            </span>
            <button className="text-primary hover:text-blue-700 font-medium">
              Play Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default GameCard;

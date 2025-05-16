'use client';

import React from 'react';
import GameCard from './GameCard';

// Temporary dummy data for games
const DUMMY_GAMES = [
  {
    id: 1,
    title: 'Space Shooter',
    description: 'Classic arcade space shooting game',
    imageUrl: '/images/space-shooter.jpg',
    url: '/games/space-shooter',
  },
  {
    id: 2,
    title: 'Puzzle Master',
    description: 'Brain-teasing puzzle challenges',
    imageUrl: '/images/puzzle-master.jpg',
    url: '/games/puzzle-master',
  },
  {
    id: 3,
    title: 'Racing Pro',
    description: 'High-speed racing adventure',
    imageUrl: '/images/racing-pro.jpg',
    url: '/games/racing-pro',
  },
];

export default function GameGallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {DUMMY_GAMES.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
} 
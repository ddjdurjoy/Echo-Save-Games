'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SpaceShooterGame() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Example of saving game progress
    const saveProgress = (score: number) => {
      if (session) {
        // Save to database
        fetch('/api/progress/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gameId: 'space-shooter',
            userId: session.user?.id,
            score,
          }),
        });
      } else {
        // Save to localStorage
        localStorage.setItem('space-shooter-progress', JSON.stringify({
          score,
          timestamp: new Date().toISOString(),
        }));
      }
    };

    // Example game logic
    const gameLoop = () => {
      // Implement your game logic here
      console.log('Game running...');
    };

    const cleanup = () => {
      // Clean up game resources
      console.log('Cleaning up game resources...');
    };

    gameLoop();
    return cleanup;
  }, [session]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Space Shooter</h1>
      <div className="bg-gray-800 rounded-lg p-4 aspect-video">
        {/* Game canvas or content will go here */}
        <div className="flex items-center justify-center h-full">
          <p className="text-white">Game content will be implemented here</p>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={() => router.push('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Games
        </button>
      </div>
    </div>
  );
} 
'use client';

import type { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Game {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

interface GameCardProps {
  game: Game;
}

const GameCard: FC<GameCardProps> = ({ game }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handlePlayClick = () => {
    if (!session) {
      toast((t) => (
        <div className="flex flex-col gap-2">
          <p>Sign in to save your progress!</p>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => {
                router.push('/auth/signin');
                toast.dismiss(t.id);
              }}
            >
              Sign In
            </button>
            <button
              className="bg-gray-500 text-white px-3 py-1 rounded"
              onClick={() => {
                router.push(game.url);
                toast.dismiss(t.id);
              }}
            >
              Continue as Guest
            </button>
          </div>
        </div>
      ));
    } else {
      router.push(game.url);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 bg-gray-200">
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-gray-400">
          {game.title[0].toUpperCase()}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
        <p className="text-gray-600 mb-4">{game.description}</p>
        <button
          onClick={handlePlayClick}
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Play Now
        </button>
      </div>
    </div>
  );
};

export default GameCard; 
'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface GameProps {
  game: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    url: string;
  };
}

export default function GameCard({ game }: GameProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const handlePlayClick = () => {
    if (!session) {
      // Show login modal or continue as guest
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
      <div className="relative h-48">
        <Image
          src={game.imageUrl}
          alt={game.title}
          fill
          className="object-cover"
        />
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
} 
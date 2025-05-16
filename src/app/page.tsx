import Navbar from '@/components/Navbar';
import GameGallery from '@/components/GameGallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Echo Save Games
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Play amazing games for free and save your progress
        </p>
        <GameGallery />
      </div>
    </main>
  );
} 
import { Link } from 'react-router-dom';

function GameCard({ game }) {
  return (
    <div className="game-card bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={game.imageUrl} 
        alt={game.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{game.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{game.category}</span>
          <Link 
            to={`/game/${game.id}`}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Play Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
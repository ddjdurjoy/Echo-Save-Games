import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from '../components/LoginModal';

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
  // Add more games with embedUrl
];

function GameDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, saveGuestProgress, getGuestProgress } = useAuth();
  
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [
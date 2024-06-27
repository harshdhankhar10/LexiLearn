import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBook, FaBars, FaTimes, FaRandom, FaQuestion, FaCheck, FaTrophy } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const WordGamesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const startGame = (game) => {
    setCurrentGame(game);
    setScore(0);
    setGameState({});
    setIsLoading(true);
    if (game === 'scramble') {
      fetchRandomWord();
    } else if (game === 'hangman') {
      fetchRandomWord();
    } else if (game === 'quiz') {
      fetchQuizWords();
    }
  };

  const fetchRandomWord = async () => {
    try {
      // Simulating API call with static data for demo purposes
      const words = ['apple', 'banana', 'cherry', 'date', 'elderberry'];
      const word = words[Math.floor(Math.random() * words.length)];
      
      if (currentGame === 'scramble') {
        setGameState({ 
          originalWord: word, 
          scrambledWord: scrambleWord(word),
          userGuess: '',
          attempts: 0,
        });
      } else if (currentGame === 'hangman') {
        setGameState({
          word: word,
          guessedLetters: new Set(),
          remainingGuesses: 6,
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching random word:", error);
      setIsLoading(false);
    }
  };

  const fetchQuizWords = async () => {
    try {
      // Simulating API call with static data for demo purposes
      const words = ['apple', 'banana', 'cherry', 'date'];
      const correctWord = words[Math.floor(Math.random() * words.length)];
      const definitions = {
        apple: "A round fruit with red or green skin and white flesh",
        banana: "A long curved fruit with a yellow skin",
        cherry: "A small round fruit with a stone inside",
        date: "A sweet brown fruit from a palm tree"
      };
      setGameState({
        words: words,
        correctWord: correctWord,
        definition: definitions[correctWord],
        selectedWord: null,
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching quiz words:", error);
      setIsLoading(false);
    }
  };

  const scrambleWord = (word) => {
    return word.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleScrambleGuess = (e) => {
    setGameState({ ...gameState, userGuess: e.target.value });
  };

  const checkScrambleGuess = () => {
    if (gameState.userGuess.toLowerCase() === gameState.originalWord) {
      setScore(score + 1);
      setIsLoading(true);
      fetchRandomWord();
    } else {
      setGameState({ ...gameState, attempts: gameState.attempts + 1 });
    }
  };

  const handleHangmanGuess = (letter) => {
    const newGuessedLetters = new Set(gameState.guessedLetters);
    newGuessedLetters.add(letter);
    const newRemainingGuesses = gameState.word.includes(letter) 
      ? gameState.remainingGuesses 
      : gameState.remainingGuesses - 1;
    
    setGameState({
      ...gameState,
      guessedLetters: newGuessedLetters,
      remainingGuesses: newRemainingGuesses,
    });

    if (newRemainingGuesses === 0) {
      // Game over
      alert(`Game Over! The word was: ${gameState.word}`);
      startGame('hangman');
    } else if ([...gameState.word].every(char => newGuessedLetters.has(char))) {
      setScore(score + 1);
      alert('Congratulations! You guessed the word!');
      setIsLoading(true);
      fetchRandomWord();
    }
  };

  const handleQuizGuess = (word) => {
    setGameState({ ...gameState, selectedWord: word });
    if (word === gameState.correctWord) {
      setScore(score + 1);
      alert('Correct! Well done!');
    } else {
      alert(`Sorry, that's incorrect. The correct word was: ${gameState.correctWord}`);
    }
    setIsLoading(true);
    fetchQuizWords();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800">
      {/* Navigation */}
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />


      {/* Mobile Menu */}
      <AnimatePresence>
        {/* ... (mobile menu code remains unchanged) ... */}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Challenge Your Mind</span>
            <span className="block text-purple-600">Play Word Games</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Enhance your vocabulary and have fun with our collection of word games.
          </p>
        </motion.div>

        {/* Game Selection */}
        {!currentGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-bold text-center mb-6">Choose a Game</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <button
                onClick={() => startGame('scramble')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Word Scramble
              </button>
              <button
                onClick={() => startGame('hangman')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Hangman
              </button>
              <button
                onClick={() => startGame('quiz')}
                className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Word Quiz
              </button>
            </div>
          </motion.div>
        )}

        {/* Game Area */}
        <AnimatePresence>
          {currentGame && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4 bg-purple-600 text-white flex justify-between items-center">
                <h3 className="text-2xl font-bold">
                  {currentGame === 'scramble' && 'Word Scramble'}
                  {currentGame === 'hangman' && 'Hangman'}
                  {currentGame === 'quiz' && 'Word Quiz'}
                </h3>
                <div className="flex items-center">
                  <FaTrophy className="mr-2" />
                  <span>Score: {score}</span>
                </div>
              </div>
              <div className="p-6">
                {isLoading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="mt-4 text-lg">Loading next challenge...</p>
                  </div>
                ) : (
                  <>
                    {currentGame === 'scramble' && (
                      <div>
                        <p className="text-2xl font-bold mb-4">Unscramble this word:</p>
                        <p className="text-3xl font-mono mb-6">{gameState.scrambledWord}</p>
                        <input
                          type="text"
                          value={gameState.userGuess}
                          onChange={handleScrambleGuess}
                          className="w-full p-2 border border-gray-300 rounded-md mb-4"
                          placeholder="Enter your guess"
                        />
                        <button
                          onClick={checkScrambleGuess}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Check
                        </button>
                        <p className="mt-4">Attempts: {gameState.attempts}</p>
                      </div>
                    )}
                    {currentGame === 'hangman' && (
                      <div>
                        <p className="text-2xl font-bold mb-4">Guess the word:</p>
                        <p className="text-3xl font-mono mb-6">
                          {gameState.word?.split('').map(char => 
                            gameState.guessedLetters?.has(char) ? char : '_'
                          ).join(' ')}
                        </p>
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map(letter => (
                            <button
                              key={letter}
                              onClick={() => handleHangmanGuess(letter.toLowerCase())}
                              disabled={gameState.guessedLetters?.has(letter.toLowerCase())}
                              className={`p-2 rounded ${
                                gameState.guessedLetters?.has(letter.toLowerCase())
                                  ? 'bg-gray-300 text-gray-500'
                                  : 'bg-purple-600 text-white hover:bg-purple-700'
                              }`}
                            >
                              {letter}
                            </button>
                          ))}
                        </div>
                        <p>Remaining guesses: {gameState.remainingGuesses}</p>
                      </div>
                    )}
                    {currentGame === 'quiz' && (
                      <div>
                        <p className="text-2xl font-bold mb-4">Choose the correct word for this definition:</p>
                        <p className="text-xl mb-6">"{gameState.definition}"</p>
                        <div className="grid grid-cols-2 gap-4">
                          {gameState.words?.map(word => (
                            <button
                              key={word}
                              onClick={() => handleQuizGuess(word)}
                              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                            >
                              {word}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="px-6 py-4 bg-gray-100">
                <button
                  onClick={() => setCurrentGame(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Back to Game Selection
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Instructions */}
        {!currentGame && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">How to Play</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {/* ... (game instructions remain unchanged) ... */}
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16">
        {/* ... (footer code remains unchanged) ... */}
      </footer>
    </div>
  );
};

export default WordGamesPage;
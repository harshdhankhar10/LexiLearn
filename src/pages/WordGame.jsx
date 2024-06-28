import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { FaBook,FaQuestion,FaRandom } from 'react-icons/fa';

const WordGamesPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const startGame = (game) => {
    setCurrentGame(game);
    setScore(0);
    setIsLoading(true);
    if (game === 'dailywordsearch') {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 text-gray-800">
      {/* Navigation */}
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50"
          >
      
            <div className="absolute top-0 right-0 p-4">
              <button
                onClick={toggleMenu}
                className="text-white text-2xl focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
            <div className="flex items-center justify-center min-h-screen">
              <nav className="bg-white p-8 rounded-lg shadow-lg">
                <ul className="space-y-4">
                  <li>

                    <Link
                      to="/"
                      className="text-gray-800 text-lg font-bold"
                      onClick={toggleMenu}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/games"
                      className="text-gray-800 text-lg font-bold"
                      onClick={toggleMenu}
                    >
                      Games
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about"
                      className="text-gray-800 text-lg font-bold"
                      onClick={toggleMenu}
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
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
                onClick={() => startGame('dailywordsearch')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Daily Word Search
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
                  {currentGame === 'dailywordsearch' && 'Daily Word Search'}
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
                    {currentGame === 'dailywordsearch' && (
                      <div>
                        <div>
                          <script src="https://cdn.htmlgames.com/embed.js?game=DailyWordSearch&amp;bgcolor=white"></script>
                        </div>
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
              <div className="text-center">
                <FaBook className="text-4xl mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold mb-2">Daily Word Search</h3>
                <p className="text-gray-600">Find all the words hidden in the grid. Use hints if you get stuck!</p>
              </div>
              <div className="text-center">
                <FaQuestion className="text-4xl mx-auto mb-4 text-indigo-600" />
                <h3 className="text-2xl font-bold mb-2">Hangman</h3>
                <p className="text-gray-600">Guess the word by selecting letters. Be careful, you have limited guesses!</p>
              </div>
              <div className="text-center">
                <FaRandom className="text-4xl mx-auto mb-4 text-pink-600" />
                <h3 className="text-2xl font-bold mb-2">Word Quiz</h3>
                <p className="text-gray-600">Match the word to its correct definition. Test your vocabulary knowledge!</p>
              </div>
            </div>
          </motion.div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">&copy; 2024 LexiLearn. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WordGamesPage;

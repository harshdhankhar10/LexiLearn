import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBookmark, FaChartLine, FaGamepad, FaStickyNote, FaStar, FaUsers, FaBell, FaLightbulb, FaVolumeUp } from 'react-icons/fa';
import "../../../App.css"
const MainDashboard = () => {
  const [wordOfDay, setWordOfDay] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const famousWords = [
    "serendipity", "ephemeral", "mellifluous", "eloquent", "ethereal",
    "luminous", "enigmatic", "resilient", "nostalgic", "effervescent"
  ];

  useEffect(() => {
    fetchWordOfDay();
  }, []);

  const fetchWordOfDay = async () => {
    const randomWord = famousWords[Math.floor(Math.random() * famousWords.length)];
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      const data = await response.json();
      setWordOfDay(data[0]);
    } catch (error) {
      console.error("Error fetching word of the day:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
      setRecentSearches(prevSearches => [searchTerm, ...prevSearches.slice(0, 4)]);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults(null);
    }
    setIsLoading(false);
  };

  const playAudio = (audioUrl) => {
    new Audio(audioUrl).play();
  };

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 min-h-screen p-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-indigo-800 mb-8 text-center"
      >
        Welcome to Your Language Dashboard
      </motion.h1>

      <form onSubmit={handleSearch} className="mb-8 max-w-3xl mx-auto">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for a word..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pr-12 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-lg"
          />
          <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <FaSearch className="text-indigo-500 text-2xl" />
          </button>
        </div>
      </form>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center mb-8"
          >
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16 mb-4"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchResults && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-8 max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">{searchResults[0].word}</h2>
            <p className="text-xl text-gray-600 italic mb-4">{searchResults[0].phonetic}</p>
            {searchResults[0].phonetics.find(p => p.audio) && (
              <button
                onClick={() => playAudio(searchResults[0].phonetics.find(p => p.audio).audio)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300 mb-4"
              >
                <FaVolumeUp className="inline mr-2" /> Listen
              </button>
            )}
            {searchResults[0].meanings.map((meaning, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-indigo-600">{meaning.partOfSpeech}</h3>
                <ul className="list-disc list-inside">
                  {meaning.definitions.slice(0, 3).map((def, idx) => (
                    <li key={idx} className="text-gray-700 mb-2">{def.definition}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Word of the Day */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Word of the Day</h2>
          {wordOfDay && (
            <>
              <h3 className="text-xl font-bold">{wordOfDay.word}</h3>
              <p className="text-gray-600 italic">{wordOfDay.phonetic}</p>
              <p className="mt-2">{wordOfDay.meanings[0].definitions[0].definition}</p>
              {wordOfDay.phonetics.find(p => p.audio) && (
                <button
                  onClick={() => playAudio(wordOfDay.phonetics.find(p => p.audio).audio)}
                  className="mt-2 bg-indigo-500 text-white px-3 py-1 rounded-full hover:bg-indigo-600 transition duration-300"
                >
                  <FaVolumeUp className="inline mr-1" /> Listen
                </button>
              )}
            </>
          )}
        </motion.div>

        {/* Recent Searches */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Recent Searches</h2>
          <ul className="space-y-2">
            {recentSearches.map((search, index) => (
              <li key={index} className="text-gray-700 capitalize">{search}</li>
            ))}
          </ul>
        </motion.div>

        {/* Saved Words Overview */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Saved Words</h2>
          <div className="flex items-center justify-between">
            <FaBookmark className="text-4xl text-indigo-500" />
            <span className="text-3xl font-bold">42</span>
          </div>
        </motion.div>

        {/* Learning Progress Summary */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Learning Progress</h2>
          <div className="flex items-center">
            <FaChartLine className="text-4xl text-green-500 mr-4" />
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{width: '70%'}}></div>
            </div>
            <span className="ml-4 font-bold text-xl">70%</span>
          </div>
        </motion.div>

        {/* Quizzes and Games */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Quizzes and Games</h2>
          <div className="flex justify-between items-center">
            <FaGamepad className="text-4xl text-indigo-500" />
            <button className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600 transition duration-300">Play Now</button>
          </div>
        </motion.div>

        {/* Personal Notes Overview */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Personal Notes</h2>
          <div className="flex items-center justify-between">
            <FaStickyNote className="text-4xl text-yellow-500" />
            <span className="text-3xl font-bold">15</span>
          </div>
        </motion.div>

        {/* Favorite Lists Overview */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Favorite Lists</h2>
          <div className="flex items-center justify-between">
            <FaStar className="text-4xl text-yellow-500" />
            <span className="text-3xl font-bold">7</span>
          </div>
        </motion.div>

        {/* Latest Community Contributions */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Community Contributions</h2>
          <div className="flex items-center">
            <FaUsers className="text-4xl text-blue-500 mr-4" />
            <p className="text-gray-700">New idiom added: "Break a leg"</p>
          </div>
        </motion.div>

        {/* Notifications Summary */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Notifications</h2>
          <div className="flex items-center justify-between">
            <FaBell className="text-4xl text-red-500" />
            <span className="bg-red-500 text-white text-xl rounded-full px-3 py-1">3</span>
          </div>
        </motion.div>

        {/* Tips and Tricks */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-lg p-6 transition duration-300 hover:shadow-xl"
        >
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Tips and Tricks</h2>
          <div className="flex items-center">
            <FaLightbulb className="text-4xl text-yellow-500 mr-4" />
            <p className="text-gray-700">Use mnemonics to remember new words!</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MainDashboard;
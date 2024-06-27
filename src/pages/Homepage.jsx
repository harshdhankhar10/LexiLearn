import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBook, FaVolumeUp, FaStar, FaBars, FaTimes, FaLanguage, FaChartLine, FaRandom, FaHistory, FaBookmark, FaLightbulb } from 'react-icons/fa';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Homepage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [wordOfTheDay, setWordOfTheDay] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [bookmarkedWords, setBookmarkedWords] = useState([]);
  const [quizWord, setQuizWord] = useState(null);

  useEffect(() => {
    fetchWordOfTheDay();
    loadRecentSearches();
    loadBookmarkedWords();
    generateQuizWord();
  }, []);

  const fetchWordOfTheDay = async () => {
    try {
      const response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/random');
      setWordOfTheDay(response.data[0]);
    } catch (error) {
      console.error("Error fetching word of the day:", error);
    }
  };

  const loadRecentSearches = () => {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(searches);
  };

  const loadBookmarkedWords = () => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedWords')) || [];
    setBookmarkedWords(bookmarks);
  };

  const generateQuizWord = async () => {
    try {
      const response = await axios.get('https://api.dictionaryapi.dev/api/v2/entries/en/random');
      setQuizWord(response.data[0]);
    } catch (error) {
      console.error("Error generating quiz word:", error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const API = "https://api.dictionaryapi.dev/api/v2/entries/en";
      const response = await axios.get(`${API}/${searchTerm}`);
      setSearchResults(response.data);
      updateRecentSearches(searchTerm);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("No results found. Please try another word.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateRecentSearches = (term) => {
    const updatedSearches = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const toggleBookmark = (word) => {
    const updatedBookmarks = bookmarkedWords.includes(word)
      ? bookmarkedWords.filter(w => w !== word)
      : [...bookmarkedWords, word];
    setBookmarkedWords(updatedBookmarks);
    localStorage.setItem('bookmarkedWords', JSON.stringify(updatedBookmarks));
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      {/* Navigation */}
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

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
            <span className="block">Unlock the Power of Words</span>
            <span className="block text-indigo-600">Expand Your Vocabulary</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Dive into a world of words, definitions, and language mastery with LexiLearn.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 max-w-xl mx-auto"
        >
          <form onSubmit={handleSearch} className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex items-stretch flex-grow focus-within:z-10">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border-gray-300"
                placeholder="Enter a word"
              />
            </div>
            <button
              type="submit"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <FaSearch className="h-5 w-5" />
              <span>Search</span>
            </button>
          </form>
        </motion.div>

        {/* Loading Indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-indigo-600">Searching...</p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center text-red-600"
          >
            {error}
          </motion.div>
        )}

        {/* Search Results */}
        <AnimatePresence>
          {searchResults.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-12"
            >
              {searchResults.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-8 bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="px-6 py-4 bg-indigo-600 text-white flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold">{result.word}</h3>
                      <p className="text-indigo-200">{result.phonetic}</p>
                    </div>
                    <button
                      onClick={() => toggleBookmark(result.word)}
                      className="text-yellow-400 hover:text-yellow-300 focus:outline-none"
                    >
                      <FaStar className={`h-6 w-6 ${bookmarkedWords.includes(result.word) ? 'text-yellow-300' : 'text-yellow-400'}`} />
                    </button>
                  </div>
                  <div className="p-6">
                    {result.phonetics.map((phonetic, phoneticIndex) => (
                      <div key={phoneticIndex} className="mb-4">
                        <p className="text-gray-600">{phonetic.text}</p>
                        {phonetic.audio && (
                          <button
                            onClick={() => new Audio(phonetic.audio).play()}
                            className="mt-2 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <FaVolumeUp className="mr-2" />
                            Listen
                          </button>
                        )}
                      </div>
                    ))}
                    {result.meanings.map((meaning, meaningIndex) => (
                      <div key={meaningIndex} className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800">{meaning.partOfSpeech}</h4>
                        <ul className="mt-2 space-y-2">
                          {meaning.definitions.map((definition, definitionIndex) => (
                            <li key={definitionIndex} className="text-gray-600">
                              <p><strong>Definition:</strong> {definition.definition}</p>
                              {definition.example && (
                                <p className="mt-1 text-sm text-gray-500"><strong>Example:</strong> "{definition.example}"</p>
                              )}
                              {definition.synonyms && definition.synonyms.length > 0 && (
                                <p className="mt-1 text-sm text-gray-500"><strong>Synonyms:</strong> {definition.synonyms.join(', ')}</p>
                              )}
                              {definition.antonyms && definition.antonyms.length > 0 && (
                                <p className="mt-1 text-sm text-gray-500"><strong>Antonyms:</strong> {definition.antonyms.join(', ')}</p>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        {searchResults.length === 0 && !isLoading && !error && (
          <div className="mt-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl font-semibold text-gray-900 mb-8 text-center"
            >
              Explore Our Features
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Word of the Day */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                      <FaStar className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Word of the Day</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{wordOfTheDay?.word}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  {wordOfTheDay && (
                    <div className="mt-5">
                      <p className="text-gray-600">{wordOfTheDay.meanings[0].definitions[0].definition}</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Language Learning */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                      <FaLanguage className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Language Learning</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">Boost Your Skills</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-gray-600">Enhance your language proficiency with our interactive lessons and exercises.</p>
                  </div>
                </div>
              </motion.div>

              {/* Vocabulary Builder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-white overflow-hidden shadow rounded-lg"
              >
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                      <FaChartLine className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Vocabulary Builder</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">Expand Your Lexicon</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-gray-600">Build your vocabulary with personalized word lists and daily challenges.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Searches */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12"
            >
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchTerm(term)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Word Quiz */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="px-6 py-4 bg-yellow-500 text-white">
                <h3 className="text-2xl font-bold">Word Quiz</h3>
              </div>
              <div className="p-6">
                {quizWord && (
                  <>
                    <p className="text-xl font-semibold mb-4">What does "{quizWord.word}" mean?</p>
                    <p className="text-gray-600 mb-4">{quizWord.meanings[0].definitions[0].definition}</p>
                    <button
                      onClick={generateQuizWord}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                    >
                      Next Word
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-16">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
          <div className="flex justify-center space-x-6 md:order-2">
            <a href="#" className="text-gray-400 hover:text-gray-500">About</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Contact</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Terms</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Privacy</a>
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <p className="text-center text-base text-gray-400">
              &copy; 2024 LexiLearn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
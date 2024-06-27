import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBook, FaExchangeAlt, FaBars, FaTimes, FaSynagogue } from 'react-icons/fa';
import { FaDirections as FaOppositeDirectionsAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';

const ThesaurusPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const API = "https://api.dictionaryapi.dev/api/v2/entries/en";
      const response = await axios.get(`${API}/${searchTerm}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("No results found. Please try another word.");
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 text-gray-800">
      {/* Navigation */}
       {/* Navigation */}
       <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="flex-shrink-0 flex items-center"
              >
                <FaBook className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-2xl font-semibold text-indigo-600">LexiLearn</span> &nbsp; &nbsp; <span className='bg-blue-500 font-md text-xl px-3 rounded-md text-white'>Beta</span> 
              </motion.div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className=" text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dictionary
              </Link>
              <Link to="/thesaurus" className=" border-indigo-500 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Thesaurus
              </Link>
              <Link to="/wordgame" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Word Games
              </Link>
              <Link to="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Blog
              </Link>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleMenu}
                className="sm:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden bg-white shadow-lg absolute w-full z-40"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Dictionary</Link>
              <Link to="/thesaurus" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Thesaurus</Link>
              <Link to="/wordgame" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Word Games</Link>
              <Link to="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Blog</Link>
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
            <span className="block">Explore Word Relationships</span>
            <span className="block text-teal-600">Find the Perfect Synonym</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover synonyms, antonyms, and related words to enhance your vocabulary and writing.
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
                className="focus:ring-teal-500 focus:border-teal-500 block w-full rounded-none rounded-l-md pl-4 sm:text-sm border-gray-300"
                placeholder="Enter a word"
              />
            </div>
            <button
              type="submit"
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
            <p className="mt-2 text-teal-600">Searching...</p>
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
                  <div className="px-6 py-4 bg-teal-600 text-white">
                    <h3 className="text-2xl font-bold">{result.word}</h3>
                  </div>
                  <div className="p-6">
                    {result.meanings.map((meaning, meaningIndex) => (
                      <div key={meaningIndex} className="mt-6">
                        <h4 className="text-lg font-semibold text-gray-800">{meaning.partOfSpeech}</h4>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-md font-semibold text-teal-600 flex items-center">
                              <FaSynagogue className="mr-2" /> Synonyms
                            </h5>
                            <ul className="mt-2 space-y-1">
                              {meaning.synonyms.map((synonym, synIndex) => (
                                <li key={synIndex} className="text-gray-600">{synonym}</li>
                              ))}
                            </ul>
                            {meaning.synonyms.length === 0 && (
                              <p className="text-gray-500 italic">No synonyms found.</p>
                            )}
                          </div>
                          <div>
                            <h5 className="text-md font-semibold text-red-600 flex items-center">
                              <FaOppositeDirectionsAlt className="mr-2" /> Antonyms
                            </h5>
                            <ul className="mt-2 space-y-1">
                              {meaning.antonyms.map((antonym, antIndex) => (
                                <li key={antIndex} className="text-gray-600">{antonym}</li>
                              ))}
                            </ul>
                            {meaning.antonyms.length === 0 && (
                              <p className="text-gray-500 italic">No antonyms found.</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Thesaurus Tips */}
        {searchResults.length === 0 && !isLoading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-20"
          >
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Thesaurus Tips</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-teal-500 rounded-md p-3">
                      <FaExchangeAlt className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">Expand Your Vocabulary</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Use synonyms to find new ways to express yourself and avoid repetition in your writing.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-teal-500 rounded-md p-3">
                      <FaOppositeDirectionsAlt className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">Explore Contrasts</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Use antonyms to understand word relationships and create contrast in your language.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-teal-500 rounded-md p-3">
                      <FaBook className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <h3 className="text-lg font-medium text-gray-900">Improve Your Writing</h3>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Use the thesaurus to find more precise or vivid words to enhance your writing style.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
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
              &copy; 2024 LexiLearn Thesaurus. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ThesaurusPage;
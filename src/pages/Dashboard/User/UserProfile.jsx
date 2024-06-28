import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPen, FaLock, FaBookmark, FaHistory, FaStar, FaChartLine, FaMedal, FaCog } from 'react-icons/fa';

const ProfilePage = () => {
  const [user, setUser] = useState({
    username: 'LanguageLearner123',
    email: 'learner@example.com',
    bio: 'Passionate about learning new languages and exploring different cultures.',
    profilePicture: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdetLBAnqoSBgSINtQDzSnxU4jR3nllBEKhg&s',
    savedWordsCount: 248,
    searchHistoryCount: 573,
    favoriteListsCount: 12,
    learningProgress: 75,
    badges: ['Vocabulary Master', 'Grammar Guru', 'Pronunciation Pro'],
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(!isEditing);
    // In a real app, you'd save the changes here
  };

  const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div 
        className="bg-indigo-600 h-4 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-cover md:w-48" src={user.profilePicture} alt={user.username} />
          </div>
          <div className="p-8 w-full">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-indigo-700">{user.username}</h1>
                <p className="mt-2 text-gray-600 flex items-center">
                  <FaEnvelope className="mr-2" /> {user.email}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEdit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition duration-300 flex items-center"
              >
                <FaPen className="mr-2" /> {isEditing ? 'Save Profile' : 'Edit Profile'}
              </motion.button>
            </div>
            <p className="mt-4 text-gray-700">
              {isEditing ? (
                <textarea
                  className="w-full p-2 border rounded"
                  value={user.bio}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                />
              ) : (
                user.bio
              )}
            </p>
          </div>
        </div>
        
        <div className="p-8 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center">
                <FaBookmark className="mr-2" /> Saved Words
              </h2>
              <p className="text-3xl font-bold text-gray-800">{user.savedWordsCount}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center">
                <FaHistory className="mr-2" /> Search History
              </h2>
              <p className="text-3xl font-bold text-gray-800">{user.searchHistoryCount}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center">
                <FaStar className="mr-2" /> Favorite Lists
              </h2>
              <p className="text-3xl font-bold text-gray-800">{user.favoriteListsCount}</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2 flex items-center">
                <FaChartLine className="mr-2" /> Learning Progress
              </h2>
              <ProgressBar progress={user.learningProgress} />
              <p className="mt-2 text-right font-semibold">{user.learningProgress}%</p>
            </motion.div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4 flex items-center">
              <FaMedal className="mr-2" /> Badges and Achievements
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-8 flex justify-between items-center border-t border-gray-200">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300 flex items-center"
          >
            <FaLock className="mr-2" /> Change Password
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full hover:bg-indigo-200 transition duration-300 flex items-center"
          >
            <FaCog className="mr-2" /> Account Settings
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
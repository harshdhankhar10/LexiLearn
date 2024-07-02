import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaUser, FaBookmark, FaHistory, FaStickyNote, FaStar,
  FaChartLine, FaGamepad, FaUsers, FaCog, FaBell, FaQuestionCircle, FaSignOutAlt
} from 'react-icons/fa';
import MainDashboard from './MainDashboard';
import { app } from '../../../firebase/Firebase';
import { toast } from 'react-toastify';


const logoutbtn = () => {
  console.log("Logout")
}


const SidebarItem = ({ icon, text, isActive, to }) => (
  <motion.li
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`flex items-center p-2 rounded-lg cursor-pointer ${
      isActive ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-indigo-100'
    }`}
  >
    <Link to={to} className="flex items-center w-full">
      {icon}
      <span className="ml-3">{text}</span>
    </Link>
  </motion.li>
);

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('Home');

  const menuItems = [
    { icon: <FaHome size={20} />, text: 'Home', to: '/' },
    { icon: <FaUser size={20} />, text: 'Profile', to: '/dashboard/profile' },
    { icon: <FaBookmark size={20} />, text: 'Saved Words', to: '/dashboard/saved-words' },
    { icon: <FaHistory size={20} />, text: 'Search History', to: '/dashboard/search-history' },
    { icon: <FaStickyNote size={20} />, text: 'Personal Notes', to: '/dashboard/notes' },
    { icon: <FaStar size={20} />, text: 'Favorite Lists', to: '/dashboard/favorite-lists' },
    { icon: <FaChartLine size={20} />, text: 'Learning Progress', to: '/dashboard/learning-progress' },
    { icon: <FaGamepad size={20} />, text: 'Quizzes and Games', to: '/dashboard/games/word-search' },
    { icon: <FaCog size={20} />, text: 'Settings', to: '/dashboard/setting' },
    { icon: <FaQuestionCircle size={20} />, text: 'Help/Support', to: '/dashboard/help' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        className="w-64 h-screen bg-white shadow-lg flex flex-col"
      >
        <div className="flex-shrink-0 flex items-center justify-center h-16 bg-indigo-700">
          <h1 className="text-white text-2xl font-bold">LexiLearn</h1>
        </div>
        <nav className="flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-indigo-100">
          <ul className="space-y-2 px-3 py-4">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.text}
                icon={item.icon}
                text={item.text}
                isActive={activeItem === item.text}
                to={item.to}
                onClick={() => setActiveItem(item.text)}
              />
            ))}
          </ul>
        </nav>
        <div className="flex-shrink-0 p-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span
              
              className="flex items-center justify-center w-full p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
            >
              <FaSignOutAlt size={20} />
              <button onClick={logoutbtn} className="ml-3">Logout</button>
            </span>
          </motion.div>
        </div>
      </motion.div>
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
        {/* <MainDashboard /> */}
        
      </main>
    </div>
  );
};

export default Sidebar;
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import ThesaurusPage from './pages/Thesaurus'
import WordGame from './pages/WordGame'
import LoginForm from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Blog from './pages/Blog'
import Sidebar from './pages/Dashboard/User/Sidebar'
import MainDashboard from './pages/Dashboard/User/MainDashboard'
import UserProfile from './pages/Dashboard/User/UserProfile'
import PersonalNotes from './pages/Dashboard/User/PersonalNotes'
import FavouriteList from './pages/Dashboard/User/FavouriteList'
import Setting from './pages/Dashboard/User/Setting'
import DashPage from './pages/Dashboard/User/DashPage'
import SavedWords from './pages/Dashboard/User/SavedWords'
import SearchHistory from './pages/Dashboard/User/SearchHistory'
import LearningProgress from './pages/Dashboard/User/LearningProgress'
import Notifications from './pages/Dashboard/User/Notifications'
import HelpSupport from './pages/Dashboard/User/HelpSupport'
// Games
import WordSearch from './pages/Dashboard/User/Games/WordSearch'
function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/thesaurus" element={<ThesaurusPage />} />
        <Route path="/wordgame" element={<WordGame />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/dashboard" element={<DashPage />} />
        <Route path="/dashboard" element={<Sidebar />}>
                <Route path="profile" element={<UserProfile />} />
                <Route path="notes" element={<PersonalNotes />} />
                <Route path="favorite-lists" element={<FavouriteList />} />
                <Route path="setting" element={<Setting />} />
                <Route path="saved-words" element={<SavedWords />} />
                <Route path="search-history" element={<SearchHistory />} />
                <Route path="learning-progress" element={<LearningProgress />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="help" element={<HelpSupport />} />

               

          <Route path="games/word-search" element={<WordSearch />} />
        </Route>
        
      </Routes>

    </>
  )
}

export default App

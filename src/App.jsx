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
        <Route path="/dashboard" element={<Sidebar />}>
          {/* <Route path="/dashboard" element={<MainDashboard />} > */}
          <Route path="profile" element={<UserProfile />} />
          <Route path="notes" element={<PersonalNotes />} />
          <Route path="favorite-lists" element={<FavouriteList />} />
          <Route path="setting" element={<Setting />} />
        </Route>
        
      </Routes>

    </>
  )
}

export default App

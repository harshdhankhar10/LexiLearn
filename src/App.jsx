import './App.css'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import ThesaurusPage from './pages/Thesaurus'
import WordGame from './pages/WordGame'
import LoginForm from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Blog from './pages/Blog'
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
      </Routes>

    </>
  )
}

export default App

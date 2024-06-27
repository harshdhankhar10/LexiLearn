import './App.css'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import ThesaurusPage from './pages/Thesaurus'
import WordGame from './pages/WordGame'

function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/thesaurus" element={<ThesaurusPage />} />
        <Route path="/wordgame" element={<WordGame />} />
      </Routes>

    </>
  )
}

export default App

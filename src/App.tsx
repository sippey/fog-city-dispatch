import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Game from './game/Game'
import CardBrowser from './CardBrowser'
import './game.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/browse-cards" element={<CardBrowser />} />
      </Routes>
    </Router>
  )
}

export default App
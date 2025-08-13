import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Game from './game/Game'
import CardBrowser from './CardBrowser'

function App() {
  return (
    <Router basename="/fog-city-dispatch">
      <Routes>
        <Route path="/" element={<Game />} />
        <Route path="/browse-cards" element={<CardBrowser />} />
      </Routes>
    </Router>
  )
}

export default App
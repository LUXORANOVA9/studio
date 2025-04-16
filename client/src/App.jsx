import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Mint from './pages/Mint';
import Admin from './pages/Admin';
import LandingPage from './components/LandingPage'; // Import LandingPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Route for LandingPage */}
        <Route path="/mint" element={<Mint />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;

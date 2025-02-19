import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connect from './pages/Connect';
import Access from './pages/Access';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/connect" element={<Connect />} />
          <Route path="/access" element={<Access />} />
          <Route path="/" element={<Connect />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

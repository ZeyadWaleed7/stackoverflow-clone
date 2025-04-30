import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GoogleAuthPage from './pages/register';
import GoogleCallback from './pages/googlecallback';
import Dashboard from './pages/home/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<GoogleAuthPage />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} /> */}
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GoogleAuthPage from './pages/register';
import GoogleCallback from './pages/googlecallback';
import Dashboard from './pages/home/Home';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  return (
    <Router>
      <Routes>
        <Route path="/googlecallback" element={<GoogleCallback />} />
        {isAuthenticated ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<GoogleAuthPage />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;



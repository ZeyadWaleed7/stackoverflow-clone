import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import GoogleAuthPage from './pages/register';
import GoogleCallback from './pages/googlecallback';
import Dashboard from './pages/home/Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));

  useEffect(() => {
    // check authentication status
    const checkAuthStatus = () => {
      setIsAuthenticated(!!localStorage.getItem('authToken'));
    };
    checkAuthStatus();

    // Listen for storage events (login/logout happens in another tab)
    window.addEventListener('storage', checkAuthStatus);

    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

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



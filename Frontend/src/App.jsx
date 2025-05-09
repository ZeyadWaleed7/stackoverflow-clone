import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import GoogleAuthPage from './pages/register';
import GoogleCallback from './pages/googlecallback';
import Dashboard from './pages/home/Home';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SearchProvider, useSearch } from './context/SearchContext';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { accessToken } = useAuth();
  const { handleSearch } = useSearch();

  return (
    <>
      {accessToken && <Navbar onSearch={handleSearch} />}
      <Routes>
        <Route path="/googlecallback" element={<GoogleCallback />} />
        {accessToken ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </>
        ) : (
          <Route path="/" element={<GoogleAuthPage />} />
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <SearchProvider>
        <Router>
          <AppRoutes />
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
};

export default App;



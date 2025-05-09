import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Logout = ({ className }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    // Use the logout function from AuthContext
    logout();

    // Navigate to home page
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleLogout}
      className={className}
    >
      <FaSignOutAlt /> Logout
    </button>
  );
};

export default Logout;
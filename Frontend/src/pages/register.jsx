import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./register.css";

const GoogleAuthPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h2>Log in to NOT Stack Overflow</h2>
        <button onClick={handleGoogleLogin} className="google-login-btn">
          Log in with Google
        </button>
      </div>
      <div className="login-footer">
        All rights reserved &copy; 2023 NOT Stack Overflow
      </div>
    </div>
  );
};

export default GoogleAuthPage;

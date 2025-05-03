import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get token from URL
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        if (!token) {
          console.error('No token found in URL');
          setError('Authentication failed. No token received.');
          return;
        }

        console.log('Token received from Google callback');

        // Store the token in localStorage
        localStorage.setItem('authToken', token);

        // Decode the token to get user information
        const decodedToken = jwtDecode(token);
        console.log('User authenticated:', decodedToken.name);

        // Store user information
        localStorage.setItem('userName', decodedToken.name);
        localStorage.setItem('userId', decodedToken.userId);
        localStorage.setItem('isAuthenticated', 'true');

        // page reload to update auth state
        window.location.href = '/';
      } catch (error) {
        console.error('Error processing authentication:', error);
        setError('Authentication failed. Please try again.');
      }
    };

    handleCallback();
  }, [navigate]);

  if (error) {
    return (
      <div className="auth-error">
        <h2>Authentication Error</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div className="auth-loading">
      <h2>Completing Authentication</h2>
      <p>Please wait while we complete your sign-in...</p>
    </div>
  );
};

export default GoogleCallback;
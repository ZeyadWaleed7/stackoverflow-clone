import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { login } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');
        const userImage = urlParams.get('userImage');

        if (!accessToken || !refreshToken) {
          setError('Authentication failed. No tokens received.');
          return;
        }

        // Decode access token to get user information
        const decodedToken = jwtDecode(accessToken);

        // Use the AuthContext to login
        login(
          { accessToken, refreshToken },
          {
            name: decodedToken.name,
            userId: decodedToken.userId,
            image: userImage
          }
        );

        // Redirect to home page
        navigate('/');
      } catch (error) {
        console.error('Error processing authentication:', error);
        setError('Authentication failed. Please try again.');
      }
    };

    handleCallback();
  }, [navigate, login]);

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
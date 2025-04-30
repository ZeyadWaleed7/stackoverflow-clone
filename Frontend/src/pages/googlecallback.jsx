// src/pages/GoogleCallback.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          // Send the code to backend to exchange for JWT
          const response = await axios.get(`http://localhost:5000/auth/google/callback?code=${code}`);
          const token = response.data.token;

          // Store the JWT token in localStorage or Redux
          localStorage.setItem('authToken', token);

          // Redirect to the dashboard or home page
          navigate('/home');
        } catch (error) {
          console.error('Error during Google OAuth callback:', error);
        }
      }
    };

    fetchData();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default GoogleCallback;

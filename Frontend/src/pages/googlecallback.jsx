import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { jwtDecode } from 'jwt-decode';
const GoogleCallback = () => {
  const navigate = useNavigate();

  console.log('GoogleCallback component mounted. Checking for code parameter...');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code) {
        console.log('Code parameter found:', code);
        const fetchData = async () => {
        try {
          console.log('Sending code to backend for token exchange...');
          // Send the code to backend to exchange for JWT
          const response = await axios.get(`http://localhost:5000/auth/google/callback?code=${code}`);
          console.log('Backend response:', response.data); // Log the entire response data
          const token = response.data.token;

          if (token) {
            console.log('Received token:', token); // Log the received token
            // Store the JWT token in localStorage or Redux
            localStorage.setItem('authToken', token);

            // Decode the token and store user information
            const decodedToken = jwtDecode(token);
            console.log('Decoded token:', decodedToken); // Log the decoded token

            localStorage.setItem('userName', decodedToken.name); // Assuming 'name' is the field in your token
            localStorage.setItem('userId', decodedToken.userId); // Assuming 'userId' is the field in your token

            // Redirect to the dashboard or home page
            navigate('/');
          } else {
            console.error('Error: Token not received in the backend response.');
          }
        } catch (error) {
          console.error('Error during backend API call or token processing:', error);
          // Log detailed error information
          if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
          } else if (error.request) {
            console.error('Error request:', error.request);
          } else {
            console.error('Error message:', error.message);
          }
        }
      }
      fetchData();
    } else {
      console.log('No code parameter found in URL.');
    }
  }, [navigate]); 

  return <div>Loading...</div>;
};

export default GoogleCallback;
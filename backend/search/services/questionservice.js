const axios = require('axios');

const QAServiceURL = process.env.QA_SERVICE_URL || 'http://localhost:5000';

const fetchQuestions = async () => {
  try {
    const response = await axios.get(`${QAServiceURL}/api/questions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questions from Q/A service:', error.message);
    throw error;
  }
};

module.exports = { fetchQuestions };
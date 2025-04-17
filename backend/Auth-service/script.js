document.getElementById('google-login-btn').addEventListener('click', function() {
    // Redirect to the backend Google OAuth URL
    window.location.href = 'http://localhost:5000/auth/google';
  });
  
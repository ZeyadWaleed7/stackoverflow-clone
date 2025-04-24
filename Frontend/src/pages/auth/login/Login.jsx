import { useNavigate } from 'react-router-dom';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();

    const handleGoogleLogin = async (credentialResponse) => {
        try {
            const response = await fetch('http://localhost:5000/auth/google/callback', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${credentialResponse.credential}`,
                },
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);
                navigate('/home');
            } else {
                console.log('Google login failed');
            }
        } catch (err) {
            console.error('Error during Google login', err);
        }
    };

    const handleLogout = () => {
        googleLogout();
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="landing-container">
            <div className="landing-left">
                <div className="landing-content">
                    <img 
                        src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png" 
                        alt="Logo"
                        className="landing-logo"
                    />
                    <h1 className="welcome-heading">Welcome to the App</h1>
                    <p className="welcome-subheading">
                        Join the community to ask and answer questions.
                    </p>

                    <div className="google-login-container">
                        <GoogleLogin 
                            onSuccess={(response) => handleGoogleLogin(response)}
                            onError={() => console.log("Login Failed")}
                            theme="outline"
                            shape="rectangular"
                            size="large"
                            width="500px"
                            text="signin_with"
                        />
                    </div>

                    {localStorage.getItem('token') && (
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    )}
                </div>
            </div>
        </div>
    );
}

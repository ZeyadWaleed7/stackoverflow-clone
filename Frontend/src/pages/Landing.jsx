import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import './Landing.css';

export default function Landing() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('Login attempt with:', { email, password });
    };

    const handleForgotPassword = () => {
        console.log('Forgot password clicked');
    };

    const handleSignUp = () => {
        console.log('Sign up clicked');
    };

    return (
        <div className="landing-container">
            <div className="landing-left">
                <div className="landing-content">
                    <img 
                        src="https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png" 
                        alt="Stack Overflow Logo" 
                        className="logo"
                    />
                    <h1 className="welcome-heading">Welcome to Stack Overflow</h1>
                    <p className="welcome-subheading">
                        Join the community to ask and answer questions. Have an account?{' '}
                        <a href="#" className="signup-link" onClick={handleSignUp}>Login</a>
                    </p>

                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="email"
                                className="input-field"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="input-field"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="login-button">
                            Log in
                        </button>

                        <div className="separator">
                            <span>or</span>
                        </div>

                        <div className="google-login-container">
                            <GoogleLogin 
                                onSuccess={(credentialResponse) => {
                                    console.log(credentialResponse);
                                }} 
                                onError={() => {
                                    console.log("login failed");
                                }}
                                useOneTap
                                theme="outline"
                                shape="rectangular"
                                size="large"
                                width="500px"
                                text="signin_with"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
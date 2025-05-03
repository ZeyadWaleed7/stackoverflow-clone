import React, { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaGoogle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import './Navbar.css';

const Navbar = ({ onSearch }) => { 
    const [searchQuery, setSearchQuery] = useState('');
    const [hasNotifications, setHasNotifications] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('authToken');
            const storedUserName = localStorage.getItem('userName');
            
            if (token) {
                setIsAuthenticated(true);
                setUserName(storedUserName || 'User');
            } else {
                setIsAuthenticated(false);
                setUserName('');
            }
        };

        checkAuth();
        window.addEventListener('storage', checkAuth);
        
        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (onSearch) {
            onSearch(query);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchQuery);
        }
    };

    const handleNotificationClick = () => {
        setHasNotifications(false);
    };

    const handleGoogleLogin = () => {
        // Redirect to Google OAuth endpoint
        window.location.href = 'http://localhost:5000/auth/google';
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src="/logo-stackoverflow.png" alt="Stack Overflow" className="logo" />
                    </Link>
                </div>
                <form onSubmit={handleSubmit} className="navbar-search">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search questions or authors..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </form>
                <div className="navbar-profile">
                    {isAuthenticated ? (
                        <>
                            <div className="notification-icon" onClick={handleNotificationClick}>
                                <FaBell />
                                {hasNotifications && <span className="notification-badge"></span>}
                            </div>
                            <div className="avatar">
                                {userName.charAt(0).toUpperCase()}
                            </div>
                            <div className="user-info">
                                <span className="username">{userName}</span>
                                <Logout />
                            </div>
                        </>
                    ) : (
                        <button 
                            className="google-login-button" 
                            onClick={handleGoogleLogin}
                        >
                            <FaGoogle /> Sign in with Google
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
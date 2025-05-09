import React, { useState } from 'react';
import { FaSearch, FaBell, FaGoogle, FaUser, FaSignOutAlt, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Logout from './Logout';
import './Navbar.css';
import { useAuth } from '../context/AuthContext';
import DeleteAccount from './DeleteAccount';

const Navbar = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [hasNotifications, setHasNotifications] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    const { accessToken, user } = useAuth();

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

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setShowDropdown(!showDropdown);
    };

    const handleProfileClick = () => {
        setShowDropdown(false);
        navigate('/profile');
    };

    const navigateToHome = () => {
        navigate('/');
    };

    const handleShowDeleteModal = () => {
        setShowDropdown(false);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <>
            <header className="navbar">
                <div className="navbar-container">
                    <div className="navbar-logo" onClick={navigateToHome}>
                        <img src="/logo-stackoverflow.png" alt="Stack Overflow" className="logo" />
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
                        {accessToken ? (
                            <>
                                <div className="notification-icon" onClick={handleNotificationClick}>
                                    <FaBell />
                                    {hasNotifications && <span className="notification-badge"></span>}
                                </div>
                                <div className="avatar-container">
                                    <div className="avatar" onClick={toggleDropdown}>
                                        {user?.image ? (
                                            <img src={user.image} alt={user.name} className="user-avatar" />
                                        ) : (
                                            (user?.name || 'User').charAt(0).toUpperCase()
                                        )}
                                    </div>
                                    {showDropdown && (
                                        <div className="user-dropdown-menu">
                                            <div className="user-dropdown-header">
                                                <div className="user-avatar-large">
                                                    {user?.image ? (
                                                        <img src={user.image} alt={user.name} />
                                                    ) : (
                                                        (user?.name || 'User').charAt(0).toUpperCase()
                                                    )}
                                                </div>
                                                <span className="user-dropdown-name">{user?.name || 'User'}</span>
                                            </div>
                                            <div className="user-dropdown-divider"></div>
                                            <button onClick={handleProfileClick} className="user-dropdown-item manage-account-btn">
                                                <FaUser /> Manage Account
                                            </button>
                                            <div className="user-dropdown-divider"></div>
                                            <Logout className="user-dropdown-item manage-account-btn" />
                                            <div className="user-dropdown-divider"></div>
                                            <button onClick={handleShowDeleteModal} className="user-dropdown-item delete-account-btn">
                                                <FaTrashAlt /> Delete Account
                                            </button>
                                        </div>
                                    )}
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
            {showDeleteModal && (
                <DeleteAccount onClose={handleCloseDeleteModal} />
            )}
        </>
    );
};

export default Navbar;
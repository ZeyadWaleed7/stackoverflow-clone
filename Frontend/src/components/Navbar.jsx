import React, { useState } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onSearch }) => { 
    const [searchQuery, setSearchQuery] = useState('');
    const [hasNotifications, setHasNotifications] = useState(true); // Example state to show notification badge

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
        // Here you would typically open a notifications panel
        // For now, we'll just toggle the notification state as a demo
        setHasNotifications(false);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
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
                    <div className="notification-icon" onClick={handleNotificationClick}>
                        <FaBell />
                        {hasNotifications && <span className="notification-badge"></span>}
                    </div>
                    <div className="avatar">Z</div>
                    <div className="user-info">
                        <span className="username">Zeyad Waleed</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
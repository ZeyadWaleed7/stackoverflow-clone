import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        console.log('Search query:', e.target.value);
    };

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="./public/logo-stackoverflow.png" alt="Stack Overflow" className="logo" />
                </div>
                <div className="navbar-search">
                    <FaSearch className="search-icon" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                <div className="navbar-profile">
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
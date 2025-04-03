import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onSearch }) => { 
    const [searchQuery, setSearchQuery] = useState('');

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

    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src="./public/logo-stackoverflow.png" alt="Stack Overflow" className="logo" />
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
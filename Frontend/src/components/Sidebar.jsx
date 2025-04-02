import React from 'react';
import { FaHome, FaQuestion } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <a href="/" className="nav-link active">
                    <FaHome className="nav-icon" />
                    <span>Home</span>
                </a>
                <a href="/questions" className="nav-link">
                    <FaQuestion className="nav-icon" />
                    <span>Questions</span>
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar; 
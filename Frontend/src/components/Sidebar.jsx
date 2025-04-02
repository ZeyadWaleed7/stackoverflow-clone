import React from 'react';
import { Home, HelpCircle } from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <nav className="sidebar-nav">
                <a href="/" className="nav-link active">
                    <Home className="nav-icon" strokeWidth={1.5} />
                    <span>Home</span>
                </a>
                <a href="/questions" className="nav-link">
                    <HelpCircle className="nav-icon" strokeWidth={1.5} />
                    <span>Questions</span>
                </a>
            </nav>
        </aside>
    );
};

export default Sidebar;
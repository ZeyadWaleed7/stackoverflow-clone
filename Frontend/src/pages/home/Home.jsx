import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Question from '../../components/Question';
import './home.css';
import axios from 'axios';

const sampleQuestions = [
    {
        id: 1,
        author: {
            name: "Mariam Samaha",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            reputation: 1234
        },
        tags: ['r', 'golang'],
        timestamp: 'modified 38 mins ago',
        title: "Go and I don't know what to do",
        excerpt: "I'm an early-career data scientist / machine learning engineer who has recently discovered the joys of Go programming. The simplicity, performance, and concurrency features have me hooked. I'm wondering if I should pivot my career towards Go development.",
        additionalTags: ['javascript', 'reactjs', 'react-hooks', 'react-router', 'react-hook-form'],
        upvotes: 215,
        comments: 69
    },
    {
        id: 2,
        author: {
            name: "Mohy Saleh",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
            reputation: 856
        },
        tags: ['python', 'machine-learning'],
        timestamp: 'modified 2 hours ago',
        title: "How to implement a custom loss function in PyTorch?",
        excerpt: "I'm working on a deep learning project where I need to implement a custom loss function. The standard MSE and cross-entropy losses don't quite capture what I'm trying to optimize for. Any guidance on creating custom loss functions in PyTorch?",
        additionalTags: ['pytorch', 'deep-learning', 'neural-networks'],
        upvotes: 156,
        comments: 42
    },
    {
        id: 3,
        author: {
            name: "Mai",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
            reputation: 2341
        },
        tags: ['javascript', 'react'],
        timestamp: 'modified 5 hours ago',
        title: "Best practices for handling form state in React",
        excerpt: "I'm building a complex form with multiple fields and validation. I'm currently using useState for each field, but it's becoming hard to manage. What are the best practices for handling form state in React?",
        additionalTags: ['react-hooks', 'form-handling', 'validation'],
        upvotes: 189,
        comments: 55
    }
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [user, setUser] = useState(null);

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const filteredQuestions = sampleQuestions.filter(question =>
        question.title.toLowerCase().includes(searchQuery) ||
        question.author.name.toLowerCase().includes(searchQuery)
    );

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get('http://localhost:5001/userprofile', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUser(res.data); // { message, userId, name }
            } catch (err) {
                console.error('Error fetching user profile:', err);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className="home">
            <Navbar onSearch={handleSearch} />
            <div className="home-content">
                <Sidebar />
                <main className="main-content">
                    
                    {user && (
                        <div className="welcome-banner">
                            <h2>Welcome, {user.name}!</h2>
                            <p>User ID: {user.userId}</p>
                        </div>
                    )}
                    <div className="questions-list">
                        {filteredQuestions.map(question => (
                            <Question key={question.id} question={question} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

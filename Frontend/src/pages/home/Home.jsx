import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Question from '../../components/Question';
import './home.css';
import axios from 'axios';

const sampleQuestions = [
   
];

export default function Home() {
    const [searchQuery, setSearchQuery] = useState('');
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState(null);

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    const filteredQuestions = sampleQuestions.filter(question =>
        question.title?.toLowerCase().includes(searchQuery) ||
        question.author?.name?.toLowerCase().includes(searchQuery)
    );

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await axios.get('http://localhost:8080/api/users/userprofile', {
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

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const token = localStorage.getItem('token');
                // Questions might be accessible without a token, depending on your gateway configuration
                // If they are protected, add: if (!token) return;

                const res = await axios.get('http://localhost:8080/questions', {
                     headers: { // Include token even if not strictly required, for consistency
                         Authorization: `Bearer ${token}`
                     }
                });
                setQuestions(res.data);
            } catch (err) {
                console.error('Error fetching questions:', err);
            }
        };
        fetchQuestions();
    }, []); // Empty dependency array means this runs once on mount

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
                        {questions.filter(question => question.title?.toLowerCase().includes(searchQuery) || question.author?.name?.toLowerCase().includes(searchQuery)).map(question => (
                            <Question key={question.id} question={question} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Question from '../../components/Question';
import './home.css';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { useSearch } from '../../context/SearchContext';

const sampleQuestions = [

];

export default function Home() {
    const [questions, setQuestions] = useState([]);
    const { user } = useAuth();
    const { searchQuery } = useSearch();

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

    const filteredQuestions = questions.filter(question =>
        question.title?.toLowerCase().includes(searchQuery) ||
        question.author?.name?.toLowerCase().includes(searchQuery)
    );

    return (
        <div className="home">
            <div className="home-content">
                <Sidebar />
                <main className="main-content">
                    {user?.name && (
                        <div className="welcome-banner">
                            <h2>Welcome, {user.name}!</h2>
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

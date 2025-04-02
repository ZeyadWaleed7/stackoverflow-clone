import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Question from '../components/Question';
import './home.css';

const sampleQuestions = [
    {
        id: 1,
        author: {
            name: "John Doe",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
            reputation: 1234
        },
        tags: ['r', 'golang'],
        timestamp: 'modified 38 mins ago',
        title: "I've fallen in love with Go and I don't know what to do",
        excerpt: "I'm an early-career data scientist / machine learning engineer who has recently discovered the joys of Go programming. The simplicity, performance, and concurrency features have me hooked. I'm wondering if I should pivot my career towards Go development.",
        additionalTags: ['javascript', 'reactjs', 'react-hooks', 'react-router', 'react-hook-form'],
        upvotes: 215,
        comments: 69
    },
    {
        id: 2,
        author: {
            name: "Jane Smith",
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
            name: "Mike Johnson",
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
    return (
        <div className="home">
            <Navbar />
            <div className="home-content">
                <Sidebar />
                <main className="main-content">
                    <div className="questions-list">
                        {sampleQuestions.map(question => (
                            <Question key={question.id} question={question} />
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

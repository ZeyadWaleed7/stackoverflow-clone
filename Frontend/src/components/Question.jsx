import React, { useState } from 'react';
import { FaArrowUp, FaArrowDown, FaComment } from 'react-icons/fa';
import './Question.css';

const Question = ({ question }) => {
    const [upvotes, setUpvotes] = useState(question.upvotes);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const [isDownvoted, setIsDownvoted] = useState(false);

    const handleUpvote = () => {
        if (!isUpvoted) {
            setUpvotes(prev => prev + 1);
            setIsUpvoted(true);
            setIsDownvoted(false);
        }
    };

    const handleDownvote = () => {
        setIsDownvoted(!isDownvoted);
        setIsUpvoted(false);
    };

    const handleQuestionClick = () => {
        console.log('Question clicked:', question.title);
    };

    return (
        <div className="question-card">
            <div className="question-main">
                <div className="question-content">
                    <div className="author-info">
                        <img 
                            src={question.author.image} 
                            alt={question.author.name} 
                            className="author-avatar"
                        />
                        <div className="author-details">
                            <span className="author-name">{question.author.name}</span>
                            <span className="author-reputation">{question.author.reputation}</span>
                        </div>
                    </div>
                    <h2 className="question-title" onClick={handleQuestionClick}>
                        {question.title}
                    </h2>
                    <p className="question-excerpt">{question.excerpt}</p>
                    <div className="additional-tags">
                        {question.additionalTags.map((tag, index) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="question-stats">
                    <div className="voting">
                        <button 
                            className={`vote-button ${isUpvoted ? 'active' : ''}`}
                            onClick={handleUpvote}
                        >
                            <FaArrowUp />
                        </button>
                        <span className="vote-count">{upvotes}</span>
                        <button 
                            className={`vote-button ${isDownvoted ? 'active' : ''}`}
                            onClick={handleDownvote}
                        >
                            <FaArrowDown />
                        </button>
                    </div>
                    <div className="comments">
                        <FaComment />
                        <span>{question.comments}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question; 
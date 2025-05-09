import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './DeleteAccount.css';

const DeleteAccount = ({ onClose }) => {
    const { accessToken, user, logout } = useAuth();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const navigate = useNavigate();

    const handleDelete = async () => {
        if (confirmation !== "DELETE") {
            setError('Please type "DELETE" to confirm account deletion.');
            return;
        }

        try {
            setIsDeleting(true);
            setError('');

            const response = await fetch(`http://localhost:5001/api/users/${user.userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete account');
            }

            // Successfully deleted
            logout();
            navigate('/');
        } catch (error) {
            setError(error.message || 'Failed to delete account');
            setIsDeleting(false);
            console.error('Error deleting account:', error);
        }
    };

    const handleInputChange = (e) => {
        setConfirmation(e.target.value);
        if (error) setError('');
    };

    return (
        <div className="delete-account-overlay">
            <div className="delete-account-modal">
                <h2>Delete Account</h2>
                <p className="delete-warning">
                    Warning: This action is permanent and cannot be undone.
                </p>
                <p>
                    Deleting your account will remove all your data, questions, answers, and comments.
                </p>
                <div className="confirmation-input">
                    <label>Type "DELETE" to confirm:</label>
                    <input
                        type="text"
                        value={confirmation}
                        onChange={handleInputChange}
                        placeholder="Type DELETE here"
                    />
                </div>
                {error && <p className="delete-error">{error}</p>}
                <div className="delete-account-actions">
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                        disabled={isDeleting}
                    >
                        Cancel
                    </button>
                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                        disabled={isDeleting || confirmation !== "DELETE"}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete My Account'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteAccount; 
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaCalendarAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { accessToken, user: authUser, updateUser: updateAuthUser, logout } = useAuth();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUserProfile();
    }, [accessToken]);

    const fetchUserProfile = async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await fetch('http://localhost:5001/api/users/userprofile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch user profile');
            }

            const data = await response.json();
            setUser(data);
            setEditedName(data.name);
        } catch (error) {
            setError(error.message || 'Failed to load user profile');
            console.error('Error fetching user profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setError('');
        setSuccess('');
    };

    const handleSave = async () => {
        try {
            if (!editedName.trim()) {
                setError('Name cannot be empty');
                return;
            }

            setError('');
            // Use the accessToken from context instead of calling getValidToken()
            const token = accessToken;

            if (!token) {
                logout();
                navigate('/');
                throw new Error('Authentication failed. Please log in again.');
            }

            const response = await fetch(`http://localhost:5001/api/users/${user.userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: editedName })
            });

            if (response.status === 401) {
                console.log('Token expired or invalid - logging out');
                logout();
                navigate('/');
                throw new Error('Session expired. Please log in again.');
            }

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const updatedData = await response.json();
            setUser({ ...user, name: updatedData.name });

            // Update the global auth context with the new name
            updateAuthUser({ name: updatedData.name });

            setIsEditing(false);
            setSuccess('Profile updated successfully');
            setTimeout(() => setSuccess(''), 3000);
        } catch (error) {
            setError(error.message || 'Failed to update profile');
            console.error('Error updating profile:', error);
        }
    };

    const handleCancel = () => {
        setEditedName(user.name);
        setIsEditing(false);
        setError('');
    };

    if (isLoading) {
        return (
            <div className="profile-container">
                <div className="loading-spinner">
                    <div>Loading your profile</div>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="profile-container">
                <div className="error-message">Failed to load user profile. Please try again later.</div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <h1>User Profile</h1>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="profile-form">
                <div className="form-group">
                    <label><FaEnvelope /> Email</label>
                    <input
                        type="email"
                        value={user.email}
                        readOnly
                        title="Email cannot be changed"
                    />
                </div>

                <div className="form-group">
                    <label><FaUser /> Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            placeholder="Enter your name"
                            autoFocus
                        />
                    ) : (
                        <input type="text" value={user.name} readOnly />
                    )}
                </div>

                <div className="form-group">
                    <label><FaCalendarAlt /> Member Since</label>
                    <input
                        type="text"
                        value={new Date(user.createdAt).toLocaleDateString(undefined, {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                        readOnly
                    />
                </div>

                <div className="form-actions">
                    {isEditing ? (
                        <>
                            <button onClick={handleSave} className="save-btn">
                                <FaSave /> Save
                            </button>
                            <button onClick={handleCancel} className="cancel-btn">
                                <FaTimes /> Cancel
                            </button>
                        </>
                    ) : (
                        <button onClick={handleEdit} className="edit-btn">
                            <FaEdit /> Edit Name
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile; 
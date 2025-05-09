import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem('refreshToken'));
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Effect for initializing user from storage and fetching profile if needed
    useEffect(() => {
        if (accessToken && !user) {
            // If we have a token but no user, try to fetch the user profile
            fetchUserProfile();
        }
    }, [accessToken]);

    // Effect for persisting tokens and user data
    useEffect(() => {
        // Store tokens in localStorage when they change
        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
        } else {
            localStorage.removeItem('accessToken');
        }

        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        } else {
            localStorage.removeItem('refreshToken');
        }

        // Store user data in localStorage when it changes
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [accessToken, refreshToken, user]);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/users/userprofile', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch user profile');
            }

            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            // Don't logout here - token might still be valid
        }
    };

    const login = (tokens, userData) => {
        setAccessToken(tokens.accessToken);
        setRefreshToken(tokens.refreshToken);
        setUser(userData);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    };

    const updateUser = (userData) => {
        setUser(prevUser => {
            const updatedUser = {
                ...prevUser,
                ...userData
            };
            return updatedUser;
        });
    };

    const refreshAccessToken = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/auth/token/refresh', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refreshToken }),
            });

            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }

            const data = await response.json();
            setAccessToken(data.accessToken);
            return data.accessToken;
        } catch (error) {
            console.error('Error refreshing token:', error);
            logout();
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            accessToken,
            refreshToken,
            user,
            login,
            logout,
            updateUser,
            refreshAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 
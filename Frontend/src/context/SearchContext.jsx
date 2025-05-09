import React, { createContext, useState, useContext } from 'react';

const SearchContext = createContext(null);

export const SearchProvider = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (query) => {
        setSearchQuery(query.toLowerCase());
    };

    return (
        <SearchContext.Provider value={{
            searchQuery,
            handleSearch
        }}>
            {children}
        </SearchContext.Provider>
    );
};

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within a SearchProvider');
    }
    return context;
}; 
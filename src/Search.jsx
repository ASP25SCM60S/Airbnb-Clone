import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from './Card.jsx';
import { cardData } from './data/cards';
import './Search.css';

function Search() {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const query = searchParams.get('q');

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        const timer = setTimeout(() => {
            const results = cardData.filter(card => 
                card.title.toLowerCase().includes(query?.toLowerCase() || '') ||
                card.description.toLowerCase().includes(query?.toLowerCase() || '')
            );
            setSearchResults(results);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [query]);

    return (
        <div className="search">
            <div className="search_header">
                <h1>Search Results for "{query}"</h1>
                <p>{searchResults.length} places found</p>
            </div>
            <div className="search_results">
                {isLoading ? (
                    <div className="loading_container">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="card_skeleton">
                                <div className="skeleton_image"></div>
                                <div className="skeleton_content">
                                    <div className="skeleton_title"></div>
                                    <div className="skeleton_description"></div>
                                    <div className="skeleton_price"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : searchResults.length > 0 ? (
                    searchResults.map(card => (
                        <Card
                            key={card.id}
                            src={card.src}
                            title={card.title}
                            description={card.description}
                            price={card.price}
                        />
                    ))
                ) : (
                    <div className="no_results">
                        <h2>No results found</h2>
                        <p>Try adjusting your search terms</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;

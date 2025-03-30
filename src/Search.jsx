import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from './Card.jsx';
import { cardData } from './data/cards';
import './Search.css';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

function Search() {
    const [searchParams] = useSearchParams();
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        priceRange: 'all',
        type: 'all',
        rating: 'all'
    });
    const query = searchParams.get('q');

    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        const timer = setTimeout(() => {
            let results = cardData.filter(card => 
                card.title.toLowerCase().includes(query?.toLowerCase() || '') ||
                card.description.toLowerCase().includes(query?.toLowerCase() || '')
            );

            // Apply filters
            if (filters.priceRange !== 'all') {
                const [min, max] = filters.priceRange.split('-').map(Number);
                results = results.filter(card => {
                    const price = parseInt(card.price?.replace(/[^0-9]/g, '') || '0');
                    return price >= min && price <= max;
                });
            }

            if (filters.type !== 'all') {
                results = results.filter(card => 
                    card.title.toLowerCase().includes(filters.type)
                );
            }

            if (filters.rating !== 'all') {
                results = results.filter(card => 
                    card.rating >= parseInt(filters.rating)
                );
            }

            setSearchResults(results);
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [query, filters]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    return (
        <div className="search">
            <div className="search_header">
                <div className="search_title">
                    <h1>Search Results for "{query}"</h1>
                    <p>{searchResults.length} places found</p>
                </div>
                <button 
                    className="filter_button"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <FilterListIcon /> Filters
                </button>
            </div>

            {showFilters && (
                <div className="filters_panel">
                    <div className="filters_header">
                        <h2>Filters</h2>
                        <button 
                            className="close_filters"
                            onClick={() => setShowFilters(false)}
                        >
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="filters_content">
                        <div className="filter_group">
                            <h3>Price Range</h3>
                            <select 
                                value={filters.priceRange}
                                onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            >
                                <option value="all">All Prices</option>
                                <option value="0-100">Under £100</option>
                                <option value="100-200">£100 - £200</option>
                                <option value="200-300">£200 - £300</option>
                                <option value="300-999999">Over £300</option>
                            </select>
                        </div>

                        <div className="filter_group">
                            <h3>Property Type</h3>
                            <select 
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                            >
                                <option value="all">All Types</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="penthouse">Penthouse</option>
                            </select>
                        </div>

                        <div className="filter_group">
                            <h3>Minimum Rating</h3>
                            <select 
                                value={filters.rating}
                                onChange={(e) => handleFilterChange('rating', e.target.value)}
                            >
                                <option value="all">Any Rating</option>
                                <option value="4">4+ Stars</option>
                                <option value="4.5">4.5+ Stars</option>
                            </select>
                        </div>
                    </div>
                </div>
            )}

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
                        <p>Try adjusting your search terms or filters</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;

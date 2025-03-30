import React, { useState } from 'react';
import "./Card.css";
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function Card({ src, title, description, price, rating = 4.5 }) {
    const [imageError, setImageError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleImageError = () => {
        setImageError(true);
        setIsLoading(false);
    };

    const toggleFavorite = (e) => {
        e.stopPropagation();
        setIsFavorite(!isFavorite);
    };

    return (
        <div className='card'>
            <div className="card_image_container">
                {isLoading && <div className="card_loading">Loading...</div>}
                <img 
                    src={imageError ? "https://via.placeholder.com/300x200?text=No+Image" : src} 
                    alt={title}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
                <button 
                    className="favorite_button"
                    onClick={toggleFavorite}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
            </div>
            <div className="card_info">
                <div className="card_header">
                    <h2>{title}</h2>
                    <div className="card_rating">
                        <StarIcon className="star_icon" />
                        <span>{rating}</span>
                    </div>
                </div>
                <h4>{description}</h4>
                {price && (
                    <div className="card_price">
                        <h3>{price}</h3>
                        <span className="per_night">/ night</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
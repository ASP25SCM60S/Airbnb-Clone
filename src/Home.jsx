import React, { useState, useEffect } from 'react';
import Banner from './Banner.jsx'; 
import "./Home.css";
import Card from './Card.jsx';
import { cardData } from './data/cards';

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setCards(cardData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='home'>
      <Banner />
      <div className="home_section">
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
        ) : (
          cards.map(card => (
            <Card
              key={card.id}
              src={card.src}
              title={card.title}
              description={card.description}
              price={card.price}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Home;

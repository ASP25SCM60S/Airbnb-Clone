import React, { useState } from 'react';
import "./Banner.css";
import Search from './Search';

function Banner() {
    const [showSearch, setShowSearch] = useState(false);

    return (
        <div className='banner'>
            <div className="banner_search">
                <button onClick={() => setShowSearch(!showSearch)} variant='outlined' className="Banner__SearchButton">
                    {showSearch ? 'Hide' : 'Show Dates'}
                </button>
                {showSearch && <Search />}

            </div>
            <div className="banner_info">
                <h1>Get out and stretch your imagination</h1>
                <h5>Plan a different kind of getaway to uncover the hidden gems near you.</h5>
                <button className='button'>Explore Nearby</button>
            </div>
        </div>
    );
}

export default Banner;

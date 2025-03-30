import React, { useState } from 'react'
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

function Header() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <header className='Header'>
            <img
                className="header_icon"
                src="https://i.pinimg.com/originals/3c/bf/be/3cbfbe148597341fa56f2f87ade90956.png"
                alt="Airbnb Logo"
                onClick={() => navigate('/')}
            />
            <form className="header_center" onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Start your search"
                    aria-label="Search for accommodations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search_button">
                    <SearchIcon />
                </button>
            </form>
            <div className="header_right">
                <button className="host_button">Become a host</button>
                <button className="language_button" aria-label="Select language">
                    <LanguageIcon />
                </button>
                <button className="menu_button" aria-label="Open menu">
                    <ExpandMoreIcon />
                </button>
                <button className="profile_button" aria-label="Open profile">
                    <Avatar />
                </button>
            </div>
        </header> 
    )
}

export default Header

// src/SearchPlace.js
import React, { useState } from 'react';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

const SearchPlace = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    onSearch(city);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>
        <SearchTwoToneIcon />
      </button>
    </div>
  );
};

export default SearchPlace;

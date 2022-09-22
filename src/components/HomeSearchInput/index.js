import React from 'react';
import 'src/styles/components/HomeSearchInput.scss';

const HomeSearchInput = ({ width, height, placeholder, type = 'text' }) => {
  return (
    <div className="home-search-inpute-container">
      <input id="home-search" placeholder={placeholder} type={type} />
      <button className="home-search-button me-2">Search</button>
    </div>
  );
};

export default HomeSearchInput;

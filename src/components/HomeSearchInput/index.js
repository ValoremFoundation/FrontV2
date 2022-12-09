import React from 'react';
import 'src/styles/components/HomeSearchInput.scss';

const HomeSearchInput = ({ value, onChange, onClick, placeholder, type = 'text' }) => {
  return (
    <div className="home-search-inpute-container">
      <input id="home-search" placeholder={placeholder} type={type} value={value} onChange={onChange} />
      <button className="home-search-button me-2" onClick={onClick}>
        Search
      </button>
    </div>
  );
};

export default HomeSearchInput;

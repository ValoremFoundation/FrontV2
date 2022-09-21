import React from 'react';
import 'src/styles/components/SearchInput.scss';

const SearchInput = ({ width, height, placeholder, type = 'text' }) => {
  return (
    <div className="search-wrapper">
      <input id="search" placeholder={placeholder} type={type} />
    </div>
  );
};

export default SearchInput;

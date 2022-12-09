import React from 'react';
import CloseIcon from 'src/assets/images/close-icon.svg';
import 'src/styles/components/SearchInput.scss';

const SearchInput = ({ onChange, value, onClick, placeholder, type = 'text' }) => {
  return (
    <div className="search-wrapper">
      <input id="search" placeholder={placeholder} type={type} onChange={onChange} value={value} />
      {value && (
        <div style={{ position: 'absolute', right: '6px' }} onClick={onClick}>
          <img alt="close" src={CloseIcon} width={22} height={22} className="global-pointer" />
        </div>
      )}
    </div>
  );
};

export default SearchInput;

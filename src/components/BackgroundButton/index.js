import React from 'react';
import 'src/styles/components/BackgroundButton.scss';

const BackgroundButton = ({ label, color, bgColor, onClick }) => {
  return (
    <button className="background-button" style={{ background: bgColor, color: color }} onClick={onClick}>
      {label}
    </button>
  );
};

export default BackgroundButton;

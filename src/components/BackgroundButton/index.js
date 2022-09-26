import React from 'react';
import 'src/styles/components/BackgroundButton.scss';

const BackgroundButton = ({ label, color, bgColor, onClick, fullWidth = false }) => {
  return (
    <button
      className="background-button"
      style={{ background: bgColor, color: color, width: fullWidth ? '100%' : '' }}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default BackgroundButton;

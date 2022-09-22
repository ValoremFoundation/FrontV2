import React from 'react';
import 'src/styles/components/BackgroundButton.scss';

const BackgroundButton = ({ label, color, bgColor }) => {
  return (
    <button className="background-button" style={{ background: bgColor, color: color }}>
      {label}
    </button>
  );
};

export default BackgroundButton;

import React from 'react';
import 'src/styles/components/RoundBorderButton.scss';
import 'src/styles/Global.scss';

const RoundBorderButton = ({ label, color, onClick }) => {
  return (
    <button className="round-border-button" style={{ border: `1px solid ${color}` }} onClick={onClick}>
      <div className="poppins-14-400" style={{ color: color }}>
        {label}
      </div>
    </button>
  );
};

export default RoundBorderButton;

import React from 'react';
import 'src/styles/components/RoundBorderButton.scss';
import 'src/styles/Global.scss';

const RoundBorderButton = ({ label, color, onClick, icon, fullWidth = false }) => {
  return (
    <button
      className="round-border-button"
      style={{ border: `1px solid ${color}`, width: fullWidth ? '100%' : '' }}
      onClick={onClick}
    >
      {icon && <img alt="alt" src={icon} className="me-3" />}
      <div className="poppins-14-600" style={{ color: color }}>
        {label}
      </div>
    </button>
  );
};

export default RoundBorderButton;

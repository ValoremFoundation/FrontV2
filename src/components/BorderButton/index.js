import React from 'react';
import 'src/styles/components/BorderButton.scss';
import 'src/styles/Global.scss';

const BorderButton = ({ label, color }) => {
  return (
    <button className="border-button" style={{ border: `1px solid ${color}` }}>
      <div className="poppins-14-400" style={{ color: color }}>
        {label}
      </div>
    </button>
  );
};

export default BorderButton;

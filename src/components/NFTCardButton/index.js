import React from 'react';
import 'src/styles/components/NFTCardButton.scss';

const NFTCardButton = ({ label, color, bgColor }) => {
  return (
    <button className="nft-card-button" style={{ background: bgColor, color: color }}>
      {label}
    </button>
  );
};

export default NFTCardButton;

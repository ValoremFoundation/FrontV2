import React from 'react';
import 'src/styles/Global.scss';
import Star from 'src/assets/images/star.svg';

const StarString = ({ label }) => {
  return (
    <div className="global-flex-between">
      <img alt="alt" src={Star} width={20} height={20} className="me-2" />
      <div className="poppins-16-600">{label}</div>
    </div>
  );
};

export default StarString;

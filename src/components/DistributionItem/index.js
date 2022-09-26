import React from 'react';
import 'src/styles/Global.scss';

const DistributionItem = ({ roleInfo }) => {
  return (
    <div className="me-4">
      <div className="poppins-14-500">{roleInfo?.role}</div>
      <div className="poppins-14-600" style={{ color: '#4ECB71' }}>
        {roleInfo?.percent}%
      </div>
    </div>
  );
};

export default DistributionItem;

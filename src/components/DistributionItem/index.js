import React from 'react';
import 'src/styles/Global.scss';

const DistributionItem = ({ label, value }) => {
  return (
    <div className="me-4">
      <div className="poppins-14-500">{label}</div>
      <div className="poppins-14-600" style={{ color: '#4ECB71' }}>
        {value}%
      </div>
    </div>
  );
};

export default DistributionItem;

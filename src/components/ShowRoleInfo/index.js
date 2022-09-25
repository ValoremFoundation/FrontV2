import React from 'react';

const ShowRoleInfo = ({ value, role, unit }) => {
  return (
    <div>
      <div className="poppins-20-600" style={{ color: '#4ECB71' }}>
        {value}
        {unit}
      </div>
      <div className="poppins-14-500-gray">{role}</div>
    </div>
  );
};

export default ShowRoleInfo;

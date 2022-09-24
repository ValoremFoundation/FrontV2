import React from 'react';
import 'src/styles/Global.scss';

const ProfileNumberName = ({ data }) => {
  return (
    <div className="me-3">
      <p className="poppins-16-600 text-center">{data?.count}</p>
      <p className="poppins-16-600 text-center" style={{ color: '#5C5C5C' }}>
        {data?.name}
      </p>
    </div>
  );
};

export default ProfileNumberName;

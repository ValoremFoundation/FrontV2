import React from 'react';
import 'src/styles/components/UserWithName.scss';
import 'src/styles/Global.scss';

const UserWithName = ({ userInfo }) => {
  const { info, gift } = userInfo;
  return (
    <div className="user-with-name">
      <div className="poppins-12-500 text-center">{info?.name}</div>
      <div className="poppins-12-500 text-center mb-1">{info?.role}</div>
      <img alt="alt" src={info?.avatar} width={100} height={100} style={{ borderRadius: 100 }} />
      <div className="user-with-dot">
        <div style={{ width: 15, height: 15, background: info?.dotColor, borderRadius: 15 }}></div>
        {gift?.length &&
          gift.map((item, index) => (
            <div style={{ background: item?.bgColor, borderRadius: 20, padding: 9 }} key={index}>
              <div className="poppins-14-700 text-center" style={{ color: item?.color }}>
                {item?.name}
              </div>
              <div className="poppins-14-700 text-center" style={{ color: item?.color }}>
                +{item?.amount}VLR
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UserWithName;
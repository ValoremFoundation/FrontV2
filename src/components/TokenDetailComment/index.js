import React from 'react';
import 'src/styles/components/TokenDetailComment.scss';
import 'src/styles/Global.scss';
import Avatar2 from 'src/assets/images/avatar-1.png';

const TokenDetailComment = () => {
  return (
    <div className="global-flex-between" style={{ height: '76px' }}>
      <img alt="alt" src={Avatar2} style={{ width: 106, height: 76 }} />
      <div className="global-flex-start" style={{ background: '#F4F5FB', flex: 1, height: '100%' }}>
        <div className="poppins-16-500-gray ps-5">They do great work!</div>
      </div>
      <div className="global-flex-center" style={{ background: '#D9D9D9' }}>
        <div className="poppins-14-600 px-4">Comment</div>
      </div>
    </div>
  );
};

export default TokenDetailComment;

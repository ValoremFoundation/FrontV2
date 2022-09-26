import React from 'react';
import 'src/styles/components/BoostPost.scss';
import 'src/styles/Global.scss';
import BoostPostIcon from 'src/assets/images/boost.svg';
import BackgroundButton from '../BackgroundButton';
import CustomBlackRadio from '../CustomBlackRadio';

const BoostPost = ({ onClick, onChange }) => {
  return (
    <div className="boost-post-container">
      <div className="global-flex-start">
        <img alt="alt" src={BoostPostIcon} width={21} height={28} />
        <div className="poppins-16-500 ms-3">Boost Post</div>
      </div>
      <div className="boost-post-section mt-2">
        <div className="row gx-4">
          <div className="col-6 col-lg-3 my-2" style={{ minWidth: '130px' }}>
            <CustomBlackRadio label={'14 days'} value={'14'} onChange={onChange} />
          </div>
          <div className="col-6 col-lg-3 my-2" style={{ minWidth: '130px' }}>
            <CustomBlackRadio label={'30 days'} value={'30'} onChange={onChange} />
          </div>
          <div className="col-6 col-lg-3 my-2" style={{ minWidth: '130px' }}>
            <CustomBlackRadio label={'45 days'} value={'45'} onChange={onChange} />
          </div>
          <div className="col-6 col-lg-3 my-2" style={{ minWidth: '130px' }}>
            <CustomBlackRadio label={'60 days'} value={'60'} onChange={onChange} />
          </div>
        </div>
        <div className="mt-2">
          <BackgroundButton label={'Buy Now'} color={'#FFFFFF'} bgColor={'#000000'} onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default BoostPost;

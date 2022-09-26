import React from 'react';
import 'src/styles/components/CustomBlackRadio.scss';
import 'src/styles/Global.scss';

const CustomBlackRadio = ({ label, value, onChange }) => {
  return (
    <div className="global-flex-start">
      <div className="custom-black-radio">
        <input id="custom-black-radio-id" value={value} name="boost-post" type={'radio'} onChange={onChange} />
      </div>
      <div className="poppins-14-500 ms-3">{label}</div>
    </div>
  );
};

export default CustomBlackRadio;

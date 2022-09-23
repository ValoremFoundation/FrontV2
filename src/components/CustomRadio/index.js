import React from 'react';
import 'src/styles/components/CustomRadio.scss';
import 'src/styles/Global.scss';

const CustomRadio = ({ label, value }) => {
  return (
    <div className="global-flex-start">
      <div className="custom-radio">
        <input id="custom-radio-id" value={value} name="person" type={'radio'} />
      </div>
      <div className="poppins-14-500 ms-3">{label}</div>
    </div>
  );
};

export default CustomRadio;

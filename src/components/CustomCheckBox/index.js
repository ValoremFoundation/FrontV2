import React from 'react';
import 'src/styles/components/CustomCheckBox.scss';
import 'src/styles/Global.scss';

const CustomCheckBox = ({ label }) => {
  return (
    <div className="global-flex-start">
      <div className="custom-checkbox">
        <input id="custom-checkbox-id" name="video" type={'checkbox'} />
      </div>
      <div className="poppins-14-500 ms-3">{label}</div>
    </div>
  );
};

export default CustomCheckBox;

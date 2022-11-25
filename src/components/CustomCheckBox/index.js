import React from 'react';
import 'src/styles/components/CustomCheckBox.scss';
import 'src/styles/Global.scss';

const CustomCheckBox = ({ label, onChange, value, require = false }) => {
  return (
    <div className="global-flex-start">
      <div className="custom-checkbox">
        <input
          id="custom-checkbox-id"
          name="video"
          type={'checkbox'}
          onChange={onChange}
          value={value}
          checked={value}
        />
      </div>
      <div className="poppins-14-500 ms-3">
        {label}
        {require && <span className="err-text">**require**</span>}
      </div>
    </div>
  );
};

export default CustomCheckBox;

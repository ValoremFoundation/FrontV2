import React from 'react';
import 'src/styles/components/CustomCheckBox.scss';
import 'src/styles/Global.scss';

const CustomCheckBox = ({ label = '', onChange, value, require = false }) => {
  return (
    <div className="d-flex justify-content-start">
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
      <div className="poppins-16-500 global-pointer ms-3" onClick={onChange}>
        {label}
        {require && <span className="err-text">**require**</span>}
      </div>
    </div>
  );
};

export default CustomCheckBox;

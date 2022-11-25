import React from 'react';
import 'src/styles/components/SelectInput.scss';
import 'src/styles/Global.scss';

const SelectInput = ({ label, placeFolder, value = '', onChange = () => {}, options = [], require = false }) => {
  return (
    <div>
      <div className="poppins-14-500">
        {label}
        {require && <span className="err-text">**require**</span>}
      </div>
      <select name="category" className="select-input poppins-14-500" value={value} onChange={onChange}>
        <option value={0}>{placeFolder}</option>
        {options.map((option, index) => (
          <option key={index} value={index + 1}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;

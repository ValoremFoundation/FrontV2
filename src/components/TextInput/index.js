import React from 'react';
import 'src/styles/components/TextInput.scss';
import 'src/styles/Global.scss';

const TextInput = ({ label, type = 'text', value = '', onChange = () => {}, disabled = false, placeholder }) => {
  return (
    <div>
      <div className="poppins-14-500">{label}</div>
      {type === 'text' ? (
        <div className="text-input">
          <input
            id={label}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="custom-text-input"
            placeholder={placeholder || ''}
          />
        </div>
      ) : (
        <div className={'text-input'} style={{ height: 'auto' }}>
          <textarea
            id={label}
            rows="4"
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="custom-text-input"
          />
        </div>
      )}
    </div>
  );
};

export default TextInput;

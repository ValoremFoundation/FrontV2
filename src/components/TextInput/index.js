import React from 'react';
import 'src/styles/components/TextInput.scss';
import 'src/styles/Global.scss';

const TextInput = ({ label, type = 'text', value = '', onChange = () => {}, disabled = false }) => {
  return (
    <div>
      <div className="poppins-14-500">{label}</div>
      {type === 'text' ? (
        <div className="text-input">
          <input id="text-input-id" type={type} value={value} onChange={onChange} disabled={disabled} />
        </div>
      ) : (
        <div className="text-input" style={{ height: 'auto' }}>
          <textarea id="text-input-id" rows="4" value={value} onChange={onChange} disabled={disabled} />
        </div>
      )}
    </div>
  );
};

export default TextInput;

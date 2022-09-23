import React from 'react';
import 'src/styles/components/TextInput.scss';
import 'src/styles/Global.scss';

const TextInput = ({ label, type = 'text' }) => {
  return (
    <div>
      <div className="poppins-14-500">{label}</div>
      {type === 'text' ? (
        <div className="text-input">
          <input id="text-input-id" type={type} />
        </div>
      ) : (
        <div className="text-input" style={{ height: 'auto' }}>
          <textarea id="text-input-id" rows="4" />
        </div>
      )}
    </div>
  );
};

export default TextInput;

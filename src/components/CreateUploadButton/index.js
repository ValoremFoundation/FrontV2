import React from 'react';
import 'src/styles/components/CreateUploadButton.scss';

const CreateUploadButton = ({ label, color, bgColor }) => {
  return (
    <button className="create-upload-button" style={{ background: bgColor, color: color }}>
      {label}
    </button>
  );
};

export default CreateUploadButton;

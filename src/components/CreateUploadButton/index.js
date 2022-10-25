import React from 'react';
import 'src/styles/components/CreateUploadButton.scss';

const CreateUploadButton = ({ label, color, bgColor, onClick }) => {
  return (
    <button className="create-upload-button" style={{ background: bgColor, color: color }} onClick={onClick}>
      {label}
    </button>
  );
};

export default CreateUploadButton;

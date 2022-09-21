import React from 'react';
import 'src/styles/components/BorderButton.scss';

const BorderButton = ({ label }) => {
  return <button className="border-button">{label}</button>;
};

export default BorderButton;

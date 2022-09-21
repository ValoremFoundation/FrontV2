import React from 'react';
import ReactLoading from 'react-loading';
import 'src/styles/components/LoadingSpinner.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <ReactLoading type="spinningBubbles" color="green" height="5%" width="5%" />
      </div>
    </div>
  );
};

export default LoadingSpinner;

import React from 'react';
import LoadingIcon from 'src/components/Icons/LoadingIcon';

export const LoadingPage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        width: '100vw',
        height: '100vh',
        background: '#000a',
        position: 'fixed',
        zIndex: 9999,
        top: 0,
      }}
    >
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ flexDirection: 'column', color: 'white' }}
      >
        <LoadingIcon color="white" width="60px" height="60px" />
        <h4 className="mt-2 text-cetner">Please don't leave this page while loading...</h4>
      </div>
    </div>
  );
};

export default LoadingPage;

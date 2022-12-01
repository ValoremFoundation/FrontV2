import React from 'react';
import 'react-medium-image-zoom/dist/styles.css';

export const MultiMediaView = ({ style, className, mediaType, src, height }) => {
  return (
    <div className={className}>
      {mediaType === 'application' ? (
        <img src={'/img/document.png'} alt="Document" style={{ ...style }} />
      ) : mediaType === 'video' ? (
        <video src={src} muted autoPlay loop style={{ ...style, borderRadius: '4px' }} />
      ) : mediaType === 'audio' ? (
        <audio controls loop style={{ height: height }}>
          <source src={src} />
        </audio>
      ) : (
        <img src={src} alt="token" style={{ ...style }} />
      )}
    </div>
  );
};

export default MultiMediaView;

import React, { memo } from 'react';
import 'react-medium-image-zoom/dist/styles.css';

export const MultiMediaView = memo(({ style, className, mediaType, src }) => {
  return (
    <div className={className}>
      {mediaType === 'application' ? (
        <img src={'/img/document.png'} alt="Document" style={{ ...style }} />
      ) : mediaType === 'video' ? (
        <video src={src} muted autoPlay loop style={{ ...style, borderRadius: '4px' }} />
      ) : mediaType === 'audio' ? (
        <audio controls loop style={{ ...style }}>
          <source src={src} />
        </audio>
      ) : (
        <img src={src} alt="Image" style={{ ...style }} />
      )}
    </div>
  );
});

export default MultiMediaView;

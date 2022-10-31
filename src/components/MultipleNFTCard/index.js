import React, { memo } from 'react';
import styles from './multiplenftcard.module.scss';

export const MultipleNFTCard = memo(({ style, className, mediaType, src }) => {
  return (
    <div className={className}>
      {mediaType === 'application' ? (
        <img src={'/images/document.png'} alt="Document" style={{ ...style }} />
      ) : mediaType === 'video' ? (
        <video src={src} muted autoPlay loop style={{ ...style, borderRadius: '4px', width: style?.width * 1.5 }} />
      ) : mediaType === 'audio' ? (
        <audio controls loop>
          <source src={src} />
        </audio>
      ) : (
        <img src={src} alt="Image" style={{ ...style }} />
      )}
    </div>
  );
});

export default MultipleNFTCard;

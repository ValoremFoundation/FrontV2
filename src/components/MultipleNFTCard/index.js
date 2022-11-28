import React, { memo } from 'react';
import styles from './multiplenftcard.module.scss';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export const MultipleNFTCard = memo(({ style, className, mediaType, src }) => {
  return (
    <div className={className}>
      {mediaType === 'application' ? (
        <TransformWrapper>
          <TransformComponent>
            <img src={'/img/document.png'} alt="Document" style={{ ...style }} />
          </TransformComponent>
        </TransformWrapper>
      ) : mediaType === 'video' ? (
        <Zoom>
          <video src={src} muted autoPlay loop style={{ ...style, borderRadius: '4px' }} />
        </Zoom>
      ) : mediaType === 'audio' ? (
        <Zoom>
          <audio controls loop>
            <source src={src} />
          </audio>
        </Zoom>
      ) : (
        <TransformWrapper>
          <TransformComponent>
            <img src={src} alt="Image" style={{ ...style }} />
          </TransformComponent>
        </TransformWrapper>
      )}
    </div>
  );
});

export default MultipleNFTCard;

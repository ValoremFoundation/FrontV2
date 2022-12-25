import React, { useEffect, useState } from 'react';
import 'src/styles/components/StepOrder.scss';
import 'src/styles/Global.scss';
import { isMobile } from 'react-device-detect';

const StepOrder = ({ step, existGift = 1, last = false }) => {
  const [currentWidth, setCurrentWidth] = useState(768);
  useEffect(() => {
    setCurrentWidth(document.body.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.body.offsetWidth]);

  return (
    // <div style={{ maxWidth: 180, marginBottom: '230px' }}>
    <div style={{ marginBottom: currentWidth < 380 ? '20px' : existGift > 0 ? '230px' : '40px' }}>
      <div
        className="poppins-12-400 p-3 text-center"
        style={{ maxWidth: isMobile ? '150px' : '400px', color: last ? 'white' : '' }}
      >
        {step?.description}
      </div>
      <div
        className="poppins-16-700 text-center"
        style={{ height: '24px', marginTop: step?.description ? '' : '16px' }}
      >
        {step?.amount ? step?.amount + ' VLR' : ''}
      </div>
      <div className="step-order-dot-line"></div>
    </div>
  );
};

export default StepOrder;

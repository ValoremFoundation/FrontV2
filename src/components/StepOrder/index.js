import React, { useEffect, useState } from 'react';
import 'src/styles/components/StepOrder.scss';
import 'src/styles/Global.scss';

const StepOrder = ({ step, existGift = 1 }) => {
  const [currentWidth, setCurrentWidth] = useState(768);
  useEffect(() => {
    setCurrentWidth(document.body.offsetWidth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [document.body.offsetWidth]);

  return (
    // <div style={{ maxWidth: 180, marginBottom: '230px' }}>
    <div style={{ marginBottom: currentWidth < 319 ? '20px' : existGift > 0 ? '230px' : '40px' }}>
      <div className="poppins-12-400 p-3">{step?.description}</div>
      <div className="poppins-16-700 text-center" style={{ height: '24px' }}>
        {step?.amount ? step?.amount + ' VLR' : ''}
      </div>
      <div className="step-order-dot-line"></div>
    </div>
  );
};

export default StepOrder;

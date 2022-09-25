import React from 'react';
import 'src/styles/components/StepOrder.scss';
import 'src/styles/Global.scss';

const StepOrder = ({ step, existGift = 1 }) => {
  return (
    // <div style={{ maxWidth: 180, marginBottom: '230px' }}>
    <div style={{ marginBottom: existGift > 1 ? '230px' : '40px' }}>
      <div className="poppins-12-400 p-3">{step?.description}</div>
      <div className="poppins-16-700 text-center" style={{ height: '24px' }}>
        {step?.amount ? step?.amount + ' VLR' : ''}
      </div>
      <div className="step-order-dot-line"></div>
    </div>
  );
};

export default StepOrder;

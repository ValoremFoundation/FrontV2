import React from 'react';
import 'src/styles/components/BenefitCard.scss';
import 'src/styles/Global.scss';
import SendIcon from 'src/assets/images/send-green-icon.svg';
import PolygonIcon from 'src/assets/images/polygon-icon.svg';
import DistributionItem from '../DistributionItem';
import BackgroundButton from '../BackgroundButton';

const BenefitCard = () => {
  const data1 = [
    {
      role: 'Seller',
      percent: 60,
    },
    {
      role: 'Reseller',
      percent: 30,
    },
    {
      role: 'Royalty',
      percent: 10,
    },
  ];

  return (
    <div className="benefit-card-container">
      <div className="benefit-card-header">
        <div className="poppins-16-500">Unique Benefits</div>
      </div>
      <div className="benefit-card-content">
        <div className="global-flex-between my-2">
          <div className="poppins-16-500-gray">Expiration 10/20/28</div>
          <div className="global-flex-center">
            <div className="poppins-14-500 me-2">Gift VLR</div>
            <img alt="alt" src={SendIcon} width={20} height={20} className="global-pointer" />
          </div>
        </div>
        <div className="my-2">
          <div className="poppins-16-400">
            <li>unlimitted access</li>
          </div>
          <div className="poppins-16-400">
            <li>example</li>
          </div>
          <div className="poppins-16-400">
            <li>example</li>
          </div>
          <div className="poppins-16-400">
            <li>example</li>
          </div>
        </div>
        <div className="global-flex-end">
          <div className="global-flex-center">
            {data1.map((item, index) => (
              <DistributionItem label={item.role} value={item.percent} key={index} />
            ))}
          </div>
        </div>
        <div className="poppins-14-600-gray">Current Price</div>
        <div className="global-flex-start">
          <img alt="alt" src={PolygonIcon} width={30} height={30} className="global-pointer me-3" />
          <div className="poppins-36-700 me-3">0.5 VLR</div>
          <div className="poppins-16-500 mt-3">$0.25 USD</div>
        </div>
        <div className="my-2">
          <BackgroundButton label={'BUY NOW'} color={'#2A212E'} bgColor={'#96F2A4'} fullWidth={true} />
        </div>
        <div className="row gx-4">
          <div className="col-12 col-lg-6 my-3">
            <BackgroundButton label={'BUY MATIC'} color={'#2A212E'} bgColor={'#FFFFFF'} fullWidth={true} />
          </div>
          <div className="col-12 col-lg-6 my-3">
            <BackgroundButton label={'BUY MATIC'} color={'#FFFFFF'} bgColor={'#000000'} fullWidth={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenefitCard;

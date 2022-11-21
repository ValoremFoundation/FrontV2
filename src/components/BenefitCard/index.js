import React from 'react';
import 'src/styles/components/BenefitCard.scss';
import 'src/styles/Global.scss';
import SendIcon from 'src/assets/images/send-green-icon.svg';
import PolygonIcon from 'src/assets/images/polygon-icon.png';
import DistributionItem from '../DistributionItem';
import BackgroundButton from '../BackgroundButton';
import { dateWithTimestamp } from 'src/utils/formartUtils';

const BenefitCard = ({ nftData, isOwner, handleClickBuy, handleClickDelist, handleClickGift }) => {
  return (
    <div className="benefit-card-container">
      <div className="benefit-card-header">
        <div className="poppins-16-500">{nftData?.tell_us}</div>
      </div>
      <div className="benefit-card-content">
        <div className="global-flex-between my-2">
          <div className="poppins-16-500-gray">Expiration {dateWithTimestamp(nftData?.expiration)}</div>
          {!isOwner && (
            <div className="global-flex-center">
              <div className="poppins-14-500 me-2">Gift VLR</div>
              <img
                alt="alt"
                src={SendIcon}
                width={20}
                height={20}
                className="global-pointer"
                onClick={handleClickGift}
              />
            </div>
          )}
        </div>
        <div className="my-2">
          <div className="poppins-16-400">
            <li>{nftData?.description}</li>
          </div>
        </div>
        <div className="global-flex-end">
          <div className="global-flex-center">
            <div className="me-4">
              <div className="poppins-14-500">{'Creator'}</div>
              <div className="poppins-14-600" style={{ color: '#4ECB71' }}>
                {nftData?.creator}%
              </div>
            </div>
            <div className="me-4">
              <div className="poppins-14-500">{'Reseller'}</div>
              <div className="poppins-14-600" style={{ color: '#4ECB71' }}>
                {nftData?.reseller}%
              </div>
            </div>
            <div className="me-4">
              <div className="poppins-14-500">{'Royalty Pool'}</div>
              <div className="poppins-14-600" style={{ color: '#4ECB71' }}>
                {nftData?.royalty_pool}%
              </div>
            </div>
          </div>
        </div>
        <div className="poppins-14-600-gray">Current Price</div>
        <div className="global-flex-start">
          <img alt="alt" src={PolygonIcon} width={30} height={30} className="global-pointer me-3" />
          <div className="poppins-36-700 me-3">{nftData?.price} VLR</div>
          <div className="poppins-16-500 mt-3">$0.25 USD</div>
        </div>
        {!nftData?.burned && isOwner ? (
          <div className="my-2">
            <BackgroundButton
              label={'Delist'}
              color={'#2A212E'}
              bgColor={'#96F2A4'}
              fullWidth={true}
              onClick={handleClickDelist}
            />
          </div>
        ) : (
          <>
            <div className="my-2">
              <BackgroundButton
                label={'BUY NOW'}
                color={'#2A212E'}
                bgColor={'#96F2A4'}
                fullWidth={true}
                onClick={handleClickBuy}
              />
            </div>
            {/* <div className="row gx-4">
          <div className="col-12 col-lg-6 my-3">
            <BackgroundButton label={'BUY MATIC'} color={'#2A212E'} bgColor={'#FFFFFF'} fullWidth={true} />
          </div>
          <div className="col-12 col-lg-6 my-3">
            <BackgroundButton label={'BUY VLR'} color={'#FFFFFF'} bgColor={'#000000'} fullWidth={true} />
          </div>
        </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default BenefitCard;

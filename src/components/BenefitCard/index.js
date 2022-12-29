import React from 'react';
import 'src/styles/components/BenefitCard.scss';
import 'src/styles/Global.scss';
import SendIcon from 'src/assets/images/send-green-icon.svg';
import BackgroundButton from '../BackgroundButton';
import { dateWithTimestamp, numberFormat } from 'src/utils/formartUtils';
import MetamaskIcon from 'src/assets/images/metamask.svg';
import { registerToken } from 'src/utils/formartUtils';

const BenefitCard = ({
  nftData,
  isOwner,
  handleClickBuy,
  handleClickDelist,
  handleClickGift,
  tokenStatus,
  tokenAddress,
  tokenSymbol,
  tokenDecimals,
  chainId,
  unitEstimateOut,
  nativePrice,
}) => {
  return (
    <div className="benefit-card-container">
      <div className="benefit-card-header">
        <div className="poppins-16-500">{nftData?.tell_us}</div>
      </div>
      <div className="benefit-card-content">
        <div className="global-flex-between my-2">
          <div className="poppins-16-500-gray">
            Expiration : {nftData?.expiration ? dateWithTimestamp(nftData?.expiration) : 'Never'}
          </div>
          {!isOwner && (
            <div className="global-flex-center">
              <div className="poppins-14-500 me-2">Send VLR</div>
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
        <div className="my-2">
          <div className="poppins-14-600 mt-3 mb-2">Import Token</div>
          <div
            className="d-flex justify-content-start align-items-center global-pointer p-2 rounded"
            style={{ background: '#96F2A4', width: 'fit-content' }}
            onClick={() => registerToken(tokenAddress, tokenSymbol, tokenDecimals, chainId)}
          >
            <div className="poppins-14-500 me-2">Add Metamask</div>
            <img alt="alt" src={MetamaskIcon} width={20} height={20} />
          </div>
        </div>
        <div className="poppins-14-600-gray">Current Price</div>
        <div className="global-flex-start">
          <img alt="alt" src={'/img/logo.png'} width={30} height={30} className="global-pointer me-3" />
          <div className="poppins-36-700 me-3">{nftData?.price} VLR</div>
          <div className="poppins-16-500 mt-3">
            {`$ ${numberFormat((1 / unitEstimateOut) * nativePrice * Number(nftData?.price), 2)} usd`}
          </div>
        </div>
        <div>
          {unitEstimateOut && nativePrice ? (
            <span className="poppins-14-500">
              {`1 VLR = ${numberFormat((1 / unitEstimateOut) * nativePrice, 3)} USD (Today's Price * )`}
            </span>
          ) : (
            <></>
          )}
        </div>
        {!nftData?.burned && tokenStatus === 'delist' && (
          <div className="my-2">
            <BackgroundButton
              label={'Delist'}
              color={'#2A212E'}
              bgColor={'#96F2A4'}
              fullWidth={true}
              onClick={handleClickDelist}
            />
          </div>
        )}
        {!nftData?.burned && tokenStatus === 'buy' && (
          <div className="my-2">
            <BackgroundButton
              label={'BUY NOW'}
              color={'#2A212E'}
              bgColor={'#96F2A4'}
              fullWidth={true}
              onClick={handleClickBuy}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BenefitCard;

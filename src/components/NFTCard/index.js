import React from 'react';
import 'src/styles/components/NFTCard.scss';
import 'src/styles/Global.scss';
import BlueCheck from 'src/assets/images/blue-check.svg';
import Position from 'src/assets/images/position.svg';
// import Favorite from 'src/assets/images/favorite.svg';
import Message from 'src/assets/images/message.svg';
import NFTCardButton from 'src/components/NFTCardButton';
import { SYMBOL } from 'src/constants';
import MultiMediaView from '../MultiMediaView';

const NFTCard = ({ onClick, token, price = 0, categories }) => {
  return (
    <div className="nft-card-container" onClick={onClick}>
      <MultiMediaView
        src={token?.uri || '/img/blank-image.jpg'}
        style={{ width: '100%', height: '260px', borderRadius: 5, objectFit: 'cover', objectPosition: 'center' }}
        mediaType={token?.media_type}
        height={'260px'}
      />
      <div className="global-flex-between my-3">
        <div className="global-flex-center">
          <div>
            <img
              alt="alt"
              src={token?.user?.avatar || '/img/default-avatar.png'}
              style={{ width: 55, height: 55, borderRadius: 50 }}
            />
            <img alt="alt" src={BlueCheck} style={{ width: 20, height: 20, marginTop: -50 }} />
          </div>
          <div>
            <div className="nft-card-name">{token?.user?.name}</div>
            <div className="global-flex-start">
              <img alt="alt" src={Position} style={{ width: 13, height: 21 }} />
              <div className="nft-card-position ms-1 mt-1">{token?.location}</div>
            </div>
          </div>
        </div>
        <div className="global-flex-center">
          {/* <div>
            <img alt="alt" src={Favorite} />
            <div className="nft-card-favor-number">5k</div>
          </div> */}
          <div className="ms-4">
            <img alt="alt" src={Message} onClick={() => window.open(categories[token?.category_id - 1]?.discord)} />
            {/* <div className="nft-card-favor-number">1k</div> */}
          </div>
        </div>
      </div>
      <div className="poppins-20-600 mt-2">{token?.name}</div>
      <div className="global-flex-between my-3">
        <div className="d-flex justify-content-start">
          <div className="nft-card-matic-number">
            {token?.price ? token?.price : price} {SYMBOL}
          </div>
          <div className="nft-card-usd-number">($20 usd)</div>
        </div>
        <div className="nft-card-up-percent">+5%</div>
      </div>
      <div className="d-flex flex-wrap justify-content-between my-3">
        <div style={{ width: '46%' }} className="my-1">
          <NFTCardButton label={token?.hashtag1} bgColor={'#F4F5FB'} color={'#000000'} />
        </div>
        <div style={{ width: '46%' }} className="my-1">
          <NFTCardButton label={token?.hashtag2} bgColor={'#F4F5FB'} color={'#000000'} />
        </div>
        <div style={{ width: '46%' }} className="my-1">
          <NFTCardButton label={token?.hashtag3} bgColor={'#F4F5FB'} color={'#000000'} />
        </div>
      </div>
      {/* <NFTDivideLine />
      <div className="global-flex-between my-3">
        <div className="nft-card-name">Top Comments</div>
        <StarString label={1} />
      </div>
      <div className="global-flex-start">
        <img alt="alt" src={Avatar1} style={{ width: 48, height: 40 }} />
        <div className="nft-card-position ms-1">Excellent Work!</div>
      </div> */}
    </div>
  );
};

export default NFTCard;

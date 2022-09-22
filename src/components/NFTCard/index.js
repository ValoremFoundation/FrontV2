import React from 'react';
import 'src/styles/components/NFTCard.scss';
import 'src/styles/Global.scss';
import NFTImage from 'src/assets/images/nft-card.png';
import Avatar1 from 'src/assets/images/avatar-1.png';
import BlueCheck from 'src/assets/images/blue-check.svg';
import Position from 'src/assets/images/position.svg';
import Favorite from 'src/assets/images/favorite.svg';
import Message from 'src/assets/images/message.svg';
import Star from 'src/assets/images/star.svg';
import NFTCardButton from 'src/components/NFTCardButton';
import NFTDivideLine from 'src/components/NFTDivideLine';

const NFTCard = ({ label }) => {
  return (
    <div className="nft-card-container">
      <img src={NFTImage} style={{ width: '100%', borderRadius: 5, objectFit: 'cover', objectPosition: 'center' }} />
      <div className="global-flex-between my-3">
        <div className="global-flex-centner">
          <div>
            <img src={Avatar1} style={{ width: 55, height: 55, borderRadius: 50 }} />
            <img src={BlueCheck} style={{ width: 20, height: 20, marginTop: -50 }} />
          </div>
          <div>
            <div className="nft-card-name">Janes Salon</div>
            <div className="global-flex-start">
              <img src={Position} style={{ width: 13, height: 21 }} />
              <div className="nft-card-position ms-1 mt-1">Miami</div>
            </div>
          </div>
        </div>
        <div className="global-flex-centner">
          <div>
            <img src={Favorite} />
            <div className="nft-card-favor-number">5k</div>
          </div>
          <div className="ms-4">
            <img src={Message} />
            <div className="nft-card-favor-number">1k</div>
          </div>
        </div>
      </div>
      <div className="global-flex-between my-3">
        <div className="d-flex justify-content-start">
          <div className="nft-card-matic-number">10 Matic</div>
          <div className="nft-card-usd-number">($20 usd)</div>
        </div>
        <div className="nft-card-up-percent">+5%</div>
      </div>
      <div className="d-flex flex-wrap justify-content-between my-3">
        <div style={{ width: '46%' }} className="my-1">
          <NFTCardButton label={'Web design'} bgColor={'#F4F5FB'} color={'#000000'} />
        </div>
        <div style={{ width: '46%' }} className="my-1">
          <NFTCardButton label={'SEO'} bgColor={'#F4F5FB'} color={'#000000'} />
        </div>
        <div style={{ width: '46%' }} className="my-1">
          <NFTCardButton label={'Graphic Design'} bgColor={'#F4F5FB'} color={'#000000'} />
        </div>
      </div>
      <NFTDivideLine />
      <div className="global-flex-between my-3">
        <div className="nft-card-name">Top Comments</div>
        <div className="global-flex-between">
          <img src={Star} />
          <div className="nft-card-star-number ms-2">1</div>
        </div>
      </div>
      <div className="global-flex-start">
        <img src={Avatar1} style={{ width: 48, height: 40 }} />
        <div className="nft-card-position ms-1">Excellent Work!</div>
      </div>
    </div>
  );
};

export default NFTCard;
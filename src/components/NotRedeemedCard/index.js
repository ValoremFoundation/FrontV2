import React from 'react';
import 'src/styles/components/NotRedeemedCard.scss';
import 'src/styles/Global.scss';
import NFTImage from 'src/assets/images/nft-card.png';
import Favorite from 'src/assets/images/favorite.svg';
import Message from 'src/assets/images/message.svg';
import Position from 'src/assets/images/position.svg';
import NFTCardButton from '../NFTCardButton';
import BackgroundButton from '../BackgroundButton';
import RoundBorderButton from '../RoundBorderButton';

const NotRedeemedCard = ({ handleClickAccept, handleClickDeny, handleClick }) => {
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

  const distributionItem = (roleInfo, index) => {
    return (
      <div className="me-4" key={index}>
        <div className="poppins-14-500">{roleInfo?.role}</div>
        <div className="poppins-14-600" style={{ color: '#4ECB71' }}>
          {roleInfo?.percent}%
        </div>
      </div>
    );
  };

  return (
    <div className="listing-card-container global-pointer" onClick={handleClick}>
      <div className="row gx-4">
        <div className="col-12 col-lg-3 p-2">
          <div className="global-flex-center">
            <img
              alt="alt"
              src={NFTImage}
              style={{
                maxWidth: '250px',
                height: '170px',
                borderRadius: 5,
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
          </div>
        </div>
        <div className="col-12 col-lg-5 p-2">
          <div className="global-flex-column-between">
            <div>
              <div className="global-flex-between">
                <div className="poppins-20-600">Janes Salon </div>
                <div className="global-flex-between">
                  <div className="me-4">
                    <img alt="alt" src={Favorite} width={20} height={20} className="global-pointer" />
                    <div className="poppins-16-700-gray text-center">5k</div>
                  </div>
                  <div>
                    <img alt="alt" src={Message} width={20} height={20} className="global-pointer" />
                    <div className="poppins-16-700-gray text-center">1k</div>
                  </div>
                </div>
              </div>
              <div className="global-flex-start">
                <img alt="alt" src={Position} style={{ width: 13, height: 21 }} />
                <div className="poppins-14-500 ms-1 mt-1">Miami</div>
              </div>
            </div>
            <div>
              <div className="global-flex-start my-3">{data1.map((item, index) => distributionItem(item, index))}</div>
              <div className="global-flex-lg-start-sm-center">
                <div className="mx-2 mt-1" style={{ minWidth: '150px' }}>
                  <NFTCardButton label={'Web design'} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
                <div className="mx-2 my-1" style={{ minWidth: '150px' }}>
                  <NFTCardButton label={'SEO'} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
                <div className="mx-2 my-1" style={{ minWidth: '150px' }}>
                  <NFTCardButton label={'Graphic Design'} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-4  p-2">
          <div className="global-flex-end" style={{ height: '100%' }}>
            <div className="global-flex-column-between">
              <div className="mb-3">
                <BackgroundButton
                  label={'Accept Redemption Request'}
                  color={'#FFFFFF'}
                  bgColor={'#000000'}
                  onClick={handleClickAccept}
                />
              </div>
              <RoundBorderButton
                label={'Deny Redemption Request'}
                color={'#000000'}
                bgColor={'#FFFFFF'}
                onClick={handleClickDeny}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotRedeemedCard;

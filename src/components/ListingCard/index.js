import React from 'react';
import 'src/styles/components/ListingCard.scss';
import 'src/styles/Global.scss';
import NFTImage from 'src/assets/images/nft-card.png';
import Favorite from 'src/assets/images/favorite.svg';
import Message from 'src/assets/images/message.svg';
import Position from 'src/assets/images/position.svg';
import FacebookIcon from 'src/assets/images/facebook-icon.svg';
import InstagramIcon from 'src/assets/images/instagram-icon.svg';
import LinkIcon from 'src/assets/images/facebook-icon.svg';
import NFTCardButton from '../NFTCardButton';
import BackgroundButton from '../BackgroundButton';
import DistributionItem from '../DistributionItem';

const ListingCard = ({ handleClickActive, handleClick }) => {
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
                  <img alt="alt" src={Favorite} width={20} height={20} className="me-4 global-pointer" />
                  <img alt="alt" src={Message} width={20} height={20} className="global-pointer" />
                </div>
              </div>
              <div className="global-flex-start">
                <img alt="alt" src={Position} style={{ width: 13, height: 21 }} />
                <div className="poppins-14-500 ms-1 mt-1">Miami</div>
              </div>
            </div>
            <div>
              <div className="global-flex-start my-3">
                {data1.map((item, index) => (
                  <DistributionItem roleInfo={item} key={index} />
                ))}
              </div>
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
              <div className="global-flex-center mb-3">
                <img alt="alt" src={FacebookIcon} width={20} height={20} className="mx-2 global-pointer" />
                <img alt="alt" src={InstagramIcon} width={25} height={25} className="mx-2 global-pointer" />
                <img alt="alt" src={LinkIcon} width={20} height={20} className="mx-2 global-pointer" />
              </div>
              <div>
                <BackgroundButton
                  label={'Activate'}
                  color={'#111827'}
                  bgColor={'#96F2A4'}
                  onClick={handleClickActive}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;

import React from 'react';
import 'src/styles/components/NotRedeemedCard.scss';
import 'src/styles/Global.scss';
// import Favorite from 'src/assets/images/favorite.svg';
import Message from 'src/assets/images/message.svg';
import Position from 'src/assets/images/position.svg';
import NFTCardButton from '../NFTCardButton';
import BackgroundButton from '../BackgroundButton';
import RoundBorderButton from '../RoundBorderButton';
import DistributionItem from '../DistributionItem';
import MultiMediaView from '../MultiMediaView';

const NotRedeemedCard = ({ handleClickAccept, handleClickDeny, token, profile }) => {
  return (
    <div className="listing-card-container global-pointer">
      <div className="d-flex justify-content-around algin-items-center flex-wrap gx-4">
        <div className=" p-2">
          <div className="global-flex-center">
            <MultiMediaView
              src={token?.uri || '/img/blank-image.jpg'}
              style={{
                maxWidth: '250px',
                // width: '100%',
                height: '170px',
                borderRadius: 5,
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              mediaType={token?.media_type}
              height={'170px'}
            />
          </div>
        </div>
        <div className=" p-2">
          <div className="global-flex-column-between">
            <div>
              <div className="global-flex-between">
                <div className="poppins-20-600">{profile?.name}</div>
                <div className="global-flex-between">
                  {/* <div className="me-4">
                    <img alt="alt" src={Favorite} width={20} height={20} className="global-pointer" />
                    <div className="poppins-16-700-gray text-center">5k</div>
                  </div> */}
                  <div>
                    <img alt="alt" src={Message} width={20} height={20} className="global-pointer" />
                    {/* <div className="poppins-16-700-gray text-center">1k</div> */}
                  </div>
                </div>
              </div>
              <div className="global-flex-start">
                <img alt="alt" src={Position} style={{ width: 13, height: 21 }} />
                <div className="poppins-14-500 ms-1 mt-1">{token?.location}</div>
              </div>
              <div className="poppins-16-600 mt-2">{token?.name}</div>
            </div>
            <div>
              <div className="global-flex-start my-1">
                <DistributionItem label={'Seller'} value={token?.creator} />
                <DistributionItem label={'Reseller'} value={token?.reseller} />
                <DistributionItem label={'Royalty'} value={token?.royalty_pool} />
              </div>
              <div className="global-flex-lg-start-sm-center gap-2">
                <div className="my-1" style={{ minWidth: '140px' }}>
                  <NFTCardButton label={token?.hashtag1} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
                <div className="my-1" style={{ minWidth: '140px' }}>
                  <NFTCardButton label={token?.hashtag2} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
                <div className="my-1" style={{ minWidth: '140px' }}>
                  <NFTCardButton label={token?.hashtag3} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="  p-2">
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

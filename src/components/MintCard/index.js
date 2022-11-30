import React from 'react';
import 'src/styles/components/MintCard.scss';
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
import MultiMediaView from '../MultiMediaView';

const MintCard = ({ handleClick, token, userInfo, handleClickEdit }) => {
  return (
    <div className="listing-card-container global-pointer">
      <div className="row gx-4">
        <div className="col-12 col-lg-3 p-2" onClick={handleClick}>
          <div className="global-flex-center">
            <MultiMediaView
              src={token?.uri || '/img/blank-image.jpg'}
              style={{
                maxWidth: '250px',
                width: '100%',
                height: '170px',
                borderRadius: 5,
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              mediaType={token?.media_type}
            />
          </div>
        </div>
        <div className="col-12 col-lg-6 p-2" onClick={handleClick}>
          <div className="global-flex-column-between">
            <div>
              <div className="global-flex-between">
                <div className="poppins-20-600">{userInfo?.name}</div>
                <div className="global-flex-between">
                  <img alt="alt" src={Favorite} width={20} height={20} className="me-4 global-pointer" />
                  <img alt="alt" src={Message} width={20} height={20} className="global-pointer" />
                </div>
              </div>
              <div className="global-flex-start">
                <img alt="alt" src={Position} style={{ width: 13, height: 21 }} />
                <div className="poppins-14-500 ms-1 mt-1">{token?.location}</div>
              </div>
            </div>
            <div>
              <div className="global-flex-start my-3">
                <DistributionItem label={'Seller'} value={token.creator} />
                <DistributionItem label={'Reseller'} value={token.reseller} />
                <DistributionItem label={'Royalty'} value={token.royalty_pool} />
              </div>
              <div className="global-flex-lg-start-sm-center gap-2">
                <div className="my-1" style={{ minWidth: '150px' }}>
                  <NFTCardButton label={token.hashtag1} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
                <div className="my-1" style={{ minWidth: '150px' }}>
                  <NFTCardButton label={token.hashtag2} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
                <div className="my-1" style={{ minWidth: '150px' }}>
                  <NFTCardButton label={token.hashtag3} bgColor={'#F4F5FB'} color={'#000000'} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3  p-2">
          <div className="global-flex-end" style={{ height: '100%' }}>
            <div className="global-flex-column-between">
              <div className="global-flex-center mb-3">
                <img alt="alt" src={FacebookIcon} width={20} height={20} className="mx-2 global-pointer" />
                <img alt="alt" src={InstagramIcon} width={25} height={25} className="mx-2 global-pointer" />
                <img alt="alt" src={LinkIcon} width={20} height={20} className="mx-2 global-pointer" />
              </div>
              {token?.saved_for_later ? (
                <div className="global-flex-start gap-2">
                  <BackgroundButton
                    label={'Create/Edit'}
                    color={'#111827'}
                    bgColor={'#D9D9D9'}
                    onClick={handleClickEdit}
                  />
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintCard;

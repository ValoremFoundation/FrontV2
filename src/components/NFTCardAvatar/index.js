import React from 'react';
import 'src/styles/components/NFTCardAvatar.scss';

const NFTCardAvatar = ({ item, onClick }) => {
  return (
    <div>
      <img alt="alt" src={item?.image || '/img/blank-image.jpg'} className="nft-card-avatar" onClick={onClick} />
    </div>
  );
};

export default NFTCardAvatar;

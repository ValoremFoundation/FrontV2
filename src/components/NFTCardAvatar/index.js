import React from 'react';
import 'src/styles/components/NFTCardAvatar.scss';
import Avatar1 from 'src/assets/images/nft-card.png';

const NFTCardAvatar = () => {
  return (
    <div>
      <img src={Avatar1} className="nft-card-avatar" />
    </div>
  );
};

export default NFTCardAvatar;

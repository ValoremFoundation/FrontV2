import React from 'react';
import { useHistory } from 'react-router-dom';
import 'src/styles/ActivateListing.scss';
import 'src/styles/Global.scss';
import Avatar2 from 'src/assets/images/avatar-1.png';
import NFTCard from 'src/components/NFTCard';
import ActivateListingCard from 'src/components/ActivateListingCard';
import UserWithName from 'src/components/UserWithName';
import StepOrder from 'src/components/StepOrder';

const ActivateListing = () => {
  const history = useHistory();
  const user1Info = {
    info: {
      name: 'Sarah',
      role: 'Creator',
      avatar: Avatar2,
      dotColor: '#111827',
    },
    gift: [],
  };
  const user2Info = {
    info: {
      name: 'John',
      role: 'Client/Reseller',
      avatar: Avatar2,
      dotColor: '#96F2A4',
    },
    gift: [],
  };
  const user3Info = {
    info: {
      name: 'Jane',
      role: 'Client/Reseller',
      avatar: Avatar2,
      dotColor: '#96F2A4',
    },
    gift: [],
  };
  const user4Info = {
    info: {
      name: 'Tom',
      role: 'Client/Reseller',
      avatar: Avatar2,
      dotColor: '',
    },
  };

  const step1 = {
    description: 'sells web design service to john for',
    amount: '',
  };
  const step2 = {
    description: 'resells service to Jane for ',
    amount: '',
  };
  const step3 = {
    description: 'resells web design service to Tom for',
    amount: '',
  };

  const handleClickActivate = () => {
    history.push('/profile?activeTab=created&actionTab=listed', { actionTabIndex: 6 });
  };

  return (
    <div className="activate-listing-container">
      <div style={{ background: '#FFFFFF' }}>
        <div className="listing-sub-container">
          <div className="listing-first-section">
            <img alt="alt" src={Avatar2} className="listing-first-avatar" />
            <div className="global-flex-column-between-align-end">
              <div></div>
              <div className="poppins-14-600 mb-2 global-pointer">Buy VLR</div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ background: '#F4F5FB' }}>
        <div className="listing-sub-container">
          <div className="listing-second-section">
            <div className="row gx-5">
              <div className="col-12 col-lg-4 my-4">
                <NFTCard onClick={() => history.push(`/token-detail/1`)} />
              </div>
              <div className="col-12 col-lg-8 my-4">
                <ActivateListingCard onClick={handleClickActivate} />
              </div>
            </div>
            <div className="listing-service-price my-4">
              <div className="poppins-24-600">Activating your service and setting a price</div>
              <div className="poppins-20-500 my-3">Remember this example?</div>
              <div className="global-flex-lg-between-sm-center">
                <UserWithName userInfo={user1Info} />
                <StepOrder step={step1} existGift={user1Info?.gift.length} />
                <UserWithName userInfo={user2Info} />
                <StepOrder step={step2} existGift={user1Info?.gift.length} />
                <UserWithName userInfo={user3Info} />
                <StepOrder step={step3} existGift={user1Info?.gift.length} />
                <UserWithName userInfo={user4Info} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivateListing;

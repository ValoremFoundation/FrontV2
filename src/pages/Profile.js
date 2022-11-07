import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation, Link, NavLink } from 'react-router-dom';
import 'src/styles/Profile.scss';
import 'src/styles/Global.scss';
import ProfileNumberName from 'src/components/ProfileNumberName';
import ListingCard from 'src/components/ListingCard';
import RedemptionCard from 'src/components/RedemptionCard';
import BoostPost from 'src/components/BoostPost';
import NFTCard from 'src/components/NFTCard';
import EditIcon from 'src/assets/images/editIcon.svg';
import { getProfile, updateProfile, uploadFile } from 'src/api';
import { useSelector } from 'react-redux';
import LoadingPage from 'src/components/LoadingPage';
import { profileNumberNameData } from 'src/constants';
import Tabs, { Tab } from 'src/components/LineTab';
import Created from 'src/components/Profile/Created';
import Collections from 'src/components/Profile/Collections';
import Transactions from 'src/components/Profile/Transactions';
import RoyaltyPool from 'src/components/Profile/RoyaltyPool';
import EarnLiquidityRewards from 'src/components/Profile/EarnLiquidityRewards';
import BuyMatic from 'src/components/Profile/BuyMatic';
import BuyVLR from 'src/components/Profile/BuyVLR';

const Profile = () => {
  const { state, search } = useLocation();
  const query = new URLSearchParams(search);
  const activeTab = query.get('activeTab');
  const actionTab = query.get('actionTab');
  const history = useHistory();
  const [profile, setProfile] = useState([]);
  const bannerRef = useRef(null);
  const avatarRef = useRef(null);
  const [bannerSource, setBannerSource] = useState('/img/default-banner.png');
  const [avatarSource, setAvatarSource] = useState('/img/default-avatar.png');
  const [isLoading, setIsLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const authToken = useSelector(state => state.auth.token);
  const [userName, setUserName] = useState('');
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');

  const categoryTabList = [
    {
      id: 0,
      label: 'Created',
    },
    {
      id: 1,
      label: 'Collections',
    },
    {
      id: 2,
      label: 'Transactions',
    },
    {
      id: 3,
      label: 'Royalty Pool',
    },
    {
      id: 4,
      label: 'Earn liquidity rewards',
    },
  ];
  const actionTabList = [
    {
      id: 0,
      label: 'Inactive',
    },
    {
      id: 1,
      label: 'Active',
    },
    {
      id: 6,
      label: 'Listed',
    },
    {
      id: 2,
      label: 'Sold',
    },
    {
      id: 3,
      label: 'Saved for later',
    },
  ];

  useEffect(() => {
    if (state?.actionTabIndex) {
      setSelectedActionTabIndex(state?.actionTabIndex);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        if (!authToken) return;
        setIsLoading(true);
        const {
          data: { data: profileInfo },
        } = await getProfile({
          Authorization: `Bearer ${authToken}`,
        });
        setProfile(profileInfo);
        setAvatarSource(profileInfo?.avatar || '/img/default-avatar.png');
        setBannerSource(profileInfo?.cover_photo || '/img/default-banner.png');
        setUserName(profileInfo?.name);
        setHeader(profileInfo?.header);
        setDescription(profileInfo?.description);
        setIsLoading(false);
      } catch (err) {
        console.log('Error Profile : ', err);
        setIsLoading(false);
      }
    };
    getProfileData();
  }, [authToken]);

  const [selectedCategoryTabIndex, setSelectedCategoryTabIndex] = useState(0);
  const [selectedActionTabIndex, setSelectedActionTabIndex] = useState(4);

  const handleClickActive = index => {
    history.push(`/activate-listing/${index}`);
  };

  const handleClickAccept = index => {};
  const handleClickDeny = index => {};
  const handleChangeOption = event => {
    console.log('>>>>>>>>>>>>>>>>>> : ', event.target.value);
  };
  const handleClickBuy = () => {};

  const handleCoverPhotoInputChange = async e => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      if (!file) return;
      setIsLoading(true);
      formData.append('file', file);
      const {
        data: { file: newFile },
      } = await uploadFile(formData);

      let profileInfo = profile;
      profileInfo.cover_photo = newFile;
      profileInfo.geoLocation = geoLocation;

      const {
        data: { data: newProfile },
      } = await updateProfile(profileInfo, {
        Authorization: `Bearer ${authToken}`,
      });

      setProfile(newProfile);
      setBannerSource(newProfile?.cover_photo);
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile : ', err);
      setIsLoading(false);
    }
  };

  const handleAvatarInputChange = async e => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      if (!file) return;
      setIsLoading(true);
      formData.append('file', file);
      const {
        data: { file: newFile },
      } = await uploadFile(formData);

      let profileInfo = profile;
      profileInfo.avatar = newFile;
      profileInfo.geoLocation = geoLocation;

      const {
        data: { data: newProfile },
      } = await updateProfile(profileInfo, {
        Authorization: `Bearer ${authToken}`,
      });

      setProfile(newProfile);
      setAvatarSource(newProfile?.avatar);
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile : ', err);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="profile-container">
        <div className="profile-banner-container">
          <img
            alt="banner-image"
            src={bannerSource}
            width={'100%'}
            height={192}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="global-pointer"
            onClick={() => bannerRef.current.click()}
          />
          <div className={'profile-imgOverlay'} onClick={() => bannerRef.current.click()}>
            <img src={EditIcon} width="40" height="40" color="white" />
          </div>
          <input ref={bannerRef} type="file" className="d-none" onChange={handleCoverPhotoInputChange} />
        </div>
        <div className="profile-sub-container">
          <div className="profile-avatar-container">
            <div style={{ width: 'fit-content', position: 'relative' }}>
              <img
                alt="avatar-image"
                src={avatarSource}
                width={140}
                height={140}
                className="profile-avatar-image global-pointer"
                onClick={() => avatarRef.current.click()}
              />
              <div
                className={'profile-avatar-imgOverlay'}
                style={{ borderRadius: '50%' }}
                onClick={() => avatarRef.current.click()}
              >
                <img src={EditIcon} width="40" height="40" color="white" />
              </div>
              <input ref={avatarRef} type="file" className="d-none" onChange={handleAvatarInputChange} />
            </div>
          </div>
        </div>
        <div style={{ background: '#FFFFFF' }}>
          <div className="profile-sub-container">
            <div className="profile-second-section">
              <p className="poppins-24-700">{userName}</p>
              <p className="poppins-16-500">{header}</p>
              <div className="row">
                <div className="col-12 col-lg-6">
                  <p className="cursor-pointer poppins-16-500">{description}</p>
                </div>
              </div>
              <div className="d-flex justify-conent-start align-items-center flex-wrap">
                {profileNumberNameData.map((item, index) => (
                  <ProfileNumberName data={item} key={index} />
                ))}
              </div>
              <Tabs>
                <Tab active={activeTab === 'created'} path="/profile?activeTab=created&actionTab=listed">
                  Created
                </Tab>
                <Tab active={activeTab === 'collections'} path="/profile?activeTab=collections&actionTab=redeemed">
                  Collections
                </Tab>
                <Tab active={activeTab === 'transactions'} path="/profile?activeTab=transactions">
                  Transactions
                </Tab>
                <Tab active={activeTab === 'royalty-pool'} path="/profile?activeTab=royalty-pool">
                  Royalty Pool
                </Tab>
                <Tab active={activeTab === 'earn-liquidity-rewards'} path="/profile?activeTab=earn-liquidity-rewards">
                  Earn Liquidity Rewards
                </Tab>
                <Tab active={activeTab === 'buy-matic'} path="/profile?activeTab=buy-matic">
                  Buy Matic
                </Tab>
                <Tab active={activeTab === 'buy-vlr'} path="/profile?activeTab=buy-vlr">
                  Buy VLR
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
        <div style={{ background: '#F4F5FB' }}>
          <div className="profile-sub-container">
            <div className="profile-third-section">
              {activeTab === 'created' && <Created actionTab={actionTab} />}
              {activeTab === 'collections' && <Collections actionTab={actionTab} />}
              {activeTab === 'transactions' && <Transactions />}
              {activeTab === 'royalty-pool' && <RoyaltyPool />}
              {activeTab === 'earn-liquidity-rewards' && <EarnLiquidityRewards />}
              {activeTab === 'buy-matic' && <BuyMatic />}
              {activeTab === 'buy-vlr' && <BuyVLR />}
              {selectedCategoryTabIndex === 0 && (
                <>
                  <div className="global-flex-lg-between-sm-center mb-4">
                    <div className="global-flex-start">
                      <div
                        className={
                          selectedActionTabIndex === 4
                            ? 'poppins-20-700 global-pointer me-3'
                            : 'poppins-20-700-gray global-pointer me-3'
                        }
                        onClick={() => setSelectedActionTabIndex(4)}
                      >
                        Listings
                      </div>
                      <div
                        className={
                          selectedActionTabIndex === 5
                            ? 'poppins-20-700 global-pointer me-3'
                            : 'poppins-20-700-gray global-pointer me-3'
                        }
                        onClick={() => setSelectedActionTabIndex(5)}
                      >
                        Redemptions
                      </div>
                    </div>
                    <div className="global-flex-lg-between-sm-center my-2">
                      {actionTabList.map((item, index) =>
                        selectedActionTabIndex === item.id ? (
                          <div
                            key={index}
                            className="poppins-14-500 mx-2 global-pointer"
                            onClick={() => setSelectedActionTabIndex(item.id)}
                          >
                            {item?.label}
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="poppins-14-500-gray mx-2 global-pointer"
                            onClick={() => setSelectedActionTabIndex(item.id)}
                          >
                            {item?.label}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    {selectedActionTabIndex === 4 && (
                      <>
                        {[0, 1, 2].map(index => (
                          <div className="my-4" key={index}>
                            <ListingCard
                              handleClickActive={() => handleClickActive(index)}
                              handleClick={() => history.push(`/token-detail/${index}`)}
                            />
                          </div>
                        ))}
                      </>
                    )}
                    {selectedActionTabIndex === 5 && (
                      <>
                        {[0, 1, 2].map(index => (
                          <div className="my-4" key={index}>
                            <RedemptionCard
                              handleClickAccept={() => handleClickAccept(index)}
                              handleClickDeny={() => handleClickDeny(index)}
                              handleClick={() => history.push(`/token-detail/${index}`)}
                            />
                          </div>
                        ))}
                      </>
                    )}
                    {selectedActionTabIndex === 6 && (
                      <>
                        <div className="my-4">
                          <BoostPost handleClickBuy={handleClickBuy} onChange={handleChangeOption} />
                          <div className="row gx-5 my-4">
                            {[0, 1, 2].map(index => (
                              <div key={index} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4 my-3">
                                <NFTCard onClick={() => history.push(`/token-detail/${index}`)} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                    {selectedActionTabIndex === 0 && (
                      <>
                        <div className="my-4">
                          <div className="poppins-20-700">Inactive page</div>
                        </div>
                      </>
                    )}
                    {selectedActionTabIndex === 1 && (
                      <>
                        <div className="my-4">
                          <div className="poppins-20-700">Active page</div>
                        </div>
                      </>
                    )}
                    {selectedActionTabIndex === 2 && (
                      <>
                        <div className="my-4">
                          <div className="poppins-20-700">Sold page</div>
                        </div>
                      </>
                    )}
                    {selectedActionTabIndex === 3 && (
                      <>
                        <div className="my-4">
                          <div className="poppins-20-700">Saved for later page</div>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
              {selectedCategoryTabIndex === 1 && (
                <>
                  <div className="global-flex-lg-between-sm-center mb-4">
                    <div className="poppins-20-700">Collection page</div>
                  </div>
                </>
              )}
              {selectedCategoryTabIndex === 2 && (
                <>
                  <div className="global-flex-lg-between-sm-center mb-4">
                    <div className="poppins-20-700">Transactions page</div>
                  </div>
                </>
              )}
              {selectedCategoryTabIndex === 3 && (
                <>
                  <div className="global-flex-lg-between-sm-center mb-4">
                    <div className="poppins-20-700">Royalty Pool page</div>
                  </div>
                </>
              )}
              {selectedCategoryTabIndex === 4 && (
                <>
                  <div className="global-flex-lg-between-sm-center mb-4">
                    <div className="poppins-20-700">Earn liquidity rewards</div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

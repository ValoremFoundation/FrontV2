import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation, Link, NavLink } from 'react-router-dom';
import 'src/styles/Profile.scss';
import 'src/styles/Global.scss';
import ProfileNumberName from 'src/components/ProfileNumberName';
import RedeemedCard from 'src/components/RedeemedCard';
import NotRedeemedCard from 'src/components/NotRedeemedCard';
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
  const { search } = useLocation();
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

  const handleClickRedeem = index => {
    console.log('>>>>>>>>>>>>>>>>>> handleClickRedeem : ', index);
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
              {activeTab === 'created' && (
                <Created
                  actionTab={actionTab}
                  handleClickBuy={handleClickBuy}
                  handleChangeOption={handleChangeOption}
                  profile={profile}
                />
              )}
              {activeTab === 'collections' && (
                <Collections
                  actionTab={actionTab}
                  handleClickRedeem={handleClickRedeem}
                  handleClickAccept={handleClickAccept}
                  handleClickDeny={handleClickDeny}
                />
              )}
              {activeTab === 'transactions' && <Transactions />}
              {activeTab === 'royalty-pool' && <RoyaltyPool />}
              {activeTab === 'earn-liquidity-rewards' && <EarnLiquidityRewards />}
              {activeTab === 'buy-matic' && <BuyMatic />}
              {activeTab === 'buy-vlr' && <BuyVLR />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

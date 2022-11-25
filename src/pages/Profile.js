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
import {
  getProfile,
  getTransactionForAllToken,
  getTransactionForWallet,
  tokenRedeem,
  tokenRedeemUpdate,
  updateProfile,
  uploadFile,
} from 'src/api';
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
import { useWeb3React } from '@web3-react/core';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import marketplaceABI from 'src/assets/abis/nftMarketplace.json';
import nftABI from 'src/assets/abis/nftAdValorem.json';
import royaltyPoolABI from 'src/assets/abis/royaltyPool.json';
import vlrTokenABI from 'src/assets/abis/adValoremToken.json';
import { dateWithTimestamp } from 'src/utils/formartUtils';

const {
  REACT_APP_MARKETPLACE_CONTRACT_ADDRESS,
  REACT_APP_NFT_CONTRACT_ADDRESS,
  REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS,
  REACT_APP_ROYALTY_POOL_CONTRACT_ADDRESS,
} = process.env;
const web3 = new Web3(window.ethereum);
const marketplaceContract = new web3.eth.Contract(marketplaceABI, REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
const nftContract = new web3.eth.Contract(nftABI, REACT_APP_NFT_CONTRACT_ADDRESS);
const vlrTokenContract = new web3.eth.Contract(vlrTokenABI, REACT_APP_VLR_TOKEN_CONTRACT_ADDRESS);
const royaltyContract = new web3.eth.Contract(royaltyPoolABI, REACT_APP_ROYALTY_POOL_CONTRACT_ADDRESS);
const zeroAddress = '0x0000000000000000000000000000000000000000';

const Profile = () => {
  const { search } = useLocation();
  const { account } = useWeb3React();
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
  const [transactions, setTransactions] = useState([]);
  const [allTransactions, setAllTransactions] = useState([]);
  const [apr, setApr] = useState(0);
  const [lockDuration, setLockDuration] = useState(0);
  const [userPoolInfo, setUserPoolInfo] = useState({});
  const [pendingRewardAmount, setPendingRewardAmount] = useState('');

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

  useEffect(() => {
    getProfileData();
  }, [authToken]);

  const getTransactionByWallet = async () => {
    if (!account) return;
    const {
      data: { data },
    } = await getTransactionForWallet(account);
    setTransactions(data);
  };

  const getRoyaltyPoolInfo = async () => {
    if (!account) return;
    const _apr = await royaltyContract.methods.apr().call();
    const _lockDuration = await royaltyContract.methods.lockDuration().call();
    const _userPoolInfo = await royaltyContract.methods.userPoolInfo(account).call();
    const _pendingRewardAmount = await royaltyContract.methods.pendingReward(account).call();
    setApr(_apr / 100);
    setLockDuration(_lockDuration);
    setUserPoolInfo(_userPoolInfo);
    setPendingRewardAmount(_pendingRewardAmount);
  };

  useEffect(() => {
    getTransactionByWallet();
    getRoyaltyPoolInfo();
    const myInterval = setInterval(() => {
      getRoyaltyPoolInfo();
    }, 1000);

    return () => clearInterval(myInterval);
  }, [account, activeTab]);

  const getTransactionAll = async () => {
    if (!account) return;
    const {
      data: { data },
    } = await getTransactionForAllToken(account);
    setAllTransactions(data);
  };

  useEffect(() => {
    getTransactionAll();
  }, [account]);

  const handleClickRedeem = async token => {
    try {
      setIsLoading(true);
      if (!Web3.utils.isAddress(token?.redeemAddress)) return;
      const approvedAddress = await nftContract.methods.getApproved(token?.token_id).call();
      if (approvedAddress === zeroAddress) {
        await nftContract.methods.approve(token?.redeemAddress, token.token_id).send({ from: account });
      }

      const res = await tokenRedeemUpdate(token?.id, {
        redeem_from: account,
        redeem_to: token?.redeemAddress,
        redeem_status: 'request',
      });
      if (res?.data.status) {
        toast.success(res?.data?.message);
        getProfileData();
        getTransactionByWallet();
      } else {
        toast.error('Not redeemed');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile Update Redeem :', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleClickAccept = async token => {
    try {
      setIsLoading(true);
      if (!Web3.utils.isAddress(token?.redeem_from)) return;
      const {
        transactionHash,
        blockNumber,
        events: redeemEvents,
      } = await nftContract.methods
        .safeTransferFrom(token?.redeem_from, account, token?.token_id)
        .send({ from: account });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>>>>> redeemEvents : ', redeemEvents);
      const from = redeemEvents?.Transfer?.returnValues?.from || '';
      const to = redeemEvents?.Transfer?.returnValues?.to || '';

      await tokenRedeem(token?.id, {
        hash: transactionHash,
        from: from,
        to: to,
        method: 'redeem',
        timestamp: blockTimeStamp,
      });

      const res = await tokenRedeemUpdate(token?.id, {
        redeem_from: '',
        redeem_to: '',
        redeem_status: 'accept',
      });
      if (res?.data.status) {
        toast.success('Accepted redeem successfully');
        getProfileData();
      } else {
        toast.error('Not redeemed');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile Update Redeem :', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleClickDeny = async tokenId => {
    try {
      setIsLoading(true);
      const res = await tokenRedeemUpdate(tokenId, {
        redeem_from: '',
        redeem_to: '',
        redeem_status: 'deny',
      });
      if (res?.data.status) {
        toast.success('Denyed redeem successfully');
        getProfileData();
      } else {
        toast.error('Not redeemed');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile Update Redeem :', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };
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

  const handleClickHarvest = async () => {
    if (!account) return;
    try {
      setIsLoading(true);
      const res = await royaltyContract.methods.harvest().send({ from: account });
      if (res.status) {
        getRoyaltyPoolInfo();
        toast.success('Successfully harvested!');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile Harvest : ', err?.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleClickWithdraw = async () => {
    if (!account) return;

    try {
      setIsLoading(true);
      const currentTimestamp = Date.now() / 1000;
      const unlockedTimestamp = parseInt(userPoolInfo.timeDeposited) + parseInt(lockDuration);
      const unlockDate = dateWithTimestamp((parseInt(userPoolInfo?.timeDeposited) + parseInt(lockDuration)) * 1000);
      if (currentTimestamp < unlockedTimestamp) {
        toast.error(`Please can withdraw on ${unlockDate}!`);
        return;
      }
      const res = await royaltyContract.methods.withdraw().send({ from: account });
      if (res.status) {
        getRoyaltyPoolInfo();
        toast.success('Successfully withdrawed!');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile withdraw : ', err?.message);
      toast.error(err?.message);
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
              {/* <div className="d-flex justify-conent-start align-items-center flex-wrap">
                {profileNumberNameData.map((item, index) => (
                  <ProfileNumberName data={item} key={index} />
                ))}
              </div> */}
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
                {/* <Tab active={activeTab === 'earn-liquidity-rewards'} path="/profile?activeTab=earn-liquidity-rewards">
                  Earn Liquidity Rewards
                </Tab> */}
                <Tab active={activeTab === 'buy-matic'} path="https://www.moonpay.com/buy">
                  Buy Matic
                </Tab>
                <Tab
                  active={activeTab === 'buy-vlr'}
                  path="https://quickswap.exchange/#/swap?inputCurrency=0xe1b757fc80ca95677da112e3231a571469252710"
                >
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
                  profile={profile}
                  transactions={allTransactions}
                  account={account}
                />
              )}
              {activeTab === 'transactions' && <Transactions transactions={transactions} />}
              {activeTab === 'royalty-pool' && (
                <RoyaltyPool
                  apr={apr}
                  lockDuration={lockDuration}
                  handleClickHarvest={handleClickHarvest}
                  handleClickWithdraw={handleClickWithdraw}
                  userPoolInfo={userPoolInfo}
                  pendingRewardAmount={pendingRewardAmount}
                />
              )}
              {/* {activeTab === 'earn-liquidity-rewards' && <EarnLiquidityRewards />} */}
              {/* {activeTab === 'buy-matic' && <BuyMatic />}
              {activeTab === 'buy-vlr' && <BuyVLR />} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

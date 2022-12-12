import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import 'src/styles/Profile.scss';
import 'src/styles/Global.scss';
import EditIcon from 'src/assets/images/editIcon.svg';
import {
  getProfile,
  getTransactionForWallet,
  newTransaction,
  tokenRedeem,
  tokenRedeemUpdate,
  updateProfile,
  uploadFile,
} from 'src/api';
import { useSelector, useDispatch } from 'react-redux';
import LoadingPage from 'src/components/LoadingPage';
import Tabs, { Tab } from 'src/components/LineTab';
import Created from 'src/components/Profile/Created';
import Collections from 'src/components/Profile/Collections';
import Transactions from 'src/components/Profile/Transactions';
import RoyaltyPool from 'src/components/Profile/RoyaltyPool';
import { useWeb3React } from '@web3-react/core';
import toast from 'react-hot-toast';
import Web3 from 'web3';
import nftABI from 'src/assets/abis/nftAdValorem.json';
import royaltyPoolABI from 'src/assets/abis/royaltyPool.json';
import { dateWithTimestamp, fromWei } from 'src/utils/formartUtils';
import { fetchAllCategories } from 'src/actions/categories';
import ReactTooltip from 'react-tooltip';

const { REACT_APP_NFT_CONTRACT_ADDRESS, REACT_APP_ROYALTY_POOL_CONTRACT_ADDRESS } = process.env;
const web3 = new Web3(window.ethereum);
const nftContract = new web3.eth.Contract(nftABI, REACT_APP_NFT_CONTRACT_ADDRESS);
const royaltyContract = new web3.eth.Contract(royaltyPoolABI, REACT_APP_ROYALTY_POOL_CONTRACT_ADDRESS);
const zeroAddress = '0x0000000000000000000000000000000000000000';

const Profile = () => {
  const { search } = useLocation();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const query = new URLSearchParams(search);
  const activeTab = query.get('activeTab');
  const actionTab = query.get('actionTab');
  const [profile, setProfile] = useState([]);
  const bannerRef = useRef(null);
  const avatarRef = useRef(null);
  const [bannerSource, setBannerSource] = useState('/img/default-banner.png');
  const [avatarSource, setAvatarSource] = useState('/img/default-avatar.png');
  const [isLoading, setIsLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const authToken = useSelector(state => state.auth.token);
  const categories = useSelector(state => state.categories.items.items);
  const [userName, setUserName] = useState('');
  const [header, setHeader] = useState('');
  const [description, setDescription] = useState('');
  const [transactions, setTransactions] = useState([]);
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
    setGeoLocation({ latitude: 0, longitude: 0 });
    // eslint-disable-next-line
  }, [authToken]);

  useEffect(() => {
    dispatch(fetchAllCategories());
    // eslint-disable-next-line
  }, []);

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
    // eslint-disable-next-line
  }, [account]);

  const handleClickRedeem = async token => {
    try {
      setIsLoading(true);
      if (!Web3.utils.isAddress(token?.redeem_to)) return;
      const approvedAddress = await nftContract.methods.getApproved(token?.token_id).call();
      if (approvedAddress === zeroAddress) {
        await nftContract.methods.approve(token?.redeem_to, token.token_id).send({ from: account });
      }

      const res = await tokenRedeemUpdate(token?.id, {
        redeem_from: account,
        redeem_to: token?.redeem_to,
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
        redeem_from: token?.redeem_from,
        redeem_to: token?.redeem_to,
        redeem_status: 'accept',
      });
      if (res?.data.status) {
        toast.success('Accepted redeem successfully');
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

  const handleClickDeny = async token => {
    try {
      setIsLoading(true);
      const res = await tokenRedeemUpdate(token?.id, {
        redeem_from: token?.redeem_from,
        redeem_to: token?.redeem_to,
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
      const gasPrice = await web3.eth.getGasPrice();
      const {
        transactionHash,
        blockNumber,
        status,
        events: harvestEvents,
      } = await royaltyContract.methods.harvest().send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>>>>> harvestEvents : ', harvestEvents);
      const from = web3.eth.abi.decodeParameter('address', harvestEvents[0]?.raw?.topics[1]);
      const to = web3.eth.abi.decodeParameter('address', harvestEvents[0]?.raw?.topics[2]);
      if (status) {
        const dbRes = await newTransaction({
          hash: transactionHash,
          from: from,
          to: to,
          token_id: '',
          price: fromWei(pendingRewardAmount),
          method: 'harvest',
          timestamp: blockTimeStamp,
        });
        if (dbRes.status) {
          getRoyaltyPoolInfo();
          setIsLoading(false);
          toast.success('Successfully harvested!');
        }
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
      const gasPrice = await web3.eth.getGasPrice();
      const currentTimestamp = Date.now() / 1000;
      const unlockedTimestamp = parseInt(userPoolInfo.timeDeposited) + parseInt(lockDuration);
      const unlockDate = dateWithTimestamp((parseInt(userPoolInfo?.timeDeposited) + parseInt(lockDuration)) * 1000);
      if (currentTimestamp < unlockedTimestamp) {
        toast.error(`You will be able to withdraw on ${unlockDate}!`);
        return;
      }
      setIsLoading(true);
      const {
        transactionHash,
        blockNumber,
        status,
        events: withdrawEvents,
      } = await royaltyContract.methods.withdraw().send({ from: account, gasPrice: gasPrice * 5 });
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      console.log('>>>>>>>>>>>>>>>>>> withdrawEvents : ', withdrawEvents);
      const from = web3.eth.abi.decodeParameter('address', withdrawEvents[0]?.raw?.topics[1]);
      const to = web3.eth.abi.decodeParameter('address', withdrawEvents[0]?.raw?.topics[2]);
      if (status) {
        const dbRes = await newTransaction({
          hash: transactionHash,
          from: from,
          to: to,
          token_id: '',
          price: fromWei(userPoolInfo?.amount),
          method: 'withdraw',
          timestamp: blockTimeStamp,
        });
        if (dbRes.status) {
          getRoyaltyPoolInfo();
          setIsLoading(false);
          toast.success('Successfully withdrawed!');
        }
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
            alt="banner"
            src={bannerSource}
            width={'100%'}
            height={192}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="global-pointer"
            onClick={() => bannerRef.current.click()}
          />
          <div className={'profile-imgOverlay'} onClick={() => bannerRef.current.click()}>
            <img src={EditIcon} width="40" height="40" color="white" alt="edit" />
          </div>
          <input ref={bannerRef} type="file" className="d-none" onChange={handleCoverPhotoInputChange} />
        </div>
        <div className="profile-sub-container">
          <div className="profile-avatar-container">
            <div style={{ width: 'fit-content', position: 'relative' }}>
              <img
                alt="avatar"
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
                <img src={EditIcon} width="40" height="40" color="white" alt="edit" />
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
                <Tab
                  active={activeTab === 'royalty-pool'}
                  path="/profile?activeTab=royalty-pool"
                  style={{ position: 'relative' }}
                >
                  Royalty Pool
                  <div
                    data-tip
                    data-for="royalty-pool-tip"
                    className="profile-help"
                    onClick={() =>
                      window.open('https://www.advalorem.io/tutorial/v/royalty-distributions-pools-yield-harvest')
                    }
                  >
                    ?
                  </div>
                </Tab>
                <Tab
                  active={activeTab === 'buy-matic'}
                  path="https://www.moonpay.com/buy"
                  style={{ position: 'relative' }}
                >
                  Buy Matic
                  <div data-tip data-for="buy-matic-tip" className="profile-help">
                    ?
                  </div>
                </Tab>
                <Tab
                  active={activeTab === 'buy-vlr'}
                  path="https://quickswap.exchange/#/swap?inputCurrency=0x221d160BA7E3552FeE22A33B3982AD408C3D6E65"
                  style={{ position: 'relative' }}
                >
                  Buy VLR
                  <div data-tip data-for="buy-vlr-tip" className="profile-help">
                    ?
                  </div>
                </Tab>
                <Tab
                  active={activeTab === 'add-liquidity'}
                  path="https://quickswap.exchange/#/pools"
                  style={{ position: 'relative' }}
                >
                  Add Liquidity
                  <div data-tip data-for="add-liquidity-tip" className="profile-help">
                    ?
                  </div>
                </Tab>
              </Tabs>
              <ReactTooltip id="royalty-pool-tip" place="top" effect="solid">
                https://www.advalorem.io/tutorial/v/royalty-distributions-pools-yield-harvest
              </ReactTooltip>
              <ReactTooltip id="buy-matic-tip" place="top" effect="solid">
                https://www.advalorem.io/tutorial/v/buying-matic-on-moonpay
              </ReactTooltip>
              <ReactTooltip id="buy-vlr-tip" place="top" effect="solid">
                https://www.advalorem.io/tutorial/v/buying-vlr-quickswap
              </ReactTooltip>
              <ReactTooltip id="add-liquidity-tip" place="top" effect="solid">
                https://www.advalorem.io/tutorial/v/adding-liquidity-on-quickswap
              </ReactTooltip>
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
                  categories={categories}
                />
              )}
              {activeTab === 'collections' && (
                <Collections
                  actionTab={actionTab}
                  handleClickRedeem={handleClickRedeem}
                  handleClickAccept={handleClickAccept}
                  handleClickDeny={handleClickDeny}
                  profile={profile}
                  categories={categories}
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
                  getRoyaltyPoolInfo={getRoyaltyPoolInfo}
                />
              )}
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

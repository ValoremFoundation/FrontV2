import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'src/styles/Create.scss';
import 'src/styles/Global.scss';
import UserWithName from 'src/components/UserWithName';
import StepOrder from 'src/components/StepOrder';
import BackgroundButton from 'src/components/BackgroundButton';
import MenuIcon from 'src/assets/images/menu-icon.svg';
import CustomCheckBox from 'src/components/CustomCheckBox';
import { useSelector, useDispatch } from 'react-redux';
import { getGeoLocationFromIPAddress, getProfile, pinFileToIPFS, tokenById, tokenMint, tokenUpdate } from 'src/api';
import { fetchAllCategories } from 'src/actions/categories';
import NewNFT from 'src/components/NewNFT';
import { user1Info, user2Info, user3Info, user4Info, step1, step2, step3 } from 'src/constants';
import toast from 'react-hot-toast';
import LoadingPage from 'src/components/LoadingPage';
import { addDays } from 'date-fns';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import marketplaceABI from 'src/assets/abis/nftMarketplace.json';
import nftABI from 'src/assets/abis/nftAdValorem.json';
import { useParams } from 'react-router';

const { REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, REACT_APP_NFT_CONTRACT_ADDRESS } = process.env;
const web3 = new Web3(window.ethereum);
const marketplaceContract = new web3.eth.Contract(marketplaceABI, REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
const nftContract = new web3.eth.Contract(nftABI, REACT_APP_NFT_CONTRACT_ADDRESS);
const impactClickId = localStorage.getItem('Impact_ClickId');

const TokenEdit = () => {
  const history = useHistory();
  const params = useParams();
  const { tokenId } = params;
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const [bannerSource, setBannerSource] = useState('/img/default-banner.png');
  const [avatarSource, setAvatarSource] = useState('/img/default-avatar.png');
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector(state => state.auth.token);
  const categories = useSelector(state => state.categories.items.items);
  const [seenVideo, setSeenVideo] = useState(false);
  let savedForLater = 0;
  const [startRequire, setStartRequire] = useState(false);
  const [nftData, setNftData] = useState({
    id: -1,
    imageUrl: { value: '/img/default-avatar.png', error: false },
    fileName: { value: '', error: false },
    type: 'image',
    name: { value: '', error: false },
    category: { value: '', error: false },
    tellUs: { value: '', error: false },
    description: { value: '', error: false },
    remotePerson: { value: '', error: false },
    location: { value: '', error: false },
    website: { value: '', error: false },
    discord: { value: '', error: false },
    hashtag1: { value: '', error: false },
    hashtag2: { value: '', error: false },
    hashtag3: { value: '', error: false },
    creator: { value: '', error: false },
    reseller: { value: '', error: false },
    royaltyPool: { value: '', error: false },
    expiration: { value: '', error: false },
  });

  const getTokenDetail = async () => {
    setIsLoading(true);
    let {
      data: { data: token },
    } = await tokenById(tokenId, {
      Authorization: `Bearer ${authToken}`,
    });

    const tmpNftData = {
      id: token.id,
      imageUrl: { value: token.uri, error: false },
      fileName: { value: '', error: false },
      type: token.media_type,
      name: { value: token.name, error: false },
      category: { value: token.category_id, error: false },
      tellUs: { value: token.tell_us, error: false },
      description: { value: token.description, error: false },
      remotePerson: { value: token.remote_person, error: false },
      location: { value: token.location, error: false },
      website: { value: token.website, error: false },
      discord: { value: token.discord, error: false },
      hashtag1: { value: token.hashtag1, error: false },
      hashtag2: { value: token.hashtag2, error: false },
      hashtag3: { value: token.hashtag3, error: false },
      creator: { value: token.creator, error: false },
      reseller: { value: token.reseller, error: false },
      royaltyPool: { value: token.royalty_pool, error: false },
      expiration: { value: token.expiration_id, error: false },
    };
    setSeenVideo(token.seen_video);
    setNftData(tmpNftData);
    setIsLoading(false);
  };

  useEffect(() => {
    getTokenDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const getProfileData = async () => {
    try {
      if (!authToken) return;
      setIsLoading(true);
      const {
        data: { data: profileInfo },
      } = await getProfile({
        Authorization: `Bearer ${authToken}`,
      });
      setAvatarSource(profileInfo?.avatar || '/img/default-avatar.png');
      setBannerSource(profileInfo?.cover_photo || '/img/default-banner.png');
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile : ', err);
      toast.error(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
    // eslint-disable-next-line
  }, [authToken]);

  const checkValidation = () => {
    if (!account) {
      toast.error('Please connect wallet!');
      return true;
    }
    if (!seenVideo) {
      toast.error('Please watch www.AdValorem.io/tutorial!');
      return true;
    }
    let error = false;
    let tmpNftData = { ...nftData };

    if (tmpNftData.imageUrl.value === '' || tmpNftData.imageUrl.value === '/img/blank-image.jpg') {
      tmpNftData.fileName.error = true;
      error = true;
    }
    if (tmpNftData.name.value === '') {
      tmpNftData.name.error = true;
      error = true;
    }
    if (tmpNftData.category.value === '') {
      tmpNftData.category.error = true;
      error = true;
    }
    if (tmpNftData.tellUs.value === '') {
      tmpNftData.tellUs.error = true;
      error = true;
    }
    if (tmpNftData.description.value === '') {
      tmpNftData.description.error = true;
      error = true;
    }
    if (tmpNftData.remotePerson.value === '') {
      tmpNftData.remotePerson.error = true;
      error = true;
    }
    if (tmpNftData.website.value === '') {
      tmpNftData.website.error = true;
      error = true;
    }
    if (tmpNftData.discord.value === '') {
      tmpNftData.discord.error = true;
      error = true;
    }
    if (tmpNftData.hashtag1.value === '') {
      tmpNftData.hashtag1.error = true;
      error = true;
    }
    if (tmpNftData.hashtag2.value === '') {
      tmpNftData.hashtag2.error = true;
      error = true;
    }
    if (tmpNftData.hashtag3.value === '') {
      tmpNftData.hashtag3.error = true;
      error = true;
    }
    if (tmpNftData.creator.value === '') {
      tmpNftData.creator.error = true;
      error = true;
    }
    if (tmpNftData.reseller.value === '') {
      tmpNftData.reseller.error = true;
      error = true;
    }
    if (tmpNftData.royaltyPool.value === '') {
      tmpNftData.royaltyPool.error = true;
      error = true;
    }
    if (tmpNftData.creator.value && tmpNftData.reseller.value && tmpNftData.royaltyPool.value) {
      if (
        parseInt(tmpNftData.creator.value) +
          parseInt(tmpNftData.reseller.value) +
          parseInt(tmpNftData.royaltyPool.value) !==
        100
      ) {
        toast.error('All sums of creator, reseller and royalty must equal 100%!');
        return true;
      }
    }
    setNftData(tmpNftData);
    if (error) toast.error('Please input all field!');
    return error;
  };

  const handleClickSave = async () => {
    setStartRequire(true);
    if (checkValidation()) {
      return;
    }

    try {
      setIsLoading(true);
      savedForLater = 1;
      const res = await handleSaveOneNFTAPI();
      if (res?.status) {
        toast.success(res.message);
        history.push('/profile?activeTab=created&actionTab=saved-for-later');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Error TokenEdit :', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleChangeSeenVideo = event => {
    setSeenVideo(!seenVideo);
  };

  const handleChangeNFT = async (e, key) => {
    try {
      setIsLoading(true);
      let tmpNftData = { ...nftData };
      if (key === 'file') {
        const file = e.target.files[0];
        const _mediaType = file.type.split('/')[0];

        //upload ipfs
        const formData = new FormData();
        if (!file) return;
        formData.append('file', file);
        const {
          status,
          data: { IpfsHash },
        } = await pinFileToIPFS(formData);
        if (status !== 200) return;
        tmpNftData.fileName = file.name;
        tmpNftData.type = _mediaType;
        tmpNftData['imageUrl'].value = `https://ipfs.io/ipfs/${IpfsHash}`;
        tmpNftData['imageUrl'].error = false;
        tmpNftData.fileName.error = false;
      } else {
        if (key === 'category') {
          tmpNftData['discord'].value = categories[e.target.value - 1]?.discord;
        }
        tmpNftData[key].value = e.target.value;
        tmpNftData[key].error = false;
      }
      setNftData(tmpNftData);
      setIsLoading(false);
    } catch (err) {
      console.log('Error create : ', err);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleCreateNFT = async () => {
    setStartRequire(true);
    if (checkValidation()) {
      return;
    }

    try {
      setIsLoading(true);
      savedForLater = 0;
      const res = await handleSingleMintContract();
      if (res?.status) {
        setIsLoading(false);
        toast.success(res.message);
        history.push('/profile?activeTab=created&actionTab=minted');
      } else {
        setIsLoading(false);
      }
    } catch (err) {
      console.log('Error TokenEdit : ', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleSingleMintContract = async () => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const {
        transactionHash,
        blockNumber,
        events: mintEvent,
      } = await nftContract.methods.createToken(nftData.imageUrl.value).send({ from: account, gasPrice: gasPrice * 5 });
      let nftTokenId = mintEvent?.TokenCreated?.returnValues?.tokenId;
      let from = mintEvent?.Transfer?.returnValues?.from;
      let to = mintEvent?.Transfer?.returnValues?.to;
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);

      const { events: marketEvent } = await marketplaceContract.methods
        .createMarketItem(
          REACT_APP_NFT_CONTRACT_ADDRESS,
          nftTokenId,
          nftData.creator.value * 100,
          nftData.reseller.value * 100,
          nftData.royaltyPool.value * 100
        )
        .send({ from: account, gasPrice: gasPrice * 5 });
      const { itemId: marketItemId } = marketEvent?.MarketItemCreated?.returnValues;
      // await tokenMarketItem(id, { marketItemId });
      await handleSaveOneNFTAPI(marketItemId);
      const res = await handleSingleMintAPI(nftTokenId, nftData.id, from, to, transactionHash, blockTimeStamp);
      return res?.data;
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleSingleMintAPI = async (nftTokenId, id, from, to, transactionHash, blockTimeStamp) => {
    try {
      return await tokenMint(id, {
        hash: transactionHash,
        from: from,
        to: to,
        timestamp: blockTimeStamp,
        tokenId: nftTokenId,
        impactClickId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveOneNFTAPI = async marketItemId => {
    try {
      let geoLocation = {};
      if (nftData.location?.length < 5) {
        const {
          data: { latitude, longitude },
        } = await getGeoLocationFromIPAddress();

        geoLocation.latitude = latitude;
        geoLocation.longitude = longitude;
      }

      const resp = await tokenUpdate(
        {
          marketItemId: marketItemId,
          id: nftData.id,
          uri: nftData.imageUrl.value,
          mediaType: nftData.type,
          name: nftData.name.value,
          category: nftData.category.value,
          tellUs: nftData.tellUs.value,
          description: nftData.description.value,
          remotePerson: nftData.remotePerson.value,
          location: nftData.location.value,
          geoLocation: geoLocation,
          website: nftData.website.value,
          discord: nftData.discord.value,
          hashtag1: nftData.hashtag1.value,
          hashtag2: nftData.hashtag2.value,
          hashtag3: nftData.hashtag3.value,
          creator: nftData.creator.value,
          reseller: nftData.reseller.value,
          royaltyPool: nftData.royaltyPool.value,
          expirationId: nftData.expiration.value,
          expiration: handleExpireTimeChange(nftData.expiration.value),
          savedForLater: savedForLater,
          seenVideo: seenVideo,
        },
        {
          Authorization: `Bearer ${authToken}`,
        }
      );
      return resp.data;
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  const handleExpireTimeChange = idx => {
    if (idx === '1') {
      return addDays(new Date(), 30).getTime();
    } else if (idx === '2') {
      return addDays(new Date(), 60).getTime();
    } else if (idx === '3') {
      return addDays(new Date(), 90).getTime();
    } else if (idx === '4') {
      return addDays(new Date(), 180).getTime();
    } else if (idx === '5') {
      return addDays(new Date(), 360).getTime();
    } else {
      return addDays(new Date(), 0).getTime();
    }
  };

  return (
    <>
      {isLoading && <LoadingPage />}
      <div className="create-container">
        <div style={{ background: '#ffffff', position: 'relative', height: '192px' }}>
          <img
            alt="banner"
            src={bannerSource}
            width={'100%'}
            height={192}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="global-pointer"
          />
        </div>
        <div className="avatar-container">
          <img
            alt="avatar"
            src={avatarSource || '/img/default-avatar.png'}
            width={140}
            height={140}
            className="avatar-image global-pointer"
          />
        </div>
        <div className="create-middle-background px-2 py-4">
          <div className="create-middle-container">
            <div className="create-middle-section">
              <div className="poppins-24-600 my-3">How it works</div>
              <div style={{ maxWidth: 800 }}>
                <span className="poppins-16-400">
                  We created a system that rewards your customer everytime resell your service to someone else in the
                  advalorem marketplace for a{' '}
                </span>
                <span className="poppins-16-600">commision </span>
                <span className="poppins-16-400">and you still get paid your original fee plus </span>
                <span className="poppins-16-600">royalties</span>
              </div>
              <p className="poppins-20-500 my-4">Here’s a real life example of how it works</p>
              <div className="create-work-flow">
                <UserWithName userInfo={user1Info} />
                <StepOrder step={step1} />
                <UserWithName userInfo={user2Info} />
                <StepOrder step={step2} />
                <UserWithName userInfo={user3Info} />
                <StepOrder step={step3} />
                <UserWithName userInfo={user4Info} last={true} />
              </div>
              <div className="global-flex-start">
                <div className="create-red-dot"></div>
                <div className="poppins-20-500 ms-4 sm:poppins-14-500">
                  Please watch the explainer video for a more
                  <br /> in depth explaination.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="create-middle-background px-2 py-4">
          <div className="create-middle-one-container">
            <div className="create-middle-section">
              <p className="poppins-24-600 my-3">Getting Started</p>
              <div className="d-flex justify-content-start my-3 ms-3">
                <div className="poppins-32-500" style={{ width: 70 }}>
                  1
                </div>
                <div className="mt-2">
                  <p className="poppins-16-600">Creating your service</p>
                  <p className="poppins-14-500">
                    Sign up for free, create your service and we automatically turn it into an NFT.
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-start my-3 ms-3">
                <p className="poppins-32-500" style={{ width: 70 }}>
                  2
                </p>
                <div className="mt-2">
                  <p className="poppins-16-600">List your NFT</p>
                  <p className="poppins-14-500">
                    Once you’ve created your service you can list it on the advalorem marketplace.
                  </p>
                </div>
              </div>
              <div className="d-flex justify-content-start my-3 ms-3">
                <p className="poppins-32-500" style={{ width: 70 }}>
                  3
                </p>
                <div className="mt-2">
                  <p className="poppins-16-600">Collect Royalties!</p>
                  <p className="poppins-14-500">
                    When your client trades your NFT on the advalorem marketplace you get royalties!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="create-middle-background px-2 py-4">
          <div className="create-middle-one-container">
            <div className="create-middle-section">
              <div className="d-flex justify-content-between algin-items-center">
                <p className="poppins-24-600 my-3">Create New Service</p>
                <img alt="alt" src={MenuIcon} style={{ width: '36px', heigt: '36px', cursor: 'pointer' }} />
              </div>
              <div>
                <div className="my-3">
                  <NewNFT itemNFT={nftData} handleChangeArrayNFT={handleChangeNFT} editable={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="create-middle-background px-2 py-4">
          <div className="create-middle-one-container">
            <div className="create-middle-section">
              <div className="poppins-20-600 my-3">Have you seen the videos?</div>
              <div className="d-flex justify-content-start">
                <CustomCheckBox
                  onChange={handleChangeSeenVideo}
                  value={seenVideo}
                  require={startRequire && !seenVideo}
                />
                <span>
                  Have you watched our
                  <span style={{ color: '#0d6efd' }} onClick={() => window.open('https://AdValorem.io/tutorial')}>
                    {` tutorial video's `}
                  </span>
                  and agree to our
                  <span
                    style={{ color: '#0d6efd' }}
                    onClick={() => window.open('https://advalorem.io/licensing-agreement')}
                  >
                    {` licensing and distribution agreement `}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="create-middle-background px-2 pt-4 pb-5">
          <div className="create-middle-one-container">
            <div className="d-flex justify-content-end align-items-center flex-wrap">
              <div className="me-4 my-2">
                <BackgroundButton label={'Save'} color={'#FFFFFF'} bgColor={'#000000'} onClick={handleClickSave} />
              </div>
              <div className="my-2">
                <BackgroundButton
                  label={'Create NFT'}
                  color={'#2A212E'}
                  bgColor={'#96F2A4'}
                  onClick={handleCreateNFT}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TokenEdit;

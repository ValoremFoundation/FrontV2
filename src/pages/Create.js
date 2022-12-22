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
import MetamaskSigninModal from 'src/components/MetamaskSigninModal';
import { useSelector, useDispatch } from 'react-redux';
import { getGeoLocationFromIPAddress, getProfile, pinFileToIPFS, tokenCreate, tokenMint } from 'src/api';
import { fetchAllCategories } from 'src/actions/categories';
import NewNFT from 'src/components/NewNFT';
import { user1Info, user2Info, user3Info, user4Info, step1, step2, step3 } from 'src/constants';
import toast from 'react-hot-toast';
import LoadingPage from 'src/components/LoadingPage';
import { addDays } from 'date-fns';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import nftABI from 'src/assets/abis/nftAdValorem.json';
import marketplaceABI from 'src/assets/abis/nftMarketplace.json';

const { REACT_APP_MARKETPLACE_CONTRACT_ADDRESS, REACT_APP_NFT_CONTRACT_ADDRESS } = process.env;

const web3 = new Web3(window.ethereum);
const marketplaceContract = new web3.eth.Contract(marketplaceABI, REACT_APP_MARKETPLACE_CONTRACT_ADDRESS);
const nftContract = new web3.eth.Contract(nftABI, REACT_APP_NFT_CONTRACT_ADDRESS);
const impactClickId = localStorage.getItem('Impact_ClickId');

const Create = () => {
  const history = useHistory();
  const { account } = useWeb3React();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.items.items);
  const [bannerSource, setBannerSource] = useState('/img/default-banner.png');
  const [avatarSource, setAvatarSource] = useState('/img/default-avatar.png');
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector(state => state.auth.token);
  const [seenVideo, setSeenVideo] = useState(false);
  let savedForLater = 0;
  const [startRequire, setStartRequire] = useState(false);
  const [arrayNFT, setArrayNFT] = useState([
    {
      imageUrl: { value: '/img/blank-image.jpg', error: false },
      fileName: { value: '', error: false },
      type: 'image',
      name: { value: '', error: false },
      category: { value: '', error: false },
      tellUs: { value: '', error: false },
      description: { value: '', error: false },
      remotePerson: { value: 'remote', error: false },
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
    },
  ]);

  const [modalIsOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

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

  const handleClickSaveForLater = async () => {
    setStartRequire(true);
    if (checkValidation()) {
      return;
    }

    try {
      setIsLoading(true);
      savedForLater = 1;
      toast.success('Successfully saved!');
      setIsLoading(false);
      history.push('/profile?activeTab=created&actionTab=saved-for-later');
    } catch (err) {
      console.log('Error Create :', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleChangeSeenVideo = event => {
    setSeenVideo(!seenVideo);
  };

  const handleChangeArrayNFT = async (e, key, index) => {
    try {
      setIsLoading(true);
      let tmpArrNFT = [...arrayNFT];
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

        tmpArrNFT[index].fileName.value = file.name;
        tmpArrNFT[index].type = _mediaType;

        tmpArrNFT[index]['imageUrl'].value = `https://ipfs.io/ipfs/${IpfsHash}`;
        tmpArrNFT[index]['imageUrl'].error = false;
        tmpArrNFT[index].fileName.error = false;
      } else {
        if (key === 'category') {
          tmpArrNFT[index]['discord'].value = categories[e.target.value - 1]?.discord;
        }
        tmpArrNFT[index][key].value = e.target.value;
        tmpArrNFT[index][key].error = false;
      }
      setArrayNFT(tmpArrNFT);
      setIsLoading(false);
    } catch (err) {
      console.log('Error create : ', err);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleAddNFT = () => {
    setArrayNFT([
      ...arrayNFT,
      {
        imageUrl: { value: '/img/blank-image.jpg', error: false },
        fileName: { value: '', error: false },
        type: 'image',
        name: { value: '', error: false },
        category: { value: '', error: false },
        tellUs: { value: '', error: false },
        description: { value: '', error: false },
        remotePerson: { value: 'remote', error: false },
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
      },
    ]);
  };

  const checkValidation = () => {
    if (!account) {
      toast.error('Please connect wallet! https://www.advalorem.io/tutorial/v/metamask-setup-contract-overview-rpcs');
      return true;
    }
    if (!seenVideo) {
      toast.error('Please watch www.AdValorem.io/tutorial!');
      return true;
    }
    let error = false;
    let tmpArrayNFT = [...arrayNFT];
    tmpArrayNFT.forEach(item => {
      if (item.imageUrl.value === '' || item.imageUrl.value === '/img/blank-image.jpg') {
        item.fileName.error = true;
        error = true;
      }
      if (item.name.value === '') {
        item.name.error = true;
        error = true;
      }
      if (item.category.value === '') {
        item.category.error = true;
        error = true;
      }
      if (item.tellUs.value === '') {
        item.tellUs.error = true;
        error = true;
      }
      if (item.description.value === '') {
        item.description.error = true;
        error = true;
      }
      if (item.remotePerson.value === '') {
        item.remotePerson.error = true;
        error = true;
      }
      if (item.website.value === '') {
        item.website.error = true;
        error = true;
      }
      if (item.discord.value === '') {
        item.discord.error = true;
        error = true;
      }
      if (item.hashtag1.value === '') {
        item.hashtag1.error = true;
        error = true;
      }
      if (item.hashtag2.value === '') {
        item.hashtag2.error = true;
        error = true;
      }
      if (item.hashtag3.value === '') {
        item.hashtag3.error = true;
        error = true;
      }
      if (item.creator.value === '') {
        item.creator.error = true;
        error = true;
      }
      if (item.reseller.value === '') {
        item.reseller.error = true;
        error = true;
      }
      if (item.royaltyPool.value === '') {
        item.royaltyPool.error = true;
        error = true;
      }
      if (item.creator.value && item.reseller.value && item.royaltyPool.value) {
        if (parseInt(item.creator.value) + parseInt(item.reseller.value) + parseInt(item.royaltyPool.value) !== 100) {
          toast.error('All sums of creator, reseller and royalty must equal 100%!');
          return true;
        }
      }
    });
    setArrayNFT(tmpArrayNFT);
    if (error) toast.error('Please input all field!');
    return error;
  };

  const handleRemoveNFT = idx => {
    const restArrayNFT = arrayNFT.filter((item, index) => index !== idx);
    setArrayNFT(restArrayNFT);
  };

  const handleCreateNFT = async () => {
    setStartRequire(true);
    if (checkValidation()) {
      return;
    }

    try {
      setIsLoading(true);
      const res = await handleMultiMintContract();
      if (res?.length > 0) {
        toast.success('Successfully minted!');
        history.push('/profile?activeTab=created&actionTab=minted');
      }
      setIsLoading(false);
    } catch (err) {
      console.log('Error Create : ', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleMultiMintContract = async () => {
    try {
      const tokenURIs = arrayNFT.map(item => item.imageUrl.value);

      const gasPrice = await web3.eth.getGasPrice();
      const {
        transactionHash,
        blockNumber,
        events: mintEvent,
      } = await nftContract.methods.createMultiToken(tokenURIs).send({ from: account, gasPrice: gasPrice * 5 });
      let nftTokenIds = [];
      let from = '';
      let to = '';
      if (mintEvent?.Transfer.length > 0) {
        from = mintEvent?.Transfer[0]?.returnValues?.from;
        to = mintEvent?.Transfer[0]?.returnValues?.to;
      } else {
        from = mintEvent?.Transfer?.returnValues?.from;
        to = mintEvent?.Transfer?.returnValues?.to;
      }

      if (mintEvent?.TokenCreated?.length > 0) {
        nftTokenIds = mintEvent?.TokenCreated?.map(item => item?.returnValues?.tokenId);
      } else {
        nftTokenIds.push(mintEvent?.TokenCreated?.returnValues?.tokenId);
      }
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      // console.log('>>> createMultiToken mintEvent : ', mintEvent);

      const pmarketItem = [];
      arrayNFT.forEach((item, index) => {
        pmarketItem.push({
          nftContract: REACT_APP_NFT_CONTRACT_ADDRESS,
          tokenId: nftTokenIds[index],
          businessOwnerPercent: item.creator.value * 100,
          sellerPercent: item.reseller.value * 100,
          royaltyPercent: item.royaltyPool.value * 100,
        });
      });
      // console.log('>>> 111111111111111111q : ', pmarketItem);

      const { events: marketEvent } = await marketplaceContract.methods
        .createMultiMarketItem(pmarketItem)
        .send({ from: account, gasPrice: gasPrice * 5 });

      let marketItems = [];
      // console.log('>>> createMultiMarketItem marketEvent : ', marketEvent);
      if (marketEvent?.MarketItemCreated?.length > 0) {
        marketItems = marketEvent?.MarketItemCreated?.map(item => item?.returnValues?.itemId);
      } else {
        marketItems.push(marketEvent?.MarketItemCreated?.returnValues?.itemId);
      }
      // console.log('>>> 2222222222 createMultiMarketItem : ', marketItems);

      const tmpArrNFT = [];
      arrayNFT.forEach((item, index) => {
        tmpArrNFT.push({ ...item, marketItemId: marketItems[index] });
      });

      // console.log('>>> 33333333333333 arrayNFT : ', tmpArrNFT);

      const newNFTs = await handleSaveNFTAPI(tmpArrNFT);
      const tokenIds = newNFTs.map(item => item.id);

      const res = await Promise.all(
        nftTokenIds.map(
          async (nftTokenId, index) =>
            await handleSingleMintAPI(nftTokenId, tokenIds[index], from, to, transactionHash, blockTimeStamp)
        )
      );
      return res;
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

  const handleSaveNFTAPI = async _arrayNFT => {
    try {
      const res = await Promise.all(_arrayNFT.map(async item => await handleSaveOneNFTAPI(item)));
      return res;
    } catch (err) {
      console.log('Error Create : ', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleSaveOneNFTAPI = async nftData => {
    try {
      let geoLocation = {};
      if (nftData.location?.length < 5) {
        const {
          data: { latitude, longitude },
        } = await getGeoLocationFromIPAddress();

        geoLocation.latitude = latitude;
        geoLocation.longitude = longitude;
      }

      const resp = await tokenCreate(
        {
          marketItemId: nftData.marketItemId,
          uri: nftData.imageUrl.value,
          mediaType: nftData.type,
          name: nftData.name.value,
          category: nftData.category.value,
          tellUs: nftData.tellUs.value,
          description: nftData.description.value,
          remotePerson: nftData.remotePerson.value,
          location: nftData.location.value,
          geoLocation: geoLocation.value,
          website: nftData.website.value,
          discord: nftData.discord.value,
          hashtag1: nftData.hashtag1.value,
          hashtag2: nftData.hashtag2.value,
          hashtag3: nftData.hashtag3.value,
          creator: nftData.creator.value,
          reseller: nftData.reseller.value,
          royaltyPool: nftData.royaltyPool.value,
          expirationId: nftData.expiration.value,
          expiration: handleExpireTimeChange(nftData.expiration).value,
          savedForLater: savedForLater,
          seenVideo: seenVideo,
        },
        {
          Authorization: `Bearer ${authToken}`,
        }
      );
      return resp.data.data;
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
        <MetamaskSigninModal
          modalIsOpen={modalIsOpen}
          closeModal={closeModal}
          redirectUrl={'/profile?activeTab=created&actionTab=listed'}
        />
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
                {arrayNFT.map((itemNFT, index) => (
                  <div className="my-3" key={index}>
                    <NewNFT
                      index={index}
                      itemNFT={itemNFT}
                      handleChangeArrayNFT={handleChangeArrayNFT}
                      handleRemoveNFT={handleRemoveNFT}
                    />
                  </div>
                ))}
              </div>
              <div className="global-flex-end my-3">
                <BackgroundButton label={'Add NFT'} color={'#000000'} bgColor={'#D9D9D9'} onClick={handleAddNFT} />
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
                  <span
                    style={{ color: '#0d6efd', cursor: 'pointer' }}
                    onClick={() => window.open('https://AdValorem.io/tutorial')}
                  >
                    {` tutorial video's `}
                  </span>
                  and agree to our
                  <span
                    style={{ color: '#0d6efd', cursor: 'pointer' }}
                    onClick={() => window.open('https://advalorem.io/licensing-agreement')}
                  >
                    {` licensing and distribution agreement `}
                  </span>
                </span>
                {startRequire && !seenVideo && <span className="err-text">**require**</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="create-middle-background px-2 pt-4 pb-5">
          <div className="create-middle-one-container">
            <div className="d-flex justify-content-end align-items-center flex-wrap">
              <div className="me-4 my-2">
                <BackgroundButton
                  label={'Save for later'}
                  color={'#FFFFFF'}
                  bgColor={'#000000'}
                  onClick={handleClickSaveForLater}
                />
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

export default Create;

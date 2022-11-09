import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'src/styles/Create.scss';
import 'src/styles/Global.scss';
import UserWithName from 'src/components/UserWithName';
import StepOrder from 'src/components/StepOrder';
import BackgroundButton from 'src/components/BackgroundButton';
import MenuIcon from 'src/assets/images/menu-icon.svg';
import CustomCheckBox from 'src/components/CustomCheckBox';
import { isMobile } from 'react-device-detect';
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

const web3 = new Web3(window.ethereum);
const nftContract = new web3.eth.Contract(nftABI, process.env.REACT_APP_NFT_CONTRACT_ADDRESS);
const impactClickId = localStorage.getItem('Impact_ClickId');

const Create = () => {
  const history = useHistory();
  const { account, chainId } = useWeb3React();
  const dispatch = useDispatch();
  const [bannerSource, setBannerSource] = useState('/img/default-banner.png');
  const [avatarSource, setAvatarSource] = useState('/img/default-avatar.png');
  const [isLoading, setIsLoading] = useState(false);
  const authToken = useSelector(state => state.auth.token);
  const [seenVideo, setSeenVideo] = useState(false);
  let savedForLater = 0;
  const [createdArrayToken, setCreatedArrayToken] = useState([]);
  const [arrayNFT, setArrayNFT] = useState([
    {
      imageUrl: '/img/default-avatar.png',
      fileName: '',
      type: 'image',
      name: '',
      category: '',
      tellUs: '',
      description: '',
      remotePerson: '',
      location: '',
      website: '',
      discord: '',
      hashtag1: '',
      hashtag2: '',
      hashtag3: '',
      creator: '',
      reseller: '',
      royaltyPool: '',
      expiration: '',
    },
  ]);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
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
  }, [authToken]);

  const handleClickSaveForLater = async () => {
    if (!account) {
      toast.error('Please connect wallet!');
      return;
    }
    let requireToast = false;
    var BreakException = {};
    try {
      arrayNFT.forEach((element, index) => {
        Object.values(element).forEach((item, index) => {
          if (item === '') {
            requireToast = true;
            throw BreakException;
          }
        });
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    if (requireToast) {
      toast.error('Please input all field!');
      return;
    }

    try {
      setIsLoading(true);
      savedForLater = 1;
      const newNFTs = await handleSaveNFTAPI();
      setCreatedArrayToken(newNFTs);
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
    setSeenVideo(event.target.value);
  };

  const handleChangeArrayNFT = async (e, key, index) => {
    try {
      setIsLoading(true);
      let tmpArrNFT = [...arrayNFT];
      if (key === 'file') {
        const file = e.target.files[0];
        const _mediaType = file.type.split('/')[0];
        tmpArrNFT[index].fileName = file.name;
        tmpArrNFT[index].type = _mediaType;

        //upload ipfs
        const formData = new FormData();
        if (!file) return;
        formData.append('file', file);
        const {
          status,
          data: { IpfsHash },
        } = await pinFileToIPFS(formData);
        if (status !== 200) return;
        tmpArrNFT[index]['imageUrl'] = `https://ipfs.io/ipfs/${IpfsHash}`;
      } else {
        tmpArrNFT[index][key] = e.target.value;
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
        imageUrl: '/img/default-avatar.png',
        fileName: '',
        type: 'image',
        name: '',
        category: '',
        tellUs: '',
        description: '',
        remotePerson: '',
        location: '',
        website: '',
        discord: '',
        hashtag1: '',
        hashtag2: '',
        hashtag3: '',
        creator: '',
        reseller: '',
        royaltyPool: '',
        expiration: '',
      },
    ]);
  };

  const handleRemoveNFT = idx => {
    const restArrayNFT = arrayNFT.filter((item, index) => index !== idx);
    setArrayNFT(restArrayNFT);
  };

  const handleCreateNFT = async () => {
    if (!account) {
      toast.error('Please connect wallet!');
      return;
    }
    let requireToast = false;
    var BreakException = {};
    try {
      arrayNFT.forEach((element, index) => {
        Object.values(element).forEach((item, index) => {
          if (item === '') {
            requireToast = true;
            throw BreakException;
          }
        });
      });
    } catch (e) {
      if (e !== BreakException) throw e;
    }
    if (requireToast) {
      toast.error('Please input all field!');
      return;
    }

    try {
      setIsLoading(true);
      const newNFTs = await handleSaveNFTAPI();
      setCreatedArrayToken(newNFTs);
      const tokenURIs = newNFTs.map(item => item.uri);
      const tokenIds = newNFTs.map(item => item.id);
      const res = await handleMultiMintContract(tokenURIs, tokenIds);
      toast.success('Successfully minted!');
      setIsLoading(false);
      history.push('/profile?activeTab=created&actionTab=minted');
    } catch (err) {
      console.log('Error Create : ', err.message);
      toast.error(err?.message);
      setIsLoading(false);
    }
  };

  const handleMultiMintContract = async (tokenURIs, tokenIds) => {
    try {
      const gasPrice = await web3.eth.getGasPrice();
      const { from, to, transactionHash, blockNumber, events } = await nftContract.methods
        .createMultiToken(tokenURIs)
        .send({ from: account, gasPrice: gasPrice * 5 });
      let nftTokenIds = [];
      if (events?.TokenCreated?.length > 0) {
        nftTokenIds = events?.TokenCreated?.map(item => item?.returnValues?.tokenId);
      } else {
        nftTokenIds.push(events?.TokenCreated?.returnValues?.tokenId);
      }
      const { timestamp: blockTimeStamp } = await web3.eth.getBlock(blockNumber);
      const res = await Promise.all(
        nftTokenIds.map(
          async (nftTokenId, index) =>
            await handleSingleMintAPI(nftTokenId, tokenIds[index], from, to, transactionHash, blockTimeStamp)
        )
      );
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  const handleSingleMintAPI = async (nftTokenId, id, from, to, transactionHash, blockTimeStamp) => {
    try {
      await tokenMint(id, {
        hash: transactionHash,
        from: to,
        to: from,
        timestamp: blockTimeStamp,
        tokenId: nftTokenId,
        impactClickId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSaveNFTAPI = async () => {
    try {
      const res = await Promise.all(arrayNFT.map(async item => await handleSaveOneNFTAPI(item)));
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
          uri: nftData.imageUrl,
          mediaType: nftData.type,
          name: nftData.name,
          category: nftData.category,
          tellUs: nftData.tellUs,
          description: nftData.description,
          remotePerson: nftData.remotePerson,
          location: nftData.location,
          geoLocation: geoLocation,
          website: nftData.website,
          discord: nftData.discord,
          hashtag1: nftData.hashtag1,
          hashtag2: nftData.hashtag2,
          hashtag3: nftData.hashtag3,
          creator: nftData.creator,
          reseller: nftData.reseller,
          royaltyPool: nftData.royaltyPool,
          expiration: handleExpireTimeChange(nftData.expiration),
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
            alt="banner-image"
            src={bannerSource}
            width={'100%'}
            height={192}
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            className="global-pointer"
          />
        </div>
        <div className="avatar-container">
          <img
            alt="avatar-image"
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
              <div className="poppins-24-600 my-3">Have you seen the video?</div>
              <CustomCheckBox
                label={'I have seen the video and understand how the advalorem marketplace works'}
                onChange={handleChangeSeenVideo}
                value={seenVideo}
              />
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

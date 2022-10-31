import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'src/styles/Create.scss';
import 'src/styles/Global.scss';
import Avatar2 from 'src/assets/images/avatar-1.png';
import UserWithName from 'src/components/UserWithName';
import StepOrder from 'src/components/StepOrder';
import BackgroundButton from 'src/components/BackgroundButton';
import MenuIcon from 'src/assets/images/menu-icon.svg';
import RoundBorderButton from 'src/components/RoundBorderButton';
import TextInput from 'src/components/TextInput';
import CustomRadio from 'src/components/CustomRadio';
import CustomCheckBox from 'src/components/CustomCheckBox';
import { isMobile } from 'react-device-detect';
import MetamaskSigninModal from 'src/components/MetamaskSigninModal';
import { useSelector, useDispatch } from 'react-redux';
import { getProfile, pinFileToIPFS } from 'src/api';
import LoadingSpinner from 'src/components/LoadingSpinner';
import SelectInput from 'src/components/SelectInput';
import { fetchAllCategories } from 'src/actions/categories';

const Create = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.items.items);
  console.log('>>>>>>>>>>>>>>>>>>>>> = ', categories);
  const [category, setCategory] = useState(0);
  const [profile, setProfile] = useState([]);
  const [bannerSource, setBannerSource] = useState('/images/default-banner.png');
  const [avatarSource, setAvatarSource] = useState('/images/default-avatar.png');
  const [isLoading, setIsLoading] = useState(false);
  const [geoLocation, setGeoLocation] = useState({ latitude: 0, longitude: 0 });
  const authToken = useSelector(state => state.auth.token);
  const avatarRef = useRef(null);
  const [nftFileUrl, setNftFileUrl] = useState('/images/default-avatar.png');
  const [nftFileName, setNftFileName] = useState('Default Avatar');
  const [nftMediaType, setNftMediaType] = useState('image');
  const [nftName, setNftName] = useState('');
  const [nftCategory, setNftCategory] = useState('');
  const [nftTellUs, setNftTellUs] = useState('');
  const [nftDescription, setNftDescription] = useState('');
  const [nftRemotePerson, setNftRemotePerson] = useState('');
  const [nftLocation, setNftLocation] = useState('');
  const [nftWebsite, setNftWebsite] = useState('');
  const [nftDiscord, setNftDiscord] = useState();
  const [nftHashtag1, setNftHashTag1] = useState('');
  const [nftHashtag2, setNftHashTag2] = useState('');
  const [nftHashtag3, setNftHashTag3] = useState('');
  const [giftCardType, setGiftCardType] = useState(-1);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const user1Info = {
    info: {
      name: 'Sarah',
      role: 'Creator',
      avatar: Avatar2,
      dotColor: '#111827',
    },
    gift: [
      {
        name: 'Sarah',
        amount: 180,
        bgColor: '#96F2A4',
        color: '#000000',
      },
      {
        name: 'Royalty',
        amount: 20,
        bgColor: '#F2E9BA',
        color: '#000000',
      },
    ],
  };
  const user2Info = {
    info: {
      name: 'John',
      role: 'Client/Reseller',
      avatar: Avatar2,
      dotColor: '#96F2A4',
    },
    gift: [
      {
        name: 'John',
        amount: 90,
        bgColor: '#111827',
        color: '#ffffff',
      },
      {
        name: 'Sarah',
        amount: 180,
        bgColor: '#96F2A4',
        color: '#000000',
      },
      {
        name: 'Royalty',
        amount: 30,
        bgColor: '#F2E9BA',
        color: '#000000',
      },
    ],
  };
  const user3Info = {
    info: {
      name: 'Jane',
      role: 'Client/Reseller',
      avatar: Avatar2,
      dotColor: '#96F2A4',
    },
    gift: [
      {
        name: 'Jane',
        amount: 120,
        bgColor: '#111827',
        color: '#ffffff',
      },
      {
        name: 'Sarah',
        amount: 240,
        bgColor: '#96F2A4',
        color: '#000000',
      },
      {
        name: 'Royalty',
        amount: 40,
        bgColor: '#F2E9BA',
        color: '#000000',
      },
    ],
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
    amount: 200,
  };
  const step2 = {
    description: 'resells service to Jane for ',
    amount: 200,
  };
  const step3 = {
    description: 'resells web design service to Tom for',
    amount: 200,
  };

  const giftCardOptions = [
    {
      id: 1,
      name: '30 days',
    },
    {
      id: 2,
      name: '60 days',
    },
    {
      id: 3,
      name: '90 days',
    },
    {
      id: 4,
      name: '180 days',
    },
    {
      id: 5,
      name: '360 days',
    },
  ];

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, []);

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
      setAvatarSource(profileInfo?.avatar || '/images/default-avatar.png');
      setBannerSource(profileInfo?.cover_photo || '/images/default-banner.png');
      setIsLoading(false);
    } catch (err) {
      console.log('Error Profile : ', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProfileData();
  }, [authToken]);

  const handleClickSaveForLater = () => {
    history.push('/profile');
  };
  const [seenVideo, setSeenVideo] = useState(false);
  const handleChangeSeenVideo = event => {
    setSeenVideo(event.target.value);
  };

  const handleAvatarInputChange = async e => {
    try {
      setIsLoading(true);
      const file = e.target.files[0];
      //upload ipfs
      const formData = new FormData();
      if (!file) return;
      formData.append('file', file);
      const {
        status,
        data: { IpfsHash },
      } = await pinFileToIPFS(formData);
      if (status !== 200) return;
      setNftFileUrl(`https://ipfs.io/ipfs/${IpfsHash}`);
      setNftMediaType(file.type.split('/')[0]);
      setNftFileName(file.name);
      setIsLoading(false);
    } catch (err) {
      console.log('Error Create : ', err);
      setIsLoading(false);
    }
  };

  const handleDeleteNftPhoto = () => {
    setNftFileName('Default Avatar');
    setNftFileUrl('/images/default-avatar.png');
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className="create-container">
        <MetamaskSigninModal modalIsOpen={modalIsOpen} closeModal={closeModal} redirectUrl={'/profile'} />
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
            src={avatarSource || '/images/default-avatar.png'}
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
              <div className="global-flex-between flex-wrap my-4">
                <div className="global-flex-start my-4">
                  <img alt="alt" src={nftFileUrl} style={{ width: 80, height: 80, borderRadius: 64 }} />
                  <div className="poppins-14-400 ms-2">{nftFileName}</div>
                </div>
                <div className="d-flex justify-content-between flex-wrap my-2">
                  <div className="my-2 me-3">
                    <RoundBorderButton label={'Delete photo'} color={'#E75B2E'} onClick={handleDeleteNftPhoto} />
                  </div>
                  <div className="my-2">
                    <RoundBorderButton
                      label={'Choose another photo '}
                      color={'#2DC015'}
                      onClick={() => avatarRef.current.click()}
                    />
                    <input ref={avatarRef} type="file" className="d-none" onChange={handleAvatarInputChange} />
                  </div>
                </div>
              </div>
              <div>
                <div className="row gx-5">
                  <div className="col-12 col-lg-6 my-2">
                    <TextInput
                      label={'Name of service'}
                      type={'text'}
                      value={nftName}
                      onChange={e => {
                        setNftName(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 col-lg-6 my-2">
                    {/* <TextInput label={'Category'} type={'text'} /> */}
                    <SelectInput
                      label={'Category'}
                      placeFolder={'Select Category'}
                      value={category}
                      options={categories}
                      onChange={e => setCategory(e.target.value)}
                    />
                  </div>
                </div>
                <div className="my-3">
                  <TextInput
                    label={'Tell us about your services'}
                    type={'textarea'}
                    onChange={e => {
                      setNftTellUs(e.target.value);
                    }}
                  />
                </div>
                <div className="my-4">
                  <TextInput
                    label={'Describe your service'}
                    type={'text'}
                    onChange={e => {
                      setNftDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="global-flex-start my-3">
                <CustomRadio
                  label={'Remote'}
                  value={'remote'}
                  onChange={e => {
                    setNftRemotePerson(e.target.value);
                  }}
                />
                <div className="ms-5">
                  <CustomRadio
                    label={'In Person'}
                    value={'person'}
                    onChange={e => {
                      setNftRemotePerson(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row gx-5 my-3">
                <div className="col-12 col-lg-4 my-2">
                  <TextInput
                    label={'Location'}
                    type={'text'}
                    onChange={e => {
                      setNftLocation(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-lg-4 my-2">
                  <TextInput
                    label={'Website'}
                    type={'text'}
                    onChange={e => {
                      setNftWebsite(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-lg-4 my-2">
                  <TextInput
                    label={'Dicord'}
                    type={'text'}
                    onChange={e => {
                      setNftDiscord(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="row gx-5">
                <div className="col-12 col-lg-4 my-2">
                  <TextInput
                    label={'Hastag 1'}
                    type={'text'}
                    onChange={e => {
                      setNftHashTag1(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-lg-4 my-2">
                  <TextInput
                    label={'Hastag 2'}
                    type={'text'}
                    onChange={e => {
                      setNftHashTag2(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12 col-lg-4 my-2">
                  <TextInput
                    label={'Hastag 3'}
                    type={'text'}
                    onChange={e => {
                      setNftHashTag3(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="create-middle-background px-2 py-4">
          <div className="create-middle-one-container">
            <div className="create-middle-section">
              <div className="poppins-24-600 my-3">Set your token percent</div>
              <div className="row gx-5">
                <div className="col-12 col-lg-4 my-2">
                  <TextInput label={'Creater'} type={'text'} />
                </div>
                <div className="col-12 col-lg-4 my-2">
                  <TextInput label={'Reseller'} type={'text'} />
                </div>
                <div className="col-12 col-lg-4 my-2">
                  <TextInput label={'Royalty Pool'} type={'text'} />
                </div>
              </div>
              <div className="my-2">
                {/* <TextInput label={'Expiration'} type={'text'} /> */}
                <SelectInput
                  label={'Expiration'}
                  placeFolder={'Days to Auto-Burn'}
                  value={giftCardType}
                  options={giftCardOptions}
                  onChange={e => setGiftCardType(e.target.value)}
                />
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
            <div className="d-flex justify-content-between align-items-center flex-wrap p-4">
              <div className="d-flex justify-content-start align-items-center flex-wrap">
                <div className="me-4 my-2">
                  <BackgroundButton label={'Remove NFT'} color={'#000000'} bgColor={'#D9D9D9'} />
                </div>
                <div className="my-2">
                  <BackgroundButton label={'Add NFT'} color={'#000000'} bgColor={'#D9D9D9'} />
                </div>
              </div>
              <div className="d-flex justify-content-start align-items-center flex-wrap">
                <div className="me-4 my-2">
                  <BackgroundButton
                    label={'Save for later'}
                    color={'#FFFFFF'}
                    bgColor={'#000000'}
                    onClick={handleClickSaveForLater}
                  />
                </div>
                <div className="my-2">
                  <BackgroundButton label={'Create NFT'} color={'#2A212E'} bgColor={'#96F2A4'} onClick={openModal} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Create;

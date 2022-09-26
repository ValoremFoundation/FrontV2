import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactMapGL, { /* Marker, Popup, */ NavigationControl, GeolocateControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'src/styles/Create.scss';
import 'src/styles/Global.scss';
import CreateUploadButton from 'src/components/CreateUploadButton';
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

const Create = () => {
  const history = useHistory();
  const mapStyleLight = 'mapbox://styles/thyjames/ckyj5984oa25w14o1hnuexh2a';
  const [viewport, setViewport] = useState({
    latitude: 38.57,
    longitude: -121.47,
    width: '100%',
    height: '300px',
    zoom: 1,
  });
  const navStyle = {
    position: 'absolute',
    top: 40,
    left: 0,
    padding: '10px',
  };

  const geolocateControlStyle = {
    right: isMobile ? 40 : 40,
    top: isMobile ? 40 : 40,
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

  const nearMeHandler = () => {};

  const handleClickSaveForLater = () => {
    history.push('/profile');
  };
  const handleClickCreate = () => {
    history.push('/profile');
  };
  const [seenVideo, setSeenVideo] = useState(false);
  const handleChangeSeenVideo = event => {
    setSeenVideo(event.target.value);
  };

  return (
    <div className="create-container">
      <div style={{ background: '#ffffff' }}>
        <div className="create-top-section">
          <div className="poppins-14-700">+Upload Banner</div>
          <div className="create-upload-picture-content">
            <CreateUploadButton label={'+Upload Picture'} color={'#000000'} bgColor={'#F4F5FB'} />
          </div>
        </div>
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
            <div className="global-flex-lg-between-sm-center">
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
                <img alt="alt" src={Avatar2} style={{ width: 64, height: 64, borderRadius: 64 }} />
                <div className="poppins-14-400 ms-2">gigphoto.png</div>
              </div>
              <div className="d-flex justify-content-between flex-wrap my-2">
                <div className="my-2 me-3">
                  <RoundBorderButton label={'Delete photo'} color={'#E75B2E'} />
                </div>
                <div className="my-2">
                  <RoundBorderButton label={'Choose another photo '} color={'#2DC015'} />
                </div>
              </div>
            </div>
            <div>
              <div className="row gx-5">
                <div className="col-12 col-lg-6 my-2">
                  <TextInput label={'Name of service'} type={'text'} />
                </div>
                <div className="col-12 col-lg-6 my-2">
                  <TextInput label={'Category'} type={'text'} />
                </div>
              </div>
              <div className="my-3">
                <TextInput label={'Tell us about your services'} type={'textarea'} />
              </div>
              <div className="my-4">
                <TextInput label={'Describe your service'} type={'text'} />
              </div>
            </div>
            <div className="global-flex-start my-3">
              <CustomRadio label={'Remote'} value={'remote'} />
              <div className="ms-5">
                <CustomRadio label={'In Person'} value={'person'} />
              </div>
            </div>
            <div className="row gx-5">
              <div className="col-12 col-lg-4 my-2">
                <TextInput label={'Location'} type={'text'} />
              </div>
              <div className="col-12 col-lg-4 my-2">
                <TextInput label={'Website'} type={'text'} />
              </div>
              <div className="col-12 col-lg-4 my-2">
                <TextInput label={'Dicord'} type={'text'} />
              </div>
            </div>
            <div style={{ position: 'relative', border: '2px solid #2BC11E' }} className="mt-4">
              <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle={mapStyleLight}
                onViewportChange={viewport => setViewport(viewport)}
                transitionDuration={500}
                transitionInterpolator={new FlyToInterpolator()}
              >
                <div style={navStyle}>
                  <NavigationControl />
                </div>
                <GeolocateControl
                  style={geolocateControlStyle}
                  positionOptions={{ enableHighAccuracy: true }}
                  onClick={nearMeHandler}
                />
              </ReactMapGL>
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
              <TextInput label={'Expiration'} type={'text'} />
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
                <BackgroundButton
                  label={'Create NFT'}
                  color={'#2A212E'}
                  bgColor={'#96F2A4'}
                  onClick={handleClickCreate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;

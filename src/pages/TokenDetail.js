import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import 'src/styles/TokenDetail.scss';
import 'src/styles/Global.scss';
import Avatar2 from 'src/assets/images/avatar-1.png';
import DiscodIcon from 'src/assets/images/discord-blue.svg';
import NFTImage from 'src/assets/images/nft-card.png';
import FavoriteIcon from 'src/assets/images/favorite-black-icon.svg';
import EyeIcon from 'src/assets/images/eye-icon.svg';
import BarCode from 'src/assets/images/barcode.svg';
import BenefitCard from 'src/components/BenefitCard';
import StarString from 'src/components/StarString';
import TokenDetailComment from 'src/components/TokenDetailComment';
import RoundBorderButton from 'src/components/RoundBorderButton';
import ReactMapGL, { /* Marker, Popup, */ NavigationControl, GeolocateControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { isMobile } from 'react-device-detect';
import NFTDivideLine from 'src/components/NFTDivideLine';

const TokenDetail = () => {
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
  const nearMeHandler = () => {};

  return (
    <div className="token-detail-container">
      <div className="row gx-5">
        <div className="col-12 col-lg-7 my-4">
          <img
            alt="alt"
            src={NFTImage}
            style={{ width: '100%', borderRadius: 5, objectFit: 'cover', objectPosition: 'center' }}
          />
          <div className="mt-4">
            <div className="global-flex-start">
              <div className="poppins-14-600-gray me-3">Comments</div>
              <StarString lable={5} />
            </div>
            <div className="global-flex-start">
              <img alt="alt" src={Avatar2} style={{ width: 48, height: 40 }} className="me-2" />
              <div className="poppins-14-400">Excellent Work!</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5 my-4">
          <div className="poppins-20-700">Janes Salon by Jane Doe</div>
          <div className={isMobile ? 'poppins-24-700' : 'poppins-36-700'}>Haircut and massage</div>
          <div className="global-flex-start my-3">
            <div className="global-flex-start me-3">
              <img alt="alt" src={EyeIcon} width={25} height={17} className="me-1 global-pointer" />
              <div className="poppins-16-500-gray">5</div>
            </div>
            <div className="global-flex-start">
              <img alt="alt" src={FavoriteIcon} width={21} height={18} className="me-1 global-pointer" />
              <div className="poppins-16-500-gray">10</div>
            </div>
          </div>
          <BenefitCard />
        </div>
      </div>
      <div className="row gx-5">
        <div className="col-12 col-lg-7 my-4">
          <div>
            <div className="poppins-16-500-gray text-center my-1">Rate this service!</div>
            <div className="global-flex-center">
              <div className="token-detail-service">
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <div
                    key={index}
                    className="poppins-16-500 global-flex-center"
                    style={{ border: '1px solid #ffffff', width: '50px', height: '50px', textAlign: 'center' }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="my-4">
              <TokenDetailComment />
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-5 my-4 px-5 d-flex justify-content-center align-items-center">
          <RoundBorderButton
            label={'CONTACT SELLER DIRECT'}
            color={'#2A212E'}
            bgColor={'#FFFFFF'}
            icon={DiscodIcon}
            fullWidth={true}
          />
        </div>
      </div>
      <div className="row gx-5">
        <div className="col-12 col-lg-7 my-4">
          <div style={{ position: 'relative' }}>
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
        <div className="col-12 col-lg-5 my-4">
          <div className="poppins-20-700-gray">Description</div>
          <div className="row gx-2 mt-2">
            <div className="col-12 col-lg-6 my-2">
              <img alt="alt" src={BarCode} />
            </div>
            <div className="col-12 col-lg-6 my-2">
              <div className="poppins-16-500">
                i came up with this during a enlightening SCAD schitzaphrenia session done with Windows xp pad and
                original is on real Drawing paper..with archival ink, so ya know im O.G. with it...
              </div>
            </div>
            <div className="col-12 col-lg-6 my-2">
              <div className="poppins-16-700">10% Creator royalties</div>
            </div>
            <div className="col-12 col-lg-6 my-2">
              <div className="poppins-16-700">Artstore Collection</div>
            </div>
            <NFTDivideLine color={'#D4D4D5'} />
            <div className="global-flex-between">
              <div className="poppins-16-700-gray w-50">Url</div>
              <div style={{ wordBreak: 'break-all' }} className="w-50 poppins-16-400">
                https://nft.advalorem.io/tokens/73
              </div>
            </div>
            <div className="global-flex-between">
              <div className="poppins-16-700">IPFS Image URL</div>
              <div style={{ wordBreak: 'break-all' }} className="w-50 poppins-16-400">
                https://ipfs.io/ipfs/Qme6QQW82fJtxZQsrZRa1y1PwS3vDL8v4crPatqJ8MLZGh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenDetail;

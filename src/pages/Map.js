import React, { useState, useEffect } from 'react';
import 'src/styles/Map.scss';
import ReactMapGL, { Marker, Popup, NavigationControl, GeolocateControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { isMobile } from 'react-device-detect';
import { Link } from 'react-router-dom';
import { getTokenLocations } from 'src/api';
import { sliceString } from 'src/utils/formartUtils';

const Map = () => {
  // const mapStyleDark = 'mapbox://styles/mapbox/dark-v10';
  const mapStyleLight = 'mapbox://styles/thyjames/ckyj5984oa25w14o1hnuexh2a';
  const [tokenLocations, setTokenLocations] = useState([]);
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 38.57,
    longitude: -121.47,
    width: '100%',
    height: 'calc(100vh - 84px)',
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

  useEffect(() => {
    const getLocations = async () => {
      const {
        data: { locations },
      } = await getTokenLocations();
      setTokenLocations(locations);
    };
    getLocations();
  }, []);

  const nearMeHandler = () => {};
  const renderMarkers = () => {
    return tokenLocations?.map((nft, index) => {
      return (
        <Marker key={index} latitude={nft.latitude} longitude={nft.longitude}>
          <div onClick={() => setSelectedNFT(nft)} className="global-pointer">
            <img
              src="https://cdn.discordapp.com/attachments/930281959047958589/933009976325210202/Valorem-map-pin.png"
              alt="marker"
            />
          </div>
        </Marker>
      );
    });
  };

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle={mapStyleLight}
        onViewportChange={viewport => setViewport(viewport)}
        transitionDuration={500}
        transitionInterpolator={new FlyToInterpolator()}
      >
        {selectedNFT && (
          <Popup latitude={selectedNFT.latitude} longitude={selectedNFT.longitude} onClose={() => setSelectedNFT(null)}>
            <Link to={`/token-detail/${selectedNFT.token_id}`} className="global-pointer">
              {sliceString(selectedNFT?.token_name, 40)}
            </Link>
          </Popup>
        )}
        <div style={navStyle}>
          <NavigationControl />
        </div>
        {renderMarkers()}
        <GeolocateControl
          style={geolocateControlStyle}
          positionOptions={{ enableHighAccuracy: true }}
          onClick={nearMeHandler}
        />
      </ReactMapGL>
    </div>
  );
};

export default Map;

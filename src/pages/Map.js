import React, { useState } from 'react';
import 'src/styles/Map.scss';
import ReactMapGL, { /* Marker, Popup, */ NavigationControl, GeolocateControl, FlyToInterpolator } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { isMobile } from 'react-device-detect';

const Map = () => {
  const mapStyleDark = 'mapbox://styles/mapbox/dark-v10';
  const mapStyleLight = 'mapbox://styles/thyjames/ckyj5984oa25w14o1hnuexh2a';
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

  const nearMeHandler = () => {};

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
  );
};

export default Map;

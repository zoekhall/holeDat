import React, { useEffect, useState } from 'react';
import MapBox from './MapBox';

const MapView = () => {
  const [userLocation, setUserLocation] = useState<number[]>([]);

  const getPosition = () => {
    const success = (location) => {
      setUserLocation([location.coords.latitude, location.coords.longitude]);
    };
    const error = () => {
      alert('Please Enable Your Location for this Feature');
    };
    navigator.geolocation.watchPosition(success, error);
  };

  useEffect(getPosition, []);
  return (
    <div className='map-box'>
      <MapBox userLocation={userLocation} />
    </div>
  );
};

export default MapView;

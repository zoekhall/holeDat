import React, { useEffect, useState } from 'react';
import FormMapBox from './FormMapBox';

const MapView = () => {
  const [userLocation, setUserLocation] = useState<number[]>([]);

  const getPosition = () => {
    const success = (location) => {
      setUserLocation([location.coords.latitude, location.coords.longitude]);
      console.log(userLocation);
    };
    const error = () => {
      alert('Please Enable Your Location for this Feature');
    };
    navigator.geolocation.watchPosition(success, error);
  };

  useEffect(getPosition, []);
  return (
    <div className='map-box' id='FormMap'>
      <FormMapBox userLocation={userLocation} />
    </div>
  );
};

export default MapView;

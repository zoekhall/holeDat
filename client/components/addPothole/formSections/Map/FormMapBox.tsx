import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import axios from 'axios';
import FormPoint from '../FormPoint';
import PropTypes from 'prop-types';

const FormMapBox = ({ userLocation }) => {
  type markerType = {
    createdAt: string;
    fixed: boolean;
    lat: number;
    lon: number;
    pothole_id: number;
    updatedAt: string;
  };
  const mapbox_token =
    'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';
  const [markers, setMarkers] = useState<markerType[]>([]);

  const getMarkers = () => {
    axios
      .get('/api/pothole')
      .then((data) => setMarkers(data.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMarkers();
  }, []);

  return (
    <Map
      style={{
        width: '100%',
        height: '50%',
      }}
      mapboxAccessToken={mapbox_token}
      initialViewState={{
        latitude: userLocation[0],
        longitude: userLocation[1],
        zoom: 12,
        pitch: 60,
      }}
      mapStyle='mapbox://styles/mapbox/light-v11'
    >
      {markers.map((marker) => {
        if (!marker.fixed)
          return <FormPoint key={marker.pothole_id} marker={marker} userLocation={userLocation} />;
      })}
      <NavigationControl />
      <FullscreenControl />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserHeading={true}
        fitBoundsOptions={{ maxZoom: 30 }}
      />
    </Map>
  );
};

FormMapBox.propTypes = {
  userLocation: PropTypes.array.isRequired,
};

export default FormMapBox;

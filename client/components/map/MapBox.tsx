import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import axios from 'axios';
import Point from './Point';

const MapBox = (prop) => {
  type markerType = {
    createdAt: string;
    fixed: boolean;
    lat: number;
    lon: number;
    pothole_id: number;
    updatedAt: string;
  };
  const mapbox_token = 'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg'
  const [markers, setMarkers] = useState<markerType[]>([]);
  //const [location, setNewLocation] = useState<number[]>([])

  console.log(prop.userLocation)
  const getMarkers = () => {
    axios
      .get('/api/pothole')
      .then((data) => setMarkers(data.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getMarkers()
  }, []);

  return (
    <Map
      style={{
        width: '100%',
        height: '100%',
      }}
      mapboxAccessToken={mapbox_token}
      initialViewState={{
        latitude: 29.935260993668,
        longitude: -90.08128396541,
        zoom: 12,
        pitch: 60,
      }}
      mapStyle='mapbox://styles/mapbox/dark-v11'
    >
      {
        markers.map((marker) => {
          if (!marker.fixed)
            return <Point key={marker.pothole_id} marker={marker} userLocation={prop.userLocation}/>;
        })
      }
      < NavigationControl />
      <FullscreenControl />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
        showUserHeading={true}
        fitBoundsOptions={{ maxZoom: 30 }}
      />
    </Map >
  );
};

export default MapBox;

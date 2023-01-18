import React, { useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import axios from 'axios';
import Point from './Point';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MapBox = ({ userLocation }: any) => {
  type markerType = {
    createdAt: string;
    fixed: boolean;
    lat: number;
    lon: number;
    pothole_id: number;
    updatedAt: string;
  };
  const mapbox_token = 'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';
  const [markers, setMarkers] = useState<markerType[]>([]);
  const [style, setStyle] = useState<string>('mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss');
  const [mode, setMode] = useState<boolean>(document.body.classList.contains('dark-mode'))

  const getMarkers = () => {
    axios
      .get('/api/pothole')
      .then((data) => setMarkers(data.data))
      .catch((err) => console.error(err));
  };
  const handleMode = () => {
    if (mode) {
      setStyle('mapbox://styles/mapbox/dark-v10');
    } else {
      setStyle('mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss');
    }
  }

  document.querySelector('#mode')?.addEventListener('click', () => {
    if (style === 'mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss') {
      setStyle('mapbox://styles/mapbox/dark-v10');
      setMode(!mode)
    } else {
      setStyle('mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss');
      setMode(!mode)
    }
  })
  const eventFire = (el, etype) => {
    if (el.fireEvent) {
      el.fireEvent('on' + etype);
    } else {
      const evObj = document.createEvent('Events');
      evObj.initEvent(etype, true, false);
      el.dispatchEvent(evObj);
    }
  }

  useEffect(() => {
    getMarkers()
    setTimeout(() => {
      eventFire(document.querySelector('.mapboxgl-ctrl-geolocate'), 'click');
    }, 500)
  }, [])
  useEffect(handleMode, [mode])

  return (
    <Map
      style={{
        width: '100%',
        height: '100%',
      }}
      mapboxAccessToken={mapbox_token}
      initialViewState={{
        latitude: 29.951065,
        longitude: -90.071533,
        zoom: 13,
        pitch: 60,
      }}
      mapStyle={style}
    >
      {markers.map((marker) => {
        if (!marker.fixed)
          return <Point key={marker.pothole_id} marker={marker} userLocation={userLocation} />;
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

export default MapBox;

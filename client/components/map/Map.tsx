import React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { Marker, NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';


function MapView() {
  return (
    <div
      className='map-box'
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'fixed',
      }}
    >
      <Map
        style={{
          width: '100%',
          height: '100%',
        }}
        mapboxAccessToken="pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg"
        initialViewState={{
          longitude: -90.071533,
          latitude: 29.951065,
          zoom: 12,
          pitch: 60,
          bearing: -60,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
      >
        <Marker longitude={-90.071533} latitude={29.951065} />
        <NavigationControl />
        <FullscreenControl />
        <GeolocateControl />
      </Map>

    </div >
  )
}

export default MapView;

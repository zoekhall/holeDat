import React, { useState, useEffect } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Form from 'react-bootstrap/Form';
import Point from '../../map/Point';

const mapboxToken = 'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';
const mapStyle = 'mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss';
const darkStyle = 'mapbox://styles/mapbox/dark-v10';

//map displaying submitted address
const PotholeMap = (prop) => {
  const [mode, setMode] = useState<boolean>(document.body.classList.contains('dark-mode'));
  const [style, setStyle] = useState<string>(mapStyle);
  const { coordinates, pothole_id } = prop; 

  //handling map mode (dark vs light)
  document.querySelector('.mode')?.addEventListener('click', () => {
    setMode(!mode);
    style === mapStyle ? setStyle(darkStyle) : setStyle(mapStyle)
  });
  
  const handleMode = () => {
    mode ? setStyle(darkStyle) : setStyle(mapStyle);
  };
  
  useEffect(handleMode, [mode]);

      return (
        <Form.Group controlId='mapGroup'>
          <Map
            initialViewState={{
              latitude: coordinates.lat,
              longitude: coordinates.lon,
              zoom: 15,
              pitch: 60,
            }}
            style={{ minWidth: 100, height: 250 }}
            mapboxAccessToken={mapboxToken}
            mapStyle={style}
          >
            <Point
              marker={{ ...coordinates, ...{ pothole_id } }}
              userLocation={[29.935260993668, -90.08128396541]}
            />
            <NavigationControl />
          </Map>
        </Form.Group>
      );
  
};

export default PotholeMap;

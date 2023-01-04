import React, { useState, useEffect } from 'react';
import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Form from 'react-bootstrap/Form';
import Point from '../../map/Point';

const mapboxToken =
  'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

const PotholePlot = (prop) => {
  const [style, setStyle] = useState<string>(
    'mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss'
  );
  const { coordinates, pothole_id, updateMap } = prop; 

  useEffect(() => {
    if (!document.querySelector('.dark-mode')) {
      setStyle('mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss');
    } else {
      setStyle('mapbox://styles/mapbox/dark-v10');
    }
  }, [style]);

  useEffect(() => {
    console.log(coordinates, pothole_id, 'effectively')
  },[coordinates])
  
  if (updateMap === 0) {
      return null;
    } else {
      return (
        <Form.Group>
          <Map
            initialViewState={{
              latitude: 29.9682,
              longitude: -90.03989,
              zoom: 15,
              pitch: 60,
            }}
            style={{ width: 500, height: 400 }}
            mapboxAccessToken={mapboxToken}
            mapStyle={style}
          >
            <Point
              marker={{ ...coordinates, ...{ pothole_id } }}
              userLocation={[29.935260993668, -90.08128396541]}
            />
            <NavigationControl />
            <FullscreenControl />
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
              showUserHeading={true}
              fitBoundsOptions={{ maxZoom: 30 }}
            />
          </Map>
        </Form.Group>
      );
  }
};

export default PotholePlot;

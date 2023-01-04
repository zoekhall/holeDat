import React, { useState, useEffect, useContext } from 'react';
import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { LocationContext } from '../AddPothole';
import Point from '../../map/Point';

const mapboxToken =
  'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

const PotholePlot = () => {
  const [style, setStyle] = useState<string>(
    'mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss'
  );
  const { coordinates } = useContext(LocationContext);
  const [pothole_id, setPothole_id] = useState<number>(0);

  useEffect(() => {
    if (!document.querySelector('.dark-mode')) {
      setStyle('mapbox://styles/jorcar1986/clc6iejcx000y14t0iaefvyss');
    } else {
      setStyle('mapbox://styles/mapbox/dark-v10');
    }
  }, [style]);

  useEffect(() => {
    axios.post('/api/pothole/findPothole', {lat: coordinates.lat, lon: coordinates.lon})
      .then(({ data }) => {
      if (data.length > 0) {
        setPothole_id(data[0].pothole_id);
    } })}, [])

  return (
    <Form.Group>
        <Map
          initialViewState={{
            latitude: coordinates.lat,
            longitude: coordinates.lon,
            zoom: 15,
            pitch: 60,
          }}
          style={{ width: 500, height: 400 }}
          mapboxAccessToken={mapboxToken}
          mapStyle={style}
        >
          <Point marker={{...coordinates, ...{pothole_id}}} userLocation= {[29.935260993668, -90.08128396541]}/>
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
};

export default PotholePlot;

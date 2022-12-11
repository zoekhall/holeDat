import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AddressAutofill } from '@mapbox/search-js-react'
import axios from 'axios';
import { InputGroup } from 'react-bootstrap';

const mapbox_token =
  'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

const PotholeLocation = () => {
  const [location, setLocation] = useState<string>('');
  // const [latitude, setLat] = useState<number>(0);
  // const [longitude, setLongitude] = useState<number>(0);

  const updateLatLon = () => {
    const formattedLocation = location.split(' ').join('%20');
    const mapAPI = `"https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedLocation}.json?access_token=${mapbox_token}`;
    axios
      .get(mapAPI)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Form.Group className='mb-5'>
      <Form.Label>Where Dat Pothole At?</Form.Label>
      <InputGroup id='addPotLocation'>
        <AddressAutofill accessToken={mapbox_token}>
          <Form.Control
            id='mapfill'
            name='address'
            placeholder='Address'
            type='text'
            autoComplete='street-address'
            onChange={(e) => setLocation(e.target.value)}
          />
        </AddressAutofill>
        <Button variant='flat' onClick={updateLatLon}>Add Address</Button>
      </InputGroup>
    </Form.Group>
  );
};

export default PotholeLocation;

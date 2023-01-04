import React, { useState, useContext } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { AddressAutofill } from '@mapbox/search-js-react';
import { LocationContext } from '../AddPothole';

const mapToken =
  'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

//Componenent with the location search input form. Assigns lat/lon to location context
const PotholeLocation = () => {
  const [location, setLocation] = useState<string>(''); //stores address from input form
  const [buttonMessage, setButtonMessage] = useState<string>('Add Approximate Address'); //message to be updated when user clicks button
  const { coordinates, setCoordinates } = useContext(LocationContext) //set coordinates using AddPothole LocationContext
  
  //turns address into lat and lon coordinates
  const updateLatLon = () => {
    const formattedLocation = location.split(' ').join('%20'); //format location to be read by mapbox
    axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedLocation}.json?language=en&limit=5&proximity=-121.90662,37.42827&country=US&access_token=${mapToken}`) //geo-code
      .then(
        ({ data }) => { //set the coordinates 
          const newCoordinates = { ...coordinates };
          newCoordinates.lat = data.features[0].center[1];
          newCoordinates.lon = data.features[0].center[0];
          setCoordinates(newCoordinates);
        }
      )
      .catch((err) => console.error('FAILURE TO TURN ADDRESS INTO COORDINATES', err));
  };

  return (
    <Form.Group className='mb-3'>
      <InputGroup id='addPotLocation'>
        <AddressAutofill accessToken={mapToken} browserAutofillEnabled={true}>
          <Form.Control
            id='mapfill'
            name='address'
            placeholder='Address'
            type='text'
            autoComplete='street-address'
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </AddressAutofill>
      </InputGroup>
      <div>
        <Button
          variant='flat'
          onClick={() => {
            if (location) {
              // e.currentTarget.disabled = true;
              setButtonMessage('Address Added');
              updateLatLon();
            }
          }}
        >
          {buttonMessage}
        </Button>
      </div>
    </Form.Group>
  );
};

export default PotholeLocation;

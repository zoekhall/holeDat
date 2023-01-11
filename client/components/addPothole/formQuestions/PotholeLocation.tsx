import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormGroup from 'react-bootstrap/FormGroup';
import { AddressAutofill } from '@mapbox/search-js-react';
import { LocationContext } from '../AddPothole';
import Alert from 'react-bootstrap/Alert';

const mapToken =
  'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

//Componenent with the location search Form form. Assigns lat/lon to location context
const PotholeLocation = (prop) => {
  const { coordinates, setCoordinates } = useContext(LocationContext); //set coordinates using AddPothole LocationContext
  const [showError, setShowError] = useState<boolean>(false);
  const isMounted = useRef(false);
  const { setSectionView, setPothole_id, setLocation, location, setZip, zip } = prop;

  //turns address into lat and lon coordinates
  const updateLatLon = () => {
    const formattedLocation = location.split(' ').join('%20').concat(`%2C%20${zip}`); //format location to be read by mapbox
    axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedLocation}.json?language=en&limit=5&proximity=-121.90662,37.42827&country=US&access_token=${mapToken}`
    )
      .then(({ data }) => { 
        const newCoordinates = { ...coordinates };
        newCoordinates.lat = data.features[0].center[1];
        newCoordinates.lon = data.features[0].center[0];
        setCoordinates(newCoordinates);
      })
      .catch((err) => {
        setShowError(true);
        console.error('FAILURE TO TURN ADDRESS INTO COORDINATES', err);
      });
  };

  //when coordinates change - find the id and set up render of map
  useEffect(() => {
    axios
      .post('/api/pothole/findPothole', { lat: coordinates.lat, lon: coordinates.lon })
      .then(({ data }) => {
        const potholeId = data.length > 0 ? data[0].pothole_id : 0;
        setPothole_id(potholeId);
        return potholeId;
      })
      //after finding the pothole id - use it to set the status and render the map
      .then((potholeId) => {
        if (isMounted.current) {
          potholeId === 0 ? setSectionView('newPothole') : setSectionView('existingPothole');
        } else {
          isMounted.current = true;
        }
      })
      .catch((err) => console.error('FAILURE TO FIND POTHOLEID', err));
  }, [coordinates]);

  const handleShowError = () => {
    if (showError === true) {
      return <Alert variant='danger'>Oops! That is Not an Address! Input enough of the address that you can click the full address when prompted</Alert>;
    }
  }

  return (
    <Form.Group className='mb-3'>
      <Form.Group>
        <FormGroup id='addPotLocation'>
          <AddressAutofill accessToken={mapToken} browserAutofillEnabled={true}>
            <Form.Control
              name='address'
              placeholder='Enter the Address You Think is Closest to the Pothole'
              type='text'
              autoComplete={`address-line1`}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </AddressAutofill>
          {handleShowError()}
          <Button
            className='basicButton genFormButton'
            id='confirmAddress'
            variant='primary'
            onClick={() => updateLatLon()}
          >
            Confirm Pothole Address
          </Button>
          <Form.Control
            id='formZip'
            name='postcode'
            placeholder='Postcode'
            type='text'
            autoComplete='postal-code'
            onChange={(e) => {
              setZip(e.target.value);
            }}
          />
        </FormGroup>
      </Form.Group>
    </Form.Group>
  );
};

export default PotholeLocation;
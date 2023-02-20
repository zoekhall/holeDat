import axios from 'axios';
import React, { useState, useContext, useEffect, useRef } from 'react';
import { AddressAutofill } from '@mapbox/search-js-react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { LocationContext } from '../AddPothole';

const mapToken =
  'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

//location search form - determines and assigns lat/lon to location context and renders map so user can double check location 
const PotholeLocation = (prop) => {
  const { coordinates, setCoordinates } = useContext(LocationContext); 
  const [showError, setShowError] = useState<boolean>(false);
  const isMounted = useRef(false);
  const { setSectionView, setPothole_id, setLocation, location, setZip, zip } = prop;

  //handles turning address into lat and lon coordinates
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
        setShowError(true); //display error to user 
        console.error('FAILURE TO TURN ADDRESS INTO COORDINATES', err);
      });
  };

  //when/if coordinates change - determine whether pothole exists and render appropriate map view 
  useEffect(() => {
    axios
      .post('/api/pothole/findPothole', { lat: coordinates.lat, lon: coordinates.lon }) 
      .then(({ data }) => { 
      //then potholeId determined by whether or not the pothole exists. If it does given existing id, else 0
        const potholeId = data.length > 0 ? data[0].pothole_id : 0; 
        setPothole_id(potholeId);
        return potholeId;
      })
      //then use the pothole id to render appropriate map view
      .then((potholeId) => {
        if (isMounted.current) {
          potholeId === 0 ? setSectionView('newPothole') : setSectionView('existingPothole');
        } else {
          isMounted.current = true;
        }
      })
      .catch((err) => console.error('FAILURE TO FIND POTHOLEID', err));
  }, [coordinates]);

  //handles rendering error message to user if valid address is not inputted
  const handleShowError = () => {
    if (showError === true) {
      return <Alert variant='danger'>Oops! Not a Valid Address</Alert>;
    }
  }

  return (
    <Form.Group controlId='addPotLocation'>
      <Form.Group className='questionGroup'>
        <AddressAutofill accessToken={mapToken} browserAutofillEnabled={true}>
          <Form.Control
            className='addAddressInput'
            name='address'
            placeholder='Enter Approximate Address'
            type='text'
            autoComplete={`address-line1`}
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          />
        </AddressAutofill>
        {handleShowError()}
      </Form.Group>
      <Button
        className='basicButton genFormButton'
        variant='primary'
        onClick={() => {
          updateLatLon();
        }}
      >
        Confirm Address
      </Button>
      <Form.Control
        className='formZip'
        name='postcode'
        placeholder='Postcode'
        type='text'
        autoComplete='postal-code'
        onChange={(e) => {
          setZip(e.target.value);
        }}
      />
    </Form.Group>
  );
};

export default PotholeLocation;

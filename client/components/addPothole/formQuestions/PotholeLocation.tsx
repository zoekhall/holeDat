import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { AddressAutofill } from '@mapbox/search-js-react';
import { LocationContext } from '../AddPothole';
import Alert from 'react-bootstrap/Alert';
// import PotholePlot from './PotholeMap';

const mapToken =
  'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

//Componenent with the location search input form. Assigns lat/lon to location context
const PotholeLocation = (prop) => {
  const { coordinates, setCoordinates } = useContext(LocationContext); //set coordinates using AddPothole LocationContext
  const isMounted = useRef(false);
  const [showError, setShowError] = useState<boolean>(false);
  const { setSectionView, setPothole_id, setLocation, location } = prop;

  //turns address into lat and lon coordinates
  const updateLatLon = () => {
    const formattedLocation = location.split(' ').join('%20'); //format location to be read by mapbox
    axios(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${formattedLocation}.json?language=en&limit=5&proximity=-121.90662,37.42827&country=US&access_token=${mapToken}`
    )
      .then(({ data }) => {
        //set the coordinates
        const newCoordinates = { ...coordinates };
        newCoordinates.lat = data.features[0].center[1];
        newCoordinates.lon = data.features[0].center[0];
        setCoordinates(newCoordinates);
        console.log(data)
      })
      .catch((err) => {
        setShowError(true)
        console.error('FAILURE TO TURN ADDRESS INTO COORDINATES', err)
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
      return <Alert variant='danger'>Oops! That is Not an Address! Try Again</Alert>;
    } else {
      return null;
    }
  }

  return (
    <Form.Group className='mb-3'>
      <Form.Group>
        <InputGroup id='addPotLocation'>
          <AddressAutofill
            accessToken={mapToken}
            browserAutofillEnabled={true}>
            <Form.Control
              id='mapfill'
              name='address'
              placeholder='Address'
              type='text'
              autoComplete='address-line1 country'
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </AddressAutofill>
        </InputGroup>
        {handleShowError()}
        <Button
          variant='flat'
          onClick={() => updateLatLon()} //on click coordinates are determined
        >
          Confirm Pothole Address
        </Button>
      </Form.Group>
    </Form.Group>
  );
};

export default PotholeLocation;

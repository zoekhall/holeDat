import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';

const mapAPI = 'https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json';
const mapbox_token = 'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

const PotholeLocation = () => {

  const [latitude, setLat] = useState<number>(0)
  const [longitude, setLongitude] = useState<number>(0);



  return (
    <Form.Group className='mb-5' controlId='addPotLocation' autocomplete='address-line1'>
      <Form.Label>What is the Approximate Location of the Pothole?</Form.Label>
      <Form.Control placeholder='1234 Main St' required />
    </Form.Group>
  );
};

export default PotholeLocation;

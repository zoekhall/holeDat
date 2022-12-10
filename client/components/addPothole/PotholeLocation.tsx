import React from 'react';
import Form from 'react-bootstrap/Form'

const PotholeLocation = () => {
  return (
      <Form.Group className='mb-5' controlId='addPotLocation'>
        <Form.Label>What is the Approximate Location of the Pothole?</Form.Label>
        <Form.Control placeholder='1234 Main St' required/>
      </Form.Group>
  );
}

export default PotholeLocation;


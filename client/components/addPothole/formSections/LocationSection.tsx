import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholeLocation from '../formQuestions/PotholeLocation';

const LocationSection = () => (
  <Form.Group>

    <h2>Pothole Basics</h2>

    <Form.Group>
      <Form.Label>Where Abouts is Dat Pothole Located?</Form.Label>
      <PotholeLocation />
    </Form.Group>
    
  </Form.Group>
);

export default LocationSection;
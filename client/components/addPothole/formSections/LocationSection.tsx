import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PropTypes from 'prop-types';

const LocationSection = ({ setView, setProgress }) => (
  <Form.Group>
    <h2>Pothole Basics</h2>

    <Form.Group>
      <Form.Label>Where Abouts is Dat Pothole Located?</Form.Label>
      <PotholeLocation />
    </Form.Group>

    <Button
      type='button'
      variant='outlined-dark'
      onClick={() => {
        setView('imageSection');
        setProgress(65);
      }}
    >
      Next
    </Button>
  </Form.Group>
);

LocationSection.propTypes = {
  setView: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default LocationSection;

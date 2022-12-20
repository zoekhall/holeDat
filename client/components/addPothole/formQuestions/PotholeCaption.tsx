/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const PotholeCaption = ({ handleCaption }) => {

  return (
      <Form.Group
        controlId='addPotCaption'
        className='mb-5'
        onChange={(e) => handleCaption((e.target as HTMLInputElement).value)} //changes caption in parent
      >
        <Form.Label> Describe Dat Pothole </Form.Label>
        <Form.Control as='textarea' required />
      </Form.Group>
  );
};

PotholeCaption.propTypes = {
  handleCaption: PropTypes.func.isRequired,
};

export default PotholeCaption;

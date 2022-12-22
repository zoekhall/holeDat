/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

//photo caption text-box
const PotholeCaption = ({ setCaption }) => (
  <Form.Group
    controlId='addPotCaption'
    className='mb-5'
    onChange={ (e) => setCaption((e.target as HTMLInputElement).value) } //changes caption in parent
  >
    <Form.Control as='textarea' required />
  </Form.Group>
);

PotholeCaption.propTypes = {
  setCaption: PropTypes.func.isRequired,
};

export default PotholeCaption;

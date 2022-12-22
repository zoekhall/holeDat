/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

//photo upload box
const PotholePic = ({ setFile }) => {

  return (
  <Form.Group
    controlId='uploadPotPhoto'
    className='mb-5'
    onChange={(e) => {
      //when a file is selected, set the file state to that photo object
      const event = e.target as HTMLInputElement;
      if (event.files !== null) {
        setFile(event.files[0]);
      }
    }}
  >
    <Form.Control type='file' required />
  </Form.Group>
)};

PotholePic.propTypes = {
  setFile: PropTypes.func.isRequired,
};

export default PotholePic;

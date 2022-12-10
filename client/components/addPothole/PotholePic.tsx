import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const PotholePic = ({ handleImage }) => {

  return (
    <>
      <Form.Group controlId='uploadPotPhoto' className='mb-5'>
        <Form.Label>Upload a Picture of the Pothole</Form.Label>
        <Form.Control type='file' required />
      </Form.Group>

      <Form.Group controlId='addPotCaption' className='mb-5' onChange={(e) => handleImage((e.target as HTMLInputElement).value)}>
        <Form.Label> Describe the Pothole </Form.Label>
        <Form.Control as='textarea' required />
      </Form.Group>
    </>
  );
};

PotholePic.propTypes = {
  handleImage: PropTypes.func.isRequired,
};

export default PotholePic









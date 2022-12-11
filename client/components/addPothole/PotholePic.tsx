/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const PotholePic = ({ handleImage }) => {

  return (
    <>
      <Form.Group
        controlId='uploadPotPhoto'
        className='mb-5'
        onChange={(e) => {
          const event = (e.target as HTMLInputElement);
          if(event.files !== null){
            handleImage(event.files[0], 'photoURL'); //changes photo in parent
          }
        }}
      >
        <Form.Label>Upload a Picture of the Pothole</Form.Label>
        <Form.Control type='file' required />
        {/* {updateImage} */}
      </Form.Group>

      <Form.Group
        controlId='addPotCaption'
        className='mb-5'
        onChange={(e) => handleImage((e.target as HTMLInputElement).value, 'caption')} //changes caption in parent
      >
        <Form.Label> Describe the Pothole </Form.Label>
        <Form.Control as='textarea' required />
      </Form.Group>
    </>
  );
};

PotholePic.propTypes = {
  handleImage: PropTypes.func.isRequired,
};

export default PotholePic;

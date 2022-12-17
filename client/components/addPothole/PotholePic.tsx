/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const PotholePic = ({handleImage}) => {

  const [file, setFile] = useState<any>(null);

  return (
    <>
      <Form.Group
        controlId='uploadPotPhoto'
        className='mb-5'
        onChange={(e) => {
          const event = e.target as HTMLInputElement;
          if (event.files !== null) {
            setFile(event.files[0]); 
          }
        }}
      >
        <Form.Label>Upload a Picture of Dat Pothole</Form.Label>
        <Form.Control type='file' required />
      </Form.Group>

      <Button type='button' variant='outlined-dark' onClick={() => handleImage(file)}>
        Add Photo
      </Button>
    </>
  );
};

PotholePic.propTypes = {
  handleImage: PropTypes.func.isRequired,
};

export default PotholePic;

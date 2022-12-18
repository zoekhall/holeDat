/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { InputGroup } from 'react-bootstrap';

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
        <InputGroup id='addPotLocation'>
          <Form.Control type='file' required />
          <div>
            <Button type='button' variant='outlined-dark' onClick={(e) => {
              e.currentTarget.disabled = true;
              handleImage(file)
            }}>
              Add Photo
            </Button>
          </div>
        </InputGroup>
      </Form.Group>
    </>
  );
};

PotholePic.propTypes = {
  handleImage: PropTypes.func.isRequired,
};

export default PotholePic;

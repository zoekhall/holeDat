/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';

const ImageSection = ({setView, setProgress} ) => (
  
  <Form.Group>
    <h2>Pothole Imagery</h2>
    <Form.Group>
      <Form.Label>Add A Picture of Dat Pothole</Form.Label>
      <PotholePic />
    </Form.Group>

    <Form.Group>
      <Form.Label>Describe Dat Pothole</Form.Label>
      <Form.Text className='text-muted'>
        What are some of the pothole's distinguishing characteristics?
      </Form.Text>
      <PotholeCaption />
    </Form.Group>
    <Button
      type='button'
      variant='outlined-dark'
      onClick={() => {
        setView('statusSection');
        setProgress(100);
      }}
    >
      Next
    </Button>
  </Form.Group>
);

ImageSection.propTypes = {
  setView: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
};

export default ImageSection;

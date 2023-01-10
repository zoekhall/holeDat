/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';
import Button from 'react-bootstrap/Button'

const ImageSection = (prop) => {
  const { handleClick } = prop;
  
  return(
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

    <Button id='nextFormButton' className='formButton' type='button' onClick={handleClick}>
      Next
    </Button>
  </Form.Group>
)};

export default ImageSection;

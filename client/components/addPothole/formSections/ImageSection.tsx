/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';
import Button from 'react-bootstrap/Button'

//image section view
const ImageSection = (prop) => {
  const { handleClick } = prop;

  return (
    <Form.Group>
      <Form.Group className='questionGroup'>
        <Form.Label className='formQuestion'>Add a picture of the pothole</Form.Label>
        <PotholePic />
      </Form.Group>

      <Form.Group className='questionGroup'>
        <Form.Label className='formQuestion line1'>Describe the pothole</Form.Label>
        <p className='formText'>What are the pothole's most distinguishing characteristics?</p>
        <PotholeCaption />
      </Form.Group>

      <Button id='nextFormButton' className='basicButton' type='button' onClick={handleClick}>
        <div className='center'>
          Next
          <div className='arrow-button arrow-right'></div>
        </div>
      </Button>
    </Form.Group>
  );};

export default ImageSection;

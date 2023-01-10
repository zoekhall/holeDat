/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';
import Button from 'react-bootstrap/Button'

const ImageSection = (prop) => {
  const { handleClick } = prop;

  return (
    <Form.Group>
      <Form.Group>
        <Form.Label className='formQuestion'>Add a picture of dat pothole</Form.Label>
        <PotholePic />
      </Form.Group>

      <Form.Group>
        <Form.Label className='formQuestion'>Describe dat pothole</Form.Label>
        <br/>
        <Form.Text className='formInfo'>
          What are some of the pothole's most distinguishing characteristics? <br />
          What should people be aware of with this pothole?
        </Form.Text>
        <PotholeCaption />
      </Form.Group>

      <Button id='nextFormButton' className='formButton' type='button' onClick={handleClick}>
        Next
      </Button>
    </Form.Group>
  );};

export default ImageSection;

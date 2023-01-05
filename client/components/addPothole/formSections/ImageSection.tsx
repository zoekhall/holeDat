/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';

const ImageSection = () => (
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

  </Form.Group>
);

export default ImageSection;

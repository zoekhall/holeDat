/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import PotholeRating from '../formQuestions/PotholeRating';
import PotholeStatus from '../formQuestions/PotholeStatus';

const StatusSection = (prop) => {
  const { handleSubmit } = prop; 

  return (
  <Form.Group>
    <Form.Group>
      <Form.Label>What Would You Rate Dat Dere Pothole?</Form.Label>
      <Form.Text className='text-muted'>Rate in cones the severity of the pothole </Form.Text>
      <PotholeRating />
    </Form.Group>

    <Form.Group>
      <Form.Label>Is Dat Pothole Fixed?</Form.Label>
      <PotholeStatus />
    </Form.Group>

    <Button id='nextFormButton' className='formButton' type='button' onClick={handleSubmit}>
      Next
    </Button>
  </Form.Group>
)};

export default StatusSection;

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
        <Form.Label className='formQuestion'>What would you rate the pothole?</Form.Label>
        <p className='formText'>
          Rate in cones the severity of the pothole with 5 cones indicating the most severe potholes
          and 1 cone indicating a pothole that is not hazardous.
        </p>
        <PotholeRating />
      </Form.Group>

      <Form.Group>
        <Form.Label className='formQuestion'>Is the Pothole Fixed?</Form.Label>
        <PotholeStatus />
      </Form.Group>

      <Button id='nextFormButton' className='basicButton' type='button' onClick={handleSubmit}>
        <div className='center' id='wtf'>
          Submit
          <div className='arrow-button arrow-right'></div>
        </div>
      </Button>
    </Form.Group>
  );};

export default StatusSection;

import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholeQuestions from './potholeQuestions/PotholeQuestions';


function AddPothole() {
  return (
    <Form>
      <div id='PotholeQuestions'>
        <h2>Lets Talk Pothole!</h2>
        <PotholeQuestions />
      </div>
    </Form>
  );
}

export default AddPothole;

import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import PotholeLocation from '../formQuestions/PotholeLocation';

const LocationSection = () => {
  const [submissionStatus, setSubmissionStatus] = useState<string>('notSubmitted')

  const handleSubmissionStatus = () => {
        if (submissionStatus === 'notInDB') {
          return <h4>notInDB</h4>;
        } else if(submissionStatus === 'inDB') {
          return <h4>inDB</h4>;
        } else {
          return <h4>notsubmitted</h4>
        }
  }

  return (
    <Form.Group>
      <h2>Pothole Basics</h2>

      <Form.Group>
        <Form.Label>Where Abouts is Dat Pothole Located?</Form.Label>
        {handleSubmissionStatus()}
        <PotholeLocation setSubmissionStatus={setSubmissionStatus} />
      </Form.Group>
    </Form.Group>
  );};

export default LocationSection;
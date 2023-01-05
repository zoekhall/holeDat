/* eslint-disable react/no-unescaped-entities */
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import PotholeLocation from '../formQuestions/PotholeLocation';

const LocationSection = (prop) => {
  const [submissionStatus, setSubmissionStatus] = useState<string>('notSubmitted')
  const { setView, view } = prop;

  const handleSubmissionStatus = () => {
    const submissionText =
      submissionStatus === 'notInDB'
        ? `Wow! You're Submitting a Brand New Pothole`
        : `This Pothole Already Has a Profile But It Still Needs Your Photo and Rating!`;
        if (submissionStatus === 'notInDB') {
          return (
            <div>
              <h4>{submissionText}</h4>
              <p>
                After Seeing it On the Map, If This is Not the Pothole You're Looking For, Click
                Below to Enter a New Pothole Address
              </p>
              <button onClick={() => {
                setView('Status');
                console.log(view)
              }}>Enter New Address</button>
            </div>
          );
        } else if(submissionStatus === 'inDB') {
          return <h4>inDB</h4>;
        } else {
          return null;
        }
  }

  return (
    <Form.Group>
      <h5>Time to Submit a Pothole to the Pothole Panoply!</h5>
      <p>Let's Start with the Pothole's Approximate Location</p>
      <br style={{ borderBottom: '1px dashed black' }}></br>
      
      <Form.Group>
        <Form.Label>Where Abouts is Dat Pothole Located?</Form.Label>
        <br></br>
        <Form.Text className='text-muted'>
          Enter the Address You Think is Closest to the Pothole
        </Form.Text>

        {handleSubmissionStatus()}
        <PotholeLocation setSubmissionStatus={setSubmissionStatus} />
      </Form.Group>
    </Form.Group>
  );};

export default LocationSection;
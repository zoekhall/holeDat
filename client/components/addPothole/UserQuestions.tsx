import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import PotholeRating from './potholeQuestions/PotholeRating';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function AddPothole() {
  return (
    <Form>
      <Row className='mb-5'>
        <Form.Group as={Col} controlId='addUserName'>
          <FloatingLabel label='Username'>
            <Form.Control type='text' placeholder='Enter username' />
          </FloatingLabel>
        </Form.Group>

        <Form.Group as={Col} controlId='addEmail'>
          <FloatingLabel label='Email Address'>
            <Form.Control type='email' placeholder='name@example.com' />
          </FloatingLabel>
        </Form.Group>
      </Row>

      <Form.Group controlId='uploadUserPhoto' className='mb-5'>
        <Form.Label> Upload Your Profile Picture </Form.Label>
        <Form.Control type='file' />
      </Form.Group>

      <Form.Group as={Col} controlId='addPotStatus' className='mb-5'>
        <Form.Label>What is the Status of the Pothole?</Form.Label>
        {['radio'].map((type) => (
          <div key={`inline-${type}`} className='mb-3'>
            <Form.Check inline label='Not Fixed' name='notFixed' type='radio' id='radio' />
            <Form.Check inline label='Fixed' name='Fixed' type='radio' id='fixed' />
          </div>
        ))}
      </Form.Group>

      <Form.Group controlId='uploadPotPhoto' className='mb-5'>
        <Form.Label>Upload a Picture of the Pothole</Form.Label>
        <Form.Control type='file' />
      </Form.Group>

      <Form.Group controlId='addPotCaption' className='mb-5'>
        <Form.Label> Describe the Pothole </Form.Label>
        <Form.Control as='textarea' />
      </Form.Group>

      <Form.Group className='mb-5' controlId='addPotLocation'>
        <Form.Label>What is the Approximate Location of the Pothole?</Form.Label>
        <Form.Control placeholder='1234 Main St' />
      </Form.Group>

      <Form.Group controlId='ratingPot' className='mb-5'>
        <Form.Label>Rate the Pothole</Form.Label>
        <div style={{ border: '2px solid black', display: 'flex', justifyContent: 'center' }}>
          <Row>
            <Form.Label as={Col}>Barely a Dent</Form.Label>
            <Form.Group
              as={Col}
              style={{ width: '200px', display: 'flex', justifyContent: 'center' }}
            >
              <PotholeRating />
            </Form.Group>
            <Form.Label as={Col}>Crater</Form.Label>
          </Row>
        </div>
      </Form.Group>

      <Button variant='outline-dark' type='submit'>
        Submit
      </Button>
    </Form>
  );
}

export default AddPothole;

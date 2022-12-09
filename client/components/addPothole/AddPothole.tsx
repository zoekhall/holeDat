import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function AddPothole() {
  return (
    <Form>
      <Row className='mb-5'>
        <Form.Group as={Col} controlId='addPotUserName'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' placeholder='Enter username' />
        </Form.Group>

        <Form.Group as={Col} controlId='addPotEmail'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control type='email' placeholder='name@example.com' />
        </Form.Group>

        <Form.Group as={Col} controlId='formFile'>
          <Form.Label>Upload Your Profile Picture</Form.Label>
          <Form.Control type='file' />
        </Form.Group>
      </Row>

      <Form.Group as={Col} controlId='addPotStatus' className='mb-5'>
        <Form.Label>What is the Status of the Pothole?</Form.Label>
        {['radio'].map((type) => (
          <div key={`inline-${type}`} className='mb-3'>
            <Form.Check inline label='Not Fixed' name='notFixed' type='radio' id='radio' />
            <Form.Check inline label='Fixed' name='Fixed' type='radio' id='fixed' />
          </div>
        ))}
      </Form.Group>

      <Form.Group controlId='addPotCaption' className='mb-5'>
        <Form.Label>Description of Pothole</Form.Label>
        <Form.Control as='textarea' rows={2} />
      </Form.Group>

      <Form.Group controlId='formFile' className='mb-5'>
        <Form.Label>Upload a Picture of the Pothole</Form.Label>
        <Form.Control type='file' />
      </Form.Group>

      <Button variant='outline-dark' type='submit'>
        Submit
      </Button>
    </Form>
  );
}

export default AddPothole;

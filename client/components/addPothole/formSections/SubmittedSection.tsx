/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

//submitted section view
const SubmittedSection = (prop) => {
  const { potholeId } = prop;

  return (
    <Container id='submit' className='formSectionView'>
      <h3> Pothole Submitted! </h3>
      <Container className='formView'>
        <h4>Report Pothole to NOLA Services</h4>
        <p className='xsmall'>
          3 questions are required to be filled out on the service form:
        </p>

        <ul className='submitList'>
          <li className='list'>
            <span>Request Type</span>: Select the 1st option 'Roads/Drainage'
          </li>
          <li className='list'>
            <span>Request Reason</span>: Select the 4th option 'Pothole'
          </li>
          <li className='list'>
            <span>Address/Location</span>: Input the address
          </li>
        </ul>
        <Button
          as='a'
          href='https://nola311.org/service-request/'
          target='_blank'
          className='basicButton'
        >
          Report
        </Button>
      </Container>
      <Row className='inlineButtons'>
        <Col className='submitButton text-center'>
          <Link to={'/Pothole:' + potholeId}>
            <Button className='basicButton'>Check Out Your Pothole</Button>
          </Link>
        </Col>
        <Col className='submitButton text-center'>
          <Link to='/AddPothole'>
            <Button className='basicButton'>Submit Another Pothole</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default SubmittedSection;

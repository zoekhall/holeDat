/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const WelcomeSection = (prop) => {
  const { handleClick } = prop;
  return (
    <Container className='formSectionView' id='welcomeSection'>
      <h3 className='formText headerText'>Time to Report a Pothole!</h3>
      <h4 className='formText subText'>
        Fill out this short form in order to submit a pothole to our database. <br/>
        Upon submission you will find further instructions on how to quickly report the pothole to
        the city as well!
      </h4>
      <Button className='formButton' id='reportButton' type='button' onClick={handleClick}>
        Report the Pothole
      </Button>
    </Container>
  );
};

export default WelcomeSection;

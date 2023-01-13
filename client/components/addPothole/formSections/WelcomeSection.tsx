/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const WelcomeSection = (prop) => {
  const { handleClick } = prop;
  return (
    <Container className='formSectionView' id='welcomeSection'>
      <h3>Time to Report a Pothole!</h3>
      <h4>
        Fill out this short form in order to submit a pothole to our database. All questions are required in order to submit.
      </h4>
      <h4>
        Upon submission you will find further instructions on how to quickly report the pothole to
        the city as well!
      </h4>
      <Button className='basicButton' id='reportButton' type='button' onClick={handleClick}>
        Report the Pothole
      </Button>
    </Container>
  );
};

export default WelcomeSection;

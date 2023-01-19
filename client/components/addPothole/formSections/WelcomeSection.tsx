import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

//welcome view
const WelcomeSection = (prop) => {
  const { handleClick } = prop;
  return (
    <Container className='formSectionView' id='welcomeSection'>
      <div className='text'>
      <h3 className='title'>Time to Report a Pothole!</h3>
      <h4>
        <span className='line1'>Fill out this short form in order to submit a pothole to our database.</span>
        <span className='line2 explicit'>All questions are required in order to submit.</span>
      </h4>
      </div>
      <Button
        className='basicButton'
        id='reportButton'
        type='button'
        onClick={handleClick}>
        Report the Pothole
      </Button>
    </Container>
  );
};

export default WelcomeSection;

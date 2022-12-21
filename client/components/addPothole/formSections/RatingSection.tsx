/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PotholeRating from '../formQuestions/PotholeRating';
import PropTypes from 'prop-types'

function RatingSection({ userId, createMasterObj, potholeId, handleSubmit }) {
  const ratingObj: { overall: number; pothole_id: number; user_id: number } = {
    overall: 0,
    pothole_id: potholeId,
    user_id: userId,
  };

  return (
    <Form.Group>
      <PotholeRating handleRating={(rating: number) => (ratingObj.overall = rating)} />
      <Button
        type='submit'
        variant='outlined-dark'
        onClick={() => {
          createMasterObj('ratingObj', ratingObj); //add pothole obj to master obj
          handleSubmit();
        }}
      >
        Submit
      </Button>
    </Form.Group>
  );
}

RatingSection.propTypes = {
  userId: PropTypes.number.isRequired,
  createMasterObj: PropTypes.func.isRequired,
  potholeId: PropTypes.number.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
export default RatingSection;

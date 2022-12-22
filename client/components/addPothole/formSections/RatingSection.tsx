/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PotholeRating from '../formQuestions/PotholeRating';
import PropTypes from 'prop-types'

function RatingSection({ handleSubmit, handleRating }) {
  return (
    <Form.Group>
      <PotholeRating handleRating={handleRating} />
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </Button>
    </Form.Group>
  );
}

RatingSection.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleRating: PropTypes.func.isRequired,
};
export default RatingSection;

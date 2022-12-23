/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PotholeRating from '../formQuestions/PotholeRating';
import PropTypes from 'prop-types'
import { ColorContext } from '../AddPothole';

function RatingSection({ handleSubmit, handleRating }) {
    const contextOfColor = useContext(ColorContext);

  return (
    <Form.Group>
      <PotholeRating handleRating={handleRating} />
      <h1 style={{color: contextOfColor?.color}}>HIIIII</h1>
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

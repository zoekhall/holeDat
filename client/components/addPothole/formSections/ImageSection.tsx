/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'
import axios from 'axios';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';


function ImageSection({ setView, setProgress, handleCaption, handleImageURL }) {
  //add image to cloud
  const handleImageToCloud = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    if (formData) {
      axios({
        method: 'post',
        url: '/api/imgs/addimg',
        data: formData,
      })
        .then(({data}) => handleImageURL(data))
        .catch((err) => console.error('Failure to Submit Image to Cloud', err));
    }
  };

  return (
    <Form.Group>
      <h2>Pothole Imagery</h2>
      <Form.Group>
        <Form.Label>Add A Picture of Dat Pothole</Form.Label>
      <PotholePic handleImage={(file) => handleImageToCloud(file)} />
      </Form.Group>

      <Form.Group><Form.Label></Form.Label>
      <PotholeCaption handleCaption={handleCaption} />
      </Form.Group>
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          setView('ratingSection');
          setProgress(100);
        }}
      >
        Next
      </Button>
    </Form.Group>
  );
}

ImageSection.propTypes = {
  setView: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  handleCaption: PropTypes.func.isRequired,
  handleImageURL: PropTypes.func.isRequired,
};

export default ImageSection;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types'
import axios from 'axios';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';


function ImageSection({ userId, createMasterObj, potholeId, setView }) {
  const imgObj: { photoURL: string; caption: string; pothole_id: number; user_id: number } = {
    photoURL: '',
    caption: '',
    user_id: userId,
    pothole_id: potholeId,
  };

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
        .then((data) => (imgObj.photoURL = data.data))
        .catch((err) => console.error('Failure to Submit Image to Cloud', err));
    }
  };

  return (
    <Form.Group>
      <PotholeCaption handleCaption={(val: string) => (imgObj.caption = val)} />
      <PotholePic handleImage={(file) => handleImageToCloud(file)} />
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          createMasterObj('imgObj', imgObj); //add pothole obj to master obj
          setView('ratingSection');
        }}
      >
        Next
      </Button>
    </Form.Group>
  );
}

ImageSection.propTypes = {
  userId: PropTypes.number.isRequired,
  createMasterObj: PropTypes.func.isRequired,
  potholeId: PropTypes.number.isRequired,
  setView: PropTypes.func.isRequired, 
};

export default ImageSection;

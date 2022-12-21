/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
// import PotholeStatus from './formQuestions/PotholeStatus';
// import PotholeLocation from './formQuestions/PotholeLocation';
import PotholePic from './formQuestions/PotholePic';
import Button from 'react-bootstrap/Button';
import PotholeRating from './formQuestions/PotholeRating';
import axios from 'axios';
import PotholeCaption from './formQuestions/PotholeCaption';
// import PotholeBasics from './formSections/PotholeBasicsSection';

function ImageSection() {

  const imgObj: { photoURL: string; caption: string; pothole_id: number; user_id: number } = {
    photoURL: '',
    caption: '',
    user_id: 0,
    pothole_id: 0,
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

  //add image to database
  const handleImageSubmit = () => {
    axios({
      method: 'post',
      url: '/api/imgs/postImg',
      data: imgObj,
    }).catch((err) => console.error('Failure to Submit Image', err));
  };

  return (
    <Form.Group >

      <PotholeCaption handleCaption={(val: string) => (imgObj.caption = val)} />
      <PotholePic handleImage={(file) => handleImageToCloud(file)} />

      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          handleImageSubmit();
        }}
      >
      </Button>
    </Form.Group>
  );
}

export default ImageSection;

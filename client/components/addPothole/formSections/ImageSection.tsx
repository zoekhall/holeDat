/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import PotholePic from '../formQuestions/PotholePic';
import PotholeCaption from '../formQuestions/PotholeCaption';
import { ColorContext } from '../AddPothole';
/*!
Add pothole to the database - retrieve id --- id needs to be attached to image and to rating
Add image to cloud 
Add image to database
Add rating and status to database 
*/

function ImageSection({ setImgObj, setView, setProgress }) {
  const [file, setFile] = useState<any>(null);
  const contextOfColor = useContext(ColorContext)

  const imgObj: { photoURL: string; caption: string; pothole_id: number; user_id: number } = {
  photoURL: '',
  caption: '',
  pothole_id: 0,
  user_id: 0,
}
  // const [photoURL, setPhotoURL] = useState<string>('TEST');

  //add image to cloud
  const handleImageToCloud = () => {
    const formData = new FormData();
    formData.append('file', file);
    if (formData) {
      axios({
        method: 'post',
        url: '/api/imgs/addimg',
        data: formData,
      })
        .then(({ data }) => {
          imgObj.photoURL = data
        }
        )
        .catch((err) => console.error('Failure to Submit Image to Cloud', err));
    }
  };

  return (
    <Form.Group>
      <h2 style={{color: contextOfColor?.color}}>Pothole Imagery</h2>
      <Form.Group>
        <Form.Label>Add A Picture of Dat Pothole</Form.Label>
        <PotholePic setFile={(file) => setFile(file)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Describe Dat Pothole</Form.Label>
        <Form.Text className='text-muted'>
          What are some of the pothole's distinguishing characteristics?
        </Form.Text>
        <PotholeCaption setCaption={(caption) => imgObj.caption = caption} />
      </Form.Group>
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          handleImageToCloud(); //add image to the cloud 
          setImgObj(imgObj)
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
  setImgObj: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
};

export default ImageSection;

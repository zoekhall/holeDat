/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PotholeStatus from './PotholeStatus';
import PotholeLocation from './PotholeLocation';
import PotholePic from './PotholePic';
import Button from 'react-bootstrap/Button';
import PotholeRating from './PotholeRating';
import axios from 'axios';
import PotholeCaption from './PotholeCaption';

function AddPothole() {
  const potObj: { fixed: boolean; lat: number; lon: number } = {
    fixed: false,
    lat: 0,
    lon: 0,
  };

  const ratingObj: { overall: number; pothole_id: number; user_id: number } = {
    overall: 0,
    pothole_id: 0,
    user_id: 0,
  };

  const imgObj: { photoURL: string; caption: string; pothole_id: number; user_id: string } = {
    photoURL: '',
    caption: '',
    pothole_id: 0,
    user_id: '',
  };

  //get user and add to img and rating objects
  useEffect(() => {
    axios
      .get('/api/user/me')
      .then((data) => {
        imgObj.user_id = data.data.user_id;
        ratingObj.user_id = data.data.user_id;
      })
      .catch((err) => console.error('Failure to Get User', err));
  }, []);

  //add pothole to database and assign potholeId
  const handlePotholeSubmit = () => {
    axios({
      method: 'post',
      url: '/api/pothole/addPothole',
      data: potObj,
    })
      .then((data) => {
        ratingObj.pothole_id = data.data.pothole_id;
        imgObj.pothole_id = data.data.pothole_id;
      })
      .catch((err) => console.error('Failure to Submit Pothole', err));
  };

  //add rating to database
  const handleRatingSubmit = () => {
    axios({
      method: 'post',
      url: '/api/rating/addRating',
      data: ratingObj,
    }).catch((err) => console.error('Failure to Submit Rating', err));
  };
  
  const handleImageSubmit = (file) => {
    const formData = new FormData();
    formData.append('file', file);

    if (formData) {
      axios({
        method: 'post',
        url: '/api/imgs/addimg',
        data: formData,
      })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  };

  return (
    <Form id='addPothole'>
      <h1>Report a Pothole</h1>
      <div>What are the Basics?</div>
      <PotholeLocation
        handleLocation={(lat: number, lon: number) => {
          potObj.lat = lat;
          potObj.lon = lon;
        }}
      />
      <PotholeStatus handleStatus={(newStatus: boolean) => (potObj.fixed = newStatus)} />
      <Button type='button' variant='outlined-dark' onClick={handlePotholeSubmit}>
        Confirm Basic Pothole Information
      </Button>

      <div>What Does It Look Like?</div>
      <PotholeCaption handleCaption={(val: string) => (imgObj.caption = val)} />
      <PotholePic handleImage={file => handleImageSubmit(file)} />

      <div>What Do You Rate It?</div>
      <PotholeRating handleRating={(rating: number) => (ratingObj.overall = rating)} />
      <Button type='button' variant='outlined-dark' onClick={() => {
        handleRatingSubmit(); 
      }}>
        {/* add type='submit' attribute when ready for action */}
        Submit
      </Button>
    </Form>
  );
}

//Split up into three sections
//Pothole Basics
//Add Pothole Image
//Rate Pothole

export default AddPothole;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import PotholeStatus from './PotholeStatus';
import PotholeLocation from './PotholeLocation';
import PotholePic from './PotholePic';
import Button from 'react-bootstrap/Button';
import PotholeRating from './PotholeRating';
import axios from 'axios';

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

  const imgObj: { file: string; photoObj: { caption: string;  pothole_id: number; user_id: number} } = {
    file: '',
    photoObj: {
      caption: '',
      pothole_id: 0,
      user_id: 0,
    }
  };


  //get user and add to img and rating objects
  useEffect(() => {
    axios
      .get('/api/user/me')
      .then((data) => {
        imgObj.photoObj.user_id = data.data.user_id;
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
        imgObj.photoObj.pothole_id = data.data.pothole_id;
      })
      .catch((err) => console.error('Failure to Submit Pothole', err));
  };
  
  //add rating to database
  const handleRatingSubmit = () => {
    axios({
      method: 'post',
      url: '/api/rating/addRating',
      data: ratingObj,
    })
      .catch((err) => console.error('Failure to Submit Rating', err));
  };

  //add image to database
  const handleImageSubmit = () => {
    const formData = new FormData();
    formData.append('file', imgObj.file);

    if (formData) {
      axios({
        method: 'post',
        url: '/api/imgs/addimg',
        data: imgObj,
      })
        .catch((err) => console.log('Failure to Submit Image', err));
    }
  };

  const handleGeneralSubmit = () => {
    handleRatingSubmit();
    handleImageSubmit(); //send data to cloud

    console.log('potObj', potObj, 'img', imgObj, 'score', ratingObj);
  };

  return (
    <Form id='addPothole'>
      <h1>Report a Pothole</h1>
      <br></br>
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
      <PotholePic handleImage={(val: any, type: string) => (imgObj[type] = val)} />
      <PotholeRating handleRating={(rating: number) => (ratingObj.overall = rating)} />
      <Button type='button' variant='outlined-dark' onClick={handleGeneralSubmit}>
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholeStatus from './PotholeStatus';
import PotholeLocation from './PotholeLocation';
import PotholePic from './PotholePic';
import Button from 'react-bootstrap/Button';
import PotholeRating from './PotholeRating';
import axios from 'axios';

//    "start": "react-scripts start"

function AddPothole() {
  //objs to be be sent to database
  const potObj: { fixed: boolean; lat: number; lon: number } = {
    fixed: false,
    lat: 0,
    lon: 0,
  };

  const imgObj: { photoURL: string; caption: string; pothole_id: number } = {
    photoURL: '',
    caption: '',
    pothole_id: 0,
  };

  const ratingObj: { overall: number; user_id: string, pothole_id: number } = {
    overall: 0,
    user_id: 'pending',
    pothole_id: 0,
  };

  //updating objects with filled out information
  const updateLocation = (lat: number, lon: number) => {
    potObj.lat = lat;
    potObj.lon = lon;
  };

  const updatePotStatus = (newStatus: boolean) => {
    potObj.fixed = newStatus;
  };

  const updateImage = (val: any, type: string) => {
    imgObj[type] = val;
  };

  const updateRating = (rating: number) => {
    ratingObj.overall = rating;
    console.log(ratingObj);
  };

  //const [potholeId, setPotholeId] = useState<number>(0);

  const handlePotholeSubmit = () => {
    axios
      .post('/api/pothole/addPothole')
      .then((data) => console.log(data.data))
      .catch((err) => console.error(err));
  };

  //SUCCESSSSS
  // //photo file func
  // const sendData = (file) => {
  //   const formData = new FormData();
  //   formData.append('file', file);

  //   if (formData) {
  //     axios({
  //       method: 'post',
  //       url: '/api/imgs/addimg',
  //       data: formData,
  //     })
  //       .then((data) => console.log(data))
  //       .catch((err) => console.log(err));
  //   }
  // };
  //   if (formData) {
  //     axios({
  //       method: 'post',
  //       url: '/api/imgs/addimg',
  //       data: formData,
  //     })
  //       .then((data) => console.log(data))
  //       .catch((err) => console.log(err));
  //   }
  // };

  const handleSubmit = () => {
    handlePotholeSubmit();

    console.log(potObj, imgObj, ratingObj);
    // sendData(imgObj.photoURL); //send data to cloud
  };

  return (
    <Form id='addPothole'>
      <h1>Report a Pothole</h1>
      <br></br>
      <PotholeLocation handleLocation={(lat, lon) => updateLocation(lat, lon)} />
      <PotholeStatus handleStatus={(newStatus) => updatePotStatus(newStatus)} />
      <PotholePic handleImage={(val, type) => updateImage(val, type)} />
      <PotholeRating handleRating={(rating) => updateRating(rating)} />
      <Button type='submit' variant='outlined-dark' onClick={handleSubmit}>
        {/* add type='submit' attribute when ready for action */}
        Submit
      </Button>
    </Form>
  );
}

export default AddPothole;

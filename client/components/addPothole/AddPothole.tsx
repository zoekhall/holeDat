import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholeStatus from './PotholeStatus';
import PotholeLocation from './PotholeLocation';
import PotholePic from './PotholePic';
import Button from 'react-bootstrap/Button'
import PotholeRating from './PotholeRating';
import axios from 'axios';


function AddPothole() {

  //objs to be be sent to database
  const potObj: { fixed: boolean, lat: number, lon: number } = {
    fixed: false,
    lat: 0,
    lon: 0
  };

  const imgObj: { photoURL: string, caption: string } = {
    photoURL: '', 
    caption: ''
  }
  
  const ratingObj: { overall: number } = {
    overall: 0
  };
  
  //updating objects with filled out information 
  const updatePotStatus = (newStatus: boolean) => {
    potObj.fixed = newStatus;
  }

  const updateImage = (val: any, type: string) => {
    imgObj[type] = val; 
    console.log(imgObj)
  }

  const updateRating = (rating: number) => {
    ratingObj.overall = rating; 
    console.log(ratingObj);
  }

  //photo file func
    const sendData = (file) => {
      const formData = new FormData();
      formData.append('file', file);

      if (formData) {
        axios({
          method: 'post',
          url: '/api/imgs/addimg',
          data: formData,
        })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }
    };

    const handleSubmit = () => {
      console.log('hey')
      sendData(imgObj.photoURL); //send data to cloud
    }

  
  return (
    <div style={{ border: '1px solid lightgray', padding: '100px', backgroundColor: 'white' }}>
      <Form>
        <div id='PotholeQuestions'>
          <h2>Report a Pothole</h2>
          <br></br>
          <PotholeLocation />
          <PotholeStatus handleStatus={(newStatus) => updatePotStatus(newStatus)} />
          <PotholePic handleImage={(val, type) => updateImage(val, type)} />
          <PotholeRating handleRating={(rating) => updateRating(rating) } />
        </div>
        <Button type='submit' variant='outlined-dark' onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPothole;
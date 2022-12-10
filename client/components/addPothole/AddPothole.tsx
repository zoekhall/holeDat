import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholeStatus from './PotholeStatus';
import PotholeLocation from './PotholeLocation';
import PotholePic from './PotholePic';
import Button from 'react-bootstrap/Button'
import PotholeRating from './PotholeRating';


function AddPothole() {

  const potObj: { fixed: boolean, lat: number, lon: number } = {
    fixed: false,
    lat: 0,
    lon: 0
  };

  const imgObj: { photoURL: string, caption: string } = {
    photoURL: '', 
    caption: ''
  }
  
  const updatePotStatus = (newStatus: boolean) => {
    potObj.fixed = newStatus;
  }

  const updateImage = (caption: string) => {
    imgObj.photoURL = '';
    imgObj.caption = caption;
  }

  
  return (
    <div style={{ border: '1px solid lightgray', padding: '100px', backgroundColor: 'white' }}>
      <Form>
        <div id='PotholeQuestions'>
          <h2>Report a Pothole</h2>
          <br></br>
          <PotholeLocation />
          <PotholeStatus handleStatus={(newStatus) => updatePotStatus(newStatus)} />
          <PotholePic handleImage={(caption) => updateImage(caption)} />
          <PotholeRating />
        </div>
        <Button type='submit' variant='outlined-dark'>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AddPothole;
import React from 'react';
import Form from 'react-bootstrap/Form';
import PotholeStatus from './PotholeStatus';
import PotholeLocation from './PotholeLocation';
import PotholePic from './PotholePic';
import Button from 'react-bootstrap/Button'
import PotholeRating from './PotholeRating';


function AddPothole() {

  const potholeObj: { fixed: boolean, lat: number, lon: number } = {
    fixed: false,
    lat: 0,
    lon: 0
  };
  
  const updateStatus = (newStatus) => {
    potholeObj.fixed = newStatus;
      console.log(potholeObj);
  }

  
  return (
    <div style={{border: '1px solid lightgray', padding: '100px', backgroundColor: 'white'}}>
      <Form>
        <div id='PotholeQuestions'>
          <h2>Report a Pothole</h2>
          <br></br>
          <PotholeLocation/>
          <PotholeStatus handleStatusChange={(newStatus) => updateStatus(newStatus)} />
          <PotholePic />
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
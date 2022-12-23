import React from 'react';
// import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholeStatus from '../formQuestions/PotholeStatus';

const LocationSection = ({ setView, setPotObj, setProgress }) => {
  const potObj: { fixed: boolean; lat: number; lon: number } = {
    fixed: false,
    lat: 0,
    lon: 0,
  };

  return (
    <Form.Group>
      <h2>Pothole Basics</h2>
      <Form.Group>
        <Form.Label>Where Abouts is Dat Pothole Located?</Form.Label>
        <PotholeLocation
          handleLocation={(lat: number, lon: number) => { //sets pothole lat and lon
            potObj.lat = lat;
            potObj.lon = lon;
          }}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Is Dat Pothole Fixed?</Form.Label>
        <PotholeStatus
          handleStatus={(newStatus: boolean) => (potObj.fixed = newStatus)} //sets pothole status
        />
      </Form.Group>
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          // checkPotholeExistence(); //see if pothole exists and setView / potentialPotholes
          setPotObj(potObj); //add pothole obj to master obj
          setView('imageSection');
          setProgress(65);
        }}
      >
        Next
      </Button>
    </Form.Group>
  );
};

LocationSection.propTypes = {
  setView: PropTypes.func.isRequired,
  setPotObj: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  // setPotentialPotholes: PropTypes.func.isRequired,
};

export default LocationSection;

//STORAGE
  //FIND POTOBJ, if potobj exists - return status 'checkPothole' - else - return status 'image'
  // const checkPotholeExistence = () => {
  //   axios
  //     .request({
  //       method: 'POST',
  //       url: '/api/pothole/findPothole',
  //       data: potObj,
  //       // }).then(() => {
  //       // setPotentialPotholes(data);
  //       // if(data.length > 0){
  //       //   setView('checkPothole')
  //       // }
  //     })
  //     .catch((err) => console.error(err));
  // };

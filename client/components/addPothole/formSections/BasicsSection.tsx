import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholeStatus from '../formQuestions/PotholeStatus';

const BasicsSection = ({ setView, createMasterObj }) => {
  const potObj: { fixed: boolean; lat: number; lon: number } = {
    fixed: false,
    lat: 0, 
    lon: 0,
  };

  //FIND POTOBJ, if potobj exists - return status 'checkPothole' - else - return status 'image'
  const checkPotholeExistence = () => {
    axios.request({
      method: 'POST', 
      url: '/api/pothole/findPothole',
      data: potObj
    // }).then(() => {
      // setPotentialPotholes(data);
      // if(data.length > 0){
      //   setView('checkPothole') 
      // } 
    })
    .catch(err => console.error(err))
  }

  return (
    <Form.Group>
      <PotholeLocation 
        //sets pothole lat and lon
        handleLocation={(lat: number, lon: number) => {
          potObj.lat = lat;
          potObj.lon = lon;
        }}
      />
      <PotholeStatus
        //sets pothole status
        handleStatus={(newStatus: boolean) => (potObj.fixed = newStatus)} />
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          checkPotholeExistence(); //see if pothole exists and setView / potentialPotholes
          createMasterObj('potObj', potObj); //add pothole obj to master obj
          setView('imageSection');
        }}
      >
        Next
      </Button>
    </Form.Group>
  );
};

BasicsSection.propTypes = {
  setView: PropTypes.func.isRequired,
  createMasterObj: PropTypes.func.isRequired,
  // setPotentialPotholes: PropTypes.func.isRequired,
};

export default BasicsSection;

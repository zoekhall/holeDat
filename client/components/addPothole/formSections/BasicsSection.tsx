import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholeStatus from '../formQuestions/PotholeStatus';

const PotholeBasics = ({ setView, createMasterObj, setPotentialPotholes }) => {
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
    }).then(({data}) => {
      setPotentialPotholes(data);
      if(data.length > 0){
        setView('checkPothole')
      } else {
        setView('imageSection')
      }
    })
  }

  return (
    <Form.Group>
      {/* Contains Map Address Input and LatLon Conversion Button */}
      <PotholeLocation 
        //sets pothole lat and lon
        handleLocation={(lat: number, lon: number) => {
          potObj.lat = lat;
          potObj.lon = lon;
        }}
      />

      {/* Contains Pothole Status Input */}
      <PotholeStatus
        //sets pothole status
        handleStatus={(newStatus: boolean) => (potObj.fixed = newStatus)} />
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          console.log(potObj);
          checkPotholeExistence(); //see if pothole exists 
          createMasterObj('potObj', potObj); //add pothole obj to master obj
        }}
      >
        Next
      </Button>
    </Form.Group>
  );
};

PotholeBasics.propTypes = {
  setView: PropTypes.func.isRequired,
  createMasterObj: PropTypes.func.isRequired,
  setPotentialPotholes: PropTypes.func.isRequired,
};

export default PotholeBasics;

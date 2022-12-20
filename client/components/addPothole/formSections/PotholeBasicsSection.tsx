import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholeStatus from '../formQuestions/PotholeStatus';

const PotholeBasics = ({ assignPotholeId }) => {
  const [potholeId, setPotholeId] = useState<number>(0);

  const potObj: { fixed: boolean; lat: number; lon: number } = {
    fixed: false,
    lat: 0,
    lon: 0,
  };

  //Handles pothole submit - pothole is found, prompt is returned. Pothole is not found, pothole is created
  const handlePotholeSubmit = () => {
    axios({
      method: 'post',
      url: '/api/pothole/addPothole',
      data: potObj,
    })
      .then(({data}) => {
        setPotholeId(data.data.pothole_id); //sets state to returned number]
        potholeCreationResponse(data.status)
      })
      .catch((err) => console.error('FAILURE TO ADD/RETRIEVE POTHOLE', err));
  };

  const creationResponse = (status) => {
    if (status ==== 'alreadyExists') {
      return 'hi'
    }
  }

  return (
    <Form.Group>
      {/* Contains Map Address Input and LatLon Conversion Button */}
      <PotholeLocation
        //pothole location is set
        handleLocation={(lat: number, lon: number) => {
          potObj.lat = lat;
          potObj.lon = lon;
        }}
      />
      <div>{creationResponse}</div>
      {/* Contains Pothole Status Input */}
      <PotholeStatus handleStatus={(newStatus: boolean) => (potObj.fixed = newStatus)} />
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          handlePotholeSubmit();
          assignPotholeId(potholeId); //sets the pothole id in the main form component
        }}
      >Test</Button>
    </Form.Group>
  );
};

PotholeBasics.propTypes = {
  assignPotholeId: PropTypes.func.isRequired,
};

export default PotholeBasics;

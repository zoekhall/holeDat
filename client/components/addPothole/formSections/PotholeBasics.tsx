/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PotholeStatus from '../formQuestions/PotholeStatus';
import PotholeLocation from '../formQuestions/PotholeLocation';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import FormMapView from './Map/FormMapView';
import PropTypes from 'prop-types'
// import axios from 'axios';

// import { Last } from 'react-bootstrap/esm/PageItem';
// import axios from 'axios';

const PotholeBasics = ({ potObj }) => {
  

  return (
    <Container className='formSection'>
      <div>What are the Basics?</div>
      <PotholeLocation
        handleLocation={(lat: number, lon: number) => {
          potObj.lat = lat;
          potObj.lon = lon;
        }}
      />
      <FormMapView></FormMapView>
      <PotholeStatus handleStatus={(newStatus: boolean) => (potObj.fixed = newStatus)} />
      <Button type='button' variant='outlined-dark'>
        Confirm Basic Pothole Information
      </Button>
    </Container>
  );
};

PotholeBasics.propTypes = {
  potObj: PropTypes.object.isRequired,
};

export default PotholeBasics;

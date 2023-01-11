/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholePlot from '../formQuestions/PotholeMap';
import { LocationContext } from '../AddPothole';
import { Button } from 'react-bootstrap';

const LocationSection = (prop) => {
  const [sectionView, setSectionView] = useState<string>('initialView');
  const [pothole_id, setPothole_id] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const { coordinates } = useContext(LocationContext);
  const { handleClick } = prop;

  const handleLocationView = () => {
    if (sectionView === 'initialView') {
      return (
        <Form.Group>
          <Form.Label className='formQuestion'>What address is dat pothole located at?</Form.Label>
          <br/>
          <Form.Text className='formInfo'>
            Input the address and click on the full address when you see it appear.
            <br/>
            Then 'Confirm the Pothole Address' by clicking the button.
          </Form.Text>
          <PotholeLocation
            setSectionView={setSectionView}
            setPothole_id={setPothole_id}
            setLocation={setLocation}
            location={location}
            setZip={setZip}
            zip={zip}
          />
        </Form.Group>
      );
    }
    return (
      <div>
        <h3 className='formText headerText'>
          {sectionView === 'newPothole'
            ? `You're Submitting a New Pothole at ${location}!`
            : `This Pothole Has a Profile at ${location}`}
        </h3>
        <h4 className='formText subText'>
          {sectionView === 'newPothole'
            ? ''
            : "And it needs your input! Click next to add your photo and rating to the pothole. If you'd like to check out this pothole's profile, you can click on the marker/pothole picture. You will be directed to the profile but be aware you will have to restart the form"}
        </h4>
        <PotholePlot coordinates={coordinates} pothole_id={pothole_id} />

        <div id='buttons'>
          <Button 
            className='Button genFormButton'
            onClick={() => {
              setLocation('');
              setZip('');
              setSectionView('initialView');
            }}
          >
            Enter New Address if Needed
          </Button>
          <br></br>
          <Button id='nextFormButton' className='formButton' type='button' onClick={handleClick}>
            Next
          </Button>
        </div>
      </div>
    );
  };

  return <Form.Group>{handleLocationView()}</Form.Group>;
};

export default LocationSection;

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
  const { coordinates } = useContext(LocationContext);
  const { handleClick } = prop;

  const handleLocationView = () => {
    if (sectionView === 'initialView') {
      return (
        <Form.Group>
          <Form.Label className='formQuestion'>What address is the pothole located at?</Form.Label>
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
          />
        </Form.Group>
      );
    }
    return (
      <div>
        <h3 className='formText'>
          {sectionView === 'newPothole'
            ? `Wow! You're Submitting a Brand New Pothole at ${location}!`
            : 'This Pothole Already Has a Profile and Needs Your Input!'}
        </h3>
        <h4 className='formText'>
          {sectionView === 'newPothole'
            ? ''
            : "If you'd like to check out its pothole profile, you can click on the marker/pothole picture. You will be directed to the profile and will have to restart the form"}
        </h4>
        <PotholePlot coordinates={coordinates} pothole_id={pothole_id} />

        <div id='buttons'>
          <Button 
            className='formButton genFormButton'
            onClick={() => {
              setLocation('');
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

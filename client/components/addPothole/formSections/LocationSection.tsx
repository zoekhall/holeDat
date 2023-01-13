/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholePlot from '../formQuestions/PotholeMap';
import { LocationContext } from '../AddPothole';

const LocationSection = (prop) => {
  const [sectionView, setSectionView] = useState<string>('initialView');
  const [pothole_id, setPothole_id] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const { coordinates } = useContext(LocationContext);
  const { handleClick } = prop;

  //handling which section is showed: initial view vs pothole result views
  const handleLocationView = () => {
    if (sectionView === 'initialView') {
      return (
        <Form.Group>
          <Form.Label className='formQuestion'>Where's the pothole located?</Form.Label>
          <p className='formText'>
            Input an approximate address for the pothole. Click on full address when you see it appear.
          </p>
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
      <div id='mapFormSection'>
        <h3 className='header'>
          {' '}
          {sectionView === 'newPothole'
            ? `New Pothole At ${location}!`
            : `Pothole Found At ${location}!`}{' '}
        </h3>
        <p className='formText'>
          {' '}
          {sectionView === 'newPothole'
            ? ''
            : 'Check out its profile by clicking on the marker/pothole picture. You will be directed to the profile but will have to restart the form.'}
        </p>
        <PotholePlot coordinates={coordinates} pothole_id={pothole_id} />
        <div id='buttons'>
          <Button
            id='resubmitFormButton'
            className='basicButton'
            type='button'
            onClick={() => {
              setLocation('');
              setZip('');
              setSectionView('initialView');
            }}
          >
            <div className='center'>
              <div className='arrow-button arrow-left'></div>
              Resubmit
            </div>
          </Button>

          <Button
            id='nextFormButton'
            className='basicButton'
            type='button'
            onClick={handleClick}>
            <div className='center' id='wtf'>
              Next
              <div className='arrow-button arrow-right'></div>
            </div>
          </Button>
        </div>
      </div>
    );
  };

  return <Form.Group>{handleLocationView()}</Form.Group>;
};

export default LocationSection;

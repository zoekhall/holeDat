import React, { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholeMap from '../formQuestions/PotholeMap';
import { LocationContext } from '../AddPothole';

//location section view
const LocationSection = (prop) => {
  const [sectionView, setSectionView] = useState<string>('initialView');
  const [pothole_id, setPothole_id] = useState<number>(0);
  const [location, setLocation] = useState<string>('');
  const [zip, setZip] = useState<string>('');
  const { coordinates } = useContext(LocationContext);
  const { handleClick } = prop;

  //handling which section is showed: initial view vs pothole result views
  const handleLocationView = () => {
    if (sectionView === 'initialView') { //initial view
      return (
        <Form.Group className='questionGroup'>
          <Form.Label className='formQuestion'>Where is the pothole located?</Form.Label>
          <p className='formText'>
            <span className='newline'>Input an approximate address.</span>
            <span className='italic xsmall line2'>Click on the full address when it appears.</span>
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
      //the two potential result views
      <Container id='mapFormSection'>
        {sectionView === 'newPothole' ? (
          <h3 className='title'>
            New Pothole At&nbsp;<span className='newline italic'>{location}</span>
          </h3>
        ) : (
          <h3 className='title'>
            Pothole Found At&nbsp;<span className='newline italic'>{location}</span>
          </h3>
        )}
        {sectionView === 'newPothole' ? null : (
          <p className='formText xsmall explicit'>
            If you want to check out the profile, click the picture. You will have
            to restart the form.
          </p>
        )}
        <PotholeMap coordinates={coordinates} pothole_id={pothole_id} />
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
            onClick={() => handleClick()}
          >
            <div className='center'>
              Next
              <div className='arrow-button arrow-right'></div>
            </div>
          </Button>
        </div>
      </Container>
    );
  };

  return <Form.Group>{handleLocationView()}</Form.Group>;
};

export default LocationSection;

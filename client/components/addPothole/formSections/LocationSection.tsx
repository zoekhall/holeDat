/* eslint-disable react/no-unescaped-entities */
import React, {useContext, useState} from 'react';
import Form from 'react-bootstrap/Form';
import PotholeLocation from '../formQuestions/PotholeLocation';
import PotholePlot from '../formQuestions/PotholeMap';
import { LocationContext } from '../AddPothole';

const LocationSection = () => {
  const { coordinates } = useContext(LocationContext);
  const [sectionView, setSectionView] = useState<string>('initialView');
  const [pothole_id, setPothole_id] = useState<number>(0);
  const [location, setLocation] = useState<string>(''); //stores address from input form

  const handleLocationView = () => {
    if (sectionView === 'initialView') {
      return (
        <Form.Group>
          <Form.Text className='text-muted'>
            Enter the Address You Think is Closest to the Pothole
          </Form.Text>
          <PotholeLocation setSectionView={setSectionView} setPothole_id={setPothole_id} setLocation={setLocation} location={location} />
        </Form.Group>
      );
    } else {
      return (
        <div>
          <h4>
            {sectionView === 'newPothole'
              ? `Wow! You're Submitting a Brand New Pothole at ${location}!`
              : 'This Pothole Already Has a Profile But Needs Your Input!'}
          </h4>
          <p>
            {sectionView === 'newPothole'
              ? ''
              : "If you'd like to check out its pothole profile, you can click on the marker/pothole picture. You will be directed to the profile and will have to restart the form"}
          </p>
          <PotholePlot coordinates={coordinates} pothole_id={pothole_id} />
          <button
            onClick={() => {
              setSectionView('initialView');
            }}
          >
            Enter New Address
          </button>
        </div>
      );
    }
  };

  return (
    <Form.Group>
      <Form.Group>
        <Form.Label>Where Abouts is Dat Pothole Located?</Form.Label>
        {handleLocationView()}
      </Form.Group>
    </Form.Group>
  );
};

export default LocationSection;

import React, {useEffect, useState} from 'react';
import Form from 'react-bootstrap/Form';
import PotholeLocation from '../formQuestions/PotholeLocation';

const LocationSection = () => {
  // const { coordinates, setCoordinates } = useContext(LocationContext) //set coordinates using AddPothole LocationContext
  // const isMounted = useRef(false);
  const [pothole_id, setPothole_id] = useState<number>(0);

  useEffect(() => {
console.log(pothole_id)
  }, [pothole_id])
  
  return (
  <Form.Group>

    <h2>Pothole Basics</h2>

    <Form.Group>
      <Form.Label>Where Abouts is Dat Pothole Located?</Form.Label>
        <PotholeLocation pothole_id={ pothole_id} setPothole_id={setPothole_id} />
    </Form.Group>
    
  </Form.Group>
)};

export default LocationSection;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import BasicsSection from './formSections/BasicsSection';
import CheckPothole from './formSections/CheckPothole';
import ImageSection from './formSections/ImageSection';
import RatingSection from './formSections/RatingSection';
// import axios from 'axios';

function AddPothole() {
  // const [potholeId, setPotholeId] = useState<number>(0);
  const [view, setView] = useState<string>('potholeBasics')
  const [potentialPotholes, setPotentialPotholes] = useState([]);

  const masterObj: { potObj: object; ratingObj: object; imageObj: object } = {
    potObj: {},
    ratingObj: {},
    imageObj: {},
  };
  
  //Fill out the masterObj
  const createMasterObj = (name: string, obj: object) => (masterObj[name] = obj);

  const handleView = () => {
  if (view === 'imageSection') {
      <ImageSection />
    } else if (view === 'ratingSection') {
      <RatingSection />
    } else if (view === 'checkPothole') {
    <CheckPothole potentialPotholes={potentialPotholes} />
    } else {
        return (
          <BasicsSection
            createMasterObj={createMasterObj}
            setView={setView}
            setPotentialPotholes={setPotentialPotholes}
          />
        );
      } 

  

  return (
    <Form id='addPothole'>
      {handleView()}
    </Form>
  );
}

export default AddPothole;

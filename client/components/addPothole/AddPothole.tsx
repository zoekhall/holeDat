/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, createContext } from 'react';
import Form from 'react-bootstrap/Form';
// import ProgressBar from 'react-bootstrap/ProgressBar';
// import BasicsSection from './formSections/LocationSection';
// import ImageSection from './formSections/ImageSection';
import RatingSection from './formSections/RatingSection';
// import axios from 'axios';
// import CheckPothole from './formSections/CheckPothole';

export interface Color { //define interface to define values of context
  color: string; 
} 

export const ColorContext = createContext<Color | null>(null);

//Partial generic function tells TS not all values need to be defined - createContext<Partial<Color>>({}); but not recommended cause chaining
export const defaultColor = { //recommended to use a default state
  color: 'blue'
}
  
function AddPothole() {

  // const [imgObj, setImgObj] = useState<object>({});
  // const [potObj, setPotObj] = useState<object>({});
  // const [potholeId] = useState<number>(0);
  // const [view, setView] = useState<string>('imageSection');
  // const [userId, setUserId] = useState<number>(0);
  // const [progress, setProgress] = useState<number>(35);
  // const [potentialPotholes, setPotentialPotholes] = useState([]);
  // const [color, setColor] = useState(defaultColor);

  const ratingObj: { overall: number; pothole_id: number; user_id: number } = {
    overall: 0,
    pothole_id: 0,
    user_id: 0,
  };

  // useEffect(() => {
  //   axios
  //     .get('/api/user/me')
  //     .then(({ data }) => setUserId(data.user_id))
  //     .catch((err) => console.error('Failure to Get User', err));
  // }, []);

  const handleSubmit = () => {

    // axios
    //   .post('/api/pothole/addPothole', potObj)
    //   .then(({ data }) => setPotholeId(data.pothole_id))
    //   .catch((err) => console.error(err));
  };

  const handleView = () => {
    // console.log({
    // imgObj,
    //   potObj,
    //   ratingObj,
    // });
    // if (view === 'imageSection') {
      // return (
        // <ImageSection/>

      // );
    // } else if (view === 'ratingSection') {
      return (
        <RatingSection
          handleRating={(rating: number) => (ratingObj.overall = rating)}
          handleSubmit={handleSubmit}
        />
      );
      // } else if (view === 'checkPothole') {
      // return <CheckPothole/> //potentialPotholes={potentialPotholes
    // } else {
    //   return (
    //     <BasicsSection
    //       setPotObj={setPotObj}
    //       setView={setView}
    //       setProgress={setProgress}
          // setPotentialPotholes={setPotentialPotholes}
    //     />
      // );
    // }
  };

  return (
    <Form id='addPothole'>
      <h1>Report a Pothole</h1>
      <ColorContext.Provider value={defaultColor}>
        {handleView()}
        {/* <CheckPothole/> */}
        {/* <ProgressBar now={progress} style={{ color: 'pink' }} /> */}
      </ColorContext.Provider>
    </Form>
  );
}

export default AddPothole;

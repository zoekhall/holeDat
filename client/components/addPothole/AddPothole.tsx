/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import BasicsSection from './formSections/LocationSection';
import ImageSection from './formSections/ImageSection';
import RatingSection from './formSections/RatingSection';
import axios from 'axios';
// import CheckPothole from './formSections/CheckPothole';

function AddPothole() {
  const [imgObj, setImgObj] = useState<object>({});
  const [potObj, setPotObj] = useState<object>({});
  const [potholeId] = useState<number>(0);
  const [view, setView] = useState<string>('imageSection');
  const [userId, setUserId] = useState<number>(0);
  const [progress, setProgress] = useState<number>(35);
  // const [potentialPotholes, setPotentialPotholes] = useState([]);

  const ratingObj: { overall: number; pothole_id: number; user_id: number } = {
    overall: 0,
    pothole_id: potholeId,
    user_id: userId,
  };

  useEffect(() => {
    axios
      .get('/api/user/me')
      .then(({ data }) => setUserId(data.user_id))
      .catch((err) => console.error('Failure to Get User', err));
  }, []);

  const handleSubmit = () => {
    // imgObj.user_id = potObj.user_id;
    // axios
    //   .post('/api/pothole/addPothole', potObj)
    //   .then(({ data }) => setPotholeId(data.pothole_id))
    //   .catch((err) => console.error(err));
  };

  const handleView = () => {
    console.log({
      imgObj,
      potObj,
      ratingObj,
    });
    if (view === 'imageSection') {
      return (
        <ImageSection
          setImgObj={setImgObj}
          setProgress={setProgress}
          setView={setView}
        />
      );
    } else if (view === 'ratingSection') {
      return (
        <RatingSection
          handleRating={(rating: number) => (ratingObj.overall = rating)}
          handleSubmit={handleSubmit}
        />
      );
      // } else if (view === 'checkPothole') {
      // return <CheckPothole/> //potentialPotholes={potentialPotholes
    } else {
      return (
        <BasicsSection
          setPotObj={setPotObj}
          setView={setView}
          setProgress={setProgress}
          // setPotentialPotholes={setPotentialPotholes}
        />
      );
    }
  };

  return (
    <Form id='addPothole'>
      <h1>Report a Pothole</h1>
      {handleView()}
      {/* <CheckPothole/> */}
      <ProgressBar now={progress} style={{ color: 'pink' }} />
    </Form>
  );
}

export default AddPothole;

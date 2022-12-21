/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import BasicsSection from './formSections/BasicsSection';
// import CheckPothole from './formSections/CheckPothole';
import ImageSection from './formSections/ImageSection';
import RatingSection from './formSections/RatingSection';
import axios from 'axios';

function AddPothole() {
  const [potObj, setPotObj] = useState<object>({});
  const [potholeId, setPotholeId] = useState<number>(0);
  const [view, setView] = useState<string>('potholeBasics');
  const [userId, setUserId] = useState<number>(0);
  const [progress, setProgress] = useState<number>(35);
  // const [potentialPotholes, setPotentialPotholes] = useState([]);

  const ratingObj: { overall: number; pothole_id: number; user_id: number } = {
    overall: 0,
    pothole_id: potholeId,
    user_id: userId,
  };

  const imgObj: { photoURL: string; caption: string; pothole_id: number; user_id: number } = {
    photoURL: '',
    caption: '',
    user_id: userId,
    pothole_id: potholeId,
  };

  useEffect(() => {
    axios
      .get('/api/user/me')
      .then(({ data }) => setUserId(data.user_id))
      .catch((err) => console.error('Failure to Get User', err));
  }, []);

  const handleSubmit = () => {
    axios
      .post('/api/pothole/addPothole', potObj)
      .then(({ data }) => setPotholeId(data.pothole_id))
      .catch((err) => console.error(err));
  };

  const handleView = () => {
    console.log({
      potObj,
      imgObj,
      ratingObj,
    });
    if (view === 'imageSection') {
      return (
        <ImageSection
          setView={setView}
          setProgress={setProgress}
          handleImageURL={(url: string) => imgObj.photoURL = url}
          handleCaption={(val: string) => imgObj.caption = val}
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

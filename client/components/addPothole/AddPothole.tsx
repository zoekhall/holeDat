/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import BasicsSection from './formSections/BasicsSection';
// import CheckPothole from './formSections/CheckPothole';
import ImageSection from './formSections/ImageSection';
import RatingSection from './formSections/RatingSection';
import axios from 'axios';

function AddPothole() {
  const [potholeId, setPotholeId] = useState<number>(0);
  const [view, setView] = useState<string>('potholeBasics');
  const [userId, setUserId] = useState<number>(0);
  // const [potentialPotholes, setPotentialPotholes] = useState([]);

  const masterObj: { potObj: object; ratingObj: object; imageObj: object } = {
    potObj: {},
    ratingObj: {},
    imageObj: {},
  };

  useEffect(() => {
    axios
      .get('/api/user/me')
      .then(({ data }) => {
        setUserId(data.user_id);
      })
      .catch((err) => console.error('Failure to Get User', err));
  }, []);

  const handleSubmit = () => {
    axios({
      method: 'post',
      url: '/api/imgs/addPothole',
      data: masterObj,
    }).catch((err) => console.error('Failure to Submit Image', err));
  };

  //Fill out the masterObj
  const createMasterObj = (name: string, obj: object) => (masterObj[name] = obj);

  const handleView = () => {
    console.log(view);
    if (view === 'imageSection') {
      return (
        <ImageSection
          userId={userId}
          createMasterObj={createMasterObj}
          potholeId={potholeId}
          setView={setView}
        />
      );
    } else if (view === 'ratingSection') {
      return (
        <RatingSection
          userId={userId}
          createMasterObj={createMasterObj}
          potholeId={potholeId}
          handleSubmit={handleSubmit}
        />
      );
      // } else if (view === 'checkPothole') {
      // <CheckPothole potentialPotholes={potentialPotholes}/>
    } else {
      return (
        <BasicsSection
          createMasterObj={createMasterObj}
          setView={setView}
          // setPotentialPotholes={setPotentialPotholes}
        />
      );
    }
  };

  return <Form id='addPothole'>{handleView()}</Form>;
}

export default AddPothole;

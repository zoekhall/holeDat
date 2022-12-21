/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
// import PotholeStatus from './formQuestions/PotholeStatus';
// import PotholeLocation from './formQuestions/PotholeLocation';
// import PotholePic from './formQuestions/PotholePic';
import Button from 'react-bootstrap/Button';
// import PotholeRating from './formQuestions/PotholeRating';
// import axios from 'axios';
// import PotholeCaption from './formQuestions/PotholeCaption';
import PotholeBasics from './formSections/BasicsSection';
// import axios from 'axios';
// import CheckPothole from './formSections/CheckPothole';

function AddPothole() {
  // const [potholeId, setPotholeId] = useState<number>(0);
  const [view, setView] = useState<string>('potholeBasics')
  const [potentialPotholes, setPotentialPotholes] = useState([]);

  const masterObj: { potObj: object; ratingObj: object; imageObj: object } = {
    potObj: {},
    ratingObj: {},
    imageObj: {},
  };

  // const determineView = () =>
    // console.log(view);
    // console.log(potentialPotholes);
    // if (view === 'potholeBasics') {

    // }

  // const handleSubmit = () => {
  //   axios({
  //     method: 'post',
  //     url: '/api/pothole/addPothole',
  //     data: masterObj
  //   })
  //     .then(data => {
  //       setPotholeId(data.data.pothole_id); //sets state to returned number]
  //     })
  //   .catch(err => console.error('FAILURE TO SUBMIT', err))
  // }

  const createMasterObj = (name: string, obj: object) => (masterObj[name] = obj);

  return (
    <Form id='addPothole'>
      {/* <h1>Report a Pothole</h1> */}
      <PotholeBasics createMasterObj={createMasterObj} setView={setView} setPotentialPotholes={setPotentialPotholes} />;
      <Button
        type='button'
        variant='outlined-dark'
        onClick={() => {
          console.log(view)
          console.log(potentialPotholes)
          console.log(masterObj)
          // handleSubmit();
        }}
      >
        Submit
      </Button>
    </Form>
  );
}

export default AddPothole;

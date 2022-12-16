// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from 'react';
// import PotholeStatus from '../formQuestions/PotholeStatus';
// import PotholeLocation from '../formQuestions/PotholeLocation';
// import Button from 'react-bootstrap/Button';
// import axios from 'axios';


// function PotholeBasics() {
//   const potObj: { fixed: boolean; lat: number; lon: number; user_id: number } = {
//     fixed: false,
//     lat: 0,
//     lon: 0,
//     user_id: 0,
//   };









//   //add pothole to database and assign potholeId
//   const handlePotholeSubmit = () => {
//     axios({
//       method: 'post',
//       url: '/api/pothole/addPothole',
//       data: potObj,
//     })
//       .then((data) => {
//         ratingObj.pothole_id = data.data.pothole_id;
//         imgObj.pothole_id = data.data.pothole_id;
//       })
//       .catch((err) => console.error('Failure to Submit Pothole', err));
//   };

//   return (
//     <Container>
//       <div>What are the Basics?</div>
//       <PotholeLocation
//         handleLocation={(lat: number, lon: number) => {
//           potObj.lat = lat;
//           potObj.lon = lon;
//         }}
//       />
//       <PotholeStatus handleStatus={(newStatus: boolean) => (potObj.fixed = newStatus)} />
//       <Button type='button' variant='outlined-dark' onClick={handlePotholeSubmit}>
//         Confirm Basic Pothole Information
//       </Button>
//     </Container>
//   );
// }

// export default PotholeBasics;

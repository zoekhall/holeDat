// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
// // import PotholeStatus from './formQuestions/PotholeStatus';
// // import PotholeLocation from './formQuestions/PotholeLocation';
// import PotholePic from './formQuestions/PotholePic';
// import Button from 'react-bootstrap/Button';
// import PotholeRating from './formQuestions/PotholeRating';
// import axios from 'axios';
// import PotholeCaption from './formQuestions/PotholeCaption';
// import PotholeBasics from './formSections/PotholeBasicsSection';

// function AddPothole() {
//   const ratingObj: { overall: number; pothole_id: number; user_id: number } = {
//     overall: 0,
//     pothole_id: 0,
//     user_id: 0,
//   };

//   const imgObj: { photoURL: string; caption: string; pothole_id: number; user_id: number } = {
//     photoURL: '',
//     caption: '',
//     user_id: 0,
//     pothole_id: 0,
//   };

//   //get user and add to img and rating objects
//   useEffect(() => {
//     axios
//       .get('/api/user/me')
//       .then((data) => {
//         imgObj.user_id = data.data.user_id;
//         ratingObj.user_id = data.data.user_id;
//       })
//       .catch((err) => console.error('Failure to Get User', err));
//   }, []);

//   //add rating to database
//   const handleRatingSubmit = () => {
//     axios({
//       method: 'post',
//       url: '/api/rating/addRating',
//       data: ratingObj,
//     }).catch((err) => console.error('Failure to Submit Rating', err));
//   };

//   //add image to cloud
//   const handleImageToCloud = (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     if (formData) {
//       axios({
//         method: 'post',
//         url: '/api/imgs/addimg',
//         data: formData,
//       })
//         .then((data) => (imgObj.photoURL = data.data))
//         .catch((err) => console.error('Failure to Submit Image to Cloud', err));
//     }
//   };

//   //add image to database
//   const handleImageSubmit = () => {
//     axios({
//       method: 'post',
//       url: '/api/imgs/postImg',
//       data: imgObj,
//     }).catch((err) => console.error('Failure to Submit Image', err));
//   };

//   return (
//     <Form id='addPothole'>
//       <h1>Report a Pothole</h1>
//       <PotholeBasics
//         assignPotholeId={(id) => {
//           ratingObj.pothole_id = id;
//           imgObj.pothole_id = id;
//         }}
//       />

//       <PotholeCaption handleCaption={(val: string) => (imgObj.caption = val)} />
//       <PotholePic handleImage={(file) => handleImageToCloud(file)} />

//       {/* <div>What Do You Rate It?</div> */}
//       <PotholeRating handleRating={(rating: number) => (ratingObj.overall = rating)} />
//       <Button
//         type='submit'
//         variant='outlined-dark'
//         onClick={() => {
//           handleRatingSubmit();
//           handleImageSubmit();
//         }}
//       >
//         Submit
//       </Button>
//     </Form>
//   );
// }

// export default AddPothole;

// /* eslint-disable prefer-const */
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper';
// // import PropTypes from 'prop-types';
// const mapToken =
//   'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

// const CheckPothole = () => {
//   const potentialPotholes = [
//     { pothole_id: 85, lat: 29.93815, lon: -90.06856 },
//     { pothole_id: 92, lat: 37.29856, lon: -90.06823 },
//   ];

//   // const [potTupes, setPotTupes] = useState<object[]>([]);

//   const makePotholeObj = () => {
//     const potholeTuples: object[] = potentialPotholes.map((pothole, id) => {
//       // let potholeTuple: [string[], string];
//       let potholeTuple: { address: string; photoURLs: string[] } = {
//         address: '',
//         photoURLs: [],
//       }
//       // potholeTuple = [[], ''];
//       //get photoURLS
//       axios('/api/imgs/potholeimgs' + pothole.pothole_id)
//         .then(({ data }) => {
//           potholeTuple.photoURLs = data.map((pothole, id) => pothole.photoURL)
//         })
//         .catch((err) => console.error(err));

//       //getaddress
//       axios(
//         `https://api.mapbox.com/geocoding/v5/mapbox.places/${pothole.lon},${pothole.lat}.json?access_token=${mapToken}`
//       )
//         .then(({ data }) => {
//           potholeTuple.address = data.features[0].place_name.split(',')[0];
//         })
//         .catch((err) => console.error(err));

//       return (<div key={id}>YOOOSFOSHFKLSD:F</div>);
//     });
//     // setPotTupes(potholeTuples);
//     return <div>{potholeTuples[0].address}</div>;
//   };

//   useEffect(() => {
//     makePotholeObj();
//   }, []);

//   return (
//     <div>
//       <div>{makePotholeObj()}</div>
//     </div>
//   );
// }
// // CheckPothole.propTypes = {
// //   potentialPotholes: PropTypes.array.isRequired,
// // };

// export default CheckPothole;

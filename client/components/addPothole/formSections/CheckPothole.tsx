// /* eslint-disable prefer-const */
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper';
// // import PropTypes from 'prop-types';
// const mapToken =
//   'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';

// const CheckPothole = ( ) => {
//   const potentialPotholes = [
//     { pothole_id: 85, lat: 29.93815, lon: -90.06856 },
//     { pothole_id: 92, lat: 37.29856, lon: -90.06823 },
//   ];
  
//   let potholeObjs: Array<[string, string[]]> = [];

//   const getAddressAndPotholeImg = (id) => {
//     axios
//       .get('/api/imgs/potholeimgs' + id)
//       .then(({data}) => {
//         const photoUrls: string[] = data.map((each) => { //array of urls
//           return each.photoURL;
//         })
//         return [data[0].Pothole, photoUrls];
//       })
//       .then((data) => {
//         const { lon, lat } = data[0];
//         const photoUrls = data[1];
//         return axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapToken}`)
//           .then(({ data }) => {
//             potholeObjs.push([data.features[0].place_name.split(',')[0], photoUrls]);
//           })
//             .catch((err) => console.log(err));
//       }).catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     potentialPotholes.forEach((each) => getAddressAndPotholeImg(each.pothole_id))
//   }, []);

  

//   return (
//     <div className='post'>
//       {potholeObjs.map((potObj, i) => {
//         return (
//           <div key={i}>
//             <div className='post_header'>{ potObj[0]}</div>
//             {/* <Swiper
//               className='mySwiper'
//               pagination={true}
//               effect={'cards'}
//               grabCursor={true}
//               modules={[Pagination]}
//             >
//               {potObj[1].map((image, i) => {
//                 return (
//                   <SwiperSlide key={i}>
//                     <img className='potHole_img' src={image.photoURL} alt={potObj[0]} />
//                   </SwiperSlide>
//                 );
//               })}
//             </Swiper> */}
//           </div>
//         )
//       }
//       )}
//     </div>
//   );
// };

// // CheckPothole.propTypes = {
// //   potentialPotholes: PropTypes.array.isRequired,
// // };

// export default CheckPothole;

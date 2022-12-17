// import React, { useEffect, useState } from 'react';
// import { Popup, Marker } from 'react-map-gl';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Point = (prop) => {
//   type phObj = {
//     caption: string;
//     photoURL: string;
//   };
//   const { lon, lat, pothole_id } = prop.marker;
//   const { userLocation } = prop;

//   const [showPopup, setShowPopup] = useState(true);
//   const [plothole, setPlothole] = useState<phObj>();
//   const [addy, setAddy] = useState('');

//   const getInfo = () => {
//     axios
//       .get('/api/imgs/potholeimg' + prop.marker.pothole_id)
//       .then((data) => setPlothole(data.data))
//       .then(() => {
//         axios
//           .get(`/api/location/getAddy`, { params: { lat, lon } })
//           .then((data) => setAddy(data.data.split(',')));
//       })
//       .then(() => {
//         if (
//           Math.abs(userLocation[0] - lat) < 0.000000000001 &&
//           Math.abs(userLocation[1] - lon) < 0.00000000001 &&
//           userLocation.length !== 0
//         ) {
//           setShowPopup(false);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(getInfo, []);

//   return (
//     <>
//       {showPopup ? (
//         <Marker longitude={lon} latitude={lat} onClick={() => setShowPopup(false)}></Marker>
//       ) : (
//         <Popup
//           longitude={lon}
//           latitude={lat}
//           anchor='bottom'
//           closeOnClick={false}
//           onClose={() => setShowPopup(true)}
//           focusAfterOpen={true}
//         >
//           {plothole ? (
//             <div className='mapPopup'>
//               <Link to={'/Pothole:' + pothole_id}>
//                 <p>{addy[0]}</p>
//               </Link>
//               <img src={plothole.photoURL} alt='potholeImg' width={100} />
//             </div>
//           ) : (
//             ''
//           )}
//         </Popup>
//       )}
//     </>
//   );
// };
// export default Point;

// import React, { useEffect, useState } from 'react';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import Map, { NavigationControl, FullscreenControl, GeolocateControl } from 'react-map-gl';
// // import axios from 'axios';
// // import FormPoint from './FormPoint';
// import PropTypes from 'prop-types';

// const FormMapBox = ({ location }) => {
//   // type markerType = {
//   //   createdAt: string;
//   //   fixed: boolean;
//   //   lat: number;
//   //   lon: number;
//   //   pothole_id: number;
//   //   updatedAt: string;
//   // };
//   const mapbox_token =
//     'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg';
//   // const [markers, setMarkers] = useState<markerType[]>([]);

//   // const getMarkers = () => {
//   //   axios
//   //     .get('/api/pothole')
//   //     .then((data) => setMarkers(data.data))
//   //     .catch((err) => console.error(err));
//   // };

//   // useEffect(() => {
//   //   getMarkers();
//   // }, []);

//   const geolocateControlRef = React.useCallback((ref) => {
//     if (ref) {
//       // Activate as soon as the control is loaded
//       ref.trigger();
//     }
//   }, []);

//   return (
//     <div id='map-box' className='map-box'>
//       <Map
//         style={{
//           width: '20%',
//           height: '20%',
//         }}
//         mapboxAccessToken={mapbox_token}
//         initialViewState={{
//           latitude: location.lat,
//           longitude: location.lon,
//           zoom: 12,
//           pitch: 60,
//         }}
//         mapStyle='mapbox://styles/mapbox/light-v11'
//       >
//         {/* {markers.map((marker) => {
//           if (!marker.fixed)
//             return (
//               <FormPoint key={marker.pothole_id} marker={marker} userLocation={[location.lat, location.lon]} />
//             );
//         })} */}
//         <NavigationControl />
//         <FullscreenControl />
//         <GeolocateControl
//           ref={geolocateControlRef}
//           positionOptions={{ enableHighAccuracy: true }}
//           trackUserLocation={true}
//           showUserHeading={true}
//           fitBoundsOptions={{ maxZoom: 30 }}
//         />
//       </Map>
//     </div>
//   );
// };

// FormMapBox.propTypes = {
//   location: PropTypes.object.isRequired,
// };

// export default FormMapBox;

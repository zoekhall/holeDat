import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {Swiper, SwiperSlide } from 'swiper/react';



import 'swiper/css';
import 'swiper/css/bundle'

const Home = () => {
  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
  }

  const [PImages, setPImages] = useState<phImg[]>([])

  const getAllImgs = () => {
    axios.get('/api/imgs')
    .then(data => setPImages(data.data))
    .catch(err => console.log(err));
  }

  useEffect(getAllImgs, []);


  return (
    <>
  <Swiper
  loop={true}>
    {PImages.map(image => {
      return (
      <SwiperSlide key={image.image_id}>
      <img src={image.photoURL} style={{display: 'block', width: '100px', height: '100px', objectFit: 'cover'}}/>
    </SwiperSlide>
    )}
      )}
  </Swiper>
  </>
  );
}

export default Home;




// return (
//   <>
//   <Swiper>
//     {PImages.map(image => {
//       return (
//       <SwiperSlide key={image.image_id}>
//       <img src={image.photoURL} style={{display: 'block', width: '100px', height: '100px', objectFit: 'cover'}}/>
//     </SwiperSlide>
//     )}
//       )}
//   </Swiper>
//   </>
// );
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';

const PImageSlider = () => {
  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
  };

  const [PImages, setPImages] = useState<phImg[]>([]);




  const getAllImgs = () => {
    axios
      .get('/api/imgs')
      .then((data) => setPImages(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(getAllImgs, []);

  return (
    <>
      <Swiper loop={true} effect={'cards'} grabCursor={true} modules={[EffectCards]} className='mySwiper' style={{width: '50%'}}>
        {PImages.map((image) => {
          return (
            <SwiperSlide key={image.image_id} style={{
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:'18px'
            }}
          >
              <img
                className={'pothole-slider-images'}
                style={{borderRadius: '18px'}}
                src={image.photoURL}
                referrerPolicy={'no-referrer'}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      </>
  )
      }

export default PImageSlider;
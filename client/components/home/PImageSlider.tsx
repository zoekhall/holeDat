import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      <Swiper
        id='swiper'
        loop={true}
        grabCursor={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        pagination={{ clickable: true }}
        className='mySwiper'
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        style={{ width: '100%' }}
      >
        {PImages.map((image) => {
          return (
            <SwiperSlide
              key={image.image_id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '18px',
              }}
            >
              <img style={{ borderRadius: '18px' }} src={image.photoURL} width='100%' />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default PImageSlider;

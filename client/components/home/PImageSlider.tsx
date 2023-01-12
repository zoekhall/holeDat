import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import { Link } from 'react-router-dom'

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
    pothole_id: number
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
    <div id='pothole-slider'>
      <h2>Newest Reported Potholes</h2>
      <Swiper
        id='potholeSlider'
        loop={true}
        grabCursor={true}
        modules={[Pagination, Autoplay]}
        navigation={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='mySwiper potholeSlider'
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {PImages.map((image) => {
          return (
            <SwiperSlide
              key={image.image_id}
            >
              <div className='pothole-slider-image'>
                <Link
                  to={`/Pothole:${image.pothole_id}`}>
                  <div className='pothole-image'>
                    <img src={image.photoURL} />
                  </div>
                  <p>{image.caption}</p>
                </Link>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PImageSlider;

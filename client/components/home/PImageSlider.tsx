import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
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
    <div id='pothole-slider-content'>
      <h2>Newest Reported Potholes</h2>
      <Swiper
        id='pothole-slider'
        loop={true}
        grabCursor={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        slidesPerView={1}
        pagination={{ clickable: true }}
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
              <Link className='slider-content' to={`/Pothole:${image.pothole_id}`}>
                <div className='slider-img'>
                  <img className='pothole-image' src={image.photoURL} />
                </div>
                <p>{image.caption}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PImageSlider;

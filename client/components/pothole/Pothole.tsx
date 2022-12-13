import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import { useLocation } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/bundle';

const Pothole = () => {

  const id = Number(useLocation().pathname.split(':')[1]);

  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
    userUserId: number;
    potholePotholeId: number;
  };

  const [PImages, setPImages] = useState<phImg[]>([]);

  // get pothole images by potholeID
  const getAllPotholeImgByPhId = () => {
    axios
      .get('/api/imgs/potholeimgs' + id)
      .then((data) => setPImages(data.data))
      .catch((err) => console.log(err));
  };

  const getCurrentUserData = () => {
    console.log('temp');
  }

  useEffect(() => {
    getAllPotholeImgByPhId();
    getCurrentUserData();
  }, []);

  return <div className="post">
    <div className="post_header">
      <h2><strong>Pothole Profile</strong></h2>
    </div>
    <Swiper className='mySwiper' pagination={true} effect={'cards'} grabCursor={true} modules={[Pagination]}>
      {PImages.map((image, i) => {
        return (
          <SwiperSlide key={i}>
            <img className='potHole_img'
              src={image.photoURL}
              alt="test"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
    <div className="post_caption">
      <img className="avatar capElem rounded-circle shadow-sm p-3 mb-5 bg-white rounded" alt="avatar2" src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" />
      <div className="caption">
        <h5><strong>Sidney Holmes</strong></h5>
        <p>This pothole has pile of french quarter rats in it.</p>
      </div>
    </div>
  </div>;
}

export default Pothole;

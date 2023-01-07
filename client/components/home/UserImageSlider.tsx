import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper';

import 'swiper/css';
import 'swiper/css/bundle';
import 'swiper/css/effect-cards';

const UserImageSlider = () => {
  type usrImg = {
    createdAt: string;
    email: string;
    id: string;
    name: string;
    photo: string;
    updatedAt: string;
    user_id: number;
  };

  const [recentPics, setRecentPics] = useState<usrImg[]>([]);

  const getRecentUsers = () => {
    axios
      .get('/api/user')
      .then((data) => setRecentPics(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(getRecentUsers, []);

  return (
    <>
      <Swiper
        loop={true}
        grabCursor={true}
        modules={[Navigation, Pagination, Autoplay]}
        navigation={true}
        slidesPerView={4}
        pagination={{ clickable: true }}
        className='mySwiper'
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
      >
        {recentPics.map((user) => {
          return (
            <SwiperSlide key={user.user_id}>
              <Link to={'/User:' + user.user_id} >
                <img
                  src={user.photo}
                  referrerPolicy={'no-referrer'}
                />
                <p>{user.name}</p>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default UserImageSlider;

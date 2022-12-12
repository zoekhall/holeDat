import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper';

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
      .then(data => setRecentPics(data.data))
      .catch(err => console.log(err));
  };

  useEffect(getRecentUsers, []);

  return (
    <>
      <Swiper id='swipper' loop={true} effect={'cards'} grabCursor={true} modules={[EffectCards]} className='mySwiper' >
        {recentPics.map((user) => {
          return (
            <SwiperSlide
              key={user.user_id}
            >
              <img
                style={{ borderRadius: '100px' }}
                src={user.photo}
                referrerPolicy={'no-referrer'}
                onClick={() => console.log(user.name)}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  )

}


export default UserImageSlider;

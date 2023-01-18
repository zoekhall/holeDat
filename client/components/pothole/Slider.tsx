import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
import Likes from './Likes';
import { Link } from 'react-router-dom';



const Slider = (prop) => {
  const { badge, PImages, user } = prop;

  return (
    <Swiper
      className='mySwiper potholeSlider'
      pagination={true}
      effect={'cards'}
      id='pothole-profile-slider'
      grabCursor={true}
      modules={[Pagination]}
    >
      {PImages.map((image) => {
        return (
          <SwiperSlide key={image.image_id}>
            <img className='potHole_img' src={image.photoURL} alt='test' />

            <div id='post_caption'>

              <div className='badgeAvatar'>
                {image?.badge_id ? (
                  <div id='profBadge'>
                    {badge.map((badges) => {
                      if (image.badge_id === badges.badge_id) {
                        return (
                          <img
                            className='badgeBoy'
                            key={badges.badge_id}
                            src={badges.imgUrl}
                          />
                        );
                      }
                    })}
                  </div>
                ) : ''}

                <div id='profAvatar'>
                  <Link to={'/User:' + image.userId}>
                    <img className='avatar' alt='avatar2' src={image.userPhoto} />
                  </Link>
                </div>
              </div>

              <div id='innerProfCapt'>
                <h3>{image.userName}</h3>
                <p>{image.caption}</p>
              </div>

              <div id='likeCol'>{user?.name && <Likes user={user} image={image} />}</div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default Slider;

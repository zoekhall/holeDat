import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import { useLocation, Link } from 'react-router-dom';


const Pothole = () => {

  const id = Number(useLocation().pathname.split(':')[1]);

  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    userId: number;
    userName: string;
    userPhoto: string;
  };

  const [PImages, setPImages] = useState<phImg[]>([]);

  // get pothole images by potholeID
  const getAllPotholeImgByPhId = () => {
    axios
      .get('/api/imgs/potholeimgs' + id)
      .then((data) => {
        console.log(data.data)
        const resObj: [] = data.data.map(each => {
          //console.log(each)
          const { image_id, caption, photoURL } = each
          const { user_id, name, photo } = each.user
          return ({
            image_id: image_id,
            caption: caption,
            photoURL: photoURL,
            userId: user_id,
            userName: name,
            userPhoto: photo

          })
          // const stateObj: phImg = {
          // }
        })
        console.log(resObj)
        setPImages(resObj)
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getAllPotholeImgByPhId();
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
            <div className="post_caption">
              <div className="caption">
                <p>{image.caption}</p>
                <Link to={'/User:' + image.userId}>
                  <img className="avatar capElem rounded-circle shadow-sm p-3 mb-5 bg-white rounded" alt="avatar2" src={image.userPhoto} />
                </Link>
                <h5>{image.userName}</h5>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  </div>;
}

export default Pothole;

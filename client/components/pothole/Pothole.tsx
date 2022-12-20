import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from "swiper";
import { useLocation, Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const Pothole = () => {

  const id = Number(useLocation().pathname.split(':')[1]);

  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    userId: number;
    userName: string;
    userPhoto: string;
    lat: number,
    lon: number,
    fixed: boolean
  };

  const [PImages, setPImages] = useState<phImg[]>([]);
  const [addy, setAddy] = useState<string[]>([]);
  const [phId] = useState<number>(id);

  // get pothole images by potholeID
  const getAllPotholeImgByPhId = () => {
    axios
      .get('/api/imgs/potholeimgs' + id)
      .then((data) => {
        const resObj: [] = data.data.map(each => {
          const { image_id, caption, photoURL } = each
          const { user_id, name, photo } = each.User
          const { lat, lon, fixed } = each.Pothole
          return ({
            image_id,
            caption,
            photoURL,
            userId: user_id,
            userName: name,
            userPhoto: photo,
            lon,
            lat,
            fixed
          })
        })

        setPImages(resObj)
        return data.data[0].Pothole
      })
      .then((data) => {
        const { lat, lon } = data
        axios('/api/location/getAddy', { params: { lat, lon } })
          .then(data => setAddy(data.data.split(',')))
      })
      .catch((err) => console.log(err));
  };


  useEffect(() => {
    getAllPotholeImgByPhId();
  }, []);

  return <div className="post">
    <div className="post_header">
      <h1>{addy[0]}</h1>
    </div>
    <Swiper className='mySwiper'
      pagination={true}
      effect={'cards'}
      grabCursor={true}
      modules={[Pagination]}>
      {PImages.map((image, i) => {
        return (
          <SwiperSlide key={i}>
            <img className='potHole_img'
              src={image.photoURL}
              alt="test"
            />
            <div className="post_caption">
              <div className="caption">
                <Link to={'/User:' + image.userId}>
                  <img className="avatar capElem rounded-circle shadow-sm p-3 mb-5 bg-white rounded"
                    alt="avatar2"
                    src={image.userPhoto} />
                </Link>
                <strong>{image.userName}</strong><p>{image.caption}</p>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
    <CommentForm phId={phId} />
  </div>;
}

export default Pothole;

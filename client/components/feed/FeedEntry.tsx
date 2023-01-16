import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface phImg {
  image_id: number;
  photoURL: string;
  caption: string;
  createdAt: string;
  updatedAt: string;
  pothole_id: number;
  lat: number;
  lon: number;
  badge_id: number;
  fixed: boolean;
  user_id: number;
  name: string;
  photo: string;
}
const FeedEntry = ({ imgObj }: { imgObj: phImg }) => {
  type badgeObj = {
    imgUrl: string;
    description: string;
    name: string;
  };

  const [addy, setAddy] = useState('');
  const [badge, setBadge] = useState<badgeObj>();
  const [, setHoverBool] = useState<boolean>(false);

  const getInfo = () => {
    if (imgObj.badge_id !== 0)
      axios
        .get('/api/badges/getBadge', { params: { badgeId: imgObj.badge_id } })
        .then(({ data }) => setBadge(data))
        .catch((err) => console.log(err));

    axios
      .get('/api/location/getAddy', { params: { lat: imgObj.lat, lon: imgObj.lon } }) // on every image object get location
      .then(({ data }) => setAddy(data.split(',')[0]))
      .catch((err) => console.log(err));
  };

  const onBadgeHover = (option) => {
    setHoverBool(option);
  };

  useEffect(getInfo, []);
  return (
    <div className='pothole-container'>
      <h3>{addy}</h3>
      <Link to={`/Pothole:${imgObj.pothole_id}`}>
        <img
          src={imgObj.photoURL}
          alt='Image'
          referrerPolicy='no-referrer'
          className='pothole-img'
        />
      </Link>
      <section>
        <p>{imgObj.caption}</p>
        <Link to={'/User:' + imgObj.user_id}>
          <img
            src={imgObj.photo}
            alt='Image'
            className='user-img' />
        </Link>
        {
          badge &&
          <img
            onMouseOver={() => onBadgeHover(true)}
            onMouseOut={() => onBadgeHover(false)}
            src={badge?.imgUrl}
            alt='Image'
            referrerPolicy='no-referrer'
            className='badge-img'
          />
        }
        {/* {hoverBool ? badge?.description : badge?.name} */}
      </section>
    </div >
  );
};

export default FeedEntry;

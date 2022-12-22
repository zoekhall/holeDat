import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const FeedEntry = ({ imgObj }) => {

  // type badgeObj = {
  //   imgUrl: string;
  //   description: string;
  //   name: string
  // }

  const [addy, setAddy] = useState('')
  const [userPhoto, setUserPhoto] = useState('')
  //const [badge, setBadge] = useState<badgeObj>()

  const getAddress = () => {
    const { lat, lon } = imgObj.addressDetails

    const getBadgeData = (userData) => {
      if (userData !== 0) {
        axios.get('/api/badges/getBadge' + userData)
          .then(data => console.log(data.data))
          .catch(err => console.log(err));
      }
    }


    axios.get('/api/location/getAddy', { params: { lat, lon } }) // on every image object get location
      .then(data => setAddy(data.data))
      .catch(err => console.log(err));

    axios.get('/api/user/UserAtId' + imgObj.user_id)
      .then(data => {
        setUserPhoto(data.data.photo)
        getBadgeData(data.data.badge_id)
      })
      .catch(err => console.log(err));
  }

  useEffect(getAddress, [])
  return (
    <div>
      <h3>{addy.split(',')[0]}</h3>
      <Link to={`/Pothole:${imgObj.pothole_id}`}>
        <img
          style={{ borderRadius: '18px' }}
          src={imgObj.photoURL}
          alt='Image'
          width='50%'
          height='50%'
        />
      </Link>
      <img src={userPhoto} alt='Image' width="10%"></img>
    </div>
  );
};

export default FeedEntry;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { UserStats } from './UserStats';


const NonUserProfile = () => {
  const id = Number(useLocation().pathname.split(':')[1]); // get the id of the current user from the url

  type userObj = {
    // the type of values in the use obj
    name: string;
    user_id: number;
    photo: string;
    badge_id: number;
  };

  type badgeObj = {
    imgUrl: string;
    description: string;
    name: string;
  };

  const [profile, setProfile] = useState<userObj>({ name: '', user_id: 0, photo: '', badge_id: 0 });
  const [badge, setBadge] = useState<badgeObj>();

  const getUserData = () => {
    axios
      .get('/api/user/userAtId' + id) // get user data of the user at the id
      .then((data) => {
        setProfile(data.data)
        if (data.data.badge_id !== 0) {
          axios.get('/api/badges/getBadge', { params: { badgeId: data.data.badge_id } })
            .then(({ data }) => setBadge(data))
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(getUserData, []);
  return (
    <div className='userPf'>
      <section className='avatar-container'>
        <img
          src={profile.photo}
          alt='Image'
          className='user-avatar'
        />
        <img
          className='user-badge'
          src={badge?.imgUrl}
          alt='Image'
        />
      </section>
      <h1>{profile.name}</h1>
      <UserStats userId={id} />
    </div>
  );
};

export default NonUserProfile;

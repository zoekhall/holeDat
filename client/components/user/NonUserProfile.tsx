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
  };

  const [profile, setProfile] = useState<userObj>({ name: '', user_id: 0, photo: '' });

  const getUserData = () => {
    axios
      .get('/api/user/userAtId' + id) // get user data of the user at the id
      .then((data) => setProfile(data.data))
      .catch((err) => console.log(err));
  };

  useEffect(getUserData, []);
  return (
    <div className='userPf'>
      <h1>{profile.name}</h1>
      <img
        src={profile.photo}
        alt='Image'
      />
      <UserStats userId={id} />
    </div>
  );
};

export default NonUserProfile;

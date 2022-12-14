import React, { useEffect, useState } from 'react';
import Logout from '../../Logout';
import axios from 'axios';

function User() {
  type userObj = {
    name: string;
    user_id: number;
    photo: string;
  }

  let [user, setUser] = useState<userObj>({ name: '', user_id: 0, photo: '' })

  const getUserData = () => {
    axios.get('/api/user/current')
      .then(data => setUser(data.data))
      .catch(err => console.log(err));
  }

  useEffect(getUserData, [])

  return (
    <div>
      <p>User</p>
      <img src={user.photo} style={{ borderRadius: '18px' }} alt="Image" width='50%' height='50%' />
      <h1>{user.name}</h1>
      <button onClick={getUserData}>get user data</button>
      <Logout />
    </div>
  );
}

export default User;

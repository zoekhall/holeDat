import React, { useEffect, useState } from 'react';
import Logout from '../../Logout';
import axios from 'axios';
import { UserStats } from './UserStats';

function User() {
  type userObj = {
    name: string;
    user_id: number;
    photo: string;
  }

  let [user, setUser] = useState<userObj>({ name: '', user_id: 0, photo: '' });
  let [editTrigger, setEditTrigger] = useState(false);
  let [text, setText] = useState('');

  const getUserData = () => { // gget the currently logged in users data
    axios.get('/api/user/current')
      .then(data => setUser(data.data)) // set the logged in user data to user
      .catch(err => console.log(err));
  }

  const editUsername = (username) => { // edit the username of loggged in user
    axios.patch('/api/user/edit/username', { name: username })
      .then(data => getUserData())
      .catch(err => console.log(err));
  }

  const handleInputChange = event => { // when text is added to the edit username input
    setText(event.target.value) // set text state to the currently typed string
  }

  const applyEditChanges = (newUsername) => { // if the username is largger then 2 call change username function with new username string
    if (newUsername.length > 2) {
      editUsername(newUsername);
    }
  }

  useEffect(getUserData, [])

  return (
    <>
      <div>
        <p>User</p>
        <img src={user.photo} style={{ borderRadius: '18px' }} alt="Image" width='30%' height='30%' />


        <h1>name: {!editTrigger ? user.name : <input onChange={handleInputChange} value={text} type='text' name='text' placeholder={user.name}></input>}</h1>

        {!editTrigger ?
          <button onClick={() => setEditTrigger(!editTrigger)}>Edit profile</button> :
          <button onClick={() => {
            applyEditChanges(text)
            setEditTrigger(!editTrigger)
          }}>Apply changes</button>}
        <Logout />
        <UserStats userId={-1} />
      </div>
    </>
  );
}

export default User;

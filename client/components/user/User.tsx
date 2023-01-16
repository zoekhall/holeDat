import React, { useEffect, useState } from 'react';
import Logout from '../../Logout';
import axios from 'axios';
import { UserStats } from './UserStats';

function User() {
  type userObj = {
    name: string;
    user_id: number;
    photo: string;
  };

  type badgeObj = {
    imgUrl: string;
    description: string;
    name: string;
  };

  const [user, setUser] = useState<userObj>({ name: '', user_id: 0, photo: '' });
  const [editTrigger, setEditTrigger] = useState(false);
  const [text, setText] = useState('');
  const [badge, setBadge] = useState<badgeObj>();


  const getUserData = () => {
    // gget the currently logged in users data
    axios
      .get('/api/user/current')
      .then((data) => {
        setUser(data.data)
        if (data.data.badge_id !== 0) {
          axios.get('/api/badges/getBadge', { params: { badgeId: data.data.badge_id } })
            .then(({ data }) => setBadge(data))
            .catch((err) => console.log(err));
        }
      }) // set the logged in user data to user
      .catch((err) => console.log(err));
  };

  const editUsername = (username) => {
    // edit the username of loggged in user
    axios
      .patch('/api/user/edit/username', { name: username })
      .then(() => getUserData())
      .catch((err) => console.log(err));
  };

  const handleInputChange = (event) => {
    // when text is added to the edit username input
    setText(event.target.value); // set text state to the currently typed string
  };

  const applyEditChanges = (newUsername) => {
    // if the username is largger then 2 call change username function with new username string
    if (newUsername.length > 2) {
      editUsername(newUsername);
    }
  };

  useEffect(getUserData, []);

  return (
    <>
      <div className='userPf'>
        <section className='avatar-container'>
          <img
            src={user.photo}
            alt='Image'
            className='user-avatar'
          />
          {badge?.imgUrl ? <img
            className='user-badge'
            src={badge?.imgUrl}
            alt='Image'
          /> : <></>}
        </section>

        <h2>
          {!editTrigger ? (
            user.name
          ) : (
            <input
              onChange={handleInputChange}
              value={text}
              type='text'
              name='text'
              placeholder={user.name}
            ></input>
          )}
        </h2>

        {!editTrigger ? (
          <button onClick={() => setEditTrigger(!editTrigger)}>Edit Username</button>
        ) : (
          <button
            onClick={() => {
              applyEditChanges(text);
              setEditTrigger(!editTrigger);
            }}
          >
            Apply changes
          </button>
        )}
        <Logout />
        <UserStats userId={-1} />
      </div>
    </>
  );
}

export default User;

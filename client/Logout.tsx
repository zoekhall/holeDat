import React from 'react';
import Button from 'react-bootstrap/Button'

const Logout = () => {
  return (
    <a href='/logout' className='user-logout'>
      <Button className='basicButton'> Logout</Button>
    </a>
  );
};

export default Logout;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const localMode = localStorage.getItem('mode');

if (localMode === 'dark-mode') { //if mode isn't dark mode - set it
  document.body.classList.add('dark-mode');
  localStorage.setItem('mode', 'dark-mode'); //
}
const NavBar = () => {
  const menuItems = ['Map', 'About', 'Feed'];
  const [user, setUser] = useState<any>({})
  const [mode, setMode] = useState<any>('')

  const checkUser = () => {
    axios.get('/api/user/me')
      .then(data => setUser(data.data))
      .catch(err => console.log(err))
  }

  useEffect(checkUser, [])

  useEffect(() => { 
    setMode(localMode);
  }, []);

  const toggleMode = () => {
    if (mode !== 'dark-mode') { //if mode isn't dark mode - set it
      document.body.classList.add('dark-mode');
      localStorage.setItem('mode', 'dark-mode'); //
      setMode('dark-mode')
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.removeItem('mode') //if it is equal - remove it
      setMode('')
    }
  };

  return (
    <Navbar expand='lg' id='mainNavbar'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Brand href='/'>
        Hole Dat
        <img src='https://res.cloudinary.com/di6gxsepn/image/upload/v1670816293/ybyqlkegpdct6x5xeauz.svg' alt='logo' width='50' />
      </Navbar.Brand>
      {user.id ?
        <Button variant='outline-dark' href='/AddPothole' style={{ marginRight: '10%' }}>
          <i className='bi bi-plus-circle'></i>
        </Button>
        :
        <></>
      }
      <Button onClick={() => {toggleMode()}}>Toggle Mode</Button>
      {!user.photo ?
        < Button href='/auth/google/callback' variant='flat'>
          Sign In
        </Button>
        :
        <Link to={'/User'}>
          <img src={user.photo} alt='me' width={40} style={{ borderRadius: '100px' }} />
        </Link>
      }
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          {menuItems.map((item, i) => (
            <Nav.Link key={i} href={`/${item}`}>
              {item}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar >
  );
};

export default NavBar;

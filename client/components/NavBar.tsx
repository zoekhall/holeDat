import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { TUser } from '../types/user'


const NavBar = () => {
  const menuItems = ['Map', 'About', 'Feed'];
  const [user, setUser] = useState<TUser | null>(null)

  const checkUser = () => {
    axios.get('/api/user/me')
      .then(data => setUser(data.data))
      .catch(err => console.log(err))
  }

  useEffect(checkUser, [])

  return (
    <Navbar expand='lg' id='mainNavbar'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Brand href='/'>
        Hole Dat
        <img src='https://res.cloudinary.com/di6gxsepn/image/upload/v1670816293/ybyqlkegpdct6x5xeauz.svg' alt='logo' width='50' />
      </Navbar.Brand>
      {user?.id &&
        <Button variant='outline-dark' href='/AddPothole' style={{ marginRight: '10%' }}>
          <i className='bi bi-plus-circle'></i>
        </Button>
      }

      {!user?.photo ?
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

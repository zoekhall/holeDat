import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';



const NavBar = () => {
  const menuItems = ['Map', 'About', 'Feed'];

  return (
    <Navbar expand='lg' id='mainNavbar'>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Brand href='/'>Hole🕳️Dat</Navbar.Brand>
      <Button variant='outline-dark' href='/AddPothole' style={{ marginRight: '10%' }}>
        <i className='bi bi-plus-circle'></i>
      </Button>
      <Button href='/auth/google/callback' variant='flat'>
        Sign In
      </Button>
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='me-auto'>
          {menuItems.map((item, i) => (
            <Nav.Link key={i} href={`/${item}`}>
              {item}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;

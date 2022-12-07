import React from 'react';
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';


const NavBar = () => {
  const menuItems = ['Map', 'About', 'Feed']
  //Check if user is logged in to change text from login to logout
  return ( 
    <>
      <Navbar bg="light" expand="lg">
      <Container>
        {/* <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"> 
              {menuItems.map((item, i) => (
                <Nav.Link key={i} href={`/${item}`}>
                    {item}
                </Nav.Link>  
              ))} 
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Navbar.Brand href='/'>🕳️HoleDat</Navbar.Brand>
        <Button href='/auth/google/callback' variant="outline-primary">Sign In</Button>{' '}
      </Navbar>
  <Outlet /> 
    </> 
  );
}

export default NavBar;
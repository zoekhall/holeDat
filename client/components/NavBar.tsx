import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const NavBar = () => {
  const menuItems = ['Map', 'About', 'Feed']
  //Check if user is logged in to change text from login to logout
  return (
    <>
      <nav>
        <ul>
          {menuItems.map((item, i) => (
            <li key={i} >
              <Link to={`/${item}`} >
                {item}
              </Link>
            </li>
          ))}
        </ul>
        <a href='/'><h1>🕳️HoleDat</h1></a>
        {/* add profile pic*/}
        <a href='/auth/google/callback'>
          <button>Login with Google</button>
        </a>
      </nav>
      <Outlet />
    </>
  )
};

export default NavBar;

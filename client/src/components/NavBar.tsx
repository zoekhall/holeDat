import React from 'react';
import { Outlet, Link } from "react-router-dom";
// keep it dry
const NavBar = () => (
  <>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/pothole">Pothole</Link>
        </li>
        <li>
          <Link to="/user">Profile</Link>
        </li>
        <li>
          <Link to="/map">Map</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/feed">Feed</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </>
)


export default NavBar;



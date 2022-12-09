import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import NavBar from './NavBar';
import Home from './Home';
import Pothole from './pothole/Pothole';
import User from './user/User';
import About from './about/About';
import Feed from './feed/Feed';
import MapView from './map/Map';
import NoPage from './NoPage';
import AddPothole from './addPothole/AddPothole';

const App = () => (
  <BrowserRouter>
    <NavBar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='Pothole' element={<Pothole />} />
      <Route path='User' element={<User />} />
      <Route path='Map' element={<MapView />} />
      <Route path='About' element={<About />} />
      <Route path='Feed' element={<Feed />} />
      <Route path='*' element={<NoPage />} />
      <Route path='AddPothole' element={<AddPothole />} />
    </Routes>
  </BrowserRouter>
);

export default App;

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import NavBar from './NavBar';
import Home from './Home';
import Pothole from './pothole/Pothole';
import User from './user/User';
import About from './about/About';
import Feed from './feed/Feed';
import Map from './map/Map'
import NoPage from './NoPage';

const App = () => (
     <BrowserRouter>
          <NavBar />
          <Routes>
               <Route path="/" element={<Home />} />
               <Route path="pothole" element={<Pothole />} />
               <Route path="user" element={<User />} />
               <Route path="map" element={<Map />} />
               <Route path="about" element={<About />} />
               <Route path="feed" element={<Feed />} />
               <Route path="*" element={<NoPage />} />
          </Routes>
     </BrowserRouter>
);

export default App;

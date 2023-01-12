import React, { useState } from 'react';
import PImageSlider from './PImageSlider';
import UserImageSlider from './UserImageSlider';
import PotholesChart from '../about/PotholesChart';
import StatsChart from '../about/StatsChart';
import { io } from 'socket.io-client';




const Home = () => {
  const host = location.hostname

  const socketURL = host === 'localhost' ? 'http://localhost:8081' : 'https://holedat.com';
  const [userCount, setUserCount] = useState<number>(0);
  const [potholeCount, setPotholeCount] = useState<number>(0);

  const socket = io(socketURL);
  // Set up a listener for the "heartbeat" message
  socket.on('heartbeat', (data) => {
    setUserCount(data.data);
    socket.emit('heartbeat', { data });
    // Send a "heartbeat" message back to the server
  });

  socket.on('pothole', (data) => {
    setPotholeCount(data.data);
    socket.emit('pothole', { data });
  });


  return (
    <>
      <div className='home'>
        <h1>Welcome to Hole Dat</h1>
        <p className='welcome'>Hole Dat is a web application that helps users report and view potholes in the city of New Orleans. The app allows users to view a map of potholes in the area, view information about specific potholes, and report new potholes. The feed feature allows users to view recently added potholes and sort them by new or unique reports, and the pothole profile feature provides detailed information about each pothole and the user who reported it. With Hole Dat, residents of New Orleans can easily report potholes and see where others have been reported around the city. This helps the city to identify and fix potholes more efficiently, improving the safety and convenience of the roads for everyone. Whether you're a driver looking to avoid damaging your vehicle or a pedestrian trying to navigate the city, Hole Dat is a valuable resource for staying informed about potholes in the area.</p>
        <p>Total Potholes Submitted: {potholeCount}</p>
        <p>Total Users Submitted: {userCount}</p>
        <PImageSlider />
        <UserImageSlider />
        <PotholesChart />
        <StatsChart />
      </div>
    </>
  );
};

export default Home;

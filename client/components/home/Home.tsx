import React, { useState } from 'react';
import PImageSlider from './PImageSlider';
import UserImageSlider from './UserImageSlider';
import PotholesChart from '../about/PotholesChart';
import StatsChart from '../about/StatsChart';
import { io } from 'socket.io-client';

const Home = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [potholeCount, setPotholeCount] = useState<number>(0);
  const socket = io('ws://localhost:8081');
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
        <h1 className='home-title-page'>Home</h1>
        <h2>Most Reported Potholes</h2>
        <PotholesChart />
        <h2>Most Active Users</h2>
        <StatsChart />
        <p>Total Potholes Submitted: {potholeCount}</p>
        <p>Total Potholes Submitted: {userCount}</p>
        <h2>Latest Reports!</h2>
        <PImageSlider />
        <h2>New Users</h2>
        <UserImageSlider />
      </div>
    </>
  );
};

export default Home;

import React, { useState } from 'react';
import StatsChart from './StatsChart';
import { io } from 'socket.io-client';

const About = () => {
  const [userCount, setUserCount] = useState<number>(0);

  const socket = io('ws://localhost:8081');
  // Set up a listener for the "heartbeat" message
  socket.on('heartbeat', (data) => {
    setUserCount(data.data);
    socket.emit('heartbeat', { data });
    // Send a "heartbeat" message back to the server
  });

  return (
    <div>
      <h1>About Hole Dat</h1>
      <StatsChart />
      <div className='user-counter'>
        <p>Curent Users Signed Up: {userCount}</p>
      </div>
    </div>
  );
};

export default About;

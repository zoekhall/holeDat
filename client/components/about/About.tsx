import React, { useEffect } from 'react';
import StatsChart from './StatsChart';
import axios from 'axios';

const About = () => {
  const statsImgs = () => {
    axios
      .get('/api/imgs/stats')
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  useEffect(statsImgs, []);

  return <StatsChart />;
};

export default About;

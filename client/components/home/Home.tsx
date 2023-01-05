import React from 'react';
import PImageSlider from './PImageSlider';
import UserImageSlider from './UserImageSlider';

const Home = () => {
  return (
    <>
      <div className='home'>
        <h1 className='home-title-page'>Home</h1>
        <div style={{ display: 'flex' }}>
          <h2>Worst Pothole</h2>
          <h3>Top Poster</h3>
        </div>
        <h4>Latest Reports!</h4>
        <PImageSlider />
        <h4>New Users</h4>
        <UserImageSlider />
      </div>
    </>
  );
};

export default Home;

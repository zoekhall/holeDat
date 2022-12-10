import React from 'react';
import PImageSlider from './PImageSlider';
import UserImageSlider from './UserImageSlider';


const Home = () => {
  return (
    <>
      <h1 className='home-title-page'>Home</h1>
      <div style={{ display: 'flex' }}>
        <h3>
          Worst Pothole
        </h3>
        <img src='' />
        <h3>Top Poster</h3>
        <img src='' />
      </div>
      <h4>Latest Reports!</h4>
      <PImageSlider />
      <h4>New Users</h4>
      <UserImageSlider />
    </>
  )
}

export default Home;

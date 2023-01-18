import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button'
import axios from 'axios';

type badgeObj = {
  imgUrl: string;
  description: string;
  name: string;
  badge_id: number;
};

const About = () => {
  const [badges, setBadges] = useState<badgeObj[]>([]);
  const getBadges = () => {
    axios
      .get('/api/badges/allBadges')
      .then((data) => setBadges(data.data.sort((a, b) => a.badge_id - b.badge_id).reverse()))
      .catch((err) => console.log(err));
  };

  useEffect(getBadges, []);

  return (
    <div className='about'>
      <div className='about-content'>
        <h1>About Hole Dat:</h1>
        <p>
          Welcome to HoleDat, your community&apos;s solution for reporting and tracking potholes.
          Our user-friendly web application empowers residents to take an active role in improving
          the condition of roads in their area. With HoleDat, you can easily create Pothole Profiles
          that include all the necessary information and photos for local authorities or citizens to
          take action. This helps ensure that potholes are fixed promptly and keeps the roads in
          your community safe for all users. Don&apos;t let potholes damage your vehicle and
          compromise the safety of your community. Join the HoleDat community and make a difference
          today.
        </p>
        <p className='reported'>
          Report Pothole to NOLA.gov:
          <a href='https://nola311.org/service-request/'>
            <Button className='basicButton'>Report</Button>
          </a>
        </p>
      </div>
      <div className='about-content'>
        <h1>About our team:</h1>
        <div className='team-photos'>
          <img
            title='Jorge'
            src='https://lh3.googleusercontent.com/a/AEdFTp4cZIFWbCtWSOjvGfDHVZyaa6jaoRvMou34nkzefQ=s96-c'
          />
          <img
            title='Sidney'
            src='https://ca.slack-edge.com/T02P3HQD6-U031A9H64J0-2230e77dd0d2-72'
          />
          <img title='Zoe' src='https://ca.slack-edge.com/T02P3HQD6-U021ZA4UMK4-3d5b064fb2ef-72' />
          <img title='Sam' src='https://ca.slack-edge.com/T02P3HQD6-U039PKMULBW-e9d3c0bad176-72' />
          <img title='Zach' src='https://ca.slack-edge.com/T02P3HQD6-U03D5TUMZ09-73124c88bcff-72' />
        </div>
        <p>
          The developers of Hole Dat - Jorge Carvajal, Sidney Holmes, Zoe Hall, Samuel Littell, and
          Zachary Marullo - are currently students at Operation Spark. Operation Spark is a program
          that teaches individuals from underrepresented communities the skills needed to become
          software developers. The application was developed as a way for us to apply the skills we
          learned in the program and to help address a common problem in our community.
        </p>
      </div>
      <div className='about-content'>
        <h1>Badges System:</h1>
        <p>
          HoleDat rewards users for their contributions to the community with badge tiers. Each tier
          represents a different level of participation, with Bronze being the first level, and
          Diamond being the highest. The Bronze tier is earned by reporting 10 potholes, and is the
          starting point for becoming an active member of the community. The Silver tier is awarded
          to users who have reported even more potholes, demonstrating a higher level of engagement
          and commitment. The Gold tier recognizes users who have reported a significant number of
          potholes and have made a noticeable impact in their community. The Platinum badge is
          awarded to users who have reported a very high number of potholes and have made a
          significant impact in the community. This level is a recognition of an outstanding level
          of engagement and commitment towards the betterment of local roads. The Diamond badge is
          the highest honor and is reserved for the most active and dedicated users who have
          reported the most potholes, and have made a meaningful difference in the state of the
          roads in their community. Badges are prominently displayed on a user&apos;s profile and
          serve as a visual representation of their progress and participation in the community. By
          tracking their badge level, users are incentivized to report more potholes and make a
          greater impact on their local road conditions.
        </p>
        <div className='badges'>
          {badges?.map((badge) => (
            <div key={badge.badge_id} className='badge-images'>
              <img src={badge.imgUrl} />
              <p>{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='about-content'>
        <h1>Reporting and Submitting Potholes:</h1>
        <p>
          To easily report or update a pothole, simply click on the plus icon at the top right
          corner. You&apos;ll then be prompted to enter the location of the pothole, upload an image
          for reference, and rate the pothole. Once the form is submitted, a detailed Pothole
          Profile will be created for it, allowing other users and local authorities to access the
          information and take action as needed. Your submitted pothole will also be visible in the
          community&apos;s feed. Furthermore, all the potholes reported will be reflected on the
          user&apos;s profile page, making it easy to keep track of the ones you reported.
        </p>
      </div>
      <div className='about-content'>
        <h1>Rating System:</h1>
        <p>
          HoleDat&apos;s rating system is designed to help users and authorities quickly gauge the
          severity of a reported pothole. Each pothole is assigned a rating on a scale of 1-5 cones,
          with 5 cones indicating the most severe potholes and one cone indicating a pothole that is
          not hazardous. The rating system is based on the depth and width of the pothole, its
          location and the potential dangers it poses to vehicles and pedestrians. Users can rate
          potholes they report as well as potholes other users have submitted. A five cone rating
          would mean that the pothole is severe, deep and poses potential threat to vehicles,
          whereas a 1 cone rating would mean that the pothole is small, shallow and does not pose
          much danger to vehicles. With this system in place, users and authorities can prioritize
          their efforts and fix the most severe potholes first. It also helps them to track the
          repair work done on reported potholes.
        </p>
      </div>
    </div>
  );
};

export default About;

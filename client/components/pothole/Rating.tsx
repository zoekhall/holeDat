import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Switch from 'react-bootstrap/Switch';

const Rating = () => {
  const id = Number(useLocation().pathname.split(':')[1]);
  const addy = useLocation().state.addy;
  const user = useLocation().state.user;
  const [fixed, setFixed] = useState<boolean>(false);
  const [rating, setRating] = useState<number>(0);

  const ratePothole = () => {
    axios
      .post('/api/rating/fromPh', { id, fixed, rating, user })
      .catch((data) => console.log(data));
  };

  return (
    <div className='profile-rating'>
      <h1>{addy}</h1>
      <div className='fixed'>
        <p>Busted</p>
        <Switch checked={fixed} onChange={() => setFixed(!fixed)} />
        <p>Fixed</p>
      </div>
      <div className='voting-cones'>
        {Array.from(Array(5)).map((e, i) => {
          return (
            <svg
              key={i}
              onClick={() => setRating(i + 1)}
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              fill='currentColor'
              id={`cone-num-${i}`}
              className={`bi bi-cone-striped${i < rating ? ' clickCone' : ''}`}
              viewBox='0 0 16 16'
            >
              <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
            </svg>
          );
        })}
      </div>
      {rating >= 1 ? (
        <Link to={'/Pothole:' + id}>
          <button onClick={ratePothole}>submit</button>
        </Link>
      ) : (
        <button>Rating Needed</button>
      )}
    </div>
  );
};

export default Rating;

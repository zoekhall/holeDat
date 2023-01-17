import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

interface User {
  name: string;
  photo: string;
  userId_user: number | undefined;
}

const Likes = ({
  user,
  image,
}: {
  user: User;
  image: { [key: string]: number | boolean | string };
}) => {
  const [ratio, setRatio] = useState<number>(0);
  const [usersLike, setUsersLike] = useState<boolean | null>(null);
  const [upConeStyle, setUpConeStyle] = useState<{ [key: string]: string }>({});
  const [downConeStyle, setDownConeStyle] = useState<{ [key: string]: string }>({});

  const { image_id } = image;
  const { userId_user } = user;

  const sendLike = (bool: boolean) => {
    axios
      .post('/api/likes/', { params: { bol: bool, userId_user, image_id } })
      .then(() => {
        const isUsersLike = usersLike !== null;
        let newBol: boolean | null = bool;
        if (isUsersLike) {
          if (!bool && usersLike) {
            setRatio(ratio - 2);
          } else if (bool && !usersLike) {
            setRatio(ratio + 2);
          } else if (bool && usersLike) {
            newBol = null; /// ^ ^
            setRatio(ratio - 1);
          } else if (!bool && !usersLike) {
            newBol = null; // V V +1
            setRatio(ratio + 1);
          }
        } else {
          if (bool) {
            setRatio(ratio + 1);
          } else if (!bool) {
            setRatio(ratio - 1);
          }
        }
        setUsersLike(newBol);
      })
      .catch((err) => console.log(err));
  };

  const getLikes = () => {
    axios
      .get('/api/likes/', { params: { image_id } })
      .then(({ data }) => {
        const newRatio = data.upCone - data.downCone;
        setRatio(newRatio);
      })
      .catch((err) => console.log(err));
  };

  const getUserLike = () => {
    axios.get('/api/likes/user', { params: { userId_user, image_id } }).then(({ data }) => {
      if (data !== 'null') {
        setUsersLike(data);
      } else {
        setUsersLike(null);
      }
    });
  };

  const handleColor = () => {
    if (usersLike === null) {
      setDownConeStyle({ rotate: '180deg', filter: 'grayscale(100%)' });
      setUpConeStyle({ filter: 'grayscale(100%)' });
    } else if (usersLike) {
      setDownConeStyle({ rotate: '180deg', filter: 'grayscale(100%)' });
      setUpConeStyle({ filter: 'grayscale(0%)' });
    } else if (!usersLike) {
      setDownConeStyle({ rotate: '180deg', filter: 'grayscale(0%)' });
      setUpConeStyle({ filter: 'grayscale(100%)' });
    }
  };

  useEffect(() => {
    getUserLike();
    getLikes();
  }, []);

  useEffect(handleColor, [usersLike]);

  return (
    <Col className='like_pics'>
      <Row>
        <svg
          onClick={() => sendLike(true)}
          xmlns='http://www.w3.org/2000/svg'
          width='35'
          fill='currentColor'
          style={upConeStyle}
          viewBox='0 0 16 16'
          id='upCone'
          className={`bi-cone-striped`}
        >
          <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
        </svg>
      </Row>
      <br/>
      <h3>{ratio}</h3>
      <br/>
      <Row>
        <svg
          onClick={() => sendLike(false)}
          xmlns='http://www.w3.org/2000/svg'
          width='35'
          fill='currentColor'
          style={downConeStyle}
          viewBox='0 0 16 16'
          id='downCone'
          className={`bi-cone-striped`}
        >
          <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
        </svg>
      </Row>
    </Col>
  );
};

export default Likes;

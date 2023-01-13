import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { useLocation, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import CommentForm from './CommentForm';
import Likes from './Likes';
// import Switch from 'react-bootstrap/Switch';
// import PotholeRating from '../addPothole/formQuestions/PotholeRating';
// import PotholeStatus from '../addPothole/formQuestions/PotholeStatus';

const Pothole = () => {
  const id = Number(useLocation().pathname.split(':')[1]);

  interface User {
    name: string;
    photo: string;
    userId_user: number | undefined;
  }

  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    userId: number;
    userName: string;
    userPhoto: string;
    lat: number;
    lon: number;
    fixed: boolean;
  };

  const [PImages, setPImages] = useState<phImg[]>([]);
  const [addy, setAddy] = useState<string[]>([]);
  // const [phId] = useState<number>(id);
  const [user, setUser] = useState<User>({
    name: '',
    photo: '',
    userId_user: undefined,
  });
  const [avg, setAvg] = useState<number>(0);
  // const [fixed, setFixed] = useState<boolean>(false);
  // const [voteCount, setVotecount] = useState<number>(0);

  const getAllRatingByPhId = () => {
    axios.get('/api/rating/rating' + id).then((data) => {
      const Avg =
        data.data.reduce((acc, curr) => {
          acc += curr;
          return acc;
        }, 0) / data.data.length;
      setAvg(Math.round(Avg));
      // setVotecount(data.data.length);
    });
  };

  // get pothole images by potholeID
  const getAllPotholeImgByPhId = () => {
    axios
      .get('/api/imgs/potholeimgs' + id)
      .then((data) => {
        const resObj: [] = data.data.map((each) => {
          const { image_id, caption, photoURL } = each;
          const { user_id, name, photo } = each.User;
          const { lat, lon, fixed } = each.Pothole;
          return {
            image_id,
            caption,
            photoURL,
            userId: user_id,
            userName: name,
            userPhoto: photo,
            lon,
            lat,
            fixed,
          };
        });
        setPImages(resObj);
        return data.data[0].Pothole;
      })
      .then((data) => {
        const { lat, lon } = data;
        axios('/api/location/getAddy', { params: { lat, lon } }).then((data) =>
          setAddy(data.data.split(',')[0])
        );
      })
      .catch((err) => console.log(err));
  };

  const getUser = () => {
    axios.get('/api/user/me').then((data) => {
      setUser({
        name: data.data.name,
        photo: data.data.photo,
        userId_user: data.data.user_id,
      });
    });
  };

  useEffect(() => {
    getUser();
    getAllPotholeImgByPhId();
    getAllRatingByPhId();
  }, []);

  return (
    <div id='potholeProfile'>
      <Container id='potholeSect' className='post'>
        <Container className='post_header'>
          <div id='address/rating'>
            <h3>{addy}</h3>
            <div id='score'>{avg}</div>
          </div>
        </Container>
        {/* <div>
          <PotholeRating />
          <div className='fixed'>
          <Switch checked={fixed} onChange={() => setFixed(!fixed)} />
          <p>Fixed</p>
          </div>
        </div> */}
        <Swiper
          className='mySwiper potholeSlider'
          pagination={true}
          effect={'cards'}
          id='pothole-profile-slider'
          grabCursor={true}
          modules={[Pagination]}
        >
          {PImages.map((image) => {
            return (
              <SwiperSlide key={image.image_id}>
                <img className='potHole_img' src={image.photoURL} alt='test' />
                <Container className='post_caption'>
                  <Row>
                    <Col>
                      <Row>
                        <Col xs={1} id='profBadge'>
                          <div></div>
                        </Col>
                        <Col xs={2} id='profAvatar'>
                          <Link to={'/User:' + image.userId}>
                            <img className='avatar' alt='avatar2' src={image.userPhoto} />
                          </Link>
                        </Col>
                        <Col id='innerProfCapt'>
                          <div>
                            <h3>{image.userName}</h3>
                            <h4>{image.caption}</h4>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={2}>{user?.name && <Likes user={user} image={image} />}</Col>
                  </Row>
                </Container>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Container>

      {/* <CommentForm phId={phId} /> */}
    </div>
  );
};

export default Pothole;

// <div className='rate-cones'>
//   <Link to={'/Rating:' + id} state={{ addy, user }}>
//     {user?.userId_user && <button>Rate</button>}
//   </Link>
//   <div className='voting-cones'>
//     {Array.from(Array(5)).map((e, i) => {
//       return (
//         <svg
//           key={i}
//           xmlns='http://www.w3.org/2000/svg'
//           id={`cone-num-${i}`}
//           className={`${i < avg ? 'clickCone' : ''}`}
//           viewBox='0 0 16 16'
//         >
//           <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
//         </svg>
//       );
//     })}
//     {voteCount}
//   </div>
// </div>

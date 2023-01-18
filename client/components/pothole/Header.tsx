import React, {useState} from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import { useLocation } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Switch from 'react-bootstrap/Switch';
import PotholeRating from '../addPothole/formQuestions/PotholeRating';

const Header = (prop) => {
  const id = Number(useLocation().pathname.split(':')[1]);
  // const [currentUser, setCurrentUser]
  const { addy, avg, fixed, voteCount, user } = prop;
  const [status, setStatus] = useState<boolean>(fixed);

  //handle rating/status 
  const handleAction = (value) => {
    const type = typeof value === 'number' ? 'rating' : 'status';
    const ratingStatusObj = {type, value}
    axios
      .post('/api/rating/fromPh', { id, ratingStatusObj, fixed, user }) //whatever the current status is
      .catch((data) => console.log(data));
  };

  return (
    <Container id='header'>
      <Row id='addyRating' className='alignItems'>
        <Col id='addy'>{addy}</Col>
        <Col id='totalRating' className='newline'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='8%'
            fill='currentColor'
            className={`bi bi-cone-striped`}
            viewBox='0 0 16 16'
          >
            <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
          </svg>
          {avg}&nbsp;<span id='totalVoteCount'>({voteCount})</span>
        </Col>
        <Col id='status'>
          <h4>{fixed === false ? 'Busted' : 'Fixed'}</h4>
        </Col>
      </Row>
      
      {user?.name && (<Row id='ratings'>
        <Col className='group newline' sm>
          <p>Rate This Pothole:</p>
          <PotholeRating handleClick={handleAction} />
        </Col>

        <Col className='group' sm>
          <p>Confirm Pothole Status:</p>
          <div className='fixed'>
            <Switch
              checked={status}
              onChange={() => {
                const newStatus = !status;
                handleAction(newStatus);
                setStatus(newStatus);
              }}
            />
            <p>{status === true ? 'Busted' : 'Fixed'}</p>
          </div>
        </Col>
      </Row>
      )}
    </Container>
  );
};

export default Header;

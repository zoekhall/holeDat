import React, { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

//cone rating functionality - allows user to select number of cones to rate pothole
const PotholeRating = (prop) => {
  const { handleClick } = prop; //handleClick function passed as prop
  const [rating, setRating] = useState<number>(0); //state to hole selected rating 

  return (
    <Container id='ratingPot'> 
      <Row className='ratingGroupDiv'>
        <Col
          className='center ratingElem'
          id='coneCol'
          xs={{ order: 1 }}
          md={{ span: 6, order: 2 }}
        >
          <div id='cones'>
            {[1, 2, 3, 4, 5].map((num, i) => (
              <svg
                key={i}
                onClick={() => {
                  handleClick(num);
                  setRating(num);
                }}
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                id={`cone-num-${i}`}
                className={`bi-cone-striped${i < rating ? ' clickCone' : ''}`}
                viewBox='0 0 16 16'
              >
                <path d='m9.97 4.88.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z' />
              </svg>
            ))}
          </div>
        </Col>
      </Row>
      <Row>
        <Col id='harmless' className='coneText'>
          <p>Harmless</p>
        </Col>
        <Col id='severe' className='coneText'>
          <p>Severe</p>
        </Col>
      </Row>
    </Container>
  );
};

export default PotholeRating;

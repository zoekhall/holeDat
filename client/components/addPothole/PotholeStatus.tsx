import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const PotholeStatus = ({handleStatus}) => {

  return (
    <Form.Group id='addPotStatus' className='mb-5'>
      <Form.Label>Is Dat Pothole Fixed?</Form.Label>
      {['Not Fixed', 'Fixed'].map((label, id) => (
        <div key={`inline-${id}`}>
          <Form.Check
            inline
            label={label}
            name='group1'
            type='radio'
            onChange={() => handleStatus(label)}
          />
        </div>
      ))}
    </Form.Group>
  );
}

PotholeStatus.propTypes = {
  handleStatus: PropTypes.func.isRequired
}

export default PotholeStatus;
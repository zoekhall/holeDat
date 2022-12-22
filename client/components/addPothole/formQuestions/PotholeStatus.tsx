import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const PotholeStatus = ({ handleStatus }) => {
  const [status, setStatus] = useState<boolean>(false);
  
  const finalStatus = (stat) => {
    setStatus(stat === 'Not Fixed' ? false : true);
    handleStatus(status);
  }

  return (
    <Form.Group id='addPotStatus' className='mb-5'>
      {['Not Fixed', 'Fixed'].map((label, id) => (
        <div key={`inline-${id}`}>
          <Form.Check
            inline
            label={label}
            name='group1'
            type='radio'
            onChange={() => finalStatus(label)}
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
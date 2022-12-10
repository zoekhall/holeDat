import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const PotholeStatus = ({handleStatusChange}) => {

  const [status, setStatus] = useState<boolean>(false);

  const changeStatus = () => {
    const newStatus = status === false ? true : false;
    console.log(newStatus);
    setStatus(newStatus);
    handleStatusChange(newStatus);
  }
  
  return (
    <Form.Group
      controlId='addPotStatus'
      className='mb-5'
      onChange={changeStatus}
    >
      <Form.Check type='switch' id='custom-switch' label='Is the Pothole Fixed?' />
    </Form.Group>
  );
}

PotholeStatus.propTypes = {
  handleStatusChange: PropTypes.func.isRequired
}

export default PotholeStatus;


//STORAGE -- as radio buttons //
    // <Form.Group as={Col} controlId='addPotStatus' className='mb-5' onChange={event => console.log(event.target.name)}>
    //   <Form.Label>What is the Status of the Pothole?</Form.Label>
    //   {['radio'].map((type) => (
    //     <div key={`inline-${type}`} className='mb-3'>
    //       <Form.Check
    //         inline
    //         label='Not Fixed'
    //         name='notFixed'
    //         type='radio'
    //         id='radio'
    //       />
    //       <Form.Check
    //         inline
    //         label='Fixed'
    //         name='Fixed'
    //         type='radio' 
    //         id='fixed'
    //       />
    //     </div>
    //   ))}
    // </Form.Group>
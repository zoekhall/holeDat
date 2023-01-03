import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { StatusContext } from '../AddPothole';

const PotholeStatus = () => {
  const { statusContents, setStatusContents } = useContext(StatusContext);

  return (
    <Form.Group id='addPotStatus' className='mb-5'>
      {['Not Fixed', 'Fixed'].map((label, id) => (
        <div key={`inline-${id}`}>
          <Form.Check
            inline
            label={label}
            name='group1'
            type='radio'
            onChange={() => {
              const newStatusContents = { ...statusContents };
              newStatusContents.fixed = label === 'Not Fixed' ? false : true;
              setStatusContents(newStatusContents);
            }}
          />
        </div>
      ))}
    </Form.Group>
  );
}

export default PotholeStatus;
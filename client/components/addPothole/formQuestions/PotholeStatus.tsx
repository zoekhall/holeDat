import React from 'react';
import Form from 'react-bootstrap/Form';

//fixed or busted status
const PotholeStatus = (prop) => {
  const { handleChange } = prop;

  return (
    <Form.Group id='addPotStatus'>
      {['Busted', 'Fixed'].map((label, id) => (
        <div key={`inline-${id}`}>
          <Form.Check
            inline
            required
            label={label}
            name='group1'
            type='radio'
            onChange={() => handleChange(label)}
          />
        </div>
      ))}
    </Form.Group>
  );
};

export default PotholeStatus;

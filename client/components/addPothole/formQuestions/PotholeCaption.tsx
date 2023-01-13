import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { ImageContext } from '../AddPothole';

//photo caption text-box
const PotholeCaption = () => {
  const { imageContents, setImageContents } = useContext(ImageContext);

  return (
    <Form.Group controlId='addPotCaption' className='mb-2'>
      <Form.Control
        id='captionBox'
        as='textarea'
        onChange={(e) => {
          const newImageContents = { ...imageContents };
          newImageContents.caption = (e.target as HTMLInputElement).value;
          setImageContents(newImageContents);
        }}
        required
      />
    </Form.Group>
  );
};

export default PotholeCaption;

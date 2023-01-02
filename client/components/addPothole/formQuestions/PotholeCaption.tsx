/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { ImageContext } from '../AddPothole';

//photo caption text-box
const PotholeCaption = () =>{
  const { imageContents, setImageContents } = useContext(ImageContext);

  return (
    <Form.Group
      controlId='addPotCaption'
      className='mb-5'
      onChange={(e) => {
        const newImageContents = {...imageContents};
        newImageContents.caption = (e.target as HTMLInputElement).value;
        setImageContents(newImageContents);
      }} //changes caption in parent
    >
      <Form.Control as='textarea' required />
    </Form.Group>
  );
}

export default PotholeCaption;
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { ImageContext } from '../AddPothole';

//Component with the photo upload box. Assigns photo file and url to image context
const PotholePic = () => {
  const { imageContents, setImageContents } = useContext(ImageContext);

  const handleChange = (e) => {
    const newImageContents = { ...imageContents };
    newImageContents.file = e.target.files[0];
    newImageContents.photoURL = URL.createObjectURL(e.target.files[0]);
    setImageContents(newImageContents);
  };

  return (
    <Form.Group controlId='uploadPotPhoto' className='mb-5'>
      <Form.Control type='file' onChange={handleChange} required />
      <img id='inputImg' src={imageContents.photoURL} />
    </Form.Group> 
)};


export default PotholePic;

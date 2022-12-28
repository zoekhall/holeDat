/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { ImageContext } from '../AddPothole';

//photo upload box
const PotholePic = () => {
  const { imageContents, setImageContents } = useContext(ImageContext)

  const handleChange = () => {
    // const newImageContents = { ...imageContents };
    // newImageContents.url = URL.createObjectURL(e.target.files[0]);
    // setImageContents(newImageContents);
  }

  return (
    <Form.Group
      controlId='uploadPotPhoto'
      className='mb-5'
      onChange={(e) => {
        //when a file is selected, set the imageContents/file state to that photo object
        const event = e.target as HTMLInputElement;
        if (event.files !== null) {
          const newImageContents = { ...imageContents };
          newImageContents.file = event.files[0];
          setImageContents(newImageContents);
        }
      }}
    >
        <Form.Control type='file' onChange={handleChange} required />
        <div>
          <img src={imageContents.url} />
        </div>
    </Form.Group>
)};

export default PotholePic;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { ImageContext } from '../AddPothole';
import heic2any from 'heic2any';
import imageCompression from 'browser-image-compression'
//photo upload box. Assigns photo file and url to image context
const PotholePic = () => {
  const { imageContents, setImageContents } = useContext(ImageContext);

  const handleChange = async (e) => {
    const handlePhoto = async (pic) => {
      if (pic.type === 'image/heic') {
        const jpeg: any = await heic2any({
          blob: pic,
          toType: 'image/jpeg',
        });
        newImageContents.photoURL = URL.createObjectURL(jpeg);
        setImageContents(newImageContents);
      } else {
        newImageContents.file = pic
        newImageContents.photoURL = URL.createObjectURL(pic);
        setImageContents(newImageContents);
      }
    }

    const newImageContents = { ...imageContents };
    newImageContents.file = e.target.files[0];
    const imageFile = e.target.files[0];
    if (imageFile.size > 3e6) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 400,
        useWebWorker: true
      }
      try {
        const compressedFile = await imageCompression(imageFile, options);
        await handlePhoto(compressedFile); // write your own logic
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('nope')
      handlePhoto(imageFile)
    }


  };

  return (
    <Form.Group controlId='uploadPotPhoto'>
      <Form.Control type='file' onChange={handleChange} required />
      <div id='imgInput'>
        <img src={imageContents.photoURL} />
      </div>
    </Form.Group>
  );
};

export default PotholePic;

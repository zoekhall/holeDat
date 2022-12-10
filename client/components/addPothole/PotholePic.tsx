import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const PotholePic = ({ handleImage }) => {

  const [file, setFile] = useState<any>(null);

  //handle clicking the 'choose file' button 
  const onButtonClick = (e) => {
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0]);
    }
    updateImage(file, 'photoURL')
  };

  //send the information back to parent 
  const updateImage = (val, type) => {
    handleImage(val, type);

    // if (file) {
    //   return <img src={file} alt='chosenImage' width='100px' />;
    // }
  }

  return (
    <>
      <Form.Group controlId='uploadPotPhoto' className='mb-5'>
        <Form.Label>Upload a Picture of the Pothole</Form.Label>
        <Form.Control type='file' required onClick={onButtonClick} />
        {/* {updateImage} */}
      </Form.Group>

      <Form.Group
        controlId='addPotCaption'
        className='mb-5'
        onChange={(e) => updateImage((e.target as HTMLInputElement).value, 'caption')}
      >
        <Form.Label> Describe the Pothole </Form.Label>
        <Form.Control as='textarea' required />
      </Form.Group>
    </>
  );
};

PotholePic.propTypes = {
  handleImage: PropTypes.func.isRequired,
};

export default PotholePic









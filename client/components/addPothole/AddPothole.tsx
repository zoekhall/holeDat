/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import LocationSection from './formSections/LocationSection';
import ImageSection from './formSections/ImageSection';
import StatusSection from './formSections/StatusSection';
import Submitted from './formSections/Submitted';

/* -------------------------------- Contexts -------------------------------- */
interface LocationContextType {
  coordinates: { lat: number; lon: number };
  setCoordinates: Dispatch<SetStateAction<{ lat: number; lon: number }>>;
}
export const LocationContext = createContext<LocationContextType>({
  coordinates: { lat: 0, lon: 0 },
  setCoordinates: () => {},
});
interface ImageContextType {
  imageContents: { file: any; caption: string; photoURL: string };
  setImageContents: Dispatch<SetStateAction<{ file: any; caption: string; photoURL: string }>>;
}
export const ImageContext = createContext<ImageContextType>({
  imageContents: { file: {}, caption: '', photoURL: '' },
  setImageContents: () => {},
});
interface StatusContextType {
  statusContents: { fixed: any; rating: number };
  setStatusContents: Dispatch<SetStateAction<{ fixed: any; rating: number }>>;
}
export const StatusContext = createContext<StatusContextType>({
  statusContents: { fixed: false, rating: 0 },
  setStatusContents: () => {},
});

/* --------------------------- Main Form Component -------------------------- */
const AddPothole = () => {
  const sections: Array<string> = ['Welcome', 'Location', 'Image', 'Status'];
  const [view, setView] = useState<string>('Welcome');
  const [progress, setProgress] = useState<number>(0);
  const [user_id, setUser_id] = useState<number>(0);
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [imageContents, setImageContents] = useState({ file: null, caption: '', photoURL: '' });
  const [statusContents, setStatusContents] = useState({ fixed: false, rating: 0 });

  //* Set the User Id *//
  useEffect(() => {
    axios('/api/user/me')
      .then(({ data }) => setUser_id(data.user_id))
      .catch((err) => console.error('FAILURE TO RETRIEVE USER', err));
  }, []);

  //* Handle Click *//
  const handleClick = () => {
    const nextSection = sections.indexOf(view) + 1;
    setView(sections[nextSection]);
    setProgress(progress + 34);
  };

  //* Handle Submission *//
  const handleSubmit = () => {
    // if (imageContents.file) {
    //   const formData = new FormData();
    //   formData.append('file', imageContents.file);
    //   axios
    //     .post('/api/imgs/addimg', formData)
    //     .then(({ data }) => {
    const updatedImageContents = { ...imageContents };
    //       updatedImageContents.photoURL = data;
    
    const masterObj = { coordinates, updatedImageContents, statusContents, user_id };
    console.log(masterObj);

    //       axios
    //         .post('/api/pothole/addPothole', masterObj)
    //         .catch((err) => console.error('Failure to Add Pothole to Database', err));
    //     })
    //     .catch((err) => console.error('Failure to Submit Image to Cloud', err));
    // }

    setView('Submitted');
  };

  //* Handle Which Section of the Form is Rendered *//
  const handleSectionalView = () => {
    if (view === 'Location') {
      return (
        <LocationContext.Provider value={{ coordinates, setCoordinates }}>
          <LocationSection />
        </LocationContext.Provider>
      );
    } else if (view === 'Image') {
      return (
        <ImageContext.Provider value={{ imageContents, setImageContents }}>
          <ImageSection />
        </ImageContext.Provider>
      );
    } else if (view === 'Status') {
      return (
        <StatusContext.Provider value={{ statusContents, setStatusContents }}>
          <StatusSection />
        </StatusContext.Provider>
      );
    } else {
      return (
        <div>
          <h5>Time to Submit a Pothole to the Pothole Panoply!</h5>
          <h6>Fill out this quick form in order to submit a pothole!</h6>
        </div>
      );}
  };

  //* Handle Form Components //*
  const handleFormComps = () => {
    if (view === 'Submitted') {
      return <Submitted />;
    }

    return (
      <div>
        <h1>Report a Pothole</h1>
        {handleSectionalView()}
        <Button
          type='button'
          variant='outlined-dark'
          onClick={view === 'Status' ? handleSubmit : handleClick}
        >
          Next
        </Button>
        <ProgressBar now={progress} />
      </div>
    );

  };

  return <Form id='addPothole'>{handleFormComps()}</Form>;
};

export default AddPothole;
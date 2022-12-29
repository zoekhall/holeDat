/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react';
import Form from 'react-bootstrap/Form';
import LocationSection from './formSections/LocationSection';
import ImageSection from './formSections/ImageSection';
import Button from 'react-bootstrap/Button';
import ProgressBar from 'react-bootstrap/ProgressBar';
import StatusSection from './formSections/StatusSection';
import axios from 'axios';

/* -------------------------------- Contexts -------------------------------- */
interface LocationContextType {
  coordinates: {lat:number, lon:number}; 
  setCoordinates: Dispatch<SetStateAction<{lat:number, lon:number}>>;
}
export const LocationContext = createContext<LocationContextType>({
  coordinates: {lat:0, lon:0},
  setCoordinates: () => {},
});
interface ImageContextType {
  imageContents: { file: any; caption: string; photoURL: string; user_id: number };
  setImageContents: Dispatch<SetStateAction<{ file: any; caption: string; photoURL: string; user_id: number }>>;
}
export const ImageContext = createContext<ImageContextType>({
  imageContents: { file: {}, caption: '', photoURL: '', user_id: 0 },
  setImageContents: () => {},
});
interface StatusContextType {
  statusContents: { fixed: any; overall: number; user_id: number };
  setStatusContents: Dispatch<SetStateAction<{ fixed: any; overall: number; user_id: number } >>;
}
export const StatusContext = createContext<StatusContextType>({
  statusContents: { fixed: false, overall: 0, user_id: 0  },
  setStatusContents: () => {},
});

/* --------------------------- Main Form Component -------------------------- */
const AddPothole = () => {
  const [view, setView] = useState<string>('welcomeView');
  const [progress, setProgress] = useState<number>(0);
  const [user_id, setUser_id] = useState<number>(0);

  const [coordinates, setCoordinates] = useState({lat:0, lon:0});
  const [imageContents, setImageContents] = useState({ file: null, caption: '', photoURL: '' , user_id: 0});
  const [statusContents, setStatusContents] = useState({ fixed: false, overall: 0, user_id: 0 });

  //* Set the User Id *//
  useEffect(() => {
    axios
      .get('/api/user/me')
      .then(({ data }) => {
        setUser_id(data.user_id);
      })
      .catch((err) => console.error('Failure to Get User', err));
  }, []);

  //* Handle Submission *//
  const handleSubmit = () => {
    const formData = new FormData();

    if(imageContents.file){
      formData.append('file', imageContents.file);
      axios.post('/api/imgs/addimg', formData)
      .catch(err => console.error('Failure to Submit Image to Cloud', err))
    }

    const masterObj = { coordinates, imageContents, statusContents, user_id };

    axios.post('/api/pothole/addPothole', masterObj)
    .catch(err => console.log('Failure to Add Pothole to Database', err))

    console.log(masterObj);
  }

  //* Handle Which Section of the Form is Rendered *//
  const handleView = () => {
    if (view === 'imageSection') {
      return (
        <ImageContext.Provider value={{ imageContents, setImageContents }}>
          <ImageSection setView={setView} setProgress={setProgress} />
        </ImageContext.Provider>
      );
    } else if (view === 'statusSection') {
      return (
        <StatusContext.Provider value={{ statusContents, setStatusContents }}>
          <StatusSection handleSubmit={handleSubmit} />
        </StatusContext.Provider>
      );
    } else if (view === 'locationSection') {
      return (
        <LocationContext.Provider value={{ coordinates, setCoordinates }}>
          <LocationSection setView={setView} setProgress={setProgress} />
        </LocationContext.Provider>
      );
    } else {
      return (
        <div>
          <h2>Add a Pothole to our Pothole Treasury! </h2>
          <Button
            type='button'
            variant='outlined-dark'
            onClick={() => {
              setView('locationSection');
              setProgress(35);
            }}
          >
            Next
          </Button>
        </div>
      );
    }
  };

  return (
    <Form id='addPothole'>
      <h1>Report a Pothole</h1>
      {handleView()}
      <ProgressBar now={progress} />
    </Form>
  );
};

export default AddPothole;

/* --------------------------------- STORAGE -------------------------------- */
// export const LocationContext = createContext<LocationInterface | null>(null);

// export const LocationContext = createContext({
//   lat: 0,
//   setLat: () => {},
//   lon: 0,
// setLon: Dispatch<SetStateAction<number | null>>
// })
// export const ImageContext = createContext({
//   photoFile: {},
//   setPhotoFile: () => {},
//   caption: '',
//   setCaption: () => {},
// })
// export const RatingContext = createContext({
//   overall: 0,
//   setOverall: () => {},
//   fixed: false,
//   setFixed: () => {},
// })

// const [photoFile, setPhotoFile] = useState('');
// const [caption, setCaption] = useState('');
// const [fixed, setFixed] = useState(false);
// const [rating, setRating] = useState(0)
// const [lat, setLat] = useState(0);
// const [lon, setLon] = useState(0);
// const [photophotoURL, setPhotophotoURL] = useState('')

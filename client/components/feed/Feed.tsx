import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedEntry from './FeedEntry';

function Feed() {
  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
    pothole_id: number;
  };

  const [globalFeed, setGlobalFeed] = useState<phImg[]>([]);

  const getAllImgs = () => {
    // gets all images of all potholes
    axios
      .get('/api/imgs')
      .then((data) => setGlobalFeed(data.data))
      .catch((err) => console.log(err));
  };

  const sortByNew = () => {
    // sorts the current filter by new
    let resultArr = globalFeed.sort((a, b) => {
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(); //sort the array by the createdAt value
    });
    setGlobalFeed([...resultArr]);
  };

  const sortByUnique = () => {
    let filtArr: number[] = [];
    let resultArr = globalFeed.filter((val) => {
      if (!filtArr.includes(val.pothole_id)) {
        // if the pothole_id has not already been seen
        filtArr.push(val.pothole_id);
        return true;
      }
    });
    setGlobalFeed([...resultArr]);
  };

  useEffect(getAllImgs, []);
  return (
    <div>
      <button onClick={getAllImgs}>Reset</button>
      <h1>Pothole Feed</h1>
      Sort: <button onClick={sortByNew}>New</button> <button onClick={sortByUnique}>Unique</button>
      {globalFeed.map((imgVal) => (
        <FeedEntry key={imgVal.image_id} imgObj={imgVal} />
      ))}
    </div>
  );
}

export default Feed;

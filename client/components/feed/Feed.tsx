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
  };

  const [globalFeed, setGlobalFeed] = useState<phImg[]>([]);

  const getAllImgs = () => {
    axios
      .get('/api/imgs')
      .then((data) => setGlobalFeed(data.data))
      .catch((err) => console.log(err));
  }

  const sortByNew = () => {
    let resultArr = globalFeed.sort((a, b) => {
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf();
    })
    setGlobalFeed([...resultArr])
    console.log(globalFeed)
  }



  useEffect(getAllImgs, [])
  return (
    <div>
      <h1>
        Pothole Feed
      </h1>
      Sort: <button onClick={sortByNew}>New</button>
      {globalFeed.map(imgVal => <FeedEntry key={imgVal.image_id} imgObj={imgVal} />)}
    </div>
  );
}

export default Feed;

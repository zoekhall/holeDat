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
    axios.get('/api/imgs')
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


  const sortByRateing = () => {
    let idArr: number[] = globalFeed.map(img => img.pothole_id)

    const sortImage = (ratingArr) => {
      let resultArr: any[] = [[], []]

      const idArr = ratingArr.map(val => val.pothole_id)
      for (let i = 0; i < globalFeed.length; i++) {
        if (!idArr.includes(globalFeed[i].pothole_id)) {
          resultArr[1].push(globalFeed[i])
        }
        resultArr[0].push(globalFeed.find(e => e.pothole_id === idArr[i]))
      }

      setGlobalFeed([...resultArr.flat().filter(n => n !== undefined)])
    }


    axios.post('/api/rating/potholeAtIds', { idArr, }) // send an array of image id's
      .then(data => sortImage(data.data))
      .catch(err => console.log(err));
  }



  useEffect(getAllImgs, []);
  return (
    <div>
      <button onClick={getAllImgs}>Reset</button>
      <h1>Pothole Feed</h1>
      Sort: <button onClick={sortByNew}>New</button> <button onClick={sortByUnique}>Unique</button> <button onClick={sortByRateing}>Rateing</button>
      {globalFeed.map((imgVal) => (
        <FeedEntry key={imgVal.image_id} imgObj={imgVal} />
      ))}
    </div>
  );
}

export default Feed;

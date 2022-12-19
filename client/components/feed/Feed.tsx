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
    axios.get('/api/imgs/feed')
      .then((data) => setGlobalFeed(data.data)) // sets globalFeed to an array of objects
      .catch((err) => console.log(err));
  };



  const sortByNew = () => {
    // sorts the current filter by new
    let resultArr = globalFeed.sort((a, b) => {
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(); //sort the array by the createdAt value
    });
    setGlobalFeed([...resultArr]); // sets globalFeed to the previous globalfeed sorted by date
  };

  const sortByOld = () => {
    sortByNew()
    setGlobalFeed([...globalFeed.reverse()]);
  }

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


  const sortByRateing = (option) => {

    let idArr: number[] = globalFeed.map(img => img.pothole_id) // get an array of all the images pothole_id's

    const sortImage = (ratingArr) => { // sorts the objImg by rating of the pothole attached, subsequently it removes duplicate pothole_ids forcingg a unique like filter
      let resultArr: any[] = [[], []] // index 0 is the ones with ratings, index 1 is the ones without ratings

      const idArr = ratingArr.map(val => val.pothole_id)
      for (let i = 0; i < globalFeed.length; i++) {
        if (!idArr.includes(globalFeed[i].pothole_id)) { // if the array of potholeId's dosent have the current pothole imgObj potholeId
          resultArr[1].push(globalFeed[i]) // send to index 1 of resultArr
        }  // if the current imgObj popthole Id value is included in the array of pothole ids
        resultArr[0].push(globalFeed.find(e => e.pothole_id === idArr[i]))

      }
      if (option === 'H') {
        setGlobalFeed([...resultArr.flat().filter(n => n !== undefined)]) // flatten the array and filter out undefined values
      } else {
        setGlobalFeed([...resultArr.flat().filter(n => n !== undefined).reverse()]) // flatten the array and filter out undefined values
      }
    }


    axios.post('/api/rating/potholeAtIds', { idArr, }) // send an array of image id's
      .then(data => sortImage(data.data)) // retrieve an array of ratingg objects
      .catch(err => console.log(err));

  }



  useEffect(getAllImgs, []);
  return (
    <div>
      <button onClick={getAllImgs}>Reset</button>
      <h1>Pothole Feed</h1>
      Sort: <button onClick={sortByNew}>New</button> <button onClick={sortByUnique}>Unique</button> <button onClick={() => sortByRateing('H')}>Rateing(highest)</button>
      <button onClick={sortByOld}>Old</button> <button onClick={() => sortByRateing('L')}>Rating(lowest)</button>
      {globalFeed.map((imgVal) => (
        <FeedEntry key={imgVal.image_id} imgObj={imgVal} />
      ))}
    </div>
  );
}

export default Feed;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedEntry from './FeedEntry';
import InfiniteScroll from 'react-infinite-scroll-component';

function Feed() {
  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
    pothole_id: number;
    lat: number,
    lon: number,
    badge_id: number;
    fixed: boolean;
    user_id: number;
    name: string;
    photo: string;
  };

  const [globalFeed, setGlobalFeed] = useState<phImg[]>([]);


  const getAllImgs = () => {
    // gets all images of all potholes
    axios.get('/api/imgs/feed', { params: { offset: globalFeed.length } })
      .then(({ data }) => {
        const resArr = data.map(each => {
          const { caption, user_id, updatedAt, pothole_id, photoURL, image_id, createdAt } = each
          const { name, photo, badge_id } = each.User
          const { lat, lon, fixed } = each.Pothole
          const resObj: phImg = {
            image_id,
            photoURL,
            caption,
            createdAt,
            updatedAt,
            pothole_id,
            lat,
            lon,
            fixed,
            user_id,
            name,
            photo,
            badge_id
          }
          return resObj
        })
        if (globalFeed.length) {
          setGlobalFeed([...globalFeed, resArr].flat())

        } else {
          setGlobalFeed(resArr)
        }
      }) // sets globalFeed to an array of objects
      .catch((err) => console.log(err));
  };

  const sortByNew = () => {
    // sorts the current filter by new
    const resultArr = globalFeed.sort((a, b) => {
      return new Date(a.createdAt).valueOf() - new Date(b.createdAt).valueOf(); //sort the array by the createdAt value
    });
    setGlobalFeed([...resultArr]); // sets globalFeed to the previous globalfeed sorted by date
  };

  const sortByOld = () => {
    sortByNew()
    setGlobalFeed([...globalFeed.reverse()]);
  }

  const sortByUnique = () => {
    const filtArr: number[] = [];
    const resultArr = globalFeed.filter((val) => {
      if (!filtArr.includes(val.pothole_id)) {
        // if the pothole_id has not already been seen
        filtArr.push(val.pothole_id);
        return true;
      }
    });
    setGlobalFeed([...resultArr]);
  };

  const sortByRating = (option) => {

    const idArr: number[] = globalFeed.map(img => img.pothole_id) // get an array of all the images pothole_id's

    const sortImage = (ratingArr) => { // sorts the objImg by rating of the pothole attached, subsequently it removes duplicate pothole_ids forcingg a unique like filter
      const resultArr: any[] = [[], []] // index 0 is the ones with ratings, index 1 is the ones without ratings

      const idArr = ratingArr.map(val => val.pothole_id)
      for (let i = 0; i < globalFeed.length; i++) {
        if (!idArr.includes(globalFeed[i].pothole_id)) { // if the array of potholeId's dosent have the current pothole imgObj potholeId
          resultArr[1].push(globalFeed[i]) // send to index 1 of resultArr
        }  // if the current imgObj popthole Id value is included in the array of pothole ids
        resultArr[0].push(globalFeed.find(e => e.pothole_id === idArr[i]))

      }
      if (option === 'H') {
        setGlobalFeed([...resultArr.flat().filter(n => n !== undefined)]) // flatten the array and filter out undefined values
      } else if (option === 'L') {
        setGlobalFeed([...resultArr.flat().reverse().filter(n => n !== undefined)]) // flatten the array and filter out undefined values
      }
    }


    axios.post('/api/rating/potholeAtIds', { idArr, }) // send an array of image id's
      .then(data => sortImage(data.data)) // retrieve an array of ratingg objects
      .catch(err => console.log(err));

  }

  const sortByFixed = () => {
    if (globalFeed.filter(val => val.fixed === true).length === 0) {
      console.log('All is broken (:')
    } else {
      setGlobalFeed([...globalFeed.filter(val => val.fixed === true)])
    }
  }


  useEffect(getAllImgs, []);
  return (
    <div>
      <button onClick={getAllImgs}>Reset</button>
      <h1>Pothole Feed</h1>
      Sort: <button onClick={sortByNew}>New</button> <button onClick={sortByUnique}>Unique</button> <button onClick={() => sortByRating('H')}>Rating(highest)</button>
      <button onClick={sortByOld}>Old</button> <button onClick={() => sortByRating('L')}>Rating(lowest)</button> <button onClick={sortByFixed}>Fixed</button>
      <InfiniteScroll
        dataLength={globalFeed.length} //This is important field to render the next data
        next={getAllImgs}
        hasMore={true}
        loader={<h4>Loading...</h4>}
      >
        {globalFeed.map((imgVal) => (
          <FeedEntry key={imgVal.image_id} imgObj={imgVal} />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Feed;

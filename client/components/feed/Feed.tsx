import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedEntry from './FeedEntry';
import InfiniteScroll from 'react-infinite-scroll-component';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';

const Feed: React.FC = () => {
  type phImg = {
    image_id: number;
    photoURL: string;
    caption: string;
    createdAt: string;
    updatedAt: string;
    pothole_id: number;
    lat: number;
    lon: number;
    badge_id: number;
    fixed: boolean;
    user_id: number;
    name: string;
    photo: string;
  };

  const [globalFeed, setGlobalFeed] = useState<phImg[]>([]);
  const [sortAge, setSortAge] = useState<string>('');
  const [sortFix, setSortFixed] = useState<boolean>(false);

  const getAllImgs = () => {
    axios
      .get('/api/imgs/feed', {
        params: { offset: globalFeed.length, sortAge, fixedStatus: sortFix },
      })
      .then(({ data }) => {
        const resArr = data.map((each) => {
          const { caption, user_id, updatedAt, pothole_id, photoURL, image_id, createdAt } = each;
          const { name, photo, badge_id } = each.User;
          const { lat, lon, fixed } = each.Pothole;
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
            badge_id,
          };
          return resObj;
        });
        setGlobalFeed([globalFeed, resArr].flat());
      })
      .catch((err) => console.log(err));
  };

  const handleClickAge = (age) => {
    if (age !== sortAge) {
      setGlobalFeed([]);
      setSortAge(age);
    }
  };
  const handleClickStatus = (status) => {
    if (status !== sortFix) {
      setGlobalFeed([]);
      setSortFixed(status);
    }
  };

  useEffect(() => setSortAge('New'), []);

  useEffect(getAllImgs, [sortAge]);
  useEffect(getAllImgs, [sortFix]);

  return (
    <div>
      <div className='feed-buttons'>
        <ToggleButtonGroup type="radio" name="age" defaultValue='new' className='mb-2'>
          <ToggleButton
            value='new'
            id="tbg-radio-1"
            onClick={() => handleClickAge('New')}
          >
            New
          </ToggleButton>
          <ToggleButton
            value='old'
            id="tbg-radio-2"
            onClick={() => handleClickAge('Old')}
          >
            Old
          </ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup type="radio" name="options" defaultValue='nFixed' className='mb-2'>
          <ToggleButton
            value='nFixed'
            id="tbg-radio-3"
            onClick={() => handleClickStatus(false)}
          >
            Busted
          </ToggleButton>
          <ToggleButton
            value='fixed'
            id="tbg-radio-4"
            onClick={() => handleClickStatus(true)}
          >
            Fixed
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <InfiniteScroll
        dataLength={globalFeed.length} //This is important field to render the next data
        next={getAllImgs}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        refreshFunction={getAllImgs}
        pullDownToRefresh
        pullDownToRefreshThreshold={100}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {globalFeed &&
          globalFeed.map((imgObj: phImg, i) => <FeedEntry key={`${i}-${imgObj.image_id}`} imgObj={imgObj} />)}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedEntry from './FeedEntry';
import InfiniteScroll from 'react-infinite-scroll-component';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
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
        <ButtonGroup className='mb-2'>
          <ToggleButton
            type='radio'
            variant='secondary'
            name='radio'
            value='new'
            checked={sortAge === 'New'}
            onClick={() => handleClickAge('New')}
          >
            New
          </ToggleButton>
          <ToggleButton
            type='radio'
            variant='secondary'
            name='radio'
            value='old'
            checked={sortAge === 'Old'}
            onClick={() => handleClickAge('Old')}
          >
            Old
          </ToggleButton>
        </ButtonGroup>

        <ButtonGroup className='mb-2'>
          <ToggleButton
            type='radio'
            variant='secondary'
            name='radio'
            value='fixed'
            checked={sortFix}
            onClick={() => handleClickStatus(true)}
          >
            Fixed
          </ToggleButton>
          <ToggleButton
            type='radio'
            variant='secondary'
            name='radio'
            value='nFixed'
            checked={!sortFix}
            onClick={() => handleClickStatus(false)}
          >
            Not Fixed
          </ToggleButton>
        </ButtonGroup>
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
          globalFeed.map((imgObj: phImg) => <FeedEntry key={imgObj.image_id} imgObj={imgObj} />)}
      </InfiniteScroll>
    </div>
  );
};

export default Feed;

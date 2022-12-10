import React, { useEffect, useState } from 'react';
import { Popup, Marker } from 'react-map-gl';
import axios from 'axios';


const Point = prop => {
  type phObj = {
    caption: string;
    photoURL: string;
  };

  const [showPopup, setShowPopup] = useState(true);
  const [plothole, setPlothole] = useState<phObj>()

  const getInfo = () => {
    axios.get('/api/imgs/potholeimg' + prop.marker.pothole_id)
      .then(data => setPlothole(data.data))
      .catch(err => console.log(err))
  }

  useEffect(getInfo, [])

  const { lon, lat } = prop.marker

  return (
    <>
      {(showPopup) ? (
        <Marker
          longitude={lon}
          latitude={lat}
          onClick={() => setShowPopup(false)}
        >
        </Marker>
      ) : (
        <Popup
          longitude={lon}
          latitude={lat}
          anchor='bottom'
          closeOnClick={false}
          onClose={() => setShowPopup(true)}
        >
          {plothole ?
            <>
              <img src={plothole.photoURL} alt='potholeImg' width={100} />
              <p>{plothole.caption}</p>
            </>
            : ''}
        </Popup>
      )
      }
    </>
  );
}
export default Point

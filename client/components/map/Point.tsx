import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Popup, Marker } from 'react-map-gl';
import axios from 'axios';


const Point = prop => {
  type phObj = {
    caption: string;
    photoURL: string;
  };
  const { lon, lat, pothole_id } = prop.marker
  const { userLocation } = prop

  const [showPopup, setShowPopup] = useState(true);
  const [plothole, setPlothole] = useState<phObj>()
  const [addy, setAddy] = useState('')

  const mapbox_token = 'pk.eyJ1IjoiemFjaG1hcnVsbG8iLCJhIjoiY2xhazZ5aGxyMDQ3bzNwbzZ2Z3N0b3lpMyJ9.65G-mwqhbWFy77O_I0LkOg'

  const getInfo = () => {
    axios.get('/api/imgs/potholeimg' + prop.marker.pothole_id)
      .then(data => setPlothole(data.data))
      .then(() => {
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${mapbox_token}`)
          .then(data => setAddy(data.data.features[0].place_name))
      })
      .then(() => {
        console.log(userLocation)
        if (Math.abs(userLocation[0] - lat) < .000000000001 && Math.abs(userLocation[1] - lon) < .00000000001 && userLocation.length !== 0) {
          setShowPopup(false)
        }
      })
      .catch(err => console.log(err))

  }


  useEffect(getInfo, [])


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
          focusAfterOpen={true}
        >
          {plothole ?
            <>
              <Link to={'/Pothole:' + pothole_id}><p>{addy}</p></Link>
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

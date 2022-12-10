import React, { useState } from 'react'
import { Popup, Marker } from 'react-map-gl'

const Point = prop => {
  const [showPopup, setShowPopup] = useState(true);

  


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
          <p>this is a test</p>
        </Popup>
      )
      }
    </>
  );
}
export default Point

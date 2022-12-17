import axios from 'axios'
import React, { useState, useEffect } from 'react'
import FeedEntry from '../feed/FeedEntry';


export const UserStats = ({ userId }) => {

    type phImg = {
        image_id: number;
        photoURL: string;
        caption: string;
        createdAt: string;
        updatedAt: string;
        pothole_id: number;
    };

    const [uploadedPotholes, setUploadedPotholes] = useState<phImg[]>([]);

    const getUserPotholes = () => {
        let route;
        if (userId) { // if the user id exsits on the url
            route = `/api/imgs/atUser:${userId}`
        } else {
            route = '/api/imgs/atUser' + 6
        }
        axios.get(route)
            .then(data => setUploadedPotholes(data.data))
            .catch(err => console.log(err));

    }

    useEffect(getUserPotholes, [])

    return (
        <div>
            <h1>Uploaded Pothole Images</h1>
            {uploadedPotholes.map(imgVal => <FeedEntry key={imgVal.image_id} imgObj={imgVal} />)}
        </div>
    )
}
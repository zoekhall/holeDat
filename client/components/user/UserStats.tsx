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
        if (userId === -1) {
            axios.get('/api/user/current')
                .then(data => {
                    axios.get('/api/imgs/atUser' + data.data.user_id)
                        .then(data => {
                            setUploadedPotholes(data.data)
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err))
        } else {
            axios.get('/api/imgs/atUser' + userId)
                .then(data => {
                    setUploadedPotholes(data.data)
                })
                .catch(err => console.log(err));
        }

    }

    useEffect(getUserPotholes, [])

    return (
        <div>
            <h1>Uploaded Pothole Images</h1>
            {uploadedPotholes.map(imgVal => <FeedEntry key={imgVal.image_id} imgObj={imgVal} />)}
        </div>
    )
}
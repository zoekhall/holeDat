import React from 'react';


const FeedEntry = ({ imgObj }) => {

    return (
        <div>

            <h3>Image Id: {imgObj.image_id}</h3>
            <div>

                <img style={{ borderRadius: '18px' }} src={imgObj.photoURL} alt="Image" />
            </div>

        </div>
    )
}

export default FeedEntry;
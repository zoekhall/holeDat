import React from 'react';
import axios from 'axios';

const Likes = ({ user, image }: any) => {

  const sendLike = (bol: boolean) => {
    const { userId_user } = user
    const { image_id } = image
    console.log(image)
    axios.get('/api/likes/', { params: { bol, userId_user, image_id } })
      .then(({ data }) => console.log(data))
      .catch(err => console.log(err))
  }

  console.log(user, image)
  return (
    <div className='like_pics'>
      <img onClick={() => sendLike(true)} src='https://www.pinclipart.com/picdir/big/397-3976285_traffic-cone-png-clip-art-transparent-png.png' alt='up' width={20} />
      <img onClick={() => sendLike(false)} src='https://www.pinclipart.com/picdir/big/397-3976285_traffic-cone-png-clip-art-transparent-png.png' alt='up' style={{ 'rotate': '180deg' }} width={20} />
    </div>
  )
}

export default Likes;

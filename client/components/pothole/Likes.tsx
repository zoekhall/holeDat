import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Likes = ({ user, image }: any) => {

  const [ratio, setRatio] = useState<number>(0)
  const [usersLike, setUsersLike] = useState<boolean | null>(null)
  const [upConeStyle, setUpConeStyle] = useState<{ [key: string]: string }>({})
  const [downConeStyle, setDownConeStyle] = useState<{ [key: string]: string }>({})

  const { image_id } = image
  const { userId_user } = user

  const sendLike = (bol: boolean) => {
    axios.post('/api/likes/', { params: { bol, userId_user, image_id } })
      .then(() => {
        if (!bol && usersLike && usersLike !== null) {
          setUsersLike(bol) /// ^ V --2
          setRatio(ratio - 2)
        } else if (bol && !usersLike && usersLike !== null) {
          setUsersLike(bol) /// V ^ ++2
          setRatio(ratio + 2)
        } else if (bol && usersLike && usersLike !== null) {
          setUsersLike(null) /// ^ ^
          setRatio(ratio - 1)
        } else if (!bol && !usersLike && usersLike !== null) {
          setUsersLike(null) // V V +1
          setRatio(ratio + 1)
        } else if (usersLike === null && bol) {
          setUsersLike(bol) // - ^ +1
          setRatio(ratio + 1)
        } else if (usersLike === null && !bol) {
          setUsersLike(bol) // - v -1
          setRatio(ratio - 1)
        }
      })
      .catch(err => console.log(err))
  }

  const getLikes = () => {
    axios.get('/api/likes/', { params: { image_id } })
      .then(({ data }) => {
        const newRatio = data.upCone - data.downCone
        setRatio(newRatio)
      })
      .catch(err => console.log(err))
  }

  const getUserLike = () => {
    axios.get('/api/likes/user', { params: { userId_user, image_id } })
      .then(({ data }) => {
        if (data !== 'null') {
          setUsersLike(data)
        } else {
          setUsersLike(null)
        }
      })
  }

  const handleColor = () => {
    if (usersLike === null) {
      setDownConeStyle({ rotate: '180deg', filter: 'grayscale(100%)' })
      setUpConeStyle({ filter: 'grayscale(100%)' })
    } else if (usersLike) {
      setDownConeStyle({ rotate: '180deg', filter: 'grayscale(100%)' })
      setUpConeStyle({ filter: 'grayscale(0%)' })
    } else if (!usersLike) {
      setDownConeStyle({ rotate: '180deg', filter: 'grayscale(0%)' })
      setUpConeStyle({ filter: 'grayscale(100%)' })
    }
  }

  useEffect(() => {
    getUserLike()
    getLikes()
  }, [])
  
  useEffect(handleColor, [usersLike])

  return (
    <div className='like_pics'>
      <img onClick={() => sendLike(true)} src='https://www.pinclipart.com/picdir/big/397-3976285_traffic-cone-png-clip-art-transparent-png.png' alt='up' width={20} style={upConeStyle} />
      {ratio}
      <img onClick={() => sendLike(false)} src='https://www.pinclipart.com/picdir/big/397-3976285_traffic-cone-png-clip-art-transparent-png.png' alt='up' style={downConeStyle} width={20} />
    </div>
  )
}

export default Likes;

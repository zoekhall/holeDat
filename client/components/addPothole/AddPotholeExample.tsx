import React, { useState } from "react";
import axios from 'axios'

const addPothole = () => {
  const [file, setFile] = useState<any>(null)

  const sendData = () => {
    const formData = new FormData()
    formData.append('file', file)

    if (formData) {
      axios({
        method: 'post',
        url: '/api/imgs/addimg',
        data: formData
      })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
  }

  const onButtonClick = e => {
    if (e.target.files[0] !== null) {
      setFile(e.target.files[0]);
      console.log(file)
    }
  };

  return (
    <>
      <input type='file' onClick={onButtonClick} />
      <p>addPothole</p>
      <button onClick={sendData}>Send Away</button>
      <img src={file} alt='asdas' width='100px' />
    </>
  )
}

export default addPothole;

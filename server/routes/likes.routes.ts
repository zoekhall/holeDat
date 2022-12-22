import express, { Request, Response } from 'express';
const likes = express.Router();

import { addLike, getLikesByImgId, getLikeStatus } from '../models/like.model'

likes.post('/', (req: Request, res: Response)=>{
  const {bol, userId_user, image_id} = req.body.params
  addLike(bol, userId_user, image_id)
  res.sendStatus(200)
})

likes.get('/', (req: Request, res: Response)=>{
  const { image_id } = req.query
  getLikesByImgId(image_id, data => {
    if(Array.isArray(data)){
      const upCone = data.filter(each=> each.likeType)
      const downCone = data.filter(each=> !each.likeType)
      res.status(200).send({upCone: upCone.length, downCone: downCone.length})
    } else {
      res.sendStatus(200)
    }
  })
})

likes.get('/user', (req: Request, res: Response)=>{
  const {userId_user, image_id} = req.query
  getLikeStatus(userId_user, image_id, data=> {
  if(data?.dataValues){
    res.status(200).send(data.dataValues.likeType)
  } else {
    res.status(200).send('null')
  }
  })

})
export default likes;

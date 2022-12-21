import express, { Request, Response } from 'express';
const likes = express.Router();
import { addLike } from '../models/like.model'
likes.use('/', (req: Request, res: Response)=>{
  const {bol, userId_user, image_id} = req.query
  addLike(bol, userId_user, image_id)
  res.sendStatus(200)
})

export default likes;

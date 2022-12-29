import express, { Request, Response } from 'express';
const rating = express.Router();

import { getPotholesAtIds, addRating } from '../models/rating.model';

// rating.post('/addRating', (req: Request, res: Response) => {
//   postRating(req.body)
//   res.send()
// });

rating.post('/potholeAtIds', (req: Request, res: Response) => {
  getPotholesAtIds(req.body.idArr, data => res.status(201).send(data))
})

rating.post('/fromPh', (req: Request, res: Response) => {
  const { id , fixed, rating, user } = req.body
  addRating(id, fixed, rating, user.userId_user)
  res.send()
})



export default rating;

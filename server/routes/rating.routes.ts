import express, { Request, Response } from 'express';
const rating = express.Router();

import { postRating, getPotholesAtIds } from '../models/rating.model';

rating.post('/addRating', (req: Request, res: Response) => {
  postRating(data => res.status(201).send(data), req.body)
});

rating.post('/potholeAtIds', (req: Request, res: Response) => {
  getPotholesAtIds(req.body.idArr, data => res.status(201).send(data))
})

export default rating;

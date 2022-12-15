import express, { Request, Response } from 'express';
const rating = express.Router();

import postRating from '../models/rating.model';

rating.post('/addRating', (req: Request, res: Response) => {
  postRating(data => res.status(201).send(data), req.body)
});

export default rating;
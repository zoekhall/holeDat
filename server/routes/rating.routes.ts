import express, { Request, Response } from 'express';
import { getAllRatingsById } from '../models/rating.model';
const rating = express.Router();

import { getPotholesAtIds, addRating } from '../models/rating.model';

rating.post('/potholeAtIds', (req: Request, res: Response) => {
  getPotholesAtIds(req.body.idArr, (data) => res.status(201).send(data));
});

rating.post('/fromPh', (req: Request, res: Response) => {
  const { id, fixed, rating, user } = req.body;
  addRating(id, fixed, rating, user.userId_user);
  res.send();
});

rating.get('/rating:id', (req: Request, res: Response) => {
  const { id } = req.params;
  getAllRatingsById(id, (data) => {
    const ratingArr = data.map((rating) => {
      return rating.dataValues.overall;
    });
    res.status(200).send(ratingArr);
  });
});

export default rating;

import express, { Request, Response } from 'express';
import { addRatingAndFind, getAllRatingsById } from '../models/rating.model';
const rating = express.Router();

import { getPotholesAtIds, addRating } from '../models/rating.model';

rating.post('/potholeAtIds', (req: Request, res: Response) => {
  getPotholesAtIds(req.body.idArr, (data) => res.status(201).send(data));
});

rating.post('/fromPh', (req: Request, res: Response) => {
  const { id, status, rating } = req.body;
  const { type, value } = req.body.ratingStatusObj;
  const { userId_user } = req.body.user;
  const cb = (data) => {
    res.status(201).send(data);
  }

  if (type === 'rating') {
    addRatingAndFind(id, userId_user, status, value, cb);
  }else if(type === 'status') {
    addRating(id, userId_user, value, rating);
    res.sendStatus(201);
  }
  
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

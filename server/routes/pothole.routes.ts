import express, { Request, Response } from 'express';
const pothole = express.Router();

import getAllPothole, { findAndAddPothole, getMatchingPotholes } from '../models/pothole.model';
import { addRating } from '../models/rating.model';
import { postImg } from '../models/imgs.model';

pothole.get('/', (req: Request, res: Response) => {
  getAllPothole(data => res.status(200).send(data));
});

pothole.post('/findPothole', (req: Request, res: Response) => {
  getMatchingPotholes(data => res.status(200).send(data)
    , req.body);
});

pothole.post('/addPothole', (req: Request, res: Response) => {

  const { coordinates, updatedImageContents, statusContents, user_id } = req.body;
  const { fixed, rating } = statusContents;
  const { caption, photoURL } = updatedImageContents;

  findAndAddPothole((data) => { 
    const pothole_id = data;
    addRating(pothole_id, fixed, rating, user_id);
    postImg(pothole_id, caption, photoURL, user_id);
  }, coordinates)

  res.sendStatus(201);

});

export default pothole;
import express, { Request, Response } from 'express';
const pothole = express.Router();

import getAllPothole, { postPothole, postRating } from '../models/pothole.model';

pothole.get('/', (req: Request, res: Response) => {
  getAllPothole((data) => res.status(222).send(data));
});

pothole.post('/addPothole', (req: Request, res: Response) => {
  postPothole((data) => {res.status(201).send(data.pothole_id), req.body})
});

pothole.post('/addPotholeRating', (req: Request, res: Response) => {
  postRating(() => res.sendStatus(201), req.body);
});

export default pothole;

import express, { Request, Response } from 'express';
const pothole = express.Router();

import getAllPothole, { postPothole } from '../models/pothole.model';

pothole.get('/', (req: Request, res: Response) => {
  getAllPothole((data) => res.status(222).send(data));
});

pothole.post('/addPothole', (req: Request, res: Response) => {
  postPothole(() => res.sendStatus(201), req.body)
});

export default pothole;

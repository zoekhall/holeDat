import express, { Request, Response } from 'express';
const pothole = express.Router();

import getAllPothole, { findAndAddPothole, getMatchingPotholes } from '../models/pothole.model';

pothole.get('/', (req: Request, res: Response) => {
  getAllPothole(data => res.status(200).send(data));
});

pothole.post('/findPothole', (req: Request, res: Response) => {
  getMatchingPotholes(data => res.status(200).send(data)
    , req.body);
});

pothole.post('/addPothole', (req: Request, res: Response) => {
  findAndAddPothole((data, status) => {
    const rtnObj = { data, status }
    res.status(201).send(rtnObj)
  }, req.body)
});

export default pothole;

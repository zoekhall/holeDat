import express, { Request, Response } from 'express';
const pothole = express.Router();

import getAllPothole, { findAndAddPothole } from '../models/pothole.model';

pothole.get('/', (req: Request, res: Response) => {
  getAllPothole((data) => res.status(222).send(data));
});

pothole.post('/addPothole', (req: Request, res: Response) => {
  findAndAddPothole((data, status) => { 
    const rtnObj = { data, status }
    console.log(rtnObj, 'rtnObj')
    res.status(201).send(rtnObj)
  }, req.body)
});

export default pothole;

import express, { Request, Response } from 'express';
const user = express.Router();

import getRecentUser from '../models/user.model';

user.get('/', (req: Request, res: Response) => {
  getRecentUser((data) => res.status(222).send(data));
});

export default user;

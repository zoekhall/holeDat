import express, { Request, Response } from 'express';
const user = express.Router();
import { getRecentUsers, getUserData } from '../models/user.model';


user.get('/', (req: Request, res: Response) => {
  getRecentUsers((data) => res.status(222).send(data));
});


user.get('/userAtId:id', (req: Request, res: Response) => {
  const { id } = req.params;
  getUserData(id, data => res.status(200).send(data));
})

export default user;

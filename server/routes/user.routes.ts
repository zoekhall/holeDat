import express, { Request, Response } from 'express';
const user = express.Router();
import { getRecentUsers, getUserData, changeUsername } from '../models/user.model';

user.get('/', (req: Request, res: Response) => {
  getRecentUsers((data) => res.status(222).send(data));
});

user.get('/userAtId:id', (req: Request, res: Response) => { // get the userObj at the same user with id
  const { id } = req.params;
  getUserData(id, (data) => res.status(200).send(data));
});


user.get('/current', (req: Request, res: Response) => { // gets the user object of the currently loggged in user
  res.status(200).send(req.user)
})

// user.get('/users', (req: Request, res: Response) => {
//   const resObj = Object.values(req.query);
//   const userObjs = resObj.map((userId) => getUserData(userId, (val) => {
//   //  console.log(val)
//   }
//   ));
//   res.status(200).send(userObjs);
// });

user.get('/me', (req: Request, res: Response) => {
  if (req.user) {
    res.send(req.user)
  } else {
    res.send({})
  }
})

user.patch('/edit/username', (req: Request, res: Response) => { // calles a function to changge the username of the loggged in user
  changeUsername(req.user, req.body.name)
  res.status(202).send(req.user)
})

export default user;

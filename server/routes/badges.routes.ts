import express, { Request, Response } from 'express';
import { getBadgeAtId } from '../models/badges.model';
const badges = express.Router();

badges.get('/getBadge', (req: Request, res: Response) => {
  const { badgeId } = req.query;
  getBadgeAtId(badgeId, (data) => res.status(200).send(data.dataValues));
});

export default badges;

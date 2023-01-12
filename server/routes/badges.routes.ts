import express, { Request, Response } from 'express';
import { getAllBadges, getBadgeAtId } from '../models/badges.model';
const badges = express.Router();

badges.get('/getBadge', (req: Request, res: Response) => {
  const { badgeId } = req.query;
  getBadgeAtId(badgeId, (data) => res.status(200).send(data.dataValues));
});

badges.get('/allBadges', (req: Request, res: Response) => {
  getAllBadges((data) => res.status(200).send(data));
});

export default badges;

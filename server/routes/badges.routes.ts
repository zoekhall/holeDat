import express, { Request, Response } from "express";
import { getBadgeAtId } from '../models/badges.model'
const badges = express.Router()

badges.get('/getBadge:id', (req: Request, res: Response) => {
    const { id } = req.params
    getBadgeAtId(id, (data) => res.status(200).send(data))

})

export default badges
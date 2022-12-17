import express, { Request, Response } from "express";
const comments = express.Router()
import { postComment, getComments } from "../models/comments.model";


comments.post('/add', (req: Request, res: Response) => {
  const text = req.body[0]
  const phId = req.body[1]
  const user = req.user
  postComment(text, phId, user)
  res.sendStatus(200)
})

comments.get('/perPh', (req: Request, res: Response) => {
  const { potholeId } = req.query
  getComments(potholeId, (data) => res.status(200).send(data.sort((a, b) => a.createdAt - b.createdAt)))
})


export default comments;

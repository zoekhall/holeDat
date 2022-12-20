import express, { Request, Response } from "express";
const comments = express.Router()
import { postComment, getComments, deleteCom } from "../models/comments.model";


comments.post('/add', (req: Request, res: Response) => {
  const text = req.body[0]
  const phId = req.body[1]
  const user = req.user
  postComment(text, phId, user, data => res.status(200).send(data))
})

comments.get('/perPh', (req: Request, res: Response) => {
  const { potholeId } = req.query
  getComments(potholeId, (data) => res.status(200).send(data.sort((a, b) => a.createdAt - b.createdAt)))
})

comments.delete('/', (req: Request, res: Response) => {
  const { id } = req.query
  deleteCom(id, (data)=> {
    if (data) {
      res.sendStatus(200)
    } else {
      res.sendStatus(404)
    }
  })
})

export default comments;

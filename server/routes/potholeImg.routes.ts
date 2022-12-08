import express,{Request, Response} from 'express'
const imgs = express.Router();

import getAllImgs from '../models/imgs.model'



imgs.get('/', (req: Request, res: Response)=>{
  getAllImgs(data=>res.status(222).send(data))
})


export default imgs

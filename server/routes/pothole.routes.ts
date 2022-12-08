import express,{Request, Response} from 'express'
const pothole = express.Router();



pothole.get('/', (req: Request, res: Response)=>{
  res.sendStatus(223)
})


export default pothole

import express, { Request, Response } from 'express';
const imgs = express.Router();
import getAllImgs from '../models/imgs.model';
import multer from 'multer'
import dotenv from 'dotenv';
dotenv.config()
import cloudinary from 'cloudinary'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({ storage: storage })


imgs.get('/', (req: Request, res: Response) => {
  getAllImgs((data) => res.status(222).send(data));
});

const api_key = process.env.API_KEY
const cloud_name = process.env.CLOUD_NAME
const api_secret = process.env.CLOUD_SECRET

imgs.post('/addimg', upload.single('file'), (req: any, res: Response) => {
  const file= req.file.path
  console.log(file)
  cloudinary.v2.uploader.upload( file, {api_key, api_secret, cloud_name})
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  res.json({})
})


export default imgs;

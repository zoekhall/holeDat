import express, { Request, Response } from 'express';
const imgs = express.Router();
import getAllImgs from '../models/imgs.model';
import multer from 'multer'
import dotenv from 'dotenv';
import fs from 'fs-extra';
dotenv.config()
import cloudinary from 'cloudinary'


const upload = multer({dest:'./tmp/'}).single('file')


imgs.get('/', (req: Request, res: Response) => {
  getAllImgs((data) => res.status(222).send(data));
});

const api_key = process.env.API_KEY
const cloud_name = process.env.CLOUD_NAME
const api_secret = process.env.CLOUD_SECRET

imgs.post('/addimg', upload, (req: any, res: Response) => {
  const file= req.file.path
  cloudinary.v2.uploader.upload( file, {api_key, api_secret, cloud_name})
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  res.json({})
  fs.emptyDir('./tmp')
})


export default imgs;

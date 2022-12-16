/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Request, Response } from 'express';
const imgs = express.Router();
import {
  getAllImgs,
  getPotholeImgByPhId,
  getTopThree,
  getAllPotholeImgByPhId,
  postImg,
} from '../models/imgs.model';
import multer from 'multer';
import dotenv from 'dotenv';
import fs from 'fs-extra';
dotenv.config();
import cloudinary from 'cloudinary';
import { getGraphData } from '../models/user.model';

const upload = multer({ dest: './tmp/' }).single('file');

// returns all images of pothole (a test endpoint)
imgs.get('/', (req: Request, res: Response) => {
  getAllImgs((data) => res.status(222).send(data));
});

// Adds img to Cloud
imgs.post('/addimg', upload, (req: any, res: Response) => {
  const api_key = process.env.API_KEY
  const cloud_name = process.env.CLOUD_NAME
  const api_secret = process.env.CLOUD_SECRET
  const file = req.file.path
  cloudinary.v2.uploader.upload(file, { api_key, api_secret, cloud_name })
    .then(data => {
      res.status(201).json(data.url)
    })
    .catch(err => console.log(err))
  fs.emptyDir('./tmp')
})

imgs.post('/postImg', (req: any, res: Response) => {
  postImg(data => res.status(201).send(data), req.body)
})

// get ALL imgs of pothole by id
imgs.get('/potholeimgs:id', (req: Request, res: Response) => {
  const { id } = req.params;
  getAllPotholeImgByPhId(id, (data) => {
    if (data) {
      res.status(200).send(data);
    } else {
      res.sendStatus(400);
    }
  });
});

// gets one image for the pothole
imgs.get('/potholeimg:id', (req: Request, res: Response) => {
  const { id } = req.params;
  getPotholeImgByPhId(id, (data) => {
    if (data) {
      const { photoURL, caption } = data.dataValues;
      const resObj = { photoURL, caption };
      res.status(200).send(resObj);
    } else {
      res.sendStatus(400);
    }
  });
});

imgs.get('/stats', (req: Request, res: Response) => {
  getTopThree((data) => {
    let arrA: any = [];
    arrA = data.sort((a, b) => b.count - a.count).splice(0, 3);
    getGraphData(arrA, (data) => res.status(200).send(data));
  });
});

export default imgs;

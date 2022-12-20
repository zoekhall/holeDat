import axios from 'axios';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config()
const location = express.Router();

const headers = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'content-encoding': 'gzip, deflate, br',
  'Accept': 'application/json',
  'accept-encoding': 'false'
};


location.get('/getAddy', (req: Request, res: Response) => {
  const { lat, lon } = req.query
  axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${lon},${lat}.json?access_token=${process.env.Mapbox_Token}`,
    { headers }
  )
    .then(data => res.status(200).send(data.data.features[0].place_name))
    .catch(err => res.status(500).send(err))
});
export default location

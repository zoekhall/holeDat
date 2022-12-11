import axios from 'axios';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config()
const location = express.Router();
const api_key = process.env.GOOGLE_GEOCODING


location.get('/getAddy', (req: Request, res: Response) => {
  const { lat, lon } = req.query
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&location_type=ROOFTOP&result_type=street_address`, { params: { key: api_key } })
    .then(data=> console.log(data.data))
    .catch(err=> console.log(err))
  res.sendStatus(200)
});

export default location

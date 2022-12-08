import express from 'express'

const rootRouter = express.Router();

import imgs from './potholeImg.routes'
import pothole from './pothole.routes'

rootRouter.use("/imgs", imgs);
rootRouter.use("/pothole", pothole);


export default rootRouter

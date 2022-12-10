import express from 'express';

const rootRouter = express.Router();

import imgs from './potholeImg.routes';
import pothole from './pothole.routes';
import user from './user.routes';

rootRouter.use('/imgs', imgs);
rootRouter.use('/pothole', pothole);
rootRouter.use('/user', user);

export default rootRouter;

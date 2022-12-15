import express from 'express';

const rootRouter = express.Router();

//import location from './location.routes';
import imgs from './potholeImg.routes';
import pothole from './pothole.routes';
import user from './user.routes';
import rating from './rating.routes';

//rootRouter.use('/location', location);
rootRouter.use('/imgs', imgs);
rootRouter.use('/pothole', pothole);
rootRouter.use('/user', user);
rootRouter.use('/rating', rating);

export default rootRouter;

import express, { Request, Response } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());

const PORT = process.env.PORT || 5555

app.get('/api', (req: Request, res: Response) => {
     console.log('test')


})

app.listen(PORT, () => {
     console.log(`listening at http://localhost:${PORT}`);
});

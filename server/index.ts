import express, { Request, Response } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

// importing .env file
dotenv.config();

// running on port 5555 if no env available
const PORT = process.env.PORT || 5555

// assigning express to app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('client', 'dist')));
app.use(express.json());

// endpoint /api
app.get('/api', (req: Request, res: Response) => {
     console.log("test")
     res.sendStatus(200)
})

// app listen
app.listen(PORT, () => {
     console.log(`listening at http://localhost:${PORT}`);
});

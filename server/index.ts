import express, { Request, Response } from 'express';
import cors from 'cors';
import * as path from 'path';
import * as dotenv from 'dotenv';
import passport from 'passport'
import cookieSession from "cookie-session";
import "./routes/auth/passport";

// importing .env file
dotenv.config();

// running on port 5555 if no env available
const PORT = process.env.PORT || 5555;

// assigning express to app
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use( '/', express.static(path.resolve('client', 'dist')));
app.use(express.json());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Random Endpoint
app.use('/*', (req: Request, res: Response) => {res.sendFile(path.resolve(__dirname, '../client/dist/index.html'),
    err => {if (err) res.status(500).send(err)})
})

// app listen
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});


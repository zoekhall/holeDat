import express, { Request, Response } from 'express';
// import cors from 'cors';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import sessions from 'express-session'
import passport from 'passport'
import routes from "./routes";

// importing .env file

// running on port 5555 if no env available
const PORT = process.env.PORT || 5555;

// assigning express to app
const app = express();

app.use(sessions({
  secret: "thisisasecret",
  saveUninitialized: true,
  cookie: {maxAge: 1000 * 60 * 60 * 24},
  resave: false
}));

// Middleware
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

// const isLoggedIn = (req, res, next) => {
//   req.user ? next() : res.redirect('/');
// };

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use( '/', express.static(path.resolve('client', 'dist')));




// app.use(
//   cors({
//     origin: "http://localhost:8080",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );


// Random Endpoint
app.use('/*', (req: Request, res: Response) => {res.sendFile(path.resolve(__dirname, '../client/dist/index.html'),
    err => {if (err) res.status(500).send(err)})
})

// app listen
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});


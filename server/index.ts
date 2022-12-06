import express, { Request, Response } from 'express';
// import cors from 'cors';
import * as path from 'path';
import dotenv from 'dotenv';
dotenv.config();
import sessions from 'express-session';
import passport from 'passport';
// import routes from './routes';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from './db/user.schema';

// importing .env file

// running on port 5555 if no env available
const PORT = process.env.PORT || 5555;

// assigning express to app
const app = express();

app.use(
  sessions({
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

// Middleware
app.use(passport.initialize());
app.use(passport.session());
// app.use(routes);

// const isLoggedIn = (req, res, next) => {
  //   req.user ? next() : res.redirect('/');
  // };

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/', express.static(path.resolve('dist')));


// app.use(
//   cors({
//     origin: "http://localhost:8080",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// Random Endpoint

passport.use(
  new GoogleStrategy(
    {
      clientID: `${process.env.CLIENT_ID}`,
      clientSecret: `${process.env.CLIENT_SECRET}`,
      callbackURL: `${process.env.GOOGLE_CALLBACK}`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id, displayName, emails, photos } = profile;
      const email = emails ? emails[0].value : '';
      const photo = photos ? photos[0].value : '';
      try {
        const user = await User.upsert({
          where: { googleId: id },
          update: {},
          create: {
            googleId: id,
            email,
            name: displayName,
            photo,
          },
        });
        done(null, user);
      } catch (error) {
        // console.log(profile);
        done(null, profile);
      }
    }
  )
);
/**

 * LOGOUT -> button/functionality
 * get db to add User to collection
 * create helper function to make sure user has proper access and pass along to each component
 * add other keys in schema that will be necessary later (badges)
 */


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findOne({ where: { id } }).then((data) => done(null, data));
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    successRedirect: '/pothole',
    failureRedirect: '/map',
  })
);


app.use('/*', (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'), (err) => {
    if (err) res.status(500).send(err);
  });
});
// app listen
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';












/**
const User = mongoose.model('User', userSchema);
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
}, */
/**


app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.redirect('/');
};

  app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect: '/home',
    failureRedirect: '/',
  })
);

 */
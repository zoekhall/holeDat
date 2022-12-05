import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from 'dotenv';
import User from '../../db/index'
dotenv.config();


passport.use(
     new GoogleStrategy(
          {
               clientID: `${process.env.CLIENT_ID}`,
               clientSecret: `${process.env.CLIENT_SECRET}`,
               callbackURL: '/api/auth/google/callback',
          },
          async (accessToken, refreshToken, profile, done) => {
               const { id, displayName, emails, photos } = profile;
               const email = emails ? emails[0].value : "";
               const photo = photos ? photos[0].value : "";
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
                    return done(null, user);
               } catch (error: any) {
                    return done(error);
               }
          }
     )
);

passport.serializeUser((user: any, done) => {
     done(null, user.id as string);
});

passport.deserializeUser(async (id: string, done) => {
     try {
          const user = await User.findOne({
               where: { id },
          });
          done(null, user);
     } catch (error: any) {
          done(error);
     }
});

export default passport;

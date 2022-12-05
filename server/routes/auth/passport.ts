import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from '../../db/user.schema'


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
               } catch (error) {
                    return done();
               }
          }
     )
     )
export default passport;

import  db from './db.server';
import  User from './schema/user.schema';
import  Badge from './schema/badges.schema';
import  Comment from './schema/comments.schema';
import  Like from './schema/likes.schema';
import  Pothole from './schema/pothole.schema';
import  Rating from './schema/ratings.schema';
import  PotholeIMG from './schema/potholeImgs.schema';

//User 1->many potholeIMG
User.hasMany(PotholeIMG)
PotholeIMG.belongsTo(User);

// like 1->1 User
User.hasOne(Like)
Like.belongsTo(User);

// User 1->many badge
Badge.hasMany(User)
User.belongsTo(Badge);

// User 1->many comments
User.hasMany(Comment)
Comment.belongsTo(User);

// potholeImg 1->many likes
PotholeIMG.hasMany(Like)
Like.belongsTo(PotholeIMG);

// pothole 1->many potholeImgs
Pothole.hasMany(PotholeIMG)
PotholeIMG.belongsTo(Pothole);

// pothole 1->many ratings
Pothole.hasMany(Rating)
Rating.belongsTo(Pothole);

// pothole 1->many ratings
User.hasMany(Rating)
Rating.belongsTo(User);

// pothole 1->many comments
Pothole.hasMany(Comment)
Comment.belongsTo(Pothole);

//db.sync({ alter: true })
db.sync()



export default {
  Badge,
  User,
  PotholeIMG,
  Comment,
  Like,
  Pothole,
  Rating,
};

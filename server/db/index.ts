import sequelize from './db.server';
import User from './schema/user.schema';
import Badge from './schema/badges.schema';
import Comment from './schema/comments.schema';
import Like from './schema/likes.schema';
import Pothole from './schema/pothole.schema';
import Rating from './schema/ratings.schema';
import PotholeIMG from './schema/potholeImgs.schema';

//POTHOLE CONNECTIONS
// Pothole 1->many Ratings
Pothole.hasMany(Rating, {
  sourceKey: 'pothole_id', //source in Pothole
  foreignKey: 'pothole_id', //foreign key in Rating
});
Rating.belongsTo(Pothole, {
  foreignKey: 'pothole_id',
  targetKey: 'pothole_id'
});

// Pothole 1->many PotholeIMGs
Pothole.hasMany(PotholeIMG, {
  sourceKey: 'pothole_id',
  foreignKey: 'pothole_id',
});
PotholeIMG.belongsTo(Pothole, {
  foreignKey: 'pothole_id',
  targetKey: 'pothole_id',
});

// Pothole 1->many Comments
Pothole.hasMany(Comment, {
  sourceKey: 'pothole_id',
  foreignKey: 'pothole_id',
});
Comment.belongsTo(Pothole, {
  foreignKey: 'pothole_id',
  targetKey: 'pothole_id',
});

//USER CONNECTIONS
// User 1->many PotholeIMGs
User.hasMany(PotholeIMG, {
  sourceKey: 'user_id',
  foreignKey: 'user_id',
});
PotholeIMG.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

// User 1->many Ratings
User.hasMany(Rating, {
  sourceKey: 'user_id',
  foreignKey: 'user_id',
});
Rating.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

// User 1->many Comments
User.hasMany(Comment, {
  sourceKey: 'user_id',
  foreignKey: 'user_id',
});
Comment.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

// User 1->1 Likes
User.hasOne(Like, {
  sourceKey: 'user_id',
  foreignKey: 'user_id',
});

Like.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

//USER CONNECTIONS
// User 1->many PotholeIMGs
User.hasMany(PotholeIMG, {
  sourceKey: 'user_id',
  foreignKey: 'user_id',
});
PotholeIMG.belongsTo(User, {
  foreignKey: 'user_id',
  targetKey: 'user_id',
});

//BADGE CONNECTIONS
// Badges 1-> User
Badge.hasMany(User, {
  sourceKey: 'badge_id',
  foreignKey: 'badge_id',
});
User.belongsTo(Badge, {
  foreignKey: 'badge_id',
  targetKey: 'badge_id',
});

//NEED TO REVISIT.. SHOULD LIKES HAVE A POTHOLE IMG SOURCE KEY INSTEAD OF POTHOLE?
//POTHOLE IMG CONNECTIONS
// PotholeIMG 1-> Likes
// PotholeIMG.hasMany(Like, {
//   sourceKey: 'user_id',
//   foreignKey: 'user_id',
// });
// Like.belongsTo(PotholeIMG, {
//   foreignKey: 'user_id',
//   targetKey: 'user_id',
// });

sequelize.sync();

export default {
  Badge,
  User,
  PotholeIMG,
  Comment,
  Like,
  Pothole,
  Rating,
};

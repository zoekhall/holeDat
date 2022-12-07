import Sequelize from 'sequelize';
import db from '../db.server';

const Likes = db.define('likes', {
  likes_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  likeType: {
    type: Sequelize.BOOLEAN,
    allowNull: true,
  },
});

db.sync();

export default Likes;

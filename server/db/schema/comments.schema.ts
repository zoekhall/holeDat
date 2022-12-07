import Sequelize from 'sequelize';
import db from '../db.server';

const Comment = db.define('comment', {
  comment_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

db.sync();

export default Comment;

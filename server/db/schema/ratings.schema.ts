import Sequelize from 'sequelize';
import db from '../db.server';

const Rating = db.define('rating', {
  rating_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  overall:{
    type: Sequelize.INTEGER,
    allowNull: true
  }
});

db.sync();

export default Rating;


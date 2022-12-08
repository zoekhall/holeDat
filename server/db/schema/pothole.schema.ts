import Sequelize from 'sequelize';
import db from '../db.server';

const Pothole = db.define('pothole', {
  pothole_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fixed: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  lat: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  lon: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

db.sync();

export default Pothole;

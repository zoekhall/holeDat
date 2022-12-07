import Sequelize from 'sequelize';
import db from '../db.server';

const PotholeIMG = db.define('potholeimg', {
  image_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  photoURL: {
    type: Sequelize.STRING,
    allowNull: false
  },
  caption: {
    type: Sequelize.STRING,
    allowNull: false ,
  },
});

db.sync();

export default PotholeIMG;

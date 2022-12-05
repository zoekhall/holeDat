import Sequelize from 'sequelize';
import { db } from './index';

const User =  db.define('user', {
     user_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
     },
     name: { type: Sequelize.STRING, allowNull: false },
     email: { type: Sequelize.STRING, allowNull: false },
     avatarUrl: { type: Sequelize.STRING, allowNull: false },
     myDate: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.NOW
     },
     createdAt: Sequelize.DATE,
     updatedAt: Sequelize.DATE,
})

db.sync()

export default User;

import db from '../db.server';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

interface UserAttributes {
  user_id: number;
  id: string;
  name: string;
  email: string;
  photo: string;
  badge_id: number;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'user_id' | 'createdAt' | 'updatedAt'>;

const User: ModelDefined<UserAttributes, UserCreationAttributes> = db.define(
  'User',
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    badge_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'users',
  }
);

(async () => {
  await db.sync();
})();

export default User;

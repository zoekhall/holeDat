import db from '../db.server';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

interface RatingAttributes {
  rating_id: number;
  overall: number;
  pothole_id: number;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
}

type RatingCreationAttributes = Optional<RatingAttributes, 'rating_id' | 'createdAt' | 'updatedAt'>;

const Rating: ModelDefined<RatingAttributes, RatingCreationAttributes> = db.define(
  'Rating',
  {
    rating_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    overall: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pothole_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'ratings',
  }
);

(async () => {
  await db.sync();
})();

export default Rating;
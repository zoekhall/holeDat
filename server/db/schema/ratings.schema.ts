import sequelize from '../db.server';
import { DataTypes, NonAttribute, CreationOptional, InferAttributes, InferCreationAttributes, Model, ForeignKey } from 'sequelize';
import Pothole from './pothole.schema';

class Rating extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
  declare rating_id: CreationOptional<number>;
  declare overall: number;
  declare pothole_id: ForeignKey<Pothole['pothole_id']>;
  declare user_id: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare pothole?: NonAttribute<Pothole>;
}

Rating.init(
  {
    rating_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    overall: {
      type: new DataTypes.FLOAT,
      allowNull: false,
    },
    user_id: {
      type: new DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'ratings'
  }
);

(async () => {
  await sequelize.sync();
})();

export default Rating;

import sequelize from '../db.server';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

interface LikesAttributes {
  likes_id: number;
  likeType: boolean;
  user_id: number;
  pothole_id: number;
  createdAt: Date;
  updatedAt: Date;
}

type LikesCreationAttributes = Optional<LikesAttributes, 'likes_id' | 'createdAt' | 'updatedAt'>;

const Like: ModelDefined<LikesAttributes, LikesCreationAttributes> = sequelize.define(
  'Like',
  {
    likes_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    likeType: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'likes',
  }
);

(async () => {
  await sequelize.sync();
})();

export default Like;
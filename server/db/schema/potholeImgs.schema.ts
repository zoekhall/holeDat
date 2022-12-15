import db from '../db.server';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

interface ImageAttributes {
  image_id: number;
  photoURL: string;
  caption: string;
  user_id: number;
  pothole_id: number;
  createdAt: Date;
  updatedAt: Date;
}

type ImageCreationAttributes = Optional<ImageAttributes, 'image_id' | 'createdAt' | 'updatedAt'>;

const Image: ModelDefined<ImageAttributes, ImageCreationAttributes> = db.define(
  'Image',
  {
    image_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    photoURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    caption: {
      type: DataTypes.STRING,
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
    tableName: 'potholeimgs',
  }
);

(async () => {
  await db.sync();
})();

export default Image;
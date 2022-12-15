import db from '../db.server';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

interface PotholeAttributes {
  pothole_id: number;
  fixed: boolean;
  lat: number;
  lon: number;
  createdAt: Date;
  updatedAt: Date;
}

type PotholeCreationAttributes = Optional<
  PotholeAttributes,
  'pothole_id' | 'createdAt' | 'updatedAt'
>;

const Pothole: ModelDefined<PotholeAttributes, PotholeCreationAttributes> = db.define(
  'Pothole',
  {
    pothole_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    fixed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lon: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'potholes',
  }
);

(async () => {
  await db.sync();
})();

export default Pothole;

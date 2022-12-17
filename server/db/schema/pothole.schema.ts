import sequelize from '../db.server';
import Rating from './ratings.schema';
import {Association, NonAttribute, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyCreateAssociationMixin } from 'sequelize';
import PotholeIMG from './potholeImgs.schema';

class Pothole extends Model<
  InferAttributes<Pothole, { omit: 'ratings'; potholeimgs }>,
  InferCreationAttributes<Pothole, { omit: 'ratings'; potholeimgs }>
> {
  declare pothole_id: CreationOptional<number>;
  declare fixed: boolean;
  declare lat: number;
  declare lon: number;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare user_id: number;
  
  declare ratings?: NonAttribute<Rating[]>;
  declare potholeimgs?: NonAttribute<PotholeIMG[]>;
  declare createRating: HasManyCreateAssociationMixin<Rating, 'pothole_id'>;  
  declare createImg: HasManyCreateAssociationMixin<PotholeIMG, 'pothole_id'>;
  declare static associations: {
    ratings: Association<Pothole, Rating>;
    potholeimgs: Association<Pothole, PotholeIMG>;
  };
}
Pothole.init(
  {
    pothole_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    fixed: {
      type: new DataTypes.BOOLEAN,
      allowNull: false,
    },
    lat: {
      type: new DataTypes.FLOAT,
      allowNull: false,
    },
    lon: {
      type: new DataTypes.FLOAT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    user_id: {
      type: new DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'potholes',
    sequelize
  }
);

(async () => {
  await sequelize.sync();
})();

export default Pothole;


// interface PotholeAttributes {
//   pothole_id: number;
//   fixed: boolean;
//   lat: number;
//   lon: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// type PotholeCreationAttributes = Optional<
//   PotholeAttributes,
//   'pothole_id' | 'createdAt' | 'updatedAt'
// >;

// const Pothole: ModelDefined<PotholeAttributes, PotholeCreationAttributes> = db.define(
//   'Pothole',
//   {
//     pothole_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       unique: true,
//     },
//     fixed: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//     },
//     lat: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     lon: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'potholes',
//   }
// );

// (async () => {
//   await db.sync();
// })();

// export default Pothole;

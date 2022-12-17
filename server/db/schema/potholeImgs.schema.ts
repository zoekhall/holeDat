import sequelize from '../db.server';
import Pothole from './pothole.schema';
import {CreationOptional, NonAttribute, ForeignKey, DataTypes, Model, InferCreationAttributes, InferAttributes } from 'sequelize';

class PotholeIMG extends Model<InferAttributes<PotholeIMG>, InferCreationAttributes<PotholeIMG>> {
  declare image_id: CreationOptional<number>;
  declare photoURL: string;
  declare caption: string;
  declare user_id: number;
  declare pothole_id: ForeignKey<Pothole['pothole_id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  
  declare pothole?: NonAttribute<Pothole>;
}

PotholeIMG.init(
  {
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    photoURL: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    caption: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    user_id: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: 'potholeimgs',
  }
);
  
  
(async () => {
  await sequelize.sync();
})();

export default PotholeIMG;



// interface ImageAttributes {
//   image_id: number;
//   photoURL: string;
//   caption: string;
//   user_id: number;
//   pothole_id: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

// type ImageCreationAttributes = Optional<ImageAttributes, 'image_id' | 'createdAt' | 'updatedAt'>;

// const Image: ModelDefined<ImageAttributes, ImageCreationAttributes> = db.define(
//   'Image',
//   {
//     image_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//     },
//     photoURL: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     caption: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     pothole_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     createdAt: DataTypes.DATE,
//     updatedAt: DataTypes.DATE,
//   },
//   {
//     tableName: 'potholeimgs',
//   }
// );

// (async () => {
//   await db.sync();
// })();

// export default Image;
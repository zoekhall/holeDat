import sequelize from '../db.server';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

interface BadgeAttributes {
  badge_id: number;
  name: string;
  imgUrl: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

type BadgeCreationAttributes = Optional<BadgeAttributes, 'badge_id' | 'createdAt' | 'updatedAt'>;

const Badge: ModelDefined<BadgeAttributes, BadgeCreationAttributes> = sequelize.define(
  'Badge',
  {
    badge_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    tableName: 'badges',
  }
);

(async () => {
  await sequelize.sync();
})();

export default Badge;
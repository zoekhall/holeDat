import db from '../db.server';
import { DataTypes, ModelDefined, Optional } from 'sequelize';

interface CommentAttributes {
  comment_id: number;
  text: string;
  user_id: number;
  pothole_id: number;
  createdAt: Date;
  updatedAt: Date;
}

type CommentCreationAttributes = Optional<CommentAttributes, 'comment_id' | 'createdAt' | 'updatedAt'>;

const Comment: ModelDefined<CommentAttributes, CommentCreationAttributes> = db.define(
  'Comment',
  {
    comment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    text: {
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
    tableName: 'comments',
  }
);

(async () => {
  await db.sync();
})();

export default Comment;
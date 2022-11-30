import { DataTypes } from 'sequelize'
import DB from '../config/db.js'

const Groups = DB.define(
  'group',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    group_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    group_picture: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_group: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { timestamps: false }
)

export default Groups

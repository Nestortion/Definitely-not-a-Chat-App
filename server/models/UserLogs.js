import DB from '../config/db.js'
import { DataTypes } from 'sequelize'

const UserLogs = DB.define(
  'user_logs',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    action_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { createdAt: true, updatedAt: false }
)

export default UserLogs

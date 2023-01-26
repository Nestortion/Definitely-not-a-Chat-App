import DB from '../config/db.js'
import { DataTypes } from 'sequelize'

const Sections = DB.define(
  'section',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    section_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
)

export default Sections

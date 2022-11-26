import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()
const DB = new Sequelize('dnca', 'root', `${process.env.DB_PASS}`, {
  host: 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false,
})

try {
  await DB.authenticate()
  console.log('db connected')
} catch (err) {
  console.log('error db connection')
}

export default DB

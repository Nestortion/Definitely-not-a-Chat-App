import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'
import server from './config/apolloServer.js'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import Users from './models/Users.js'
import { sendRefreshToken } from './auth/sendTokens.js'
import { signAccessToken, signRefreshToken } from './auth/signTokens.js'
import path from 'node:path'

dotenv.config()

const app = express()
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost'
const CLIENT_PORT = process.env.CLIENT_PORT || '5173'
const PORT = process.env.PORT || 4000

await server.start()

app.use(express.static('files'))

app.use(
  cors({
    credentials: true,
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      `${CLIENT_URL}:${CLIENT_PORT}`,
    ],
  }),
  cookieParser(),
  json()
)

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies['refresh-token']

  if (!token) {
    return res.send({
      message: 'Refresh Token does not exist',
      accessToken: '',
    })
  }

  let data
  try {
    data = jwt.verify(token, process.env.REFRESH_SECRET)
  } catch (err) {
    return res.send({
      message: 'Refresh Token does not exist',
      accessToken: '',
    })
  }

  const user = await Users.findOne({ where: { id: data.user_id } })

  if (!user) {
    res.send({
      message: 'User does not exist',
      accessToken: '',
    })
  }

  if (user.token_version !== data.token_version) {
    return res.send({
      message: 'Token Version does not match',
      accessToken: '',
    })
  }
  sendRefreshToken(res, signRefreshToken(user))

  return res.send({ accessToken: signAccessToken(user) })
})

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 10 }),

  expressMiddleware(server, {
    context: ({ req, res }) => {
      return { req, res }
    },
  })
)

app.listen(process.env.PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})

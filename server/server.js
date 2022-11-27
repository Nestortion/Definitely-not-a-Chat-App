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

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

await server.start()

app.use(
  cors({
    credentials: true,
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
  }),
  cookieParser(),
  json()
)

app.post('/refresh_token', async (req, res) => {
  const token = req.cookies['refresh-token']

  if (!token) {
    throw new Error('Refresh Token does not exist')
  }

  let data
  try {
    data = jwt.verify(token, process.env.REFRESH_SECRET)
  } catch (err) {
    throw new Error('Refresh Token does not exist')
  }

  const user = await Users.findOne({ where: { id: data.user_id } })

  if (!user) {
    throw new Error('User does not exist')
  }

  if (user.token_version !== data.token_version) {
    throw new Error('Token Version does not match')
  }
  sendRefreshToken(res, signRefreshToken(user))

  res.send({ accessToken: signAccessToken(user) })
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

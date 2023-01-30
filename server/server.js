import express, { json } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4'
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs'
import jwt from 'jsonwebtoken'
import Users from './models/Users.js'
import { signAccessToken, signRefreshToken } from './auth/signTokens.js'
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { ApolloServer } from '@apollo/server'
import typeDefs from './schema/typeDefs.js'
import resolvers from './schema/resolvers.js'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { useServer } from 'graphql-ws/lib/use/ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { PubSub } from 'graphql-subscriptions'
import session from 'express-session'

dotenv.config()

const app = express()
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost'
const CLIENT_PORT = process.env.CLIENT_PORT || '5173'
const PORT = process.env.PORT || 4000
const httpServer = createServer(app)
const pubsub = new PubSub()

const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
})

const schema = makeExecutableSchema({ typeDefs, resolvers })
const serverCleanup = useServer(
  {
    schema,
    context: ({ req, res }) => ({
      req,
      res,
      pubsub,
    }),
  },
  wsServer
)

const server = new ApolloServer({
  schema,
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          },
        }
      },
    },
  ],
})

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
  session({
    name: 'session',
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: true,
      maxAge: 604800,
    },
  }),
  json()
)

app.post('/refresh_token', async (req, res) => {
  const token = req.session.refresh_token

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
  req.session.refresh_token = signRefreshToken(user)

  return res.send({ accessToken: signAccessToken(user) })
})

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 20000000, maxFiles: 10 }),

  expressMiddleware(server, {
    context: ({ req, res }) => {
      return { req, res, pubsub }
    },
  })
)

httpServer.listen(process.env.PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})

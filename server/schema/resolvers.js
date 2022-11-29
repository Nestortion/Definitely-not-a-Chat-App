import Groups from '../models/Groups.js'
import UserGroups from '../models/UserGroups.js'
import UserChats from '../models/UserChats.js'
import Users from '../models/Users.js'
import UserChatReactions from '../models/UserChatReactions.js'
import GroupRoles from '../models/GroupRoles.js'
import UserGroupRoles from '../models/UserGroupRoles.js'
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs'
import { createWriteStream } from 'node:fs'
import path from 'node:path'
import { GraphQLError } from 'graphql'
import jwt from 'jsonwebtoken'
import { signAccessToken, signRefreshToken } from '../auth/signTokens.js'
import { sendRefreshToken } from '../auth/sendTokens.js'
import { authMiddleware } from '../auth/middlewares/authMiddleware.js'
import { createAssociation, syncModels } from '../models/Associations.js'

createAssociation()
syncModels()

const resolvers = {
  Upload: GraphQLUpload,
  AccessLevel: {
    USER: 'USER',
    MODERATOR: 'MODERATOR',
    ADMIN: 'ADMIN',
  },
  Query: {
    userChat: (_, { id }) => {
      return UserChats.findOne({ where: { id } })
    },
    user: (_, { id }) => {
      return Users.findOne({ where: { id } })
    },
    group: async (_, { id }, context) => {
      const { data: user } = authMiddleware(context)

      const validation = await UserGroups.findOne({
        where: { user_id: user.user_id, group_id: id },
      })

      if (!validation) {
        throw new GraphQLError('user does not belong to chat')
      }

      return Groups.findOne({ where: { id } })
    },
    userGroup: (_, { user_id, group_id }) => {
      if (user_id) {
        return UserGroups.findOne({ where: { user_id } })
      } else {
        return UserGroups.findOne({ where: { group_id } })
      }
    },
    users: () => {
      return Users.findAll()
    },
    userChats: async (_, { receiver }, context) => {
      const { data: user } = authMiddleware(context)

      const validation = await UserGroups.findOne({
        where: { user_id: user.user_id, group_id: receiver },
      })

      if (!validation) {
        throw new GraphQLError('user does not belong to chat')
      }

      return UserChats.findAll({ where: { receiver } })
    },
    groups: async (_, __, context) => {
      const { data } = authMiddleware(context)

      const validation = await UserGroups.findAll({
        where: { user_id: data.user_id },
      })

      let groups = []
      validation.forEach(async (usergroup) => {
        groups.push(usergroup.group_id)
      })

      return Groups.findAll({ where: { id: groups } })
    },
    userGroups: () => {
      return UserGroups.findAll()
    },
    currentUser: async (_, __, context) => {
      const { data } = authMiddleware(context)

      const currentUser = await Users.findOne({ where: { id: data.user_id } })
      return currentUser
    },
    isLoggedIn: async (_, __, context) => {
      const refreshToken = context.req.cookies['refresh-token']

      const refreshTokenData = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET
      )

      const refreshTokenUser = await Users.findOne({
        where: { id: refreshTokenData.user_id },
      })

      if (refreshTokenUser) return true
      else return false
    },
  },
  Mutation: {
    addUser: async (
      _,
      {
        username,
        access_level,
        password,
        first_name,
        last_name,
        age,
        section,
        address,
        gender,
      }
    ) => {
      return Users.create({
        username,
        access_level,
        password,
        first_name,
        last_name,
        age,
        section,
        address,
        gender,
      })
    },
    addUserChat: async (_, { file, message, receiver, user_id }, context) => {
      // const { req, res, data: user } = authMiddleware(context)

      const validation = await UserGroups.findOne({
        where: { user_id, group_id: receiver },
      })
      if (validation) {
        if (file) {
          const { createReadStream, filename } = await file
          let newFileName = `dnca${filename}`
          await new Promise((res) =>
            createReadStream()
              .pipe(
                createWriteStream(
                  path.join('__dirname', '../images', newFileName)
                )
              )
              .on('close', res)
          )
          return UserChats.create({
            message: newFileName,
            user_id,
            receiver,
          })
        } else {
          if (message !== '') {
          }
          return UserChats.create({ message, user_id, receiver })
        }
      } else {
        throw new GraphQLError(
          `userId ${user_id} does not belong to groupId ${receiver}`
        )
      }
    },
    addGroup: (_, { group_name }) => {
      return Groups.create({ group_name })
    },
    addUserGroup: (_, { user_id, group_id }) => {
      return UserGroups.create({ user_id, group_id })
    },
    addGroupRole: async (_, { role_name, emoji, description, group_id }) => {
      const validation = await GroupRoles.findOne({
        where: { role_name, group_id },
      })

      if (!validation) {
        return GroupRoles.create({ role_name, emoji, description, group_id })
      } else {
        throw new GraphQLError('role already exist')
      }
    },
    addUserGroupRole: (_, { user_group_id, group_role_id }) => {
      return UserGroupRoles.create({
        user_group_id,
        group_role_id,
      })
    },
    addUserChatReaction: (_, { reaction, count, userchat_id }) => {
      return UserChatReactions.create({
        reaction,
        count,
        userchat_id,
      })
    },
    login: async (_, { username, password }, context) => {
      const user = await Users.findOne({
        where: { username, password },
      })
      if (!user) {
        throw new GraphQLError('Username or password does not match')
      }

      sendRefreshToken(context.res, signRefreshToken(user))
      return { access_token: signAccessToken(user) }
    },
    revokeRefreshToken: async (_, { user_id }, context) => {
      const { data } = authMiddleware(context)

      const increment = await Users.increment(
        { token_version: 1 },
        { where: { id: user_id } }
      )

      if (increment) return true
      else return false
    },
    logout: async (_, __, context) => {
      const { res } = authMiddleware(context)

      res.clearCookie('refresh-token')

      return true
    },
  },
}

export default resolvers

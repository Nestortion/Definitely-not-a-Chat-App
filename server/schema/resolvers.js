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
import { v4 as uuid } from 'uuid'
import { Op } from 'sequelize'
import { withFilter } from 'graphql-subscriptions'

try {
  await createAssociation()
  await syncModels()
} catch (error) {
  console.log(error)
}

const resolvers = {
  Upload: GraphQLUpload,
  AccessLevel: {
    USER: 'USER',
    MODERATOR: 'MODERATOR',
    ADMIN: 'ADMIN',
  },
  MessageType: {
    TEXT: 'TEXT',
    IMAGE: 'IMAGE',
    OTHER: 'OTHER',
  },
  RoleType: {
    MODERATOR: 'MODERATOR',
    LEADER: 'LEADER',
    MEMBER: 'MEMBER',
  },
  Query: {
    userChat: (_, { id }) => {
      return UserChats.findOne({ where: { id } })
    },
    user: (_, __, context) => {
      const { data: user } = authMiddleware(context)

      return Users.findOne({ where: { id: user.user_id } })
    },
    userProfile: (_, { id }, context) => {
      authMiddleware(context)
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
    userChats: async (_, __, context) => {
      const { data: user } = authMiddleware(context)

      const validation = await Users.findOne({
        where: { id: user.user_id },
      })

      if (!validation) {
        throw new GraphQLError('user does not exist')
      }

      return UserChats.findAll()
    },
    groups: async (_, __, context) => {
      const { data: user } = authMiddleware(context)

      const validation = await UserGroups.findAll({
        where: { user_id: user.user_id },
      })
      let groups = []

      for (const usergroup of validation) {
        const hasChat = await UserChats.findAll({
          where: { receiver: usergroup.group_id },
        })
        if (hasChat.length > 0) {
          groups.push(usergroup.group_id)
        }
      }

      return Groups.findAll({ where: { id: groups } })
    },
    userGroups: () => {
      return UserGroups.findAll()
    },
    currentUser: async (_, __, context) => {
      const { data } = authMiddleware(context)

      return Users.findOne({ where: { id: data.user_id } })
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
    userRoles: async (_, { group_role_id }, context) => {
      authMiddleware(context)
      let userGroupIds = []
      let userIds = []
      const userGroupRoles = await UserGroupRoles.findAll({
        where: { group_role_id },
      })

      userGroupRoles.forEach((usergrouprole) => {
        userGroupIds.push(usergrouprole.user_group_id)
      })

      const users = await UserGroups.findAll({
        where: { id: userGroupIds },
      })

      users.forEach((user) => {
        userIds.push(user.user_id)
      })

      return Users.findAll({ where: { id: userIds } })
    },
    groupRoles: async (_, { group_id }, context) => {
      authMiddleware(context)

      let grouprolesids = []
      let newgrouprolesids = []

      const grouproles = await GroupRoles.findAll({ where: { group_id } })

      grouproles.forEach((grouprole) => {
        grouprolesids.push(grouprole.id)
      })

      const userGroupRoles = await UserGroupRoles.findAll({
        where: { group_role_id: grouprolesids },
      })

      userGroupRoles.forEach((usergrouprole) => {
        if (!newgrouprolesids.includes(usergrouprole.group_role_id)) {
          newgrouprolesids.push(usergrouprole.group_role_id)
        }
      })

      return GroupRoles.findAll({ where: { id: newgrouprolesids } })
    },
    searchGroups: async (_, { group_name, group_id }, context) => {
      const { data: user } = authMiddleware(context)

      const validation = await UserGroups.findAll({
        where: { user_id: user.user_id },
      })

      let groupsId = []

      for (const usergroup of validation) {
        const hasChat = await UserChats.findAll({
          where: { receiver: usergroup.group_id },
        })
        if (hasChat.length > 0) {
          groupsId.push(usergroup.group_id)
        }
      }

      if (group_name) {
        return Groups.findAll({
          where: { group_name: { [Op.like]: `%${group_name}%` }, id: groupsId },
        })
      }
      if (group_id) {
        return Groups.findAll({ where: { id: group_id } })
      }
    },
    latestChats: async (_, __, context) => {
      const { data: user } = authMiddleware(context)

      const groups = await UserGroups.findAll({
        where: { user_id: user.user_id },
      })

      let latestChats = []

      groups.forEach((group) => {
        const latestGroupChat = UserChats.findOne({
          where: {
            receiver: group.group_id,
          },
          order: [['createdAt', 'DESC']],
        })

        latestChats.push(latestGroupChat)
      })

      return latestChats
    },
    userGroupRoles: async (_, { group_id }, context) => {
      const { data } = authMiddleware(context)

      const validation = await Groups.findOne({ where: { id: group_id } })

      console.log(validation.dataValues.is_group)

      if (validation.dataValues.is_group === false) {
        return null
      }

      const userGroup = await UserGroups.findOne({
        where: { user_id: data.user_id, group_id },
      })

      const userGroupRole = await UserGroupRoles.findAll({
        where: { user_group_id: userGroup.id },
      })

      const groupRoleIds = userGroupRole.map(
        (usergrouprole) => usergrouprole.group_role_id
      )

      const groupRoles = await GroupRoles.findAll({
        where: { id: groupRoleIds },
      })

      return groupRoles
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
    addUserChat: async (_, { file, message, receiver }, context) => {
      const { data: user, pubsub } = authMiddleware(context)

      const validation = await UserGroups.findOne({
        where: { user_id: user.user_id, group_id: receiver },
      })
      if (validation) {
        let messageType = ''
        if (file) {
          const { createReadStream, filename, mimetype } = await file
          let filepath = '../files'
          if (mimetype.includes('image')) {
            filepath = '../files/message/images'
            messageType = 'IMAGE'
          } else {
            filepath = '../files/message/documents'
            messageType = 'OTHER'
          }

          let newFileName = `${uuid()} ${filename}`

          await new Promise((res) =>
            createReadStream()
              .pipe(
                createWriteStream(path.join('__dirname', filepath, newFileName))
              )
              .on('close', res)
          )

          const userChat = await UserChats.create({
            message: newFileName,
            user_id: user.user_id,
            receiver,
            message_type: messageType,
          })

          pubsub.publish('CHAT_ADDED', {
            chatAdded: userChat.dataValues,
          })
          return userChat
        } else {
          if (message !== '') {
          }
          const userChat = await UserChats.create({
            message,
            user_id: user.user_id,
            receiver,
          })

          pubsub.publish('CHAT_ADDED', {
            chatAdded: userChat.dataValues,
          })
          return userChat
        }
      } else {
        throw new GraphQLError(
          `userId ${user.user_id} does not belong to groupId ${receiver}`
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
      authMiddleware(context)

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
  Subscription: {
    chatAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('CHAT_ADDED'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.chatAdded.receiver,
            },
          })

          if (userGroup) {
            return true
          }
          return false
        }
      ),
    },
  },
}

export default resolvers

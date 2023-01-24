import Groups from '../models/Groups.js'
import UserGroups from '../models/UserGroups.js'
import UserChats from '../models/UserChats.js'
import Users from '../models/Users.js'
import UserChatReactions from '../models/UserChatReactions.js'
import GroupRoles from '../models/GroupRoles.js'
import UserGroupRoles from '../models/UserGroupRoles.js'
import AdminLogs from '../models/AdminLogs.js'
import UserLogs from '../models/UserLogs.js'
import Reports from '../models/Reports.js'
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
import { DateTimeResolver } from 'graphql-scalars'
import { report } from 'node:process'

try {
  await createAssociation()
  await syncModels()
} catch (error) {
  console.log(error)
}

const resolvers = {
  Upload: GraphQLUpload,
  DateTime: DateTimeResolver,
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
    userChatSender: (_, { user_id }, context) => {
      authMiddleware(context)
      return Users.findOne({ where: { id: user_id } })
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

      let group = await Groups.findOne({ where: { id } })

      if (group.is_group === true) return group

      const userGroups = await UserGroups.findAll({ where: { group_id: id } })

      const otherUserId = userGroups.filter(
        (usergroup) => usergroup.user_id !== user.user_id
      )

      const otherUser = await Users.findOne({
        where: { id: otherUserId[0].user_id },
      })

      const otherUserFullName = `${otherUser.first_name} ${otherUser.last_name}`

      group.group_name = otherUserFullName
      group.group_picture = otherUser.profile_img

      return group
    },
    userGroup: (_, { user_id, group_id }) => {
      if (user_id) {
        return UserGroups.findOne({ where: { user_id } })
      } else {
        return UserGroups.findOne({ where: { group_id } })
      }
    },
    users: (_, { limit }, context) => {
      authMiddleware(context)

      if (limit) {
        return Users.findAll({ limit })
      }

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

      const userGroupIds = validation.map((usergroup) => usergroup.id)

      const userGroupRoles = await UserGroupRoles.findAll({
        where: { user_group_id: userGroupIds },
      })

      const groupRolesIds = userGroupRoles.map(
        (usergrouprole) => usergrouprole.group_role_id
      )

      const groupRoles = await GroupRoles.findAll({
        where: { id: groupRolesIds },
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

      for (const groupRole of groupRoles) {
        if (groupRole.role_type === 'MODERATOR') {
          groups.push(groupRole.group_id)
        }
      }

      const returnVal = await Groups.findAll({
        where: { id: groups },
        order: [['last_message_date', 'DESC']],
      })

      const updatedList = await Promise.all(
        returnVal.map(async (group) => {
          if (group.is_group === true) return group

          let newGroup = group

          const userGroups = await UserGroups.findAll({
            where: { group_id: newGroup.id },
          })

          const otherUserId = userGroups.filter(
            (usergroup) => usergroup.user_id !== user.user_id
          )

          const otherUser = await Users.findOne({
            where: { id: otherUserId[0].user_id },
          })

          const otherUserFullName = `${otherUser.first_name} ${otherUser.last_name}`

          newGroup.group_name = otherUserFullName
          newGroup.group_picture = otherUser.profile_img

          return newGroup
        })
      )

      return updatedList
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

      if (refreshTokenUser)
        return { isLogged: true, currentUser: refreshTokenUser }
      else return { isLogged: false, currentUser: null }
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
    groupRolesList: async (_, { group_id }, context) => {
      authMiddleware(context)

      const groupRoles = await GroupRoles.findAll({ where: { group_id } })

      return groupRoles
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
    addMemberList: async (_, { group_id, form }, context) => {
      const { data: currUser } = authMiddleware(context)

      const userGroups = await (
        await UserGroups.findAll({ where: { group_id } })
      ).map((usergroup) => usergroup.user_id)

      const users = await Users.findAll()

      if (form === 'memberList') {
        const kvUsers = users.map((user) => {
          if (!userGroups.includes(user.id))
            return {
              key: user.id,
              value: `${user.first_name} ${user.last_name}`,
            }
        })
        return kvUsers
      } else if (form === 'userList') {
        const filteredUser = users.filter(
          (user) => user.id !== currUser.user_id
        )

        const kvUsers = filteredUser.map((user) => {
          return {
            key: user.id,
            value: `${user.first_name} ${user.last_name}`,
          }
        })
        return kvUsers
      }
    },
    adminLogs: async (_, __, context) => {
      const { data: user } = authMiddleware(context)

      const adminLogs = await AdminLogs.findAll()

      return adminLogs
    },
    userLogs: async (_, __, context) => {
      const { data: user } = authMiddleware(context)

      const userLogs = await UserLogs.findAll()

      return userLogs
    },
    currentUserGroupRoles: async (_, { group_id }, context) => {
      const { data } = authMiddleware(context)

      const user = await Users.findOne({ where: { id: data.user_id } })

      const userGroups = await UserGroups.findAll({
        where: { user_id: user.id },
      })

      const userGroupIds = userGroups.map((usergroup) => usergroup.id)

      const userGroupRoles = await UserGroupRoles.findAll({
        where: { user_group_id: userGroupIds },
      })

      const groupRoleIds = userGroupRoles.map(
        (usergrouprole) => usergrouprole.group_role_id
      )

      const groupRoles = await GroupRoles.findAll({
        where: { id: groupRoleIds },
      })

      const rolesInGroup = groupRoles.filter(
        (grouprole) => grouprole.group_id === group_id
      )

      const roles = rolesInGroup.map((rolesingroup) => rolesingroup.role_type)

      return { roles }
    },
    otherUser: async (_, { group_id }, context) => {
      const { data: user } = authMiddleware(context)

      const group = await Groups.findOne({ where: { id: group_id } })

      const userGroup = await UserGroups.findAll({
        where: { group_id: group.id },
      })

      const userGroupFilter = userGroup.filter(
        (usergroup) => usergroup.user_id !== user.user_id
      )

      const otherUser = await Users.findOne({
        where: { id: userGroupFilter[0].user_id },
      })

      return otherUser
    },
    groupList: async (_, { limit }, context) => {
      authMiddleware(context)
      if (limit) {
        return Groups.findAll({ limit })
      }
      return Groups.findAll()
    },
    groupMembers: async (_, { group_id }, context) => {
      authMiddleware(context)

      const userGroup = await UserGroups.findAll({ where: { group_id } })

      const userIds = userGroup.map((usergroup) => usergroup.user_id)

      return Users.findAll({ where: { id: userIds } })
    },
    systemStats: async (_, __, context) => {
      authMiddleware(context)

      const users = await Users.findAll()
      const groups = await Groups.findAll()
      const userChats = await UserChats.findAll()
      const reports = await Reports.findAll()

      const filterReports = reports.filter(
        (report) => report.is_resolved === false
      )

      return {
        userCount: users.length,
        groupCount: groups.length,
        userChatsCount: userChats.length,
        pendingReportCount: filterReports.length,
      }
    },
    userGroupRoles: async (_, { group_id, user_id }, context) => {
      authMiddleware(context)

      const userGroups = await UserGroups.findAll({
        where: { group_id, user_id },
      })

      const userGroupIds = userGroups.map((usergroup) => usergroup.id)

      const userGroupRoles = await UserGroupRoles.findAll({
        where: { user_group_id: userGroupIds },
      })

      const groupRolesIds = userGroupRoles.map(
        (usergrouprole) => usergrouprole.group_role_id
      )

      const groupRoles = await GroupRoles.findAll({
        where: { id: groupRolesIds },
      })

      return groupRoles.map((grouprole) => grouprole.id)
    },
    reports: async (_, __, context) => {
      authMiddleware(context)

      const reports = await Reports.findAll()

      return reports
    },
    report: async (_, { report_id }, context) => {
      authMiddleware(context)

      const report = await Reports.findOne({ where: { id: report_id } })

      const sender = await Users.findOne({ where: { id: report.user_id } })
      const chat_reported = await Groups.findOne({
        where: { id: report.group_id },
      })

      return {
        report,
        sender,
        chat_reported,
      }
    },
    reportedChat: async (_, { group_id }, context) => {
      authMiddleware(context)

      const userGroups = await UserGroups.findAll({ where: { group_id } })

      const userIds = userGroups.map((usergroup) => usergroup.user_id)

      const allMembers = await Users.findAll({ where: { id: userIds } })

      const group_data = await Groups.findOne({ where: { id: group_id } })

      const groupRoles = await GroupRoles.findAll({ where: { group_id } })

      const roleMembers = await Promise.all(
        groupRoles.map(async (role) => {
          const userGroupRoles = await UserGroupRoles.findAll({
            where: { group_role_id: role.id },
          })

          const userGroupIds = userGroupRoles.map(
            (usergrouprole) => usergrouprole.user_group_id
          )

          const userGroups = await UserGroups.findAll({
            where: { id: userGroupIds },
          })

          const userIds = userGroups.map((usergroup) => usergroup.user_id)

          const members = await Users.findAll({ where: { id: userIds } })

          return {
            role,
            members,
          }
        })
      )

      return {
        group_data,
        allMembers,
        roleMembers,
      }
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

      const actionUser = await Users.findOne({ where: { id: user.user_id } })
      const group = await Groups.findOne({ where: { id: receiver } })

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

          await Groups.update(
            { last_message_date: Date.now() },
            {
              where: {
                id: receiver,
              },
            }
          )

          await UserLogs.create({
            full_name: `${actionUser.first_name} ${actionUser.last_name}`,
            section: `${actionUser.section}`,
            action_description: `sent file: ${filename} to group ${group.group_name}`,
            user_id: user.user_id,
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

          await Groups.update(
            { last_message_date: Date.now() },
            {
              where: {
                id: receiver,
              },
            }
          )

          await UserLogs.create({
            full_name: `${actionUser.first_name} ${actionUser.last_name}`,
            section: `${actionUser.section}`,
            action_description: `sent message: "${message}" to group ${group.group_name}`,
            user_id: user.user_id,
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
    createGroup: async (_, { user_id }, context) => {
      const { data: user, pubsub } = authMiddleware(context)
      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      if (user_id.length === 1) {
        const otherUser = await Users.findOne({ where: { id: user_id[0] } })

        const checkGroup = await Groups.findOne({
          where: {
            [Op.or]: [
              { group_name: `${otherUser.username}${actionUser.username}` },
              { group_name: `${actionUser.username}${otherUser.username}` },
            ],
          },
        })

        if (checkGroup) return checkGroup

        const users = [user.user_id, user_id[0]]

        const pmGroup = await Groups.create({
          group_name: `${actionUser.username}${otherUser.username}`,
          group_picture: `${otherUser.profile_img}`,
          last_message_date: Date.now(),
        })

        await Promise.all(
          users.map(async (user) => {
            await UserGroups.create({ user_id: user, group_id: pmGroup.id })
          })
        )

        await UserLogs.create({
          full_name: `${actionUser.first_name} ${actionUser.last_name}`,
          section: `${actionUser.section}`,
          action_description: `Started a new conversation with ${otherUser.first_name} ${otherUser.last_name}`,
          user_id: user.user_id,
        })

        pubsub.publish('GROUP_CREATED', {
          groupCreated: {
            blame: actionUser,
            group: pmGroup,
          },
        })

        return pmGroup
      }
      if (user_id.length > 1) {
        const userIds = [...user_id, user.user_id]

        const newGroup = await Groups.create({
          group_name: 'New Group',
          last_message_date: Date.now(),
          group_picture: 'default-icon.png',
          is_group: true,
        })

        const createUserGroups = await Promise.all(
          userIds.map(async (user) => {
            const userGroup = await UserGroups.create({
              user_id: user,
              group_id: newGroup.id,
            })
            return userGroup
          })
        )

        const defaultGroupRole = await GroupRoles.create({
          role_name: 'Member',
          emoji: ' ',
          description: ' ',
          group_id: newGroup.id,
          is_default: true,
        })

        const defaultCreatorRole = await GroupRoles.create({
          role_name: 'Group Creator',
          emoji: ' ',
          description: 'Group Creator',
          group_id: newGroup.id,
          role_type: 'MODERATOR',
          is_default: true,
        })

        await Promise.all(
          createUserGroups.map(async (usergroup) => {
            if (usergroup.user_id === user.user_id) {
              await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultCreatorRole.id,
              })
              await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultGroupRole.id,
              })
            } else {
              await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultGroupRole.id,
              })
            }
          })
        )

        await UserLogs.create({
          full_name: `${actionUser.first_name} ${actionUser.last_name}`,
          section: `${actionUser.section}`,
          action_description: `Started a new group conversation with ${user_id.length} people`,
          user_id: user.user_id,
        })

        pubsub.publish('GROUP_CREATED', {
          groupCreated: {
            blame: actionUser,
            group: newGroup,
          },
        })

        return newGroup
      }
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

      await UserLogs.create({
        full_name: `${user.first_name} ${user.last_name}`,
        section: `${user.section}`,
        action_description: `Has logged in`,
        user_id: user.id,
      })

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
      const { res, data: user } = authMiddleware(context)

      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      await UserLogs.create({
        full_name: `${actionUser.first_name} ${actionUser.last_name}`,
        section: `${actionUser.section}`,
        action_description: `Has logged out`,
        user_id: user.user_id,
      })
      res.clearCookie('refresh-token')

      return true
    },
    addMember: async (_, { group_id, user_id }, context) => {
      const { pubsub, data: user } = authMiddleware(context)

      const usersAdded = await Users.findAll({ where: { id: user_id } })
      const group = await Groups.findOne({ where: { id: group_id } })

      const userIds = await Promise.all(
        user_id.map(async (id) => {
          const validate = await UserGroups.findOne({
            where: { user_id: id, group_id },
          })

          if (validate) return null
          else {
            return { user_id: id, group_id }
          }
        })
      )
      if (group.is_group === true) {
        if (userIds.length > 0) {
          const bulkUserGroups = await Promise.all(
            userIds.map(async (user) => {
              if (user !== null) {
                const userGroup = await UserGroups.create(user)
                return userGroup
              }
            })
          )

          const defaultRole = await GroupRoles.findOne({
            where: { role_name: 'Member', group_id },
          })

          let users = []
          const usergroup_roles = await Promise.all(
            bulkUserGroups.map(async (user_group_id) => {
              const usergroup_role = await UserGroupRoles.create({
                user_group_id: user_group_id.id,
                group_role_id: defaultRole.id,
              })

              const user = await Users.findOne({
                where: { id: user_group_id.user_id },
              })

              users.push({
                user,
                role: defaultRole,
              })
              return usergroup_role
            })
          )
          const blame = await Users.findOne({ where: { id: user.user_id } })

          const addedUsers = usersAdded.map((user) => {
            return `${user.first_name} ${user.last_name}`
          })

          await UserLogs.create({
            full_name: `${blame.first_name} ${blame.last_name}`,
            section: `${blame.section}`,
            action_description: `Added ${addedUsers.toString()} to ${
              group.group_name
            }`,
            user_id: blame.user_id,
          })
          pubsub.publish('MEMBER_ADDED', {
            memberAdded: {
              users,
              group,
              group_roles: [defaultRole],
              usergroups: bulkUserGroups,
              usergroup_roles,
              blame,
            },
          })

          return bulkUserGroups
        }
      } else {
        const userGroup = await UserGroups.findAll({ where: { group_id } })
        const pmUsers = userGroup.map((user) => user.user_id)

        const newGroupUsers = pmUsers.concat(user_id)

        const newGroupUsersData = await Users.findAll({
          where: { id: newGroupUsers },
        })

        const newGroup = await Groups.create({
          group_name: 'New Group',
          is_group: true,
          last_message_date: Date.now(),
        })

        const createUserGroups = await Promise.all(
          newGroupUsersData.map(async (userdata) => {
            const createUserGroup = await UserGroups.create({
              group_id: newGroup.id,
              user_id: userdata.id,
            })

            return createUserGroup
          })
        )

        const defaultGroupRole = await GroupRoles.create({
          role_name: 'Member',
          emoji: ' ',
          description: ' ',
          group_id: newGroup.id,
          is_default: true,
        })

        const defaultCreatorRole = await GroupRoles.create({
          role_name: 'Group Creator',
          emoji: ' ',
          description: 'Group Creator',
          group_id: newGroup.id,
          role_type: 'MODERATOR',
          is_default: true,
        })

        const createDefaultUserGroupRoles = await Promise.all(
          createUserGroups.map(async (usergroup) => {
            if (usergroup.user_id === user.user_id) {
              const createDefaultUserGroupRole = await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultCreatorRole.id,
              })
              await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultGroupRole.id,
              })

              return createDefaultUserGroupRole
            } else {
              const createDefaultUserGroupRole = await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultGroupRole.id,
              })
              return createDefaultUserGroupRole
            }
          })
        )

        const blame = await Users.findOne({ where: { id: user.user_id } })

        const addedUsers = usersAdded.map((user) => {
          return `${user.first_name} ${user.last_name}`
        })

        await UserLogs.create({
          full_name: `${blame.first_name} ${blame.last_name}`,
          section: `${blame.section}`,
          action_description: `Added ${addedUsers.toString()} to ${
            newGroup.group_name
          }`,
          user_id: blame.id,
        })
        pubsub.publish('MEMBER_ADDED', {
          memberAdded: {
            users: newGroupUsersData,
            group: newGroup,
            group_roles: [defaultCreatorRole, defaultGroupRole],
            usergroups: createUserGroups,
            usergroup_roles: createDefaultUserGroupRoles,
            blame,
          },
        })
        return createUserGroups
      }
    },
    updateGroup: async (
      _,
      { group_name, group_id, group_picture },
      context
    ) => {
      const { pubsub, data: user } = authMiddleware(context)

      if (group_picture) {
        const { createReadStream, filename } = await group_picture
        let filepath = '../files/grouppfp'
        let newFileName = `${uuid()} ${filename}`

        await new Promise((res) =>
          createReadStream()
            .pipe(
              createWriteStream(path.join('__dirname', filepath, newFileName))
            )
            .on('close', res)
        )
        await Groups.update(
          { group_picture: newFileName, group_name },
          { where: { id: group_id } }
        )
      } else {
        await Groups.update({ group_name }, { where: { id: group_id } })
      }

      const updatedGroup = await Groups.findOne({ where: { id: group_id } })

      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      await UserLogs.create({
        full_name: `${actionUser.first_name} ${actionUser.last_name}`,
        section: `${actionUser.section}`,
        action_description: `Updated the group_name of group ${updatedGroup.id} from ${group_name} to ${updatedGroup.group_name}`,
        user_id: user.user_id,
      })

      pubsub.publish('GROUP_UPDATE', {
        groupUpdate: updatedGroup,
      })

      return updatedGroup
    },
    removeMember: async (_, { group_id, user_id }, context) => {
      const { pubsub, data: user } = authMiddleware(context)

      const userGroup = await UserGroups.findOne({
        where: { group_id, user_id },
      })

      const userGroupRoles = await UserGroupRoles.findAll({
        where: { user_group_id: userGroup.id },
      })

      const groupRoles = (
        await GroupRoles.findAll({
          where: {
            id: userGroupRoles.map(
              (usergrouprole) => usergrouprole.group_role_id
            ),
          },
        })
      ).map((role) => role.role_name)

      if (groupRoles.includes('Group Creator')) return null

      const removedUser = await Users.findOne({ where: { id: user_id } })

      const group = await Groups.findOne({ where: { id: group_id } })
      const blame = await Users.findOne({ where: { id: user.user_id } })

      await UserGroups.destroy({ where: { group_id, user_id } })

      await UserLogs.create({
        full_name: `${blame.first_name} ${blame.last_name}`,
        section: `${blame.section}`,
        action_description: `Removed ${removedUser.first_name} ${removedUser.last_name} from group ${group.id}`,
        user_id: blame.user_id,
      })

      pubsub.publish('MEMBER_REMOVED', {
        memberRemoved: {
          blame,
          group,
          user: removedUser,
        },
      })

      return removedUser
    },
    updateUserProfile: async (
      _,
      {
        username,
        address,
        age,
        section,
        gender,
        profile_img,
        current_confirmation,
        new_password,
      },
      context
    ) => {
      const { data: user } = authMiddleware(context)

      const initialUser = await Users.findOne({ where: { id: user.user_id } })

      if (current_confirmation !== initialUser.password) return null

      let password = new_password
      if (!new_password || new_password === '') {
        password = initialUser.password
      }

      let newImage = initialUser.profile_img

      if (profile_img) {
        const { createReadStream, filename } = await profile_img
        let filepath = '../files/pfp'
        newImage = `${uuid()} ${filename}`

        await new Promise((res) =>
          createReadStream()
            .pipe(createWriteStream(path.join('__dirname', filepath, newImage)))
            .on('close', res)
        )
      }

      await Users.update(
        {
          username,
          address,
          age,
          section,
          gender,
          profile_img: newImage,
          password,
        },
        { where: { id: user.user_id } }
      )

      const updatedUser = await Users.findOne({ where: { id: user.user_id } })

      await UserLogs.create({
        full_name: `${initialUser.first_name} ${initialUser.last_name}`,
        section: `${initialUser.section}`,
        action_description: `Updated their User Profile`,
        user_id: initialUser.id,
      })

      return updatedUser
    },
    updateGroupRoles: async (
      _,
      { roles_to_edit, roles_to_delete, group_id },
      context
    ) => {
      const { data: user, pubsub } = authMiddleware(context)

      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      const rolesToUpdate = roles_to_edit.filter((role) => role.id !== null)
      const rolesToCreate = roles_to_edit.filter((role) => role.id === null)

      const createRoles = await Promise.all(
        rolesToCreate.map(async (role) => {
          const createRole = await GroupRoles.create({
            role_name: role.role_name,
            role_type: role.role_type,
            description: role.description,
            emoji: role.emoji,
            group_id,
          })
          return createRole
        })
      )

      const updateRoles = await Promise.all(
        rolesToUpdate.map(async (role) => {
          await GroupRoles.update(
            {
              role_name: role.role_name,
              emoji: role.emoji,
              description: role.description,
              role_type: role.role_type,
            },
            { where: { id: role.id } }
          )
          const updatedRole = await GroupRoles.findOne({
            where: { id: role.id },
          })

          return updatedRole
        })
      )
      let deleteRoles
      const rolesToDelete = roles_to_delete.filter((role) => role !== null)
      if (rolesToDelete.length > 0) {
        deleteRoles = await Promise.all(
          rolesToDelete.map(async (role) => {
            const deleteRole = await GroupRoles.destroy({ where: { id: role } })
            return deleteRole
          })
        )
      }

      await UserLogs.create({
        full_name: `${actionUser.first_name} ${actionUser.last_name}`,
        section: `${actionUser.section}`,
        action_description: `Updated the Group roles of group ${group_id}`,
        user_id: actionUser.id,
      })

      const newRoles = updateRoles.concat(createRoles)
      pubsub.publish('GROUP_ROLES_UPDATED', {
        groupRolesUpdated: {
          newRoles: newRoles,
          group_id,
        },
      })

      return newRoles
    },
    updateUserGroupRoles: async (
      _,
      { group_id, roles, user_id, roles_ids },
      context
    ) => {
      const { data: user, pubsub } = authMiddleware(context)
      const targetUser = await Users.findOne({ where: { id: user_id } })
      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      const userGroup = await UserGroups.findOne({
        where: { group_id, user_id },
      })

      const currentUserGroupRoles = await UserGroupRoles.findAll({
        where: { user_group_id: userGroup.id },
      })

      const filterDeleteRoles = await Promise.all(
        currentUserGroupRoles.map(async (usergrouprole) => {
          const groupRole = await GroupRoles.findOne({
            where: { id: usergrouprole.group_role_id },
          })

          if (!roles.includes(groupRole.role_name)) {
            await UserGroupRoles.destroy({
              where: {
                user_group_id: usergrouprole.user_group_id,
                group_role_id: usergrouprole.group_role_id,
              },
            })
          }

          return groupRole.role_name
        })
      )

      const rolesToAdd = roles.filter(
        (role) => !filterDeleteRoles.includes(role)
      )

      await Promise.all(
        rolesToAdd.map(async (role) => {
          const groupRole = await GroupRoles.findOne({
            where: { group_id, role_name: role },
          })

          await UserGroupRoles.create({
            user_group_id: userGroup.id,
            group_role_id: groupRole.id,
          })
        })
      )

      await UserLogs.create({
        full_name: `${actionUser.first_name} ${actionUser.last_name}`,
        section: `${actionUser.section}`,
        action_description: `Updated the Group roles of User ${targetUser.id} in Group ${group_id}`,
        user_id: actionUser.id,
      })

      pubsub.publish('MEMBER_ROLES_UPDATED', {
        memberRolesUpdated: {
          newRoles: roles,
          user: targetUser,
          group_id,
          roles_ids,
        },
      })

      return {
        newRoles: roles,
        user: targetUser,
      }
    },
    submitReport: async (_, { group_id, reasons }, context) => {
      const { data: user } = authMiddleware(context)

      const reportIssuer = await Users.findOne({ where: { id: user.user_id } })

      const reportReasons = reasons
        .filter((reason) => reason !== 'Others')
        .toString()
        .replace(/,/g, ', ')

      const submit = await Reports.create({
        report_reason: reportReasons,
        group_id,
        user_id: user.user_id,
      })

      await UserLogs.create({
        full_name: `${reportIssuer.first_name} ${reportIssuer.last_name}`,
        section: `${reportIssuer.section}`,
        action_description: `Submitted a report on Group ${group_id}`,
        user_id: reportIssuer.id,
      })

      return submit
    },
    updateReportStatus: async (_, { report_status, report_id }, context) => {
      const { data: user } = authMiddleware(context)

      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      const report = await Reports.findOne({ where: { id: report_id } })

      if (actionUser.access_level !== 'ADMIN') return
      if (report_status === report.is_resolved) return

      await Reports.update(
        { is_resolved: report_status, date_resolved: Date.now() },
        { where: { id: report_id } }
      )

      await AdminLogs.create({
        full_name: `${actionUser.first_name} ${actionUser.last_name}`,
        action_description: `Changed the status of report ${report_id} from ${
          report.is_resolved ? 'Resolved' : 'Pending'
        } to ${!report.is_resolved ? 'Resolved' : 'Pending'}`,
        user_id: actionUser.id,
      })

      const newReport = await Reports.findOne({ where: { id: report_id } })

      return newReport
    },
  },
  Subscription: {
    memberRolesUpdated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('MEMBER_ROLES_UPDATED'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.memberRolesUpdated.group_id,
            },
          })

          if (userGroup) {
            return true
          }
          return false
        }
      ),
    },
    groupCreated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('GROUP_CREATED'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.groupCreated.group.id,
            },
          })

          if (userGroup) {
            return true
          }
          return false
        }
      ),
    },
    memberAdded: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('MEMBER_ADDED'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.memberAdded.group.id,
            },
          })

          if (userGroup) {
            return true
          }
          return false
        }
      ),
    },
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
    groupUpdate: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('GROUP_UPDATE'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.groupUpdate.id,
            },
          })

          if (userGroup) {
            return true
          }
          return false
        }
      ),
    },
    memberRemoved: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('MEMBER_REMOVED'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.memberRemoved.group.id,
            },
          })

          if (userGroup) {
            return true
          }
          return false
        }
      ),
    },
    groupRolesUpdated: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('GROUP_ROLES_UPDATED'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.groupRolesUpdated.group_id,
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

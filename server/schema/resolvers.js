import Groups from '../models/Groups.js'
import UserGroups from '../models/UserGroups.js'
import UserChats from '../models/UserChats.js'
import Users from '../models/Users.js'
import UserChatReactions from '../models/UserChatReactions.js'
import GroupRoles from '../models/GroupRoles.js'
import UserGroupRoles from '../models/UserGroupRoles.js'
import AdminLogs from '../models/AdminLogs.js'
import UserLogs from '../models/UserLogs.js'
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

      return returnVal
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
      const { data: user } = authMiddleware(context)
      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      if (user_id.length === 1) {
        const otherUser = await Users.findOne({ where: { id: user_id[0] } })

        const otherUserFullName = `${otherUser.first_name} ${otherUser.last_name}`

        const users = [user.user_id, user_id[0]]

        const group = await Groups.create({
          group_name: otherUserFullName,
          last_message_date: Date.now(),
        })

        await Promise.all(
          users.forEach(async (user) => {
            await UserGroups.create({ user_id: user, group_id: group.id })
          })
        )

        await UserLogs.create({
          full_name: `${actionUser.first_name} ${actionUser.last_name}`,
          section: `${actionUser.section}`,
          action_description: `Started a new conversaion with ${otherUser.first_name} ${otherUser.last_name}`,
          user_id: user.user_id,
        })

        return group
      } else if (user_id.length > 1) {
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
        })

        const defaultCreatorRole = await GroupRoles.create({
          role_name: 'Group Creator',
          emoji: ' ',
          description: 'Group Creator',
          group_id: newGroup.id,
          role_type: 'MODERATOR',
        })

        const createDefaultUserGroupRoles = await Promise.all(
          createUserGroups.map(async (usergroup) => {
            if (usergroup.user_id === user.user_id) {
              const createDefaultUserGroupRole = await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultCreatorRole.id,
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

        await UserLogs.create({
          full_name: `${actionUser.first_name} ${actionUser.last_name}`,
          section: `${actionUser.section}`,
          action_description: `Started a new group conversation with ${user_id.length} people`,
          user_id: user.user_id,
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

        let newGroupName = ''

        newGroupUsersData.forEach((userdata) => {
          newGroupName = newGroupName.concat(userdata.username)
        })

        const newGroup = await Groups.create({
          group_name: newGroupName,
          is_group: true,
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
        })

        const defaultCreatorRole = await GroupRoles.create({
          role_name: 'Group Creator',
          emoji: ' ',
          description: 'Group Creator',
          group_id: newGroup.id,
          role_type: 'MODERATOR',
        })

        const createDefaultUserGroupRoles = await Promise.all(
          createUserGroups.map(async (usergroup) => {
            if (usergroup.user_id === user.user_id) {
              const createDefaultUserGroupRole = await UserGroupRoles.create({
                user_group_id: usergroup.id,
                group_role_id: defaultCreatorRole.id,
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
    updateGroupName: async (_, { group_name, group_id }, context) => {
      const { pubsub, data: user } = authMiddleware(context)

      await Groups.update({ group_name }, { where: { id: group_id } })

      const updatedGroup = await Groups.findOne({ where: { id: group_id } })

      const actionUser = await Users.findOne({ where: { id: user.user_id } })

      await UserLogs.create({
        full_name: `${actionUser.first_name} ${actionUser.last_name}`,
        section: `${actionUser.section}`,
        action_description: `Updated the group_name of group ${updatedGroup.id} from ${group_name} to ${updatedGroup.group_name}`,
        user_id: user.user_id,
      })

      pubsub.publish('GROUP_NAME_UPDATE', {
        groupNameUpdate: updatedGroup,
      })

      return updatedGroup
    },
    removeMember: async (_, { group_id, user_id }, context) => {
      const { pubsub, data: user } = authMiddleware(context)

      await UserGroups.destroy({ where: { group_id, user_id } })

      const removedUser = await Users.findOne({ where: { id: user_id } })
      const group = await Groups.findOne({ where: { id: group_id } })
      const blame = await Users.findOne({ where: { id: user.user_id } })

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
  },
  Subscription: {
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
    groupNameUpdate: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator('GROUP_NAME_UPDATE'),
        async (payload, variables) => {
          const userGroup = await UserGroups.findOne({
            where: {
              user_id: variables.user,
              group_id: payload.groupNameUpdate.id,
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
  },
}

export default resolvers

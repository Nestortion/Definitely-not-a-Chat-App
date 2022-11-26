const typeDefs = `

  scalar Upload

  type User {
    id: Int!
    username: String!
    access_level: AccessLevel!
    password: String!
    token_version: String!
    first_name: String!
    last_name: String!
    address: String!
    section: String!
    profile_img: String!
    age: Int!
    gender: String!
  }

  enum AccessLevel {
    USER
    MODERATOR
    ADMIN
  }

  type UserChat {
    id: Int!
    message: String!
    user_id: Int!
    receiver: Int!
  }

  type Group {
    id: Int!
    group_name: String!
  }

  type UserGroup {
    user_id: Int!
    group_id: Int!
  }

  type GroupRole{
    role_name: String!
    emoji: String!
    description: String!
    group_id: String!
  }

  type UserGroupRole{
    user_group_id: Int!
    group_role_id: Int!
  }

  type UserChatReaction{
    reaction: String!
    count: Int!
    userchat_id: Int!
  }

  type AccessToken{
    access_token: String!
  }


  type Query {
    user(id: Int!): User
    userChat(id: Int!): UserChat
    group(id: Int!): Group
    userGroup(user_id: Int, group_id: Int): UserGroup
    users: [User]
    userChats: [UserChat]
    groups: [Group]
    userGroups: [UserGroup]
    groupRoles: [GroupRole]
    userGroupRoles: [UserGroupRole]
    userChatReactions: [UserChatReaction]
    currentUser: User
    isLoggedIn: Boolean
  }

  type Mutation {
    addUser( username: String, access_level: AccessLevel, password: String, age: Int, address: String, section: String, first_name: String, last_name: String, profile_img: Upload, gender: String): User
    addUserChat( file: Upload, message: String, user_id: Int, receiver: Int): UserChat
    addGroup( group_name: String): Group
    addUserGroup( user_id:Int, group_id: Int): UserGroup
    addGroupRole( role_name: String, emoji: String, description: String, group_id: Int): GroupRole
    addUserGroupRole( user_group_id: Int, group_role_id: Int): UserGroupRole
    addUserChatReaction ( reaction: String, count: Int, userchat_id: Int): UserChatReaction
    login(username: String!, password: String!): AccessToken
    revokeRefreshToken(user_id:Int!) : Boolean
  }

`

export default typeDefs
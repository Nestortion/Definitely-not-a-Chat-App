const typeDefs = `

  scalar Upload
  scalar DateTime

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
    receiver: Int
    message_type: MessageType!
    createdAt: DateTime!
  }

  enum MessageType {
    TEXT
    IMAGE
    OTHER
  }

  type Group {
    id: Int!
    group_name: String!
    group_picture: String!
    is_group: String!
  }

  type UserGroup {
    user_id: Int!
    group_id: Int!
  }

  type GroupRole{
    id: Int!
    role_name: String!
    emoji: String!
    description: String!
    group_id: String!
    role_type: RoleType!
    is_default: Boolean!
  }

  enum RoleType {
    MODERATOR
    LEADER
    MEMBER
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

  type UserLog{
    id: Int!
    user_id: Int!
    action_description: String!
    full_name: String!
    createdAt: DateTime!
  }

  type AdminLog{
    id: Int!
    user_id: Int!
    action_description: String!
    full_name: String!
    createdAt: DateTime!
  }

  type Report{
    id: Int!
    user_id: Int!
    group_id: Int!
    report_reason: String!
    is_resolved: Boolean!
    createdAt: DateTime!
    remarks: String
    date_resolved: DateTime
  }

  type AccessToken{
    access_token: String!
  }

  type KvUser{
    key: Int!
    value: String!
  }

  type MemberAddedResponse{
    users: [UserRole]
    group: Group
    group_roles: [GroupRole]
    user_groups: [UserGroup]
    usergroup_roles: [UserGroupRole]
    blame: User
  }

  type UserRole{
    user: User
    role: GroupRole
  }

  type MemberRemovedResponse{
    user: User
    group: Group
    blame: User
  }
  type GroupCreatedResponse{
    group: Group
    blame: User
  }

  type CurrentUserGroupRoles{
    roles: [String]
  }

  type GroupRolesUpdatedResponse{
    newRoles: [GroupRole]
    group_id: Int
  }

  type IsLoggedInResponse{
    isLogged: Boolean
    currentUser: User
  }

  type SystemStats{
    userCount: Int
    groupCount: Int
    pendingReportCount: Int
    userChatsCount: Int
  }

  type UpdateUserGroupRolesResponse{
    newRoles: [String]
    user: User
    group_id: Int
    roles_ids: [Int]
  }

  type ReportResponse{
    report: Report
    sender: User
    chat_reported: Group
  }

  type RoleMembers{
    role: GroupRole
    members: [User]
  }

  type ReportedChatDetails{
    group_data: Group
    allMembers: [User]
    roleMembers: [RoleMembers]
  }

  input RolesToEdit{
    id: Int
    role_name: String
    role_type: RoleType!
    emoji: String
    description: String
  }

  type Query {
    userChatSender(user_id: Int): User
    user: User
    userChat(id: Int!): UserChat
    group(id: Int!): Group
    userGroup(user_id: Int, group_id: Int): UserGroup
    groupMembers(group_id:Int): [User]
    systemStats: SystemStats 
    users(limit: Int): [User]
    groupList(limit: Int): [Group]
    userChats(receiver:Int): [UserChat]
    groups(user_id: Int): [Group]
    userGroups: [UserGroup]
    userRoles(group_role_id: Int): [User]
    userChatReactions: [UserChatReaction]
    currentUser: User
    isLoggedIn: IsLoggedInResponse
    latestChats: [UserChat]
    userProfile(id: Int!): User
    addMemberList(group_id: Int, form: String): [KvUser]
    userLogs: [UserLog]
    adminLogs: [AdminLog]
    currentUserGroupRoles(group_id:Int): CurrentUserGroupRoles
    otherUser(group_id: Int): User
    groupRolesList(group_id: Int): [GroupRole]
    userGroupRoles(user_id:Int ,group_id:Int): [Int]
    reports: [Report]
    report(report_id: Int): ReportResponse
    reportedChat(group_id: Int!): ReportedChatDetails
  }

  

  type Mutation {
    addUser( username: String, access_level: AccessLevel, password: String, age: Int, address: String, section: String, first_name: String, last_name: String, profile_img: Upload, gender: String): User
    addUserChat( file: Upload, message: String, user_id: Int, receiver: Int, message_type: MessageType): UserChat
    addUserGroup( user_id:Int, group_id: Int): UserGroup
    addGroupRole( role_name: String, emoji: String, description: String, group_id: Int): GroupRole
    addUserGroupRole( user_group_id: Int, group_role_id: Int): UserGroupRole
    addUserChatReaction ( reaction: String, count: Int, userchat_id: Int): UserChatReaction
    login(username: String!, password: String!): AccessToken
    revokeRefreshToken(user_id:Int!) : Boolean
    logout : Boolean
    addMember(group_id: Int!, user_id: [Int!]) : [UserGroup]
    updateGroup(group_name: String, group_id: Int, group_picture: Upload ): Group
    removeMember(group_id: Int, user_id: Int): User
    createGroup(user_id: [Int!]): Group
    updateUserProfile(username: String, age: Int, gender: String, section: String, address: String, profile_img: Upload, new_password: String, current_confirmation: String): User
    updateGroupRoles(roles_to_edit: [RolesToEdit], roles_to_delete: [Int], group_id: Int): [GroupRole]
    updateUserGroupRoles(roles: [String], group_id: Int, user_id: Int, roles_ids: [Int]): UpdateUserGroupRolesResponse
    submitReport(group_id: Int, reasons: [String]): Report
    updateReportStatus(report_status: Boolean, report_id: Int): Report
  }

  

  type Subscription{
    groupCreated (user: Int): GroupCreatedResponse
    groupUpdate(user:Int): Group
    chatAdded(user: Int): UserChat
    memberAdded(user: Int, group_id: Int): MemberAddedResponse
    memberRemoved(user: Int, group_id: Int): MemberRemovedResponse
    groupRolesUpdated(user: Int, group_id: Int): GroupRolesUpdatedResponse
    memberRolesUpdated(user:Int, group_id: Int) : UpdateUserGroupRolesResponse
  }

`

export default typeDefs

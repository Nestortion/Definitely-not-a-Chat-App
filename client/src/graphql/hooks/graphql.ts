/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  Date: any
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any
  /** The `Upload` scalar type represents a file upload. */
  Upload: any
}

export enum AccessLevel {
  Admin = 'ADMIN',
  Moderator = 'MODERATOR',
  User = 'USER',
}

export type AccessToken = {
  __typename?: 'AccessToken'
  access_token: Scalars['String']
}

export type AdminLog = {
  __typename?: 'AdminLog'
  action_description: Scalars['String']
  createdAt: Scalars['DateTime']
  full_name: Scalars['String']
  id: Scalars['Int']
  user_id?: Maybe<Scalars['Int']>
}

export type AdminUserProfileUpdateInput = {
  access_level?: InputMaybe<AccessLevel>
  first_name?: InputMaybe<Scalars['String']>
  last_name?: InputMaybe<Scalars['String']>
  new_password?: InputMaybe<Scalars['String']>
  profile_img?: InputMaybe<Scalars['Upload']>
  section?: InputMaybe<Scalars['String']>
  user_id?: InputMaybe<Scalars['Int']>
  username?: InputMaybe<Scalars['String']>
}

export type CurrentUserGroupRoles = {
  __typename?: 'CurrentUserGroupRoles'
  roles?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type GraphData = {
  __typename?: 'GraphData'
  color?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  value?: Maybe<Scalars['Int']>
}

export type Group = {
  __typename?: 'Group'
  group_name: Scalars['String']
  group_picture: Scalars['String']
  has_threat: Scalars['Boolean']
  id: Scalars['Int']
  is_group: Scalars['String']
}

export type GroupCreatedResponse = {
  __typename?: 'GroupCreatedResponse'
  blame?: Maybe<User>
  group?: Maybe<Group>
}

export type GroupRole = {
  __typename?: 'GroupRole'
  description: Scalars['String']
  emoji: Scalars['String']
  group_id: Scalars['String']
  id: Scalars['Int']
  is_default: Scalars['Boolean']
  role_name: Scalars['String']
  role_type: RoleType
}

export type GroupRolesUpdatedResponse = {
  __typename?: 'GroupRolesUpdatedResponse'
  group_id?: Maybe<Scalars['Int']>
  newRoles?: Maybe<Array<Maybe<GroupRole>>>
}

export type IsLoggedInResponse = {
  __typename?: 'IsLoggedInResponse'
  currentUser?: Maybe<User>
  isLogged?: Maybe<Scalars['Boolean']>
}

export type KvUser = {
  __typename?: 'KvUser'
  key: Scalars['Int']
  value: Scalars['String']
}

export type MemberAddedResponse = {
  __typename?: 'MemberAddedResponse'
  blame?: Maybe<User>
  group?: Maybe<Group>
  group_roles?: Maybe<Array<Maybe<GroupRole>>>
  user_groups?: Maybe<Array<Maybe<UserGroup>>>
  usergroup_roles?: Maybe<Array<Maybe<UserGroupRole>>>
  users?: Maybe<Array<Maybe<UserRole>>>
}

export type MemberRemovedResponse = {
  __typename?: 'MemberRemovedResponse'
  blame?: Maybe<User>
  group?: Maybe<Group>
  user?: Maybe<User>
}

export enum MessageType {
  Image = 'IMAGE',
  Other = 'OTHER',
  Text = 'TEXT',
}

export type Mutation = {
  __typename?: 'Mutation'
  addGroupRole?: Maybe<GroupRole>
  addMember?: Maybe<Array<Maybe<UserGroup>>>
  addUser?: Maybe<RegisterResponse>
  addUserChat?: Maybe<UserChat>
  addUserChatReaction?: Maybe<UserChatReaction>
  addUserGroup?: Maybe<UserGroup>
  addUserGroupRole?: Maybe<UserGroupRole>
  adminUpdateUserProfile?: Maybe<User>
  clearChatThreat?: Maybe<Scalars['Boolean']>
  createGroup?: Maybe<Group>
  createSection?: Maybe<Section>
  login?: Maybe<AccessToken>
  logout?: Maybe<Scalars['Boolean']>
  removeMember?: Maybe<User>
  revokeRefreshToken?: Maybe<Scalars['Boolean']>
  submitReport?: Maybe<Report>
  toggleSectionStatus?: Maybe<Section>
  toggleUserStatus?: Maybe<Scalars['Boolean']>
  updateGroup?: Maybe<Group>
  updateGroupRoles?: Maybe<Array<Maybe<GroupRole>>>
  updateReportStatus?: Maybe<Report>
  updateSection?: Maybe<Section>
  updateUserGroupRoles?: Maybe<UpdateUserGroupRolesResponse>
  updateUserProfile?: Maybe<User>
}

export type MutationAddGroupRoleArgs = {
  description?: InputMaybe<Scalars['String']>
  emoji?: InputMaybe<Scalars['String']>
  group_id?: InputMaybe<Scalars['Int']>
  role_name?: InputMaybe<Scalars['String']>
}

export type MutationAddMemberArgs = {
  group_id: Scalars['Int']
  user_id?: InputMaybe<Array<Scalars['Int']>>
}

export type MutationAddUserArgs = {
  user_data?: InputMaybe<RegisterInput>
}

export type MutationAddUserChatArgs = {
  file?: InputMaybe<Scalars['Upload']>
  message?: InputMaybe<Scalars['String']>
  message_type?: InputMaybe<MessageType>
  receiver?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
}

export type MutationAddUserChatReactionArgs = {
  count?: InputMaybe<Scalars['Int']>
  reaction?: InputMaybe<Scalars['String']>
  userchat_id?: InputMaybe<Scalars['Int']>
}

export type MutationAddUserGroupArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
}

export type MutationAddUserGroupRoleArgs = {
  group_role_id?: InputMaybe<Scalars['Int']>
  user_group_id?: InputMaybe<Scalars['Int']>
}

export type MutationAdminUpdateUserProfileArgs = {
  userData?: InputMaybe<AdminUserProfileUpdateInput>
}

export type MutationClearChatThreatArgs = {
  group_id?: InputMaybe<Scalars['Int']>
}

export type MutationCreateGroupArgs = {
  user_id?: InputMaybe<Array<Scalars['Int']>>
}

export type MutationCreateSectionArgs = {
  section_name: Scalars['String']
}

export type MutationLoginArgs = {
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationRemoveMemberArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
}

export type MutationRevokeRefreshTokenArgs = {
  user_id: Scalars['Int']
}

export type MutationSubmitReportArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  reasons?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
}

export type MutationToggleSectionStatusArgs = {
  section_id?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<Scalars['Boolean']>
}

export type MutationToggleUserStatusArgs = {
  user_id?: InputMaybe<Scalars['Int']>
  user_status?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateGroupArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  group_name?: InputMaybe<Scalars['String']>
  group_picture?: InputMaybe<Scalars['Upload']>
}

export type MutationUpdateGroupRolesArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  roles_to_delete?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  roles_to_edit?: InputMaybe<Array<InputMaybe<RolesToEdit>>>
}

export type MutationUpdateReportStatusArgs = {
  report_id?: InputMaybe<Scalars['Int']>
  report_status?: InputMaybe<Scalars['Boolean']>
}

export type MutationUpdateSectionArgs = {
  section_id?: InputMaybe<Scalars['Int']>
  section_name: Scalars['String']
}

export type MutationUpdateUserGroupRolesArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  roles?: InputMaybe<Array<InputMaybe<Scalars['String']>>>
  roles_ids?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>
  user_id?: InputMaybe<Scalars['Int']>
}

export type MutationUpdateUserProfileArgs = {
  address?: InputMaybe<Scalars['String']>
  birthdate?: InputMaybe<Scalars['Date']>
  current_confirmation?: InputMaybe<Scalars['String']>
  gender?: InputMaybe<Scalars['String']>
  new_password?: InputMaybe<Scalars['String']>
  profile_img?: InputMaybe<Scalars['Upload']>
  section_id?: InputMaybe<Scalars['Int']>
  username?: InputMaybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  addMemberList?: Maybe<Array<Maybe<KvUser>>>
  adminLogs?: Maybe<Array<Maybe<AdminLog>>>
  currentUser?: Maybe<User>
  currentUserGroupRoles?: Maybe<CurrentUserGroupRoles>
  graphData?: Maybe<Array<Maybe<GraphData>>>
  group?: Maybe<Group>
  groupList?: Maybe<Array<Maybe<Group>>>
  groupMembers?: Maybe<Array<Maybe<User>>>
  groupRolesList?: Maybe<Array<Maybe<GroupRole>>>
  groups?: Maybe<Array<Maybe<Group>>>
  isLoggedIn?: Maybe<IsLoggedInResponse>
  latestChats?: Maybe<Array<Maybe<UserChat>>>
  otherUser?: Maybe<User>
  report?: Maybe<ReportResponse>
  reportedChat?: Maybe<ReportedChatDetails>
  reports?: Maybe<Array<Maybe<Report>>>
  sections?: Maybe<Array<Maybe<Section>>>
  systemStats?: Maybe<SystemStats>
  user?: Maybe<User>
  userChat?: Maybe<UserChat>
  userChatReactions?: Maybe<Array<Maybe<UserChatReaction>>>
  userChatSender?: Maybe<User>
  userChats?: Maybe<Array<Maybe<UserChat>>>
  userGroup?: Maybe<UserGroup>
  userGroupRoles?: Maybe<Array<Maybe<Scalars['Int']>>>
  userGroups?: Maybe<Array<Maybe<UserGroup>>>
  userLogs?: Maybe<Array<Maybe<UserLog>>>
  userProfile?: Maybe<User>
  userRoles?: Maybe<Array<Maybe<User>>>
  users?: Maybe<Array<Maybe<User>>>
}

export type QueryAddMemberListArgs = {
  form?: InputMaybe<Scalars['String']>
  group_id?: InputMaybe<Scalars['Int']>
}

export type QueryAdminLogsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryCurrentUserGroupRolesArgs = {
  group_id?: InputMaybe<Scalars['Int']>
}

export type QueryGroupArgs = {
  id: Scalars['Int']
}

export type QueryGroupListArgs = {
  limit?: InputMaybe<Scalars['Int']>
}

export type QueryGroupMembersArgs = {
  group_id?: InputMaybe<Scalars['Int']>
}

export type QueryGroupRolesListArgs = {
  group_id?: InputMaybe<Scalars['Int']>
}

export type QueryGroupsArgs = {
  user_id?: InputMaybe<Scalars['Int']>
}

export type QueryOtherUserArgs = {
  group_id?: InputMaybe<Scalars['Int']>
}

export type QueryReportArgs = {
  report_id?: InputMaybe<Scalars['Int']>
}

export type QueryReportedChatArgs = {
  group_id: Scalars['Int']
}

export type QueryUserChatArgs = {
  id: Scalars['Int']
}

export type QueryUserChatSenderArgs = {
  user_id?: InputMaybe<Scalars['Int']>
}

export type QueryUserChatsArgs = {
  receiver?: InputMaybe<Scalars['Int']>
}

export type QueryUserGroupArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
}

export type QueryUserGroupRolesArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
}

export type QueryUserLogsArgs = {
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}

export type QueryUserProfileArgs = {
  id: Scalars['Int']
}

export type QueryUserRolesArgs = {
  group_role_id?: InputMaybe<Scalars['Int']>
}

export type QueryUsersArgs = {
  limit?: InputMaybe<Scalars['Int']>
}

export type RegisterInput = {
  access_level?: InputMaybe<AccessLevel>
  address?: InputMaybe<Scalars['String']>
  birthdate: Scalars['Date']
  first_name?: InputMaybe<Scalars['String']>
  gender?: InputMaybe<Scalars['String']>
  last_name?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  section_id?: InputMaybe<Scalars['Int']>
  username?: InputMaybe<Scalars['String']>
}

export type RegisterResponse = {
  __typename?: 'RegisterResponse'
  registered?: Maybe<Scalars['Boolean']>
  username?: Maybe<Scalars['String']>
}

export type Report = {
  __typename?: 'Report'
  createdAt: Scalars['DateTime']
  date_resolved?: Maybe<Scalars['DateTime']>
  group_id: Scalars['Int']
  id: Scalars['Int']
  is_resolved: Scalars['Boolean']
  remarks?: Maybe<Scalars['String']>
  report_reason: Scalars['String']
  user_id: Scalars['Int']
}

export type ReportResponse = {
  __typename?: 'ReportResponse'
  chat_reported?: Maybe<Group>
  report?: Maybe<Report>
  sender?: Maybe<User>
}

export type ReportedChatDetails = {
  __typename?: 'ReportedChatDetails'
  allMembers?: Maybe<Array<Maybe<User>>>
  chat_messages?: Maybe<Array<Maybe<UserChat>>>
  group_data?: Maybe<Group>
  roleMembers?: Maybe<Array<Maybe<RoleMembers>>>
}

export type RoleMembers = {
  __typename?: 'RoleMembers'
  members?: Maybe<Array<Maybe<User>>>
  role?: Maybe<GroupRole>
}

export enum RoleType {
  Leader = 'LEADER',
  Member = 'MEMBER',
  Moderator = 'MODERATOR',
}

export type RolesToEdit = {
  description?: InputMaybe<Scalars['String']>
  emoji?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['Int']>
  role_name?: InputMaybe<Scalars['String']>
  role_type: RoleType
}

export type Section = {
  __typename?: 'Section'
  disabled: Scalars['Boolean']
  id: Scalars['Int']
  section_name: Scalars['String']
}

export type Subscription = {
  __typename?: 'Subscription'
  chatAdded?: Maybe<UserChat>
  groupCreated?: Maybe<GroupCreatedResponse>
  groupRolesUpdated?: Maybe<GroupRolesUpdatedResponse>
  groupUpdate?: Maybe<Group>
  memberAdded?: Maybe<MemberAddedResponse>
  memberRemoved?: Maybe<MemberRemovedResponse>
  memberRolesUpdated?: Maybe<UpdateUserGroupRolesResponse>
}

export type SubscriptionChatAddedArgs = {
  user?: InputMaybe<Scalars['Int']>
}

export type SubscriptionGroupCreatedArgs = {
  user?: InputMaybe<Scalars['Int']>
}

export type SubscriptionGroupRolesUpdatedArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user?: InputMaybe<Scalars['Int']>
}

export type SubscriptionGroupUpdateArgs = {
  user?: InputMaybe<Scalars['Int']>
}

export type SubscriptionMemberAddedArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user?: InputMaybe<Scalars['Int']>
}

export type SubscriptionMemberRemovedArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user?: InputMaybe<Scalars['Int']>
}

export type SubscriptionMemberRolesUpdatedArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user?: InputMaybe<Scalars['Int']>
}

export type SystemStats = {
  __typename?: 'SystemStats'
  groupCount?: Maybe<Scalars['Int']>
  latestAdminLog?: Maybe<AdminLog>
  pendingReportCount?: Maybe<Scalars['Int']>
  userChatsCount?: Maybe<Scalars['Int']>
  userCount?: Maybe<Scalars['Int']>
}

export type UpdateUserGroupRolesResponse = {
  __typename?: 'UpdateUserGroupRolesResponse'
  group_id?: Maybe<Scalars['Int']>
  newRoles?: Maybe<Array<Maybe<Scalars['String']>>>
  roles_ids?: Maybe<Array<Maybe<Scalars['Int']>>>
  user?: Maybe<User>
}

export type User = {
  __typename?: 'User'
  access_level: AccessLevel
  address: Scalars['String']
  age: Scalars['Int']
  birthdate: Scalars['Date']
  disabled: Scalars['Boolean']
  first_name: Scalars['String']
  gender: Scalars['String']
  id: Scalars['Int']
  last_name: Scalars['String']
  password: Scalars['String']
  profile_img: Scalars['String']
  section: Section
  token_version: Scalars['String']
  username: Scalars['String']
}

export type UserChat = {
  __typename?: 'UserChat'
  createdAt: Scalars['DateTime']
  id: Scalars['Int']
  message: Scalars['String']
  message_type: MessageType
  receiver?: Maybe<Scalars['Int']>
  senderImage: Scalars['String']
  user_id: Scalars['Int']
}

export type UserChatReaction = {
  __typename?: 'UserChatReaction'
  count: Scalars['Int']
  reaction: Scalars['String']
  userchat_id: Scalars['Int']
}

export type UserGroup = {
  __typename?: 'UserGroup'
  group_id: Scalars['Int']
  user_id: Scalars['Int']
}

export type UserGroupRole = {
  __typename?: 'UserGroupRole'
  group_role_id: Scalars['Int']
  user_group_id: Scalars['Int']
}

export type UserLog = {
  __typename?: 'UserLog'
  action_description: Scalars['String']
  createdAt: Scalars['DateTime']
  full_name: Scalars['String']
  id: Scalars['Int']
  section?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['Int']>
}

export type UserRole = {
  __typename?: 'UserRole'
  role?: Maybe<GroupRole>
  user?: Maybe<User>
}

export type AddGroupRoleMutationVariables = Exact<{
  roleName?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  emoji?: InputMaybe<Scalars['String']>
  groupId?: InputMaybe<Scalars['Int']>
}>

export type AddGroupRoleMutation = {
  __typename?: 'Mutation'
  addGroupRole?: {
    __typename?: 'GroupRole'
    role_name: string
    emoji: string
    description: string
    group_id: string
  } | null
}

export type AddMemberListQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
  form?: InputMaybe<Scalars['String']>
}>

export type AddMemberListQuery = {
  __typename?: 'Query'
  addMemberList?: Array<{
    __typename?: 'KvUser'
    key: number
    value: string
  } | null> | null
}

export type AddMemberMutationVariables = Exact<{
  groupId: Scalars['Int']
  userId?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
}>

export type AddMemberMutation = {
  __typename?: 'Mutation'
  addMember?: Array<{
    __typename?: 'UserGroup'
    group_id: number
    user_id: number
  } | null> | null
}

export type AddUserMutationVariables = Exact<{
  userData?: InputMaybe<RegisterInput>
}>

export type AddUserMutation = {
  __typename?: 'Mutation'
  addUser?: {
    __typename?: 'RegisterResponse'
    registered?: boolean | null
    username?: string | null
  } | null
}

export type AddUserChatMutationVariables = Exact<{
  file?: InputMaybe<Scalars['Upload']>
  message?: InputMaybe<Scalars['String']>
  userId?: InputMaybe<Scalars['Int']>
  receiver?: InputMaybe<Scalars['Int']>
}>

export type AddUserChatMutation = {
  __typename?: 'Mutation'
  addUserChat?: {
    __typename?: 'UserChat'
    message: string
    id: number
    message_type: MessageType
    receiver?: number | null
    user_id: number
  } | null
}

export type AddUserChatReactionMutationVariables = Exact<{
  reaction?: InputMaybe<Scalars['String']>
  count?: InputMaybe<Scalars['Int']>
  userchatId?: InputMaybe<Scalars['Int']>
}>

export type AddUserChatReactionMutation = {
  __typename?: 'Mutation'
  addUserChatReaction?: {
    __typename?: 'UserChatReaction'
    reaction: string
    count: number
    userchat_id: number
  } | null
}

export type AddUserGroupRoleMutationVariables = Exact<{
  userGroupId?: InputMaybe<Scalars['Int']>
  groupRoleId?: InputMaybe<Scalars['Int']>
}>

export type AddUserGroupRoleMutation = {
  __typename?: 'Mutation'
  addUserGroupRole?: {
    __typename?: 'UserGroupRole'
    group_role_id: number
    user_group_id: number
  } | null
}

export type AdminLogsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}>

export type AdminLogsQuery = {
  __typename?: 'Query'
  adminLogs?: Array<{
    __typename?: 'AdminLog'
    id: number
    user_id?: number | null
    action_description: string
    full_name: string
    createdAt: any
  } | null> | null
}

export type AdminUpdateUserProfileMutationVariables = Exact<{
  userData?: InputMaybe<AdminUserProfileUpdateInput>
}>

export type AdminUpdateUserProfileMutation = {
  __typename?: 'Mutation'
  adminUpdateUserProfile?: {
    __typename?: 'User'
    id: number
    username: string
    access_level: AccessLevel
    last_name: string
    first_name: string
    profile_img: string
  } | null
}

export type ChatAddedSubscriptionVariables = Exact<{
  user?: InputMaybe<Scalars['Int']>
}>

export type ChatAddedSubscription = {
  __typename?: 'Subscription'
  chatAdded?: {
    __typename?: 'UserChat'
    id: number
    message: string
    user_id: number
    receiver?: number | null
    message_type: MessageType
    createdAt: any
  } | null
}

export type ClearChatThreatMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
}>

export type ClearChatThreatMutation = {
  __typename?: 'Mutation'
  clearChatThreat?: boolean | null
}

export type CreateGroupMutationVariables = Exact<{
  userId?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>
}>

export type CreateGroupMutation = {
  __typename?: 'Mutation'
  createGroup?: {
    __typename?: 'Group'
    group_name: string
    group_picture: string
    id: number
    is_group: string
  } | null
}

export type CreateSectionMutationVariables = Exact<{
  sectionName: Scalars['String']
}>

export type CreateSectionMutation = {
  __typename?: 'Mutation'
  createSection?: {
    __typename?: 'Section'
    id: number
    section_name: string
    disabled: boolean
  } | null
}

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>

export type CurrentUserQuery = {
  __typename?: 'Query'
  currentUser?: {
    __typename?: 'User'
    id: number
    username: string
    access_level: AccessLevel
    password: string
    token_version: string
    first_name: string
    last_name: string
    address: string
    profile_img: string
    age: number
    gender: string
    birthdate: any
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null
}

export type CurrentUserGroupRolesQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
}>

export type CurrentUserGroupRolesQuery = {
  __typename?: 'Query'
  currentUserGroupRoles?: {
    __typename?: 'CurrentUserGroupRoles'
    roles?: Array<string | null> | null
  } | null
}

export type GraphDataQueryVariables = Exact<{ [key: string]: never }>

export type GraphDataQuery = {
  __typename?: 'Query'
  graphData?: Array<{
    __typename?: 'GraphData'
    title?: string | null
    value?: number | null
    color?: string | null
  } | null> | null
}

export type GroupQueryVariables = Exact<{
  groupId: Scalars['Int']
}>

export type GroupQuery = {
  __typename?: 'Query'
  group?: {
    __typename?: 'Group'
    id: number
    group_name: string
    group_picture: string
    is_group: string
  } | null
}

export type GroupCreatedSubscriptionVariables = Exact<{
  user?: InputMaybe<Scalars['Int']>
}>

export type GroupCreatedSubscription = {
  __typename?: 'Subscription'
  groupCreated?: {
    __typename?: 'GroupCreatedResponse'
    blame?: { __typename?: 'User'; id: number } | null
    group?: {
      __typename?: 'Group'
      group_name: string
      group_picture: string
      id: number
      is_group: string
    } | null
  } | null
}

export type GroupListQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>
}>

export type GroupListQuery = {
  __typename?: 'Query'
  groupList?: Array<{
    __typename?: 'Group'
    id: number
    group_name: string
    group_picture: string
    is_group: string
  } | null> | null
}

export type GroupMembersQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
}>

export type GroupMembersQuery = {
  __typename?: 'Query'
  groupMembers?: Array<{
    __typename?: 'User'
    id: number
    username: string
    first_name: string
    address: string
    last_name: string
    profile_img: string
    age: number
    gender: string
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null> | null
}

export type GroupRolesListQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
}>

export type GroupRolesListQuery = {
  __typename?: 'Query'
  groupRolesList?: Array<{
    __typename?: 'GroupRole'
    id: number
    role_name: string
    emoji: string
    description: string
    group_id: string
    role_type: RoleType
    is_default: boolean
  } | null> | null
}

export type GroupRolesUpdatedSubscriptionVariables = Exact<{
  user?: InputMaybe<Scalars['Int']>
  groupId?: InputMaybe<Scalars['Int']>
}>

export type GroupRolesUpdatedSubscription = {
  __typename?: 'Subscription'
  groupRolesUpdated?: {
    __typename?: 'GroupRolesUpdatedResponse'
    group_id?: number | null
    newRoles?: Array<{
      __typename?: 'GroupRole'
      id: number
      role_name: string
      emoji: string
      description: string
      group_id: string
      role_type: RoleType
      is_default: boolean
    } | null> | null
  } | null
}

export type GroupUpdateSubscriptionVariables = Exact<{
  user?: InputMaybe<Scalars['Int']>
}>

export type GroupUpdateSubscription = {
  __typename?: 'Subscription'
  groupUpdate?: {
    __typename?: 'Group'
    id: number
    group_name: string
    group_picture: string
    is_group: string
  } | null
}

export type GroupsQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>
}>

export type GroupsQuery = {
  __typename?: 'Query'
  groups?: Array<{
    __typename?: 'Group'
    group_name: string
    id: number
    group_picture: string
    is_group: string
  } | null> | null
}

export type IsLoggedInQueryVariables = Exact<{ [key: string]: never }>

export type IsLoggedInQuery = {
  __typename?: 'Query'
  isLoggedIn?: {
    __typename?: 'IsLoggedInResponse'
    isLogged?: boolean | null
    currentUser?: {
      __typename?: 'User'
      id: number
      username: string
      access_level: AccessLevel
    } | null
  } | null
}

export type LatestChatsQueryVariables = Exact<{ [key: string]: never }>

export type LatestChatsQuery = {
  __typename?: 'Query'
  latestChats?: Array<{
    __typename?: 'UserChat'
    id: number
    message: string
    user_id: number
    receiver?: number | null
    message_type: MessageType
    createdAt: any
  } | null> | null
}

export type LoginMutationVariables = Exact<{
  username: Scalars['String']
  password: Scalars['String']
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: { __typename?: 'AccessToken'; access_token: string } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = {
  __typename?: 'Mutation'
  logout?: boolean | null
}

export type MemberAddedSubscriptionVariables = Exact<{
  user?: InputMaybe<Scalars['Int']>
  groupId?: InputMaybe<Scalars['Int']>
}>

export type MemberAddedSubscription = {
  __typename?: 'Subscription'
  memberAdded?: {
    __typename?: 'MemberAddedResponse'
    blame?: { __typename?: 'User'; id: number } | null
    users?: Array<{
      __typename?: 'UserRole'
      role?: {
        __typename?: 'GroupRole'
        id: number
        group_id: string
        role_name: string
        role_type: RoleType
      } | null
      user?: {
        __typename?: 'User'
        age: number
        first_name: string
        id: number
        last_name: string
        profile_img: string
        username: string
        section: {
          __typename?: 'Section'
          id: number
          section_name: string
          disabled: boolean
        }
      } | null
    } | null> | null
    group?: {
      __typename?: 'Group'
      id: number
      group_name: string
      group_picture: string
      is_group: string
    } | null
    group_roles?: Array<{
      __typename?: 'GroupRole'
      id: number
      role_name: string
      group_id: string
      role_type: RoleType
    } | null> | null
    usergroup_roles?: Array<{
      __typename?: 'UserGroupRole'
      user_group_id: number
      group_role_id: number
    } | null> | null
    user_groups?: Array<{
      __typename?: 'UserGroup'
      user_id: number
      group_id: number
    } | null> | null
  } | null
}

export type MemberRemovedSubscriptionVariables = Exact<{
  user?: InputMaybe<Scalars['Int']>
  groupId?: InputMaybe<Scalars['Int']>
}>

export type MemberRemovedSubscription = {
  __typename?: 'Subscription'
  memberRemoved?: {
    __typename?: 'MemberRemovedResponse'
    blame?: { __typename?: 'User'; id: number } | null
    group?: {
      __typename?: 'Group'
      group_name: string
      group_picture: string
      id: number
      is_group: string
    } | null
    user?: {
      __typename?: 'User'
      first_name: string
      id: number
      last_name: string
      profile_img: string
      username: string
      section: {
        __typename?: 'Section'
        id: number
        section_name: string
        disabled: boolean
      }
    } | null
  } | null
}

export type MemberRolesUpdatedSubscriptionVariables = Exact<{
  user?: InputMaybe<Scalars['Int']>
  groupId?: InputMaybe<Scalars['Int']>
}>

export type MemberRolesUpdatedSubscription = {
  __typename?: 'Subscription'
  memberRolesUpdated?: {
    __typename?: 'UpdateUserGroupRolesResponse'
    newRoles?: Array<string | null> | null
    group_id?: number | null
    roles_ids?: Array<number | null> | null
    user?: {
      __typename?: 'User'
      id: number
      username: string
      first_name: string
      last_name: string
      profile_img: string
    } | null
  } | null
}

export type OtherUserQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
}>

export type OtherUserQuery = {
  __typename?: 'Query'
  otherUser?: {
    __typename?: 'User'
    id: number
    first_name: string
    last_name: string
    address: string
    profile_img: string
    age: number
    gender: string
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null
}

export type RemoveMemberMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
  userId?: InputMaybe<Scalars['Int']>
}>

export type RemoveMemberMutation = {
  __typename?: 'Mutation'
  removeMember?: {
    __typename?: 'User'
    id: number
    first_name: string
    last_name: string
    profile_img: string
    age: number
    gender: string
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null
}

export type ReportQueryVariables = Exact<{
  reportId?: InputMaybe<Scalars['Int']>
}>

export type ReportQuery = {
  __typename?: 'Query'
  report?: {
    __typename?: 'ReportResponse'
    report?: {
      __typename?: 'Report'
      id: number
      user_id: number
      group_id: number
      report_reason: string
      is_resolved: boolean
      createdAt: any
      remarks?: string | null
      date_resolved?: any | null
    } | null
    sender?: {
      __typename?: 'User'
      id: number
      username: string
      first_name: string
      last_name: string
      profile_img: string
      section: {
        __typename?: 'Section'
        id: number
        section_name: string
        disabled: boolean
      }
    } | null
    chat_reported?: {
      __typename?: 'Group'
      id: number
      group_picture: string
      group_name: string
      is_group: string
    } | null
  } | null
}

export type ReportedChatQueryVariables = Exact<{
  groupId: Scalars['Int']
}>

export type ReportedChatQuery = {
  __typename?: 'Query'
  reportedChat?: {
    __typename?: 'ReportedChatDetails'
    group_data?: {
      __typename?: 'Group'
      id: number
      group_name: string
      group_picture: string
      is_group: string
      has_threat: boolean
    } | null
    allMembers?: Array<{
      __typename?: 'User'
      id: number
      username: string
      first_name: string
      last_name: string
      profile_img: string
    } | null> | null
    roleMembers?: Array<{
      __typename?: 'RoleMembers'
      role?: {
        __typename?: 'GroupRole'
        id: number
        role_name: string
        group_id: string
        role_type: RoleType
        is_default: boolean
      } | null
      members?: Array<{
        __typename?: 'User'
        id: number
        username: string
        first_name: string
        last_name: string
        profile_img: string
      } | null> | null
    } | null> | null
    chat_messages?: Array<{
      __typename?: 'UserChat'
      id: number
      message: string
      user_id: number
      receiver?: number | null
      message_type: MessageType
      createdAt: any
      senderImage: string
    } | null> | null
  } | null
}

export type ReportsQueryVariables = Exact<{ [key: string]: never }>

export type ReportsQuery = {
  __typename?: 'Query'
  reports?: Array<{
    __typename?: 'Report'
    id: number
    user_id: number
    group_id: number
    report_reason: string
    is_resolved: boolean
    createdAt: any
  } | null> | null
}

export type SectionsQueryVariables = Exact<{ [key: string]: never }>

export type SectionsQuery = {
  __typename?: 'Query'
  sections?: Array<{
    __typename?: 'Section'
    id: number
    section_name: string
    disabled: boolean
  } | null> | null
}

export type SubmitReportMutationVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
  reasons?: InputMaybe<
    Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>
  >
}>

export type SubmitReportMutation = {
  __typename?: 'Mutation'
  submitReport?: {
    __typename?: 'Report'
    id: number
    user_id: number
    group_id: number
    report_reason: string
    is_resolved: boolean
    createdAt: any
  } | null
}

export type SystemStatsQueryVariables = Exact<{ [key: string]: never }>

export type SystemStatsQuery = {
  __typename?: 'Query'
  systemStats?: {
    __typename?: 'SystemStats'
    userCount?: number | null
    groupCount?: number | null
    pendingReportCount?: number | null
    userChatsCount?: number | null
    latestAdminLog?: {
      __typename?: 'AdminLog'
      id: number
      user_id?: number | null
      action_description: string
      full_name: string
      createdAt: any
    } | null
  } | null
}

export type ToggleSectionStatusMutationVariables = Exact<{
  sectionId?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<Scalars['Boolean']>
}>

export type ToggleSectionStatusMutation = {
  __typename?: 'Mutation'
  toggleSectionStatus?: {
    __typename?: 'Section'
    id: number
    section_name: string
    disabled: boolean
  } | null
}

export type ToggleUserStatusMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>
  userStatus?: InputMaybe<Scalars['Boolean']>
}>

export type ToggleUserStatusMutation = {
  __typename?: 'Mutation'
  toggleUserStatus?: boolean | null
}

export type UpdateGroupMutationVariables = Exact<{
  groupName?: InputMaybe<Scalars['String']>
  groupId?: InputMaybe<Scalars['Int']>
  groupPicture?: InputMaybe<Scalars['Upload']>
}>

export type UpdateGroupMutation = {
  __typename?: 'Mutation'
  updateGroup?: {
    __typename?: 'Group'
    group_name: string
    group_picture: string
    id: number
    is_group: string
  } | null
}

export type UpdateGroupRolesMutationVariables = Exact<{
  rolesToEdit?: InputMaybe<
    Array<InputMaybe<RolesToEdit>> | InputMaybe<RolesToEdit>
  >
  rolesToDelete?: InputMaybe<
    Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>
  >
  groupId?: InputMaybe<Scalars['Int']>
}>

export type UpdateGroupRolesMutation = {
  __typename?: 'Mutation'
  updateGroupRoles?: Array<{
    __typename?: 'GroupRole'
    id: number
    role_name: string
    emoji: string
    description: string
    group_id: string
    role_type: RoleType
    is_default: boolean
  } | null> | null
}

export type UpdateReportStatusMutationVariables = Exact<{
  reportStatus?: InputMaybe<Scalars['Boolean']>
  reportId?: InputMaybe<Scalars['Int']>
}>

export type UpdateReportStatusMutation = {
  __typename?: 'Mutation'
  updateReportStatus?: {
    __typename?: 'Report'
    id: number
    user_id: number
    report_reason: string
    group_id: number
    is_resolved: boolean
    remarks?: string | null
    createdAt: any
    date_resolved?: any | null
  } | null
}

export type UpdateSectionMutationVariables = Exact<{
  sectionId?: InputMaybe<Scalars['Int']>
  sectionName: Scalars['String']
}>

export type UpdateSectionMutation = {
  __typename?: 'Mutation'
  updateSection?: {
    __typename?: 'Section'
    id: number
    section_name: string
    disabled: boolean
  } | null
}

export type UpdateUserGroupRolesMutationVariables = Exact<{
  roles?: InputMaybe<
    Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>
  >
  groupId?: InputMaybe<Scalars['Int']>
  userId?: InputMaybe<Scalars['Int']>
  rolesIds?: InputMaybe<
    Array<InputMaybe<Scalars['Int']>> | InputMaybe<Scalars['Int']>
  >
}>

export type UpdateUserGroupRolesMutation = {
  __typename?: 'Mutation'
  updateUserGroupRoles?: {
    __typename?: 'UpdateUserGroupRolesResponse'
    newRoles?: Array<string | null> | null
    user?: {
      __typename?: 'User'
      id: number
      username: string
      first_name: string
      last_name: string
      profile_img: string
    } | null
  } | null
}

export type UpdateUserProfileMutationVariables = Exact<{
  username?: InputMaybe<Scalars['String']>
  gender?: InputMaybe<Scalars['String']>
  sectionId?: InputMaybe<Scalars['Int']>
  profileImg?: InputMaybe<Scalars['Upload']>
  address?: InputMaybe<Scalars['String']>
  newPassword?: InputMaybe<Scalars['String']>
  currentConfirmation?: InputMaybe<Scalars['String']>
  birthdate?: InputMaybe<Scalars['Date']>
}>

export type UpdateUserProfileMutation = {
  __typename?: 'Mutation'
  updateUserProfile?: {
    __typename?: 'User'
    username: string
    first_name: string
    last_name: string
    address: string
    profile_img: string
    age: number
    gender: string
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null
}

export type UserQueryVariables = Exact<{ [key: string]: never }>

export type UserQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    id: number
    username: string
    access_level: AccessLevel
    password: string
    token_version: string
    first_name: string
    last_name: string
    address: string
    profile_img: string
    age: number
    gender: string
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null
}

export type UserChatSenderQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>
}>

export type UserChatSenderQuery = {
  __typename?: 'Query'
  userChatSender?: {
    __typename?: 'User'
    first_name: string
    last_name: string
    username: string
    profile_img: string
    id: number
  } | null
}

export type UserChatsQueryVariables = Exact<{ [key: string]: never }>

export type UserChatsQuery = {
  __typename?: 'Query'
  userChats?: Array<{
    __typename?: 'UserChat'
    id: number
    message: string
    user_id: number
    receiver?: number | null
    message_type: MessageType
    createdAt: any
  } | null> | null
}

export type UserGroupRolesQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['Int']>
  groupId?: InputMaybe<Scalars['Int']>
}>

export type UserGroupRolesQuery = {
  __typename?: 'Query'
  userGroupRoles?: Array<number | null> | null
}

export type UserLogsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>
  offset?: InputMaybe<Scalars['Int']>
}>

export type UserLogsQuery = {
  __typename?: 'Query'
  userLogs?: Array<{
    __typename?: 'UserLog'
    id: number
    user_id?: number | null
    action_description: string
    full_name: string
    createdAt: any
    section?: string | null
  } | null> | null
}

export type UserProfileQueryVariables = Exact<{
  userProfileId: Scalars['Int']
}>

export type UserProfileQuery = {
  __typename?: 'Query'
  userProfile?: {
    __typename?: 'User'
    id: number
    address: string
    age: number
    first_name: string
    gender: string
    last_name: string
    profile_img: string
    disabled: boolean
    username: string
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null
}

export type UserRolesQueryVariables = Exact<{
  groupRoleId?: InputMaybe<Scalars['Int']>
}>

export type UserRolesQuery = {
  __typename?: 'Query'
  userRoles?: Array<{
    __typename?: 'User'
    first_name: string
    id: number
    last_name: string
    profile_img: string
  } | null> | null
}

export type UsersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>
}>

export type UsersQuery = {
  __typename?: 'Query'
  users?: Array<{
    __typename?: 'User'
    id: number
    first_name: string
    last_name: string
    address: string
    profile_img: string
    age: number
    gender: string
    username: string
    access_level: AccessLevel
    section: {
      __typename?: 'Section'
      id: number
      section_name: string
      disabled: boolean
    }
  } | null> | null
}

export const AddGroupRoleDocument = gql`
  mutation AddGroupRole(
    $roleName: String
    $description: String
    $emoji: String
    $groupId: Int
  ) {
    addGroupRole(
      role_name: $roleName
      description: $description
      emoji: $emoji
      group_id: $groupId
    ) {
      role_name
      emoji
      description
      group_id
    }
  }
`
export type AddGroupRoleMutationFn = Apollo.MutationFunction<
  AddGroupRoleMutation,
  AddGroupRoleMutationVariables
>

/**
 * __useAddGroupRoleMutation__
 *
 * To run a mutation, you first call `useAddGroupRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGroupRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGroupRoleMutation, { data, loading, error }] = useAddGroupRoleMutation({
 *   variables: {
 *      roleName: // value for 'roleName'
 *      description: // value for 'description'
 *      emoji: // value for 'emoji'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useAddGroupRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddGroupRoleMutation,
    AddGroupRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddGroupRoleMutation,
    AddGroupRoleMutationVariables
  >(AddGroupRoleDocument, options)
}
export type AddGroupRoleMutationHookResult = ReturnType<
  typeof useAddGroupRoleMutation
>
export type AddGroupRoleMutationResult =
  Apollo.MutationResult<AddGroupRoleMutation>
export type AddGroupRoleMutationOptions = Apollo.BaseMutationOptions<
  AddGroupRoleMutation,
  AddGroupRoleMutationVariables
>
export const AddMemberListDocument = gql`
  query AddMemberList($groupId: Int, $form: String) {
    addMemberList(group_id: $groupId, form: $form) {
      key
      value
    }
  }
`

/**
 * __useAddMemberListQuery__
 *
 * To run a query within a React component, call `useAddMemberListQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddMemberListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddMemberListQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      form: // value for 'form'
 *   },
 * });
 */
export function useAddMemberListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AddMemberListQuery,
    AddMemberListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AddMemberListQuery, AddMemberListQueryVariables>(
    AddMemberListDocument,
    options
  )
}
export function useAddMemberListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AddMemberListQuery,
    AddMemberListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AddMemberListQuery, AddMemberListQueryVariables>(
    AddMemberListDocument,
    options
  )
}
export type AddMemberListQueryHookResult = ReturnType<
  typeof useAddMemberListQuery
>
export type AddMemberListLazyQueryHookResult = ReturnType<
  typeof useAddMemberListLazyQuery
>
export type AddMemberListQueryResult = Apollo.QueryResult<
  AddMemberListQuery,
  AddMemberListQueryVariables
>
export const AddMemberDocument = gql`
  mutation AddMember($groupId: Int!, $userId: [Int!]) {
    addMember(group_id: $groupId, user_id: $userId) {
      group_id
      user_id
    }
  }
`
export type AddMemberMutationFn = Apollo.MutationFunction<
  AddMemberMutation,
  AddMemberMutationVariables
>

/**
 * __useAddMemberMutation__
 *
 * To run a mutation, you first call `useAddMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberMutation, { data, loading, error }] = useAddMemberMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddMemberMutation,
    AddMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddMemberMutation, AddMemberMutationVariables>(
    AddMemberDocument,
    options
  )
}
export type AddMemberMutationHookResult = ReturnType<
  typeof useAddMemberMutation
>
export type AddMemberMutationResult = Apollo.MutationResult<AddMemberMutation>
export type AddMemberMutationOptions = Apollo.BaseMutationOptions<
  AddMemberMutation,
  AddMemberMutationVariables
>
export const AddUserDocument = gql`
  mutation AddUser($userData: RegisterInput) {
    addUser(user_data: $userData) {
      registered
      username
    }
  }
`
export type AddUserMutationFn = Apollo.MutationFunction<
  AddUserMutation,
  AddUserMutationVariables
>

/**
 * __useAddUserMutation__
 *
 * To run a mutation, you first call `useAddUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserMutation, { data, loading, error }] = useAddUserMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useAddUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserMutation,
    AddUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddUserMutation, AddUserMutationVariables>(
    AddUserDocument,
    options
  )
}
export type AddUserMutationHookResult = ReturnType<typeof useAddUserMutation>
export type AddUserMutationResult = Apollo.MutationResult<AddUserMutation>
export type AddUserMutationOptions = Apollo.BaseMutationOptions<
  AddUserMutation,
  AddUserMutationVariables
>
export const AddUserChatDocument = gql`
  mutation AddUserChat(
    $file: Upload
    $message: String
    $userId: Int
    $receiver: Int
  ) {
    addUserChat(
      file: $file
      message: $message
      user_id: $userId
      receiver: $receiver
    ) {
      message
      id
      message_type
      receiver
      user_id
    }
  }
`
export type AddUserChatMutationFn = Apollo.MutationFunction<
  AddUserChatMutation,
  AddUserChatMutationVariables
>

/**
 * __useAddUserChatMutation__
 *
 * To run a mutation, you first call `useAddUserChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserChatMutation, { data, loading, error }] = useAddUserChatMutation({
 *   variables: {
 *      file: // value for 'file'
 *      message: // value for 'message'
 *      userId: // value for 'userId'
 *      receiver: // value for 'receiver'
 *   },
 * });
 */
export function useAddUserChatMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserChatMutation,
    AddUserChatMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddUserChatMutation, AddUserChatMutationVariables>(
    AddUserChatDocument,
    options
  )
}
export type AddUserChatMutationHookResult = ReturnType<
  typeof useAddUserChatMutation
>
export type AddUserChatMutationResult =
  Apollo.MutationResult<AddUserChatMutation>
export type AddUserChatMutationOptions = Apollo.BaseMutationOptions<
  AddUserChatMutation,
  AddUserChatMutationVariables
>
export const AddUserChatReactionDocument = gql`
  mutation AddUserChatReaction(
    $reaction: String
    $count: Int
    $userchatId: Int
  ) {
    addUserChatReaction(
      reaction: $reaction
      count: $count
      userchat_id: $userchatId
    ) {
      reaction
      count
      userchat_id
    }
  }
`
export type AddUserChatReactionMutationFn = Apollo.MutationFunction<
  AddUserChatReactionMutation,
  AddUserChatReactionMutationVariables
>

/**
 * __useAddUserChatReactionMutation__
 *
 * To run a mutation, you first call `useAddUserChatReactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserChatReactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserChatReactionMutation, { data, loading, error }] = useAddUserChatReactionMutation({
 *   variables: {
 *      reaction: // value for 'reaction'
 *      count: // value for 'count'
 *      userchatId: // value for 'userchatId'
 *   },
 * });
 */
export function useAddUserChatReactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserChatReactionMutation,
    AddUserChatReactionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddUserChatReactionMutation,
    AddUserChatReactionMutationVariables
  >(AddUserChatReactionDocument, options)
}
export type AddUserChatReactionMutationHookResult = ReturnType<
  typeof useAddUserChatReactionMutation
>
export type AddUserChatReactionMutationResult =
  Apollo.MutationResult<AddUserChatReactionMutation>
export type AddUserChatReactionMutationOptions = Apollo.BaseMutationOptions<
  AddUserChatReactionMutation,
  AddUserChatReactionMutationVariables
>
export const AddUserGroupRoleDocument = gql`
  mutation AddUserGroupRole($userGroupId: Int, $groupRoleId: Int) {
    addUserGroupRole(user_group_id: $userGroupId, group_role_id: $groupRoleId) {
      group_role_id
      user_group_id
    }
  }
`
export type AddUserGroupRoleMutationFn = Apollo.MutationFunction<
  AddUserGroupRoleMutation,
  AddUserGroupRoleMutationVariables
>

/**
 * __useAddUserGroupRoleMutation__
 *
 * To run a mutation, you first call `useAddUserGroupRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddUserGroupRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addUserGroupRoleMutation, { data, loading, error }] = useAddUserGroupRoleMutation({
 *   variables: {
 *      userGroupId: // value for 'userGroupId'
 *      groupRoleId: // value for 'groupRoleId'
 *   },
 * });
 */
export function useAddUserGroupRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddUserGroupRoleMutation,
    AddUserGroupRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddUserGroupRoleMutation,
    AddUserGroupRoleMutationVariables
  >(AddUserGroupRoleDocument, options)
}
export type AddUserGroupRoleMutationHookResult = ReturnType<
  typeof useAddUserGroupRoleMutation
>
export type AddUserGroupRoleMutationResult =
  Apollo.MutationResult<AddUserGroupRoleMutation>
export type AddUserGroupRoleMutationOptions = Apollo.BaseMutationOptions<
  AddUserGroupRoleMutation,
  AddUserGroupRoleMutationVariables
>
export const AdminLogsDocument = gql`
  query AdminLogs($limit: Int, $offset: Int) {
    adminLogs(limit: $limit, offset: $offset) {
      id
      user_id
      action_description
      full_name
      createdAt
    }
  }
`

/**
 * __useAdminLogsQuery__
 *
 * To run a query within a React component, call `useAdminLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminLogsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useAdminLogsQuery(
  baseOptions?: Apollo.QueryHookOptions<AdminLogsQuery, AdminLogsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AdminLogsQuery, AdminLogsQueryVariables>(
    AdminLogsDocument,
    options
  )
}
export function useAdminLogsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AdminLogsQuery,
    AdminLogsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<AdminLogsQuery, AdminLogsQueryVariables>(
    AdminLogsDocument,
    options
  )
}
export type AdminLogsQueryHookResult = ReturnType<typeof useAdminLogsQuery>
export type AdminLogsLazyQueryHookResult = ReturnType<
  typeof useAdminLogsLazyQuery
>
export type AdminLogsQueryResult = Apollo.QueryResult<
  AdminLogsQuery,
  AdminLogsQueryVariables
>
export const AdminUpdateUserProfileDocument = gql`
  mutation AdminUpdateUserProfile($userData: AdminUserProfileUpdateInput) {
    adminUpdateUserProfile(userData: $userData) {
      id
      username
      access_level
      last_name
      first_name
      profile_img
    }
  }
`
export type AdminUpdateUserProfileMutationFn = Apollo.MutationFunction<
  AdminUpdateUserProfileMutation,
  AdminUpdateUserProfileMutationVariables
>

/**
 * __useAdminUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useAdminUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateUserProfileMutation, { data, loading, error }] = useAdminUpdateUserProfileMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useAdminUpdateUserProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AdminUpdateUserProfileMutation,
    AdminUpdateUserProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AdminUpdateUserProfileMutation,
    AdminUpdateUserProfileMutationVariables
  >(AdminUpdateUserProfileDocument, options)
}
export type AdminUpdateUserProfileMutationHookResult = ReturnType<
  typeof useAdminUpdateUserProfileMutation
>
export type AdminUpdateUserProfileMutationResult =
  Apollo.MutationResult<AdminUpdateUserProfileMutation>
export type AdminUpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<
  AdminUpdateUserProfileMutation,
  AdminUpdateUserProfileMutationVariables
>
export const ChatAddedDocument = gql`
  subscription ChatAdded($user: Int) {
    chatAdded(user: $user) {
      id
      message
      user_id
      receiver
      message_type
      createdAt
    }
  }
`

/**
 * __useChatAddedSubscription__
 *
 * To run a query within a React component, call `useChatAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChatAddedSubscription({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useChatAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    ChatAddedSubscription,
    ChatAddedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    ChatAddedSubscription,
    ChatAddedSubscriptionVariables
  >(ChatAddedDocument, options)
}
export type ChatAddedSubscriptionHookResult = ReturnType<
  typeof useChatAddedSubscription
>
export type ChatAddedSubscriptionResult =
  Apollo.SubscriptionResult<ChatAddedSubscription>
export const ClearChatThreatDocument = gql`
  mutation ClearChatThreat($groupId: Int) {
    clearChatThreat(group_id: $groupId)
  }
`
export type ClearChatThreatMutationFn = Apollo.MutationFunction<
  ClearChatThreatMutation,
  ClearChatThreatMutationVariables
>

/**
 * __useClearChatThreatMutation__
 *
 * To run a mutation, you first call `useClearChatThreatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearChatThreatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearChatThreatMutation, { data, loading, error }] = useClearChatThreatMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useClearChatThreatMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ClearChatThreatMutation,
    ClearChatThreatMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ClearChatThreatMutation,
    ClearChatThreatMutationVariables
  >(ClearChatThreatDocument, options)
}
export type ClearChatThreatMutationHookResult = ReturnType<
  typeof useClearChatThreatMutation
>
export type ClearChatThreatMutationResult =
  Apollo.MutationResult<ClearChatThreatMutation>
export type ClearChatThreatMutationOptions = Apollo.BaseMutationOptions<
  ClearChatThreatMutation,
  ClearChatThreatMutationVariables
>
export const CreateGroupDocument = gql`
  mutation CreateGroup($userId: [Int!]) {
    createGroup(user_id: $userId) {
      group_name
      group_picture
      id
      is_group
    }
  }
`
export type CreateGroupMutationFn = Apollo.MutationFunction<
  CreateGroupMutation,
  CreateGroupMutationVariables
>

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCreateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(
    CreateGroupDocument,
    options
  )
}
export type CreateGroupMutationHookResult = ReturnType<
  typeof useCreateGroupMutation
>
export type CreateGroupMutationResult =
  Apollo.MutationResult<CreateGroupMutation>
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupMutation,
  CreateGroupMutationVariables
>
export const CreateSectionDocument = gql`
  mutation CreateSection($sectionName: String!) {
    createSection(section_name: $sectionName) {
      id
      section_name
      disabled
    }
  }
`
export type CreateSectionMutationFn = Apollo.MutationFunction<
  CreateSectionMutation,
  CreateSectionMutationVariables
>

/**
 * __useCreateSectionMutation__
 *
 * To run a mutation, you first call `useCreateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSectionMutation, { data, loading, error }] = useCreateSectionMutation({
 *   variables: {
 *      sectionName: // value for 'sectionName'
 *   },
 * });
 */
export function useCreateSectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSectionMutation,
    CreateSectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateSectionMutation,
    CreateSectionMutationVariables
  >(CreateSectionDocument, options)
}
export type CreateSectionMutationHookResult = ReturnType<
  typeof useCreateSectionMutation
>
export type CreateSectionMutationResult =
  Apollo.MutationResult<CreateSectionMutation>
export type CreateSectionMutationOptions = Apollo.BaseMutationOptions<
  CreateSectionMutation,
  CreateSectionMutationVariables
>
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      id
      username
      access_level
      password
      token_version
      first_name
      last_name
      address
      profile_img
      age
      gender
      birthdate
      section {
        id
        section_name
        disabled
      }
    }
  }
`

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  )
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserQuery,
    CurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(
    CurrentUserDocument,
    options
  )
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>
export type CurrentUserLazyQueryHookResult = ReturnType<
  typeof useCurrentUserLazyQuery
>
export type CurrentUserQueryResult = Apollo.QueryResult<
  CurrentUserQuery,
  CurrentUserQueryVariables
>
export const CurrentUserGroupRolesDocument = gql`
  query CurrentUserGroupRoles($groupId: Int) {
    currentUserGroupRoles(group_id: $groupId) {
      roles
    }
  }
`

/**
 * __useCurrentUserGroupRolesQuery__
 *
 * To run a query within a React component, call `useCurrentUserGroupRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserGroupRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserGroupRolesQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCurrentUserGroupRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    CurrentUserGroupRolesQuery,
    CurrentUserGroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    CurrentUserGroupRolesQuery,
    CurrentUserGroupRolesQueryVariables
  >(CurrentUserGroupRolesDocument, options)
}
export function useCurrentUserGroupRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CurrentUserGroupRolesQuery,
    CurrentUserGroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    CurrentUserGroupRolesQuery,
    CurrentUserGroupRolesQueryVariables
  >(CurrentUserGroupRolesDocument, options)
}
export type CurrentUserGroupRolesQueryHookResult = ReturnType<
  typeof useCurrentUserGroupRolesQuery
>
export type CurrentUserGroupRolesLazyQueryHookResult = ReturnType<
  typeof useCurrentUserGroupRolesLazyQuery
>
export type CurrentUserGroupRolesQueryResult = Apollo.QueryResult<
  CurrentUserGroupRolesQuery,
  CurrentUserGroupRolesQueryVariables
>
export const GraphDataDocument = gql`
  query GraphData {
    graphData {
      title
      value
      color
    }
  }
`

/**
 * __useGraphDataQuery__
 *
 * To run a query within a React component, call `useGraphDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGraphDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGraphDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGraphDataQuery(
  baseOptions?: Apollo.QueryHookOptions<GraphDataQuery, GraphDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GraphDataQuery, GraphDataQueryVariables>(
    GraphDataDocument,
    options
  )
}
export function useGraphDataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GraphDataQuery,
    GraphDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GraphDataQuery, GraphDataQueryVariables>(
    GraphDataDocument,
    options
  )
}
export type GraphDataQueryHookResult = ReturnType<typeof useGraphDataQuery>
export type GraphDataLazyQueryHookResult = ReturnType<
  typeof useGraphDataLazyQuery
>
export type GraphDataQueryResult = Apollo.QueryResult<
  GraphDataQuery,
  GraphDataQueryVariables
>
export const GroupDocument = gql`
  query Group($groupId: Int!) {
    group(id: $groupId) {
      id
      group_name
      group_picture
      is_group
    }
  }
`

/**
 * __useGroupQuery__
 *
 * To run a query within a React component, call `useGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupQuery(
  baseOptions: Apollo.QueryHookOptions<GroupQuery, GroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GroupQuery, GroupQueryVariables>(
    GroupDocument,
    options
  )
}
export function useGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GroupQuery, GroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GroupQuery, GroupQueryVariables>(
    GroupDocument,
    options
  )
}
export type GroupQueryHookResult = ReturnType<typeof useGroupQuery>
export type GroupLazyQueryHookResult = ReturnType<typeof useGroupLazyQuery>
export type GroupQueryResult = Apollo.QueryResult<
  GroupQuery,
  GroupQueryVariables
>
export const GroupCreatedDocument = gql`
  subscription GroupCreated($user: Int) {
    groupCreated(user: $user) {
      blame {
        id
      }
      group {
        group_name
        group_picture
        id
        is_group
      }
    }
  }
`

/**
 * __useGroupCreatedSubscription__
 *
 * To run a query within a React component, call `useGroupCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupCreatedSubscription({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGroupCreatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    GroupCreatedSubscription,
    GroupCreatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    GroupCreatedSubscription,
    GroupCreatedSubscriptionVariables
  >(GroupCreatedDocument, options)
}
export type GroupCreatedSubscriptionHookResult = ReturnType<
  typeof useGroupCreatedSubscription
>
export type GroupCreatedSubscriptionResult =
  Apollo.SubscriptionResult<GroupCreatedSubscription>
export const GroupListDocument = gql`
  query GroupList($limit: Int) {
    groupList(limit: $limit) {
      id
      group_name
      group_picture
      is_group
    }
  }
`

/**
 * __useGroupListQuery__
 *
 * To run a query within a React component, call `useGroupListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGroupListQuery(
  baseOptions?: Apollo.QueryHookOptions<GroupListQuery, GroupListQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GroupListQuery, GroupListQueryVariables>(
    GroupListDocument,
    options
  )
}
export function useGroupListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupListQuery,
    GroupListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GroupListQuery, GroupListQueryVariables>(
    GroupListDocument,
    options
  )
}
export type GroupListQueryHookResult = ReturnType<typeof useGroupListQuery>
export type GroupListLazyQueryHookResult = ReturnType<
  typeof useGroupListLazyQuery
>
export type GroupListQueryResult = Apollo.QueryResult<
  GroupListQuery,
  GroupListQueryVariables
>
export const GroupMembersDocument = gql`
  query GroupMembers($groupId: Int) {
    groupMembers(group_id: $groupId) {
      id
      username
      first_name
      address
      last_name
      profile_img
      age
      gender
      section {
        id
        section_name
        disabled
      }
    }
  }
`

/**
 * __useGroupMembersQuery__
 *
 * To run a query within a React component, call `useGroupMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupMembersQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupMembersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GroupMembersQuery,
    GroupMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GroupMembersQuery, GroupMembersQueryVariables>(
    GroupMembersDocument,
    options
  )
}
export function useGroupMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupMembersQuery,
    GroupMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GroupMembersQuery, GroupMembersQueryVariables>(
    GroupMembersDocument,
    options
  )
}
export type GroupMembersQueryHookResult = ReturnType<
  typeof useGroupMembersQuery
>
export type GroupMembersLazyQueryHookResult = ReturnType<
  typeof useGroupMembersLazyQuery
>
export type GroupMembersQueryResult = Apollo.QueryResult<
  GroupMembersQuery,
  GroupMembersQueryVariables
>
export const GroupRolesListDocument = gql`
  query GroupRolesList($groupId: Int) {
    groupRolesList(group_id: $groupId) {
      id
      role_name
      emoji
      description
      group_id
      role_type
      is_default
    }
  }
`

/**
 * __useGroupRolesListQuery__
 *
 * To run a query within a React component, call `useGroupRolesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupRolesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupRolesListQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupRolesListQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GroupRolesListQuery,
    GroupRolesListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GroupRolesListQuery, GroupRolesListQueryVariables>(
    GroupRolesListDocument,
    options
  )
}
export function useGroupRolesListLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupRolesListQuery,
    GroupRolesListQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GroupRolesListQuery, GroupRolesListQueryVariables>(
    GroupRolesListDocument,
    options
  )
}
export type GroupRolesListQueryHookResult = ReturnType<
  typeof useGroupRolesListQuery
>
export type GroupRolesListLazyQueryHookResult = ReturnType<
  typeof useGroupRolesListLazyQuery
>
export type GroupRolesListQueryResult = Apollo.QueryResult<
  GroupRolesListQuery,
  GroupRolesListQueryVariables
>
export const GroupRolesUpdatedDocument = gql`
  subscription GroupRolesUpdated($user: Int, $groupId: Int) {
    groupRolesUpdated(user: $user, group_id: $groupId) {
      newRoles {
        id
        role_name
        emoji
        description
        group_id
        role_type
        is_default
      }
      group_id
    }
  }
`

/**
 * __useGroupRolesUpdatedSubscription__
 *
 * To run a query within a React component, call `useGroupRolesUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupRolesUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupRolesUpdatedSubscription({
 *   variables: {
 *      user: // value for 'user'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupRolesUpdatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    GroupRolesUpdatedSubscription,
    GroupRolesUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    GroupRolesUpdatedSubscription,
    GroupRolesUpdatedSubscriptionVariables
  >(GroupRolesUpdatedDocument, options)
}
export type GroupRolesUpdatedSubscriptionHookResult = ReturnType<
  typeof useGroupRolesUpdatedSubscription
>
export type GroupRolesUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<GroupRolesUpdatedSubscription>
export const GroupUpdateDocument = gql`
  subscription GroupUpdate($user: Int) {
    groupUpdate(user: $user) {
      id
      group_name
      group_picture
      is_group
    }
  }
`

/**
 * __useGroupUpdateSubscription__
 *
 * To run a query within a React component, call `useGroupUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGroupUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupUpdateSubscription({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useGroupUpdateSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    GroupUpdateSubscription,
    GroupUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    GroupUpdateSubscription,
    GroupUpdateSubscriptionVariables
  >(GroupUpdateDocument, options)
}
export type GroupUpdateSubscriptionHookResult = ReturnType<
  typeof useGroupUpdateSubscription
>
export type GroupUpdateSubscriptionResult =
  Apollo.SubscriptionResult<GroupUpdateSubscription>
export const GroupsDocument = gql`
  query Groups($userId: Int) {
    groups(user_id: $userId) {
      group_name
      id
      group_picture
      is_group
    }
  }
`

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(
    GroupsDocument,
    options
  )
}
export function useGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(
    GroupsDocument,
    options
  )
}
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>
export type GroupsQueryResult = Apollo.QueryResult<
  GroupsQuery,
  GroupsQueryVariables
>
export const IsLoggedInDocument = gql`
  query IsLoggedIn {
    isLoggedIn {
      isLogged
      currentUser {
        id
        username
        access_level
      }
    }
  }
`

/**
 * __useIsLoggedInQuery__
 *
 * To run a query within a React component, call `useIsLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsLoggedInQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IsLoggedInQuery,
    IsLoggedInQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(
    IsLoggedInDocument,
    options
  )
}
export function useIsLoggedInLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsLoggedInQuery,
    IsLoggedInQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<IsLoggedInQuery, IsLoggedInQueryVariables>(
    IsLoggedInDocument,
    options
  )
}
export type IsLoggedInQueryHookResult = ReturnType<typeof useIsLoggedInQuery>
export type IsLoggedInLazyQueryHookResult = ReturnType<
  typeof useIsLoggedInLazyQuery
>
export type IsLoggedInQueryResult = Apollo.QueryResult<
  IsLoggedInQuery,
  IsLoggedInQueryVariables
>
export const LatestChatsDocument = gql`
  query LatestChats {
    latestChats {
      id
      message
      user_id
      receiver
      message_type
      createdAt
    }
  }
`

/**
 * __useLatestChatsQuery__
 *
 * To run a query within a React component, call `useLatestChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLatestChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLatestChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLatestChatsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    LatestChatsQuery,
    LatestChatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<LatestChatsQuery, LatestChatsQueryVariables>(
    LatestChatsDocument,
    options
  )
}
export function useLatestChatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    LatestChatsQuery,
    LatestChatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<LatestChatsQuery, LatestChatsQueryVariables>(
    LatestChatsDocument,
    options
  )
}
export type LatestChatsQueryHookResult = ReturnType<typeof useLatestChatsQuery>
export type LatestChatsLazyQueryHookResult = ReturnType<
  typeof useLatestChatsLazyQuery
>
export type LatestChatsQueryResult = Apollo.QueryResult<
  LatestChatsQuery,
  LatestChatsQueryVariables
>
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
    }
  }
`
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  )
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>
export const MemberAddedDocument = gql`
  subscription MemberAdded($user: Int, $groupId: Int) {
    memberAdded(user: $user, group_id: $groupId) {
      blame {
        id
      }
      users {
        role {
          id
          group_id
          role_name
          role_type
        }
        user {
          age
          first_name
          id
          last_name
          profile_img
          username
          section {
            id
            section_name
            disabled
          }
        }
      }
      group {
        id
        group_name
        group_picture
        is_group
      }
      group_roles {
        id
        role_name
        group_id
        role_type
      }
      usergroup_roles {
        user_group_id
        group_role_id
      }
      user_groups {
        user_id
        group_id
      }
    }
  }
`

/**
 * __useMemberAddedSubscription__
 *
 * To run a query within a React component, call `useMemberAddedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMemberAddedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberAddedSubscription({
 *   variables: {
 *      user: // value for 'user'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useMemberAddedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MemberAddedSubscription,
    MemberAddedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    MemberAddedSubscription,
    MemberAddedSubscriptionVariables
  >(MemberAddedDocument, options)
}
export type MemberAddedSubscriptionHookResult = ReturnType<
  typeof useMemberAddedSubscription
>
export type MemberAddedSubscriptionResult =
  Apollo.SubscriptionResult<MemberAddedSubscription>
export const MemberRemovedDocument = gql`
  subscription MemberRemoved($user: Int, $groupId: Int) {
    memberRemoved(user: $user, group_id: $groupId) {
      blame {
        id
      }
      group {
        group_name
        group_picture
        id
        is_group
      }
      user {
        first_name
        id
        last_name
        profile_img
        username
        section {
          id
          section_name
          disabled
        }
      }
    }
  }
`

/**
 * __useMemberRemovedSubscription__
 *
 * To run a query within a React component, call `useMemberRemovedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMemberRemovedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberRemovedSubscription({
 *   variables: {
 *      user: // value for 'user'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useMemberRemovedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MemberRemovedSubscription,
    MemberRemovedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    MemberRemovedSubscription,
    MemberRemovedSubscriptionVariables
  >(MemberRemovedDocument, options)
}
export type MemberRemovedSubscriptionHookResult = ReturnType<
  typeof useMemberRemovedSubscription
>
export type MemberRemovedSubscriptionResult =
  Apollo.SubscriptionResult<MemberRemovedSubscription>
export const MemberRolesUpdatedDocument = gql`
  subscription MemberRolesUpdated($user: Int, $groupId: Int) {
    memberRolesUpdated(user: $user, group_id: $groupId) {
      newRoles
      user {
        id
        username
        first_name
        last_name
        profile_img
      }
      group_id
      roles_ids
    }
  }
`

/**
 * __useMemberRolesUpdatedSubscription__
 *
 * To run a query within a React component, call `useMemberRolesUpdatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useMemberRolesUpdatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberRolesUpdatedSubscription({
 *   variables: {
 *      user: // value for 'user'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useMemberRolesUpdatedSubscription(
  baseOptions?: Apollo.SubscriptionHookOptions<
    MemberRolesUpdatedSubscription,
    MemberRolesUpdatedSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSubscription<
    MemberRolesUpdatedSubscription,
    MemberRolesUpdatedSubscriptionVariables
  >(MemberRolesUpdatedDocument, options)
}
export type MemberRolesUpdatedSubscriptionHookResult = ReturnType<
  typeof useMemberRolesUpdatedSubscription
>
export type MemberRolesUpdatedSubscriptionResult =
  Apollo.SubscriptionResult<MemberRolesUpdatedSubscription>
export const OtherUserDocument = gql`
  query OtherUser($groupId: Int) {
    otherUser(group_id: $groupId) {
      id
      first_name
      last_name
      address
      section {
        id
        section_name
        disabled
      }
      profile_img
      age
      gender
    }
  }
`

/**
 * __useOtherUserQuery__
 *
 * To run a query within a React component, call `useOtherUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherUserQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useOtherUserQuery(
  baseOptions?: Apollo.QueryHookOptions<OtherUserQuery, OtherUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<OtherUserQuery, OtherUserQueryVariables>(
    OtherUserDocument,
    options
  )
}
export function useOtherUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    OtherUserQuery,
    OtherUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<OtherUserQuery, OtherUserQueryVariables>(
    OtherUserDocument,
    options
  )
}
export type OtherUserQueryHookResult = ReturnType<typeof useOtherUserQuery>
export type OtherUserLazyQueryHookResult = ReturnType<
  typeof useOtherUserLazyQuery
>
export type OtherUserQueryResult = Apollo.QueryResult<
  OtherUserQuery,
  OtherUserQueryVariables
>
export const RemoveMemberDocument = gql`
  mutation RemoveMember($groupId: Int, $userId: Int) {
    removeMember(group_id: $groupId, user_id: $userId) {
      id
      first_name
      last_name
      section {
        id
        section_name
        disabled
      }
      profile_img
      age
      gender
    }
  }
`
export type RemoveMemberMutationFn = Apollo.MutationFunction<
  RemoveMemberMutation,
  RemoveMemberMutationVariables
>

/**
 * __useRemoveMemberMutation__
 *
 * To run a mutation, you first call `useRemoveMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMemberMutation, { data, loading, error }] = useRemoveMemberMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveMemberMutation,
    RemoveMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    RemoveMemberMutation,
    RemoveMemberMutationVariables
  >(RemoveMemberDocument, options)
}
export type RemoveMemberMutationHookResult = ReturnType<
  typeof useRemoveMemberMutation
>
export type RemoveMemberMutationResult =
  Apollo.MutationResult<RemoveMemberMutation>
export type RemoveMemberMutationOptions = Apollo.BaseMutationOptions<
  RemoveMemberMutation,
  RemoveMemberMutationVariables
>
export const ReportDocument = gql`
  query Report($reportId: Int) {
    report(report_id: $reportId) {
      report {
        id
        user_id
        group_id
        report_reason
        is_resolved
        createdAt
        remarks
        date_resolved
      }
      sender {
        id
        username
        first_name
        last_name
        section {
          id
          section_name
          disabled
        }
        profile_img
      }
      chat_reported {
        id
        group_picture
        group_name
        is_group
      }
    }
  }
`

/**
 * __useReportQuery__
 *
 * To run a query within a React component, call `useReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportQuery({
 *   variables: {
 *      reportId: // value for 'reportId'
 *   },
 * });
 */
export function useReportQuery(
  baseOptions?: Apollo.QueryHookOptions<ReportQuery, ReportQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ReportQuery, ReportQueryVariables>(
    ReportDocument,
    options
  )
}
export function useReportLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReportQuery, ReportQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ReportQuery, ReportQueryVariables>(
    ReportDocument,
    options
  )
}
export type ReportQueryHookResult = ReturnType<typeof useReportQuery>
export type ReportLazyQueryHookResult = ReturnType<typeof useReportLazyQuery>
export type ReportQueryResult = Apollo.QueryResult<
  ReportQuery,
  ReportQueryVariables
>
export const ReportedChatDocument = gql`
  query ReportedChat($groupId: Int!) {
    reportedChat(group_id: $groupId) {
      group_data {
        id
        group_name
        group_picture
        is_group
        has_threat
      }
      allMembers {
        id
        username
        first_name
        last_name
        profile_img
      }
      roleMembers {
        role {
          id
          role_name
          group_id
          role_type
          is_default
        }
        members {
          id
          username
          first_name
          last_name
          profile_img
        }
      }
      chat_messages {
        id
        message
        user_id
        receiver
        message_type
        createdAt
        senderImage
      }
    }
  }
`

/**
 * __useReportedChatQuery__
 *
 * To run a query within a React component, call `useReportedChatQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportedChatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportedChatQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useReportedChatQuery(
  baseOptions: Apollo.QueryHookOptions<
    ReportedChatQuery,
    ReportedChatQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ReportedChatQuery, ReportedChatQueryVariables>(
    ReportedChatDocument,
    options
  )
}
export function useReportedChatLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ReportedChatQuery,
    ReportedChatQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ReportedChatQuery, ReportedChatQueryVariables>(
    ReportedChatDocument,
    options
  )
}
export type ReportedChatQueryHookResult = ReturnType<
  typeof useReportedChatQuery
>
export type ReportedChatLazyQueryHookResult = ReturnType<
  typeof useReportedChatLazyQuery
>
export type ReportedChatQueryResult = Apollo.QueryResult<
  ReportedChatQuery,
  ReportedChatQueryVariables
>
export const ReportsDocument = gql`
  query Reports {
    reports {
      id
      user_id
      group_id
      report_reason
      is_resolved
      createdAt
    }
  }
`

/**
 * __useReportsQuery__
 *
 * To run a query within a React component, call `useReportsQuery` and pass it any options that fit your needs.
 * When your component renders, `useReportsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReportsQuery({
 *   variables: {
 *   },
 * });
 */
export function useReportsQuery(
  baseOptions?: Apollo.QueryHookOptions<ReportsQuery, ReportsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<ReportsQuery, ReportsQueryVariables>(
    ReportsDocument,
    options
  )
}
export function useReportsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ReportsQuery, ReportsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<ReportsQuery, ReportsQueryVariables>(
    ReportsDocument,
    options
  )
}
export type ReportsQueryHookResult = ReturnType<typeof useReportsQuery>
export type ReportsLazyQueryHookResult = ReturnType<typeof useReportsLazyQuery>
export type ReportsQueryResult = Apollo.QueryResult<
  ReportsQuery,
  ReportsQueryVariables
>
export const SectionsDocument = gql`
  query Sections {
    sections {
      id
      section_name
      disabled
    }
  }
`

/**
 * __useSectionsQuery__
 *
 * To run a query within a React component, call `useSectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSectionsQuery(
  baseOptions?: Apollo.QueryHookOptions<SectionsQuery, SectionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SectionsQuery, SectionsQueryVariables>(
    SectionsDocument,
    options
  )
}
export function useSectionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SectionsQuery,
    SectionsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SectionsQuery, SectionsQueryVariables>(
    SectionsDocument,
    options
  )
}
export type SectionsQueryHookResult = ReturnType<typeof useSectionsQuery>
export type SectionsLazyQueryHookResult = ReturnType<
  typeof useSectionsLazyQuery
>
export type SectionsQueryResult = Apollo.QueryResult<
  SectionsQuery,
  SectionsQueryVariables
>
export const SubmitReportDocument = gql`
  mutation SubmitReport($groupId: Int, $reasons: [String]) {
    submitReport(group_id: $groupId, reasons: $reasons) {
      id
      user_id
      group_id
      report_reason
      is_resolved
      createdAt
    }
  }
`
export type SubmitReportMutationFn = Apollo.MutationFunction<
  SubmitReportMutation,
  SubmitReportMutationVariables
>

/**
 * __useSubmitReportMutation__
 *
 * To run a mutation, you first call `useSubmitReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitReportMutation, { data, loading, error }] = useSubmitReportMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      reasons: // value for 'reasons'
 *   },
 * });
 */
export function useSubmitReportMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SubmitReportMutation,
    SubmitReportMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    SubmitReportMutation,
    SubmitReportMutationVariables
  >(SubmitReportDocument, options)
}
export type SubmitReportMutationHookResult = ReturnType<
  typeof useSubmitReportMutation
>
export type SubmitReportMutationResult =
  Apollo.MutationResult<SubmitReportMutation>
export type SubmitReportMutationOptions = Apollo.BaseMutationOptions<
  SubmitReportMutation,
  SubmitReportMutationVariables
>
export const SystemStatsDocument = gql`
  query SystemStats {
    systemStats {
      userCount
      groupCount
      pendingReportCount
      userChatsCount
      latestAdminLog {
        id
        user_id
        action_description
        full_name
        createdAt
      }
    }
  }
`

/**
 * __useSystemStatsQuery__
 *
 * To run a query within a React component, call `useSystemStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSystemStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SystemStatsQuery,
    SystemStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SystemStatsQuery, SystemStatsQueryVariables>(
    SystemStatsDocument,
    options
  )
}
export function useSystemStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SystemStatsQuery,
    SystemStatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SystemStatsQuery, SystemStatsQueryVariables>(
    SystemStatsDocument,
    options
  )
}
export type SystemStatsQueryHookResult = ReturnType<typeof useSystemStatsQuery>
export type SystemStatsLazyQueryHookResult = ReturnType<
  typeof useSystemStatsLazyQuery
>
export type SystemStatsQueryResult = Apollo.QueryResult<
  SystemStatsQuery,
  SystemStatsQueryVariables
>
export const ToggleSectionStatusDocument = gql`
  mutation ToggleSectionStatus($sectionId: Int, $status: Boolean) {
    toggleSectionStatus(section_id: $sectionId, status: $status) {
      id
      section_name
      disabled
    }
  }
`
export type ToggleSectionStatusMutationFn = Apollo.MutationFunction<
  ToggleSectionStatusMutation,
  ToggleSectionStatusMutationVariables
>

/**
 * __useToggleSectionStatusMutation__
 *
 * To run a mutation, you first call `useToggleSectionStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleSectionStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleSectionStatusMutation, { data, loading, error }] = useToggleSectionStatusMutation({
 *   variables: {
 *      sectionId: // value for 'sectionId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useToggleSectionStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleSectionStatusMutation,
    ToggleSectionStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ToggleSectionStatusMutation,
    ToggleSectionStatusMutationVariables
  >(ToggleSectionStatusDocument, options)
}
export type ToggleSectionStatusMutationHookResult = ReturnType<
  typeof useToggleSectionStatusMutation
>
export type ToggleSectionStatusMutationResult =
  Apollo.MutationResult<ToggleSectionStatusMutation>
export type ToggleSectionStatusMutationOptions = Apollo.BaseMutationOptions<
  ToggleSectionStatusMutation,
  ToggleSectionStatusMutationVariables
>
export const ToggleUserStatusDocument = gql`
  mutation ToggleUserStatus($userId: Int, $userStatus: Boolean) {
    toggleUserStatus(user_id: $userId, user_status: $userStatus)
  }
`
export type ToggleUserStatusMutationFn = Apollo.MutationFunction<
  ToggleUserStatusMutation,
  ToggleUserStatusMutationVariables
>

/**
 * __useToggleUserStatusMutation__
 *
 * To run a mutation, you first call `useToggleUserStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleUserStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleUserStatusMutation, { data, loading, error }] = useToggleUserStatusMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      userStatus: // value for 'userStatus'
 *   },
 * });
 */
export function useToggleUserStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ToggleUserStatusMutation,
    ToggleUserStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ToggleUserStatusMutation,
    ToggleUserStatusMutationVariables
  >(ToggleUserStatusDocument, options)
}
export type ToggleUserStatusMutationHookResult = ReturnType<
  typeof useToggleUserStatusMutation
>
export type ToggleUserStatusMutationResult =
  Apollo.MutationResult<ToggleUserStatusMutation>
export type ToggleUserStatusMutationOptions = Apollo.BaseMutationOptions<
  ToggleUserStatusMutation,
  ToggleUserStatusMutationVariables
>
export const UpdateGroupDocument = gql`
  mutation UpdateGroup(
    $groupName: String
    $groupId: Int
    $groupPicture: Upload
  ) {
    updateGroup(
      group_name: $groupName
      group_id: $groupId
      group_picture: $groupPicture
    ) {
      group_name
      group_picture
      id
      is_group
    }
  }
`
export type UpdateGroupMutationFn = Apollo.MutationFunction<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      groupName: // value for 'groupName'
 *      groupId: // value for 'groupId'
 *      groupPicture: // value for 'groupPicture'
 *   },
 * });
 */
export function useUpdateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupMutation,
    UpdateGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(
    UpdateGroupDocument,
    options
  )
}
export type UpdateGroupMutationHookResult = ReturnType<
  typeof useUpdateGroupMutation
>
export type UpdateGroupMutationResult =
  Apollo.MutationResult<UpdateGroupMutation>
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>
export const UpdateGroupRolesDocument = gql`
  mutation UpdateGroupRoles(
    $rolesToEdit: [RolesToEdit]
    $rolesToDelete: [Int]
    $groupId: Int
  ) {
    updateGroupRoles(
      roles_to_edit: $rolesToEdit
      roles_to_delete: $rolesToDelete
      group_id: $groupId
    ) {
      id
      role_name
      emoji
      description
      group_id
      role_type
      is_default
    }
  }
`
export type UpdateGroupRolesMutationFn = Apollo.MutationFunction<
  UpdateGroupRolesMutation,
  UpdateGroupRolesMutationVariables
>

/**
 * __useUpdateGroupRolesMutation__
 *
 * To run a mutation, you first call `useUpdateGroupRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupRolesMutation, { data, loading, error }] = useUpdateGroupRolesMutation({
 *   variables: {
 *      rolesToEdit: // value for 'rolesToEdit'
 *      rolesToDelete: // value for 'rolesToDelete'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useUpdateGroupRolesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupRolesMutation,
    UpdateGroupRolesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateGroupRolesMutation,
    UpdateGroupRolesMutationVariables
  >(UpdateGroupRolesDocument, options)
}
export type UpdateGroupRolesMutationHookResult = ReturnType<
  typeof useUpdateGroupRolesMutation
>
export type UpdateGroupRolesMutationResult =
  Apollo.MutationResult<UpdateGroupRolesMutation>
export type UpdateGroupRolesMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupRolesMutation,
  UpdateGroupRolesMutationVariables
>
export const UpdateReportStatusDocument = gql`
  mutation UpdateReportStatus($reportStatus: Boolean, $reportId: Int) {
    updateReportStatus(report_status: $reportStatus, report_id: $reportId) {
      id
      user_id
      report_reason
      group_id
      is_resolved
      remarks
      createdAt
      date_resolved
    }
  }
`
export type UpdateReportStatusMutationFn = Apollo.MutationFunction<
  UpdateReportStatusMutation,
  UpdateReportStatusMutationVariables
>

/**
 * __useUpdateReportStatusMutation__
 *
 * To run a mutation, you first call `useUpdateReportStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReportStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReportStatusMutation, { data, loading, error }] = useUpdateReportStatusMutation({
 *   variables: {
 *      reportStatus: // value for 'reportStatus'
 *      reportId: // value for 'reportId'
 *   },
 * });
 */
export function useUpdateReportStatusMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateReportStatusMutation,
    UpdateReportStatusMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateReportStatusMutation,
    UpdateReportStatusMutationVariables
  >(UpdateReportStatusDocument, options)
}
export type UpdateReportStatusMutationHookResult = ReturnType<
  typeof useUpdateReportStatusMutation
>
export type UpdateReportStatusMutationResult =
  Apollo.MutationResult<UpdateReportStatusMutation>
export type UpdateReportStatusMutationOptions = Apollo.BaseMutationOptions<
  UpdateReportStatusMutation,
  UpdateReportStatusMutationVariables
>
export const UpdateSectionDocument = gql`
  mutation UpdateSection($sectionId: Int, $sectionName: String!) {
    updateSection(section_id: $sectionId, section_name: $sectionName) {
      id
      section_name
      disabled
    }
  }
`
export type UpdateSectionMutationFn = Apollo.MutationFunction<
  UpdateSectionMutation,
  UpdateSectionMutationVariables
>

/**
 * __useUpdateSectionMutation__
 *
 * To run a mutation, you first call `useUpdateSectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSectionMutation, { data, loading, error }] = useUpdateSectionMutation({
 *   variables: {
 *      sectionId: // value for 'sectionId'
 *      sectionName: // value for 'sectionName'
 *   },
 * });
 */
export function useUpdateSectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateSectionMutation,
    UpdateSectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateSectionMutation,
    UpdateSectionMutationVariables
  >(UpdateSectionDocument, options)
}
export type UpdateSectionMutationHookResult = ReturnType<
  typeof useUpdateSectionMutation
>
export type UpdateSectionMutationResult =
  Apollo.MutationResult<UpdateSectionMutation>
export type UpdateSectionMutationOptions = Apollo.BaseMutationOptions<
  UpdateSectionMutation,
  UpdateSectionMutationVariables
>
export const UpdateUserGroupRolesDocument = gql`
  mutation UpdateUserGroupRoles(
    $roles: [String]
    $groupId: Int
    $userId: Int
    $rolesIds: [Int]
  ) {
    updateUserGroupRoles(
      roles: $roles
      group_id: $groupId
      user_id: $userId
      roles_ids: $rolesIds
    ) {
      newRoles
      user {
        id
        username
        first_name
        last_name
        profile_img
      }
    }
  }
`
export type UpdateUserGroupRolesMutationFn = Apollo.MutationFunction<
  UpdateUserGroupRolesMutation,
  UpdateUserGroupRolesMutationVariables
>

/**
 * __useUpdateUserGroupRolesMutation__
 *
 * To run a mutation, you first call `useUpdateUserGroupRolesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserGroupRolesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserGroupRolesMutation, { data, loading, error }] = useUpdateUserGroupRolesMutation({
 *   variables: {
 *      roles: // value for 'roles'
 *      groupId: // value for 'groupId'
 *      userId: // value for 'userId'
 *      rolesIds: // value for 'rolesIds'
 *   },
 * });
 */
export function useUpdateUserGroupRolesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserGroupRolesMutation,
    UpdateUserGroupRolesMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateUserGroupRolesMutation,
    UpdateUserGroupRolesMutationVariables
  >(UpdateUserGroupRolesDocument, options)
}
export type UpdateUserGroupRolesMutationHookResult = ReturnType<
  typeof useUpdateUserGroupRolesMutation
>
export type UpdateUserGroupRolesMutationResult =
  Apollo.MutationResult<UpdateUserGroupRolesMutation>
export type UpdateUserGroupRolesMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserGroupRolesMutation,
  UpdateUserGroupRolesMutationVariables
>
export const UpdateUserProfileDocument = gql`
  mutation UpdateUserProfile(
    $username: String
    $gender: String
    $sectionId: Int
    $profileImg: Upload
    $address: String
    $newPassword: String
    $currentConfirmation: String
    $birthdate: Date
  ) {
    updateUserProfile(
      username: $username
      gender: $gender
      section_id: $sectionId
      profile_img: $profileImg
      address: $address
      new_password: $newPassword
      current_confirmation: $currentConfirmation
      birthdate: $birthdate
    ) {
      username
      first_name
      last_name
      address
      profile_img
      age
      gender
      section {
        id
        section_name
        disabled
      }
    }
  }
`
export type UpdateUserProfileMutationFn = Apollo.MutationFunction<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>

/**
 * __useUpdateUserProfileMutation__
 *
 * To run a mutation, you first call `useUpdateUserProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserProfileMutation, { data, loading, error }] = useUpdateUserProfileMutation({
 *   variables: {
 *      username: // value for 'username'
 *      gender: // value for 'gender'
 *      sectionId: // value for 'sectionId'
 *      profileImg: // value for 'profileImg'
 *      address: // value for 'address'
 *      newPassword: // value for 'newPassword'
 *      currentConfirmation: // value for 'currentConfirmation'
 *      birthdate: // value for 'birthdate'
 *   },
 * });
 */
export function useUpdateUserProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateUserProfileMutation,
    UpdateUserProfileMutationVariables
  >(UpdateUserProfileDocument, options)
}
export type UpdateUserProfileMutationHookResult = ReturnType<
  typeof useUpdateUserProfileMutation
>
export type UpdateUserProfileMutationResult =
  Apollo.MutationResult<UpdateUserProfileMutation>
export type UpdateUserProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserProfileMutation,
  UpdateUserProfileMutationVariables
>
export const UserDocument = gql`
  query User {
    user {
      id
      username
      access_level
      password
      token_version
      first_name
      last_name
      address
      section {
        id
        section_name
        disabled
      }
      profile_img
      age
      gender
    }
  }
`

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(
  baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options)
}
export function useUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(
    UserDocument,
    options
  )
}
export type UserQueryHookResult = ReturnType<typeof useUserQuery>
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>
export const UserChatSenderDocument = gql`
  query UserChatSender($userId: Int) {
    userChatSender(user_id: $userId) {
      first_name
      last_name
      username
      profile_img
      id
    }
  }
`

/**
 * __useUserChatSenderQuery__
 *
 * To run a query within a React component, call `useUserChatSenderQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserChatSenderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserChatSenderQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserChatSenderQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserChatSenderQuery,
    UserChatSenderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserChatSenderQuery, UserChatSenderQueryVariables>(
    UserChatSenderDocument,
    options
  )
}
export function useUserChatSenderLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserChatSenderQuery,
    UserChatSenderQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserChatSenderQuery, UserChatSenderQueryVariables>(
    UserChatSenderDocument,
    options
  )
}
export type UserChatSenderQueryHookResult = ReturnType<
  typeof useUserChatSenderQuery
>
export type UserChatSenderLazyQueryHookResult = ReturnType<
  typeof useUserChatSenderLazyQuery
>
export type UserChatSenderQueryResult = Apollo.QueryResult<
  UserChatSenderQuery,
  UserChatSenderQueryVariables
>
export const UserChatsDocument = gql`
  query UserChats {
    userChats {
      id
      message
      user_id
      receiver
      message_type
      createdAt
    }
  }
`

/**
 * __useUserChatsQuery__
 *
 * To run a query within a React component, call `useUserChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserChatsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserChatsQuery, UserChatsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserChatsQuery, UserChatsQueryVariables>(
    UserChatsDocument,
    options
  )
}
export function useUserChatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserChatsQuery,
    UserChatsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserChatsQuery, UserChatsQueryVariables>(
    UserChatsDocument,
    options
  )
}
export type UserChatsQueryHookResult = ReturnType<typeof useUserChatsQuery>
export type UserChatsLazyQueryHookResult = ReturnType<
  typeof useUserChatsLazyQuery
>
export type UserChatsQueryResult = Apollo.QueryResult<
  UserChatsQuery,
  UserChatsQueryVariables
>
export const UserGroupRolesDocument = gql`
  query UserGroupRoles($userId: Int, $groupId: Int) {
    userGroupRoles(user_id: $userId, group_id: $groupId)
  }
`

/**
 * __useUserGroupRolesQuery__
 *
 * To run a query within a React component, call `useUserGroupRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGroupRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGroupRolesQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useUserGroupRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserGroupRolesQuery,
    UserGroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserGroupRolesQuery, UserGroupRolesQueryVariables>(
    UserGroupRolesDocument,
    options
  )
}
export function useUserGroupRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserGroupRolesQuery,
    UserGroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserGroupRolesQuery, UserGroupRolesQueryVariables>(
    UserGroupRolesDocument,
    options
  )
}
export type UserGroupRolesQueryHookResult = ReturnType<
  typeof useUserGroupRolesQuery
>
export type UserGroupRolesLazyQueryHookResult = ReturnType<
  typeof useUserGroupRolesLazyQuery
>
export type UserGroupRolesQueryResult = Apollo.QueryResult<
  UserGroupRolesQuery,
  UserGroupRolesQueryVariables
>
export const UserLogsDocument = gql`
  query UserLogs($limit: Int, $offset: Int) {
    userLogs(limit: $limit, offset: $offset) {
      id
      user_id
      action_description
      full_name
      createdAt
      section
    }
  }
`

/**
 * __useUserLogsQuery__
 *
 * To run a query within a React component, call `useUserLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserLogsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useUserLogsQuery(
  baseOptions?: Apollo.QueryHookOptions<UserLogsQuery, UserLogsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserLogsQuery, UserLogsQueryVariables>(
    UserLogsDocument,
    options
  )
}
export function useUserLogsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserLogsQuery,
    UserLogsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserLogsQuery, UserLogsQueryVariables>(
    UserLogsDocument,
    options
  )
}
export type UserLogsQueryHookResult = ReturnType<typeof useUserLogsQuery>
export type UserLogsLazyQueryHookResult = ReturnType<
  typeof useUserLogsLazyQuery
>
export type UserLogsQueryResult = Apollo.QueryResult<
  UserLogsQuery,
  UserLogsQueryVariables
>
export const UserProfileDocument = gql`
  query UserProfile($userProfileId: Int!) {
    userProfile(id: $userProfileId) {
      id
      address
      age
      first_name
      gender
      last_name
      profile_img
      section {
        id
        section_name
        disabled
      }
      disabled
      username
    }
  }
`

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      userProfileId: // value for 'userProfileId'
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options
  )
}
export function useUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options
  )
}
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>
export type UserProfileLazyQueryHookResult = ReturnType<
  typeof useUserProfileLazyQuery
>
export type UserProfileQueryResult = Apollo.QueryResult<
  UserProfileQuery,
  UserProfileQueryVariables
>
export const UserRolesDocument = gql`
  query UserRoles($groupRoleId: Int) {
    userRoles(group_role_id: $groupRoleId) {
      first_name
      id
      last_name
      profile_img
    }
  }
`

/**
 * __useUserRolesQuery__
 *
 * To run a query within a React component, call `useUserRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRolesQuery({
 *   variables: {
 *      groupRoleId: // value for 'groupRoleId'
 *   },
 * });
 */
export function useUserRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<UserRolesQuery, UserRolesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserRolesQuery, UserRolesQueryVariables>(
    UserRolesDocument,
    options
  )
}
export function useUserRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserRolesQuery,
    UserRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserRolesQuery, UserRolesQueryVariables>(
    UserRolesDocument,
    options
  )
}
export type UserRolesQueryHookResult = ReturnType<typeof useUserRolesQuery>
export type UserRolesLazyQueryHookResult = ReturnType<
  typeof useUserRolesLazyQuery
>
export type UserRolesQueryResult = Apollo.QueryResult<
  UserRolesQuery,
  UserRolesQueryVariables
>
export const UsersDocument = gql`
  query Users($limit: Int) {
    users(limit: $limit) {
      id
      first_name
      last_name
      address
      section {
        id
        section_name
        disabled
      }
      profile_img
      age
      gender
      username
      access_level
    }
  }
`

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  )
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  )
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>

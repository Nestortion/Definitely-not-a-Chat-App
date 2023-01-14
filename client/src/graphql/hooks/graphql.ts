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
  section: Scalars['String']
  user_id: Scalars['Int']
}

export type CurrentUserGroupRoles = {
  __typename?: 'CurrentUserGroupRoles'
  roles?: Maybe<Array<Maybe<Scalars['String']>>>
}

export type Group = {
  __typename?: 'Group'
  group_name: Scalars['String']
  group_picture: Scalars['String']
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
  role_name: Scalars['String']
  role_type: RoleType
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
  addUser?: Maybe<User>
  addUserChat?: Maybe<UserChat>
  addUserChatReaction?: Maybe<UserChatReaction>
  addUserGroup?: Maybe<UserGroup>
  addUserGroupRole?: Maybe<UserGroupRole>
  createGroup?: Maybe<Group>
  login?: Maybe<AccessToken>
  logout?: Maybe<Scalars['Boolean']>
  removeMember?: Maybe<User>
  revokeRefreshToken?: Maybe<Scalars['Boolean']>
  updateGroup?: Maybe<Group>
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
  access_level?: InputMaybe<AccessLevel>
  address?: InputMaybe<Scalars['String']>
  age?: InputMaybe<Scalars['Int']>
  first_name?: InputMaybe<Scalars['String']>
  gender?: InputMaybe<Scalars['String']>
  last_name?: InputMaybe<Scalars['String']>
  password?: InputMaybe<Scalars['String']>
  profile_img?: InputMaybe<Scalars['Upload']>
  section?: InputMaybe<Scalars['String']>
  username?: InputMaybe<Scalars['String']>
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

export type MutationCreateGroupArgs = {
  user_id?: InputMaybe<Array<Scalars['Int']>>
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

export type MutationUpdateGroupArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  group_name?: InputMaybe<Scalars['String']>
  group_picture?: InputMaybe<Scalars['Upload']>
}

export type Query = {
  __typename?: 'Query'
  addMemberList?: Maybe<Array<Maybe<KvUser>>>
  adminLogs?: Maybe<Array<Maybe<AdminLog>>>
  currentUser?: Maybe<User>
  currentUserGroupRoles?: Maybe<CurrentUserGroupRoles>
  group?: Maybe<Group>
  groupRoles?: Maybe<Array<Maybe<GroupRole>>>
  groups?: Maybe<Array<Maybe<Group>>>
  isLoggedIn?: Maybe<Scalars['Boolean']>
  latestChats?: Maybe<Array<Maybe<UserChat>>>
  otherUser?: Maybe<User>
  user?: Maybe<User>
  userChat?: Maybe<UserChat>
  userChatReactions?: Maybe<Array<Maybe<UserChatReaction>>>
  userChatSender?: Maybe<User>
  userChats?: Maybe<Array<Maybe<UserChat>>>
  userGroup?: Maybe<UserGroup>
  userGroupRoles?: Maybe<Array<Maybe<GroupRole>>>
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

export type QueryCurrentUserGroupRolesArgs = {
  group_id?: InputMaybe<Scalars['Int']>
}

export type QueryGroupArgs = {
  id: Scalars['Int']
}

export type QueryGroupRolesArgs = {
  group_id?: InputMaybe<Scalars['Int']>
}

export type QueryGroupsArgs = {
  user_id?: InputMaybe<Scalars['Int']>
}

export type QueryOtherUserArgs = {
  group_id?: InputMaybe<Scalars['Int']>
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
  group_id: Scalars['Int']
}

export type QueryUserProfileArgs = {
  id: Scalars['Int']
}

export type QueryUserRolesArgs = {
  group_role_id?: InputMaybe<Scalars['Int']>
}

export enum RoleType {
  Leader = 'LEADER',
  Member = 'MEMBER',
  Moderator = 'MODERATOR',
}

export type Subscription = {
  __typename?: 'Subscription'
  chatAdded?: Maybe<UserChat>
  groupCreated?: Maybe<GroupCreatedResponse>
  groupUpdate?: Maybe<Group>
  memberAdded?: Maybe<MemberAddedResponse>
  memberRemoved?: Maybe<MemberRemovedResponse>
}

export type SubscriptionChatAddedArgs = {
  user?: InputMaybe<Scalars['Int']>
}

export type SubscriptionGroupCreatedArgs = {
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

export type User = {
  __typename?: 'User'
  access_level: AccessLevel
  address: Scalars['String']
  age: Scalars['Int']
  first_name: Scalars['String']
  gender: Scalars['String']
  id: Scalars['Int']
  last_name: Scalars['String']
  password: Scalars['String']
  profile_img: Scalars['String']
  section: Scalars['String']
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
  user_id: Scalars['Int']
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
  username?: InputMaybe<Scalars['String']>
  age?: InputMaybe<Scalars['Int']>
  accessLevel?: InputMaybe<AccessLevel>
  password?: InputMaybe<Scalars['String']>
  address?: InputMaybe<Scalars['String']>
  section?: InputMaybe<Scalars['String']>
  firstName?: InputMaybe<Scalars['String']>
  lastName?: InputMaybe<Scalars['String']>
  profileImg?: InputMaybe<Scalars['Upload']>
  gender?: InputMaybe<Scalars['String']>
}>

export type AddUserMutation = {
  __typename?: 'Mutation'
  addUser?: {
    __typename?: 'User'
    id: number
    username: string
    access_level: AccessLevel
    password: string
    token_version: string
    first_name: string
    last_name: string
    address: string
    section: string
    profile_img: string
    age: number
    gender: string
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
  } | null
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
    section: string
    profile_img: string
    age: number
    gender: string
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

export type GroupRolesQueryVariables = Exact<{
  groupId?: InputMaybe<Scalars['Int']>
}>

export type GroupRolesQuery = {
  __typename?: 'Query'
  groupRoles?: Array<{
    __typename?: 'GroupRole'
    id: number
    role_name: string
    emoji: string
    description: string
    group_id: string
    role_type: RoleType
  } | null> | null
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
  isLoggedIn?: boolean | null
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
        section: string
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
      section: string
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
    section: string
    profile_img: string
    age: number
    gender: string
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
    section: string
    profile_img: string
    age: number
    gender: string
  } | null
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
    section: string
    profile_img: string
    age: number
    gender: string
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
  groupId: Scalars['Int']
}>

export type UserGroupRolesQuery = {
  __typename?: 'Query'
  userGroupRoles?: Array<{
    __typename?: 'GroupRole'
    role_type: RoleType
    role_name: string
  } | null> | null
}

export type UserProfileQueryVariables = Exact<{
  userProfileId: Scalars['Int']
}>

export type UserProfileQuery = {
  __typename?: 'Query'
  userProfile?: {
    __typename?: 'User'
    address: string
    age: number
    first_name: string
    gender: string
    last_name: string
    profile_img: string
    section: string
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
  mutation AddUser(
    $username: String
    $age: Int
    $accessLevel: AccessLevel
    $password: String
    $address: String
    $section: String
    $firstName: String
    $lastName: String
    $profileImg: Upload
    $gender: String
  ) {
    addUser(
      username: $username
      age: $age
      access_level: $accessLevel
      password: $password
      address: $address
      section: $section
      first_name: $firstName
      last_name: $lastName
      profile_img: $profileImg
      gender: $gender
    ) {
      id
      username
      access_level
      password
      token_version
      first_name
      last_name
      address
      section
      profile_img
      age
      gender
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
 *      username: // value for 'username'
 *      age: // value for 'age'
 *      accessLevel: // value for 'accessLevel'
 *      password: // value for 'password'
 *      address: // value for 'address'
 *      section: // value for 'section'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      profileImg: // value for 'profileImg'
 *      gender: // value for 'gender'
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
export const ChatAddedDocument = gql`
  subscription ChatAdded($user: Int) {
    chatAdded(user: $user) {
      id
      message
      user_id
      receiver
      message_type
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
      section
      profile_img
      age
      gender
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
export const GroupRolesDocument = gql`
  query GroupRoles($groupId: Int) {
    groupRoles(group_id: $groupId) {
      id
      role_name
      emoji
      description
      group_id
      role_type
    }
  }
`

/**
 * __useGroupRolesQuery__
 *
 * To run a query within a React component, call `useGroupRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupRolesQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GroupRolesQuery,
    GroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GroupRolesQuery, GroupRolesQueryVariables>(
    GroupRolesDocument,
    options
  )
}
export function useGroupRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupRolesQuery,
    GroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GroupRolesQuery, GroupRolesQueryVariables>(
    GroupRolesDocument,
    options
  )
}
export type GroupRolesQueryHookResult = ReturnType<typeof useGroupRolesQuery>
export type GroupRolesLazyQueryHookResult = ReturnType<
  typeof useGroupRolesLazyQuery
>
export type GroupRolesQueryResult = Apollo.QueryResult<
  GroupRolesQuery,
  GroupRolesQueryVariables
>
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
    isLoggedIn
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
          section
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
        section
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
export const OtherUserDocument = gql`
  query OtherUser($groupId: Int) {
    otherUser(group_id: $groupId) {
      id
      first_name
      last_name
      address
      section
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
      section
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
      section
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
  query UserGroupRoles($groupId: Int!) {
    userGroupRoles(group_id: $groupId) {
      role_type
      role_name
    }
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
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useUserGroupRolesQuery(
  baseOptions: Apollo.QueryHookOptions<
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
export const UserProfileDocument = gql`
  query UserProfile($userProfileId: Int!) {
    userProfile(id: $userProfileId) {
      address
      age
      first_name
      gender
      last_name
      profile_img
      section
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

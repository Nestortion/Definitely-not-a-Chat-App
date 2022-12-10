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

export type Group = {
  __typename?: 'Group'
  group_name: Scalars['String']
  group_picture: Scalars['String']
  id: Scalars['Int']
  is_group: Scalars['String']
}

export type GroupRole = {
  __typename?: 'GroupRole'
  description: Scalars['String']
  emoji: Scalars['String']
  group_id: Scalars['String']
  id: Scalars['Int']
  role_name: Scalars['String']
}

export enum MessageType {
  Image = 'IMAGE',
  Other = 'OTHER',
  Text = 'TEXT',
}

export type Mutation = {
  __typename?: 'Mutation'
  addGroup?: Maybe<Group>
  addGroupRole?: Maybe<GroupRole>
  addUser?: Maybe<User>
  addUserChat?: Maybe<UserChat>
  addUserChatReaction?: Maybe<UserChatReaction>
  addUserGroup?: Maybe<UserGroup>
  addUserGroupRole?: Maybe<UserGroupRole>
  login?: Maybe<AccessToken>
  logout?: Maybe<Scalars['Boolean']>
  revokeRefreshToken?: Maybe<Scalars['Boolean']>
}

export type MutationAddGroupArgs = {
  group_name?: InputMaybe<Scalars['String']>
}

export type MutationAddGroupRoleArgs = {
  description?: InputMaybe<Scalars['String']>
  emoji?: InputMaybe<Scalars['String']>
  group_id?: InputMaybe<Scalars['Int']>
  role_name?: InputMaybe<Scalars['String']>
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

export type MutationLoginArgs = {
  password: Scalars['String']
  username: Scalars['String']
}

export type MutationRevokeRefreshTokenArgs = {
  user_id: Scalars['Int']
}

export type Query = {
  __typename?: 'Query'
  currentUser?: Maybe<User>
  group?: Maybe<Group>
  groupRoles?: Maybe<Array<Maybe<GroupRole>>>
  groups?: Maybe<Array<Maybe<Group>>>
  isLoggedIn?: Maybe<Scalars['Boolean']>
  latestChats?: Maybe<Array<Maybe<UserChat>>>
  searchGroups?: Maybe<Array<Maybe<Group>>>
  user?: Maybe<User>
  userChat?: Maybe<UserChat>
  userChatReactions?: Maybe<Array<Maybe<UserChatReaction>>>
  userChats?: Maybe<Array<Maybe<UserChat>>>
  userGroup?: Maybe<UserGroup>
  userGroups?: Maybe<Array<Maybe<UserGroup>>>
  userProfile?: Maybe<User>
  userRoles?: Maybe<Array<Maybe<User>>>
  users?: Maybe<Array<Maybe<User>>>
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

export type QuerySearchGroupsArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  group_name?: InputMaybe<Scalars['String']>
}

export type QueryUserChatArgs = {
  id: Scalars['Int']
}

export type QueryUserChatsArgs = {
  receiver?: InputMaybe<Scalars['Int']>
}

export type QueryUserGroupArgs = {
  group_id?: InputMaybe<Scalars['Int']>
  user_id?: InputMaybe<Scalars['Int']>
}

export type QueryUserProfileArgs = {
  id: Scalars['Int']
}

export type QueryUserRolesArgs = {
  group_role_id?: InputMaybe<Scalars['Int']>
}

export type Subscription = {
  __typename?: 'Subscription'
  chatAdded?: Maybe<UserChat>
}

export type SubscriptionChatAddedArgs = {
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
  id: Scalars['Int']
  message: Scalars['String']
  message_type: MessageType
  receiver: Scalars['Int']
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

export type AddGroupMutationVariables = Exact<{
  groupName?: InputMaybe<Scalars['String']>
}>

export type AddGroupMutation = {
  __typename?: 'Mutation'
  addGroup?: { __typename?: 'Group'; group_name: string } | null
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
    receiver: number
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
    receiver: number
    message_type: MessageType
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
  } | null> | null
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
    receiver: number
    message_type: MessageType
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

export type SearchGroupsQueryVariables = Exact<{
  groupName?: InputMaybe<Scalars['String']>
  groupId?: InputMaybe<Scalars['Int']>
}>

export type SearchGroupsQuery = {
  __typename?: 'Query'
  searchGroups?: Array<{
    __typename?: 'Group'
    group_name: string
    group_picture: string
    id: number
    is_group: string
  } | null> | null
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

export type UserChatsQueryVariables = Exact<{ [key: string]: never }>

export type UserChatsQuery = {
  __typename?: 'Query'
  userChats?: Array<{
    __typename?: 'UserChat'
    id: number
    message: string
    user_id: number
    receiver: number
    message_type: MessageType
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

export const AddGroupDocument = gql`
  mutation AddGroup($groupName: String) {
    addGroup(group_name: $groupName) {
      group_name
    }
  }
`
export type AddGroupMutationFn = Apollo.MutationFunction<
  AddGroupMutation,
  AddGroupMutationVariables
>

/**
 * __useAddGroupMutation__
 *
 * To run a mutation, you first call `useAddGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addGroupMutation, { data, loading, error }] = useAddGroupMutation({
 *   variables: {
 *      groupName: // value for 'groupName'
 *   },
 * });
 */
export function useAddGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddGroupMutation,
    AddGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AddGroupMutation, AddGroupMutationVariables>(
    AddGroupDocument,
    options
  )
}
export type AddGroupMutationHookResult = ReturnType<typeof useAddGroupMutation>
export type AddGroupMutationResult = Apollo.MutationResult<AddGroupMutation>
export type AddGroupMutationOptions = Apollo.BaseMutationOptions<
  AddGroupMutation,
  AddGroupMutationVariables
>
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
export const GroupRolesDocument = gql`
  query GroupRoles($groupId: Int) {
    groupRoles(group_id: $groupId) {
      id
      role_name
      emoji
      description
      group_id
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
export const SearchGroupsDocument = gql`
  query SearchGroups($groupName: String, $groupId: Int) {
    searchGroups(group_name: $groupName, group_id: $groupId) {
      group_name
      group_picture
      id
      is_group
    }
  }
`

/**
 * __useSearchGroupsQuery__
 *
 * To run a query within a React component, call `useSearchGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchGroupsQuery({
 *   variables: {
 *      groupName: // value for 'groupName'
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useSearchGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    SearchGroupsQuery,
    SearchGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchGroupsQuery, SearchGroupsQueryVariables>(
    SearchGroupsDocument,
    options
  )
}
export function useSearchGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchGroupsQuery,
    SearchGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchGroupsQuery, SearchGroupsQueryVariables>(
    SearchGroupsDocument,
    options
  )
}
export type SearchGroupsQueryHookResult = ReturnType<
  typeof useSearchGroupsQuery
>
export type SearchGroupsLazyQueryHookResult = ReturnType<
  typeof useSearchGroupsLazyQuery
>
export type SearchGroupsQueryResult = Apollo.QueryResult<
  SearchGroupsQuery,
  SearchGroupsQueryVariables
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
export const UserChatsDocument = gql`
  query UserChats {
    userChats {
      id
      message
      user_id
      receiver
      message_type
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

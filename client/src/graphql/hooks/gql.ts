/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "mutation AddGroup($groupName: String) {\n  addGroup(group_name: $groupName) {\n    group_name\n  }\n}": types.AddGroupDocument,
    "mutation AddGroupRole($roleName: String, $description: String, $emoji: String, $groupId: Int) {\n  addGroupRole(\n    role_name: $roleName\n    description: $description\n    emoji: $emoji\n    group_id: $groupId\n  ) {\n    role_name\n    emoji\n    description\n    group_id\n  }\n}": types.AddGroupRoleDocument,
    "query AddMemberList {\n  addMemberList {\n    key\n    value\n  }\n}": types.AddMemberListDocument,
    "mutation AddMember($groupId: Int!, $userId: [Int!]) {\n  addMember(group_id: $groupId, user_id: $userId) {\n    group_id\n    user_id\n  }\n}": types.AddMemberDocument,
    "mutation AddUser($username: String, $age: Int, $accessLevel: AccessLevel, $password: String, $address: String, $section: String, $firstName: String, $lastName: String, $profileImg: Upload, $gender: String) {\n  addUser(\n    username: $username\n    age: $age\n    access_level: $accessLevel\n    password: $password\n    address: $address\n    section: $section\n    first_name: $firstName\n    last_name: $lastName\n    profile_img: $profileImg\n    gender: $gender\n  ) {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.AddUserDocument,
    "mutation AddUserChat($file: Upload, $message: String, $userId: Int, $receiver: Int) {\n  addUserChat(\n    file: $file\n    message: $message\n    user_id: $userId\n    receiver: $receiver\n  ) {\n    message\n    id\n    message_type\n    receiver\n    user_id\n  }\n}": types.AddUserChatDocument,
    "mutation AddUserChatReaction($reaction: String, $count: Int, $userchatId: Int) {\n  addUserChatReaction(\n    reaction: $reaction\n    count: $count\n    userchat_id: $userchatId\n  ) {\n    reaction\n    count\n    userchat_id\n  }\n}": types.AddUserChatReactionDocument,
    "mutation AddUserGroupRole($userGroupId: Int, $groupRoleId: Int) {\n  addUserGroupRole(user_group_id: $userGroupId, group_role_id: $groupRoleId) {\n    group_role_id\n    user_group_id\n  }\n}": types.AddUserGroupRoleDocument,
    "subscription ChatAdded($user: Int) {\n  chatAdded(user: $user) {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}": types.ChatAddedDocument,
    "query CurrentUser {\n  currentUser {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.CurrentUserDocument,
    "query Group($groupId: Int!) {\n  group(id: $groupId) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}": types.GroupDocument,
    "query GroupRoles($groupId: Int) {\n  groupRoles(group_id: $groupId) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n  }\n}": types.GroupRolesDocument,
    "query Groups($userId: Int) {\n  groups(user_id: $userId) {\n    group_name\n    id\n    group_picture\n    is_group\n  }\n}": types.GroupsDocument,
    "query IsLoggedIn {\n  isLoggedIn\n}": types.IsLoggedInDocument,
    "query LatestChats {\n  latestChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}": types.LatestChatsDocument,
    "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    access_token\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "query SearchGroups($groupName: String, $groupId: Int) {\n  searchGroups(group_name: $groupName, group_id: $groupId) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}": types.SearchGroupsDocument,
    "query User {\n  user {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.UserDocument,
    "query UserChatSender($userId: Int) {\n  userChatSender(user_id: $userId) {\n    first_name\n    last_name\n    username\n    profile_img\n    id\n  }\n}": types.UserChatSenderDocument,
    "query UserChats {\n  userChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}": types.UserChatsDocument,
    "query UserGroupRoles($groupId: Int!) {\n  userGroupRoles(group_id: $groupId) {\n    role_type\n    role_name\n  }\n}": types.UserGroupRolesDocument,
    "query UserProfile($userProfileId: Int!) {\n  userProfile(id: $userProfileId) {\n    address\n    age\n    first_name\n    gender\n    last_name\n    profile_img\n    section\n  }\n}": types.UserProfileDocument,
    "query UserRoles($groupRoleId: Int) {\n  userRoles(group_role_id: $groupRoleId) {\n    first_name\n    id\n    last_name\n    profile_img\n  }\n}": types.UserRolesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddGroup($groupName: String) {\n  addGroup(group_name: $groupName) {\n    group_name\n  }\n}"): (typeof documents)["mutation AddGroup($groupName: String) {\n  addGroup(group_name: $groupName) {\n    group_name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddGroupRole($roleName: String, $description: String, $emoji: String, $groupId: Int) {\n  addGroupRole(\n    role_name: $roleName\n    description: $description\n    emoji: $emoji\n    group_id: $groupId\n  ) {\n    role_name\n    emoji\n    description\n    group_id\n  }\n}"): (typeof documents)["mutation AddGroupRole($roleName: String, $description: String, $emoji: String, $groupId: Int) {\n  addGroupRole(\n    role_name: $roleName\n    description: $description\n    emoji: $emoji\n    group_id: $groupId\n  ) {\n    role_name\n    emoji\n    description\n    group_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AddMemberList {\n  addMemberList {\n    key\n    value\n  }\n}"): (typeof documents)["query AddMemberList {\n  addMemberList {\n    key\n    value\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddMember($groupId: Int!, $userId: [Int!]) {\n  addMember(group_id: $groupId, user_id: $userId) {\n    group_id\n    user_id\n  }\n}"): (typeof documents)["mutation AddMember($groupId: Int!, $userId: [Int!]) {\n  addMember(group_id: $groupId, user_id: $userId) {\n    group_id\n    user_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddUser($username: String, $age: Int, $accessLevel: AccessLevel, $password: String, $address: String, $section: String, $firstName: String, $lastName: String, $profileImg: Upload, $gender: String) {\n  addUser(\n    username: $username\n    age: $age\n    access_level: $accessLevel\n    password: $password\n    address: $address\n    section: $section\n    first_name: $firstName\n    last_name: $lastName\n    profile_img: $profileImg\n    gender: $gender\n  ) {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"): (typeof documents)["mutation AddUser($username: String, $age: Int, $accessLevel: AccessLevel, $password: String, $address: String, $section: String, $firstName: String, $lastName: String, $profileImg: Upload, $gender: String) {\n  addUser(\n    username: $username\n    age: $age\n    access_level: $accessLevel\n    password: $password\n    address: $address\n    section: $section\n    first_name: $firstName\n    last_name: $lastName\n    profile_img: $profileImg\n    gender: $gender\n  ) {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddUserChat($file: Upload, $message: String, $userId: Int, $receiver: Int) {\n  addUserChat(\n    file: $file\n    message: $message\n    user_id: $userId\n    receiver: $receiver\n  ) {\n    message\n    id\n    message_type\n    receiver\n    user_id\n  }\n}"): (typeof documents)["mutation AddUserChat($file: Upload, $message: String, $userId: Int, $receiver: Int) {\n  addUserChat(\n    file: $file\n    message: $message\n    user_id: $userId\n    receiver: $receiver\n  ) {\n    message\n    id\n    message_type\n    receiver\n    user_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddUserChatReaction($reaction: String, $count: Int, $userchatId: Int) {\n  addUserChatReaction(\n    reaction: $reaction\n    count: $count\n    userchat_id: $userchatId\n  ) {\n    reaction\n    count\n    userchat_id\n  }\n}"): (typeof documents)["mutation AddUserChatReaction($reaction: String, $count: Int, $userchatId: Int) {\n  addUserChatReaction(\n    reaction: $reaction\n    count: $count\n    userchat_id: $userchatId\n  ) {\n    reaction\n    count\n    userchat_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddUserGroupRole($userGroupId: Int, $groupRoleId: Int) {\n  addUserGroupRole(user_group_id: $userGroupId, group_role_id: $groupRoleId) {\n    group_role_id\n    user_group_id\n  }\n}"): (typeof documents)["mutation AddUserGroupRole($userGroupId: Int, $groupRoleId: Int) {\n  addUserGroupRole(user_group_id: $userGroupId, group_role_id: $groupRoleId) {\n    group_role_id\n    user_group_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription ChatAdded($user: Int) {\n  chatAdded(user: $user) {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}"): (typeof documents)["subscription ChatAdded($user: Int) {\n  chatAdded(user: $user) {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CurrentUser {\n  currentUser {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"): (typeof documents)["query CurrentUser {\n  currentUser {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Group($groupId: Int!) {\n  group(id: $groupId) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"): (typeof documents)["query Group($groupId: Int!) {\n  group(id: $groupId) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GroupRoles($groupId: Int) {\n  groupRoles(group_id: $groupId) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n  }\n}"): (typeof documents)["query GroupRoles($groupId: Int) {\n  groupRoles(group_id: $groupId) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Groups($userId: Int) {\n  groups(user_id: $userId) {\n    group_name\n    id\n    group_picture\n    is_group\n  }\n}"): (typeof documents)["query Groups($userId: Int) {\n  groups(user_id: $userId) {\n    group_name\n    id\n    group_picture\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query IsLoggedIn {\n  isLoggedIn\n}"): (typeof documents)["query IsLoggedIn {\n  isLoggedIn\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LatestChats {\n  latestChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}"): (typeof documents)["query LatestChats {\n  latestChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    access_token\n  }\n}"): (typeof documents)["mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    access_token\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SearchGroups($groupName: String, $groupId: Int) {\n  searchGroups(group_name: $groupName, group_id: $groupId) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}"): (typeof documents)["query SearchGroups($groupName: String, $groupId: Int) {\n  searchGroups(group_name: $groupName, group_id: $groupId) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query User {\n  user {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"): (typeof documents)["query User {\n  user {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserChatSender($userId: Int) {\n  userChatSender(user_id: $userId) {\n    first_name\n    last_name\n    username\n    profile_img\n    id\n  }\n}"): (typeof documents)["query UserChatSender($userId: Int) {\n  userChatSender(user_id: $userId) {\n    first_name\n    last_name\n    username\n    profile_img\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserChats {\n  userChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}"): (typeof documents)["query UserChats {\n  userChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserGroupRoles($groupId: Int!) {\n  userGroupRoles(group_id: $groupId) {\n    role_type\n    role_name\n  }\n}"): (typeof documents)["query UserGroupRoles($groupId: Int!) {\n  userGroupRoles(group_id: $groupId) {\n    role_type\n    role_name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserProfile($userProfileId: Int!) {\n  userProfile(id: $userProfileId) {\n    address\n    age\n    first_name\n    gender\n    last_name\n    profile_img\n    section\n  }\n}"): (typeof documents)["query UserProfile($userProfileId: Int!) {\n  userProfile(id: $userProfileId) {\n    address\n    age\n    first_name\n    gender\n    last_name\n    profile_img\n    section\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserRoles($groupRoleId: Int) {\n  userRoles(group_role_id: $groupRoleId) {\n    first_name\n    id\n    last_name\n    profile_img\n  }\n}"): (typeof documents)["query UserRoles($groupRoleId: Int) {\n  userRoles(group_role_id: $groupRoleId) {\n    first_name\n    id\n    last_name\n    profile_img\n  }\n}"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;
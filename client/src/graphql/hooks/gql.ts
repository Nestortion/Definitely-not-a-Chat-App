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
    "mutation AddGroupRole($roleName: String, $description: String, $emoji: String, $groupId: Int) {\n  addGroupRole(\n    role_name: $roleName\n    description: $description\n    emoji: $emoji\n    group_id: $groupId\n  ) {\n    role_name\n    emoji\n    description\n    group_id\n  }\n}": types.AddGroupRoleDocument,
    "query AddMemberList($groupId: Int, $form: String) {\n  addMemberList(group_id: $groupId, form: $form) {\n    key\n    value\n  }\n}": types.AddMemberListDocument,
    "mutation AddMember($groupId: Int!, $userId: [Int!]) {\n  addMember(group_id: $groupId, user_id: $userId) {\n    group_id\n    user_id\n  }\n}": types.AddMemberDocument,
    "mutation AddUser($username: String, $age: Int, $accessLevel: AccessLevel, $password: String, $address: String, $section: String, $firstName: String, $lastName: String, $profileImg: Upload, $gender: String) {\n  addUser(\n    username: $username\n    age: $age\n    access_level: $accessLevel\n    password: $password\n    address: $address\n    section: $section\n    first_name: $firstName\n    last_name: $lastName\n    profile_img: $profileImg\n    gender: $gender\n  ) {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.AddUserDocument,
    "mutation AddUserChat($file: Upload, $message: String, $userId: Int, $receiver: Int) {\n  addUserChat(\n    file: $file\n    message: $message\n    user_id: $userId\n    receiver: $receiver\n  ) {\n    message\n    id\n    message_type\n    receiver\n    user_id\n  }\n}": types.AddUserChatDocument,
    "mutation AddUserChatReaction($reaction: String, $count: Int, $userchatId: Int) {\n  addUserChatReaction(\n    reaction: $reaction\n    count: $count\n    userchat_id: $userchatId\n  ) {\n    reaction\n    count\n    userchat_id\n  }\n}": types.AddUserChatReactionDocument,
    "mutation AddUserGroupRole($userGroupId: Int, $groupRoleId: Int) {\n  addUserGroupRole(user_group_id: $userGroupId, group_role_id: $groupRoleId) {\n    group_role_id\n    user_group_id\n  }\n}": types.AddUserGroupRoleDocument,
    "subscription ChatAdded($user: Int) {\n  chatAdded(user: $user) {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}": types.ChatAddedDocument,
    "mutation CreateGroup($userId: [Int!]) {\n  createGroup(user_id: $userId) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}": types.CreateGroupDocument,
    "query CurrentUser {\n  currentUser {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.CurrentUserDocument,
    "query CurrentUserGroupRoles($groupId: Int) {\n  currentUserGroupRoles(group_id: $groupId) {\n    roles\n  }\n}": types.CurrentUserGroupRolesDocument,
    "query Group($groupId: Int!) {\n  group(id: $groupId) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}": types.GroupDocument,
    "subscription GroupCreated($user: Int) {\n  groupCreated(user: $user) {\n    blame {\n      id\n    }\n    group {\n      group_name\n      group_picture\n      id\n      is_group\n    }\n  }\n}": types.GroupCreatedDocument,
    "query GroupList($limit: Int) {\n  groupList(limit: $limit) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}": types.GroupListDocument,
    "query GroupMembers($groupId: Int) {\n  groupMembers(group_id: $groupId) {\n    id\n    username\n    first_name\n    address\n    last_name\n    profile_img\n    section\n    age\n    gender\n  }\n}": types.GroupMembersDocument,
    "query GroupRolesList($groupId: Int) {\n  groupRolesList(group_id: $groupId) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n    role_type\n    is_default\n  }\n}": types.GroupRolesListDocument,
    "subscription GroupRolesUpdated($user: Int, $groupId: Int) {\n  groupRolesUpdated(user: $user, group_id: $groupId) {\n    newRoles {\n      id\n      role_name\n      emoji\n      description\n      group_id\n      role_type\n      is_default\n    }\n    group_id\n  }\n}": types.GroupRolesUpdatedDocument,
    "subscription GroupUpdate($user: Int) {\n  groupUpdate(user: $user) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}": types.GroupUpdateDocument,
    "query Groups($userId: Int) {\n  groups(user_id: $userId) {\n    group_name\n    id\n    group_picture\n    is_group\n  }\n}": types.GroupsDocument,
    "query IsLoggedIn {\n  isLoggedIn {\n    isLogged\n    currentUser {\n      id\n      username\n      access_level\n    }\n  }\n}": types.IsLoggedInDocument,
    "query LatestChats {\n  latestChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}": types.LatestChatsDocument,
    "mutation Login($username: String!, $password: String!) {\n  login(username: $username, password: $password) {\n    access_token\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "subscription MemberAdded($user: Int, $groupId: Int) {\n  memberAdded(user: $user, group_id: $groupId) {\n    blame {\n      id\n    }\n    users {\n      role {\n        id\n        group_id\n        role_name\n        role_type\n      }\n      user {\n        age\n        first_name\n        id\n        last_name\n        profile_img\n        username\n        section\n      }\n    }\n    group {\n      id\n      group_name\n      group_picture\n      is_group\n    }\n    group_roles {\n      id\n      role_name\n      group_id\n      role_type\n    }\n    usergroup_roles {\n      user_group_id\n      group_role_id\n    }\n    user_groups {\n      user_id\n      group_id\n    }\n  }\n}": types.MemberAddedDocument,
    "subscription MemberRemoved($user: Int, $groupId: Int) {\n  memberRemoved(user: $user, group_id: $groupId) {\n    blame {\n      id\n    }\n    group {\n      group_name\n      group_picture\n      id\n      is_group\n    }\n    user {\n      first_name\n      id\n      last_name\n      profile_img\n      username\n      section\n    }\n  }\n}": types.MemberRemovedDocument,
    "subscription MemberRolesUpdated($user: Int, $groupId: Int) {\n  memberRolesUpdated(user: $user, group_id: $groupId) {\n    newRoles\n    user {\n      id\n      username\n      first_name\n      last_name\n      profile_img\n    }\n    group_id\n    roles_ids\n  }\n}": types.MemberRolesUpdatedDocument,
    "query OtherUser($groupId: Int) {\n  otherUser(group_id: $groupId) {\n    id\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.OtherUserDocument,
    "mutation RemoveMember($groupId: Int, $userId: Int) {\n  removeMember(group_id: $groupId, user_id: $userId) {\n    id\n    first_name\n    last_name\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.RemoveMemberDocument,
    "query SystemStats {\n  systemStats {\n    userCount\n    groupCount\n    userChatsCount\n  }\n}": types.SystemStatsDocument,
    "mutation UpdateGroup($groupName: String, $groupId: Int, $groupPicture: Upload) {\n  updateGroup(\n    group_name: $groupName\n    group_id: $groupId\n    group_picture: $groupPicture\n  ) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}": types.UpdateGroupDocument,
    "mutation UpdateGroupRoles($rolesToEdit: [RolesToEdit], $rolesToDelete: [Int], $groupId: Int) {\n  updateGroupRoles(\n    roles_to_edit: $rolesToEdit\n    roles_to_delete: $rolesToDelete\n    group_id: $groupId\n  ) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n    role_type\n    is_default\n  }\n}": types.UpdateGroupRolesDocument,
    "mutation UpdateUserGroupRoles($roles: [String], $groupId: Int, $userId: Int, $rolesIds: [Int]) {\n  updateUserGroupRoles(\n    roles: $roles\n    group_id: $groupId\n    user_id: $userId\n    roles_ids: $rolesIds\n  ) {\n    newRoles\n    user {\n      id\n      username\n      first_name\n      last_name\n      profile_img\n    }\n  }\n}": types.UpdateUserGroupRolesDocument,
    "mutation UpdateUserProfile($username: String, $age: Int, $gender: String, $section: String, $address: String, $profileImg: Upload) {\n  updateUserProfile(\n    username: $username\n    age: $age\n    gender: $gender\n    section: $section\n    address: $address\n    profile_img: $profileImg\n  ) {\n    address\n    age\n    first_name\n    gender\n    last_name\n    profile_img\n    section\n    username\n  }\n}": types.UpdateUserProfileDocument,
    "query User {\n  user {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}": types.UserDocument,
    "query UserChatSender($userId: Int) {\n  userChatSender(user_id: $userId) {\n    first_name\n    last_name\n    username\n    profile_img\n    id\n  }\n}": types.UserChatSenderDocument,
    "query UserChats {\n  userChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}": types.UserChatsDocument,
    "query UserGroupRoles($userId: Int, $groupId: Int) {\n  userGroupRoles(user_id: $userId, group_id: $groupId)\n}": types.UserGroupRolesDocument,
    "query UserProfile($userProfileId: Int!) {\n  userProfile(id: $userProfileId) {\n    address\n    age\n    first_name\n    gender\n    last_name\n    profile_img\n    section\n  }\n}": types.UserProfileDocument,
    "query UserRoles($groupRoleId: Int) {\n  userRoles(group_role_id: $groupRoleId) {\n    first_name\n    id\n    last_name\n    profile_img\n  }\n}": types.UserRolesDocument,
    "query Users($limit: Int) {\n  users(limit: $limit) {\n    id\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n    username\n  }\n}": types.UsersDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation AddGroupRole($roleName: String, $description: String, $emoji: String, $groupId: Int) {\n  addGroupRole(\n    role_name: $roleName\n    description: $description\n    emoji: $emoji\n    group_id: $groupId\n  ) {\n    role_name\n    emoji\n    description\n    group_id\n  }\n}"): (typeof documents)["mutation AddGroupRole($roleName: String, $description: String, $emoji: String, $groupId: Int) {\n  addGroupRole(\n    role_name: $roleName\n    description: $description\n    emoji: $emoji\n    group_id: $groupId\n  ) {\n    role_name\n    emoji\n    description\n    group_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query AddMemberList($groupId: Int, $form: String) {\n  addMemberList(group_id: $groupId, form: $form) {\n    key\n    value\n  }\n}"): (typeof documents)["query AddMemberList($groupId: Int, $form: String) {\n  addMemberList(group_id: $groupId, form: $form) {\n    key\n    value\n  }\n}"];
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
export function graphql(source: "subscription ChatAdded($user: Int) {\n  chatAdded(user: $user) {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}"): (typeof documents)["subscription ChatAdded($user: Int) {\n  chatAdded(user: $user) {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateGroup($userId: [Int!]) {\n  createGroup(user_id: $userId) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}"): (typeof documents)["mutation CreateGroup($userId: [Int!]) {\n  createGroup(user_id: $userId) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CurrentUser {\n  currentUser {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"): (typeof documents)["query CurrentUser {\n  currentUser {\n    id\n    username\n    access_level\n    password\n    token_version\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CurrentUserGroupRoles($groupId: Int) {\n  currentUserGroupRoles(group_id: $groupId) {\n    roles\n  }\n}"): (typeof documents)["query CurrentUserGroupRoles($groupId: Int) {\n  currentUserGroupRoles(group_id: $groupId) {\n    roles\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Group($groupId: Int!) {\n  group(id: $groupId) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"): (typeof documents)["query Group($groupId: Int!) {\n  group(id: $groupId) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription GroupCreated($user: Int) {\n  groupCreated(user: $user) {\n    blame {\n      id\n    }\n    group {\n      group_name\n      group_picture\n      id\n      is_group\n    }\n  }\n}"): (typeof documents)["subscription GroupCreated($user: Int) {\n  groupCreated(user: $user) {\n    blame {\n      id\n    }\n    group {\n      group_name\n      group_picture\n      id\n      is_group\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GroupList($limit: Int) {\n  groupList(limit: $limit) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"): (typeof documents)["query GroupList($limit: Int) {\n  groupList(limit: $limit) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GroupMembers($groupId: Int) {\n  groupMembers(group_id: $groupId) {\n    id\n    username\n    first_name\n    address\n    last_name\n    profile_img\n    section\n    age\n    gender\n  }\n}"): (typeof documents)["query GroupMembers($groupId: Int) {\n  groupMembers(group_id: $groupId) {\n    id\n    username\n    first_name\n    address\n    last_name\n    profile_img\n    section\n    age\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GroupRolesList($groupId: Int) {\n  groupRolesList(group_id: $groupId) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n    role_type\n    is_default\n  }\n}"): (typeof documents)["query GroupRolesList($groupId: Int) {\n  groupRolesList(group_id: $groupId) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n    role_type\n    is_default\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription GroupRolesUpdated($user: Int, $groupId: Int) {\n  groupRolesUpdated(user: $user, group_id: $groupId) {\n    newRoles {\n      id\n      role_name\n      emoji\n      description\n      group_id\n      role_type\n      is_default\n    }\n    group_id\n  }\n}"): (typeof documents)["subscription GroupRolesUpdated($user: Int, $groupId: Int) {\n  groupRolesUpdated(user: $user, group_id: $groupId) {\n    newRoles {\n      id\n      role_name\n      emoji\n      description\n      group_id\n      role_type\n      is_default\n    }\n    group_id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription GroupUpdate($user: Int) {\n  groupUpdate(user: $user) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"): (typeof documents)["subscription GroupUpdate($user: Int) {\n  groupUpdate(user: $user) {\n    id\n    group_name\n    group_picture\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Groups($userId: Int) {\n  groups(user_id: $userId) {\n    group_name\n    id\n    group_picture\n    is_group\n  }\n}"): (typeof documents)["query Groups($userId: Int) {\n  groups(user_id: $userId) {\n    group_name\n    id\n    group_picture\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query IsLoggedIn {\n  isLoggedIn {\n    isLogged\n    currentUser {\n      id\n      username\n      access_level\n    }\n  }\n}"): (typeof documents)["query IsLoggedIn {\n  isLoggedIn {\n    isLogged\n    currentUser {\n      id\n      username\n      access_level\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query LatestChats {\n  latestChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}"): (typeof documents)["query LatestChats {\n  latestChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}"];
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
export function graphql(source: "subscription MemberAdded($user: Int, $groupId: Int) {\n  memberAdded(user: $user, group_id: $groupId) {\n    blame {\n      id\n    }\n    users {\n      role {\n        id\n        group_id\n        role_name\n        role_type\n      }\n      user {\n        age\n        first_name\n        id\n        last_name\n        profile_img\n        username\n        section\n      }\n    }\n    group {\n      id\n      group_name\n      group_picture\n      is_group\n    }\n    group_roles {\n      id\n      role_name\n      group_id\n      role_type\n    }\n    usergroup_roles {\n      user_group_id\n      group_role_id\n    }\n    user_groups {\n      user_id\n      group_id\n    }\n  }\n}"): (typeof documents)["subscription MemberAdded($user: Int, $groupId: Int) {\n  memberAdded(user: $user, group_id: $groupId) {\n    blame {\n      id\n    }\n    users {\n      role {\n        id\n        group_id\n        role_name\n        role_type\n      }\n      user {\n        age\n        first_name\n        id\n        last_name\n        profile_img\n        username\n        section\n      }\n    }\n    group {\n      id\n      group_name\n      group_picture\n      is_group\n    }\n    group_roles {\n      id\n      role_name\n      group_id\n      role_type\n    }\n    usergroup_roles {\n      user_group_id\n      group_role_id\n    }\n    user_groups {\n      user_id\n      group_id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription MemberRemoved($user: Int, $groupId: Int) {\n  memberRemoved(user: $user, group_id: $groupId) {\n    blame {\n      id\n    }\n    group {\n      group_name\n      group_picture\n      id\n      is_group\n    }\n    user {\n      first_name\n      id\n      last_name\n      profile_img\n      username\n      section\n    }\n  }\n}"): (typeof documents)["subscription MemberRemoved($user: Int, $groupId: Int) {\n  memberRemoved(user: $user, group_id: $groupId) {\n    blame {\n      id\n    }\n    group {\n      group_name\n      group_picture\n      id\n      is_group\n    }\n    user {\n      first_name\n      id\n      last_name\n      profile_img\n      username\n      section\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "subscription MemberRolesUpdated($user: Int, $groupId: Int) {\n  memberRolesUpdated(user: $user, group_id: $groupId) {\n    newRoles\n    user {\n      id\n      username\n      first_name\n      last_name\n      profile_img\n    }\n    group_id\n    roles_ids\n  }\n}"): (typeof documents)["subscription MemberRolesUpdated($user: Int, $groupId: Int) {\n  memberRolesUpdated(user: $user, group_id: $groupId) {\n    newRoles\n    user {\n      id\n      username\n      first_name\n      last_name\n      profile_img\n    }\n    group_id\n    roles_ids\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query OtherUser($groupId: Int) {\n  otherUser(group_id: $groupId) {\n    id\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"): (typeof documents)["query OtherUser($groupId: Int) {\n  otherUser(group_id: $groupId) {\n    id\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveMember($groupId: Int, $userId: Int) {\n  removeMember(group_id: $groupId, user_id: $userId) {\n    id\n    first_name\n    last_name\n    section\n    profile_img\n    age\n    gender\n  }\n}"): (typeof documents)["mutation RemoveMember($groupId: Int, $userId: Int) {\n  removeMember(group_id: $groupId, user_id: $userId) {\n    id\n    first_name\n    last_name\n    section\n    profile_img\n    age\n    gender\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query SystemStats {\n  systemStats {\n    userCount\n    groupCount\n    userChatsCount\n  }\n}"): (typeof documents)["query SystemStats {\n  systemStats {\n    userCount\n    groupCount\n    userChatsCount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateGroup($groupName: String, $groupId: Int, $groupPicture: Upload) {\n  updateGroup(\n    group_name: $groupName\n    group_id: $groupId\n    group_picture: $groupPicture\n  ) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}"): (typeof documents)["mutation UpdateGroup($groupName: String, $groupId: Int, $groupPicture: Upload) {\n  updateGroup(\n    group_name: $groupName\n    group_id: $groupId\n    group_picture: $groupPicture\n  ) {\n    group_name\n    group_picture\n    id\n    is_group\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateGroupRoles($rolesToEdit: [RolesToEdit], $rolesToDelete: [Int], $groupId: Int) {\n  updateGroupRoles(\n    roles_to_edit: $rolesToEdit\n    roles_to_delete: $rolesToDelete\n    group_id: $groupId\n  ) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n    role_type\n    is_default\n  }\n}"): (typeof documents)["mutation UpdateGroupRoles($rolesToEdit: [RolesToEdit], $rolesToDelete: [Int], $groupId: Int) {\n  updateGroupRoles(\n    roles_to_edit: $rolesToEdit\n    roles_to_delete: $rolesToDelete\n    group_id: $groupId\n  ) {\n    id\n    role_name\n    emoji\n    description\n    group_id\n    role_type\n    is_default\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserGroupRoles($roles: [String], $groupId: Int, $userId: Int, $rolesIds: [Int]) {\n  updateUserGroupRoles(\n    roles: $roles\n    group_id: $groupId\n    user_id: $userId\n    roles_ids: $rolesIds\n  ) {\n    newRoles\n    user {\n      id\n      username\n      first_name\n      last_name\n      profile_img\n    }\n  }\n}"): (typeof documents)["mutation UpdateUserGroupRoles($roles: [String], $groupId: Int, $userId: Int, $rolesIds: [Int]) {\n  updateUserGroupRoles(\n    roles: $roles\n    group_id: $groupId\n    user_id: $userId\n    roles_ids: $rolesIds\n  ) {\n    newRoles\n    user {\n      id\n      username\n      first_name\n      last_name\n      profile_img\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdateUserProfile($username: String, $age: Int, $gender: String, $section: String, $address: String, $profileImg: Upload) {\n  updateUserProfile(\n    username: $username\n    age: $age\n    gender: $gender\n    section: $section\n    address: $address\n    profile_img: $profileImg\n  ) {\n    address\n    age\n    first_name\n    gender\n    last_name\n    profile_img\n    section\n    username\n  }\n}"): (typeof documents)["mutation UpdateUserProfile($username: String, $age: Int, $gender: String, $section: String, $address: String, $profileImg: Upload) {\n  updateUserProfile(\n    username: $username\n    age: $age\n    gender: $gender\n    section: $section\n    address: $address\n    profile_img: $profileImg\n  ) {\n    address\n    age\n    first_name\n    gender\n    last_name\n    profile_img\n    section\n    username\n  }\n}"];
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
export function graphql(source: "query UserChats {\n  userChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}"): (typeof documents)["query UserChats {\n  userChats {\n    id\n    message\n    user_id\n    receiver\n    message_type\n    createdAt\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query UserGroupRoles($userId: Int, $groupId: Int) {\n  userGroupRoles(user_id: $userId, group_id: $groupId)\n}"): (typeof documents)["query UserGroupRoles($userId: Int, $groupId: Int) {\n  userGroupRoles(user_id: $userId, group_id: $groupId)\n}"];
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
 */
export function graphql(source: "query Users($limit: Int) {\n  users(limit: $limit) {\n    id\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n    username\n  }\n}"): (typeof documents)["query Users($limit: Int) {\n  users(limit: $limit) {\n    id\n    first_name\n    last_name\n    address\n    section\n    profile_img\n    age\n    gender\n    username\n  }\n}"];

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
# Definitely Not A Chat App: PUPBC Chat Application

![DNCA Logo](./client/src/assets/logo.png)

Definitely Not A Chat App is a chat application system for Polytechnic University of the Philippines Biñan Campus

## Table of Contents

- [Features](#features)
  - [For regular users](#for-regular-users-eg-students)
  - [For admin level users](#for-admin-level-users-eg-teachers-developers)
- [How to setup and run application](#how-to-setup-and-run-application)
  - [Prerequisites](#prerequisites)
  - [How to develop and run locally](#how-to-develop-and-run-locally)
- [Contributors](#contributors)

## Features

### For Regular Users (e.g. Students)

- Real-time instant messaging
- Create group and private conversations
- Configure profile info
- View other profiles
- Search joined group conversations
- Create group roles for organization
- Report a conversation
- Search words in chat
- Add members to a conversation
- Edit a member's role in a conversation
- etc.

### For Admin Level Users (e.g. Teachers, Developers)

- View application statistics on administration panel
- View total number of users and conversations
- View the number of pending reports
- View the latest administrator action in logs
- View all of the application's users
- View all of the application's conversation details
- View system's logs
- View all of the reports with its details
- Review a report and set its status
- Register a new user
- etc.

## How to setup and run application

### Prerequisites

- Node.js version >= 18.11.0
- MYSQL server

### How to develop and run locally

1. Create a database named `dnca` and import the sql file (the file can be found on the developers)
2. Clone the repo
3. Create a `.env` file on both the client and the server directory. Make sure to use the `.env.example` as a reference for the required environment variables

- The files should be found on `client/.env` and `server/.env`

4. On root directory run:

```console
$ npm install
```

5. Then run:

```console
$ npm run dev
```

OR for front-end development only:

```console
$ cd client
$ npm run dev
```

OR for back-end development only:

```console
$ cd server
$ npm run dev
```

## Contributors

- [Clueless7](https://github.com/Clueless7)
- [Nestortion](https://github.com/Nestortion)

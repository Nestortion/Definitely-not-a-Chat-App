import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/Login'
import NotFound from './pages/NotFound/NotFound'
import Home from './pages/Home/Home'
import Chat from './pages/Chat/Chat'
import Profile from './pages/Profile/Profile'
import './globals.scss'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import {
  ApolloProvider,
  InMemoryCache,
  ApolloClient,
  ApolloLink,
  split,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import jwt_decode from 'jwt-decode'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { getAccessToken, setAccessToken } from './graphql/authStore.js'
import { apiBasePath, wsBasePath } from './data/config'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import ProfileSettings from './pages/ProfileSettings/ProfileSettings'
import AdminRoute from './components/AdminRoute/AdminRoute'
import Admin from './pages/Admin/Admin'
import AdminControlPanel from './pages/Admin/AdminControlPanel/AdminControlPanel'
import AdminUsersList from './pages/Admin/AdminUsersList/AdminUsersList'
import AdminGroupsList from './pages/Admin/AdminGroupsList/AdminGroupsList'
import UserLogs from './pages/Admin/UserLogs/UserLogs'
import AdminLogs from './pages/Admin/AdminLogs/AdminLogs'
import Reports from './pages/Admin/Reports/Reports'
import Report from './pages/Admin/Reports/Report/Report'
import SoloGroup from './pages/Admin/AdminGroupsList/SoloGroup/SoloGroup'
import Register from './pages/Admin/Register/Register'
import Maintenance from './pages/Maintenance/Maintenance'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/chat/:chatId',
        element: <Chat />,
      },
      {
        path: '/profile/:profileId',
        element: <Profile />,
      },
      {
        path: '/profile-settings',
        element: <ProfileSettings />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <Admin />
      </AdminRoute>
    ),
    children: [
      {
        path: '/admin',
        element: <AdminControlPanel />,
      },
      {
        path: '/admin/users',
        element: <AdminUsersList />,
      },
      {
        path: '/admin/groups',
        element: <AdminGroupsList />,
      },
      {
        path: '/admin/groups/:groupId',
        element: <SoloGroup />,
      },
      {
        path: '/admin/user-logs',
        element: <UserLogs />,
      },
      {
        path: '/admin/admin-logs',
        element: <AdminLogs />,
      },
      {
        path: '/admin/reports',
        element: <Reports />,
      },
      {
        path: '/admin/reports/:reportId',
        element: <Report />,
      },
      {
        path: '/admin/register',
        element: <Register />,
      },
      {
        path: '/admin/maintenance',
        element: <Maintenance />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const refreshTokenLink = new TokenRefreshLink({
  accessTokenField: 'accessToken',
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    if (!token) {
      return true
    }
    try {
      const { exp } = jwt_decode(token)
      if (Date.now() >= exp * 1000) {
        return false
      }
    } catch {
      return true
    }
  },
  fetchAccessToken: () => {
    return fetch(`${apiBasePath}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    })
  },
  handleFetch: (accessToken) => {
    setAccessToken(accessToken)
  },

  handleError: (err) => {
    console.warn('token is invalid or expired')
    console.log(err)
  },
})

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const accessToken = getAccessToken()
    return {
      headers: {
        ...headers,
        authorization: `bearer ${accessToken}`,
      },
    }
  })

  return forward(operation)
})

const uploadlink = createUploadLink({
  uri: `${apiBasePath}/graphql`,
  credentials: 'include',
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${wsBasePath}/graphql`,
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  ApolloLink.from([refreshTokenLink, authLink, uploadlink])
)

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        userRoles: {
          merge(existing, incoming) {
            return incoming
          },
        },
        groupRolesList: {
          merge(existing, incoming) {
            return incoming
          },
        },
        userGroupRoles: {
          merge(existing, incoming) {
            return incoming
          },
        },
        report: {
          merge(existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  link: splitLink,
  cache,
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)

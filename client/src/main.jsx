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
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import jwt_decode from 'jwt-decode'
import { TokenRefreshLink } from 'apollo-link-token-refresh'
import { getAccessToken, setAccessToken } from './graphql/authStore.js'

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
    ],
  },
  {
    path: '/login',
    element: <Login />,
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
    return fetch('http://localhost:4000/refresh_token', {
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
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
})

const client = new ApolloClient({
  link: ApolloLink.from([refreshTokenLink, authLink, uploadlink]),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
)

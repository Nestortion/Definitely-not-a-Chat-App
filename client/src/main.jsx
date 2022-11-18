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
import { AuthContextProvider } from './contexts/AuthContext'
import { ChatContextProvider } from './contexts/ChatContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ChatContextProvider>
        <RouterProvider router={router} />
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)

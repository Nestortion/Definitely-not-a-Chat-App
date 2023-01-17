import { Navigate } from 'react-router-dom'

export default function AdminRoute({ children }) {
  const user = { isLoggedIn: true, isAdmin: true }

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />
  }

  if (user.isLoggedIn && !user.isAdmin) {
    return <Navigate to="/" />
  }

  return children
}

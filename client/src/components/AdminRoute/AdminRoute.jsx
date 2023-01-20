import { Navigate } from 'react-router-dom'
import { useIsLoggedInQuery } from '../../graphql/hooks/graphql'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'

export default function AdminRoute({ children }) {
  const { data: user, loading, error } = useIsLoggedInQuery()

  if (loading) return <LoadingSpinner />
  if (error) return <Navigate to="/" />

  if (!user.isLoggedIn.isLogged) {
    return <Navigate to="/login" />
  }

  if (user.isLoggedIn.currentUser.access_level !== 'ADMIN') {
    return <Navigate to="/" />
  }

  return children
}

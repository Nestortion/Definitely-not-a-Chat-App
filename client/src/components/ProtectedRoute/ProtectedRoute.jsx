import { Navigate } from 'react-router-dom'
import { useIsLoggedInQuery } from '../../graphql/hooks/graphql'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'

export default function ProtectedRoute({ children }) {
  const { data: isLogged, loading, error } = useIsLoggedInQuery()

  if (loading) return <LoadingSpinner />
  if (error) return <Navigate to="/login" />

  if (isLogged?.isLoggedIn.isLogged === false) {
    return <Navigate to="/login" />
  }

  return children
}

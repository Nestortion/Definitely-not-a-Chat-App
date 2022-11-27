import { Navigate } from 'react-router-dom'
import { useIsLoggedInQuery } from '../../graphql/hooks/graphql'

export default function ProtectedRoute({ children }) {
  const { data: isLogged, loading, error } = useIsLoggedInQuery()

  if (loading) return <h1>loading</h1>
  if (error) return <Navigate to="/login" />

  if (isLogged?.isLoggedIn === false) {
    return <Navigate to="/login" />
  }

  return children
}

import { Navigate } from 'react-router-dom'
import { useIsLoggedInQuery } from '../../graphql/hooks/graphql'
import LoadingText from '../Loading/LoadingText'

export default function ProtectedRoute({ children }) {
  const { data: isLogged, loading, error } = useIsLoggedInQuery()

  if (loading) return <LoadingText></LoadingText>
  if (error) return <Navigate to="/login" />

  if (isLogged?.isLoggedIn === false) {
    return <Navigate to="/login" />
  }

  return children
}

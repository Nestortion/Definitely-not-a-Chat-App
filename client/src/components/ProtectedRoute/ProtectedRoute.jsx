import { Navigate } from 'react-router-dom'
import { useIsLoggedInQuery } from '../../graphql/hooks/graphql'

export default function ProtectedRoute({ children }) {
  const { data: isLogged } = useIsLoggedInQuery()

  if (isLogged?.isLoggedIn === false) {
    return <Navigate to="/login" />
  }

  return children
}

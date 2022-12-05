import './navbar.scss'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'
import { useCurrentUserQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
// ! TEMPORARY DATA ONLY
// data should come from api
// ! FETCH HERE
// user from global state

export default function NavBar({ onClick, showOnlyMiddle }) {
  const { data, loading, error } = useCurrentUserQuery()

  if (loading) return <LoadingSpinner></LoadingSpinner>
  if (error) return <ErrorText>Something went wrong</ErrorText>
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" onClick={onClick}>
          <span>DNCA</span>
        </Link>
      </div>
      <div className="right">
        <UserCard showOnlyMiddle={showOnlyMiddle} {...data.currentUser} />
      </div>
    </div>
  )
}

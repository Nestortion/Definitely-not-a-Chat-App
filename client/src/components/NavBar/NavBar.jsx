import './navbar.scss'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'
import { useCurrentUserQuery } from '../../graphql/hooks/graphql'
// ! TEMPORARY DATA ONLY
// data should come from api
// ! FETCH HERE
// user from global state

export default function NavBar({ onClick }) {
  const { data, loading, error } = useCurrentUserQuery()

  if (loading) return <h1>loading...</h1>
  if (error) return <Error>Something went wrong</Error>
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" onClick={onClick}>
          <span>DNCA</span>
        </Link>
      </div>
      <div className="right">
        <UserCard {...data.currentUser} />
      </div>
    </div>
  )
}

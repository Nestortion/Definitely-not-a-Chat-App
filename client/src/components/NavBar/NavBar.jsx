import './navbar.scss'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'
import { useCurrentUserQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../Error/ErrorText'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import logo from '../../assets/logo.png'

export default function NavBar({ onClick, showOnlyMiddle }) {
  const { data, loading, error } = useCurrentUserQuery()

  if (loading) return <LoadingSpinner></LoadingSpinner>
  if (error) return <ErrorText>Something went wrong</ErrorText>
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" onClick={onClick}>
          <img src={logo} alt="DNCA's logo" />
          <span className="fw-bold fs-500 text-primary-400">DNCA</span>
        </Link>
      </div>
      <div className="right">
        <UserCard showOnlyMiddle={showOnlyMiddle} {...data.currentUser} />
      </div>
    </div>
  )
}

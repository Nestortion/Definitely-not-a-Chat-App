import './navbar.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'
import UserCard from '../UserCard/UserCard'

export default function NavBar() {
  const { user, setUser } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <span>DNCA</span>
        </Link>
      </div>
      <div className="right">
        <UserCard {...user} />
      </div>
    </div>
  )
}

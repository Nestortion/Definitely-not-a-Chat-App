import './navbar.scss'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../contexts/AuthContext'

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
        {/* TODO: create UserCard? component */}
        <div className="user-card">
          <img src={user.profilePic} alt="Profile" />
          <span>{user.username}</span>
        </div>
      </div>
    </div>
  )
}

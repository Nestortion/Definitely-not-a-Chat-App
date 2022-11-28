import './navbar.scss'
import { Link } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'
// ! TEMPORARY DATA ONLY
// data should come from api
// ! FETCH HERE
// user from global state
const user = {
  userId: '1',
  username: 'John Doe',
  profilePicUrl:
    'https://images.pexels.com/photos/12050399/pexels-photo-12050399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
}

export default function NavBar({ onClick }) {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" onClick={onClick}>
          <span>DNCA</span>
        </Link>
      </div>
      <div className="right">
        <UserCard {...user} />
      </div>
    </div>
  )
}

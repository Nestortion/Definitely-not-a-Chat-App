import './navbar.scss'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className="navbar">
      <div className="left">
        <Link to="/">
          <span>DNCA</span>
        </Link>
      </div>
      <div className="right">
        <div>User Image</div>
        <div>John Doe</div>
      </div>
    </div>
  )
}

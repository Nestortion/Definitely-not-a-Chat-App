import { MdClose } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './sliding-menu.scss'

export default function SlidingMenu({ closeMenu }) {
  const handleClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div className="sliding-menu" onClick={closeMenu}>
      <div className="sliding-menu__main" onClick={handleClick}>
        <div className="sliding-menu__heading-container">
          <p className="sliding-menu__heading fw-bold">Admin Actions</p>
        </div>

        <ul className="sliding-menu__actions-container">
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin">
              Control Panel
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/users">
              Users List
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/groups">
              Groups List
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/user-logs">
              User Logs
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/admin-logs">
              Admin Logs
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/reports">
              Reports
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/register">
              Register User
            </Link>
          </li>
        </ul>
        <button className="sliding-menu__close-button" onClick={closeMenu}>
          <MdClose color="var(--clr-neutral-100)" size={36} />
        </button>
      </div>
    </div>
  )
}

import {
  MdClose,
  MdGroups,
  MdLeaderboard,
  MdList,
  MdListAlt,
  MdNotes,
  MdPersonAdd,
  MdReport,
  MdShield,
} from 'react-icons/md'
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
              <span className="sliding-menu__span">
                <MdLeaderboard size={24} />
                Control Panel
              </span>
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/users">
              <span className="sliding-menu__span">
                <MdListAlt size={24} />
                Users List
              </span>
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/groups">
              <span className="sliding-menu__span">
                <MdGroups size={24} />
                Groups List
              </span>
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/user-logs">
              <span className="sliding-menu__span">
                <MdNotes size={24} />
                User Logs
              </span>
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/admin-logs">
              <span className="sliding-menu__span">
                <MdShield size={24} />
                Admin Logs
              </span>
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/reports">
              <span className="sliding-menu__span">
                <MdReport size={24} />
                Reports
              </span>
            </Link>
          </li>
          <li className="sliding-menu__action">
            <Link onClick={closeMenu} to="/admin/register">
              <span className="sliding-menu__span">
                <MdPersonAdd size={24} />
                Register User
              </span>
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

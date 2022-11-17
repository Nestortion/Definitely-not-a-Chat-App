import { Outlet } from 'react-router-dom'
import LeftBar from '../LeftBar/LeftBar'
import NavBar from '../NavBar/NavBar'
import RightBar from '../RightBar/RightBar'
import './layout.scss'

export default function Layout() {
  return (
    <div className="layout">
      <NavBar />
      <div className="main">
        <div className="left">
          <LeftBar />
        </div>
        <div className="middle">
          <Outlet />
        </div>
        <div className="right">
          <RightBar />
        </div>
      </div>
    </div>
  )
}

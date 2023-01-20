import { Outlet } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'
import './admin.scss'

export default function Admin() {
  return (
    <div className="admin-layout">
      <NavBar />
      <div className="admin-layout__main">
        <Outlet />
      </div>
    </div>
  )
}

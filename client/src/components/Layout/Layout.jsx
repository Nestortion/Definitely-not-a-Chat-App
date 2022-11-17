import { Outlet } from 'react-router-dom'
import LeftBar from '../LeftBar/LeftBar'
import NavBar from '../NavBar/NavBar'
import RightBar from '../RightBar/RightBar'

export default function Layout() {
  return (
    <>
      <NavBar />
      <div>
        <LeftBar />
        <Outlet />
        <RightBar />
      </div>
    </>
  )
}

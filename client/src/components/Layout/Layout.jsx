import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LeftBar from '../LeftBar/LeftBar'
import NavBar from '../NavBar/NavBar'
import RightBar from '../RightBar/RightBar'
import './layout.scss'

export default function Layout() {
  const location = useLocation()

  const isInChatPage = location.pathname.split('/')[1] === 'chat'
  const [leftShouldShow, setLeftShouldShow] = useState(true)
  const [middleShouldShow, setMiddleShouldShow] = useState(true)
  const [rightShouldShow, setRightShouldShow] = useState(false)

  useEffect(() => {
    setRightShouldShow(isInChatPage)
  }, [isInChatPage])

  return (
    <div className="layout">
      <NavBar />
      <div className="main">
        {leftShouldShow && (
          <div className="left">
            <LeftBar />
          </div>
        )}
        {middleShouldShow && (
          <div className="middle">
            <Outlet />
          </div>
        )}
        {rightShouldShow && (
          <div className="right">
            <RightBar />
          </div>
        )}
      </div>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LeftBar from '../LeftBar/LeftBar'
import NavBar from '../NavBar/NavBar'
import RightBar from '../RightBar/RightBar'
import './layout.scss'
import { useMediaQuery } from 'react-responsive'

export default function Layout() {
  const location = useLocation()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  const isInChatPage = location.pathname.split('/')[1] === 'chat'

  const [leftShouldShow, setLeftShouldShow] = useState(true)
  const [middleShouldShow, setMiddleShouldShow] = useState(true)
  const [rightShouldShow, setRightShouldShow] = useState(false)

  // On desktop only show rightbar when in chat page
  useEffect(() => {
    if (!isTabletOrMobile && isInChatPage) {
      setRightShouldShow(true)
    } else {
      setRightShouldShow(false)
    }
  }, [isInChatPage, isTabletOrMobile])

  // On tablet or mobile only show leftbar first
  useEffect(() => {
    if (isTabletOrMobile) {
      setMiddleShouldShow(false)
      setRightShouldShow(false)
    }
  }, [])

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

import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LeftBar from '../LeftBar/LeftBar'
import NavBar from '../NavBar/NavBar'
import RightBar from '../RightBar/RightBar'
import './layout.scss'
import { useMediaQuery } from 'react-responsive'
import Button from '../UI/Button/Button'

export default function Layout() {
  const location = useLocation()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  const isInChatPage = location.pathname.split('/')[1] === 'chat'

  const [leftShouldShow, setLeftShouldShow] = useState(true)
  const [middleShouldShow, setMiddleShouldShow] = useState(true)
  const [rightShouldShow, setRightShouldShow] = useState(false)

  const showOnlyLeft = () => {
    setLeftShouldShow(true)
    setMiddleShouldShow(false)
    setRightShouldShow(false)
  }

  const showOnlyMiddle = () => {
    setLeftShouldShow(false)
    setMiddleShouldShow(true)
    setRightShouldShow(false)
  }

  const showOnlyRight = () => {
    setLeftShouldShow(false)
    setMiddleShouldShow(false)
    setRightShouldShow(true)
  }

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
      showOnlyLeft()
    }
  }, [])

  return (
    <div className="layout">
      <NavBar
        onClick={() => {
          if (isTabletOrMobile) showOnlyLeft()
        }}
      />
      <div className="main">
        {leftShouldShow && (
          <div
            className="left"
            onClick={() => {
              if (isTabletOrMobile) showOnlyMiddle()
            }}
          >
            <LeftBar />
          </div>
        )}

        {middleShouldShow && (
          <div className="middle">
            {isTabletOrMobile && (
              <div className="middle__button-group">
                <Button onClick={showOnlyLeft}>back</Button>
                <Button onClick={showOnlyRight}>settings</Button>
              </div>
            )}
            <Outlet />
          </div>
        )}

        {rightShouldShow && (
          <div className="right">
            {isTabletOrMobile && (
              <div className="right__button-group">
                <Button onClick={showOnlyMiddle}>back</Button>
              </div>
            )}
            <RightBar />
          </div>
        )}
      </div>
    </div>
  )
}

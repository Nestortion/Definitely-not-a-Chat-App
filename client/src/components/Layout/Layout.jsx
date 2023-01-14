import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import LeftBar from '../LeftBar/LeftBar'
import NavBar from '../NavBar/NavBar'
import RightBar from '../RightBar/RightBar'
import './layout.scss'
import { useMediaQuery } from 'react-responsive'
import Button from '../UI/Button/Button'
import { useCurrentUserQuery } from '../../graphql/hooks/graphql'
import LoadingSpinner from '../Loading/LoadingSpinner/LoadingSpinner'
import ErrorText from '../Error/ErrorText'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export default function Layout() {
  const location = useLocation()
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 961px)' })

  const isInChatPage = location.pathname.split('/')[1] === 'chat'
  const isInProfilePage = location.pathname.split('/')[1] === 'profile'

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

  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Something went wrong</ErrorText>

  return (
    <div className="layout">
      <NavBar
        onClick={() => {
          if (isTabletOrMobile) showOnlyLeft()
        }}
        showOnlyMiddle={showOnlyMiddle}
      />
      <div className="main">
        {leftShouldShow && (
          <div className="left">
            {/* TODO: need to prop drill showMiddleOnly to ChatListItem */}
            <LeftBar user={user} showOnlyMiddle={showOnlyMiddle} />
          </div>
        )}

        {middleShouldShow && (
          <div className="middle">
            {isTabletOrMobile && isInChatPage && (
              <div className="middle__button-group">
                <Button onClick={showOnlyLeft}>back</Button>
                <Button onClick={showOnlyRight}>settings</Button>
              </div>
            )}
            <Outlet context={user} />
          </div>
        )}

        {rightShouldShow && (
          <div className="right">
            {isTabletOrMobile && (
              <div className="right__button-group">
                <Button onClick={showOnlyMiddle}>back</Button>
              </div>
            )}
            <RightBar showOnlyMiddle={showOnlyMiddle} />
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  )
}

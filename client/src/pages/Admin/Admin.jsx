import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminActions from '../../components/AdminActions/AdminActions'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import NavBar from '../../components/NavBar/NavBar'
import SlidingMenu from '../../components/UI/SlidingMenu/SlidingMenu'
import { apiBasePath } from '../../data/config'
import { setAccessToken } from '../../graphql/authStore'
import './admin.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Provider } from 'jotai'
import { useCurrentUserQuery } from '../../graphql/hooks/graphql'
import ErrorText from '../../components/Error/ErrorText'

export default function Admin() {
  const [menuShouldShow, setMenuShouldShow] = useState(false)
  const [loading, setLoading] = useState(true)

  const toggleMenu = () => {
    setMenuShouldShow((prev) => !prev)
  }

  const openMenu = () => {
    setMenuShouldShow(true)
  }

  const closeMenu = () => {
    setMenuShouldShow(false)
  }
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useCurrentUserQuery()

  useEffect(() => {
    fetch(`${apiBasePath}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      const accessToken = await res.json()
      setAccessToken(accessToken.accessToken)
      setLoading(false)
    })
  }, [])

  if (userLoading) return <LoadingSpinner />
  if (userError) return <ErrorText>Something went wrong</ErrorText>
  if (loading) return <LoadingSpinner />
  return (
    <div className="admin-layout">
      <NavBar />
      {menuShouldShow && <SlidingMenu closeMenu={closeMenu} />}
      <div className="admin-layout__main">
        <Outlet context={{ openMenu, closeMenu, user }} />
      </div>
      <AdminActions isOpen={menuShouldShow} openMenu={toggleMenu} />
      <ToastContainer />
    </div>
  )
}

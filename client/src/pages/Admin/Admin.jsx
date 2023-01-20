import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import LoadingSpinner from '../../components/Loading/LoadingSpinner/LoadingSpinner'
import NavBar from '../../components/NavBar/NavBar'
import { apiBasePath } from '../../data/config'
import { setAccessToken } from '../../graphql/authStore'
import './admin.scss'

export default function Admin() {
  const [loading, setLoading] = useState(true)
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

  if (loading) return <LoadingSpinner />
  return (
    <div className="admin-layout">
      <NavBar />
      <div className="admin-layout__main">
        <Outlet />
      </div>
    </div>
  )
}

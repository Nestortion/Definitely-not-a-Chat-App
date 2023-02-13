import { useState } from 'react'
import { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import { setAccessToken } from './graphql/authStore'
import { apiBasePath } from './data/config'
import LoadingSpinner from './components/Loading/LoadingSpinner/LoadingSpinner'
import { atom, Provider } from 'jotai'
import { useNavigate } from 'react-router-dom'

export const searchInput = atom('')
export const isSearching = atom(false)

export default function App() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    fetch(`${apiBasePath}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      const accessToken = await res.json()
      if (accessToken.message) {
        navigate('/login')
      }
      setAccessToken(accessToken.accessToken)
      setLoading(false)
    })
  }, [])

  if (loading) return <LoadingSpinner />

  return <Layout />
}

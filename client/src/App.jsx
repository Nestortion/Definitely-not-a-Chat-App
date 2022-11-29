import { useState } from 'react'
import { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import { setAccessToken } from './graphql/authStore'
import { apiBasePath } from './data/config'

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`${apiBasePath}/refresh_token`, {
      method: 'POST',
      credentials: 'include',
    }).then(async (res) => {
      const accessToken = await res.json()
      setAccessToken(accessToken)
      setLoading(false)
    })
  }, [])

  if (loading) return <h1>loading...</h1>

  return (
    <>
      <Layout />
    </>
  )
}

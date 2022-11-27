import { useState } from 'react'
import { useEffect } from 'react'
import Layout from './components/Layout/Layout'
import { setAccessToken } from './graphql/authStore'

export default function App() {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
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

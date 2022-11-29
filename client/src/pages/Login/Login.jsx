import styles from './Login.scss'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { useState } from 'react'
import {
  useLoginMutation,
  useIsLoggedInQuery,
} from '../../graphql/hooks/graphql'
import { setAccessToken } from '../../graphql/authStore'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { error: loginError }] = useLoginMutation()
  const { data: isLogged, loading: isLoggedLoading } = useIsLoggedInQuery()
  const navigate = useNavigate()

  const loginSubmitHandle = async (e) => {
    e.preventDefault()
    const loginData = await login({ variables: { username, password } })
    if (loginData) {
      setAccessToken(loginData.data.login.access_token)
      navigate('/')
    }
  }

  if (isLoggedLoading) return <div>loading</div>
  if (isLogged?.isLoggedIn === true) return <Navigate to="/" />

  return (
    <div className="login bg-primary-400">
      <div className="card bg-neutral-100">
        <div className="left text-neutral-100">
          <h1 className="fw-bold">DNCA</h1>
          <p className="fw-regular">
            DNCA (Definitely not a chat app) is a Chat Application System for
            Polytechnic University of the Philippines Biñan Campus
          </p>
        </div>
        <div className="right">
          <h1 className="text-primary-400 fw-bold">Login</h1>
          <form onSubmit={loginSubmitHandle}>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <Input
              id="password"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            {loginError && (
              <span className="text-error-400">
                Invalid Username or Password
              </span>
            )}
            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

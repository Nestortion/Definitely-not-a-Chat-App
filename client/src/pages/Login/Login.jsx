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
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate
            possimus tempora molestias autem nisi doloremque ipsam labore dolor
            rerum nihil!
          </p>
        </div>
        <div className="right">
          <h1>Login</h1>
          {loginError && <h1>Invalid Username or Password</h1>}
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
            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

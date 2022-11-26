import styles from './Login.scss'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { useState } from 'react'
import {
  useLoginMutation,
  useIsLoggedInQuery,
} from '../../graphql/hooks/graphql'
import { setAccessToken } from '../../graphql/authStore'
import { Navigate } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data, loading, error }] = useLoginMutation()
  const { data: isLogged } = useIsLoggedInQuery()

  const loginSubmitHandle = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
    setAccessToken(data?.login.access_token)
  }

  // if (isLogged?.isLoggedIn === true) {
  //   return <Navigate to="/" />
  // }

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

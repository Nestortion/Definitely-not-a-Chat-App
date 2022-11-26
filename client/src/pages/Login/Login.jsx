import styles from './Login.scss'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { useState } from 'react'
import { useLoginMutation } from '../../graphql/hooks/graphql'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()

  const loginSubmitHandle = (e) => {
    e.preventDefault()
    login({ variables: { username, password } })
  }

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
          <form>
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
            <button onClick={loginSubmitHandle}>Login</button>
          </form>
        </div>
      </div>
    </div>
  )
}

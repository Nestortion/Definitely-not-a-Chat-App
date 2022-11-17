import styles from './Login.scss'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

export default function Login() {
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
            <Input id="username" type="text" placeholder="Username" />
            <Input id="password" type="password" placeholder="Password" />
            <Button>Submit</Button>
          </form>
        </div>
      </div>
    </div>
  )
}

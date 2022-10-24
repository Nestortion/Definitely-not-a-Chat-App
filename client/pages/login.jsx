import Image from 'next/image'
import LoginLayout from '../components/LoginLayout'
import sniffa from '../components/Assets/sniffa.jpg'
import LoginStyled from '../components/styles/LoginStyled'

export default function Login() {
  return (
    <LoginStyled>
      <div className="login">
        <div className="container">
          <div className="header">
            Tagline
            <div className="description">
              Lorem ipsum dolor sit amet, eu duis gloriatur mnesarchum pri,
              omnium legendos neglegentur ex sit, qui summo error ne omnis.
            </div>
          </div>
          <form>
            <div className="fields">
              <input type="text" id="username" placeholder="Username" />

              <input type="password" id="password" placeholder="Password" />
            </div>
            <div className="options">
              <button type="submit">Log in</button>
              <span>Forgot Password?</span>
              <div className="stayLogged">
                <input type="checkbox" />
                <span>Keep me signed in</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="image">
        <Image src={sniffa} height={800} width={800} />
      </div>
    </LoginStyled>
  )
}

Login.getLayout = LoginLayout

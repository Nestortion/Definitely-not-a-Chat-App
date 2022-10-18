import Image from 'next/image'
import LoginLayout from '../components/LoginLayout'
import LoginStyled from '../components/styles/Login/LoginStyled'
import sniffa from '../components/Assets/sniffa.jpg'

export default function Login() {
  return (
    <LoginStyled>
      <div className="login">
        <div className="container">
          <div className="header">
            Tagline
            <div className="description">
              IDK how to call this? Secondary Tagline?
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

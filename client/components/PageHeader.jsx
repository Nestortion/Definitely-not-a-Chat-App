import logo from './Assets/logo.svg'
import Image from 'next/image'
import PageHeaderStyled from './styles/PageHeaderStyled'
import pfp from './Assets/profile.svg'

export default function PageHeader({ type }) {
  if (type === 'login') {
    return (
      <PageHeaderStyled page="login">
        <div className="logo">
          <Image src={logo} height={50} width={40} />
        </div>
      </PageHeaderStyled>
    )
  } else if (type === 'main') {
    return (
      <PageHeaderStyled>
        <div className="logo">
          <Image src={logo} height={40} width={40} />
        </div>
        <div className="pfp">
          <Image src={pfp} height={32} width={32} />
        </div>
      </PageHeaderStyled>
    )
  }
}

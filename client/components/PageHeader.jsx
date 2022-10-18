import logo from './Assets/logo.svg'
import Image from 'next/image'
import PageHeaderStyled from './styles/PageHeaderStyled'

export default function PageHeader({ type }) {
  if (type === 'login') {
    return (
      <PageHeaderStyled>
        <div className="login">
          <Image src={logo} height={50} width={40} />
        </div>
      </PageHeaderStyled>
    )
  } else if (type === 'main') {
    return (
      <PageHeaderStyled>
        <div className="main">
          <Image src={logo} height={40} width={40} />
        </div>
      </PageHeaderStyled>
    )
  }
}

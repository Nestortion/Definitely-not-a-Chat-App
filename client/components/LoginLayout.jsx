import GlobalStyle from './styles/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import Theme from './styles/Theme'
import PageHeader from './PageHeader'

export default function LoginLayout(page) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <PageHeader type="login" />
      {page}
    </ThemeProvider>
  )
}

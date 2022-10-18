import { ThemeProvider } from 'styled-components'
import MainLayout from '../components/MainLayout'
import GlobalStyle from '../components/styles/GlobalStyle'
import Theme from '../components/styles/Theme'

function MyApp({ Component, pageProps }) {
  if (!Component.getLayout) {
    return (
      <>
        <ThemeProvider theme={Theme}>
          <GlobalStyle />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ThemeProvider>
      </>
    )
  } else {
    return Component.getLayout(<Component {...pageProps} />)
  }
}

export default MyApp

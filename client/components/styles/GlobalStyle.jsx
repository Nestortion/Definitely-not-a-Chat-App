import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    body{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
        background-color: ${({ theme }) => theme.colors.backGround};
        font-family: Roboto condensed;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.foreGround};
    }
    
`

export default GlobalStyle

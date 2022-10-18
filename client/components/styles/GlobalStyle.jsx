import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
    }
    html{
        height: 100%;
        width: 100%;
    }

    body{
        padding: 0;
        margin: 0;
        height: 100%;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.backGround};
        font-family: ${({ theme }) => theme.font.fontFamily};
        color: ${({ theme }) => theme.colors.foreGround};
    
    #__next{
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    }
    
    
`

export default GlobalStyle

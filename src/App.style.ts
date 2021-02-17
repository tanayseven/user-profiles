import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    html {
        height: 100%;
    }
    
    body {
        margin: 0;
        padding: 0 20px;
        display: flex;
        justify-content: center;
    }
    
    * {
        font-family: sans-serif;
    }
`

import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    a {
      color: ${(props) => props.theme.colors.black};
      text-decoration: none; /* no underline */
    }
  }
  body {
    margin: 0;
    font-family: 'Montserrat', 'Verdana', sans-serif;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
  }
  body html #root {
    height: 100%;
  }
`

export default GlobalStyle

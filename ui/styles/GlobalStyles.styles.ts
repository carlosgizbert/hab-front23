import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }
  body {
    margin: 0;
    font-family: 'Metropolis', 'Montserrat', 'Verdana', sans-serif;
    -webkit-font-smoothing: antialiased !important;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${(props) => props.theme.colors.neutral_70};
    color: ${(props) => props.theme.colors.info_130};
  }
  body html #root {
    height: 100%;
  }
  :root {
    .Toastify__toast-container {
      width: fit-content;
    }
    .Toastify__toast--success {
      .Toastify__toast-body {
        .Toastify__toast-icon svg {
          fill: ${(props) => props.theme.colors.sucess_100};
        }
      }
    }
    .Toastify__progress-bar--success {
      background: ${(props) => props.theme.colors.sucess_100};
    }
    .Toastify__toast--error {
      .Toastify__toast-body {
        .Toastify__toast-icon svg {
          fill: ${(props) => props.theme.colors.error_100};
        }
      }
    }
    .Toastify__progress-bar--error {
      background: ${(props) => props.theme.colors.error_100};
    }
  }
`

export default GlobalStyle

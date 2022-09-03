import React from 'react'
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from '@/styles/GlobalStyles.styles'
import themes from '../../styles/themes'
// Or Create your Own theme:
const CUSTOM_MUI_THEME = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
      dark: themes.easy.colors.error_90,
      light: themes.easy.colors.error_90,
    },
  },
})

function ThemeStyled({ children }: any) {
  return (
    <ThemeProvider theme={themes.easy}>
      <GlobalStyle />
      <MuiThemeProvider theme={CUSTOM_MUI_THEME}>{children}</MuiThemeProvider>
    </ThemeProvider>
  )
}

export default ThemeStyled

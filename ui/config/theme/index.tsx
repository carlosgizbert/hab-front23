import React from 'react'
import { ThemeProvider } from 'styled-components'

import themes from '../../styles/themes'

function Theme({ children }: any) {
  return <ThemeProvider theme={themes.easy}>{children}</ThemeProvider>
}

export default Theme

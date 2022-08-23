import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Theme from '@/config/theme'
import GlobalStyle from '@/styles/GlobalStyles.styles'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <GlobalStyle />
        <Component {...pageProps} />
    </Theme>
  )
}

export default MyApp

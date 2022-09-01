import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import ThemeStyled from '@/config/theme'
import GlobalStyle from '@/styles/GlobalStyles.styles'
import Script from 'next/script'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeStyled>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <header>
          <Script
            type="text/javascript"
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDbL7Ty4i6Dbu76TaWN_8WQxWOFuI3zq6E&libraries=places"
          />
        </header>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeStyled>
  )
}

export default MyApp

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
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeStyled>
  )
}

export default MyApp

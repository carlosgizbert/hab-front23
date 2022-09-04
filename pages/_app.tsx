import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import ThemeStyled from '@/config/theme'
import Loading from '@/ui/pages/LoadingView'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeStyled>
      <Loading />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeStyled>
  )
}

export default MyApp

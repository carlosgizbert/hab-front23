import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import ThemeStyled from '@/config/theme'
import Loading from '@/ui/pages/LoadingView'
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'GTM-MHW8MZX',
    }
    TagManager.initialize(tagManagerArgs)
  }, [])

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

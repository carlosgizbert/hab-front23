import { useEffect } from 'react'
import { DefaultSeo } from 'next-seo'
import { SEO } from 'next-seo-config'
import type { AppProps } from 'next/app'

import { QueryClient, QueryClientProvider } from 'react-query'
import ThemeStyled from '@/config/theme'
import Loading from '@/ui/pages/LoadingView'
import TagManager, { TagManagerArgs } from 'react-gtm-module'
import Head from 'next/head'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  const tagManagerArgs: TagManagerArgs = {
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  }
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="_im2HbQGXbIVjNq2f94ovfQ3leY3MFNQAAdtLVTM2C8"
        />
      </Head>
      <DefaultSeo {...SEO} />
      <ThemeStyled>
        <Loading />
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </ThemeStyled>
    </>
  )
}

export default MyApp

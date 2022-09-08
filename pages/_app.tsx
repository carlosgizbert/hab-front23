import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'

import ThemeStyled from '@/config/theme'
import Loading from '@/ui/pages/LoadingView'
import Script from 'next/script'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeStyled>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
        >(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-MHW8MZX');`}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MHW8MZX"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
          }}
        />
      </Script>
      <Loading />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ThemeStyled>
  )
}

export default MyApp

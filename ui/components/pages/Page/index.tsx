import { NextSeo } from 'next-seo'
import { ReactNode } from 'react'

interface IPage {
  title?: string
  description?: string
  path: string
  children: ReactNode | ReactNode[]
}

export default function Page({ title, description, path, children }: IPage) {
  const url = `https://habilita.app/${path}`

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://www.habilita.app/"
        openGraph={{
          url,
          title,
          description,
          images: [
            {
              url: 'https://www.example.ie/og-image-01.jpg',
              width: 800,
              height: 600,
              alt: 'Og Image Alt',
              type: 'image/jpeg',
            },
            {
              url: 'https://www.example.ie/og-image-02.jpg',
              width: 900,
              height: 800,
              alt: 'Og Image Alt Second',
              type: 'image/jpeg',
            },
            { url: 'https://www.example.ie/og-image-03.jpg' },
            { url: 'https://www.example.ie/og-image-04.jpg' },
          ],
          site_name: 'SiteName',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      {children}
    </>
  )
}

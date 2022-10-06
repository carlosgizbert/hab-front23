import Head from 'next/head'
import { ReactNode } from 'react'

interface IPage {
  title?: string
  description?: string
  children: ReactNode | ReactNode[]
}

export default function Page({
  title = 'habilita - Autoescolas credenciadas de todo Brasil',
  description = 'Encontre autoescolas para sua primeira habilitação.',
  children,
}: IPage) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      {children}
    </div>
  )
}

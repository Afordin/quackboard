import type { PropsWithChildren } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Nunito } from 'next/font/google'
import type { PageMeta } from '../types'
import Navbar from '@/components/ui/Navbar/Navbar'
import Footer from '@/components/ui/Footer/Footer'

const bangers = Nunito({ weight: ['400', '500', '700', '900'], subsets: ['latin'] })

interface Props extends PropsWithChildren {
  meta?: PageMeta
}

export default function Layout({ children, meta: pageMeta }: Props) {
  const router = useRouter()
  const meta = {
    title: 'Quackboard',
    description: '🦆',
    cardImage: '/og.png',
    ...pageMeta,
  }

  return (
    <div className="min-h-screen text-white bg-duck comic-effect">
      <style jsx global>{`
        html {
          font-family: ${bangers.style.fontFamily};
        }
      `}</style>
      <div className="container max-w-6xl px-8 py-4 mx-auto">
        <Head>
          <title>{meta.title}</title>
          <meta name="robots" content="follow, index" />
          <link href="/favicon.ico" rel="shortcut icon" />
          <meta content={meta.description} name="description" />
          <meta
            property="og:url"
            content={`https://quackboard.vercel.app${router.asPath}`}
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.cardImage} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.cardImage} />
        </Head>
        <Navbar />
        <main id="skip" className="my-12">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

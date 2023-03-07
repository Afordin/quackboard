import type { PropsWithChildren } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Inter } from 'next/font/google'
import type { PageMeta } from '../types'
import Navbar from '@/components/ui/Navbar/Navbar'
import Footer from '@/components/ui/Footer/Footer'

const inter = Inter({ subsets: ['latin'] })

interface Props extends PropsWithChildren {
  meta?: PageMeta
}

export default function Layout({ children, meta: pageMeta }: Props) {
  const router = useRouter()
  const meta = {
    title: 'Next.js Subscription Starter',
    description: 'Brought to you by Vercel, Stripe, and Supabase.',
    cardImage: '/og.png',
    ...pageMeta,
  }

  return (
        <>
            <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
            <div className="p-4 container max-w-6xl mx-auto">
                <Head>
                    <title>{meta.title}</title>
                    <meta name="robots" content="follow, index" />
                    <link href="/favicon.ico" rel="shortcut icon" />
                    <meta content={meta.description} name="description" />
                    <meta
                        property="og:url"
                        content={`https://subscription-starter.vercel.app${router.asPath}`}
                    />
                    <meta property="og:type" content="website" />
                    <meta property="og:site_name" content={meta.title} />
                    <meta property="og:description" content={meta.description} />
                    <meta property="og:title" content={meta.title} />
                    <meta property="og:image" content={meta.cardImage} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@vercel" />
                    <meta name="twitter:title" content={meta.title} />
                    <meta name="twitter:description" content={meta.description} />
                    <meta name="twitter:image" content={meta.cardImage} />
                </Head>
                <Navbar />
                <main id="skip" className="my-12">{children}</main>
                <Footer />
          </div>
      </>
  )
}

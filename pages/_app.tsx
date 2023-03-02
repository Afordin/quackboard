import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import "../styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";

export const siteTitle = "Cuack";
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <div className="p-4 container max-w-6xl mx-auto">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta name="description" content="Cuack cuack cuack" />
          <meta
            property="og:image"
            content={`https://og-image.vercel.app/${encodeURI(
              siteTitle
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
        <Header />
        <main className="my-12"><Component {...pageProps} /></main>
        <footer className="border-t pt-4 mt-12 text-sm font-medium justify-between flex">
          <div>(c) 2023 Cuack cuack</div>
          <div>#Hackafor2023</div>
        </footer>
      </div>
    </>
  )
}
